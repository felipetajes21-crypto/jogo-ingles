/* Mundo 1 · Unidade 1.7 — Artigos e Objetos do Dia a Dia */
LG.unit({
  id: 'm1u07', world: 1, label: '1.7', emoji: '🎒', title: 'Artigos e Objetos',
  desc: 'a / an / the, objetos da casa, da escola e da bolsa.',
  lessons: [
    {
      title: 'A: um, uma', emoji: '🖊️',
      intro: { titulo: 'O artigo a', texto: 'O artigo **a** significa **um/uma**. Usamos **a** antes de palavras que começam com som de **consoante**: **a pen**, **a table**, **a key**.\nO inglês não tem masculino/feminino nos artigos: *a* serve para "um" e "uma".', exemplos: [['a pen', 'uma caneta'], ['a notebook', 'um caderno'], ['a key', 'uma chave']], leitura: 'pen = "pén" · pencil = "PÉN-sol" · notebook = "NÔUT-buk" · key = "ki" · chair = "tchér" · table = "TÊI-bol"', cuidado: '*A* só se usa com **um** item (singular). Para mais de um, tiramos o *a* (veremos o plural no Mundo 2).' },
      vocab: [['pen', 'caneta', '🖊️', 'It is a pen.', 'É uma caneta.'], ['pencil', 'lápis', '✏️', 'It is a pencil.', 'É um lápis.'], ['notebook', 'caderno', '📓'], ['key', 'chave', '🔑'], ['chair', 'cadeira', '🪑'], ['table', 'mesa', '🍽️']],
      ex: [Q.bank('uma caneta', 'a pen', ['an', 'pens'], '*Pen* começa com consoante: use **a**.'), Q.bank('É uma chave.', 'It is a key.', ['an', 'are'], '*It is a* + substantivo.', ['It’s a key.']), Q.gap('It is ___ table.', 'a', '*Table* começa com consoante: **a** table.', ['a', 'an']), Q.mc('Qual frase está correta?', ['a chair', 'an chair', 'a chairs', 'the a chair'], 0, '**a chair**.')],
    },
    {
      title: 'An: antes de vogal', emoji: '🍎',
      intro: { titulo: 'A ou an?', texto: 'Antes de palavras que começam com **som de vogal** (a, e, i, o, u), usamos **an**: **an apple**, **an egg**, **an umbrella**.\nO que vale é o **SOM**, não a letra:\n- **an hour** (o *h* é mudo → som de vogal)\n- **a university** (começa com som "iu", de consoante)', exemplos: [['an apple', 'uma maçã'], ['an hour', 'uma hora'], ['a university', 'uma universidade']], leitura: 'apple = "É-pol" · egg = "ég" · umbrella = "am-BRÉ-la" · elephant = "É-le-fant" · university = "iu-ni-VÂR-si-ti"', cuidado: 'Memorize: **an hour** e **a university**. O som decide, não a letra!' },
      vocab: [['apple', 'maçã', '🍎', 'It is an apple.', 'É uma maçã.'], ['egg', 'ovo', '🥚'], ['umbrella', 'guarda-chuva', '☂️'], ['elephant', 'elefante', '🐘'], ['ice cream', 'sorvete', '🍦'], ['university', 'universidade', '🏫', 'It is a big university.', 'É uma universidade grande.', { n: 'Começa com som de consoante ("iu"): use a university.' }]],
      ex: [Q.gap('It is ___ egg.', 'an', '*Egg* começa com som de vogal: **an** egg.', ['a', 'an']), Q.gap('It is ___ umbrella.', 'an', '*Umbrella* começa com som de vogal: **an** umbrella.', ['a', 'an']), Q.gap('I am ___ student.', 'a', '*Student* começa com som de consoante: **a** student.', ['a', 'an']), Q.gap('It is ___ university.', 'a', '*University* começa com som "iu" (consoante): **a** university.', ['a', 'an']), Q.mc('Qual está correta?', ['an hour', 'a hour', 'an our', 'a our'], 0, '*Hour* tem *h* mudo (som de vogal): **an hour**.'), Q.fix('It is a apple.', 'a', 'It is an apple.', 'Antes de vogal use **an**: an apple.')],
    },
    {
      title: 'The: o, a', emoji: '🌍',
      intro: { titulo: 'O artigo the', texto: 'O artigo **the** significa **o/a/os/as** e serve para algo **específico** ou **único**: *the sun*, *the world*, *the city*. Uma coisa que já foi mencionada também leva *the*: *I have a car. **The** car is red.*\nSe ainda é "um qualquer", use *a/an*.', exemplos: [['the sun', 'o sol'], ['I have a dog. The dog is black.', 'Tenho um cachorro. O cachorro é preto.'], ['the world', 'o mundo']], leitura: 'the = "dhâ" (antes de consoante) ou "dhi" (antes de vogal): the book = "dhâ buk", the apple = "dhi É-pol"', cuidado: 'Em português dizemos "a minha casa". Em inglês, *the* não vem com *my*: **my house** (não "the my house").' },
      vocab: [['world', 'mundo', '🌍', 'The world is big.', 'O mundo é grande.'], ['city', 'cidade', '🏙️', 'The city is big.', 'A cidade é grande.'], ['country', 'país', '🏳️', 'My country is Brazil.', 'Meu país é o Brasil.'], ['beach', 'praia', '🏖️'], ['mountain', 'montanha', '⛰️'], ['river', 'rio', '🏞️']],
      ex: [Q.gap('I have a dog. ___ dog is big.', 'The', 'Já falamos do cachorro, então é específico: **The** dog.', ['The', 'A', 'An']), Q.gap('___ sun is hot.', 'The', 'O sol é único: **the** sun.', ['The', 'A', 'An']), Q.mc('Qual frase está correta?', ['The world is big.', 'A world is the big.', 'World the is big.', 'Is the big world.'], 0, '**The world is big.**'), Q.fix('The my house is big.', 'The', 'My house is big.', 'Não se usa *the* junto com *my*.')],
    },
    {
      title: 'Objetos da escola', emoji: '🏫',
      intro: { titulo: 'Na sala de aula', texto: 'Vocabulário para a sala de aula. Lembre-se de **a / an** antes do objeto: **a desk**, **an eraser**.', exemplos: [['It is a desk.', 'É uma carteira (mesa de estudo).'], ['It is an eraser.', 'É uma borracha.'], ['It is a ruler.', 'É uma régua.']], leitura: 'desk = "désk" · board = "bórd" · eraser = "i-RÊI-ser" · ruler = "RU-ler" · backpack = "BÉK-pék" · paper = "PÊI-per"', cuidado: '*Paper* (papel) é incontável: não se diz "a paper" para folha de papel; diz-se *a sheet of paper* — por ora, use só *paper*.' },
      vocab: [['desk', 'carteira / escrivaninha', '🗄️'], ['board', 'lousa', '📋', 'The board is green.', 'A lousa é verde.'], ['eraser', 'borracha', '🧽'], ['ruler', 'régua', '📏'], ['backpack', 'mochila', '🎒'], ['paper', 'papel', '📄', '', '', { n: 'Incontável: não diga "a paper" para folha de papel.' }]],
      ex: [Q.bank('É uma régua.', 'It is a ruler.', ['an', 'are'], '*Ruler* começa com consoante: *a ruler*.', ['It’s a ruler.']), Q.bank('É uma borracha.', 'It is an eraser.', ['a', 'are'], '*Eraser* começa com som de vogal: *an eraser*.', ['It’s an eraser.']), Q.gap('It is ___ backpack.', 'a', '*Backpack*: consoante, use **a**.', ['a', 'an']), Q.mc('O que você usa para apagar?', ['an eraser', 'a ruler', 'a desk', 'a board'], 0, '*Eraser* = borracha.')],
    },
    {
      title: 'Objetos da casa', emoji: '🏠',
      intro: { titulo: 'Dentro de casa', texto: 'Mais objetos do dia a dia. Atenção a **a / an**: *a door*, *a window*, *a sofa*, *an alarm*.', exemplos: [['It is a door.', 'É uma porta.'], ['The window is open.', 'A janela está aberta.'], ['It is a sofa.', 'É um sofá.']], leitura: 'door = "dór" · window = "UÍN-dôu" · sofa = "SÔU-fa" · lamp = "lémp" · clock = "klók" · mirror = "MI-ror" · TV = "ti-VI"', cuidado: '*TV* lê-se "ti-vi": começa com som de consoante, por isso se diz **a TV**.' },
      vocab: [['door', 'porta', '🚪'], ['window', 'janela', '🪟'], ['sofa', 'sofá', '🛋️'], ['lamp', 'abajur / luminária', '💡'], ['clock', 'relógio de parede', '🕐'], ['mirror', 'espelho', '🪞'], ['TV', 'televisão', '📺']],
      ex: [Q.bank('É uma porta.', 'It is a door.', ['an', 'are'], '*a door*.', ['It’s a door.']), Q.bank('É uma janela.', 'It is a window.', ['an', 'are'], '*a window*.', ['It’s a window.']), Q.mc('O que mostra a hora na parede?', ['a clock', 'a mirror', 'a lamp', 'a door'], 0, '*Clock* = relógio de parede.'), Q.mc('Você se olha em…', ['a mirror', 'a clock', 'a sofa', 'a lamp'], 0, '*Mirror* = espelho.')],
    },
    {
      title: 'Tecnologia e bolsa', emoji: '📱',
      intro: { titulo: 'O que você leva consigo', texto: 'Objetos que carregamos todo dia: **phone**, **computer**, **headphones**, **wallet**, **watch**, **glasses**. Dois deles são **plurais** em inglês (*headphones*, *glasses*): sem *a*, ou **a pair of**.', exemplos: [['a phone', 'um celular'], ['a wallet', 'uma carteira'], ['glasses', 'óculos']], leitura: 'phone = "fôun" · computer = "kom-PIU-ter" · headphones = "RRÉD-fôunz" · wallet = "UÓ-let" · watch = "uótch" · glasses = "GLÉ-siz"', cuidado: '*Watch* é relógio **de pulso**; *clock* é de parede. *Wallet* é carteira de **dinheiro**, não carteira de estudo.' },
      vocab: [['phone', 'celular / telefone', '📱'], ['computer', 'computador', '💻'], ['headphones', 'fones de ouvido', '🎧'], ['wallet', 'carteira (de dinheiro)', '👛'], ['watch', 'relógio de pulso', '⌚'], ['glasses', 'óculos', '👓'], ['charger', 'carregador', '🔌']],
      ex: [Q.bank('É um celular.', 'It is a phone.', ['an', 'are'], '*a phone*.', ['It’s a phone.']), Q.bank('É um computador.', 'It is a computer.', ['an', 'are'], '*a computer*.', ['It’s a computer.']), Q.mc('Qual palavra é relógio de pulso?', ['watch', 'clock', 'wallet', 'lamp'], 0, '*Watch* = relógio de pulso.'), Q.mc('Qual palavra é plural em inglês?', ['glasses', 'phone', 'wallet', 'computer'], 0, '*Glasses* (óculos) é plural: não leva *a*.')],
    },
    {
      title: 'O que é isto?', emoji: '❓',
      intro: { titulo: 'This is…', texto: 'Para apontar algo próximo: **This is a pen.** (Isto é uma caneta.)\nPara perguntar: **What is this?** (O que é isto?)\nPara perguntar sim/não: **Is this a pen?** — **Yes, it is.** / **No, it isn’t.**\nNa resposta, trocamos *this* por **it**.', exemplos: [['What is this?', 'O que é isto?'], ['This is an apple.', 'Isto é uma maçã.'], ['Is this a pen? — No, it isn’t.', 'Isto é uma caneta? — Não.']], leitura: 'this = "dhis" · what is this = "uót iz dhis"', cuidado: '*This* tem o som **th** vibrado ("dhis"). Não leia "dis".' },
      vocab: [['this', 'este / esta / isto', '👉', 'This is a pen.', 'Isto é uma caneta.'], ['What is this?', 'O que é isto?', '❓', '', '', { alt: ['What’s this?'], type: false }], ['This is a…', 'Isto é um(a)…', '', '', '', { type: false }]],
      ex: [Q.bank('O que é isto?', 'What is this?', ['are', 'it'], '*What is this?*', ['What’s this?']), Q.bank('Isto é uma caneta.', 'This is a pen.', ['an', 'it'], '*This is a pen.*'), Q.gap('Is this a pen? — No, ___ isn’t.', 'it', 'Na resposta curta trocamos *this* por **it**.', ['it', 'this', 'he']), Q.gap('This is ___ apple.', 'an', '*Apple* começa com vogal: **an**.', ['a', 'an']), Q.mc('Responda: “What is this?” (mostrando uma chave)', ['It is a key.', 'It is an key.', 'This a key.', 'Is a key.'], 0, '**It is a key.**'), Q.fix('This are a pen.', 'are', 'This is a pen.', 'Com *this* (singular) usamos **is**.')],
    },
    {
      title: 'O que tem na minha bolsa?', emoji: '👜',
      intro: { titulo: 'Jogo de adivinhação', texto: 'Hora de combinar tudo: **artigos (a/an/the)**, **objetos**, **This is…** e **What is this?** Preste atenção a **a/an** em cada resposta!', exemplos: [['What is this? It is a wallet.', 'O que é isto? É uma carteira.'], ['It is an umbrella.', 'É um guarda-chuva.'], ['The phone is in the bag.', 'O celular está na bolsa.']], cuidado: '*A/an* = um qualquer; *the* = o específico.' },
      vocab: [],
      ex: [
        Q.dlg('Dentro da bolsa', [
          { say: 'What is this?', pt: 'O que é isto?', opts: [['It is a wallet.', 1], ['It is an wallet.', 0, '*Wallet* começa com consoante: *a wallet*.']] },
          { say: 'And what is this?', pt: 'E o que é isto?', opts: [['It is an umbrella.', 1], ['It is a umbrella.', 0, '*Umbrella* começa com som de vogal: *an umbrella*.']] },
          { say: 'Is this a pen?', pt: 'Isto é uma caneta?', opts: [['No, it isn’t. It is a pencil.', 1], ['No, this isn’t.', 0, 'Na resposta curta trocamos *this* por *it*.']] },
        ], 'Amigo'),
        Q.dlg('Na sala de aula', [
          { say: 'Excuse me. Is this your notebook?', pt: 'Com licença. Este é o seu caderno?', opts: [['Yes, it is. Thank you!', 1], ['Yes, I am.', 0, 'A pergunta é sobre o caderno: *Yes, it is.*']] },
          { say: 'You are welcome. And what is this?', pt: 'De nada. E o que é isto?', opts: [['It is an eraser.', 1], ['It is a eraser.', 0, '*Eraser* começa com som de vogal: *an eraser*.']] },
        ], 'Colega'),
        Q.bank('É um guarda-chuva.', 'It is an umbrella.', ['a', 'are'], '*An umbrella*.', ['It’s an umbrella.']),
        Q.bank('O celular está aqui.', 'The phone is here.', ['a', 'are'], '*The phone* (o celular específico).'),
        Q.mc('Qual é a ordem correta?', ['It is a green notebook.', 'It is green a notebook.', 'It a green is notebook.', 'Is it a notebook green.'], 0, '*It is a* + adjetivo + substantivo.'),
        Q.fix('This is a elephant.', 'a', 'This is an elephant.', 'Antes de vogal: **an elephant**.'),
        Q.type('Escreva em inglês: É um ovo.', ['It is an egg.', 'It’s an egg.'], '*Egg* começa com vogal: *an egg*.'),
        Q.type('Escreva em inglês: O que é isto?', ['What is this?', 'What’s this?'], '*What is this?*'),
      ],
    },
  ],
});
