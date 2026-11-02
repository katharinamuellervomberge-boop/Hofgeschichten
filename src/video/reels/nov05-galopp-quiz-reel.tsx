import { AnimHorse, GAIT_DEFS, legPhase, type LegId } from "@/components/illustrations/akademie/AnimHorse";
import { BODIES } from "@/components/illustrations/akademie/geometry";
import { Rider, Tack } from "@/components/illustrations/akademie/RiderScene";
import { getHorse } from "@/content/horses";
import { LOOKS, TopHorse } from "./top";
import { Brand, COL, Caption, CommentCard, E, FONT_BODY, Header, HookText, PAPER, Pop, S, T, Title, W, H, back, ease, mkLines, sm, win } from "./nov-kit";

/* November 05 (9:16, Quiz): „Erkennst du den richtigen Galopp?“
   Oben: Bahn von oben, linker Zirkel (gegen den Uhrzeigersinn). Unten: dasselbe Pferd seitlich (vorhandenes AnimHorse,
   „galopp-links“): rechtes Hinterbein → linkes Hinterbein + rechtes Vorderbein → linkes Vorderbein → Schwebephase.
   Zweimal gezeigt, Countdown + Denkpause (1,6 s im Schnitt eingefügt), Auflösung in Zeitlupe, linkes Vorderbein markiert. */

/** Zeiten aus der Aufnahme mit eingefügter Denkpause (1,6 s nach „eins“) */
const REC: Array<[string, string, number, number]> = [
  ["p1", "Schau dir dieses Pferd ganz genau an.", 0, 2.44],
  ["p2", "Es galoppiert auf einem Zirkel.", 2.88, 4.63],
  ["p3", "Aber ist es im richtigen Handgalopp unterwegs?", 5.01, 7.61],
  ["p4", "Achte besonders auf die Reihenfolge der Beine und darauf, welches Vorderbein weiter vorgreift.", 7.98, 13.99],
  ["p5", "Drei, zwei, eins …", 14.35, 16.48],
  ["p6a", "Die Auflösung:", 18.4, 19.25],
  ["p6b", "Das Pferd galoppiert im Linksgalopp auf dem linken Zirkel.", 19.57, 22.9],
  ["p7", "Das linke Vorderbein greift weiter vor.", 23.24, 25.42],
  ["p8a", "Hast du es sofort erkannt oder musstest du zweimal hinschauen?", 25.76, 28.88],
  ["p8b", "Schreib deine Antwort in die Kommentare!", 29.18, 31.01],
];
export const N05_LINES = mkLines(REC);
const L = N05_LINES;
export const N05_TOTAL = E(L, "p8b") + 2.4;

const LOOK = getHorse("tonga")!.look;
const G = GAIT_DEFS["galopp-links"];
const REVEAL = S(L, "p6a");
const SLOW = 0.28;
/** Bewegungszeit: normal, ab der Auflösung in Zeitlupe */
const animT = (t: number) => (t < REVEAL ? t : REVEAL + (t - REVEAL) * SLOW);

/* ---------- Bahn von oben (20 × 40 m), linker Zirkel an der A-Seite ---------- */
const M = 23;
const AX = 80;
const AY = 470;
const px = (m: number) => AX + m * M;
const py = (m: number) => AY + m * M;
const ZC: [number, number] = [px(10), py(10)];
const ZR = 9.3 * M;

