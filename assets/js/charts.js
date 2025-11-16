// DDAF SVG Charts, Graphs, and Diagrams
// Copyright (C) 2025, Shyamal Suhana Chandra

// Wait for DOM and D3.js to load
document.addEventListener('DOMContentLoaded', function() {
    // Check if D3.js is loaded
    if (typeof d3 === 'undefined') {
        console.warn('D3.js not loaded, using fallback SVG generation');
        initFallbackCharts();
    } else {
        initD3Charts();
    }
    initSVGDiagrams();
    initActivationFunctionPlots();
    initBenchmarkCharts();
});

// Initialize D3.js based charts
function initD3Charts() {
    createPerformanceLineChart();
    createComparisonBarChart();
    createAccuracyScatterPlot();
    createTrainingCurveChart();
}

// Fallback SVG charts without D3.js
function initFallbackCharts() {
    createSVGBarChart('benchmark-bar-chart', {
        labels: ['ReLU', 'GELU', 'Swish', 'Mish', 'PReLU', 'Adaptive', 'DDAF'],
        values: [76.13, 77.84, 78.92, 79.42, 77.18, 80.67, 83.42],
        colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
        title: 'ImageNet Top-1 Accuracy (%)'
    });
}

// Create SVG Bar Chart
function createSVGBarChart(containerId, config) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = 400;
    const margin = { top: 40, right: 40, bottom: 60, left: 80 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const maxValue = Math.max(...config.values);
    const barWidth = chartWidth / config.values.length * 0.8;
    const barSpacing = chartWidth / config.values.length * 0.2;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.classList.add('chart-svg');

    // Add gradient definitions
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'barGradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '0%');
    gradient.setAttribute('y2', '100%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#6366f1');
    stop1.setAttribute('stop-opacity', '1');
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', '#8b5cf6');
    stop2.setAttribute('stop-opacity', '0.8');
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);

    // Y-axis
    const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    yAxis.setAttribute('transform', `translate(${margin.left}, ${margin.top})`);
    
    const yTicks = 5;
    for (let i = 0; i <= yTicks; i++) {
        const value = (maxValue / yTicks) * (yTicks - i);
        const y = (chartHeight / yTicks) * i;
        
        // Grid line
        const gridLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        gridLine.setAttribute('x1', '0');
        gridLine.setAttribute('y1', y);
        gridLine.setAttribute('x2', chartWidth);
        gridLine.setAttribute('y2', y);
        gridLine.setAttribute('stroke', '#e2e8f0');
        gridLine.setAttribute('stroke-width', '1');
        gridLine.setAttribute('stroke-dasharray', '4,4');
        yAxis.appendChild(gridLine);
        
        // Y-axis label
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', -10);
        label.setAttribute('y', y + 5);
        label.setAttribute('text-anchor', 'end');
        label.setAttribute('fill', '#64748b');
        label.setAttribute('font-size', '12');
        label.textContent = value.toFixed(1);
        yAxis.appendChild(label);
    }
    svg.appendChild(yAxis);

    // X-axis
    const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    xAxis.setAttribute('transform', `translate(${margin.left}, ${height - margin.bottom})`);
    
    const xAxisLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    xAxisLine.setAttribute('x1', '0');
    xAxisLine.setAttribute('y1', '0');
    xAxisLine.setAttribute('x2', chartWidth);
    xAxisLine.setAttribute('y2', '0');
    xAxisLine.setAttribute('stroke', '#64748b');
    xAxisLine.setAttribute('stroke-width', '2');
    xAxis.appendChild(xAxisLine);
    svg.appendChild(xAxis);

    // Bars
    const barsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    barsGroup.setAttribute('transform', `translate(${margin.left}, ${margin.top})`);

    config.values.forEach((value, index) => {
        const barHeight = (value / maxValue) * chartHeight;
        const x = index * (barWidth + barSpacing) + barSpacing / 2;
        const y = chartHeight - barHeight;

        // Bar rectangle
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', barWidth);
        rect.setAttribute('height', barHeight);
        rect.setAttribute('fill', config.colors[index] || '#6366f1');
        rect.setAttribute('rx', '4');
        rect.setAttribute('class', 'chart-bar-svg');
        rect.setAttribute('data-value', value);
        
        // Hover effect
        rect.addEventListener('mouseenter', function() {
            this.setAttribute('opacity', '0.8');
            this.setAttribute('transform', 'scale(1.05)');
            this.setAttribute('transform-origin', `${x + barWidth/2} ${y + barHeight}`);
        });
        rect.addEventListener('mouseleave', function() {
            this.setAttribute('opacity', '1');
            this.setAttribute('transform', 'scale(1)');
        });
        
        barsGroup.appendChild(rect);

        // Value label on bar
        if (barHeight > 20) {
            const valueLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            valueLabel.setAttribute('x', x + barWidth / 2);
            valueLabel.setAttribute('y', y - 5);
            valueLabel.setAttribute('text-anchor', 'middle');
            valueLabel.setAttribute('fill', '#1e293b');
            valueLabel.setAttribute('font-size', '12');
            valueLabel.setAttribute('font-weight', '600');
            valueLabel.textContent = value.toFixed(2);
            barsGroup.appendChild(valueLabel);
        }

        // X-axis label
        const xLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        xLabel.setAttribute('x', x + barWidth / 2);
        xLabel.setAttribute('y', chartHeight + 25);
        xLabel.setAttribute('text-anchor', 'middle');
        xLabel.setAttribute('fill', '#64748b');
        xLabel.setAttribute('font-size', '11');
        xLabel.setAttribute('transform', `rotate(-45 ${x + barWidth/2} ${chartHeight + 25})`);
        xLabel.setAttribute('transform-origin', `${x + barWidth/2} ${chartHeight + 25}`);
        xLabel.textContent = config.labels[index];
        barsGroup.appendChild(xLabel);
    });

    svg.appendChild(barsGroup);

    // Title
    const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    title.setAttribute('x', width / 2);
    title.setAttribute('y', 25);
    title.setAttribute('text-anchor', 'middle');
    title.setAttribute('fill', '#1e293b');
    title.setAttribute('font-size', '16');
    title.setAttribute('font-weight', '700');
    title.textContent = config.title || 'Chart';
    svg.appendChild(title);

    container.innerHTML = '';
    container.appendChild(svg);
}

