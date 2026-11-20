/* Mundo 1 · Unidade 1.4 — Cumprimentos e Despedidas */
LG.unit({
  id: 'm1u04', world: 1, label: '1.4', emoji: '👋', title: 'Cumprimentos',
  desc: 'Olá, tchau, educação e primeiras conversas.',
  lessons: [
    {
      title: 'Olá e tchau', emoji: '👋',
      intro: { titulo: 'Dizer olá e tchau', texto: 'As saudações mais simples: **hello** e **hi** (olá/oi), **goodbye** e **bye** (tchau). *Hi* e *bye* são informais; *hello* e *goodbye* servem para qualquer situação.', exemplos: [['Hello!', 'Olá!'], ['Hi, Ana!', 'Oi, Ana!'], ['Bye!', 'Tchau!']], leitura: 'hello = "rrê-LÔU" · hi = "rrai" · goodbye = "gud-BAI" · bye = "bai" · hey = "rrêi"', cuidado: '*Hi* começa com **h** aspirado e se lê "rrai", não "ai".' },
      vocab: [['hello', 'olá', '👋', 'Hello, Ana!', 'Olá, Ana!', { r: 'rrê-LÔU' }], ['hi', 'oi', '🙋', 'Hi, Tom!', 'Oi, Tom!', { r: 'rrai' }], ['hey', 'ei / e aí', '🤙', 'Hey, Sam!', 'Ei, Sam!'], ['goodbye', 'adeus / tchau', '👋', 'Goodbye, Mr. Smith.', 'Tchau, Sr. Smith.'], ['bye', 'tchau', '✌️', 'Bye, Ana!', 'Tchau, Ana!']],
      ex: [Q.mc('Qual saudação é mais informal?', ['hi', 'good morning', 'good evening', 'goodbye'], 0, '**Hi** é a saudação informal mais comum.'), Q.bank('Oi, Ana!', 'Hi, Ana!', ['Bye', 'Goodbye'], '*Hi* = oi. Use vírgula antes do nome.')],
    },
    {
      title: 'Bom dia, boa tarde, boa noite', emoji: '☀️',
      intro: { titulo: 'Saudações por horário', texto: 'Em inglês as saudações mudam conforme a hora do dia:\n- **Good morning** — até o meio-dia\n- **Good afternoon** — do meio-dia até ~18h\n- **Good evening** — ao chegar, à noite\n- **Good night** — só para **se despedir** ou ir dormir', exemplos: [['Good morning!', 'Bom dia!'], ['Good afternoon!', 'Boa tarde!'], ['Good night!', 'Boa noite! (ao se despedir)']], cuidado: 'Em português "boa noite" serve para chegar e sair. Em inglês: chegando = **good evening**; saindo = **good night**.' },
      vocab: [['good morning', 'bom dia', '☀️'], ['good afternoon', 'boa tarde', '🌤️'], ['good evening', 'boa noite (ao chegar)', '🌆', '', '', { n: 'Usada para cumprimentar à noite. Para se despedir: good night.' }], ['good night', 'boa noite (ao se despedir)', '🌙']],
      ex: [Q.mc('São 8h da manhã. O que você diz ao chegar?', ['Good morning', 'Good night', 'Good evening', 'Goodbye'], 0, 'De manhã: **Good morning**.'), Q.mc('Você vai dormir. O que diz?', ['Good night', 'Good evening', 'Good morning', 'Hello'], 0, '**Good night** é para ir dormir/se despedir à noite.'), Q.mc('Você chega a uma festa às 20h. O que diz?', ['Good evening', 'Good night', 'Good afternoon', 'Good morning'], 0, 'Chegando à noite: **Good evening**.')],
    },
    {
      title: 'Por favor, obrigado, desculpe', emoji: '🙏',
      intro: { titulo: 'As palavras mágicas', texto: 'Educação conta muito! Aprenda: **please** (por favor), **thank you** / **thanks** (obrigado), **you are welcome** (de nada), **sorry** (desculpe) e **excuse me** (com licença).', exemplos: [['Thank you!', 'Obrigado(a)!'], ['You are welcome.', 'De nada.'], ['Excuse me, please.', 'Com licença, por favor.']], leitura: 'please = "pliz" · thank you = "THÉNK iu" · welcome = "UÉL-kam" · sorry = "SÓ-ri" · excuse me = "ik-SKIUZ mi"', cuidado: 'Em inglês "obrigado" é igual para homens e mulheres: *thank you*. *Sorry* é desculpa leve; *excuse me* chama atenção ou pede passagem.', cultura: 'Americanos e britânicos dizem *please* e *thank you* o tempo todo, até com atendentes. Não é exagero: é educação básica.' },
      vocab: [['please', 'por favor', '🙏', 'Water, please.', 'Água, por favor.'], ['thank you', 'obrigado(a)', '😊', 'Thank you, Ana!', 'Obrigado, Ana!', { alt: ['thanks'] }], ['you are welcome', 'de nada', '🤝', '', '', { alt: ['you’re welcome', 'youre welcome'] }], ['sorry', 'desculpe', '😔', 'Sorry, Tom.', 'Desculpe, Tom.'], ['excuse me', 'com licença', '🙋', 'Excuse me, please.', 'Com licença, por favor.']],
      ex: [Q.mc('Alguém te ajudou. O que você diz?', ['Thank you', 'Excuse me', 'Sorry', 'Goodbye'], 0, 'Para agradecer: **Thank you**.'), Q.mc('Você esbarrou em alguém. O que diz?', ['Sorry', 'Please', 'You are welcome', 'Hello'], 0, 'Para pedir desculpas: **Sorry**.'), Q.mc('Alguém disse “Thank you”. Qual é a resposta?', ['You are welcome', 'Sorry', 'Please', 'Goodbye'], 0, 'Resposta natural: **You’re welcome** (de nada).')],
    },
    {
      title: 'Como vai você?', emoji: '😊',
      intro: { titulo: 'How are you?', texto: 'A pergunta mais comum do inglês: **How are you?** (Como vai você?). Respostas: **I am fine.** (Estou bem.), **I am good.**, **I am great!**, **I am OK.** ou **so-so** (mais ou menos). Depois, devolva: **And you?** (E você?)\n*I am* = eu estou/sou (você vai estudar isso em detalhes na unidade 1.6).', exemplos: [['How are you?', 'Como vai você?'], ['I am fine, thank you. And you?', 'Estou bem, obrigado. E você?'], ['I am great!', 'Estou ótimo!']], leitura: 'fine = "fain" · great = "grêit" · and you = "end iu" · so-so = "sôu-sôu"', cuidado: 'Evite responder só "fine" sem devolver a pergunta: soa seco. Diga **And you?**', cultura: 'Nos EUA, *How are you?* é saudação, não um convite para contar a vida. A resposta esperada é curta: *Good, thanks. And you?*' },
      vocab: [['How are you?', 'Como vai você?', '🤔', '', '', { type: false }], ['I am fine.', 'Estou bem.', '🙂', '', '', { alt: ['I’m fine.', 'I am fine', 'I’m fine'] }], ['I am great!', 'Estou ótimo!', '😄', '', '', { alt: ['I’m great!'] }], ['I am OK.', 'Estou mais ou menos.', '😐', '', '', { alt: ['I’m OK.', 'I am okay.', 'I’m okay.'] }], ['And you?', 'E você?', '➡️']],
      ex: [Q.bank('Eu estou bem, obrigado.', 'I am fine, thank you.', ['you', 'is'], '*I am fine* + *thank you*.', ['I’m fine, thank you.']), Q.bank('Como vai você?', 'How are you?', ['am', 'is'], 'Com *you* usamos *are*.'), Q.mc('“I am so-so” significa…', ['Estou mais ou menos', 'Estou ótimo', 'Estou mal', 'Estou com sono'], 0, '*So-so* = mais ou menos.')],
    },
    {
      title: 'Prazer em conhecer', emoji: '🤝',
      intro: { titulo: 'Conhecendo e se despedindo', texto: 'Quando conhece alguém: **Nice to meet you.** (Prazer em conhecê-lo.) Ao se despedir: **See you later.** (Até mais.), **See you tomorrow.** (Até amanhã.), **Take care.** (Se cuida.), **Have a nice day.** (Tenha um bom dia.).', exemplos: [['Nice to meet you.', 'Prazer em conhecê-lo(a).'], ['See you tomorrow.', 'Até amanhã.'], ['Have a nice day!', 'Tenha um ótimo dia!']], leitura: 'nice = "nais" · meet = "miit" · later = "LÊI-ter" · tomorrow = "tu-MÓ-rôu" · take care = "têik kér"', cuidado: '*Meet* (encontrar) lê-se "miit", e *meat* (carne) também! Escrita diferente, som igual.' },
      vocab: [['Nice to meet you.', 'Prazer em conhecê-lo(a).', '🤝', '', '', { alt: ['Nice to meet you', 'Nice to meet you, too.'] }], ['See you later.', 'Até mais.', '👋', '', '', { alt: ['See you later'] }], ['See you tomorrow.', 'Até amanhã.', '📅', '', '', { alt: ['See you tomorrow'] }], ['Take care.', 'Se cuida.', '💛', '', '', { alt: ['Take care'] }], ['Have a nice day!', 'Tenha um bom dia!', '🌞', '', '', { alt: ['Have a nice day'] }]],
      ex: [Q.mc('Você conheceu alguém agora. O que diz?', ['Nice to meet you.', 'See you later.', 'Have a nice day.', 'I am sorry.'], 0, '**Nice to meet you** é a frase de quem acaba de conhecer.'), Q.bank('Até amanhã.', 'See you tomorrow.', ['later', 'meet'], '*See you tomorrow* = até amanhã.')],
    },
    {
      title: 'Sim, não e “não entendi”', emoji: '🙋',
      intro: { titulo: 'Frases de sobrevivência', texto: 'Estas frases vão salvar você em qualquer conversa: **yes**, **no**, **maybe** (talvez), **I don’t know** (não sei), **I don’t understand** (não entendi), **Please repeat.** (Repita, por favor.) e **Slowly, please.** (Devagar, por favor.)', exemplos: [['I don’t understand.', 'Eu não entendo.'], ['Please repeat.', 'Por favor, repita.'], ['I don’t know.', 'Eu não sei.']], leitura: 'understand = "an-der-STÉND" · repeat = "ri-PIT" · maybe = "MÊI-bi" · slowly = "SLÔU-li"', cuidado: '*Don’t* = *do not* (não). Aprenderemos o porquê no Mundo 2; por agora, decore a frase pronta.' },
      vocab: [['yes', 'sim', '✅'], ['no', 'não', '❌'], ['maybe', 'talvez', '🤷'], ['I don’t know.', 'Eu não sei.', '🤷', '', '', { alt: ['I do not know.', 'I dont know.'] }], ['I don’t understand.', 'Eu não entendo.', '❓', '', '', { alt: ['I do not understand.', 'I dont understand.'] }], ['Please repeat.', 'Por favor, repita.', '🔁', '', '', { alt: ['Please repeat'] }], ['Slowly, please.', 'Devagar, por favor.', '🐢', '', '', { alt: ['Slowly please.', 'Slowly please'] }]],
      ex: [Q.mc('Você não entendeu. O que diz?', ['I don’t understand.', 'I don’t know.', 'See you later.', 'Nice to meet you.'], 0, '**I don’t understand** = eu não entendo.'), Q.mc('Quer que repitam mais devagar. O que diz?', ['Slowly, please.', 'Good night.', 'Thank you.', 'Maybe.'], 0, '**Slowly, please** = devagar, por favor.'), Q.type('Escreva em inglês: Eu não sei.', ['I don’t know.', 'I do not know.'], '*I don’t know* (ou *I do not know*).')],
    },
    {
      title: 'Formal ou informal?', emoji: '🎩',
      intro: { titulo: 'Escolha o tom certo', texto: 'Entre amigos: **Hey! What’s up?** (E aí?) → **Not much.** (Nada demais.) / **Long time no see!** (Quanto tempo!). Em situações formais: **Hello**, **Good morning**, **Sir** (senhor), **Mr.** (Sr.), **Mrs./Ms.** (Sra./Srta.).', exemplos: [['What’s up?', 'E aí? / O que está rolando?'], ['Long time no see!', 'Quanto tempo!'], ['Good morning, Mr. Smith.', 'Bom dia, Sr. Smith.']], leitura: 'what’s up = "uóts ap" · sir = "sâr" · Mr. = "MÍS-ter" · Ms. = "miz"', cuidado: '*What’s up?* é informal e raramente é uma pergunta real: responda **Not much** ou devolva *What’s up?*', cultura: 'Em inglês, *Mr.* vem sempre com sobrenome: *Mr. Silva*, nunca só "Mr.".' },
      vocab: [['What’s up?', 'E aí?', '🤙', '', '', { alt: ['Whats up?', 'What is up?'] }], ['Not much.', 'Nada demais.', '😎', '', '', { alt: ['Not much'] }], ['Long time no see!', 'Quanto tempo!', '😮', '', '', { alt: ['Long time no see'] }], ['Mr.', 'Sr. (senhor)', '👨‍💼', '', '', { alt: ['Mr', 'Mister'], type: false }], ['Ms.', 'Sra./Srta.', '👩‍💼', '', '', { alt: ['Ms', 'Mrs.', 'Mrs'], type: false }], ['sir', 'senhor (formal)', '🎩']],
      ex: [Q.mc('Qual cumprimento é mais formal?', ['Good morning, Mr. Smith.', 'Hey, what’s up?', 'Yo!', 'Long time no see!'], 0, '**Good morning, Mr. Smith** é formal.'), Q.mc('Um amigo diz “What’s up?”. Qual resposta é natural?', ['Not much.', 'Thank you very much.', 'Nice to meet you.', 'Goodbye.'], 0, '*What’s up?* → **Not much** (nada demais).')],
    },
    {
      title: 'Primeira conversa', emoji: '💬',
      intro: { titulo: 'Juntando tudo', texto: 'Hora de usar tudo da unidade em conversas completas. Pense na situação: horário, formalidade e a educação básica (*please, thank you*).', exemplos: [['Hello! How are you?', 'Olá! Como vai?'], ['I am fine, thank you. And you?', 'Estou bem, obrigado. E você?'], ['Nice to meet you.', 'Prazer em conhecê-lo.']], cuidado: 'Lembre: *good evening* ao chegar à noite e *good night* ao sair.' },
      vocab: [],
      ex: [
        Q.dlg('Encontrando um colega', [
          { say: 'Hello! How are you?', pt: 'Olá! Como vai?', opts: [['I am fine, thank you. And you?', 1], ['Goodbye!', 0, 'Ele acabou de cumprimentar você. "Goodbye" é para se despedir.']] },
          { say: 'I am great! Nice to meet you.', pt: 'Estou ótimo! Prazer em conhecê-lo.', opts: [['Nice to meet you, too.', 1], ['I don’t know.', 0, 'Responda ao prazer em conhecer com *Nice to meet you, too.*']] },
          { say: 'See you tomorrow!', pt: 'Até amanhã!', opts: [['Bye! Have a nice day!', 1], ['Good morning!', 0, 'Isso é uma despedida, não um cumprimento de manhã.']] },
        ], 'Colega'),
        Q.dlg('Na recepção de uma empresa', [
          { say: 'Good morning, sir.', pt: 'Bom dia, senhor.', opts: [['Good morning.', 1], ['Good night.', 0, '*Good night* é despedida noturna. De manhã: *Good morning*.']] },
          { say: 'Excuse me, one moment, please.', pt: 'Com licença, um momento, por favor.', opts: [['Thank you.', 1], ['I am hungry.', 0, 'Isso não combina com a situação: agradeça pela atenção.']] },
        ], 'Recepcionista'),
        Q.bank('Bom dia! Como vai você?', 'Good morning! How are you?', ['night', 'is'], '*Good morning* + *How are you?*'),
        Q.bank('Eu estou bem, e você?', 'I am fine, and you?', ['good', 'are'], '*I am fine* + *And you?*', ['I’m fine, and you?']),
        Q.bank('Obrigado! De nada.', 'Thank you! You are welcome.', ['sorry', 'please'], '*Thank you* → *You are welcome*.', ['Thank you! You’re welcome.']),
        Q.mc('Você chega à noite e cumprimenta um amigo. O que diz?', ['Good evening!', 'Good night!', 'Good morning!', 'Goodbye!'], 0, 'Chegando à noite: **Good evening**.'),
        Q.mc('Qual é a melhor resposta para “Thank you”?', ['You are welcome.', 'Nice to meet you.', 'I am sorry.', 'Good morning.'], 0, 'Resposta natural: **You’re welcome**.'),
        Q.fix('How is you?', 'is', 'How are you?', 'Com *you* usamos *are*: **How are you?**'),
      ],
    },
  ],
});
