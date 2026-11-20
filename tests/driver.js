/* Auxiliar de testes: resolve exercícios automaticamente dentro do navegador (Playwright). */
async function solveCurrent(page, { wrong = false } = {}) {
  return page.evaluate(async ({ wrong }) => {
    const cur = window.LG.Session.current;
    const ex = cur.ex, host = document.getElementById('ex-host');
    const click = (el) => el && el.click();
    const btns = (sel) => [...host.querySelectorAll(sel)];
    const byText = (sel, t) => btns(sel).find((b) => b.querySelector('.t') ? b.querySelector('.t').textContent === t : b.textContent === t);
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    switch (ex.t) {
      case 'mc': {
        const target = wrong ? ex.opts.find((_, i) => i !== ex.a) : ex.opts[ex.a];
        click(byText('button.opt', target)); break;
      }
      case 'bank': {
        const toks = ex.en.replace(/[.!?]+$/, '').split(/\s+/);
        for (const t of toks) {
          const b = btns('.bank button.chip').find((x) => x.textContent === t && !x.disabled);
          click(b);
        }
        if (wrong) { const a = host.querySelector('.answer button'); click(a); }
        break;
      }
      case 'gap': {
        if (ex.opts) click(byText('button.opt', wrong ? ex.opts.find((o) => !ex.resp.includes(o)) : ex.resp[0]));
        else { const i = host.querySelector('input'); i.value = wrong ? 'zzz' : ex.resp[0]; i.dispatchEvent(new Event('input')); }
        break;
      }
      case 'type': {
        const i = host.querySelector('input'); i.value = wrong ? 'zzz' : ex.acc[0]; i.dispatchEvent(new Event('input')); break;
      }
      case 'fix': {
        const chips = btns('.fixline button');
        const idx = wrong ? chips.findIndex((_, k) => !ex.errIdx.includes(k)) : ex.errIdx[0];
        click(chips[idx]); break;
      }
      case 'pairs': {
        for (let i = 0; i < ex.pairs.length; i++) {
          const [en, pt, emo] = ex.pairs[i];
          const L = btns('.pairs .col:first-child button').find((b) => b.textContent === (emo ? emo + ' ' : '') + en);
          click(L);
          const R = btns('.pairs .col:last-child button').find((b) => b.textContent === pt && !b.disabled);
          click(R);
        }
        return 'auto';
      }
      case 'dlg': {
        for (const t of ex.turns) {
          const ok = t.opts.find((o) => o[1]);
          await sleep(5);
          click(byText('button.opt', ok[0]));
        }
        return 'auto';
      }
      case 'read': {
        for (const q of ex.qs) { await sleep(5); click(byText('button.opt', q.opts[q.a])); }
        return 'auto';
      }
      case 'flash': {
        click(host.querySelector('button.btn.primary'));
        click([...host.querySelectorAll('.rate button')].find((b) => b.textContent === (wrong ? 'Errei' : 'Bom')));
        return 'auto';
      }
      default: throw new Error('tipo ' + ex.t);
    }
    return ex.t;
  }, { wrong });
}

// Clica no botão principal (Verificar/Continuar)
async function primary(page) {
  const b = page.locator('.s-foot button');
  if (await b.isVisible() && await b.isEnabled()) { await b.click(); return true; }
  return false;
}

// Faz a sessão inteira acertando tudo (ou errando as primeiras `wrongN`)
async function runSession(page, { wrongN = 0, max = 80 } = {}) {
  let wrongLeft = wrongN, n = 0, log = [];
  while (n++ < max) {
    if (!(await page.locator('.session').count())) break;
    await page.waitForFunction(() => window.LG.Session.current);
    const t = await solveCurrent(page, { wrong: wrongLeft > 0 });
    const ex = await page.evaluate(() => window.LG.Session.current.ex.t);
    if (wrongLeft > 0 && ex !== 'pairs' && ex !== 'dlg' && ex !== 'read' && ex !== 'flash') wrongLeft--;
    log.push(ex);
    await primary(page); // Verificar
    await page.waitForTimeout(15);
    const fb = await page.locator('.fb.show').count();
    if (fb) await primary(page); // Continuar
    await page.waitForTimeout(10);
  }
  return log;
}
module.exports = { solveCurrent, primary, runSession };
