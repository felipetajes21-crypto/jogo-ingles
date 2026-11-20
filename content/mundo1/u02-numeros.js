/* Mundo 1 · Unidade 1.2 — Números */
const NUM = { prompts: { mc1: 'Qual é o número “{x}”?', mc2: 'Como se escreve o número {x} em inglês?', type: 'Escreva por extenso em inglês: {x}' }, strict: true, idp: 'num-' };
const ORD = { prompts: { mc1: 'Qual é o ordinal “{x}”?', mc2: 'Como se diz “{x}” em inglês?', type: 'Escreva em inglês o ordinal {x}' }, strict: true, idp: 'ord-' };

LG.unit({
  id: 'm1u02', world: 1, label: '1.2', emoji: '🔢', title: 'Números',
  desc: 'De 0 a 100, ordinais, idade e telefone.',
  lessons: [
    Object.assign({
      title: 'Números de 0 a 5', emoji: '0',
      intro: {
        titulo: 'Contando de zero a cinco',
        texto: 'Vamos contar! Os números em inglês são palavras novas, mas poucas: aprenda de **0 a 5** agora.',
        exemplos: [['one cat', 'um gato'], ['two dogs', 'dois cachorros'], ['five books', 'cinco livros']],
        cuidado: 'Não confunda *one* (1) com *on* (sobre/em). A escrita é parecida!',
      },
      vocab: [['zero', '0'], ['one', '1'], ['two', '2'], ['three', '3'], ['four', '4'], ['five', '5']],
      ex: [Q.mc('Qual número vem depois de “two”?', ['one', 'three', 'five', 'zero'], 1, 'A ordem é one, two, **three**.'), Q.mc('Qual número vem antes de “four”?', ['two', 'three', 'five', 'zero'], 1, 'A ordem é two, **three**, four.')],
    }, NUM),
    Object.assign({
      title: 'Números de 6 a 10', emoji: '6',
      intro: { titulo: 'De seis a dez', texto: 'Continue contando: **6 a 10**. Repare na escrita de *eight*: tem **gh** no meio.', exemplos: [['six books', 'seis livros'], ['ten fingers', 'dez dedos'], ['eight days', 'oito dias']], cuidado: '*Nine* (9) e *nineteen* (19) começam igual; *ninety* (90) tem um *e* a menos.' },
      vocab: [['six', '6'], ['seven', '7'], ['eight', '8'], ['nine', '9'], ['ten', '10']],
      ex: [Q.mc('Qual número vem depois de “five”?', ['four', 'six', 'seven', 'ten'], 1, 'A ordem é five, **six**, seven.'), Q.mc('Qual número vem logo antes de “ten”?', ['eight', 'nine', 'seven', 'six'], 1, 'A ordem é eight, **nine**, ten.'), Q.type('Escreva em inglês: 8 + 1 = ?', ['nine'], '8 + 1 = 9 = **nine**.')],
    }, NUM),
    Object.assign({
      title: 'Números de 11 a 20', emoji: '11',
      intro: { titulo: 'Onze a vinte', texto: '*Eleven* e *twelve* são especiais. De 13 a 19, quase todos terminam em **-teen**. *Twenty* termina em **-ty**.', exemplos: [['eleven players', 'onze jogadores'], ['fifteen minutes', 'quinze minutos'], ['twenty people', 'vinte pessoas']], cuidado: 'Em *thirteen* e *fifteen* o início muda: **thir-** e **fif-**, não "three-" ou "five-".' },
      vocab: [['eleven', '11'], ['twelve', '12'], ['thirteen', '13'], ['fourteen', '14'], ['fifteen', '15'], ['sixteen', '16'], ['seventeen', '17'], ['eighteen', '18'], ['nineteen', '19'], ['twenty', '20']],
      ex: [Q.mc('Qual número vem depois de “fourteen”?', ['thirteen', 'fifteen', 'sixteen', 'forty'], 1, 'A ordem é thirteen, fourteen, **fifteen**.'), Q.mc('Como se escreve 13 em inglês?', ['thirteen', 'threeteen', 'thirtyn', 'threten'], 0, '13 = **thirteen** (e não "threeteen").')],
    }, NUM),
    Object.assign({
      title: '-teen ou -ty?', emoji: '⚖️',
      intro: { titulo: '13 × 30, 14 × 40…', texto: 'Os números **-teen** (13–19) e **-ty** (dezenas: 30, 40…) são parecidos na escrita, e é fácil confundir ao **ler**:\n- **thirteen** = 13 e **thirty** = 30\n- **sixteen** = 16 e **sixty** = 60\nSe você confundir, um preço de 13 dólares vira 30! Olhe sempre o final da palavra: **-teen** ou **-ty**.', exemplos: [['thirteen / thirty', '13 / 30'], ['fifteen / fifty', '15 / 50'], ['sixteen / sixty', '16 / 60']], cuidado: '**Forty** (40) perde o "u" de *four*: não escreva "fourty".' },
      vocab: [['thirty', '30'], ['forty', '40'], ['fifty', '50'], ['sixty', '60'], ['seventy', '70'], ['eighty', '80'], ['ninety', '90']],
      ex: [Q.mc('Qual palavra escreve 40 corretamente?', ['forty', 'fourty', 'fortee', 'fouty'], 0, 'O correto é **forty**, sem "u".'), Q.mc('“Sixteen” e “sixty” são, respectivamente…', ['16 e 60', '60 e 16', '6 e 16', '16 e 6'], 0, '*-teen* = 13–19 e *-ty* = dezenas.'), Q.mc('Qual é o maior número?', ['fifteen', 'fifty', 'fourteen', 'twelve'], 1, '**fifty** = 50; fifteen = 15.')],
    }, NUM),
    Object.assign({
      title: 'Números de 21 a 100', emoji: '100',
      intro: { titulo: 'Montando números grandes', texto: 'Para formar 21–99, junte a dezena e a unidade **com hífen**: *twenty-one* (21), *thirty-five* (35), *ninety-nine* (99).\nO número 100 é **one hundred**.', exemplos: [['twenty-one', '21'], ['forty-two', '42'], ['one hundred', '100']], cuidado: 'Em português dizemos "vinte e um". Em inglês **não há "and"**: twenty-one.' },
      vocab: [['twenty-one', '21', '', '', '', { alt: ['twenty one'] }], ['thirty-three', '33', '', '', '', { alt: ['thirty three'] }], ['forty-two', '42', '', '', '', { alt: ['forty two'] }], ['fifty-six', '56', '', '', '', { alt: ['fifty six'] }], ['sixty-seven', '67', '', '', '', { alt: ['sixty seven'] }], ['seventy-eight', '78', '', '', '', { alt: ['seventy eight'] }], ['ninety-nine', '99', '', '', '', { alt: ['ninety nine'] }], ['one hundred', '100']],
      ex: [Q.type('Escreva por extenso: 25', ['twenty-five', 'twenty five'], '20 + 5 = **twenty-five**.'), Q.type('Escreva por extenso: 64', ['sixty-four', 'sixty four'], '60 + 4 = **sixty-four**.'), Q.mc('Qual número é “eighty-one”?', ['18', '81', '80', '108'], 1, '*eighty* = 80 e *one* = 1: **81**.')],
    }, NUM),
    Object.assign({
      title: 'Ordinais (1º a 10º)', emoji: '1st',
      intro: { titulo: 'Primeiro, segundo, terceiro…', texto: 'Ordinais indicam **posição**: 1º, 2º, 3º. Os três primeiros são especiais (*first, second, third*). Depois, geralmente: número + **-th** (fourth, fifth…). Na escrita: 1st, 2nd, 3rd, 4th…', exemplos: [['the first day', 'o primeiro dia'], ['the third floor', 'o terceiro andar'], ['the tenth question', 'a décima pergunta']], cuidado: '*Fifth* (5º) e *ninth* (9º) perdem letras: five → fi**f**th; nine → ni**n**th.' },
      vocab: [['first', '1º'], ['second', '2º'], ['third', '3º'], ['fourth', '4º'], ['fifth', '5º'], ['sixth', '6º'], ['seventh', '7º'], ['eighth', '8º'], ['ninth', '9º'], ['tenth', '10º']],
      ex: [Q.mc('Qual é a forma escrita de 4th?', ['fourth', 'forth', 'fourth’s', 'four'], 0, '*fourth* (4º). *Forth* existe, mas significa "adiante".'), Q.mc('Complete: first, second, ___', ['third', 'three', 'thirt', 'fourth'], 0, 'O ordinal de 3 é **third**.')],
    }, ORD),
    {
      title: 'Idade e telefone', emoji: '📱',
      intro: { titulo: 'Quantos anos? Qual o telefone?', texto: 'Em inglês a idade usa o verbo **to be** (ser/estar), não "ter": *I am 20 years old* (literalmente "eu sou 20 anos velho").\nPara perguntar: **How old are you?**\nTelefone: diga os números um a um. O zero costuma ser **"oh"**.', exemplos: [['How old are you?', 'Quantos anos você tem?'], ['I am twenty years old.', 'Eu tenho vinte anos.'], ['What is your phone number?', 'Qual é o seu telefone?']], cuidado: 'Não diga *I have 20 years*! O correto é **I am 20 (years old)**.', cultura: 'Em telefones, o zero costuma ser dito "oh": 555-0142 = "five five five, oh, one, four, two".' },
      vocab: [['How old are you?', 'Quantos anos você tem?', '🎂', '', '', { type: false }], ['years old', 'anos de idade', '', 'I am ten years old.', 'Tenho dez anos.', { type: false }], ['phone number', 'número de telefone', '📱', 'What is your phone number?', 'Qual é o seu telefone?', { type: false }], ['age', 'idade', '', '', '', {}]],
      ex: [
        Q.bank('Eu tenho trinta anos.', 'I am thirty years old.', ['have', 'is'], 'Idade usa *to be*: I **am** thirty.'),
        Q.fix('I have twenty years old.', 'have', 'I am twenty years old.', 'Em inglês a idade usa *to be*, não *have*: I **am**...'),
        Q.type('Escreva em inglês: Quantos anos você tem?', ['How old are you?'], 'A pergunta é *How old are you?*'),
        Q.mc('Como se fala o dígito 0 em um número de telefone?', ['oh', 'null', 'nought', 'nil'], 0, 'Em telefones, o zero costuma ser **oh**.'),
        Q.dlg('Perguntando o telefone', [{ say: 'What is your phone number?', pt: 'Qual é o seu telefone?', opts: [['Five, five, five, oh, one, four, two.', 1], ['Twenty years old.', 0, 'Ele perguntou o telefone, não a idade.']] }], 'Colega'),
      ],
    },
    {
      title: 'Números no dia a dia', emoji: '💵',
      intro: { titulo: 'Preços, endereços e plurais', texto: 'Números aparecem em preços (**five dollars**), endereços e páginas. Depois de um número maior que 1, o substantivo vai para o **plural** (normalmente com **-s**): *one dollar*, *two dollars*.', exemplos: [['one dollar', 'um dólar'], ['ten dollars', 'dez dólares'], ['page twenty', 'página vinte']], cultura: 'Nos EUA, 100 cents = 1 dollar. Uma moeda de 25 cents se chama *quarter*.' },
      vocab: [['dollar', 'dólar', '💵', 'Five dollars, please.', 'Cinco dólares, por favor.'], ['cent', 'centavo', '🪙'], ['price', 'preço', '🏷️'], ['address', 'endereço', '📍'], ['street', 'rua', '🛣️'], ['number', 'número', '#️⃣'], ['page', 'página', '📄']],
      ex: [
        Q.gap('Ten ___.', 'dollars', 'Depois de números maiores que 1, usamos o plural: *dollars*.', ['dollar', 'dollars']),
        Q.gap('One ___.', 'dollar', 'Com *one* usamos o singular: *dollar*.', ['dollar', 'dollars']),
        Q.mc('Quanto é “fifty cents”?', ['50 centavos', '15 centavos', '5 dólares', '500 dólares'], 0, '*fifty* = 50.'),
      ],
    },
  ],
});
