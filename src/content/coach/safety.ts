import type { CoachQuestion } from "./types";

/**
 * Vorgeschaltete Sicherheitsprüfung – wird bei jedem Problem zuerst gefragt.
 * Schmerz- oder Lahmheitshinweise → „stopp“ (keine Übungen mit Pferd, kein Plan).
 * Unsicher, plötzliche Veränderung, starke Abwehr → „abklaeren“ (nur schonende Übungen).
 * Es wird nie eine Diagnose gestellt.
 */
export const SAFETY_QUESTIONS: CoachQuestion[] = [
  {
    id: "s-schmerz",
    text: "Gibt es Hinweise auf Schmerzen, Lahmheit oder Unwohlsein?",
    help: "Zum Beispiel Taktunreinheit, Empfindlichkeit beim Putzen oder Satteln, weniger Fressen, ungewohnte Müdigkeit.",
    options: [
      { id: "nein", label: "Nein, mir ist nichts aufgefallen" },
      { id: "ja", label: "Ja", flag: "stopp", summary: "es gibt Hinweise auf Schmerzen oder Unwohlsein" },
      { id: "unsicher", label: "Ich bin unsicher", flag: "abklaeren", summary: "du bist unsicher, ob dein Pferd Schmerzen hat" },
    ],
  },
  {
    id: "s-plotzlich",
    text: "Hat sich das Verhalten plötzlich verändert – ohne erkennbaren Grund?",
    options: [
      { id: "nein", label: "Nein" },
      { id: "ja", label: "Ja, ganz plötzlich", flag: "abklaeren", summary: "das Verhalten hat sich plötzlich verändert" },
      { id: "weiss-nicht", label: "Weiß ich nicht" },
    ],
  },
  {
    id: "s-abwehr",
    text: "Zeigt dein Pferd starke Abwehrreaktionen?",
    help: "Zum Beispiel Buckeln, Steigen, Ausschlagen, heftiges Kopfschlagen – beim Reiten, Satteln oder Gurten.",
    options: [
      { id: "nein", label: "Nein" },
      { id: "ja", label: "Ja", flag: "abklaeren", summary: "dein Pferd zeigt starke Abwehrreaktionen" },
    ],
  },
];

export const SAFETY_CHECK_WHEN = [
  "Dein Pferd lahmt, geht taktunrein oder zeigt Schmerzanzeichen – Tierärztin oder Tierarzt.",
  "Abwehr beim Satteln, Gurten oder Aufsitzen – Sattelpassform prüfen lassen, Rücken und Zähne kontrollieren lassen.",
  "Das Verhalten ändert sich plötzlich – erst gesundheitlich abklären, dann weiter trainieren.",
];

/** Akademie-Lektionen zu Gesundheit und Verhalten (bei „abklären“/„stopp“ zuerst gezeigt) */
export const HEALTH_LESSONS = ["ra-w16-l3", "ra-w16-l12", "ra-w17-l11"];
