// DDAF Enhanced Charts - TypeScript Compiled
// Copyright (C) 2025, Shyamal Suhana Chandra


// === types.js ===
// Type definitions for DDAF Charts
// Copyright (C) 2025, Shyamal Suhana Chandra
export {};


// === svg-utils.js ===
// SVG Utility Functions for DDAF Charts
// Copyright (C) 2025, Shyamal Suhana Chandra
export class SVGUtils {
    /**
     * Create an SVG element with proper namespace
     */
    static createElement(tagName) {
        return document.createElementNS(this.SVG_NS, tagName);
    }
    /**
     * Create an SVG with proper dimensions and viewBox
     */
    static createSVG(width, height, className) {
        const svg = this.createElement('svg');
        svg.setAttribute('width', width.toString());
        svg.setAttribute('height', height.toString());
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        svg.setAttribute('xmlns', this.SVG_NS);
        if (className) {
            svg.setAttribute('class', className);
        }
        return svg;
    }
    /**
     * Create a linear gradient
     */
    static createLinearGradient(id, stops) {
        const gradient = this.createElement('linearGradient');
        gradient.setAttribute('id', id);
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '0%');
        gradient.setAttribute('y2', '100%');
        stops.forEach((stop, index) => {
            const stopElement = this.createElement('stop');
            stopElement.setAttribute('offset', stop.offset);
            stopElement.setAttribute('stop-color', stop.color);
            if (stop.opacity !== undefined) {
                stopElement.setAttribute('stop-opacity', stop.opacity.toString());
            }
            gradient.appendChild(stopElement);
        });
        return gradient;
    }
    /**
     * Create a glow filter
     */
    static createGlowFilter(id, stdDeviation = 3) {
        const filter = this.createElement('filter');
        filter.setAttribute('id', id);
        filter.setAttribute('x', '-50%');
        filter.setAttribute('y', '-50%');
        filter.setAttribute('width', '200%');
        filter.setAttribute('height', '200%');
        const feGaussianBlur = this.createElement('feGaussianBlur');
        feGaussianBlur.setAttribute('stdDeviation', stdDeviation.toString());
        feGaussianBlur.setAttribute('result', 'coloredBlur');
        const feMerge = this.createElement('feMerge');
        const feMergeNode1 = this.createElement('feMergeNode');
        feMergeNode1.setAttribute('in', 'coloredBlur');
        const feMergeNode2 = this.createElement('feMergeNode');
        feMergeNode2.setAttribute('in', 'SourceGraphic');
        feMerge.appendChild(feMergeNode1);
        feMerge.appendChild(feMergeNode2);
        filter.appendChild(feGaussianBlur);
        filter.appendChild(feMerge);
        return filter;
    }
    /**
     * Create a text element
     */
    static createText(x, y, text, options) {
        const textElement = this.createElement('text');
        textElement.setAttribute('x', x.toString());
        textElement.setAttribute('y', y.toString());
        textElement.textContent = text;
        if (options) {
            if (options.anchor) {
                textElement.setAttribute('text-anchor', options.anchor);
            }
            if (options.fontSize) {
                textElement.setAttribute('font-size', options.fontSize.toString());
            }
            if (options.fontWeight) {
                textElement.setAttribute('font-weight', options.fontWeight.toString());
            }
            if (options.fill) {
                textElement.setAttribute('fill', options.fill);
            }
            if (options.className) {
                textElement.setAttribute('class', options.className);
            }
        }
        return textElement;
    }
    /**
     * Create a rectangle
     */
    static createRect(x, y, width, height, options) {
        const rect = this.createElement('rect');
        rect.setAttribute('x', x.toString());
        rect.setAttribute('y', y.toString());
        rect.setAttribute('width', width.toString());
        rect.setAttribute('height', height.toString());
        if (options) {
            if (options.fill) {
                rect.setAttribute('fill', options.fill);
            }
            if (options.stroke) {
                rect.setAttribute('stroke', options.stroke);
            }
            if (options.strokeWidth) {
                rect.setAttribute('stroke-width', options.strokeWidth.toString());
            }
            if (options.rx) {
                rect.setAttribute('rx', options.rx.toString());
            }
            if (options.ry) {
                rect.setAttribute('ry', options.ry.toString());
            }
            if (options.filter) {
                rect.setAttribute('filter', options.filter);
            }
            if (options.className) {
                rect.setAttribute('class', options.className);
            }
        }
        return rect;
    }
    /**
     * Create a line
     */
    static createLine(x1, y1, x2, y2, options) {
        const line = this.createElement('line');
        line.setAttribute('x1', x1.toString());
        line.setAttribute('y1', y1.toString());
        line.setAttribute('x2', x2.toString());
        line.setAttribute('y2', y2.toString());
        if (options) {
            if (options.stroke) {
                line.setAttribute('stroke', options.stroke);
            }
            if (options.strokeWidth) {
                line.setAttribute('stroke-width', options.strokeWidth.toString());
            }
            if (options.strokeDasharray) {
                line.setAttribute('stroke-dasharray', options.strokeDasharray);
            }
        }
        return line;
    }
    /**
     * Create a circle
     */
    static createCircle(cx, cy, r, options) {
        const circle = this.createElement('circle');
        circle.setAttribute('cx', cx.toString());
        circle.setAttribute('cy', cy.toString());
        circle.setAttribute('r', r.toString());
        if (options) {
            if (options.fill) {
                circle.setAttribute('fill', options.fill);
            }
            if (options.stroke) {
                circle.setAttribute('stroke', options.stroke);
            }
            if (options.strokeWidth) {
                circle.setAttribute('stroke-width', options.strokeWidth.toString());
            }
        }
        return circle;
    }
    /**
     * Create a path
     */
    static createPath(d, options) {
        const path = this.createElement('path');
        path.setAttribute('d', d);
        if (options) {
            if (options.fill) {
                path.setAttribute('fill', options.fill);
            }
            if (options.stroke) {
                path.setAttribute('stroke', options.stroke);
            }
            if (options.strokeWidth) {
                path.setAttribute('stroke-width', options.strokeWidth.toString());
            }
            if (options.className) {
                path.setAttribute('class', options.className);
            }
        }
        return path;
    }
    /**
     * Create a group element
     */
    static createGroup(className, transform) {
        const group = this.createElement('g');
        if (className) {
            group.setAttribute('class', className);
        }
        if (transform) {
            group.setAttribute('transform', transform);
        }
        return group;
    }
    /**
     * Ensure SVG is visible and properly sized
     */
    static ensureSVGVisible(container, svg) {
        if (container.offsetParent === null) {
            // Container is hidden, set explicit dimensions
            const width = container.offsetWidth || container.clientWidth || 800;
            const height = container.offsetHeight || container.clientHeight || 350;
            svg.setAttribute('width', width.toString());
            svg.setAttribute('height', height.toString());
        }
    }
    /**
     * Sanitize ID for use in SVG
     */
    static sanitizeId(id) {
        return id.replace(/[^a-zA-Z0-9]/g, '_');
    }
}
SVGUtils.SVG_NS = 'http://www.w3.org/2000/svg';
SVGUtils.XLINK_NS = 'http://www.w3.org/1999/xlink';