// Create Performance Line Chart with D3.js
function createPerformanceLineChart() {
    const container = document.getElementById('performance-line-chart');
    if (!container || typeof d3 === 'undefined') return;

    const data = [
        { epoch: 0, relu: 10, gelu: 10, swish: 10, ddaf: 10 },
        { epoch: 10, relu: 45, gelu: 48, swish: 50, ddaf: 52 },
        { epoch: 20, relu: 62, gelu: 65, swish: 67, ddaf: 70 },
        { epoch: 30, relu: 70, gelu: 73, swish: 75, ddaf: 78 },
        { epoch: 40, relu: 74, gelu: 76, swish: 77, ddaf: 81 },
        { epoch: 50, relu: 76, gelu: 78, swish: 79, ddaf: 83 },
        { epoch: 60, relu: 76.1, gelu: 77.8, swish: 78.9, ddaf: 83.4 },
    ];

    const margin = { top: 40, right: 40, bottom: 60, left: 80 };
    const width = container.clientWidth || 800;
    const height = 400;
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', '0 0 ' + width + ' ' + height)
        .classed('chart-svg', true);

    const g = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Scales
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.epoch; })])
        .range([0, chartWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([chartHeight, 0]);

    // Line generator
    const line = d3.line()
        .x(function(d) { return xScale(d.epoch); })
        .y(function(d) { return yScale(d.value); })
        .curve(d3.curveMonotoneX);

    // Colors
    const colors = {
        relu: '#94a3b8',
        gelu: '#64748b',
        swish: '#475569',
        ddaf: '#6366f1'
    };

    // Draw grid
    g.append('g')
        .attr('class', 'grid')
        .attr('transform', 'translate(0,' + chartHeight + ')')
        .call(d3.axisBottom(xScale)
            .ticks(10)
            .tickSize(-chartHeight)
            .tickFormat(''))
        .selectAll('line')
        .attr('stroke', '#e2e8f0')
        .attr('stroke-dasharray', '4,4');

    g.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(yScale)
            .ticks(10)
            .tickSize(-chartWidth)
            .tickFormat(''))
        .selectAll('line')
        .attr('stroke', '#e2e8f0')
        .attr('stroke-dasharray', '4,4');

    // Draw lines with enhanced styling
    ['relu', 'gelu', 'swish', 'ddaf'].forEach(function(key) {
        const lineData = data.map(function(d) {
            return { epoch: d.epoch, value: d[key] };
        });
        
        g.append('path')
            .datum(lineData)
            .attr('fill', 'none')
            .attr('stroke', key === 'ddaf' ? 'url(#ddafLineGradient)' : colors[key])
            .attr('stroke-width', key === 'ddaf' ? 4 : 2)
            .attr('stroke-linecap', 'round')
            .attr('stroke-linejoin', 'round')
            .attr('stroke-dasharray', key === 'relu' ? '5,5' : 'none')
            .attr('d', line)
            .attr('class', 'line-' + key)
            .attr('filter', key === 'ddaf' ? 'url(#lineGlow)' : 'none')
            .style('opacity', 0)
            .transition()
            .duration(1500)
            .ease(d3.easeCubicOut)
            .style('opacity', 1);

        // Add dots
        g.selectAll('.dot-' + key)
            .data(lineData)
            .enter()
            .append('circle')
            .attr('cx', function(d) { return xScale(d.epoch); })
            .attr('cy', function(d) { return yScale(d.value); })
            .attr('r', 4)
            .attr('fill', colors[key])
            .attr('stroke', '#fff')
            .attr('stroke-width', 2)
            .style('opacity', 0)
            .transition()
            .delay(500)
            .duration(500)
            .style('opacity', 1);
    });

    // Axes
    g.append('g')
        .attr('transform', 'translate(0,' + chartHeight + ')')
        .call(d3.axisBottom(xScale).ticks(10))
        .append('text')
        .attr('x', chartWidth / 2)
        .attr('y', 50)
        .attr('fill', '#64748b')
        .attr('font-size', '14')
        .attr('text-anchor', 'middle')
        .text('Epoch');

    g.append('g')
        .call(d3.axisLeft(yScale).ticks(10))
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -50)
        .attr('x', -chartHeight / 2)
        .attr('fill', '#64748b')
        .attr('font-size', '14')
        .attr('text-anchor', 'middle')
        .text('Accuracy (%)');

    // Legend
    const legend = svg.append('g')
        .attr('transform', 'translate(' + (width - 200) + ', 20)');

    ['relu', 'gelu', 'swish', 'ddaf'].forEach(function(key, i) {
        const legendItem = legend.append('g')
            .attr('transform', 'translate(0, ' + (i * 25) + ')');

        legendItem.append('line')
            .attr('x1', 0)
            .attr('x2', 20)
            .attr('y1', 0)
            .attr('y2', 0)
            .attr('stroke', colors[key])
            .attr('stroke-width', key === 'ddaf' ? 3 : 2)
            .attr('stroke-dasharray', key === 'relu' ? '5,5' : 'none');

        legendItem.append('text')
            .attr('x', 30)
            .attr('y', 5)
            .attr('fill', '#1e293b')
            .attr('font-size', '12')
            .text(key.toUpperCase());
    });

    // Title
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', 25)
        .attr('text-anchor', 'middle')
        .attr('fill', '#1e293b')
        .attr('font-size', '16')
        .attr('font-weight', '700')
        .text('Training Accuracy Over Epochs');
}

