import { GAIT_DEFS, legPhase } from "@/components/illustrations/akademie/AnimHorse";
import { Rider, Tack } from "@/components/illustrations/akademie/RiderScene";
import { getHorse } from "@/content/horses";
import { riderBody, riseAmount } from "../leichttraben";
import { Arrow, ArenaHorse, COL, Caption, Chip, E, FONT_BODY, Header, Merk, PAPER, S, SkyDefs, T, W, H, back, clamp01, ease, sm, win, type VLine } from "./rkit";

/* Reel 19 (9:16): „Falscher Fuß! – Was heißt das beim Leichttraben?“
   Seitenansicht, linke Hand (innen = links = HL/VL sichtbar vorn). Was: Beinpaare, einsitzen wenn inneres Hinterbein fußt.
   Warum: inneres Hinterbein trägt in der Kurve, Gewicht + Schenkel helfen genau dann. Falscher Fuß: Gleichgewicht, schief.
   Bleibt in der Akademie: wie man ohne Hinschauen merkt, ob man richtig ist, und wie man den Fuß wechselt. */

/** Zeiten aus der Aufnahme (Jessica v4, 31.10.), Stimme beginnt bei 0,4 s im Reel */
const VO = 0.4;
const REC: Array<[string, string, number, number]> = [
  ["hook", "„Falscher Fuß!“ – Was heißt das eigentlich beim Leichttraben?", 0, 3.84],
  ["was", "Im Trab bewegen sich immer zwei Beine zusammen. Bei einem Paar sitzt du ein – beim anderen stehst du auf.", 4.27, 10.49],
  ["richtig", "Richtig ist: Du sitzt ein, wenn das innere Hinterbein auf dem Boden ist.", 10.9, 15.24],
  ["warum", "Warum? In der Kurve trägt das innere Hinterbein am meisten. Genau dann hilft ihm dein Gewicht – und dein Bein kann treiben.", 15.63, 23.09],
  ["falsch", "Auf dem falschen Fuß sitzt du aufs äußere Hinterbein. Dein Pferd verliert leichter das Gleichgewicht – und wird auf Dauer schief.", 23.48, 30.53],
  ["wechsel", "Deshalb wechselst du bei jedem Handwechsel den Fuß.", 30.85, 33.61],
  ["merke", "Merke: Innen hinten am Boden – du sitzt.", 34.01, 37.12],
  ["q", "Und wie du ohne Hinschauen merkst, ob du richtig bist?", 37.52, 40.05],
  ["tease", "Das lernt dein Kind in der Reitakademie.", 40.37, 42.68],
];
export const FUSS_LINES: VLine[] = REC.map(([id, text, a, b]) => ({ id, text, start: a + VO, dur: b - a }));
const L = FUSS_LINES;
export const FUSS_TOTAL = E(L, "tease") + 2.6;

const CYC = GAIT_DEFS.trab.cycle;
const IN = COL.honey; // inneres Hinterbein
const OUT = COL.rust; // äußeres Hinterbein (falsch)

/** 0 = richtiger Fuß, 1 = falscher Fuß (Rhythmus um einen Takt verschoben) */
function wrongness(t: number) {
  return sm((t - S(L, "falsch") - 0.2) / 0.8) * (1 - sm((t - S(L, "wechsel") - 0.6) / 0.8));
}
const riseAt = (t: number) => riseAmount(t + (CYC / 2) * wrongness(t));

function landed(leg: "HL" | "HR", t: number) {
  return legPhase("trab", leg, t).stance ? 1 : 0;
}

/** Wade leuchtet beim Einsitzen (Treiben) */
function Calf({ b, d }: { b: ReturnType<typeof riderBody>; d: number }) {
  if (d <= 0.01) return null;
  return (
    <g opacity={d}>
      <path d={`M${b.knee[0]},${b.knee[1] + 4} L${b.ankle[0] + 1},${b.ankle[1] - 4}`} stroke={COL.honey} strokeWidth="17" strokeLinecap="round" opacity=".55" />
    </g>
  );
}

function Title({ t, id, top, sub, color = COL.forestDeep, subAt }: { t: number; id: string; top: string; sub?: string; color?: string; subAt?: number }) {
  const o = win(t, S(L, id), E(L, id));
  if (o <= 0) return null;
  const k1 = ease((t - S(L, id)) / 0.4);
  const k2 = ease((t - (subAt ?? S(L, id) + 0.25)) / 0.4);
  return (
    <g opacity={o}>
      <g opacity={k1} transform={`translate(0 ${(1 - k1) * 30})`}>
        <T x={540} y={290} size={Math.min(88, 900 / (top.length * 0.53))} color={color}>{top}</T>
      </g>
      {sub && (
        <g opacity={k2} transform={`translate(0 ${(1 - k2) * 30})`}>
          <T x={540} y={366} size={40} font={FONT_BODY} weight={700} color={COL.inkSoft}>{sub}</T>
        </g>
      )}
    </g>
  );
}

