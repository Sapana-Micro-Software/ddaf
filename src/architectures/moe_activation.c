/*
 * Copyright (C) 2025, Shyamal Suhana Chandra
 * 
 * Mixture of Experts (MoE) activation function implementation
 */

#include "ddaf.h"
#include "ddaf_internal.h"
#include <stdlib.h>
#include <string.h>
#include <math.h>

typedef struct {
    size_t d_model;
    size_t n_experts;
    size_t k_experts;
    ddaf_context_t** expert_activations;
    float* router_weights;
    float* expert_outputs;
} moe_params_t;

static void compute_router_weights(const float* input, float* weights,
                                   size_t n_experts, size_t d_model) {
    /* Simple router: compute similarity to expert centers */
    for (size_t e = 0; e < n_experts; e++) {
        float score = 0.0f;
        for (size_t d = 0; d < d_model; d++) {
            float expert_center = (float)(e + 1) / (float)(n_experts + 1);
            float diff = input[d] - expert_center;
            score -= diff * diff; /* Negative distance */
        }
        weights[e] = expf(score);
    }
    
    /* Softmax */
    float sum = 0.0f;
    for (size_t e = 0; e < n_experts; e++) {
        sum += weights[e];
    }
    for (size_t e = 0; e < n_experts; e++) {
        weights[e] /= sum;
    }
    
    /* Top-k selection */
    /* Sort and keep top k (simplified - just use top k by value) */
}

static int moe_forward(ddaf_context_t* ctx, const float* input,
                      float* output, size_t size) {
    moe_params_t* params = (moe_params_t*)ctx->params;
    if (!params || !params->expert_activations) return -1;
    
    if (size < params->d_model) return -1;
    
    /* Compute router weights */
    compute_router_weights(input, params->router_weights, 
                          params->n_experts, params->d_model);
    
    /* Apply each expert */
    memset(params->expert_outputs, 0, params->d_model * params->n_experts * sizeof(float));
    
    for (size_t e = 0; e < params->n_experts; e++) {
        if (!params->expert_activations[e]) continue;
        
        float* expert_out = params->expert_outputs + e * params->d_model;
        int ret = ddaf_forward(params->expert_activations[e], input, 
                              expert_out, params->d_model);
        if (ret != 0) return ret;
    }
    
    /* Weighted combination of expert outputs */
    memset(output, 0, params->d_model * sizeof(float));
    for (size_t e = 0; e < params->n_experts; e++) {
        float weight = params->router_weights[e];
        float* expert_out = params->expert_outputs + e * params->d_model;
        
        for (size_t d = 0; d < params->d_model; d++) {
            output[d] += weight * expert_out[d];
        }
    }
    
    return 0;
}

static int moe_backward(ddaf_context_t* ctx, const float* grad_output,
                        float* grad_input, size_t size) {
    moe_params_t* params = (moe_params_t*)ctx->params;
    if (!params || !params->expert_activations) return -1;
    
    if (size < params->d_model) return -1;
    
    /* Backward through experts */
    float* grad_temp = (float*)ddaf_pool_alloc(ctx->pool, params->d_model * sizeof(float));
    if (!grad_temp) return -1;
    
    memset(grad_input, 0, params->d_model * sizeof(float));
    
    for (size_t e = 0; e < params->n_experts; e++) {
        if (!params->expert_activations[e]) continue;
        
        float weight = params->router_weights[e];
        
        /* Scale gradient by router weight */
        for (size_t d = 0; d < params->d_model; d++) {
            grad_temp[d] = weight * grad_output[d];
        }
        
        float* expert_grad = (float*)ddaf_pool_alloc(ctx->pool, 
                                                    params->d_model * sizeof(float));
        if (!expert_grad) return -1;
        
        int ret = ddaf_backward(params->expert_activations[e], grad_temp, 
                               expert_grad, params->d_model);
        if (ret != 0) return ret;
        
        /* Accumulate gradients */
        for (size_t d = 0; d < params->d_model; d++) {
            grad_input[d] += expert_grad[d];
        }
    }
    
    return 0;
}

int ddaf_moe_init(ddaf_context_t* ctx, size_t d_model, size_t n_experts,
                  size_t k_experts) {
    if (!ctx) return -1;
    if (n_experts == 0) return -1;
    if (k_experts > n_experts) k_experts = n_experts;
    
    size_t param_size = sizeof(moe_params_t) +
                        n_experts * sizeof(ddaf_context_t*) +
                        n_experts * sizeof(float) + /* router weights */
                        d_model * n_experts * sizeof(float); /* expert outputs */
    
    if (ctx->params) {
        free(ctx->params);
    }
    
    ctx->params = calloc(1, param_size);
    if (!ctx->params) return -1;
    
    moe_params_t* params = (moe_params_t*)ctx->params;
    params->d_model = d_model;
    params->n_experts = n_experts;
    params->k_experts = k_experts;
    
    char* ptr = (char*)params + sizeof(moe_params_t);
    params->expert_activations = (ddaf_context_t**)ptr;
    params->router_weights = (float*)(params->expert_activations + n_experts);
    params->expert_outputs = params->router_weights + n_experts;
    
    /* Initialize expert activations */
    for (size_t e = 0; e < n_experts; e++) {
        params->expert_activations[e] = ddaf_create_context(ctx->type, ctx->arch, 0);
        if (!params->expert_activations[e]) {
            /* Cleanup on failure */
            for (size_t i = 0; i < e; i++) {
                ddaf_destroy_context(params->expert_activations[i]);
            }
            free(ctx->params);
            ctx->params = NULL;
            return -1;
        }
        
        /* Initialize based on activation type */
        switch (ctx->type) {
            case DDAF_TYPE_DATA_DRIVEN:
                ddaf_init_data_driven(params->expert_activations[e], d_model);
                break;
            case DDAF_TYPE_DYNAMIC:
                ddaf_init_dynamic(params->expert_activations[e], d_model);
                break;
            case DDAF_TYPE_ONLINE:
                ddaf_init_online(params->expert_activations[e], 100);
                break;
            case DDAF_TYPE_ATTENTION:
                ddaf_init_attention(params->expert_activations[e], d_model, 4, 1);
                break;
            default:
                for (size_t i = 0; i <= e; i++) {
                    ddaf_destroy_context(params->expert_activations[i]);
                }
                free(ctx->params);
                ctx->params = NULL;
                return -1;
        }
    }
    
    /* Initialize router weights */
    for (size_t e = 0; e < n_experts; e++) {
        params->router_weights[e] = 1.0f / n_experts;
    }
    
    ctx->forward = moe_forward;
    ctx->backward = moe_backward;
    
    return 0;
}
