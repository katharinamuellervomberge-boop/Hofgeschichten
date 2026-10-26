import type { ReactNode } from "react";
import type { HorseLook } from "@/content/types";
import { BLAZE, BODY, EAR, FORELOCK, MANE, STAR, TAIL } from "../Horse";

/**
 * Bewegliches Pferd in Seitenansicht – gleiche Zeichnung wie `Horse`, aber mit
 * gelenkigen Beinen, die einer echten Fußfolge folgen. Wird für die Lernvideos
 * der Reitakademie Bild für Bild gerendert (`time` in Sekunden, keine CSS-Animation).
 *
 * Koordinaten: viewBox der Hof-Illustration (70 20 320 292), Kopf rechts.
 * Sichtbar ist die linke Pferdeseite: nahe Beine = VL/HL, ferne Beine = VR/HR.
 */

export type Gait = "stand" | "schritt" | "trab" | "galopp-rechts" | "galopp-links";
export type LegId = "VL" | "VR" | "HL" | "HR";

type GaitDef = {
  /** Dauer eines ganzen Bewegungsablaufs in Sekunden (für Lernvideos verlangsamt) */
  cycle: number;
  /** Anteil der Standphase */
  duty: number;
  /** Zeitpunkt des Auffußens je Bein (0–1 im Ablauf) */
  offset: Record<LegId, number>;
  /** Schrittlänge in Pferde-Einheiten */
  stride: number;
  lift: number;
  bob: number;
};

export const GAIT_DEFS: Record<Exclude<Gait, "stand">, GaitDef> = {
  schritt: { cycle: 2.4, duty: 0.62, offset: { HL: 0, VL: 0.25, HR: 0.5, VR: 0.75 }, stride: 46, lift: 16, bob: 1.6 },
  trab: { cycle: 1.6, duty: 0.4, offset: { HL: 0, VR: 0, HR: 0.5, VL: 0.5 }, stride: 62, lift: 26, bob: 4 },
  "galopp-rechts": { cycle: 1.8, duty: 0.34, offset: { HL: 0, HR: 0.2, VL: 0.2, VR: 0.4 }, stride: 78, lift: 30, bob: 3 },
  "galopp-links": { cycle: 1.8, duty: 0.34, offset: { HR: 0, HL: 0.2, VR: 0.2, VL: 0.4 }, stride: 78, lift: 30, bob: 3 },
};

const GROUND = 288; // Höhe des Fesselgelenks im Stand
type P = [number, number];

/** Bein-Ansatz am Rumpf (nahe Seite); ferne Beine liegen leicht versetzt dahinter */
const TOP: Record<LegId, P> = { VL: [251, 182], VR: [265, 180], HL: [127, 178], HR: [143, 176] };
const LEN: Record<"V" | "H", [number, number]> = { V: [58, 50], H: [56, 52] };

/** Phase eines Beins (0 = Auffußen) */
export function legPhase(gait: Exclude<Gait, "stand">, leg: LegId, time: number) {
  const g = GAIT_DEFS[gait];
  const p = (((time / g.cycle - g.offset[leg]) % 1) + 1) % 1;
  return { p, stance: p < g.duty };
}

/** Welche Beine stehen gerade am Boden? */
export function legsOnGround(gait: Gait, time: number): LegId[] {
  if (gait === "stand") return ["VL", "VR", "HL", "HR"];
  return (["VL", "VR", "HL", "HR"] as LegId[]).filter((l) => legPhase(gait, l, time).stance);
}

const ease = (s: number) => 0.5 - 0.5 * Math.cos(Math.PI * s);

function hoofTarget(gait: Gait, leg: LegId, time: number): P {
  const [tx] = TOP[leg];
  const front = leg[0] === "V";
  // Im Galopp greifen die Beine der führenden Seite weiter vor
  const lead = (gait === "galopp-rechts" && leg[1] === "R") || (gait === "galopp-links" && leg[1] === "L") ? 9 : 0;
  const nx = tx + (front ? 2 : -4) + lead;
  if (gait === "stand") return [nx, GROUND];
  const g = GAIT_DEFS[gait];
  const { p } = legPhase(gait, leg, time);
  const S = g.stride;
  if (p < g.duty) return [nx + S / 2 - S * (p / g.duty), GROUND];
  const s = (p - g.duty) / (1 - g.duty);
  // Vorderbein klappt in der ersten Hälfte stärker nach hinten-oben (Karpalgelenk beugt)
  const fold = front ? 10 * Math.sin(Math.PI * Math.min(1, s * 1.6)) * (1 - s) : 0;
  return [nx - S / 2 + S * ease(s) - fold, GROUND - g.lift * Math.sin(Math.PI * s) * (front ? 1.15 : 0.9)];
}

