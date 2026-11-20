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

  function wordType(w, L) {
    return { t: 'type', q: fill(prompts(L).type, w.pt), acc: [w.en, ...w.alt], why: explain(w), items: [w.id], wid: w.id };
  }

  // Frase (EN, PT) de uma palavra: o exemplo, ou a própria palavra quando ela já é uma frase
  const isPhrase = (w) => /[.?!…]$/.test(w.en);
  function sen(w) {
    if (w.ex && w.exPt) return { en: w.ex, pt: w.exPt };
    if (isPhrase(w) && !/…$/.test(w.en)) return { en: w.en, pt: w.pt };
    return null;
  }
  const esc = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Acha a palavra dentro do exemplo e devolve a frase com lacuna
  function blank(w) {
    if (!w.ex || !w.exPt) return null;
    const re = new RegExp('(^|[^\\p{L}’\'])(' + esc(w.en) + ')(?=$|[^\\p{L}’\'])', 'iu');
    const m = re.exec(w.ex);
    if (!m) return null;
    const at = m.index + m[1].length;
    return { frase: w.ex.slice(0, at) + '___' + w.ex.slice(at + m[2].length), found: m[2], start: at === 0 };
  }

  // Completar a frase (escolhendo ou digitando); a tradução em português vai de dica
  function gapEx(w, L, mode) {
    const b = blank(w);
    if (!b) return null;
    const cap = (t) => (b.start ? t.charAt(0).toUpperCase() + t.slice(1) : t);
    let opts;
    if (mode === 'choose') {
      const n = b.found.split(' ').length;
      const ds = distract(w, 'en', 6, L).filter((x) => !/[.?!…]$/.test(x) && x.split(' ').length === n && x !== b.found).slice(0, 3).map(cap);
      if (ds.length < 2) return null;
      opts = sh([b.found, ...ds]);
    }
    return { t: 'gap', frase: b.frase, resp: [b.found], opts, pt: w.exPt, why: `*${w.ex}* = ${w.exPt}`, items: [w.id], wid: w.id };
  }

  // Ler uma frase em inglês e escolher a tradução
  function exampleMC(w, L) {
    const me = sen(w);
    if (!me) return null;
    const seen = new Set([me.pt.toLowerCase()]), ds = [];
    for (const v of sh(C().wordsOfUnit(w.unit).concat(L ? L.vocab : []))) {
      const o = sen(v);
      if (!o || seen.has(o.pt.toLowerCase())) continue;
      seen.add(o.pt.toLowerCase()); ds.push(o.pt);
      if (ds.length >= 3) break;
    }
    if (ds.length < 2) return null;
    const opts = sh([me.pt, ...ds]);
    return { t: 'mc', q: 'O que significa a frase: “' + me.en + '”?', opts, a: opts.indexOf(me.pt), why: `*${me.en}* = ${me.pt}`, items: [w.id], noShuffle: true, wid: w.id };
  }

  // Escrever a frase em inglês a partir do português (montando ou digitando)
  function translateEx(w, L, mode) {
    const me = sen(w);
    if (!me) return null;
    const toks = me.en.replace(/[.!?]+$/, '').split(/\s+/);
    if (mode === 'type' && toks.length <= 6) return { t: 'type', q: 'Traduza para o inglês: ' + me.pt, acc: [me.en], why: `*${me.en}* = ${me.pt}`, items: [w.id], wid: w.id };
    const pool = [], caps = new Set(), sents = [];
    C().wordsOfUnit(w.unit).forEach((v) => { const o = sen(v); if (o) sents.push(o.en.replace(/[.!?,]+/g, '').split(/\s+/)); });
    sents.forEach((ts) => ts.slice(1).forEach((t) => { if (/^[A-Z]/.test(t)) caps.add(t); }));
    sents.forEach((ts) => ts.forEach((t, i) => {
      if (i === 0 && t !== 'I' && !caps.has(t)) t = t.toLowerCase();
      if (t && !toks.includes(t) && !pool.includes(t) && t.toLowerCase() !== t.toUpperCase()) pool.push(t);
    }));
    const extra = sh(pool).filter((t) => t.length > 1).slice(0, toks.length > 4 ? 3 : 2);
    return { t: 'bank', pt: me.pt, en: me.en, extra, acc: [], why: `*${me.en}* = ${me.pt}`, items: [w.id], wid: w.id };
  }

  function pairsEx(ws) {
    return { t: 'pairs', pairs: ws.map((w) => [w.en, w.pt]), items: ws.map((w) => w.id), why: ws.map((w) => `${w.en} = ${w.pt}`).join('\n') };
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
  const key = (e) => (e.items && e.items.length === 1 ? e.items[0] : null);

  // Reordena sem deixar a mesma palavra/pergunta aparecer em sequência
  function spread(list) {
    const rest = list.slice(), out = [];
    while (rest.length) {
      const last = out.length ? out[out.length - 1] : null;
      let k = rest.findIndex((e) => !last || key(e) === null || key(e) !== key(last));
      if (k < 0) k = 0;
      out.push(rest.splice(k, 1)[0]);
    }
    return out;
  }

  function interleave(a, b) {
    const out = [];
    for (let i = 0; i < Math.max(a.length, b.length); i++) { if (i < a.length) out.push(a[i]); if (i < b.length) out.push(b[i]); }
    return out;
  }

  /* Fila de uma lição. Cada palavra aparece poucas vezes e de jeitos diferentes:
     1) ligar pares e reconhecer  2) ler frases e traduzir  3) completar frases + exercícios da aula
     4) escrever frases em inglês. Nada de repetir a mesma pergunta em seguida. */
  function lessonQueue(L) {
    const V = L.vocab, cnt = {};
    const use = (w) => { cnt[w.id] = (cnt[w.id] || 0) + 1; };
    const handEx = (L.ex || []).map(hand);
    const budget = Math.max(7, 13 - handEx.length); // quantos exercícios gerados cabem

    // seções geradas, em ordem de apresentação
    const rec = [], read = [], gaps = [], trans = [], bareMC = [], bareType = [];
    const pv = uniquePairs(sh(V)).slice(0, 5);
    const pairs = pv.length >= 3 ? pairsEx(pv) : null;
    if (pairs) pv.forEach(use);
    sh(V.filter((w) => !pv.includes(w))).slice(0, 2).forEach((w) => { rec.push(wordMC(w, 'en2pt', L)); use(w); });
    sh(V.filter((w) => sen(w))).slice(0, 2).forEach((w) => { const e = exampleMC(w, L); if (e) { read.push(e); use(w); } });
    sh(V.filter((w) => blank(w))).slice(0, 4).forEach((w, i) => { const e = gapEx(w, L, i % 2 === 0 ? 'choose' : 'type'); if (e) { gaps.push(e); use(w); } });
    sh(V.filter((w) => sen(w))).slice(0, 3).forEach((w, i) => { const e = translateEx(w, L, i === 0 ? 'bank' : 'type'); if (e) { trans.push(e); use(w); } });
    // palavras sem frase (ex.: números): só mais uma pergunta por palavra
    const bare = sh(V.filter((w) => !sen(w) && !(w.id in cnt && cnt[w.id] > 1)));
    bare.slice(0, 2).forEach((w) => { bareMC.push(wordMC(w, 'pt2en', L)); use(w); });
    bare.filter((w) => w.type !== false).slice(2, 4).forEach((w) => { bareType.push(wordType(w, L)); use(w); });

    // corta o excesso, tirando primeiro o que mais se repete
    const mins = [[bareType, 0], [bareMC, 0], [gaps, 2], [read, 1], [trans, 1], [rec, 1]];
    const total = () => (pairs ? 1 : 0) + rec.length + read.length + gaps.length + trans.length + bareMC.length + bareType.length;
    for (let guard = 0; guard < 40 && total() > budget; guard++) {
      const sec = mins.find(([arr, min]) => arr.length > min);
      if (!sec) break;
      sec[0].pop();
    }
    // lição pequena: completa com produção, sempre com palavras diferentes
    const order = V.slice().sort((a, b) => (cnt[a.id] || 0) - (cnt[b.id] || 0));
    for (let k = 0; total() + handEx.length < 9 && k < order.length; k++) {
      const w = order[k];
      const e = sen(w) ? translateEx(w, L, 'bank') : (w.type !== false && k % 2 ? wordType(w, L) : wordMC(w, 'pt2en', L));
      (sen(w) ? trans : bareType).push(e); use(w);
    }
    const early = [].concat(pairs || [], interleave(rec, read));
    const mid = interleave(gaps, handEx);
    const late = interleave(trans, [...bareMC, ...bareType]);
    return spread([...early, ...mid, ...late].filter(Boolean));
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
    wordMC, wordType, gapEx, exampleMC, translateEx, pairsEx, flashEx, lessonQueue, mixed, explain,
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
        if (r < 0.25) return wordMC(w, 'en2pt', L);
        if (r < 0.5) return exampleMC(w, L) || wordMC(w, 'en2pt', L);
        if (r < 0.8) return gapEx(w, L, 'choose') || wordMC(w, 'pt2en', L);
        return w.type === false ? wordMC(w, 'pt2en', L) : (translateEx(w, L, 'type') || wordType(w, L));
      }
      const e = C().exById[id];
      return e ? hand(e) : null;
    },
  };
})(typeof globalThis !== 'undefined' ? globalThis : window);