// Create Comparison Bar Chart
function createComparisonBarChart() {
    const container = document.getElementById('comparison-bar-chart');
    if (!container || typeof d3 === 'undefined') return;

    const data = [
        { label: 'ReLU', value: 76.13, color: '#94a3b8' },
        { label: 'GELU', value: 77.84, color: '#64748b' },
        { label: 'Swish', value: 78.92, color: '#475569' },
        { label: 'Mish', value: 79.42, color: '#334155' },
        { label: 'PReLU', value: 77.18, color: '#1e293b' },
        { label: 'Adaptive', value: 80.67, color: '#8b5cf6' },
        { label: 'DDAF', value: 83.42, color: '#6366f1' }
    ];

    const margin = { top: 40, right: 40, bottom: 60, left: 80 };
    const width = container.clientWidth || 800;
    const height = 400;
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', '0 0 ' + width + ' ' + height)
        .classed('chart-svg', true);

    const g = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const xScale = d3.scaleBand()
        .domain(data.map(function(d) { return d.label; }))
        .range([0, chartWidth])
        .padding(0.2);

    const yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([chartHeight, 0]);

    // Grid lines
    g.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(yScale)
            .ticks(10)
            .tickSize(-chartWidth)
            .tickFormat(''))
        .selectAll('line')
        .attr('stroke', '#e2e8f0')
        .attr('stroke-dasharray', '4,4');

    // Bars
    const bars = g.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', function(d) { return xScale(d.label); })
        .attr('width', xScale.bandwidth())
        .attr('y', chartHeight)
        .attr('height', 0)
        .attr('fill', function(d) { return d.color; })
        .attr('rx', 4)
        .on('mouseenter', function(event, d) {
            var xPos = xScale(d.label) + xScale.bandwidth() / 2;
            d3.select(this)
                .attr('opacity', 0.8)
                .attr('transform', 'scale(1.05)')
                .attr('transform-origin', xPos + ' ' + chartHeight);
        })
        .on('mouseleave', function() {
            d3.select(this)
                .attr('opacity', 1)
                .attr('transform', 'scale(1)');
        });

    bars.transition()
        .duration(1000)
        .delay(function(d, i) { return i * 100; })
        .attr('y', function(d) { return yScale(d.value); })
        .attr('height', function(d) { return chartHeight - yScale(d.value); });

    // Value labels
    g.selectAll('.value-label')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'value-label')
        .attr('x', function(d) { return xScale(d.label) + xScale.bandwidth() / 2; })
        .attr('y', function(d) { return yScale(d.value) - 5; })
        .attr('text-anchor', 'middle')
        .attr('fill', '#1e293b')
        .attr('font-size', '12')
        .attr('font-weight', '600')
        .style('opacity', 0)
        .text(function(d) { return d.value.toFixed(2); })
        .transition()
        .delay(1000)
        .duration(500)
        .style('opacity', 1);

    // Axes
    g.append('g')
        .attr('transform', 'translate(0,' + chartHeight + ')')
        .call(d3.axisBottom(xScale))
        .selectAll('text')
        .attr('transform', 'rotate(-45)')
        .attr('text-anchor', 'end')
        .attr('dx', '-0.5em')
        .attr('dy', '0.5em');

    g.append('g')
        .call(d3.axisLeft(yScale).ticks(10))
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -50)
        .attr('x', -chartHeight / 2)
        .attr('fill', '#64748b')
        .attr('font-size', '14')
        .attr('text-anchor', 'middle')
        .text('Accuracy (%)');

    // Title
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', 25)
        .attr('text-anchor', 'middle')
        .attr('fill', '#1e293b')
        .attr('font-size', '16')
        .attr('font-weight', '700')
        .text('Activation Function Comparison');
}

// Create Accuracy Scatter Plot
function createAccuracyScatterPlot() {
    const container = document.getElementById('accuracy-scatter-plot');
    if (!container || typeof d3 === 'undefined') return;

    const data = [
        { x: 1200, y: 76.1, label: 'ReLU', color: '#94a3b8' },
        { x: 1172, y: 77.8, label: 'GELU', color: '#64748b' },
        { x: 1110, y: 78.9, label: 'Swish', color: '#475569' },
        { x: 1084, y: 79.4, label: 'Mish', color: '#334155' },
        { x: 1023, y: 80.7, label: 'Adaptive', color: '#8b5cf6' },
        { x: 1135, y: 83.4, label: 'DDAF', color: '#6366f1' }
    ];

    const margin = { top: 40, right: 40, bottom: 60, left: 80 };
    const width = container.clientWidth || 800;
    const height = 400;
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', '0 0 ' + width + ' ' + height)
        .classed('chart-svg', true);

    const g = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const xScale = d3.scaleLinear()
        .domain([1000, 1250])
        .range([0, chartWidth]);

    const yScale = d3.scaleLinear()
        .domain([75, 85])
        .range([chartHeight, 0]);

    // Grid
    g.append('g')
        .attr('class', 'grid')
        .attr('transform', 'translate(0,' + chartHeight + ')')
        .call(d3.axisBottom(xScale).ticks(10).tickSize(-chartHeight).tickFormat(''))
        .selectAll('line')
        .attr('stroke', '#e2e8f0')
        .attr('stroke-dasharray', '4,4');

    g.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(yScale).ticks(10).tickSize(-chartWidth).tickFormat(''))
        .selectAll('line')
        .attr('stroke', '#e2e8f0')
        .attr('stroke-dasharray', '4,4');

    // Tooltip (needs to be created before points for reference)
    const tooltip = d3.select('body').append('div')
        .attr('class', 'chart-tooltip')
        .style('opacity', 0)
        .style('position', 'absolute')
        .style('background', 'rgba(0, 0, 0, 0.8)')
        .style('color', '#fff')
        .style('padding', '8px 12px')
        .style('border-radius', '4px')
        .style('font-size', '12px')
        .style('pointer-events', 'none')
        .style('z-index', '10000');

    // Points
    g.selectAll('.point')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'point')
        .attr('cx', function(d) { return xScale(d.x); })
        .attr('cy', function(d) { return yScale(d.y); })
        .attr('r', 0)
        .attr('fill', function(d) { return d.color; })
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .on('mouseenter', function(event, d) {
            d3.select(this).attr('r', 10);
            tooltip.style('opacity', 1)
                .html(d.label + '<br/>Speed: ' + d.x + ' img/s<br/>Accuracy: ' + d.y + '%')
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 10) + 'px');
        })
        .on('mouseleave', function() {
            d3.select(this).attr('r', 6);
            tooltip.style('opacity', 0);
        })
        .transition()
        .duration(1000)
        .delay(function(d, i) { return i * 150; })
        .attr('r', 6);

    // Labels
    g.selectAll('.label')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('x', function(d) { return xScale(d.x); })
        .attr('y', function(d) { return yScale(d.y) - 10; })
        .attr('text-anchor', 'middle')
        .attr('fill', '#1e293b')
        .attr('font-size', '10')
        .style('opacity', 0)
        .text(function(d) { return d.label; })
        .transition()
        .delay(1000)
        .duration(500)
        .style('opacity', 1);

    // Axes
    g.append('g')
        .attr('transform', 'translate(0,' + chartHeight + ')')
        .call(d3.axisBottom(xScale))
        .append('text')
        .attr('x', chartWidth / 2)
        .attr('y', 50)
        .attr('fill', '#64748b')
        .attr('font-size', '14')
        .attr('text-anchor', 'middle')
        .text('Throughput (img/s)');

    g.append('g')
        .call(d3.axisLeft(yScale))
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -50)
        .attr('x', -chartHeight / 2)
        .attr('fill', '#64748b')
        .attr('font-size', '14')
        .attr('text-anchor', 'middle')
        .text('Accuracy (%)');

    // Title
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', 25)
        .attr('text-anchor', 'middle')
        .attr('fill', '#1e293b')
        .attr('font-size', '16')
        .attr('font-weight', '700')
        .text('Accuracy vs Throughput Trade-off');
}

