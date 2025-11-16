/*
 * Copyright (C) 2025, Shyamal Suhana Chandra
 * 
 * Hierarchical Transformer activation function implementation
 */

#include "ddaf.h"
#include "ddaf_internal.h"
#include <stdlib.h>
#include <string.h>
#include <math.h>

typedef struct {
    size_t d_model;
    size_t n_heads;
    size_t n_levels;
    ddaf_context_t** level_activations;
} hierarchical_transformer_params_t;

static int hierarchical_transformer_forward(ddaf_context_t* ctx, 
                                            const float* input,
                                            float* output, size_t size) {
    hierarchical_transformer_params_t* params = 
        (hierarchical_transformer_params_t*)ctx->params;
    if (!params || !params->level_activations) return -1;
    
    /* Apply activations at each hierarchical level */
    float* temp = (float*)ddaf_pool_alloc(ctx->pool, size * sizeof(float));
    if (!temp) return -1;
    
    memcpy(temp, input, size * sizeof(float));
    
    for (size_t level = 0; level < params->n_levels; level++) {
        if (!params->level_activations[level]) continue;
        
        int ret = ddaf_forward(params->level_activations[level], temp, output, size);
        if (ret != 0) return ret;
        
        /* Use output as input for next level */
        if (level < params->n_levels - 1) {
            memcpy(temp, output, size * sizeof(float));
        }
    }
    
    return 0;
}

static int hierarchical_transformer_backward(ddaf_context_t* ctx,
                                             const float* grad_output,
                                             float* grad_input, size_t size) {
    hierarchical_transformer_params_t* params = 
        (hierarchical_transformer_params_t*)ctx->params;
    if (!params || !params->level_activations) return -1;
    
    /* Backward through hierarchical levels in reverse */
    float* grad_temp = (float*)ddaf_pool_alloc(ctx->pool, size * sizeof(float));
    if (!grad_temp) return -1;
    
    memcpy(grad_temp, grad_output, size * sizeof(float));
    
    for (int level = (int)params->n_levels - 1; level >= 0; level--) {
        if (!params->level_activations[level]) continue;
        
        float* temp_input = (float*)ddaf_pool_alloc(ctx->pool, size * sizeof(float));
        if (!temp_input) return -1;
        
        int ret = ddaf_backward(params->level_activations[level], grad_temp, 
                               temp_input, size);
        if (ret != 0) return ret;
        
        memcpy(grad_temp, temp_input, size * sizeof(float));
    }
    
    memcpy(grad_input, grad_temp, size * sizeof(float));
    return 0;
}

int ddaf_hierarchical_transformer_init(ddaf_context_t* ctx, size_t d_model,
                                       size_t n_heads, size_t n_levels) {
    if (!ctx) return -1;
    if (d_model % n_heads != 0) return -1;
    if (n_levels == 0) return -1;
    
    size_t param_size = sizeof(hierarchical_transformer_params_t) +
                        n_levels * sizeof(ddaf_context_t*);
    if (ctx->params) {
        free(ctx->params);
    }
    
    ctx->params = calloc(1, param_size);
    if (!ctx->params) return -1;
    
    hierarchical_transformer_params_t* params = 
        (hierarchical_transformer_params_t*)ctx->params;
    params->d_model = d_model;
    params->n_heads = n_heads;
    params->n_levels = n_levels;
    params->level_activations = (ddaf_context_t**)((char*)params + 
                                                   sizeof(hierarchical_transformer_params_t));
    
    /* Initialize activations for each level */
    for (size_t level = 0; level < n_levels; level++) {
        params->level_activations[level] = ddaf_create_context(ctx->type, ctx->arch, 0);
        if (!params->level_activations[level]) {
            /* Cleanup on failure */
            for (size_t i = 0; i < level; i++) {
                ddaf_destroy_context(params->level_activations[i]);
            }
            free(ctx->params);
            ctx->params = NULL;
            return -1;
        }
        
        /* Initialize based on activation type */
        size_t seq_len = 1 << (n_levels - level); /* Decreasing sequence length */
        switch (ctx->type) {
            case DDAF_TYPE_DATA_DRIVEN:
                ddaf_init_data_driven(params->level_activations[level], d_model * seq_len);
                break;
            case DDAF_TYPE_DYNAMIC:
                ddaf_init_dynamic(params->level_activations[level], d_model * seq_len);
                break;
            case DDAF_TYPE_ONLINE:
                ddaf_init_online(params->level_activations[level], seq_len);
                break;
            case DDAF_TYPE_ATTENTION:
                ddaf_init_attention(params->level_activations[level], d_model, n_heads, seq_len);
                break;
            default:
                for (size_t i = 0; i <= level; i++) {
                    ddaf_destroy_context(params->level_activations[i]);
                }
                free(ctx->params);
                ctx->params = NULL;
                return -1;
        }
    }
    
    ctx->forward = hierarchical_transformer_forward;
    ctx->backward = hierarchical_transformer_backward;
    
    return 0;
}
