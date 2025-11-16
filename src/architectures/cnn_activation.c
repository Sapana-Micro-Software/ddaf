/*
 * Copyright (C) 2025, Shyamal Suhana Chandra
 * 
 * CNN-specific activation function implementation
 */

#include "ddaf.h"
#include "ddaf_internal.h"
#include <stdlib.h>
#include <string.h>
#include <math.h>

typedef struct {
    size_t channels;
    size_t height;
    size_t width;
    ddaf_context_t* activation_ctx;
} cnn_params_t;

static int cnn_forward(ddaf_context_t* ctx, const float* input,
                       float* output, size_t size) {
    cnn_params_t* params = (cnn_params_t*)ctx->params;
    if (!params || !params->activation_ctx) return -1;
    
    /* Apply activation function to CNN feature maps */
    return ddaf_forward(params->activation_ctx, input, output, size);
}

static int cnn_backward(ddaf_context_t* ctx, const float* grad_output,
                        float* grad_input, size_t size) {
    cnn_params_t* params = (cnn_params_t*)ctx->params;
    if (!params || !params->activation_ctx) return -1;
    
    return ddaf_backward(params->activation_ctx, grad_output, grad_input, size);
}

int ddaf_cnn_init(ddaf_context_t* ctx, size_t channels, size_t height, 
                  size_t width) {
    if (!ctx) return -1;
    
    size_t param_size = sizeof(cnn_params_t);
    if (ctx->params) {
        free(ctx->params);
    }
    
    ctx->params = calloc(1, param_size);
    if (!ctx->params) return -1;
    
    cnn_params_t* params = (cnn_params_t*)ctx->params;
    params->channels = channels;
    params->height = height;
    params->width = width;
    
    /* Create activation context based on type */
    size_t feature_size = channels * height * width;
    params->activation_ctx = ddaf_create_context(ctx->type, ctx->arch, 0);
    
    if (!params->activation_ctx) {
        free(ctx->params);
        ctx->params = NULL;
        return -1;
    }
    
    /* Initialize based on activation type */
    switch (ctx->type) {
        case DDAF_TYPE_DATA_DRIVEN:
            ddaf_init_data_driven(params->activation_ctx, feature_size);
            break;
        case DDAF_TYPE_DYNAMIC:
            ddaf_init_dynamic(params->activation_ctx, feature_size);
            break;
        case DDAF_TYPE_ONLINE:
            ddaf_init_online(params->activation_ctx, 100); /* buffer size */
            break;
        case DDAF_TYPE_ATTENTION:
            ddaf_init_attention(params->activation_ctx, channels, 4, 
                               height * width);
            break;
        default:
            free(ctx->params);
            ctx->params = NULL;
            ddaf_destroy_context(params->activation_ctx);
            return -1;
    }
    
    ctx->forward = cnn_forward;
    ctx->backward = cnn_backward;
    
    return 0;
}
