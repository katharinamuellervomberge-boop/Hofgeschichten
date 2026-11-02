import { AnimHorse } from "@/components/illustrations/akademie/AnimHorse";
import { BODIES } from "@/components/illustrations/akademie/geometry";
import { Rider, Tack } from "@/components/illustrations/akademie/RiderScene";
import { getHorse } from "@/content/horses";
import { HomeScreen, LessonScreen } from "./nov-akademie";
import { Person } from "./nov01-erkennen-reel";
import { Brand, COL, Caption, E, FONT_BODY, Header, HookText, PAPER, Phone, Pop, S, T, Title, W, H, back, ease, lerp, mkLines, sm, win, wordAt } from "./nov-kit";

/* November 04 (9:16, Verkauf): „Was wäre, wenn du Reiten auch zu Hause lernen könntest?“
   Reitstunde mit Fragezeichen → zu Hause „Wie ging das nochmal?“ → Smartphone mit echten Inhalten der Reitakademie
   (Startseite, Lektionen „Der Zweitakt“, „Schenkelhilfen“, „Zirkel und Volte“) → Preis 19,90 € einmalig.
   Akademie als Ergänzung zum Reitunterricht, nicht als Ersatz. */

const REC: Array<[string, string, number, number]> = [
  ["a", "Du kennst das:", 0, 1.01],
  ["b", "Im Reitunterricht erklärt dir jemand eine Hilfe, eine Bahnfigur oder eine Bewegung.", 1.39, 6.15],
  ["c1", "Und zu Hause fragst du dich plötzlich:", 6.52, 8.32],
  ["c2", "Wie war das nochmal genau?", 8.67, 9.96],
  ["d", "Was wäre, wenn du genau dieses Wissen jederzeit nachschauen könntest?", 10.45, 14.38],
  ["e", "Mit unserer Hofgeschichten Reitakademie lernst du die Grundlagen des Reitens Schritt für Schritt.", 14.77, 19.63],
  ["f", "Du verstehst Gangarten, Reiterhilfen und Bahnfiguren mit anschaulichen Erklärungen.", 19.99, 24.94],
  ["g", "So kannst du dein Wissen zwischen den Reitstunden vertiefen.", 25.33, 28.25],
  ["h1", "Und das Beste:", 28.54, 29.37],
  ["h2", "Die digitale Reitakademie gehört dir für einmalig 19,90 Euro.", 29.71, 34.01],
  ["i", "Entdecke sie jetzt bei Hofgeschichten!", 34.35, 36.34],
];
export const N04_LINES = mkLines(REC);
const L = N04_LINES;
export const N04_TOTAL = E(L, "i") + 2.6;
const at = (id: string, w: string) => wordAt(L, id, w);

const LOOK = getHorse("tivoli")!.look;

