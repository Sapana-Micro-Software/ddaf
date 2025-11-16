// Main Charts Initialization with Enhanced SVG Support
// Copyright (C) 2025, Shyamal Suhana Chandra

import { ChartRenderer } from './chart-renderer';
import { SVGUtils } from './svg-utils';
import { ChartConfig } from './types';

// Re-export existing chart functions to maintain compatibility
declare const createBenchmarkBarChart: (containerId: string, config: ChartConfig) => void;
declare const createD3BenchmarkChart: (container: HTMLElement, config: ChartConfig) => void;
declare const initD3Charts: () => void;
declare const initSVGDiagrams: () => void;
declare const initActivationFunctionPlots: () => void;

/**
 * Enhanced chart initialization with SVG verification
 */
export function initializeAllChartsEnhanced(): void {
    // Check if D3.js is loaded
    if (typeof window.d3 === 'undefined' && typeof (window as any).d3 === 'undefined') {
        console.warn('D3.js not loaded, using fallback SVG generation');
        initFallbackCharts();
    } else {
        console.log('D3.js loaded successfully, initializing charts...');
        if (typeof initD3Charts === 'function') {
            initD3Charts();
        }
    }

    if (typeof initSVGDiagrams === 'function') {
        initSVGDiagrams();
    }
    if (typeof initActivationFunctionPlots === 'function') {
        initActivationFunctionPlots();
    }
    
    initBenchmarkChartsEnhanced();
    setupTabChartReinitialization();
    
    // Verify all charts were created after a delay
    setTimeout(() => {
        verifyAllSVGs();
    }, 1000);
}

/**
 * Enhanced benchmark charts initialization
 */
function initBenchmarkChartsEnhanced(): void {
    createBenchmarkSVGChartsEnhanced();
    
    // Use IntersectionObserver to reinitialize charts when they become visible
    const chartContainers = document.querySelectorAll('[id$="-chart"], [id$="-plot"]');
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting && entry.target.innerHTML.trim() === '') {
                const containerId = entry.target.id;
                console.log('Reinitializing chart: ' + containerId);
                
                setTimeout(function() {
                    createBenchmarkSVGChartsEnhanced();
                }, 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    chartContainers.forEach(function(container) {
        observer.observe(container);
    });
}

/**
 * Create all benchmark charts with enhanced SVG support
 */
function createBenchmarkSVGChartsEnhanced(): void {
    const charts: Array<{ id: string; config: ChartConfig }> = [
        // Accuracy Tab Charts
        {
            id: 'imagenet-chart',
            config: {
                labels: ['ReLU', 'GELU', 'Swish', 'Mish', 'PReLU', 'Adaptive', 'DDAF'],
                values: [76.13, 77.84, 78.92, 79.42, 77.18, 80.67, 83.42],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'Top-1 Accuracy (%)',
                maxValue: 100
            }
        },
        {
            id: 'cifar10-chart',
            config: {
                labels: ['ReLU', 'GELU', 'Swish', 'Adaptive', 'DDAF'],
                values: [92.34, 93.12, 93.68, 94.18, 96.08],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'Test Accuracy (%)',
                maxValue: 100
            }
        },
        {
            id: 'glue-chart',
            config: {
                labels: ['GELU', 'Swish', 'Adaptive', 'DDAF'],
                values: [78.52, 79.14, 80.28, 82.67],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'Average GLUE Score',
                maxValue: 100
            }
        },
        {
            id: 'cifar100-chart',
            config: {
                labels: ['ReLU', 'GELU', 'Swish', 'Mish', 'Adaptive', 'DDAF'],
                values: [68.42, 69.87, 70.56, 71.23, 71.94, 74.23],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'Test Accuracy (%)',
                maxValue: 100
            }
        },
        {
            id: 'squad-chart',
            config: {
                labels: ['GELU', 'Swish', 'Adaptive', 'DDAF'],
                values: [76.83, 77.42, 78.91, 80.34],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'F1 Score',
                maxValue: 100
            }
        },
        // Speed Tab Charts
        {
            id: 'inference-speed-chart',
            config: {
                labels: ['ReLU', 'GELU', 'Swish', 'Mish', 'Adaptive', 'DDAF'],
                values: [1247, 1172, 1110, 1084, 1023, 1135],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'Images/sec',
                maxValue: 1300,
                formatValue: (v) => v.toLocaleString() + ' img/s'
            }
        },
        {
            id: 'training-throughput-chart',
            config: {
                labels: ['ReLU', 'GELU', 'Swish', 'Adaptive', 'DDAF'],
                values: [892, 834, 789, 745, 794],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'Samples/sec',
                maxValue: 1000,
                formatValue: (v) => v.toLocaleString() + ' samples/s'
            }
        },
        // Memory Tab Charts
        {
            id: 'memory-usage-chart',
            config: {
                labels: ['ReLU', 'GELU', 'Swish', 'Adaptive', 'DDAF'],
                values: [8.2, 8.4, 8.6, 9.1, 9.0],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'Peak Memory (GB)',
                maxValue: 10,
                formatValue: (v) => v.toFixed(1) + ' GB'
            }
        },
        {
            id: 'memory-efficiency-chart',
            config: {
                labels: ['ReLU', 'GELU', 'Swish', 'Adaptive', 'DDAF'],
                values: [0, 0, 0, 20480, 12800],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'Additional Parameters',
                maxValue: 25000,
                formatValue: (v) => v.toLocaleString()
            }
        },
        // Training Time Tab Charts
        {
            id: 'time-to-target-chart',
            config: {
                labels: ['ReLU', 'GELU', 'Swish', 'Adaptive', 'DDAF'],
                values: [12.3, 11.8, 11.2, 10.9, 10.5],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'Time (hours)',
                maxValue: 15,
                formatValue: (v) => v.toFixed(1) + ' hrs',
                lowerIsBetter: true
            }
        },
        {
            id: 'total-training-time-chart',
            config: {
                labels: ['ReLU', 'GELU', 'Swish', 'Adaptive', 'DDAF'],
                values: [45.2, 46.8, 48.1, 49.5, 48.8],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'Time (hours)',
                maxValue: 55,
                formatValue: (v) => v.toFixed(1) + ' hrs'
            }
        },
        // Convergence Tab Charts
        {
            id: 'epochs-convergence-chart',
            config: {
                labels: ['ReLU', 'GELU', 'Swish', 'Adaptive', 'DDAF'],
                values: [78, 72, 68, 65, 61],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'Epochs',
                maxValue: 90,
                formatValue: (v) => Math.round(v).toString(),
                lowerIsBetter: true
            }
        },
        {
            id: 'final-loss-chart',
            config: {
                labels: ['ReLU', 'GELU', 'Swish', 'Adaptive', 'DDAF'],
                values: [1.247, 1.198, 1.162, 1.109, 1.062],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'Cross-entropy Loss',
                maxValue: 1.3,
                formatValue: (v) => v.toFixed(3),
                lowerIsBetter: true
            }
        }
    ];

    charts.forEach(function({ id, config }) {
        try {
            // Try using enhanced renderer first
            ChartRenderer.renderBarChart(id, config);
            
            // Verify SVG was created
            if (!ChartRenderer.verifySVG(id)) {
                console.warn(`SVG verification failed for ${id}, trying fallback...`);
                // Fallback to existing function if available
                if (typeof createBenchmarkBarChart === 'function') {
                    createBenchmarkBarChart(id, config);
                }
            }
        } catch (error) {
            console.error('Error rendering chart ' + id + ':', error);
            // Fallback to existing function
            if (typeof createBenchmarkBarChart === 'function') {
                createBenchmarkBarChart(id, config);
            }
        }
    });
}

/**
 * Setup chart reinitialization when tabs are switched
 */
function setupTabChartReinitialization(): void {
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            setTimeout(function() {
                createBenchmarkSVGChartsEnhanced();
                if (typeof initD3Charts === 'function') {
                    initD3Charts();
                }
                verifyAllSVGs();
            }, 300);
        });
    });
}

