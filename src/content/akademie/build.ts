import type { Hotspot, MatchStep, MultiStep, Visual } from "@/engine/types";
import { LETTER_POINTS, riderPoint, type RiderMark, type RiderPose } from "@/components/illustrations/akademie/geometry";
import type { AcademyOption } from "./types";

/**
 * Kurzschreibweisen für die Inhaltsdateien. Sie erzeugen ausschließlich
 * reine Datenobjekte – die Inhalte bleiben damit gut prüf- und erweiterbar.
 */

export const item = (name: string): Visual => ({ kind: "item", name });
export const tag = (text: string): Visual => ({ kind: "tag", text });
export const head = (horse: string, mood: "neugierig" | "entspannt" | "grummelig" | "aufgeregt"): Visual => ({ kind: "head", horse, mood });

/** Richtige Antwort */
export const ok = (id: string, label: string, extra: Partial<AcademyOption> = {}): AcademyOption => ({ id, label, correct: true, ...extra });

/** Falsche Antwort mit erklärender Rückmeldung */
export const no = (id: string, label: string, feedback: string, extra: Partial<AcademyOption> = {}): AcademyOption => ({ id, label, feedback, ...extra });

/** Suchbild-Ziel auf einer Reiter-/Pferdeszene */
export function spot(id: string, label: string, mark: RiderMark, say: string, opts: { pose?: RiderPose; r?: number; levels?: Hotspot["levels"] } = {}): Hotspot {
  const [x, y] = riderPoint(mark, opts.pose ?? "sitz");
  return { id, label, x, y, r: opts.r ?? 34, say, levels: opts.levels };
}

/** Suchbild-Ziel: ein Bahnbuchstabe in der Reitbahn-Szene */
export function letterSpot(letter: keyof typeof LETTER_POINTS, label: string, say: string, levels?: Hotspot["levels"]): Hotspot {
  const [x, y] = LETTER_POINTS[letter];
  return { id: `buchstabe-${letter}`, label, x, y, r: 26, say, levels };
}

/** Huf-Symbol für Fußfolge-Karten */
export const huf = (): Visual => ({ kind: "item", name: "huf" });

type MatchItem = MatchStep["items"][number];

/** Zuordnungs-Karte */
export const card = (id: string, label: string, visual: Visual, target: string, say: string, wrong?: string, levels?: MatchItem["levels"]): MatchItem => ({
  id,
  label,
  visual,
  target,
  say,
  wrong,
  levels,
});

export type { MultiStep };
