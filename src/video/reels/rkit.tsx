import { AnimHorse, GAIT_DEFS, type Gait, type LegId } from "@/components/illustrations/akademie/AnimHorse";
import type { HorseLook } from "@/content/types";
import type { ReactNode } from "react";
import { COL, FONT_BODY, FONT_DISPLAY, ScrollingArena, clamp01, wrap } from "../kit";

/* Gemeinsame Bausteine für die Reels (9:16, 1080×1920) */

export const W = 1080;
export const H = 1920;
export const PAPER = "#FBF8F1";
export { COL, FONT_BODY, FONT_DISPLAY, clamp01 };

export const ease = (x: number) => 1 - Math.pow(1 - clamp01(x), 3);
export const sm = (x: number) => {
  const c = clamp01(x);
  return c * c * (3 - 2 * c);
};
export const back = (x: number) => {
  const c = clamp01(x);
  return 1 + 2.6 * Math.pow(c - 1, 3) + 1.6 * Math.pow(c - 1, 2);
};
export const lerp = (a: number, b: number, u: number) => a + (b - a) * u;

/** Sichtbarkeit eines Zeitfensters mit weicher Blende */
export function win(t: number, a: number, b: number, d = 0.25) {
  if (t < a - 0.001 || t > b + d) return 0;
  return clamp01(Math.min((t - a) / d + (a <= 0 ? 1 : 0), (b + d - t) / d));
}

export type VLine = { id: string; text: string; start: number; dur: number };

/** Sprechersätze nacheinander legen (Schätzung ~14 Zeichen/s; nach Aufnahme durch echte Zeiten ersetzen) */
export function seq(items: Array<[string, string, number?]>, t0 = 0.3, gap = 0.4): VLine[] {
  let t = t0;
  return items.map(([id, text, dur]) => {
    const d = dur ?? Math.max(2.4, text.length / 14 + 0.3);
    const l = { id, text, start: t, dur: d };
    t += d + gap;
    return l;
  });
}
export const lineAt = (lines: VLine[], id: string) => lines.find((l) => l.id === id)!;
export const S = (lines: VLine[], id: string) => lineAt(lines, id).start;
export const E = (lines: VLine[], id: string) => lineAt(lines, id).start + lineAt(lines, id).dur;

export function T({ x, y, size, children, color = COL.forestDeep, weight = 800, font = FONT_DISPLAY, anchor = "middle", o = 1, italic }: { x: number; y: number; size: number; children: ReactNode; color?: string; weight?: number; font?: string; anchor?: "middle" | "start" | "end"; o?: number; italic?: boolean }) {
  return (
    <text x={x} y={y} fontFamily={font} fontSize={size} fontWeight={weight} fill={color} textAnchor={anchor} opacity={o} fontStyle={italic ? "italic" : undefined}>
      {children}
    </text>
  );
}

export function Chip({ x, y, text, fill = COL.rust, color = PAPER, size = 30 }: { x: number; y: number; text: string; fill?: string; color?: string; size?: number }) {
  const w = text.length * size * 0.56 + 56;
  return (
    <g>
      <rect x={x - w / 2} y={y - size * 1.35} width={w} height={size * 2} rx={size} fill={fill} />
      <T x={x} y={y} size={size} font={FONT_BODY} weight={700} color={color}>{text}</T>
    </g>
  );
}

/** Kopfzeile wie in den bisherigen Reels */
export function Header({ t, label = "Die Hofgeschichten · Reitakademie", hide = 0 }: { t: number; label?: string; hide?: number }) {
  const w = label.length * 16.2 + 90;
  return (
    <g transform="translate(60 92)" opacity={(1 - hide) * ease((t + 0.3) / 0.4)}>
      <rect width={w} height="64" rx="32" fill={COL.forest} />
      <path d="M30 44v-15a10 10 0 0 1 20 0v15" fill="none" stroke={COL.sand} strokeWidth="5.5" strokeLinecap="round" />
      <text x="66" y="43" fontFamily={FONT_BODY} fontSize="30" fontWeight="700" fill={PAPER}>
        {label}
      </text>
    </g>
  );
}

