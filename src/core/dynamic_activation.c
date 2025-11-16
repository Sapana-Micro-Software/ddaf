/*
 * Copyright (C) 2025, Shyamal Suhana Chandra
 * 
 * Dynamic activation function implementation
 * Parameters evolve over time during training
 */

#include "ddaf.h"
#include "ddaf_internal.h"
#include <stdlib.h>
#include <string.h>
#include <math.h>

static int dynamic_forward(ddaf_context_t* ctx, const float* input,
                           float* output, size_t size) {
    ddaf_dynamic_params_t* params = (ddaf_dynamic_params_t*)ctx->params;
    if (!params) return -1;
    
    /* Update time-varying parameters */
    for (size_t i = 0; i < params->param_count && i < size; i++) {
        /* Update velocity */
        float gradient = input[i] * 0.01f; /* Simplified gradient */
        params->velocity[i] = params->decay_rate * params->velocity[i] + 
                              params->update_rate * gradient;
        
        /* Update parameters */
        params->time_varying_params[i] += params->velocity[i];
        
        /* Apply bounds */
        params->time_varying_params[i] = DDAF_MAX(-2.0f, 
            DDAF_MIN(2.0f, params->time_varying_params[i]));
    }
    
    /* Apply dynamic activation */
    for (size_t i = 0; i < size; i++) {
        float param = 1.0f;
        if (i < params->param_count) {
            param = params->time_varying_params[i];
        }
        
        /* Dynamic combination of activations */
        float x = input[i];
        float act1 = ddaf_gelu(x * param);
        float act2 = ddaf_swish(x / (1.0f + fabsf(param)));
        
        output[i] = 0.6f * act1 + 0.4f * act2;
    }
    
    return 0;
}

static int dynamic_backward(ddaf_context_t* ctx, const float* grad_output,
                            float* grad_input, size_t size) {
    ddaf_dynamic_params_t* params = (ddaf_dynamic_params_t*)ctx->params;
    if (!params) return -1;
    
    for (size_t i = 0; i < size; i++) {
        float param = 1.0f;
        if (i < params->param_count) {
            param = params->time_varying_params[i];
        }
        
        /* Gradient through dynamic activation */
        float grad_scale = 0.6f * param + 0.4f / (1.0f + fabsf(param));
        grad_input[i] = grad_output[i] * grad_scale;
    }
    
    return 0;
}

int ddaf_init_dynamic(ddaf_context_t* ctx, size_t param_count) {
    if (!ctx) return -1;
    
    size_t param_size = sizeof(ddaf_dynamic_params_t) + 
                        param_count * sizeof(float) * 2; /* params + velocity */
    
    if (ctx->params) {
        free(ctx->params);
    }
    
    ctx->params = calloc(1, param_size);
    if (!ctx->params) return -1;
    
    ddaf_dynamic_params_t* params = (ddaf_dynamic_params_t*)ctx->params;
    params->param_count = param_count;
    params->decay_rate = 0.9f;
    params->update_rate = 0.01f;
    
    params->time_varying_params = (float*)((char*)params + 
                                           sizeof(ddaf_dynamic_params_t));
    params->velocity = params->time_varying_params + param_count;
    
    /* Initialize parameters */
    for (size_t i = 0; i < param_count; i++) {
        params->time_varying_params[i] = 1.0f;
        params->velocity[i] = 0.0f;
    }
    
    ctx->forward = dynamic_forward;
    ctx->backward = dynamic_backward;
    
    return 0;
}
