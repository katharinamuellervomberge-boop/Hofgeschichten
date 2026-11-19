/** Datentypen von „Mutig reiten“ (für Server und Browser) */

export type Weg = "sturz" | "wieder" | "geburt";
export type TypId = "kopfkino" | "feinfuehlig" | "beschuetzerin" | "ehrgeizig" | "erfahren";
export type ToolId = "atem" | "locker" | "blick" | "satz" | "gedanken" | "plan" | "film" | "ritual";

export type UnitContent = {
  n: number;
  ziel: string;
  /** Absätze des Audio-Impulses (Text zum Mitlesen und Ersatz, wenn das Audio fehlt) */
  text: string[];
  /** Dateiname in private/mutig-audio/ oder null, solange die Aufnahme fehlt */
  audio: string | null;
  uebung: { titel: string; dauer: string; schritte: string[] };
  stall: { text: string; sattel: boolean; begleitung: boolean; hinweis: string | null } | null;
  werkzeug: ToolId | null;
  eingabe: { key: string; label: string; placeholder: string; multiline: boolean } | null;
  weg: string | null;
  link: { label: string; href: string } | null;
  /** Startwert aus dem Angst-Check zum Vergleich zeigen */
  vergleich: boolean;
};

export type WegLesson = { tag: number } & Record<Weg, { titel: string; text: string[] }>;

export type Tool = {
  id: ToolId;
  name: string;
  dauer: string;
  wann: string;
  warum: string;
  schritte: string[];
  /** Tag, an dem das Werkzeug eingeführt wird */
  tag: number;
};
