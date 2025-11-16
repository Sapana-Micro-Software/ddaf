#!/usr/bin/env node

/**
 * Bundle dynamic charts separately for AJAX loading
 */

const fs = require('fs');
const path = require('path');

const jsDir = path.join(__dirname, '..', 'assets', 'js');
const outputFile = path.join(jsDir, 'dynamic-charts.js');

// Files to bundle for dynamic charts
const filesToBundle = [
    'chart-data.js',
    'dynamic-charts.js'
];

let bundledContent = '// DDAF Dynamic Charts with AJAX - TypeScript Compiled\n';
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
console.log(`✅ Bundled dynamic charts to ${outputFile}`);

// Clean up individual files (keep them for main bundle)
console.log('✅ Dynamic charts bundle complete!');