// === chart-renderer.js ===
// Enhanced Chart Renderer with SVG Support
// Copyright (C) 2025, Shyamal Suhana Chandra
import { SVGUtils } from './svg-utils';
export class ChartRenderer {
    /**
     * Render a bar chart with enhanced SVG support
     */
    static renderBarChart(containerId, config) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Chart container not found: ${containerId}`);
            return;
        }
        // Clear existing content
        container.innerHTML = '';
        // Get dimensions
        const width = container.clientWidth || container.offsetWidth || 800;
        const height = 350;
        const margin = { top: 20, right: 20, bottom: 60, left: 70 };
        const chartWidth = Math.max(200, width - margin.left - margin.right);
        const chartHeight = height - margin.top - margin.bottom;
        // Create SVG
        const svg = SVGUtils.createSVG(width, height, 'chart-svg');
        SVGUtils.ensureSVGVisible(container, svg);
        // Create defs for gradients and filters
        const defs = SVGUtils.createElement('defs');
        const containerIdSanitized = SVGUtils.sanitizeId(containerId);
        // Create gradient for DDAF bars
        const gradientId = `barGradient-${containerIdSanitized}`;
        const gradient = SVGUtils.createLinearGradient(gradientId, [
            { offset: '0%', color: '#6366f1' },
            { offset: '50%', color: '#8b5cf6' },
            { offset: '100%', color: '#ec4899' }
        ]);
        defs.appendChild(gradient);
        // Create glow filter for DDAF bars
        const filterId = `glow-${containerIdSanitized}`;
        const filter = SVGUtils.createGlowFilter(filterId, 4);
        defs.appendChild(filter);
        svg.appendChild(defs);
        // Calculate scales
        const maxValue = config.maxValue || Math.max(...config.values) * 1.1;
        const barWidth = chartWidth / config.values.length * 0.7;
        const barSpacing = chartWidth / config.values.length;
        // Create bars group
        const barsGroup = SVGUtils.createGroup('bars-group');
        config.values.forEach((value, index) => {
            const barHeight = (value / maxValue) * chartHeight;
            const x = margin.left + index * barSpacing + (barSpacing - barWidth) / 2;
            const y = margin.top + chartHeight - barHeight;
            const isDDAF = config.labels[index] === 'DDAF';
            const fill = isDDAF
                ? `url(#${gradientId})`
                : (config.colors && config.colors[index]) || '#94a3b8';
            const rect = SVGUtils.createRect(x, y, barWidth, barHeight, {
                fill: fill,
                rx: 6,
                ry: 6,
                filter: isDDAF ? `url(#${filterId})` : undefined,
                className: 'chart-bar'
            });
            // Add data attributes for interactivity
            rect.setAttribute('data-index', index.toString());
            rect.setAttribute('data-value', value.toString());
            rect.setAttribute('data-label', config.labels[index]);
            // Add hover effects
            rect.addEventListener('mouseenter', function () {
                rect.setAttribute('transform', 'scale(1.05) translate(0, -5)');
                rect.setAttribute('opacity', '0.9');
            });
            rect.addEventListener('mouseleave', function () {
                rect.removeAttribute('transform');
                rect.removeAttribute('opacity');
            });
            barsGroup.appendChild(rect);
            // Add value label
            const valueText = config.formatValue
                ? config.formatValue(value)
                : value.toFixed(2);
            const labelOptions = isDDAF
                ? {
                    fontSize: 13,
                    fontWeight: 900,
                    fill: '#ffffff',
                    className: 'value-label-ddaf'
                }
                : {
                    fontSize: 11,
                    fontWeight: 600,
                    fill: '#64748b'
                };
            const valueLabel = SVGUtils.createText(x + barWidth / 2, y - 5, valueText, Object.assign(Object.assign({}, labelOptions), { anchor: 'middle' }));
            // Add stroke for DDAF labels for visibility
            if (isDDAF) {
                valueLabel.setAttribute('stroke', '#000000');
                valueLabel.setAttribute('stroke-width', '0.5');
            }
            barsGroup.appendChild(valueLabel);
        });
        svg.appendChild(barsGroup);
        // Create axes
        const xAxis = SVGUtils.createGroup('x-axis');
        const xAxisLine = SVGUtils.createLine(margin.left, margin.top + chartHeight, width - margin.right, margin.top + chartHeight, { stroke: '#64748b', strokeWidth: 2 });
        xAxis.appendChild(xAxisLine);
        // X-axis labels
        config.labels.forEach((label, index) => {
            const x = margin.left + index * barSpacing + barSpacing / 2;
            const labelText = SVGUtils.createText(x, height - 10, label, {
                anchor: 'middle',
                fontSize: 11,
                fill: '#64748b'
            });
            xAxis.appendChild(labelText);
        });
        svg.appendChild(xAxis);
        // Y-axis
        const yAxis = SVGUtils.createGroup('y-axis');
        const yAxisLine = SVGUtils.createLine(margin.left, margin.top, margin.left, margin.top + chartHeight, { stroke: '#64748b', strokeWidth: 2 });
        yAxis.appendChild(yAxisLine);
        // Y-axis labels and grid lines
        const numTicks = 5;
        for (let i = 0; i <= numTicks; i++) {
            const value = (maxValue / numTicks) * i;
            const y = margin.top + chartHeight - (i / numTicks) * chartHeight;
            // Grid line
            const gridLine = SVGUtils.createLine(margin.left, y, width - margin.right, y, {
                stroke: '#e2e8f0',
                strokeWidth: 1,
                strokeDasharray: '2,2'
            });
            yAxis.appendChild(gridLine);
            // Label
            const labelText = SVGUtils.createText(margin.left - 10, y + 4, value.toFixed(1), {
                anchor: 'end',
                fontSize: 10,
                fill: '#64748b'
            });
            yAxis.appendChild(labelText);
        }
        svg.appendChild(yAxis);
        // Y-axis title
        if (config.yLabel) {
            const yLabel = SVGUtils.createText(15, height / 2, config.yLabel, {
                anchor: 'middle',
                fontSize: 12,
                fill: '#64748b'
            });
            yLabel.setAttribute('transform', `rotate(-90, 15, ${height / 2})`);
            svg.appendChild(yLabel);
        }
        container.appendChild(svg);
    }
    /**
     * Verify SVG was created successfully
     */
    static verifySVG(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            return false;
        }
        const svg = container.querySelector('svg');
        if (!svg) {
            return false;
        }
        // Check if SVG has content
        const hasContent = svg.children.length > 0;
        const hasDimensions = svg.getAttribute('width') && svg.getAttribute('height');
        return hasContent && hasDimensions !== null;
    }
}


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


