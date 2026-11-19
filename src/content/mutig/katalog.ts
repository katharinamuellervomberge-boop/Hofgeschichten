import type { TypId, Weg } from "./types";

/**
 * Öffentlicher Katalog von „Mutig reiten“: Titel, Termine, Angst-Check, Mut-Typen.
 * Die eigentlichen Inhalte (Audio-Texte, Übungen, Werkzeuge) liegen in *.server.ts.
 */

export const WEEKS = ["Verstehen", "Werkzeuge", "Am Boden", "Erster Sattel", "Mehr zutrauen", "Dein Weg weiter"] as const;

export const UNIT_TITLES = [
  "Willkommen", "Dein Alarmsystem", "Was das Pferd merkt", "Dein Kopfkino", "Die Lernzone",
  "Atem im Alltag", "Weiter Blick", "Dein Mutmacher-Satz", "Locker in Hüfte und Schultern", "Dein Mut-Ritual",
  "Pferdesprache 1", "Pferdesprache 2", "Anhalten und warten", "Rückwärts und weichen", "Rückblick",
  "Wenn-dann-Plan 1", "Sitzen, wenn es ruckt", "Aufsteigen mit Ritual", "Notfall-Handgriffe", "Zwischenbilanz",
  "Lern- statt Panikzone", "Wenn-dann-Plan 3", "Schlechte Tage", "Zuschauer", "Deine Angst-Situation, klein",
  "Was du geschafft hast", "Brief an dich", "Wie es weitergeht", "Abschluss-Check", "Mut-Feier",
] as const;

export const UNIT_COUNT = UNIT_TITLES.length;
export const weekOf = (n: number) => Math.floor((n - 1) / 5) + 1;
export const unitTitle = (n: number) => UNIT_TITLES[n - 1] ?? "";

/**
 * Erscheinungstermine je Woche (00:00 Uhr deutscher Zeit).
 * Wochen 1–2 sind fertig; Wochen 3–6 erscheinen gestaffelt.
 * HIER die Termine ändern – Programm, Sperre und Produkttext lesen sie von hier.
 */
export const WEEK_RELEASE: Record<number, string> = {
  1: "2026-11-19T00:00:00+01:00",
  2: "2026-11-19T00:00:00+01:00",
  3: "2026-12-07T00:00:00+01:00",
  4: "2026-12-14T00:00:00+01:00",
  5: "2026-12-21T00:00:00+01:00",
  6: "2026-12-28T00:00:00+01:00",
};

export function unitReleaseDate(n: number): Date {
  return new Date(WEEK_RELEASE[weekOf(n)] ?? WEEK_RELEASE[6]);
}

export function isUnitReleased(n: number, now: Date = new Date()): boolean {
  return n >= 1 && n <= UNIT_COUNT && unitReleaseDate(n).getTime() <= now.getTime();
}

export const releaseLabel = (d: Date) =>
  d.toLocaleDateString("de-DE", { day: "numeric", month: "long", timeZone: "Europe/Berlin" });

export const WEGE: Record<Weg, { titel: string; text: string }> = {
  sturz: { titel: "Nach dem Sturz", text: "Wenn ein Erlebnis im Kopf geblieben ist und du Schritt für Schritt Vertrauen zurückgewinnen willst." },
  wieder: { titel: "Wiedereinstieg", text: "Nach einer langen Pause. Der Körper und die Erwartungen sind anders als früher." },
  geburt: { titel: "Nach der Geburt", text: "Mit verändertem Körper, neuer Verantwortung und wenig Zeit. Rückbildung zuerst." },
};

export const TOOL_NAMES: Record<string, string> = {
  atem: "Atem-Reset", locker: "Lockerungs-Check", gedanken: "Gedanken-Check", blick: "Weiter Blick",
  satz: "Mutmacher-Satz", ritual: "Mut-Ritual", plan: "Wenn-dann-Plan", film: "Mut-Film",
};

/* ---------- Angst-Check (kostenlos) ---------- */

export type CheckQuestion =
  | { id: string; t: string; type: "one"; o: string[]; hint?: string }
  | { id: string; t: string; type: "multi"; o: string[]; hint?: string }
  | { id: string; t: string; type: "scale"; hint?: string }
  | { id: string; t: string; type: "text"; placeholder: string; hint?: string };

export const CHECK: CheckQuestion[] = [
  { id: "q1", t: "Was passt am besten zu dir?", type: "one", o: ["Ich bin gestürzt", "Ich steige nach einer Pause wieder ein", "Ich habe ein Baby bekommen", "Ich hatte schon immer Respekt"] },
  { id: "q2", t: "Wie lange ist das her?", type: "one", o: ["unter 3 Monate", "3–12 Monate", "1–5 Jahre", "länger"] },
  { id: "q3", t: "Wann ist die Angst am größten?", type: "multi", hint: "Mehrere Antworten möglich", o: ["Aufsteigen", "Antraben", "Galopp", "Gelände", "volle Halle", "fremdes Pferd", "Wind und Geräusche", "allein am Stall"] },
  { id: "q4", t: "Denk an die Situation, die dir am meisten Angst macht. Wie stark ist die Angst gerade?", type: "scale" },
  { id: "q5", t: "Was merkst du dann im Körper?", type: "multi", hint: "Mehrere Antworten möglich", o: ["Herzklopfen", "flacher Atem", "feste Hände", "Beine klammern", "flauer Magen", "Zittern"] },
  { id: "q6", t: "Welcher Gedanke kommt dann?", type: "multi", hint: "Mehrere Antworten möglich", o: ["„Er geht gleich durch“", "„Ich falle wieder“", "„Alle schauen zu“", "„Ich kann das nicht mehr“", "„Was wird aus meinem Kind?“"] },
  { id: "q8", t: "Auf welchem Pferd reitest du?", type: "one", o: ["eigenes Pferd", "Reitbeteiligung", "Schulpferd", "wechselnd", "gerade keines"] },
  { id: "q9", t: "Hast du jemanden, der dich am Stall begleiten kann?", type: "one", o: ["Reitlehrerin", "Freundin oder Familie", "noch niemand"] },
  { id: "q10", t: "Hat dich eine Ärztin oder Hebamme fürs Reiten freigegeben?", type: "one", hint: "Wichtig nach einer Verletzung und nach der Geburt", o: ["ja", "noch nicht", "war nicht nötig"] },
  { id: "q11", t: "Kennst du eines davon?", type: "multi", hint: "Freiwillig – hilft uns, dir die richtigen Hinweise zu geben", o: ["Bilder vom Erlebnis kommen ungewollt", "Albträume", "Panik auch außerhalb des Stalls", "Die Angst schränkt meinen Alltag ein"] },
  { id: "q12", t: "Was möchtest du in 6 Wochen schaffen?", type: "text", placeholder: "z. B. Im Frühling wieder mit meiner Freundin ausreiten" },
];

