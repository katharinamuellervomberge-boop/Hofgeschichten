import type { Activity } from "@/engine/types";

/**
 * „Was braucht ein Pferd?“ – Lernquiz.
 * Fachlich: Raufutter als Hauptnahrung, viel Wasser, Herdenhaltung,
 * Hufpflege alle 6–8 Wochen, kein Rasenschnitt (Kolikgefahr), kleiner Magen.
 */
export const quiz: Activity = {
  id: "was-braucht-ein-pferd",
  title: "Was braucht ein Pferd?",
  intro: {
    leicht: "Was braucht ein Pferd, damit es ihm gut geht? Tippe auf das richtige Bild.",
    mittel: "Teste dein Pferdewissen: Was braucht ein Pferd, damit es gesund und zufrieden ist?",
  },
  steps: [
    /* ---------- Leicht ---------- */
    {
      type: "choice",
      id: "l-futter",
      levels: ["leicht"],
      prompt: "Was frisst ein Pferd am meisten?",
      layout: "pictures",
      options: [
        { id: "heu", label: "Heu", visual: { kind: "item", name: "heu" }, correct: true },
        { id: "schoko", label: "Schokolade", visual: { kind: "item", name: "schokolade" }, feedback: "Schokolade ist nichts für Pferde. Davon können sie krank werden." },
        { id: "kuchen", label: "Kuchen", visual: { kind: "item", name: "kuchen" }, feedback: "Kuchen ist Menschenessen. Pferdebäuche vertragen das nicht." },
      ],
      explain: "Richtig! Heu ist das wichtigste Futter. Pferde knabbern es viele Stunden am Tag.",
    },
    {
      type: "choice",
      id: "l-wasser",
      levels: ["leicht"],
      prompt: "Was braucht ein Pferd jeden Tag ganz viel?",
      layout: "pictures",
      options: [
        { id: "bonbon", label: "Bonbons", visual: { kind: "item", name: "bonbon" }, feedback: "Bonbons sind viel zu süß für Pferde." },
        { id: "wasser", label: "Wasser", visual: { kind: "item", name: "wasser" }, correct: true },
        { id: "schoko", label: "Schokolade", visual: { kind: "item", name: "schokolade" }, feedback: "Schokolade ist nichts für Pferde." },
      ],
      explain: "Genau! Pferde trinken jeden Tag mehrere Eimer Wasser.",
    },
    {
      type: "choice",
      id: "l-herde",
      levels: ["leicht"],
      prompt: "Wie lebt ein Pferd am liebsten?",
      layout: "pictures",
      options: [
        { id: "allein", label: "Ganz allein", visual: { kind: "count", name: "pferd", n: 1 }, feedback: "Allein fühlen sich Pferde nicht sicher. Sie brauchen Freunde." },
        { id: "herde", label: "Mit anderen Pferden", visual: { kind: "count", name: "pferd", n: 3 }, correct: true },
      ],
      explain: "Richtig! Pferde sind Herdentiere. Mit ihren Freunden fühlen sie sich sicher.",
    },
    {
      type: "choice",
      id: "l-hufschmied",
      levels: ["leicht"],
      prompt: "Wer kümmert sich um die Hufe?",
      layout: "pictures",
      options: [
        { id: "baecker", label: "Der Bäcker", visual: { kind: "item", name: "kuchen" }, feedback: "Der Bäcker backt Kuchen. Für Hufe gibt es jemand anderen." },
        { id: "friseur", label: "Der Friseur", visual: { kind: "item", name: "kamm" }, feedback: "Der Friseur schneidet Haare. Hufe sind aber hart wie Fingernägel." },
        { id: "hufschmied", label: "Der Hufschmied", visual: { kind: "item", name: "hufeisen" }, correct: true },
      ],
      explain: "Genau! Der Hufschmied schneidet die Hufe und macht wenn nötig Hufeisen drauf.",
    },
    {
      type: "choice",
      id: "l-weide",
      levels: ["leicht"],
      prompt: "Wo kann ein Pferd sich frei bewegen?",
      layout: "pictures",
      options: [
        { id: "weide", label: "Auf der Weide", visual: { kind: "item", name: "gras" }, correct: true },
        { id: "sattelkammer", label: "In der Sattelkammer", visual: { kind: "item", name: "sattel" }, feedback: "In der Sattelkammer liegt nur das Reitzeug. Da passt kein Pferd hinein." },
      ],
      explain: "Richtig! Pferde brauchen jeden Tag viel Bewegung, am liebsten auf der Weide.",
    },
    {
      type: "choice",
      id: "l-leckerli",
      levels: ["leicht"],
      prompt: "Was ist ein gutes Leckerli – aber nur ab und zu?",
      layout: "pictures",
      options: [
        { id: "karotte", label: "Karotte", visual: { kind: "item", name: "karotte" }, correct: true },
        { id: "bonbon", label: "Bonbon", visual: { kind: "item", name: "bonbon" }, feedback: "Bonbons sind zu süß für Pferde." },
        { id: "kuchen", label: "Kuchen", visual: { kind: "item", name: "kuchen" }, feedback: "Kuchen ist nichts für Pferdebäuche." },
      ],
      explain: "Genau! Ein Stück Karotte ist ein feines Leckerli. Zu viel davon gibt aber Bauchweh.",
    },

    /* ---------- Mittel ---------- */
    {
      type: "choice",
      id: "m-fresszeit",
      levels: ["mittel"],
      prompt: "Wie viele Stunden am Tag fressen Pferde ungefähr, wenn sie dürfen?",
      layout: "list",
      options: [
        { id: "2", label: "2 Stunden", feedback: "Das ist viel zu wenig. Pferde fressen fast den ganzen Tag über." },
        { id: "6", label: "6 Stunden", feedback: "Mehr! Pferde sind Dauerfresser." },
        { id: "14", label: "12 bis 16 Stunden", correct: true },
        { id: "24", label: "24 Stunden ohne Pause", feedback: "Ganz ohne Pause nicht – Pferde dösen und schlafen auch." },
      ],
      explain: "Richtig! Pferde fressen 12 bis 16 Stunden am Tag, immer wieder kleine Portionen Heu oder Gras.",
    },
    {
      type: "choice",
      id: "m-magen",
      levels: ["mittel"],
      prompt: "Warum fressen Pferde lieber viele kleine Portionen?",
      layout: "list",
      options: [
        { id: "magen", label: "Ihr Magen ist klein im Vergleich zu ihrem großen Körper.", correct: true },
        { id: "zaehne", label: "Sie haben nur wenige Zähne.", feedback: "Pferde haben sogar sehr viele kräftige Mahlzähne." },
        { id: "langweilig", label: "Weil ihnen sonst langweilig wird.", feedback: "Langeweile ist nicht der Hauptgrund. Denk an den Bauch!" },
      ],
      explain: "Genau! Der Pferdemagen ist recht klein. Deshalb brauchen Pferde über den Tag verteilt immer wieder Raufutter.",
    },
    {
      type: "choice",
      id: "m-wasser",
      levels: ["mittel"],
      prompt: "Wie viel Wasser trinkt ein großes Pferd ungefähr an einem Tag?",
      layout: "list",
      options: [
        { id: "1", label: "1 Liter", feedback: "Viel mehr! Ein Pferd ist ja auch viel größer als du." },
        { id: "5", label: "5 Liter", feedback: "Noch mehr. Denk an mehrere volle Eimer." },
        { id: "40", label: "20 bis 60 Liter", correct: true },
        { id: "500", label: "500 Liter", feedback: "So viel passt nicht einmal in eine Badewanne." },
      ],
      explain: "Richtig! Je nach Größe, Wetter und Arbeit trinkt ein Pferd etwa 20 bis 60 Liter am Tag.",
    },
    {
      type: "choice",
      id: "m-rasenschnitt",
      levels: ["mittel"],
      prompt: "Welches Futter ist für Pferde gefährlich?",
      layout: "pictures",
      options: [
        { id: "heu", label: "Heu", visual: { kind: "item", name: "heu" }, feedback: "Heu ist das wichtigste Pferdefutter." },
        { id: "rasenschnitt", label: "Rasenschnitt", visual: { kind: "item", name: "rasenschnitt" }, correct: true },
        { id: "wasser", label: "Frisches Wasser", visual: { kind: "item", name: "wasser" }, feedback: "Frisches Wasser brauchen Pferde jeden Tag." },
      ],
      explain:
        "Richtig! Rasenschnitt vom Rasenmäher fängt schnell an zu gären. Davon können Pferde schlimme Bauchschmerzen bekommen – eine Kolik.",
    },
    {
      type: "choice",
      id: "m-herde",
      levels: ["mittel"],
      prompt: "Warum sollten Pferde nicht allein leben?",
      layout: "list",
      options: [
        { id: "herde", label: "Sie sind Herdentiere und fühlen sich in der Gruppe sicher.", correct: true },
        { id: "streit", label: "Weil sie sonst mit den Menschen streiten.", feedback: "Darum geht es nicht. Denk daran, wie Pferde in der Natur leben." },
        { id: "kalt", label: "Weil ihnen allein kalt wird.", feedback: "Gegen Kälte hilft ihr Winterfell. Es geht um Sicherheit." },
      ],
      explain:
        "Genau! In der Herde passen Pferde aufeinander auf. Eines döst, ein anderes hält Wache. Allein sind sie oft gestresst.",
    },
    {
      type: "choice",
      id: "m-hufschmied",
      levels: ["mittel"],
      prompt: "Wie oft kommt der Hufschmied ungefähr?",
      layout: "list",
      options: [
        { id: "woche", label: "Jede Woche", feedback: "So schnell wachsen Hufe nicht." },
        { id: "6-8", label: "Alle 6 bis 8 Wochen", correct: true },
        { id: "jahr", label: "Einmal im Jahr", feedback: "Das ist zu selten – die Hufe wären dann viel zu lang." },
      ],
      explain: "Richtig! Hufe wachsen immer weiter. Deshalb kommt der Hufschmied etwa alle 6 bis 8 Wochen.",
    },
    {
      type: "choice",
      id: "m-unterstand",
      levels: ["mittel"],
      prompt: "Wozu braucht ein Pferd auf der Weide einen Unterstand?",
      layout: "list",
      options: [
        { id: "schutz", label: "Als Schutz vor Wind, Regen und starker Sonne.", correct: true },
        { id: "futter", label: "Damit dort Schokolade gelagert wird.", feedback: "Schokolade ist nie Pferdefutter!" },
        { id: "schlafen", label: "Weil Pferde nur dort schlafen können.", feedback: "Pferde können auch draußen dösen und schlafen." },
      ],
      explain: "Genau! Ein Unterstand oder ein Stall schützt die Pferde vor schlechtem Wetter und Insekten.",
    },
    {
      type: "choice",
      id: "m-wohlfuehlen",
      levels: ["mittel"],
      prompt: "Woran erkennst du, dass ein Pferd sich wohlfühlt?",
      layout: "list",
      options: [
        { id: "ruhig", label: "Es frisst ruhig, die Ohren sind locker, der Blick ist weich.", correct: true },
        { id: "ohren", label: "Es legt die Ohren flach nach hinten.", feedback: "Angelegte Ohren heißen: Lass mich in Ruhe!" },
        { id: "stampfen", label: "Es stampft und schlägt heftig mit dem Schweif.", feedback: "Das zeigt eher Ärger oder Fliegen-Ärger." },
      ],
      explain: "Richtig! Ein zufriedenes Pferd wirkt ruhig und entspannt.",
    },
  ],
};
