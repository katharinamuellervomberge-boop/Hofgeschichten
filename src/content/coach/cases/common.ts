import type { CoachCause, CoachOption, CoachQuestion } from "../types";

/**
 * Bausteine, die in vielen Coaching-Fällen gleich sind. Jeder Fall bleibt trotzdem eigenständig:
 * eigene Fragen, eigene Ursachen, eigene Regeln (Punkte je Antwort).
 */

type Pts = Record<string, number> | undefined;

/** „Seit wann?“ – optional mit Punkten für Gewohnheit (laenger) und Kondition/Energie (pause) */
export const seit = (p: { laenger?: Pts; pause?: Pts } = {}): CoachQuestion => ({
  id: "q-seit",
  text: "Seit wann tritt das Problem auf?",
  options: [
    { id: "laenger", label: "Schon länger", summary: "das Problem besteht schon länger", causes: p.laenger },
    { id: "kurz", label: "Erst seit Kurzem", summary: "das Problem ist neu" },
    { id: "pause", label: "Seit einer Trainingspause", summary: "es begann nach einer Trainingspause", causes: p.pause },
    { id: "weiss-nicht", label: "Weiß ich nicht" },
  ],
});

/** Folgefrage bei „erst seit Kurzem“: Ausrüstung oder unerklärliche Veränderung → Abklärung */
export const veraendert = (p: { haltung?: Pts; reiter?: Pts } = {}): CoachQuestion => ({
  id: "q-veraendert",
  text: "Hat sich in letzter Zeit etwas verändert?",
  showIf: { q: "q-seit", anyOf: ["kurz"] },
  options: [
    { id: "ausruestung", label: "Neuer Sattel oder andere Ausrüstung", summary: "die Ausrüstung hat sich verändert", flag: "abklaeren", causes: { "c-koerper": 3 } },
    { id: "haltung", label: "Haltung, Fütterung oder Weidegang", summary: "Haltung oder Fütterung haben sich verändert", causes: p.haltung },
    { id: "reiter", label: "Neue Reiterin, neuer Reiter oder neuer Reitplatz", summary: "Reiter oder Reitplatz sind neu", causes: p.reiter },
    { id: "nichts", label: "Nichts, das ich kenne", summary: "es gibt keinen erkennbaren Grund für die Veränderung", flag: "abklaeren", causes: { "c-koerper": 2 } },
  ],
});

/** Ausbildungsstand der Reiterin/des Reiters → höchste Übungsstufe (engine.ts → levelCap) */
export const stand = (): CoachQuestion => ({
  id: "stand",
  text: "Wie schätzt du deinen eigenen Reitstand ein?",
  help: "Danach richtet sich, welche Übungen vorgeschlagen werden.",
  options: [
    { id: "anfaenger", label: "Ich bin noch Anfängerin oder Anfänger" },
    { id: "basis", label: "Ich reite sicher in allen Gangarten, aber noch nicht lange" },
    { id: "wieder", label: "Ich steige nach einer Pause wieder ein" },
    { id: "fortgeschritten", label: "Ich reite sicher und habe Erfahrung" },
  ],
});

/** Gesundheit/Ausrüstung – nie mit Übungen, immer mit Abklärung */
export const koerper = (text: string): CoachCause => ({
  id: "c-koerper",
  title: "Mögliche körperliche Ursache oder Ausrüstung",
  text: `${text} Das kann nur eine Fachperson beurteilen.`,
  exercises: [],
  health: true,
});

/** Antwortmöglichkeit kurz */
export const o = (id: string, label: string, causes?: Record<string, number>, summary?: string, flag?: CoachOption["flag"]): CoachOption => ({ id, label, causes, summary, flag });

/** Frage kurz */
export const q = (id: string, text: string, options: CoachOption[], extra: Partial<CoachQuestion> = {}): CoachQuestion => ({ id, text, options, ...extra });

/** Ursache kurz */
export const c = (id: string, title: string, text: string, exercises: string[]): CoachCause => ({ id, title, text, exercises });

/** Allgemeine Sicherheitshinweise beim Reiten */
export const SAFE_RIDE = ["Übe auf einem eingezäunten Platz mit Abstand zu anderen Reitern.", "Trage einen Helm und prüfe vorher Sattel, Gurt und Trense.", "Fühlst du dich unsicher: Übe gemeinsam mit deiner Reitlehrkraft."];
export const SAFE_GROUND = ["Trage Handschuhe und feste Schuhe.", "Bleib seitlich vom Pferd und lass dir immer einen Ausweg.", "Wickle Strick oder Longe nie um die Hand."];
export const SAFE_OUT = ["Reite ins Gelände nur mit Helm, Handy und Bescheid über Route und Rückkehrzeit.", "Bei Unsicherheit: absteigen und führen.", "Wähle für Übungen ruhige, bekannte Wege mit gutem Boden."];
