// Dynamic Chart Loading with AJAX and Progressive Enhancement
// Copyright (C) 2025, Shyamal Suhana Chandra

import { ChartRenderer } from './chart-renderer';
import { ChartDataManager } from './chart-data';

export class DynamicChartLoader {
    private static loadingStates: Map<string, boolean> = new Map();
    private static observers: Map<string, IntersectionObserver> = new Map();

    /**
     * Initialize all charts with dynamic loading
     */
    static async initializeAllCharts(): Promise<void> {
        console.log('🚀 Initializing dynamic charts...');

        // Load chart data
        const chartData = await ChartDataManager.loadChartData();

        // Setup lazy loading for all chart containers
        this.setupLazyLoading();

        // Render all visible charts immediately
        this.renderVisibleCharts(chartData);

        // Setup tab switching handlers
        this.setupTabHandlers(chartData);

        console.log('✅ Dynamic charts initialized');
    }

    /**
     * Setup lazy loading with IntersectionObserver
     */
    private static setupLazyLoading(): void {
        const chartContainers = document.querySelectorAll('[id$="-chart"], [id$="-plot"]');
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const containerId = entry.target.id;
                    if (!DynamicChartLoader.loadingStates.get(containerId)) {
                        DynamicChartLoader.loadChart(containerId);
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
     * Load and render a specific chart
     */
    private static async loadChart(containerId: string): Promise<void> {
        if (this.loadingStates.get(containerId)) {
            return; // Already loading
        }

        this.loadingStates.set(containerId, true);
        const container = document.getElementById(containerId);
        
        if (!container) {
            console.warn('Container not found: ' + containerId);
            return;
        }

        // Show loading state
        container.innerHTML = '<div class="chart-loading"><div class="spinner"></div><p>Loading chart...</p></div>';

        try {
            const chartData = await ChartDataManager.loadChartData();
            const config = this.getChartConfig(containerId, chartData);
            
            if (config) {
                ChartRenderer.renderBarChart(containerId, config);
                
                // Add fade-in animation
                container.style.opacity = '0';
                container.style.transition = 'opacity 0.5s ease-in';
                setTimeout(function() {
                    container.style.opacity = '1';
                }, 100);
            }
        } catch (error) {
            console.error('Error loading chart ' + containerId + ':', error);
            container.innerHTML = '<div class="chart-error">Failed to load chart. Please refresh the page.</div>';
        } finally {
            this.loadingStates.set(containerId, false);
        }
    }

    /**
     * Render all currently visible charts
     */
    private static renderVisibleCharts(chartData: any): void {
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
            if (container && container.offsetParent !== null) {
                // Container is visible
                const configKey = chartMap[containerId];
                const config = chartData[configKey];
                if (config) {
                    ChartRenderer.renderBarChart(containerId, config);
                }
            }
        });
    }

    /**
     * Setup tab switching handlers
     */
    private static setupTabHandlers(chartData: any): void {
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                setTimeout(function() {
                    DynamicChartLoader.renderTabCharts(targetTab, chartData);
                }, 300);
            });
        });
    }

    /**
     * Render charts for a specific tab
     */
    private static renderTabCharts(tabName: string, chartData: any): void {
        const tabCharts: { [key: string]: string[] } = {
            'accuracy': ['imagenet-chart', 'cifar10-chart', 'glue-chart', 'cifar100-chart', 'squad-chart'],
            'speed': ['inference-speed-chart', 'training-throughput-chart'],
            'memory': ['memory-usage-chart', 'memory-efficiency-chart'],
            'training': ['time-to-target-chart', 'total-training-time-chart'],
            'convergence': ['epochs-convergence-chart', 'final-loss-chart']
        };

        const chartIds = tabCharts[tabName] || [];
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

        chartIds.forEach(function(containerId) {
            const container = document.getElementById(containerId);
            if (container) {
                const configKey = chartMap[containerId];
                const config = chartData[configKey];
                if (config) {
                    ChartRenderer.renderBarChart(containerId, config);
                }
            }
        });
    }

    /**
     * Get chart configuration by container ID
     */
    private static getChartConfig(containerId: string, chartData: any): any {
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
        return configKey ? chartData[configKey] : null;
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() {
            DynamicChartLoader.initializeAllCharts();
        }, 100);
    });
} else {
    setTimeout(function() {
        DynamicChartLoader.initializeAllCharts();
    }, 100);
}

// Export for global access
(window as any).DynamicChartLoader = DynamicChartLoader;
