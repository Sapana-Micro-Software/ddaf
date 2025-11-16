// Complete Diagram and Graph Rendering System
// Ensures all SVG diagrams and graphs render correctly
// Copyright (C) 2025, Shyamal Suhana Chandra

import { SVGUtils } from './svg-utils';

export class AllDiagramsRenderer {
    /**
     * Render all diagrams and graphs
     */
    static renderAll(): void {
        console.log('🎨 Rendering all diagrams and graphs...');

        // Architecture diagrams
        this.renderArchitectureDiagram();
        this.renderDataFlowDiagram();
        this.renderNetworkDiagram();

        // D3.js charts (if available)
        this.renderD3Charts();

        // Activation function plots
        this.renderActivationPlots();

        console.log('✅ All diagrams and graphs rendered');
    }

    /**
     * Render architecture diagram
     */
    private static renderArchitectureDiagram(): void {
        const container = document.getElementById('architecture-diagram');
        if (!container) {
            console.warn('Architecture diagram container not found');
            return;
        }

        // Check if already rendered
        if (container.querySelector('svg')) {
            return;
        }

        // Try using existing function first
        if (typeof (window as any).createArchitectureDiagram === 'function') {
            (window as any).createArchitectureDiagram();
            return;
        }

        // Fallback: Create simple architecture diagram
        const width = container.clientWidth || 800;
        const height = 500;
        const svg = SVGUtils.createSVG(width, height, 'diagram-svg');

        // Create DDAF architecture visualization
        const layers = [
            { name: 'Input', y: 50, color: '#6366f1' },
            { name: 'Data-Driven Layer', y: 120, color: '#8b5cf6' },
            { name: 'Dynamic Parameters', y: 190, color: '#ec4899' },
            { name: 'Online Learning', y: 260, color: '#f59e0b' },
            { name: 'Attention Mechanism', y: 330, color: '#10b981' },
            { name: 'Output', y: 400, color: '#6366f1' }
        ];

        layers.forEach(function(layer, index) {
            // Layer box
            const rect = SVGUtils.createRect(width / 2 - 150, layer.y - 25, 300, 50, {
                fill: layer.color,
                rx: 8,
                ry: 8,
                className: 'arch-layer'
            });
            svg.appendChild(rect);

            // Layer label
            const text = SVGUtils.createText(width / 2, layer.y + 5, layer.name, {
                anchor: 'middle',
                fontSize: 14,
                fontWeight: 700,
                fill: '#ffffff'
            });
            svg.appendChild(text);

            // Connection arrow
            if (index < layers.length - 1) {
                const arrow = SVGUtils.createLine(
                    width / 2,
                    layer.y + 25,
                    width / 2,
                    layers[index + 1].y - 25,
                    { stroke: '#6366f1', strokeWidth: 3 }
                );
                svg.appendChild(arrow);

                // Arrowhead
                const arrowhead = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                arrowhead.setAttribute('points', (width / 2 - 5) + ',' + (layers[index + 1].y - 30) + ' ' +
                    (width / 2 + 5) + ',' + (layers[index + 1].y - 30) + ' ' +
                    (width / 2) + ',' + (layers[index + 1].y - 40));
                arrowhead.setAttribute('fill', '#6366f1');
                svg.appendChild(arrowhead);
            }
        });

        container.appendChild(svg);
    }

