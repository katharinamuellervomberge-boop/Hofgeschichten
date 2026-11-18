import type { AidId, ArenaExercise, ArenaSize, Bend, Gait, Phase, Pt, Rein, Segment } from "./types";

/**
 * Bahngeometrie in echten Metern – ohne React, damit Prüfskripte sie testen können.
 *
 * Koordinaten: x entlang der Bahn von A (0) nach C (40 bzw. 60), y quer von der
 * K-Seite (0) zur F-Seite (20). Auf dem Bildschirm liegt A links und C rechts,
 * die Seite K–E–H oben. Wer bei A einreitet und auf C schaut, hat K links.
 * Linke Hand = gegen den Uhrzeigersinn (von oben gesehen).
 *
 * Winkel sind Bildschirmwinkel (y nach unten): 0° = Richtung C, 90° = Richtung F-Seite.
 */

export const ARENA_WIDTH = 20;
export const arenaLength = (size: ArenaSize) => (size === "20x40" ? 40 : 60);

export type Letter = { l: string; x: number; y: number; side: "kurz" | "oben" | "unten" | "mitte" };

/**
 * Bahnbuchstaben nach den üblichen Dressurviereck-Regeln (FN/FEI):
 * 20 × 40: K, E, H (oben) und F, B, M (unten) bei 6 / 20 / 34 m; Mittellinie D, X, G.
 * 20 × 60: K, V, E, S, H bzw. F, P, B, R, M bei 6 / 18 / 30 / 42 / 54 m; Mittellinie D, L, X, I, G.
 * A und C liegen in der Mitte der kurzen Seiten.
 */
export function arenaLetters(size: ArenaSize): Letter[] {
  const L = arenaLength(size);
  const marks: Array<[number, string, string, string]> =
    size === "20x40"
      ? [
          [6, "K", "F", "D"],
          [20, "E", "B", "X"],
          [34, "H", "M", "G"],
        ]
      : [
          [6, "K", "F", "D"],
          [18, "V", "P", "L"],
          [30, "E", "B", "X"],
          [42, "S", "R", "I"],
          [54, "H", "M", "G"],
        ];
  const out: Letter[] = [
    { l: "A", x: 0, y: 10, side: "kurz" },
    { l: "C", x: L, y: 10, side: "kurz" },
  ];
  for (const [x, top, bottom, mid] of marks) {
    out.push({ l: top, x, y: 0, side: "oben" }, { l: bottom, x, y: ARENA_WIDTH, side: "unten" }, { l: mid, x, y: 10, side: "mitte" });
  }
  return out;
}

/* ---------- Linien ---------- */

const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;

export function segmentLength(s: Segment): number {
  if (s.kind === "line") return Math.hypot(s.to.x - s.from.x, s.to.y - s.from.y);
  if (s.kind === "arc") return Math.abs(rad(s.endDeg - s.startDeg)) * s.r;
  return 0;
}

/** Punkt und Blickrichtung nach d Metern auf einem Abschnitt */
export function pointOnSegment(s: Segment, d: number): { p: Pt; heading: number } {
  if (s.kind === "line") {
    const len = segmentLength(s) || 1;
    const k = Math.min(1, Math.max(0, d / len));
    return {
      p: { x: s.from.x + (s.to.x - s.from.x) * k, y: s.from.y + (s.to.y - s.from.y) * k },
      heading: deg(Math.atan2(s.to.y - s.from.y, s.to.x - s.from.x)),
    };
  }
  if (s.kind === "arc") {
    const len = segmentLength(s) || 1;
    const k = Math.min(1, Math.max(0, d / len));
    const a = rad(s.startDeg + (s.endDeg - s.startDeg) * k);
    const dir = Math.sign(s.endDeg - s.startDeg) || 1;
    // Tangente: Ableitung von (cos a, sin a) mal Drehrichtung
    const tx = -Math.sin(a) * dir;
    const ty = Math.cos(a) * dir;
    return { p: { x: s.center.x + s.r * Math.cos(a), y: s.center.y + s.r * Math.sin(a) }, heading: deg(Math.atan2(ty, tx)) };
  }
  return { p: s.at, heading: s.headingDeg };
}