// Create Training Curve Chart
function createTrainingCurveChart() {
    const container = document.getElementById('training-curve-chart');
    if (!container || typeof d3 === 'undefined') return;

    const data = Array.from({ length: 100 }, function(_, i) {
        return {
            epoch: i,
            train: 100 - 50 * Math.exp(-i / 20) + (Math.random() - 0.5) * 2,
            val: 100 - 55 * Math.exp(-i / 22) + (Math.random() - 0.5) * 2
        };
    });

    const margin = { top: 40, right: 40, bottom: 60, left: 80 };
    const width = container.clientWidth || 800;
    const height = 400;
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', '0 0 ' + width + ' ' + height)
        .classed('chart-svg', true);

    const g = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const xScale = d3.scaleLinear()
        .domain([0, 100])
        .range([0, chartWidth]);

    const yScale = d3.scaleLinear()
        .domain([40, 100])
        .range([chartHeight, 0]);

    // Gradient definition (needs to be before area)
    const defs = svg.append('defs');
    const gradient = defs.append('linearGradient')
        .attr('id', 'trainGradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%');
    gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#6366f1')
        .attr('stop-opacity', 0.5);
    gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#6366f1')
        .attr('stop-opacity', 0);

    const area = d3.area()
        .x(function(d) { return xScale(d.epoch); })
        .y0(chartHeight)
        .y1(function(d) { return yScale(d.train); })
        .curve(d3.curveMonotoneX);

    // Area for training
    g.append('path')
        .datum(data)
        .attr('fill', 'url(#trainGradient)')
        .attr('d', area)
        .style('opacity', 0.3);

    // Line for training
    const trainLine = d3.line()
        .x(function(d) { return xScale(d.epoch); })
        .y(function(d) { return yScale(d.train); })
        .curve(d3.curveMonotoneX);

    g.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#6366f1')
        .attr('stroke-width', 2)
        .attr('d', trainLine);

    // Line for validation
    const valLine = d3.line()
        .x(function(d) { return xScale(d.epoch); })
        .y(function(d) { return yScale(d.val); })
        .curve(d3.curveMonotoneX);

    g.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#ec4899')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5')
        .attr('d', valLine);

    // Axes
    g.append('g')
        .attr('transform', 'translate(0,' + chartHeight + ')')
        .call(d3.axisBottom(xScale).ticks(10))
        .append('text')
        .attr('x', chartWidth / 2)
        .attr('y', 50)
        .attr('fill', '#64748b')
        .attr('font-size', '14')
        .attr('text-anchor', 'middle')
        .text('Epoch');

    g.append('g')
        .call(d3.axisLeft(yScale).ticks(10))
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -50)
        .attr('x', -chartHeight / 2)
        .attr('fill', '#64748b')
        .attr('font-size', '14')
        .attr('text-anchor', 'middle')
        .text('Accuracy (%)');

    // Legend
    const legend = svg.append('g')
        .attr('transform', 'translate(' + (width - 150) + ', 20)');

    ['Training', 'Validation'].forEach(function(label, i) {
        const legendItem = legend.append('g')
            .attr('transform', 'translate(0, ' + (i * 25) + ')');

        legendItem.append('line')
            .attr('x1', 0)
            .attr('x2', 20)
            .attr('y1', 0)
            .attr('y2', 0)
            .attr('stroke', i === 0 ? '#6366f1' : '#ec4899')
            .attr('stroke-width', 2)
            .attr('stroke-dasharray', i === 1 ? '5,5' : 'none');

        legendItem.append('text')
            .attr('x', 30)
            .attr('y', 5)
            .attr('fill', '#1e293b')
            .attr('font-size', '12')
            .text(label);
    });

    // Title
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', 25)
        .attr('text-anchor', 'middle')
        .attr('fill', '#1e293b')
        .attr('font-size', '16')
        .attr('font-weight', '700')
        .text('Training and Validation Curves');
}

// Initialize SVG Architecture Diagrams
function initSVGDiagrams() {
    createArchitectureDiagram();
    createDataFlowDiagram();
    createNetworkDiagram();
}

