import type { ReactNode } from "react";
import { Arrow, COL, FONT_BODY, PAPER, Phone, T, back, ease, lerp, sm } from "./nov-kit";
import { LessonScreen } from "./nov-akademie";
import { Callout, LOOKS, TopHorse, world, type Pt } from "./top";
import { Big, BrandLine, Frame, vo, type VoLines } from "./viral-kit";
import LJ from "./aussenschulter-lines.json";

/* Tagesset 01 · Reel 02 „Warum dein Pferd über die äußere Schulter fällt“ (comp `aussenschulter`, 15.11.2026) – Ride Smarter.
   Viereck von oben, Zirkel an der A-Seite, linke Hand (gegen den Uhrzeiger, innen = links). Soll-Linie dunkelgrün gestrichelt,
   gerittene Spur rot: Zirkel wird zur offenen Seite hin größer, äußere Schulter führt. Zoom: zu viel innerer Zügel (OFT, nicht
   zwangsläufig) → nur Hals gebogen, Schulter driftet. Dann Zusammenspiel: innerer Schenkel am Gurt, äußerer Zügel begrenzt,
   äußerer Schenkel verwahrend, Gewicht leicht innen. Weitere Ursachen als Chips. Schluss: echte Akademie-Lektion „Schenkelhilfen“. */

const { S, E, total } = vo(LJ as VoLines);
export const AS_TOTAL = total;
const BAD = COL.rust;
const GOOD = COL.forest;

/* ---------- Viereck mit Zirkel ---------- */
type Box = { x: number; y: number; m: number };
const R0 = 9.3;
const DRIFT = 3.6; // m nach außen zur offenen Seite
const V = 5.0;
function rAt(th: number, k: number) {
  const c = Math.max(0, Math.cos(th));
  return R0 + DRIFT * k * c * c;
}
function Arena({ b, children }: { b: Box; children?: ReactNode }) {
  const px = (m: number) => b.x + m * b.m;
  const py = (m: number) => b.y + m * b.m;
  return (
    <g>
      <rect x={px(0)} y={py(0)} width={40 * b.m} height={20 * b.m} rx="6" fill="#E3D3B4" stroke={PAPER} strokeWidth={8} />
      <g fill="#D3BF9C">
        {Array.from({ length: 24 }, (_, i) => (
          <ellipse key={i} cx={px(1 + ((i * 7.3) % 38))} cy={py(1 + ((i * 5.7) % 18))} rx={i % 3 ? 9 : 14} ry="4" />
        ))}
      </g>
      {b.m > 18 && [["A", px(0) - 24, py(10) + 10], ["C", px(40) + 24, py(10) + 10], ["X", px(20) + 22, py(10) - 12]].map(([l, x, y]) => (
        <T key={l as string} x={x as number} y={y as number} size={26} font={FONT_BODY} weight={700} color={COL.brownDeep}>{l as string}</T>
      ))}
      <circle cx={px(10)} cy={py(10)} r={R0 * b.m} fill="none" stroke={GOOD} strokeWidth={6} strokeDasharray="16 10" opacity=".9" />
      {children}
    </g>
  );
}
const zc = (b: Box): Pt => [b.x + 10 * b.m, b.y + 10 * b.m];
const onC = (b: Box, th: number, r: number): Pt => [zc(b)[0] + r * b.m * Math.cos(th), zc(b)[1] + r * b.m * Math.sin(th)];
/** linke Hand: Winkel nimmt ab (gegen den Uhrzeiger auf dem Bildschirm) */
const thAt = (t: number) => 2.4 - (V / R0) * t * 0.9;
function Trail({ b, t, k }: { b: Box; t: number; k: (q: number) => number }) {
  const pts: string[] = [];
  const t0 = Math.max(0, t - 6.5);
  for (let q = t0; q <= t; q += 0.05) {
    const th = thAt(q);
    const p = onC(b, th, rAt(th, k(q)));
    pts.push(`${p[0].toFixed(1)},${p[1].toFixed(1)}`);
  }
  return pts.length > 1 ? <path d={"M" + pts.join(" L")} fill="none" stroke={BAD} strokeWidth={b.m > 18 ? 9 : 7} strokeLinecap="round" strokeLinejoin="round" opacity=".9" /> : null;
}
function HorseOn({ b, t, k, s, glow }: { b: Box; t: number; k: number; s: number; glow?: number }) {
  const th = thAt(t);
  const r = rAt(th, k);
  const p = onC(b, th, r);
  // Pferd schaut leicht nach außen, Hals nach innen gestellt
  const drift = k * Math.max(0, Math.cos(th)) * 14;
  const ang = (th * 180) / Math.PI - 90 + drift;
  const sh = world(p, ang, s, [18, 13]);
  return (
    <g>
      <TopHorse at={p} ang={ang} look={LOOKS.tivoli} step={t * 1.2} s={s} bend={-10 - drift} />
      {glow !== undefined && glow > 0.01 && (
        <g opacity={glow}>
          <circle cx={sh[0]} cy={sh[1]} r={20 + 5 * Math.sin(t * 6)} fill={BAD} opacity=".45" />
          <circle cx={sh[0]} cy={sh[1]} r={20 + 5 * Math.sin(t * 6)} fill="none" stroke={BAD} strokeWidth="5" />
        </g>
      )}
    </g>
  );
}

