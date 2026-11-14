/**
 * Datenmodell „Mein Reitertagebuch“.
 *
 * Alle Daten bleiben ausschließlich auf diesem Gerät (IndexedDB, siehe db.ts).
 * Es gibt keine Übertragung an unsere Server. Gerätewechsel über eine
 * Sicherungsdatei (backup.ts). Alle Felder außer den nötigen Kennungen sind optional.
 */

export const DIARY_VERSION = 1;

export const DISCIPLINES = [
  "Dressur",
  "Springen",
  "Gelände",
  "Bodenarbeit",
  "Longieren",
  "Stangenarbeit",
  "Reitunterricht",
  "Freies Reiten",
  "Freiarbeit",
  "Sonstiges",
] as const;
export type Discipline = (typeof DISCIPLINES)[number];

/* short: mit weichen Trennstellen für die schmalen Stimmungs-Knöpfe */
export const MOODS = [
  { id: "super", label: "Richtig gut", short: "Richtig gut" },
  { id: "gut", label: "Gut", short: "Gut" },
  { id: "gemischt", label: "Durchwachsen", short: "Durch\u00adwachsen" },
  { id: "schwierig", label: "Schwierig", short: "Schwierig" },
  { id: "lehrreich", label: "Herausfordernd, aber lehrreich", short: "Heraus\u00adfordernd, aber lehr\u00adreich" },
] as const;
export type Mood = (typeof MOODS)[number]["id"];

export const LEVELS = ["Ich fange gerade an", "Anfänger", "Fortgeschritten", "Erfahren", "Wiedereinsteiger"] as const;

export const RELATIONS = [
  { id: "eigen", label: "Eigenes Pferd" },
  { id: "rb", label: "Reitbeteiligung" },
  { id: "schule", label: "Schulpferd" },
  { id: "anderes", label: "Anderes" },
] as const;
export type Relation = (typeof RELATIONS)[number]["id"];

export const SEXES = ["Stute", "Wallach", "Hengst"] as const;

export const GOAL_STATUS = [
  { id: "neu", label: "Neu" },
  { id: "uebe", label: "Ich übe" },
  { id: "geschafft", label: "Geschafft" },
] as const;
export type GoalStatus = (typeof GOAL_STATUS)[number]["id"];

export const GOAL_SUGGESTIONS = [
  "Sicher angaloppieren",
  "Selbstständig satteln",
  "Erster Ausritt",
  "Ruhigere Hände",
  "Leichttraben lernen",
  "Erstes Schenkelweichen",
  "Hufe selbst auskratzen",
  "Eine ganze Runde ohne Bügel",
];

export type RiderProfile = {
  name?: string;
  ridingSince?: string;
  level?: string;
  favoriteDiscipline?: string;
  wish?: string;
  proud?: string;
  /** Riding Space (seit 14.11.2026) */
  monthlyTarget?: number;
  activeHorseId?: string;
};

export type Horse = {
  id: string;
  name: string;
  photo?: string; // verkleinertes JPEG als data-URL, nur lokal
  nickname?: string;
  age?: string;
  breed?: string;
  sex?: string;
  height?: string;
  color?: string;
  relation?: Relation;
  since?: string;
  likes?: string;
  goodAt?: string;
  workingOn?: string;
  notes?: string;
  /** seit 14.11.2026 */
  birthYear?: number;
  training?: string;
  specials?: string;
  createdAt: string;
};

export type DiaryEntry = {
  id: string;
  date: string; // YYYY-MM-DD
  horseId?: string;
  minutes?: number;
  discipline?: Discipline;
  mood?: Mood;
  wentWell?: string;
  learned?: string;
  practice?: string;
  nextTime?: string;
  moment?: string;
  favorite?: boolean;
  photo?: string;
  /* seit 14.11.2026 (Riding Space) */
  focus?: string;
  intensity?: Intensity;
  difficult?: string;
  coachTip?: string;
  note?: string;
  goalId?: string;
  planId?: string;
  lessons?: string[]; // Lektions- (ra-…) oder Rider-Lab-IDs (rl-…)
  photos?: string[]; // weitere Fotos (data-URL, verkleinert)
  createdAt: string;
  updatedAt: string;
};

export const INTENSITIES = ["leicht", "mittel", "anspruchsvoll"] as const;
export type Intensity = (typeof INTENSITIES)[number];
export const PLAN_PHASES = ["Basis", "Aufbau", "Festigen"] as const;
export const PLAN_LEVELS = ["Einsteiger", "Fortgeschritten", "Erfahren"] as const;