/** Tempo je Gangart in m/s (Grundlage für die Verteilung der Zeit; skaliert auf durationSec) */
const SPEED: Record<Exclude<Gait, "halt">, number> = { schritt: 1.6, trab: 3.3, galopp: 4.6 };

/** Ungefähre echte Dauer einer Linie in Sekunden (Grundlage für das Lerntempo) */
export function rawSeconds(segments: Segment[]): number {
  return segments.reduce((a, seg) => a + (seg.kind === "halt" ? seg.seconds : seg.gait === "halt" ? 0 : segmentLength(seg) / SPEED[seg.gait]), 0);
}

export type TrackPiece = { seg: Segment; len: number; s0: number; t0: number; dur: number };
export type Track = { pieces: TrackPiece[]; totalLen: number; totalTime: number };

/** Linie mit Längen und Zeiten. Die Gesamtzeit wird auf durationSec skaliert (Lerntempo). */
export function buildTrack(segments: Segment[], durationSec: number): Track {
  const raw = segments.map((seg) => {
    const len = segmentLength(seg);
    const rawDur = seg.kind === "halt" ? seg.seconds : seg.gait === "halt" ? 0 : len / SPEED[seg.gait];
    return { seg, len, rawDur };
  });
  const rawTotal = raw.reduce((a, r) => a + r.rawDur, 0) || 1;
  const k = durationSec / rawTotal;
  let s0 = 0;
  let t0 = 0;
  const pieces = raw.map((r) => {
    const piece = { seg: r.seg, len: r.len, s0, t0, dur: r.rawDur * k };
    s0 += r.len;
    t0 += piece.dur;
    return piece;
  });
  return { pieces, totalLen: s0, totalTime: t0 };
}

export type Sample = { p: Pt; heading: number; s: number; t: number; gait: Gait };

/** Zustand zu einem Zeitpunkt der gemeinsamen Zeitleiste – alles andere leitet sich davon ab */
export function sampleAt(track: Track, t: number): Sample {
  const tt = Math.min(track.totalTime, Math.max(0, t));
  let piece = track.pieces[track.pieces.length - 1];
  for (const pc of track.pieces) {
    if (tt <= pc.t0 + pc.dur) {
      piece = pc;
      break;
    }
  }
  const k = piece.dur > 0 ? (tt - piece.t0) / piece.dur : 1;
  const d = piece.len * k;
  const { p, heading } = pointOnSegment(piece.seg, d);
  const gait: Gait = piece.seg.kind === "halt" ? "halt" : piece.seg.gait;
  return { p, heading, s: piece.s0 + d, t: tt, gait };
}

/** Zeitpunkt, an dem die Linie s Meter erreicht (für Phasengrenzen) */
export function timeAtMeters(track: Track, s: number, afterHalt = false): number {
  let t = track.totalTime;
  for (const pc of track.pieces) {
    if (s <= pc.s0 + pc.len + 1e-9) {
      t = pc.len === 0 ? pc.t0 : pc.t0 + (Math.min(s - pc.s0, pc.len) / pc.len) * pc.dur;
      break;
    }
  }
  if (afterHalt) {
    // über Halte an genau diesem Punkt hinweg
    for (const pc of track.pieces) if (pc.len === 0 && Math.abs(pc.s0 - s) < 1e-6 && Math.abs(pc.t0 - t) < 1e-6) t = pc.t0 + pc.dur;
  }
  return t;
}

/** Startzeit jeder Phase. Nach einer Halt-Phase beginnt die nächste erst, wenn das Stehen vorbei ist. */
export function phaseStartTimes(track: Track, phases: Phase[]): number[] {
  return phases.map((p, i) => timeAtMeters(track, p.timelineStart, i > 0 && !!phases[i - 1].halt));
}

/** Phase zu einem Zeitpunkt der Zeitleiste */
export function phaseAtTime(phases: Phase[], starts: number[], t: number): Phase {
  let idx = 0;
  for (let i = 0; i < starts.length; i++) if (starts[i] <= t + 1e-9) idx = i;
  return phases[idx];
}

