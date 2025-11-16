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


// === index.js ===
// Main entry point - bundles all TypeScript modules
// Copyright (C) 2025, Shyamal Suhana Chandra
export * from './types';
export * from './svg-utils';
export * from './chart-renderer';
export * from './charts';
// Auto-initialize when loaded
import './charts';

