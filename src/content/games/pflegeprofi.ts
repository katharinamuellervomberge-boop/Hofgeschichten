import type { Activity } from "@/engine/types";

/** Pferde-Pflegeprofi: Putzzeug der richtigen Aufgabe zuordnen. */
export const pflegeprofi: Activity = {
  id: "pflegeprofi",
  title: "Pferde-Pflegeprofi",
  intro: {
    leicht: "Hilf beim Putzen! Bring jedes Putzzeug zur richtigen Aufgabe.",
    mittel: "Heute bist du Pflegeprofi. Ordne jedes Teil aus der Putzkiste der richtigen Aufgabe zu.",
  },
  steps: [
    {
      type: "match",
      id: "zuordnen",
      prompt: {
        leicht: "Wohin gehört das? Zieh es an die richtige Stelle – oder tippe erst auf das Teil und dann auf die Aufgabe.",
        mittel: "Ordne alles zu. Zum Ziehen gedrückt halten – oder antippen und dann die Aufgabe antippen.",
      },
      targets: [
        { id: "fell", label: "Fell putzen", visual: { kind: "item", name: "fell" } },
        { id: "hufe", label: "Hufe sauber machen", visual: { kind: "item", name: "huf" } },
        { id: "maehne", label: "Mähne kämmen", visual: { kind: "item", name: "maehne" } },
        { id: "fuehren", label: "Pferd führen", visual: { kind: "item", name: "fuehren" } },
        { id: "reiten", label: "Reiten vorbereiten", visual: { kind: "item", name: "reiten" }, levels: ["mittel"] },
      ],
      items: [
        {
          id: "kardaetsche",
          label: "Kardätsche",
          visual: { kind: "item", name: "buerste" },
          target: "fell",
          say: "Die Kardätsche ist eine weiche Bürste. Damit wird das Fell glatt und sauber.",
        },
        {
          id: "hufkratzer",
          label: "Hufkratzer",
          visual: { kind: "item", name: "hufkratzer" },
          target: "hufe",
          say: "Mit dem Hufkratzer holen wir Steinchen und Erde aus dem Huf.",
          wrong: "Der Hufkratzer hat einen Haken. Den brauchen wir unten am Pferd.",
        },
        {
          id: "kamm",
          label: "Mähnenkamm",
          visual: { kind: "item", name: "kamm" },
          target: "maehne",
          say: "Mit dem Mähnenkamm kämmen wir vorsichtig Mähne und Schweif.",
        },
        {
          id: "halfter",
          label: "Halfter",
          visual: { kind: "item", name: "halfter" },
          target: "fuehren",
          say: "Das Halfter kommt auf den Kopf. Daran führen wir das Pferd.",
        },
        {
          id: "striegel",
          label: "Gummistriegel",
          visual: { kind: "item", name: "striegel" },
          target: "fell",
          say: "Der Gummistriegel lockert in kreisenden Bewegungen den Schmutz im Fell.",
          levels: ["mittel"],
        },
        {
          id: "strick",
          label: "Führstrick",
          visual: { kind: "item", name: "strick" },
          target: "fuehren",
          say: "Der Führstrick wird am Halfter eingehakt.",
          levels: ["mittel"],
        },
        {
          id: "sattel",
          label: "Sattel",
          visual: { kind: "item", name: "sattel" },
          target: "reiten",
          say: "Der Sattel kommt erst nach dem Putzen auf den sauberen Rücken.",
          wrong: "Den Sattel brauchen wir erst, wenn das Pferd fertig geputzt ist.",
          levels: ["mittel"],
        },
      ],
    },
    {
      type: "choice",
      id: "hufkratzer-wofuer",
      levels: ["leicht"],
      prompt: "Wofür ist der Hufkratzer?",
      visual: { kind: "item", name: "hufkratzer" },
      layout: "pictures",
      options: [
        { id: "huf", label: "Für die Hufe", visual: { kind: "item", name: "huf" }, correct: true },
        { id: "maehne", label: "Für die Mähne", visual: { kind: "item", name: "maehne" }, feedback: "Für die Mähne nehmen wir den Kamm." },
        { id: "fell", label: "Für das Fell", visual: { kind: "item", name: "fell" }, feedback: "Für das Fell nehmen wir Bürsten." },
      ],
      explain: "Genau! Damit machen wir die Hufe sauber.",
    },
    {
      type: "choice",
      id: "reihenfolge",
      levels: ["mittel"],
      prompt: "Womit fängst du beim Fellputzen an?",
      layout: "pictures",
      options: [
        { id: "striegel", label: "Gummistriegel", visual: { kind: "item", name: "striegel" }, correct: true },
        {
          id: "kardaetsche",
          label: "Kardätsche",
          visual: { kind: "item", name: "buerste" },
          feedback: "Die Kardätsche kommt danach. Erst muss der Schmutz gelockert werden.",
        },
        { id: "kamm", label: "Mähnenkamm", visual: { kind: "item", name: "kamm" }, feedback: "Der Kamm ist für Mähne und Schweif, nicht für das Fell." },
      ],
      explain:
        "Richtig! Erst lockert der Gummistriegel in Kreisen den Schmutz. Dann bürstet die Kardätsche ihn in Haarrichtung weg.",
    },
  ],
};