/** SITZ · AUF im Takt */
function Beat({ t, u, o, y = 500, sitCol = COL.honey }: { t: number; u: number; o: number; y?: number; sitCol?: string }) {
  if (o <= 0) return null;
  const sit = clamp01((0.45 - u) * 4);
  const up = clamp01((u - 0.55) * 4);
  const word = (x: number, txt: string, k: number, col: string) => (
    <g transform={`translate(${x} ${y}) scale(${0.82 + 0.22 * k})`} opacity={0.28 + 0.72 * k}>
      <T x={0} y={0} size={120} color={col}>{txt}</T>
    </g>
  );
  return (
    <g opacity={o}>
      {word(300, "SITZ", sit, sitCol)}
      <T x={540} y={y - 20} size={90} color={COL.sand}>·</T>
      {word(780, "AUF", up, COL.forest)}
      {t < 0 && null}
    </g>
  );
}

/** Kleine Bahn-Skizze von oben für den Handwechsel */
function Bahn({ t, k }: { t: number; k: number }) {
  if (k <= 0) return null;
  const u = clamp01((t - S(L, "wechsel") - 0.2) / 2.4);
  const p = (x: number): [number, number] => {
    // Diagonale durch die ganze Bahn (H → F)
    return [350 + 380 * x, 400 + 150 * Math.sin(Math.PI * 0) + 0 * x];
  };
  const dot = p(u);
  return (
    <g opacity={k} transform={`translate(0 ${(1 - ease(k)) * 30})`}>
      <rect x={330} y={410} width={420} height={150} rx="14" fill="#E3D3B4" stroke={COL.brown} strokeWidth="8" />
      <path d="M360 430 L720 540" stroke={COL.honey} strokeWidth="6" strokeDasharray="14 10" />
      <circle cx={360 + 360 * u} cy={430 + 110 * u} r="16" fill={COL.forest} />
      {u > 0.45 && <g opacity={clamp01((u - 0.45) * 5)}><Chip x={540} y={630} text="Handwechsel = Fuß wechseln" fill={COL.forest} size={32} /></g>}
      {dot[0] < 0 && null}
    </g>
  );
}

function Badge({ t, wrong }: { t: number; wrong: number }) {
  const o = Math.max(win(t, S(L, "richtig") + 0.6, E(L, "richtig")), win(t, S(L, "falsch") + 0.8, E(L, "falsch")));
  if (o <= 0) return null;
  const bad = wrong > 0.5;
  const k = back((t - (bad ? S(L, "falsch") + 0.8 : S(L, "richtig") + 0.6)) / 0.45);
  return (
    <g opacity={o} transform={`translate(540 470) scale(${Math.max(0.01, k)})`}>
      <rect x={-250} y={-48} width={500} height={96} rx="48" fill={bad ? OUT : COL.forest} />
      <T x={0} y={16} size={44} font={FONT_BODY} weight={700} color={PAPER}>{bad ? "✗ falscher Fuß" : "✓ richtiger Fuß"}</T>
    </g>
  );
}

function Tease({ t }: { t: number }) {
  const a = S(L, "tease") - 0.1;
  const k = ease((t - a) / 0.45);
  if (k <= 0) return null;
  const pulse = 1 + 0.02 * Math.sin(Math.max(0, t - a - 2) * 5);
  return (
    <g opacity={k} transform={`translate(540 ${1540 + (1 - k) * 40}) scale(${pulse}) translate(-540 -1540)`}>
      <rect x={90} y={1420} width={900} height={250} rx="36" fill={COL.honey} />
      <T x={540} y={1497} size={50} color={COL.forestDeep}>Das lernt dein Kind</T>
      <T x={540} y={1557} size={40} font={FONT_BODY} weight={700} color={COL.forestDeep}>in der Reitakademie</T>
      <T x={540} y={1625} size={32} font={FONT_BODY} weight={700} color={COL.brownDeep}>Modul Reiten lernen · Link in der Bio</T>
    </g>
  );
}

