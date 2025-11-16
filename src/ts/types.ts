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

declare global {
    interface Window {
        d3: any;
    }
}