/** Zweigelenk-IK: Knie/Sprunggelenk zwischen Ansatz und Fessel */
function knee(top: P, foot: P, [l1, l2]: [number, number], bendForward: boolean): P {
  const dx = foot[0] - top[0];
  const dy = foot[1] - top[1];
  const d = Math.min(Math.hypot(dx, dy), l1 + l2 - 0.01);
  const a = Math.atan2(dy, dx);
  const cos = (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d);
  const b = Math.acos(Math.max(-1, Math.min(1, cos)));
  const ang = bendForward ? a - b : a + b;
  return [top[0] + l1 * Math.cos(ang), top[1] + l1 * Math.sin(ang)];
}

/** Gefülltes, sich verjüngendes Beinsegment (Viereck, Gelenke werden als Kreise ergänzt) */
function segment(a: P, b: P, wa: number, wb: number) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const l = Math.hypot(dx, dy) || 1;
  const nx = -dy / l;
  const ny = dx / l;
  return `M${a[0] + nx * wa},${a[1] + ny * wa} L${b[0] + nx * wb},${b[1] + ny * wb} L${b[0] - nx * wb},${b[1] - ny * wb} L${a[0] - nx * wa},${a[1] - ny * wa} Z`;
}

function Leg({ leg, gait, time, bob, look, far, highlight }: { leg: LegId; gait: Gait; time: number; bob: number; look: HorseLook; far: boolean; highlight?: string }) {
  const front = leg[0] === "V";
  const [tx, ty] = TOP[leg];
  const top: P = [tx, ty + bob];
  const foot = hoofTarget(gait, leg, time);
  const k = knee(top, foot, LEN[front ? "V" : "H"], !front);
  // Fesselung: im Stand leicht schräg nach vorn, in der Schwebe abgeknickt
  const lowerAng = Math.atan2(foot[1] - k[1], foot[0] - k[0]);
  const lifted = foot[1] < GROUND - 1;
  const pastAng = lifted ? lowerAng + (front ? -0.9 : 0.6) * Math.min(1, (GROUND - foot[1]) / 14) : Math.PI / 2 - 0.35;
  const hoof: P = [foot[0] + 12 * Math.cos(pastAng), foot[1] + 12 * Math.sin(pastAng)];
  const coat = far ? look.coatShade : look.coat;
  const lower = look.points ? look.points : coat;
  const sockKey = `${front ? "front" : "hind"}${far ? "Far" : "Near"}` as const;
  const sock = look.socks?.includes(sockKey);
  const rot = ((pastAng - (Math.PI / 2 - 0.35)) * 180) / Math.PI;
  const legFill = look.points ?? coat;
  const pastern = sock ? (far ? "#EDE8DF" : "#F7F3EC") : legFill;
  return (
    <g opacity={far ? 0.96 : 1}>
      <path d={segment(top, k, front ? 16 : 18, 8.5)} fill={coat} />
      <circle cx={k[0]} cy={k[1]} r="8.5" fill={look.points && !front ? coat : legFill} />
      <path d={segment(k, foot, 7.5, 6)} fill={legFill} />
      <circle cx={foot[0]} cy={foot[1]} r="6.4" fill={pastern} />
      <path d={segment(foot, hoof, 6, 6.6)} fill={pastern} />
      {/* Huf: gleiche Form wie in der Hof-Illustration, mit der Fessel gedreht */}
      <path d="M-9,-3 L8,-3 L13,7 L-11,7 Z" transform={`translate(${hoof[0]} ${hoof[1]}) rotate(${rot})`} fill={look.hoof} />
      {highlight && <circle cx={hoof[0]} cy={hoof[1] + 2} r="16" fill="none" stroke={highlight} strokeWidth="4" />}
    </g>
  );
}

