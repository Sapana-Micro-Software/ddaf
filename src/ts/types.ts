// Type definitions for DDAF Charts
// Copyright (C) 2025, Shyamal Suhana Chandra

export interface ChartConfig {
    labels: string[];
    values: number[];
    colors?: string[];
    yLabel?: string;
    maxValue?: number;
    formatValue?: (v: number) => string;
    lowerIsBetter?: boolean;
}

export interface ChartContainer {
    id: string;
    element: HTMLElement;
    width: number;
    height: number;
}

export interface SVGElement {
    element: SVGElement;
    namespace: string;
}

export interface ChartDataPoint {
    label: string;
    value: number;
    color?: string;
    index: number;
}

export interface LineChartData {
    epoch: number;
    relu?: number;
    gelu?: number;
    swish?: number;
    ddaf?: number;
    [key: string]: number | undefined;
}

export interface ScatterPlotPoint {
    x: number;
    y: number;
    label: string;
    color: string;
}

// BenchmarkData moved to chart-data.ts to avoid conflicts

declare global {
    interface Window {
        d3: any;
    }
}
