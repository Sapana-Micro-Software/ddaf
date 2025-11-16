cmake_minimum_required(VERSION 3.12)
project(ddaf VERSION 1.0.0 LANGUAGES C CXX)

set(CMAKE_C_STANDARD 11)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_C_STANDARD_REQUIRED ON)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Include directories
include_directories(include src)

# Source files
set(CORE_SOURCES
    src/core/activation_base.c
    src/core/data_driven_activation.c
    src/core/dynamic_activation.c
    src/core/online_activation.c
    src/core/attention_activation.c
    src/core/memory_pool.c
)

set(ARCH_SOURCES
    src/architectures/cnn_activation.c
    src/architectures/rnn_activation.c
    src/architectures/lstm_activation.c
    src/architectures/gru_activation.c
    src/architectures/transformer_activation.c
    src/architectures/hierarchical_transformer.c
    src/architectures/bigbird_activation.c
    src/architectures/moe_activation.c
)

set(ALL_SOURCES ${CORE_SOURCES} ${ARCH_SOURCES})

# Create static library
add_library(ddaf_static STATIC ${ALL_SOURCES})
target_include_directories(ddaf_static PUBLIC include)

# Create shared library
add_library(ddaf_shared SHARED ${ALL_SOURCES})
target_include_directories(ddaf_shared PUBLIC include)
set_target_properties(ddaf_shared PROPERTIES
    VERSION ${PROJECT_VERSION}
    SOVERSION ${PROJECT_VERSION_MAJOR}
)

# Example programs
add_executable(cnn_example examples/cnn_example.c)
target_link_libraries(cnn_example ddaf_static)

add_executable(transformer_example examples/transformer_example.c)
target_link_libraries(transformer_example ddaf_static)

# Installation
install(TARGETS ddaf_static ddaf_shared
    LIBRARY DESTINATION lib
    ARCHIVE DESTINATION lib
)
install(DIRECTORY include/ DESTINATION include)
