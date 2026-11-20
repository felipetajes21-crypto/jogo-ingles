/* Normalização e conferência de respostas (aceita contrações, maiúsculas, pontuação). */
(function (root) {
  const LG = (root.LG = root.LG || {});

  const CONTR = [
    [/\bi'm\b/g, 'i am'],
    [/\b(you|we|they)'re\b/g, '$1 are'],
    [/\b(he|she|it|that|what|who|where|there|here|how|when|why)'s\b/g, '$1 is'],
    [/\bi've\b/g, 'i have'],
    [/\b(you|we|they|who|would|could)'ve\b/g, '$1 have'],
    [/\b(i|you|he|she|it|we|they|there|that)'ll\b/g, '$1 will'],
    [/\b(i|you|he|she|we|they|it|that)'d\b/g, '$1 would'],
    [/\bcan't\b/g, 'can not'],
    [/\bcannot\b/g, 'can not'],
    [/\bwon't\b/g, 'will not'],
    [/\bshan't\b/g, 'shall not'],
    [/\blet's\b/g, 'let us'],
    [/\b(\w+)n't\b/g, '$1 not'],
  ];

  function norm(s) {
    s = String(s == null ? '' : s).toLowerCase()
      .replace(/[’‘`´]/g, "'").replace(/[“”]/g, '"')
      .replace(/[.!?,;:"…¿¡()]+/g, ' ')
      .replace(/-/g, ' ');
    for (const [re, rep] of CONTR) s = s.replace(re, rep);
    return s.replace(/\s+/g, ' ').trim();
  }

  function lev(a, b) {
    const m = a.length, n = b.length;
    if (!m) return n; if (!n) return m;
    let prev = Array.from({ length: n + 1 }, (_, i) => i);
    for (let i = 1; i <= m; i++) {
      const cur = [i];
      for (let j = 1; j <= n; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
      prev = cur;
    }
    return prev[n];
  }

  LG.Answer = {
    norm,
    isCorrect(user, accepted) {
      const u = norm(user);
      if (!u) return false;
      return [].concat(accepted).some((a) => norm(a) === u);
    },
    // Resposta quase certa (erro de 1 letra): usado só para dar uma dica.
    isNear(user, accepted) {
      const u = norm(user);
      if (u.length < 4) return false;
      return [].concat(accepted).some((a) => lev(norm(a), u) === 1);
    },
  };
  if (typeof module !== 'undefined') module.exports = LG.Answer;
})(typeof globalThis !== 'undefined' ? globalThis : window);
