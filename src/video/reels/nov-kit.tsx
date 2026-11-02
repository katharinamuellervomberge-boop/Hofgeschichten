import { AnimHorse, type Gait, type LegId } from "@/components/illustrations/akademie/AnimHorse";
import type { HorseLook } from "@/content/types";
import type { ReactNode } from "react";
import { COL, FONT_BODY, PAPER, T, W, back, clamp01, ease, win, wrapText, type VLine } from "./nov-base";

export * from "./nov-base";

/* Baukasten für die November-Reels 2026 (Reels 01–07): gleiche Layouts für Fragen, Auflösungen,
   Anatomie, CTAs. Nur für neue Reels – bestehende Reels bleiben unverändert. */

/** Aufnahme-Zeiten → Sprechzeilen (Stimme beginnt bei `vo` s im Reel) */
export function mkLines(rec: Array<[string, string, number, number]>, vo = 0.4): VLine[] {
  return rec.map(([id, text, a, b]) => ({ id, text, start: a + vo, dur: b - a }));
}
/** Wortzeitpunkt im Teilsatz (anteilig nach Zeichen) */
export function wordAt(lines: VLine[], id: string, word: string) {
  const l = lines.find((x) => x.id === id)!;
  const i = Math.max(0, l.text.indexOf(word));
  return l.start + (l.dur * i) / l.text.length;
}

/** Überschrift + Unterzeile oben (wie in allen Reels) */
export function Title({ t, a, b, top, sub, color = COL.forestDeep, y = 300 }: { t: number; a: number; b: number; top: string; sub?: string; color?: string; y?: number }) {
  const o = win(t, a, b);
  if (o <= 0) return null;
  const k1 = ease((t - a) / 0.4);
  const k2 = ease((t - a - 0.25) / 0.4);
  return (
    <g opacity={o}>
      <g opacity={k1} transform={`translate(0 ${(1 - k1) * 30})`}>
        <T x={540} y={y} size={Math.min(84, 900 / (top.length * 0.53))} color={color}>{top}</T>
      </g>
      {sub && (
        <g opacity={k2} transform={`translate(0 ${(1 - k2) * 30})`}>
          <T x={540} y={y + 78} size={Math.min(42, 940 / (sub.length * 0.52))} font={FONT_BODY} weight={700} color={COL.inkSoft}>{sub}</T>
        </g>
      )}
    </g>
  );
}

/** Hook direkt auf der Grafik: Zeilen bauen sich auf, erste Zeile schon im ersten Bild. `hi` = Zeile in Terrakotta, springt auf */
export function HookText({ t, end, lines, y0 = 250, gap = 100, size = 84 }: { t: number; end: number; lines: Array<{ text: string; at: number; hi?: boolean; italic?: boolean; size?: number }>; y0?: number; gap?: number; size?: number }) {
  const o = win(t, 0, end, 0.35);
  if (o <= 0) return null;
  let y = y0;
  return (
    <g opacity={o}>
      {lines.map((l, i) => {
        const s = l.size ?? size;
        const yy = y;
        y += i < lines.length - 1 ? Math.max(gap, s * 1.12) : 0;
        const k = l.hi ? back((t - l.at) / 0.45) : ease((t - l.at) / 0.4);
        if (k <= 0.01) return null;
        return (
          <g key={i} opacity={Math.min(1, k)} transform={l.hi ? `translate(540 ${yy - s * 0.35}) scale(${Math.max(0.01, k)}) translate(-540 ${-(yy - s * 0.35)})` : `translate(0 ${(1 - k) * 30})`}>
            <T x={540} y={yy} size={Math.min(s, 980 / (l.text.length * 0.52))} color={l.hi ? COL.rust : COL.forestDeep} italic={l.italic}>{l.text}</T>
          </g>
        );
      })}
    </g>
  );
}

/** Beschriftungs-Pille, springt auf */
export function Pop({ t, a, x, y, text, fill = COL.forest, color = PAPER, size = 32, o = 1 }: { t: number; a: number; x: number; y: number; text: string; fill?: string; color?: string; size?: number; o?: number }) {
  const k = back((t - a) / 0.4);
  if (k <= 0.01 || o <= 0) return null;
  const w = text.length * size * 0.56 + 56;
  return (
    <g opacity={Math.min(1, k) * o} transform={`translate(${x} ${y}) scale(${Math.max(0.01, k)}) translate(${-x} ${-y})`}>
      <rect x={x - w / 2} y={y - size * 1.35} width={w} height={size * 2} rx={size} fill={fill} />
      <T x={x} y={y} size={size} font={FONT_BODY} weight={700} color={color}>{text}</T>
    </g>
  );
}

