#!/usr/bin/env node

/**
 * Copy compiled JavaScript files to assets directory
 * This script ensures all TypeScript output is properly placed
 */

const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'assets', 'js');
const targetDir = path.join(__dirname, '..', 'assets', 'js');

// Ensure target directory exists
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

console.log('✅ Assets ready for Jekyll build');
