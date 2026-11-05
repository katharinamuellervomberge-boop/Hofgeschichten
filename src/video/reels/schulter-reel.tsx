import { Arrow, Brand, COL, Caption, CommentCard, E, FONT_BODY, Header, HookText, PAPER, Pop, S, T, Title, W, H, back, ease, lerp, mkLines, sm, win, wordAt } from "./nov-kit";
import type { ReactNode } from "react";
import { LOOKS, TopHorse, world, type Pt } from "./top";

/* Reiten verstehen (9:16): „Warum fällt dein Pferd auf die innere Schulter?“ (comp `schulter`)
   Viereck von oben, 20-m-Zirkel an der A-Seite (linke Hand, gegen den Uhrzeiger). Soll-Linie dunkelgrün; das Pferd
   driftet nach innen, gerittene Linie rot/ocker wird kleiner. Lupe: innere Schulter. Drei mögliche Ursachen (keine
   pauschale Einzellösung), Vorher/Nachher, Lösungshilfen, Hinweis „körperliche Ursachen abklären“. */

const REC: Array<[string, string, number, number]> = [
  ["a1", "Dein Pferd macht den Zirkel immer kleiner?", 0, 2.43],
  ["a2", "Dann schau dir das an!", 2.77, 4.28],
  ["b1", "Kennst du das?", 4.66, 5.41],
  ["c1", "Dein Pferd verliert die Balance nach innen.", 5.8, 7.81],
  ["d1", "Mögliche Gründe: fehlende Balance oder Tragkraft, zu viel innerer Zügel – oder zu wenig Führung durch Sitz und Schenkel.", 8.21, 15.65],
  ["e0", "Was hilft?", 16.02, 16.7],
  ["e1", "Blickführung, ein ausbalancierter Sitz, der innere Schenkel und ein begrenzender äußerer Zügel.", 17.0, 22.53],
  ["e2", "Bleibt es so, lass auch körperliche Ursachen abklären.", 22.91, 25.87],
  ["f1", "Verstehst du die Hilfen, wird Reiten leichter.", 26.22, 28.46],
  ["f2", "Hofgeschichten Reitakademie – 19,90 €.", 28.77, 31.95],
];
export const SCHULTER_LINES = mkLines(REC);
const L = SCHULTER_LINES;
export const SCHULTER_TOTAL = E(L, "f2") + 2.6;
const at = (id: string, w: string) => wordAt(L, id, w);

const BAD = COL.rust;
const OCHRE = COL.honey;
const GOOD = COL.forest;
const SPLIT_A = S(L, "e0") - 0.25;

