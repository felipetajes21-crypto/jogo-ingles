/* Teste de nivelamento: 4 perguntas por mundo (lvl = mundo). O teste para quando o aluno erra 2 no mesmo nível. */
LG.placement = [
  // Mundo 1 (A0/A1)
  Object.assign(Q.mc('Como se diz “Bom dia” em inglês?', ['Good morning', 'Good night', 'Goodbye', 'Thank you'], 0, '“Good morning” = bom dia (até o meio-dia). “Good night” é só para se despedir à noite.'), { lvl: 1 }),
  Object.assign(Q.gap('She ___ my sister.', 'is', 'Com he/she/it usamos *is*.', ['is', 'are', 'am']), { lvl: 1 }),
  Object.assign(Q.mc('Qual número é “fifteen”?', ['15', '50', '5', '51'], 0, '*-teen* = 13 a 19. *fifty* é 50.'), { lvl: 1 }),
  Object.assign(Q.gap('I ___ from Brazil.', 'am', 'Com *I* usamos *am*: I am (I’m).', ['am', 'is', 'are']), { lvl: 1 }),
  // Mundo 2 (A1)
  Object.assign(Q.gap('He ___ to work every day.', 'goes', 'No present simple, he/she/it recebem -s/-es: *goes*.', ['go', 'goes', 'going']), { lvl: 2 }),
  Object.assign(Q.gap('Do you ___ coffee?', 'like', 'Depois de *do/does* o verbo fica na forma base: *like*.', ['like', 'likes', 'liking']), { lvl: 2 }),
  Object.assign(Q.mc('Qual é a forma mais educada de pedir um café?', ['I’d like a coffee, please.', 'Give me coffee.', 'I want coffee now.', 'Coffee!'], 0, '*I’d like…, please* é o pedido educado padrão.'), { lvl: 2 }),
  Object.assign(Q.gap('There ___ two books on the table.', 'are', 'Plural → *there are*.', ['is', 'are', 'am']), { lvl: 2 }),
  // Mundo 3 (A2)
  Object.assign(Q.gap('Yesterday I ___ to the cinema.', 'went', '*go* é irregular: passado = *went*.', ['go', 'went', 'goed', 'gone']), { lvl: 3 }),
  Object.assign(Q.gap('Did you ___ the movie?', 'see', 'Depois de *did* o verbo volta à forma base: *see*.', ['see', 'saw', 'seen']), { lvl: 3 }),
  Object.assign(Q.gap('This phone is ___ than that one.', 'cheaper', 'Adjetivo curto + *-er* + *than*: *cheaper than*.', ['cheaper', 'more cheap', 'cheapest']), { lvl: 3 }),
  Object.assign(Q.gap('Look at the sky! It ___ rain.', 'is going to', 'Previsão com evidência no presente: *going to*.', ['is going to', 'did', 'was']), { lvl: 3 }),
  // Mundo 4 (B1)
  Object.assign(Q.gap('I ___ never been to Japan.', 'have', 'Present perfect: *have/has + particípio* (*been*).', ['have', 'had', 'am']), { lvl: 4 }),
  Object.assign(Q.gap('You ___ wear a seat belt. It is the law.', 'must', '*must* expressa obrigação forte, como uma lei.', ['must', 'might', 'can']), { lvl: 4 }),
  Object.assign(Q.gap('If it rains, we ___ stay at home.', 'will', 'Condicional 1: *if* + present, *will* + verbo.', ['will', 'would', 'did']), { lvl: 4 }),
  Object.assign(Q.gap('If I ___ rich, I would travel the world.', 'were', 'Condicional 2: *if* + passado (*were* para todos), *would* + verbo.', ['were', 'am', 'will be']), { lvl: 4 }),
  // Mundo 5 (B2)
  Object.assign(Q.mc('If I had studied, I ___ the exam.', ['would have passed', 'would pass', 'will pass', 'passed'], 0, 'Condicional 3: *if* + past perfect, *would have* + particípio.'), { lvl: 5 }),
  Object.assign(Q.mc('She said that she ___ tired.', ['was', 'is', 'will be', 'be'], 0, 'No discurso indireto, o verbo recua no tempo: *is* → *was*.'), { lvl: 5 }),
  Object.assign(Q.mc('The man ___ lives next door is a doctor.', ['who', 'which', 'whose', 'where'], 0, 'Para pessoas usamos *who* (ou *that*).'), { lvl: 5 }),
  Object.assign(Q.mc('“It’s a piece of cake” significa…', ['É muito fácil', 'É uma sobremesa', 'É muito caro', 'É perigoso'], 0, '*A piece of cake* é um idiom: algo muito fácil.'), { lvl: 5 }),
  // Mundo 6 (C1)
  Object.assign(Q.mc('___ the rain, we went for a walk.', ['In spite of', 'Because', 'Although of', 'Despite that of'], 0, '*In spite of* + substantivo = apesar de.'), { lvl: 6 }),
  Object.assign(Q.mc('Not only ___ late, but he also forgot the documents.', ['was he', 'he was', 'did he was', 'he is'], 0, 'Depois de *Not only* no início da frase, há inversão: *was he*.'), { lvl: 6 }),
  Object.assign(Q.mc('It is widely believed ___ the economy will recover.', ['that', 'what', 'which', 'of'], 0, '*It is believed that…* = acredita-se que…'), { lvl: 6 }),
  Object.assign(Q.mc('Qual frase é a mais formal?', ['I would be grateful if you could confirm receipt.', 'Tell me you got it.', 'Did you get it or what?', 'Gimme a quick reply.'], 0, 'Fórmulas como *I would be grateful if…* são típicas do inglês formal.'), { lvl: 6 }),
];
