/*
 * Copyright (C) 2025, Shyamal Suhana Chandra
 * 
 * Online activation function implementation
 * Adapts in real-time to streaming data
 */

#include "ddaf.h"
#include "ddaf_internal.h"
#include <stdlib.h>
#include <string.h>
#include <math.h>

static int online_forward(ddaf_context_t* ctx, const float* input,
                          float* output, size_t size) {
    ddaf_online_params_t* params = (ddaf_online_params_t*)ctx->params;
    if (!params) return -1;
    
    /* Update online statistics */
    for (size_t i = 0; i < size; i++) {
        float value = input[i];
        
        /* Update buffer */
        params->buffer[params->buffer_idx] = value;
        params->buffer_idx = (params->buffer_idx + 1) % params->buffer_size;
        
        /* Update online mean and variance */
        if (params->online_stats) {
            float old_mean = params->online_stats[0];
            float old_var = params->online_stats[1];
            
            /* Exponential moving average */
            params->online_stats[0] = params->forgetting_factor * old_mean + 
                                      (1.0f - params->forgetting_factor) * value;
            
            float diff = value - params->online_stats[0];
            params->online_stats[1] = params->forgetting_factor * old_var + 
                                      (1.0f - params->forgetting_factor) * diff * diff;
        }
    }
    
    /* Compute current statistics from buffer */
    float mean = 0.0f;
    for (size_t i = 0; i < params->buffer_size; i++) {
        mean += params->buffer[i];
    }
    mean /= params->buffer_size;
    
    float variance = 0.0f;
    for (size_t i = 0; i < params->buffer_size; i++) {
        float diff = params->buffer[i] - mean;
        variance += diff * diff;
    }
    variance /= params->buffer_size;
    float stddev = sqrtf(variance + DDAF_EPSILON);
    
    /* Apply online activation */
    for (size_t i = 0; i < size; i++) {
        float normalized = (input[i] - mean) / (stddev + DDAF_EPSILON);
        
        /* Online adaptive activation */
        float online_factor = 1.0f;
        if (params->online_stats) {
            float global_mean = params->online_stats[0];
            float global_std = sqrtf(params->online_stats[1] + DDAF_EPSILON);
            online_factor = 1.0f + 0.1f * (normalized - (input[i] - global_mean) / 
                                          (global_std + DDAF_EPSILON));
        }
        
        output[i] = online_factor * ddaf_gelu(normalized);
    }
    
    return 0;
}

static int online_backward(ddaf_context_t* ctx, const float* grad_output,
                           float* grad_input, size_t size) {
    ddaf_online_params_t* params = (ddaf_online_params_t*)ctx->params;
    if (!params) return -1;
    
    /* Compute gradient through online activation */
    for (size_t i = 0; i < size; i++) {
        float online_factor = 1.0f;
        if (params->online_stats) {
            float global_mean = params->online_stats[0];
            float global_std = sqrtf(params->online_stats[1] + DDAF_EPSILON);
            float normalized = (params->buffer[i] - global_mean) / 
                               (global_std + DDAF_EPSILON);
            online_factor = 1.0f + 0.1f * normalized;
        }
        
        grad_input[i] = grad_output[i] * online_factor;
    }
    
    return 0;
}

int ddaf_init_online(ddaf_context_t* ctx, size_t buffer_size) {
    if (!ctx) return -1;
    
    size_t param_size = sizeof(ddaf_online_params_t) + 
                        buffer_size * sizeof(float) + /* buffer */
                        2 * sizeof(float); /* online_stats */
    
    if (ctx->params) {
        free(ctx->params);
    }
    
    ctx->params = calloc(1, param_size);
    if (!ctx->params) return -1;
    
    ddaf_online_params_t* params = (ddaf_online_params_t*)ctx->params;
    params->buffer_size = buffer_size;
    params->buffer_idx = 0;
    params->forgetting_factor = 0.95f;
    
    params->buffer = (float*)((char*)params + sizeof(ddaf_online_params_t));
    params->online_stats = params->buffer + buffer_size;
    
    /* Initialize statistics */
    params->online_stats[0] = 0.0f; /* mean */
    params->online_stats[1] = 1.0f; /* variance */
    
    /* Initialize buffer */
    for (size_t i = 0; i < buffer_size; i++) {
        params->buffer[i] = 0.0f;
    }
    
    ctx->forward = online_forward;
    ctx->backward = online_backward;
    
    return 0;
}