/** Rundes Symbol mit Beschriftung (Stimme, Gesicht, Geruch …) */
export function IconBadge({ t, a, x, y, icon, label, col = COL.forest, r = 78 }: { t: number; a: number; x: number; y: number; icon: ReactNode; label: string; col?: string; r?: number }) {
  const k = back((t - a) / 0.45);
  if (k <= 0.01) return null;
  return (
    <g opacity={Math.min(1, k)} transform={`translate(${x} ${y}) scale(${Math.max(0.01, k)})`}>
      <circle r={r} fill={col} />
      <g transform={`scale(${r / 78})`}>{icon}</g>
      <T x={0} y={r + 52} size={34} font={FONT_BODY} weight={700} color={COL.forestDeep}>{label}</T>
    </g>
  );
}

/** Große Kommentar-Frage (Sprechblase) */
export function CommentCard({ t, a, lines, sub, y = 1240 }: { t: number; a: number; lines: string[]; sub?: string; y?: number }) {
  const k = back((t - a) / 0.5);
  if (k <= 0.01) return null;
  const h = 90 + lines.length * 70 + (sub ? 56 : 0);
  return (
    <g opacity={Math.min(1, k)} transform={`translate(540 ${y + h / 2}) scale(${Math.max(0.01, k)}) translate(-540 ${-(y + h / 2)})`}>
      <rect x={90} y={y} width={900} height={h} rx="44" fill={COL.forest} />
      <path d={`M${200} ${y + h - 2} l-30 54 l80 -54 Z`} fill={COL.forest} />
      {lines.map((l, i) => (
        <T key={i} x={540} y={y + 92 + i * 70} size={Math.min(58, 860 / (l.length * 0.5))} color={PAPER}>{l}</T>
      ))}
      {sub && <T x={540} y={y + 92 + lines.length * 70} size={34} font={FONT_BODY} weight={700} color={COL.honey}>{sub}</T>}
    </g>
  );
}

/** Abschluss-Karte mit Branding */
export function Brand({ t, a, sub = "Reitakademie · Link in der Bio", y = 1590 }: { t: number; a: number; sub?: string; y?: number }) {
  const k = ease((t - a) / 0.5);
  if (k <= 0) return null;
  return (
    <g opacity={k} transform={`translate(0 ${(1 - k) * 40})`}>
      <rect x={90} y={y} width={900} height={150} rx="34" fill={COL.honey} />
      <path d={`M150 ${y + 112} v-42 a26 26 0 0 1 52 0 v42`} fill="none" stroke={COL.forestDeep} strokeWidth="9" strokeLinecap="round" />
      <T x={580} y={y + 70} size={52} color={COL.forestDeep}>Die Hofgeschichten</T>
      <T x={580} y={y + 120} size={30} font={FONT_BODY} weight={700} color={COL.brownDeep}>{sub}</T>
    </g>
  );
}

/** Sandboden mit weicher Kante */
export function Ground({ y = 1390, h = 160, id = "nk" }: { y?: number; h?: number; id?: string }) {
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={COL.bg} />
          <stop offset="1" stopColor={COL.bg} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x={0} y={y} width={W} height={h} fill="#E3D3B4" />
      <g fill="#D3BF9C">
        {Array.from({ length: 16 }, (_, i) => {
          const x = (i * 211) % W;
          const yy = y + 60 + ((i * 37) % (h - 70));
          return <ellipse key={i} cx={x} cy={yy} rx={i % 3 ? 14 : 22} ry="5" transform={`rotate(${(i * 37) % 180} ${x} ${yy})`} />;
        })}
      </g>
      <rect x={0} y={y - 2} width={W} height={60} fill={`url(#${id}-fade)`} />
      <rect x={0} y={y + h - 6} width={W} height={10} fill={COL.brown} opacity=".35" />
    </g>
  );
}

/* ---------- Pfade abtasten (im Browser über ein unsichtbares SVG) ---------- */
type Sampled = { pts: Array<[number, number]>; len: number };
const CACHE = new Map<string, Sampled>();
export function samplePath(d: string, n = 600): Sampled {
  const hit = CACHE.get(d);
  if (hit) return hit;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
  p.setAttribute("d", d);
  svg.appendChild(p);
  svg.setAttribute("style", "position:absolute;width:0;height:0");
  document.body.appendChild(svg);
  const len = p.getTotalLength();
  const pts: Array<[number, number]> = [];
  for (let i = 0; i <= n; i++) {
    const q = p.getPointAtLength((len * i) / n);
    pts.push([q.x, q.y]);
  }
  document.body.removeChild(svg);
  const s = { pts, len };
  CACHE.set(d, s);
  return s;
}
/** Punkt + Richtung (Grad) bei Anteil u (0–1) */
export function along(d: string, u: number): { p: [number, number]; ang: number } {
  const { pts } = samplePath(d);
  const n = pts.length - 1;
  const f = clamp01(u) * n;
  const i = Math.min(n - 1, Math.floor(f));
  const a = pts[i];
  const b = pts[i + 1];
  const r = f - i;
  const j0 = Math.max(0, i - 3);
  const j1 = Math.min(n, i + 4);
  const ang = (Math.atan2(pts[j1][1] - pts[j0][1], pts[j1][0] - pts[j0][0]) * 180) / Math.PI;
  return { p: [a[0] + (b[0] - a[0]) * r, a[1] + (b[1] - a[1]) * r], ang };
}

