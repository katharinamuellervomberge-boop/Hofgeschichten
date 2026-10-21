/**
 * Inhaltsmodell der Hofgeschichten.
 *
 * Alle Inhalte liegen in V1 als typisierte Daten in /src/content.
 * Später können dieselben Typen aus einer Datenbank oder einem CMS
 * befüllt werden – die Komponenten bleiben unverändert.
 */

/** Ein Steckbrief-Feld. `placeholder: true` wird in der App sichtbar gekennzeichnet. */
export type Fact = {
  label: string;
  value: string;
  placeholder?: boolean;
};

/** Parameter für die Pferde-Illustration (Fellfarbe, Abzeichen). */
export type HorseLook = {
  coat: string; // Grundfarbe Fell
  coatShade: string; // dunklerer Ton für Schatten & entfernte Beine
  mane: string; // Mähne & Schweif
  hoof: string;
  face?: "blaze" | "star" | "none"; // Blesse, Stern, keins
  socks?: Array<"frontNear" | "frontFar" | "hindNear" | "hindFar">; // weiße Fesseln
  dapples?: boolean; // Apfelschimmel-Tupfen
  pinto?: boolean; // Schecke: große weiße Platten
  /** Farbe der Unterbeine (z. B. schwarze Beine beim Braunen) */
  points?: string;
  /** Mähne & Schweif zweifarbig (z. B. beim Schecken) */
  maneLight?: string;
};

export type Horse = {
  slug: string;
  name: string;
  /** Kurzer Satz zum Vorlesen für Kinder. */
  intro: string;
  look: HorseLook;
  /** true = Illustration ist noch nicht an das echte Pferd angepasst. */
  lookIsPlaceholder: boolean;
  /**
   * Gemaltes Porträt (Aquarell) in /public/horses.
   * Es gibt je zwei Größen: <base>-480.webp und <base>-960.webp (Format 4:5).
   */
  portrait?: { base: string; alt: string };
  facts: Fact[];
  /** Allgemeines, sachlich richtiges Pferdewissen (kein Platzhalter). */
  knowledge: string[];
  /** Hintergrundfarbe der Steckbrief-Karte */
  tint: string;
  /** Relative Größe in Illustrationen (1 = normal) */
  size: number;
  /** Fürwort für Texte; null = unbekannt, Texte bleiben neutral */
  pronoun: "er" | "sie" | null;
};

export type Character = {
  slug: string;
  name: string;
  description: string;
  placeholder: boolean;
  look: { skin: string; hair: string; hairStyle: "braid" | "curls" | "short"; shirt: string };
  /** Gemaltes Porträt (quadratische WebP-Dateien `<base>-160|320|640.webp`) */
  portrait?: { base: string; alt: string };
};

export type ContentStatus = "placeholder" | "published";

/**
 * Zugriffsstufe. In V1 sind alle Folgen "free".
 * "purchase" ist für spätere Shopify-Kaufberechtigungen vorgesehen –
 * die Prüfung MUSS dann serverseitig erfolgen (siehe src/lib/access.ts).
 */
export type AccessLevel = "free" | "purchase";

export type Episode = {
  slug: string;
  number: number;
  title: string;
  teaser: string;
  /** Pfad zur Audiodatei (V1: /public/audio). Später: signierte URL vom Server. */
  audioSrc: string;
  durationSeconds: number;
  horse: string; // Slug des Hauptpferdes
  characters: string[]; // Slugs der Kinder
  status: ContentStatus;
  access: AccessLevel;
  /** Für später: Shopify-Produkt-Handle, das die Folge freischaltet. */
  shopifyProductHandle?: string;
  coverTint: string;
};

/* ---------- Lernspiele (kostenlos) ---------- */

export type GameInfo = {
  id: string;
  title: string;
  /** Lernziel – für den Elternbereich */
  learns: string;
  tint: string;
  /** Vorschaubild auf der Spielekarte */
  art: "care" | "quiz" | "ears";
};

/* ---------- Detektiv-Abenteuer ---------- */

/** Öffentliche Angaben zu einem Abenteuer (ohne Spielinhalte). */
export type AdventureMeta = {
  slug: string;
  title: string;
  /** Kurzer Satz für Kinder, ohne Preis */
  teaser: string;
  /** Beschreibung für Eltern */
  parentInfo: string;
  season: "halloween" | "november" | "weihnachten" | "winter" | "ganzjaehrig";
  access: "free" | "premium";
  /** Shopify-Produkt-Handle; Käufe mit diesem Produkt schalten frei */
  shopifyProductHandle: string;
  priceLabel: string;
  /** Titel der Missionen – öffentlich, damit gesperrte Abenteuer eine Übersicht zeigen können */
  missions: Array<{ id: string; title: string }>;
  badge: { title: string };
  /**
   * Nur in diesen Stufen spielbar (fehlt = alle). Bei genau einer Stufe
   * wird die Stufenwahl im Fall ausgeblendet und das Alter angezeigt.
   */
  levels?: import("@/engine/types").Level[];
  /** Altershinweis für Kinder- und Elternansicht, z. B. „ab 7 Jahren“ */
  ageLabel?: string;
  /** Sichtbar in der App? (für vorbereitete, noch nicht veröffentlichte Fälle) */
  published: boolean;
};

/* ---------- Stempel & Abzeichen ---------- */

export type StampMotif =
  | "headphones"
  | "star"
  | "horse"
  | "carrot"
  | "cards"
  | "ear"
  | "horseshoe"
  | "brush"
  | "question"
  | "magnifier"
  | "pumpkin"
  | "footprint"
  | "lock"
  | "eye"
  /* Reitakademie */
  | "helmet"
  | "seat"
  | "signals"
  | "walk"
  | "trot"
  | "canter"
  | "arena"
  | "heart"
  | "rosette";

export type StampRule =
  | { type: "activity"; id: string }
  | { type: "horse"; slug: string }
  | { type: "mission"; adventure: string; mission: string }
  | { type: "adventure"; slug: string }
  | { type: "allFree" }
  /** Alle genannten Aktivitäten mindestens einmal abgeschlossen (z. B. eine Lernwelt der Reitakademie) */
  | { type: "activities"; ids: string[] };

export type StampInfo = {
  id: string;
  title: string;
  /** Wie man den Stempel bekommt – wird vorgelesen. */
  how: string;
  motif: StampMotif;
  rule: StampRule;
  /** Gehört zu einem Abenteuer (wird nur angezeigt, wenn es freigeschaltet ist) */
  adventure?: string;
  /** Gehört zur Reitakademie (eigener Abschnitt im Pass) */
  academy?: boolean;
};
