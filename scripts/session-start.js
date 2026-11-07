#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
process.stdout.write(fs.readFileSync(path.join(__dirname, '..', 'templates', 'token-efficiency.md'), 'utf8'));
