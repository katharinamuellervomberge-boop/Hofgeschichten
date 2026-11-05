import { GAIT_DEFS, legPhase, type LegId } from "@/components/illustrations/akademie/AnimHorse";
import { getHorse } from "@/content/horses";
import { Brand, COL, Caption, CommentCard, E, FONT_BODY, Header, HookText, IconBadge, NodHorse, PAPER, Pop, S, T, Title, W, H, ease, lerp, mkLines, sm, win, wordAt, type Place } from "./nov-kit";
import { Arena, groundSpeed } from "./rs-kit";

/* Reiten verstehen (9:16): „Wie erkennst du einen guten Schritt?“ (comp `schritt`)
   Tivoli seitlich im Schritt (AnimHorse-Fußfolge HL → VL → HR → VR, Viertakt, immer 2–3 Hufe am Boden, Hals nickt mit).
   Fußfolge in Zeitlupe genau auf die gesprochenen Wörter gelegt. Raumgriff/Übertritt als schematische Hufspur von oben
   (das Seiten-Pferd hat Cartoon-Proportionen, ein echter Übertritt wäre dort unrealistisch). Vergleich: eilig + verkürzt ✗
   vs. gleichmäßig + raumgreifend ✓. Takt · Losgelassenheit · natürliche Bewegung, CTA 19,90 €. */

const REC: Array<[string, string, number, number]> = [
  ["a1", "Dein Pferd geht Schritt.", 0, 1.53],
  ["a2", "Aber ist es auch ein guter Schritt?", 1.91, 3.85],
  ["b1", "Ein guter Schritt hat vier klare Takte", 4.24, 6.62],
  ["b2", "– ganz ohne Schwebephase.", 6.91, 8.35],
  ["c1", "Hinten links, vorne links,", 8.8, 10.82],
  ["c2", "hinten rechts, vorne rechts.", 11.13, 13.13],
  ["d1", "Achte auf den Raumgriff:", 13.5, 14.81],
  ["d2", "Der Hinterhuf fußt in oder über die Spur des Vorderhufs.", 15.13, 18.6],
  ["d3", "Wie weit, ist bei jedem Pferd etwas anders.", 18.97, 21.49],
  ["e1", "Und: Schneller ist nicht automatisch besser.", 21.8, 24.57],
  ["f1", "Achte auf Takt, Losgelassenheit und natürliche Bewegung.", 24.93, 28.51],
  ["g1", "Du willst Pferdebewegungen wirklich verstehen?", 28.88, 31.13],
  ["g2", "Hofgeschichten Reitakademie – einmalig 19,90 €.", 31.48, 35.4],
];
export const SCHRITT_LINES = mkLines(REC);
const L = SCHRITT_LINES;
export const SCHRITT_TOTAL = E(L, "g2") + 2.6;
const at = (id: string, w: string) => wordAt(L, id, w);

const LOOK = getHorse("tivoli")!.look;
const G = GAIT_DEFS.schritt;
const CYC = G.cycle;
const ORDER: LegId[] = ["HL", "VL", "HR", "VR"];
const LEG_TXT: Record<LegId, string> = { HL: "hinten links", VL: "vorne links", HR: "hinten rechts", VR: "vorne rechts" };
const BEAT_COL = [COL.honey, COL.rust, COL.forest, "#5E7360"];

/* Bewegungszeit: normal, bei der Fußfolge so verlangsamt, dass jedes Auffußen auf dem gesprochenen Wort liegt */
const WORDS = [at("c1", "Hinten"), at("c1", "vorne"), at("c2", "hinten"), at("c2", "vorne")];
const N = 5;
const PHI = N * CYC - WORDS[0] + 0.3;
const KEYS: Array<[number, number]> = [
  [WORDS[0] - 0.6, WORDS[0] - 0.6 + PHI],
  ...WORDS.map((w, i) => [w, N * CYC + (i * CYC) / 4] as [number, number]),
  [WORDS[3] + 0.6, N * CYC + 0.75 * CYC + 0.3],
];
function horseT(t: number) {
  if (t <= KEYS[0][0]) return t + PHI;
  const last = KEYS[KEYS.length - 1];
  if (t >= last[0]) return last[1] + (t - last[0]);
  for (let i = 0; i < KEYS.length - 1; i++) {
    const [t0, a0] = KEYS[i];
    const [t1, a1] = KEYS[i + 1];
    if (t <= t1) return a0 + ((a1 - a0) * (t - t0)) / (t1 - t0);
  }
  return t + PHI;
}
/** natürliches Nicken: zweimal pro Schritt-Zyklus */
const nodAt = (ta: number, amp = 3) => 6 + amp * Math.sin(4 * Math.PI * (ta / CYC) + 0.6);
/** letztes aufgefußtes Bein (Index in ORDER) */
function lastBeat(ta: number) {
  const p = ((ta / CYC) % 1 + 1) % 1;
  return Math.min(3, Math.floor(p * 4 + 1e-6));
}

