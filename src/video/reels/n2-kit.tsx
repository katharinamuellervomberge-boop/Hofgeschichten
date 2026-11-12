/* Baukasten für die 10 Community-Reels vom 06.11.2026 (R1–R10).
   Baut auf nov-kit, rs-kit, top und bein-reel auf: Seitenansicht mit frei wählbarer Sitz-/Bein-Pose,
   Viereck von oben, Stempel, Nummern-Karten, Countdown, Taktanzeige. */
import { bodyBob, type Gait } from "@/components/illustrations/akademie/AnimHorse";
import { BIT, SITZ, type Body, type P } from "@/components/illustrations/akademie/geometry";
import { Rider, Tack } from "@/components/illustrations/akademie/RiderScene";
import { getHorse } from "@/content/horses";
import type { ReactNode } from "react";
import { LEG, mixLeg, type Leg } from "./bein-reel";
import { COL, FONT_BODY, NodHorse, PAPER, T, back, ease, headPoint, hs, lerp, sm, win, type Place } from "./nov-kit";
import { Arena, LEATHER, elbowFor, groundSpeed, reinGeom } from "./rs-kit";

export { LEG, mixLeg, type Leg };
export const LOOK_T = getHorse("tivoli")!.look;
export const LOOK_TO = getHorse("tonga")!.look;
export const LOOK_S = getHorse("scrabble")!.look;

const rotAround = (p: P, c: P, deg: number): P => {
  const a = (deg * Math.PI) / 180;
  const x = p[0] - c[0];
  const y = p[1] - c[1];
  return [c[0] + x * Math.cos(a) - y * Math.sin(a), c[1] + x * Math.sin(a) + y * Math.cos(a)];
};

/** Körper der Reiterin: Bein-Pose, Oberkörper um die Hüfte geneigt (+ = nach vorn), Kopf gesenkt, Hand vor/zurück, Gewicht hoch/runter */
export function pose({ leg = LEG.sitz, lean = 0, headDown = 0, handDx = 0, handDy = 0, dy = 0, swing = 0 }: { leg?: Leg; lean?: number; headDown?: number; handDx?: number; handDy?: number; dy?: number; swing?: number }): Body {
  const hip: P = [SITZ.hip[0] + swing, SITZ.hip[1] + dy];
  const sh = rotAround([SITZ.shoulder[0] + swing * 0.4, SITZ.shoulder[1] + dy], hip, lean);
  let hd = rotAround([SITZ.head[0] + swing * 0.3, SITZ.head[1] + dy], hip, lean);
  hd = rotAround(hd, sh, headDown);
  const hand: P = [SITZ.hand[0] + handDx, SITZ.hand[1] + handDy + dy * 0.5];
  return { hip, shoulder: sh, head: hd, hand, elbow: elbowFor(sh, SITZ.elbow, SITZ.hand, hand), ...leg };
}

/** Pferd seitlich mit Reiterin in beliebiger Pose (Zügellinie mit fester Länge) */
export function Ride({ t, pl, gait, id, b, nod = 6, look = LOOK_T, glow, strideK, rein }: { t: number; pl: Place; gait: Gait; id: string; b: Body; nod?: number; look?: typeof LOOK_T; glow?: string; strideK?: number; rein?: number }) {
  const bit = headPoint(BIT, nod, 0);
  const R = rein ?? Math.hypot(bit[0] - SITZ.hand[0], bit[1] - SITZ.hand[1]) + 1.5;
  const r = reinGeom({ nod, reach: 0, hand: b.hand, rein: R });
  const bob = bodyBob(gait, t);
  return (
    <g>
      <NodHorse t={t} pl={pl} look={look} gait={gait} id={id} nod={nod} slices={18} strideK={strideK}>
        <Tack hand={b.hand} longRein={false} stirrupsDown={false} noRein />
      </NodHorse>
      <svg x={pl.x} y={pl.y} width={320 * pl.k} height={292 * pl.k} viewBox="70 20 320 292" overflow="visible">
        <g transform={`translate(0 ${bob})`}>
          {glow && <path d={`M${b.hip[0]},${b.hip[1]} L${b.knee[0]},${b.knee[1]} L${b.ankle[0]},${b.ankle[1]}`} fill="none" stroke={glow} strokeWidth="13" strokeLinecap="round" opacity=".25" />}
          <Rider b={b} pose="sitz" />
          <path d={r.path} fill="none" stroke={LEATHER} strokeWidth="2.4" strokeLinecap="round" />
          <circle cx={b.hand[0]} cy={b.hand[1]} r="4.6" fill="#5E4636" />
        </g>
      </svg>
    </g>
  );
}
export const scr = (pl: Place, gait: Gait, t: number, p: P): P => hs(pl, [p[0], p[1] + bodyBob(gait, t)]);
export const V_SIDE: Place = { x: 540 - 160 * 2.6, y: 1390 - 285 * 2.6, k: 2.6 };
export { Arena, groundSpeed };

