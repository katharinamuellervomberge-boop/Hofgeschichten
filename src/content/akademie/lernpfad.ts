/**
 * Lernpfad der Reitakademie: fünf Kapitel, die bestehende kostenlose Inhalte
 * (Lernwelten, Spiele) und neue Premium-Lektionen zu einem Weg verbinden.
 * Bestehende Inhalte bleiben unverändert und kostenlos.
 *
 * Station-Arten:
 *  free     – kostenlos (Lernwelt oder Spiel)
 *  premium  – Premium-Lektion aus den Freitagsfolgen (release = slug in membership.ts)
 *  planned  – angekündigt, noch nicht verfügbar (wird ehrlich so gekennzeichnet)
 */
export type PathStation =
  | { kind: "free"; title: string; href: string; progressIds?: string[]; world?: string }
  | { kind: "premium"; title: string; release: string; progressId: string }
  | { kind: "planned"; title: string };

export type PathChapter = { number: number; title: string; topics: string[]; stations: PathStation[] };

export const lernpfad: PathChapter[] = [
  {
    number: 1,
    title: "Die Sprache der Pferde",
    topics: ["Ohren und Körpersprache", "Stimmung erkennen", "Sicheres Verhalten"],
    stations: [
      { kind: "free", title: "Spiel: Pferdesprache", href: "/spielen/pferdesprache", progressIds: ["pferdesprache"] },
      { kind: "premium", title: "Lektion: Die Sprache der Pferde", release: "sprache-der-pferde", progressId: "ra-p1-l1" },
    ],
  },
  {
    number: 2,
    title: "Pferdepflege",
    topics: ["Putzutensilien", "Fellpflege", "Hufe", "Vorbereitung"],
    stations: [
      { kind: "free", title: "Spiel: Pferde-Pflegeprofi", href: "/spielen/pflegeprofi", progressIds: ["pflegeprofi"] },
      { kind: "planned", title: "Lektion: Putzen Schritt für Schritt" },
    ],
  },
  {
    number: 3,
    title: "Sicherer Umgang",
    topics: ["Verhalten am Pferd", "Führen", "Abstand", "Sicherheitsregeln"],
    stations: [
      { kind: "free", title: "Lernwelt: Bevor du aufsteigst", href: "/spielen/akademie/bevor-du-aufsteigst", world: "w1" },
      { kind: "planned", title: "Lektion: Führen und Abstand" },
    ],
  },
  {
    number: 4,
    title: "Reiten lernen",
    topics: ["Sitz", "Balance", "Grundlegende Hilfen", "Kommunikation mit dem Pferd"],
    stations: [
      { kind: "free", title: "Lernwelt: Der richtige Reitersitz", href: "/spielen/akademie/der-richtige-reitersitz", world: "w2" },
      { kind: "free", title: "Lernwelt: Die Sprache der Hilfen", href: "/spielen/akademie/die-sprache-der-hilfen", world: "w3" },
      { kind: "free", title: "Lernwelten: Schritt, Trab, Galopp, Reitbahn", href: "/spielen/akademie#ak-welten" },
    ],
  },
  {
    number: 5,
    title: "Pferdewissen",
    topics: ["Bedürfnisse", "Haltung", "Fütterung", "Gesundheit und Wohlbefinden"],
    stations: [
      { kind: "free", title: "Quiz: Was braucht ein Pferd?", href: "/spielen/was-braucht-ein-pferd", progressIds: ["was-braucht-ein-pferd"] },
      { kind: "free", title: "Lernwelt: Fair zum Pferd", href: "/spielen/akademie/fair-zum-pferd", world: "w8" },
      { kind: "planned", title: "Lektion: Haltung, Fütterung & Gesundheit" },
    ],
  },
];