export type AnimHorseProps = {
  look: HorseLook;
  gait: Gait;
  /** Zeit in Sekunden */
  time: number;
  /** Beine farbig markieren (z. B. diagonales Beinpaar) */
  highlight?: Partial<Record<LegId, string>>;
  /** Wird über dem Rumpf gezeichnet und wippt mit (Sattel, Reiterin) */
  children?: ReactNode;
  /** Zusätzliche Hebung des Rumpfes (Pferde-Einheiten) */
  lift?: number;
};

/** Auf- und Abbewegung des Rumpfes für eine Gangart */
export function bodyBob(gait: Gait, time: number): number {
  if (gait === "stand") return 0;
  const g = GAIT_DEFS[gait];
  const p = (time / g.cycle) % 1;
  if (gait === "trab") return g.bob * Math.cos(4 * Math.PI * (p - g.duty / 2));
  if (gait === "schritt") return g.bob * Math.cos(4 * Math.PI * p);
  return g.bob * Math.cos(2 * Math.PI * (p - 0.15));
}

/** Schaukelbewegung im Galopp (Grad) */
function bodyTilt(gait: Gait, time: number) {
  if (gait !== "galopp-rechts" && gait !== "galopp-links") return 0;
  const p = (time / GAIT_DEFS[gait].cycle) % 1;
  return 2.6 * Math.sin(2 * Math.PI * (p - 0.05));
}

export function AnimHorse({ look, gait, time, highlight = {}, children, lift = 0 }: AnimHorseProps) {
  const bob = bodyBob(gait, time) - lift;
  const tilt = bodyTilt(gait, time);
  const nod = 0;
  const tailSwing = gait === "stand" ? 0 : 4 * Math.sin(2 * Math.PI * (time / GAIT_DEFS[gait].cycle) + 1);
  return (
    <g>
      <ellipse cx="195" cy="305" rx="118" ry="6" fill="#80634D" opacity="0.2" />
      {/* ferne Beine */}
      <Leg leg="VR" gait={gait} time={time} bob={bob} look={look} far highlight={highlight.VR} />
      <Leg leg="HR" gait={gait} time={time} bob={bob} look={look} far highlight={highlight.HR} />
      <g transform={`translate(0 ${bob}) rotate(${tilt} 200 150)`}>
        <g transform={`rotate(${tailSwing} 108 130)`}>
          <path d={TAIL} fill={look.mane} />
          {look.maneLight && <path d="M100,150 C92,180 90,212 94,236" fill="none" stroke={look.maneLight} strokeWidth="6" strokeLinecap="round" opacity="0.8" />}
        </g>
        <path d={BODY} fill={look.coat} />
        {look.pinto && (
          <g fill="#F3EEE4" clipPath="url(#ah-body)">
            <path d="M150,112 C170,104 200,112 214,116 C224,140 238,150 252,148 C262,160 266,178 262,200 L140,200 C146,186 150,170 146,156 C142,140 142,124 150,112 Z" />
          </g>
        )}
        <defs>
          <clipPath id="ah-body">
            <path d={BODY} />
          </clipPath>
        </defs>
        <g fill="none" stroke={look.coatShade} strokeWidth="2" strokeLinecap="round" opacity="0.35">
          <path d="M262,122 C276,138 278,160 270,182" />
          <path d="M150,124 C160,140 158,166 146,186" />
        </g>
        <g transform={`rotate(${nod} 290 110)`}>
          <path d={MANE} fill={look.maneLight ?? look.mane} />
          <path d={EAR} fill={look.coat} />
          <path d="M313,38 L315,48 L320,48 Z" fill={look.coatShade} />
          <path d={FORELOCK} fill={look.mane} />
          {look.face === "blaze" && <path d={BLAZE} fill="#F7F3EC" />}
          {look.face === "star" && <path d={STAR} fill="#F7F3EC" />}
          <circle cx="330" cy="78" r="3.8" fill="#1A120D" />
          <circle cx="331.3" cy="76.8" r="1.1" fill="#fff" opacity="0.85" />
          <path d="M359,121 C361,118 365,119 365,123" fill="none" stroke="#2B1D16" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>
      {/* nahe Beine */}
      <Leg leg="HL" gait={gait} time={time} bob={bob} look={look} far={false} highlight={highlight.HL} />
      <Leg leg="VL" gait={gait} time={time} bob={bob} look={look} far={false} highlight={highlight.VL} />
      <g transform={`translate(0 ${bob}) rotate(${tilt} 200 150)`}>{children}</g>
    </g>
  );
}
