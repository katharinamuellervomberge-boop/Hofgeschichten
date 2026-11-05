/**
 * „Hofgeschichten – Mein Tag am Hof“ – Datenmodell.
 *
 * Alles hier ist reine Daten (kein React). Neue Aufgaben, Ereignisse, Pferde,
 * Orte oder später Wetter/Jahreszeiten werden als Daten ergänzt – die
 * Oberfläche (src/features/hoftag) liest nur diese Typen.
 *
 * Textregel: Gemeinsame Texte benutzen KEINE Pronomen für das Pferd, sondern
 * `{name}` (Tongas Geschlecht ist noch offen). Platzhalter werden in
 * `fillText()` (engine.ts) ersetzt.
 */

export type HorseId = "tivoli" | "tonga" | "scrabble";

/** Tagesabschnitte in fester Reihenfolge */
export type TimeOfDay = "morgen" | "vormittag" | "mittag" | "nachmittag" | "abend";

/** Bereiche der Hofkarte (siehe claude/hof-lageplan.md) */
export type PlaceId = "stall" | "paddock" | "putzplatz" | "reitplatz" | "futterkammer" | "heulager";

/** Figuren, die im Spiel sprechen */
export type SpeakerId = "hanna" | "wilhelm" | "tilda" | "mats" | "kruemel" | "lea" | "mila" | "ben";

/** Statuswerte 0–100. Sie gelten nur innerhalb eines Hoftags – es gibt keinen Verfall über echte Zeit. */
export type StatKey = "wohl" | "wasser" | "futter" | "pflege" | "bewegung" | "vertrauen";
export type Stats = Record<StatKey, number>;
export type StatDelta = Partial<Stats>;

/** Belohnung einer Aufgabe */
export type Reward = {
  stats?: StatDelta;
  /** Langfristiges Vertrauen zum Pferd (wird nach dem Tag gutgeschrieben) */
  trust?: number;
  /** Pferdewissen-Punkte */
  knowledge?: number;
  xp?: number;
};

/** Eine Antwortmöglichkeit bei Auswahl-Aufgaben */
export type Option = {
  id: string;
  label: string;
  correct: boolean;
  /** Rückmeldung (1–2 Sätze). Bei falschen Antworten freundlich, mit Tipp. */
  feedback: string;
  /** Optional: Bildsymbol (ItemIcon-Name) */
  icon?: string;
};

/** Ein Tipp-Ziel in einer Szene (Koordinaten in der 800×500-Szene) */
export type Spot = {
  id: string;
  x: number;
  y: number;
  r?: number;
  label: string;
  /** Kurzer Satz nach dem Antippen */
  note?: string;
  /** Bildsymbol beim Einsammeln (ItemIcon-Name), sonst passend zu `item` */
  icon?: string;
};

/**
 * Aufgabenarten – bewusst wenige, generische Bausteine:
 *  goto     – auf der Hofkarte den richtigen Bereich antippen
 *  choice   – Frage mit Auswahl (z. B. JA/NEIN), falsch = Tipp + neuer Versuch
 *  check    – Stellen in der Szene antippen und anschauen (Zustand, Beine, Box)
 *  collect  – Dinge antippen/einsammeln (Mist → Schubkarre, Einstreu, Aufräumen)
 *  fill     – Eimer/Tränke durch Antippen füllen
 *  feed     – Futter auswählen (richtiges Futter, nichts Ungeeignetes)
 *  groom    – Putzzeug an der richtigen Stelle benutzen
 *  activity – Tagesaktivität (Spaziergang, Bodenarbeit, Stangen) in kleinen Schritten
 */
export type TaskKind = "goto" | "choice" | "check" | "collect" | "fill" | "feed" | "groom" | "activity";