/* ---------- Viereck von oben ---------- */
export type Bahn = { x: number; y: number; m: number; w?: number; h?: number };
export const bx = (b: Bahn, xm: number) => b.x + xm * b.m;
export const by = (b: Bahn, ym: number) => b.y + ym * b.m;
export function TopBahn({ b, letters = true, children, track = true }: { b: Bahn; letters?: boolean; children?: ReactNode; track?: boolean }) {
  const w = b.w ?? 40;
  const h = b.h ?? 20;
  const L: Array<[string, number, number]> = w === 40 && h === 20 ? [["A", -1.1, 10], ["C", 41.1, 10], ["E", 20, -1.1], ["B", 20, 21.6], ["F", 6, 21.6], ["M", 34, 21.6], ["H", 34, -1.1], ["K", 6, -1.1]] : [];
  return (
    <g>
      <rect x={bx(b, 0)} y={by(b, 0)} width={w * b.m} height={h * b.m} rx="6" fill="#E3D3B4" stroke={PAPER} strokeWidth="10" />
      <g fill="#D3BF9C">
        {Array.from({ length: 26 }, (_, i) => (
          <ellipse key={i} cx={bx(b, 1 + ((i * 7.3) % (w - 2)))} cy={by(b, 1 + ((i * 5.7) % (h - 2)))} rx={i % 3 ? 10 : 16} ry="4" />
        ))}
      </g>
      {track && <rect x={bx(b, 1)} y={by(b, 1)} width={(w - 2) * b.m} height={(h - 2) * b.m} rx="8" fill="none" stroke={PAPER} strokeWidth="3" opacity=".55" />}
      {letters && L.map(([l, x, y]) => <T key={l} x={bx(b, x)} y={by(b, y) + 10} size={26} font={FONT_BODY} weight={700} color={COL.brownDeep}>{l}</T>)}
      {children}
    </g>
  );
}
/** Linie aus einer Funktion [x,y](u) in Metern */
export function pathD(b: Bahn, f: (u: number) => P, n = 120, u1 = 1) {
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const [x, y] = f((i / n) * u1);
    pts.push(`${bx(b, x).toFixed(1)},${by(b, y).toFixed(1)}`);
  }
  return "M" + pts.join(" L");
}
/** Position + Blickrichtung entlang einer Funktion */
export function along(b: Bahn, f: (u: number) => P, u: number): { p: P; ang: number } {
  const a = f(Math.max(0, u - 0.004));
  const c = f(Math.min(1, u + 0.004));
  const p = f(u);
  return { p: [bx(b, p[0]), by(b, p[1])], ang: (Math.atan2(c[1] - a[1], c[0] - a[0]) * 180) / Math.PI };
}

/* ---------- Text- und Karten-Bausteine ---------- */

/** Stempel (MYTHOS, FALSCH …) */
export function Stamp({ t, a, x, y, text, col = COL.rust, rot = -8, size = 92, o = 1 }: { t: number; a: number; x: number; y: number; text: string; col?: string; rot?: number; size?: number; o?: number }) {
  const u = (t - a) / 0.28;
  if (u <= 0 || o <= 0) return null;
  const k = u < 1 ? 1.9 - 0.9 * sm(u) : 1;
  const w = text.length * size * 0.66 + 70;
  return (
    <g opacity={Math.min(1, u * 2) * o} transform={`translate(${x} ${y}) rotate(${rot}) scale(${k})`}>
      <rect x={-w / 2} y={-size * 0.78} width={w} height={size * 1.5} rx="18" fill="none" stroke={col} strokeWidth="10" />
      <T x={0} y={size * 0.33} size={size} font={FONT_BODY} weight={900} color={col}>{text}</T>
    </g>
  );
}

/** Nummern-Karte (Ursache 1–3 usw.) */
export function NumCard({ t, a, x, y, w = 300, n, title, sub, col = COL.rust, o = 1, dim = 0 }: { t: number; a: number; x: number; y: number; w?: number; n: string; title: string; sub?: string; col?: string; o?: number; dim?: number }) {
  const k = back((t - a) / 0.4);
  if (k <= 0.01 || o <= 0) return null;
  const h = sub ? 230 : 180;
  return (
    <g opacity={Math.min(1, k) * o * (1 - 0.55 * dim)} transform={`translate(${x} ${y + h / 2}) scale(${Math.max(0.01, k)}) translate(${-x} ${-(y + h / 2)})`}>
      <rect x={x - w / 2} y={y} width={w} height={h} rx="30" fill={PAPER} stroke={col} strokeWidth="5" />
      <circle cx={x} cy={y} r="34" fill={col} />
      <T x={x} y={y + 14} size={40} color={PAPER}>{n}</T>
      <T x={x} y={y + 96} size={Math.min(38, (w - 30) / (title.length * 0.5))} color={COL.forestDeep}>{title}</T>
      {sub && <T x={x} y={y + 150} size={Math.min(27, (w - 30) / (sub.length * 0.52))} font={FONT_BODY} weight={700} color={COL.inkSoft}>{sub}</T>}
    </g>
  );
}

