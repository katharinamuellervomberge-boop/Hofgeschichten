import { HORSE_POINTS as P } from "./geometry";

/**
 * Putzen: Putzzeug + Körperstelle. Die Reihenfolge ist fachlich sinnvoll
 * (Striegel → Kardätsche → Mähnenbürste → Hufkratzer). Weitere Werkzeuge
 * (Schwamm, Wurzelbürste …) können hier später ergänzt werden.
 */
export type GroomZone = "fell" | "maehne" | "hufe";
export type GroomToolId = "striegel" | "kardaetsche" | "maehnenbuerste" | "hufkratzer";

export type GroomTool = {
  id: GroomToolId;
  name: string;
  /** ItemIcon-Name */
  icon: "striegel" | "buerste" | "kamm" | "hufkratzer";
  zone: GroomZone;
  /** Kurz, was das Werkzeug macht */
  does: string;
};

export const GROOM_TOOLS: GroomTool[] = [
  { id: "striegel", name: "Striegel", icon: "striegel", zone: "fell", does: "In kleinen Kreisen löst der Striegel Schmutz und lose Haare." },
  { id: "kardaetsche", name: "Kardätsche", icon: "buerste", zone: "fell", does: "Mit der Kardätsche bürstest du den Staub in Fellrichtung heraus." },
  { id: "maehnenbuerste", name: "Mähnenbürste", icon: "kamm", zone: "maehne", does: "Mähne und Schweif werden vorsichtig von unten nach oben entwirrt." },
  { id: "hufkratzer", name: "Hufkratzer", icon: "hufkratzer", zone: "hufe", does: "Der Hufkratzer holt Schmutz und Steine aus den Hufen – immer von hinten nach vorn zur Spitze." },
];

/** Reihenfolge der Putzschritte */
export const GROOM_ORDER: GroomToolId[] = ["striegel", "kardaetsche", "maehnenbuerste", "hufkratzer"];

/** Was als Nächstes dran ist – als kleiner Hinweis, ohne das Werkzeug zu verraten */
export const GROOM_HINTS: Record<GroomToolId, string> = {
  striegel: "Zuerst lockerst du den Schmutz im Fell.",
  kardaetsche: "Jetzt bürstest du den gelösten Staub aus dem Fell.",
  maehnenbuerste: "Mähne und Schweif sind dran.",
  hufkratzer: "Zum Schluss: die Hufe!",
};

/** Tippbereiche am Pferd (Szene 800 × 500) */
export const GROOM_ZONES: Record<GroomZone, Array<{ x: number; y: number; r: number }>> = {
  fell: [
    { ...P.fell, r: 70 },
    { ...P.schulter, r: 50 },
  ],
  maehne: [
    { ...P.maehne, r: 42 },
    { ...P.schweif, r: 42 },
  ],
  hufe: [
    { ...P.vorderhuf, r: 34 },
    { ...P.hinterhuf, r: 34 },
  ],
};

export const ZONE_LABEL: Record<GroomZone, string> = { fell: "Fell", maehne: "Mähne und Schweif", hufe: "Hufe" };
