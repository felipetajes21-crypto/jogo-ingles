#!/usr/bin/env node
/* Gera uma versão em arquivo único (CSS e JS embutidos) para hospedar em lugares que só aceitam uma página:
   node scripts/build-single.js saida.html */
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const out = process.argv[2] || 'english-quest.single.html';
const html = read('index.html');
const order = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map((m) => m[1]);
globalThis.LG = {}; new Function('LG', read('content/manifest.js'))(globalThis.LG);
const files = globalThis.LG.manifest.files;
const scripts = [];
for (const f of order) {
  if (f === 'js/app.js') { files.forEach((c) => scripts.push(c)); scripts.push('@empty-manifest'); }
  scripts.push(f);
}
const js = (name, code) => {
  if (/<\/script/i.test(code)) throw new Error('</script dentro de ' + name);
  return `<script>/* ${name} */\n${code}\n</script>`;
};
const body = scripts.map((f) => (f === '@empty-manifest' ? js('manifest', 'LG.manifest.files = [];') : js(f, read(f)))).join('\n');
const page = `<title>English Quest</title>
<meta name="description" content="Jogo para brasileiros aprenderem inglês do zero ao avançado.">
<style>
${read('css/style.css')}
</style>
<a class="skip" href="#main">Ir para o conteúdo</a>
<div id="app"></div>
<div id="toast" role="status" aria-live="polite"></div>
<canvas id="confetti" aria-hidden="true"></canvas>
${body}
`;
fs.writeFileSync(out, page);
console.log('Gerado', out, (page.length / 1024).toFixed(0) + ' KB');
