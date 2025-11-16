// Enhanced Chart Renderer with SVG Support
// Copyright (C) 2025, Shyamal Suhana Chandra

import { SVGUtils } from './svg-utils';
import { ChartConfig, ChartContainer } from './types';

export class ChartRenderer {
    /**
     * Render a bar chart with enhanced SVG support
     */
    static renderBarChart(containerId: string, config: ChartConfig): void {
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
        const defs = SVGUtils.createElement('defs') as SVGDefsElement;
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
            rect.addEventListener('mouseenter', function() {
                rect.setAttribute('transform', 'scale(1.05) translate(0, -5)');
                rect.setAttribute('opacity', '0.9');
            });

            rect.addEventListener('mouseleave', function() {
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

            const valueLabel = SVGUtils.createText(
                x + barWidth / 2,
                y - 5,
                valueText,
                {
                    ...labelOptions,
                    anchor: 'middle'
                }
            );

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
        const xAxisLine = SVGUtils.createLine(
            margin.left,
            margin.top + chartHeight,
            width - margin.right,
            margin.top + chartHeight,
            { stroke: '#64748b', strokeWidth: 2 }
        );
        xAxis.appendChild(xAxisLine);

        // X-axis labels
        config.labels.forEach((label, index) => {
            const x = margin.left + index * barSpacing + barSpacing / 2;
            const labelText = SVGUtils.createText(
                x,
                height - 10,
                label,
                {
                    anchor: 'middle',
                    fontSize: 11,
                    fill: '#64748b'
                }
            );
            xAxis.appendChild(labelText);
        });

        svg.appendChild(xAxis);

        // Y-axis
        const yAxis = SVGUtils.createGroup('y-axis');
        const yAxisLine = SVGUtils.createLine(
            margin.left,
            margin.top,
            margin.left,
            margin.top + chartHeight,
            { stroke: '#64748b', strokeWidth: 2 }
        );
        yAxis.appendChild(yAxisLine);

        // Y-axis labels and grid lines
        const numTicks = 5;
        for (let i = 0; i <= numTicks; i++) {
            const value = (maxValue / numTicks) * i;
            const y = margin.top + chartHeight - (i / numTicks) * chartHeight;

            // Grid line
            const gridLine = SVGUtils.createLine(
                margin.left,
                y,
                width - margin.right,
                y,
                {
                    stroke: '#e2e8f0',
                    strokeWidth: 1,
                    strokeDasharray: '2,2'
                }
            );
            yAxis.appendChild(gridLine);

            // Label
            const labelText = SVGUtils.createText(
                margin.left - 10,
                y + 4,
                value.toFixed(1),
                {
                    anchor: 'end',
                    fontSize: 10,
                    fill: '#64748b'
                }
            );
            yAxis.appendChild(labelText);
        }

        svg.appendChild(yAxis);

        // Y-axis title
        if (config.yLabel) {
            const yLabel = SVGUtils.createText(
                15,
                height / 2,
                config.yLabel,
                {
                    anchor: 'middle',
                    fontSize: 12,
                    fill: '#64748b'
                }
            );
            yLabel.setAttribute('transform', `rotate(-90, 15, ${height / 2})`);
            svg.appendChild(yLabel);
        }

        container.appendChild(svg);
    }

    /**
     * Verify SVG was created successfully
     */
    static verifySVG(containerId: string): boolean {
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
