#!/usr/bin/env node
// Stop hook: keeps Claude from finishing while files it changed have ESLint errors.
// Runs only where quality-gates is installed and ESLint is in node_modules. Never fails the session.
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const CODE = /\.(c|m)?(j|t)sx?$/;

function changedFiles(target) {
  const git = (args) => {
    const r = spawnSync('git', args, { cwd: target, encoding: 'utf8' });
    return r.status === 0 ? r.stdout.split('\n') : [];
  };
  const files = [...git(['diff', '--name-only', 'HEAD']), ...git(['ls-files', '--others', '--exclude-standard'])];
  return [...new Set(files)].filter((f) => CODE.test(f) && fs.existsSync(path.join(target, f)));
}

function check(target) {
  const eslint = path.join(target, 'node_modules', 'eslint', 'bin', 'eslint.js');
  if (!fs.existsSync(path.join(target, 'eslint-rules', 'index.cjs')) || !fs.existsSync(eslint)
    || fs.existsSync(path.join(target, '.simply-coding-sem-quality-gates'))) return '';
  const files = changedFiles(target);
  if (!files.length) return '';
  // --quiet: errors only. Rules with an adoption baseline sit at "warn" and do not block.
  const r = spawnSync(process.execPath, [eslint, '--quiet', '--no-warn-ignored', ...files],
    { cwd: target, encoding: 'utf8', timeout: 90000 });
  if (r.status !== 1) return ''; // 0 = clean; 2/null = ESLint itself broke or timed out: don't trap the user
  return r.stdout.trim().split('\n').slice(0, 40).join('\n');
}

if (require.main === module) {
  let input = {};
  try { input = JSON.parse(fs.readFileSync(0, 'utf8') || '{}'); } catch { /* no stdin */ }
  // A second stop after we already blocked once: let it through to avoid a loop.
  if (input.stop_hook_active) process.exit(0);
  try {
    const errors = check(path.resolve(process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd()));
    if (errors) {
      process.stdout.write(JSON.stringify({
        decision: 'block',
        reason: `Quality gate (simply-coding:quality-gates): fix these ESLint errors in the files you changed before finishing. Do not raise limits, add ignores or eslint-disable.\n${errors}`,
      }));
    }
  } catch { /* never block on our own failure */ }
}

module.exports = { check, changedFiles };
