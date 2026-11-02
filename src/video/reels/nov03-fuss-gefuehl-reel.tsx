import { AnimHorse, legPhase } from "@/components/illustrations/akademie/AnimHorse";
import { Rider, Tack } from "@/components/illustrations/akademie/RiderScene";
import { getHorse } from "@/content/horses";
import { riderBody, riseAmount } from "../leichttraben";
import { ArenaHorse, SkyDefs } from "./rkit";
import { Brand, COL, Caption, E, FONT_BODY, Header, HookText, IconBadge, PAPER, Pop, S, T, Title, W, H, back, ease, mkLines, sm, win, wordAt } from "./nov-kit";

/* November 03 (9:16): „Warum spüren manche Reiter den falschen Fuß sofort?“
   Zwei Reiter im Leichttraben: einer schaut runter, einer nach vorn. Diagonale Beinpaare, Gleichgewicht ·
   Körperwahrnehmung · Rhythmus, „mit Übung“ – erlernte Fähigkeit, nicht angeboren und nicht „immer“. */

const REC: Array<[string, string, number, number]> = [
  ["a1", "Manche Reiter merken sofort, wenn sie auf dem falschen Fuß leichttraben.", 0, 3.88],
  ["a2", "Andere müssen erst nach unten schauen.", 4.3, 6.25],
  ["b", "Aber woran liegt das eigentlich?", 6.61, 8.47],
  ["c", "Beim Reiten verarbeitet dein Körper ständig Bewegungsinformationen.", 8.85, 12.59],
  ["d", "Dein Gleichgewichtssinn, deine Körperwahrnehmung und dein Gefühl für den Rhythmus arbeiten zusammen.", 12.93, 18.11],
  ["e", "Mit Übung lernst du, die Bewegung deines Pferdes immer besser zu spüren.", 18.47, 22.52],
  ["f", "Erfahrene Reiter können dadurch oft erkennen, auf welchem Fuß sie leichttraben, ohne hinzusehen.", 22.85, 28.04],
  ["g1", "Und jetzt mal ehrlich:", 28.37, 29.52],
  ["g2", "Spürst du es schon oder musst du noch schauen?", 29.81, 32.18],
];
export const N03_LINES = mkLines(REC);
const L = N03_LINES;
export const N03_TOTAL = E(L, "g2") + 2.8;
const at = (id: string, w: string) => wordAt(L, id, w);

const TONGA = getHorse("tonga")!.look;
const TIVOLI = getHorse("tivoli")!.look;

/** Reiter auf dem Pferd; `down` = Blick zur Schulter des Pferdes */
function RiderOn({ t, down }: { t: number; down: boolean }) {
  const u = riseAmount(t);
  const b0 = riderBody(u);
  const b = down ? { ...b0, head: [b0.head[0] + 9, b0.head[1] + 7] as [number, number] } : b0;
  return (
    <g>
      <Tack hand={b.hand} longRein={false} stirrupsDown={false} />
      <Rider b={b} pose={u > 0.5 ? "leicht" : "sitz"} />
      {down && <path d={`M${b.head[0] + 8} ${b.head[1] + 4} L262 128`} stroke={COL.rust} strokeWidth="2.2" strokeDasharray="4 3" />}
      {!down && <path d={`M${b.head[0] + 12} ${b.head[1]} L${b.head[0] + 70} ${b.head[1] - 2}`} stroke={COL.forest} strokeWidth="2.2" strokeDasharray="4 3" />}
    </g>
  );
}

/** Kleines Pferd mit Reiter auf der Stelle trabend */
function Pair({ t, x, y, k, look, down, pairs }: { t: number; x: number; y: number; k: number; look: typeof TONGA; down: boolean; pairs: number }) {
  const hl = legPhase("trab", "HL", t).stance;
  const highlight = pairs > 0.3 ? { HL: hl ? COL.pairA : COL.sand, VR: hl ? COL.pairA : COL.sand, HR: hl ? COL.sand : COL.pairB, VL: hl ? COL.sand : COL.pairB } : {};
  return (
    <svg x={x} y={y} width={320 * k} height={292 * k} viewBox="70 20 320 292" overflow="visible">
      <AnimHorse look={look} gait="trab" time={t} highlight={highlight}>
        <RiderOn t={t} down={down} />
      </AnimHorse>
    </svg>
  );
}

function Sand({ t, y }: { t: number; y: number }) {
  const off = (t * 160) % 211;
  return (
    <g>
      <rect x={0} y={y} width={W} height={150} fill="#E3D3B4" />
      <g fill="#D3BF9C">
        {Array.from({ length: 14 }, (_, i) => {
          const x = ((i * 211 - off) % (W + 211)) - 60;
          const yy = y + 30 + ((i * 37) % 100);
          return <ellipse key={i} cx={x} cy={yy} rx={i % 3 ? 14 : 22} ry="5" />;
        })}
      </g>
    </g>
  );
}