/* ---------- Szene A: Hook + Problem ---------- */
const BA: Box = { x: 80, y: 640, m: 23 };
function SceneA({ t }: { t: number }) {
  const k = (q: number) => sm((q - 0.4) / 3.5);
  const glow = sm((t - S("04")) / 0.4);
  const th = thAt(t);
  const p = onC(BA, th, rAt(th, k(t)));
  const ang = (th * 180) / Math.PI - 90 + k(t) * Math.max(0, Math.cos(th)) * 14;
  const sh = world(p, ang, 2.5, [18, 13]);
  return (
    <g>
      <Big t={t} a={0} lines={["Du reitest einen Zirkel."]} y={250} size={74} />
      {t >= S("02") - 0.1 && <Big t={t} a={S("02") - 0.1} lines={["Dein Pferd nicht."]} y={360} size={86} col={COL.rust} />}
      <Arena b={BA}>
        <Trail b={BA} t={t} k={k} />
        <HorseOn b={BA} t={t} k={k(t)} s={2.5} glow={glow} />
      </Arena>
      <g opacity={ease((t - S("03")) / 0.3)}>
        <rect x={150} y={1190} width={46} height={10} rx="5" fill={GOOD} />
        <T x={214} y={1206} size={34} font={FONT_BODY} weight={800} color={GOOD} anchor="start">geplante Linie</T>
        <rect x={580} y={1190} width={46} height={10} rx="5" fill={BAD} />
        <T x={644} y={1206} size={34} font={FONT_BODY} weight={800} color={BAD} anchor="start">tatsächliche Linie</T>
      </g>
      <Callout from={sh} to={[sh[0] + 40, 1330]} text="äußere Schulter führt" color={BAD} k={glow} size={38} />
      {t >= S("03") && t < S("04") && <Big t={t} a={S("03")} lines={["WARUM PASSIERT DAS?"]} y={1440} size={64} col={COL.forestDeep} />}
    </g>
  );
}

/* ---------- Großes Pferd von oben (Zoom) ---------- */
const HC: Pt = [540, 1000];
const HS = 8.2;
function BigHorse({ t, bend, pull, slide, glow, outBack = 0 }: { t: number; bend: number; pull: number; slide: number; glow: Parameters<typeof TopHorse>[0]["glow"]; outBack?: number }) {
  const at: Pt = [HC[0] + slide, HC[1]];
  return (
    <g>
      <rect x={60} y={520} width={960} height={1000} rx="40" fill="#E3D3B4" />
      <g fill="#D3BF9C">
        {Array.from({ length: 16 }, (_, i) => (
          <ellipse key={i} cx={100 + ((i * 173 + t * 0) % 880)} cy={560 + ((i * 97 + t * 160) % 920)} rx={i % 3 ? 10 : 16} ry="4" />
        ))}
      </g>
      <TopHorse at={at} ang={-90} look={LOOKS.tivoli} step={t * 1.2} s={HS} bend={bend} handPull={pull} glow={glow} outBack={outBack} />
    </g>
  );
}
const P = (local: Pt, slide = 0): Pt => world([HC[0] + slide, HC[1]], -90, HS, local);

