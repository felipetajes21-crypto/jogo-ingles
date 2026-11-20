/* Geração automática de exercícios a partir do vocabulário + montagem de filas (lição, chefe, revisão). */
(function (root) {
  const LG = (root.LG = root.LG || {});
  const C = () => LG.Content;
  const sh = (a) => LG.shuffle(a);

  const DEF = {
    mc1: 'Qual é o significado de “{x}”?',
    mc2: 'Como se diz “{x}” em inglês?',
    type: 'Escreva em inglês: {x}',
    emo: 'Qual palavra combina com esta imagem?',
  };
  const fill = (t, x) => t.replace('{x}', x);
  const prompts = (L) => Object.assign({}, DEF, (L && L.prompts) || {});

  function explain(w) {
    let s = `“${w.en}” = “${w.pt}”.`;
    if (w.ex) s += ` Exemplo: *${w.ex}*` + (w.exPt ? ` (${w.exPt})` : '');
    if (w.n) s += '\n⚠️ ' + w.n;
    return s;
  }

  // n valores distintos de w[key] para servir de distratores
  function distract(w, key, n, L) {
    const seen = new Set([String(w[key]).toLowerCase()]);
    const out = [];
    const tiers = [L ? L.vocab : [], C().wordsOfUnit(w.unit)];
    if (!(L && L.strict)) tiers.push(C().wordList);
    for (const list of tiers) {
      for (const v of sh(list)) {
        if (v.id === w.id || !v[key]) continue;
        const k = String(v[key]).toLowerCase();
        if (seen.has(k)) continue;
        seen.add(k); out.push(v[key]);
        if (out.length >= n) return out;
      }
    }
    if (out.length < 2 && L && L.strict) { // último recurso: pool global
      for (const v of sh(C().wordList)) {
        const k = v[key] && String(v[key]).toLowerCase();
        if (!k || seen.has(k)) continue;
        seen.add(k); out.push(v[key]);
        if (out.length >= n) break;
      }
    }
    return out;
  }

  function wordMC(w, dir, L) {
    const en2pt = dir === 'en2pt', key = en2pt ? 'pt' : 'en', p = prompts(L);
    const correct = w[key];
    const opts = sh([correct, ...distract(w, key, 3, L)]);
    return { t: 'mc', q: fill(en2pt ? p.mc1 : p.mc2, en2pt ? w.en : w.pt), opts, a: opts.indexOf(correct), why: explain(w), items: [w.id], noShuffle: true, wid: w.id };
  }

  function emojiMC(w, L) {
    const opts = sh([w.en, ...distract(w, 'en', 3, L)]);
    return { t: 'mc', q: prompts(L).emo, big: w.emo, opts, a: opts.indexOf(w.en), why: explain(w), items: [w.id], noShuffle: true, wid: w.id };
  }

  function wordType(w, L) {
    return { t: 'type', q: fill(prompts(L).type, w.pt), big: w.emo, acc: [w.en, ...w.alt], why: explain(w), items: [w.id], wid: w.id };
  }

  // Traduzir uma frase de exemplo (inglês → português), escolhendo entre traduções de outras frases da unidade
  function exampleMC(w, L) {
    if (!w.ex || !w.exPt) return null;
    const seen = new Set([w.exPt.toLowerCase()]), ds = [];
    for (const v of sh(C().wordsOfUnit(w.unit).concat(L ? L.vocab : []))) {
      if (!v.exPt || seen.has(v.exPt.toLowerCase())) continue;
      seen.add(v.exPt.toLowerCase()); ds.push(v.exPt);
      if (ds.length >= 3) break;
    }
    if (ds.length < 2) return null;
    const opts = sh([w.exPt, ...ds]);
    return { t: 'mc', q: 'O que significa a frase: “' + w.ex + '”?', opts, a: opts.indexOf(w.exPt), why: `*${w.ex}* = ${w.exPt}`, items: [w.id], noShuffle: true, wid: w.id };
  }

  function pairsEx(ws) {
    return { t: 'pairs', pairs: ws.map((w) => [w.en, w.pt, w.emo]), items: ws.map((w) => w.id), why: ws.map((w) => `${w.en} = ${w.pt}`).join('\n') };
  }

  function flashEx(w) {
    return { t: 'flash', w, items: [w.id] };
  }

  function uniquePairs(list) {
    const e = new Set(), p = new Set(), out = [];
    for (const w of list) {
      const a = w.en.toLowerCase(), b = w.pt.toLowerCase();
      if (e.has(a) || p.has(b)) continue;
      e.add(a); p.add(b); out.push(w);
    }
    return out;
  }

  const hand = (e) => Object.assign({}, e, { items: [e.id] });

  // Fila completa de exercícios de uma lição
  function lessonQueue(L) {
    const V = L.vocab, q = [];
    sh(V).slice(0, 4).forEach((w, i) => q.push(w.emo && i % 2 === 1 ? emojiMC(w, L) : wordMC(w, 'en2pt', L)));
    const pv = uniquePairs(sh(V));
    for (let i = 0; i < pv.length && q.filter((e) => e.t === 'pairs').length < 2; i += 5) {
      const c = pv.slice(i, i + 5);
      if (c.length >= 3) q.push(pairsEx(c));
    }
    (L.ex || []).forEach((e) => q.push(hand(e)));
    sh(V).slice(0, 3).forEach((w) => q.push(wordMC(w, 'pt2en', L)));
    sh(V.filter((w) => w.ex)).slice(0, 2).forEach((w) => { const e = exampleMC(w, L); if (e) q.push(e); });
    sh(V.filter((w) => w.type !== false)).slice(0, 2).forEach((w) => q.push(wordType(w, L)));
    return q;
  }

  // Intercala por lição (rodízio) para chefes e práticas
  function mixed(lessons, n, opts) {
    opts = opts || {};
    const lists = lessons.map((L) => sh(lessonQueue(L).filter((e) => e.t !== 'pairs')));
    const out = []; let long = 0;
    while (out.length < n && lists.some((l) => l.length)) {
      for (const l of lists) {
        if (out.length >= n) break;
        const e = l.pop();
        if (!e) continue;
        if (e.t === 'dlg' || e.t === 'read') { if (long >= (opts.maxLong == null ? 2 : opts.maxLong)) continue; long++; }
        out.push(e);
      }
    }
    return sh(out);
  }

  LG.Gen = {
    wordMC, emojiMC, wordType, pairsEx, flashEx, lessonQueue, mixed, explain,
    unitBossQueue: (u) => mixed(u.lessons, 15),
    worldBossQueue: (wid) => mixed(C().unitsOfWorld(wid).flatMap((u) => u.lessons), 20),
    practiceQueue: (units, n) => mixed(units.flatMap((u) => u.lessons), n, { maxLong: 1 }),
    // Exercício para revisar um item (palavra ou estrutura)
    forItem(id, flash) {
      const w = C().words[id];
      if (w) {
        if (flash) return flashEx(w);
        const L = C().lessonById[w.lesson];
        const r = Math.random();
        return r < 0.4 ? wordMC(w, 'en2pt', L) : r < 0.7 ? wordMC(w, 'pt2en', L) : (w.type === false ? wordMC(w, 'pt2en', L) : wordType(w, L));
      }
      const e = C().exById[id];
      return e ? hand(e) : null;
    },
  };
})(typeof globalThis !== 'undefined' ? globalThis : window);
