/*
 * Copyright (C) 2025, Shyamal Suhana Chandra
 * 
 * Big Bird activation function implementation
 * Sparse attention with block structure
 */

#include "ddaf.h"
#include "ddaf_internal.h"
#include <stdlib.h>
#include <string.h>
#include <math.h>

typedef struct {
    size_t d_model;
    size_t n_heads;
    size_t seq_len;
    size_t block_size;
    ddaf_context_t* activation_ctx;
    ddaf_context_t* global_activation_ctx;
    ddaf_context_t* random_activation_ctx;
} bigbird_params_t;

static int bigbird_forward(ddaf_context_t* ctx, const float* input,
                          float* output, size_t size) {
    bigbird_params_t* params = (bigbird_params_t*)ctx->params;
    if (!params || !params->activation_ctx) return -1;
    
    /* Big Bird uses three types of attention: window, global, random */
    /* Apply activation to each attention type */
    
    /* Window attention (local blocks) */
    float* window_output = (float*)ddaf_pool_alloc(ctx->pool, size * sizeof(float));
    if (!window_output) return -1;
    
    int ret = ddaf_forward(params->activation_ctx, input, window_output, size);
    if (ret != 0) return ret;
    
    /* Global attention */
    float* global_output = NULL;
    if (params->global_activation_ctx) {
        global_output = (float*)ddaf_pool_alloc(ctx->pool, size * sizeof(float));
        if (!global_output) return -1;
        ret = ddaf_forward(params->global_activation_ctx, input, global_output, size);
        if (ret != 0) return ret;
    }
    
    /* Random attention */
    float* random_output = NULL;
    if (params->random_activation_ctx) {
        random_output = (float*)ddaf_pool_alloc(ctx->pool, size * sizeof(float));
        if (!random_output) return -1;
        ret = ddaf_forward(params->random_activation_ctx, input, random_output, size);
        if (ret != 0) return ret;
    }
    
    /* Combine outputs */
    for (size_t i = 0; i < size; i++) {
        output[i] = window_output[i];
        if (global_output) {
            output[i] += 0.3f * global_output[i];
        }
        if (random_output) {
            output[i] += 0.2f * random_output[i];
        }
    }
    
    return 0;
}

static int bigbird_backward(ddaf_context_t* ctx, const float* grad_output,
                            float* grad_input, size_t size) {
    bigbird_params_t* params = (bigbird_params_t*)ctx->params;
    if (!params || !params->activation_ctx) return -1;
    
    float* grad_window = (float*)ddaf_pool_alloc(ctx->pool, size * sizeof(float));
    if (!grad_window) return -1;
    
    /* Distribute gradient */
    for (size_t i = 0; i < size; i++) {
        grad_window[i] = grad_output[i];
        if (params->global_activation_ctx) {
            grad_window[i] += 0.3f * grad_output[i];
        }
        if (params->random_activation_ctx) {
            grad_window[i] += 0.2f * grad_output[i];
        }
    }
    
    return ddaf_backward(params->activation_ctx, grad_window, grad_input, size);
}

int ddaf_bigbird_init(ddaf_context_t* ctx, size_t d_model, size_t n_heads,
                      size_t seq_len, size_t block_size) {
    if (!ctx) return -1;
    if (d_model % n_heads != 0) return -1;
    if (block_size == 0) return -1;
    
    size_t param_size = sizeof(bigbird_params_t);
    if (ctx->params) {
        free(ctx->params);
    }
    
    ctx->params = calloc(1, param_size);
    if (!ctx->params) return -1;
    
    bigbird_params_t* params = (bigbird_params_t*)ctx->params;
    params->d_model = d_model;
    params->n_heads = n_heads;
    params->seq_len = seq_len;
    params->block_size = block_size;
    
    /* Create activation contexts for different attention types */
    params->activation_ctx = ddaf_create_context(ctx->type, ctx->arch, 0);
    if (!params->activation_ctx) {
        free(ctx->params);
        ctx->params = NULL;
        return -1;
    }
    
    params->global_activation_ctx = ddaf_create_context(ctx->type, ctx->arch, 0);
    if (!params->global_activation_ctx) {
        ddaf_destroy_context(params->activation_ctx);
        free(ctx->params);
        ctx->params = NULL;
        return -1;
    }
    
    params->random_activation_ctx = ddaf_create_context(ctx->type, ctx->arch, 0);
    if (!params->random_activation_ctx) {
        ddaf_destroy_context(params->global_activation_ctx);
        ddaf_destroy_context(params->activation_ctx);
        free(ctx->params);
        ctx->params = NULL;
        return -1;
    }
    
    /* Initialize based on activation type */
    size_t window_seq = block_size;
    size_t global_seq = seq_len; /* Global tokens */
    size_t random_seq = seq_len / 4; /* Random tokens */
    
    switch (ctx->type) {
        case DDAF_TYPE_DATA_DRIVEN:
            ddaf_init_data_driven(params->activation_ctx, d_model * window_seq);
            ddaf_init_data_driven(params->global_activation_ctx, d_model * global_seq);
            ddaf_init_data_driven(params->random_activation_ctx, d_model * random_seq);
            break;
        case DDAF_TYPE_DYNAMIC:
            ddaf_init_dynamic(params->activation_ctx, d_model * window_seq);
            ddaf_init_dynamic(params->global_activation_ctx, d_model * global_seq);
            ddaf_init_dynamic(params->random_activation_ctx, d_model * random_seq);
            break;
        case DDAF_TYPE_ONLINE:
            ddaf_init_online(params->activation_ctx, window_seq);
            ddaf_init_online(params->global_activation_ctx, global_seq);
            ddaf_init_online(params->random_activation_ctx, random_seq);
            break;
        case DDAF_TYPE_ATTENTION:
            ddaf_init_attention(params->activation_ctx, d_model, n_heads, window_seq);
            ddaf_init_attention(params->global_activation_ctx, d_model, n_heads, global_seq);
            ddaf_init_attention(params->random_activation_ctx, d_model, n_heads, random_seq);
            break;
        default:
            ddaf_destroy_context(params->random_activation_ctx);
            ddaf_destroy_context(params->global_activation_ctx);
            ddaf_destroy_context(params->activation_ctx);
            free(ctx->params);
            ctx->params = NULL;
            return -1;
    }
    
    ctx->forward = bigbird_forward;
    ctx->backward = bigbird_backward;
    
    return 0;
}