export function renderFuss(t: number) {
  const look = getHorse("tonga")!.look;
  const wrong = wrongness(t);
  const u = riseAt(t);
  const b = riderBody(u);
  const sit = clamp01((0.45 - u) * 4);
  const pairsO = win(t, S(L, "was") + 0.4, E(L, "was"));
  const inO = Math.max(win(t, S(L, "richtig") + 0.3, E(L, "warum")), win(t, S(L, "merke"), S(L, "q")));
  const outO = win(t, S(L, "falsch") + 0.4, E(L, "falsch"));
  const pA = landed("HL", t);
  const highlight = pairsO > 0.3
    ? { HL: pA ? COL.pairA : COL.sand, VR: pA ? COL.pairA : COL.sand, HR: pA ? COL.sand : COL.pairB, VL: pA ? COL.sand : COL.pairB }
    : outO > 0.3 ? { HR: OUT } : inO > 0.3 ? { HL: IN } : {};
  const calf = win(t, S(L, "warum") + 5.9, E(L, "warum")) * sit;
  const weight = win(t, S(L, "warum") + 4.0, E(L, "warum"));
  const bahn = win(t, S(L, "wechsel"), E(L, "wechsel") + 0.2);
  const merkAt = S(L, "merke") - 0.2;
  const merkO = 1 - sm((t - S(L, "q") + 0.2) / 0.3);
  const qO = win(t, S(L, "q"), FUSS_TOTAL + 1);
  const hookO = win(t, 0, E(L, "hook"));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <SkyDefs />
      <rect width={W} height={H} fill={COL.bg} />
      <g>
        <ArenaHorse t={t} gait="trab" look={look} highlight={highlight}>
          <Tack hand={b.hand} longRein={false} stirrupsDown={false} />
          <Rider b={b} pose={u > 0.5 ? "leicht" : "sitz"} />
          <Calf b={b} d={calf} />
          {weight > 0 && (
            <g opacity={weight * (0.35 + 0.65 * sit)}>
              <Arrow from={[b.hip[0] - 4, b.hip[1] + 14]} to={[150, 230]} color={COL.honey} w={3.4} head={8} />
            </g>
          )}
        </ArenaHorse>
      </g>
      {/* Beschriftungen an den Hinterbeinen */}
      {inO > 0 && (
        <g opacity={inO * (1 - outO)}>
          <path d="M330 1140 L 300 1250" stroke={IN} strokeWidth="5" strokeLinecap="round" />
          <Chip x={330} y={1110} text="inneres Hinterbein" fill={COL.forestDeep} size={30} />
        </g>
      )}
      {win(t, S(L, "warum") + 0.8, E(L, "warum")) > 0 && (
        <g opacity={win(t, S(L, "warum") + 0.8, E(L, "warum"))}>
          <Chip x={330} y={1000} text="trägt in der Kurve am meisten" fill={IN} color={COL.forestDeep} size={28} />
        </g>
      )}
      {outO > 0 && (
        <g opacity={outO}>
          <path d="M370 1140 L 345 1250" stroke={OUT} strokeWidth="5" strokeLinecap="round" />
          <Chip x={360} y={1110} text="äußeres Hinterbein" fill={OUT} size={30} />
          <g opacity={ease((t - S(L, "falsch") - 5.0) / 0.4)}>
            <Chip x={800} y={1080} text="Gleichgewicht wackelt" fill={COL.forestDeep} size={30} />
          </g>
          <g opacity={ease((t - S(L, "falsch") - 6.3) / 0.4)}>
            <Chip x={800} y={1170} text="auf Dauer: schief" fill={OUT} size={30} />
          </g>
        </g>
      )}
      <Header t={t} hide={Math.max(hookO, win(t, merkAt, FUSS_TOTAL + 1))} />
      {/* Hook */}
      {hookO > 0 && (
        <g opacity={hookO}>
          {([["„Falscher Fuß!“", COL.rust, 112], ["Was heißt das", COL.forestDeep, 84], ["eigentlich?", COL.forestDeep, 84]] as Array<[string, string, number]>).map(([s, c, size], i) => {
            const k = ease((t + 0.45 - i * 0.15) / 0.45);
            return (
              <g key={i} opacity={k} transform={`translate(0 ${(1 - k) * 40})`}>
                <T x={540} y={300 + i * 105} size={size} color={c}>{s}</T>
              </g>
            );
          })}
        </g>
      )}
      <Title t={t} id="was" top="Trab = zwei Beinpaare" sub="bei einem sitzt du – beim anderen stehst du" />
      <Beat t={t} u={u} o={win(t, S(L, "was") + 2.6, E(L, "was"))} />
      <Title t={t} id="richtig" top="Innen hinten am Boden?" sub="dann sitzt du ein" color={COL.forest} />
      <Badge t={t} wrong={wrong} />
      <Title t={t} id="warum" top="Warum ist das wichtig?" sub="dein Gewicht + dein Bein helfen genau dann" />
      <Beat t={t} u={u} o={win(t, S(L, "warum") + 2.6, E(L, "warum"))} y={480} />
      <Title t={t} id="falsch" top="Auf dem falschen Fuß" sub="du sitzt aufs äußere Hinterbein" color={OUT} />
      <Title t={t} id="wechsel" top="Neue Hand – neuer Fuß" />
      <Bahn t={t} k={bahn} />
      <g opacity={merkO}>
        <Merk t={t} at={merkAt} lines={["Innen hinten", "am Boden –", "du sitzt."]} />
      </g>
      {qO > 0 && (
        <g opacity={qO}>
          <g opacity={ease((t - S(L, "q")) / 0.4)} transform={`translate(0 ${(1 - ease((t - S(L, "q")) / 0.4)) * 30})`}>
            <T x={540} y={250} size={80}>Und wie merkst du’s</T>
            <T x={540} y={345} size={80} color={COL.rust}>ohne hinzuschauen?</T>
          </g>
          <g opacity={ease((t - S(L, "q") - 1.0) / 0.4)}>
            <T x={540} y={425} size={40} font={FONT_BODY} weight={700} color={COL.inkSoft}>und wie wechselst du den Fuß?</T>
          </g>
        </g>
      )}
      <Caption t={t} lines={L} skip={["hook", "merke", "q", "tease"]} y={1560} />
      <Tease t={t} />
    </svg>
  );
}
