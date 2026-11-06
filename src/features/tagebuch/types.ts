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

export const MOODS = [
  { id: "super", label: "Richtig gut" },
  { id: "gut", label: "Gut" },
  { id: "gemischt", label: "Durchwachsen" },
  { id: "schwierig", label: "Schwierig" },
  { id: "lehrreich", label: "Herausfordernd, aber lehrreich" },
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
};

export type DiaryData = {
  version: number;
  profile: RiderProfile;
  horses: Horse[];
  entries: DiaryEntry[];
  goals: Goal[];
};

export const emptyDiary: DiaryData = { version: DIARY_VERSION, profile: {}, horses: [], entries: [], goals: [] };

export function moodLabel(m?: Mood): string | undefined {
  return MOODS.find((x) => x.id === m)?.label;
}

export function relationLabel(r?: Relation): string | undefined {
  return RELATIONS.find((x) => x.id === r)?.label;
}