/** Selbsteinschätzung zu einem Ziel (1–5) – subjektiv, keine Leistungsmessung */
export type GoalCheckin = { date: string; v: number };

/** Persönlicher Meilenstein – nur vom Nutzer selbst angelegt */
export type Milestone = { id: string; date: string; title: string; note?: string; horseId?: string; entryId?: string; createdAt: string };

/** Rider Coach (seit 14.11.2026): gespeicherter Coaching-Fall. Das Ergebnis wird aus den Antworten
 *  jedes Mal neu berechnet (content/coach) – keine doppelte Datenhaltung. */
export const COACH_FEEDBACK = ["unveraendert", "leicht", "deutlich", "geloest"] as const;
export type CoachFeedback = { date: string; v: (typeof COACH_FEEDBACK)[number]; note?: string };
export type CoachCaseRecord = {
  id: string;
  problemId: string; // cp-01 … cp-50
  horseId?: string;
  answers: Record<string, string>;
  goalId?: string;
  planId?: string; // TrainingPlan.id
  feedback: CoachFeedback[];
  createdAt: string;
  updatedAt: string;
};

/** Ein mit dem Plan-Builder erstellter Plan (Eingaben + angewendete Regeln) */
export type TrainingPlan = {
  id: string;
  goalId?: string;
  goalTitle: string;
  horseId?: string;
  perWeek: number;
  weeks: number;
  types: string[];
  level: string;
  start: string;
  category?: string;
  rules: string[];
  createdAt: string;
};

export type Goal = {
  id: string;
  title: string;
  description?: string;
  horseId?: string;
  status: GoalStatus;
  createdAt: string;
  achievedAt?: string;
  /* seit 14.11.2026 */
  startDate?: string;
  targetDate?: string;
  notes?: string;
  checkins?: GoalCheckin[];
};

/* ---------- Trainingsplan (seit 09.11.2026) ---------- */
export const PLAN_KINDS = [
  { id: "reiten", label: "Reiten", hint: "Reitstunde, freies Reiten, Bodenarbeit …" },
  { id: "riderlab", label: "Rider Lab", hint: "Übung für Sitz und Körper – zu Hause" },
  { id: "lektion", label: "Lektion", hint: "Eine Lektion der Reitakademie" },
  { id: "eigenes", label: "Eigenes", hint: "Alles andere, z. B. Stall, Dehnen, Ausritt" },
  { id: "boden", label: "Bodenarbeit", hint: "Bodenarbeit, Longieren, Freiarbeit" },
] as const;
export type PlanKind = (typeof PLAN_KINDS)[number]["id"];

/** Eine geplante Trainingseinheit an einem Tag */
export type PlanItem = {
  id: string;
  date: string; // YYYY-MM-DD
  kind: PlanKind;
  title: string;
  ref?: string; // Rider-Lab-Übung (rl-xx) oder Lektions-ID (ra-w…)
  minutes?: number;
  horseId?: string;
  discipline?: Discipline;
  note?: string;
  goalId?: string; // zahlt auf dieses Ziel ein
  done?: boolean;
  doneAt?: string;
  entryId?: string; // daraus entstandener Tagebucheintrag
  /* seit 14.11.2026 (Plan-Builder) */
  intensity?: Intensity;
  phase?: string;
  ex?: string[]; // Übungs-IDs der Bibliothek (ex-…)
  rl?: string[]; // Rider-Lab-IDs
  series?: string; // gehört zu TrainingPlan.id
  check?: boolean; // Standortbestimmung
  createdAt: string;
};

export type DiaryData = {
  version: number;
  profile: RiderProfile;
  horses: Horse[];
  entries: DiaryEntry[];
  goals: Goal[];
  plan: PlanItem[];
  /* seit 14.11.2026 – ältere Tagebücher haben diese Felder nicht */
  milestones?: Milestone[];
  plans?: TrainingPlan[];
  rest?: string[]; // geplante Ruhetage (YYYY-MM-DD)
  coach?: CoachCaseRecord[];
};

export const emptyDiary: DiaryData = { version: DIARY_VERSION, profile: {}, horses: [], entries: [], goals: [], plan: [], milestones: [], plans: [], rest: [], coach: [] };

export function moodLabel(m?: Mood): string | undefined {
  return MOODS.find((x) => x.id === m)?.label;
}

export function relationLabel(r?: Relation): string | undefined {
  return RELATIONS.find((x) => x.id === r)?.label;
}