/* ---------- Pferd seitlich mit beweglichem Hals (Kopf heben/senken ohne Kante) ---------- */
export type Place = { x: number; y: number; k: number };
const SLICES = [0, 1, 2, 3, 4];
function seam(off: number, rev = false) {
  const dx = 0.72 * off, dy = -0.69 * off;
  const x = (y: number) => 253 + ((y - 30) * 38) / 120;
  const a = `L${x(-60) + dx},${-60 + dy}`;
  const b = `L${x(200) + dx},${200 + dy}`;
  return rev ? `${b} ${a}` : `${a} ${b}`;
}
export function NodHorse({ t, pl, look, nod = 0, gait = "stand", id, children, flip, blink = 0, reach = 0, highlight, strideK, slices = 5 }: { t: number; pl: Place; look: HorseLook; nod?: number; gait?: Gait; id: string; children?: ReactNode; flip?: boolean; blink?: number; reach?: number; highlight?: Partial<Record<LegId, string>>; strideK?: number; slices?: number }) {
  const horse = <AnimHorse look={look} gait={gait} time={t} highlight={highlight} strideK={strideK}>{children}</AnimHorse>;
  const tr = flip ? `translate(460 0) scale(-1 1)` : undefined;
  const n = slices;
  const step = 35 / n;
  const ov = n > 5 ? 2.5 : 4;
  const SL = n === 5 ? SLICES : Array.from({ length: n }, (_, i) => i);
  return (
    <svg x={pl.x} y={pl.y} width={320 * pl.k} height={292 * pl.k} viewBox="70 20 320 292" overflow="visible">
      <defs>
        <clipPath id={`${id}-rest`}><path d={`M0,-60 ${seam(n === 5 ? 8 : step + 1)} L460,200 L460,420 L0,420 Z`} /></clipPath>
        {SL.map((i) => (
          <clipPath key={i} id={`${id}-s${i}`}>
            <path d={i === n - 1 ? `M${seam(i * step).slice(1)} L460,200 L460,-60 Z` : `M${seam(i * step).slice(1)} ${seam((i + 1) * step + ov, true)} Z`} />
          </clipPath>
        ))}
      </defs>
      <g transform={tr}>
        <g clipPath={`url(#${id}-rest)`}>{horse}</g>
        {SL.map((i) => (
          <g key={i} transform={`translate(${(reach * (i + 1)) / n} 0) rotate(${(nod * (i + 1)) / n} 284 110)`}>
            <g clipPath={`url(#${id}-s${i})`}>
              {horse}
              {i === n - 1 && blink > 0.01 && <ellipse cx="330" cy="78" rx="5.4" ry={5.4 * blink} fill={look.coat} />}
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
}
/** Wo liegt ein Punkt am Kopf (z. B. Trensenring) nach Nicken/Vorstrecken? (Pferde-Koordinaten, ohne Rumpf-Wippen) */
export function headPoint([x, y]: [number, number], nod = 0, reach = 0): [number, number] {
  const a = (nod * Math.PI) / 180;
  const dx = x - 284, dy = y - 110;
  return [284 + dx * Math.cos(a) - dy * Math.sin(a) + reach, 110 + dx * Math.sin(a) + dy * Math.cos(a)];
}
/** Pferde-Koordinaten → Bildschirm */
export const hs = (pl: Place, [x, y]: [number, number], flip = false): [number, number] => [pl.x + ((flip ? 460 - x : x) - 70) * pl.k, pl.y + (y - 20) * pl.k];

/* ---------- Smartphone-Rahmen ---------- */
export function Phone({ x, y, w = 520, children, id }: { x: number; y: number; w?: number; children: ReactNode; id: string }) {
  const h = w * 2.05;
  return (
    <g>
      <rect x={x - 10} y={y + 14} width={w + 20} height={h} rx={w * 0.13} fill="#000" opacity=".12" />
      <rect x={x} y={y} width={w} height={h} rx={w * 0.12} fill="#1F2621" />
      <defs>
        <clipPath id={`${id}-scr`}><rect x={x + 16} y={y + 16} width={w - 32} height={h - 32} rx={w * 0.09} /></clipPath>
      </defs>
      <g clipPath={`url(#${id}-scr)`}>
        <rect x={x + 16} y={y + 16} width={w - 32} height={h - 32} fill={COL.bg} />
        {children}
      </g>
      <rect x={x + w / 2 - 50} y={y + 28} width={100} height={22} rx={11} fill="#1F2621" />
    </g>
  );
}

export { wrapText };
