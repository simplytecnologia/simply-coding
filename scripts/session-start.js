#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { install, shouldAutoInstall, isUnsafeTarget } = require('./install-aiox.js');

const root = path.join(__dirname, '..');
process.stdout.write(fs.readFileSync(path.join(root, 'templates', 'token-efficiency.md'), 'utf8'));

// Never block the session: a failed install only leaves a note.
try {
  const target = path.resolve(process.env.CLAUDE_PROJECT_DIR || process.cwd());
  if (!isUnsafeTarget(target) && shouldAutoInstall(target)) {
    const r = install(root, target);
    process.stdout.write(`\nSimply Coding installed AIOX in this project (${r.copied} files copied, ${r.skipped} kept). Tell the user once, in their language. To opt out, they delete .aiox-core and create an empty .simply-coding-sem-aiox file.\n`);
  }
} catch (error) {
  process.stdout.write(`\nSimply Coding could not install AIOX: ${error.message}. Tell the user and suggest /simply-coding:instalar-aiox.\n`);
}
