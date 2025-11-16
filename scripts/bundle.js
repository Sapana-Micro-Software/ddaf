#!/usr/bin/env node

/**
 * Bundle TypeScript compiled files into a single charts-enhanced.js
 */

const fs = require('fs');
const path = require('path');

const jsDir = path.join(__dirname, '..', 'assets', 'js');
const outputFile = path.join(jsDir, 'charts-enhanced.js');

// Files to bundle in order (excluding dynamic-charts which is bundled separately)
const filesToBundle = [
    'types.js',
    'svg-utils.js',
    'chart-renderer.js',
    'chart-data.js',
    'charts.js',
    'chart-initializer.js',
    'chart-tester.js',
    'comprehensive-benchmarks.js',
    'all-diagrams.js',
    'complete-benchmark-renderer.js',
    'index.js'
];

let bundledContent = '// DDAF Enhanced Charts - TypeScript Compiled\n';
bundledContent += '// Copyright (C) 2025, Shyamal Suhana Chandra\n\n';

// Read and concatenate files
filesToBundle.forEach((file) => {
    const filePath = path.join(jsDir, file);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        bundledContent += `\n// === ${file} ===\n`;
        bundledContent += content;
        bundledContent += '\n';
    } else {
        console.warn(`Warning: ${file} not found, skipping...`);
    }
});

// Write bundled file
fs.writeFileSync(outputFile, bundledContent, 'utf8');
console.log(`✅ Bundled TypeScript output to ${outputFile}`);

// Clean up individual files
filesToBundle.forEach((file) => {
    const filePath = path.join(jsDir, file);
    if (fs.existsSync(filePath) && file !== 'index.js') {
        fs.unlinkSync(filePath);
    }
});

console.log('✅ TypeScript build complete!');
