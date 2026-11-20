# 🗺️ English Quest — inglês para brasileiros, do zero ao C1

Jogo de aventura para **ler e traduzir inglês** (**sem áudio, sem voz e sem foco em pronúncia**): mapa de mundos, mini-aulas em português, exercícios variados, chefes, revisão inteligente, medalhas e um avatar que você customiza.

* Roda no navegador, no celular e no computador. **Sem backend**: o progresso fica no `localStorage`.
* HTML + CSS + JavaScript puro. **Sem build, sem `npm install`.**
* Interface em português do Brasil; o inglês é o conteúdo que se aprende.

> **Estado atual:** Mundo 1 completo e jogável (8 unidades, 64 lições, ~360 palavras, 9 chefes). Mundos 2–6 aparecem no mapa como "em construção". O plano completo está em [`CURRICULO.md`](CURRICULO.md).

## Como rodar

**Jeito mais simples:** abra o arquivo `index.html` com duplo clique (funciona direto do disco).

**Ou com um servidor local** (se preferir):

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

Para publicar, basta colocar a pasta em qualquer hospedagem estática (GitHub Pages, Netlify...).

## Como jogar

1. Crie seu perfil (só um nome) e escolha começar do zero ou fazer o **teste de nivelamento**.
2. No **Mapa**, entre na lição liberada: leia a **mini-aula**, veja as **palavras** e pratique.
3. Errou? O jogo explica o erro em português e repete o exercício no fim da lição.
4. Ao fim de cada unidade há um **chefe** (15 perguntas, 70% para vencer). O chefe do mundo (20 perguntas) libera o mundo seguinte.
5. Use **Revisão** (cartões com repetição espaçada + revisar erros), **Praticar** (por tema) e o **Desafio relâmpago**.
6. Ganhe XP, moedas, sequência diária e medalhas; gaste moedas na **Loja** (rostos, chapéus, mascotes, cenários).

Teclado: **1–4** escolhem opções, **Enter** verifica/continua, **Espaço** ativa o botão em foco, **Backspace** remove a última palavra ao montar frases.

## Estrutura de pastas

```
index.html            página única
css/style.css         visual (tema claro/escuro, mobile-first)
js/                   motor do jogo (você não precisa mexer para criar lições)
  util.js             utilidades, sons de feedback (tons curtos, opcionais), confete
  answer.js           confere respostas (contrações, maiúsculas, pontuação, hífen)
  srs.js              repetição espaçada (SM-2 simplificado)
  store.js            localStorage + exportar/importar JSON
  content.js          registro de unidades e construtores de exercícios (Q)
  gen.js              gera exercícios automáticos a partir do vocabulário e monta filas
  game.js             XP, níveis, vidas, sequência, desbloqueio, conquistas, loja
  exercises.js        telas de cada tipo de exercício
  session.js          executa lição / chefe / revisão / prática
  screens.js          telas (mapa, lição, loja, dicionário, estatísticas...) e rotas
  app.js              inicialização
content/              ← SÓ DADOS: aqui você adiciona e edita lições
  manifest.js         lista de mundos e de arquivos de unidade (ordem do mapa)
  mundo1/u01-alfabeto.js … u08-familia.js   uma unidade por arquivo
  placement.js        perguntas do teste de nivelamento
  shop.js             itens da loja
scripts/validate.js   valida todo o conteúdo
tests/                testes (unitários + ponta a ponta com Playwright)
CURRICULO.md          currículo completo (6 mundos, 46 unidades)
```

## Como adicionar uma lição ou unidade

1. Copie um arquivo de `content/mundo1/` (por exemplo `u03-cores.js`) para `content/mundoN/uNN-tema.js`.
2. Liste o arquivo em `content/manifest.js`, na ordem em que deve aparecer no mapa.
3. Edite os dados. Uma unidade tem de **8 a 12 lições**; o chefe é criado automaticamente a partir delas.
4. Rode `node scripts/validate.js`. Ele aponta erros (opções repetidas, lacuna sem `___`, resposta fora das opções, lição vazia, "TODO" etc.).

### Formato de uma unidade

