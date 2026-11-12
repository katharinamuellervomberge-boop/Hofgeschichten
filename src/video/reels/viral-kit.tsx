import type { ReactNode } from "react";
import { COL, FONT_BODY, PAPER, T, W, H, back, ease, sm } from "./nov-kit";

/* Bausteine für schnelle Share-/Kommentar-Reels (reiter40, reitersprache, bahnranking, 12.11.2026):
   Snap-Text, Blitz + Zoom-Punch bei Schnitten, Fortschrittsbalken, Gesichter (Reiter / Nicht-Reiter),
   Sprechblasen. Gleiche Farben/Schriften wie nov-kit. */

export type VoLines = { total: number; lines: Record<string, [number, number]> };
export const vo = (L: VoLines) => ({ S: (id: string) => L.lines[id][0], E: (id: string) => L.lines[id][1], total: L.total });

/** Großer Satz, schnappt von groß auf normal ein */
export function Big({ t, a, b = 999, lines, y, size = 84, col = COL.forestDeep, font, weight = 800, gap, shake = 0, italic, x = 540 }: { t: number; a: number; b?: number; lines: string[]; y: number; size?: number; col?: string; font?: string; weight?: number; gap?: number; shake?: number; italic?: boolean; x?: number }) {
  if (t < a || t > b) return null;
  const u = (t - a) / 0.18;
  const k = u < 1 ? 1.22 - 0.22 * sm(u) : 1;
  const sx = shake * Math.sin(t * 90) * Math.max(0, 1 - (t - a) / 0.5);
  const g = gap ?? size * 1.12;
  const yc = y + ((lines.length - 1) * g) / 2;
  return (
    <g opacity={Math.min(1, u * 2.5)} transform={`translate(${x + sx} ${yc}) scale(${k}) translate(${-x} ${-yc})`}>
      {lines.map((l, i) => (
        <T key={i} x={x} y={y + i * g} size={Math.min(size, 980 / (l.length * 0.52))} color={col} font={font} weight={weight} italic={italic}>{l}</T>
      ))}
    </g>
  );
}

/** Sprechblase mit Absender-Etikett („Reiter“, „Trainer“ …) */
export function Bubble({ t, a, b = 999, label, lines, y, fill = COL.forest, color = PAPER, tail = "left", size = 56 }: { t: number; a: number; b?: number; label?: string; lines: string[]; y: number; fill?: string; color?: string; tail?: "left" | "right"; size?: number }) {
  if (t < a || t > b) return null;
  const k = back((t - a) / 0.3);
  const h = 70 + lines.length * size * 1.15;
  const s = Math.min(size, ...lines.map((l) => 820 / (l.length * 0.5)));
  const tx = tail === "left" ? 230 : 850;
  return (
    <g opacity={Math.min(1, k)} transform={`translate(540 ${y + h / 2}) scale(${Math.max(0.01, k)}) translate(-540 ${-(y + h / 2)})`}>
      <rect x={80} y={y} width={920} height={h} rx="44" fill={fill} />
      <path d={`M${tx - 30} ${y + h - 2} l${tail === "left" ? -20 : 20} 56 l${tail === "left" ? 80 : -10} -56 Z`} fill={fill} />
      {label && (
        <g>
          <rect x={110} y={y - 30} width={label.length * 19 + 48} height={56} rx="28" fill={COL.honey} />
          <T x={134 + (label.length * 19) / 2} y={y + 8} size={30} font={FONT_BODY} weight={800} color={COL.forestDeep}>{label}</T>
        </g>
      )}
      {lines.map((l, i) => (
        <T key={i} x={540} y={y + 58 + s * 0.35 + i * s * 1.15} size={s} color={color}>{l}</T>
      ))}
    </g>
  );
}

/** Übersetzungs-Pille „= …“ */
export function Translate({ t, a, b = 999, text, y, size = 36 }: { t: number; a: number; b?: number; text: string; y: number; size?: number }) {
  if (t < a || t > b) return null;
  const k = back((t - a) / 0.3);
  const lines = text.length > 38 ? splitHalf(text) : [text];
  const s = Math.min(size, ...lines.map((l) => 860 / (l.length * 0.55)));
  const h = 40 + lines.length * s * 1.3;
  return (
    <g opacity={Math.min(1, k)} transform={`translate(540 ${y}) scale(${Math.max(0.01, k)}) translate(-540 ${-y})`}>
      <rect x={110} y={y - h / 2} width={860} height={h} rx="30" fill={COL.honey} />
      <T x={150} y={y - h / 2 + 28 + s} size={s} font={FONT_BODY} weight={900} color={COL.forestDeep} anchor="start">=</T>
      {lines.map((l, i) => (
        <T key={i} x={560} y={y - h / 2 + 22 + s + i * s * 1.3} size={s} font={FONT_BODY} weight={800} color={COL.forestDeep}>{l}</T>
      ))}
    </g>
  );
}
function splitHalf(s: string) {
  const m = s.length / 2;
  let i = s.lastIndexOf(" ", m);
  const j = s.indexOf(" ", m);
  if (i < 0 || (j >= 0 && j - m < m - i)) i = j;
  return [s.slice(0, i), s.slice(i + 1)];
}

