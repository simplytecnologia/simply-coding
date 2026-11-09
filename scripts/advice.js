// Session tips for optional tools. graphify: Git repo with enough code/doc files to pay off, no graph yet, no opt-out.
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

// graphify's own benchmark: ~1x savings at 6 files, 71x at 52.
const MIN_FILES = 50;
const EXT = /\.(py|ts|tsx|js|jsx|go|rs|java|c|cpp|h|rb|cs|kt|scala|php|md|txt|rst|pdf)$/i;

function countFiles(target) {
  const r = spawnSync('git', ['ls-files'], { cwd: target, encoding: 'utf8', maxBuffer: 64 << 20 });
  if (r.status !== 0) return 0;
  // Dot folders (.aiox-core, .claude, .codex...) are tooling, not the project.
  return r.stdout.split('\n').filter((f) => EXT.test(f) && !/(^|\/)\./.test(f)).length;
}

function graphifyAdvice(target, installed = () => !spawnSync('graphify', ['--help'], { stdio: 'ignore' }).error) {
  if (!fs.existsSync(path.join(target, '.git'))
    || fs.existsSync(path.join(target, 'graphify-out'))
    || fs.existsSync(path.join(target, '.simply-coding-sem-graphify'))) return '';
  const n = countFiles(target);
  if (n < MIN_FILES) return '';
  const optOut = 'To stop this suggestion, they create an empty .simply-coding-sem-graphify file.';
  if (installed()) {
    return `\nThis project has ${n} code/doc files and no graphify graph. When the task needs exploring the codebase, suggest once that the user runs \`/graphify .\` so later sessions read graphify-out/GRAPH_REPORT.md instead of many files. Say it sends docs and images (not code) to the model provider. Do not run it without a clear yes. ${optOut}\n`;
  }
  return `\nThis project has ${n} code/doc files. When the task needs exploring the codebase, tell the user once, in their language, that installing graphify (\`pipx install graphifyy && graphify install\`, Python 3.10+) and running \`/graphify .\` cuts tokens spent reading it. Do not install it yourself. ${optOut}\n`;
}

// rtk compresses shell output; useful in any project. `rtk gain` also rules out the unrelated crates.io "rtk".
function rtkAdvice(target, installed = () => spawnSync('rtk', ['gain'], { stdio: 'ignore' }).status === 0) {
  if (fs.existsSync(path.join(target, '.simply-coding-sem-rtk')) || installed()) return '';
  return '\nrtk is not installed. When the session runs many shell commands (tests, builds, git), tell the user once, in their language, that rtk compresses that output: `winget install rtk-ai.rtk` (Windows) or `brew install rtk`, then `rtk init -g`. Do not install it yourself: `rtk init -g` changes global agent settings. Mention its BUSL-1.1 part and the Apache-only `rtk-oss` edition. To stop this suggestion, they create an empty .simply-coding-sem-rtk file.\n';
}

// quality-gates: JS/TS projects only. The Stop hook (quality-check.js) enforces lint once installed.
function qualityAdvice(target) {
  if (!fs.existsSync(path.join(target, 'package.json'))
    || fs.existsSync(path.join(target, '.simply-coding-sem-quality-gates'))) return '';
  if (!fs.existsSync(path.join(target, 'eslint-rules', 'index.cjs'))) {
    return '\nQuality gates are not installed in this JS/TS project. If this task changes code, run the Install phase of `simply-coding:quality-gates` before the first code edit, then tell the user in one line what it added.\n';
  }
  return '\nQuality gates are on. Follow `simply-coding:quality-gates`: before editing a JS/TS file over 350 lines, split it first in its own commit; when a story closes with lint warnings left, offer the Burndown phase once. A Stop hook blocks finishing while changed files have lint errors.\n';
}

const advice = (target) => qualityAdvice(target) + graphifyAdvice(target) + rtkAdvice(target);

module.exports = { advice, graphifyAdvice, rtkAdvice, qualityAdvice, MIN_FILES };