function TopArena({ t, reveal }: { t: number; reveal: number }) {
  const ta = animT(t);
  const th = -ta * 0.75; // gegen den Uhrzeigersinn
  const pos: [number, number] = [ZC[0] + ZR * Math.cos(th), ZC[1] + ZR * Math.sin(th)];
  const ang = (th * 180) / Math.PI - 90;
  return (
    <g>
      <rect x={px(0)} y={py(0)} width={40 * M} height={20 * M} rx="6" fill="#E3D3B4" stroke={PAPER} strokeWidth="10" />
      {[["A", px(0) - 26, py(10) + 10], ["C", px(40) + 26, py(10) + 10], ["E", px(20), py(0) - 14], ["B", px(20), py(20) + 38]].map(([l, x, y]) => (
        <T key={l as string} x={x as number} y={y as number} size={30} font={FONT_BODY} weight={700} color={COL.brownDeep}>{l as string}</T>
      ))}
      <circle cx={ZC[0]} cy={ZC[1]} r={ZR} fill="none" stroke={COL.honey} strokeWidth="6" strokeDasharray="16 12" strokeDashoffset={ta * 60} />
      {/* Pfeile: gegen den Uhrzeigersinn */}
      {[0.6, 2.7, 4.8].map((a, i) => {
        const x = ZC[0] + ZR * Math.cos(-a);
        const y = ZC[1] + ZR * Math.sin(-a);
        const d = (-a * 180) / Math.PI - 90;
        return <path key={i} transform={`translate(${x} ${y}) rotate(${d})`} d="M-12 -12 L6 0 L-12 12" fill="none" stroke={COL.honey} strokeWidth="6" strokeLinecap="round" />;
      })}
      <TopHorse at={pos} ang={ang} look={LOOKS.tonga} step={ta * 1.2} s={1.55} bend={-8} />
      {reveal > 0.01 && (
        <g opacity={reveal}>
          <rect x={px(22)} y={py(6)} width={17 * M} height={8 * M} rx="20" fill={COL.forest} />
          <T x={px(30.5)} y={py(9.6)} size={34} font={FONT_BODY} weight={700} color={PAPER}>linke Hand</T>
          <T x={px(30.5)} y={py(12.4)} size={28} font={FONT_BODY} weight={700} color={COL.honey}>gegen den Uhrzeiger</T>
        </g>
      )}
    </g>
  );
}

/* ---------- Seitenansicht ---------- */
const SK = 2.15;
const SX = 160;
const SGROUND = 1470;
const BEATS: Array<{ legs: LegId[]; label: string; from: number; to: number }> = [
  { legs: ["HR"], label: "1  rechtes Hinterbein", from: 0, to: 0.2 },
  { legs: ["HL", "VR"], label: "2  linkes Hinterbein + rechtes Vorderbein", from: 0.2, to: 0.4 },
  { legs: ["VL"], label: "3  linkes Vorderbein", from: 0.4, to: G.offset.VL + G.duty },
  { legs: [], label: "4  Schwebephase", from: G.offset.VL + G.duty, to: 1 },
];

function SideGallop({ t, reveal }: { t: number; reveal: number }) {
  const ta = animT(t);
  const p = (ta / G.cycle) % 1;
  const beat = BEATS.findIndex((b) => p >= b.from && p < b.to);
  const highlight: Partial<Record<LegId, string>> = {};
  if (reveal > 0.3) {
    for (const l of BEATS[Math.max(0, beat)].legs) highlight[l] = l === "VL" ? COL.rust : COL.honey;
  }
  const off = (ta * 260) % 211;
  const vlP = legPhase("galopp-links", "VL", ta);
  return (
    <g>
      <rect x={0} y={SGROUND - 40} width={W} height={130} fill="#E3D3B4" />
      <g fill="#D3BF9C">
        {Array.from({ length: 12 }, (_, i) => <ellipse key={i} cx={((i * 211 - off) % (W + 211)) - 60} cy={SGROUND + 10 + ((i * 37) % 60)} rx={i % 3 ? 14 : 22} ry="5" />)}
      </g>
      <svg x={SX} y={SGROUND - 290 * SK} width={320 * SK} height={292 * SK} viewBox="70 20 320 292" overflow="visible">
        <AnimHorse look={LOOK} gait="galopp-links" time={ta} highlight={highlight}>
          <Tack hand={BODIES.sitz.hand} longRein={false} stirrupsDown={false} />
          <Rider b={BODIES.sitz} pose="sitz" />
        </AnimHorse>
      </svg>
      {reveal > 0.01 && (
        <g opacity={reveal}>
          <rect x={60} y={1520} width={960} height={74} rx="37" fill={beat === 2 ? COL.rust : beat === 3 ? COL.sage : COL.forest} />
          <T x={540} y={1569} size={beat === 1 ? 30 : 34} font={FONT_BODY} weight={700} color={beat === 3 ? COL.forestDeep : PAPER}>{BEATS[Math.max(0, beat)].label}</T>
          {vlP.stance && <Pop t={t} a={S(L, "p7")} x={860} y={980} text="links greift weiter vor" fill={COL.rust} size={30} />}
        </g>
      )}
    </g>
  );
}

