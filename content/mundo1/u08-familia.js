/* Mundo 1 · Unidade 1.8 — Família e Pessoas */
LG.unit({
  id: 'm1u08', world: 1, label: '1.8', emoji: '👨‍👩‍👧', title: 'Família e Pessoas',
  desc: 'Família, possessivos, partes do corpo e descrição.',
  lessons: [
    {
      title: 'Minha família', emoji: '👪',
      intro: { titulo: 'Os parentes mais próximos', texto: 'Vocabulário da família: **mother, father, sister, brother, parents**.\nEm conversa, muita gente diz **mom** e **dad** (mãe e pai, informal). Cuidado: *parents* = **pais** (mãe e pai), não "parentes"!', exemplos: [['my mother', 'minha mãe'], ['my brother', 'meu irmão'], ['my parents', 'meus pais']], leitura: 'mother = "MA-dher" · father = "FA-dher" · sister = "SIS-ter" · brother = "BRA-dher" · parents = "PÉ-rents" · mom = "móm" · dad = "déd"', cuidado: '**Falso cognato:** *parents* = pais; *relatives* = parentes.' },
      vocab: [['mother', 'mãe', '👩', 'My mother is a nurse.', 'Minha mãe é enfermeira.'], ['father', 'pai', '👨', 'My father is a driver.', 'Meu pai é motorista.'], ['sister', 'irmã', '👧'], ['brother', 'irmão', '👦'], ['parents', 'pais (mãe e pai)', '👫', '', '', { n: 'Falso cognato: parents = pais, não parentes (relatives).' }], ['mom', 'mamãe', '🤱', '', '', { alt: ['mum'] }], ['dad', 'papai', '👨‍👧']],
      ex: [Q.mc('“Parents” significa…', ['pais (mãe e pai)', 'parentes', 'primos', 'avós'], 0, '**Falso cognato!** *Parents* = pais. Parentes = *relatives*.'), Q.bank('Minha mãe é enfermeira.', 'My mother is a nurse.', ['father', 'are'], '*My mother is a nurse.*'), Q.bank('Meu irmão é médico.', 'My brother is a doctor.', ['sister', 'are'], '*My brother is a doctor.*')],
    },
    {
      title: 'A família maior', emoji: '👵',
      intro: { titulo: 'Avós, tios e primos', texto: 'Mais parentes: **grandmother** (avó), **grandfather** (avô), **grandparents** (avós), **aunt** (tia), **uncle** (tio), **cousin** (primo/a).\nObserve que *cousin* serve para primo **e** prima, e *aunt/uncle* distinguem tia e tio.', exemplos: [['my grandmother', 'minha avó'], ['my uncle Tom', 'meu tio Tom'], ['my cousin', 'meu primo / minha prima']], leitura: 'grandmother = "GRÉN-ma-dher" · grandfather = "GRÉN-fa-dher" · aunt = "ént" · uncle = "ÂNG-kol" · cousin = "KA-zen"', cuidado: '*Cousin* lê-se "KA-zen", não "cusin".', cultura: 'Americanos costumam chamar a avó de *grandma* e o avô de *grandpa* (informal).' },
      vocab: [['grandmother', 'avó', '👵', '', '', { alt: ['grandma'] }], ['grandfather', 'avô', '👴', '', '', { alt: ['grandpa'] }], ['grandparents', 'avós (avô e avó)', '👴👵'], ['aunt', 'tia', '👩‍🦰'], ['uncle', 'tio', '👨‍🦱'], ['cousin', 'primo / prima', '🧑‍🤝‍🧑']],
      ex: [Q.mc('Como se diz “tio” em inglês?', ['uncle', 'aunt', 'cousin', 'brother'], 0, '*Uncle* = tio; *aunt* = tia.'), Q.mc('O pai do meu pai é meu…', ['grandfather', 'uncle', 'brother', 'cousin'], 0, '*Grandfather* = avô.'), Q.bank('Minha tia é professora.', 'My aunt is a teacher.', ['uncle', 'are'], '*My aunt is a teacher.*')],
    },
    {
      title: 'Casal, filhos e amigos', emoji: '💑',
      intro: { titulo: 'Mais pessoas importantes', texto: 'Palavras para as pessoas da sua vida: **husband** (marido), **wife** (esposa), **son** (filho), **daughter** (filha), **baby** (bebê), **friend** (amigo/a), **boyfriend**, **girlfriend**.', exemplos: [['my husband', 'meu marido'], ['my daughter', 'minha filha'], ['my best friend', 'meu melhor amigo']], leitura: 'husband = "RRÂZ-bend" · wife = "uáif" · son = "san" · daughter = "DÓ-ter" · baby = "BÊI-bi" · friend = "frénd" · girlfriend = "GÂRL-frénd"', cuidado: '*Son* (filho) lê-se "san", igual a *sun* (sol)! *Daughter* tem **gh** mudo: "DÓ-ter".' },
      vocab: [['husband', 'marido', '🤵'], ['wife', 'esposa', '👰'], ['son', 'filho', '👦'], ['daughter', 'filha', '👧'], ['baby', 'bebê', '👶'], ['friend', 'amigo(a)', '🧑‍🤝‍🧑'], ['boyfriend', 'namorado', '💑'], ['girlfriend', 'namorada', '💏']],
      ex: [Q.mc('“Son” significa…', ['filho', 'sol', 'sono', 'som'], 0, '**Son** = filho. (*Sun* = sol; os dois soam igual.)'), Q.bank('Esta é minha esposa.', 'This is my wife.', ['husband', 'are'], '*This is my wife.*'), Q.bank('Ele é meu melhor amigo.', 'He is my best friend.', ['she', 'are'], '*best friend* = melhor amigo.', ['He’s my best friend.'])],
    },
    {
      title: 'Meu, seu, nosso…', emoji: '👉',
      intro: { titulo: 'Adjetivos possessivos', texto: 'Mostram a quem algo pertence: **my** (meu/minha), **your** (seu/sua de você), **his** (dele), **her** (dela), **our** (nosso/a), **their** (deles/delas).\nEles **não mudam** com o gênero ou o número do que é possuído: *my brother*, *my sister*, *my parents*. O que importa é **quem** possui.', exemplos: [['my mother', 'minha mãe'], ['his sister', 'a irmã dele'], ['her brother', 'o irmão dela']], leitura: 'my = "mai" · your = "iór" · his = "rriz" · her = "rrâr" · our = "áuer" · their = "dhér"', cuidado: '**his** = dele; **her** = dela. Em português "seu/sua" confunde: em inglês é claro de quem é.' },
      vocab: [['my', 'meu / minha', '', 'My name is Ana.', 'Meu nome é Ana.'], ['your', 'seu / sua (de você)', '', 'Your sister is nice.', 'Sua irmã é legal.'], ['his', 'dele', '', 'His brother is tall.', 'O irmão dele é alto.'], ['her', 'dela', '', 'Her mother is a doctor.', 'A mãe dela é médica.'], ['our', 'nosso(a)', '', 'Our house is big.', 'Nossa casa é grande.'], ['their', 'deles / delas', '', 'Their car is red.', 'O carro deles é vermelho.']],
      ex: [Q.gap('Ana is my sister. ___ mother is my mother too.', 'Her', 'A mãe *da Ana* (ela) = **her** mother.', ['Her', 'His', 'Their']), Q.gap('Tom is my brother. ___ car is red.', 'His', 'O carro *do Tom* (ele) = **his** car.', ['His', 'Her', 'Our']), Q.gap('We are friends. ___ house is big.', 'Our', 'De *nós* = **our**.', ['Our', 'Their', 'My'], 'Nós somos amigos. A casa é nossa.'), Q.bank('A irmã dele é enfermeira.', 'His sister is a nurse.', ['Her', 'are'], '*his* = dele.'), Q.fix('She is my sister. His name is Ana.', 'His', 'She is my sister. Her name is Ana.', 'Para uma mulher usamos **her**.')],
    },
    {
      title: 'Posse com ’s', emoji: '🏷️',
      intro: { titulo: 'O ’s de posse', texto: 'Para dizer que algo é **de alguém**, adicione **’s** ao nome: **Ana’s mother** (a mãe da Ana), **Tom’s car** (o carro do Tom). Em inglês a ordem é **dono + coisa** (o contrário do português: "a mãe **da Ana**").', exemplos: [['Ana’s mother', 'a mãe da Ana'], ['Tom’s car', 'o carro do Tom'], ['my father’s name', 'o nome do meu pai']], cuidado: '*Ana’s mother* ≠ *Ana is mother*: o ’s de posse mostra pertencimento. (Também pode ser contração de *is*: *Ana’s happy* = *Ana is happy*.)' },
      vocab: [['Ana’s mother', 'a mãe da Ana', '', '', '', { type: false }], ['Tom’s car', 'o carro do Tom', '', '', '', { type: false }], ['my father’s name', 'o nome do meu pai', '', '', '', { type: false }]],
      ex: [
        Q.bank('A mãe da Ana é médica.', 'Ana’s mother is a doctor.', ['of', 'mother Ana'], 'Ordem: dono + ’s + coisa.', ['Ana’s mother is a doctor']),
        Q.bank('O carro do Tom é azul.', 'Tom’s car is blue.', ['of', 'car Tom'], 'Ordem: dono + ’s + coisa.'),
        Q.mc('Como se diz “o irmão do meu pai”?', ['my father’s brother', 'the brother of my father’s', 'my brother father', 'brother my father'], 0, '**my father’s brother** (dono + ’s + coisa).'),
        Q.fix('The mother of Ana is a nurse.', 'of', 'Ana’s mother is a nurse.', 'Em inglês é mais natural usar ’s: *Ana’s mother*.'),
        Q.type('Escreva em inglês: o carro do Tom', ['Tom’s car'], 'Dono + ’s + coisa: *Tom’s car*.'),
        Q.mc('Qual frase significa “O nome da minha irmã é Ana”?', ['My sister’s name is Ana.', 'My sister name is Ana.', 'Name my sister is Ana.', 'My sisters’ is Ana.'], 0, '**My sister’s name is Ana.**'),
      ],
    },
    {
      title: 'O corpo humano', emoji: '🧍',
      intro: { titulo: 'Partes do corpo', texto: 'Vamos conhecer o corpo: **head, eye, nose, mouth, ear, arm, hand, leg, foot, hair**. Atenção ao plural irregular: **foot → feet**; e muitos pares usam o plural: *eyes*, *ears*, *hands*.', exemplos: [['my head', 'minha cabeça'], ['her blue eyes', 'os olhos azuis dela'], ['his long arms', 'os braços compridos dele']], leitura: 'head = "rréd" · eye = "ai" · nose = "nôuz" · mouth = "máuth" · ear = "ir" · arm = "arm" · hand = "rrénd" · leg = "lég" · foot = "fut" · hair = "rrér"', cuidado: '*Hair* (cabelo) é incontável em inglês: *my hair is long* (não "my hairs are").' },
      vocab: [['head', 'cabeça', '🗣️'], ['eye', 'olho', '👁️'], ['nose', 'nariz', '👃'], ['mouth', 'boca', '👄'], ['ear', 'orelha', '👂'], ['arm', 'braço', '💪'], ['hand', 'mão', '✋'], ['leg', 'perna', '🦵'], ['foot', 'pé', '🦶'], ['hair', 'cabelo', '💇']],
      ex: [Q.mc('Com que parte do corpo você vê?', ['eyes', 'ears', 'nose', 'hands'], 0, 'Você vê com os **eyes**.'), Q.mc('Com que parte do corpo você ouve?', ['ears', 'eyes', 'mouth', 'legs'], 0, 'Você ouve com os **ears**.'), Q.mc('O plural de *foot* é…', ['feet', 'foots', 'feets', 'footes'], 0, 'Plural irregular: foot → **feet**.')],
    },
    {
      title: 'Descrevendo pessoas', emoji: '🧑‍🎨',
      intro: { titulo: 'Como ele(a) é?', texto: 'Adjetivos para descrever pessoas: **tall** (alto), **short** (baixo), **young** (jovem), **old** (velho), **nice** (legal, simpático), **kind** (gentil), **funny** (engraçado), **handsome** (bonito, para homens), **beautiful** (bonita/o), **smart** (inteligente).\nColoque-os **depois do verbo to be**: *She is tall.* ou **antes do substantivo**: *a tall girl*.', exemplos: [['She is tall and kind.', 'Ela é alta e gentil.'], ['My father is funny.', 'Meu pai é engraçado.'], ['He is a nice man.', 'Ele é um homem simpático.']], leitura: 'young = "iâng" · nice = "nais" · kind = "káind" · funny = "FA-ni" · handsome = "RRÉN-sam" · beautiful = "BIU-ti-ful" · smart = "smart"', cuidado: '*Handsome* é para homens; *beautiful* serve para qualquer pessoa ou coisa. *Funny* = engraçado, **não** "estranho" (isso é *strange*).' },
      vocab: [['young', 'jovem', '🧒'], ['nice', 'legal / simpático', '😊', 'She is nice.', 'Ela é simpática.'], ['kind', 'gentil', '💛'], ['funny', 'engraçado', '😂', '', '', { n: 'Funny = engraçado (não "estranho" — isso é strange).' }], ['smart', 'inteligente', '🧠'], ['beautiful', 'bonito(a)', '🌹'], ['handsome', 'bonito (homem)', '🕴️']],
      ex: [Q.bank('Ela é alta e simpática.', 'She is tall and nice.', ['he', 'are'], 'Adjetivos depois de *is*, ligados por *and*.', ['She’s tall and nice.']), Q.bank('Meu pai é engraçado.', 'My father is funny.', ['are', 'strange'], '*funny* = engraçado.'), Q.mc('Qual frase está correta?', ['He is a tall man.', 'He is a man tall.', 'He tall is a man.', 'Is he tall a man.'], 0, 'Adjetivo antes do substantivo: **a tall man**.')],
    },
    {
      title: 'Foto da família', emoji: '📸',
      intro: { titulo: 'Eu tenho… ela tem…', texto: 'Para dizer o que você **tem**: **I have** (eu tenho), **you have**, **we have**, **they have**. Para he/she/it: **has** → **she has**, **he has**, **it has**.\n*I have a brother.* *She has two sisters.* (O plural de *sister* é *sisters*: junte -s.)', exemplos: [['I have a brother.', 'Eu tenho um irmão.'], ['She has two sisters.', 'Ela tem duas irmãs.'], ['We have a big family.', 'Nós temos uma família grande.']], leitura: 'have = "rrév" · has = "rréz" · family = "FÉ-mi-li"', cuidado: 'Com *he/she/it* use **has**, não *have*: *She have* está errado; o certo é **She has**.' },
      vocab: [['family', 'família', '👨‍👩‍👧‍👦', 'I have a big family.', 'Eu tenho uma família grande.'], ['have', 'ter (I, you, we, they)', '', 'I have a brother.', 'Eu tenho um irmão.'], ['has', 'ter (he, she, it)', '', 'She has two sisters.', 'Ela tem duas irmãs.'], ['photo', 'foto', '📸']],
      ex: [
        Q.dlg('Mostrando uma foto', [
          { say: 'Who is this?', pt: 'Quem é este?', opts: [['This is my brother.', 1], ['This are my brother.', 0, 'Com *this* usamos *is*: *This is my brother.*']] },
          { say: 'He is tall! And who is she?', pt: 'Ele é alto! E quem é ela?', opts: [['She is my mother. Her name is Ana.', 1], ['She is my mother. His name is Ana.', 0, 'Para uma mulher usamos *her*.']] },
          { say: 'You have a big family!', pt: 'Você tem uma família grande!', opts: [['Yes! I have two sisters and a brother.', 1], ['Yes, I has a big family.', 0, 'Com *I* usamos *have*, não *has*.']] },
        ], 'Amigo'),
        Q.read('A família da Ana', 'My name is Ana. I have a big family. My mother is a nurse and my father is a driver. I have two brothers and one sister. My grandmother is old, but she is very funny.', 'Meu nome é Ana. Eu tenho uma família grande. Minha mãe é enfermeira e meu pai é motorista. Tenho dois irmãos e uma irmã. Minha avó é idosa, mas é muito engraçada.', [
          { q: 'What is Ana’s mother’s job?', opts: ['She is a nurse.', 'She is a driver.', 'She is a teacher.'], a: 0, why: 'O texto diz: *My mother is a nurse.*' },
          { q: 'Choose the correct sentence.', opts: ['Ana has two brothers.', 'Ana has one brother.', 'Ana has three brothers.'], a: 0, why: 'O texto diz: *I have two brothers*.' },
          { q: 'Her grandmother is…', opts: ['old and funny', 'young and tall', 'sad'], a: 0, why: 'O texto diz: *old, but she is very funny*.' },
        ]),
        Q.gap('She ___ a brother.', 'has', 'Com *she* usamos **has**.', ['has', 'have', 'is']),
        Q.gap('We ___ a big family.', 'have', 'Com *we* usamos **have**.', ['have', 'has', 'is']),
        Q.fix('She have two sisters.', 'have', 'She has two sisters.', 'Com *he/she/it* usamos **has**.'),
        Q.bank('Eu tenho um irmão e uma irmã.', 'I have a brother and a sister.', ['has', 'am'], '*I have* + a brother and a sister.'),
        Q.type('Escreva em inglês: Ela tem duas irmãs.', ['She has two sisters.'], '*She has two sisters.* (plural: sisters).'),
      ],
    },
  ],
});
