import "server-only";
import type { ChoiceStep, Step } from "@/engine/types";
import { letterSpot } from "./build";
import { scene, type AcademyGame } from "./types";

/**
 * Mini-Spiele der GROSSEN Reitakademie – nur nach Freischaltung (Mitgliedschaft
 * oder Kauf „Große Reitakademie“). Verlassen den Server erst nach der Prüfung.
 */

/* ---------- 2. Gangarten-Quiz ---------- */

const gaitRound = (id: string, visual: string, correct: "schritt" | "trab" | "galopp", explain: string, levels?: ChoiceStep["levels"]): ChoiceStep => ({
  type: "choice",
  id,
  levels,
  prompt: { leicht: "Schau auf die Zahlen und zähle die Takte. Welche Gangart ist das?", mittel: "Welche Gangart zeigt diese Fußfolge?" },
  visual: { kind: "scene", scene: visual },
  layout: "list",
  options: [
    { id: "schritt", label: "Schritt", correct: correct === "schritt", feedback: correct === "schritt" ? undefined : "Der Schritt hat vier einzelne Takte." },
    { id: "trab", label: "Trab", correct: correct === "trab", feedback: correct === "trab" ? undefined : "Der Trab hat zwei Takte mit diagonalen Paaren." },
    { id: "galopp", label: "Galopp", correct: correct === "galopp", feedback: correct === "galopp" ? undefined : "Der Galopp hat drei Takte und eine Schwebephase." },
  ],
  explain,
});

const gangartenQuiz: AcademyGame = {
  id: "ra-spiel-gangarten",
  slug: "gangarten-quiz",
  title: "Gangarten-Quiz",
  teaser: "Schritt, Trab oder Galopp? Erkenne den Takt.",
  learns: "Schritt (Viertakt), Trab (Zweitakt) und Galopp (Dreitakt) an Fußfolge und Klang unterscheiden; in Stufe Mittel auch Rechts- und Linksgalopp.",
  tint: "#DDE3D6",
  cover: scene("ak-gang-trab"),
  activity: {
    id: "ra-spiel-gangarten",
    title: "Gangarten-Quiz",
    intro: {
      leicht: "Schritt, Trab oder Galopp? Zähle die Takte und finde die Gangart!",
      mittel: "Erkenne die Gangart an der Fußfolge und am Klang. In Stufe Mittel geht es auch um Rechts- und Linksgalopp.",
    },
    steps: [
      gaitRound("runde-1", "ak-takt-trab", "trab", "Richtig! Zwei Takte, immer zwei Beine über Kreuz: Trab."),
      gaitRound("runde-2", "ak-takt-schritt", "schritt", "Richtig! Vier einzelne Takte: Schritt."),
      gaitRound("runde-3", "ak-takt-galopp-links", "galopp", "Richtig! Drei Takte und dann schweben: Galopp."),
      {
        type: "choice",
        id: "klang",
        prompt: "Es klingt: ta-ta-tam, ta-ta-tam. Welche Gangart hörst du?",
        layout: "list",
        options: [
          { id: "schritt", label: "Schritt", feedback: "Schritt klingt wie klopf, klopf, klopf, klopf." },
          { id: "trab", label: "Trab", feedback: "Trab klingt wie ta-tam, ta-tam." },
          { id: "galopp", label: "Galopp", correct: true },
        ],
        explain: "Richtig! Drei Schläge und eine kleine Pause – das ist der Galopp.",
      },
      {
        type: "choice",
        id: "klang-trab",
        prompt: "Es klingt: ta-tam, ta-tam. Welche Gangart hörst du?",
        layout: "list",
        options: [
          { id: "schritt", label: "Schritt", feedback: "Schritt hat vier Schläge." },
          { id: "trab", label: "Trab", correct: true },
          { id: "galopp", label: "Galopp", feedback: "Galopp hat drei Schläge." },
        ],
        explain: "Richtig! Zwei Schläge: Trab.",
      },
      gaitRound("runde-4", "ak-takt-galopp-rechts", "galopp", "Richtig! Drei Takte mit Schwebephase: Galopp.", ["mittel"]),
      {
        type: "choice",
        id: "welcher-galopp",
        levels: ["mittel"],
        prompt: "Rechtsgalopp oder Linksgalopp? Schau, welche Beine weiter vorgreifen.",
        visual: { kind: "scene", scene: "ak-takt-galopp-links" },
        layout: "list",
        options: [
          { id: "links", label: "Linksgalopp", correct: true },
          { id: "rechts", label: "Rechtsgalopp", feedback: "Schau genau: Die linken Beine greifen weiter vor." },
          { id: "kreuz", label: "Kreuzgalopp", feedback: "Beim Kreuzgalopp würden vorne und hinten verschiedene Seiten vorgreifen. Hier sind es beide Male die linken." },
        ],
        explain: "Richtig! Die linken Beine greifen weiter vor – Linksgalopp.",
      },
      {
        type: "choice",
        id: "schwebe",
        levels: ["mittel"],
        prompt: "In welcher Gangart gibt es keine Schwebephase?",
        layout: "list",
        options: [
          { id: "schritt", label: "Schritt", correct: true },
          { id: "trab", label: "Trab", feedback: "Im Trab schwebt das Pferd kurz zwischen den Takten." },
          { id: "galopp", label: "Galopp", feedback: "Im Galopp folgt auf die drei Takte eine Schwebephase." },
        ],
        explain: "Richtig! Im Schritt sind immer zwei oder drei Hufe am Boden.",
      },
    ],
  },
};

/* ---------- 4. Bahnfiguren-Meister ---------- */

