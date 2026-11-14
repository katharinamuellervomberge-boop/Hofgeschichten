import { exerciseById } from "../training/uebungen";
import { HEALTH_LESSONS, SAFETY_CHECK_WHEN, SAFETY_QUESTIONS } from "./safety";
import type { Answers, CauseMatch, CoachProblemContent, CoachQuestion, CoachResult, Cond, SafetyFlag } from "./types";

/**
 * Rider Coach 1.0 – regelbasierte Auswertung. Reine Funktionen, ohne KI, ohne Server.
 *
 * Regeln: Jede Antwort kann Punkte an mögliche Ursachen vergeben (CoachOption.causes).
 * Eine Ursache wird nur gezeigt, wenn ihre Punkte MATCH_MIN erreichen – also wenn die Antworten
 * wirklich zu ihr passen. Trifft keine zu, sagt das Ergebnis offen, dass keine zuverlässige
 * Eingrenzung möglich ist. Es gibt keine Prozentwerte oder Wahrscheinlichkeiten.
 */

export const MATCH_MIN = 2;
export const MAX_CAUSES = 4;
export const MAX_EXERCISES = 4;
export const LEVEL_QUESTION = "stand";

export function condMet(c: Cond | undefined, a: Answers): boolean {
  if (!c) return true;
  if ("all" in c) return c.all.every((x) => condMet(x, a));
  if ("not" in c) return !condMet(c.not, a);
  return a[c.q] !== undefined && c.anyOf.includes(a[c.q]);
}

/** Alle Fragen in Reihenfolge: zuerst Sicherheitsprüfung, dann die Fragen des Problems, die bei diesen Antworten gelten */
export function activeQuestions(p: CoachProblemContent, a: Answers): CoachQuestion[] {
  return [...SAFETY_QUESTIONS, ...p.questions.filter((q) => condMet(q.showIf, a))];
}

export const isSafetyQuestion = (id: string) => SAFETY_QUESTIONS.some((q) => q.id === id);

export function nextQuestion(p: CoachProblemContent, a: Answers): CoachQuestion | null {
  return activeQuestions(p, a).find((q) => a[q.id] === undefined) ?? null;
}

/** Antworten von Fragen entfernen, die nach einer Änderung nicht mehr gestellt werden */
export function pruneAnswers(p: CoachProblemContent, a: Answers): Answers {
  let cur = { ...a };
  for (let i = 0; i < 10; i++) {
    const qs = activeQuestions(p, cur);
    const next: Answers = {};
    for (const q of qs) if (cur[q.id] !== undefined && q.options.some((o) => o.id === cur[q.id])) next[q.id] = cur[q.id];
    if (Object.keys(next).length === Object.keys(cur).length) return next;
    cur = next;
  }
  return cur;
}

export function progress(p: CoachProblemContent, a: Answers): { done: number; total: number } {
  const qs = activeQuestions(p, a);
  return { done: qs.filter((q) => a[q.id] !== undefined).length, total: qs.length };
}

function chosen(p: CoachProblemContent, a: Answers) {
  return activeQuestions(p, a)
    .map((q) => ({ q, o: q.options.find((o) => o.id === a[q.id]) }))
    .filter((x): x is { q: CoachQuestion; o: NonNullable<typeof x.o> } => !!x.o);
}

export function safetyFlags(p: CoachProblemContent, a: Answers): SafetyFlag[] {
  const f = new Set<SafetyFlag>();
  for (const { o } of chosen(p, a)) if (o.flag) f.add(o.flag);
  return [...f];
}

/** Ausbildungsstand → höchste Übungsstufe (1–3) */
export function levelCap(a: Answers): 1 | 2 | 3 {
  switch (a[LEVEL_QUESTION]) {
    case "anfaenger":
      return 1;
    case "fortgeschritten":
      return 3;
    default:
      return 2;
  }
}

/** Ursachen, deren Regeln zutreffen – mit den Antworten, die dafür sprechen */
export function matchCauses(p: CoachProblemContent, a: Answers): CauseMatch[] {
  const pts = new Map<string, number>();
  const why = new Map<string, string[]>();
  for (const { o } of chosen(p, a))
    for (const [cid, w] of Object.entries(o.causes ?? {})) {
      pts.set(cid, (pts.get(cid) ?? 0) + w);
      why.set(cid, [...(why.get(cid) ?? []), o.label]);
    }
  return p.causes
    .map((c, i) => ({ c, i, s: pts.get(c.id) ?? 0 }))
    .filter((x) => x.s >= MATCH_MIN)
    .sort((x, y) => y.s - x.s || x.i - y.i)
    .map(({ c }) => ({ id: c.id, title: c.title, text: c.text, because: why.get(c.id) ?? [], exercises: c.exercises }));
}