    /**
     * Render data flow diagram
     */
    private static renderDataFlowDiagram(): void {
        const container = document.getElementById('data-flow-diagram');
        if (!container) {
            console.warn('Data flow diagram container not found');
            return;
        }

        if (container.querySelector('svg')) {
            return;
        }

        if (typeof (window as any).createDataFlowDiagram === 'function') {
            (window as any).createDataFlowDiagram();
            return;
        }

        // Fallback: Create simple data flow diagram
        const width = container.clientWidth || 800;
        const height = 400;
        const svg = SVGUtils.createSVG(width, height, 'diagram-svg');

        // Data flow visualization
        const nodes = [
            { name: 'Input Data', x: 100, y: height / 2, color: '#6366f1' },
            { name: 'Statistics', x: 250, y: height / 2 - 60, color: '#8b5cf6' },
            { name: 'Parameters', x: 250, y: height / 2 + 60, color: '#ec4899' },
            { name: 'Attention', x: 400, y: height / 2, color: '#f59e0b' },
            { name: 'Output', x: 550, y: height / 2, color: '#10b981' }
        ];

        nodes.forEach(function(node) {
            // Node circle
            const circle = SVGUtils.createCircle(node.x, node.y, 40, {
                fill: node.color,
                stroke: '#ffffff',
                strokeWidth: 3
            });
            svg.appendChild(circle);

            // Node label
            const text = SVGUtils.createText(node.x, node.y + 70, node.name, {
                anchor: 'middle',
                fontSize: 12,
                fontWeight: 600,
                fill: '#1e293b'
            });
            svg.appendChild(text);
        });

        // Connections
        const connections = [
            [0, 1], [0, 2], [1, 3], [2, 3], [3, 4]
        ];

        connections.forEach(function([from, to]) {
            const line = SVGUtils.createLine(
                nodes[from].x + 40,
                nodes[from].y,
                nodes[to].x - 40,
                nodes[to].y,
                { stroke: '#94a3b8', strokeWidth: 2 }
            );
            svg.appendChild(line);
        });

        container.appendChild(svg);
    }

    /**
     * Render network diagram
     */
    private static renderNetworkDiagram(): void {
        const container = document.getElementById('network-diagram');
        if (!container) {
            console.warn('Network diagram container not found');
            return;
        }

        if (container.querySelector('svg')) {
            return;
        }

        if (typeof (window as any).createNetworkDiagram === 'function') {
            (window as any).createNetworkDiagram();
            return;
        }

        // Fallback: Create simple network topology
        const width = container.clientWidth || 800;
        const height = 500;
        const svg = SVGUtils.createSVG(width, height, 'diagram-svg');

        // Network nodes
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = 150;

        const nodeCount = 8;
        for (let i = 0; i < nodeCount; i++) {
            const angle = (i / nodeCount) * 2 * Math.PI;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            // Outer node
            const circle = SVGUtils.createCircle(x, y, 30, {
                fill: '#6366f1',
                stroke: '#ffffff',
                strokeWidth: 2
            });
            svg.appendChild(circle);

            // Connection to center
            const line = SVGUtils.createLine(centerX, centerY, x, y, {
                stroke: '#cbd5e1',
                strokeWidth: 1
            });
            svg.appendChild(line);
        }

        // Center node
        const centerCircle = SVGUtils.createCircle(centerX, centerY, 50, {
            fill: '#ec4899',
            stroke: '#ffffff',
            strokeWidth: 4
        });
        svg.appendChild(centerCircle);

        const centerText = SVGUtils.createText(centerX, centerY + 5, 'DDAF', {
            anchor: 'middle',
            fontSize: 16,
            fontWeight: 900,
            fill: '#ffffff'
        });
        svg.appendChild(centerText);

        container.appendChild(svg);
    }

    /**
     * Render D3.js charts
     */
    private static renderD3Charts(): void {
        // Wait for D3.js to be available
        setTimeout(function() {
            if (typeof (window as any).d3 === 'undefined') {
                console.warn('D3.js not available, skipping D3 charts');
                return;
            }

            // Performance line chart
            if (typeof (window as any).createPerformanceLineChart === 'function') {
                (window as any).createPerformanceLineChart();
            }

            // Comparison bar chart
            if (typeof (window as any).createComparisonBarChart === 'function') {
                (window as any).createComparisonBarChart();
            }

            // Scatter plot
            if (typeof (window as any).createAccuracyScatterPlot === 'function') {
                (window as any).createAccuracyScatterPlot();
            }

            // Training curve
            if (typeof (window as any).createTrainingCurveChart === 'function') {
                (window as any).createTrainingCurveChart();
            }
        }, 500);
    }

