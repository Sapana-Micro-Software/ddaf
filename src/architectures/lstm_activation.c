/*
 * Copyright (C) 2025, Shyamal Suhana Chandra
 * 
 * LSTM-specific activation function implementation
 */

#include "ddaf.h"
#include "ddaf_internal.h"
#include <stdlib.h>
#include <string.h>
#include <math.h>

typedef struct {
    size_t hidden_size;
    size_t seq_len;
    float* cell_state;
    float* hidden_state;
    ddaf_context_t* activation_ctx;
    ddaf_context_t* gate_activation_ctx;
} lstm_params_t;

static int lstm_forward(ddaf_context_t* ctx, const float* input,
                       float* output, size_t size) {
    lstm_params_t* params = (lstm_params_t*)ctx->params;
    if (!params || !params->activation_ctx) return -1;
    
    size_t hidden_size = params->hidden_size;
    if (size < hidden_size * 4) return -1;
    
    /* LSTM gates: input, forget, output, candidate */
    float* gates = (float*)ddaf_pool_alloc(ctx->pool, hidden_size * 4 * sizeof(float));
    if (!gates) return -1;
    
    /* Apply gate activations (sigmoid for input/forget/output, tanh for candidate) */
    for (size_t i = 0; i < hidden_size; i++) {
        /* Input gate */
        gates[i] = ddaf_sigmoid(input[i]);
        /* Forget gate */
        gates[hidden_size + i] = ddaf_sigmoid(input[hidden_size + i]);
        /* Output gate */
        gates[2 * hidden_size + i] = ddaf_sigmoid(input[2 * hidden_size + i]);
        /* Candidate */
        gates[3 * hidden_size + i] = ddaf_tanh(input[3 * hidden_size + i]);
    }
    
    /* Update cell state and hidden state */
    for (size_t i = 0; i < hidden_size; i++) {
        if (params->cell_state) {
            params->cell_state[i] = gates[hidden_size + i] * params->cell_state[i] +
                                   gates[i] * gates[3 * hidden_size + i];
        }
        
        float cell_act = params->cell_state ? ddaf_tanh(params->cell_state[i]) : 0.0f;
        output[i] = gates[2 * hidden_size + i] * cell_act;
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

static int lstm_backward(ddaf_context_t* ctx, const float* grad_output,
                         float* grad_input, size_t size) {
    lstm_params_t* params = (lstm_params_t*)ctx->params;
    if (!params || !params->activation_ctx) return -1;
    
    size_t hidden_size = params->hidden_size;
    if (size < hidden_size) return -1;
    
    float* grad_temp = (float*)ddaf_pool_alloc(ctx->pool, hidden_size * sizeof(float));
    if (!grad_temp) return -1;
    
    int ret = ddaf_backward(params->activation_ctx, grad_output, grad_temp, hidden_size);
    if (ret != 0) return ret;
    
    /* Backward through LSTM gates */
    for (size_t i = 0; i < hidden_size; i++) {
        grad_input[i] = grad_temp[i]; /* Input gate */
        grad_input[hidden_size + i] = grad_temp[i]; /* Forget gate */
        grad_input[2 * hidden_size + i] = grad_temp[i]; /* Output gate */
        grad_input[3 * hidden_size + i] = grad_temp[i]; /* Candidate */
    }
    
    return 0;
}

int ddaf_lstm_init(ddaf_context_t* ctx, size_t hidden_size, size_t seq_len) {
    if (!ctx) return -1;
    
    size_t param_size = sizeof(lstm_params_t) + 
                        hidden_size * sizeof(float) * 2; /* cell + hidden state */
    if (ctx->params) {
        free(ctx->params);
    }
    
    ctx->params = calloc(1, param_size);
    if (!ctx->params) return -1;
    
    lstm_params_t* params = (lstm_params_t*)ctx->params;
    params->hidden_size = hidden_size;
    params->seq_len = seq_len;
    params->cell_state = (float*)((char*)params + sizeof(lstm_params_t));
    params->hidden_state = params->cell_state + hidden_size;
    
    /* Initialize states */
    memset(params->cell_state, 0, hidden_size * sizeof(float));
    memset(params->hidden_state, 0, hidden_size * sizeof(float));
    
    /* Create activation contexts */
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
    
    ctx->forward = lstm_forward;
    ctx->backward = lstm_backward;
    
    return 0;
}
