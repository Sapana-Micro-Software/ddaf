/*
 * Copyright (C) 2025, Shyamal Suhana Chandra
 * 
 * Attention-based activation function implementation
 * Uses attention mechanism to weight activations
 */

#include "ddaf.h"
#include "ddaf_internal.h"
#include <stdlib.h>
#include <string.h>
#include <math.h>

static void compute_attention(float* query, float* key, float* value,
                               float* attention_weights, size_t d_model,
                               size_t n_heads, size_t seq_len, float temperature) {
    size_t head_dim = d_model / n_heads;
    
    for (size_t h = 0; h < n_heads; h++) {
        for (size_t i = 0; i < seq_len; i++) {
            float sum = 0.0f;
            float max_score = -1e9f;
            
            /* Compute attention scores */
            for (size_t j = 0; j < seq_len; j++) {
                float score = 0.0f;
                for (size_t d = 0; d < head_dim; d++) {
                    size_t q_idx = h * seq_len * head_dim + i * head_dim + d;
                    size_t k_idx = h * seq_len * head_dim + j * head_dim + d;
                    score += query[q_idx] * key[k_idx];
                }
                score /= (sqrtf((float)head_dim) * temperature);
                
                /* Store for softmax */
                attention_weights[h * seq_len * seq_len + i * seq_len + j] = score;
                if (score > max_score) {
                    max_score = score;
                }
            }
            
            /* Softmax */
            for (size_t j = 0; j < seq_len; j++) {
                size_t idx = h * seq_len * seq_len + i * seq_len + j;
                attention_weights[idx] = expf(attention_weights[idx] - max_score);
                sum += attention_weights[idx];
            }
            
            for (size_t j = 0; j < seq_len; j++) {
                size_t idx = h * seq_len * seq_len + i * seq_len + j;
                attention_weights[idx] /= sum;
            }
        }
    }
}

static int attention_forward(ddaf_context_t* ctx, const float* input,
                             float* output, size_t size) {
    ddaf_attention_params_t* params = (ddaf_attention_params_t*)ctx->params;
    if (!params) return -1;
    
    size_t seq_len = params->seq_len;
    if (size < seq_len) seq_len = size;
    
    /* Initialize query, key, value from input */
    for (size_t i = 0; i < seq_len && i < size; i++) {
        for (size_t d = 0; d < params->d_model; d++) {
            size_t idx = i * params->d_model + d;
            if (idx < size) {
                params->query[idx] = input[idx];
                params->key[idx] = input[idx] * 0.9f;
                params->value[idx] = input[idx] * 1.1f;
            }
        }
    }
    
    /* Compute attention */
    compute_attention(params->query, params->key, params->value,
                     params->attention_weights, params->d_model,
                     params->n_heads, seq_len, params->temperature);
    
    /* Apply attention-weighted activation */
    for (size_t i = 0; i < size; i++) {
        float attention_sum = 0.0f;
        size_t seq_idx = i % seq_len;
        
        /* Aggregate attention weights */
        for (size_t h = 0; h < params->n_heads; h++) {
            for (size_t j = 0; j < seq_len; j++) {
                size_t att_idx = h * seq_len * seq_len + seq_idx * seq_len + j;
                attention_sum += params->attention_weights[att_idx];
            }
        }
        attention_sum /= (params->n_heads * seq_len);
        
        /* Apply activation with attention weighting */
        float base_act = ddaf_gelu(input[i]);
        float attention_act = ddaf_swish(input[i] * attention_sum);
        
        output[i] = 0.5f * base_act + 0.5f * attention_act;
    }
    
    return 0;
}

static int attention_backward(ddaf_context_t* ctx, const float* grad_output,
                              float* grad_input, size_t size) {
    ddaf_attention_params_t* params = (ddaf_attention_params_t*)ctx->params;
    if (!params) return -1;
    
    size_t seq_len = params->seq_len;
    if (size < seq_len) seq_len = size;
    
    for (size_t i = 0; i < size; i++) {
        float attention_sum = 0.0f;
        size_t seq_idx = i % seq_len;
        
        /* Aggregate attention weights */
        for (size_t h = 0; h < params->n_heads; h++) {
            for (size_t j = 0; j < seq_len; j++) {
                size_t att_idx = h * seq_len * seq_len + seq_idx * seq_len + j;
                attention_sum += params->attention_weights[att_idx];
            }
        }
        attention_sum /= (params->n_heads * seq_len);
        
        /* Gradient through attention-weighted activation */
        float grad_scale = 0.5f + 0.5f * attention_sum;
        grad_input[i] = grad_output[i] * grad_scale;
    }
    
    return 0;
}

int ddaf_init_attention(ddaf_context_t* ctx, size_t d_model, size_t n_heads,
                        size_t seq_len) {
    if (!ctx) return -1;
    if (d_model % n_heads != 0) return -1;
    
    size_t param_size = sizeof(ddaf_attention_params_t) +
                        d_model * seq_len * sizeof(float) * 3 + /* Q, K, V */
                        n_heads * seq_len * seq_len * sizeof(float); /* attention */
    
    if (ctx->params) {
        free(ctx->params);
    }
    
    ctx->params = calloc(1, param_size);
    if (!ctx->params) return -1;
    
    ddaf_attention_params_t* params = (ddaf_attention_params_t*)ctx->params;
    params->d_model = d_model;
    params->n_heads = n_heads;
    params->seq_len = seq_len;
    params->temperature = 1.0f;
    
    char* ptr = (char*)params + sizeof(ddaf_attention_params_t);
    params->query = (float*)ptr;
    params->key = params->query + d_model * seq_len;
    params->value = params->key + d_model * seq_len;
    params->attention_weights = params->value + d_model * seq_len;
    
    /* Initialize */
    memset(params->query, 0, d_model * seq_len * sizeof(float));
    memset(params->key, 0, d_model * seq_len * sizeof(float));
    memset(params->value, 0, d_model * seq_len * sizeof(float));
    memset(params->attention_weights, 0, 
           n_heads * seq_len * seq_len * sizeof(float));
    
    ctx->forward = attention_forward;
    ctx->backward = attention_backward;
    
    return 0;
}
