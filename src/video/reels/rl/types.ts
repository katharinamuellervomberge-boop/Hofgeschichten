import type { Frame, Joints, P } from "./kinematics";

/** ok = richtig (Waldgrün), bad = häufiger Fehler (Rostrot), hint = Hinweis (Honiggold) */
export type Tone = "ok" | "bad" | "hint";
/** Gelenk, fester Punkt oder Gelenk mit Versatz */
export type Anchor = keyof Joints | P | [keyof Joints, number, number];

type Win = { from?: number; to?: number; tone?: Tone };

export type Overlay = Win &
  (
    | { k: "ring"; at: Anchor; r?: number }
    | { k: "dot"; at: Anchor; r?: number }
    /** Pfeil ab Gelenk (+ Versatz o) mit Richtung d */
    | { k: "arrow"; at: Anchor; d: P; o?: P }
    /** Bogenpfeil um ein Gelenk; Winkel wie am Bildschirm (0 = rechts, 90 = unten) */
    | { k: "arc"; at: Anchor; r: number; a0: number; a1: number }
    /** leuchtender Abschnitt (Dehnung, Muskelarbeit) */
    | { k: "glow"; a: Anchor; b: Anchor; w?: number; pulse?: boolean }
    /** Lot vom Punkt zum Boden (Schwerpunkt) */
    | { k: "plumb"; at: Anchor }
    /** Linie durch zwei Punkte, verlängert (Beckenlinie, Stab am Rücken) */
    | { k: "level"; a: Anchor; b: Anchor; ext?: number }
    /** Bahn eines Gelenks über die ganze Schleife */
    | { k: "trace"; at: keyof Joints }
    | { k: "text"; at: Anchor; o?: P; text: string }
    /** gestrichelte Linie am Rücken entlang (Wirbelsäule) */
    | { k: "spine" }
    /** Beckenschaufel, dreht mit pose.pt */
    | { k: "pelvis" }
    /** Druckpunkte unter dem Fuß (Frontansicht) */
    | { k: "press"; at: "an1" | "an2" }
    /** kleine Uhr (Beckenuhr) mit Punkt bei pose.x.clk Grad */
    | { k: "clock"; at: P }
    /** Schulterblätter (Frontansicht, durchscheinend), Drehung pose.x.sc */
    | { k: "scapula" }
  );

export type Prop =
  | { k: "chair"; x: number; seat: number; back?: "left" | "right"; w?: number }
  | { k: "wall"; x: number }
  | { k: "mat"; x0: number; x1: number }
  /** Wand hinter der Figur (Frontansicht) */
  | { k: "backwall" }
  /** bruchsicheres Gefäß zwischen den Händen; Neigung pose.x.gl, Schwappen pose.x.slosh */
  | { k: "glass" };

export type View = "side" | "front" | "ninety";

export type Animation = {
  view: View;
  props?: Prop[];
  frames: Frame[];
  overlays?: Overlay[];
  /** Wiederholungen pro Schleife (für das Mitzählen) */
  repsPerLoop?: number;
  /** Takt-Anzeige: Zeitpunkte in der Schleife mit Zählwort */
  beats?: Array<{ t: number; text: string }>;
  mistake?: { label: string; text: string; frames: Frame[]; overlays?: Overlay[] };
};

export type Dose =
  | { kind: "time"; seconds: number; sets?: number; sides?: boolean }
  | { kind: "reps"; reps: number; sets?: number; sides?: boolean };

export type Exercise = {
  id: string;
  slug: string;
  number: number;
  title: string;
  /** A: welches Reitproblem */
  goal: string;
  steps: string[];
  dose: Dose;
  /** Kurzform für Karten, z. B. „30 s je Seite“ */
  doseLabel: string;
  aha: string;
  transfer: string;
  /** einfachere Variante */
  easier?: string;
  /** Sicherheit, falls übungsspezifisch */
  caution?: string;
  /** Hinweis zur Darstellung, wenn die Ansicht vom Auftrag abweicht */
  viewNote?: string;
  anim: Animation;
};

export type Area = {
  id: string;
  slug: string;
  number: number;
  title: string;
  problem: string;
  intro: string;
  tint: string;
  exercises: Exercise[];
};
