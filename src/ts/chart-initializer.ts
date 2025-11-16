// Comprehensive Chart Initialization System
// Ensures all benchmarks, charts, diagrams, and graphs work correctly
// Copyright (C) 2025, Shyamal Suhana Chandra

import { ChartRenderer } from './chart-renderer';
import { ChartDataManager } from './chart-data';

export class ComprehensiveChartInitializer {
    private static initialized = false;
    private static chartsRendered = new Set<string>();

    /**
     * Initialize all charts, diagrams, and graphs
     */
    static async initializeAll(): Promise<void> {
        if (this.initialized) {
            console.log('Charts already initialized, skipping...');
            return;
        }

        console.log('🚀 Starting comprehensive chart initialization...');

        // Step 1: Load chart data
        const chartData = await ChartDataManager.loadChartData();
        console.log('✅ Chart data loaded');

        // Step 2: Initialize tab buttons
        this.initializeTabButtons(chartData);
        console.log('✅ Tab buttons initialized');

        // Step 3: Render all benchmark charts
        this.renderAllBenchmarkCharts(chartData);
        console.log('✅ All benchmark charts rendered');

        // Step 4: Initialize D3.js charts (if available)
        this.initializeD3Charts();
        console.log('✅ D3.js charts initialized');

        // Step 5: Initialize diagrams
        this.initializeDiagrams();
        console.log('✅ Diagrams initialized');

        // Step 6: Setup lazy loading for hidden charts
        this.setupLazyLoading(chartData);
        console.log('✅ Lazy loading setup complete');

        // Step 7: Verify everything is working
        setTimeout(() => {
            this.verifyAllCharts();
        }, 1000);

        this.initialized = true;
        console.log('🎉 Comprehensive chart initialization complete!');
    }