export type CheckAnswers = Record<string, number | number[] | string>;

export const TYPEN: Record<TypId, { name: string; erkennen: string; staerke: string; werkzeug: string; teilen: string }> = {
  kopfkino: {
    name: "Die Kopfkino-Reiterin",
    erkennen: "Schon auf der Fahrt zum Stall läuft der Film, was alles passieren könnte.",
    staerke: "Starke Vorstellungskraft – die nutzen wir für Bilder, die Mut machen.",
    werkzeug: "Gedanken-Check und Mut-Film",
    teilen: "Meine Fantasie ist mein größter Gegner – und mein stärkstes Werkzeug.",
  },
  feinfuehlig: {
    name: "Die Feinfühlige",
    erkennen: "Der Körper schlägt zuerst Alarm: Herzklopfen, feste Hände, Beine klammern.",
    staerke: "Feines Körpergefühl – Pferde mögen Reiterinnen, die spüren.",
    werkzeug: "Atem-Reset und Lockerungs-Check",
    teilen: "Mein Körper merkt alles zuerst – und genau das macht mich zur feinen Reiterin.",
  },
  beschuetzerin: {
    name: "Die Beschützerin",
    erkennen: "„Was, wenn mir etwas passiert?“ Andere Menschen sind auf dich angewiesen.",
    staerke: "Umsicht und Verantwortung.",
    werkzeug: "Sicherheits-Check und Wenn-dann-Plan",
    teilen: "Ich denke an alle – und lerne gerade, auch an meinen Mut zu denken.",
  },
  ehrgeizig: {
    name: "Die Ehrgeizige",
    erkennen: "„Früher konnte ich das.“ Zuschauer und Vergleiche setzen dich unter Druck.",
    staerke: "Hoher Anspruch und Biss.",
    werkzeug: "Mutmacher-Satz und Mini-Ziele",
    teilen: "Ich will es richtig machen – und lerne, dass kleine Schritte auch zählen.",
  },
  erfahren: {
    name: "Die Erfahrene",
    erkennen: "Ein bestimmtes Erlebnis steckt in dir, und eine bestimmte Situation löst es aus.",
    staerke: "Du weißt genau, wovor du Angst hast – das ist der halbe Weg.",
    werkzeug: "Erlebnis einordnen und ein Plan für genau diese Situation",
    teilen: "Ich weiß genau, wovor ich Angst habe – und genau dort setze ich an.",
  },
};

/* ---------- Mut-Leiter: Vorschlag ---------- */

export type LadderTemplateStep = { t: string; saddle: boolean };

export function ladderTemplate(weg: Weg | null, ziel: string): LadderTemplateStep[] {
  return [
    { t: weg === "geburt" ? "Beim Pferd sein: 10 Minuten nur beobachten (Baby bei einer Begleitperson, mit Abstand zu den Pferden)" : "Beim Pferd sein: 10 Minuten am Paddock oder an der Box, nur beobachten", saddle: false },
    { t: "Putzen und Hufe auskratzen, Pferd angebunden", saddle: false },
    { t: "Führen auf bekanntem Weg, in der Halle oder auf dem Hof", saddle: false },
    { t: "Bodenarbeit: anhalten, rückwärts, weichen lassen", saddle: false },
    { t: "Aufsteigen mit Aufstiegshilfe und im Halten sitzen bleiben, jemand hält das Pferd", saddle: true },
    { t: "Schritt geführt oder an der Longe", saddle: true },
    { t: "Schritt allein in der Halle, Begleitperson ist da", saddle: true },
    { t: weg === "geburt" ? "Trab in kurzen Strecken, viele Übergänge, erst leichttraben" : "Trab in kurzen Strecken, viele Übergänge", saddle: true },
    { t: weg === "sturz" ? "Die Sturz-Situation in kleiner Form, z. B. die Ecke, an der es passiert ist" : "Deine Angst-Situation in kleiner Form, z. B. Galopp an der Longe oder ein kurzer Ausritt mit ruhigem Begleitpferd", saddle: true },
    { t: ziel.trim() || "Dein eigenes Ziel", saddle: true },
  ];
}

/* ---------- Hilfe ---------- */

export const HELP = {
  seelsorge: "0800 111 0 111",
  seelsorge2: "0800 111 0 222",
  terminservice: "116 117",
};
