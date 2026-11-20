/* Persistência em localStorage (com fallback em memória) + exportar/importar JSON. */
(function (root) {
  const LG = (root.LG = root.LG || {});
  const KEY = 'englishquest.v1';
  let memory = null;

  function defaults() {
    return {
      v: 1,
      profile: null, // { name }
      settings: { theme: 'auto', sound: true, goal: 20, reminder: true },
      xp: 0,
      coins: 0,
      hearts: { n: 5, max: 5, ts: Date.now() },
      streak: { count: 0, last: null, best: 0 },
      daily: { date: LG.today(), xp: 0, lessons: 0 },
      progress: {}, // nodeId -> {done, stars, best, n, ts, skipped}
      srs: {}, // itemId -> cartão SM-2
      words: {}, // palavras aprendidas
      errors: {}, // itemId -> {n, ts}
      history: {}, // 'YYYY-MM-DD' -> {xp, sec, ans, ok}
      ach: {}, // conquistas
      owned: ['face-smile', 'bg-sky'],
      avatar: { face: 'face-smile', hat: '', pet: '', bg: 'bg-sky' },
      placement: null,
      counters: { lessons: 0, reviews: 0, lightning: 0, lightningBest: 0, bosses: 0, perfect: 0 },
      created: Date.now(),
    };
  }

  function merge(base, saved) {
    const out = Object.assign({}, base, saved);
    for (const k of ['settings', 'hearts', 'streak', 'daily', 'avatar', 'counters']) {
      out[k] = Object.assign({}, base[k], (saved && saved[k]) || {});
    }
    return out;
  }

  LG.Store = {
    KEY,
    state: null,
    load() {
      let raw = null;
      try { raw = root.localStorage && root.localStorage.getItem(KEY); } catch (e) { raw = memory; }
      let saved = null;
      if (raw) { try { saved = JSON.parse(raw); } catch (e) { saved = null; } }
      this.state = merge(defaults(), saved);
      return this.state;
    },
    save() {
      const raw = JSON.stringify(this.state);
      memory = raw;
      try { root.localStorage && root.localStorage.setItem(KEY, raw); } catch (e) { /* modo privado etc. */ }
    },
    reset() {
      this.state = defaults();
      this.save();
    },
    exportJSON() {
      return JSON.stringify({ app: 'english-quest', exportedAt: new Date().toISOString(), data: this.state }, null, 2);
    },
    importJSON(text) {
      let obj;
      try { obj = JSON.parse(text); } catch (e) { throw new Error('O arquivo não é um JSON válido.'); }
      const data = obj && obj.app === 'english-quest' ? obj.data : obj;
      if (!data || typeof data !== 'object' || data.v !== 1 || !data.progress || !data.settings) {
        throw new Error('Este arquivo não parece ser um progresso do English Quest.');
      }
      this.state = merge(defaults(), data);
      this.save();
    },
  };
})(typeof globalThis !== 'undefined' ? globalThis : window);