// Create Architecture Diagram with enhanced animations
function createArchitectureDiagram() {
    const container = document.getElementById('architecture-diagram');
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = 500;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.classList.add('diagram-svg');
    
    // Add animation definitions
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const animateGlow = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animateGlow.setAttribute('attributeName', 'opacity');
    animateGlow.setAttribute('values', '0.3;0.8;0.3');
    animateGlow.setAttribute('dur', '2s');
    animateGlow.setAttribute('repeatCount', 'indefinite');
    defs.appendChild(animateGlow);
    
    // Add glow filter
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', 'archGlow');
    const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    feGaussianBlur.setAttribute('stdDeviation', '3');
    feGaussianBlur.setAttribute('result', 'coloredBlur');
    filter.appendChild(feGaussianBlur);
    const feMerge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
    feMerge.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode')).setAttribute('in', 'coloredBlur');
    feMerge.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode')).setAttribute('in', 'SourceGraphic');
    filter.appendChild(feMerge);
    defs.appendChild(filter);
    
    // Define gradients
    const gradient1 = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient1.setAttribute('id', 'archGrad1');
    gradient1.setAttribute('x1', '0%');
    gradient1.setAttribute('y1', '0%');
    gradient1.setAttribute('x2', '100%');
    gradient1.setAttribute('y2', '100%');
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#6366f1');
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', '#8b5cf6');
    gradient1.appendChild(stop1);
    gradient1.appendChild(stop2);
    defs.appendChild(gradient1);
    svg.appendChild(defs);

    // Input Layer
    const inputRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    inputRect.setAttribute('x', width * 0.1);
    inputRect.setAttribute('y', height * 0.4);
    inputRect.setAttribute('width', 100);
    inputRect.setAttribute('height', 60);
    inputRect.setAttribute('fill', 'url(#archGrad1)');
    inputRect.setAttribute('rx', '8');
    inputRect.setAttribute('stroke', '#4f46e5');
    inputRect.setAttribute('stroke-width', '2');
    svg.appendChild(inputRect);

    const inputText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    inputText.setAttribute('x', width * 0.1 + 50);
    inputText.setAttribute('y', height * 0.4 + 35);
    inputText.setAttribute('text-anchor', 'middle');
    inputText.setAttribute('fill', '#fff');
    inputText.setAttribute('font-size', '14');
    inputText.setAttribute('font-weight', '600');
    inputText.textContent = 'Input';
    svg.appendChild(inputText);

    // Hidden Layers
    for (let i = 0; i < 3; i++) {
        const x = width * 0.3 + i * 150;
        const y = height * 0.3 + i * 40;
        
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', 120);
        rect.setAttribute('height', 80);
        rect.setAttribute('fill', `rgba(99, 102, 241, ${0.7 - i * 0.1})`);
        rect.setAttribute('rx', '8');
        rect.setAttribute('stroke', '#6366f1');
        rect.setAttribute('stroke-width', '2');
        svg.appendChild(rect);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x + 60);
        text.setAttribute('y', y + 45);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#fff');
        text.setAttribute('font-size', '12');
        text.setAttribute('font-weight', '600');
        text.textContent = `Layer ${i + 1}`;
        svg.appendChild(text);

        // DDAF Badge with glow and animation
        const badge = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        badge.setAttribute('cx', x + 100);
        badge.setAttribute('cy', y + 10);
        badge.setAttribute('r', '8');
        badge.setAttribute('fill', '#ec4899');
        badge.setAttribute('filter', 'url(#archGlow)');
        badge.setAttribute('class', 'network-node');
        // Add pulsing animation
        const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animate.setAttribute('attributeName', 'r');
        animate.setAttribute('values', '8;10;8');
        animate.setAttribute('dur', '2s');
        animate.setAttribute('repeatCount', 'indefinite');
        badge.appendChild(animate);
        svg.appendChild(badge);

        const badgeText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        badgeText.setAttribute('x', x + 100);
        badgeText.setAttribute('y', y + 13);
        badgeText.setAttribute('text-anchor', 'middle');
        badgeText.setAttribute('fill', '#fff');
        badgeText.setAttribute('font-size', '8');
        badgeText.setAttribute('font-weight', '700');
        badgeText.textContent = 'D';
        svg.appendChild(badgeText);
    }

    // Output Layer
    const outputRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    outputRect.setAttribute('x', width * 0.75);
    outputRect.setAttribute('y', height * 0.4);
    outputRect.setAttribute('width', 100);
    outputRect.setAttribute('height', 60);
    outputRect.setAttribute('fill', 'url(#archGrad1)');
    outputRect.setAttribute('rx', '8');
    outputRect.setAttribute('stroke', '#4f46e5');
    outputRect.setAttribute('stroke-width', '2');
    svg.appendChild(outputRect);

    const outputText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    outputText.setAttribute('x', width * 0.75 + 50);
    outputText.setAttribute('y', height * 0.4 + 35);
    outputText.setAttribute('text-anchor', 'middle');
    outputText.setAttribute('fill', '#fff');
    outputText.setAttribute('font-size', '14');
    outputText.setAttribute('font-weight', '600');
    outputText.textContent = 'Output';
    svg.appendChild(outputText);

    // Arrows
    for (let i = 0; i < 4; i++) {
        const startX = width * 0.1 + 100 + i * 150;
        const endX = width * 0.3 + i * 150;
        const y = height * 0.43 + i * 20;
        
        const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        arrow.setAttribute('d', `M ${startX} ${y} L ${endX} ${y}`);
        arrow.setAttribute('stroke', '#6366f1');
        arrow.setAttribute('stroke-width', '3');
        arrow.setAttribute('fill', 'none');
        arrow.setAttribute('marker-end', 'url(#arrowhead)');
        svg.appendChild(arrow);
    }

    // Arrow marker
    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    marker.setAttribute('id', 'arrowhead');
    marker.setAttribute('markerWidth', '10');
    marker.setAttribute('markerHeight', '10');
    marker.setAttribute('refX', '9');
    marker.setAttribute('refY', '3');
    marker.setAttribute('orient', 'auto');
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', '0 0, 10 3, 0 6');
    polygon.setAttribute('fill', '#6366f1');
    marker.appendChild(polygon);
    defs.appendChild(marker);

    container.appendChild(svg);
}

// Create Data Flow Diagram
function createDataFlowDiagram() {
    const container = document.getElementById('data-flow-diagram');
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = 400;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.classList.add('diagram-svg');

    // Components
    const components = [
        { x: width * 0.1, y: height * 0.2, label: 'Input Data', color: '#6366f1' },
        { x: width * 0.3, y: height * 0.2, label: 'Feature Extract', color: '#8b5cf6' },
        { x: width * 0.5, y: height * 0.2, label: 'DDAF Layer', color: '#ec4899' },
        { x: width * 0.7, y: height * 0.2, label: 'Attention', color: '#f59e0b' },
        { x: width * 0.9, y: height * 0.2, label: 'Output', color: '#10b981' }
    ];

    components.forEach((comp, i) => {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', comp.x - 50);
        rect.setAttribute('y', comp.y - 30);
        rect.setAttribute('width', 100);
        rect.setAttribute('height', 60);
        rect.setAttribute('fill', comp.color);
        rect.setAttribute('rx', '8');
        rect.setAttribute('opacity', '0.8');
        svg.appendChild(rect);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', comp.x);
        text.setAttribute('y', comp.y + 5);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#fff');
        text.setAttribute('font-size', '12');
        text.setAttribute('font-weight', '600');
        text.textContent = comp.label;
        svg.appendChild(text);

        if (i < components.length - 1) {
            const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            arrow.setAttribute('d', `M ${comp.x + 50} ${comp.y} L ${components[i + 1].x - 50} ${components[i + 1].y}`);
            arrow.setAttribute('stroke', '#64748b');
            arrow.setAttribute('stroke-width', '2');
            arrow.setAttribute('fill', 'none');
            arrow.setAttribute('marker-end', 'url(#arrowhead2)');
            svg.appendChild(arrow);
        }
    });

    // Arrow marker
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    marker.setAttribute('id', 'arrowhead2');
    marker.setAttribute('markerWidth', '10');
    marker.setAttribute('markerHeight', '10');
    marker.setAttribute('refX', '9');
    marker.setAttribute('refY', '3');
    marker.setAttribute('orient', 'auto');
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', '0 0, 10 3, 0 6');
    polygon.setAttribute('fill', '#64748b');
    marker.appendChild(polygon);
    defs.appendChild(marker);
    svg.insertBefore(defs, svg.firstChild);

    container.appendChild(svg);
}

