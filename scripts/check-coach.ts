/**
 * Prüft den Rider Coach: alle Antwortwege jedes vollständigen Falls, Sicherheitsregeln,
 * Verweise auf Übungen/Lektionen/Rider Lab und die Suche.  Aufruf: npm run check:coach
 */
import { readFileSync } from "node:fs";
import { COACH_CASES } from "../src/content/coach/cases";
import { activeQuestions, evaluate, isSafetyQuestion, levelCap, nextQuestion } from "../src/content/coach/engine";
import { COACH_PROBLEMS } from "../src/content/coach/problems";
import { searchProblems } from "../src/content/coach/search";
import type { Answers, CoachProblemContent } from "../src/content/coach/types";
import { EXERCISES, exerciseById } from "../src/content/training/uebungen";

const errors: string[] = [];
const fail = (m: string) => errors.push(m);
const lessonIds = new Set([...readFileSync("src/content/akademie/katalog.generated.ts", "utf8").matchAll(/"id": "(ra-w\d+-l\d+)"/g)].map((m) => m[1]));
const rlIds = new Set([...readFileSync("src/content/riderlab/uebungen.server.ts", "utf8").matchAll(/id: "(rl-[a-z0-9]+)"/g)].map((m) => m[1]));

/* Bibliothek */
const ids = new Set<string>();
for (const e of EXERCISES) {
  if (ids.has(e.id)) fail(`Übung doppelt: ${e.id}`);
  ids.add(e.id);
  if (e.steps.length < 3) fail(`${e.id}: zu wenige Schritte`);
  if (!e.stopWhen.length) fail(`${e.id}: „Wann abbrechen?“ fehlt`);
  for (const l of e.lessons) if (!lessonIds.has(l)) fail(`${e.id}: Lektion ${l} gibt es nicht`);
  for (const r of e.rl) if (!rlIds.has(r)) fail(`${e.id}: Rider-Lab-Übung ${r} gibt es nicht`);
}

/* Problemliste */
if (COACH_PROBLEMS.length !== 50) fail(`Problembibliothek hat ${COACH_PROBLEMS.length} statt 50 Einträge`);
for (const id of Object.keys(COACH_CASES)) if (!COACH_PROBLEMS.find((p) => p.id === id)) fail(`Fall ${id} ohne Eintrag in problems.ts`);

/* alle Antwortwege */
function* paths(c: CoachProblemContent, a: Answers): Generator<Answers> {
  const q = nextQuestion(c, a);
  if (!q) return yield a;
  for (const o of q.options) yield* paths(c, { ...a, [q.id]: o.id });
}
let total = 0;
for (const [id, c] of Object.entries(COACH_CASES)) {
  const causeIds = new Set(c.causes.map((x) => x.id));
  for (const q of c.questions) for (const o of q.options) for (const k of Object.keys(o.causes ?? {})) if (!causeIds.has(k)) fail(`${id} ${q.id}/${o.id}: Ursache ${k} fehlt`);
  for (const x of [...c.causes.flatMap((y) => y.exercises), ...c.fallback, ...c.gentle, ...c.plan.weeks.flatMap((w) => w.exercises)]) if (!exerciseById(x)) fail(`${id}: Übung ${x} fehlt`);
  for (const g of c.gentle) if ((exerciseById(g)?.level ?? 9) > 1 || exerciseById(g)?.cat === "galopp") fail(`${id}: schonende Übung ${g} ist nicht schonend`);
  for (const l of c.lessons) if (!lessonIds.has(l)) fail(`${id}: Lektion ${l} fehlt`);
  for (const r of c.riderLab) if (!rlIds.has(r)) fail(`${id}: Rider Lab ${r} fehlt`);
  const used = new Set<string>();
  for (const a of paths(c, {})) {
    total++;
    const n = activeQuestions(c, a).filter((q) => !isSafetyQuestion(q.id)).length;
    if (n < 4 || n > 7) fail(`${id}: ${n} Fragen bei ${JSON.stringify(a)}`);
    const r = evaluate(c, a);
    const tag = `${id} ${JSON.stringify(a)}`;
    if (a["s-schmerz"] === "ja") {
      if (r.status !== "stopp" || r.exercises.length || r.planAllowed) fail(`${tag}: Schmerz → muss stopp ohne Übungen sein`);
    }
    if (r.status === "abklaeren") {
      for (const e of r.exercises) if (!c.gentle.includes(e)) fail(`${tag}: bei abklären ungeeignete Übung ${e}`);
      if (!r.health) fail(`${tag}: Abklärungshinweis fehlt`);
    }
    if (r.status === "ok") {
      if (!r.causes.length) fail(`${tag}: ok ohne Ursache`);
      if (r.exercises.length < 2) fail(`${tag}: weniger als 2 Übungen`);
    }
    if (r.status === "unklar" && (r.causes.length || !r.notes.some((x) => x.includes("Eingrenzung")))) fail(`${tag}: unklar nicht transparent`);
    for (const x of r.causes) if (!x.because.length) fail(`${tag}: Ursache ${x.id} ohne Begründung`);
    for (const e of r.exercises) if ((exerciseById(e)?.level ?? 9) > levelCap(a)) fail(`${tag}: ${e} zu schwer`);
    for (const l of r.lessons) if (!lessonIds.has(l)) fail(`${tag}: Lektion ${l} fehlt`);
    r.causes.forEach((x) => used.add(x.id));
  }
  for (const x of causeIds) if (!used.has(x)) fail(`${id}: Ursache ${x} wird nie erreicht`);
}

/* Suche */
const expect: [string, string][] = [
  ["mein pferd rennt beim angaloppieren los", "cp-22"],
  ["stürmt los im galopp", "cp-22"],
  ["angalopieren zu schnell", "cp-22"],
  ["unruhige hände", "cp-06"],
  ["trab immer schneller", "cp-19"],
  ["fällt über die äußere schulter", "cp-29"],
  ["ich kippe nach vorne", "cp-01"],
  ["knie klemmen", "cp-09"],
  ["pferd ist faul und träge", "cp-11"],
  ["anlehnung schwankt", "cp-15"],
  ["kreuzgalopp", "cp-27"],
  ["schulterherein takt", "cp-38"],
  ["pferd scheut oft", "cp-45"],
  ["will nicht alleine ausreiten", "cp-46"],
  ["heimweg zu schnell", "cp-50"],
  ["fliegender galoppwechsel", "cp-44"],
];
for (const p of COACH_PROBLEMS) if (!p.ready) fail(`${p.id}: kein vollständiger Fall`);
for (const [q, want] of expect) {
  const top = searchProblems(q, { max: 3 }).map((h) => h.problem.id);
  if (!top.includes(want)) fail(`Suche „${q}“ findet ${want} nicht (gefunden: ${top.join(", ") || "nichts"})`);
}

if (errors.length) {
  console.error(errors.slice(0, 40).join("\n"));
  console.error(`\n${errors.length} Fehler`);
  process.exit(1);
}
console.log(`Rider Coach geprüft: ${Object.keys(COACH_CASES).length} Fall/Fälle, ${total} Antwortwege, ${EXERCISES.length} Übungen, Suche ok.`);