/** Phasen und Dauer für eine Bahngröße */
export const phasesFor = (ex: ArenaExercise, size: ArenaSize): Phase[] => ex.phasesBySize?.[size] ?? ex.phases;
export const durationFor = (ex: ArenaExercise, size: ArenaSize): number => ex.durationBySize?.[size] ?? ex.durationSec;

export function phaseAt(phases: Phase[], s: number): Phase {
  return phases.find((p) => s >= p.timelineStart && s < p.timelineEnd) ?? phases[phases.length - 1];
}

/** SVG-Pfad in Metern (das SVG skaliert über viewBox) */
export function pathD(segments: Segment[]): string {
  const parts: string[] = [];
  let pen: Pt | null = null;
  const move = (p: Pt) => {
    if (!pen || Math.abs(pen.x - p.x) > 1e-6 || Math.abs(pen.y - p.y) > 1e-6) parts.push(`M${f(p.x)} ${f(p.y)}`);
  };
  for (const s of segments) {
    if (s.kind === "line") {
      move(s.from);
      parts.push(`L${f(s.to.x)} ${f(s.to.y)}`);
      pen = s.to;
    } else if (s.kind === "arc") {
      const start = pointOnSegment(s, 0).p;
      move(start);
      // In Stücke ≤ 180° teilen, damit auch Vollkreise sauber gezeichnet werden
      const total = s.endDeg - s.startDeg;
      const n = Math.max(1, Math.ceil(Math.abs(total) / 180));
      const sweep = total > 0 ? 1 : 0;
      for (let i = 1; i <= n; i++) {
        const a = rad(s.startDeg + (total * i) / n);
        const p = { x: s.center.x + s.r * Math.cos(a), y: s.center.y + s.r * Math.sin(a) };
        parts.push(`A${f(s.r)} ${f(s.r)} 0 0 ${sweep} ${f(p.x)} ${f(p.y)}`);
        pen = p;
      }
    }
  }
  return parts.join(" ");
}

const f = (n: number) => (Math.round(n * 1000) / 1000).toString();

/* ---------- Spiegelung linke → rechte Hand ---------- */

const mirrorPt = (p: Pt): Pt => ({ x: p.x, y: ARENA_WIDTH - p.y });
const swapBend = (b: Bend): Bend => (b === "links" ? "rechts" : b === "rechts" ? "links" : b);
const swapRein = (r: Rein): Rein => (r === "links" ? "rechts" : "links");

/** Buchstaben, die beim Spiegeln (K-Seite ↔ F-Seite) die Seite wechseln */
const MIRROR_LETTER: Record<string, string> = { K: "F", F: "K", E: "B", B: "E", H: "M", M: "H", V: "P", P: "V", S: "R", R: "S" };

/** „[H]“ → „H“ (linke Hand) bzw. „M“ (gespiegelt) */
export function resolveLetters(text: string, mirrored: boolean): string {
  return text.replace(/\[([A-Z])\]/g, (_, l: string) => (mirrored ? (MIRROR_LETTER[l] ?? l) : l));
}

function mapPhaseText(p: Phase, f: (s: string) => string): Phase {
  const aids = Object.fromEntries(Object.entries(p.aids).map(([k, v]) => [k, v ? { ...v, text: f(v.text) } : v])) as Phase["aids"];
  return { ...p, title: f(p.title), summary: f(p.summary), aids, explanations: p.explanations.map((x) => ({ ...x, text: f(x.text) })) };
}

export function mirrorSegment(s: Segment): Segment {
  if (s.kind === "line") return { ...s, from: mirrorPt(s.from), to: mirrorPt(s.to) };
  if (s.kind === "arc") return { ...s, center: mirrorPt(s.center), startDeg: -s.startDeg, endDeg: -s.endDeg };
  return { ...s, at: mirrorPt(s.at), headingDeg: -s.headingDeg };
}