/* ---------- Gesichter ---------- */
export type Mood = "neutral" | "confused" | "what" | "worried" | "nod" | "smile" | "forced" | "dizzy" | "proud" | "peek";
const SKIN = "#E8AE86";
const HAIR = "#5A3420";
/** Rundes Gesicht. kind „reiter“ = Reithelm, „laie“ = Haare. look: Blickrichtung −1…1 */
export function Face({ t, x, y, r = 120, kind, mood, look = 0, label, a = -1 }: { t: number; x: number; y: number; r?: number; kind: "reiter" | "laie" | "trainer"; mood: Mood; look?: number; label?: string; a?: number }) {
  const k = a < 0 ? 1 : back((t - a) / 0.3);
  if (k <= 0.01) return null;
  const nodY = mood === "nod" ? Math.max(0, Math.sin((t - a) * 12)) * 14 : 0;
  const tilt = mood === "confused" || mood === "what" ? -8 : mood === "dizzy" ? 6 * Math.sin(t * 9) : 0;
  const ex = look * r * 0.12;
  const eye = (dx: number) => {
    const cx = dx * r * 0.32 + ex, cy = -r * 0.08;
    if (mood === "dizzy") return <path key={dx} d={`M${cx - 12} ${cy - 12} l24 24 M${cx + 12} ${cy - 12} l-24 24`} stroke={COL.forestDeep} strokeWidth="7" strokeLinecap="round" />;
    if (mood === "smile" || mood === "proud") return <path key={dx} d={`M${cx - 14} ${cy + 4} q14 -18 28 0`} stroke={COL.forestDeep} strokeWidth="7" fill="none" strokeLinecap="round" />;
    const big = mood === "what" || mood === "worried" ? 1.35 : 1;
    return <circle key={dx} cx={cx} cy={cy} r={r * 0.075 * big} fill={COL.forestDeep} />;
  };
  const brows = () => {
    const y0 = -r * 0.3;
    if (mood === "confused") return <g stroke={COL.forestDeep} strokeWidth="7" strokeLinecap="round"><path d={`M${-r * 0.45 + ex} ${y0 + 6} l${r * 0.25} -2`} /><path d={`M${r * 0.2 + ex} ${y0 - 14} l${r * 0.25} 10`} /></g>;
    if (mood === "worried") return <g stroke={COL.forestDeep} strokeWidth="7" strokeLinecap="round"><path d={`M${-r * 0.45 + ex} ${y0} l${r * 0.25} -12`} /><path d={`M${r * 0.2 + ex} ${y0 - 12} l${r * 0.25} 12`} /></g>;
    if (mood === "what") return <g stroke={COL.forestDeep} strokeWidth="7" strokeLinecap="round"><path d={`M${-r * 0.45 + ex} ${y0 - 14} l${r * 0.25} 0`} /><path d={`M${r * 0.2 + ex} ${y0 - 14} l${r * 0.25} 0`} /></g>;
    return null;
  };
  const mouth = () => {
    const my = r * 0.38;
    switch (mood) {
      case "smile": case "nod": case "proud": return <path d={`M${-r * 0.3} ${my - 8} q${r * 0.3} ${r * 0.28} ${r * 0.6} 0`} stroke={COL.forestDeep} strokeWidth="8" fill="none" strokeLinecap="round" />;
      case "forced": return <path d={`M${-r * 0.34} ${my} l${r * 0.68} 0`} stroke={COL.forestDeep} strokeWidth="8" strokeLinecap="round" />;
      case "what": return <ellipse cx={0} cy={my} rx={r * 0.12} ry={r * 0.16} fill={COL.forestDeep} />;
      case "worried": return <path d={`M${-r * 0.24} ${my + 10} q${r * 0.24} ${-r * 0.2} ${r * 0.48} 0`} stroke={COL.forestDeep} strokeWidth="8" fill="none" strokeLinecap="round" />;
      case "confused": case "dizzy": return <path d={`M${-r * 0.26} ${my} q${r * 0.13} -14 ${r * 0.26} 0 q${r * 0.13} 14 ${r * 0.26} 0`} stroke={COL.forestDeep} strokeWidth="7" fill="none" strokeLinecap="round" />;
      default: return <path d={`M${-r * 0.2} ${my} l${r * 0.4} 0`} stroke={COL.forestDeep} strokeWidth="8" strokeLinecap="round" />;
    }
  };
  return (
    <g transform={`translate(${x} ${y + nodY}) rotate(${tilt}) scale(${Math.max(0.01, k)})`}>
      {kind === "laie" && <path d={`M${-r * 1.02} ${-r * 0.05} C ${-r * 1.1} ${-r * 1.2} ${r * 1.1} ${-r * 1.2} ${r * 1.02} ${-r * 0.05} L ${r * 0.9} ${r * 0.4} L ${-r * 0.9} ${r * 0.4} Z`} fill={HAIR} />}
      <circle r={r} fill={SKIN} />
      {kind === "reiter" && (
        <g>
          <path d={`M${-r * 1.05} ${-r * 0.2} C ${-r * 1.05} ${-r * 1.25} ${r * 1.05} ${-r * 1.25} ${r * 1.05} ${-r * 0.2} Z`} fill={COL.forestDeep} />
          <path d={`M${r * 0.6} ${-r * 0.24} q${r * 0.4} 0 ${r * 0.62} ${r * 0.12}`} stroke={COL.forestDeep} strokeWidth="14" fill="none" strokeLinecap="round" />
          <path d={`M${-r * 0.95} ${-r * 0.1} q${-r * 0.05} ${r * 0.6} ${r * 0.2} ${r * 0.85}`} stroke={COL.forestDeep} strokeWidth="5" fill="none" />
        </g>
      )}
      {kind === "trainer" && <rect x={-r * 1.05} y={-r * 0.82} width={r * 2.1} height={r * 0.5} rx={r * 0.2} fill={COL.rust} />}
      {kind === "trainer" && <path d={`M${-r * 0.2} ${-r * 0.36} l${r * 1.3} 0`} stroke={COL.rust} strokeWidth="16" strokeLinecap="round" />}
      {brows()}
      {[-1, 1].map(eye)}
      {mouth()}
      {(mood === "forced") && <path d={`M${r * 0.78} ${-r * 0.5} q12 26 0 34 q-12 -8 0 -34`} fill="#8FB7D4" />}
      {(mood === "confused" || mood === "dizzy") && <T x={r * 1.05} y={-r * 0.7} size={r * 0.7} color={COL.rust}>?</T>}
      {label && <T x={0} y={r + 54} size={32} font={FONT_BODY} weight={800} color={COL.inkSoft}>{label}</T>}
    </g>
  );
}

