/*
 * Copyright (C) 2025, Shyamal Suhana Chandra
 * 
 * Data-Driven, Dynamic, Online, and Attention-Based Activation Functions
 * Main header file
 */

#ifndef DDAF_H
#define DDAF_H

#include <stddef.h>
#include <stdint.h>
#include <stdbool.h>

#ifdef __cplusplus
extern "C" {
#endif

/* Forward declarations */
typedef struct ddaf_context ddaf_context_t;
typedef struct ddaf_activation ddaf_activation_t;
typedef struct ddaf_memory_pool ddaf_memory_pool_t;

/* Activation function types */
typedef enum {
    DDAF_TYPE_DATA_DRIVEN = 0,
    DDAF_TYPE_DYNAMIC,
    DDAF_TYPE_ONLINE,
    DDAF_TYPE_ATTENTION
} ddaf_type_t;

/* Architecture types */
typedef enum {
    DDAF_ARCH_CNN = 0,
    DDAF_ARCH_RNN,
    DDAF_ARCH_LSTM,
    DDAF_ARCH_GRU,
    DDAF_ARCH_TRANSFORMER,
    DDAF_ARCH_HIERARCHICAL_TRANSFORMER,
    DDAF_ARCH_BIGBIRD,
    DDAF_ARCH_MOE
} ddaf_arch_t;

/* Activation function pointer */
typedef float (*ddaf_activation_fn)(float x, void* params);

/* Forward pass function */
typedef int (*ddaf_forward_fn)(ddaf_context_t* ctx, const float* input, 
                               float* output, size_t size);

/* Backward pass function */
typedef int (*ddaf_backward_fn)(ddaf_context_t* ctx, const float* grad_output,
                                float* grad_input, size_t size);

/* Context structure */
struct ddaf_context {
    ddaf_type_t type;
    ddaf_arch_t arch;
    void* params;
    ddaf_forward_fn forward;
    ddaf_backward_fn backward;
    ddaf_memory_pool_t* pool;
    bool requires_grad;
};

/* Memory pool structure */
struct ddaf_memory_pool {
    void* buffer;
    size_t size;
    size_t used;
    bool owns_buffer;
};

/* Core API */
ddaf_context_t* ddaf_create_context(ddaf_type_t type, ddaf_arch_t arch, 
                                     size_t param_size);
void ddaf_destroy_context(ddaf_context_t* ctx);

/* Memory management */
ddaf_memory_pool_t* ddaf_create_pool(size_t size);
void ddaf_destroy_pool(ddaf_memory_pool_t* pool);
void* ddaf_pool_alloc(ddaf_memory_pool_t* pool, size_t size);
void ddaf_pool_reset(ddaf_memory_pool_t* pool);

/* Activation functions */
int ddaf_forward(ddaf_context_t* ctx, const float* input, float* output, 
                 size_t size);
int ddaf_backward(ddaf_context_t* ctx, const float* grad_output, 
                  float* grad_input, size_t size);

/* Core activation type initialization */
int ddaf_init_data_driven(ddaf_context_t* ctx, size_t stat_size);
int ddaf_init_dynamic(ddaf_context_t* ctx, size_t param_count);
int ddaf_init_online(ddaf_context_t* ctx, size_t buffer_size);
int ddaf_init_attention(ddaf_context_t* ctx, size_t d_model, size_t n_heads,
                        size_t seq_len);

/* Architecture-specific APIs */
int ddaf_cnn_init(ddaf_context_t* ctx, size_t channels, size_t height, 
                  size_t width);
int ddaf_rnn_init(ddaf_context_t* ctx, size_t hidden_size, size_t seq_len);
int ddaf_lstm_init(ddaf_context_t* ctx, size_t hidden_size, size_t seq_len);
int ddaf_gru_init(ddaf_context_t* ctx, size_t hidden_size, size_t seq_len);
int ddaf_transformer_init(ddaf_context_t* ctx, size_t d_model, size_t n_heads,
                          size_t seq_len);
int ddaf_hierarchical_transformer_init(ddaf_context_t* ctx, size_t d_model,
                                       size_t n_heads, size_t n_levels);
int ddaf_bigbird_init(ddaf_context_t* ctx, size_t d_model, size_t n_heads,
                      size_t seq_len, size_t block_size);
int ddaf_moe_init(ddaf_context_t* ctx, size_t d_model, size_t n_experts,
                  size_t k_experts);

#ifdef __cplusplus
}
#endif

#endif /* DDAF_H */
