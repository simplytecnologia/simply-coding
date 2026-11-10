#!/usr/bin/env node
// Renders <run>/findings.json (see skills/teste-app/SKILL.md) into report.md and report.html.
const fs = require('fs');
const path = require('path');

const SEVERITIES = ['critica', 'alta', 'media', 'baixa'];
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const rank = (f) => { const i = SEVERITIES.indexOf(f.severity); return i < 0 ? SEVERITIES.length : i; };

function prepare(data) {
  const findings = [...(data.findings || [])].sort((a, b) => rank(a) - rank(b)).map((f, i) => ({ ...f, id: `F${i + 1}` }));
  const counts = SEVERITIES.map((s) => `${s}: ${findings.filter((f) => f.severity === s).length}`).join(' · ');
  const slow = (data.timings || []).map((t) => ({ ...t, over: t.budgetMs != null && t.ms > t.budgetMs }));
  return { ...data, findings, counts, timings: slow, coverage: data.coverage || [] };
}

function toMarkdown(d) {
  const out = [`# Relatório de teste: ${d.project}`, '',
    `- **Escopo:** ${d.scopeLabel || d.scope}`, `- **Alvo:** ${d.baseUrl}`, `- **Commit:** ${d.commit}`, `- **Data:** ${d.date}`,
    `- **Achados:** ${d.findings.length} (${d.counts})`, '', d.summary || '', '', '## Achados', ''];
  if (!d.findings.length) out.push('Nenhum achado.', '');
  for (const f of d.findings) {
    out.push(`### ${f.id} [${f.severity}] ${f.title}`, '',
      `- **Categoria:** ${f.category}`, `- **Onde:** ${f.where}${f.viewport ? ` (${f.viewport})` : ''}`,
      `- **Esperado:** ${f.expected}`, `- **Obtido:** ${f.actual}`, '', '**Passos:**', '',
      ...(f.steps || []).map((s, i) => `${i + 1}. ${s}`), '', '**Evidências:**', '',
      ...(f.evidence || []).map((e) => (e.shot ? `![${f.id}](${e.shot})` : `- \`${e.text}\``)), '',
      `**Correção sugerida:** ${f.fix?.suggestion || 'Causa não localizada.'}`,
      ...(f.fix?.files || []).map((x) => `- \`${x}\``), '');
  }
  out.push('## Cobertura', '', '| Item | Status | Nota |', '|---|---|---|',
    ...d.coverage.map((c) => `| ${c.item} | ${c.status} | ${c.note || ''} |`), '',
    '## Tempos', '', '| Página | Ação | ms | Limite | |', '|---|---|---|---|---|',
    ...d.timings.map((t) => `| ${t.page} | ${t.action} | ${t.ms} | ${t.budgetMs ?? ''} | ${t.over ? 'ACIMA' : 'ok'} |`), '');
  return out.join('\n');
}

function toHtml(d) {
  const li = (xs) => xs.map((x) => `<li>${x}</li>`).join('');
  const findings = d.findings.map((f) => `<section class="f ${esc(f.severity)}">
<h3>${f.id} <span class="sev">${esc(f.severity)}</span> ${esc(f.title)}</h3>
<p><b>Categoria:</b> ${esc(f.category)} · <b>Onde:</b> ${esc(f.where)} ${esc(f.viewport || '')}</p>
<p><b>Esperado:</b> ${esc(f.expected)}<br><b>Obtido:</b> ${esc(f.actual)}</p>
<ol>${li((f.steps || []).map(esc))}</ol>
${(f.evidence || []).map((e) => (e.shot ? `<a href="${esc(e.shot)}"><img src="${esc(e.shot)}" alt="${f.id}"></a>` : `<pre>${esc(e.text)}</pre>`)).join('\n')}
<div class="fix"><b>Correção sugerida:</b> ${esc(f.fix?.suggestion || 'Causa não localizada.')}
<ul>${li((f.fix?.files || []).map((x) => `<code>${esc(x)}</code>`))}</ul></div>
</section>`).join('\n') || '<p>Nenhum achado.</p>';
  const rows = (xs, cells) => xs.map((x) => `<tr>${cells(x).map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('');
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Teste: ${esc(d.project)}</title><style>
body{font:15px/1.5 system-ui,sans-serif;max-width:900px;margin:0 auto;padding:16px;color:#1a1a1a;background:#fff}
@media(prefers-color-scheme:dark){body{color:#e6e6e6;background:#161616}.f,.fix,pre{background:#222!important}}
.f{border-left:5px solid #888;padding:8px 14px;margin:16px 0;background:#f6f6f6}.critica{border-color:#c62828}.alta{border-color:#ef6c00}.media{border-color:#f9a825}.baixa{border-color:#1565c0}
.sev{font-size:12px;text-transform:uppercase;border:1px solid;border-radius:4px;padding:1px 6px}
img{max-width:100%;border:1px solid #8884;margin:6px 0}pre{background:#eee;padding:8px;overflow:auto}.fix{background:#e8f5e9;padding:8px}
table{border-collapse:collapse;width:100%;display:block;overflow:auto}td,th{border:1px solid #8886;padding:4px 8px;text-align:left}
</style></head><body>
<h1>Relatório de teste: ${esc(d.project)}</h1>
<p><b>Escopo:</b> ${esc(d.scopeLabel || d.scope)} · <b>Alvo:</b> ${esc(d.baseUrl)} · <b>Commit:</b> ${esc(d.commit)} · <b>Data:</b> ${esc(d.date)}</p>
<p><b>Achados:</b> ${d.findings.length} (${esc(d.counts)})</p><p>${esc(d.summary)}</p>
<h2>Achados</h2>${findings}
<h2>Cobertura</h2><table><tr><th>Item</th><th>Status</th><th>Nota</th></tr>${rows(d.coverage, (c) => [c.item, c.status, c.note])}</table>
<h2>Tempos</h2><table><tr><th>Página</th><th>Ação</th><th>ms</th><th>Limite</th><th></th></tr>${rows(d.timings, (t) => [t.page, t.action, t.ms, t.budgetMs, t.over ? 'ACIMA' : 'ok'])}</table>
</body></html>`;
}

function writeReport(runDir) {
  const d = prepare(JSON.parse(fs.readFileSync(path.join(runDir, 'findings.json'), 'utf8')));
  fs.writeFileSync(path.join(runDir, 'report.md'), toMarkdown(d));
  fs.writeFileSync(path.join(runDir, 'report.html'), toHtml(d));
  // Only full or diff runs move the diff baseline; a single-screen test did not cover everything.
  if (d.scope === 'geral' || d.scope === 'diff') {
    fs.writeFileSync(path.join(runDir, '..', '..', 'last-run.json'), JSON.stringify({ commit: d.commit, date: d.date, scope: d.scope }, null, 2));
  }
  return d;
}

if (require.main === module) {
  if (!process.argv[2]) { console.error('Usage: qa-report.js <run-folder>'); process.exit(1); }
  const runDir = path.resolve(process.argv[2]);
  const d = writeReport(runDir);
  console.log(`${d.findings.length} findings (${d.counts})\n${path.join(runDir, 'report.md')}\n${path.join(runDir, 'report.html')}`);
}
module.exports = { writeReport };
