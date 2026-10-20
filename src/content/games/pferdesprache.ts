import type { Activity, ChoiceOption, ChoiceStep, EarMoodRef } from "@/engine/types";

/**
 * Pferdesprache – Körpersignale erkennen.
 * Fachlich: Ohren nach vorn = aufmerksam; locker zur Seite = entspannt/dösend;
 * flach angelegt = verärgert/abwehrend; Kopf hoch, Augen weit, Nüstern gebläht = aufgeregt/ängstlich.
 */

const LABEL: Record<EarMoodRef, string> = {
  neugierig: "neugierig",
  entspannt: "entspannt",
  grummelig: "grummelig",
  aufgeregt: "aufgeregt",
};

const EXPLAIN: Record<EarMoodRef, string> = {
  neugierig: "Die Ohren zeigen nach vorne. Das Pferd ist neugierig und passt gut auf.",
  entspannt: "Die Ohren hängen locker zur Seite, die Augen sind halb zu. Das Pferd ist entspannt und döst.",
  grummelig: "Die Ohren liegen flach nach hinten. Das Pferd ist grummelig – jetzt Abstand halten!",
  aufgeregt:
    "Die Augen sind weit offen, man sieht das Weiße, und die Nüstern sind groß. Das Pferd ist aufgeregt oder hat Angst. Jetzt ruhig bleiben.",
};

const HINT: Record<EarMoodRef, string> = {
  neugierig: "Schau genau: Zeigen die Ohren nach vorne?",
  entspannt: "Schau auf die Augen. Sind sie halb geschlossen?",
  grummelig: "Schau auf die Ohren. Liegen sie flach nach hinten?",
  aufgeregt: "Schau auf die Augen und die Nase. Sind sie ganz weit?",
};

function moodRound(id: string, horse: string, mood: EarMoodRef, choices: EarMoodRef[], levels: ChoiceStep["levels"]): ChoiceStep {
  const options: ChoiceOption[] = choices.map((m) => ({
    id: m,
    label: LABEL[m],
    visual: { kind: "mood", mood: m },
    correct: m === mood,
    feedback: m === mood ? undefined : HINT[m === mood ? m : mood],
  }));
  return {
    type: "choice",
    id,
    levels,
    prompt: { leicht: "Wie fühlt sich das Pferd?", mittel: "Wie fühlt sich das Pferd? Achte auf Ohren, Augen und Nüstern." },
    visual: { kind: "head", horse, mood },
    layout: "pictures",
    options,
    explain: EXPLAIN[mood],
  };
}

const EASY: EarMoodRef[] = ["neugierig", "entspannt", "grummelig"];
const MEDIUM: EarMoodRef[] = ["neugierig", "entspannt", "grummelig", "aufgeregt"];

export const pferdesprache: Activity = {
  id: "pferdesprache",
  title: "Pferdesprache",
  intro: {
    leicht: "Schau auf die Ohren. Ist das Pferd neugierig, entspannt oder grummelig?",
    mittel: "Pferde sprechen mit ihrem Körper. Lies Ohren, Augen und Nüstern – und entscheide, was du tun solltest.",
  },
  steps: [
    moodRound("l1", "tivoli", "neugierig", EASY, ["leicht"]),
    moodRound("l2", "scrabble", "grummelig", EASY, ["leicht"]),
    moodRound("l3", "tonga", "entspannt", EASY, ["leicht"]),
    moodRound("l4", "scrabble", "neugierig", EASY, ["leicht"]),
    moodRound("l5", "tivoli", "entspannt", EASY, ["leicht"]),
    moodRound("l6", "tonga", "grummelig", EASY, ["leicht"]),

    moodRound("m1", "tonga", "neugierig", MEDIUM, ["mittel"]),
    moodRound("m2", "tivoli", "aufgeregt", MEDIUM, ["mittel"]),
    moodRound("m3", "scrabble", "entspannt", MEDIUM, ["mittel"]),
    {
      type: "choice",
      id: "m-handeln-grummelig",
      levels: ["mittel"],
      prompt: "Ein Pferd legt die Ohren an, als du in die Box kommst. Was machst du?",
      visual: { kind: "head", horse: "scrabble", mood: "grummelig" },
      layout: "list",
      options: [
        { id: "abstand", label: "Stehen bleiben, Abstand halten und einen Erwachsenen holen.", correct: true },
        { id: "kraulen", label: "Schnell hingehen und es kraulen.", feedback: "Lieber nicht – das Pferd möchte gerade in Ruhe gelassen werden." },
        { id: "rufen", label: "Laut rufen, damit es aufhört.", feedback: "Lautes Rufen macht es oft noch schlimmer. Ruhig bleiben hilft." },
      ],
      explain: "Richtig! Angelegte Ohren sind eine Warnung. Respektiere sie und hol dir Hilfe.",
    },
    moodRound("m4", "tonga", "grummelig", MEDIUM, ["mittel"]),
    moodRound("m5", "scrabble", "aufgeregt", MEDIUM, ["mittel"]),
    {
      type: "choice",
      id: "m-handeln-aufgeregt",
      levels: ["mittel"],
      prompt: "Ein Pferd hat sich vor etwas erschreckt. Was hilft am meisten?",
      visual: { kind: "head", horse: "tivoli", mood: "aufgeregt" },
      layout: "list",
      options: [
        { id: "ruhig", label: "Ruhig sprechen, langsam bewegen und Abstand lassen.", correct: true },
        { id: "rennen", label: "Schnell zum Pferd rennen.", feedback: "Schnelle Bewegungen erschrecken das Pferd noch mehr." },
        { id: "klatschen", label: "In die Hände klatschen.", feedback: "Laute Geräusche machen ein ängstliches Pferd noch unruhiger." },
      ],
      explain: "Genau! Pferde sind Fluchttiere. Ruhe gibt ihnen Sicherheit.",
    },
    {
      type: "choice",
      id: "m-doesen",
      levels: ["mittel"],
      prompt: "Ein Pferd lässt den Kopf etwas hängen und stellt ein Hinterbein locker auf die Spitze. Was bedeutet das?",
      visual: { kind: "head", horse: "tonga", mood: "entspannt" },
      layout: "list",
      options: [
        { id: "doesen", label: "Es döst ganz entspannt.", correct: true },
        { id: "verletzt", label: "Es hat sich bestimmt verletzt.", feedback: "Wenn es locker wechselt und ruhig wirkt, ruht es sich nur aus." },
        { id: "treten", label: "Es will gleich treten.", feedback: "Ein Pferd, das treten will, legt die Ohren an und wirkt angespannt." },
      ],
      explain: "Richtig! So ruhen Pferde im Stehen. Ihre Beine haben dafür einen besonderen Halte-Mechanismus.",
    },
  ],
};
