/*
 * Copyright (C) 2025, Shyamal Suhana Chandra
 * 
 * Example usage of DDAF with CNN
 */

#include "ddaf.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    /* Create CNN context with data-driven activation */
    ddaf_context_t* ctx = ddaf_create_context(DDAF_TYPE_DATA_DRIVEN, 
                                              DDAF_ARCH_CNN, 0);
    if (!ctx) {
        fprintf(stderr, "Failed to create context\n");
        return 1;
    }
    
    /* Initialize CNN: 64 channels, 32x32 feature map */
    if (ddaf_cnn_init(ctx, 64, 32, 32) != 0) {
        fprintf(stderr, "Failed to initialize CNN\n");
        ddaf_destroy_context(ctx);
        return 1;
    }
    
    /* Create input data */
    size_t input_size = 64 * 32 * 32;
    float* input = (float*)malloc(input_size * sizeof(float));
    float* output = (float*)malloc(input_size * sizeof(float));
    
    if (!input || !output) {
        fprintf(stderr, "Failed to allocate memory\n");
        free(input);
        free(output);
        ddaf_destroy_context(ctx);
        return 1;
    }
    
    /* Initialize input with random values */
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
    
    printf("CNN forward pass completed successfully\n");
    printf("Input range: [%.3f, %.3f]\n", input[0], input[input_size-1]);
    printf("Output range: [%.3f, %.3f]\n", output[0], output[input_size-1]);
    
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
    
    /* Initialize gradient */
    for (size_t i = 0; i < input_size; i++) {
        grad_output[i] = 1.0f;
    }
    
    if (ddaf_backward(ctx, grad_output, grad_input, input_size) != 0) {
        fprintf(stderr, "Backward pass failed\n");
    } else {
        printf("CNN backward pass completed successfully\n");
    }
    
    /* Cleanup */
    free(input);
    free(output);
    free(grad_output);
    free(grad_input);
    ddaf_destroy_context(ctx);
    
    return 0;
}