// Create Network Diagram
function createNetworkDiagram() {
    const container = document.getElementById('network-diagram');
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = 500;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.classList.add('diagram-svg');

    // Nodes
    const nodes = [
        { x: width * 0.2, y: height * 0.2, label: 'Node 1' },
        { x: width * 0.4, y: height * 0.2, label: 'Node 2' },
        { x: width * 0.6, y: height * 0.2, label: 'Node 3' },
        { x: width * 0.3, y: height * 0.5, label: 'Node 4' },
        { x: width * 0.5, y: height * 0.5, label: 'Node 5' },
        { x: width * 0.4, y: height * 0.8, label: 'Node 6' }
    ];

    // Connections
    const connections = [
        [0, 1], [1, 2], [0, 3], [1, 3], [1, 4],
        [2, 4], [3, 5], [4, 5]
    ];

    // Draw connections
    connections.forEach(([from, to]) => {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', nodes[from].x);
        line.setAttribute('y1', nodes[from].y);
        line.setAttribute('x2', nodes[to].x);
        line.setAttribute('y2', nodes[to].y);
        line.setAttribute('stroke', '#94a3b8');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('opacity', '0.5');
        svg.appendChild(line);
    });

    // Draw nodes
    nodes.forEach((node, i) => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', node.x);
        circle.setAttribute('cy', node.y);
        circle.setAttribute('r', '25');
        circle.setAttribute('fill', i === 0 || i === nodes.length - 1 ? '#6366f1' : '#8b5cf6');
        circle.setAttribute('stroke', '#fff');
        circle.setAttribute('stroke-width', '3');
        circle.classList.add('network-node');
        svg.appendChild(circle);

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', node.x);
        text.setAttribute('y', node.y + 45);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#1e293b');
        text.setAttribute('font-size', '12');
        text.setAttribute('font-weight', '600');
        text.textContent = node.label;
        svg.appendChild(text);
    });

    container.appendChild(svg);
}

// Initialize Activation Function Plots
function initActivationFunctionPlots() {
    createActivationFunctionPlot('relu-plot', 'ReLU', x => Math.max(0, x));
    createActivationFunctionPlot('gelu-plot', 'GELU', x => 0.5 * x * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (x + 0.044715 * Math.pow(x, 3)))));
    createActivationFunctionPlot('swish-plot', 'Swish', x => x / (1 + Math.exp(-x)));
    createActivationFunctionPlot('ddaf-plot', 'DDAF', x => {
        // Simplified DDAF function for visualization
        return x * (1 + 0.1 * Math.sin(x * 0.5)) * (1 / (1 + Math.exp(-x * 0.5)));
    });
}

// Create Activation Function Plot
function createActivationFunctionPlot(containerId, name, func) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.classList.add('plot-svg');

    // Generate data points
    const points = [];
    const range = 5;
    const step = 0.1;
    for (let x = -range; x <= range; x += step) {
        points.push({ x, y: func(x) });
    }

    // Scales
    const xScale = (x) => margin.left + ((x + range) / (2 * range)) * chartWidth;
    const yScale = (y) => {
        const minY = Math.min(...points.map(p => p.y));
        const maxY = Math.max(...points.map(p => p.y));
        const rangeY = maxY - minY || 1;
        return margin.top + chartHeight - ((y - minY) / rangeY) * chartHeight;
    };

    // Draw axes
    const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    xAxis.setAttribute('x1', margin.left);
    xAxis.setAttribute('y1', margin.top + chartHeight);
    xAxis.setAttribute('x2', width - margin.right);
    xAxis.setAttribute('y2', margin.top + chartHeight);
    xAxis.setAttribute('stroke', '#64748b');
    xAxis.setAttribute('stroke-width', '2');
    svg.appendChild(xAxis);

    const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    yAxis.setAttribute('x1', margin.left);
    yAxis.setAttribute('y1', margin.top);
    yAxis.setAttribute('x2', margin.left);
    yAxis.setAttribute('y2', height - margin.bottom);
    yAxis.setAttribute('stroke', '#64748b');
    yAxis.setAttribute('stroke-width', '2');
    svg.appendChild(yAxis);

    // Draw function curve
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let pathData = `M ${xScale(points[0].x)} ${yScale(points[0].y)}`;
    for (let i = 1; i < points.length; i++) {
        pathData += ` L ${xScale(points[i].x)} ${yScale(points[i].y)}`;
    }
    path.setAttribute('d', pathData);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#6366f1');
    path.setAttribute('stroke-width', '3');
    path.setAttribute('class', 'function-curve');
    svg.appendChild(path);

    // Labels
    const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    title.setAttribute('x', width / 2);
    title.setAttribute('y', 15);
    title.setAttribute('text-anchor', 'middle');
    title.setAttribute('fill', '#1e293b');
    title.setAttribute('font-size', '14');
    title.setAttribute('font-weight', '700');
    title.textContent = name;
    svg.appendChild(title);

    const xLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    xLabel.setAttribute('x', width / 2);
    xLabel.setAttribute('y', height - 5);
    xLabel.setAttribute('text-anchor', 'middle');
    xLabel.setAttribute('fill', '#64748b');
    xLabel.setAttribute('font-size', '12');
    xLabel.textContent = 'x';
    svg.appendChild(xLabel);

    const yLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    yLabel.setAttribute('x', 15);
    yLabel.setAttribute('y', height / 2);
    yLabel.setAttribute('text-anchor', 'middle');
    yLabel.setAttribute('fill', '#64748b');
    yLabel.setAttribute('font-size', '12');
    yLabel.setAttribute('transform', `rotate(-90, 15, ${height / 2})`);
    yLabel.textContent = 'f(x)';
    svg.appendChild(yLabel);

    container.appendChild(svg);
}

