#!/usr/bin/env node
/* Valida todo o conteúdo (content/) sem abrir o navegador:  node scripts/validate.js
   Sai com código 1 se achar problemas. Use sempre depois de editar lições. */
const path = require('path');
const root = path.join(__dirname, '..');
globalThis.LG = {};
['js/util.js', 'js/answer.js', 'js/srs.js', 'js/store.js', 'js/content.js', 'content/shop.js', 'content/manifest.js', 'js/gen.js', 'js/game.js']
  .forEach((f) => require(path.join(root, f)));
const LG = globalThis.LG, C = LG.Content, A = LG.Answer;
LG.manifest.worlds.forEach(C.registerWorld);
LG.manifest.files.forEach((f) => require(path.join(root, f)));

const errs = [], warns = [];
const err = (m) => errs.push(m), warn = (m) => warns.push(m);
C.problems.forEach(err);

function checkEx(e, where) {
  const w = where + ' [' + e.t + ']';
  const str = (v, n) => { if (typeof v !== 'string' || !v.trim()) err(`${w}: campo "${n}" vazio`); };
  switch (e.t) {
    case 'mc':
      str(e.q, 'q');
      if (!Array.isArray(e.opts) || e.opts.length < 2) return err(w + ': opts insuficientes');
      if (!(e.a >= 0 && e.a < e.opts.length)) err(w + ': índice da resposta inválido');
      if (new Set(e.opts.map((o) => String(o).toLowerCase())).size !== e.opts.length) err(w + ': opções repetidas: ' + e.opts.join(' | '));
      str(e.why, 'why'); break;
    case 'bank':
      str(e.pt, 'pt'); str(e.en, 'en'); str(e.why, 'why');
      if (!A.isCorrect(e.en.replace(/[.!?]+$/, ''), [e.en])) err(w + ': a própria resposta não é aceita');
      break;
    case 'gap':
      if (!/___/.test(e.frase)) err(w + ': falta ___ na frase');
      if (!e.resp.length) err(w + ': sem resp');
      if (e.opts && !e.opts.includes(e.resp[0])) err(w + ': opts não contém a resposta ' + e.resp[0]);
      if (e.opts && new Set(e.opts).size !== e.opts.length) err(w + ': opts repetidas');
      str(e.why, 'why'); break;
    case 'type':
      str(e.q, 'q'); if (!e.acc.length) err(w + ': sem acc'); str(e.why, 'why'); break;
    case 'fix':
      str(e.frase, 'frase'); str(e.corr, 'corr'); str(e.why, 'why');
      if (!e.errIdx || e.errIdx.some((i) => i < 0)) err(w + ': palavra errada não encontrada');
      break;
    case 'dlg':
      if (!e.turns || !e.turns.length) return err(w + ': sem turnos');
      e.turns.forEach((t, i) => {
        if (!t.opts || t.opts.length < 2) err(`${w} turno ${i + 1}: poucas opções`);
        else if (!t.opts.some((o) => o[1])) err(`${w} turno ${i + 1}: sem resposta certa`);
        else t.opts.forEach((o) => { if (!o[1] && !o[2]) warn(`${w} turno ${i + 1}: opção errada sem explicação: ${o[0]}`); });
        if (t.say && !t.pt) warn(`${w} turno ${i + 1}: falta tradução`);
      }); break;
    case 'read':
      str(e.text, 'text'); if (!e.qs || !e.qs.length) err(w + ': sem perguntas');
      (e.qs || []).forEach((q, i) => { if (!(q.a >= 0 && q.a < q.opts.length)) err(`${w} pergunta ${i + 1}: índice inválido`); if (!q.why) warn(`${w} pergunta ${i + 1}: sem explicação`); });
      break;
    default: err(w + ': tipo desconhecido');
  }
}

let nLessons = 0, nEx = 0;
C.units.forEach((u) => {
  const uw = 'Unidade ' + u.id;
  if (!u.title || !u.label || !u.world) err(uw + ': faltam title/label/world');
  if (u.lessons.length < 8 || u.lessons.length > 12) err(`${uw}: ${u.lessons.length} lições (esperado 8–12)`);
  u.lessons.forEach((L) => {
    nLessons++;
    const lw = L.id;
    if (!L.title) err(lw + ': sem título');
    if (!L.intro.texto) err(lw + ': mini-aula sem texto');
    if (!L.intro.exemplos || !L.intro.exemplos.length) err(lw + ': mini-aula sem exemplos');
    if (!L.vocab.length && !L.ex.length) err(lw + ': lição vazia');
    L.vocab.forEach((v) => { if (!v.en || !v.pt) err(lw + ': palavra sem en/pt'); });
    L.ex.forEach((e) => { nEx++; checkEx(e, lw + '#' + e.id.split('#')[1]); });
    for (let k = 0; k < 5; k++) { // gera várias filas aleatórias
      let q;
      try { q = LG.Gen.lessonQueue(L); } catch (x) { err(lw + ': erro ao gerar fila: ' + x.message); break; }
      if (q.length < 8) { err(lw + ': fila com só ' + q.length + ' exercícios'); break; }
      q.forEach((e) => { if (e.t === 'mc') { if (e.a < 0) err(lw + ': mc gerado sem resposta'); if (e.wid && e.opts.length < 3) warn(lw + ': mc gerado com só ' + e.opts.length + ' opções: ' + e.q); } });
    }
    if (/TODO|FIXME|XXX/.test(JSON.stringify(L))) err(lw + ': contém TODO');
  });
  for (const gen of [() => LG.Gen.unitBossQueue(u)]) { try { if (gen().length < 10) err(uw + ': chefe com poucas perguntas'); } catch (x) { err(uw + ': chefe: ' + x.message); } }
});
C.worlds.forEach((w) => { if (C.unitsOfWorld(w.id).length) { try { if (LG.Gen.worldBossQueue(w.id).length < 15) err('Mundo ' + w.id + ': chefe do mundo com poucas perguntas'); } catch (x) { err('Mundo ' + w.id + ': ' + x.message); } } });
(LG.placement || []).forEach((e, i) => checkEx(e, 'nivelamento#' + i));

console.log(`Unidades: ${C.units.length} · Lições: ${nLessons} · Palavras: ${C.wordList.length} · Exercícios escritos à mão: ${nEx}`);
C.worlds.forEach((w) => { const us = C.unitsOfWorld(w.id); console.log(`  Mundo ${w.id}: ${us.length} unidades, ${us.reduce((a, u) => a + u.lessons.length, 0)} lições, ${us.reduce((a, u) => a + C.wordsOfUnit(u.id).length, 0)} palavras`); });
if (warns.length) console.log('\nAvisos (' + warns.length + '):\n - ' + warns.slice(0, 40).join('\n - '));
if (errs.length) { console.error('\nERROS (' + errs.length + '):\n - ' + errs.join('\n - ')); process.exit(1); }
console.log('\n✅ Conteúdo válido.');
