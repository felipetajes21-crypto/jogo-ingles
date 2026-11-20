/* Executa uma sessão de exercícios (lição, chefe, revisão, prática, nivelamento). */
(function (root) {
  const LG = (root.LG = root.LG || {});
  const h = LG.h;
  const PRAISE = ['Correto!', 'Muito bem!', 'Isso aí!', 'Perfeito!', 'Excelente!', 'Mandou bem!'];

  const Session = (LG.Session = {
    _cleanup: null,
    stop() { if (this._cleanup) { this._cleanup(); this._cleanup = null; } },

    /* opts: { title, queue, mode, hearts, retry, adaptive, onFinish(res), onQuit() } */
    run(o) {
      Session.stop();
      const app = document.getElementById('app');
      app.innerHTML = '';
      const total = o.queue.length;
      let queue = o.queue.slice(), done = 0, correct = 0, wrong = 0, cur = null, ctrl = null, answered = false, noHearts = false;
      const items = {}, quality = {}, answers = [], lvlWrong = {};
      const keys = {};
      const t0 = Date.now();
      let exStart = Date.now(), active = 0;
      const useHearts = !!o.hearts;
      if (useHearts && LG.Game.hearts().n <= 0) noHearts = true;

      const bar = h('div', { class: 'bar' });
      const heartsEl = h('div', { class: 'hearts', 'aria-label': 'Vidas' });
      const host = h('main', { class: 's-body', id: 'ex-host' });
      const fb = h('div', { class: 'fb', 'aria-live': 'assertive' });
      const btn = h('button', { class: 'btn primary big', type: 'button', disabled: true }, 'Verificar');
      const quit = h('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Sair da sessão', onclick: () => {
        if (confirm('Sair agora? O progresso desta sessão será perdido.')) { Session.stop(); (o.onQuit || (() => LG.nav('#/map')))(); }
      } }, '✕');
      app.append(h('div', { class: 'session' },
        h('header', { class: 's-top' }, quit, h('div', { class: 'progress', role: 'progressbar', 'aria-label': o.title || 'Progresso' }, bar), useHearts ? heartsEl : h('span')),
        host, h('footer', { class: 's-foot' }, fb, btn)));

      function drawHearts() {
        if (!useHearts) return;
        const n = LG.Game.hearts().n;
        heartsEl.textContent = '❤️ ' + n;
        heartsEl.title = n ? n + ' vida(s)' : 'Sem vidas: continue treinando sem perder vidas (XP reduzido)';
      }
      function progress() { bar.style.width = Math.round((done / total) * 100) + '%'; }

      const api = {
        ready: (b) => { btn.disabled = !b; },
        hideCheck: () => { btn.hidden = true; },
        onKey: (fn, tag) => { keys[tag || 'k' + Object.keys(keys).length] = fn; },
        submit: (res) => resolve(res),
      };

      function next() {
        fb.className = 'fb'; fb.innerHTML = ''; host.innerHTML = '';
        for (const k in keys) delete keys[k];
        btn.hidden = false; btn.disabled = true; btn.textContent = 'Verificar'; btn.className = 'btn primary big';
        btn.dataset.mode = 'check';
        answered = false; progress(); drawHearts();
        if (!queue.length) return finish();
        cur = queue.shift();
        exStart = Date.now();
        try { ctrl = LG.Ex.render(cur, host, api); } catch (e) { console.error(e); done++; return next(); }
        LG.Session.current = { ex: cur, ctrl }; // usado nos testes automatizados
        host.scrollTop = 0;
        const first = host.querySelector('input,button.opt,button.chip'); // foco para teclado
        if (first && first.tagName !== 'INPUT') first.focus({ preventScroll: true });
      }

      function resolve(res) {
        if (answered) return;
        answered = true;
        active += Math.min(60, (Date.now() - exStart) / 1000);
        if (ctrl) { if (ctrl.lock) ctrl.lock(); if (ctrl.mark) ctrl.mark(res); }
        const ok = !!res.ok;
        if (cur.t !== 'flash') LG.Game.recordAnswer(ok);
        (cur.items || []).forEach((id) => {
          items[id] = (items[id] || 0) + (ok ? 0 : 1);
          if (res.q != null) quality[id] = res.q;
        });
        if (!cur.retry) {
          answers.push({ lvl: cur.lvl, ok });
          if (ok) correct++; else { wrong++; if (cur.lvl) lvlWrong[cur.lvl] = (lvlWrong[cur.lvl] || 0) + 1; }
        }
        if (!ok && useHearts && !LG.Game.loseHeart()) noHearts = true;
        if (!ok && useHearts && LG.Game.hearts().n <= 0) noHearts = true;
        drawHearts();
        if (!ok && o.retry !== false && !cur.retry) queue.push(Object.assign({}, cur, { retry: true }));
        else done++;
        if (o.adaptive && cur.lvl && lvlWrong[cur.lvl] >= 2) queue = [];
        LG.sfx.play(ok ? 'ok' : 'bad');
        if (res.silent) return next();
        showFeedback(res, ok);
      }

      function showFeedback(res, ok) {
        fb.className = 'fb show ' + (ok ? 'ok' : 'bad');
        fb.innerHTML = '';
        const title = ok ? PRAISE[Math.floor(Math.random() * PRAISE.length)] : (res.near ? 'Quase! Confira a ortografia.' : 'Não foi dessa vez');
        fb.append(h('div', { class: 'fb-title' }, (ok ? '✅ ' : '❌ ') + title));
        if (!ok || (res.why && cur.t !== 'dlg' && cur.t !== 'read')) {
          if (!ok && res.correct) fb.append(h('div', { class: 'fb-correct' }, h('span', null, 'Resposta correta: '), h('strong', null, res.correct)));
          if (res.why) fb.append(h('div', { class: 'fb-why', html: LG.md(res.why) }));
        } else if (res.why && (cur.t === 'dlg' || cur.t === 'read')) fb.append(h('div', { class: 'fb-why', html: LG.md(res.why) }));
        btn.hidden = false; btn.disabled = false; btn.textContent = 'Continuar'; btn.dataset.mode = 'next';
        btn.className = 'btn big ' + (ok ? 'good' : 'bad');
        btn.focus();
      }

      btn.addEventListener('click', () => {
        if (btn.dataset.mode === 'next') return next();
        if (answered || btn.disabled || !ctrl) return;
        resolve(ctrl.check());
      });

      function onKey(e) {
        if (e.key === 'Enter') {
          // Enter = Verificar/Continuar (Espaço seleciona opções). Sem botão ativo, deixa o comportamento nativo.
          if (!btn.hidden && !btn.disabled) { e.preventDefault(); btn.click(); }
          return;
        }
        if (answered || (e.target && e.target.tagName === 'INPUT')) return;
        Object.values(keys).forEach((f) => f(e));
      }
      document.addEventListener('keydown', onKey);
      Session._cleanup = () => document.removeEventListener('keydown', onKey);

      function finish() {
        Session.stop();
        const res = {
          mode: o.mode, total, correct, wrong, accuracy: total ? correct / total : 0,
          seconds: Math.max(5, Math.round(active)), items, quality, answers, noHearts,
          elapsed: Math.round((Date.now() - t0) / 1000),
        };
        o.onFinish(res);
      }
      next();
    },
  });
})(typeof globalThis !== 'undefined' ? globalThis : window);
