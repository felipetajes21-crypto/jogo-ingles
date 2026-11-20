/* Repetição espaçada — SM-2 simplificado. q: 0-5 (<3 = errou). */
(function (root) {
  const LG = (root.LG = root.LG || {});
  const DAY = 864e5;

  LG.SRS = {
    DAY,
    newCard(now) {
      return { ef: 2.5, reps: 0, interval: 0, due: now, lapses: 0, seen: 0, ok: 0 };
    },
    grade(c, q, now) {
      now = now || Date.now();
      c.seen++;
      if (q < 3) {
        c.reps = 0; c.interval = 0; c.lapses++;
        c.due = now + 10 * 60 * 1000; // volta logo
      } else {
        c.ok++; c.reps++;
        if (c.reps === 1) c.interval = 1;
        else if (c.reps === 2) c.interval = 3;
        else c.interval = Math.max(1, Math.round(c.interval * c.ef));
        c.ef = Math.max(1.3, c.ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
        c.due = now + c.interval * DAY;
      }
      return c;
    },
    isDue(c, now) { return c.due <= (now || Date.now()); },
  };
  if (typeof module !== 'undefined') module.exports = LG.SRS;
})(typeof globalThis !== 'undefined' ? globalThis : window);
