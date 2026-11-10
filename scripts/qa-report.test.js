const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { writeReport } = require('./qa-report.js');

const qa = fs.mkdtempSync(path.join(os.tmpdir(), 'simply-coding-qa-'));
const run = path.join(qa, 'runs', 'r1');
fs.mkdirSync(run, { recursive: true });
const base = {
  project: 'demo', scope: 'custom', scopeLabel: 'tela X', baseUrl: 'http://localhost:3000', commit: 'abc123', date: '2026-11-09 10:00',
  summary: 'ok', coverage: [{ item: 'Login', status: 'ok' }],
  findings: [
    { severity: 'baixa', category: 'design', title: 'Botão torto', where: '/x', steps: ['Abrir'], expected: 'a', actual: 'b', evidence: [{ text: 'n/a' }] },
    { severity: 'critica', category: 'funcional', title: '<script>alert(1)</script>', where: '/y', steps: ['Abrir'], expected: 'a', actual: 'b',
      evidence: [{ shot: 'shots/y.png' }], fix: { suggestion: 'Validar', files: ['src/a.ts:1'] } },
  ],
  timings: [{ page: '/x', action: 'carregar', ms: 3000, budgetMs: 2500 }],
};
const save = (d) => fs.writeFileSync(path.join(run, 'findings.json'), JSON.stringify(d));

save(base);
writeReport(run);
const md = fs.readFileSync(path.join(run, 'report.md'), 'utf8');
const html = fs.readFileSync(path.join(run, 'report.html'), 'utf8');
assert.ok(md.indexOf('F1 [critica]') < md.indexOf('F2 [baixa]')); // worst first
assert.match(md, /src\/a\.ts:1/);
assert.match(md, /Causa não localizada/); // finding without fix
assert.match(md, /ACIMA/);
assert.match(md, /!\[F1\]\(shots\/y\.png\)/);
assert.ok(!html.includes('<script>alert(1)</script>')); // escaped
assert.match(html, /&lt;script&gt;/);
assert.ok(!fs.existsSync(path.join(qa, 'last-run.json'))); // custom scope keeps the diff baseline

save({ ...base, scope: 'diff', findings: [] });
writeReport(run);
assert.equal(JSON.parse(fs.readFileSync(path.join(qa, 'last-run.json'), 'utf8')).commit, 'abc123');
assert.match(fs.readFileSync(path.join(run, 'report.md'), 'utf8'), /Nenhum achado/);
fs.rmSync(qa, { recursive: true, force: true });
console.log('qa-report: ok');
