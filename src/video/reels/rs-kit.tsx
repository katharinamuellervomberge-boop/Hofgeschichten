import { GAIT_DEFS, bodyBob, type Gait, type LegId } from "@/components/illustrations/akademie/AnimHorse";
import { BIT, SITZ, type Body, type P } from "@/components/illustrations/akademie/geometry";
import { Rider, Tack } from "@/components/illustrations/akademie/RiderScene";
import type { HorseLook } from "@/content/types";
import type { ReactNode } from "react";
import { riderBody, riseAmount } from "../leichttraben";
import { COL, NodHorse, W, headPoint, type Place } from "./nov-kit";

/* Baukasten für die Reihe „Reitlehrer-Sätze“ (rs01, rs02): Reiter auf beweglichem Pferd mit
   echter Zügellinie vom Trensenring zur Hand. Die Zügellänge ist fest – zieht die Hand zurück oder
   geht der Kopf nach vorn, wird der Zügel straff; begleitet die Hand, bleibt die Verbindung gleich. */

export const LEATHER = "#4E3524";

const sub = (a: P, b: P): P => [a[0] - b[0], a[1] - b[1]];
const len = (a: P) => Math.hypot(a[0], a[1]);

/** Ellenbogen per Zwei-Gelenk-IK (Ober- und Unterarm behalten ihre Länge) */
export function elbowFor(sh: P, e0: P, h0: P, h: P): P {
  const l1 = len(sub(e0, sh));
  const l2 = len(sub(h0, e0));
  const v = sub(h, sh);
  const d = Math.min(len(v), l1 + l2 - 0.01);
  const a = Math.atan2(v[1], v[0]);
  const b = Math.acos(Math.max(-1, Math.min(1, (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d))));
  const c1: P = [sh[0] + l1 * Math.cos(a + b), sh[1] + l1 * Math.sin(a + b)];
  const c2: P = [sh[0] + l1 * Math.cos(a - b), sh[1] + l1 * Math.sin(a - b)];
  return len(sub(c1, e0)) < len(sub(c2, e0)) ? c1 : c2;
}

/** Ruhelage: Zügel vom Trensenring zur Hand bei gegebenem Nicken */
export const REIN_DIR = (() => {
  const v = sub(BIT, SITZ.hand);
  const l = len(v);
  return [v[0] / l, v[1] / l] as P;
})();

export type RideState = {
  nod: number;
  reach: number;
  /** Handposition (Pferde-Koordinaten, ohne Wippen) */
  hand: P;
  /** feste Zügellänge */
  rein: number;
};

/** Zügel zwischen Trensenring und Hand: straff (gerade) oder mit Durchhang */
export function reinGeom(s: RideState) {
  const b = headPoint(BIT, s.nod, s.reach);
  const h: P = [s.hand[0] + 2, s.hand[1]];
  const d = len(sub(b, h));
  const slack = Math.max(0, s.rein - d);
  const sag = slack > 0 ? 3 + Math.sqrt(slack * (2 * s.rein - slack)) * 0.5 : Math.max(0, 3 - (d - s.rein) * 3);
  const m: P = [(b[0] + h[0]) / 2, (b[1] + h[1]) / 2 + sag];
  return { b, h, d, tension: d - s.rein, path: `M${b[0]},${b[1]} Q${m[0]},${m[1]} ${h[0]},${h[1]}` };
}

