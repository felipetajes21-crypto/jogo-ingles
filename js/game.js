/* Regras do jogo: XP, níveis, vidas, sequência, desbloqueio, recompensas, conquistas. */
(function (root) {
  const LG = (root.LG = root.LG || {});
  const S = () => LG.Store.state;
  const C = () => LG.Content;
  const G = (LG.Game = {});

  const REGEN = 20 * 60 * 1000; // 1 vida a cada 20 min
  G.PASS = 0.7;

  // ----- níveis -----
  G.levelOf = (xp) => Math.floor(Math.sqrt(xp / 50)) + 1;
  G.levelStart = (l) => 50 * (l - 1) * (l - 1);
  G.levelProgress = function (xp) {
    const l = G.levelOf(xp), a = G.levelStart(l), b = G.levelStart(l + 1);
    return { level: l, cur: xp - a, need: b - a, pct: (xp - a) / (b - a) };
  };
  const TITLES = ['Novato', 'Curioso', 'Explorador', 'Aventureiro', 'Viajante', 'Falante', 'Fluente', 'Mestre', 'Lenda'];
  G.titleOf = (l) => TITLES[Math.min(Math.floor((l - 1) / 3), TITLES.length - 1)];
  G.tierOf = (l) => (l >= 25 ? 4 : l >= 15 ? 3 : l >= 8 ? 2 : l >= 4 ? 1 : 0);

  // ----- vidas -----
  G.hearts = function () {
    const h = S().hearts, now = Date.now();
    if (h.n < h.max) {
      const g = Math.floor((now - h.ts) / REGEN);
      if (g > 0) { h.n = Math.min(h.max, h.n + g); h.ts = h.n >= h.max ? now : h.ts + g * REGEN; }
    } else h.ts = now;
    return h;
  };
  G.loseHeart = function () {
    const h = G.hearts();
    if (h.n <= 0) return false;
    if (h.n === h.max) h.ts = Date.now();
    h.n--; LG.Store.save();
    return true;
  };
  G.addHearts = function (n) { const h = G.hearts(); h.n = Math.min(h.max, h.n + n); LG.Store.save(); };
  G.nextHeartMs = function () { const h = G.hearts(); return h.n >= h.max ? 0 : REGEN - (Date.now() - h.ts); };

  // ----- dia / sequência -----
  G.day = function () {
    const s = S(), t = LG.today();
    if (s.daily.date !== t) s.daily = { date: t, xp: 0, lessons: 0 };
    return (s.history[t] = s.history[t] || { xp: 0, sec: 0, ans: 0, ok: 0 });
  };
  G.streakNow = function () {
    const st = S().streak;
    if (!st.last) return 0;
    return st.last === LG.today() || st.last === LG.dayStr(-1) ? st.count : 0;
  };
  G.touchStreak = function () {
    const st = S().streak, t = LG.today();
    if (st.last === t) return;
    st.count = st.last === LG.dayStr(-1) ? st.count + 1 : 1;
    st.last = t; st.best = Math.max(st.best, st.count);
  };

  G.addXP = function (n) {
    if (n <= 0) return;
    const s = S(), before = G.levelOf(s.xp);
    G.day(); s.xp += n; s.daily.xp += n; s.history[LG.today()].xp += n;
    G.touchStreak();
    const after = G.levelOf(s.xp);
    if (after > before) LG.toast(`🎉 Você subiu para o nível ${after} — ${G.titleOf(after)}!`);
  };
  G.addCoins = (n) => { S().coins += n; };
  G.recordAnswer = function (ok) { const d = G.day(); d.ans++; if (ok) d.ok++; };
  G.addSeconds = function (sec) { G.day().sec += Math.max(0, Math.round(sec)); };

  // ----- mapa / desbloqueio -----
  G.nodes = function () {
    if (G._nodes && G._nodesFor === C().units.length) return G._nodes;
    const out = [];
    for (const w of C().worlds) {
      const us = C().unitsOfWorld(w.id);
      us.forEach((u) => {
        u.lessons.forEach((l) => out.push({ id: l.id, type: 'lesson', unit: u.id, world: w.id }));
        out.push({ id: 'boss:' + u.id, type: 'boss', unit: u.id, world: w.id });
      });
      if (us.length) out.push({ id: 'wboss:' + w.id, type: 'wboss', world: w.id });
    }
    G._nodesFor = C().units.length;
    return (G._nodes = out);
  };
  G.isDone = (id) => !!(S().progress[id] && S().progress[id].done);
  G.isUnlocked = function (id) {
    const n = G.nodes(), i = n.findIndex((x) => x.id === id);
    if (i < 0) return false;
    return i === 0 || G.isDone(n[i - 1].id) || G.isDone(id);
  };
  G.nextNode = function (id) {
    const n = G.nodes(), i = n.findIndex((x) => x.id === id);
    return i >= 0 && i + 1 < n.length ? n[i + 1] : null;
  };
  G.firstOpenNode = () => G.nodes().find((n) => !G.isDone(n.id)) || null;
  G.unitProgress = function (u) {
    const done = u.lessons.filter((l) => G.isDone(l.id)).length;
    return { done, total: u.lessons.length, boss: G.isDone('boss:' + u.id) };
  };
  // Teste de nivelamento: marca tudo antes do mundo escolhido como concluído (sem XP)
  G.skipTo = function (worldId) {
    const p = S().progress;
    for (const n of G.nodes()) {
      if (n.world >= worldId) break;
      if (!p[n.id] || !p[n.id].done) p[n.id] = { done: true, stars: 0, best: 0, n: 0, ts: Date.now(), skipped: true };
    }
    LG.Store.save();
  };

  // ----- SRS -----
  G.gradeItem = function (id, q) {
    const s = S();
    s.srs[id] = LG.SRS.grade(s.srs[id] || LG.SRS.newCard(Date.now()), q, Date.now());
  };
  G.dueItems = function () {
    const now = Date.now();
    return Object.keys(S().srs).filter((id) => S().srs[id].due <= now && (C().words[id] || C().exById[id]))
      .sort((a, b) => S().srs[a].due - S().srs[b].due);
  };
  G.errorItems = () => Object.keys(S().errors).filter((id) => C().words[id] || C().exById[id]);

  // Atualiza SRS e lista de erros a partir do resultado de uma sessão
  function applyItems(res, mode) {
    const s = S();
    for (const id of Object.keys(res.items)) {
      const wrong = res.items[id];
      const q = res.quality && res.quality[id] != null ? res.quality[id] : wrong ? 2 : 4;
      G.gradeItem(id, q);
      if (wrong) { const e = s.errors[id] || { n: 0 }; e.n += wrong; e.ts = Date.now(); s.errors[id] = e; }
      else if (mode === 'errors' || mode === 'review') delete s.errors[id];
    }
  }

  // ----- recompensas -----
  G.finishLesson = function (L, res) {
    const s = S(), prev = s.progress[L.id], first = !(prev && prev.done);
    const acc = res.accuracy;
    const stars = acc >= 0.9 ? 3 : acc >= 0.7 ? 2 : 1;
    let xp = 10 + 2 * res.correct + (stars === 3 ? 5 : 0);
    if (!first) xp = Math.round(xp / 2);
    if (res.noHearts) xp = Math.round(xp / 2);
    const coins = first ? 5 + stars * 3 : 1;
    s.progress[L.id] = { done: true, stars: Math.max(stars, (prev && prev.stars) || 0), best: Math.max(acc, (prev && prev.best) || 0), n: ((prev && prev.n) || 0) + 1, ts: Date.now() };
    applyItems(res, 'lesson');
    L.vocab.forEach((w) => {
      if (!s.words[w.id]) s.words[w.id] = { ts: Date.now(), unit: w.unit };
      if (!s.srs[w.id]) G.gradeItem(w.id, 4);
    });
    s.counters.lessons++;
    if (res.wrong === 0 && !res.noHearts) s.counters.perfect++;
    G.day(); s.daily.lessons++;
    G.addXP(xp); G.addCoins(coins); G.addSeconds(res.seconds);
    LG.Store.save();
    const newAch = G.checkAch();
    return { xp, coins, stars, first, newAch };
  };

  G.finishBoss = function (node, res) {
    const s = S(), passed = res.accuracy >= G.PASS, world = node.type === 'wboss';
    applyItems(res, 'boss');
    G.addSeconds(res.seconds);
    let xp = 0, coins = 0, first = false;
    if (passed) {
      const prev = s.progress[node.id]; first = !(prev && prev.done);
      xp = (world ? 100 : 40) + 3 * res.correct; coins = world ? 80 : 30;
      if (!first) { xp = Math.round(xp / 3); coins = 3; }
      s.progress[node.id] = { done: true, stars: res.accuracy >= 0.9 ? 3 : 2, best: Math.max(res.accuracy, (prev && prev.best) || 0), n: ((prev && prev.n) || 0) + 1, ts: Date.now() };
      if (first) s.counters.bosses++;
      G.addXP(xp); G.addCoins(coins);
    } else G.addXP(Math.round(res.correct)); // consolo
    LG.Store.save();
    return { passed, xp, coins, first, newAch: G.checkAch() };
  };

  G.finishPractice = function (res, mode) {
    applyItems(res, mode);
    const xp = Math.min(30, res.correct * (mode === 'practice' ? 1 : 2)), coins = Math.min(10, Math.floor(res.correct / 3));
    if (mode === 'review' || mode === 'errors') { S().counters.reviews++; G.addHearts(1); }
    G.addXP(xp); G.addCoins(coins); G.addSeconds(res.seconds);
    LG.Store.save();
    return { xp, coins, newAch: G.checkAch() };
  };

  G.finishLightning = function (score) {
    const s = S();
    s.counters.lightning++; s.counters.lightningBest = Math.max(s.counters.lightningBest, score);
    const xp = Math.min(40, score), coins = Math.floor(score / 2);
    G.addXP(xp); G.addCoins(coins); G.addSeconds(60);
    LG.Store.save();
    return { xp, coins, newAch: G.checkAch() };
  };

  // ----- estatísticas -----
  G.stats = function () {
    const s = S();
    let ans = 0, ok = 0, sec = 0;
    Object.values(s.history).forEach((d) => { ans += d.ans; ok += d.ok; sec += d.sec; });
    return { words: Object.keys(s.words).length, ans, ok, acc: ans ? ok / ans : 0, sec, lessons: s.counters.lessons };
  };

  // ----- conquistas -----
  const A = (id, emoji, name, desc, test, coins) => ({ id, emoji, name, desc, test, coins: coins || 20 });
  G.allAch = function () {
    const list = [
      A('first', '🌟', 'Primeiro passo', 'Complete sua primeira lição', (s) => s.counters.lessons >= 1),
      A('l10', '📘', 'Pegando o ritmo', 'Complete 10 lições', (s) => s.counters.lessons >= 10),
      A('l50', '📚', 'Estudioso', 'Complete 50 lições', (s) => s.counters.lessons >= 50, 60),
      A('s3', '🔥', 'Pegando fogo', 'Estude 3 dias seguidos', (s) => s.streak.best >= 3),
      A('s7', '🔥', 'Semana perfeita', 'Estude 7 dias seguidos', (s) => s.streak.best >= 7, 50),
      A('s30', '🏆', 'Hábito de ferro', 'Estude 30 dias seguidos', (s) => s.streak.best >= 30, 200),
      A('w50', '🔤', '50 palavras', 'Aprenda 50 palavras', (s) => Object.keys(s.words).length >= 50),
      A('w100', '💬', '100 palavras', 'Aprenda 100 palavras', (s) => Object.keys(s.words).length >= 100, 40),
      A('w500', '🧠', '500 palavras', 'Aprenda 500 palavras', (s) => Object.keys(s.words).length >= 500, 120),
      A('w1000', '🎓', '1000 palavras', 'Aprenda 1000 palavras', (s) => Object.keys(s.words).length >= 1000, 250),
      A('perfect', '💯', 'Sem errar nada', 'Termine uma lição sem nenhum erro', (s) => s.counters.perfect >= 1),
      A('boss1', '👹', 'Caçador de chefes', 'Derrote seu primeiro chefe', (s) => s.counters.bosses >= 1, 40),
      A('lv5', '⭐', 'Nível 5', 'Chegue ao nível 5', (s) => G.levelOf(s.xp) >= 5),
      A('lv10', '🌠', 'Nível 10', 'Chegue ao nível 10', (s) => G.levelOf(s.xp) >= 10, 60),
      A('xp1000', '⚡', '1000 XP', 'Ganhe 1000 XP', (s) => s.xp >= 1000, 40),
      A('rev10', '🔁', 'Memória de elefante', 'Faça 10 revisões', (s) => s.counters.reviews >= 10),
      A('light', '⏱️', 'Relâmpago', 'Complete um desafio relâmpago', (s) => s.counters.lightning >= 1),
      A('shop', '🎩', 'Estiloso', 'Compre um item na loja', (s) => s.owned.length > 2),
    ];
    C().worlds.forEach((w) => list.push(A('world' + w.id, w.emoji, `Mundo ${w.id} completo`, `Derrote o chefe do Mundo ${w.id}: ${w.title}`, (s) => !!(s.progress['wboss:' + w.id] && s.progress['wboss:' + w.id].done), 100)));
    return list;
  };
  G.checkAch = function () {
    const s = S(), got = [];
    G.allAch().forEach((a) => {
      if (!s.ach[a.id] && a.test(s)) { s.ach[a.id] = Date.now(); s.coins += a.coins; got.push(a); }
    });
    if (got.length) LG.Store.save();
    return got;
  };

  // ----- loja -----
  G.item = function (id) {
    for (const cat of LG.shop.categories) { const it = cat.items.find((i) => i.id === id); if (it) return Object.assign({ cat: cat.id }, it); }
    return null;
  };
  G.buy = function (id) {
    const s = S(), it = G.item(id);
    if (!it || s.owned.includes(id)) return 'owned';
    if (s.coins < it.price) return 'poor';
    s.coins -= it.price; s.owned.push(id); LG.Store.save(); G.checkAch();
    return 'ok';
  };
  G.equip = function (id) {
    const it = G.item(id), s = S();
    if (!it || !s.owned.includes(id)) return;
    s.avatar[it.cat] = s.avatar[it.cat] === id && it.cat !== 'face' && it.cat !== 'bg' ? '' : id;
    LG.Store.save();
  };
})(typeof globalThis !== 'undefined' ? globalThis : window);
