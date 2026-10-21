import type { RiderMark, RiderPose } from "./geometry";

/**
 * Namen und Einstellungen aller Akademie-Szenen (ohne React), damit
 * Inhalte und das Prüfskript dieselbe Liste verwenden wie die App.
 */

export const GAIT_NAMES = ["schritt", "trab", "galopp-rechts", "galopp-links"] as const;
export const ARENA_FIGURES = ["buchstaben", "ganze-bahn", "handwechsel", "halbe-bahn", "laenge", "zirkel", "volte", "schlange", "hufschlag", "begegnung"] as const;
export const HELMET_FITS = ["aufbau", "richtig", "offen", "schief", "muetze"] as const;
export const HAND_STYLES = ["richtig", "verdeckt", "breit"] as const;

export type RiderSceneConfig = {
  label: string;
  pose: RiderPose;
  marks?: RiderMark[];
  labels?: Partial<Record<RiderMark, string>>;
  line?: boolean;
  handLine?: boolean;
  block?: boolean;
  /** Nahansicht (nicht für Suchbilder verwenden – die brauchen die volle Szene) */
  zoom?: boolean;
};

export const RIDER_SCENES: Record<string, RiderSceneConfig> = {
  "ak-sattelzeug": { label: "Pferd mit Sattel und Trense", pose: "ohne" },
  "ak-aufsteigen": { label: "Pferd mit Aufsteighilfe", pose: "ohne", block: true },
  "ak-reiter-sitz": { label: "Reiterin im ausbalancierten Sitz", pose: "sitz" },
  "ak-reiter-sitz-linie": { label: "Senkrechte Linie Ohr, Schulter, Hüfte, Absatz", pose: "sitz", line: true, zoom: true },
  "ak-reiter-sitz-hand": { label: "Linie Ellbogen, Hand, Pferdemaul", pose: "sitz", handLine: true, zoom: true },
  "ak-reiter-vor": { label: "Reiterin lehnt sich nach vorn", pose: "vor" },
  "ak-reiter-zurueck": { label: "Reiterin lehnt sich nach hinten", pose: "zurueck" },
  "ak-reiter-stuhl": { label: "Reiterin im Stuhlsitz", pose: "stuhl" },
  "ak-reiter-absatz": { label: "Reiterin mit hochgezogenem Absatz", pose: "absatz" },
  "ak-reiter-leicht": { label: "Reiterin steht beim Leichttraben auf", pose: "leicht" },
  "ak-reiter-pause": { label: "Pause am langen Zügel", pose: "langzuegel" },
  "ak-reiter-hilfen": {
    label: "Die vier Hilfen",
    pose: "sitz",
    zoom: true,
    marks: ["gesaess", "schenkel-gurt", "hand", "stimme"],
    labels: { gesaess: "Gewicht", "schenkel-gurt": "Schenkel", hand: "Zügel", stimme: "Stimme" },
  },
  "ak-reiter-schenkel": {
    label: "Schenkellagen",
    pose: "sitz",
    zoom: true,
    marks: ["schenkel-gurt", "schenkel-hinter"],
    labels: { "schenkel-gurt": "am Gurt", "schenkel-hinter": "hinter dem Gurt" },
  },
  /* Nahansichten für Bildantworten */
  "ak-reiter-sitz-nah": { label: "Reiterin im ausbalancierten Sitz", pose: "sitz", zoom: true },
  "ak-reiter-vor-nah": { label: "Reiterin lehnt sich nach vorn", pose: "vor", zoom: true },
  "ak-reiter-zurueck-nah": { label: "Reiterin lehnt sich nach hinten", pose: "zurueck", zoom: true },
  "ak-reiter-stuhl-nah": { label: "Reiterin im Stuhlsitz", pose: "stuhl", zoom: true },
  "ak-reiter-absatz-nah": { label: "Reiterin mit hochgezogenem Absatz", pose: "absatz", zoom: true },
  "ak-reiter-leicht-nah": { label: "Reiterin steht beim Leichttraben auf", pose: "leicht", zoom: true },
};

export const SCENE_NAMES: string[] = [
  "ak-zonen",
  ...HELMET_FITS.map((f) => `ak-helm-${f}`),
  ...HAND_STYLES.map((h) => `ak-haende-${h}`),
  ...GAIT_NAMES.map((g) => `ak-gang-${g}`),
  ...GAIT_NAMES.map((g) => `ak-takt-${g}`),
  ...ARENA_FIGURES.map((f) => `ak-bahn-${f}`),
  ...Object.keys(RIDER_SCENES),
];