// Initialize Benchmark Charts
function initBenchmarkCharts() {
    // Wait for tab switching to ensure containers exist
    setTimeout(() => {
        createBenchmarkSVGCharts();
    }, 500);
    
    // Recreate charts when tabs are switched
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            setTimeout(() => {
                createBenchmarkSVGCharts();
            }, 100);
        });
    });
}

// Create SVG Bar Charts for all benchmarks
function createBenchmarkSVGCharts() {
    // Accuracy Tab Charts
    createBenchmarkBarChart('imagenet-chart', {
        labels: ['ReLU', 'GELU', 'Swish', 'Mish', 'PReLU', 'Adaptive', 'DDAF'],
        values: [76.13, 77.84, 78.92, 79.42, 77.18, 80.67, 83.42],
        colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
        yLabel: 'Top-1 Accuracy (%)',
        maxValue: 100
    });
    
    createBenchmarkBarChart('cifar10-chart', {
        labels: ['ReLU', 'GELU', 'Swish', 'Adaptive', 'DDAF'],
        values: [92.34, 93.12, 93.68, 94.18, 96.08],
        colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
        yLabel: 'Test Accuracy (%)',
        maxValue: 100
    });
    
    createBenchmarkBarChart('glue-chart', {
        labels: ['GELU', 'Swish', 'Adaptive', 'DDAF'],
        values: [78.52, 79.14, 80.28, 82.67],
        colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
        yLabel: 'Average GLUE Score',
        maxValue: 100
    });
    
    createBenchmarkBarChart('cifar100-chart', {
        labels: ['ReLU', 'GELU', 'Swish', 'Mish', 'Adaptive', 'DDAF'],
        values: [68.42, 69.87, 70.56, 71.23, 71.94, 74.23],
        colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
        yLabel: 'Test Accuracy (%)',
        maxValue: 100
    });
    
    createBenchmarkBarChart('squad-chart', {
        labels: ['GELU', 'Swish', 'Adaptive', 'DDAF'],
        values: [76.83, 77.42, 78.91, 80.34],
        colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
        yLabel: 'F1 Score',
        maxValue: 100
    });
    
    // Speed Tab Charts
    createBenchmarkBarChart('inference-speed-chart', {
        labels: ['ReLU', 'GELU', 'Swish', 'Mish', 'Adaptive', 'DDAF'],
        values: [1247, 1172, 1110, 1084, 1023, 1135],
        colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
        yLabel: 'Images/sec',
        maxValue: 1300,
        formatValue: function(v) { return v.toLocaleString() + ' img/s'; }
    });
    
    createBenchmarkBarChart('training-throughput-chart', {
        labels: ['ReLU', 'GELU', 'Swish', 'Adaptive', 'DDAF'],
        values: [892, 830, 785, 723, 794],
        colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
        yLabel: 'Samples/sec',
        maxValue: 1000,
        formatValue: function(v) { return v + ' samples/s'; }
    });
    
    // Memory Tab Charts
    createBenchmarkBarChart('memory-usage-chart', {
        labels: ['ReLU', 'GELU', 'Swish', 'Mish', 'Adaptive', 'DDAF'],
        values: [4.2, 4.2, 4.24, 4.28, 4.96, 4.62],
        colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
        yLabel: 'Peak Memory (GB)',
        maxValue: 5.5,
        formatValue: function(v) { return v + ' GB'; }
    });
    
    createBenchmarkBarChart('memory-efficiency-chart', {
        labels: ['ReLU', 'PReLU', 'Adaptive', 'DDAF'],
        values: [0, 0.02, 0.08, 0.05],
        colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
        yLabel: 'Parameter Overhead (%)',
        maxValue: 0.1,
        formatValue: function(v) { return v + '%'; }
    });
    
    // Training Time Tab Charts
    createBenchmarkBarChart('time-to-target-chart', {
        labels: ['ReLU', 'GELU', 'Swish', 'Adaptive', 'DDAF'],
        values: [18.4, 17.5, 16.9, 16.2, 15.6],
        colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
        yLabel: 'Time (hours)',
        maxValue: 20,
        formatValue: function(v) { return v + ' hrs'; },
        lowerIsBetter: true
    });
    
    createBenchmarkBarChart('total-training-time-chart', {
        labels: ['ReLU', 'GELU', 'Swish', 'Adaptive', 'DDAF'],
        values: [24.8, 25.8, 26.5, 27.8, 26.8],
        colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
        yLabel: 'Time (hours)',
        maxValue: 30,
        formatValue: (v) => `${v} hrs`
    });
    
    // Convergence Tab Charts
    createBenchmarkBarChart('epochs-convergence-chart', {
        labels: ['ReLU', 'GELU', 'Swish', 'Adaptive', 'DDAF'],
        values: [142, 134, 128, 121, 111],
        colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
        yLabel: 'Epochs',
        maxValue: 150,
        formatValue: function(v) { return v + ' epochs'; },
        lowerIsBetter: true
    });
    
    createBenchmarkBarChart('final-loss-chart', {
        labels: ['ReLU', 'GELU', 'Swish', 'Adaptive', 'DDAF'],
        values: [1.247, 1.198, 1.162, 1.109, 1.062],
        colors: ['#94a3b8', '#94a3b8', '#94a3b8', '#94a3b8', '#6366f1'],
        yLabel: 'Cross-entropy Loss',
        maxValue: 1.3,
        formatValue: (v) => v.toFixed(3),
        lowerIsBetter: true
    });
}

// Create a benchmark bar chart (works with or without D3.js)
function createBenchmarkBarChart(containerId, config) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Clear existing content
    container.innerHTML = '';
    
    // Use D3.js if available, otherwise use fallback
    if (typeof d3 !== 'undefined') {
        createD3BenchmarkChart(container, config);
    } else {
        createSVGBarChart(containerId, config);
    }
}

