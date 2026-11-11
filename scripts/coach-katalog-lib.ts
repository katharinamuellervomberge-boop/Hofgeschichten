/**
 * Rider Coach – Katalog (Übungstitel ohne Inhalte) und Prüfungen.
 * Genutzt von `npm run coach:katalog` und `npm run check:coach`.
 */
import { coachProblems } from "../src/content/coach/index";
import { activeQuestions, buildSolution, MAX_QUESTIONS, nextQuestion, programFromTemplate, type Answers } from "../src/content/coach/engine";
import { coachProblemData } from "../src/content/coach/probleme.server";
import { coachExercises } from "../src/content/coach/uebungen.server";
import type { CoachExerciseInfo, CoachProblem } from "../src/content/coach/types";
import { lessonExists, riderLabExerciseExists } from "../src/features/tagebuch/academyLinks";

export const COACH_CATALOG_PATH = "src/content/coach/katalog.generated.ts";

export function buildCoachCatalog(): CoachExerciseInfo[] {
  return coachExercises.map((e) => ({
    id: e.id,
    title: e.title,
    difficulty: e.difficulty,
    place: e.place,
    ...(e.easier ? { easier: e.easier } : {}),
    problems: coachProblemData.filter((p) => p.causes.some((c) => c.exercises.includes(e.id)) || p.plan.weeks.some((w) => w.exercises.includes(e.id))).map((p) => p.id),
  }));
}

/** Akademie-Lektion → Rider-Coach-Probleme (für den Hinweis in der Lektion) */
export function buildLessonLinks(): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const p of coachProblemData) for (const l of p.lessons) (out[l] ??= []).push(p.id);
  return Object.fromEntries(Object.entries(out).sort(([a], [b]) => a.localeCompare(b, "en", { numeric: true })));
}

export function buildCoachCatalogSource(): string {
  return `/* Automatisch erzeugt mit \`npm run coach:katalog\` – nicht von Hand ändern. */
import type { CoachExerciseInfo } from "./types";

/** Rider Coach: Übungen ohne Inhalte (Titel, Schwierigkeit, Ort, leichtere Variante, Probleme) */
export const coachExerciseCatalog: CoachExerciseInfo[] = ${JSON.stringify(buildCoachCatalog(), null, 2)};

/** Akademie-Lektion → passende Rider-Coach-Probleme */
export const coachLessonLinks: Record<string, string[]> = ${JSON.stringify(buildLessonLinks(), null, 2)};
`;
}

/** Alle Antwortwege eines Problems (Tiefensuche über die Verzweigungen) */
export function allPaths(p: CoachProblem, limit = 20000): Answers[] {
  const out: Answers[] = [];
  const walk = (a: Answers) => {
    if (out.length >= limit) return;
    const q = nextQuestion(p, a);
    if (!q) return void out.push(a);
    for (const o of q.options) walk({ ...a, [q.id]: o.id });
  };
  walk({});
  return out;
}