/** Rahmen: Hintergrund, Zoom-Punch + Blitz an Schnitten, Fortschrittsbalken */
export function Frame({ t, cuts, children, progress, after }: { t: number; cuts: number[]; children: ReactNode; progress?: { a: number; b: number; label?: string }; after?: ReactNode }) {
  const last = cuts.filter((c) => c <= t).pop();
  const punch = last !== undefined ? 1 + 0.06 * (1 - ease((t - last) / 0.3)) : 1;
  const flash = last !== undefined ? Math.max(0, 1 - (t - last) / 0.1) : 0;
  const show = progress && t >= progress.a && t < progress.b;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      <g transform={`translate(540 960) scale(${punch}) translate(-540 -960)`}>{children}</g>
      {show && (
        <g>
          <rect x={0} y={0} width={W} height={14} fill={COL.sandLight} />
          <rect x={0} y={0} width={(W * (t - progress!.a)) / (progress!.b - progress!.a)} height={14} fill={COL.honey} />
          {progress!.label && (
            <g>
              <rect x={1030 - progress!.label.length * 19 - 40} y={60} width={progress!.label.length * 19 + 40} height={64} rx="32" fill={COL.forestDeep} opacity=".9" />
              <T x={1030 - (progress!.label.length * 19 + 40) / 2} y={104} size={34} font={FONT_BODY} weight={800} color={PAPER}>{progress!.label}</T>
            </g>
          )}
        </g>
      )}
      {after}
      {flash > 0 && <rect width={W} height={H} fill={PAPER} opacity={flash * 0.7} />}
    </svg>
  );
}

/** Kleine Marken-Zeile ganz unten */
export function BrandLine({ t, a, text, y = 1840 }: { t: number; a: number; text: string; y?: number }) {
  const k = ease((t - a) / 0.4);
  if (k <= 0) return null;
  return <g opacity={k}><T x={540} y={y} size={30} font={FONT_BODY} weight={700} color={COL.forestDeep}>{text}</T></g>;
}
