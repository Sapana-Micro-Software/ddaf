/*
 * Copyright (C) 2025, Shyamal Suhana Chandra
 * 
 * Memory pool implementation for efficient allocation
 */

#include "ddaf.h"
#include <stdlib.h>
#include <string.h>

ddaf_memory_pool_t* ddaf_create_pool(size_t size) {
    ddaf_memory_pool_t* pool = (ddaf_memory_pool_t*)malloc(sizeof(ddaf_memory_pool_t));
    if (!pool) return NULL;
    
    pool->buffer = malloc(size);
    if (!pool->buffer) {
        free(pool);
        return NULL;
    }
    
    pool->size = size;
    pool->used = 0;
    pool->owns_buffer = true;
    
    return pool;
}

void ddaf_destroy_pool(ddaf_memory_pool_t* pool) {
    if (!pool) return;
    
    if (pool->owns_buffer && pool->buffer) {
        free(pool->buffer);
    }
    
    free(pool);
}

void* ddaf_pool_alloc(ddaf_memory_pool_t* pool, size_t size) {
    if (!pool || size == 0) return NULL;
    
    /* Align to 8 bytes */
    size = (size + 7) & ~7;
    
    if (pool->used + size > pool->size) {
        return NULL; /* Out of memory */
    }
    
    void* ptr = (char*)pool->buffer + pool->used;
    pool->used += size;
    
    return ptr;
}

void ddaf_pool_reset(ddaf_memory_pool_t* pool) {
    if (pool) {
        pool->used = 0;
    }
}
