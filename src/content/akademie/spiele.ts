import type { MultiStep } from "@/engine/types";
import { item, spot } from "./build";
import { scene, type AcademyGame } from "./types";

/**
 * Mini-Spiele der KLEINEN Reitakademie – kostenlos und frei wiederholbar.
 * Die Spiele der Großen Akademie liegen serverseitig in spiele-gross.server.ts.
 */

const situation = (s: Omit<MultiStep, "type">): MultiStep => ({ type: "multi", ...s });

const hilfenDetektiv: AcademyGame = {
  id: "ra-spiel-hilfen",
  slug: "hilfen-detektiv",
  title: "Hilfen-Detektiv",
  teaser: "Welche Hilfen passen zur Situation?",
  learns: "Passende, feine Hilfen für typische Reitsituationen auswählen (Anreiten, Anhalten, Wenden, Beruhigen, Loben; in Stufe Mittel auch Angaloppieren).",
  tint: "#EADBC8",
  cover: scene("ak-reiter-hilfen"),
  activity: {
    id: "ra-spiel-hilfen",
    title: "Hilfen-Detektiv",
    intro: {
      leicht: "Du bist Hilfen-Detektiv! Lies, was passiert, und finde die passenden Hilfen.",
      mittel: "Als Hilfen-Detektiv findest du für jede Situation die passenden, feinen Hilfen. Mehrere Antworten können richtig sein.",
    },
    steps: [
      situation({
        id: "anreiten",
        prompt: "Tonga steht. Du möchtest im Schritt losreiten. Welche Hilfen passen?",
        visual: scene("ak-reiter-sitz"),
        options: [
          { id: "sitz", label: "Aufrecht und ausbalanciert sitzen", correct: true },
          { id: "schenkel", label: "Kurzer Impuls mit beiden Schenkeln", correct: true },
          { id: "hand", label: "Die Hand lässt das Pferd vorwärts", correct: true },
          { id: "ziehen", label: "Fest am Zügel ziehen", feedback: "Ziehen am Zügel bremst – Tonga soll ja losgehen." },
          { id: "lehnen", label: "Weit nach hinten lehnen", feedback: "Nach hinten lehnen bringt dich aus dem Gleichgewicht." },
        ],
        missing: "Gute Spur! Es fehlt aber noch eine passende Hilfe.",
        explain: "Fall gelöst! Sitz, Schenkel und eine Hand, die vorwärts lässt – so geht Anreiten.",
      }),
      situation({
        id: "anhalten",
        prompt: "Du reitest im Schritt und möchtest am Buchstaben anhalten. Welche Hilfen passen?",
        visual: scene("ak-bahn-ganze-bahn"),
        options: [
          { id: "tief", label: "Tief sitzen", correct: true },
          { id: "annehmen", label: "Die Hand nimmt kurz an", correct: true },
          { id: "nachgeben", label: "Nachgeben, sobald das Pferd steht", correct: true },
          { id: "treten", label: "Kräftig mit den Schenkeln treten", feedback: "Treten heißt für das Pferd: vorwärts!" },
          { id: "reissen", label: "Ruckartig am Zügel reißen", feedback: "Reißen tut dem Pferdemaul weh." },
        ],
        missing: "Gute Spur! Eine passende Hilfe fehlt noch.",
        explain: "Fall gelöst! Tief sitzen, kurz annehmen – und nachgeben, wenn das Pferd steht.",
      }),
      situation({
        id: "wendung",
        prompt: "Du möchtest nach links abwenden. Welche Hilfen passen?",
        visual: scene("ak-bahn-zirkel"),
        options: [
          { id: "blick", label: "Nach links in die neue Richtung schauen", correct: true },
          { id: "zuegel", label: "Der linke Zügel zeigt den Weg", correct: true },
          { id: "gewicht", label: "Etwas mehr Gewicht links, ohne zu kippen", correct: true, levels: ["mittel"] },
          { id: "rechts", label: "Mich weit nach rechts lehnen", feedback: "Rechts ist die falsche Seite – und Lehnen bringt das Pferd aus dem Gleichgewicht." },
          { id: "rechter", label: "Kräftig am rechten Zügel ziehen", feedback: "Der rechte Zügel ist hier außen. Er begrenzt nur, er zieht nicht." },
        ],
        missing: "Gute Spur! Eine passende Hilfe fehlt noch.",
        explain: "Fall gelöst! Der Blick führt, der innere Zügel zeigt den Weg.",
      }),
      situation({
        id: "aufgeregt",
        prompt: "Ein lautes Geräusch – das Pferd wird unruhig. Was hilft?",
        visual: { kind: "head", horse: "tonga", mood: "aufgeregt" },
        options: [
          { id: "stimme", label: "Mit ruhiger Stimme sprechen", correct: true },
          { id: "atmen", label: "Selbst ruhig atmen und locker sitzen", correct: true },
          { id: "hilfe", label: "Der Reitlehrerin Bescheid sagen", correct: true },
          { id: "schimpfen", label: "Laut schimpfen", feedback: "Schimpfen macht ein unruhiges Pferd noch unruhiger." },
          { id: "galopp", label: "Schnell losgaloppieren", feedback: "Ein aufgeregtes Pferd braucht Ruhe, nicht Tempo." },
        ],
        missing: "Gute Spur! Es gibt noch etwas, das hilft.",
        explain: "Fall gelöst! Ruhe überträgt sich – und Erwachsene helfen dir.",
      }),
      situation({
        id: "lob",
        prompt: "Das Pferd hat ganz brav angehalten. Was machst du jetzt?",
        visual: { kind: "head", horse: "tivoli", mood: "entspannt" },
        options: [
          { id: "loben", label: "Mit ruhiger Stimme loben", correct: true },
          { id: "kraulen", label: "Am Hals kraulen", correct: true },
          { id: "nachgeben", label: "Mit der Hand nachgeben", correct: true },
          { id: "ziehen", label: "Weiter am Zügel ziehen", feedback: "Das Pferd steht schon – weiter ziehen wäre unfair." },
          { id: "nichts", label: "Gar nichts", feedback: "Ein Lob zeigt dem Pferd, dass es alles richtig gemacht hat." },
        ],
        missing: "Gute Spur! Eine schöne Belohnung fehlt noch.",
        explain: "Fall gelöst! Nachgeben und loben – so lernt das Pferd am besten.",
      }),
      situation({
        id: "galopp",
        levels: ["mittel"],
        prompt: "Rechte Hand: Du möchtest im Rechtsgalopp angaloppieren. Welche Hilfen gehören zum Grundgerüst?",
        visual: scene("ak-reiter-schenkel"),
        options: [
          { id: "innen-schenkel", label: "Rechter Schenkel treibt am Gurt", correct: true },
          { id: "aussen-schenkel", label: "Linker Schenkel verwahrt hinter dem Gurt", correct: true },
          { id: "gewicht", label: "Rechter Gesäßknochen etwas mehr belastet", correct: true },
          { id: "beide-ziehen", label: "Beide Zügel fest ziehen", feedback: "Fest ziehen würde bremsen. Der innere Zügel gibt beim Anspringen sogar etwas nach." },
          { id: "vorbeugen", label: "Weit nach vorne beugen", feedback: "Vorbeugen stört die Balance – der Oberkörper bleibt aufrecht." },
        ],
        missing: "Gute Spur! Eine Hilfe aus dem Grundgerüst fehlt noch.",
        explain: "Fall gelöst! Innen treiben, außen verwahren, innen etwas mehr Gewicht – ruhig und vorbereitet.",
      }),
    ],
  },
};

