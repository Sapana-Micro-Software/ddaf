/*
 * Copyright (C) 2025, Shyamal Suhana Chandra
 * 
 * RNN-specific activation function implementation
 */

#include "ddaf.h"
#include "ddaf_internal.h"
#include <stdlib.h>
#include <string.h>
#include <math.h>

typedef struct {
    size_t hidden_size;
    size_t seq_len;
    float* hidden_state;
    ddaf_context_t* activation_ctx;
} rnn_params_t;

static int rnn_forward(ddaf_context_t* ctx, const float* input,
                      float* output, size_t size) {
    rnn_params_t* params = (rnn_params_t*)ctx->params;
    if (!params || !params->activation_ctx) return -1;
    
    /* Combine input with hidden state for RNN */
    float* combined = (float*)ddaf_pool_alloc(ctx->pool, size * sizeof(float));
    if (!combined) return -1;
    
    for (size_t i = 0; i < size && i < params->hidden_size; i++) {
        combined[i] = input[i] + (params->hidden_state ? params->hidden_state[i] : 0.0f);
    }
    
    int ret = ddaf_forward(params->activation_ctx, combined, output, size);
    
    /* Update hidden state */
    if (params->hidden_state && size <= params->hidden_size) {
        memcpy(params->hidden_state, output, size * sizeof(float));
    }
    
    return ret;
}

static int rnn_backward(ddaf_context_t* ctx, const float* grad_output,
                        float* grad_input, size_t size) {
    rnn_params_t* params = (rnn_params_t*)ctx->params;
    if (!params || !params->activation_ctx) return -1;
    
    return ddaf_backward(params->activation_ctx, grad_output, grad_input, size);
}

int ddaf_rnn_init(ddaf_context_t* ctx, size_t hidden_size, size_t seq_len) {
    if (!ctx) return -1;
    
    size_t param_size = sizeof(rnn_params_t) + hidden_size * sizeof(float);
    if (ctx->params) {
        free(ctx->params);
    }
    
    ctx->params = calloc(1, param_size);
    if (!ctx->params) return -1;
    
    rnn_params_t* params = (rnn_params_t*)ctx->params;
    params->hidden_size = hidden_size;
    params->seq_len = seq_len;
    params->hidden_state = (float*)((char*)params + sizeof(rnn_params_t));
    
    /* Initialize hidden state */
    memset(params->hidden_state, 0, hidden_size * sizeof(float));
    
    /* Create activation context */
    params->activation_ctx = ddaf_create_context(ctx->type, ctx->arch, 0);
    if (!params->activation_ctx) {
        free(ctx->params);
        ctx->params = NULL;
        return -1;
    }
    
    /* Initialize based on activation type */
    switch (ctx->type) {
        case DDAF_TYPE_DATA_DRIVEN:
            ddaf_init_data_driven(params->activation_ctx, hidden_size);
            break;
        case DDAF_TYPE_DYNAMIC:
            ddaf_init_dynamic(params->activation_ctx, hidden_size);
            break;
        case DDAF_TYPE_ONLINE:
            ddaf_init_online(params->activation_ctx, seq_len);
            break;
        case DDAF_TYPE_ATTENTION:
            ddaf_init_attention(params->activation_ctx, hidden_size, 4, seq_len);
            break;
        default:
            free(ctx->params);
            ctx->params = NULL;
            ddaf_destroy_context(params->activation_ctx);
            return -1;
    }
    
    ctx->forward = rnn_forward;
    ctx->backward = rnn_backward;
    
    return 0;
}
