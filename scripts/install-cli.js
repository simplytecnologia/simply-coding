#!/usr/bin/env node
// Installs skills, AIOX and token-saving rules for Codex, Gemini CLI or Grok Build.
const fs = require('fs');
const path = require('path');
const { copyNew, isUnsafeTarget } = require('./install-aiox.js');

const ROOT = path.join(__dirname, '..');
const TOOLS = {
  codex: { skills: '.agents/skills', vendor: '.codex', rules: 'AGENTS.md' },
  gemini: { skills: '.agents/skills', vendor: '.gemini', rules: 'GEMINI.md' },
  grok: { skills: '.grok/skills', vendor: '.grok', rules: 'AGENTS.md' },
};
const START = '<!-- simply-coding:start -->';
const END = '<!-- simply-coding:end -->';

function writeRules(file) {
  const rules = fs.readFileSync(path.join(ROOT, 'templates', 'token-efficiency.md'), 'utf8')
    .replaceAll('simply-coding:', '').trim();
  const block = `${START}\n${rules}\n${END}\n`;
  const current = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  if (current.includes(START)) return;
  fs.writeFileSync(file, current ? `${current.trimEnd()}\n\n${block}` : block);
}

function installCli(tool, target) {
  const config = TOOLS[tool];
  const result = { copied: 0, skipped: 0 };
  copyNew(path.join(ROOT, 'skills'), path.join(target, config.skills), result);
  copyNew(path.join(ROOT, 'vendor', 'aiox', '.aiox-core'), path.join(target, '.aiox-core'), result);
  const vendor = path.join(ROOT, 'vendor', 'aiox-cli', config.vendor);
  copyNew(vendor, path.join(target, config.vendor), result);
  // Official Codex docs list .agents/skills, so AIOX skills go there as well.
  if (tool === 'codex') copyNew(path.join(vendor, 'skills'), path.join(target, config.skills), result);
  writeRules(path.join(target, config.rules));
  return result;
}

if (require.main === module) {
  const tool = process.argv[2];
  const target = path.resolve(process.argv[3] || process.cwd());
  if (!TOOLS[tool]) {
    console.error('Usage: simply-coding <codex|gemini|grok> [project-folder]');
    process.exit(1);
  }
  if (isUnsafeTarget(target)) {
    console.error(`Refusing to install into ${target}. Open a project folder.`);
    process.exit(1);
  }
  const r = installCli(tool, target);
  console.log(`Simply Coding for ${tool}: ${r.copied} files copied, ${r.skipped} existing files kept.`);
}
module.exports = { installCli };
