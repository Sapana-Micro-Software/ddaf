// DDAF Dynamic Charts with AJAX - TypeScript Compiled
// Copyright (C) 2025, Shyamal Suhana Chandra


// === chart-data.js ===
// Dynamic Chart Data Management with AJAX Support
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
export class ChartDataManager {
    /**
     * Load chart data dynamically via AJAX
     */
    static loadChartData() {
        return __awaiter(this, void 0, void 0, function* () {
            // Return cached data if available
            if (this.dataCache) {
                return this.dataCache;
            }
            // Return existing promise if already loading
            if (this.loadingPromise) {
                return this.loadingPromise;
            }
            // Create new loading promise
            this.loadingPromise = new Promise(function (resolve, reject) {
                // Try to load from JSON file first
                const xhr = new XMLHttpRequest();
                xhr.open('GET', '/ddaf/data/benchmarks.json', true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        try {
                            const data = JSON.parse(xhr.responseText);
                            ChartDataManager.dataCache = data;
                            resolve(data);
                        }
                        catch (error) {
                            console.warn('Failed to parse JSON, using default data:', error);
                            resolve(ChartDataManager.getDefaultData());
                        }
                    }
                    else {
                        console.warn('Failed to load chart data, using default data');
                        resolve(ChartDataManager.getDefaultData());
                    }
                    ChartDataManager.loadingPromise = null;
                };
                xhr.onerror = function () {
                    console.warn('AJAX error loading chart data, using default data');
                    resolve(ChartDataManager.getDefaultData());
                    ChartDataManager.loadingPromise = null;
                };
                xhr.send();
            });
            return this.loadingPromise;
        });
    }
    /**
     * Get default chart data (fallback)
     */
    static getDefaultData() {
        return {
            imagenet: {
                labels: ['ReLU', 'GELU', 'Swish', 'Mish', 'PReLU', 'Adaptive', 'DDAF'],
                values: [76.13, 77.84, 78.92, 79.42, 77.18, 80.67, 83.42],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'Top-1 Accuracy (%)',
                maxValue: 100
            },
            cifar10: {
                labels: ['ReLU', 'GELU', 'Swish', 'Adaptive', 'DDAF'],
                values: [92.34, 93.12, 93.68, 94.18, 96.08],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'Test Accuracy (%)',
                maxValue: 100
            },
            glue: {
                labels: ['GELU', 'Swish', 'Adaptive', 'DDAF'],
                values: [78.52, 79.14, 80.28, 82.67],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'Average GLUE Score',
                maxValue: 100
            },
            cifar100: {
                labels: ['ReLU', 'GELU', 'Swish', 'Mish', 'Adaptive', 'DDAF'],
                values: [68.42, 69.87, 70.56, 71.23, 71.94, 74.23],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'Test Accuracy (%)',
                maxValue: 100
            },
            squad: {
                labels: ['GELU', 'Swish', 'Adaptive', 'DDAF'],
                values: [76.83, 77.42, 78.91, 80.34],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'F1 Score',
                maxValue: 100
            },
            inferenceSpeed: {
                labels: ['ReLU', 'GELU', 'Swish', 'Mish', 'Adaptive', 'DDAF'],
                values: [1247, 1172, 1110, 1084, 1023, 1135],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'Images/sec',
                maxValue: 1300,
                formatValue: function (v) { return v.toLocaleString() + ' img/s'; }
            },
            trainingThroughput: {
                labels: ['ReLU', 'GELU', 'Swish', 'Adaptive', 'DDAF'],
                values: [892, 834, 789, 745, 794],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'Samples/sec',
                maxValue: 1000,
                formatValue: function (v) { return v.toLocaleString() + ' samples/s'; }
            },
            memoryUsage: {
                labels: ['ReLU', 'GELU', 'Swish', 'Adaptive', 'DDAF'],
                values: [8.2, 8.4, 8.6, 9.1, 9.0],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'Peak Memory (GB)',
                maxValue: 10,
                formatValue: function (v) { return v.toFixed(1) + ' GB'; }
            },
            memoryEfficiency: {
                labels: ['ReLU', 'GELU', 'Swish', 'Adaptive', 'DDAF'],
                values: [0, 0, 0, 20480, 12800],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'Additional Parameters',
                maxValue: 25000,
                formatValue: function (v) { return v.toLocaleString(); }
            },
            timeToTarget: {
                labels: ['ReLU', 'GELU', 'Swish', 'Adaptive', 'DDAF'],
                values: [12.3, 11.8, 11.2, 10.9, 10.5],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'Time (hours)',
                maxValue: 15,
                formatValue: function (v) { return v.toFixed(1) + ' hrs'; },
                lowerIsBetter: true
            },
            totalTrainingTime: {
                labels: ['ReLU', 'GELU', 'Swish', 'Adaptive', 'DDAF'],
                values: [45.2, 46.8, 48.1, 49.5, 48.8],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'Time (hours)',
                maxValue: 55,
                formatValue: function (v) { return v.toFixed(1) + ' hrs'; }
            },
            epochsConvergence: {
                labels: ['ReLU', 'GELU', 'Swish', 'Adaptive', 'DDAF'],
                values: [78, 72, 68, 65, 61],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'Epochs',
                maxValue: 90,
                formatValue: function (v) { return Math.round(v).toString(); },
                lowerIsBetter: true
            },
            finalLoss: {
                labels: ['ReLU', 'GELU', 'Swish', 'Adaptive', 'DDAF'],
                values: [1.247, 1.198, 1.162, 1.109, 1.062],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'Cross-entropy Loss',
                maxValue: 1.3,
                formatValue: function (v) { return v.toFixed(3); },
                lowerIsBetter: true
            }
        };
    }
    /**
     * Clear cache (for testing or data refresh)
     */
    static clearCache() {
        this.dataCache = null;
        this.loadingPromise = null;
    }
}
ChartDataManager.dataCache = null;
ChartDataManager.loadingPromise = null;


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