```js
LG.unit({
  id: 'm1u06', world: 1, label: '1.6', emoji: '⚖️', title: 'Verbo to be e Pronomes',
  desc: 'Descrição curta mostrada no mapa.',
  lessons: [
    {
      title: 'Os pronomes', emoji: '👥',
      intro: {                                   // MINI-AULA, antes dos exercícios
        titulo: 'Quem faz a ação?',
        texto: 'Texto em português. Use **negrito** e *itálico*. \n quebra de linha.',
        exemplos: [['I am Ana.', 'Eu sou a Ana.']],   // [inglês, português]
        cuidado: 'Falsos cognatos e erros comuns (opcional).',
        cultura: 'Nota cultural (opcional).',
      },
      vocab: [                                   // gera exercícios automaticamente
        ['I', 'eu', '🙋', 'I am Ana.', 'Eu sou a Ana.', { alt: ['respostas aceitas extras'], n: 'nota/cuidado', type: false, id: 'id-unico' }],
        //  en   pt   emoji  exemplo EN     exemplo PT      opções (todas opcionais)
      ],
      ex: [ /* exercícios escritos à mão — veja abaixo */ ],
      // opcionais: prompts: { mc1, mc2, type } (textos dos enunciados automáticos),
      //            strict: true (distratores só da unidade), idp: 'prefixo-' (evita colisão de ids)
    },
  ],
});
```

* `vocab` alimenta: cartões de palavras, exercícios automáticos (EN→PT, PT→EN, emoji, ligar pares, digitar), o **dicionário pessoal** e a **repetição espaçada**.
* Se a mesma palavra tiver **traduções diferentes** em lições distintas, dê um `id` próprio na opção (`{ id: 'adj-hot' }`) para não colidir.
* Lições só de conversa podem ter `vocab: []`, desde que tenham pelo menos 8 exercícios em `ex`.

### Exercícios escritos à mão (`Q.*`)

| Construtor | Uso |
|---|---|
| `Q.mc(pergunta, [opções], índiceCorreto, explicação)` | múltipla escolha |
| `Q.bank(ptEnunciado, 'frase em inglês', [palavras extras], explicação, [outras respostas aceitas])` | montar a frase |
| `Q.gap('She ___ my sister.', 'is', explicação, ['is','are','am'], tradução?)` | lacuna (com opções = escolher; sem opções = digitar) |
| `Q.type('Escreva em inglês: ...', ['resposta', 'outra aceita'], explicação)` | digitar |
| `Q.fix('He are a doctor.', 'are', 'He is a doctor.', explicação)` | encontrar o erro (palavra errada; pode ser lista) |
| `Q.dlg('Cena', [{ say, pt, opts: [['texto', 1/0, 'por que está errado']] }], 'Quem fala')` | diálogo interativo |
| `Q.read('Título', 'texto EN', 'tradução PT', [{ q, opts, a, why }])` | mini-história + compreensão |

**Respostas equivalentes:** o corretor ignora maiúsculas, pontuação final, espaços e hífens (`twenty-one` = `twenty one`) e trata contrações como equivalentes (`I'm` = `I am`, `isn't` = `is not`). Só liste em `acc`/`aceitas` variações de **vocabulário** (por exemplo `gray`/`grey`).

**Sempre escreva a explicação em português** (`why`): ela aparece quando o aluno erra.

## Regras de pedagogia seguidas no conteúdo

* Nenhum conceito novo sem introdução na mini-aula (frases prontas "chunks" são avisadas como tal).
* Cada unidade recicla vocabulário e gramática das anteriores.
* Foco em **entender e traduzir** o que se lê: cognatos, **falsos amigos**, placas e avisos, ordem das palavras e frases de exemplo traduzidas. Notas de "Cuidado!" para erros comuns de brasileiros. Nada de pronúncia.

## Publicar no GitHub Pages (link fixo)

O projeto é estático, então basta ligar o GitHub Pages no repositório:

1. No GitHub: **Settings → Pages**.
2. Em **Build and deployment → Source**, escolha **Deploy from a branch**.
3. Escolha a branch (por exemplo `main`, ou a branch de desenvolvimento) e a pasta **/ (root)**. Salve.
4. Em ~1 minuto o site abre em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

Cada `git push` na branch escolhida atualiza o site.

## Progresso, backup e privacidade

* Tudo fica no `localStorage` do navegador (chave `englishquest.v1`). Nada sai do seu aparelho.
* **Perfil → Configurações** tem **Exportar** e **Importar** (arquivo JSON) para backup ou para trocar de aparelho.

## Testes

```bash
node scripts/validate.js        # valida todo o conteúdo (rápido)
node tests/unit.js              # corretor de respostas, SRS
node tests/e2e.js               # fluxo básico no navegador (precisa do pacote "playwright")
node tests/e2e-full.js          # joga o Mundo 1 inteiro, chefes, revisão, loja, importar/exportar...
```

Os testes ponta a ponta usam o Chromium do Playwright e resolvem os exercícios automaticamente, acertando ou errando de propósito.
