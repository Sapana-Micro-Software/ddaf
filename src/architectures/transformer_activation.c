/*
 * Copyright (C) 2025, Shyamal Suhana Chandra
 * 
 * Transformer-specific activation function implementation
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
    ddaf_context_t* activation_ctx;
    ddaf_context_t* ffn_activation_ctx;
} transformer_params_t;

static int transformer_forward(ddaf_context_t* ctx, const float* input,
                               float* output, size_t size) {
    transformer_params_t* params = (transformer_params_t*)ctx->params;
    if (!params || !params->activation_ctx) return -1;
    
    /* Apply activation in transformer blocks */
    return ddaf_forward(params->activation_ctx, input, output, size);
}

static int transformer_backward(ddaf_context_t* ctx, const float* grad_output,
                                float* grad_input, size_t size) {
    transformer_params_t* params = (transformer_params_t*)ctx->params;
    if (!params || !params->activation_ctx) return -1;
    
    return ddaf_backward(params->activation_ctx, grad_output, grad_input, size);
}

int ddaf_transformer_init(ddaf_context_t* ctx, size_t d_model, size_t n_heads,
                          size_t seq_len) {
    if (!ctx) return -1;
    if (d_model % n_heads != 0) return -1;
    
    size_t param_size = sizeof(transformer_params_t);
    if (ctx->params) {
        free(ctx->params);
    }
    
    ctx->params = calloc(1, param_size);
    if (!ctx->params) return -1;
    
    transformer_params_t* params = (transformer_params_t*)ctx->params;
    params->d_model = d_model;
    params->n_heads = n_heads;
    params->seq_len = seq_len;
    
    /* Create activation contexts */
    params->activation_ctx = ddaf_create_context(ctx->type, ctx->arch, 0);
    if (!params->activation_ctx) {
        free(ctx->params);
        ctx->params = NULL;
        return -1;
    }
    
    params->ffn_activation_ctx = ddaf_create_context(ctx->type, ctx->arch, 0);
    if (!params->ffn_activation_ctx) {
        ddaf_destroy_context(params->activation_ctx);
        free(ctx->params);
        ctx->params = NULL;
        return -1;
    }
    
    /* Initialize based on activation type */
    switch (ctx->type) {
        case DDAF_TYPE_DATA_DRIVEN:
            ddaf_init_data_driven(params->activation_ctx, d_model * seq_len);
            ddaf_init_data_driven(params->ffn_activation_ctx, d_model * 4);
            break;
        case DDAF_TYPE_DYNAMIC:
            ddaf_init_dynamic(params->activation_ctx, d_model * seq_len);
            ddaf_init_dynamic(params->ffn_activation_ctx, d_model * 4);
            break;
        case DDAF_TYPE_ONLINE:
            ddaf_init_online(params->activation_ctx, seq_len);
            ddaf_init_online(params->ffn_activation_ctx, 100);
            break;
        case DDAF_TYPE_ATTENTION:
            ddaf_init_attention(params->activation_ctx, d_model, n_heads, seq_len);
            ddaf_init_attention(params->ffn_activation_ctx, d_model, n_heads, 1);
            break;
        default:
            ddaf_destroy_context(params->ffn_activation_ctx);
            ddaf_destroy_context(params->activation_ctx);
            free(ctx->params);
            ctx->params = NULL;
            return -1;
    }
    
    ctx->forward = transformer_forward;
    ctx->backward = transformer_backward;
    
    return 0;
}
