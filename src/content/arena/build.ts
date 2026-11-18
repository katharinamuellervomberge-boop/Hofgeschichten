import { pointOnSegment, segmentLength } from "./geometry";
import type { Gait, Pt, Segment } from "./types";

/**
 * Linienbaukasten für Übungen (nur beim Anlegen der Daten genutzt, Ergebnis sind reine Segmente).
 *
 *   const pb = new PathBuilder({ x: 26, y: 0 });
 *   pb.lineTo({ x: 10, y: 0 }).mark("zirkel").arcAround({ x: 10, y: 10 }, -360);
 *
 * Winkel sind Bildschirmwinkel (y nach unten). Negativer Bogen = gegen den Uhrzeigersinn
 * (Linksbiegung), positiver = im Uhrzeigersinn (Rechtsbiegung).
 */
export class PathBuilder {
  segments: Segment[] = [];
  private pos: Pt;
  private marks: Record<string, number> = {};
  constructor(
    start: Pt,
    private gait: Gait = "trab",
  ) {
    this.pos = start;
  }

  get length() {
    return this.segments.reduce((a, s) => a + segmentLength(s), 0);
  }
  get position() {
    return this.pos;
  }

  mark(name: string) {
    this.marks[name] = this.length;
    return this;
  }
  at(name: string): number {
    const v = this.marks[name];
    if (v === undefined) throw new Error(`Marke ${name} fehlt`);
    return v;
  }

  setGait(g: Gait) {
    this.gait = g;
    return this;
  }

  /** Stehen am aktuellen Punkt (Sekunden echte Zeit) */
  halt(seconds: number) {
    const last = this.segments[this.segments.length - 1];
    const heading = last ? pointOnSegment(last, 1e9).heading : 0;
    this.segments.push({ kind: "halt", at: this.pos, headingDeg: heading, seconds });
    return this;
  }

  lineTo(p: Pt) {
    if (dist(this.pos, p) > 1e-9) this.segments.push({ kind: "line", from: this.pos, to: p, gait: this.gait });
    this.pos = p;
    return this;
  }

  /** Bogen um einen Mittelpunkt, sweep in Grad (−: gegen den Uhrzeigersinn) */
  arcAround(center: Pt, sweepDeg: number) {
    const r = dist(center, this.pos);
    const start = deg(Math.atan2(this.pos.y - center.y, this.pos.x - center.x));
    const end = start + sweepDeg;
    this.segments.push({ kind: "arc", center, r, startDeg: start, endDeg: end, gait: this.gait });
    this.pos = { x: center.x + r * Math.cos(rad(end)), y: center.y + r * Math.sin(rad(end)) };
    return this;
  }

  /**
   * Gerade Linien durch die Punkte, Ecken mit Radius r abgerundet (Viertelvolten, Abwenden).
   * Die aktuelle Position ist der erste Punkt. Optional mit Marken an den Punkten (Index → Name):
   * die Marke sitzt am BEGINN der Abrundung, also dort, wo das Abwenden anfängt; „name_e“ an ihrem Ende.
   * r: ein Radius für alle Punkte oder je Punkt.
   */
  smooth(points: Pt[], r: number | number[], marks: Record<number, string> = {}) {
    const pts = [this.pos, ...points];
    let used = 0; // Strecke, die die vorige Abrundung vom aktuellen Abschnitt schon verbraucht hat
    for (let i = 1; i < pts.length; i++) {
      const b = pts[i];
      if (i === pts.length - 1) {
        if (used > dist(pts[i - 1], b) + 1e-9) throw new Error(`Letzter Abschnitt zu kurz für die Abrundung davor`);
        this.lineTo(b);
        if (marks[i - 1]) this.mark(marks[i - 1]);
        break;
      }
      const a = pts[i - 1];
      const c = pts[i + 1];
      const u = norm({ x: b.x - a.x, y: b.y - a.y });
      const v = norm({ x: c.x - b.x, y: c.y - b.y });
      const cross = u.x * v.y - u.y * v.x;
      const dot = u.x * v.x + u.y * v.y;
      const phi = Math.atan2(cross, dot); // Drehwinkel (+ = im Uhrzeigersinn auf dem Bildschirm)
      if (Math.abs(phi) < 1e-9) {
        this.lineTo(b);
        if (marks[i - 1]) this.mark(marks[i - 1]);
        used = 0;
        continue;
      }
      const ri = Array.isArray(r) ? r[i - 1] : r;
      const d = ri * Math.tan(Math.abs(phi) / 2);
      if (used + d > dist(a, b) + 1e-9 || d > dist(b, c) + 1e-9) throw new Error(`Radius ${ri} zu groß an Punkt ${i}`);
      const p1 = { x: b.x - u.x * d, y: b.y - u.y * d };
      this.lineTo(p1);
      if (marks[i - 1]) this.mark(marks[i - 1]);
      const s = Math.sign(phi);
      const center = { x: p1.x + s * -u.y * ri, y: p1.y + s * u.x * ri };
      this.arcAround(center, deg(phi));
      if (marks[i - 1]) this.mark(marks[i - 1] + "_e");
      used = d;
    }
    return this;
  }

  build(): Segment[] {
    return this.segments;
  }
}

const rad = (d: number) => (d * Math.PI) / 180;
const deg = (r: number) => (r * 180) / Math.PI;
const dist = (a: Pt, b: Pt) => Math.hypot(a.x - b.x, a.y - b.y);
const norm = (p: Pt) => {
  const l = Math.hypot(p.x, p.y) || 1;
  return { x: p.x / l, y: p.y / l };
};
