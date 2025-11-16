# DDAF: Data-Driven, Dynamic, Online, and Attention-Based Activation Functions

Copyright (C) 2025, Shyamal Suhana Chandra

## Overview

DDAF is a comprehensive C/C++ library implementing adaptive activation functions for deep neural networks. It supports four types of activation functions:

- **Data-Driven**: Adapts based on input data statistics
- **Dynamic**: Parameters evolve over time during training
- **Online**: Real-time adaptation to streaming data
- **Attention-Based**: Uses attention mechanisms to weight activations

## Supported Architectures

- Convolutional Neural Networks (CNNs)
- Recurrent Neural Networks (RNNs)
- Long Short-Term Memory (LSTMs)
- Gated Recurrent Units (GRUs)
- Transformers
- Hierarchical Transformers
- Big Bird
- Mixture of Experts (MoE)

## Building

### Requirements

- CMake 3.12 or higher
- C11 compatible compiler
- C++17 compatible compiler

### Build Instructions

```bash
mkdir build
cd build
cmake ..
make
```

This will create:
- Static library: `libddaf_static.a`
- Shared library: `libddaf_shared.so` (or `.dylib` on macOS)
- Example executables in `examples/`

## Usage

Include the header file:

```c
#include "ddaf.h"
```

Basic example:

```c
// Create context
ddaf_context_t* ctx = ddaf_create_context(
    DDAF_TYPE_DATA_DRIVEN, 
    DDAF_ARCH_CNN, 
    0
);

// Initialize
ddaf_cnn_init(ctx, 64, 32, 32);

// Forward pass
ddaf_forward(ctx, input, output, size);

// Backward pass
ddaf_backward(ctx, grad_output, grad_input, size);

// Cleanup
ddaf_destroy_context(ctx);
```

See `examples/` directory for more complete examples.

## Documentation

See `docs/` directory for:
- `paper.tex`: Research paper
- `presentation.tex`: Beamer presentation
- `reference_manual.tex`: Complete API reference

## License

Copyright (C) 2025, Shyamal Suhana Chandra

All rights reserved.
