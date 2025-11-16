// DDAF Dynamic Charts with AJAX - TypeScript Compiled
// Copyright (C) 2025, Shyamal Suhana Chandra


// === dynamic-charts.js ===
// Dynamic Chart Loading with AJAX and Progressive Enhancement
// Copyright (C) 2025, Shyamal Suhana Chandra
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ChartRenderer } from './chart-renderer';
import { ChartDataManager } from './chart-data';
export class DynamicChartLoader {
    /**
     * Initialize all charts with dynamic loading
     */
    static initializeAllCharts() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('🚀 Initializing dynamic charts...');
            // Load chart data
            const chartData = yield ChartDataManager.loadChartData();
            // Setup lazy loading for all chart containers
            this.setupLazyLoading();
            // Render all visible charts immediately
            this.renderVisibleCharts(chartData);
            // Setup tab switching handlers
            this.setupTabHandlers(chartData);
            console.log('✅ Dynamic charts initialized');
        });
    }
    /**
     * Setup lazy loading with IntersectionObserver
     */
    static setupLazyLoading() {
        const chartContainers = document.querySelectorAll('[id$="-chart"], [id$="-plot"]');
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
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
        chartContainers.forEach(function (container) {
            observer.observe(container);
        });
    }
    /**
     * Load and render a specific chart
     */
    static loadChart(containerId) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const chartData = yield ChartDataManager.loadChartData();
                const config = this.getChartConfig(containerId, chartData);
                if (config) {
                    ChartRenderer.renderBarChart(containerId, config);
                    // Add fade-in animation
                    container.style.opacity = '0';
                    container.style.transition = 'opacity 0.5s ease-in';
                    setTimeout(function () {
                        container.style.opacity = '1';
                    }, 100);
                }
            }
            catch (error) {
                console.error('Error loading chart ' + containerId + ':', error);
                container.innerHTML = '<div class="chart-error">Failed to load chart. Please refresh the page.</div>';
            }
            finally {
                this.loadingStates.set(containerId, false);
            }
        });
    }
    /**
     * Render all currently visible charts
     */
    static renderVisibleCharts(chartData) {
        const chartMap = {
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
        Object.keys(chartMap).forEach(function (containerId) {
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
    static setupTabHandlers(chartData) {
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                const targetTab = this.getAttribute('data-tab');
                setTimeout(function () {
                    DynamicChartLoader.renderTabCharts(targetTab, chartData);
                }, 300);
            });
        });
    }
    /**
     * Render charts for a specific tab
     */
    static renderTabCharts(tabName, chartData) {
        const tabCharts = {
            'accuracy': ['imagenet-chart', 'cifar10-chart', 'glue-chart', 'cifar100-chart', 'squad-chart'],
            'speed': ['inference-speed-chart', 'training-throughput-chart'],
            'memory': ['memory-usage-chart', 'memory-efficiency-chart'],
            'training': ['time-to-target-chart', 'total-training-time-chart'],
            'convergence': ['epochs-convergence-chart', 'final-loss-chart']
        };
        const chartIds = tabCharts[tabName] || [];
        const chartMap = {
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
        chartIds.forEach(function (containerId) {
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
    static getChartConfig(containerId, chartData) {
        const chartMap = {
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
DynamicChartLoader.loadingStates = new Map();
DynamicChartLoader.observers = new Map();
// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
        setTimeout(function () {
            DynamicChartLoader.initializeAllCharts();
        }, 100);
    });
}
else {
    setTimeout(function () {
        DynamicChartLoader.initializeAllCharts();
    }, 100);
}
// Export for global access
window.DynamicChartLoader = DynamicChartLoader;

