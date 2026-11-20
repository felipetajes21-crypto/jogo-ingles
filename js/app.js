/* Inicialização: carrega progresso, conteúdo e inicia o roteador. */
(function () {
  const LG = window.LG;
  LG.Store.load();
  LG.applyTheme();
  LG.Content.load(LG.manifest, () => {
    LG.Game.checkAch();
    if (LG.Content.problems.length) console.warn('Avisos de conteúdo:\n' + LG.Content.problems.join('\n'));
    window.addEventListener('hashchange', LG.route);
    LG.route();
    // Atualiza vidas/relógio da barra superior de tempos em tempos
    setInterval(() => { const c = document.querySelector('.topbar'); if (c && !document.querySelector('.session')) { const n = LG.Game.hearts().n; const chips = c.querySelectorAll('.chip'); if (chips[2]) chips[2].textContent = '❤️ ' + n; } }, 30000);
  });
})();
