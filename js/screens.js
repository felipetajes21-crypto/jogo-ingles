/* Telas do aplicativo (mapa, lição, resultado, revisão, loja, dicionário, estatísticas, configurações...). */
(function (root) {
  const LG = (root.LG = root.LG || {});
  const h = LG.h, C = () => LG.Content, G = () => LG.Game, S = () => LG.Store.state;
  const $app = () => document.getElementById('app');
  const Screens = (LG.Screens = {});

  // Navegação interna: não depende só do endereço (funciona também dentro de páginas incorporadas).
  LG._h = null;
  LG.nav = (hash) => {
    LG._h = hash;
    try { if (location.hash !== hash) history.replaceState(null, '', hash); } catch (e) { /* sem histórico: tudo bem */ }
    LG.route();
  };
  document.addEventListener('click', (e) => {
    const a = e.target.closest && e.target.closest('a[href^="#/"]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
    e.preventDefault(); LG.nav(a.getAttribute('href'));
  });

  // ---------- componentes ----------
  function avatarEl(size, av) {
    av = av || S().avatar;
    const g = G(), face = g.item(av.face), bg = g.item(av.bg), hat = av.hat && g.item(av.hat), pet = av.pet && g.item(av.pet);
    const tier = g.tierOf(g.levelOf(S().xp));
    return h('div', { class: 'avatar tier' + tier, role: 'img', 'aria-label': 'Seu avatar', style: { '--s': size + 'px', background: bg ? bg.color : '#cfe8ff' } },
      hat ? h('span', { class: 'a-hat', 'aria-hidden': 'true' }, hat.emoji) : null,
      h('span', { class: 'a-face', 'aria-hidden': 'true' }, face ? face.emoji : '🙂'),
      pet ? h('span', { class: 'a-pet', 'aria-hidden': 'true' }, pet.emoji) : null);
  }

  function topbar() {
    const s = S(), lp = G().levelProgress(s.xp), hr = G().hearts();
    return h('header', { class: 'topbar' },
      h('a', { class: 'who', href: '#/profile', 'aria-label': 'Perfil: ' + (s.profile ? s.profile.name : '') + ', nível ' + lp.level }, avatarEl(36), h('span', { class: 'lvl' }, 'Nv ' + lp.level)),
      h('div', { class: 'chips' },
        h('span', { class: 'chip', title: 'Sequência de dias', 'aria-label': G().streakNow() + ' dias seguidos' }, '🔥 ' + G().streakNow()),
        h('span', { class: 'chip', title: 'Moedas', 'aria-label': s.coins + ' moedas' }, '🪙 ' + s.coins),
        h('span', { class: 'chip', title: hr.n < hr.max ? 'Próxima vida em ' + LG.fmtTime(G().nextHeartMs() / 1000) : 'Vidas cheias', 'aria-label': hr.n + ' vidas' }, '❤️ ' + hr.n),
        h('span', { class: 'chip', title: 'XP total', 'aria-label': s.xp + ' XP' }, '⚡ ' + s.xp)));
  }

  const NAV = [['map', '🗺️', 'Mapa', '#/map'], ['review', '🔁', 'Revisão', '#/review'], ['practice', '🎯', 'Praticar', '#/practice'], ['shop', '🛒', 'Loja', '#/shop'], ['profile', '🧑', 'Perfil', '#/profile']];
  function navbar(active) {
    const due = G().dueItems().length;
    return h('nav', { class: 'bottomnav', 'aria-label': 'Menu principal' }, NAV.map(([k, e, t, href]) =>
      h('a', { href, class: k === active ? 'active' : '', 'aria-current': k === active ? 'page' : null },
        h('span', { class: 'ni', 'aria-hidden': 'true' }, e), h('span', null, t), k === 'review' && due ? h('b', { class: 'badge', 'aria-label': due + ' para revisar' }, String(Math.min(due, 99))) : null)));
  }

  function shell(active, kids) {
    LG.Session.stop();
    const app = $app(); app.innerHTML = '';
    app.append(topbar(), h('main', { class: 'main', id: 'main', tabindex: '-1' }, kids), navbar(active));
    window.scrollTo(0, 0);
  }

  // Página simples (sem barra inferior): usada para aulas, resultados etc.
  function plain(title, back, kids, actions) {
    LG.Session.stop();
    const app = $app(); app.innerHTML = '';
    app.append(h('div', { class: 'plain' },
      h('header', { class: 'plain-top' }, back ? h('a', { class: 'icon-btn', href: back, 'aria-label': 'Voltar' }, '←') : h('span'), h('h1', null, title)),
      h('main', { class: 'plain-body', id: 'main', tabindex: '-1' }, kids),
      actions ? h('footer', { class: 'plain-foot' }, actions) : null));
    window.scrollTo(0, 0);
  }

  const card = (cls, ...kids) => h('section', { class: 'card ' + (cls || '') }, kids);
  const btn = (label, onclick, cls) => h('button', { class: 'btn ' + (cls || 'primary'), type: 'button', onclick }, label);
  const link = (label, href, cls) => h('a', { class: 'btn ' + (cls || 'primary'), href }, label);

  // ---------- boas-vindas ----------
  Screens.welcome = function () {
    LG.Session.stop();
    const app = $app(); app.innerHTML = '';
    const input = h('input', { class: 'typein', type: 'text', id: 'nm', maxlength: 24, placeholder: 'Seu nome ou apelido', autocomplete: 'nickname', 'aria-label': 'Seu nome' });
    const form = h('form', { class: 'welcome-form', onsubmit: (e) => {
      e.preventDefault();
      const name = input.value.trim();
      if (!name) { input.focus(); return; }
      S().profile = { name }; LG.Store.save(); chooseStart();
    } }, h('label', { for: 'nm' }, 'Como você quer ser chamado?'), input, h('button', { class: 'btn primary big', type: 'submit' }, 'Começar a aventura'));
    app.append(h('div', { class: 'plain welcome' }, h('main', { class: 'plain-body', id: 'main' },
      h('div', { class: 'hero' }, h('div', { class: 'hero-emo', 'aria-hidden': 'true' }, '🗺️'), h('h1', null, 'English Quest'), h('p', null, 'Aprenda inglês do zero ao avançado numa aventura com mapas, chefes, medalhas e um avatar só seu.')),
      form,
      h('ul', { class: 'perks' }, ['📖 Mini-aulas em português', '✍️ Exercícios de leitura e escrita', '🔁 Revisão inteligente dos seus erros', '💾 Tudo salvo no seu navegador'].map((t) => h('li', null, t))))));
    input.focus();
  };

  function chooseStart() {
    plain('Por onde começar?', null, [
      card('', h('h2', null, '🌱 Começar do zero'), h('p', null, 'Ideal se você está começando agora ou quer ter certeza de que não vai pular nada.'), link('Começar do Mundo 1', '#/map')),
      card('', h('h2', null, '🎯 Teste de nivelamento'), h('p', null, 'Responda algumas perguntas e vá direto para o mundo certo. Pode errar à vontade: o teste termina sozinho.'), link('Fazer o teste', '#/placement', 'blue')),
    ]);
  }

  // ---------- mapa ----------
  const OFFS = [0, 34, 56, 34, 0, -34, -56, -34];

  function goalCard() {
    const s = S(); G().day();
    const goal = s.settings.goal, xp = s.daily.xp, pct = Math.min(100, Math.round((xp / goal) * 100));
    const hour = new Date().getHours();
    let msg = xp >= goal ? '🎉 Meta do dia cumprida! Continue se quiser.' : `Faltam ${goal - xp} XP para a meta de hoje.`;
    if (s.settings.reminder && xp < goal && hour >= 18) msg = '⏰ Já é noite! Faça uma lição rápida para ' + (G().streakNow() ? 'manter sua sequência de ' + G().streakNow() + ' dia(s).' : 'começar sua sequência.');
    return card('goal', h('div', { class: 'goal-row' }, h('strong', null, 'Meta diária'), h('span', null, `${Math.min(xp, goal)}/${goal} XP`)),
      h('div', { class: 'meter', role: 'progressbar', 'aria-valuenow': pct, 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-label': 'Meta diária' }, h('div', { style: { width: pct + '%' } })), h('p', { class: 'muted' }, msg));
  }

  function lessonNode(L, i) {
    const done = G().isDone(L.id), open = G().isUnlocked(L.id), pr = S().progress[L.id] || {};
    const stars = '⭐'.repeat(pr.stars || 0);
    const st = done ? 'concluída' : open ? 'disponível' : 'bloqueada';
    const lab = `Lição ${L.n}: ${L.title} — ${st}`;
    const body = [h('span', { class: 'n-emo', 'aria-hidden': 'true' }, open ? (done && pr.skipped ? '✓' : L.emoji || String(L.n)) : '🔒'), h('span', { class: 'n-title' }, L.title), done && stars ? h('span', { class: 'n-stars', 'aria-hidden': 'true' }, stars) : null];
    const style = { transform: `translateX(${OFFS[i % OFFS.length]}px)` };
    return open ? h('a', { class: 'node ' + (done ? 'done' : 'open'), href: '#/lesson/' + L.id, 'aria-label': lab, style }, body)
      : h('span', { class: 'node locked', role: 'img', 'aria-label': lab, style }, body);
  }

  function bossNode(id, emoji, label, i, big) {
    const done = G().isDone(id), open = G().isUnlocked(id);
    const style = { transform: `translateX(${OFFS[i % OFFS.length]}px)` };
    const body = [h('span', { class: 'n-emo', 'aria-hidden': 'true' }, open ? emoji : '🔒'), h('span', { class: 'n-title' }, label)];
    const lab = `${label} — ${done ? 'derrotado' : open ? 'disponível' : 'bloqueado'}`;
    const href = id.startsWith('wboss:') ? '#/wboss/' + id.slice(6) : '#/boss/' + id.slice(5);
    return open ? h('a', { class: 'node boss ' + (big ? 'big ' : '') + (done ? 'done' : 'open'), href, 'aria-label': lab, style }, body)
      : h('span', { class: 'node boss locked ' + (big ? 'big' : ''), role: 'img', 'aria-label': lab, style }, body);
  }

  Screens.map = function () {
    const kids = [goalCard()];
    C().worlds.forEach((w) => {
      const units = C().unitsOfWorld(w.id);
      const total = units.reduce((a, u) => a + u.lessons.length + 1, 0), done = units.reduce((a, u) => a + u.lessons.filter((l) => G().isDone(l.id)).length + (G().isDone('boss:' + u.id) ? 1 : 0), 0);
      kids.push(h('div', { class: 'world-head', style: { '--c': w.color } },
        h('span', { class: 'w-emo', 'aria-hidden': 'true' }, w.emoji),
        h('div', null, h('h2', null, `Mundo ${w.id} — ${w.title}`), h('p', null, `${w.level} · ${w.desc}`)),
        units.length ? h('span', { class: 'w-count' }, `${done}/${total + 1}`) : null));
      if (!units.length) { kids.push(card('soon', h('p', null, '🚧 Este mundo ainda está sendo construído. Volte em breve!'))); return; }
      units.forEach((u) => {
        const up = G().unitProgress(u);
        const path = h('div', { class: 'path' });
        u.lessons.forEach((L, i) => path.append(lessonNode(L, i)));
        path.append(bossNode('boss:' + u.id, '👹', 'Chefe: ' + u.title, u.lessons.length, false));
        kids.push(h('section', { class: 'unit', 'aria-label': 'Unidade ' + u.label + ': ' + u.title },
          h('div', { class: 'unit-head', style: { '--c': w.color } }, h('span', { class: 'unit-emo', 'aria-hidden': 'true' }, u.emoji || '📘'),
            h('div', null, h('h3', null, `Unidade ${u.label} · ${u.title}`), h('p', null, u.desc || '')), h('span', { class: 'unit-count' }, `${up.done}/${up.total}`)), path));
      });
      kids.push(h('div', { class: 'path wpath' }, bossNode('wboss:' + w.id, '🐉', `Chefe do Mundo ${w.id}`, 0, true)));
    });
    shell('map', kids);
    if (S().counters.lessons > 0) { const t = document.querySelector('.node.open'); if (t && t.scrollIntoView) t.scrollIntoView({ block: 'center' }); }
  };

  // ---------- lição ----------
  function introBlocks(L) {
    const i = L.intro, kids = [];
    kids.push(h('h2', null, i.titulo || L.title));
    if (i.texto) kids.push(h('div', { class: 'aula', html: LG.md(i.texto) }));
    if (i.exemplos && i.exemplos.length) kids.push(h('ul', { class: 'examples', 'aria-label': 'Exemplos' }, i.exemplos.map((e) => h('li', null, h('span', { class: 'en' }, e[0]), h('span', { class: 'pt' }, e[1])))));
    if (i.leitura) kids.push(h('div', { class: 'note read' }, h('strong', null, '🔤 Como se lê'), h('div', { html: LG.md(i.leitura) })));
    if (i.cuidado) kids.push(h('div', { class: 'note warn' }, h('strong', null, '⚠️ Cuidado!'), h('div', { html: LG.md(i.cuidado) })));
    if (i.cultura) kids.push(h('div', { class: 'note cult' }, h('strong', null, '🌎 Nota cultural'), h('div', { html: LG.md(i.cultura) })));
    return kids;
  }

  Screens.lesson = function (id) {
    const L = C().lessonById[id];
    if (!L || !G().isUnlocked(id)) return LG.nav('#/map');
    const hr = G().hearts();
    const kids = [h('p', { class: 'kicker' }, `Unidade ${C().unitById[L.unit].label} · Lição ${L.n}`), ...introBlocks(L)];
    if (hr.n <= 0) kids.push(h('div', { class: 'note warn' }, h('strong', null, '💔 Sem vidas'), h('div', null, 'Você pode treinar mesmo assim, mas sem perder vidas e com XP reduzido. Revisar palavras devolve uma vida.')));
    plain(L.title, '#/map', kids, btn(L.vocab.length ? 'Ver as palavras →' : 'Começar exercícios', () => (L.vocab.length ? vocabCards(L) : startLesson(L))));
  };

  function vocabCards(L) {
    const grid = h('div', { class: 'vlist' }, L.vocab.map((w) => h('article', { class: 'vcard' },
      h('div', { class: 'v-head' }, h('span', { class: 'v-en' }, w.en), h('span', { class: 'v-eq', 'aria-hidden': 'true' }, '='), h('span', { class: 'v-pt' }, w.pt)),
      w.ex ? h('div', { class: 'v-ex' }, h('span', { class: 'en' }, w.ex), w.exPt ? h('span', { class: 'pt' }, w.exPt) : null) : null,
      w.n ? h('div', { class: 'v-n' }, '⚠️ ' + w.n) : null)));
    plain('Palavras da lição', '#/map', [h('p', { class: 'muted' }, `${L.vocab.length} palavra(s) nova(s). Leia cada uma com o exemplo: nos exercícios você vai completar e traduzir frases como estas.`), grid], btn('Praticar →', () => startLesson(L)));
  }

  function startLesson(L) {
    LG.Session.run({
      title: L.title, mode: 'lesson', hearts: true, queue: LG.Gen.lessonQueue(L),
      onFinish: (res) => { const r = G().finishLesson(L, res); LG.sfx.play('done'); LG.confetti(); lessonResult(L, res, r); },
    });
  }

  function achList(list) {
    if (!list || !list.length) return null;
    return card('ach-new', h('h3', null, '🏅 Nova conquista!'), list.map((a) => h('p', null, `${a.emoji} ${a.name} (+${a.coins} 🪙)`)));
  }
  const stat = (v, l) => h('div', { class: 'stat' }, h('b', null, v), h('span', null, l));

  function lessonResult(L, res, r) {
    const next = G().nextNode(L.id);
    const wrongIds = Object.keys(res.items).filter((k) => res.items[k]);
    plain('Lição concluída!', null, [
      h('div', { class: 'result' }, h('div', { class: 'big-emo', 'aria-hidden': 'true' }, '🎉'), h('div', { class: 'stars', role: 'img', 'aria-label': r.stars + ' de 3 estrelas' }, '⭐'.repeat(r.stars) + '☆'.repeat(3 - r.stars)), h('h2', null, L.title)),
      h('div', { class: 'stats-row' }, stat('+' + r.xp, 'XP'), stat('+' + r.coins, '🪙 moedas'), stat(Math.round(res.accuracy * 100) + '%', 'precisão'), stat(LG.fmtTime(res.seconds), 'tempo')),
      res.noHearts ? card('', h('p', null, '💔 Você ficou sem vidas, então o XP foi reduzido. Faça uma revisão para recuperar vidas!')) : null,
      res.mistakes && res.mistakes.length ? card('', h('h3', null, '📝 Para rever'), h('p', { class: 'muted' }, 'Estes pontos voltam na sua revisão:'),
        h('ul', { class: 'mistakes' }, res.mistakes.map((m) => h('li', null, h('span', { class: 'mq' }, m.q), m.correct ? h('span', { class: 'mc' }, '✔ ' + m.correct) : null)))) : null,
      achList(r.newAch),
    ], h('div', { class: 'btnrow' }, link('Mapa', '#/map', 'ghost'), next && next.type === 'lesson' && G().isUnlocked(next.id) ? link('Próxima lição →', '#/lesson/' + next.id)
      : next ? link(next.type === 'boss' ? '👹 Enfrentar o chefe' : '🐉 Chefe do mundo', next.type === 'boss' ? '#/boss/' + next.unit : '#/wboss/' + next.world) : link('Continuar', '#/map')));
  }

  // ---------- chefes ----------
  Screens.boss = function (id, world) {
    const node = G().nodes().find((n) => n.id === (world ? 'wboss:' : 'boss:') + id);
    if (!node || !G().isUnlocked(node.id)) return LG.nav('#/map');
    const u = world ? null : C().unitById[id], w = world ? C().worlds.find((x) => x.id === +id) : null;
    const title = world ? `Chefe do Mundo ${w.id}: ${w.title}` : `Chefe: ${u.title}`;
    plain(title, '#/map', [
      h('div', { class: 'result' }, h('div', { class: 'big-emo', 'aria-hidden': 'true' }, world ? '🐉' : '👹')),
      card('', h('h2', null, world ? 'O grande desafio do mundo!' : 'Um teste misto da unidade'), h('p', null, `${world ? 20 : 15} perguntas misturando tudo o que você aprendeu. Para vencer, acerte pelo menos **70%**. Aqui não há segunda chance em cada pergunta e as vidas não contam.`.replace(/\*\*(.+?)\*\*/, '$1')),
        h('p', { class: 'muted' }, world ? 'Vencer libera o próximo mundo, com bônus de XP e moedas.' : 'Vencer libera a próxima unidade.'))],
    btn('⚔️ Lutar!', () => LG.Session.run({
      title, mode: 'boss', hearts: false, retry: false, queue: world ? LG.Gen.worldBossQueue(+id) : LG.Gen.unitBossQueue(u),
      onFinish: (res) => { const r = G().finishBoss(node, res); LG.sfx.play(r.passed ? 'done' : 'bad'); if (r.passed) LG.confetti(); bossResult(node, title, res, r); },
    })));
  };

  function bossResult(node, title, res, r) {
    const next = G().nextNode(node.id);
    plain(r.passed ? 'Chefe derrotado!' : 'Quase lá!', null, [
      h('div', { class: 'result' }, h('div', { class: 'big-emo', 'aria-hidden': 'true' }, r.passed ? '🏆' : '💪'), h('h2', null, title)),
      h('div', { class: 'stats-row' }, stat(Math.round(res.accuracy * 100) + '%', 'acertos'), stat(res.correct + '/' + res.total, 'perguntas'), r.passed ? stat('+' + r.xp, 'XP') : stat('70%', 'necessário')),
      r.passed ? card('', h('p', null, r.first ? `Parabéns! Você ganhou ${r.coins} 🪙 e liberou o próximo trecho do mapa.` : 'Você já tinha derrotado este chefe. Bônus reduzido.'))
        : card('', h('p', null, 'Você precisa de 70% para vencer. Revise seus erros e tente de novo — sem pressa!')), achList(r.newAch)],
    h('div', { class: 'btnrow' }, link('Mapa', '#/map', 'ghost'), r.passed
      ? (next ? link('Continuar →', next.type === 'lesson' ? '#/lesson/' + next.id : '#/map') : link('Continuar', '#/map'))
      : h('div', { class: 'btnrow wrap' }, btn('⚔️ Tentar de novo', () => LG.nav(node.type === 'wboss' ? '#/wboss/' + node.world : '#/boss/' + node.unit)), link('🔁 Revisar erros', '#/review', 'blue'))));
  }

  // ---------- revisão ----------
  Screens.review = function () {
    const due = G().dueItems(), errs = G().errorItems();
    const learned = Object.keys(S().words).length;
    shell('review', [
      h('h1', { class: 'page-title' }, 'Revisão'),
      card('', h('h2', null, '🔁 Revisão do dia'), h('p', null, due.length ? `Você tem ${due.length} item(ns) para rever hoje. Cartões que você erra voltam mais vezes; os que você acerta, menos.` : learned ? 'Tudo em dia por hoje! 🎉 Você pode treinar mesmo assim.' : 'Conclua sua primeira lição para começar a revisar palavras.'),
        due.length ? btn('Começar revisão (' + Math.min(20, due.length) + ')', () => runReview('review', due.slice(0, 20), true))
          : learned ? btn('Treinar mesmo assim', () => runReview('review', LG.shuffle(Object.keys(S().words)).slice(0, 10), true), 'blue') : null),
      card('', h('h2', null, '📝 Revisar erros'), h('p', null, errs.length ? `${errs.length} ponto(s) em que você errou. Acerte-os para tirar da lista.` : 'Nenhum erro pendente. Ótimo!'),
        errs.length ? btn('Revisar erros (' + Math.min(15, errs.length) + ')', () => runReview('errors', LG.shuffle(errs).slice(0, 15), false), 'blue') : null),
    ]);
  };

  function runReview(mode, ids, flash) {
    const queue = ids.map((id) => LG.Gen.forItem(id, flash)).filter(Boolean);
    if (!queue.length) { LG.toast('Nada para revisar ainda.'); return; }
    LG.Session.run({ title: 'Revisão', mode, hearts: false, queue, onFinish: (res) => { const r = G().finishPractice(res, mode); LG.sfx.play('done'); LG.confetti(); simpleResult(mode === 'errors' ? 'Erros revisados!' : 'Revisão concluída!', '🔁', res, r, '#/review'); } });
  }

  function simpleResult(title, emoji, res, r, back) {
    plain(title, null, [
      h('div', { class: 'result' }, h('div', { class: 'big-emo', 'aria-hidden': 'true' }, emoji), h('h2', null, title)),
      h('div', { class: 'stats-row' }, stat('+' + r.xp, 'XP'), stat('+' + r.coins, '🪙 moedas'), stat(Math.round(res.accuracy * 100) + '%', 'acertos'), stat(LG.fmtTime(res.seconds), 'tempo')),
      achList(r.newAch)], h('div', { class: 'btnrow' }, link('Mapa', '#/map', 'ghost'), link('Continuar', back || '#/map')));
  }

  // ---------- praticar ----------
  let picked = {};
  Screens.practice = function () {
    const units = C().units.filter((u) => G().isUnlocked(u.lessons[0].id));
    const list = h('div', { class: 'checks' }, units.map((u) => {
      const id = 'pu-' + u.id;
      return h('label', { class: 'check', for: id }, h('input', { type: 'checkbox', id, checked: !!picked[u.id], onchange: (e) => { picked[u.id] = e.target.checked; } }), h('span', null, `${u.emoji || '📘'} ${u.label} · ${u.title}`));
    }));
    const count = h('select', { id: 'cnt', 'aria-label': 'Número de perguntas' }, [10, 15, 20].map((n) => h('option', { value: n }, n + ' perguntas')));
    shell('practice', [
      h('h1', { class: 'page-title' }, 'Praticar'),
      card('', h('h2', null, '🎯 Prática livre'), h('p', null, 'Escolha os temas que quer treinar. Sem vidas e sem pressão.'), units.length ? list : h('p', null, 'Complete algumas lições para liberar temas.'), h('div', { class: 'row' }, count),
        units.length ? btn('Começar prática', () => {
          const sel = units.filter((u) => picked[u.id]); const us = sel.length ? sel : units;
          LG.Session.run({ title: 'Prática livre', mode: 'practice', hearts: false, queue: LG.Gen.practiceQueue(us, +count.value), onFinish: (res) => { const r = G().finishPractice(res, 'practice'); LG.sfx.play('done'); LG.confetti(); simpleResult('Prática concluída!', '🎯', res, r, '#/practice'); } });
        }) : null),
      card('', h('h2', null, '⚡ Desafio relâmpago'), h('p', null, `Responda o máximo de perguntas em 60 segundos. Seu recorde: **${S().counters.lightningBest}**.`.replace(/\*\*/g, '')), units.length ? link('Aceitar o desafio', '#/lightning', 'blue') : null),
    ]);
  };

  Screens.lightning = function () {
    const units = C().units.filter((u) => G().isUnlocked(u.lessons[0].id));
    let pool = Object.keys(S().words).map((id) => C().words[id]).filter(Boolean);
    if (pool.length < 8) pool = units.flatMap((u) => C().wordsOfUnit(u.id));
    if (pool.length < 4) return LG.nav('#/practice');
    LG.Session.stop();
    let score = 0, combo = 0, left = 60, locked = false;
    const timer = h('div', { class: 'l-time', role: 'timer' }, '60'), sc = h('div', { class: 'l-score' }, '0 pontos');
    const host = h('div', { class: 'l-body' });
    plain('⚡ Desafio relâmpago', '#/practice', [h('div', { class: 'l-top' }, timer, sc), host]);
    const iv = setInterval(() => { left--; timer.textContent = String(left); if (left <= 0) end(); }, 1000);
    LG.Session._cleanup = () => clearInterval(iv);
    function q() {
      locked = false; host.innerHTML = '';
      const w = pool[Math.floor(Math.random() * pool.length)];
      const ex = LG.Gen.wordMC(w, Math.random() < 0.5 ? 'en2pt' : 'pt2en', C().lessonById[w.lesson]);
      host.append(h('h2', { class: 'prompt' }, ex.q));
      const list = h('div', { class: 'opts' });
      ex.opts.forEach((o, i) => { const b = h('button', { class: 'opt', type: 'button', onclick: () => {
        if (locked) return; locked = true;
        if (i === ex.a) { b.classList.add('right'); combo++; score += 1 + (combo >= 5 ? 1 : 0); LG.sfx.play('ok'); } else { b.classList.add('wrong'); combo = 0; LG.sfx.play('bad'); list.children[ex.a].classList.add('right'); }
        sc.textContent = score + ' pontos' + (combo >= 3 ? ` · 🔥 x${combo}` : '');
        G().recordAnswer(i === ex.a);
        setTimeout(() => left > 0 && q(), 450);
      } }, h('span', { class: 'k' }, String(i + 1)), h('span', { class: 't' }, o)); list.append(b); });
      host.append(list);
    }
    function end() {
      clearInterval(iv); LG.Session._cleanup = null;
      const r = G().finishLightning(score); LG.sfx.play('done'); if (score > 0) LG.confetti();
      simpleResult('Tempo esgotado!', '⚡', { accuracy: 1, seconds: 60 }, r, '#/practice');
      const hdr = document.querySelector('.stats-row'); if (hdr) hdr.prepend(stat(String(score), 'pontos'));
    }
    q();
  };

  // ---------- loja ----------
  let shopTab = 'face';
  Screens.shop = function () {
    const s = S(), tabs = LG.shop.categories;
    const msg = h('p', { class: 'muted', role: 'status' }, '');
    const cat = tabs.find((c) => c.id === shopTab) || tabs[0];
    const grid = h('div', { class: 'shopgrid' }, cat.items.map((it) => {
      const owned = s.owned.includes(it.id), eq = s.avatar[cat.id] === it.id;
      return h('article', { class: 'shopitem' + (eq ? ' eq' : '') },
        h('div', { class: 'si-pic', style: it.color ? { background: it.color } : null, 'aria-hidden': 'true' }, it.emoji || ''), h('div', { class: 'si-name' }, it.name),
        owned ? btn(eq ? (cat.id === 'face' || cat.id === 'bg' ? 'Em uso' : 'Remover') : 'Usar', () => { G().equip(it.id); Screens.shop(); }, eq ? 'ghost small' : 'blue small')
          : btn(it.price ? '🪙 ' + it.price : 'Grátis', () => { const r = G().buy(it.id); if (r === 'poor') { msg.textContent = 'Moedas insuficientes. Complete lições para ganhar mais!'; } else { G().equip(it.id); LG.sfx.play('ok'); Screens.shop(); } }, 'primary small'));
    }));
    shell('shop', [
      h('h1', { class: 'page-title' }, 'Loja e avatar'),
      card('center', avatarEl(120), h('p', null, `${G().titleOf(G().levelOf(s.xp))} · nível ${G().levelOf(s.xp)}`), h('p', { class: 'muted' }, 'Seu avatar ganha uma moldura nova a cada fase da jornada.')),
      h('div', { class: 'tabs', role: 'tablist' }, tabs.map((c) => h('button', { class: 'tab' + (c.id === cat.id ? ' on' : ''), role: 'tab', 'aria-selected': String(c.id === cat.id), type: 'button', onclick: () => { shopTab = c.id; Screens.shop(); } }, c.name))),
      grid, msg,
      card('', h('h2', null, 'Itens especiais'), LG.shop.powerups.map((p) => h('div', { class: 'row between' }, h('span', null, `${p.emoji} ${p.name} — ${p.desc}`), btn('🪙 ' + p.price, () => {
        if (s.coins < p.price) { msg.textContent = 'Moedas insuficientes.'; return; }
        if (G().hearts().n >= G().hearts().max) { msg.textContent = 'Suas vidas já estão cheias.'; return; }
        s.coins -= p.price; G().addHearts(5); LG.Store.save(); Screens.shop();
      }, 'primary small')))),
    ]);
  };

  // ---------- dicionário ----------
  let dictQ = '', dictU = '';
  Screens.dict = function () {
    const learned = S().words;
    const all = C().wordList.filter((w) => learned[w.id]);
    const q = dictQ.trim().toLowerCase();
    const list = all.filter((w) => (!dictU || w.unit === dictU) && (!q || w.en.toLowerCase().includes(q) || w.pt.toLowerCase().includes(q)));
    const sel = h('select', { 'aria-label': 'Filtrar por unidade', onchange: (e) => { dictU = e.target.value; Screens.dict(); } }, h('option', { value: '' }, 'Todas as unidades'), C().units.map((u) => h('option', { value: u.id, selected: dictU === u.id }, `${u.label} · ${u.title}`)));
    const inp = h('input', { class: 'typein', type: 'search', placeholder: 'Buscar palavra…', value: dictQ, 'aria-label': 'Buscar palavra', oninput: (e) => { dictQ = e.target.value; const p = e.target.selectionStart; Screens.dict(); const n = document.querySelector('input[type=search]'); n.focus(); n.setSelectionRange(p, p); } });
    plain('Dicionário pessoal', '#/profile', [
      h('p', { class: 'muted' }, `${all.length} palavra(s) aprendida(s)`), h('div', { class: 'filters' }, inp, sel),
      list.length ? h('div', { class: 'dict' }, list.map((w) => h('article', { class: 'dcard' }, h('div', null, h('div', { class: 'd-en' }, w.en), h('div', { class: 'd-pt' }, w.pt), w.ex ? h('div', { class: 'd-ex' }, w.ex, w.exPt ? h('em', null, ' — ' + w.exPt) : null) : null, w.n ? h('div', { class: 'd-n' }, '⚠️ ' + w.n) : null))))
        : h('p', { class: 'empty' }, all.length ? 'Nada encontrado.' : 'Suas palavras aparecem aqui conforme você completa lições.')]);
  };

  // ---------- estatísticas ----------
  Screens.stats = function () {
    const st = G().stats(), s = S();
    const days = []; for (let i = 13; i >= 0; i--) { const d = LG.dayStr(-i); days.push({ d, xp: (s.history[d] || {}).xp || 0 }); }
    const max = Math.max(10, ...days.map((x) => x.xp));
    const chart = h('div', { class: 'chart', role: 'img', 'aria-label': 'XP nos últimos 14 dias: ' + days.map((x) => x.d.slice(5) + ' ' + x.xp).join(', ') }, days.map((x) => h('div', { class: 'col', title: x.d + ': ' + x.xp + ' XP' }, h('div', { class: 'barv', style: { height: Math.max(2, (x.xp / max) * 100) + '%' } }), h('span', null, x.d.slice(8)))));
    const wp = C().worlds.map((w) => { const us = C().unitsOfWorld(w.id); const t = us.reduce((a, u) => a + u.lessons.length, 0), d = us.reduce((a, u) => a + u.lessons.filter((l) => G().isDone(l.id)).length, 0); return h('div', { class: 'row between' }, h('span', null, `${w.emoji} Mundo ${w.id}`), h('span', null, t ? `${d}/${t} lições` : 'em breve')); });
    plain('Estatísticas', '#/profile', [
      h('div', { class: 'stats-grid' }, stat(String(st.words), 'palavras aprendidas'), stat(Math.round(st.acc * 100) + '%', 'precisão'), stat(LG.fmtTime(st.sec), 'tempo estudado'), stat(String(st.lessons), 'lições feitas'), stat(String(s.xp), 'XP total'), stat(String(s.streak.best), 'maior sequência')),
      card('', h('h2', null, 'XP por dia (14 dias)'), chart), card('', h('h2', null, 'Progresso por mundo'), wp)]);
  };

  // ---------- perfil / conquistas / configurações ----------
  Screens.profile = function () {
    const s = S(), lp = G().levelProgress(s.xp), ach = G().allAch();
    shell('profile', [
      card('center', avatarEl(110), h('h1', null, s.profile.name), h('p', null, `${G().titleOf(lp.level)} · nível ${lp.level}`),
        h('div', { class: 'meter', role: 'progressbar', 'aria-valuenow': Math.round(lp.pct * 100), 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-label': 'Progresso do nível' }, h('div', { style: { width: Math.round(lp.pct * 100) + '%' } })), h('p', { class: 'muted' }, `${lp.cur}/${lp.need} XP para o nível ${lp.level + 1}`)),
      h('div', { class: 'linklist' }, [['📖', 'Dicionário pessoal', '#/dict'], ['📊', 'Estatísticas', '#/stats'], ['🎯', 'Refazer teste de nivelamento', '#/placement'], ['⚙️', 'Configurações', '#/settings']].map(([e, t, href]) => h('a', { href, class: 'linkrow' }, h('span', { 'aria-hidden': 'true' }, e), h('span', null, t), h('span', { 'aria-hidden': 'true' }, '›')))),
      h('h2', null, `Conquistas (${ach.filter((a) => s.ach[a.id]).length}/${ach.length})`),
      h('div', { class: 'achgrid' }, ach.map((a) => h('div', { class: 'ach' + (s.ach[a.id] ? ' got' : ''), title: a.desc }, h('div', { class: 'ae', 'aria-hidden': 'true' }, s.ach[a.id] ? a.emoji : '🔒'), h('b', null, a.name), h('small', null, a.desc), s.ach[a.id] ? h('span', { class: 'sr' }, 'Conquistada') : h('span', { class: 'sr' }, 'Bloqueada')))),
    ]);
  };

  Screens.settings = function () {
    const s = S(), st = s.settings;
    const row = (label, ctl) => h('div', { class: 'row between setrow' }, h('label', null, label), ctl);
    const sel = (opts, val, fn, label) => h('select', { 'aria-label': label, onchange: (e) => fn(e.target.value) }, opts.map(([v, t]) => h('option', { value: v, selected: String(v) === String(val) }, t)));
    const file = h('input', { type: 'file', accept: 'application/json,.json', hidden: true, onchange: (e) => {
      const f = e.target.files[0]; if (!f) return;
      const r = new FileReader();
      r.onload = () => { try { LG.Store.importJSON(String(r.result)); LG.applyTheme(); LG.toast('✅ Progresso importado!'); LG.nav('#/map'); } catch (err) { LG.toast('⚠️ ' + err.message, 5000); } };
      r.readAsText(f);
    } });
    plain('Configurações', '#/profile', [
      card('', row('Seu nome', h('input', { class: 'typein small', type: 'text', value: s.profile.name, maxlength: 24, 'aria-label': 'Seu nome', onchange: (e) => { if (e.target.value.trim()) { s.profile.name = e.target.value.trim(); LG.Store.save(); } } })),
        row('Tema', sel([['auto', 'Automático'], ['light', 'Claro'], ['dark', 'Escuro']], st.theme, (v) => { st.theme = v; LG.Store.save(); LG.applyTheme(); }, 'Tema')),
        row('Sons de feedback', sel([['1', 'Ligados'], ['0', 'Desligados']], st.sound ? 1 : 0, (v) => { st.sound = v === '1'; LG.sfx.on = st.sound; LG.Store.save(); }, 'Sons')),
        row('Meta diária', sel([[10, '10 XP (leve)'], [20, '20 XP (normal)'], [30, '30 XP (sério)'], [50, '50 XP (intenso)']], st.goal, (v) => { st.goal = +v; LG.Store.save(); }, 'Meta diária')),
        row('Lembrete visual', sel([['1', 'Ligado'], ['0', 'Desligado']], st.reminder ? 1 : 0, (v) => { st.reminder = v === '1'; LG.Store.save(); }, 'Lembrete'))),
      card('', h('h2', null, 'Seu progresso'), h('p', { class: 'muted' }, 'Tudo fica salvo só neste navegador. Exporte um arquivo para fazer backup ou levar para outro aparelho.'),
        h('div', { class: 'btnrow' }, btn('⬇️ Exportar', () => {
          const blob = new Blob([LG.Store.exportJSON()], { type: 'application/json' });
          const a = h('a', { href: URL.createObjectURL(blob), download: 'english-quest-progresso.json' }); document.body.append(a); a.click(); a.remove();
        }, 'blue'), btn('⬆️ Importar', () => file.click(), 'ghost'), file)),
      card('danger', h('h2', null, 'Zona de perigo'), btn('🗑️ Apagar todo o progresso', () => LG.ask('Apagar TODO o progresso? Isso não pode ser desfeito. Dica: exporte antes.', () => { LG.Store.reset(); LG.applyTheme(); LG.nav('#/'); }, 'Apagar tudo'), 'bad')),
    ]);
  };

  // ---------- teste de nivelamento ----------
  Screens.placement = function () {
    const maxWorld = Math.max(1, ...C().units.map((u) => u.world));
    plain('Teste de nivelamento', S().counters.lessons ? '#/profile' : '#/', [
      card('', h('h2', null, '🎯 Descubra seu ponto de partida'), h('p', null, 'São até 24 perguntas, crescendo em dificuldade (do Mundo 1 ao 6). O teste para sozinho quando as perguntas ficam difíceis demais.'),
        h('p', { class: 'muted' }, 'Não use tradutor — o objetivo é te colocar no lugar certo. Quem erra aqui não perde nada!')),
    ], btn('Começar o teste', () => {
      const queue = LG.placement.slice().sort((a, b) => a.lvl - b.lvl).map((e) => Object.assign({}, e));
      LG.Session.run({ title: 'Nivelamento', mode: 'placement', hearts: false, retry: false, adaptive: true, queue, onFinish: (res) => {
        let passed = 0;
        for (let lvl = 1; lvl <= 6; lvl++) {
          const a = res.answers.filter((x) => x.lvl === lvl);
          if (a.filter((x) => x.ok).length >= 3) passed = lvl; else break;
        }
        const rec = Math.min(6, passed + 1), target = Math.min(rec, maxWorld);
        S().placement = { done: true, rec, ts: Date.now() }; LG.Store.save();
        const w = C().worlds.find((x) => x.id === target);
        plain('Resultado do nivelamento', null, [
          h('div', { class: 'result' }, h('div', { class: 'big-emo', 'aria-hidden': 'true' }, '🎯'), h('h2', null, `Seu ponto de partida: Mundo ${rec}`), h('p', null, (C().worlds.find((x) => x.id === rec) || {}).level || '')),
          target < rec ? card('', h('p', null, `Os Mundos ${target + 1} a ${rec} ainda estão sendo construídos. Você começa no Mundo ${target} (${w.title}).`)) : null,
          target > 1 ? card('', h('p', null, `Ao começar no Mundo ${target}, os mundos anteriores são marcados como concluídos. Você pode voltar e treinar neles quando quiser.`)) : null,
        ], h('div', { class: 'btnrow' }, link('Começar do Mundo 1', '#/map', 'ghost'), btn(`Começar no Mundo ${target}`, () => { G().skipTo(target); LG.nav('#/map'); })));
      } });
    }));
  };

  // ---------- roteador ----------
  LG.applyTheme = function () {
    const t = S().settings.theme, r = document.documentElement;
    if (t === 'light' || t === 'dark') r.setAttribute('data-theme', t); else r.removeAttribute('data-theme');
    LG.sfx.on = !!S().settings.sound;
  };

  LG.route = function () {
    const parts = (LG._h != null ? LG._h : location.hash).replace(/^#\/?/, '').split('/');
    const [name, a] = parts;
    LG.Session.stop();
    if (!S().profile) return Screens.welcome();
    switch (name) {
      case '': case 'welcome': return LG.nav('#/map');
      case 'map': return Screens.map();
      case 'lesson': return Screens.lesson(a);
      case 'boss': return Screens.boss(a, false);
      case 'wboss': return Screens.boss(a, true);
      case 'review': return Screens.review();
      case 'practice': return Screens.practice();
      case 'lightning': return Screens.lightning();
      case 'shop': return Screens.shop();
      case 'dict': return Screens.dict();
      case 'stats': return Screens.stats();
      case 'profile': return Screens.profile();
      case 'settings': return Screens.settings();
      case 'placement': return Screens.placement();
      default: return LG.nav('#/map');
    }
  };
})(typeof globalThis !== 'undefined' ? globalThis : window);