/* Szene B: zu viel innerer Zügel */
function SceneB({ t }: { t: number }) {
  const a = S("05");
  const pull = sm((t - a - 0.6) / 0.6);
  const bend = -6 - 30 * pull;
  const slide = 150 * sm((t - S("07")) / 2.0);
  const sh = P([18, 13], slide);
  const neck = P([36, -8], slide);
  return (
    <g>
      <Big t={t} a={a - 0.1} lines={["Ein häufiger Reflex:", "mehr innerer Zügel"]} y={250} size={74} />
      <BigHorse t={t} bend={bend} pull={pull} slide={slide} glow={{ innerRein: pull, pull: 1 }} />
      <Callout from={neck} to={[300, 640]} text="Hals biegt nach innen" color={BAD} k={sm((t - S("06")) / 0.3)} size={36} />
      {t >= S("07") && (
        <g>
          <circle cx={sh[0]} cy={sh[1]} r={36 + 8 * Math.sin(t * 6)} fill={BAD} opacity=".35" />
          <Arrow from={[sh[0] + 40, sh[1]]} to={[sh[0] + 190, sh[1] + 10]} color={BAD} w={12} head={28} />
          <Callout from={[sh[0] + 120, sh[1] + 30]} to={[760, 1420]} text="Schulter driftet nach außen" color={BAD} k={sm((t - S("07") - 0.3) / 0.3)} size={34} />
        </g>
      )}
      <g opacity={ease((t - S("06")) / 0.3)}>
        <rect x={360} y={1560} width={360} height={70} rx="35" fill={PAPER} stroke={BAD} strokeWidth="4" />
        <T x={540} y={1607} size={34} font={FONT_BODY} weight={900} color={BAD}>OFT – NICHT IMMER</T>
      </g>
    </g>
  );
}

/* Szene C: Zusammenspiel der Hilfen */
const AIDS: Array<{ id: string; text: string; n: string }> = [
  { id: "09", text: "innerer Schenkel am Gurt", n: "1" },
  { id: "10", text: "äußerer Zügel begrenzt", n: "2" },
  { id: "11", text: "äußerer Schenkel verwahrt", n: "3" },
  { id: "12", text: "Gewicht leicht innen", n: "4" },
];
function SceneC({ t }: { t: number }) {
  const on = (id: string) => sm((t - S(id) + 0.05) / 0.35);
  const g1 = on("09"), g2 = on("10"), g3 = on("11"), g4 = on("12");
  const pulse = 0.65 + 0.35 * Math.sin(t * 6);
  const legIn = P([3, -15]);
  const reinOut = P([14, 5.5]);
  const legOut = P([-12, 15]);
  const seat = P([0, -5]);
  return (
    <g>
      <Big t={t} a={S("08") - 0.1} lines={["Entscheidend:", "das Zusammenspiel"]} y={250} size={78} col={GOOD} />
      <BigHorse t={t} bend={-8} pull={0} slide={0} outBack={g3} glow={{ innerLeg: g1 * pulse + (g1 > 0.9 ? 0.3 : 0), outerRein: g2, outerLeg: g3, seat: g4 }} />
      {/* äußerer Zügel: Begrenzung an Hals und Schulter */}
      {g2 > 0.01 && <path d={`M${P([40, 16])[0]} ${P([40, 16])[1]} Q ${P([22, 24])[0]} ${P([22, 24])[1]} ${P([4, 20])[0]} ${P([4, 20])[1]}`} fill="none" stroke={GOOD} strokeWidth="12" strokeLinecap="round" strokeDasharray="4 18" opacity={g2} />}
      {/* Gewicht innen, nicht nach außen rutschen */}
      {g4 > 0.01 && (
        <g opacity={g4}>
          <Arrow from={[seat[0] + 10, seat[1]]} to={[seat[0] - 70, seat[1]]} color={COL.honey} w={10} head={22} />
          <g opacity={sm((t - S("12") - 1.2) / 0.3)}>
            <Arrow from={[seat[0] + 40, seat[1] + 60]} to={[seat[0] + 150, seat[1] + 60]} color={BAD} w={8} head={18} />
            <path d={`M${seat[0] + 70} ${seat[1] + 30} l60 60 M${seat[0] + 130} ${seat[1] + 30} l-60 60`} stroke={BAD} strokeWidth="9" strokeLinecap="round" />
          </g>
        </g>
      )}
      <Callout from={legIn} to={[260, 1180]} text="innerer Schenkel" color={COL.honey} k={g1} size={34} />
      <Callout from={reinOut} to={[810, 640]} text="äußerer Zügel" color={GOOD} k={g2} size={34} />
      <Callout from={legOut} to={[810, 1260]} text="äußerer Schenkel" color={GOOD} k={g3} size={34} />
      <Callout from={seat} to={[260, 880]} text="Gewicht innen" color={COL.brownDeep} k={g4} size={34} />
      {AIDS.map((x, i) => {
        const k = back((t - S(x.id)) / 0.35);
        if (k <= 0.01) return null;
        const y = 1580 + i * 0;
        const xx = 165 + i * 250;
        return (
          <g key={x.id} opacity={Math.min(1, k)} transform={`translate(${xx} ${y}) scale(${Math.max(0.01, Math.min(1, k))})`}>
            <circle r="44" fill={i === 0 ? COL.honey : i === 3 ? COL.brownDeep : GOOD} />
            <T x={0} y={16} size={46} font={FONT_BODY} weight={900} color={PAPER}>{x.n}</T>
          </g>
        );
      })}
      {AIDS.map((x) => (t >= S(x.id) && t < E(x.id) + 0.3 ? <T key={x.id} x={540} y={1700} size={42} font={FONT_BODY} weight={800} color={COL.forestDeep}>{x.text}</T> : null))}
    </g>
  );
}

