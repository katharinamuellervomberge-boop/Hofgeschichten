import type { DocVisual, Step } from "@/engine/types";
import type { GameKind } from "./games";

/** Wer im Kapitelbild als gemaltes Porträt erscheint */
export type CastRef = "lea" | "mila" | "ben" | "kruemel" | "wilhelm" | "tilda" | "hanna" | "tivoli" | "scrabble" | "tonga";

export type DecorateGoal = {
  /** Diese Dekorationen müssen im Stall hängen */
  required: string[];
  /** Mindestanzahl geschmückter Plätze insgesamt */
  minPlaced?: number;
  /** Aufgabe in Kindersprache */
  task: string;
};

export type DoorPart =
  | { kind: "steps"; game: GameKind; title: string; intro?: string; steps: Step[] }
  | { kind: "decorate"; title: string; intro: string; goal: DecorateGoal }
  | { kind: "card"; title: string; intro: string }
  | {
      kind: "surprise";
      title: string;
      intro: string;
      /** Antippen zum Öffnen (z. B. Nikolausstiefel) */
      boxes: Array<{ label: string; reveal: string; owner: CastRef | "du" }>;
    }
  | { kind: "stall"; title: string; intro: string }
  | { kind: "message"; title: string; paragraphs: string[] }
  | { kind: "certificate"; title: string };

export type AdventDoor = {
  day: number;
  title: string;
  game: GameKind;
  chapter: {
    /** Szene aus dem Szenen-Verzeichnis (engine/VisualView.tsx) für das Kapitelbild */
    scene: string;
    cast: CastRef[];
    paragraphs: string[];
  };
  parts: DoorPart[];
  reward: {
    /** Fundstück für das Fundbuch – die neue Spur in der Geschichte */
    found: { title: string; doc: DocVisual };
    /** Ein Satz nach dem Abschluss */
    message: string;
  };
  /** Neugierig machen auf morgen (ohne zu verraten) */
  teaser: string;
};

/** Was die Kalenderübersicht über ein offenes Türchen wissen darf */
export type DoorSummary = {
  day: number;
  title: string;
  game: GameKind;
  found: { title: string; doc: DocVisual };
};