/* ---------- Viereck mit Zirkel (Maßstab frei) ---------- */
type Box = { x: number; y: number; m: number };
const BIG: Box = { x: 80, y: 560, m: 23 };
const TOPB: Box = { x: 200, y: 470, m: 17 };
const BOTB: Box = { x: 200, y: 900, m: 17 };
const R0 = 9.3; // Zirkel auf dem Hufschlag (m)
const RMIN = 6.2;
const V = 5.2; // m/s
/** Fehlerfall: Radius über der Zeit */
const rBad = (t: number) => lerp(R0, RMIN, sm((t - 2.0) / 5.5));
/* Winkel durch Integration (konstante Geschwindigkeit) */
const DT = 1 / 120;
const TH: number[] = (() => {
  const a = [0];
  let th = -0.6;
  a[0] = th;
  for (let t = 0; t < SCHULTER_TOTAL + 2; t += DT) {
    th -= (V / rBad(t + DT / 2)) * DT;
    a.push(th);
  }
  return a;
})();
const thAt = (t: number) => {
  const f = Math.max(0, t / DT);
  const i = Math.min(TH.length - 2, Math.floor(f));
  return lerp(TH[i], TH[i + 1], f - i);
};
function Arena({ b, children }: { b: Box; children?: ReactNode }) {
  const px = (m: number) => b.x + m * b.m;
  const py = (m: number) => b.y + m * b.m;
  const big = b.m > 20;
  return (
    <g>
      <rect x={px(0)} y={py(0)} width={40 * b.m} height={20 * b.m} rx="6" fill="#E3D3B4" stroke={PAPER} strokeWidth={big ? 10 : 8} />
      <g fill="#D3BF9C">
        {Array.from({ length: 24 }, (_, i) => (
          <ellipse key={i} cx={px(1 + ((i * 7.3) % 38))} cy={py(1 + ((i * 5.7) % 18))} rx={i % 3 ? 9 : 14} ry="4" />
        ))}
      </g>
      {big && [["A", px(0) - 26, py(10) + 10], ["C", px(40) + 26, py(10) + 10], ["E", px(20), py(0) - 14], ["B", px(20), py(20) + 38], ["X", px(20) + 22, py(10) - 12]].map(([l, x, y]) => (
        <T key={l as string} x={x as number} y={y as number} size={28} font={FONT_BODY} weight={700} color={COL.brownDeep}>{l as string}</T>
      ))}
      <circle cx={px(10)} cy={py(10)} r={R0 * b.m} fill="none" stroke={GOOD} strokeWidth={big ? 7 : 6} strokeDasharray="16 10" opacity=".85" />
      {children}
    </g>
  );
}
const zc = (b: Box): Pt => [b.x + 10 * b.m, b.y + 10 * b.m];
const onCircle = (b: Box, th: number, r: number): Pt => [zc(b)[0] + r * b.m * Math.cos(th), zc(b)[1] + r * b.m * Math.sin(th)];
/** gerittene Spur (rot/ocker) seit Beginn der Drift */
function badTrail(b: Box, t: number) {
  const t0 = 1.6;
  if (t <= t0) return "";
  const pts: string[] = [];
  const n = Math.ceil((t - t0) / 0.05);
  for (let i = 0; i <= n; i++) {
    const q = lerp(Math.max(t0, t - 7.5), t, i / n);
    const p = onCircle(b, thAt(q), rBad(q));
    pts.push(`${p[0].toFixed(1)},${p[1].toFixed(1)}`);
  }
  return "M" + pts.join(" L");
}
function HorseOn({ b, th, r, t, s, glow }: { b: Box; th: number; r: number; t: number; s: number; glow?: number }) {
  const p = onCircle(b, th, r);
  const ang = (th * 180) / Math.PI - 90 - (r < R0 - 0.2 && r > RMIN + 0.1 ? 10 : 0);
  return (
    <g>
      <TopHorse at={p} ang={ang} look={LOOKS.tonga} step={t * 1.2} s={s} bend={r < R0 - 0.2 ? 6 : -8} />
      {glow !== undefined && glow > 0.01 && (() => {
        const sh = world(p, ang, s, [18, -13]);
        return <circle cx={sh[0]} cy={sh[1]} r={10 + 4 * Math.sin(t * 6)} fill={BAD} opacity={0.7 * glow} />;
      })()}
    </g>
  );
}

/* ---------- Lupe: innere Schulter ---------- */
function Loupe({ t, o }: { t: number; o: number }) {
  if (o <= 0.01) return null;
  const c: Pt = [540, 1300];
  const r = 210;
  const k = back((t - S(L, "c1") + 0.1) / 0.5);
  const s = 4.6;
  const drift = 18 * Math.sin(t * 1.4);
  const hc: Pt = [c[0] + 20 + drift * 0.3, c[1] + 40];
  const sh = world(hc, -90 - 12, s, [18, -13]);
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  return (
    <g opacity={o} transform={`translate(${c[0]} ${c[1]}) scale(${Math.max(0.01, Math.min(1, k))}) translate(${-c[0]} ${-c[1]})`}>
      <defs><clipPath id="sh-lp"><circle cx={c[0]} cy={c[1]} r={r} /></clipPath></defs>
      <circle cx={c[0]} cy={c[1]} r={r + 10} fill={COL.forestDeep} />
      <g clipPath="url(#sh-lp)">
        <rect x={c[0] - r} y={c[1] - r} width={2 * r} height={2 * r} fill="#E3D3B4" />
        <TopHorse at={hc} ang={-90 - 12} look={LOOKS.tonga} step={t * 1.2} s={s} bend={6} />
        <circle cx={sh[0]} cy={sh[1]} r={24 + 6 * pulse} fill={BAD} opacity=".45" />
        <circle cx={sh[0]} cy={sh[1]} r={24 + 6 * pulse} fill="none" stroke={BAD} strokeWidth="5" />
        <Arrow from={[sh[0] - 30, sh[1]]} to={[sh[0] - 130 - 10 * pulse, sh[1] + 10]} color={BAD} w={10} head={24} />
      </g>
      <T x={c[0] - 150} y={c[1] - r + 70} size={26} font={FONT_BODY} weight={800} color={BAD}>nach innen</T>
      <Pop t={t} a={S(L, "c1") + 0.3} x={c[0]} y={c[1] + r + 40} text="innere Schulter" fill={BAD} size={34} />
    </g>
  );
}

