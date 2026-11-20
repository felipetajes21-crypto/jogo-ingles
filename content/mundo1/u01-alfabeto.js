/* Mundo 1 · Unidade 1.1 — Lendo Inglês: primeiras palavras (foco: reconhecer e traduzir) */
LG.unit({
  id: 'm1u01', world: 1, label: '1.1', emoji: '📖', title: 'Lendo Inglês',
  desc: 'Palavras que você já entende, falsos amigos, placas e frases simples.',
  lessons: [
    {
      title: 'Palavras que você já entende', emoji: '🎁',
      intro: {
        titulo: 'Cognatos: presentes do português',
        texto: 'Você já sabe **muito** inglês sem perceber! Muitas palavras são **parecidas** com o português (os *cognatos*): *hotel*, *taxi*, *pizza*, *chocolate*. Ao ler, procure essas pistas.\nAtenção: o jeito de **escrever** pode mudar um pouquinho: *music* (música), *restaurant* (restaurante).',
        exemplos: [['hotel', 'hotel'], ['restaurant', 'restaurante'], ['music', 'música']],
        cuidado: 'Nem toda palavra parecida significa a mesma coisa. Na próxima lição você conhece os **falsos amigos**.',
      },
      vocab: [['hotel', 'hotel', '🏨', 'The hotel is big.', 'O hotel é grande.'], ['taxi', 'táxi', '🚕'], ['pizza', 'pizza', '🍕'], ['banana', 'banana', '🍌'], ['chocolate', 'chocolate', '🍫'], ['restaurant', 'restaurante', '🍽️'], ['radio', 'rádio', '📻'], ['music', 'música', '🎵']],
      ex: [
        Q.mc('Qual é a escrita correta em inglês de “restaurante”?', ['restaurant', 'restaurante', 'restorant', 'restaurent'], 0, 'Em inglês termina em **-ant**: restaurant.'),
        Q.mc('Qual é a escrita correta em inglês de “música”?', ['music', 'musica', 'musik', 'muzic'], 0, 'Em inglês é **music**, sem acento e com *c*.'),
      ],
    },
    {
      title: 'Mais cognatos', emoji: '🏙️',
      intro: {
        titulo: 'Lugares que você reconhece',
        texto: 'Mais palavras que você entende quase de bate-pronto, agora de **lugares**: *hospital*, *bank*, *park*, *museum*. Algumas são idênticas, outras mudam uma letra.',
        exemplos: [['hospital', 'hospital'], ['museum', 'museu'], ['police', 'polícia']],
        cuidado: '*Bank* é **banco** de dinheiro (o banco de sentar é *bench*).',
      },
      vocab: [['hospital', 'hospital', '🏥'], ['bank', 'banco (de dinheiro)', '🏦'], ['park', 'parque', '🏞️'], ['police', 'polícia', '👮'], ['bus', 'ônibus', '🚌'], ['museum', 'museu', '🏛️']],
      ex: [
        Q.mc('Onde você guarda seu dinheiro?', ['bank', 'park', 'museum', 'bus'], 0, '*Bank* = banco.'),
        Q.mc('Qual é o transporte público de rua com muitos passageiros?', ['bus', 'taxi', 'bank', 'police'], 0, '*Bus* = ônibus.'),
        Q.mc('Qual palavra significa “polícia”?', ['police', 'policy', 'pilot', 'police car'], 0, '*Police* = polícia. Cuidado: *policy* = política (regra).'),
      ],
    },
    {
      title: 'Cuidado: falsos amigos', emoji: '⚠️',
      intro: {
        titulo: 'Parecem, mas enganam',
        texto: 'Os **falsos cognatos** (*false friends*) são palavras que **parecem** português, mas significam outra coisa. Eles pegam todo brasileiro! Aprenda os mais famosos:\n- **actually** = na verdade (não "atualmente")\n- **pretend** = fingir (não "pretender")\n- **push** = empurrar (não "puxar")\n- **library** = biblioteca (não "livraria")\n- **college** = faculdade (não "colégio")\n- **novel** = romance (não "novela")\n- **attend** = comparecer (não "atender")',
        exemplos: [['Actually, I am tired.', 'Na verdade, estou cansado.'], ['She is in the library.', 'Ela está na biblioteca.'], ['I read a novel.', 'Eu leio um romance.']],
        cuidado: 'Sempre que uma palavra parecer "fácil demais", desconfie e confira o significado.',
      },
      vocab: [['actually', 'na verdade', '💡', 'Actually, it is new.', 'Na verdade, é novo.', { n: 'Falso cognato: NÃO é "atualmente" (isso é currently).' }], ['pretend', 'fingir', '🎭', '', '', { n: 'Falso cognato: NÃO é "pretender".' }], ['push', 'empurrar', '➡️', '', '', { n: 'Falso cognato: NÃO é "puxar" (isso é pull).' }], ['library', 'biblioteca', '📚', 'The library is big.', 'A biblioteca é grande.', { n: 'Falso cognato: NÃO é "livraria" (isso é bookstore).' }], ['college', 'faculdade', '🎓', '', '', { n: 'Falso cognato: NÃO é "colégio" (isso é school).' }], ['novel', 'romance (livro)', '📖', '', '', { n: 'Falso cognato: NÃO é "novela" de TV (isso é soap opera).' }], ['attend', 'comparecer / assistir (aula)', '🏫', '', '', { n: 'Falso cognato: NÃO é "atender" (isso é answer / serve).' }]],
      ex: [
        Q.mc('“Actually” significa…', ['na verdade', 'atualmente', 'ativamente', 'realmente agora'], 0, '**Falso amigo!** *Actually* = na verdade. *Atualmente* = currently.'),
        Q.mc('“Library” significa…', ['biblioteca', 'livraria', 'livro', 'leitura'], 0, '**Falso amigo!** *Library* = biblioteca. Livraria = bookstore.'),
        Q.mc('“Push” significa…', ['empurrar', 'puxar', 'apertar o botão', 'pausar'], 0, '**Falso amigo!** *Push* = empurrar. Puxar = *pull*.'),
        Q.mc('“I read a novel.” significa…', ['Eu leio um romance.', 'Eu vejo uma novela.', 'Eu leio uma notícia.', 'Eu escrevo um livro.'], 0, '*Novel* = romance. Novela de TV = *soap opera*.'),
      ],
    },
    {
      title: 'Lendo placas e avisos', emoji: '🚧',
      intro: {
        titulo: 'O inglês pelas ruas',
        texto: 'Você vai ver essas palavras em placas, portas e sites do mundo inteiro. Aprender a **reconhecê-las rápido** é uma ótima forma de começar a ler inglês.',
        exemplos: [['Open', 'Aberto'], ['Exit', 'Saída'], ['Danger', 'Perigo']],
        cuidado: '*Sale* = liquidação (não "sal"). *Push* e *pull* aparecem nas portas: empurre / puxe.',
        cultura: 'Placas de *Free Wi-Fi* aparecem em cafés e aeroportos. *Free* aqui significa **grátis**, não "livre".',
      },
      vocab: [['open', 'aberto / abrir', '🟢', 'The bank is open.', 'O banco está aberto.'], ['closed', 'fechado', '🔴', 'The park is closed.', 'O parque está fechado.'], ['exit', 'saída', '🚪'], ['entrance', 'entrada', '➡️🚪'], ['stop', 'pare / parar', '🛑'], ['danger', 'perigo', '⚠️'], ['free', 'grátis / livre', '🆓', 'Free Wi-Fi.', 'Wi-Fi grátis.'], ['sale', 'liquidação', '🏷️', '', '', { n: 'Falso cognato: NÃO é "sal".' }]],
      ex: [
        Q.mc('Você vê a placa “Exit”. O que ela indica?', ['a saída', 'a entrada', 'um perigo', 'um desconto'], 0, '*Exit* = saída.'),
        Q.mc('A placa “Closed” na porta de uma loja significa…', ['fechado', 'aberto', 'grátis', 'perigo'], 0, '*Closed* = fechado.'),
        Q.mc('A placa “Sale” numa vitrine significa…', ['liquidação', 'sal', 'sala', 'saída'], 0, '**Falso amigo!** *Sale* = liquidação.'),
        Q.mc('O que significa “Free Wi-Fi”?', ['Wi-Fi grátis', 'Wi-Fi livre de vírus', 'Wi-Fi caro', 'Wi-Fi perigoso'], 0, 'Em placas, *free* = grátis.'),
      ],
    },
    {
      title: 'Palavrinhas que ligam tudo', emoji: '🔗',
      intro: {
        titulo: 'And, or, but, with…',
        texto: 'Frases em inglês são cheias de **palavrinhas pequenas** que ligam as ideias. Reconhecer essas palavras rápido deixa a leitura **muito** mais fácil: **and** (e), **or** (ou), **but** (mas), **with** (com), **without** (sem), **for** (para / por), **from** (de, origem), **to** (para, direção).',
        exemplos: [['a hotel and a bank', 'um hotel e um banco'], ['tea or coffee', 'chá ou café'], ['a taxi to the hotel', 'um táxi para o hotel']],
        cuidado: '*For* pode ser "para" ou "por" dependendo da frase; leia o contexto.',
      },
      vocab: [['and', 'e', '➕', 'Pizza and music.', 'Pizza e música.'], ['or', 'ou', '↔️', 'Taxi or bus?', 'Táxi ou ônibus?'], ['but', 'mas', '↩️', 'It is old, but nice.', 'É velho, mas legal.'], ['with', 'com', '🤝', 'Pizza with chocolate.', 'Pizza com chocolate.'], ['without', 'sem', '🚫', 'Coffee without sugar.', 'Café sem açúcar.'], ['for', 'para / por', '🎁', 'A table for two.', 'Uma mesa para dois.'], ['from', 'de (origem)', '📍', 'A gift from Ana.', 'Um presente da Ana.'], ['to', 'para / a (direção)', '➡️', 'A taxi to the hotel.', 'Um táxi para o hotel.']],
      ex: [
        Q.mc('O que significa “pizza and chocolate”?', ['pizza e chocolate', 'pizza ou chocolate', 'pizza sem chocolate', 'pizza com chocolate'], 0, '*And* = e.'),
        Q.mc('O que significa “taxi or bus”?', ['táxi ou ônibus', 'táxi e ônibus', 'táxi sem ônibus', 'táxi para ônibus'], 0, '*Or* = ou.'),
        Q.mc('O que significa “coffee without sugar”?', ['café sem açúcar', 'café com açúcar', 'café e açúcar', 'café ou açúcar'], 0, '*Without* = sem.'),
        Q.mc('O que significa “a taxi to the hotel”?', ['um táxi para o hotel', 'um táxi do hotel', 'um táxi com o hotel', 'um táxi sem hotel'], 0, '*To* indica direção: para.'),
      ],
    },
    {
      title: 'Ordem das palavras', emoji: '🔀',
      intro: {
        titulo: 'Em inglês, o adjetivo vem antes',
        texto: 'Uma diferença enorme entre inglês e português: o **adjetivo vem ANTES do substantivo**.\n- português: hotel **grande**\n- inglês: **big** hotel\nAo ler, a ordem fica "ao contrário". Traduza sempre começando pelo **final** do grupo: *a big hotel* → um hotel grande.',
        exemplos: [['a big hotel', 'um hotel grande'], ['a new bus', 'um ônibus novo'], ['a small park', 'um parque pequeno']],
        cuidado: 'O adjetivo **não muda** para plural nem para feminino: *a big hotel*, *big hotels*.',
      },
      vocab: [['big', 'grande', '🐘'], ['small', 'pequeno', '🐁'], ['new', 'novo', '🆕'], ['old', 'velho', '👴']],
      ex: [
        Q.mc('O que significa “a big hotel”?', ['um hotel grande', 'um grande hotel', 'um hotel pequeno', 'um hotel novo'], 0, 'Em inglês o adjetivo vem antes: *a big hotel* = um hotel grande.'),
        Q.mc('O que significa “a small park”?', ['um parque pequeno', 'um parque grande', 'um pequeno banco', 'um parque velho'], 0, '*Small* = pequeno, antes do substantivo.'),
        Q.mc('Como se diz “um ônibus novo”?', ['a new bus', 'a bus new', 'new a bus', 'a bus novel'], 0, 'O adjetivo vem antes: **a new bus**. (*Novel* é romance!)'),
        Q.mc('Como se diz “um museu velho”?', ['an old museum', 'a museum old', 'a old museum', 'old a museum'], 0, 'Adjetivo antes do substantivo. (Antes de vogal usamos *an*: *an old museum*.)'),
        Q.bank('um hotel novo', 'a new hotel', ['hotel new', 'old'], 'Adjetivo antes do substantivo: *a new hotel*.'),
        Q.bank('um banco grande', 'a big bank', ['bank big', 'small'], '*A big bank*.'),
        Q.fix('a park small', ['park', 'small'], 'a small park', 'Em inglês o adjetivo vem **antes**: *a small park*.'),
        Q.type('Traduza para o inglês: um parque grande', ['a big park'], '*A big park*: adjetivo antes do substantivo.'),
      ],
    },
    {
      title: 'Lendo o plural', emoji: '➕',
      intro: {
        titulo: 'Reconhecendo o -s',
        texto: 'Em inglês o plural quase sempre termina em **-s**: *hotel → hotels*, *bank → banks*. Depois de **-s, -x, -ch, -sh**, junta-se **-es**: *bus → buses*. Ao ler, o **-s** no final é a pista de que são **vários**.\nO adjetivo continua igual: *big hotels*.',
        exemplos: [['two hotels', 'dois hotéis'], ['three banks', 'três bancos'], ['two buses', 'dois ônibus']],
        cuidado: 'Em português *hotéis* muda para *-éis*; em inglês é só *hotels*. O artigo *a* não vai com plural.',
      },
      vocab: [['hotels', 'hotéis', '🏨🏨'], ['banks', 'bancos', '🏦🏦'], ['parks', 'parques', '🏞️🏞️'], ['buses', 'ônibus (vários)', '🚌🚌'], ['museums', 'museus', '🏛️🏛️'], ['taxis', 'táxis', '🚕🚕']],
      ex: [
        Q.mc('O que significa “two banks”?', ['dois bancos', 'um banco', 'dois parques', 'um banco grande'], 0, 'O **-s** indica plural: *two banks* = dois bancos.'),
        Q.mc('O que significa “three big hotels”?', ['três hotéis grandes', 'três grandes hotéis velhos', 'um hotel grande', 'três hotéis novos'], 0, '*Three* = três; *big* = grande; *hotels* = hotéis.'),
        Q.mc('Qual é o plural de “bus”?', ['buses', 'bus', 'buss', 'bus’s'], 0, 'Depois de *-s* juntamos **-es**: *buses*.'),
        Q.bank('dois museus', 'two museums', ['museum', 'a'], 'Plural com *-s*: *museums*.'),
        Q.bank('três táxis', 'three taxis', ['taxi', 'a'], 'Plural com *-s*: *taxis*.'),
        Q.fix('two bank', 'bank', 'two banks', 'Depois de *two* o substantivo vai para o plural: *banks*.'),
        Q.mc('Qual frase está no plural?', ['The parks are big.', 'The park is big.', 'A park is big.', 'This park is old.'], 0, '*Parks* e *are* indicam plural.'),
        Q.type('Traduza para o inglês: dois hotéis', ['two hotels'], '*Two hotels*.'),
      ],
    },
    {
      title: 'Primeiros textos', emoji: '📰',
      intro: {
        titulo: 'Hora de ler de verdade',
        texto: 'Agora junte tudo: **cognatos**, **falsos amigos**, **placas**, **palavras que ligam** e **adjetivo antes do nome**. Leia cada texto com calma, sem pressa. Se travar, use o botão **Ver tradução**.\nDica de leitura: procure primeiro as palavras que você reconhece e deixe as outras para depois.',
        exemplos: [['The hotel is big.', 'O hotel é grande.'], ['The bank is open.', 'O banco está aberto.'], ['Free music and pizza!', 'Música e pizza grátis!']],
      },
      vocab: [],
      ex: [
        Q.read('Na cidade', 'The hotel is big and new. The bank is small and old. The park is open. The museum is closed.', 'O hotel é grande e novo. O banco é pequeno e velho. O parque está aberto. O museu está fechado.', [
          { q: 'Qual lugar é pequeno e velho?', opts: ['The bank', 'The hotel', 'The park'], a: 0, why: 'O texto diz: *The bank is small and old.*' },
          { q: 'O que está fechado?', opts: ['The museum', 'The park', 'The hotel'], a: 0, why: 'O texto diz: *The museum is closed.*' },
          { q: 'O que está aberto?', opts: ['The park', 'The bank', 'The museum'], a: 0, why: 'O texto diz: *The park is open.*' },
        ]),
        Q.read('Um cartaz', 'Free music and pizza! Open from ten to five. Exit with a taxi or a bus.', 'Música e pizza grátis! Aberto das dez às cinco. Saída de táxi ou de ônibus.', [
          { q: 'O que é grátis?', opts: ['Music and pizza', 'Taxi and bus', 'Chocolate and radio'], a: 0, why: 'O texto diz: *Free music and pizza!*' },
          { q: 'Como se pode sair?', opts: ['De táxi ou de ônibus', 'Só de táxi', 'A pé'], a: 0, why: 'O texto diz: *with a taxi or a bus*.' },
        ]),
        Q.mc('O que significa “The bank is open”?', ['O banco está aberto.', 'O banco está fechado.', 'O parque está aberto.', 'O banco é novo.'], 0, '*Open* = aberto.'),
        Q.mc('O que significa “Danger! Exit closed.”?', ['Perigo! Saída fechada.', 'Perigo! Entrada aberta.', 'Pare! Saída grátis.', 'Perigo! Museu fechado.'], 0, '*Danger* = perigo; *exit* = saída; *closed* = fechado.'),
        Q.mc('“Actually, the library is closed.” significa…', ['Na verdade, a biblioteca está fechada.', 'Atualmente, a livraria está fechada.', 'Na verdade, a biblioteca é nova.', 'Agora a biblioteca abre.'], 0, '*Actually* = na verdade; *library* = biblioteca.'),
        Q.mc('“A big bus with a new taxi.” — qual é a tradução?', ['Um ônibus grande com um táxi novo.', 'Um grande ônibus com um táxi velho.', 'Um ônibus novo com um táxi grande.', 'Um ônibus grande sem táxi.'], 0, 'Adjetivo antes do substantivo: *big bus* = ônibus grande; *new taxi* = táxi novo.'),
        Q.type('Traduza para o inglês: O banco está fechado.', ['The bank is closed.'], '*The bank is closed.*'),
        Q.bank('O museu é novo e grande.', 'The museum is new and big.', ['old', 'or'], '*The museum is new and big.*'),
      ],
    },
  ],
});
