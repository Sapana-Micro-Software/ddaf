/*
 * Copyright (C) 2025, Shyamal Suhana Chandra
 * 
 * Example usage of DDAF with Transformer
 */

#include "ddaf.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    /* Create Transformer context with attention-based activation */
    ddaf_context_t* ctx = ddaf_create_context(DDAF_TYPE_ATTENTION, 
                                              DDAF_ARCH_TRANSFORMER, 0);
    if (!ctx) {
        fprintf(stderr, "Failed to create context\n");
        return 1;
    }
    
    /* Initialize Transformer: 512 dim, 8 heads, 128 sequence length */
    if (ddaf_transformer_init(ctx, 512, 8, 128) != 0) {
        fprintf(stderr, "Failed to initialize Transformer\n");
        ddaf_destroy_context(ctx);
        return 1;
    }
    
    /* Create input data */
    size_t d_model = 512;
    size_t seq_len = 128;
    size_t input_size = d_model * seq_len;
    float* input = (float*)malloc(input_size * sizeof(float));
    float* output = (float*)malloc(input_size * sizeof(float));
    
    if (!input || !output) {
        fprintf(stderr, "Failed to allocate memory\n");
        free(input);
        free(output);
        ddaf_destroy_context(ctx);
        return 1;
    }
    
    /* Initialize input */
    for (size_t i = 0; i < input_size; i++) {
        input[i] = ((float)rand() / RAND_MAX) * 2.0f - 1.0f;
    }
    
    /* Forward pass */
    if (ddaf_forward(ctx, input, output, input_size) != 0) {
        fprintf(stderr, "Forward pass failed\n");
        free(input);
        free(output);
        ddaf_destroy_context(ctx);
        return 1;
    }
    
    printf("Transformer forward pass completed successfully\n");
    printf("Input size: %zu\n", input_size);
    printf("Output sample: [%.3f, %.3f, %.3f]\n", 
           output[0], output[1], output[2]);
    
    /* Backward pass */
    float* grad_output = (float*)malloc(input_size * sizeof(float));
    float* grad_input = (float*)malloc(input_size * sizeof(float));
    
    if (!grad_output || !grad_input) {
        fprintf(stderr, "Failed to allocate gradient memory\n");
        free(input);
        free(output);
        free(grad_output);
        free(grad_input);
        ddaf_destroy_context(ctx);
        return 1;
    }
    
    for (size_t i = 0; i < input_size; i++) {
        grad_output[i] = 1.0f;
    }
    
    if (ddaf_backward(ctx, grad_output, grad_input, input_size) != 0) {
        fprintf(stderr, "Backward pass failed\n");
    } else {
        printf("Transformer backward pass completed successfully\n");
    }
    
    /* Cleanup */
    free(input);
    free(output);
    free(grad_output);
    free(grad_input);
    ddaf_destroy_context(ctx);
    
    return 0;
}
