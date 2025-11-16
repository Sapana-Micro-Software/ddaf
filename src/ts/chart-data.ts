// Dynamic Chart Data Management with AJAX Support
// Copyright (C) 2025, Shyamal Suhana Chandra

import { ChartConfig } from './types';

export interface BenchmarkData {
    imagenet: ChartConfig;
    cifar10: ChartConfig;
    glue: ChartConfig;
    cifar100: ChartConfig;
    squad: ChartConfig;
    inferenceSpeed: ChartConfig;
    trainingThroughput: ChartConfig;
    memoryUsage: ChartConfig;
    memoryEfficiency: ChartConfig;
    timeToTarget: ChartConfig;
    totalTrainingTime: ChartConfig;
    epochsConvergence: ChartConfig;
    finalLoss: ChartConfig;
}

export class ChartDataManager {
    private static dataCache: BenchmarkData | null = null;
    private static loadingPromise: Promise<BenchmarkData> | null = null;

    /**
     * Load chart data dynamically via AJAX
     */
    static async loadChartData(): Promise<BenchmarkData> {
        // Return cached data if available
        if (this.dataCache) {
            return this.dataCache;
        }

        // Return existing promise if already loading
        if (this.loadingPromise) {
            return this.loadingPromise;
        }

        // Create new loading promise
        this.loadingPromise = new Promise(function(resolve, reject) {
            // Try to load from JSON file first
            const xhr = new XMLHttpRequest();
            xhr.open('GET', '/ddaf/data/benchmarks.json', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            
            xhr.onload = function() {
                if (xhr.status === 200) {
                    try {
                        const data = JSON.parse(xhr.responseText);
                        ChartDataManager.dataCache = data;
                        resolve(data);
                    } catch (error) {
                        console.warn('Failed to parse JSON, using default data:', error);
                        resolve(ChartDataManager.getDefaultData());
                    }
                } else {
                    console.warn('Failed to load chart data, using default data');
                    resolve(ChartDataManager.getDefaultData());
                }
                ChartDataManager.loadingPromise = null;
            };

            xhr.onerror = function() {
                console.warn('AJAX error loading chart data, using default data');
                resolve(ChartDataManager.getDefaultData());
                ChartDataManager.loadingPromise = null;
            };

            xhr.send();
        });

        return this.loadingPromise;
    }

    /**
     * Get default chart data (fallback)
     */
    static getDefaultData(): BenchmarkData {
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
                formatValue: function(v) { return v.toLocaleString() + ' img/s'; }
            },
            trainingThroughput: {
                labels: ['ReLU', 'GELU', 'Swish', 'Adaptive', 'DDAF'],
                values: [892, 834, 789, 745, 794],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'Samples/sec',
                maxValue: 1000,
                formatValue: function(v) { return v.toLocaleString() + ' samples/s'; }
            },
            memoryUsage: {
                labels: ['ReLU', 'GELU', 'Swish', 'Adaptive', 'DDAF'],
                values: [8.2, 8.4, 8.6, 9.1, 9.0],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'Peak Memory (GB)',
                maxValue: 10,
                formatValue: function(v) { return v.toFixed(1) + ' GB'; }
            },
            memoryEfficiency: {
                labels: ['ReLU', 'GELU', 'Swish', 'Adaptive', 'DDAF'],
                values: [0, 0, 0, 20480, 12800],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'Additional Parameters',
                maxValue: 25000,
                formatValue: function(v) { return v.toLocaleString(); }
            },
            timeToTarget: {
                labels: ['ReLU', 'GELU', 'Swish', 'Adaptive', 'DDAF'],
                values: [12.3, 11.8, 11.2, 10.9, 10.5],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'Time (hours)',
                maxValue: 15,
                formatValue: function(v) { return v.toFixed(1) + ' hrs'; },
                lowerIsBetter: true
            },
            totalTrainingTime: {
                labels: ['ReLU', 'GELU', 'Swish', 'Adaptive', 'DDAF'],
                values: [45.2, 46.8, 48.1, 49.5, 48.8],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'Time (hours)',
                maxValue: 55,
                formatValue: function(v) { return v.toFixed(1) + ' hrs'; }
            },
            epochsConvergence: {
                labels: ['ReLU', 'GELU', 'Swish', 'Adaptive', 'DDAF'],
                values: [78, 72, 68, 65, 61],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'Epochs',
                maxValue: 90,
                formatValue: function(v) { return Math.round(v).toString(); },
                lowerIsBetter: true
            },
            finalLoss: {
                labels: ['ReLU', 'GELU', 'Swish', 'Adaptive', 'DDAF'],
                values: [1.247, 1.198, 1.162, 1.109, 1.062],
                colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
                yLabel: 'Cross-entropy Loss',
                maxValue: 1.3,
                formatValue: function(v) { return v.toFixed(3); },
                lowerIsBetter: true
            }
        };
    }

    /**
     * Clear cache (for testing or data refresh)
     */
    static clearCache(): void {
        this.dataCache = null;
        this.loadingPromise = null;
    }
}