type TaskBase = {
  id: string;
  kind: TaskKind;
  /** Kurzer Titel für Listen, z. B. „Wasser kontrollieren“ */
  title: string;
  /** Hinweis auf dem Startbildschirm („Deine nächste Aufgabe“) */
  teaser: string;
  /** Ort der Aufgabe */
  place: PlaceId;
  /** Wer erklärt/begleitet */
  speaker?: SpeakerId;
  /** Einleitung (1–2 Sätze) */
  intro: string;
  /** Lernmoment nach dem Erledigen (1–3 Sätze) */
  learn?: string;
  /** Wissenskarte fürs Hofbuch, die dabei freigeschaltet wird */
  knowledgeCard?: string;
  reward: Reward;
  /** Eintrag in der Tagesauswertung („Heute hast du …“) */
  summary?: SummaryKey;
  /** Nur für bestimmte Pferde */
  horses?: HorseId[];
  /** Pferdespezifische Abweichungen (Texte, Optionen) */
  variants?: Partial<Record<HorseId, TaskVariant>>;
};

/** Was sich je Pferd an einer Aufgabe ändern darf */
export type TaskVariant = {
  title?: string;
  teaser?: string;
  intro?: string;
  learn?: string;
  knowledgeCard?: string;
  options?: Option[];
  item?: CollectTask["item"];
};

export type GotoTask = TaskBase & { kind: "goto"; target: PlaceId };
export type ChoiceTask = TaskBase & {
  kind: "choice";
  question: string;
  options: Option[];
  /** Statusanzeige des Pferdes über der Frage einblenden („Wie geht es deinem Pferd?“) */
  showStats?: boolean;
  /** Szene über der Frage (sonst Figur mit Sprechblase) */
  scene?: SceneId;
};
export type CheckTask = TaskBase & { kind: "check"; scene: SceneId; spots: Spot[]; done: string };
export type CollectTask = TaskBase & {
  kind: "collect";
  scene: SceneId;
  spots: Spot[];
  /** Was sich füllt, z. B. „Schubkarre“ */
  container: "schubkarre" | "heunetz" | "korb" | "keiner";
  item: "mist" | "stroh" | "spaene" | "heu" | "schlamm" | "ding" | "stein";
  done: string;
};
export type FillTask = TaskBase & { kind: "fill"; vessel: "eimer" | "traenke" | "trog"; taps: number; done: string };
export type FeedTask = TaskBase & {
  kind: "feed";
  question: string;
  /** Alle Futterangebote; `correct` = gehört hinein, falsche geben Tipp */
  options: Option[];
  done: string;
};
export type GroomTask = TaskBase & { kind: "groom"; done: string };
export type ActivityTask = TaskBase & { kind: "activity"; done: string };

export type TaskDef = GotoTask | ChoiceTask | CheckTask | CollectTask | FillTask | FeedTask | GroomTask | ActivityTask;

/** Szenen, die die Oberfläche zeichnen kann (src/features/hoftag/Scene.tsx) */
export type SceneId = "box" | "boxtuer" | "paddock" | "putzplatz" | "heulager" | "hof" | "futterkammer" | "reitplatz";

/** Einträge der Tagesauswertung */
export type SummaryKey =
  | "begruesst"
  | "gefuettert"
  | "wasser"
  | "ausgemistet"
  | "eingestreut"
  | "geputzt"
  | "hufe"
  | "bewegung"
  | "beobachtet"
  | "geholfen"
  | "versorgt";

/** Ein Abschnitt des Tages mit seinen festen Aufgaben */
export type Phase = {
  id: TimeOfDay;
  label: string;
  /** Kurzer Stimmungssatz, z. B. „Der Hof erwacht.“ */
  mood: string;
  tasks: TaskDef[];
};

