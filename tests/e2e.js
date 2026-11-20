/* Teste ponta a ponta: node tests/e2e.js  (usa o Chromium do Playwright) */
const { chromium } = require('playwright');
const path = require('path');
const { runSession } = require('./driver');
const assert = require('assert');
const URL = 'file://' + path.join(__dirname, '..', 'index.html');

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error' || (m.type() === 'warning' && /conteúdo/i.test(m.text()))) errors.push('console: ' + m.text()); });
  page.on('dialog', (d) => d.accept());
  const step = (m) => console.log('•', m);

  await page.goto(URL);
  await page.waitForSelector('.welcome');
  step('tela de boas-vindas');
  await page.fill('#nm', 'Teste');
  await page.click('button[type=submit]');
  await page.click('text=Começar do Mundo 1');
  await page.waitForSelector('.world-head');
  assert(await page.locator('.node.open').count() === 1, 'deve haver exatamente 1 lição aberta');
  step('mapa com 1 lição liberada');

  // Lição 1 — acertando tudo
  await page.click('.node.open');
  await page.click('text=Ver as palavras');
  await page.click('text=Praticar');
  await page.waitForSelector('.session');
  const log = await runSession(page);
  step('lição 1 feita com tipos: ' + [...new Set(log)].join(','));
  await page.waitForSelector('text=Lição concluída!');
  const st = await page.evaluate(() => JSON.parse(localStorage.getItem('englishquest.v1')));
  assert(st.progress['m1u01-l1'].done, 'progresso salvo');
  assert(st.progress['m1u01-l1'].stars === 3, 'estrelas 3 quando acerta tudo');
  assert(st.xp > 0 && st.coins > 0, 'xp e moedas');
  assert(Object.keys(st.words).length === 8, 'palavras aprendidas');
  assert(st.streak.count === 1, 'streak');
  step('progresso salvo no localStorage: xp=' + st.xp);

  // Persistência após recarregar
  await page.goto(URL); await page.waitForSelector('.world-head');
  assert(await page.locator('.node.done').count() === 1 && await page.locator('.node.open').count() === 1, 'após reload: 1 concluída + 1 aberta');
  step('persistência após reload');

  // Lição 2 — errando 2 de propósito
  await page.click('.node.open'); await page.click('text=Ver as palavras'); await page.click('text=Praticar');
  await page.waitForSelector('.session');
  await runSession(page, { wrongN: 2 });
  await page.waitForSelector('text=Lição concluída!');
  const st2 = await page.evaluate(() => JSON.parse(localStorage.getItem('englishquest.v1')));
  assert(Object.keys(st2.errors).length >= 1, 'erros registrados para revisão');
  assert(st2.hearts.n === 3, 'perdeu 2 vidas, tem ' + st2.hearts.n);
  step('erros registrados e vidas perdidas: ' + st2.hearts.n);

  // Mensagem de erro com explicação
  await page.goto(URL + '#/map'); await page.waitForSelector('.world-head');
  await page.click('.node.open'); await page.click('text=Ver as palavras'); await page.click('text=Praticar');
  await page.waitForSelector('.session');
  await page.waitForFunction(() => window.LG.Session.current);
  const { solveCurrent } = require('./driver');
  // pula exercícios que se auto-corrigem (pares etc.) até achar um comum
  for (let i = 0; i < 6; i++) {
    const t = await page.evaluate(() => window.LG.Session.current.ex.t);
    if (!['pairs', 'dlg', 'read', 'flash'].includes(t)) break;
    await solveCurrent(page); await page.click('.s-foot button'); await page.waitForTimeout(30);
  }
  await solveCurrent(page, { wrong: true });
  await page.click('.s-foot button');
  const fb = await page.locator('.fb.bad').innerText();
  assert(/Resposta correta/.test(fb) || /Quase/.test(fb), 'feedback de erro com resposta correta: ' + fb);
  step('feedback de erro mostra a resposta correta e explicação');
  await page.goto(URL + '#/map'); // sai da sessão

  // Revisão
  await page.goto(URL + '#/review'); await page.waitForSelector('.card');
  const txt = await page.locator('.main').innerText();
  assert(/Revisar erros/.test(txt), 'tela de revisão');
  step('tela de revisão ok');

  // Telas simples sem erro
  for (const r of ['shop', 'dict', 'stats', 'profile', 'settings', 'practice']) {
    await page.goto(URL + '#/' + r); await page.waitForTimeout(100);
    assert(await page.locator('#app > *').count() > 0, 'tela ' + r);
  }
  step('lojas/dicionário/estatísticas/perfil/config/praticar renderizam');

  assert.deepStrictEqual(errors, [], 'erros no navegador:\n' + errors.join('\n'));
  await browser.close();
  console.log('\n✅ E2E ok');
})().catch((e) => { console.error('❌', e); process.exit(1); });