export function checkCoach(): string[] {
  const errors: string[] = [];
  const exIds = new Set(coachExercises.map((e) => e.id));
  const lib = Object.fromEntries(coachExercises.map((e) => [e.id, e]));

  // Übungen
  for (const e of coachExercises) {
    if (!/^rc-\d{2}$/.test(e.id)) errors.push(`Übung ${e.id}: ID muss rc-NN sein`);
    if (e.steps.length < 2) errors.push(`Übung ${e.id}: mindestens 2 Schritte`);
    if (e.mistakes.length < 1) errors.push(`Übung ${e.id}: häufige Fehler fehlen`);
    if (e.place !== "zuhause" && e.safety.length < 1) errors.push(`Übung ${e.id}: Sicherheitshinweis fehlt`);
    if (e.easier && !exIds.has(e.easier)) errors.push(`Übung ${e.id}: leichtere Variante ${e.easier} fehlt`);
    if (e.easier === e.id) errors.push(`Übung ${e.id}: verweist auf sich selbst`);
    if (e.media?.riderLab && !riderLabExerciseExists(e.media.riderLab)) errors.push(`Übung ${e.id}: Rider-Lab-Übung ${e.media.riderLab} fehlt`);
    if (e.media?.lesson && !lessonExists(e.media.lesson)) errors.push(`Übung ${e.id}: Lektion ${e.media.lesson} fehlt`);
  }
  if (new Set(coachExercises.map((e) => e.id)).size !== coachExercises.length) errors.push("Doppelte Übungs-IDs");

  // Katalog ↔ Daten
  const pub = new Map(coachProblems.map((p) => [p.id, p]));
  if (coachProblems.length !== coachProblemData.length) errors.push("index.ts und probleme.server.ts haben unterschiedlich viele Probleme");
  if (coachProblems.filter((p) => p.demo).length !== 1) errors.push("Genau ein Demo-Problem nötig");

  for (const p of coachProblemData) {
    const tag = `Problem ${p.id} (${p.slug})`;
    const info = pub.get(p.id);
    if (!info || info.slug !== p.slug || info.title !== p.title || info.category !== p.category) errors.push(`${tag}: passt nicht zu index.ts`);
    const qIds = new Set<string>();
    for (const q of p.questions) {
      if (qIds.has(q.id)) errors.push(`${tag}: doppelte Frage ${q.id}`);
      qIds.add(q.id);
      if (q.options.length < 2) errors.push(`${tag}/${q.id}: zu wenige Antworten`);
      const check = (c: unknown): void => {
        const x = c as { q?: string; anyOf?: string[]; all?: unknown[]; not?: unknown };
        if (x.all) return x.all.forEach(check);
        if (x.not) return check(x.not);
        const target = p.questions.find((y) => y.id === x.q);
        if (!target) return void errors.push(`${tag}/${q.id}: Bedingung auf unbekannte Frage ${x.q}`);
        if (p.questions.indexOf(target) >= p.questions.indexOf(q)) errors.push(`${tag}/${q.id}: Bedingung auf spätere Frage ${x.q}`);
        for (const o of x.anyOf ?? []) if (!target.options.some((y) => y.id === o)) errors.push(`${tag}/${q.id}: unbekannte Antwort ${x.q}=${o}`);
      };
      if (q.showIf) check(q.showIf);
      for (const o of q.options) for (const cid of Object.keys(o.weights ?? {})) if (!p.causes.some((c) => c.id === cid)) errors.push(`${tag}/${q.id}/${o.id}: unbekannte Ursache ${cid}`);
    }
    const first = p.questions[0];
    if (!first || first.safety || first.options.length < 3) errors.push(`${tag}: erste Frage braucht mindestens 3 Beobachtungen`);
    if (!p.questions.some((q) => q.id === "stand")) errors.push(`${tag}: Frage zum Ausbildungsstand fehlt`);
    if (p.causes.length < 2) errors.push(`${tag}: mindestens 2 Ursachen`);
    for (const c of p.causes) for (const id of c.exercises) if (!exIds.has(id)) errors.push(`${tag}/${c.id}: Übung ${id} fehlt`);
    for (const id of p.lessons) if (!lessonExists(id)) errors.push(`${tag}: Lektion ${id} fehlt`);
    for (const id of p.riderLab) if (!riderLabExerciseExists(id)) errors.push(`${tag}: Rider-Lab-Übung ${id} fehlt`);
    if (p.safety.length < 1 || p.checkWhen.length < 1) errors.push(`${tag}: Sicherheits- und Abklärungshinweise fehlen`);
    if (p.mistakes.length < 2 || p.nextLesson.length < 2) errors.push(`${tag}: typische Fehler / Tipps fehlen`);
    if (p.plan.weeks.length < 2) errors.push(`${tag}: Planvorlage braucht mindestens 2 Wochen`);
    for (const w of p.plan.weeks) for (const id of w.exercises) if (!exIds.has(id)) errors.push(`${tag}/Plan: Übung ${id} fehlt`);

    // Jeder Antwortweg: endet, max. 5 normale Fragen, genug Übungen (außer bei Stopp)
    const paths = allPaths(p);
    if (paths.length === 0) errors.push(`${tag}: kein Antwortweg`);
    let minEx = Infinity;
    for (const a of paths) {
      const qs = activeQuestions(p, a);
      const normal = qs.filter((q) => !q.safety).length;
      if (normal > MAX_QUESTIONS) errors.push(`${tag}: Weg mit ${normal} Fragen`);
      if (normal + qs.filter((q) => q.safety).length > MAX_QUESTIONS + 2) errors.push(`${tag}: Weg mit zu vielen Sicherheitsfragen`);
      const s = buildSolution(p, a, lib);
      if (s.causes.length < 2) errors.push(`${tag}: Weg ${JSON.stringify(a)} hat weniger als 2 Ursachen`);
      if (!s.flags.includes("stopp")) minEx = Math.min(minEx, s.exercises.length);
      if (s.flags.includes("stopp") && s.exercises.some((id) => lib[id].place !== "zuhause")) errors.push(`${tag}: Stopp-Weg zeigt Übungen mit Pferd`);
    }
    if (minEx < 2 && p.id !== "cp-03") errors.push(`${tag}: ein Weg hat weniger als 2 Übungen`);
    if (minEx < 1) errors.push(`${tag}: ein Weg hat keine Übung`);
    for (const n of [2, 3, 4, 6, 8]) {
      const prog = programFromTemplate(p, n);
      if (prog.length !== n) errors.push(`${tag}: Plan mit ${n} Wochen hat ${prog.length}`);
      if (prog.some((w) => w.exercises.length === 0)) errors.push(`${tag}: Planwoche ohne Übung (${n} Wochen)`);
    }
  }
  return errors;
}
