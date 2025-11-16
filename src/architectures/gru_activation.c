/*
 * Copyright (C) 2025, Shyamal Suhana Chandra
 * 
 * GRU-specific activation function implementation
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
} gru_params_t;

static int gru_forward(ddaf_context_t* ctx, const float* input,
                      float* output, size_t size) {
    gru_params_t* params = (gru_params_t*)ctx->params;
    if (!params || !params->activation_ctx) return -1;
    
    size_t hidden_size = params->hidden_size;
    if (size < hidden_size * 3) return -1;
    
    /* GRU gates: reset and update */
    float* reset_gate = (float*)ddaf_pool_alloc(ctx->pool, hidden_size * sizeof(float));
    float* update_gate = (float*)ddaf_pool_alloc(ctx->pool, hidden_size * sizeof(float));
    float* candidate = (float*)ddaf_pool_alloc(ctx->pool, hidden_size * sizeof(float));
    if (!reset_gate || !update_gate || !candidate) return -1;
    
    /* Compute gates */
    for (size_t i = 0; i < hidden_size; i++) {
        reset_gate[i] = ddaf_sigmoid(input[i]);
        update_gate[i] = ddaf_sigmoid(input[hidden_size + i]);
        
        float reset_hidden = reset_gate[i] * 
                            (params->hidden_state ? params->hidden_state[i] : 0.0f);
        candidate[i] = ddaf_tanh(input[2 * hidden_size + i] + reset_hidden);
    }
    
    /* Update hidden state */
    for (size_t i = 0; i < hidden_size; i++) {
        float old_hidden = params->hidden_state ? params->hidden_state[i] : 0.0f;
        output[i] = (1.0f - update_gate[i]) * candidate[i] + 
                   update_gate[i] * old_hidden;
    }
    
    /* Apply main activation function */
    float* temp_output = (float*)ddaf_pool_alloc(ctx->pool, hidden_size * sizeof(float));
    if (!temp_output) return -1;
    
    int ret = ddaf_forward(params->activation_ctx, output, temp_output, hidden_size);
    if (ret == 0) {
        memcpy(output, temp_output, hidden_size * sizeof(float));
    }
    
    /* Update hidden state */
    if (params->hidden_state && hidden_size <= params->hidden_size) {
        memcpy(params->hidden_state, output, hidden_size * sizeof(float));
    }
    
    return ret;
}

static int gru_backward(ddaf_context_t* ctx, const float* grad_output,
                        float* grad_input, size_t size) {
    gru_params_t* params = (gru_params_t*)ctx->params;
    if (!params || !params->activation_ctx) return -1;
    
    size_t hidden_size = params->hidden_size;
    if (size < hidden_size) return -1;
    
    float* grad_temp = (float*)ddaf_pool_alloc(ctx->pool, hidden_size * sizeof(float));
    if (!grad_temp) return -1;
    
    int ret = ddaf_backward(params->activation_ctx, grad_output, grad_temp, hidden_size);
    if (ret != 0) return ret;
    
    /* Backward through GRU gates */
    for (size_t i = 0; i < hidden_size; i++) {
        grad_input[i] = grad_temp[i]; /* Reset gate */
        grad_input[hidden_size + i] = grad_temp[i]; /* Update gate */
        grad_input[2 * hidden_size + i] = grad_temp[i]; /* Candidate */
    }
    
    return 0;
}

int ddaf_gru_init(ddaf_context_t* ctx, size_t hidden_size, size_t seq_len) {
    if (!ctx) return -1;
    
    size_t param_size = sizeof(gru_params_t) + hidden_size * sizeof(float);
    if (ctx->params) {
        free(ctx->params);
    }
    
    ctx->params = calloc(1, param_size);
    if (!ctx->params) return -1;
    
    gru_params_t* params = (gru_params_t*)ctx->params;
    params->hidden_size = hidden_size;
    params->seq_len = seq_len;
    params->hidden_state = (float*)((char*)params + sizeof(gru_params_t));
    
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
    
    ctx->forward = gru_forward;
    ctx->backward = gru_backward;
    
    return 0;
}