/* Szene D: Vergleich + weitere Ursachen */
const BS: Box = { x: 70, y: 560, m: 11.5 };
const BG: Box = { x: 570, y: 560, m: 11.5 };
function SceneD({ t }: { t: number }) {
  const a = S("13");
  const causes = ["Schiefe", "Balance", "Ausbildungsstand", "Körper"];
  return (
    <g>
      <Big t={t} a={a - 0.1} lines={["Nicht nur lenken.", "Balance verstehen."]} y={250} size={84} />
      <Arena b={BS}>
        <Trail b={BS} t={t} k={() => 1} />
        <HorseOn b={BS} t={t} k={1} s={1.5} />
      </Arena>
      <Arena b={BG}>
        <HorseOn b={BG} t={t} k={0} s={1.5} />
      </Arena>
      <T x={300} y={870} size={36} font={FONT_BODY} weight={900} color={BAD}>✗ weicht ab</T>
      <T x={800} y={870} size={36} font={FONT_BODY} weight={900} color={GOOD}>✓ gleichmäßig</T>
      <g opacity={ease((t - S("14")) / 0.3)}>
        <T x={540} y={1040} size={50} color={COL.forestDeep}>Auch möglich:</T>
      </g>
      {causes.map((c, i) => {
        const k = back((t - S("14") - 0.5 - i * 0.55) / 0.35);
        if (k <= 0.01) return null;
        const label = i === 3 ? "körperliche Ursachen" : c;
        const w = label.length * 22 + 90;
        const x = 540, y = 1150 + i * 110;
        return (
          <g key={c} opacity={Math.min(1, k)} transform={`translate(${x} ${y}) scale(${Math.max(0.01, k)})`}>
            <rect x={-w / 2} y={-44} width={w} height={84} rx="42" fill={i === 3 ? BAD : COL.forest} />
            <T x={0} y={14} size={40} font={FONT_BODY} weight={800} color={PAPER}>{label}</T>
          </g>
        );
      })}
    </g>
  );
}

/* Szene E: Akademie */
function SceneE({ t }: { t: number }) {
  const a = S("15");
  const py = lerp(1960, 470, ease((t - a + 0.1) / 0.6));
  const scroll = 330 * sm((t - S("16")) / 2.4);
  const fin = E("16") - 0.2;
  return (
    <g>
      <Big t={t} a={a - 0.1} lines={["Reiten verstehen", "statt nur nachmachen."]} y={210} size={74} />
      <Phone x={280} y={py} w={520} id="as-ph">
        <g transform={`translate(296 ${py + 16})`}>
          <LessonScreen which="hilfen" scroll={scroll} />
        </g>
      </Phone>
      {t >= fin && (
        <g opacity={Math.min(1, back((t - fin) / 0.4))}>
          <rect x={90} y={1440} width={900} height={210} rx="44" fill={COL.forest} />
          <T x={540} y={1530} size={52} color={PAPER}>Hofgeschichten Reitakademie</T>
          <T x={540} y={1604} size={44} font={FONT_BODY} weight={800} color={COL.honey}>einmalig 29,90 €</T>
        </g>
      )}
      <BrandLine t={t} a={fin + 0.4} text="Link in der Bio" />
    </g>
  );
}

export function renderAussenschulter(t: number) {
  const cuts = [S("05") - 0.12, S("08") - 0.12, S("13") - 0.12, S("15") - 0.12];
  let body: ReactNode;
  if (t < cuts[0]) body = <SceneA t={t} />;
  else if (t < cuts[1]) body = <SceneB t={t} />;
  else if (t < cuts[2]) body = <SceneC t={t} />;
  else if (t < cuts[3]) body = <SceneD t={t} />;
  else body = <SceneE t={t} />;
  return (
    <Frame t={t} cuts={cuts}>
      {body}
    </Frame>
  );
}
