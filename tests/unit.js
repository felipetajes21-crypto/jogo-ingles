/* Testes unitários do motor (sem navegador):  node tests/unit.js */
const assert = require('assert');
globalThis.LG = {};
['js/util.js', 'js/answer.js', 'js/srs.js'].forEach((f) => require('../' + f));
const A = LG.Answer, SRS = LG.SRS;
let n = 0; const t = (name, fn) => { fn(); n++; console.log('  ✓', name); };

t('maiúsculas, espaços e pontuação são ignorados', () => {
  assert(A.isCorrect('  I AM a student  ', ['I am a student.']));
  assert(A.isCorrect('i am a student!!!', ['I am a student.']));
  assert(!A.isCorrect('', ['I am a student.']));
});
t('contrações equivalem à forma completa (nos dois sentidos)', () => {
  assert(A.isCorrect("I'm happy", ['I am happy.']));
  assert(A.isCorrect('I am happy', ["I'm happy."]));
  assert(A.isCorrect('She’s a nurse', ['She is a nurse.']));     // apóstrofo curvo
  assert(A.isCorrect("They aren't here", ['They are not here.']));
  assert(A.isCorrect("It isn't big", ['It is not big']));
  assert(A.isCorrect("I can't swim", ['I cannot swim']));
  assert(A.isCorrect("I don't know", ['I do not know.']));
  assert(A.isCorrect("You're welcome", ['you are welcome']));
});
t('hífens equivalem a espaços (twenty-one)', () => {
  assert(A.isCorrect('twenty one', ['twenty-one']));
  assert(A.isCorrect('twenty-one', ['twenty one']));
});
t('respostas erradas são rejeitadas', () => {
  assert(!A.isCorrect('She are a nurse', ['She is a nurse.']));
  assert(!A.isCorrect('I am a student', ['I am a teacher.']));
  assert(!A.isCorrect('red car', ['a red car']));
  assert(!A.isCorrect('forty', ['fourty']));
});
t('ordem das palavras importa', () => {
  assert(!A.isCorrect('a car red', ['a red car']));
});
t('quase certo é detectado só para dica', () => {
  assert(A.isNear('hapy', ['happy']));
  assert(!A.isNear('cat', ['cot']));
});
t("SRS: acerto aumenta intervalo; erro volta rápido", () => {
  const now = 1000000; let c = SRS.newCard(now);
  SRS.grade(c, 4, now); assert.strictEqual(c.interval, 1);
  SRS.grade(c, 4, now); assert.strictEqual(c.interval, 3);
  SRS.grade(c, 5, now); assert(c.interval >= 7, 'intervalo ' + c.interval);
  const before = c.ef;
  SRS.grade(c, 1, now);
  assert.strictEqual(c.reps, 0); assert.strictEqual(c.lapses, 1);
  assert(c.due - now <= 10 * 60 * 1000, 'erro volta em até 10 min');
  assert(before >= 1.3 && c.ef >= 1.3);
});
t('SRS: ef nunca cai abaixo de 1.3', () => {
  let c = SRS.newCard(0); for (let i = 0; i < 50; i++) SRS.grade(c, 3, 0);
  assert(c.ef >= 1.3);
});
t('embaralhar mantém os elementos', () => {
  const a = [1, 2, 3, 4, 5]; const b = LG.shuffle(a);
  assert.deepStrictEqual(b.slice().sort(), a); assert.deepStrictEqual(a, [1, 2, 3, 4, 5]);
});
console.log(`\n✅ ${n} testes unitários ok`);
