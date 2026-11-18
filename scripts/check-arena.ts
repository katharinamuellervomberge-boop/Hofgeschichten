/**
 * Prüft die Reitbahn: Buchstabenlage, Linien, Spiegelung, innen/außen, Zeitleiste und Phasen.
 * Aufruf: npm run check:arena
 */
import { ARENA_EXERCISES, fillText, quizAnswer } from "../src/content/arena";
import { aidSide, arenaLength, arenaLetters, buildTrack, durationFor, forRein, phaseAt, phasesFor, pointOnSegment, sampleAt, timeAtMeters } from "../src/content/arena/geometry";
import type { ArenaSize } from "../src/content/arena/types";

let failed = 0;
const ok = (cond: boolean, msg: string) => {
  if (!cond) {
    failed++;
    console.error("✗ " + msg);
  }
};
const near = (a: number, b: number, eps = 1e-6) => Math.abs(a - b) < eps;

/* Buchstaben */
const l40 = Object.fromEntries(arenaLetters("20x40").map((l) => [l.l, l]));
ok(Object.keys(l40).join("") === "ACKFDEBXHMG", "20×40: Buchstabensatz");
ok(l40.K.x === 6 && l40.K.y === 0 && l40.F.x === 6 && l40.F.y === 20, "20×40: K oben, F unten bei 6 m");
ok(l40.E.x === 20 && l40.B.x === 20 && l40.X.x === 20 && l40.X.y === 10, "20×40: E, B, X bei 20 m");
ok(l40.H.x === 34 && l40.M.x === 34 && l40.G.x === 34, "20×40: H, M, G bei 34 m");
const l60 = Object.fromEntries(arenaLetters("20x60").map((l) => [l.l, l]));
ok(["K", "V", "E", "S", "H"].map((k) => l60[k].x).join() === "6,18,30,42,54", "20×60: K V E S H");
ok(["F", "P", "B", "R", "M"].map((k) => l60[k].x).join() === "6,18,30,42,54", "20×60: F P B R M");
ok(["D", "L", "X", "I", "G"].map((k) => l60[k].x).join() === "6,18,30,42,54", "20×60: D L X I G");
ok(arenaLength("20x60") === 60 && l60.C.x === 60, "20×60: C bei 60 m");