/** Tagesereignis (zufällig, sorgt für Abwechslung) */
export type RandomEvent = {
  id: string;
  /** Meldung, z. B. „Oh! {name} hat sich im Schlamm gewälzt.“ */
  text: string;
  speaker?: SpeakerId;
  /** In welchem Abschnitt das Ereignis auftaucht */
  phase: TimeOfDay;
  /** Nur für bestimmte Pferde */
  horses?: HorseId[];
  /** Startwerte des Tages verändern (z. B. Pflege niedriger nach Schlamm) */
  startStats?: StatDelta;
  /** Zusätzliche Mini-Aufgabe, wird am Anfang des Abschnitts eingefügt */
  task?: TaskDef;
  /** Fundstück fürs Hofbuch */
  found?: string;
  /** Kurzer Wissenssatz */
  learn?: string;
  /** Gewicht für die Auswahl (Standard 1) – später für Wetter/Jahreszeit nutzbar */
  weight?: number;
  /** Platz für spätere Bedingungen (Jahreszeit, Wetter, Wochentag …) */
  when?: { seasons?: Season[]; weather?: Weather[] };
};

/* --- vorbereitet für spätere Erweiterungen (noch nicht ausgewertet) --- */
export type Season = "fruehling" | "sommer" | "herbst" | "winter";
export type Weather = "sonnig" | "bewoelkt" | "regen" | "heiss" | "frost" | "wind";

/** Spielprofil eines Pferdes (ergänzt content/horses.ts) */
export type HorseProfile = {
  id: HorseId;
  /** 1–2 kurze Eigenschaften für die Auswahlkarte */
  traits: string[];
  /** Satz auf der Auswahlkarte */
  pitch: string;
  /** Besonderheit, die im Spiel eine Rolle spielt */
  special?: string;
  /** Begrüßung: wie das Pferd reagiert */
  greeting: string;
  /** Beobachtungen über den Tag (Mittag), zufällig gewählt */
  observations: Observation[];
  /** Startwerte am Morgen */
  start: Stats;
};

export type Observation = {
  id: string;
  /** Was man sieht */
  text: string;
  question: string;
  options: Option[];
  learn: string;
  knowledgeCard?: string;
};

/* ---------- Spielstand ---------- */

export type DayState = {
  /** fortlaufende Nummer des Hoftags */
  number: number;
  horse: HorseId;
  /** Startwert für den Zufall (Ereignisse, Aktivität, Beobachtung) */
  seed: number;
  events: string[];
  activity: ActivityId;
  observation: string;
  phase: TimeOfDay;
  completedTasks: string[];
  stats: Stats;
  earned: { trust: number; knowledge: number; xp: number };
  summary: SummaryKey[];
  /** Ereignismeldungen, die schon gezeigt wurden */
  seenEvents: string[];
  /** Neu entdeckte Wissenskarten an diesem Tag */
  cards: string[];
  found: string[];
  startedAt: number;
  finishedAt: number | null;
};

export type ActivityId = "spaziergang" | "bodenarbeit" | "stangen";

export type DayRecord = {
  number: number;
  horse: HorseId;
  date: number;
  xp: number;
  trust: number;
  knowledge: number;
  events: string[];
  activity: ActivityId;
};

/** Langfristiger Fortschritt – bleibt auf dem Gerät (localStorage über lib/progress) */
export type HoftagProgress = {
  /** Aktuelles Pflegepferd */
  horse: HorseId | null;
  introSeen: boolean;
  xp: number;
  /** Vertrauen je Pferd (wächst nur, sinkt nie) */
  trust: Partial<Record<HorseId, number>>;
  knowledge: number;
  /** Freigeschaltete Wissenskarten (IDs) */
  cards: string[];
  /** Fundstücke */
  found: string[];
  /** Abzeichen (vorbereitet) */
  badges: string[];
  daysCompleted: number;
  /** Letzte Tage (höchstens 20) */
  history: DayRecord[];
  day: DayState | null;
  lastPlayedAt: number | null;
  /** Stallgeräusche an/aus (fehlt = an) */
  sound?: boolean;
};

export const emptyHoftag: HoftagProgress = {
  horse: null,
  introSeen: false,
  xp: 0,
  trust: {},
  knowledge: 0,
  cards: [],
  found: [],
  badges: [],
  daysCompleted: 0,
  history: [],
  day: null,
  lastPlayedAt: null,
};