/** Eingebrannte Untertitel (für Ton aus) */
export function Caption({ t, lines, y = 1560, skip = [] }: { t: number; lines: VLine[]; y?: number; skip?: string[] }) {
  const v = lines.find((l) => t >= l.start - 0.05 && t < l.start + l.dur + 0.25);
  if (!v || skip.includes(v.id)) return null;
  const rows = wrap(v.text, 34);
  const h = 34 + rows.length * 54;
  const o = Math.min(clamp01((t - v.start + 0.05) / 0.15), clamp01((v.start + v.dur + 0.25 - t) / 0.15));
  return (
    <g opacity={o}>
      <rect x={70} y={y} width={940} height={h} rx="28" fill={COL.forestDeep} opacity=".92" />
      {rows.map((r, i) => (
        <T key={i} x={540} y={y + 60 + i * 54} size={40} font={FONT_BODY} weight={700} color={PAPER}>{r}</T>
      ))}
    </g>
  );
}

/** Nummer + Überschrift + Unterzeile für einen Punkt (1–5) */
export function PointHead({ t, start, end, n, title, sub, y = 200 }: { t: number; start: number; end: number; n: string; title: string; sub: string; y?: number }) {
  const o = win(t, start, end);
  if (o <= 0) return null;
  const l = t - start;
  const k1 = ease(l / 0.4);
  const k2 = ease((l - 0.2) / 0.4);
  const nb = back(l / 0.45);
  return (
    <g opacity={o}>
      <g transform={`translate(540 ${y + 40}) scale(${Math.max(0.01, nb)})`}>
        <circle r="58" fill={COL.honey} />
        <T x={0} y={24} size={70} color={COL.forestDeep}>{n}</T>
      </g>
      <g opacity={k1} transform={`translate(0 ${(1 - k1) * 30})`}>
        <T x={540} y={y + 200} size={title.length > 19 ? 70 : 84}>{title}</T>
      </g>
      <g opacity={k2} transform={`translate(0 ${(1 - k2) * 30})`}>
        <T x={540} y={y + 272} size={sub.length > 36 ? 36 : 42} font={FONT_BODY} weight={700} color={COL.inkSoft}>{sub}</T>
      </g>
    </g>
  );
}

/** Fortschritt als Punkte */
export function Dots({ t, spans, y = 1470 }: { t: number; spans: Array<[number, number]>; y?: number }) {
  const o = Math.max(...spans.map(([a, b]) => win(t, a, b)));
  if (o <= 0) return null;
  const cur = spans.findIndex(([a, b]) => t >= a && t < b + 0.4);
  const n = spans.length;
  return (
    <g opacity={o}>
      {spans.map((_, i) => {
        const cx = 540 + (i - (n - 1) / 2) * 110;
        const on = i <= cur;
        return (
          <g key={i}>
            {i < n - 1 && <rect x={cx + 26} y={y - 4} width={58} height={8} rx="4" fill={i < cur ? COL.honey : COL.sandLight} />}
            <circle cx={cx} cy={y} r={i === cur ? 34 : 26} fill={on ? COL.forest : PAPER} stroke={on ? COL.forest : COL.sand} strokeWidth="4" />
            <T x={cx} y={y + 12} size={i === cur ? 36 : 28} font={FONT_BODY} weight={700} color={on ? PAPER : COL.brown}>{String(i + 1)}</T>
          </g>
        );
      })}
    </g>
  );
}

/** Merksatz-Karte oben */
export function Merk({ t, at, lines, sub }: { t: number; at: number; lines: string[]; sub?: string }) {
  const k = ease((t - at) / 0.45);
  if (k <= 0) return null;
  const h = 150 + lines.length * 86 + (sub ? 60 : 0);
  const size = Math.min(70, 820 / (Math.max(...lines.map((l) => l.length)) * 0.5));
  return (
    <g opacity={k} transform={`translate(0 ${(1 - k) * 50})`}>
      <rect x={90} y={185} width={900} height={h} rx="40" fill={COL.forest} />
      <T x={540} y={252} size={36} font={FONT_BODY} weight={700} color={COL.honey}>MERKSATZ</T>
      {lines.map((l, i) => (
        <T key={i} x={540} y={345 + i * 86} size={size} color={PAPER}>{l}</T>
      ))}
      {sub && <T x={540} y={345 + lines.length * 86 + 10} size={38} font={FONT_BODY} weight={700} color={COL.sand}>{sub}</T>}
    </g>
  );
}