// Create D3.js based benchmark chart
function createD3BenchmarkChart(container, config) {
    const containerId = container.id || 'default';
    const width = container.clientWidth || 800;
    const height = 350;
    const margin = { top: 20, right: 20, bottom: 60, left: 70 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', '0 0 ' + width + ' ' + height)
        .classed('chart-svg', true);

    const g = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const xScale = d3.scaleBand()
        .domain(config.labels)
        .range([0, chartWidth])
        .padding(0.2);

    const yScale = d3.scaleLinear()
        .domain([0, config.maxValue || d3.max(config.values) * 1.1])
        .range([chartHeight, 0]);

    // Grid lines
    g.append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(yScale)
            .ticks(8)
            .tickSize(-chartWidth)
            .tickFormat(''))
        .selectAll('line')
        .attr('stroke', '#e2e8f0')
        .attr('stroke-dasharray', '4,4')
        .attr('opacity', 0.7);

    // Add gradient definitions for jazzy bars
    const defs = svg.append('defs');
    const gradientId = 'barGradient-' + containerId.replace(/[^a-zA-Z0-9]/g, '_');
    const filterId = 'glow-' + containerId.replace(/[^a-zA-Z0-9]/g, '_');
    
    const gradient = defs.append('linearGradient')
        .attr('id', gradientId)
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%');
    gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#6366f1')
        .attr('stop-opacity', 1);
    gradient.append('stop')
        .attr('offset', '50%')
        .attr('stop-color', '#8b5cf6')
        .attr('stop-opacity', 1);
    gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', '#ec4899')
        .attr('stop-opacity', 0.9);
    
    // Add glow filter with proper namespacing for browser compatibility
    const glowFilter = defs.append('filter')
        .attr('id', filterId)
        .attr('x', '-50%')
        .attr('y', '-50%')
        .attr('width', '200%')
        .attr('height', '200%');
    glowFilter.append('feGaussianBlur')
        .attr('stdDeviation', '3')
        .attr('result', 'coloredBlur');
    const feMerge = glowFilter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Bars with enhanced styling - using function expressions for better browser compatibility
    const bars = g.selectAll('.bar')
        .data(config.values)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', function(d, i) { return xScale(config.labels[i]); })
        .attr('width', xScale.bandwidth())
        .attr('y', chartHeight)
        .attr('height', 0)
        .attr('fill', function(d, i) {
            // Use gradient for DDAF (last item), regular colors for others
            if (i === config.values.length - 1 && config.labels[i] === 'DDAF') {
                return 'url(#' + gradientId + ')';
            }
            return config.colors[i] || '#6366f1';
        })
        .attr('rx', 6)
        .attr('ry', 6)
        .attr('stroke', function(d, i) {
            return i === config.values.length - 1 && config.labels[i] === 'DDAF' ? '#fff' : 'rgba(255,255,255,0.8)';
        })
        .attr('stroke-width', function(d, i) {
            return i === config.values.length - 1 && config.labels[i] === 'DDAF' ? 3 : 2;
        })
        .attr('filter', function(d, i) {
            return i === config.values.length - 1 && config.labels[i] === 'DDAF' ? 'url(#' + filterId + ')' : 'none';
        })
        .attr('opacity', 0)
        .each(function(d, i) {
            // Store index for later use in event handlers
            this.setAttribute('data-index', i);
        })
        .on('mouseenter', function(event, d) {
            var index = parseInt(this.getAttribute('data-index'), 10);
            var label = config.labels[index];
            var xPos = xScale(label) + xScale.bandwidth() / 2;
            d3.select(this)
                .attr('opacity', 0.9)
                .attr('transform', 'scale(1.08) translate(0, -5)')
                .attr('transform-origin', xPos + ' ' + chartHeight)
                .attr('filter', 'url(#' + filterId + ')');
        })
        .on('mouseleave', function() {
            var index = parseInt(this.getAttribute('data-index'), 10);
            var isDDAF = index === config.values.length - 1 && config.labels[index] === 'DDAF';
            d3.select(this)
                .attr('opacity', 1)
                .attr('transform', 'scale(1)')
                .attr('filter', isDDAF ? 'url(#' + filterId + ')' : 'none');
        });

    bars.transition()
        .duration(1500)
        .delay(function(d, i) { return i * 120; })
        .ease(d3.easeElasticOut)
        .attr('y', function(d) { return yScale(d); })
        .attr('height', function(d) { return chartHeight - yScale(d); })
        .attr('opacity', 1);

    // Value labels on bars with enhanced styling
    g.selectAll('.value-label')
        .data(config.values)
        .enter()
        .append('text')
        .attr('class', 'value-label')
        .attr('x', function(d, i) { return xScale(config.labels[i]) + xScale.bandwidth() / 2; })
        .attr('y', function(d) { return yScale(d) - 8; })
        .attr('text-anchor', 'middle')
        .attr('fill', function(d, i) {
            if (i === config.values.length - 1 && config.labels[i] === 'DDAF') {
                return '#6366f1';
            }
            return '#1e293b';
        })
        .attr('font-size', function(d, i) {
            return i === config.values.length - 1 && config.labels[i] === 'DDAF' ? '13' : '11';
        })
        .attr('font-weight', function(d, i) {
            return i === config.values.length - 1 && config.labels[i] === 'DDAF' ? '900' : '600';
        })
        .attr('stroke', function(d, i) {
            return i === config.values.length - 1 && config.labels[i] === 'DDAF' ? '#fff' : 'none';
        })
        .attr('stroke-width', function(d, i) {
            return i === config.values.length - 1 && config.labels[i] === 'DDAF' ? '0.5' : '0';
        })
        .style('opacity', 0)
        .text(function(d) {
            return config.formatValue ? config.formatValue(d) : d.toFixed(2);
        })
        .transition()
        .delay(1500)
        .duration(800)
        .ease(d3.easeBounceOut)
        .style('opacity', 1)
        .attr('y', function(d) { return yScale(d) - 5; });

    // X-axis
    g.append('g')
        .attr('transform', 'translate(0,' + chartHeight + ')')
        .call(d3.axisBottom(xScale))
        .selectAll('text')
        .attr('transform', 'rotate(-45)')
        .attr('text-anchor', 'end')
        .attr('dx', '-0.5em')
        .attr('dy', '0.5em')
        .attr('font-size', '11');

    // Y-axis
    g.append('g')
        .call(d3.axisLeft(yScale).ticks(8))
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -50)
        .attr('x', -chartHeight / 2)
        .attr('fill', '#64748b')
        .attr('font-size', '12')
        .attr('text-anchor', 'middle')
        .text(config.yLabel || 'Value');
}