    /**
     * Render activation function plots
     */
    private static renderActivationPlots(): void {
        const plots = [
            { id: 'relu-plot', name: 'ReLU', func: function(x: number) { return Math.max(0, x); } },
            { id: 'gelu-plot', name: 'GELU', func: function(x: number) { return 0.5 * x * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (x + 0.044715 * Math.pow(x, 3)))); } },
            { id: 'swish-plot', name: 'Swish', func: function(x: number) { return x / (1 + Math.exp(-x)); } },
            { id: 'ddaf-plot', name: 'DDAF', func: function(x: number) { return x * (1 + 0.1 * Math.sin(x * 0.5)) * (1 / (1 + Math.exp(-x * 0.5))); } }
        ];

        plots.forEach(function(plot) {
            const container = document.getElementById(plot.id);
            if (!container) return;

            if (container.querySelector('svg')) {
                return;
            }

            if (typeof (window as any).createActivationFunctionPlot === 'function') {
                (window as any).createActivationFunctionPlot(plot.id, plot.name, plot.func);
            } else {
                // Fallback rendering
                AllDiagramsRenderer.renderActivationPlot(container, plot.name, plot.func);
            }
        });
    }

    /**
     * Render a single activation function plot
     */
    private static renderActivationPlot(container: HTMLElement, name: string, func: (x: number) => number): void {
        const width = container.clientWidth || 400;
        const height = 300;
        const margin = { top: 20, right: 20, bottom: 40, left: 40 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        const svg = SVGUtils.createSVG(width, height, 'plot-svg');

        // Generate points
        const points: Array<{ x: number; y: number }> = [];
        const range = 5;
        const step = 0.1;
        for (let x = -range; x <= range; x += step) {
            points.push({ x: x, y: func(x) });
        }

        // Scales
        const xScale = function(x: number) {
            return margin.left + ((x + range) / (2 * range)) * chartWidth;
        };
        const yScale = function(y: number) {
            const minY = Math.min.apply(null, points.map(function(p) { return p.y; }));
            const maxY = Math.max.apply(null, points.map(function(p) { return p.y; }));
            const rangeY = maxY - minY || 1;
            return margin.top + chartHeight - ((y - minY) / rangeY) * chartHeight;
        };

        // Axes
        const xAxis = SVGUtils.createLine(margin.left, margin.top + chartHeight, width - margin.right, margin.top + chartHeight, {
            stroke: '#64748b',
            strokeWidth: 2
        });
        svg.appendChild(xAxis);

        const yAxis = SVGUtils.createLine(margin.left, margin.top, margin.left, margin.top + chartHeight, {
            stroke: '#64748b',
            strokeWidth: 2
        });
        svg.appendChild(yAxis);

        // Function curve
        let pathData = 'M ' + xScale(points[0].x) + ' ' + yScale(points[0].y);
        for (let i = 1; i < points.length; i++) {
            pathData += ' L ' + xScale(points[i].x) + ' ' + yScale(points[i].y);
        }
        const path = SVGUtils.createPath(pathData, {
            fill: 'none',
            stroke: '#6366f1',
            strokeWidth: 3,
            className: 'function-curve'
        });
        svg.appendChild(path);

        // Labels
        const title = SVGUtils.createText(width / 2, 15, name, {
            anchor: 'middle',
            fontSize: 14,
            fontWeight: 700,
            fill: '#1e293b'
        });
        svg.appendChild(title);

        container.appendChild(svg);
    }
}

// Export for global access
(window as any).AllDiagramsRenderer = AllDiagramsRenderer;

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() {
            AllDiagramsRenderer.renderAll();
        }, 1000);
    });
} else {
    setTimeout(function() {
        AllDiagramsRenderer.renderAll();
    }, 1000);
}