/** Übung für die gewählte Hand: Linie und Biegung werden gespiegelt, Texte bleiben (sie sagen innen/außen), Bahnpunkte bleiben stehen */
export function forRein(ex: ArenaExercise, rein: Rein): ArenaExercise {
  const mirrored = rein !== ex.authoredRein;
  const f = (t: string) => resolveLetters(t, mirrored);
  const mapBySize = (g: (p: Phase) => Phase) =>
    ex.phasesBySize ? (Object.fromEntries(Object.entries(ex.phasesBySize).map(([k, list]) => [k, (list ?? []).map(g)])) as ArenaExercise["phasesBySize"]) : undefined;
  if (!mirrored) {
    const g = (p: Phase) => mapPhaseText(p, f);
    return {
      ...ex,
      annotations: Object.fromEntries(Object.entries(ex.annotations).map(([k, list]) => [k, list.map((a) => ({ ...a, label: f(a.label) }))])) as ArenaExercise["annotations"],
      phases: ex.phases.map(g),
      phasesBySize: mapBySize(g),
      tips: ex.tips.map(f),
    };
  }
  const gm = (p: Phase) =>
    mapPhaseText({ ...p, bend: swapBend(p.bend), nextBend: p.nextBend ? (swapBend(p.nextBend) as "links" | "rechts") : undefined, hand: p.hand ? swapRein(p.hand) : undefined }, f);
  const path = Object.fromEntries(Object.entries(ex.path).map(([k, segs]) => [k, segs.map(mirrorSegment)])) as ArenaExercise["path"];
  const annotations = Object.fromEntries(
    Object.entries(ex.annotations).map(([k, list]) => [k, list.map((a) => ({ ...a, label: f(a.label), at: a.followsPath ? mirrorPt(a.at) : a.at }))]),
  ) as ArenaExercise["annotations"];
  return { ...ex, path, annotations, tips: ex.tips.map(f), phases: ex.phases.map(gm), phasesBySize: mapBySize(gm) };
}

/* ---------- innen / außen ---------- */

export type Side = "links" | "rechts";

/**
 * Innen und außen ergeben sich aus der BIEGUNG, nicht aus der Laufrichtung.
 * Ohne Biegung (gerade Linie) oder während des Umstellens gibt es kein eindeutiges
 * Innen – dann zeigt die Oberfläche links/rechts und erklärt das.
 */
export function insideSide(bend: Bend): Side | null {
  return bend === "links" ? "links" : bend === "rechts" ? "rechts" : null;
}

const SIDE_OF: Partial<Record<AidId, "innen" | "aussen">> = {
  innenSchenkel: "innen",
  innenZuegel: "innen",
  aussenSchenkel: "aussen",
  aussenZuegel: "aussen",
};

/**
 * Körperseite einer Hilfe. Ohne Biegung gilt die Bahnseite der Hand (linke Hand → innen = links),
 * damit die Hilfe einen festen Platz in der Zeichnung hat; die Oberfläche kennzeichnet das.
 */
export function aidSide(aid: AidId, bend: Bend, rein: Rein, nextBend?: "links" | "rechts"): Side | null {
  const rel = SIDE_OF[aid];
  if (!rel) return null;
  const inside: Side = insideSide(bend) ?? (bend === "wechsel" && nextBend ? nextBend : rein);
  return rel === "innen" ? inside : inside === "links" ? "rechts" : "links";
}

export const AID_LABEL: Record<AidId, string> = {
  sitz: "Sitz",
  gewicht: "Gewicht",
  innenSchenkel: "Innerer Schenkel",
  aussenSchenkel: "Äußerer Schenkel",
  innenZuegel: "Innerer Zügel",
  aussenZuegel: "Äußerer Zügel",
  blick: "Blick",
  oberkoerper: "Oberkörper",
};

/** Beschriftung mit aufgelöster Seite, z. B. „Innerer Schenkel · links“ oder ohne Biegung „Schenkel links“ */
export function aidLabel(aid: AidId, bend: Bend, rein: Rein, nextBend?: "links" | "rechts"): string {
  const side = aidSide(aid, bend, rein, nextBend);
  if (!side) return AID_LABEL[aid];
  if (insideSide(bend)) return `${AID_LABEL[aid]} · ${side}`;
  if (bend === "wechsel" && nextBend) return `Neuer ${AID_LABEL[aid][0].toLowerCase()}${AID_LABEL[aid].slice(1)} · ${side}`;
  const part = aid.endsWith("Schenkel") ? "Schenkel" : "Zügel";
  return `${part} ${side}`;
}
