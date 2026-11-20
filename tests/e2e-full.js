/* Joga o Mundo 1 inteiro (todas as lições, chefes e chefe do mundo) + testa revisão, nivelamento, relâmpago, loja, exportar/importar, tema. */
const { chromium } = require('playwright');
const path = require('path');
const assert = require('assert');
const { runSession, solveCurrent } = require('./driver');
const URL = 'file://' + path.join(__dirname, '..', 'index.html');
const ST = (page) => page.evaluate(() => JSON.parse(localStorage.getItem('englishquest.v1')));

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.addInitScript(() => { const si = window.setInterval; window.setInterval = (f, ms) => si(f, ms > 500 ? 150 : ms); });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  page.on('dialog', (d) => d.accept());
  const step = (m) => console.log('•', m);
  const go = (h) => page.evaluate((h) => LG.nav(h), h);

  await page.goto(URL); await page.waitForSelector('.welcome');
  await page.fill('#nm', 'Tester'); await page.click('button[type=submit]'); await page.click('text=Começar do Mundo 1');
  await page.waitForSelector('.world-head');

  const nextNode = () => page.evaluate(() => { const n = LG.Game.firstOpenNode(); return n && { id: n.id, type: n.type, unit: n.unit, world: n.world }; });
  let lessons = 0, bosses = 0, failedBoss = false;
  for (let guard = 0; guard < 120; guard++) {
    const n = await nextNode();
    if (!n || n.world !== 1) break;
    if (n.type === 'lesson') {
      await go('#/lesson/' + n.id);
      await page.waitForSelector('.plain');
      const vc = page.locator('text=Ver as palavras');
      if (await vc.count()) { await vc.click(); await page.click('text=Praticar'); } else await page.click('text=Começar exercícios');
      await page.waitForSelector('.session');
      // a cada 5ª lição erra 2 exercícios, para gerar revisão
      await runSession(page, { wrongN: lessons % 5 === 4 ? 2 : 0 });
      await page.waitForSelector('text=Lição concluída!');
      lessons++;
    } else {
      await go(n.type === 'boss' ? '#/boss/' + n.unit : '#/wboss/' + n.world);
      await page.waitForSelector('text=Lutar!');
      // na primeira vez, falha de propósito para testar o caminho de derrota
      if (!failedBoss) {
        await page.click('text=Lutar!'); await page.waitForSelector('.session');
        await runSession(page, { wrongN: 100 });
        await page.waitForSelector('text=Quase lá!');
        assert(!(await page.evaluate((id) => LG.Game.isDone(id), n.id)), 'chefe não deve contar se perder');
        failedBoss = true; step('derrota no chefe não libera o próximo nó');
        await page.evaluate((h) => LG.nav(h), n.type === 'boss' ? '#/boss/' + n.unit : '#/wboss/' + n.world); await page.waitForSelector('text=Lutar!');
      }
      await page.click('text=Lutar!'); await page.waitForSelector('.session');
      await runSession(page);
      await page.waitForSelector('text=Chefe derrotado!');
      bosses++;
    }
  }
  const s = await ST(page);
  const nodes = await page.evaluate(() => LG.Game.nodes().length);
  assert.strictEqual(lessons, 65, 'lições jogadas: ' + lessons);
  assert.strictEqual(bosses, 9, 'chefes: ' + bosses);
  assert.strictEqual(Object.keys(s.progress).length, nodes, 'todos os nós concluídos');
  assert(s.ach.world1, 'conquista do mundo 1');
  assert(s.ach.first && s.ach.boss1 && s.ach.w100, 'conquistas básicas');
  step(`Mundo 1 completo: ${lessons} lições + ${bosses} chefes · xp=${s.xp} nível=${Math.floor(Math.sqrt(s.xp / 50)) + 1} palavras=${Object.keys(s.words).length} moedas=${s.coins}`);

  // Mapa depois de tudo
  await go('#/map'); await page.waitForSelector('.world-head');
  assert(await page.locator('.node.open').count() === 0 && await page.locator('.card.soon').count() === 5, 'mapa: nada aberto, 5 mundos em breve');
  step('mapa: mundos 2–6 aparecem como "em construção"');

  // Revisão do dia + erros
  const due = await page.evaluate(() => { const s = LG.Store.state; for (const id in s.srs) s.srs[id].due = 0; LG.Store.save(); return LG.Game.dueItems().length; });
  assert(due > 50, 'itens para revisar: ' + due);
  await go('#/review'); await page.waitForSelector('text=Começar revisão');
  await page.click('text=Começar revisão'); await page.waitForSelector('.session');
  await runSession(page, { wrongN: 3 });
  await page.waitForSelector('text=Revisão concluída!');
  step('revisão do dia com flashcards concluída');
  await go('#/review'); await page.waitForSelector('.card');
  if (await page.locator('text=Revisar erros (').count()) {
    await page.click('text=Revisar erros ('); await page.waitForSelector('.session');
    await runSession(page);
    await page.waitForSelector('text=Erros revisados!');
    step('revisão de erros concluída');
  }
  const before = (await ST(page)).counters.reviews;
  assert(before >= 1, 'contador de revisões');

  // Prática livre
  await go('#/practice'); await page.waitForSelector('text=Começar prática');
  await page.click('text=Começar prática'); await page.waitForSelector('.session');
  await runSession(page);
  await page.waitForSelector('text=Prática concluída!');
  step('prática livre concluída');

  // Relâmpago
  await go('#/lightning'); await page.waitForSelector('.l-body .opt');
  for (let i = 0; i < 4; i++) { await page.locator('.l-body .opt').first().click(); await page.waitForTimeout(500); }
  await page.waitForSelector('text=Tempo esgotado!', { timeout: 15000 });
  assert((await ST(page)).counters.lightning === 1, 'relâmpago contado');
  step('desafio relâmpago concluído');

  // Loja
  await page.evaluate(() => { LG.Store.state.coins = 500; LG.Store.save(); });
  await go('#/shop'); await page.waitForSelector('.shopgrid');
  await page.locator('.shopitem', { hasText: 'Estiloso' }).getByRole('button').click();
  const s2 = await ST(page);
  assert(s2.owned.includes('face-cool') && s2.avatar.face === 'face-cool' && s2.coins === 490, 'compra e uso de item');
  step('loja: compra e equipa item (coins ' + s2.coins + ')');

  // Dicionário
  await go('#/dict'); await page.waitForSelector('.dict');
  assert(await page.locator('.dcard').count() > 100, 'dicionário lista palavras');
  await page.fill('input[type=search]', 'umbrella');
  assert(await page.locator('.dcard').count() === 1, 'busca no dicionário');
  step('dicionário: lista e busca');

  // Estatísticas
  await go('#/stats'); await page.waitForSelector('.chart');
  step('estatísticas renderizam');

  // Exportar / importar / reset
  const exp = await page.evaluate(() => LG.Store.exportJSON());
  await page.evaluate(() => { LG.Store.reset(); });
  assert((await ST(page)).xp === 0, 'reset');
  await page.evaluate((t) => LG.Store.importJSON(t), exp);
  const s3 = await ST(page);
  assert(s3.xp === s2.xp && Object.keys(s3.progress).length === nodes, 'importação restaura progresso');
  await page.evaluate(() => { try { LG.Store.importJSON('lixo'); } catch (e) { window.__err = e.message; } });
  assert(/JSON/.test(await page.evaluate(() => window.__err)), 'importação inválida gera erro amigável');
  step('exportar/importar JSON ok (arquivo inválido rejeitado)');

  // Tema escuro
  await go('#/settings'); await page.waitForSelector('select');
  await page.selectOption('select[aria-label="Tema"]', 'dark');
  assert(await page.evaluate(() => document.documentElement.dataset.theme) === 'dark', 'tema escuro');
  await page.selectOption('select[aria-label="Tema"]', 'light');
  step('tema claro/escuro');

  // Nivelamento (acerta mundo 1 e 2, erra o 3)
  await go('#/placement'); await page.waitForSelector('text=Começar o teste');
  await page.click('text=Começar o teste'); await page.waitForSelector('.session');
  let k = 0, lastLvl = 0;
  while (await page.locator('.session').count() && k++ < 40) {
    await page.waitForFunction(() => window.LG.Session.current);
    const lvl = await page.evaluate(() => window.LG.Session.current.ex.lvl);
    await solveCurrent(page, { wrong: lvl >= 3 });
    await page.click('.s-foot button'); await page.waitForTimeout(10);
    if (await page.locator('.fb.show').count()) await page.click('.s-foot button');
  }
  await page.waitForSelector('text=Resultado do nivelamento');
  const txt = await page.locator('.result').innerText();
  assert(/Mundo 3/.test(txt), 'nivelamento recomenda o Mundo 3: ' + txt);
  step('nivelamento adaptativo recomenda: ' + txt.split('\n')[0].trim());

  assert.deepStrictEqual(errors, [], 'erros no navegador:\n' + errors.join('\n'));
  await browser.close();
  console.log('\n✅ E2E completo ok');
})().catch((e) => { console.error('❌', e); process.exit(1); });
