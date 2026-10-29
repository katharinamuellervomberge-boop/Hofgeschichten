import { COL, FONT_BODY, PAPER, T, clamp01 } from "./rkit";

/* Pferd mit Reiterin von oben (Reels 10, 11, 15, 16). Linke Hand: innen = links vom Pferd (lokal y < 0). */

export type Pt = [number, number];
export type Look = { coat: string; mane: string; patch?: string; jacket: string };
export const LOOKS: Record<string, Look> = {
  tivoli: { coat: "#F4EEE3", mane: "#6B4A33", patch: "#A8683E", jacket: COL.forest },
  scrabble: { coat: "#2F2723", mane: "#16110F", jacket: COL.rust },
  tonga: { coat: "#8E4E27", mane: "#2A1D16", jacket: "#5E7360" },
};

export type Glow = { innerLeg?: number; outerLeg?: number; innerRein?: number; outerRein?: number; seat?: number; gaze?: number; pull?: number };

const rot = ([x, y]: Pt, deg: number): Pt => {
  const a = (deg * Math.PI) / 180;
  return [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)];
};
/** lokaler Punkt des Pferdes → Bildschirm */
export function world(at: Pt, ang: number, s: number, p: Pt): Pt {
  const r = rot([p[0] * s, p[1] * s], ang);
  return [at[0] + r[0], at[1] + r[1]];
}
/** Gebiss (lokal) bei Halsstellung `bend` */
export function bitPoint(bend: number, side: -1 | 1, poll = 0): Pt {
  const h = rot([16, side * 3.5], poll);
  const r = rot([30 + h[0], h[1]], bend);
  return [14 + r[0], r[1]];
}

/** Genick (lokal) bei Halsstellung `bend` */
export function pollPoint(bend: number): Pt {
  const r = rot([44 - 14, 0], bend);
  return [14 + r[0], r[1]];
}

export const LEG_IN: Pt = [3, -15];
export const LEG_OUT: Pt = [-5, 15];
export const HAND_IN: Pt = [14, -5.5];
export const HAND_OUT: Pt = [14, 5.5];
/** äußeres Bein um `back` (0–1) eine Handbreit zurücklegen */
export const legOut = (back = 0): Pt => [LEG_OUT[0] - 7 * back, LEG_OUT[1]];

function Ring({ at, k, col = COL.honey, r = 6 }: { at: Pt; k: number; col?: string; r?: number }) {
  if (k <= 0.01) return null;
  return (
    <g opacity={k}>
      <circle cx={at[0]} cy={at[1]} r={r + 4} fill={col} opacity=".3" />
      <circle cx={at[0]} cy={at[1]} r={r} fill="none" stroke={col} strokeWidth="2.2" />
    </g>
  );
}

