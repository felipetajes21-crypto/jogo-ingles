/* Registro e carregamento do conteúdo (content/*.js) + construtores de exercícios (Q). */
(function (root) {
  const LG = (root.LG = root.LG || {});

  const C = (LG.Content = {
    worlds: [], units: [], unitById: {}, lessonById: {},
    words: {}, wordList: [], exById: {}, problems: [], _byUnit: null,
  });

  // ---------- Construtores de exercícios (retornam objetos simples) ----------
  root.Q = LG.Q = {
    // Múltipla escolha: pergunta, opções, índice da correta, explicação
    mc: (q, opts, a, why, extra) => Object.assign({ t: 'mc', q, opts, a, why }, extra),
    // Montar frase: tradução em PT, frase em EN, palavras extras (distratoras), explicação, respostas aceitas
    bank: (pt, en, extra, why, acc) => ({ t: 'bank', pt, en, extra: extra || [], why, acc: acc || [] }),
    // Lacuna: frase com ___, resposta(s), explicação, opções (se houver = escolher), tradução
    gap: (frase, resp, why, opts, pt) => ({ t: 'gap', frase, resp: [].concat(resp), why, opts, pt }),
    // Digitar: enunciado, respostas aceitas, explicação
    type: (q, acc, why) => ({ t: 'type', q, acc: [].concat(acc), why }),
    // Encontre o erro: frase errada, palavra errada, frase corrigida, explicação
    fix: (frase, err, corr, why) => ({ t: 'fix', frase, err, corr, why }),
    // Diálogo: cena, turnos [{say, pt, opts:[[texto, ok(1/0), porquê]]}], quem fala
    dlg: (cena, turns, who) => ({ t: 'dlg', cena, turns, who }),
    // Leitura: título, texto EN, tradução PT, perguntas [{q, opts, a, why}]
    read: (titulo, text, pt, qs) => ({ t: 'read', titulo, text, pt, qs }),
  };

  function normVocab(v, u, L) {
    const a = Array.isArray(v) ? v : [v.en, v.pt, v.emo, v.ex, v.exPt, v];
    const o = (a[5] && typeof a[5] === 'object') ? a[5] : {};
    const en = a[0], pt = a[1];
    const id = o.id || ((L.idp || 'w:') + String(en).toLowerCase());
    const ex = C.words[id];
    if (ex) {
      if (ex.pt !== pt) C.problems.push(`Palavra repetida com tradução diferente: "${en}" (${ex.pt} / ${pt}) em ${L.id}. Use {id:'...'}.`);
      return ex;
    }
    const w = { id, en, pt, emo: a[2] || '', ex: a[3] || '', exPt: a[4] || '', r: o.r || '', alt: o.alt || [], n: o.n || '', type: o.type, unit: u.id, lesson: L.id };
    C.words[id] = w; C.wordList.push(w);
    return w;
  }

  function normEx(e, L, j) {
    e.id = L.id + '#' + j; e.lesson = L.id;
    if (e.t === 'fix') {
      const toks = e.frase.split(/\s+/).map((x) => x.replace(/[.,!?]/g, '').toLowerCase());
      const errs = [].concat(e.err).map((w) => (typeof w === 'number' ? w : toks.indexOf(String(w).toLowerCase())));
      e.errIdx = errs;
      if (errs.some((i) => i < 0)) C.problems.push(`fix sem palavra errada encontrada em ${e.id}: ${e.frase}`);
    }
    C.exById[e.id] = e;
    return e;
  }

  C.registerWorld = function (w) { C.worlds.push(w); };

  C.registerUnit = function (u) {
    if (C.unitById[u.id]) C.problems.push('Unidade duplicada: ' + u.id);
    u.lessons.forEach((L, i) => {
      L.n = i + 1; L.id = u.id + '-l' + (i + 1); L.unit = u.id; L.world = u.world;
      L.intro = L.intro || {};
      L.vocab = (L.vocab || []).map((v) => normVocab(v, u, L));
      L.ex = (L.ex || []).map((e, j) => normEx(e, L, j));
      C.lessonById[L.id] = L;
    });
    C.units.push(u); C.unitById[u.id] = u; C._byUnit = null;
  };

  LG.unit = C.registerUnit; // atalho usado nos arquivos de conteúdo

  C.wordsOfUnit = function (uid) {
    if (!C._byUnit) {
      C._byUnit = {};
      C.wordList.forEach((w) => (C._byUnit[w.unit] = C._byUnit[w.unit] || []).push(w));
    }
    return C._byUnit[uid] || [];
  };

  C.unitsOfWorld = (wid) => C.units.filter((u) => u.world === wid);

  // Carrega manifest + arquivos de unidade, um por vez (funciona com file://).
  C.load = function (manifest, done) {
    (manifest.worlds || []).forEach(C.registerWorld);
    const files = (manifest.files || []).slice();
    (function next() {
      if (!files.length) return done();
      const f = files.shift();
      const s = document.createElement('script');
      s.src = f;
      s.onload = next;
      s.onerror = () => { C.problems.push('Não consegui carregar ' + f); next(); };
      document.head.append(s);
    })();
  };
})(typeof globalThis !== 'undefined' ? globalThis : window);
