#!/usr/bin/env node
// Copies the bundled AIOX into a project. Never overwrites an existing file.
const fs = require('fs');
const path = require('path');

const PATH_RULES = {
  'handoff-consolidation.md': '.aiox/handoffs/**',
  'workflow-execution.md': '.aiox-core/development/workflows/**',
  'tool-examples.md': '.aiox-core/data/**',
};

function copyNew(from, to, result) {
  if (fs.statSync(from).isDirectory()) {
    for (const name of fs.readdirSync(from)) copyNew(path.join(from, name), path.join(to, name), result);
    return;
  }
  if (fs.existsSync(to)) { result.skipped++; return; }
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
  result.copied++;
  const pattern = path.basename(path.dirname(to)) === 'rules' && PATH_RULES[path.basename(to)];
  if (pattern) fs.writeFileSync(to, `---\npaths: ${pattern}\n---\n\n${fs.readFileSync(to, 'utf8')}`);
}

function install(root, target) {
  const result = { copied: 0, skipped: 0 };
  copyNew(path.join(root, 'vendor', 'aiox'), target, result);
  const claude = path.join(target, 'CLAUDE.md');
  const nested = path.join(target, '.claude', 'CLAUDE.md');
  if (!fs.existsSync(claude) && !fs.existsSync(nested)) {
    fs.copyFileSync(path.join(root, 'templates', 'CLAUDE.md'), nested);
    result.copied++;
  }
  return result;
}

if (require.main === module) {
  const target = path.resolve(process.argv[2] || process.cwd());
  const home = require('os').homedir();
  if (target === path.parse(target).root || target === home) {
    console.error(`Refusing to install into ${target}. Open a project folder.`);
    process.exit(1);
  }
  const r = install(path.join(__dirname, '..'), target);
  console.log(`AIOX: ${r.copied} files copied, ${r.skipped} existing files kept.`);
}
module.exports = { install };
