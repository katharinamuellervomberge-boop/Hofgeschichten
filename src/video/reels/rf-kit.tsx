/* Serie „RIDER FIX – 1 Problem. 1 Lösung.“ (rf1–rf3, 10.11.2026)
   Nur zwei kleine Serien-Bausteine; alles andere kommt aus nov-kit / n2-kit / bein-reel. */
import { COL, FONT_BODY, PAPER, T, back, ease } from "./nov-kit";

export const RF_HEADER = "RIDER FIX · 1 Problem. 1 Lösung.";

/** Serien-Plakette über dem Hook */
export function RfTag({ o, y = 150 }: { o: number; y?: number }) {
  if (o <= 0.01) return null;
  return (
    <g opacity={o}>
      <rect x={540 - 300} y={y - 46} width={600} height={78} rx="39" fill={COL.forestDeep} />
      <rect x={540 - 300} y={y - 46} width={230} height={78} rx="39" fill={COL.rust} />
      <T x={540 - 185} y={y + 6} size={34} font={FONT_BODY} weight={900} color={PAPER}>RIDER FIX</T>
      <T x={540 + 115} y={y + 4} size={28} font={FONT_BODY} weight={700} color={COL.honey}>1 Problem. 1 Lösung.</T>
    </g>
  );
}

/** Abschluss-Karte (Speichern / Teilen) */
export function SaveCard({ t, a, title, sub, y = 1500 }: { t: number; a: number; title: string; sub: string; y?: number }) {
  const k = back((t - a) / 0.5);
  if (k <= 0.01) return null;
  return (
    <g opacity={Math.min(1, ease((t - a) / 0.3))} transform={`translate(540 ${y}) scale(${Math.max(0.01, k)})`}>
      <rect x={-420} y={-70} width={840} height={140} rx="40" fill={COL.honey} />
      <T x={0} y={-6} size={44} color={COL.forestDeep}>{title}</T>
      <T x={0} y={44} size={28} font={FONT_BODY} weight={800} color={COL.forestDeep}>{sub}</T>
    </g>
  );
}
