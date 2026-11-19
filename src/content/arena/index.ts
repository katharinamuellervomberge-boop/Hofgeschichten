import { WELLE_1 } from "./exercises/bahnfiguren";
import { WELLE_2 } from "./exercises/uebergaenge";
import { zirkel } from "./exercises/zirkel";
import { insideSide, resolveLetters } from "./geometry";
import type { ArenaExercise, ArenaSize, Evidence, QuizQuestion, Rein } from "./types";

/**
 * Die Reitbahn – Übungsverzeichnis. Neue Übungen: Datei in exercises/ anlegen und hier eintragen.
 * Trainingsplaner und Lernpfade greifen über getArenaExercise(id) zu.
 */
export const ARENA_EXERCISES: ArenaExercise[] = [zirkel, ...WELLE_1, ...WELLE_2];

/** Varianten derselben Figur (z. B. Volte 10 m / 8 m); ohne Gruppe nur die Übung selbst */
export const variantsOf = (ex: ArenaExercise) => (ex.group ? ARENA_EXERCISES.filter((e) => e.group === ex.group) : [ex]);

/** Je Figur ein Eintrag (die erste Variante) – für die Übersicht */
export const arenaFigures = () => ARENA_EXERCISES.filter((e) => !e.group || variantsOf(e)[0] === e);

export const getArenaExercise = (idOrSlug: string) => ARENA_EXERCISES.find((e) => e.id === idOrSlug || e.slug === idOrSlug);

/** Die Reitbahn gehört zum Riding Space */
export const arenaHref = (ex: Pick<ArenaExercise, "slug">) => `/tagebuch/reitbahn/${ex.slug}`;

/** Richtige Antwort einer Frage für Hand und Bahngröße */
export function quizAnswer(q: QuizQuestion, rein: Rein, size: ArenaSize): string {
  if (typeof q.answer === "string") return q.answer;
  const inside = insideSide(rein === "links" ? "links" : "rechts") ?? rein;
  const other = inside === "links" ? "rechts" : "links";
  switch (q.answer.rule) {
    case "innenSeite":
      return inside;
    case "aussenSeite":
    case "innenSeiteNeu":
      return other;
    case "aussenSeiteNeu":
      return inside;
    default:
      return size === "20x40" ? "X" : "L2";
  }
}

/** Platzhalter für die gewählte Starthand: {hand} {innen} {aussen}, nach dem Handwechsel {neueHand} {neuInnen} {neuAussen}; Buchstaben [H].
 *  Englisch (übersetzte Texte): alle Platzhalter werden zu „left“/„right“. */
export function fillText(text: string, rein: Rein, locale: "de" | "en" = "de"): string {
  const l = rein === "links";
  if (locale === "en") {
    const [own, other] = l ? ["left", "right"] : ["right", "left"];
    return resolveLetters(
      text
        .replaceAll("{neueHand}", other)
        .replaceAll("{neuInnen}", other)
        .replaceAll("{neuAussen}", own)
        .replaceAll("{hand}", own)
        .replaceAll("{innen}", own)
        .replaceAll("{aussen}", other),
      !l,
    );
  }
  return resolveLetters(
    text
      .replaceAll("{neueHand}", l ? "rechten" : "linken")
      .replaceAll("{neuInnen}", l ? "rechte" : "linke")
      .replaceAll("{neuAussen}", l ? "linke" : "rechte")
      .replaceAll("{hand}", l ? "linken" : "rechten")
      .replaceAll("{innen}", l ? "linke" : "rechte")
      .replaceAll("{aussen}", l ? "rechte" : "linke"),
    !l,
  );
}

/** Herkunft einer Aussage – wird bei jeder Erklärung angezeigt */
export const EVIDENCE_LABEL: Record<Evidence, string> = { lehre: "Reitlehre", biomechanik: "Biomechanik", vereinfachung: "Vereinfachung" };