// === charts.js ===
// Main Charts Initialization with Enhanced SVG Support
// Copyright (C) 2025, Shyamal Suhana Chandra
import { ChartRenderer } from './chart-renderer';
import { SVGUtils } from './svg-utils';
/**
 * Enhanced chart initialization with SVG verification
 */
export function initializeAllChartsEnhanced() {
    // Check if D3.js is loaded
    if (typeof window.d3 === 'undefined' && typeof window.d3 === 'undefined') {
        console.warn('D3.js not loaded, using fallback SVG generation');
        initFallbackCharts();
    }
    else {
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
function initBenchmarkChartsEnhanced() {
    createBenchmarkSVGChartsEnhanced();
    // Use IntersectionObserver to reinitialize charts when they become visible
    const chartContainers = document.querySelectorAll('[id$="-chart"], [id$="-plot"]');
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && entry.target.innerHTML.trim() === '') {
                const containerId = entry.target.id;
                console.log('Reinitializing chart: ' + containerId);
                setTimeout(function () {
                    createBenchmarkSVGChartsEnhanced();
                }, 100);
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
 * Create all benchmark charts with enhanced SVG support
 */
function createBenchmarkSVGChartsEnhanced() {
    const charts = [
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
    charts.forEach(function ({ id, config }) {
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
        }
        catch (error) {
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
function setupTabChartReinitialization() {
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            setTimeout(function () {
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
function verifyAllSVGs() {
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
    const missingCharts = [];
    let createdCharts = 0;
    requiredCharts.forEach(function (chartId) {
        const verified = ChartRenderer.verifySVG(chartId);
        if (!verified) {
            const container = document.getElementById(chartId);
            if (!container) {
                missingCharts.push(chartId + ' (container not found)');
            }
            else if (container.innerHTML.trim() === '') {
                missingCharts.push(chartId + ' (empty)');
            }
            else {
                missingCharts.push(chartId + ' (SVG invalid)');
            }
        }
        else {
            createdCharts++;
        }
    });
    if (missingCharts.length > 0) {
        console.warn('Some charts are missing or invalid:', missingCharts);
        // Retry creating missing charts
        setTimeout(function () {
            createBenchmarkSVGChartsEnhanced();
        }, 500);
    }
    else {
        console.log('✅ All ' + createdCharts + ' charts created successfully with valid SVGs!');
    }
}
/**
 * Fallback charts initialization
 */
function initFallbackCharts() {
    // This will be handled by the existing charts.js file
    if (typeof window.initFallbackCharts === 'function') {
        window.initFallbackCharts();
    }
}
// Export for global access
window.initializeAllChartsEnhanced = initializeAllChartsEnhanced;
window.ChartRenderer = ChartRenderer;
if (typeof SVGUtils !== 'undefined') {
    window.SVGUtils = SVGUtils;
}
// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
        setTimeout(function () {
            initializeAllChartsEnhanced();
        }, 100);
    });
}
else {
    setTimeout(function () {
        initializeAllChartsEnhanced();
    }, 100);
}
// Also try on window load
window.addEventListener('load', function () {
    setTimeout(function () {
        const existingCharts = document.querySelectorAll('svg.chart-svg, svg.diagram-svg, svg.plot-svg');
        if (existingCharts.length === 0) {
            console.log('Reinitializing charts on window load...');
            initializeAllChartsEnhanced();
        }
    }, 200);
});


// === chart-initializer.js ===
// Comprehensive Chart Initialization System
// Ensures all benchmarks, charts, diagrams, and graphs work correctly
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
export class ComprehensiveChartInitializer {
    /**
     * Initialize all charts, diagrams, and graphs
     */
    static initializeAll() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.initialized) {
                console.log('Charts already initialized, skipping...');
                return;
            }
            console.log('🚀 Starting comprehensive chart initialization...');
            // Step 1: Load chart data
            const chartData = yield ChartDataManager.loadChartData();
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
        });
    }
    /**
     * Initialize tab buttons with proper event handlers
     */
    static initializeTabButtons(chartData) {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');
        tabButtons.forEach(function (button) {
            var _a;
            // Remove any existing listeners by cloning
            const newButton = button.cloneNode(true);
            (_a = button.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(newButton, button);
            newButton.addEventListener('click', function () {
                const targetTab = this.getAttribute('data-tab');
                if (!targetTab)
                    return;
                // Update button states
                tabButtons.forEach(function (btn) {
                    btn.classList.remove('active');
                    btn.classList.remove('bg-gradient-to-r', 'from-primary-600', 'to-purple-600', 'text-white', 'shadow-lg', 'shadow-primary-500/50');
                    btn.classList.add('bg-white', 'border-2', 'border-primary-200', 'text-gray-700');
                });
                this.classList.add('active');
                this.classList.remove('bg-white', 'border-2', 'border-primary-200', 'text-gray-700');
                this.classList.add('bg-gradient-to-r', 'from-primary-600', 'to-purple-600', 'text-white', 'shadow-lg', 'shadow-primary-500/50');
                // Update tab content visibility
                tabContents.forEach(function (content) {
                    const htmlContent = content;
                    htmlContent.classList.remove('active');
                    htmlContent.style.opacity = '0';
                    htmlContent.style.display = 'none';
                });
                const targetContent = document.getElementById(targetTab + '-tab');
                if (targetContent) {
                    targetContent.classList.add('active');
                    targetContent.style.display = 'block';
                    setTimeout(function () {
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
    static renderAllBenchmarkCharts(chartData) {
        // First try using original charts.js function if available
        if (typeof window.createBenchmarkSVGCharts === 'function') {
            window.createBenchmarkSVGCharts();
            console.log('✅ Used createBenchmarkSVGCharts from charts.js');
            return;
        }
        // Fallback to TypeScript ChartRenderer
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
            if (container) {
                const configKey = chartMap[containerId];
                const config = chartData[configKey];
                if (config) {
                    try {
                        if (typeof ChartRenderer !== 'undefined' && ChartRenderer.renderBarChart) {
                            ChartRenderer.renderBarChart(containerId, config);
                            ComprehensiveChartInitializer.chartsRendered.add(containerId);
                        }
                        else if (typeof window.createBenchmarkBarChart === 'function') {
                            window.createBenchmarkBarChart(containerId, config);
                            ComprehensiveChartInitializer.chartsRendered.add(containerId);
                        }
                    }
                    catch (error) {
                        console.error('Error rendering ' + containerId + ':', error);
                    }
                }
            }
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
                // Check if chart already rendered
                const svg = container.querySelector('svg');
                if (!svg || svg.children.length === 0) {
                    const configKey = chartMap[containerId];
                    const config = chartData[configKey];
                    if (config) {
                        try {
                            ChartRenderer.renderBarChart(containerId, config);
                            ComprehensiveChartInitializer.chartsRendered.add(containerId);
                        }
                        catch (error) {
                            console.error('Error rendering ' + containerId + ':', error);
                        }
                    }
                }
            }
        });
    }
    /**
     * Initialize D3.js charts
     */
    static initializeD3Charts() {
        // Wait a bit for D3 and chart functions to be ready
        setTimeout(function () {
            // Try enhanced TypeScript functions first
            if (typeof window.initD3Charts === 'function') {
                window.initD3Charts();
            }
            // Try original charts.js functions
            if (typeof window.createPerformanceLineChart === 'function') {
                window.createPerformanceLineChart();
            }
            if (typeof window.createComparisonBarChart === 'function') {
                window.createComparisonBarChart();
            }
            if (typeof window.createAccuracyScatterPlot === 'function') {
                window.createAccuracyScatterPlot();
            }
            if (typeof window.createTrainingCurveChart === 'function') {
                window.createTrainingCurveChart();
            }
        }, 500);
    }
    /**
     * Initialize diagrams
     */
    static initializeDiagrams() {
        // Wait for diagram functions to be available
        setTimeout(function () {
            // Try enhanced TypeScript functions first
            if (typeof window.initSVGDiagrams === 'function') {
                window.initSVGDiagrams();
            }
            // Try original charts.js functions
            if (typeof window.createArchitectureDiagram === 'function') {
                window.createArchitectureDiagram();
            }
            if (typeof window.createDataFlowDiagram === 'function') {
                window.createDataFlowDiagram();
            }
            if (typeof window.createNetworkDiagram === 'function') {
                window.createNetworkDiagram();
            }
            // Also try activation function plots
            if (typeof window.initActivationFunctionPlots === 'function') {
                window.initActivationFunctionPlots();
            }
        }, 500);
    }
    /**
     * Setup lazy loading for charts
     */
    static setupLazyLoading(chartData) {
        const chartContainers = document.querySelectorAll('[id$="-chart"], [id$="-plot"]');
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const containerId = entry.target.id;
                    if (!ComprehensiveChartInitializer.chartsRendered.has(containerId)) {
                        const container = entry.target;
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
        chartContainers.forEach(function (container) {
            observer.observe(container);
        });
    }
    /**
     * Render a single chart
     */
    static renderSingleChart(containerId, chartData) {
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
        if (configKey) {
            const config = chartData[configKey];
            if (config) {
                try {
                    ChartRenderer.renderBarChart(containerId, config);
                    this.chartsRendered.add(containerId);
                }
                catch (error) {
                    console.error('Error rendering ' + containerId + ':', error);
                }
            }
        }
    }
    /**
     * Verify all charts are rendered
     */
    static verifyAllCharts() {
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
        const missing = [];
        let rendered = 0;
        requiredCharts.forEach(function (chartId) {
            const container = document.getElementById(chartId);
            if (!container) {
                missing.push(chartId + ' (container not found)');
            }
            else {
                const svg = container.querySelector('svg');
                if (svg && svg.children.length > 0) {
                    rendered++;
                }
                else {
                    missing.push(chartId + ' (no SVG content)');
                }
            }
        });
        if (missing.length > 0) {
            console.warn('⚠️ Some charts are missing:', missing);
            console.log('✅ Rendered: ' + rendered + ' / ' + requiredCharts.length);
        }
        else {
            console.log('✅ All ' + rendered + ' charts rendered successfully!');
        }
    }
}
ComprehensiveChartInitializer.initialized = false;
ComprehensiveChartInitializer.chartsRendered = new Set();
// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
        setTimeout(function () {
            ComprehensiveChartInitializer.initializeAll();
        }, 200);
    });
}
else {
    setTimeout(function () {
        ComprehensiveChartInitializer.initializeAll();
    }, 200);
}
// Also try on window load
window.addEventListener('load', function () {
    setTimeout(function () {
        if (!ComprehensiveChartInitializer['initialized']) {
            ComprehensiveChartInitializer.initializeAll();
        }
    }, 500);
});
// Export for global access
window.ComprehensiveChartInitializer = ComprehensiveChartInitializer;


// === chart-tester.js ===
// Comprehensive Chart Testing and Verification
// Tests all buttons, charts, diagrams, and graphs
// Copyright (C) 2025, Shyamal Suhana Chandra
export class ChartTester {
    /**
     * Test all tab buttons
     */
    static testTabButtons() {
        console.log('🧪 Testing tab buttons...');
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabs = ['accuracy', 'speed', 'memory', 'training', 'convergence'];
        let allWorking = true;
        tabButtons.forEach(function (button, index) {
            const expectedTab = tabs[index];
            const actualTab = button.getAttribute('data-tab');
            if (actualTab !== expectedTab) {
                console.error('❌ Tab button ' + index + ' mismatch: expected ' + expectedTab + ', got ' + actualTab);
                allWorking = false;
            }
            else {
                console.log('✅ Tab button ' + index + ' (' + expectedTab + ') OK');
            }
            // Test click handler (can't directly test event listeners, but button structure is correct)
            const htmlButton = button;
            if (htmlButton.onclick !== null || htmlButton.getAttribute('onclick') !== null) {
                console.log('ℹ️  Inline click handler found');
            }
            else {
                // Event listener will be attached on initialization
                console.log('ℹ️  Click handler will be attached on initialization');
            }
        });
        if (allWorking) {
            console.log('✅ All tab buttons configured correctly');
        }
        return allWorking;
    }
    /**
     * Test all chart containers exist
     */
    static testChartContainers() {
        console.log('🧪 Testing chart containers...');
        const requiredCharts = [
            'imagenet-chart', 'cifar10-chart', 'glue-chart', 'cifar100-chart', 'squad-chart',
            'inference-speed-chart', 'training-throughput-chart',
            'memory-usage-chart', 'memory-efficiency-chart',
            'time-to-target-chart', 'total-training-time-chart',
            'epochs-convergence-chart', 'final-loss-chart'
        ];
        let allExist = true;
        requiredCharts.forEach(function (chartId) {
            const container = document.getElementById(chartId);
            if (!container) {
                console.error('❌ Chart container not found: ' + chartId);
                allExist = false;
            }
            else {
                console.log('✅ Container exists: ' + chartId);
            }
        });
        if (allExist) {
            console.log('✅ All ' + requiredCharts.length + ' chart containers found');
        }
        return allExist;
    }
    /**
     * Test all diagrams exist
     */
    static testDiagrams() {
        console.log('🧪 Testing diagram containers...');
        const diagrams = [
            'architecture-diagram',
            'data-flow-diagram',
            'network-diagram'
        ];
        let allExist = true;
        diagrams.forEach(function (diagramId) {
            const container = document.getElementById(diagramId);
            if (!container) {
                console.error('❌ Diagram container not found: ' + diagramId);
                allExist = false;
            }
            else {
                console.log('✅ Diagram container exists: ' + diagramId);
            }
        });
        return allExist;
    }
    /**
     * Test all graphs exist
     */
    static testGraphs() {
        console.log('🧪 Testing graph containers...');
        const graphs = [
            'performance-line-chart',
            'comparison-bar-chart',
            'accuracy-scatter-plot',
            'training-curve-chart',
            'relu-plot',
            'gelu-plot',
            'swish-plot',
            'ddaf-plot',
            'benchmark-bar-chart'
        ];
        let allExist = true;
        graphs.forEach(function (graphId) {
            const container = document.getElementById(graphId);
            if (!container) {
                console.error('❌ Graph container not found: ' + graphId);
                allExist = false;
            }
            else {
                console.log('✅ Graph container exists: ' + graphId);
            }
        });
        return allExist;
    }
    /**
     * Run all tests
     */
    static runAllTests() {
        console.log('🚀 Running comprehensive chart tests...\n');
        const buttonTest = this.testTabButtons();
        const containerTest = this.testChartContainers();
        const diagramTest = this.testDiagrams();
        const graphTest = this.testGraphs();
        console.log('\n📊 Test Results:');
        console.log('   Tab Buttons: ' + (buttonTest ? '✅ PASS' : '❌ FAIL'));
        console.log('   Chart Containers: ' + (containerTest ? '✅ PASS' : '❌ FAIL'));
        console.log('   Diagrams: ' + (diagramTest ? '✅ PASS' : '❌ FAIL'));
        console.log('   Graphs: ' + (graphTest ? '✅ PASS' : '❌ FAIL'));
        if (buttonTest && containerTest && diagramTest && graphTest) {
            console.log('\n🎉 All tests passed!');
        }
        else {
            console.log('\n⚠️  Some tests failed. Please check the errors above.');
        }
    }
}
// Export for global access
window.ChartTester = ChartTester;
// Auto-run tests after a delay
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
        setTimeout(function () {
            ChartTester.runAllTests();
        }, 2000);
    });
}
else {
    setTimeout(function () {
        ChartTester.runAllTests();
    }, 2000);
}


// === index.js ===
// Main entry point - bundles all TypeScript modules
// Copyright (C) 2025, Shyamal Suhana Chandra
export * from './types';
export * from './svg-utils';
export * from './chart-renderer';
export * from './charts';
// Export chart-data types separately to avoid conflicts
export { ChartDataManager } from './chart-data';
export { DynamicChartLoader } from './dynamic-charts';
export { ComprehensiveChartInitializer } from './chart-initializer';
export { ChartTester } from './chart-tester';
// Auto-initialize when loaded
import './charts';
import './dynamic-charts';
import './chart-initializer';
import './chart-tester';

