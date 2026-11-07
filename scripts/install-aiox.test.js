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