/* ---------- 3. Der perfekte Reitersitz ---------- */

const perfekterSitz: AcademyGame = {
  id: "ra-spiel-sitz",
  slug: "der-perfekte-reitersitz",
  title: "Der perfekte Reitersitz",
  teaser: "Finde und ordne alles, was zu einem guten Sitz gehört.",
  learns: "Körperteile und ihre Haltung im ausbalancierten Sitz kennen und Sitzfehler (Stuhlsitz, Vorbeugen, hochgezogener Absatz) erkennen.",
  tint: "#E8DCC4",
  cover: scene("ak-reiter-sitz-linie"),
  activity: {
    id: "ra-spiel-sitz",
    title: "Der perfekte Reitersitz",
    intro: {
      leicht: "Hilf der Reiterin zum perfekten Sitz! Finde die Körperteile und ordne zu.",
      mittel: "Finde die Punkte des ausbalancierten Sitzes, ordne die Haltungen zu und erkenne Sitzfehler.",
    },
    steps: [
      {
        type: "hotspots",
        id: "finden",
        scene: scene("ak-reiter-sitz"),
        prompt: "Finde die Körperteile der Reiterin.",
        mode: "sequence",
        targets: [
          spot("kopf", "der Kopf", "kopf", "Der Kopf mit Helm – der Blick geht nach vorn.", { r: 30 }),
          spot("hand", "die Hand", "hand", "Die Hand hält ruhig den Zügel.", { r: 26 }),
          spot("huefte", "die Hüfte", "huefte", "Die Hüfte liegt unter der Schulter.", { r: 28 }),
          spot("absatz", "der Absatz", "absatz", "Der Absatz ist der tiefste Punkt.", { r: 28 }),
          spot("knie", "das Knie", "knie", "Das Knie liegt am Sattel, ohne zu klemmen.", { r: 28, levels: ["mittel"] }),
        ],
        missHint: "Schau dir die Reiterin genau an.",
      },
      {
        type: "match",
        id: "zuordnen",
        prompt: { leicht: "Was gehört wohin? Lege jede Karte zum richtigen Körperteil.", mittel: "Ordne jedem Körperteil die richtige Haltung im Grundsitz zu." },
        targets: [
          { id: "blick", label: "Blick" },
          { id: "faeuste", label: "Fäuste" },
          { id: "oberkoerper", label: "Oberkörper" },
          { id: "absatz", label: "Absatz" },
          { id: "ellbogen", label: "Ellbogen", levels: ["mittel"] },
        ],
        items: [
          { id: "vorne", label: "nach vorne", visual: item("ak-auge"), target: "blick", say: "Richtig! Der Blick geht nach vorn.", wrong: "„Nach vorne“ beschreibt den Blick." },
          { id: "aufrecht-f", label: "aufrecht, Daumen oben", visual: item("ak-zuegel"), target: "faeuste", say: "Genau! Aufrechte Fäuste.", wrong: "„Daumen oben“ gehört zu den Fäusten." },
          { id: "aufrecht-o", label: "aufrecht und locker", visual: item("ak-gewicht"), target: "oberkoerper", say: "Richtig! So sitzt der Oberkörper.", wrong: "„Aufrecht und locker“ beschreibt den Oberkörper." },
          { id: "tief", label: "tief und federnd", visual: item("ak-stiefel"), target: "absatz", say: "Super! Der Absatz ist der tiefste Punkt.", wrong: "„Tief und federnd“ beschreibt den Absatz." },
          { id: "locker", label: "locker am Körper", visual: item("ak-schaukel"), target: "ellbogen", say: "Richtig. Lockere Ellbogen machen die Hand weich.", wrong: "„Locker am Körper“ beschreibt die Ellbogen.", levels: ["mittel"] },
        ],
      },
      {
        type: "choice",
        id: "wer",
        prompt: "Wer sitzt perfekt ausbalanciert?",
        layout: "pictures",
        options: [
          { id: "stuhl", label: "Bild 1", visual: scene("ak-reiter-stuhl-nah"), feedback: "Hier sind die Beine zu weit vorne – ein Stuhlsitz." },
          { id: "absatz", label: "Bild 2", visual: scene("ak-reiter-absatz-nah"), feedback: "Hier ist der Absatz hochgezogen." },
          { id: "sitz", label: "Bild 3", visual: scene("ak-reiter-sitz-nah"), correct: true },
          { id: "vor", label: "Bild 4", visual: scene("ak-reiter-vor-nah"), feedback: "Hier kippt der Oberkörper nach vorne." },
        ],
        explain: "Richtig! Ohr, Schulter, Hüfte und Absatz liegen übereinander.",
      },
      {
        type: "choice",
        id: "fehler-stuhl",
        levels: ["mittel"],
        prompt: "Was ist bei dieser Reiterin nicht ausbalanciert?",
        visual: scene("ak-reiter-stuhl-nah"),
        layout: "list",
        options: [
          { id: "beine", label: "Die Beine liegen zu weit vorne (Stuhlsitz)", correct: true },
          { id: "helm", label: "Der Helm sitzt schief", feedback: "Der Helm sitzt gut. Schau auf die Beine." },
          { id: "haende", label: "Die Hände sind zu weit auseinander", feedback: "Die Hände sind in Ordnung. Schau, wo der Absatz im Vergleich zur Hüfte ist." },
        ],
        explain: "Richtig. Der Absatz liegt vor der Hüfte – die senkrechte Linie fehlt.",
      },
      {
        type: "choice",
        id: "fehler-absatz",
        levels: ["mittel"],
        prompt: "Und was ist hier anders als im Grundsitz?",
        visual: scene("ak-reiter-absatz-nah"),
        layout: "list",
        options: [
          { id: "absatz", label: "Der Absatz ist hochgezogen, die Fußspitze zeigt nach unten", correct: true },
          { id: "vor", label: "Der Oberkörper kippt weit nach vorne", feedback: "Der Oberkörper ist aufrecht. Schau auf den Fuß." },
          { id: "zuegel", label: "Die Zügel hängen durch", feedback: "Die Zügel sind in Ordnung. Schau auf den Fuß." },
        ],
        explain: "Genau. Ein hochgezogener Absatz macht das Bein unruhig.",
      },
    ],
  },
};

/** Kostenlose Mini-Spiele (Reihenfolge = Reihenfolge in der App) */
export const freeAcademyGames: AcademyGame[] = [perfekterSitz, hilfenDetektiv];

export function getFreeAcademyGame(slug: string): AcademyGame | undefined {
  return freeAcademyGames.find((g) => g.slug === slug);
}
