import type { Activity } from "@/engine/types";

/**
 * „Pferde kennenlernen“: Körperteile am Pferd entdecken.
 * Koordinaten passen zur Pferde-Illustration (viewBox 70 20 320 292).
 */
export function entdeckenActivity(horseSlug: string, horseName: string): Activity {
  return {
    id: `entdecken-${horseSlug}`,
    title: `${horseName} entdecken`,
    intro: {
      leicht: `Tippe ${horseName} an und entdecke, wie ein Pferd gebaut ist.`,
      mittel: `Kennst du die Körperteile eines Pferdes? Finde sie bei ${horseName}.`,
    },
    steps: [
      {
        type: "hotspots",
        id: "leicht-entdecken",
        levels: ["leicht"],
        mode: "collect",
        scene: { kind: "horse", horse: horseSlug },
        prompt: `Tippe auf ${horseName}. Findest du alle sechs Stellen?`,
        missHint: "Probier eine andere Stelle: Ohren, Augen, Nase, Mähne, Schweif oder Huf.",
        targets: [
          { id: "ohren", label: "Ohren", x: 316, y: 42, r: 15, say: "Die Ohren. Ein Pferd kann jedes Ohr einzeln drehen." },
          { id: "auge", label: "Auge", x: 330, y: 78, r: 11, say: "Das Auge. Pferde sehen fast rundherum." },
          { id: "nuestern", label: "Nüstern", x: 361, y: 122, r: 13, say: "Die Nüstern. So heißt die Nase beim Pferd. Pferde riechen sehr gut." },
          { id: "maehne", label: "Mähne", x: 282, y: 84, r: 18, say: "Die Mähne. Das sind die langen Haare am Hals." },
          { id: "schweif", label: "Schweif", x: 92, y: 205, r: 22, say: "Der Schweif. Damit verscheucht das Pferd Fliegen." },
          { id: "huf", label: "Huf", x: 258, y: 300, r: 13, say: "Der Huf. Er ist hart wie ein dicker Fingernagel." },
        ],
      },
      {
        type: "hotspots",
        id: "mittel-finden",
        levels: ["mittel"],
        mode: "sequence",
        scene: { kind: "horse", horse: horseSlug },
        prompt: "Wo ist …?",
        targets: [
          { id: "widerrist", label: "der Widerrist", x: 252, y: 104, r: 15, say: "Der Widerrist ist der höchste Punkt am Rücken. Dort misst man, wie groß ein Pferd ist." },
          { id: "maehne", label: "die Mähne", x: 282, y: 84, r: 18, say: "Die Mähne wächst oben am Hals." },
          { id: "kruppe", label: "die Kruppe", x: 142, y: 110, r: 18, say: "Die Kruppe ist der hintere, runde Teil des Rückens über den Hinterbeinen." },
          { id: "nuestern", label: "die Nüstern", x: 361, y: 122, r: 13, say: "Durch die Nüstern atmet und riecht das Pferd." },
          { id: "sprunggelenk", label: "das Sprunggelenk", x: 110, y: 247, r: 14, say: "Das Sprunggelenk am Hinterbein entspricht ungefähr unserer Ferse." },
          { id: "fessel", label: "die Fessel", x: 129, y: 289, r: 10, say: "Die Fessel ist der kurze Abschnitt direkt über dem Huf." },
          { id: "schweif", label: "der Schweif", x: 92, y: 205, r: 22, say: "Mit dem Schweif vertreibt das Pferd Insekten." },
          { id: "huf", label: "der Huf", x: 258, y: 300, r: 13, say: "Im Huf steckt ein empfindlicher Strahl. Darum kratzen wir die Hufe regelmäßig aus." },
        ],
      },
    ],
  };
}
