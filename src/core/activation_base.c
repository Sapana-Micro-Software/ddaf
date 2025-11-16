/*
 * Copyright (C) 2025, Shyamal Suhana Chandra
 * 
 * Base activation function implementation
 */

#include "ddaf.h"
#include "ddaf_internal.h"
#include <stdlib.h>
#include <string.h>

ddaf_context_t* ddaf_create_context(ddaf_type_t type, ddaf_arch_t arch, 
                                     size_t param_size) {
    ddaf_context_t* ctx = (ddaf_context_t*)calloc(1, sizeof(ddaf_context_t));
    if (!ctx) return NULL;
    
    ctx->type = type;
    ctx->arch = arch;
    ctx->requires_grad = true;
    
    if (param_size > 0) {
        ctx->params = calloc(1, param_size);
        if (!ctx->params) {
            free(ctx);
            return NULL;
        }
    }
    
    ctx->pool = ddaf_create_pool(1024 * 1024); /* 1MB default pool */
    if (!ctx->pool) {
        free(ctx->params);
        free(ctx);
        return NULL;
    }
    
    return ctx;
}

void ddaf_destroy_context(ddaf_context_t* ctx) {
    if (!ctx) return;
    
    if (ctx->params) {
        free(ctx->params);
    }
    
    if (ctx->pool) {
        ddaf_destroy_pool(ctx->pool);
    }
    
    free(ctx);
}

int ddaf_forward(ddaf_context_t* ctx, const float* input, float* output, 
                 size_t size) {
    if (!ctx || !input || !output || size == 0) return -1;
    if (!ctx->forward) return -1;
    
    return ctx->forward(ctx, input, output, size);
}

int ddaf_backward(ddaf_context_t* ctx, const float* grad_output, 
                  float* grad_input, size_t size) {
    if (!ctx || !grad_output || !grad_input || size == 0) return -1;
    if (!ctx->backward) return -1;
    
    return ctx->backward(ctx, grad_output, grad_input, size);
}
