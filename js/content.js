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

  // Acrescenta frases de exemplo a palavras que ainda não têm: { 'palavra': ['English sentence.', 'Tradução.'] }
  C.addExamples = function (map) {
    Object.keys(map).forEach((k) => {
      const w = C.words[k] || C.words['w:' + k.toLowerCase()];
      if (!w) { C.problems.push('Exemplo para palavra inexistente: ' + k); return; }
      if (!w.ex) { w.ex = map[k][0]; w.exPt = map[k][1]; }
    });
  };
  LG.examples = C.addExamples;

  // ---------- o que já foi ensinado até cada lição ----------
  // Conta como ensinado: vocabulário (vocab), frases dos exemplos da mini-aula e `intro.ensina` (lista extra).
  const NAMES = new Set(['ana', 'tom', 'sam', 'maria', 'smith', 'silva', 'mr', 'ms', 'mrs', 'dr']);
  C.tokens = function (text) {
    const t = LG.Answer.norm(String(text).replace(/\([^)]*\)/g, ' ')).replace(/'s\b/g, '');
    return t.split(' ').filter((x) => x && !/\d/.test(x) && !NAMES.has(x));
  };
  function buildOrder() {
    if (C._order && C._orderFor === C.units.length) return;
    C._order = []; C._idx = {}; C._known = {};
    const acc = new Set();
    C.units.forEach((u) => u.lessons.forEach((L) => {
      L.vocab.forEach((w) => C.tokens(w.en).forEach((t) => acc.add(t)));
      ((L.intro && L.intro.exemplos) || []).forEach((x) => C.tokens(x[0]).forEach((t) => acc.add(t)));
      ((L.intro && L.intro.ensina) || []).forEach((x) => C.tokens(x).forEach((t) => acc.add(t)));
      C._idx[L.id] = C._order.length; C._order.push(L.id); C._known[L.id] = new Set(acc);
    }));
    C._orderFor = C.units.length;
  }
  C.orderIndex = (lessonId) => { buildOrder(); return C._idx[lessonId] == null ? 1e9 : C._idx[lessonId]; };
  C.isKnown = function (token, lessonId) {
    buildOrder();
    const k = C._known[lessonId];
    if (!k) return true;
    return k.has(token) || (token.endsWith('s') && k.has(token.slice(0, -1))) || (token.endsWith('es') && k.has(token.slice(0, -2))) || (token.endsWith('ies') && k.has(token.slice(0, -3) + 'y'));
  };
  C.unknownTokens = (text, lessonId) => C.tokens(text).filter((t) => !C.isKnown(t, lessonId));
  C.sentenceKnown = (text, lessonId) => C.unknownTokens(text, lessonId).length === 0;

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