/** Pferd mit Reiterin + Zügel. `posting` = Leichttraben (Trab), sonst Aussitzen. */
export function RidingHorse({
  t, pl, look, gait, id, s, posting, reinColor = LEATHER, reinW = 2.4, glow, highlight, strideK, over, under,
}: {
  t: number; pl: Place; look: HorseLook; gait: Gait; id: string; s: RideState; posting?: boolean; reinColor?: string; reinW?: number; glow?: string;
  highlight?: Partial<Record<LegId, string>>; strideK?: number; over?: ReactNode; under?: ReactNode;
}) {
  const b0: Body = posting ? riderBody(riseAmount(t)) : SITZ;
  const base = posting ? b0.hand : SITZ.hand;
  const hand: P = [s.hand[0] + (base[0] - SITZ.hand[0]), s.hand[1] + (base[1] - SITZ.hand[1])];
  const body: Body = { ...b0, hand, elbow: elbowFor(b0.shoulder, b0.elbow, b0.hand, hand) };
  const bob = bodyBob(gait, t);
  const r = reinGeom({ ...s, hand });
  return (
    <g>
      {under && (
        <svg x={pl.x} y={pl.y} width={320 * pl.k} height={292 * pl.k} viewBox="70 20 320 292" overflow="visible">
          <g transform={`translate(0 ${bob})`}>{under}</g>
        </svg>
      )}
      <NodHorse t={t} pl={pl} look={look} gait={gait} id={id} nod={s.nod} reach={s.reach} slices={18} highlight={highlight} strideK={strideK}>
        <Tack hand={hand} longRein={false} stirrupsDown={false} noRein />
      </NodHorse>
      <svg x={pl.x} y={pl.y} width={320 * pl.k} height={292 * pl.k} viewBox="70 20 320 292" overflow="visible">
        <g transform={`translate(0 ${bob})`}>
          {/* Reiterin außerhalb der Hals-Scheiben, damit nichts mitgedreht wird */}
          <Rider b={body} pose={posting && riseAmount(t) > 0.5 ? "leicht" : "sitz"} />
          {glow && <path d={r.path} fill="none" stroke={glow} strokeWidth={reinW + 7} strokeLinecap="round" opacity=".35" />}
          <path d={r.path} fill="none" stroke={reinColor} strokeWidth={reinW} strokeLinecap="round" />
          {/* Hand über dem Zügel, damit er in der Faust endet */}
          <circle cx={hand[0]} cy={hand[1]} r="4.6" fill="#5E4636" />
          {over}
        </g>
      </svg>
    </g>
  );
}

/** Zügelinformationen für Overlays (Bildschirm-Koordinaten über `hs`) */
export function rideInfo(t: number, gait: Gait, s: RideState, posting?: boolean) {
  const b0: Body = posting ? riderBody(riseAmount(t)) : SITZ;
  const base = posting ? b0.hand : SITZ.hand;
  const hand: P = [s.hand[0] + (base[0] - SITZ.hand[0]), s.hand[1] + (base[1] - SITZ.hand[1])];
  const bob = bodyBob(gait, t);
  return { ...reinGeom({ ...s, hand }), bob, body: { ...b0, hand, elbow: elbowFor(b0.shoulder, b0.elbow, b0.hand, hand) } as Body };
}

/** Reitplatz mit Zaun, der passend zur Pferdegeschwindigkeit vorbeizieht */
export function Arena({ t, speed, y, top = 0 }: { t: number; speed: number; y: number; top?: number }) {
  const off = t * speed;
  const fy = y - 150;
  return (
    <g>
      <rect y={top} width={W} height={y - top} fill={COL.bg} />
      <path d={`M0 ${fy - 40}c260-40 520-26 780-34s300-10 300-4v80H0Z`} fill="#C9CDB4" opacity=".55" />
      <rect y={fy} width={W} height={y - fy} fill="#EFE8D8" />
      <g stroke="#9A7B5E" strokeWidth="9" strokeLinecap="round" opacity=".8">
        <path d={`M0 ${fy + 20}H${W}`} />
        <path d={`M0 ${fy + 62}H${W}`} opacity=".7" />
      </g>
      <g fill={COL.brown} opacity=".85">
        {Array.from({ length: 6 }, (_, i) => {
          const x = ((i * 260 - off * 0.6) % 1560 + 1560) % 1560 - 120;
          return <rect key={i} x={x} y={fy} width="14" height="96" rx="4" />;
        })}
      </g>
      <rect y={y - 40} width={W} height={1920 - y + 40} fill="#E3D3B4" />
      <g fill="#D3BF9C">
        {Array.from({ length: 18 }, (_, i) => {
          const x = ((i * 173 - off) % (W + 160) + W + 160) % (W + 160) - 80;
          const yy = y + 10 + ((i * 47) % 150);
          return <ellipse key={i} cx={x} cy={yy} rx={i % 3 ? 14 : 24} ry="5" />;
        })}
      </g>
    </g>
  );
}

/** Pixel pro Sekunde, mit denen der Boden unter einem Pferd der Größe k vorbeizieht */
export function groundSpeed(gait: Exclude<Gait, "stand">, k: number, strideK = 1) {
  const g = GAIT_DEFS[gait];
  return ((g.stride * strideK) / (g.duty * g.cycle)) * k;
}