export function Cta({ t, at, title, sub = "Reitakademie · Link in der Bio", y = 1330 }: { t: number; at: number; title: string; sub?: string; y?: number }) {
  const k = ease((t - at) / 0.45);
  if (k <= 0) return null;
  return (
    <g opacity={k} transform={`translate(0 ${(1 - k) * 40})`}>
      <rect x={90} y={y} width={900} height={190} rx="34" fill={COL.honey} />
      <T x={540} y={y + 75} size={50} color={COL.forestDeep}>{title}</T>
      <T x={540} y={y + 140} size={36} font={FONT_BODY} weight={700} color={COL.forestDeep}>{sub}</T>
    </g>
  );
}

/** Große Frage als Hook (Titelbild: Pferd + Frage) */
export function Hook({ t, end, lines }: { t: number; end: number; lines: Array<[string, string?]> }) {
  const o = win(t, 0, end, 0.25);
  if (o <= 0) return null;
  return (
    <g opacity={o}>
      {lines.map(([s, c], i) => {
        const k = ease((t + 0.45 - i * 0.15) / 0.45);
        return (
          <g key={i} opacity={k} transform={`translate(0 ${(1 - k) * 40})`}>
            <T x={540} y={330 + i * 110} size={Math.min(100, 960 / (s.length * 0.53))} color={c ?? COL.forestDeep}>{s}</T>
          </g>
        );
      })}
    </g>
  );
}

/** Reitplatz + bewegtes Pferd in Seitenansicht. Kinder werden im Pferde-Koordinatensystem gezeichnet. */
export const K = 2.5;
export const X0 = 150;
export const GROUND = 1310;
export const ARENA_TOP = 600;
export function ArenaHorse({ t, gait, look, highlight, children, after }: { t: number; gait: Exclude<Gait, "stand">; look: HorseLook; highlight?: Partial<Record<LegId, string>>; children?: ReactNode; after?: ReactNode }) {
  const G = GAIT_DEFS[gait];
  const speed = (G.stride / (G.duty * G.cycle)) * K;
  return (
    <g>
      <svg x={0} y={ARENA_TOP} width={W} height={H - ARENA_TOP} viewBox={`0 0 ${W / 2} ${(H - ARENA_TOP) / 2}`}>
        <ScrollingArena t={t} speed={speed / 2} y={(GROUND - 60 - ARENA_TOP) / 2} />
        <rect y={(GROUND - 80 - ARENA_TOP) / 2} width={W} height={H} fill="#E3D3B4" />
      </svg>
      <rect y={ARENA_TOP - 2} width={W} height={240} fill="url(#rksky)" />
      <svg x={X0} y={GROUND - 285 * K} width={320 * K} height={292 * K} viewBox="70 20 320 292" overflow="visible">
        <AnimHorse look={look} gait={gait} time={t} highlight={highlight}>
          {children}
        </AnimHorse>
        {after}
      </svg>
    </g>
  );
}
/** Pferde-Koordinaten → Bildschirm */
export const toScreen = ([x, y]: [number, number]): [number, number] => [X0 + (x - 70) * K, GROUND - 285 * K + (y - 20) * K];

export function SkyDefs() {
  return (
    <defs>
      <linearGradient id="rksky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={COL.bg} />
        <stop offset="1" stopColor={COL.bg} stopOpacity="0" />
      </linearGradient>
      <linearGradient id="rktop" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0.6" stopColor={COL.bg} />
        <stop offset="1" stopColor={COL.bg} stopOpacity="0" />
      </linearGradient>
    </defs>
  );
}

export function Arrow({ from, to, color = COL.honey, w = 3.2, head = 9 }: { from: [number, number]; to: [number, number]; color?: string; w?: number; head?: number }) {
  const a = Math.atan2(to[1] - from[1], to[0] - from[0]);
  const hx = (d: number, s: number) => to[0] - d * Math.cos(a) + s * Math.sin(a);
  const hy = (d: number, s: number) => to[1] - d * Math.sin(a) - s * Math.cos(a);
  return (
    <g stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d={`M${from[0]},${from[1]} L${to[0]},${to[1]}`} />
      <path d={`M${hx(head, head * 0.66)},${hy(head, head * 0.66)} L${to[0]},${to[1]} L${hx(head, -head * 0.66)},${hy(head, -head * 0.66)}`} />
    </g>
  );
}
