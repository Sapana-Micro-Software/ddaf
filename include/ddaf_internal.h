/*
 * Copyright (C) 2025, Shyamal Suhana Chandra
 * 
 * Internal header for DDAF implementation
 */

#ifndef DDAF_INTERNAL_H
#define DDAF_INTERNAL_H

#include "ddaf.h"
#include <math.h>
#include <string.h>
#include <stdlib.h>

#define DDAF_EPSILON 1e-8f
#define DDAF_MAX(a, b) ((a) > (b) ? (a) : (b))
#define DDAF_MIN(a, b) ((a) < (b) ? (a) : (b))

/* Data-driven activation parameters */
typedef struct {
    float* statistics;      /* Running statistics */
    float* adaptive_weights; /* Adaptive weights */
    size_t stat_size;
    float momentum;
    float learning_rate;
} ddaf_data_driven_params_t;

/* Dynamic activation parameters */
typedef struct {
    float* time_varying_params; /* Time-varying parameters */
    float* velocity;            /* Parameter velocity */
    size_t param_count;
    float decay_rate;
    float update_rate;
} ddaf_dynamic_params_t;

/* Online activation parameters */
typedef struct {
    float* online_stats;    /* Online statistics */
    float* buffer;          /* Recent samples buffer */
    size_t buffer_size;
    size_t buffer_idx;
    float forgetting_factor;
} ddaf_online_params_t;

/* Attention activation parameters */
typedef struct {
    float* query;           /* Query vectors */
    float* key;             /* Key vectors */
    float* value;            /* Value vectors */
    float* attention_weights; /* Attention weights */
    size_t d_model;
    size_t n_heads;
    size_t seq_len;
    float temperature;
} ddaf_attention_params_t;

/* Helper functions */
static inline float ddaf_sigmoid(float x) {
    return 1.0f / (1.0f + expf(-x));
}

static inline float ddaf_tanh(float x) {
    return tanhf(x);
}

static inline float ddaf_relu(float x) {
    return DDAF_MAX(0.0f, x);
}

static inline float ddaf_gelu(float x) {
    return 0.5f * x * (1.0f + tanhf(sqrtf(2.0f / M_PI) * (x + 0.044715f * x * x * x)));
}

static inline float ddaf_swish(float x) {
    return x * ddaf_sigmoid(x);
}

#endif /* DDAF_INTERNAL_H */
