/**
 * Die Spielarten des Adventskalenders.
 *
 * Vier der fünf Spielkomponenten bauen auf dem vorhandenen Spielkern (src/engine) auf –
 * so funktionieren Tippen, Ziehen, Tastatur, Rückmeldungen und „nochmal versuchen“
 * genau wie in den Hofspielen und der Reitakademie:
 *
 *   QuizGame      → Multiple Choice mit Erklärung (Schritt „choice“, bei Mehrfachauswahl „multi“)
 *   MatchGame     → Zuordnen per Ziehen oder Tippen (Schritt „match“)
 *   FindGame      → Dinge in einer Illustration entdecken (Schritt „hotspots“)
 *   DecisionGame  → Situationen mit pädagogischer Rückmeldung zu jeder Wahl (Schritt „choice“, Listenform)
 *   DecorateGame  → eigene Komponente: Dekorationen auswählen und im Stall platzieren
 *                   (features/advent/DecorateGame.tsx, auch für die Weihnachtskarte)
 *
 * Geheimschrift (Türchen 8, 23) und Zahlencode (Türchen 17) nutzen die vorhandenen
 * Rätsel-Schritte „cipher“ und „code“. Falsche Antworten führen nie zum Scheitern:
 * Jede Antwort kann erneut versucht werden.
 */
import type { ChoiceStep, HotspotStep, MatchStep, MultiStep, Step, StoryStep, Visual } from "@/engine/types";

export type GameKind = "quiz" | "match" | "find" | "decision" | "decorate" | "card" | "cipher" | "code" | "finale";

export const GAME_LABEL: Record<GameKind, string> = {
  quiz: "Quiz",
  match: "Zuordnen",
  find: "Suchspiel",
  decision: "Entscheiden",
  decorate: "Schmücken",
  card: "Karte gestalten",
  cipher: "Geheimschrift",
  code: "Zahlencode",
  finale: "Großes Finale",
};

/* ---------- QuizGame ---------- */

export type QuizQuestion = {
  q: string;
  visual?: Visual;
  /** Richtige Antwort mit `correct` markieren. Die App mischt nicht – die Reihenfolge hier bewusst abwechseln. */
  options: Array<{ label: string; correct?: boolean; feedback?: string; visual?: Visual }>;
  explain: string;
  pictures?: boolean;
};

export function quizGame(prefix: string, questions: QuizQuestion[]): ChoiceStep[] {
  return questions.map((x, i) => ({
    type: "choice",
    id: `${prefix}-q${i + 1}`,
    prompt: x.q,
    visual: x.visual,
    layout: x.pictures ? "pictures" : "list",
    options: x.options.map((o, j) => ({ id: `o${j + 1}`, label: o.label, correct: o.correct, feedback: o.feedback, visual: o.visual })),
    explain: x.explain,
  }));
}

/** Mehrere richtige Antworten antippen, dann prüfen */
export function multiQuiz(
  id: string,
  q: string,
  options: Array<{ label: string; correct?: boolean; feedback?: string; visual?: Visual }>,
  missing: string,
  explain: string,
  visual?: Visual,
): MultiStep {
  return {
    type: "multi",
    id,
    prompt: q,
    visual,
    options: options.map((o, j) => ({ id: `o${j + 1}`, ...o })),
    missing,
    explain,
  };
}

/* ---------- MatchGame ---------- */

export function matchGame(
  id: string,
  prompt: string,
  targets: Array<{ id: string; label: string; visual?: Visual }>,
  items: Array<{ id: string; label: string; visual: Visual; target: string; say: string; wrong?: string }>,
): MatchStep {
  return { type: "match", id, prompt, targets, items };
}

/* ---------- FindGame ---------- */

type Spot = { x: number; y: number; r: number };

export function findGame(
  id: string,
  scene: string,
  prompt: string,
  targets: Array<{ id: string; label: string; spot: Spot; say: string }>,
  decoys: Array<{ id: string; label: string; spot: Spot; say: string }> = [],
  missHint = "Da ist nichts. Schau noch einmal genau hin!",
): HotspotStep {
  return {
    type: "hotspots",
    id,
    scene: { kind: "scene", scene },
    prompt,
    mode: "collect",
    targets: targets.map((t) => ({ id: t.id, label: t.label, x: t.spot.x, y: t.spot.y, r: t.spot.r, say: t.say })),
    decoys: decoys.map((d) => ({ id: d.id, label: d.label, x: d.spot.x, y: d.spot.y, r: d.spot.r, say: d.say })),
    missHint,
  };
}

/* ---------- DecisionGame ---------- */

export type Decision = {
  situation: string;
  visual?: Visual;
  /** Jede Wahl bekommt eine Rückmeldung. `best` = die gute Entscheidung */
  choices: Array<{ label: string; best?: boolean; feedback: string }>;
  /** Was die Kinder aus der guten Entscheidung lernen */
  why: string;
};

export function decisionGame(prefix: string, decisions: Decision[]): ChoiceStep[] {
  return decisions.map((d, i) => ({
    type: "choice",
    id: `${prefix}-d${i + 1}`,
    prompt: d.situation,
    visual: d.visual,
    layout: "list",
    options: d.choices.map((c, j) => ({ id: `c${j + 1}`, label: c.label, correct: c.best, feedback: c.best ? undefined : c.feedback })),
    explain: `${d.choices.find((c) => c.best)?.feedback ?? ""} ${d.why}`.trim(),
  }));
}

/* ---------- Kurzer Erzählschritt (z. B. ein Fundstück zeigen) ---------- */

export function storyStep(id: string, text: string, visual?: Visual, speaker?: string): StoryStep {
  return { type: "story", id, text, visual, speaker };
}

export type { Step };
