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
  /** Was war schwierig? (seit 11.11.2026) */
  difficult?: string;
  /** Gehört zu diesem Ziel (vom Nutzer bestätigt, seit 11.11.2026) */
  goalId?: string;
  favorite?: boolean;
  photo?: string;
  createdAt: string;
  updatedAt: string;
};

export type Goal = {
  id: string;
  title: string;
  description?: string;
  horseId?: string;
  status: GoalStatus;
  createdAt: string;
  achievedAt?: string;
  /** Aus einer Rider-Coach-Analyse entstanden (CoachCase.id) */
  coachCaseId?: string;
  /** Trainingsplan in Wochen (Rider Coach → Rider Lab), seit 11.11.2026 */
  program?: GoalProgram;
};

/** Wochenplan eines Ziels: Übungen je Woche (rc-…), Trainingstage, Startwoche (Montag) */
export type GoalProgram = {
  weeks: { title: string; exercises: string[] }[];
  /** Trainingstage 0 = Montag … 6 = Sonntag (Anzahl = Häufigkeit pro Woche) */
  days: number[];
  start: string; // YYYY-MM-DD (Montag)
};

/* ---------- Trainingsplan (seit 09.11.2026) ---------- */
export const PLAN_KINDS = [
  { id: "reiten", label: "Reiten", hint: "Reitstunde, freies Reiten, Bodenarbeit …" },
  { id: "riderlab", label: "Rider Lab", hint: "Übung für Sitz und Körper – zu Hause" },
  { id: "lektion", label: "Lektion", hint: "Eine Lektion der Reitakademie" },
  { id: "eigenes", label: "Eigenes", hint: "Alles andere, z. B. Stall, Dehnen, Ausritt" },
  { id: "coach", label: "Rider Coach", hint: "Übungen aus einem Trainingsplan des Rider Coach" },
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
  exercises?: string[]; // Rider-Coach-Übungen (rc-…) dieser Einheit
  done?: boolean;
  doneAt?: string;
  entryId?: string; // daraus entstandener Tagebucheintrag
  createdAt: string;
};

export type DiaryData = {
  version: number;
  profile: RiderProfile;
  horses: Horse[];
  entries: DiaryEntry[];
  goals: Goal[];
  plan: PlanItem[];
  /** Rider Coach: Analysen, gespeicherte Lösungen und Rückmeldungen (seit 11.11.2026) */
  coach: CoachCase[];
};

/* ---------- Rider Coach (seit 11.11.2026, nur auf dem Gerät) ---------- */
export const FEEDBACK = [
  { id: "deutlich", label: "Ja, deutlich" },
  { id: "bisschen", label: "Ein bisschen" },
  { id: "noch-nicht", label: "Noch nicht" },
  { id: "nicht-probiert", label: "Ich habe sie noch nicht ausprobiert" },
] as const;
export type FeedbackRating = (typeof FEEDBACK)[number]["id"];

export type CoachFeedback = {
  id: string;
  exercise: string; // rc-…
  rating: FeedbackRating;
  date: string; // YYYY-MM-DD
  entryId?: string;
  planId?: string;
};

export const CASE_STATUS = [
  { id: "offen", label: "In Arbeit" },
  { id: "geloest", label: "Gelöst" },
] as const;
export type CaseStatus = (typeof CASE_STATUS)[number]["id"];

/** Eine Rider-Coach-Analyse: Problem, Antworten, Ergebnis und was daraus wurde */
export type CoachCase = {
  id: string;
  problem: string; // cp-…
  answers: Record<string, string>;
  /** Empfohlene Übungen zum Zeitpunkt der Analyse (rc-…) */
  exercises: string[];
  /** Sicherheits-Kennzeichen der Analyse */
  flags: ("abklaeren" | "stopp")[];
  status: CaseStatus;
  /** Lösung gemerkt („Meine gespeicherten Lösungen“) */
  saved?: boolean;
  goalId?: string;
  feedback: CoachFeedback[];
  createdAt: string;
  updatedAt: string;
};

export const emptyDiary: DiaryData = { version: DIARY_VERSION, profile: {}, horses: [], entries: [], goals: [], plan: [], coach: [] };

export function moodLabel(m?: Mood): string | undefined {
  return MOODS.find((x) => x.id === m)?.label;
}

export function relationLabel(r?: Relation): string | undefined {
  return RELATIONS.find((x) => x.id === r)?.label;
}
