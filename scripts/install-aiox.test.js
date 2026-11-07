const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { install } = require('./install-aiox.js');

const t = fs.mkdtempSync(path.join(os.tmpdir(), 'enxuto-'));
fs.mkdirSync(path.join(t, '.claude/rules'), { recursive: true });
fs.writeFileSync(path.join(t, '.claude/rules/agent-authority.md'), 'mine');
const root = path.join(__dirname, '..');
const first = install(root, t);
assert(first.copied > 100);
assert.equal(fs.readFileSync(path.join(t, '.claude/rules/agent-authority.md'), 'utf8'), 'mine');
assert(fs.existsSync(path.join(t, '.aiox-core/constitution.md')));
assert(fs.readFileSync(path.join(t, '.claude/rules/tool-examples.md'), 'utf8').startsWith('---\npaths: .aiox-core/data/**'));
assert(fs.statSync(path.join(t, '.claude/CLAUDE.md')).size < 500);
assert.equal(install(root, t).copied, 0);
fs.rmSync(t, { recursive: true });
console.log('ok');

const { execFileSync } = require('child_process');
const run = (dir) => execFileSync('node', [path.join(__dirname, 'session-start.js')], {
  encoding: 'utf8', env: { ...process.env, CLAUDE_PROJECT_DIR: dir },
});
const repo = fs.mkdtempSync(path.join(os.tmpdir(), 'enxuto-'));
const plain = fs.mkdtempSync(path.join(os.tmpdir(), 'enxuto-'));
const optOut = fs.mkdtempSync(path.join(os.tmpdir(), 'enxuto-'));
fs.mkdirSync(path.join(repo, '.git'));
fs.mkdirSync(path.join(optOut, '.git'));
fs.writeFileSync(path.join(optOut, '.enxuto-sem-aiox'), '');
assert(run(repo).includes('installed AIOX'));
assert(fs.existsSync(path.join(repo, '.aiox-core/constitution.md')));
assert(!run(repo).includes('installed AIOX'));
run(plain);
assert(!fs.existsSync(path.join(plain, '.aiox-core')));
run(optOut);
assert(!fs.existsSync(path.join(optOut, '.aiox-core')));
for (const d of [repo, plain, optOut]) fs.rmSync(d, { recursive: true });
console.log('auto ok');