const K = 2.6;
const GROUND = 1390;
const PL: Place = { x: 540 - 160 * K, y: GROUND - 285 * K, k: K };

/* ---------- Hufspur von oben (schematisch) ---------- */
function Hoof({ x, y, fill, stroke, dash, o = 1 }: { x: number; y: number; fill: string; stroke: string; dash?: boolean; o?: number }) {
  return (
    <g opacity={o} transform={`translate(${x} ${y})`}>
      <path d="M-30 -24 C-34 6 -22 28 0 28 C22 28 34 6 30 -24 C18 -14 8 -10 0 -10 C-8 -10 -18 -14 -30 -24 Z" transform="rotate(90)" fill={fill} stroke={stroke} strokeWidth="5" strokeDasharray={dash ? "8 7" : undefined} />
    </g>
  );
}
function TrackBox({ t, o }: { t: number; o: number }) {
  if (o <= 0.01) return null;
  const front = 600;
  const y = 1500;
  const a = at("d2", "Hinterhuf");
  const land = at("d2", "fußt") + 0.2;
  const u = sm((t - a) / (land - a));
  /* Übertritt: zuerst „in die Spur“, bei d3 pendelt er zwischen knapp davor und deutlich darüber */
  const varO = win(t, S(L, "d3") - 0.1, E(L, "d3") + 0.2);
  const over = 14 + varO * 34 * Math.sin((t - S(L, "d3")) * 2.6);
  const hx = lerp(330, front + over, u);
  const hy = y - 60 * Math.sin(Math.PI * Math.min(1, u)) * (u < 1 ? 1 : 0);
  return (
    <g opacity={o}>
      <rect x={110} y={1405} width={860} height={185} rx="30" fill={PAPER} stroke={COL.sand} strokeWidth="4" />
      <T x={150} y={1450} size={26} font={FONT_BODY} weight={700} color={COL.inkSoft} anchor="start">Hufspur von oben →</T>
      <Hoof x={front} y={y} fill="none" stroke={COL.rust} dash />
      <T x={front} y={1450} size={24} font={FONT_BODY} weight={700} color={COL.rust}>Spur Vorderhuf</T>
      <Hoof x={hx} y={hy} fill={COL.forest} stroke={COL.forestDeep} o={ease((t - a + 0.2) / 0.3)} />
      {u >= 1 && (
        <g opacity={ease((t - land) / 0.3)}>
          <T x={860} y={1515} size={30} font={FONT_BODY} weight={800} color={COL.forest}>{varO > 0.3 ? "individuell" : over > 4 ? "Übertritt ✓" : "in der Spur"}</T>
          <path d={`M${front} 1556 H${front + over}`} stroke={COL.forest} strokeWidth="5" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
}

/* ---------- Vergleich ---------- */
function Panel({ t, x, good }: { t: number; x: number; good: boolean }) {
  const k = 1.5;
  const gy = 1250;
  const pl: Place = { x: x + 270 - 160 * k, y: gy - 285 * k, k };
  const tk = good ? 1 : 1.5;
  const sk = good ? 1 : 0.7;
  const tt = t * tk;
  const col = good ? COL.forest : COL.rust;
  const id = good ? "sp-r" : "sp-l";
  return (
    <g>
      <defs>
        <clipPath id={`${id}-c`}><rect x={x + 10} y={620} width={520} height={820} rx="36" /></clipPath>
      </defs>
      <g clipPath={`url(#${id}-c)`}>
        <g transform={`translate(${x - 270} 0)`}>
          <Arena t={tt} speed={groundSpeed("schritt", k, sk)} y={gy} top={620} />
        </g>
        <NodHorse t={tt} pl={pl} look={LOOK} gait="schritt" id={id} nod={good ? nodAt(tt) : 4 + 0.6 * Math.sin(tt * 9)} strideK={sk} slices={12} />
      </g>
      <rect x={x + 10} y={620} width={520} height={820} rx="36" fill="none" stroke={col} strokeWidth="6" />
      <g transform={`translate(${x + 270} 690)`}>
        <circle r="40" fill={col} />
        <T x={0} y={18} size={50} font={FONT_BODY} weight={700} color={PAPER}>{good ? "✓" : "✗"}</T>
      </g>
      <T x={x + 270} y={1330} size={34} font={FONT_BODY} weight={700} color={col}>{good ? "gleichmäßig" : "eilig"}</T>
      <T x={x + 270} y={1385} size={30} font={FONT_BODY} weight={700} color={COL.inkSoft}>{good ? "raumgreifend" : "verkürzt"}</T>
    </g>
  );
}

const I_TAKT = (
  <g fill={PAPER} stroke={PAPER} strokeWidth="7" strokeLinecap="round">
    <circle cx="-20" cy="24" r="12" />
    <circle cx="22" cy="14" r="12" />
    <path d="M-8 24 V-30 L34 -40 V14" fill="none" />
  </g>
);
const I_LOS = (
  <g fill="none" stroke={PAPER} strokeWidth="7" strokeLinecap="round">
    <path d="M-44 -18 q11 -16 22 0 t22 0 t22 0 t22 0" />
    <path d="M-44 6 q11 -16 22 0 t22 0 t22 0 t22 0" opacity=".8" />
    <path d="M-44 30 q11 -16 22 0 t22 0 t22 0 t22 0" opacity=".6" />
  </g>
);
const I_NAT = (
  <g fill="none" stroke={PAPER} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M-40 30 C-30 -10 -6 -30 26 -30" />
    <path d="M14 -42 L28 -30 L14 -18" />
    <path d="M-40 30 C-20 20 0 22 20 30" opacity=".7" />
  </g>
);

export function renderSchritt(t: number) {
  const ta = horseT(t);
  const splitA = S(L, "e1") - 0.2;
  const splitB = E(L, "e1") + 0.25;
  const mainO = 1 - sm((t - splitA) / 0.4) + sm((t - splitB) / 0.4);
  const splitO = win(t, splitA, splitB, 0.4);

  /* Takte zählen (b) und Fußfolge (c) */
  const beatO = win(t, S(L, "b1"), E(L, "c2") + 0.4);
  const beat = lastBeat(ta);
  const seqO = win(t, WORDS[0] - 0.3, E(L, "c2") + 0.4);
  const hl: Partial<Record<LegId, string>> = {};
  if (beatO > 0.3) {
    const l = ORDER[beat];
    if (legPhase("schritt", l, ta).stance) hl[l] = BEAT_COL[beat];
  }
  const dO = win(t, S(L, "d1"), E(L, "d3"));
  if (dO > 0.3) {
    hl.VL = COL.rust;
    hl.HL = COL.forest;
  }
  const fO = win(t, S(L, "f1"), E(L, "f1") + 0.3);
  const nodBig = fO * ease((t - at("f1", "natürliche") + 0.1) / 0.4);

  const endA = S(L, "g1") - 0.15;
  const endO = win(t, endA, SCHRITT_TOTAL + 1);
  const hookEnd = E(L, "a2") + 0.2;
  const hideHead = Math.max(win(t, 0, hookEnd), splitO, endO);
  const onGround = (["VL", "VR", "HL", "HR"] as LegId[]).filter((l) => legPhase("schritt", l, ta).stance).length;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      {mainO > 0.01 && (
        <g opacity={Math.min(1, mainO)}>
          <Arena t={ta} speed={groundSpeed("schritt", K)} y={GROUND} />
          <NodHorse t={ta} pl={PL} look={LOOK} gait="schritt" id="sch" nod={nodAt(ta, 3 + 1.5 * nodBig)} slices={18} highlight={hl} />

          {/* 4 Takte */}
          {beatO > 0.01 && (
            <g opacity={beatO}>
              {ORDER.map((l, i) => {
                const on = i === beat;
                const x = 540 + (i - 1.5) * 230;
                const k = seqO > 0.3 ? ease((t - WORDS[i] + 0.15) / 0.3) : 1;
                if (k <= 0.01) return null;
                return (
                  <g key={l} opacity={k} transform={`translate(${x} 1490) scale(${on ? 1.08 : 0.92})`}>
                    <rect x={-105} y={-46} width={210} height={92} rx="46" fill={on ? BEAT_COL[i] : PAPER} stroke={BEAT_COL[i]} strokeWidth="5" />
                    <T x={0} y={seqO > 0.3 ? -4 : 14} size={seqO > 0.3 ? 30 : 42} font={FONT_BODY} weight={800} color={on ? PAPER : BEAT_COL[i]}>{String(i + 1)}</T>
                    {seqO > 0.3 && <T x={0} y={30} size={24} font={FONT_BODY} weight={700} color={on ? PAPER : COL.inkSoft}>{LEG_TXT[l]}</T>}
                  </g>
                );
              })}
            </g>
          )}
          <Pop t={t} a={S(L, "b2") - 0.05} x={540} y={560} text={`keine Schwebephase · ${onGround} Hufe am Boden`} fill={COL.forestDeep} size={32} o={win(t, S(L, "b2"), E(L, "b2") + 0.3)} />
          <TrackBox t={t} o={dO} />

          {/* Takt · Losgelassenheit · natürliche Bewegung */}
          {fO > 0.01 && (
            <g opacity={fO}>
              <IconBadge t={t} a={at("f1", "Takt") - 0.05} x={220} y={520} icon={I_TAKT} label="Takt" r={62} />
              <IconBadge t={t} a={at("f1", "Losgelassenheit") - 0.05} x={540} y={520} icon={I_LOS} label="Losgelassenheit" r={62} />
              <IconBadge t={t} a={at("f1", "natürliche") - 0.05} x={860} y={520} icon={I_NAT} label="natürlich" r={62} />
              <Pop t={t} a={at("f1", "natürliche") + 0.2} x={830} y={1490} text="Hals nickt locker mit" fill={COL.forest} size={32} />
            </g>
          )}
        </g>
      )}

      {splitO > 0.01 && (
        <g opacity={splitO}>
          <rect width={W} height={H} fill={COL.bg} />
          <Panel t={t} x={0} good={false} />
          <Panel t={t} x={540} good />
          <g opacity={ease((t - S(L, "e1") + 0.1) / 0.4)}>
            <T x={540} y={300} size={62} color={COL.rust}>Schneller ist nicht</T>
            <T x={540} y={375} size={62} color={COL.rust}>automatisch besser.</T>
          </g>
        </g>
      )}

      {endO > 0 && (
        <g opacity={endO}>
          <CommentCard t={t} a={endA + 0.1} lines={["Pferdebewegungen", "wirklich verstehen?"]} sub="Hofgeschichten Reitakademie · einmalig 19,90 €" y={230} />
          <Brand t={t} a={S(L, "g2") + 0.1} sub="Reitakademie · einmalig 19,90 € · kein Abo" y={1440} />
        </g>
      )}

      <Header t={t} label="Die Hofgeschichten · Reiten verstehen" hide={hideHead} />
      <HookText t={t} end={hookEnd} size={74} gap={92} y0={260} lines={[
        { text: "Dein Pferd geht Schritt.", at: -0.9 },
        { text: "Aber ist es auch ein", at: S(L, "a2") - 0.1 },
        { text: "GUTER Schritt?", at: at("a2", "guter") - 0.2, hi: true, size: 90 },
      ]} />
      <Title t={t} a={S(L, "b1")} b={E(L, "b2")} top="4 klare Takte" sub="ein guter Schritt ist ein Viertakt" y={290} />
      <Title t={t} a={S(L, "c1") - 0.1} b={E(L, "c2")} top="Die Fußfolge" sub="ganz genau hinschauen – in Zeitlupe" color={COL.forest} y={290} />
      <Title t={t} a={S(L, "d1")} b={E(L, "d3")} top="Raumgriff & Übertritt" sub="Hinterhuf fußt in oder über die Vorderhufspur" color={COL.forest} y={290} />
      <Title t={t} a={S(L, "f1")} b={E(L, "f1")} top="Darauf achtest du:" y={290} />
      <Caption t={t} lines={L} skip={["a1", "a2", "e1", "g1", "g2"]} y={1610} />
    </svg>
  );
}