/** `ang` Blickrichtung in Grad (0 = rechts), `bend` Halsstellung (negativ = nach links/innen) */
export function TopHorse({ at, ang, look, step, s = 2.4, bend = 0, glow = {}, handPull = 0, outBack = 0, poll = 0 }: { at: Pt; ang: number; look: Look; step: number; s?: number; bend?: number; glow?: Glow; handPull?: number; outBack?: number; poll?: number }) {
  const sw = Math.sin(step * Math.PI * 2) * 3;
  const nod = Math.sin(step * Math.PI * 4) * 1.0;
  const line = { stroke: "#3B2C22", strokeOpacity: 0.35, strokeWidth: 1.4 };
  const hIn: Pt = [HAND_IN[0] - 4 * handPull, HAND_IN[1]];
  const bIn = bitPoint(bend, -1, poll);
  const bOut = bitPoint(bend, 1, poll);
  const lo = legOut(outBack);
  const g = (k?: number) => clamp01(k ?? 0);
  return (
    <g transform={`translate(${at[0]} ${at[1]}) rotate(${ang}) scale(${s})`}>
      <ellipse cx="6" cy="3" rx="42" ry="18" fill="#000" opacity=".1" />
      <path d={`M-26 0 Q-38 ${sw} -46 ${sw * 1.8}`} stroke={look.mane} strokeWidth="8" strokeLinecap="round" fill="none" />
      {/* Hals und Kopf (drehen um den Widerrist) */}
      <g transform={`rotate(${bend} 14 0)`}>
        <path d={`M10 -11 Q26 -9 44 ${-5 + nod} L44 ${5 + nod} Q26 9 10 11 Z`} fill={look.coat} {...line} />
        <path d={`M10 0 L44 ${nod}`} stroke={look.mane} strokeWidth="5" strokeLinecap="round" />
        {/* Kopf dreht im Genick (Stellung) */}
        <g transform={`rotate(${poll} 44 ${nod})`}>
          <ellipse cx="55" cy={nod} rx="13" ry="7.5" fill={look.coat} {...line} />
          <path d={`M44 ${-5 + nod} l-3 -7 l8 3 Z M44 ${5 + nod} l-3 7 l8 -3 Z`} fill={look.coat} {...line} />
          <path d={`M42 ${nod} L47 ${nod}`} stroke={look.mane} strokeWidth="5" strokeLinecap="round" />
        </g>
      </g>
      {/* Rumpf */}
      <path d="M-28 -6 Q-30 -15 -16 -15 L12 -15 Q24 -14 24 0 Q24 14 12 15 L-16 15 Q-30 15 -28 6 Z" fill={look.coat} {...line} />
      {look.patch && (
        <g fill={look.patch}>
          <path d="M-22 -12 Q-10 -16 -4 -8 Q-8 2 -20 -1 Z" />
          <path d="M4 6 Q14 4 18 12 L6 14 Z" />
        </g>
      )}
      {/* Zügel */}
      <path d={`M${hIn[0]} ${hIn[1]} L${bIn[0]} ${bIn[1]}`} stroke={g(glow.innerRein) > 0.3 ? COL.honey : "#3E2C22"} strokeWidth={1.4 + 1.6 * g(glow.innerRein)} />
      <path d={`M${HAND_OUT[0]} ${HAND_OUT[1]} L${bOut[0]} ${bOut[1]}`} stroke={g(glow.outerRein) > 0.3 ? COL.honey : "#3E2C22"} strokeWidth={1.4 + 1.6 * g(glow.outerRein)} />
      {/* Sattel und Reiterin */}
      <rect x="-8" y="-13" width="20" height="26" rx="6" fill="#F7F3EC" stroke={COL.honey} strokeWidth="1.5" />
      {g(glow.seat) > 0 && <ellipse cx="0" cy="-5" rx="6" ry="5" fill={COL.honey} opacity={0.75 * g(glow.seat)} />}
      {/* Beine */}
      <path d={`M1 -8 L${LEG_IN[0]} ${LEG_IN[1]}`} stroke="#3E2C22" strokeWidth="4" strokeLinecap="round" />
      <path d={`M1 8 L${lo[0]} ${lo[1]}`} stroke="#3E2C22" strokeWidth="4" strokeLinecap="round" />
      <path d={`M2 -8 L${hIn[0]} ${hIn[1]} M2 8 L${HAND_OUT[0]} ${HAND_OUT[1]}`} stroke={look.jacket} strokeWidth="3.4" strokeLinecap="round" />
      <ellipse cx="1" cy="0" rx="7.5" ry="12" fill={look.jacket} />
      <g transform={`rotate(${-35 * g(glow.gaze)} 3 0)`}>
        <circle cx="3" cy="0" r="6.3" fill="#26201C" />
        <path d="M6 -4 Q11 0 6 4" fill="#26201C" />
      </g>
      <circle cx={hIn[0]} cy={hIn[1]} r="2.2" fill="#5E4636" />
      <circle cx={HAND_OUT[0]} cy={HAND_OUT[1]} r="2.2" fill="#5E4636" />
      {/* Markierungen */}
      <Ring at={LEG_IN} k={g(glow.innerLeg)} />
      <Ring at={lo} k={g(glow.outerLeg)} col={COL.forest} />
      <Ring at={hIn} k={g(glow.innerRein)} r={5} col={g(glow.pull) > 0.5 ? COL.rust : COL.honey} />
      <Ring at={HAND_OUT} k={g(glow.outerRein)} r={5} col={COL.forest} />
      {g(glow.gaze) > 0 && (
        <g opacity={g(glow.gaze)}>
          <path d="M5 -3 L48 -42 A58 58 0 0 1 60 -12 Z" fill={COL.honey} opacity=".28" />
          <path d="M6 -3 L52 -30" stroke={COL.honey} strokeWidth="2" strokeDasharray="3 3" />
        </g>
      )}
    </g>
  );
}

/** Beschriftung mit Zeigelinie */
export function Callout({ from, to: to0, text, color = COL.forestDeep, k = 1, size = 30 }: { from: Pt; to: Pt; text: string; color?: string; k?: number; size?: number }) {
  if (k <= 0.01) return null;
  const w = text.length * size * 0.55 + 44;
  // Beschriftung bleibt immer ganz im Bild
  const to: Pt = [Math.min(1040 - w / 2, Math.max(40 + w / 2, to0[0])), to0[1]];
  return (
    <g opacity={k}>
      <path d={`M${from[0]} ${from[1]} L${to[0]} ${to[1]}`} stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <circle cx={from[0]} cy={from[1]} r="6" fill={color} />
      <rect x={to[0] - w / 2} y={to[1] - size * 1.05} width={w} height={size * 1.9} rx={size * 0.95} fill={color} />
      <T x={to[0]} y={to[1] + size * 0.3} size={size} font={FONT_BODY} weight={700} color={PAPER}>{text}</T>
    </g>
  );
}