/** Großer Countdown mit Ring */
export function Countdown({ t, a, secs, x = 540, y = 470, r = 130 }: { t: number; a: number; secs: number; x?: number; y?: number; r?: number }) {
  const u = (t - a) / secs;
  if (u < -0.05) return null;
  const left = Math.max(0, Math.ceil(secs - (t - a)));
  const C = 2 * Math.PI * r;
  const beat = 1 - ((t - a) % 1);
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={PAPER} />
      <circle cx={x} cy={y} r={r - 6} fill="none" stroke={COL.sandLight} strokeWidth="16" />
      <circle cx={x} cy={y} r={r - 6} fill="none" stroke={u >= 1 ? COL.forest : COL.honey} strokeWidth="16" strokeLinecap="round" strokeDasharray={`${C * Math.min(1, Math.max(0, 1 - u))} ${C}`} transform={`rotate(-90 ${x} ${y})`} />
      <g transform={`translate(${x} ${y}) scale(${1 + 0.06 * beat * (u < 1 ? 1 : 0)})`}>
        <T x={0} y={44} size={130} color={COL.forestDeep}>{u >= 1 ? "✓" : String(left)}</T>
      </g>
    </g>
  );
}

/** Taktanzeige: Punkte leuchten zu den Zeitpunkten (Sekunden, innerhalb eines Zyklus) */
export function Takt({ t, cycle, beats, x = 540, y = 470, labels, col = COL.honey, o = 1 }: { t: number; cycle: number; beats: number[]; x?: number; y?: number; labels?: string[]; col?: string; o?: number }) {
  if (o <= 0.01) return null;
  const ph = ((t % cycle) + cycle) % cycle;
  const gap = 120;
  const x0 = x - ((beats.length - 1) * gap) / 2;
  return (
    <g opacity={o}>
      {beats.map((b, i) => {
        const d = (ph - b + cycle) % cycle;
        const on = d < 0.18;
        return (
          <g key={i} transform={`translate(${x0 + i * gap} ${y})`}>
            <circle r={on ? 40 : 30} fill={on ? col : COL.sandLight} />
            <T x={0} y={14} size={on ? 40 : 32} font={FONT_BODY} weight={800} color={on ? PAPER : COL.brown}>{labels?.[i] ?? String(i + 1)}</T>
          </g>
        );
      })}
    </g>
  );
}

/** Kleines rundes Symbol (✓ / ✗) */
export function Mark({ x, y, ok, k = 1, r = 34 }: { x: number; y: number; ok: boolean; k?: number; r?: number }) {
  if (k <= 0.01) return null;
  return (
    <g opacity={Math.min(1, k)} transform={`translate(${x} ${y}) scale(${Math.max(0.01, k)})`}>
      <circle r={r} fill={ok ? COL.forest : COL.rust} />
      <T x={0} y={r * 0.42} size={r * 1.25} font={FONT_BODY} weight={800} color={PAPER}>{ok ? "✓" : "✗"}</T>
    </g>
  );
}

/** Sicherheits-/Hinweiszeile unten */
export function Note({ text, y = 1840, o = 1 }: { text: string; y?: number; o?: number }) {
  if (o <= 0) return null;
  return (
    <g opacity={o}>
      <T x={540} y={y} size={28} font={FONT_BODY} weight={700} color={COL.inkSoft}>{text}</T>
    </g>
  );
}

/** Kommentar-Sticker wie auf Instagram („Antwort auf …“) */
export function ReplySticker({ t, a, b, name, text, y = 560 }: { t: number; a: number; b: number; name: string; text: string[]; y?: number }) {
  const o = win(t, a, b, 0.3);
  const k = back((t - a) / 0.45);
  if (o <= 0.01) return null;
  const h = 110 + text.length * 58;
  return (
    <g opacity={o} transform={`translate(540 ${y}) scale(${Math.max(0.01, Math.min(1.05, k))}) translate(-540 ${-y})`}>
      <rect x={110} y={y} width={860} height={h} rx="34" fill={PAPER} stroke={COL.sandLight} strokeWidth="4" />
      <circle cx={170} cy={y + 60} r="28" fill={COL.sand} />
      <T x={170} y={y + 72} size={30} color={COL.forestDeep}>{name[0].toUpperCase()}</T>
      <T x={215} y={y + 70} size={28} font={FONT_BODY} weight={700} color={COL.inkSoft} anchor="start">Antwort auf {name}</T>
      {text.map((l, i) => (
        <T key={i} x={150} y={y + 140 + i * 58} size={44} font={FONT_BODY} weight={700} color={COL.forestDeep} anchor="start">{l}</T>
      ))}
    </g>
  );
}

/** Weicher Hintergrund für Szenenwechsel */
export function Bg({ o, col = COL.bg }: { o: number; col?: string }) {
  if (o <= 0) return null;
  return <rect width={1080} height={1920} fill={col} opacity={o} />;
}

export { lerp, ease, sm, win };