/**
 * Verify all SVGs are rendered correctly
 */
function verifyAllSVGs(): void {
    const requiredCharts = [
        'imagenet-chart', 'cifar10-chart', 'glue-chart', 'cifar100-chart', 'squad-chart',
        'inference-speed-chart', 'training-throughput-chart',
        'memory-usage-chart', 'memory-efficiency-chart',
        'time-to-target-chart', 'total-training-time-chart',
        'epochs-convergence-chart', 'final-loss-chart',
        'performance-line-chart', 'comparison-bar-chart',
        'accuracy-scatter-plot', 'training-curve-chart',
        'relu-plot', 'gelu-plot', 'swish-plot', 'ddaf-plot',
        'benchmark-bar-chart',
        'architecture-diagram', 'data-flow-diagram', 'network-diagram'
    ];
    
    const missingCharts: string[] = [];
    let createdCharts = 0;
    
    requiredCharts.forEach(function(chartId) {
        const verified = ChartRenderer.verifySVG(chartId);
        if (!verified) {
            const container = document.getElementById(chartId);
            if (!container) {
                missingCharts.push(chartId + ' (container not found)');
            } else if (container.innerHTML.trim() === '') {
                missingCharts.push(chartId + ' (empty)');
            } else {
                missingCharts.push(chartId + ' (SVG invalid)');
            }
        } else {
            createdCharts++;
        }
    });
    
    if (missingCharts.length > 0) {
        console.warn('Some charts are missing or invalid:', missingCharts);
        // Retry creating missing charts
        setTimeout(function() {
            createBenchmarkSVGChartsEnhanced();
        }, 500);
    } else {
        console.log('✅ All ' + createdCharts + ' charts created successfully with valid SVGs!');
    }
}

/**
 * Fallback charts initialization
 */
function initFallbackCharts(): void {
    // This will be handled by the existing charts.js file
    if (typeof (window as any).initFallbackCharts === 'function') {
        (window as any).initFallbackCharts();
    }
}

// Export for global access
(window as any).initializeAllChartsEnhanced = initializeAllChartsEnhanced;
(window as any).ChartRenderer = ChartRenderer;
if (typeof SVGUtils !== 'undefined') {
    (window as any).SVGUtils = SVGUtils;
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() {
            initializeAllChartsEnhanced();
        }, 100);
    });
} else {
    setTimeout(function() {
        initializeAllChartsEnhanced();
    }, 100);
}

// Also try on window load
window.addEventListener('load', function() {
    setTimeout(function() {
        const existingCharts = document.querySelectorAll('svg.chart-svg, svg.diagram-svg, svg.plot-svg');
        if (existingCharts.length === 0) {
            console.log('Reinitializing charts on window load...');
            initializeAllChartsEnhanced();
        }
    }, 200);
});
