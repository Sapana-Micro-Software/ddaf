// Main entry point - bundles all TypeScript modules
// Copyright (C) 2025, Shyamal Suhana Chandra
export * from './types';
export * from './svg-utils';
export * from './chart-renderer';
export * from './charts';
// Export chart-data types separately to avoid conflicts
export { ChartDataManager } from './chart-data';
export { DynamicChartLoader } from './dynamic-charts';
// Auto-initialize when loaded
import './charts';
import './dynamic-charts';