const figureRound = (id: string, figure: string, correct: string, explain: string, options: Array<{ id: string; label: string; feedback: string }>, levels?: Step["levels"]): ChoiceStep => ({
  type: "choice",
  id,
  levels,
  prompt: "Welche Bahnfigur siehst du?",
  visual: { kind: "scene", scene: `ak-bahn-${figure}` },
  layout: "list",
  options: [{ id: correct, label: labelOf(correct), correct: true }, ...options],
  explain,
});

const LABELS: Record<string, string> = {
  zirkel: "Zirkel",
  volte: "Volte",
  schlange: "Schlangenlinien",
  "ganze-bahn": "Ganze Bahn",
  handwechsel: "Durch die ganze Bahn wechseln",
  "halbe-bahn": "Durch die halbe Bahn wechseln",
  laenge: "Durch die Länge der Bahn wechseln",
};
function labelOf(id: string) {
  return LABELS[id] ?? id;
}

const bahnfigurenMeister: AcademyGame = {
  id: "ra-spiel-bahnfiguren",
  slug: "bahnfiguren-meister",
  title: "Bahnfiguren-Meister",
  teaser: "Zirkel, Volte, Schlangenlinie – erkennst du sie alle?",
  learns: "Bahnfiguren (ganze Bahn, Zirkel, Volte, Schlangenlinien, Handwechsel) erkennen und Bahnpunkte finden.",
  tint: "#DDE3D6",
  cover: scene("ak-bahn-schlange"),
  activity: {
    id: "ra-spiel-bahnfiguren",
    title: "Bahnfiguren-Meister",
    intro: {
      leicht: "Werde Bahnfiguren-Meister! Schau dir die Wege an und finde den richtigen Namen.",
      mittel: "Erkenne alle Bahnfiguren und Handwechsel – und finde die Bahnpunkte.",
    },
    steps: [
      figureRound("zirkel", "zirkel", "zirkel", "Richtig! Der große Kreis über die ganze Bahnbreite.", [
        { id: "volte", label: "Volte", feedback: "Die Volte ist viel kleiner." },
        { id: "ganze-bahn", label: "Ganze Bahn", feedback: "Ganze Bahn geht außen an allen Seiten entlang." },
      ]),
      figureRound("volte", "volte", "volte", "Richtig! Der kleine Kreis – eine Volte ist meist 6 bis 10 Meter groß.", [
        { id: "zirkel", label: "Zirkel", feedback: "Der Zirkel ist so breit wie die ganze Bahn." },
        { id: "schlange", label: "Schlangenlinien", feedback: "Schlangenlinien sind Bögen von einer Seite zur anderen." },
      ]),
      figureRound("schlange", "schlange", "schlange", "Richtig! Drei Bögen von A nach C.", [
        { id: "zirkel", label: "Zirkel", feedback: "Der Zirkel ist ein Kreis." },
        { id: "handwechsel", label: "Durch die ganze Bahn wechseln", feedback: "Beim Handwechsel geht es in einer geraden Linie schräg durch die Bahn." },
      ]),
      figureRound("ganze-bahn", "ganze-bahn", "ganze-bahn", "Richtig! Außen auf dem Hufschlag rundherum.", [
        { id: "zirkel", label: "Zirkel", feedback: "Der Zirkel ist rund und nur in einer Hälfte der Bahn." },
        { id: "volte", label: "Volte", feedback: "Die Volte ist ein kleiner Kreis." },
      ]),
      figureRound("handwechsel", "handwechsel", "handwechsel", "Richtig! Schräg von F über X nach H.", [
        { id: "halbe-bahn", label: "Durch die halbe Bahn wechseln", feedback: "Bei der halben Bahn endet die Linie in der Mitte der langen Seite." },
        { id: "laenge", label: "Durch die Länge der Bahn wechseln", feedback: "Durch die Länge geht es von A über X nach C." },
      ]),
      figureRound("halbe-bahn", "halbe-bahn", "halbe-bahn", "Richtig! Von F zur Mitte der gegenüberliegenden Seite bei E.", [
        { id: "handwechsel", label: "Durch die ganze Bahn wechseln", feedback: "Durch die ganze Bahn würde die Linie bis zur Ecke bei H gehen." },
        { id: "laenge", label: "Durch die Länge der Bahn wechseln", feedback: "Durch die Länge geht es auf der Mittellinie von A nach C." },
      ], ["mittel"]),
      figureRound("laenge", "laenge", "laenge", "Richtig! Auf der Mittellinie von A über X nach C.", [
        { id: "handwechsel", label: "Durch die ganze Bahn wechseln", feedback: "Durch die ganze Bahn geht es schräg von Ecke zu Ecke." },
        { id: "schlange", label: "Schlangenlinien", feedback: "Schlangenlinien haben Bögen – hier ist die Linie gerade." },
      ], ["mittel"]),
      {
        type: "hotspots",
        id: "punkte",
        scene: scene("ak-bahn-buchstaben"),
        prompt: "Finde die Bahnpunkte.",
        mode: "sequence",
        targets: [
          { ...letterSpot("X", "der Mittelpunkt X", "X ist genau in der Mitte."), r: 34 },
          letterSpot("A", "der Buchstabe A", "A steht an einer kurzen Seite."),
          letterSpot("E", "der Buchstabe E", "E steht in der Mitte der langen Seite."),
          letterSpot("M", "der Buchstabe M", "M steht nahe der Ecke bei C.", ["mittel"]),
          letterSpot("F", "der Buchstabe F", "F steht nahe der Ecke bei A.", ["mittel"]),
        ],
        missHint: "Die Buchstaben stehen in kleinen Kreisen am Rand.",
      },
    ],
  },
};

export const grossAcademyGames: AcademyGame[] = [gangartenQuiz, bahnfigurenMeister];