/* ---------- Szene 1: Reitstunde ---------- */
function Lesson({ t }: { t: number }) {
  const k = 1.75;
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  const q = back((t - at("b", "Bewegung")) / 0.45);
  const items: Array<[string, number]> = [["eine Hilfe", at("b", "Hilfe")], ["eine Bahnfigur", at("b", "Bahnfigur")], ["eine Bewegung", at("b", "Bewegung")]];
  return (
    <g>
      <rect x={0} y={1180} width={W} height={380} fill="#E3D3B4" />
      <rect x={0} y={1176} width={W} height={10} fill={COL.brown} opacity=".35" />
      <path d="M0 1080 H1080 M0 1130 H1080" stroke="#8A6A4E" strokeWidth="9" />
      {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M${40 + i * 200} 1050 V1185`} stroke="#8A6A4E" strokeWidth="14" />)}
      <Person x={170} y={1440} walk={0} s={1.05} wave={win(t, S(L, "b"), E(L, "b")) * (0.5 + 0.5 * Math.sin(t * 3))} />
      <svg x={330} y={1450 - 290 * k} width={320 * k} height={292 * k} viewBox="70 20 320 292" overflow="visible">
        <AnimHorse look={LOOK} gait="schritt" time={t}>
          <Tack hand={BODIES.sitz.hand} longRein={false} stirrupsDown={false} />
          <Rider b={BODIES.sitz} pose="sitz" />
        </AnimHorse>
      </svg>
      {/* Sprechblase der Reitlehrerin */}
      <g opacity={ease((t - S(L, "b")) / 0.3)}>
        <rect x={40} y={700} width={420} height={250} rx="36" fill={PAPER} stroke={COL.sand} strokeWidth="3" />
        <path d="M140 948 l-10 50 l60 -50 Z" fill={PAPER} />
        {items.map(([s, a], i) => (
          <g key={s} opacity={ease((t - a + 0.1) / 0.3)}>
            <T x={250} y={775 + i * 64} size={40} font={FONT_BODY} weight={700} color={COL.forest}>{s}</T>
          </g>
        ))}
      </g>
      {q > 0.01 && (
        <g transform={`translate(800 760) scale(${Math.max(0.01, q)})`} opacity={Math.min(1, q)}>
          <circle r={64 + 4 * pulse} fill={COL.rust} />
          <T x={0} y={32} size={92} color={PAPER}>?</T>
        </g>
      )}
    </g>
  );
}

/* ---------- Szene 2: zu Hause ---------- */
function Home({ t }: { t: number }) {
  const k = back((t - S(L, "c2") + 0.1) / 0.5);
  return (
    <g>
      <rect x={0} y={560} width={W} height={1000} fill={COL.sandLight} />
      <rect x={0} y={1300} width={W} height={260} fill="#CDB68F" />
      {/* Fenster */}
      <rect x={640} y={640} width={300} height={360} rx="10" fill="#DDE3D6" stroke={PAPER} strokeWidth="16" />
      <path d="M790 640 V1000 M640 820 H940" stroke={PAPER} strokeWidth="10" />
      {/* Bilderrahmen mit Pferd */}
      <rect x={110} y={660} width={230} height={170} rx="8" fill={PAPER} stroke={COL.brownDeep} strokeWidth="8" />
      <path d="M150 800 q30 -60 70 -50 q20 -40 40 -30 l20 30 q-10 10 -20 0 q-10 40 -40 50 Z" fill={COL.brown} />
      {/* Sofa */}
      <rect x={60} y={1150} width={560} height={150} rx="40" fill={COL.forest} />
      <rect x={90} y={1090} width={500} height={110} rx="36" fill="#4A5E4D" />
      <Person x={420} y={1440} walk={0} s={1.05} />
      {k > 0.01 && (
        <g opacity={Math.min(1, k)} transform={`translate(610 560) scale(${Math.max(0.01, k)}) translate(-610 -560)`}>
          <circle cx={470} cy={930} r={14} fill={PAPER} />
          <circle cx={500} cy={880} r={22} fill={PAPER} />
          <ellipse cx={720} cy={720} rx={330} ry={150} fill={PAPER} stroke={COL.sand} strokeWidth="3" />
          <T x={720} y={706} size={50} color={COL.forestDeep}>Wie ging das</T>
          <T x={720} y={766} size={50} color={COL.rust}>nochmal? 🤔</T>
        </g>
      )}
    </g>
  );
}

export function renderN04(t: number) {
  const s1 = 1 - sm((t - S(L, "c1") + 0.3) / 0.5);
  const s2 = sm((t - S(L, "c1") + 0.3) / 0.5) * (1 - sm((t - S(L, "d") + 0.2) / 0.5));
  const phoneIn = sm((t - S(L, "d") + 0.2) / 0.8);
  const priceA = S(L, "h1") - 0.2;
  const phoneO = phoneIn * (1 - sm((t - priceA) / 0.5));
  const G0 = at("f", "Gangarten") - 0.15;
  const SW1 = [G0, G0 + 1.7, G0 + 3.4];
  const screen = t < SW1[0] ? "home" : t < SW1[1] ? "gang" : t < SW1[2] ? "hilfen" : "bahn";
  const scroll = screen === "home" ? 220 * sm((t - S(L, "e") - 0.5) / 3.5) : 160 * sm((t - S(L, "g") - 0.2) / 2.5) * (screen === "bahn" ? 1 : 0);
  const swap = Math.min(...SW1.map((a) => Math.abs(t - a)));
  const flash = Math.max(0, 1 - swap / 0.18);
  const px = 300;
  const py = lerp(1700, 520, phoneIn);
  const priceO = win(t, priceA, N04_TOTAL + 1);
  const hookO = win(t, 0, E(L, "b") + 0.1);
  const hideHead = Math.max(hookO, priceO);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      {s1 > 0.01 && <g opacity={s1}><Lesson t={t} /></g>}
      {s2 > 0.01 && <g opacity={s2}><Home t={t} /></g>}

      {phoneO > 0.01 && (
        <g opacity={phoneO}>
          <Phone x={px} y={py} w={520} id="n04">
            <g transform={`translate(${px + 16} ${py + 16})`}>
              {screen === "home" ? <HomeScreen scroll={scroll} /> : <LessonScreen which={screen} scroll={scroll} />}
              <rect width={488} height={1034} fill={PAPER} opacity={flash * 0.7} />
            </g>
          </Phone>
          <Pop t={t} a={SW1[0]} x={150} y={760} text="Gangarten" fill={COL.forest} size={30} o={win(t, S(L, "f"), E(L, "g"))} />
          <Pop t={t} a={SW1[1]} x={150} y={900} text="Reiterhilfen" fill={COL.forest} size={30} o={win(t, S(L, "f"), E(L, "g"))} />
          <Pop t={t} a={SW1[2]} x={150} y={1040} text="Bahnfiguren" fill={COL.forest} size={30} o={win(t, S(L, "f"), E(L, "g"))} />
          <Pop t={t} a={S(L, "e") + 0.6} x={150} y={620} text="9 Module" fill={COL.rust} size={30} o={win(t, S(L, "e"), E(L, "e"))} />
        </g>
      )}

      {/* Preis */}
      {priceO > 0 && (
        <g opacity={priceO}>
          <g opacity={ease((t - priceA) / 0.4)}>
            <T x={540} y={300} size={70} color={COL.rust}>Und das Beste:</T>
          </g>
          {(() => {
            const k = back((t - at("h2", "einmalig") + 0.1) / 0.5);
            if (k <= 0.01) return null;
            return (
              <g opacity={Math.min(1, k)} transform={`translate(540 640) scale(${Math.max(0.01, k)}) translate(-540 -640)`}>
                <rect x={140} y={440} width={800} height={400} rx="48" fill={COL.forest} />
                <T x={540} y={540} size={44} font={FONT_BODY} weight={700} color={COL.honey}>EINMALIG</T>
                <T x={540} y={700} size={170} color={PAPER}>19,90 €</T>
                <T x={540} y={790} size={36} font={FONT_BODY} weight={700} color={COL.sand}>Hofgeschichten Reitakademie</T>
              </g>
            );
          })()}
          <g opacity={ease((t - S(L, "i") + 0.1) / 0.4)}>
            <rect x={120} y={920} width={840} height={150} rx="40" fill={COL.rust} />
            <T x={540} y={986} size={40} font={FONT_BODY} weight={700} color={PAPER}>Kommentiere „AKADEMIE“ 💬</T>
            <T x={540} y={1042} size={32} font={FONT_BODY} weight={700} color={COL.sandLight}>und entdecke unsere Reitakademie</T>
          </g>
          <Brand t={t} a={S(L, "i") + 0.4} sub="Reitakademie · Link in der Bio" y={1110} />
        </g>
      )}

      <Header t={t} label="Die Hofgeschichten · Reitakademie" hide={hideHead} />
      <HookText t={t} end={E(L, "b") + 0.1} size={74} gap={92} lines={[
        { text: "Stell dir vor, du könntest", at: -0.9 },
        { text: "deine nächste Reitstunde", at: 0.3 },
        { text: "schon zu Hause vorbereiten.", at: 1.0, hi: true, size: 66 },
      ]} />
      <Title t={t} a={S(L, "c1")} b={E(L, "c2")} top="Zu Hause …" sub="fragst du dich plötzlich:" />
      <Title t={t} a={S(L, "d")} b={E(L, "d")} top="Was wäre, wenn …" sub="du es jederzeit nachschauen könntest?" color={COL.forest} y={250} />
      <Title t={t} a={S(L, "e")} b={E(L, "e")} top="Reiten verstehen." sub="Auch zwischen den Reitstunden." color={COL.forest} y={250} />
      <Title t={t} a={S(L, "f")} b={E(L, "f")} top="Mit anschaulichen Erklärungen" sub="echte Lektionen aus der Reitakademie" y={250} />
      <Title t={t} a={S(L, "g")} b={E(L, "g")} top="Wissen vertiefen" sub="Ergänzung zum Reitunterricht – kein Ersatz" color={COL.forest} y={250} />
      <Caption t={t} lines={L} skip={["h1", "h2", "i"]} y={1610} />
    </svg>
  );
}
