/* Mundo 1 · Unidade 1.5 — Apresentando-se */
LG.unit({
  id: 'm1u05', world: 1, label: '1.5', emoji: '🙋', title: 'Apresentando-se',
  desc: 'Nome, país, nacionalidade, idiomas, profissão e idade.',
  lessons: [
    {
      title: 'Meu nome é…', emoji: '🪪',
      intro: { titulo: 'Dizer e perguntar o nome', texto: 'Para dizer seu nome: **My name is Ana.** ou, mais curto, **I am Ana.** (I’m Ana.)\nPara perguntar: **What is your name?** (Qual é o seu nome?)\n*My* = meu/minha · *your* = seu/sua.', exemplos: [['My name is Ana.', 'Meu nome é Ana.'], ['What is your name?', 'Qual é o seu nome?'], ['I am Tom.', 'Eu sou o Tom.']], cuidado: '*What’s* é a contração de *what is*: **What’s your name?** é o mais comum na fala.' },
      vocab: [['name', 'nome', '🪪', 'My name is Ana.', 'Meu nome é Ana.'], ['first name', 'primeiro nome', '', 'My first name is Tom.', 'Meu primeiro nome é Tom.'], ['last name', 'sobrenome', '', 'My last name is Silva.', 'Meu sobrenome é Silva.', { alt: ['surname'] }], ['My name is…', 'Meu nome é…', '🙋', '', '', { type: false }], ['What is your name?', 'Qual é o seu nome?', '❓', '', '', { alt: ['What’s your name?'], type: false }]],
      ex: [Q.bank('Meu nome é Ana.', 'My name is Ana.', ['your', 'are'], '*My name is* + nome.', ['I am Ana.']), Q.bank('Qual é o seu nome?', 'What is your name?', ['my', 'are'], 'Para perguntar o nome do outro, use *your*.', ['What’s your name?']), Q.mc('Qual palavra significa “sobrenome”?', ['last name', 'first name', 'nickname', 'name'], 0, '**Last name** é o sobrenome. Em inglês, é o *último* nome.'), Q.fix('My name are Ana.', 'are', 'My name is Ana.', 'Com *name* (it) usamos **is**: *My name is Ana.*')],
    },
    {
      title: 'De onde você é?', emoji: '🌍',
      intro: { titulo: 'Países', texto: 'Para dizer de onde você é: **I am from Brazil.** Para perguntar: **Where are you from?** (De onde você é?)\nCuidado: em inglês países sempre têm **letra maiúscula**. Alguns levam **the**: *the USA*, *the UK*.', exemplos: [['I am from Brazil.', 'Eu sou do Brasil.'], ['Where are you from?', 'De onde você é?'], ['He is from the USA.', 'Ele é dos EUA.']], cuidado: 'Em inglês é **Brazil** (com Z), não "Brasil".' },
      vocab: [['Brazil', 'Brasil', '🇧🇷', 'I am from Brazil.', 'Eu sou do Brasil.'], ['the USA', 'os Estados Unidos', '🇺🇸', '', '', { alt: ['the United States', 'USA'] }], ['Canada', 'Canadá', '🇨🇦'], ['England', 'Inglaterra', '🏴󠁧󠁢󠁥󠁮󠁧󠁿'], ['Portugal', 'Portugal', '🇵🇹'], ['Argentina', 'Argentina', '🇦🇷'], ['Japan', 'Japão', '🇯🇵'], ['Mexico', 'México', '🇲🇽'], ['Germany', 'Alemanha', '🇩🇪'], ['Italy', 'Itália', '🇮🇹']],
      ex: [Q.bank('Eu sou do Brasil.', 'I am from Brazil.', ['of', 'is'], '*I am from* + país.'), Q.bank('De onde você é?', 'Where are you from?', ['is', 'what'], '*Where are you from?*'), Q.type('Escreva em inglês: Brasil', ['Brazil'], 'Em inglês: **Brazil**, com Z.')],
    },
    {
      title: 'Nacionalidades', emoji: '🧑‍🤝‍🧑',
      intro: { titulo: 'Que nacionalidade você tem?', texto: 'Para dizer a nacionalidade: **I am Brazilian.** (Eu sou brasileiro/a.) Em inglês, a nacionalidade **tem letra maiúscula** e **não muda** para masculino ou feminino.', exemplos: [['I am Brazilian.', 'Eu sou brasileiro(a).'], ['She is Canadian.', 'Ela é canadense.'], ['They are Japanese.', 'Eles são japoneses.']], cuidado: 'Nacionalidade é adjetivo: nunca diga *I am Brazil* (isso seria "eu sou o Brasil"). Diga **I am Brazilian**.' },
      vocab: [['Brazilian', 'brasileiro(a)', '🇧🇷'], ['American', 'americano(a)', '🇺🇸'], ['Canadian', 'canadense', '🇨🇦'], ['English', 'inglês / inglesa', '🏴󠁧󠁢󠁥󠁮󠁧󠁿', '', '', { id: 'nat-english' }], ['Portuguese', 'português / portuguesa', '🇵🇹', '', '', { id: 'nat-portuguese' }], ['Argentine', 'argentino(a)', '🇦🇷', '', '', { alt: ['Argentinian'] }], ['Japanese', 'japonês / japonesa', '🇯🇵', '', '', { id: 'nat-japanese' }], ['Mexican', 'mexicano(a)', '🇲🇽'], ['Italian', 'italiano(a)', '🇮🇹', '', '', { id: 'nat-italian' }], ['German', 'alemão / alemã', '🇩🇪']],
      ex: [Q.fix('I am Brazil.', 'Brazil', 'I am Brazilian.', 'Para nacionalidade usamos o adjetivo: *Brazilian*. *Brazil* é o país.'), Q.bank('Ela é canadense.', 'She is Canadian.', ['Canada', 'are'], '*Canadian* = nacionalidade.'), Q.mc('Qual está escrita corretamente?', ['I am Brazilian.', 'I am Brasilian.', 'I am Brazillian.', 'I am Brazilean.'], 0, 'Escreve-se **Brazilian** (com Z, um L só e maiúscula).')],
    },
    {
      title: 'Idiomas', emoji: '🗣️',
      intro: { titulo: 'Que idiomas você fala?', texto: 'Use **I speak** + idioma: *I speak Portuguese.* Para perguntar: **Do you speak English?** (Você fala inglês?)\nOs idiomas também têm **maiúscula** em inglês: *English, Spanish, French*.', exemplos: [['I speak Portuguese.', 'Eu falo português.'], ['Do you speak English?', 'Você fala inglês?'], ['She speaks Spanish.', 'Ela fala espanhol.']], cuidado: '*Do you speak…?* e *she speaks* serão explicados no Mundo 2. Por enquanto, decore estas frases.' },
      vocab: [['I speak Portuguese.', 'Eu falo português.', '🇧🇷', '', '', { type: false }], ['I speak English.', 'Eu falo inglês.', '🇬🇧', '', '', { type: false }], ['I speak Spanish.', 'Eu falo espanhol.', '🇪🇸', '', '', { type: false }], ['Do you speak English?', 'Você fala inglês?', '🗣️', '', '', { type: false }], ['language', 'idioma', '🌐'], ['a little', 'um pouco', '🤏', 'I speak a little English.', 'Eu falo um pouco de inglês.']],
      ex: [Q.bank('Eu falo português.', 'I speak Portuguese.', ['Brazil', 'am'], '*I speak* + idioma.'), Q.bank('Você fala inglês?', 'Do you speak English?', ['are', 'you'], 'Pergunta: *Do you speak…?*'), Q.type('Escreva em inglês: Eu falo um pouco de inglês.', ['I speak a little English.'], '*a little* = um pouco.'), Q.mc('Qual está correta?', ['I speak Spanish.', 'I am speak Spanish.', 'I speaks Spanish.', 'I speaking Spanish.'], 0, 'Sem *am* e com o verbo na forma simples: **I speak Spanish** (idioma com maiúscula).')],
    },
    {
      title: 'Profissões', emoji: '💼',
      intro: { titulo: 'O que você faz?', texto: 'Para dizer sua profissão: **I am a teacher.** (Sou professor/a.) Em inglês usamos **a** (ou **an** antes de vogal) entre *am* e a profissão: *I am a nurse*, *I am an engineer*.\nPergunta: **What do you do?** (Qual é a sua profissão?) — por ora, decore.', exemplos: [['I am a student.', 'Eu sou estudante.'], ['She is a doctor.', 'Ela é médica.'], ['He is an engineer.', 'Ele é engenheiro.']], cuidado: 'Não omita o artigo: *I am teacher* soa errado. Diga **I am a teacher**. Mais sobre *a/an* na unidade 1.7.' },
      vocab: [['student', 'estudante', '🎓', 'I am a student.', 'Eu sou estudante.'], ['teacher', 'professor(a)', '👩‍🏫', 'She is a teacher.', 'Ela é professora.'], ['doctor', 'médico(a)', '🧑‍⚕️', 'He is a doctor.', 'Ele é médico.'], ['nurse', 'enfermeiro(a)', '👩‍⚕️'], ['engineer', 'engenheiro(a)', '👷', 'He is an engineer.', 'Ele é engenheiro.'], ['lawyer', 'advogado(a)', '⚖️'], ['cook', 'cozinheiro(a)', '🧑‍🍳'], ['driver', 'motorista', '🚌'], ['singer', 'cantor(a)', '🎤']],
      ex: [Q.bank('Eu sou professora.', 'I am a teacher.', ['an', 'is'], 'Profissão leva *a* (ou *an*).'), Q.bank('Ele é engenheiro.', 'He is an engineer.', ['a', 'are'], '*Engineer* começa com vogal: use **an**.'), Q.fix('I am doctor.', 'doctor', 'I am a doctor.', 'Falta o artigo: *a doctor*.'), Q.mc('Qual é a tradução de “lawyer”?', ['advogado', 'professor', 'médico', 'motorista'], 0, '*Lawyer* = advogado(a).')],
    },
    {
      title: 'Quantos anos você tem?', emoji: '🎂',
      intro: { titulo: 'Falando da idade', texto: 'Já vimos: a idade usa **to be**. **I am 25 years old.** ou apenas **I am 25.**\nPergunta: **How old are you?**\nPara outras pessoas: **She is 30.** / **He is 12 years old.**', exemplos: [['I am 25 years old.', 'Eu tenho 25 anos.'], ['How old are you?', 'Quantos anos você tem?'], ['She is thirty.', 'Ela tem trinta anos.']], cuidado: 'O erro mais comum: *I have 25 years.* Em inglês, **I am 25**.' },
      vocab: [['I am 20.', 'Eu tenho 20 anos.', '🎂', '', '', { type: false }], ['He is 30.', 'Ele tem 30 anos.', '🧔', '', '', { type: false }], ['She is 12 years old.', 'Ela tem 12 anos.', '👧', '', '', { type: false }], ['child', 'criança', '🧒'], ['adult', 'adulto(a)', '🧑']],
      ex: [Q.bank('Eu tenho vinte e cinco anos.', 'I am twenty-five years old.', ['have', 'is'], 'Idade com *to be*: I **am** twenty-five.', ['I am twenty five years old.']), Q.fix('She has 30 years old.', 'has', 'She is 30 years old.', 'Em inglês, a idade usa *to be*: *She **is** 30*.'), Q.type('Escreva em inglês: Quantos anos você tem?', ['How old are you?'], '*How old are you?*'), Q.mc('Como dizer “Ele tem 12 anos”?', ['He is 12 years old.', 'He has 12 years.', 'He have 12 years.', 'He are 12.'], 0, '**He is 12 years old.**')],
    },
    {
      title: 'Contatos', emoji: '📧',
      intro: { titulo: 'Email, telefone e endereço', texto: 'Para pedir contato: **What is your email?** / **What is your phone number?** Para responder: **My email is …** / **My phone number is …**\nNo email, o **@** é **"at"** e o **.** é **"dot"**: *ana at gmail dot com*.', exemplos: [['What is your email?', 'Qual é o seu e-mail?'], ['My phone number is 555-0142.', 'Meu telefone é 555-0142.'], ['ana at mail dot com', 'ana@mail.com']], cuidado: 'O endereço de e-mail também se chama *email address* (não só *address*).' },
      vocab: [['email', 'e-mail', '📧', 'My email is ana at mail dot com.', 'Meu e-mail é ana@mail.com.'], ['phone number', 'número de telefone', '📱'], ['address', 'endereço', '📍'], ['at', 'arroba (@)', '@', '', '', { n: 'No e-mail, @ é "at".' }], ['dot', 'ponto (.)', '⚫']],
      ex: [Q.bank('Qual é o seu e-mail?', 'What is your email?', ['my', 'are'], '*What is your email?*', ['What’s your email?']), Q.bank('Meu telefone é 555-0142.', 'My phone number is 555-0142.', ['your', 'are'], '*My phone number is …*'), Q.mc('Como se diz “@” em inglês, num e-mail?', ['at', 'dot', 'arroba', 'and'], 0, 'O **@** é *at*. O ponto é *dot*.'), Q.mc('Como se diz o ponto em “mail.com”?', ['dot com', 'point com', 'dash com', 'dot calm'], 0, 'O ponto é **dot**.')],
    },
    {
      title: 'Festa de boas-vindas', emoji: '🎉',
      intro: { titulo: 'Hora de se apresentar!', texto: 'Junte tudo: **nome**, **país**, **nacionalidade**, **idioma**, **profissão** e **idade**. Em uma festa, você poderia dizer:\n*Hi! My name is Ana. I am from Brazil. I am Brazilian. I am a teacher.*', exemplos: [['Hi! My name is Ana.', 'Oi! Meu nome é Ana.'], ['I am from Brazil.', 'Sou do Brasil.'], ['I am a teacher.', 'Sou professora.']], cultura: 'Em apresentações formais, americanos apertam a mão e dizem *Nice to meet you*. Beijo no rosto não é comum.' },
      vocab: [],
      ex: [
        Q.dlg('Numa festa', [
          { say: 'Hi! What is your name?', pt: 'Oi! Qual é o seu nome?', opts: [['My name is Ana.', 1], ['I am fine.', 0, 'Ele perguntou o seu nome, não como você está.']] },
          { say: 'Nice to meet you, Ana! Where are you from?', pt: 'Prazer, Ana! De onde você é?', opts: [['I am from Brazil.', 1], ['I am Brazil.', 0, 'Para o país use *from*. *I am Brazil* significa "eu sou o Brasil".']] },
          { say: 'Great! What do you do?', pt: 'Legal! O que você faz?', opts: [['I am a teacher.', 1], ['I am twenty years old.', 0, 'Ele perguntou sua profissão, não sua idade.']] },
        ], 'Tom'),
        Q.dlg('Conhecendo alguém', [
          { say: 'Do you speak English?', pt: 'Você fala inglês?', opts: [['A little.', 1], ['Yes, I am.', 0, 'A pergunta usa *do you speak*; responda com idioma ou *a little*.']] },
          { say: 'How old are you?', pt: 'Quantos anos você tem?', opts: [['I am twenty-five.', 1], ['I have twenty-five.', 0, 'Idade usa *to be*: *I am twenty-five*.']] },
        ], 'Sam'),
        Q.read('Conheça a Maria', 'Hi! My name is Maria. I am from Portugal. I am Portuguese. I am a nurse. I am thirty years old. I speak Portuguese and English.', 'Oi! Meu nome é Maria. Eu sou de Portugal. Sou portuguesa. Sou enfermeira. Tenho trinta anos. Falo português e inglês.', [
          { q: 'Where is Maria from?', opts: ['Portugal', 'Brazil', 'England'], a: 0, why: 'O texto diz: *I am from Portugal.*' },
          { q: 'What is her job?', opts: ['She is a nurse.', 'She is a teacher.', 'She is a doctor.'], a: 0, why: 'O texto diz: *I am a nurse.*' },
          { q: 'How old is she?', opts: ['Thirty', 'Twenty', 'Forty'], a: 0, why: 'O texto diz: *I am thirty years old.*' },
        ]),
        Q.bank('Eu sou do Brasil e sou brasileiro.', 'I am from Brazil and I am Brazilian.', ['Brazilian', 'is'], 'País com *from*; nacionalidade com adjetivo.'),
        Q.bank('Prazer em conhecê-la, Ana.', 'Nice to meet you, Ana.', ['see', 'later'], '*Nice to meet you* + nome.'),
        Q.fix('I have thirty years.', 'have', 'I am thirty years old.', 'Idade usa *to be*.'),
        Q.mc('Qual apresentação está correta?', ['I am Ana. I am from Brazil.', 'I am Ana. I am Brazil.', 'Ana am I. From Brazil I.', 'My name Ana. I from Brazil.'], 0, 'Nome com *I am* (ou *My name is*) e país com *from*.'),
        Q.type('Escreva em inglês: Eu sou estudante.', ['I am a student.', 'I’m a student.'], '*I am a student.* Não esqueça o artigo *a*.'),
      ],
    },
  ],
});
