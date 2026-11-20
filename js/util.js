/* Utilidades gerais (DOM, formatação, sons de feedback, confete). Compatível com Node para testes. */
(function (root) {
  const LG = (root.LG = root.LG || {});

  // Cria elementos DOM de forma segura (texto sempre como texto).
  LG.h = function (tag, props, ...kids) {
    const el = document.createElement(tag);
    for (const k in props || {}) {
      const v = props[k];
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
      else el.setAttribute(k, v === true ? '' : v);
    }
    kids.flat(Infinity).forEach((c) => {
      if (c == null || c === false) return;
      el.append(c.nodeType ? c : document.createTextNode(String(c)));
    });
    return el;
  };

  // Mini-markdown seguro: **negrito**, *itálico*, quebra de linha.
  LG.md = function (s) {
    if (!s) return '';
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  };

  LG.shuffle = function (a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  LG.dayStr = function (offset) {
    const d = new Date();
    d.setDate(d.getDate() + (offset || 0));
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  };
  LG.today = () => LG.dayStr(0);

  LG.fmtTime = function (sec) {
    sec = Math.round(sec || 0);
    const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60);
    if (h) return h + ' h ' + m + ' min';
    if (m) return m + ' min';
    return sec + ' s';
  };

  LG.toast = function (msg, ms) {
    if (typeof document === 'undefined') return;
    const t = document.getElementById('toast');
    if (!t) return;
    const item = LG.h('div', { class: 'toast-item' }, msg);
    t.append(item);
    setTimeout(() => item.remove(), ms || 3500);
  };

  // Sons de feedback (opcionais). Não é voz: apenas tons curtos.
  LG.sfx = {
    ctx: null,
    on: true,
    play(name) {
      if (!this.on || typeof AudioContext === 'undefined') return;
      try {
        this.ctx = this.ctx || new AudioContext();
        const seq = {
          ok: [[660, 0, 0.1], [880, 0.09, 0.15]],
          bad: [[220, 0, 0.16], [165, 0.15, 0.22]],
          done: [[523, 0, 0.12], [659, 0.12, 0.12], [784, 0.24, 0.22]],
        }[name] || [];
        const t0 = this.ctx.currentTime;
        seq.forEach(([f, t, d]) => {
          const o = this.ctx.createOscillator(), g = this.ctx.createGain();
          o.type = name === 'bad' ? 'triangle' : 'sine';
          o.frequency.value = f;
          g.gain.setValueAtTime(0.0001, t0 + t);
          g.gain.exponentialRampToValueAtTime(0.15, t0 + t + 0.02);
          g.gain.exponentialRampToValueAtTime(0.0001, t0 + t + d);
          o.connect(g); g.connect(this.ctx.destination);
          o.start(t0 + t); o.stop(t0 + t + d + 0.02);
        });
      } catch (e) { /* sem áudio: tudo bem */ }
    },
  };

  LG.confetti = function () {
    if (typeof document === 'undefined') return;
    if (root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const c = document.getElementById('confetti');
    if (!c) return;
    const ctx = c.getContext('2d');
    c.width = root.innerWidth; c.height = root.innerHeight; c.style.display = 'block';
    const cols = ['#58cc02', '#1cb0f6', '#ffc800', '#ff4b4b', '#ce82ff'];
    const parts = Array.from({ length: 140 }, () => ({
      x: Math.random() * c.width, y: -20 - Math.random() * c.height * 0.5,
      vx: (Math.random() - 0.5) * 4, vy: 2 + Math.random() * 4, s: 5 + Math.random() * 6,
      r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, col: cols[Math.floor(Math.random() * cols.length)],
    }));
    let t = 0;
    (function f() {
      ctx.clearRect(0, 0, c.width, c.height);
      parts.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.r += p.vr;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.col;
        ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6); ctx.restore();
      });
      if (++t < 150) requestAnimationFrame(f);
      else { ctx.clearRect(0, 0, c.width, c.height); c.style.display = 'none'; }
    })();
  };
})(typeof globalThis !== 'undefined' ? globalThis : window);