/* ---------- Ursachen ---------- */
const CAUSES = [
  { n: "1", head: "Balance & Tragkraft", sub: "fehlen noch", w: "fehlende" },
  { n: "2", head: "Zu viel innerer Zügel", sub: "Hals wird herumgezogen", w: "innerer" },
  { n: "3", head: "Zu wenig Führung", sub: "durch Sitz und Schenkel", w: "Führung" },
];
function Causes({ t, o }: { t: number; o: number }) {
  if (o <= 0.01) return null;
  return (
    <g opacity={o}>
      {CAUSES.map((c, i) => {
        const a = at("d1", c.w) - 0.1;
        const k = ease((t - a) / 0.35);
        if (k <= 0.01) return null;
        const y = 1110 + i * 150;
        return (
          <g key={c.n} opacity={k} transform={`translate(${(1 - k) * -60} 0)`}>
            <rect x={110} y={y} width={860} height={130} rx="36" fill={PAPER} stroke={OCHRE} strokeWidth="5" />
            <circle cx={180} cy={y + 65} r="38" fill={OCHRE} />
            <T x={180} y={y + 82} size={44} color={PAPER}>{c.n}</T>
            <T x={250} y={y + 60} size={38} font={FONT_BODY} weight={800} color={COL.forestDeep} anchor="start">{c.head}</T>
            <T x={250} y={y + 104} size={28} font={FONT_BODY} weight={700} color={COL.inkSoft} anchor="start">{c.sub}</T>
          </g>
        );
      })}
    </g>
  );
}

/* ---------- Lösung ---------- */
const AIDS = [
  { t: "Blickführung", w: "Blickführung" },
  { t: "ausbalancierter Sitz", w: "ausbalancierter" },
  { t: "innerer Schenkel", w: "Schenkel" },
  { t: "äußerer Zügel begrenzt", w: "äußerer" },
];

