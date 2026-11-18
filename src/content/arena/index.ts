import { zirkel } from "./exercises/zirkel";
import { insideSide } from "./geometry";
import type { ArenaExercise, ArenaSize, Evidence, QuizQuestion, Rein } from "./types";

/**
 * Die Reitbahn – Übungsverzeichnis. Neue Übungen: Datei in exercises/ anlegen und hier eintragen.
 * Trainingsplaner und Lernpfade greifen über getArenaExercise(id) zu.
 */
export const ARENA_EXERCISES: ArenaExercise[] = [zirkel];

export const getArenaExercise = (idOrSlug: string) => ARENA_EXERCISES.find((e) => e.id === idOrSlug || e.slug === idOrSlug);

/** Die Reitbahn gehört zum Riding Space */
export const arenaHref = (ex: Pick<ArenaExercise, "slug">) => `/tagebuch/reitbahn/${ex.slug}`;

/** Richtige Antwort einer Frage für Hand und Bahngröße */
export function quizAnswer(q: QuizQuestion, rein: Rein, size: ArenaSize): string {
  if (typeof q.answer === "string") return q.answer;
  const inside = insideSide(rein === "links" ? "links" : "rechts") ?? rein;
  if (q.answer.rule === "innenSeite") return inside;
  if (q.answer.rule === "aussenSeite") return inside === "links" ? "rechts" : "links";
  return size === "20x40" ? "X" : "L2";
}

/** Platzhalter {hand} {innen} {aussen} für die gewählte Hand */
export function fillText(text: string, rein: Rein): string {
  const inside = rein;
  const outside = rein === "links" ? "rechte" : "linke";
  return text
    .replaceAll("{hand}", rein === "links" ? "linken" : "rechten")
    .replaceAll("{innen}", inside === "links" ? "linke" : "rechte")
    .replaceAll("{aussen}", outside);
}

/** Herkunft einer Aussage – wird bei jeder Erklärung angezeigt */
export const EVIDENCE_LABEL: Record<Evidence, string> = { lehre: "Reitlehre", biomechanik: "Biomechanik", vereinfachung: "Vereinfachung" };
