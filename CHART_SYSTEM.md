# DDAF Chart System Documentation

## Overview
Complete chart system with TypeScript, Node.js, AJAX, and comprehensive SVG rendering for all benchmarks, diagrams, and graphs.

## Architecture

### JavaScript Files
1. **main.js** - Core functionality, tab switching, animations
2. **charts.js** - Primary chart rendering (all 13 benchmark charts)
3. **charts-enhanced.js** - TypeScript-compiled enhanced charts
4. **dynamic-charts.js** - AJAX-based dynamic chart loading

### TypeScript Source Files
- `src/ts/types.ts` - Type definitions
- `src/ts/svg-utils.ts` - SVG utility functions
- `src/ts/chart-renderer.ts` - Enhanced chart renderer
- `src/ts/chart-data.ts` - Chart data management with AJAX
- `src/ts/charts.ts` - Main chart initialization
- `src/ts/dynamic-charts.ts` - Dynamic loading system
- `src/ts/chart-initializer.ts` - Comprehensive initialization
- `src/ts/chart-tester.ts` - Testing and verification

## All Charts

### Benchmark Charts (13 total)
1. **Accuracy Tab (5 charts)**
   - ImageNet Classification (ResNet-50)
   - CIFAR-10 Classification (ResNet-32)
   - GLUE Benchmark (BERT-base)
   - CIFAR-100 Classification (ResNet-32)
   - SQuAD v2.0 Question Answering (BERT-base)

2. **Speed Tab (2 charts)**
   - Inference Speed (Images/sec)
   - Training Throughput (Samples/sec)

3. **Memory Tab (2 charts)**
   - Peak Memory Usage
   - Memory Efficiency (Parameters Overhead)

4. **Training Time Tab (2 charts)**
   - Time to Target Accuracy
   - Total Training Time

5. **Convergence Tab (2 charts)**
   - Epochs to Convergence
   - Final Training Loss

### Visualization Charts (9 total)
- Performance Line Chart
- Comparison Bar Chart
- Accuracy Scatter Plot
- Training Curve Chart
- Architecture Diagram
- Data Flow Diagram
- Network Diagram
- Activation Function Plots (ReLU, GELU, Swish, DDAF)
- Benchmark Bar Chart

## Tab Buttons

All 5 tab buttons are fully functional:
- 🎯 Accuracy
- ⚡ Speed
- 💾 Memory
- ⏱️ Training Time
- 📈 Convergence

## Initialization Flow

1. **DOM Ready** → Load all scripts
2. **charts.js** → Initialize benchmark charts
3. **main.js** → Setup tab buttons
4. **charts-enhanced.js** → Enhanced TypeScript charts
5. **dynamic-charts.js** → AJAX data loading
6. **chart-initializer.ts** → Comprehensive initialization
7. **chart-tester.ts** → Verify all components

## Features

✅ All 13 benchmark charts render as SVG
✅ All 5 tab buttons work and switch correctly
✅ Charts re-render when tabs are switched
✅ All diagrams render correctly
✅ All graphs render correctly
✅ Lazy loading for hidden charts
✅ Error handling and fallbacks
✅ Browser compatibility (Safari, Chrome, Firefox)
✅ Dark mode support
✅ Responsive design

## Testing

Open browser console to see:
- Chart initialization logs
- Test results
- Final verification status
- Any errors or warnings

## Build Process

```bash
npm run build  # Compiles TypeScript and bundles
npm run watch  # Development mode with auto-rebuild
```

GitHub Actions automatically:
1. Installs Node.js dependencies
2. Builds TypeScript
3. Builds Jekyll site
4. Deploys to GitHub Pages
