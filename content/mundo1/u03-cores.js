/* Mundo 1 · Unidade 1.3 — Cores e Formas */
LG.unit({
  id: 'm1u03', world: 1, label: '1.3', emoji: '🎨', title: 'Cores e Formas',
  desc: 'Cores, formas, tamanhos e como descrever coisas.',
  lessons: [
    {
      title: 'Cores básicas', emoji: '🔴',
      intro: { titulo: 'As primeiras cores', texto: 'Vamos às cores! Comece pelas seis mais usadas: **red, blue, green, yellow, black, white**.', exemplos: [['a red apple', 'uma maçã vermelha'], ['a blue car', 'um carro azul'], ['a black cat', 'um gato preto']], leitura: 'red = "réd" · blue = "blu" · green = "grin" · yellow = "IÉ-lôu" · black = "blék" · white = "uáit"', cuidado: '*Green* tem **ee** (som longo): "grin", não "grên".' },
      vocab: [['red', 'vermelho', '🔴', 'A red apple.', 'Uma maçã vermelha.'], ['blue', 'azul', '🔵', 'A blue car.', 'Um carro azul.'], ['green', 'verde', '🟢', 'A green tree.', 'Uma árvore verde.'], ['yellow', 'amarelo', '🟡', 'A yellow banana.', 'Uma banana amarela.'], ['black', 'preto', '⚫', 'A black cat.', 'Um gato preto.'], ['white', 'branco', '⚪', 'A white house.', 'Uma casa branca.']],
      ex: [Q.mc('Qual é a cor do céu num dia limpo?', ['blue', 'red', 'black', 'green'], 0, 'O céu é **blue** (azul).'), Q.mc('Qual é a cor de uma banana madura?', ['yellow', 'blue', 'white', 'red'], 0, 'A banana é **yellow** (amarela).')],
    },
    {
      title: 'Mais cores', emoji: '🟠',
      intro: { titulo: 'Mais seis cores', texto: 'Agora: **orange, pink, purple, brown, gray, gold**.', exemplos: [['an orange flower', 'uma flor laranja'], ['a pink bag', 'uma bolsa rosa'], ['a brown dog', 'um cachorro marrom']], leitura: 'orange = "Ó-rindj" · pink = "pingk" · purple = "PÂR-pol" · brown = "bráun" · gray = "grêi" · gold = "gôuld"', cuidado: 'No Reino Unido, *gray* também se escreve **grey**. *Orange* é cor **e** fruta (laranja). *Brown* é marrom, não "bronze".' },
      vocab: [['orange', 'laranja', '🟠'], ['pink', 'rosa', '🌸'], ['purple', 'roxo', '🟣'], ['brown', 'marrom', '🟤'], ['gray', 'cinza', '🐘', '', '', { alt: ['grey'] }], ['gold', 'dourado', '🥇']],
      ex: [Q.mc('Qual cor se escreve de dois jeitos (EUA e Reino Unido)?', ['gray / grey', 'blue / blew', 'red / read', 'pink / pinc'], 0, '*Gray* (EUA) e *grey* (Reino Unido) são a mesma cor: cinza.'), Q.mc('Misturando vermelho e azul, obtemos…', ['purple', 'orange', 'brown', 'pink'], 0, 'Vermelho + azul = **purple** (roxo).')],
    },
    {
      title: 'Formas', emoji: '🔺',
      intro: { titulo: 'Formas geométricas', texto: 'Formas básicas: **circle, square, triangle, star, heart, diamond**. Repare que várias se parecem com o português.', exemplos: [['a red circle', 'um círculo vermelho'], ['a yellow star', 'uma estrela amarela'], ['a blue square', 'um quadrado azul']], leitura: 'circle = "SÂR-kol" · square = "skuér" · triangle = "TRAI-ên-gol" · star = "star" · heart = "rrart" · diamond = "DAI-mend"', cuidado: '*Heart* (coração) começa com **h** aspirado e termina em "art"; não confunda com *hurt* (machucar).' },
      vocab: [['circle', 'círculo', '⭕'], ['square', 'quadrado', '🟦'], ['triangle', 'triângulo', '🔺'], ['star', 'estrela', '⭐'], ['heart', 'coração', '❤️'], ['diamond', 'losango', '🔶']],
      ex: [Q.mc('Qual forma tem 3 lados?', ['triangle', 'square', 'circle', 'heart'], 0, '*Tri-* = três: **triangle**.'), Q.mc('Qual forma tem 4 lados iguais?', ['square', 'triangle', 'star', 'circle'], 0, 'O **square** (quadrado) tem 4 lados iguais.')],
    },
    {
      title: 'Tamanhos e opostos', emoji: '↔️',
      intro: { titulo: 'Grande, pequeno, novo, velho…', texto: 'Para descrever, você precisa de **adjetivos**. Aprenda estes pares de opostos: **big ↔ small, new ↔ old, long ↔ short**, além de **tall** (alto).', exemplos: [['a big house', 'uma casa grande'], ['a small bag', 'uma bolsa pequena'], ['a new phone', 'um celular novo']], leitura: 'big = "big" · small = "smól" · new = "niu" · old = "ôuld" · long = "lóng" · short = "xórt" · tall = "tól"', cuidado: '*Short* serve para altura **e** comprimento. *Tall* é só para altura (pessoas, prédios).' },
      vocab: [['big', 'grande'], ['small', 'pequeno'], ['new', 'novo'], ['old', 'velho'], ['long', 'comprido'], ['short', 'curto / baixo'], ['tall', 'alto']],
      ex: [Q.mc('O oposto de *big* é…', ['small', 'old', 'tall', 'long'], 0, '*big* ↔ **small**.'), Q.mc('O oposto de *new* é…', ['old', 'big', 'short', 'tall'], 0, '*new* ↔ **old**.'), Q.mc('O oposto de *long* é…', ['short', 'small', 'old', 'tall'], 0, '*long* ↔ **short**.')],
    },
    {
      title: 'Adjetivo antes do nome', emoji: '🚗',
      intro: { titulo: 'A regra de ouro: adjetivo antes!', texto: 'Em português: "um carro **vermelho**". Em inglês, o adjetivo vem **antes** do substantivo e **nunca muda**: **a red car**.\nPara dizer "é", use **It is**: *It is a red car.* (É um carro vermelho.)\n**a** = um/uma (veremos melhor na unidade 1.7).', exemplos: [['a red car', 'um carro vermelho'], ['It is a big dog.', 'É um cachorro grande.'], ['a black cat', 'um gato preto']], cuidado: 'Não copie a ordem do português (*a car red* está errado): o certo é **a red car**.' },
      vocab: [['car', 'carro', '🚗', 'It is a red car.', 'É um carro vermelho.'], ['ball', 'bola', '⚽'], ['bag', 'bolsa / mochila', '👜'], ['tree', 'árvore', '🌳'], ['flower', 'flor', '🌸'], ['It is', 'É (coisa ou animal)', '', 'It is a big dog.', 'É um cachorro grande.', { type: false }]],
      ex: [
        Q.bank('Um carro vermelho', 'A red car', ['car red', 'reds'], 'O adjetivo vem antes: *a red car*.'),
        Q.bank('É um cachorro grande.', 'It is a big dog.', ['small', 'are'], '*It is* + a + adjetivo + substantivo.'),
        Q.fix('It is a car red.', ['car', 'red'], 'It is a red car.', 'Em inglês o adjetivo vem **antes** do substantivo: a red car.'),
        Q.mc('Qual frase está correta?', ['a blue ball', 'a ball blue', 'blue a ball', 'a bluee ball'], 0, 'Adjetivo antes do substantivo: **a blue ball**.'),
        Q.gap('It is a ___ tree.', 'green', 'O adjetivo (cor) vem entre *a* e o substantivo.', ['green', 'greens', 'tree']),
      ],
    },
    {
      title: 'Roupas coloridas', emoji: '👕',
      intro: { titulo: 'Roupas e cores', texto: 'Vamos combinar o que aprendemos: **cor + roupa**. Algumas roupas são **plurais** em inglês: *shoes* (sapatos), *jeans*, *socks* (meias). Para elas, usamos *pair of* (par de): **a pair of shoes**.', exemplos: [['a white shirt', 'uma camisa branca'], ['a black jacket', 'uma jaqueta preta'], ['blue jeans', 'um jeans azul']], leitura: 'shirt = "xârt" · dress = "drés" · jacket = "DJÉ-ket" · shoes = "xus" · jeans = "djins" · socks = "sóks"', cuidado: 'Você diz *blue jeans* (sem "a"), não "a blue jeans".' },
      vocab: [['shirt', 'camisa', '👕'], ['dress', 'vestido', '👗'], ['jacket', 'jaqueta', '🧥'], ['shoes', 'sapatos / tênis', '👟'], ['jeans', 'calça jeans', '👖'], ['socks', 'meias', '🧦']],
      ex: [Q.bank('uma camisa branca', 'a white shirt', ['shirt white', 'whites'], 'Cor antes do substantivo.'), Q.bank('sapatos pretos', 'black shoes', ['shoes black', 'a'], '*Shoes* é plural; sem *a*.'), Q.mc('Qual é a tradução de “a red dress”?', ['um vestido vermelho', 'um vestido rosa', 'uma camisa vermelha', 'um casaco vermelho'], 0, '*dress* = vestido; *red* = vermelho.')],
    },
    {
      title: 'Descrevendo a natureza', emoji: '🌳',
      intro: { titulo: 'What color is it?', texto: 'Para perguntar a cor: **What color is it?** (Que cor é?) Resposta: **It is blue.** Também podemos dizer o objeto: **The sky is blue.** (O céu é azul.) *The* = o/a (veremos na unidade 1.7).', exemplos: [['What color is it?', 'Que cor é?'], ['It is blue.', 'É azul.'], ['The grass is green.', 'A grama é verde.']], leitura: 'sky = "skai" · grass = "grés" · sea = "si" · cloud = "kláud" · snow = "snôu" · moon = "mun"', cuidado: 'No inglês americano escreve-se *color*; no britânico, **colour**.' },
      vocab: [['sky', 'céu', '🌌'], ['grass', 'grama', '🌱'], ['sea', 'mar', '🌊'], ['cloud', 'nuvem', '☁️'], ['snow', 'neve', '❄️'], ['moon', 'lua', '🌙'], ['What color is it?', 'Que cor é?', '🎨', '', '', { type: false }]],
      ex: [
        Q.gap('The sky is ___.', 'blue', 'O céu é **blue** (azul).', ['blue', 'green', 'red']),
        Q.gap('The grass is ___.', 'green', 'A grama é **green** (verde).', ['green', 'pink', 'black']),
        Q.type('Escreva em inglês: A neve é branca.', ['The snow is white.'], '*The snow is white.* (artigo + substantivo + is + cor).'),
        Q.mc('“What color is it?” significa…', ['Que cor é?', 'Quantos anos tem?', 'O que é isso?', 'Onde está?'], 0, '*color* = cor.'),
      ],
    },
    {
      title: 'Na loja de roupas', emoji: '🛍️',
      intro: { titulo: 'Conversa sobre uma peça nova', texto: 'Vamos usar tudo numa conversa: perguntar a cor com **What color is it?**, responder com **It is…** e comentar **a + cor + objeto**.', exemplos: [['What color is it?', 'Que cor é?'], ['It is black.', 'É preta.'], ['a black jacket', 'uma jaqueta preta']], cuidado: 'Mantenha a ordem: **a black jacket** (nunca "a jacket black").' },
      vocab: [],
      ex: [
        Q.dlg('Com uma amiga', [
          { say: 'Look! A new jacket!', pt: 'Olha! Uma jaqueta nova!', opts: [['What color is it?', 1], ['It is a cat.', 0, 'Ela mostrou uma jaqueta; a pergunta natural é sobre a cor.']] },
          { say: 'It is black.', pt: 'É preta.', opts: [['A black jacket!', 1], ['A jacket black!', 0, 'Em inglês o adjetivo vem antes: *a black jacket*.']] },
        ], 'Amiga'),
        Q.dlg('Mostrando sua bolsa', [
          { say: 'Nice bag! What color is it?', pt: 'Que bolsa legal! Que cor é?', opts: [['It is pink.', 1], ['It is a big bag.', 0, 'Ela perguntou a cor da bolsa, não o tamanho.']] },
        ], 'Amiga'),
        Q.bank('Que cor é?', 'What color is it?', ['are', 'colors'], 'A pergunta é *What color is it?*'),
        Q.bank('É verde.', 'It is green.', ['are', 'greens'], '*It is* + cor.'),
        Q.mc('Qual é a ordem certa?', ['a new white shirt', 'a shirt white new', 'new a white shirt', 'a white new shirts'], 0, 'a + adjetivos + substantivo: **a new white shirt**.'),
        Q.fix('I have a jacket black.', ['jacket', 'black'], 'I have a black jacket.', 'O adjetivo vem antes do substantivo: *a black jacket*.'),
        Q.type('Escreva em inglês: uma bolsa rosa', ['a pink bag'], '*a pink bag* — cor antes do substantivo.'),
        Q.type('Escreva em inglês: É azul.', ['It is blue.', 'It’s blue.'], '*It is blue.* (ou *It’s blue.*)'),
      ],
    },
  ],
});