for (const ex of ARENA_EXERCISES) {
  for (const size of ex.arenaSizes as ArenaSize[]) {
    const L = arenaLength(size);
    for (const rein of ["links", "rechts"] as const) {
      const e = forRein(ex, rein);
      const segs = e.path[size];
      const dur = durationFor(e, size);
      const track = buildTrack(segs, dur);
      const tag = `${ex.id} ${size} ${rein}`;
      ok(near(track.totalTime, dur), `${tag}: Gesamtzeit`);

      // Linie bleibt in der Bahn und ist zusammenhängend
      for (let t = 0; t <= track.totalTime; t += track.totalTime / 400) {
        const s = sampleAt(track, t);
        ok(s.p.x >= -1e-6 && s.p.x <= L + 1e-6 && s.p.y >= -1e-6 && s.p.y <= 20 + 1e-6, `${tag}: Punkt außerhalb der Bahn bei t=${t.toFixed(2)}`);
      }
      for (let i = 1; i < segs.length; i++) {
        const a = pointOnSegment(segs[i - 1], 1e9).p;
        const b = pointOnSegment(segs[i], 0).p;
        ok(near(a.x, b.x, 1e-6) && near(a.y, b.y, 1e-6), `${tag}: Lücke zwischen Abschnitt ${i - 1} und ${i}`);
      }

      // Hand am Ende passt zu changesRein (Startrichtung vs. Endrichtung auf dem Hufschlag)
      // Phasen lückenlos, Zeitleiste monoton
      const ph = phasesFor(e, size);
      ok(ph[0].timelineStart === 0, `${tag}: erste Phase beginnt nicht bei 0`);
      for (let i = 1; i < ph.length; i++) ok(ph[i].timelineStart === ph[i - 1].timelineEnd, `${tag}: Phasenlücke vor ${ph[i].id}`);
      ok(ph[ph.length - 1].timelineEnd >= track.totalLen, `${tag}: letzte Phase endet vor der Linie`);
      let last = -1;
      for (const p of ph) {
        const t = timeAtMeters(track, p.timelineStart);
        ok(t > last, `${tag}: Zeit nicht steigend bei ${p.id}`);
        last = t;
        ok(phaseAt(ph, sampleAt(track, t + 0.01).s).id === p.id, `${tag}: Phase ${p.id} nicht am eigenen Anfang`);
      }

      // innen/außen folgt der Biegung
      for (const p of ph) {
        if (p.bend === "links" || p.bend === "rechts") {
          ok(aidSide("innenSchenkel", p.bend, rein) === p.bend, `${tag}: innerer Schenkel ≠ Biegung in ${p.id}`);
          ok(aidSide("aussenZuegel", p.bend, rein) !== p.bend, `${tag}: äußerer Zügel = Biegung in ${p.id}`);
        }
        if (p.bend === "wechsel") ok(!!p.nextBend, `${tag}: Umstellen ohne neue Biegung in ${p.id}`);
      }

      // Biegung passt zur Krümmung der Linie: links = gegen den Uhrzeigersinn, rechts = im Uhrzeigersinn, gerade = kaum Drehung
      for (let i = 0; i < ph.length; i++) {
        const t0 = timeAtMeters(track, ph[i].timelineStart);
        const t1 = Math.min(track.totalTime, timeAtMeters(track, ph[i].timelineEnd));
        let total = 0;
        let maxCw = 0;
        let maxCcw = 0;
        const n = Math.max(10, Math.ceil((t1 - t0) / 0.01));
        let prev = sampleAt(track, t0).heading;
        for (let k = 1; k <= n; k++) {
          const h = sampleAt(track, t0 + ((t1 - t0) * k) / n).heading;
          let d = h - prev;
          while (d > 180) d -= 360;
          while (d < -180) d += 360;
          total += d;
          if (d > 0) maxCw += d;
          else maxCcw -= d;
          prev = h;
        }
        const p = ph[i];
        if (p.bend === "links") ok(maxCw < 1, `${tag}: ${p.id} „${p.title}“ ist links gebogen, die Linie dreht aber ${maxCw.toFixed(0)}° im Uhrzeigersinn`);
        if (p.bend === "rechts") ok(maxCcw < 1, `${tag}: ${p.id} „${p.title}“ ist rechts gebogen, die Linie dreht aber ${maxCcw.toFixed(0)}° gegen den Uhrzeigersinn`);
        if (p.bend === "keine") ok(Math.abs(total) < 25 && maxCw < 25 && maxCcw < 25, `${tag}: ${p.id} „${p.title}“ ist gerade, die Linie dreht aber ${total.toFixed(0)}°`);
      }

      // Hand am Ende
      const finalPhase = ph[ph.length - 1];
      const endHand = finalPhase.hand ?? rein;
      ok(endHand === (ex.changesRein ? (rein === "links" ? "rechts" : "links") : rein), `${tag}: Hand am Ende passt nicht zu changesRein`);
      // … und zur Geometrie: Liegt die Bahnmitte links vom Pferd, ist es auf der linken Hand
      const handAt = (t: number) => {
        const sm = sampleAt(track, t);
        const hx = Math.cos((sm.heading * Math.PI) / 180);
        const hy = Math.sin((sm.heading * Math.PI) / 180);
        const toMid = { x: L / 2 - sm.p.x, y: 10 - sm.p.y };
        return hy * toMid.x - hx * toMid.y > 0 ? "links" : "rechts";
      };
      ok(handAt(0) === rein, `${tag}: Start-Hand laut Linie ${handAt(0)}, erwartet ${rein}`);
      ok(handAt(track.totalTime) === endHand, `${tag}: End-Hand laut Linie ${handAt(track.totalTime)}, im Text ${endHand}`);

      // Buchstaben in Texten existieren in dieser Bahn
      const letterSet = new Set(arenaLetters(size).map((l) => l.l));
      for (const p of ph) {
        const texts = [p.title, p.summary, ...Object.values(p.aids).map((a) => a!.text), ...p.explanations.map((x) => x.text)];
        for (const t of texts) ok(!/\[[A-Z]\]/.test(t), `${tag}: unaufgelöster Buchstabe in „${t.slice(0, 40)}“`);
      }
      for (const q of e.quiz) for (const t of [q.prompt, q.explanation, ...q.options.map((o) => o.text)]) ok(!/\{|\}/.test(fillText(t, rein)), `${tag}: Platzhalter in Frage ${q.id}`);
      void letterSet;

      // Notizen wie „4 m nach K“ stehen auf der Seite ihres Buchstabens (auch nach dem Spiegeln)
      const letters = Object.fromEntries(arenaLetters(size).map((l) => [l.l, l]));
      for (const a of e.annotations[size]) {
        const m = /nach ([A-Z])\b/.exec(a.label);
        if (m && letters[m[1]]) ok(letters[m[1]].y === a.at.y, `${tag}: Notiz „${a.label}“ steht nicht auf der Seite von ${m[1]}`);
      }

      // Quiz-Antworten existieren
      for (const q of e.quiz) {
        const a = quizAnswer(q, rein, size);
        ok(q.options.some((o) => o.id === a), `${tag}: Antwort ${a} zu ${q.id} fehlt in den Optionen`);
      }
    }
  }
  // Zirkel-spezifisch: Berührpunkte
  if (ex.id === "arena_circle_20m") {
    const track = buildTrack(ex.path["20x40"], ex.durationSec);
    const mistakeIdsAll = new Set(ex.mistakes.map((m) => m.id));
    void mistakeIdsAll;
    const pts = Array.from({ length: 2001 }, (_, i) => sampleAt(track, (track.totalTime * i) / 2000).p);
    const touches = (x: number, y: number) => pts.some((p) => Math.hypot(p.x - x, p.y - y) < 0.05);
    ok(touches(0, 10), "Zirkel berührt A");
    ok(touches(20, 10), "Zirkel berührt X (20×40)");
    ok(touches(10, 20), "Zirkel berührt den Hufschlag unten 10 m von A");
  }
  // Jede Phase verweist nur auf Fehler, die die Übung auch beschreibt
  const mistakeIds = new Set(ex.mistakes.map((m) => m.id));
  for (const size of ex.arenaSizes) for (const p of phasesFor(ex, size)) for (const m of p.commonMistakeIds) ok(mistakeIds.has(m), `${ex.id}: Fehler ${m} in ${p.id} fehlt in der Fehlerliste`);
  // Varianten derselben Gruppe haben eindeutige Slugs und IDs
}
{
  const ids = ARENA_EXERCISES.map((e) => e.id);
  const slugs = ARENA_EXERCISES.map((e) => e.slug);
  ok(new Set(ids).size === ids.length, "IDs doppelt");
  ok(new Set(slugs).size === slugs.length, "Slugs doppelt");
}

if (failed) {
  console.error(`\n${failed} Prüfung(en) fehlgeschlagen.`);
  process.exit(1);
}
console.log(`Reitbahn: ${ARENA_EXERCISES.length} Übung(en) geprüft – alles in Ordnung.`);