/** Vollständige Auswertung. Darf nur aufgerufen werden, wenn alle Fragen beantwortet sind. */
export function evaluate(p: CoachProblemContent, answers: Answers): CoachResult {
  const a = pruneAnswers(p, answers);
  const flags = safetyFlags(p, a);
  const stop = flags.includes("stopp");
  const check = flags.includes("abklaeren");
  const all = matchCauses(p, a);
  const healthCauses = all.filter((c) => p.causes.find((x) => x.id === c.id)?.health);
  const training = all.filter((c) => !healthCauses.includes(c)).slice(0, MAX_CAUSES);
  const cap = levelCap(a);
  const notes: string[] = [];

  const reasons = chosen(p, a)
    .filter(({ o }) => o.flag)
    .map(({ o }) => o.summary ?? o.label);
  const health = stop || check || healthCauses.length ? { level: (stop ? "stopp" : "abklaeren") as SafetyFlag, reasons, checkWhen: [...SAFETY_CHECK_WHEN, ...p.checkWhen] } : null;

  const status: CoachResult["status"] = stop ? "stopp" : check || healthCauses.length ? "abklaeren" : training.length ? "ok" : "unklar";

  // Übungen: aus den passenden Ursachen, gefiltert nach Stand und Sicherheit
  let exercises: string[] = [];
  if (!stop) {
    const pool = training.length ? training.flatMap((c) => c.exercises) : p.fallback;
    const allowed = (id: string) => {
      const e = exerciseById(id);
      if (!e || e.level > cap) return false;
      if (status === "abklaeren") return p.gentle.includes(id);
      return true;
    };
    exercises = [...new Set(pool)].filter(allowed);
    if (exercises.length < 2) exercises = [...new Set([...exercises, ...(status === "abklaeren" ? p.gentle : p.fallback)])].filter(allowed);
    exercises = exercises.slice(0, MAX_EXERCISES);
    const dropped = [...new Set(pool)].filter((id) => (exerciseById(id)?.level ?? 0) > cap);
    if (dropped.length && status !== "abklaeren") notes.push("Einige Übungen sind für deinen Stand noch zu anspruchsvoll und werden nicht gezeigt. Übe solche Inhalte gemeinsam mit deiner Reitlehrkraft.");
  }
  if (stop) notes.push("Wegen der Hinweise auf Schmerzen oder Unwohlsein zeigen wir keine Übungen mit Pferd und keinen Trainingsplan. Bitte lass dein Pferd zuerst untersuchen.");
  else if (status === "abklaeren") notes.push("Bis zur Abklärung empfehlen wir nur ruhige, wenig belastende Übungen.");
  if (status === "unklar") notes.push("Deine Angaben reichen nicht für eine zuverlässige Eingrenzung. Die Übungen unten sind Grundlagen, die bei diesem Problem allgemein sinnvoll sind. Eine Reitlehrkraft vor Ort kann genauer hinschauen.");
  if (a["q-reiter"] === "weiss-nicht") notes.push("Tipp: Lass dich beim Reiten filmen – so siehst du selbst, was dein Sitz und deine Hände machen.");

  const summary = chosen(p, a)
    .filter(({ q }) => q.id !== LEVEL_QUESTION)
    .map(({ o }) => o.summary)
    .filter((s): s is string => !!s);

  const lessons = [...new Set([...(health ? HEALTH_LESSONS : []), ...p.lessons, ...exercises.flatMap((id) => exerciseById(id)?.lessons ?? [])])].slice(0, health ? 5 : 4);
  const riderLab = [...new Set([...p.riderLab, ...exercises.flatMap((id) => exerciseById(id)?.rl ?? [])])].slice(0, 3);

  return {
    problemId: p.id,
    status,
    summary,
    causes: [...training, ...healthCauses],
    health,
    notes,
    understand: p.understand,
    exercises,
    lessons,
    riderLab,
    planAllowed: !stop,
    source: "regelbasiert 1.0",
  };
}

/** Planvorlage → Wochen mit Übungen, nur aus erlaubten Übungen (Ergebnis) */
export function planWeeks(p: CoachProblemContent, allowed: string[], weeks: number): { title: string; focus: string; exercises: string[] }[] {
  const n = Math.min(8, Math.max(2, Math.round(weeks)));
  const base = p.plan.weeks.map((w) => ({ ...w, exercises: w.exercises.filter((id) => allowed.includes(id)) }));
  const fill = (w: (typeof base)[number]) => (w.exercises.length ? w : { ...w, exercises: allowed.slice(0, 2) });
  if (n === base.length) return base.map(fill);
  const last = base[base.length - 1];
  const body = base.slice(0, -1);
  if (n > base.length) return [...body, ...Array.from({ length: n - base.length }, (_, i) => ({ ...body[body.length - 1], title: `Festigen (${i + 1})` })), last].map(fill);
  const per = Math.ceil(body.length / (n - 1));
  const groups = [];
  for (let i = 0; i < body.length; i += per) {
    const part = body.slice(i, i + per);
    groups.push({ title: part.map((w) => w.title).join(" + "), focus: part.map((w) => w.focus).join(", "), exercises: [...new Set(part.flatMap((w) => w.exercises))] });
  }
  return [...groups, last].map(fill);
}
