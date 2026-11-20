/* Mundo 1 · Unidade 1.1 — O Alfabeto e os Sons */
const LETTERS = { prompts: { mc1: 'Como se lê a letra “{x}”?', mc2: 'Qual letra se lê “{x}”?', type: 'Escreva a letra que se lê “{x}” em inglês' }, strict: true, idp: 'letra-' };

LG.unit({
  id: 'm1u01', world: 1, label: '1.1', emoji: '🔤', title: 'O Alfabeto e os Sons',
  desc: 'As 26 letras, soletrar e primeiros sons.',
  lessons: [
    Object.assign({
      title: 'Letras A–F', emoji: 'A',
      intro: {
        titulo: 'O alfabeto inglês',
        texto: 'O alfabeto inglês tem **26 letras**, as mesmas do português, mas com **nomes diferentes**. Saber o nome das letras ajuda a **soletrar** seu nome e a ler siglas (USA, TV, DVD).\nNão vamos usar áudio: ao lado de cada letra você verá *como se lê*, escrito do jeito que um brasileiro lê.',
        exemplos: [['A (êi) — apple', 'A de maçã'], ['B (bi) — banana', 'B de banana'], ['C (si) — cat', 'C de gato']],
        leitura: '**A** = êi · **B** = bi · **C** = si · **D** = di · **E** = i · **F** = éf\nAtenção: a letra **E** lê-se "i" e a letra **I** lê-se "ai"!',
        cuidado: 'A letra **C** se lê "si" (não "cê"), e a **E** se lê "i" (não "é").',
      },
      vocab: [['A', 'êi'], ['B', 'bi'], ['C', 'si'], ['D', 'di'], ['E', 'i'], ['F', 'éf']],
      ex: [
        Q.mc('Qual letra vem logo depois de “B” no alfabeto?', ['A', 'C', 'D', 'E'], 1, 'A ordem é A, B, **C**, D, E, F.'),
        Q.mc('Complete a sequência: A, B, C, __, E, F', ['D', 'G', 'H', 'I'], 0, 'A ordem é A, B, C, **D**, E, F.'),
      ],
    }, LETTERS),
    Object.assign({
      title: 'Letras G–L', emoji: 'G',
      intro: {
        titulo: 'Mais seis letras',
        texto: 'Continue com G, H, I, J, K e L. Duas letras costumam confundir brasileiros: **G** e **J** (parecem entre si no som, mas são diferentes) e **I** (lê-se "ai").',
        exemplos: [['G (dji) — green', 'G de verde'], ['H (êitch) — hello', 'H de olá'], ['J (djêi) — juice', 'J de suco']],
        leitura: '**G** = dji · **H** = êitch · **I** = ai · **J** = djêi · **K** = kêi · **L** = él',
        cuidado: 'Não confunda **G** (dji) com **J** (djêi): o J termina em "êi".',
      },
      vocab: [['G', 'dji'], ['H', 'êitch'], ['I', 'ai'], ['J', 'djêi'], ['K', 'kêi'], ['L', 'él']],
      ex: [
        Q.mc('Qual letra vem logo depois de “H”?', ['G', 'I', 'J', 'K'], 1, 'A ordem é G, H, **I**, J, K, L.'),
        Q.mc('Qual letra vem logo antes de “L”?', ['J', 'K', 'M', 'I'], 1, 'A ordem é J, **K**, L.'),
      ],
    }, LETTERS),
    Object.assign({
      title: 'Letras M–R', emoji: 'M',
      intro: {
        titulo: 'M, N, O, P, Q, R',
        texto: 'Mais seis! A letra **Q** lê-se "kiu" e a **R** lê-se "ar" (em inglês o R **não** é o "erre" do português).',
        exemplos: [['O (ôu) — orange', 'O de laranja'], ['P (pi) — pizza', 'P de pizza'], ['Q (kiu) — queen', 'Q de rainha']],
        leitura: '**M** = ém · **N** = én · **O** = ôu · **P** = pi · **Q** = kiu · **R** = ar',
        cuidado: 'A letra **R** lê-se "ar", nunca "erre".',
      },
      vocab: [['M', 'ém'], ['N', 'én'], ['O', 'ôu'], ['P', 'pi'], ['Q', 'kiu'], ['R', 'ar']],
      ex: [
        Q.mc('Qual letra vem logo depois de “N”?', ['M', 'O', 'P', 'Q'], 1, 'A ordem é M, N, **O**, P.'),
        Q.mc('Complete: P, Q, __', ['O', 'R', 'S', 'T'], 1, 'A ordem é P, Q, **R**, S.'),
      ],
    }, LETTERS),
    Object.assign({
      title: 'Letras S–Z', emoji: 'S',
      intro: {
        titulo: 'As últimas oito',
        texto: 'S, T, U, V, W, X, Y e Z. Atenção: **W** lê-se "dâbliu" (ou "double u") e **Y** lê-se "uai".',
        exemplos: [['W (dâbliu) — water', 'W de água'], ['Y (uai) — yellow', 'Y de amarelo'], ['Z (zi) — zebra', 'Z de zebra']],
        leitura: '**S** = és · **T** = ti · **U** = iu · **V** = vi · **W** = dâbliu · **X** = éks · **Y** = uai · **Z** = zi',
        cultura: 'Nos EUA a letra Z se lê "zi". No Reino Unido, lê-se "zéd".',
      },
      vocab: [['S', 'és'], ['T', 'ti'], ['U', 'iu'], ['V', 'vi'], ['W', 'dâbliu'], ['X', 'éks'], ['Y', 'uai'], ['Z', 'zi']],
      ex: [
        Q.mc('Qual é a última letra do alfabeto?', ['X', 'Y', 'Z', 'W'], 2, 'O alfabeto termina em **Z**.'),
        Q.mc('Complete: U, V, __, X', ['T', 'W', 'Y', 'Z'], 1, 'A ordem é U, V, **W**, X, Y, Z.'),
      ],
    }, LETTERS),
    {
      title: 'Soletrando', emoji: '✍️',
      intro: {
        titulo: 'Como soletrar em inglês',
        texto: 'Para pedir que alguém soletre, pergunte: **How do you spell your name?** (Como você soletra seu nome?)\nPara responder, diga as letras uma a uma: **It is A-N-A.** (É A-N-A.)',
        exemplos: [['How do you spell your name?', 'Como você soletra seu nome?'], ['It is A-N-A.', 'É A-N-A.'], ['C-A-T spells cat.', 'C-A-T forma "cat" (gato).']],
        cultura: 'Em hotéis, bancos e ligações, soletrar o sobrenome é muito comum. Treine o seu!',
      },
      vocab: [['cat', 'gato', '🐱', 'The cat is small.', 'O gato é pequeno.'], ['dog', 'cachorro', '🐶', 'The dog is big.', 'O cachorro é grande.'], ['sun', 'sol', '☀️'], ['book', 'livro', '📖'], ['house', 'casa', '🏠']],
      ex: [
        Q.type('Escreva a palavra soletrada: C-A-T', 'cat', 'C-A-T forma **cat** (gato).'),
        Q.type('Escreva a palavra soletrada: D-O-G', 'dog', 'D-O-G forma **dog** (cachorro).'),
        Q.type('Escreva a palavra soletrada: B-O-O-K', 'book', 'B-O-O-K forma **book** (livro).'),
        Q.bank('Como você soletra o seu nome?', 'How do you spell your name?', ['write', 'is'], 'A pergunta é *How do you spell your name?*'),
        Q.dlg('Na recepção do hotel', [
          { say: 'Hello! How do you spell your name?', pt: 'Olá! Como você soletra seu nome?', opts: [['It is A-N-A.', 1], ['I am fine.', 0, 'Ele pediu para você soletrar o nome; "I am fine" responde "Como vai?".']] },
          { say: 'Is it A-N-A?', pt: 'É A-N-A?', opts: [['Yes.', 1], ['Blue.', 0, '"Blue" significa azul. A pergunta pede sim ou não.']] },
        ], 'Recepcionista'),
      ],
    },
    {
      title: 'Vogais curtas e longas', emoji: '🔊',
      intro: {
        titulo: 'Vogais: curtas × longas',
        texto: 'Em inglês, o **tamanho** da vogal muda a palavra! O português quase não faz isso.\n- **ship** (navio): "i" **curto**, rápido.\n- **sheep** (ovelha): "i" **longo**, demorado — escreve-se com *ee*.\nQuando você ler uma palavra nova, preste atenção: duas vogais iguais (**ee**, **oo**) indicam som longo.',
        exemplos: [['ship / sheep', 'navio / ovelha'], ['full / fool', 'cheio / bobo'], ['bed / bad', 'cama / ruim']],
        leitura: 'ship = "xip" (curto) · sheep = "xiip" (longo)\nfull = "ful" (curto) · fool = "fuul" (longo)\nbed = "béd" · bad = "béd" com a boca bem aberta (a aberto)',
        cuidado: 'Leitura aproximada, pensada para brasileiros: o importante é perceber a **diferença** entre curto e longo.',
      },
      vocab: [['ship', 'navio', '🚢', 'The ship is big.', 'O navio é grande.', { r: 'xip' }], ['sheep', 'ovelha', '🐑', 'The sheep is white.', 'A ovelha é branca.', { r: 'xiip' }], ['bed', 'cama', '🛏️', 'My bed is new.', 'Minha cama é nova.', { r: 'béd' }], ['bad', 'ruim', '👎', 'This is bad.', 'Isto é ruim.', { r: 'béd (a aberto)' }], ['full', 'cheio', '🍽️', '', '', { r: 'ful' }], ['fool', 'bobo', '🤡', '', '', { r: 'fuul' }]],
      ex: [
        Q.mc('Qual palavra tem o som de “i” LONGO?', ['sheep', 'ship'], 0, '*ee* indica som longo: sh**ee**p. Já em *ship* o "i" é curto.'),
        Q.mc('Qual palavra tem o som de “u” LONGO?', ['fool', 'full'], 0, '*oo* indica som longo: f**oo**l.'),
        Q.mc('“I see a ___ on the sea.” (Eu vejo um ___ no mar.)', ['ship', 'sheep', 'bed'], 0, 'Um **ship** (navio) fica no mar.'),
      ],
    },
    {
      title: 'Os sons de H e TH', emoji: '👅',
      intro: {
        titulo: 'H aspirado e o famoso TH',
        texto: 'Dois sons que quase todo brasileiro estranha:\n- **H** no começo da palavra **existe**: é um sopro suave, como um "rr" fraquinho (**h**ouse, **h**ome). Não pode ficar mudo!\n- **TH**: coloque a pontinha da língua **entre os dentes** e sopre. Não é "t", nem "f", nem "s".',
        exemplos: [['house', 'casa'], ['think', 'pensar'], ['three', 'três']],
        leitura: 'house = "rráus" · home = "rrôum" · hat = "rrét" · hot = "rrót"\nthree = "thrii" · think = "thíngk" · thank = "thénk" · this = "dhís" (th com a língua vibrando)',
        cuidado: 'Evite falar *"tri"* para three, *"fink"* para think. A língua precisa aparecer entre os dentes. 😛',
      },
      vocab: [['house', 'casa', '🏠', 'This is my house.', 'Esta é a minha casa.', { r: 'rráus' }], ['home', 'lar', '🏡', '', '', { r: 'rrôum' }], ['hat', 'chapéu', '🎩', '', '', { r: 'rrét' }], ['hot', 'quente', '🔥', '', '', { r: 'rrót' }], ['three', 'três', '3️⃣', '', '', { r: 'thrii' }], ['think', 'pensar', '🤔', '', '', { r: 'thíngk' }], ['thank', 'agradecer', '🙏', '', '', { r: 'thénk' }]],
      ex: [
        Q.mc('Em *house*, o “h” do começo…', ['é um sopro suave, não é mudo', 'é mudo, como em “hora”', 'soa como “x”', 'soa como “j”'], 0, 'Em inglês o H inicial é aspirado: "rráus". Só em poucas palavras (hour) ele é mudo.'),
        Q.mc('Para fazer o som de *TH* você deve…', ['pôr a língua entre os dentes', 'morder o lábio inferior', 'fechar a boca', 'usar o "t" do português'], 0, 'A pontinha da língua fica entre os dentes e o ar sai suave.'),
      ],
    },
    {
      title: 'Letras mudas', emoji: '🤫',
      intro: {
        titulo: 'Quando a letra não soa',
        texto: 'Em inglês, a escrita nem sempre mostra o som. Algumas letras **ficam mudas**: o **k** em *knife*, o **w** em *write*, o **h** em *hour*, o **s** em *island*.\nMemorize essas palavras como "pacotinhos": escrita + leitura.',
        exemplos: [['knife', 'faca'], ['write', 'escrever'], ['hour', 'hora']],
        leitura: 'knife = "náif" · write = "rait" · hour = "áuer" · know = "nôu" · listen = "LÍ-sen" · island = "AI-lend" · castle = "KÉ-sol"',
        cuidado: 'Não pronuncie o *k* de knife, o *w* de write, o *t* de listen e castle!',
      },
      vocab: [['knife', 'faca', '🔪', 'I need a knife.', 'Eu preciso de uma faca.', { r: 'náif' }], ['write', 'escrever', '✍️', '', '', { r: 'rait' }], ['hour', 'hora', '⏰', '', '', { r: 'áuer' }], ['know', 'saber', '🧠', '', '', { r: 'nôu', n: '“know” (saber) soa igual a “no” (não)!' }], ['listen', 'ouvir', '👂', '', '', { r: 'LÍ-sen' }], ['island', 'ilha', '🏝️', '', '', { r: 'AI-lend' }], ['castle', 'castelo', '🏰', '', '', { r: 'KÉ-sol' }]],
      ex: [
        Q.mc('Qual letra é muda em *knife*?', ['k', 'n', 'i', 'f'], 0, 'O **k** não soa: "náif".'),
        Q.mc('Qual letra é muda em *write*?', ['w', 'r', 'i', 't'], 0, 'O **w** não soa: "rait".'),
        Q.mc('Qual letra é muda em *listen*?', ['t', 'l', 's', 'n'], 0, 'O **t** não soa: "LÍ-sen".'),
      ],
    },
    {
      title: 'Palavras que você já conhece', emoji: '🎁',
      intro: {
        titulo: 'Cognatos: presentes do português',
        texto: 'Muitas palavras inglesas são **parecidas** com o português (cognatos): *hotel*, *taxi*, *pizza*, *chocolate*. Você já sabe algumas! Mas **cuidado**: a escrita pode ser parecida e a **leitura** bem diferente.',
        exemplos: [['hotel', 'hotel'], ['restaurant', 'restaurante'], ['music', 'música']],
        leitura: 'hotel = "rrôu-TÉL" (o acento forte vai na última sílaba) · taxi = "TÉK-si" · pizza = "PÍT-sa" · banana = "ba-NÉ-na" · chocolate = "TCHÓK-let" · restaurant = "RÉS-te-rant" · radio = "RÊI-di-ôu"',
        cuidado: 'Fique de olho: *restaurant* tem só 3 sílabas e *chocolate* tem 3 (não 4). A escrita é parecida, a fala é outra.',
      },
      vocab: [['hotel', 'hotel', '🏨', 'The hotel is near.', 'O hotel é perto.', { r: 'rrôu-TÉL' }], ['taxi', 'táxi', '🚕', '', '', { r: 'TÉK-si' }], ['pizza', 'pizza', '🍕', '', '', { r: 'PÍT-sa' }], ['banana', 'banana', '🍌', '', '', { r: 'ba-NÉ-na' }], ['chocolate', 'chocolate', '🍫', '', '', { r: 'TCHÓK-let' }], ['restaurant', 'restaurante', '🍽️', '', '', { r: 'RÉS-te-rant' }], ['radio', 'rádio', '📻', '', '', { r: 'RÊI-di-ôu' }], ['music', 'música', '🎵', '', '', { r: 'MIÚ-zik' }]],
      ex: [
        Q.mc('Qual é a escrita correta em inglês de “restaurante”?', ['restaurant', 'restaurante', 'restorant', 'restaurent'], 0, 'Em inglês termina em **-ant**: restaurant.'),
        Q.mc('Qual é a escrita correta em inglês de “música”?', ['music', 'musica', 'musik', 'muzic'], 0, 'Em inglês é **music**, sem acento.'),
      ],
    },
  ],
});
