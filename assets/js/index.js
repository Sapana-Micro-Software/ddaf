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
export { ComprehensiveBenchmarkRenderer } from './comprehensive-benchmarks';
export { AllDiagramsRenderer } from './all-diagrams';
export { CompleteBenchmarkRenderer } from './complete-benchmark-renderer';
// Auto-initialize when loaded
import './charts';
import './dynamic-charts';
import './chart-initializer';
import './chart-tester';
import './comprehensive-benchmarks';
import './all-diagrams';
import './complete-benchmark-renderer';