export function renderN05(t: number) {
  const reveal = sm((t - REVEAL - 0.2) / 0.5);
  const hookO = win(t, 0, E(L, "p1") + 0.3);
  const endA = S(L, "p8a") - 0.2;
  const endO = win(t, endA, N05_TOTAL + 1);
  const hideHead = Math.max(hookO, endO);
  const cd = [0, 1, 2].map((i) => S(L, "p5") + i * 0.7);
  const thinkO = win(t, S(L, "p5"), REVEAL - 0.1, 0.2);
  const replay = win(t, S(L, "p4"), E(L, "p4"));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      <g opacity={1 - sm((t - endA) / 0.4) * 0.85}>
        <TopArena t={t} reveal={reveal} />
        <SideGallop t={t} reveal={reveal} />
      </g>
      {replay > 0.01 && (
        <g opacity={replay}>
          <Pop t={t} a={S(L, "p4") + 0.2} x={860} y={1000} text="↺ nochmal" fill={COL.forestDeep} size={30} />
        </g>
      )}
      {/* Countdown + Denkpause */}
      {thinkO > 0.01 && (
        <g opacity={thinkO}>
          <rect width={W} height={H} fill={COL.bg} opacity=".55" />
          {cd.map((a, i) => {
            const k = back((t - a) / 0.35);
            const o = win(t, a, i < 2 ? cd[i + 1] - 0.05 : REVEAL - 0.1, 0.15);
            if (k <= 0.01 || o <= 0) return null;
            return (
              <g key={i} opacity={o} transform={`translate(540 960) scale(${Math.max(0.01, k)})`}>
                <circle r="190" fill={COL.rust} />
                <T x={0} y={80} size={240} color={PAPER}>{String(3 - i)}</T>
              </g>
            );
          })}
          <g opacity={ease((t - cd[2] - 0.6) / 0.3)}>
            <T x={540} y={1260} size={56} color={COL.forestDeep}>Links- oder Rechtsgalopp?</T>
          </g>
        </g>
      )}
      {endO > 0 && (
        <g opacity={endO}>
          {(() => {
            const k = back((t - endA) / 0.5);
            return (
              <g opacity={Math.min(1, k)} transform={`translate(540 330) scale(${Math.max(0.01, k)}) translate(-540 -330)`}>
                <rect x={150} y={230} width={780} height={170} rx="44" fill={COL.rust} />
                <T x={540} y={342} size={68} color={PAPER}>RICHTIG ERKANNT?</T>
              </g>
            );
          })()}
          <CommentCard t={t} a={S(L, "p8a") + 0.3} lines={["Sofort erkannt oder", "zweimal hingeschaut?"]} sub="Schreib deine Antwort in die Kommentare 👇" y={480} />
          <Brand t={t} a={S(L, "p8b") + 0.2} sub="Reiten lernen · Galopp · Link in der Bio" y={1590} />
        </g>
      )}

      <Header t={t} label="Die Hofgeschichten · Galopp-Quiz" hide={hideHead} />
      <HookText t={t} end={E(L, "p1") + 0.3} size={72} gap={88} y0={200} lines={[
        { text: "Du reitest schon länger?", at: -0.9 },
        { text: "Dann erkennst du diesen", at: 0.6 },
        { text: "Galopp bestimmt sofort!", at: 1.3, hi: true },
      ]} />
      <Title t={t} a={S(L, "p2") - 0.1} b={E(L, "p3")} top="Richtiger Handgalopp?" sub="Pferd auf dem Zirkel – schau genau hin" y={250} />
      <Title t={t} a={S(L, "p4")} b={E(L, "p4")} top="Achte auf die Beine" sub="Reihenfolge · welches Vorderbein greift weiter vor?" color={COL.forest} y={250} />
      <Title t={t} a={REVEAL} b={E(L, "p7")} top="Linksgalopp ✓" sub="auf der linken Hand · linkes Vorderbein greift vor" color={COL.forest} y={250} />
      <Caption t={t} lines={L} skip={["p5", "p6a", "p6b", "p7", "p8a", "p8b"]} y={1620} />
    </svg>
  );
}
