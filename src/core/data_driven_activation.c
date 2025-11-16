/*
 * Copyright (C) 2025, Shyamal Suhana Chandra
 * 
 * Data-driven activation function implementation
 * Adapts based on input data statistics
 */

#include "ddaf.h"
#include "ddaf_internal.h"
#include <stdlib.h>
#include <string.h>
#include <math.h>

static int data_driven_forward(ddaf_context_t* ctx, const float* input,
                               float* output, size_t size) {
    ddaf_data_driven_params_t* params = (ddaf_data_driven_params_t*)ctx->params;
    if (!params) return -1;
    
    /* Compute running statistics */
    float mean = 0.0f;
    float variance = 0.0f;
    
    for (size_t i = 0; i < size; i++) {
        mean += input[i];
    }
    mean /= size;
    
    for (size_t i = 0; i < size; i++) {
        float diff = input[i] - mean;
        variance += diff * diff;
    }
    variance /= size;
    float stddev = sqrtf(variance + DDAF_EPSILON);
    
    /* Update running statistics */
    if (params->statistics) {
        float old_mean = params->statistics[0];
        float old_var = params->statistics[1];
        
        params->statistics[0] = params->momentum * old_mean + 
                                (1.0f - params->momentum) * mean;
        params->statistics[1] = params->momentum * old_var + 
                                (1.0f - params->momentum) * variance;
    }
    
    /* Apply data-driven activation */
    for (size_t i = 0; i < size; i++) {
        float normalized = (input[i] - mean) / stddev;
        
        /* Adaptive weight based on statistics */
        float weight = 1.0f;
        if (params->adaptive_weights && i < params->stat_size) {
            weight = params->adaptive_weights[i];
        }
        
        /* Combine base activation with adaptive component */
        float base_act = ddaf_gelu(normalized);
        float adaptive_act = weight * ddaf_swish(normalized);
        
        output[i] = 0.7f * base_act + 0.3f * adaptive_act;
    }
    
    return 0;
}

static int data_driven_backward(ddaf_context_t* ctx, const float* grad_output,
                                float* grad_input, size_t size) {
    ddaf_data_driven_params_t* params = (ddaf_data_driven_params_t*)ctx->params;
    if (!params) return -1;
    
    /* Compute gradient through data-driven activation */
    const float* input = (const float*)ddaf_pool_alloc(ctx->pool, size * sizeof(float));
    if (!input) return -1;
    
    /* Simplified backward pass */
    for (size_t i = 0; i < size; i++) {
        float weight = 1.0f;
        if (params->adaptive_weights && i < params->stat_size) {
            weight = params->adaptive_weights[i];
        }
        
        /* Approximate gradient */
        grad_input[i] = grad_output[i] * (0.7f + 0.3f * weight);
    }
    
    return 0;
}

int ddaf_init_data_driven(ddaf_context_t* ctx, size_t stat_size) {
    if (!ctx) return -1;
    
    size_t param_size = sizeof(ddaf_data_driven_params_t) + 
                        stat_size * sizeof(float) * 2; /* stats + weights */
    
    if (ctx->params) {
        free(ctx->params);
    }
    
    ctx->params = calloc(1, param_size);
    if (!ctx->params) return -1;
    
    ddaf_data_driven_params_t* params = (ddaf_data_driven_params_t*)ctx->params;
    params->stat_size = stat_size;
    params->momentum = 0.9f;
    params->learning_rate = 0.001f;
    
    params->statistics = (float*)((char*)params + sizeof(ddaf_data_driven_params_t));
    params->adaptive_weights = params->statistics + stat_size;
    
    /* Initialize weights */
    for (size_t i = 0; i < stat_size; i++) {
        params->adaptive_weights[i] = 1.0f;
    }
    
    ctx->forward = data_driven_forward;
    ctx->backward = data_driven_backward;
    
    return 0;
}