/* Symbole */
const I_BAL = (
  <g fill="none" stroke={PAPER} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M0 -40 V36 M-30 36 H30" />
    <path d="M-44 -24 H44" />
    <path d="M-44 -24 l-14 30 h28 Z M44 -24 l-14 30 h28 Z" fill={PAPER} />
  </g>
);
const I_BODY = (
  <g fill="none" stroke={PAPER} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="0" cy="-34" r="12" fill={PAPER} />
    <path d="M0 -20 V18 M0 18 l-18 26 M0 18 l18 26 M-26 -6 H26" />
    <circle r="54" strokeDasharray="8 10" opacity=".6" />
  </g>
);
const I_RHY = (
  <g fill={PAPER} stroke={PAPER} strokeWidth="7" strokeLinecap="round">
    <circle cx="-20" cy="24" r="12" />
    <circle cx="22" cy="14" r="12" />
    <path d="M-8 24 V-30 L34 -40 V14" fill="none" />
  </g>
);

export function renderN03(t: number) {
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  const twoO = 1 - sm((t - S(L, "c") + 0.3) / 0.5);
  const endA = S(L, "g1") - 0.2;
  const bigO = sm((t - S(L, "c") + 0.3) / 0.5) * (1 - sm((t - endA) / 0.4));
  const endO = win(t, endA, N03_TOTAL + 1);
  const hookO = win(t, 0, E(L, "a2") + 0.1);
  const hideHead = Math.max(hookO, endO);
  const pairs = win(t, S(L, "c") + 0.4, E(L, "c"));
  const hl = legPhase("trab", "HL", t).stance;
  const u = riseAmount(t);
  const dO = win(t, S(L, "d"), E(L, "d"));
  const eO = win(t, S(L, "e"), E(L, "e"));
  const fO = win(t, S(L, "f"), E(L, "f"));
  const prog = sm((t - S(L, "e") - 0.3) / 3.2);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <SkyDefs />
      <rect width={W} height={H} fill={COL.bg} />

      {/* Zwei Reiter nebeneinander */}
      {twoO > 0.01 && (
        <g opacity={twoO}>
          <Sand t={t} y={1240} />
          <Pair t={t} x={-30} y={1270 - 285 * 1.6} k={1.6} look={TIVOLI} down pairs={0} />
          <Pair t={t + 0.37} x={520} y={1270 - 285 * 1.6} k={1.6} look={TONGA} down={false} pairs={0} />
          <Pop t={t} a={S(L, "a1") + 0.8} x={760} y={770} text="✓ spürt es" fill={COL.forest} size={36} />
          <Pop t={t} a={S(L, "a2") - 0.1} x={260} y={770} text="👀 schaut runter" fill={COL.rust} size={36} />
          {win(t, S(L, "b"), E(L, "b") + 0.2) > 0 && (
            <g opacity={win(t, S(L, "b"), E(L, "b") + 0.2)}>
              <circle cx={540} cy={1080} r={70 + 6 * pulse} fill={COL.rust} />
              <T x={540} y={1112} size={96} color={PAPER}>?</T>
            </g>
          )}
        </g>
      )}

      {/* Ein Reiter groß: Bewegung spüren */}
      {bigO > 0.01 && (
        <g opacity={bigO}>
          <ArenaHorse t={t} gait="trab" look={TONGA} highlight={pairs > 0.3 ? { HL: hl ? COL.pairA : COL.sand, VR: hl ? COL.pairA : COL.sand, HR: hl ? COL.sand : COL.pairB, VL: hl ? COL.sand : COL.pairB } : {}}>
            <RiderOn t={t} down={false} />
            {/* Bewegungsinformation: Wellen vom Pferderücken in den Reiter */}
            {win(t, S(L, "c") + 0.2, E(L, "d")) > 0 && (
              <g opacity={win(t, S(L, "c") + 0.2, E(L, "d"))} fill="none" stroke={COL.honey} strokeWidth="3" strokeLinecap="round">
                {[0, 1, 2].map((i) => {
                  const k = (t * 1.25 + i / 3) % 1;
                  return <path key={i} opacity={1 - k} d={`M${200 + k * 4} ${118 - k * 70} q14 -8 28 0`} />;
                })}
              </g>
            )}
          </ArenaHorse>
          {pairs > 0 && (
            <g opacity={pairs}>
              <Pop t={t} a={S(L, "c") + 0.5} x={540} y={540} text={hl ? "Diagonale 1 fußt auf" : "Diagonale 2 fußt auf"} fill={hl ? COL.pairA : COL.pairB} color={hl ? COL.forestDeep : PAPER} size={36} />
              <T x={540} y={1460} size={52} color={u > 0.5 ? COL.rust : COL.forest}>{u > 0.5 ? "auf" : "ab"}</T>
            </g>
          )}
          {dO > 0 && (
            <g opacity={dO}>
              <IconBadge t={t} a={at("d", "Gleichgewicht") - 0.05} x={220} y={500} icon={I_BAL} label="Gleichgewicht" col={COL.forest} r={70} />
              <IconBadge t={t} a={at("d", "Körperwahrnehmung") - 0.05} x={540} y={500} icon={I_BODY} label="Körpergefühl" col={COL.forest} r={70} />
              <IconBadge t={t} a={at("d", "Rhythmus") - 0.05} x={860} y={500} icon={I_RHY} label="Rhythmus" col={COL.forest} r={70} />
              <g opacity={ease((t - at("d", "arbeiten")) / 0.4)}>
                <path d="M290 500 H470 M610 500 H790" stroke={COL.honey} strokeWidth="8" strokeDasharray="12 10" />
              </g>
            </g>
          )}
          {eO > 0 && (
            <g opacity={eO}>
              <rect x={190} y={470} width={700} height={44} rx="22" fill={COL.sandLight} />
              <rect x={190} y={470} width={700 * prog} height={44} rx="22" fill={COL.forest} />
              <T x={540} y={580} size={40} font={FONT_BODY} weight={700} color={COL.forestDeep}>{`Übung ${Math.round(prog * 100)} %`}</T>
            </g>
          )}
          {fO > 0 && (
            <g opacity={fO}>
              <Pop t={t} a={at("f", "erkennen") - 0.2} x={540} y={500} text="✓ ohne hinzusehen" fill={COL.forest} size={40} />
              <Pop t={t} a={at("f", "ohne") - 0.1} x={540} y={620} text="oft – nicht immer · gelernt, nicht angeboren" fill={COL.brownDeep} size={28} />
            </g>
          )}
        </g>
      )}

      {/* Ende: Team Gefühl / Team Runterschauen */}
      {endO > 0 && (
        <g opacity={endO}>
          <g opacity={ease((t - endA) / 0.4)}>
            <T x={540} y={270} size={70} color={COL.rust}>Und jetzt mal ehrlich:</T>
            <T x={540} y={360} size={52}>Spürst du es schon – oder</T>
            <T x={540} y={430} size={52}>musst du noch schauen?</T>
          </g>
          {(
            [
              ["TEAM GEFÜHL", "Ich spüre es 🙌", COL.forest, 90],
              ["TEAM RUNTERSCHAUEN", "Ich muss schauen 👀", COL.rust, 560],
            ] as Array<[string, string, string, number]>
          ).map(([team, txt, col, x], i) => {
            const k = back((t - S(L, "g2") - 0.1 - i * 0.25) / 0.45);
            if (k <= 0.01) return null;
            return (
              <g key={team} opacity={Math.min(1, k)} transform={`translate(${x + 215} 900) scale(${Math.max(0.01, k)}) translate(${-x - 215} -900)`}>
                <rect x={x} y={560} width={430} height={680} rx="40" fill={col} />
                <svg x={x + 15} y={600} width={400} height={365} viewBox="70 20 320 292" overflow="visible">
                  <AnimHorse look={i ? TIVOLI : TONGA} gait="trab" time={t + i * 0.4}>
                    <RiderOn t={t + i * 0.4} down={i === 1} />
                  </AnimHorse>
                </svg>
                <T x={x + 215} y={1060} size={i ? 29 : 40} color={PAPER}>{team}</T>
                <T x={x + 215} y={1130} size={36} font={FONT_BODY} weight={700} color={COL.sand}>{txt}</T>
              </g>
            );
          })}
          <g opacity={ease((t - E(L, "g2") + 0.4) / 0.4)}>
            <T x={540} y={1340} size={44} font={FONT_BODY} weight={700} color={COL.forestDeep}>Schreib dein Team in die Kommentare 😂</T>
          </g>
          <Brand t={t} a={E(L, "g2") - 0.2} sub="Reiten lernen · Reitakademie · Link in der Bio" y={1420} />
        </g>
      )}

      <Header t={t} label="Die Hofgeschichten · Reiten verstehen" hide={hideHead} />
      <HookText t={t} end={E(L, "a2") + 0.1} size={68} gap={84} lines={[
        { text: "Warum merken manche Reiter", at: -0.9 },
        { text: "SOFORT, dass sie auf dem", at: 0.5, hi: true, size: 70 },
        { text: "falschen Fuß leichttraben –", at: 1.4 },
        { text: "und andere überhaupt nicht?", at: 3.6, italic: true },
      ]} />
      <Title t={t} a={S(L, "b")} b={E(L, "b")} top="Woran liegt das?" color={COL.rust} />
      <Title t={t} a={S(L, "c")} b={E(L, "c")} top="Dein Körper fühlt mit" sub="Bewegungsinformationen – in jedem Tritt" />
      <Title t={t} a={S(L, "d")} b={E(L, "d")} top="Drei Sinne arbeiten zusammen" color={COL.forest} />
      <Title t={t} a={S(L, "e")} b={E(L, "e")} top="Mit Übung" sub="spürst du die Bewegung immer besser" color={COL.forest} />
      <Title t={t} a={S(L, "f")} b={E(L, "f")} top="Erfahrene Reiter" sub="erkennen den Fuß oft ohne hinzusehen" />
      <Caption t={t} lines={L} skip={["g1", "g2"]} y={1600} />
    </svg>
  );
}