    /**
     * Initialize tab buttons with proper event handlers
     */
    private static initializeTabButtons(chartData: any): void {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(function(button) {
            // Remove any existing listeners by cloning
            const newButton = button.cloneNode(true);
            button.parentNode?.replaceChild(newButton, button);

            newButton.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                if (!targetTab) return;

                // Update button states
                tabButtons.forEach(function(btn) {
                    btn.classList.remove('active');
                    btn.classList.remove('bg-gradient-to-r', 'from-primary-600', 'to-purple-600', 'text-white', 'shadow-lg', 'shadow-primary-500/50');
                    btn.classList.add('bg-white', 'border-2', 'border-primary-200', 'text-gray-700');
                });

                this.classList.add('active');
                this.classList.remove('bg-white', 'border-2', 'border-primary-200', 'text-gray-700');
                this.classList.add('bg-gradient-to-r', 'from-primary-600', 'to-purple-600', 'text-white', 'shadow-lg', 'shadow-primary-500/50');

                // Update tab content visibility
                tabContents.forEach(function(content) {
                    const htmlContent = content as HTMLElement;
                    htmlContent.classList.remove('active');
                    htmlContent.style.opacity = '0';
                    htmlContent.style.display = 'none';
                });

                const targetContent = document.getElementById(targetTab + '-tab') as HTMLElement;
                if (targetContent) {
                    targetContent.classList.add('active');
                    targetContent.style.display = 'block';
                    setTimeout(function() {
                        targetContent.style.opacity = '1';
                        // Render charts for this tab
                        ComprehensiveChartInitializer.renderTabCharts(targetTab, chartData);
                    }, 100);
                }
            });
        });
    }

    /**
     * Render all benchmark charts
     */
    private static renderAllBenchmarkCharts(chartData: any): void {
        // Always use original charts.js function - it has all the chart configurations
        if (typeof (window as any).createBenchmarkSVGCharts === 'function') {
            (window as any).createBenchmarkSVGCharts();
            console.log('✅ Rendered all benchmark charts using charts.js');
            // Mark all charts as rendered
            const chartIds = [
                'imagenet-chart', 'cifar10-chart', 'glue-chart', 'cifar100-chart', 'squad-chart',
                'inference-speed-chart', 'training-throughput-chart',
                'memory-usage-chart', 'memory-efficiency-chart',
                'time-to-target-chart', 'total-training-time-chart',
                'epochs-convergence-chart', 'final-loss-chart'
            ];
            chartIds.forEach(function(id) {
                ComprehensiveChartInitializer.chartsRendered.add(id);
            });
            return;
        }

        // Fallback to TypeScript ChartRenderer
        const chartMap: { [key: string]: string } = {
            'imagenet-chart': 'imagenet',
            'cifar10-chart': 'cifar10',
            'glue-chart': 'glue',
            'cifar100-chart': 'cifar100',
            'squad-chart': 'squad',
            'inference-speed-chart': 'inferenceSpeed',
            'training-throughput-chart': 'trainingThroughput',
            'memory-usage-chart': 'memoryUsage',
            'memory-efficiency-chart': 'memoryEfficiency',
            'time-to-target-chart': 'timeToTarget',
            'total-training-time-chart': 'totalTrainingTime',
            'epochs-convergence-chart': 'epochsConvergence',
            'final-loss-chart': 'finalLoss'
        };

        Object.keys(chartMap).forEach(function(containerId) {
            const container = document.getElementById(containerId);
            if (container) {
                const configKey = chartMap[containerId];
                const config = chartData[configKey];
                if (config) {
                    try {
                        if (typeof ChartRenderer !== 'undefined' && ChartRenderer.renderBarChart) {
                            ChartRenderer.renderBarChart(containerId, config);
                            ComprehensiveChartInitializer.chartsRendered.add(containerId);
                        } else if (typeof (window as any).createBenchmarkBarChart === 'function') {
                            (window as any).createBenchmarkBarChart(containerId, config);
                            ComprehensiveChartInitializer.chartsRendered.add(containerId);
                        }
                    } catch (error) {
                        console.error('Error rendering ' + containerId + ':', error);
                    }
                }
            }
        });
    }

    /**
     * Render charts for a specific tab
     */
    private static renderTabCharts(tabName: string, chartData: any): void {
        // Re-render all charts when tab switches (charts.js handles this)
        if (typeof (window as any).createBenchmarkSVGCharts === 'function') {
            setTimeout(function() {
                (window as any).createBenchmarkSVGCharts();
            }, 200);
        }
    }

    /**
     * Initialize D3.js charts
     */
    private static initializeD3Charts(): void {
        // Wait a bit for D3 and chart functions to be ready
        setTimeout(function() {
            // Try enhanced TypeScript functions first
            if (typeof (window as any).initD3Charts === 'function') {
                (window as any).initD3Charts();
            }
            
            // Try original charts.js functions
            if (typeof (window as any).createPerformanceLineChart === 'function') {
                (window as any).createPerformanceLineChart();
            }
            if (typeof (window as any).createComparisonBarChart === 'function') {
                (window as any).createComparisonBarChart();
            }
            if (typeof (window as any).createAccuracyScatterPlot === 'function') {
                (window as any).createAccuracyScatterPlot();
            }
            if (typeof (window as any).createTrainingCurveChart === 'function') {
                (window as any).createTrainingCurveChart();
            }
        }, 500);
    }

    /**
     * Initialize diagrams
     */
    private static initializeDiagrams(): void {
        // Wait for diagram functions to be available
        setTimeout(function() {
            // Try enhanced TypeScript functions first
            if (typeof (window as any).initSVGDiagrams === 'function') {
                (window as any).initSVGDiagrams();
            }
            
            // Try original charts.js functions
            if (typeof (window as any).createArchitectureDiagram === 'function') {
                (window as any).createArchitectureDiagram();
            }
            if (typeof (window as any).createDataFlowDiagram === 'function') {
                (window as any).createDataFlowDiagram();
            }
            if (typeof (window as any).createNetworkDiagram === 'function') {
                (window as any).createNetworkDiagram();
            }
            
            // Also try activation function plots
            if (typeof (window as any).initActivationFunctionPlots === 'function') {
                (window as any).initActivationFunctionPlots();
            }
        }, 500);
    }

    /**
     * Setup lazy loading for charts
     */
    private static setupLazyLoading(chartData: any): void {
        const chartContainers = document.querySelectorAll('[id$="-chart"], [id$="-plot"]');
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const containerId = entry.target.id;
                    if (!ComprehensiveChartInitializer.chartsRendered.has(containerId)) {
                        const container = entry.target as HTMLElement;
                        const svg = container.querySelector('svg');
                        if (!svg || svg.children.length === 0) {
                            ComprehensiveChartInitializer.renderSingleChart(containerId, chartData);
                        }
                    }
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
     * Render a single chart
     */
    private static renderSingleChart(containerId: string, chartData: any): void {
        const chartMap: { [key: string]: string } = {
            'imagenet-chart': 'imagenet',
            'cifar10-chart': 'cifar10',
            'glue-chart': 'glue',
            'cifar100-chart': 'cifar100',
            'squad-chart': 'squad',
            'inference-speed-chart': 'inferenceSpeed',
            'training-throughput-chart': 'trainingThroughput',
            'memory-usage-chart': 'memoryUsage',
            'memory-efficiency-chart': 'memoryEfficiency',
            'time-to-target-chart': 'timeToTarget',
            'total-training-time-chart': 'totalTrainingTime',
            'epochs-convergence-chart': 'epochsConvergence',
            'final-loss-chart': 'finalLoss'
        };

        const configKey = chartMap[containerId];
        if (configKey) {
            const config = chartData[configKey];
            if (config) {
                try {
                    ChartRenderer.renderBarChart(containerId, config);
                    this.chartsRendered.add(containerId);
                } catch (error) {
                    console.error('Error rendering ' + containerId + ':', error);
                }
            }
        }
    }

    /**
     * Verify all charts are rendered
     */
    private static verifyAllCharts(): void {
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

        const missing: string[] = [];
        let rendered = 0;

        requiredCharts.forEach(function(chartId) {
            const container = document.getElementById(chartId);
            if (!container) {
                missing.push(chartId + ' (container not found)');
            } else {
                const svg = container.querySelector('svg');
                if (svg && svg.children.length > 0) {
                    rendered++;
                } else {
                    missing.push(chartId + ' (no SVG content)');
                }
            }
        });

        if (missing.length > 0) {
            console.warn('⚠️ Some charts are missing:', missing);
            console.log('✅ Rendered: ' + rendered + ' / ' + requiredCharts.length);
        } else {
            console.log('✅ All ' + rendered + ' charts rendered successfully!');
        }
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() {
            ComprehensiveChartInitializer.initializeAll();
        }, 200);
    });
} else {
    setTimeout(function() {
        ComprehensiveChartInitializer.initializeAll();
    }, 200);
}

// Also try on window load
window.addEventListener('load', function() {
    setTimeout(function() {
        if (!ComprehensiveChartInitializer['initialized']) {
            ComprehensiveChartInitializer.initializeAll();
        }
    }, 500);
});

// Export for global access
(window as any).ComprehensiveChartInitializer = ComprehensiveChartInitializer;
