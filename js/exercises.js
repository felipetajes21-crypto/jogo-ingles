/* Renderizadores dos tipos de exercício. Cada um devolve { check(), lock(), mark(res) } ou se auto-envia via api.submit(). */
(function (root) {
  const LG = (root.LG = root.LG || {});
  const h = LG.h, A = LG.Answer;
  const R = (LG.Ex = { render: null });

  const prompt = (ex, host) => {
    host.append(h('h2', { class: 'prompt' }, ex.q));
    if (ex.big) host.append(h('div', { class: 'bigemo', 'aria-hidden': 'true' }, ex.big));
    if (ex.sub) host.append(h('p', { class: 'sub' }, ex.sub));
  };

  const types = {};

  // ---------- múltipla escolha ----------
  types.mc = function (ex, host, api) {
    prompt(ex, host);
    const order = ex.noShuffle ? ex.opts.map((_, i) => i) : LG.shuffle(ex.opts.map((_, i) => i));
    let sel = -1;
    const list = h('div', { class: 'opts', role: 'radiogroup', 'aria-label': 'Opções' });
    const btns = order.map((oi, k) => h('button', { class: 'opt', type: 'button', role: 'radio', 'aria-checked': 'false', onclick: () => pick(k) },
      h('span', { class: 'k' }, String(k + 1)), h('span', { class: 't' }, ex.opts[oi])));
    btns.forEach((b) => list.append(b));
    host.append(list);
    function pick(k) {
      sel = k;
      btns.forEach((b, j) => { b.classList.toggle('sel', j === k); b.setAttribute('aria-checked', String(j === k)); });
      api.ready(true);
    }
    api.onKey((e) => { const n = parseInt(e.key, 10); if (n >= 1 && n <= btns.length) pick(n - 1); });
    return {
      check: () => ({ ok: order[sel] === ex.a, user: ex.opts[order[sel]], correct: ex.opts[ex.a], why: ex.why }),
      lock: () => btns.forEach((b) => (b.disabled = true)),
      mark: (res) => btns.forEach((b, j) => {
        if (order[j] === ex.a) b.classList.add('right');
        else if (j === sel && !res.ok) b.classList.add('wrong');
      }),
    };
  };

  // ---------- montar a frase ----------
  types.bank = function (ex, host, api) {
    host.append(h('h2', { class: 'prompt' }, 'Monte a frase em inglês'), h('p', { class: 'bigpt' }, ex.pt));
    const tokens = ex.en.replace(/[.!?]+$/, '').split(/\s+/);
    const bank = LG.shuffle(tokens.concat(ex.extra || []));
    const chosen = [];
    const ans = h('div', { class: 'answer', 'aria-label': 'Sua frase', 'aria-live': 'polite' });
    const bk = h('div', { class: 'bank', 'aria-label': 'Palavras disponíveis' });
    host.append(ans, bk);
    let locked = false;
    function draw() {
      ans.innerHTML = ''; bk.innerHTML = '';
      chosen.forEach((i) => ans.append(h('button', { class: 'chip', type: 'button', onclick: () => { if (!locked) { chosen.splice(chosen.indexOf(i), 1); draw(); } } }, bank[i])));
      bank.forEach((w, i) => bk.append(h('button', { class: 'chip' + (chosen.includes(i) ? ' used' : ''), type: 'button', disabled: chosen.includes(i) || locked, onclick: () => { chosen.push(i); draw(); } }, w)));
      api.ready(chosen.length > 0);
    }
    api.onKey((e) => { if (e.key === 'Backspace' && !locked && chosen.length) { chosen.pop(); draw(); } });
    draw();
    return {
      check() { const user = chosen.map((i) => bank[i]).join(' '); return { ok: A.isCorrect(user, [ex.en].concat(ex.acc || [])), user, correct: ex.en, why: ex.why }; },
      lock() { locked = true; draw(); },
    };
  };

  // ---------- completar a lacuna ----------
  types.gap = function (ex, host, api) {
    host.append(h('h2', { class: 'prompt' }, ex.opts ? 'Escolha a palavra que completa a frase' : 'Complete a frase'));
    if (ex.pt) host.append(h('p', { class: 'sub' }, ex.pt));
    const parts = ex.frase.split('___');
    const line = h('p', { class: 'gapline' });
    let sel = null, input = null, btns = [];
    const blank = ex.opts ? h('span', { class: 'blank' }, '＿＿＿') : (input = h('input', { class: 'gapin', type: 'text', autocomplete: 'off', autocapitalize: 'none', spellcheck: 'false', 'aria-label': 'Resposta', oninput: () => api.ready(input.value.trim().length > 0) }));
    line.append(parts[0], blank, parts.slice(1).join('___'));
    host.append(line);
    if (ex.opts) {
      const order = LG.shuffle(ex.opts);
      const list = h('div', { class: 'opts inline' });
      btns = order.map((o, k) => h('button', { class: 'opt', type: 'button', onclick: () => pick(k) }, h('span', { class: 'k' }, String(k + 1)), h('span', { class: 't' }, o)));
      btns.forEach((b) => list.append(b)); host.append(list);
      var pick = (k) => { sel = order[k]; blank.textContent = sel; blank.classList.add('filled'); btns.forEach((b, j) => b.classList.toggle('sel', j === k)); api.ready(true); };
      api.onKey((e) => { const n = parseInt(e.key, 10); if (n >= 1 && n <= btns.length) pick(n - 1); });
    } else setTimeout(() => input && input.focus(), 50);
    return {
      check() {
        const user = ex.opts ? sel : input.value;
        const ok = A.isCorrect(user, ex.resp);
        return { ok, user, correct: ex.frase.replace('___', ex.resp[0]), why: ex.why, near: !ok && !ex.opts && A.isNear(user, ex.resp) };
      },
      lock() { if (input) input.disabled = true; btns.forEach((b) => (b.disabled = true)); },
    };
  };

  // ---------- digitar ----------
  types.type = function (ex, host, api) {
    prompt(ex, host);
    const input = h('input', { class: 'typein', type: 'text', autocomplete: 'off', autocapitalize: 'none', spellcheck: 'false', lang: 'en', 'aria-label': 'Sua resposta em inglês', placeholder: 'Digite em inglês…', oninput: () => api.ready(input.value.trim().length > 0) });
    host.append(input);
    setTimeout(() => input.focus(), 50);
    return {
      check() { const ok = A.isCorrect(input.value, ex.acc); return { ok, user: input.value, correct: ex.acc[0], why: ex.why, near: !ok && A.isNear(input.value, ex.acc) }; },
      lock() { input.disabled = true; },
    };
  };

  // ---------- ligar pares ----------
  types.pairs = function (ex, host, api) {
    host.append(h('h2', { class: 'prompt' }, 'Ligue cada palavra ao seu significado'));
    const left = ex.pairs.map((p, i) => ({ i, t: (p[2] ? p[2] + ' ' : '') + p[0] }));
    const right = LG.shuffle(ex.pairs.map((p, i) => ({ i, t: p[1] })));
    let selL = null, mistakes = 0, matched = 0;
    const colL = h('div', { class: 'col' }), colR = h('div', { class: 'col' });
    const bl = left.map((o) => h('button', { class: 'opt pair', type: 'button', onclick: () => { selL = o.i; bl.forEach((b, k) => b.classList.toggle('sel', left[k].i === selL)); } }, o.t));
    const br = right.map((o, k) => h('button', { class: 'opt pair', type: 'button', onclick: () => {
      if (selL == null) { LG.toast('Toque primeiro numa palavra em inglês.', 1500); return; }
      if (o.i === selL) {
        const lb = bl[left.findIndex((x) => x.i === selL)];
        lb.classList.add('right'); lb.disabled = true; br[k].classList.add('right'); br[k].disabled = true;
        selL = null; bl.forEach((b) => b.classList.remove('sel')); matched++;
        LG.sfx.play('ok');
        if (matched === ex.pairs.length) api.submit({ ok: mistakes <= 1, correct: 'Todos os pares', why: mistakes <= 1 ? 'Muito bem!' : 'Você errou ' + mistakes + ' ligações.\n' + ex.why });
      } else { mistakes++; br[k].classList.add('wrong'); setTimeout(() => br[k].classList.remove('wrong'), 500); LG.sfx.play('bad'); }
    } }, o.t));
    bl.forEach((b) => colL.append(b)); br.forEach((b) => colR.append(b));
    host.append(h('div', { class: 'pairs' }, colL, colR));
    api.hideCheck();
    return null;
  };

  // ---------- encontre o erro ----------
  types.fix = function (ex, host, api) {
    host.append(h('h2', { class: 'prompt' }, 'Encontre o erro na frase'), h('p', { class: 'sub' }, 'Toque na palavra que está errada.'));
    const words = ex.frase.split(/\s+/);
    let sel = -1;
    const line = h('div', { class: 'fixline' });
    const btns = words.map((w, i) => h('button', { class: 'chip', type: 'button', onclick: () => { sel = i; btns.forEach((b, j) => b.classList.toggle('sel', j === i)); api.ready(true); } }, w));
    btns.forEach((b) => line.append(b)); host.append(line);
    return {
      check() { return { ok: ex.errIdx.includes(sel), user: words[sel], correct: ex.corr, why: ex.why }; },
      lock() { btns.forEach((b) => (b.disabled = true)); },
      mark(res) { ex.errIdx.forEach((i) => btns[i].classList.add('right')); if (!res.ok && sel >= 0) btns[sel].classList.add('wrong'); },
    };
  };

  // ---------- diálogo ----------
  types.dlg = function (ex, host, api) {
    host.append(h('h2', { class: 'prompt' }, '💬 ' + ex.cena));
    const chat = h('div', { class: 'chat', role: 'log', 'aria-live': 'polite' });
    const opts = h('div', { class: 'opts' });
    host.append(chat, opts);
    api.hideCheck();
    let t = 0, errors = 0;
    function bubble(who, en, pt, me) {
      const b = h('div', { class: 'bubble ' + (me ? 'me' : 'them') }, h('span', { class: 'who' }, who), h('span', { class: 'en' }, en));
      if (pt) {
        const p = h('span', { class: 'pt', hidden: true }, pt);
        b.append(h('button', { class: 'tr', type: 'button', 'aria-label': 'Mostrar ou ocultar tradução', onclick: () => { p.hidden = !p.hidden; } }, '🇧🇷'), p);
      }
      chat.append(b); b.scrollIntoView && b.scrollIntoView({ block: 'nearest' });
    }
    function turn() {
      opts.innerHTML = '';
      if (t >= ex.turns.length) {
        api.submit({ ok: errors === 0, correct: 'Diálogo concluído', why: errors ? `Você escolheu ${errors} resposta(s) inadequada(s). Releia as dicas e tente falar com mais naturalidade.` : 'Conversa perfeita! 👏' });
        return;
      }
      const tn = ex.turns[t];
      if (tn.say) bubble(ex.who || 'Outra pessoa', tn.say, tn.pt, false);
      const order = LG.shuffle(tn.opts);
      const hint = h('p', { class: 'hint', role: 'alert' });
      order.forEach((o, k) => {
        const b = h('button', { class: 'opt', type: 'button', onclick: () => {
          if (o[1]) { LG.sfx.play('ok'); bubble('Você', o[0], null, true); t++; turn(); }
          else { errors++; b.classList.add('wrong'); b.disabled = true; LG.sfx.play('bad'); hint.textContent = '❌ ' + (o[2] || 'Essa resposta não combina com a conversa.'); }
        } }, h('span', { class: 'k' }, String(k + 1)), h('span', { class: 't' }, o[0]));
        opts.append(b);
      });
      opts.append(hint);
      api.onKey((e) => { const n = parseInt(e.key, 10); const bs = opts.querySelectorAll('button.opt'); if (n >= 1 && n <= bs.length && !bs[n - 1].disabled) bs[n - 1].click(); }, true);
    }
    turn();
    return null;
  };

  // ---------- leitura ----------
  types.read = function (ex, host, api) {
    host.append(h('h2', { class: 'prompt' }, '📖 ' + (ex.titulo || 'Leia e responda')));
    const pt = h('p', { class: 'readpt', hidden: true }, ex.pt || '');
    host.append(h('div', { class: 'readbox' }, h('p', { class: 'readen' }, ex.text), ex.pt ? h('button', { class: 'btn ghost small', type: 'button', onclick: () => { pt.hidden = !pt.hidden; } }, '🇧🇷 Ver tradução') : null, pt));
    const box = h('div', { class: 'qbox' }); host.append(box);
    api.hideCheck();
    let qi = 0, errors = 0;
    function ask() {
      box.innerHTML = '';
      if (qi >= ex.qs.length) {
        api.submit({ ok: errors === 0, correct: 'Leitura concluída', why: errors ? `Você errou ${errors} vez(es). Releia o texto com calma.` : 'Compreensão perfeita! 👏' });
        return;
      }
      const q = ex.qs[qi];
      box.append(h('h3', { class: 'subprompt' }, q.q));
      const hint = h('p', { class: 'hint', role: 'alert' });
      const list = h('div', { class: 'opts' });
      LG.shuffle(q.opts.map((o, i) => i)).forEach((oi, k) => {
        const b = h('button', { class: 'opt', type: 'button', onclick: () => {
          if (oi === q.a) { LG.sfx.play('ok'); qi++; ask(); }
          else { errors++; b.classList.add('wrong'); b.disabled = true; LG.sfx.play('bad'); hint.textContent = '❌ ' + (q.why || 'Procure a resposta no texto.'); }
        } }, h('span', { class: 'k' }, String(k + 1)), h('span', { class: 't' }, q.opts[oi]));
        list.append(b);
      });
      box.append(list, hint);
    }
    ask();
    return null;
  };

  // ---------- flashcard (revisão com autoavaliação) ----------
  types.flash = function (ex, host, api) {
    const w = ex.w, enFirst = Math.random() < 0.5;
    host.append(h('h2', { class: 'prompt' }, 'Você lembra o significado?'));
    if (w.emo) host.append(h('div', { class: 'bigemo', 'aria-hidden': 'true' }, w.emo));
    const card = h('div', { class: 'flashcard' }, h('div', { class: 'front' }, enFirst ? w.en : w.pt));
    const back = h('div', { class: 'back', hidden: true },
      h('div', { class: 'big' }, enFirst ? w.pt : w.en),
      w.r ? h('div', { class: 'r' }, 'Lê-se: ' + w.r) : null,
      w.ex ? h('div', { class: 'exs' }, w.ex, w.exPt ? h('em', null, ' — ' + w.exPt) : null) : null,
      w.n ? h('div', { class: 'warn' }, '⚠️ ' + w.n) : null);
    const rate = h('div', { class: 'rate', hidden: true });
    [['Errei', 1, 'bad'], ['Difícil', 3, ''], ['Bom', 4, ''], ['Fácil', 5, 'good']].forEach(([t, q, c]) =>
      rate.append(h('button', { class: 'btn ' + c, type: 'button', onclick: () => api.submit({ ok: q >= 3, q, silent: true, correct: w.en + ' = ' + w.pt }) }, t)));
    const show = h('button', { class: 'btn primary', type: 'button', onclick: () => { back.hidden = false; rate.hidden = false; show.hidden = true; } }, 'Mostrar resposta');
    host.append(card, back, show, rate);
    api.hideCheck();
    return null;
  };

  R.render = function (ex, host, api) {
    const f = types[ex.t];
    if (!f) throw new Error('Tipo de exercício desconhecido: ' + ex.t);
    return f(ex, host, api);
  };
  R.types = types;
})(typeof globalThis !== 'undefined' ? globalThis : window);