export function renderSchulter(t: number) {
  const bigO = win(t, 0, SPLIT_A, 0.4);
  const splitO = win(t, SPLIT_A - 0.3, SCHULTER_TOTAL + 1, 0.4);
  const hookEnd = E(L, "a2") + 0.2;
  const loupeO = win(t, S(L, "c1") - 0.1, at("d1", "fehlende") - 0.3);
  const causeO = win(t, at("d1", "fehlende") - 0.2, SPLIT_A);
  const shoulderGlow = win(t, S(L, "c1") - 0.1, E(L, "d1"));
  const aidO = win(t, S(L, "e0") - 0.1, S(L, "e2") - 0.2);
  const vetO = win(t, S(L, "e2") - 0.1, S(L, "f1") - 0.2);
  const endA = S(L, "f1") - 0.15;
  const endO = win(t, endA, SCHULTER_TOTAL + 1);
  const hideHead = Math.max(win(t, 0, hookEnd), endO);
  const th = thAt(t);
  const trailBig = badTrail(BIG, t);
  /* Vorher/Nachher: eigene Uhr, damit beide Pferde gleichmäßig laufen */
  const tb = t - SPLIT_A + 2.0;
  const thB = -0.6 - tb * (V / 9.3) * 0.9;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      {bigO > 0.01 && (
        <g opacity={bigO}>
          <Arena b={BIG}>
            {trailBig && <path d={trailBig} fill="none" stroke={BAD} strokeWidth="9" strokeLinecap="round" opacity=".9" />}
            <HorseOn b={BIG} th={th} r={rBad(t)} t={t} s={1.7} glow={shoulderGlow} />
          </Arena>
          <Pop t={t} a={at("a1", "Zirkel") - 0.1} x={zc(BIG)[0]} y={zc(BIG)[1] + 8} text="20-m-Zirkel" fill={GOOD} size={26} o={win(t, at("a1", "Zirkel") - 0.1, S(L, "b1"))} />
          <Pop t={t} a={S(L, "b1") - 0.05} x={760} y={1120} text="Kennst du das? 🤔" fill={BAD} size={44} o={win(t, S(L, "b1") - 0.05, S(L, "c1") - 0.1)} />
          <Pop t={t} a={at("a1", "kleiner") - 0.1} x={zc(BIG)[0] + 330} y={zc(BIG)[1] + 220} text="Linie wird kleiner" fill={OCHRE} color={COL.forestDeep} size={28} o={win(t, at("a1", "kleiner"), S(L, "b1") + 0.4)} />
          <Loupe t={t} o={loupeO} />
          <Causes t={t} o={causeO} />
        </g>
      )}

      {splitO > 0.01 && (
        <g opacity={splitO * (1 - endO * 0.92)}>
          <T x={140} y={TOPB.y - 24} size={34} font={FONT_BODY} weight={800} color={BAD} anchor="start">✗ vorher: fällt nach innen</T>
          <Arena b={TOPB}>
            {(() => {
              const q = 2.0 + (((tb - 2.0) % 9) + 9) % 9;
              const r = lerp(R0, RMIN, sm((q - 2.0) / 5.5));
              return (
                <>
                  <path d={badTrail(TOPB, Math.min(q, 9.5))} fill="none" stroke={BAD} strokeWidth="7" strokeLinecap="round" />
                  <HorseOn b={TOPB} th={thAt(q)} r={r} t={t} s={1.25} glow={1} />
                </>
              );
            })()}
          </Arena>
          <T x={140} y={BOTB.y - 24} size={34} font={FONT_BODY} weight={800} color={GOOD} anchor="start">✓ nachher: gleichmäßiger Zirkel</T>
          <Arena b={BOTB}>
            <circle cx={zc(BOTB)[0]} cy={zc(BOTB)[1]} r={R0 * BOTB.m} fill="none" stroke={GOOD} strokeWidth="9" />
            <HorseOn b={BOTB} th={thB} r={R0} t={t} s={1.25} />
          </Arena>
          {/* Lösung */}
          {aidO > 0.01 && (
            <g opacity={aidO}>
              <T x={540} y={1330} size={40} color={COL.forestDeep}>Was hilft:</T>
              {AIDS.map((a, i) => (
                <Pop key={a.t} t={t} a={at("e1", a.w) - 0.1} x={i % 2 ? 760 : 320} y={1420 + Math.floor(i / 2) * 90} text={a.t} fill={GOOD} size={30} />
              ))}
            </g>
          )}
          {vetO > 0.01 && (
            <g opacity={vetO}>
              <rect x={110} y={1300} width={860} height={230} rx="36" fill={PAPER} stroke={BAD} strokeWidth="5" />
              <T x={540} y={1380} size={44} color={BAD}>Bleibt es so?</T>
              <T x={540} y={1440} size={32} font={FONT_BODY} weight={700} color={COL.forestDeep}>Lass auch körperliche Ursachen</T>
              <T x={540} y={1488} size={32} font={FONT_BODY} weight={700} color={COL.forestDeep}>abklären (Tierarzt, Sattel …)</T>
            </g>
          )}
        </g>
      )}

      {endO > 0 && (
        <g opacity={endO}>
          <CommentCard t={t} a={endA + 0.1} lines={["Verstehst du die Hilfen,", "wird Reiten leichter."]} sub="Hofgeschichten Reitakademie · 19,90 €" y={230} />
          <Brand t={t} a={S(L, "f2") + 0.1} sub="Reitakademie · einmalig 19,90 € · kein Abo" y={1440} />
        </g>
      )}

      <Header t={t} label="Die Hofgeschichten · Reiten verstehen" hide={hideHead} />
      <HookText t={t} end={hookEnd} size={70} gap={88} y0={250} lines={[
        { text: "Dein Pferd macht den Zirkel", at: -0.9, size: 64 },
        { text: "IMMER KLEINER?", at: at("a1", "kleiner") - 0.3, hi: true, size: 88 },
        { text: "Dann schau dir das an 👀", at: S(L, "a2") - 0.1, italic: true, size: 58 },
      ]} />
      <Title t={t} a={S(L, "c1") - 0.1} b={E(L, "c1") + 0.2} top="Balance nach innen verloren" sub="das Pferd fällt auf die innere Schulter" color={BAD} y={300} />
      <Title t={t} a={S(L, "d1")} b={SPLIT_A - 0.2} top="Mögliche Gründe" sub="oft spielt mehreres zusammen" y={300} />
      <Title t={t} a={SPLIT_A + 0.1} b={E(L, "e2")} top="Vorher · Nachher" sub="nach innen fallen – oder gleichmäßig rund" y={300} />
      <Caption t={t} lines={L} skip={["a1", "a2", "b1", "f1", "f2"]} y={1610} />
    </svg>
  );
}

