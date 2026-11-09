const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync, spawnSync } = require('child_process');
const { qualityAdvice } = require('./advice.js');

const t = fs.mkdtempSync(path.join(os.tmpdir(), 'simply-coding-'));
const w = (f, s) => { fs.mkdirSync(path.dirname(path.join(t, f)), { recursive: true }); fs.writeFileSync(path.join(t, f), s); };
const run = (stdin = '{}') => spawnSync(process.execPath, [path.join(__dirname, 'quality-check.js')],
  { input: stdin, encoding: 'utf8', env: { ...process.env, CLAUDE_PROJECT_DIR: t } }).stdout;
execFileSync('git', ['init', '-q'], { cwd: t });
assert.equal(qualityAdvice(t), '');
w('package.json', '{}');
assert.match(qualityAdvice(t), /Install phase/);
w('src/a.js', 'x');
assert.equal(run(), ''); // gates not installed: silent
w('eslint-rules/index.cjs', '');
// Stub ESLint: reports an error for whatever it is given.
w('node_modules/eslint/bin/eslint.js', 'console.log(process.argv.slice(-1)[0] + ":1:1: Unexpected console [Error/quality/no-direct-console]"); process.exit(1);');
assert.match(qualityAdvice(t), /Quality gates are on/);
const out = JSON.parse(run());
assert.equal(out.decision, 'block');
assert.match(out.reason, /src\/a\.js:1:1/);
assert.equal(run('{"stop_hook_active":true}'), ''); // no loop
w('node_modules/eslint/bin/eslint.js', 'process.exit(2);');
assert.equal(run(), ''); // broken ESLint never traps the user
w('.simply-coding-sem-quality-gates', '');
assert.equal(qualityAdvice(t), '');
fs.rmSync(t, { recursive: true, force: true });
console.log('ok');
