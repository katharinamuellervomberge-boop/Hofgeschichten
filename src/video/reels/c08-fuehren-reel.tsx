import { Brand, COL, Caption, E, FONT_BODY, Header, HookText, PAPER, Pop, S, T, Title, W, H, back, ease, mkLines, sm, win, wordAt } from "./nov-kit";
import { LOOKS, TopHorse } from "./top";
import { Mark } from "./n2-kit";

/* Reel R8 (9:16): „Dein Pferd zieht beim Führen?“ (comp `fuehren`) – Pferd + Mensch von oben auf dem Stallweg.
   Pferd läuft nach rechts (links vom Pferd = oben im Bild). Positionen relativ zum Pferd in Pferde-Einheiten. */

const REC: Array<[string, string, number, number]> = [
  ["a1", "Dein Pferd zieht beim Führen?", 0, 1.75],
  ["a2", "Vielleicht läufst du an der falschen Stelle.", 2.13, 4.04],
  ["b1", "Üblich ist: links neben deinem Pferd, etwa auf Höhe von Kopf und Schulter.", 4.38, 8.7],
  ["c1", "Läufst du weit vorn und ziehst am Strick, zieht dein Pferd dagegen.", 9.08, 12.67],
  ["c2", "Läufst du hinten, überholt es dich – und du siehst nicht, was es vorhat.", 13.04, 16.8],
  ["d1", "Halte den Strick locker, mit etwas Abstand,", 17.17, 19.59],
  ["d2", "und wickle ihn nie um die Hand.", 19.97, 21.94],
  ["e1", "Bleibst du stehen, bleibt dein Pferd auch stehen – das kann man üben.", 22.35, 25.66],
  ["f1", "Wie führst du?", 25.98, 26.75],
  ["f2", "Speichern und beim nächsten Stallbesuch testen!", 27.05, 29.81],
];
export const FU_LINES = mkLines(REC);
const L = FU_LINES;
export const FU_TOTAL = E(L, "f2") + 2.6;
const at = (id: string, w: string) => wordAt(L, id, w);

type P = [number, number];
const SK = 4.2;
const HX = 470;
const HY = 1060;
const POS: Record<string, P> = {
  pull: [8, -34], // Hook: Mensch hängt hinten am gespannten Strick
  ok: [32, -30],
  front: [98, -16],
  back: [-34, -34],
  backFar: [-50, -34],
};
const toS = ([x, y]: P): P => [HX + x * SK, HY + y * SK];
const lerp2 = (a: P, b: P, u: number): P => [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];

function keys(): Array<[number, string]> {
  return [
    [0, "pull"],
    [S(L, "b1") + 0.2, "ok"],
    [S(L, "c1") + 0.1, "front"],
    [S(L, "c2") + 0.1, "back"],
    [at("c2", "überholt"), "backFar"],
    [S(L, "d1") + 0.1, "ok"],
  ];
}
function personAt(t: number): P {
  const k = keys();
  let p = POS[k[0][1]];
  for (let i = 1; i < k.length; i++) {
    const u = sm(Math.min(1, Math.max(0, (t - k[i][0]) / 0.8)));
    if (u > 0) p = lerp2(p, POS[k[i][1]], u);
  }
  return p;
}

function Person({ p, step, lean = 0 }: { p: P; step: number; lean?: number }) {
  const [x, y] = toS(p);
  const f = Math.sin(step * Math.PI * 2) * 4;
  return (
    <g transform={`translate(${x} ${y}) scale(${SK}) rotate(${lean})`}>
      <ellipse cx="2" cy="1" rx="9" ry="12" fill="#000" opacity=".1" />
      <ellipse cx={f} cy="-4" rx="4" ry="2.4" fill="#3E2C22" />
      <ellipse cx={-f} cy="4" rx="4" ry="2.4" fill="#3E2C22" />
      <path d="M0 6 L6 9" stroke="#2F5B3F" strokeWidth="3.2" strokeLinecap="round" />
      <ellipse cx="0" cy="0" rx="5" ry="10" fill="#2F5B3F" />
      <circle cx="1" cy="0" r="4.6" fill="#6B4A32" />
      <circle cx="6" cy="9" r="1.8" fill="#E9B48F" />
    </g>
  );
}

export function renderFuehren(t: number) {
  const stopT = S(L, "e1") + 0.2;
  const stopU = Math.min(1, Math.max(0, (t - stopT) / 0.8));
  // Weg-Fortschritt (verlangsamt beim Anhalten, ab f1 wieder langsam)
  const v = (tt: number) => (tt < stopT ? tt : stopT + (1 - Math.pow(1 - Math.min(1, (tt - stopT) / 0.8), 2)) * 0.4);
  const prog = v(t);
  const step = prog * 1.1;
  const pp = personAt(t);
  const scene = (id: string, a: string, b?: string) => win(t, S(L, a) - 0.1, b ? S(L, b) - 0.1 : E(L, a) + 0.3, 0.25) > 0.5 && id;
  const isBad = t < S(L, "b1") || (t > S(L, "c1") && t < S(L, "d1"));
  const taut = t < S(L, "b1") + 0.4 || (t > S(L, "c1") && t < S(L, "c2"));
  // Strick: Hand (Person) → Halfter
  const hand = toS([pp[0] + 6, pp[1] + 9]);
  const halter: P = toS([56, 6]);
  const sag = taut ? 0 : 40;
  const midX = (hand[0] + halter[0]) / 2;
  const midY = (hand[1] + halter[1]) / 2 + sag;
  const handClose = win(t, S(L, "d2") - 0.1, S(L, "e1") - 0.1, 0.3);
  const ropeCol = isBad && taut ? COL.rust : "#7A4E2D";
  void scene;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      {/* Stallweg */}
      <rect x={0} y={640} width={W} height={160} fill="#9DB07E" />
      <rect x={0} y={800} width={W} height={520} fill="#E4D3B4" />
      <rect x={0} y={1320} width={W} height={120} fill="#9DB07E" />
      {Array.from({ length: 30 }, (_, i) => {
        const x = ((i * 137 - prog * 230) % 1300 + 1300) % 1300 - 110;
        return <ellipse key={i} cx={x} cy={830 + ((i * 89) % 470)} rx="9" ry="4" fill="#C9B48F" />;
      })}
      {Array.from({ length: 8 }, (_, i) => {
        const x = ((i * 180 - prog * 230) % 1440 + 1440) % 1440 - 120;
        return (
          <g key={i}>
            <rect x={x - 12} y={772} width="24" height="24" rx="4" fill="#8B6A4A" />
            <rect x={x - 12} y={1324} width="24" height="24" rx="4" fill="#8B6A4A" />
          </g>
        );
      })}
      <rect x={0} y={780} width={W} height="8" fill="#A9845E" />
      <rect x={0} y={1332} width={W} height="8" fill="#A9845E" />
      <T x={60} y={740} size={26} font={FONT_BODY} weight={800} color="#4E6138" anchor="start">links vom Pferd ↑</T>

      {/* Blickkegel von hinten */}
      {(() => {
        const o = win(t, at("c2", "siehst") - 0.2, S(L, "d1") - 0.1, 0.3);
        if (o < 0.01) return null;
        const [x, y] = toS(pp);
        return (
          <g opacity={o}>
            <path d={`M${x} ${y} L${x + 520} ${y - 170} L${x + 520} ${y + 60} Z`} fill={COL.honey} opacity=".25" />
          </g>
        );
      })()}
      {/* Strick hinter dem Pferd zeichnen? → davor, damit sichtbar */}
      <TopHorse at={[HX, HY]} ang={0} look={LOOKS.tivoli} step={step} s={SK} noRider poll={0} bend={t > S(L, "c1") && t < S(L, "c2") ? -4 : 0} />
      <path d={`M${hand[0]} ${hand[1]} Q${midX} ${midY} ${halter[0]} ${halter[1]}`} stroke={ropeCol} strokeWidth="9" fill="none" strokeLinecap="round" />
      <Person p={pp} step={t < stopT ? step : prog * 1.1} lean={taut && t < S(L, "b1") ? -8 : 0} />

      {/* Markierungen je Szene */}
      {(() => {
        const [x, y] = toS(pp);
        const okO = win(t, S(L, "b1") + 0.6, S(L, "c1") - 0.1) + win(t, S(L, "d1") + 0.6, 99);
        const badO = win(t, S(L, "c1") + 0.6, S(L, "d1") - 0.1);
        return (
          <g>
            {okO > 0.01 && <g opacity={Math.min(1, okO)}><Mark x={x} y={y - 120} ok k={back((t - S(L, "b1") - 0.6) / 0.4)} /></g>}
            {badO > 0.01 && <g opacity={badO}><Mark x={Math.min(1000, x)} y={y - 120} ok={false} /></g>}
          </g>
        );
      })()}
      {/* Hook: Zugpfeil nach vorn */}
      <g opacity={win(t, 0.2, S(L, "b1"))}>
        <path d={`M${HX + 300} ${HY} l90 0 m-26 -22 l26 22 l-26 22`} stroke={COL.rust} strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* vorn: Gegeneinander-Pfeile */}
      <g opacity={win(t, S(L, "c1") + 0.5, S(L, "c2") - 0.1)}>
        <path d={`M${toS(POS.front)[0] + 40} ${toS(POS.front)[1] + 110} l70 0 m-22 -18 l22 18 l-22 18`} stroke={COL.rust} strokeWidth="11" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d={`M${HX + 60} ${HY + 150} l-90 0 m22 -18 l-22 18 l22 18`} stroke={COL.rust} strokeWidth="11" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <Pop t={t} a={at("c1", "zieht")} x={HX + 40} y={HY + 230} text="zieht dagegen" fill={COL.rust} size={30} />
      </g>
      {/* hinten: Fragezeichen am Kopf */}
      <g opacity={win(t, at("c2", "siehst"), S(L, "d1") - 0.1)}>
        <circle cx={HX + 62 * SK} cy={HY - 70} r="46" fill={COL.rust} />
        <T x={HX + 62 * SK} y={HY - 50} size={60} color={PAPER}>?</T>
        <Pop t={t} a={at("c2", "überholt")} x={HX + 60} y={HY + 230} text="überholt dich" fill={COL.rust} size={30} />
      </g>
      {/* ok-Beschriftung */}
      <Pop t={t} a={S(L, "b1") + 0.9} x={HX + 40} y={HY + 230} text="links · Höhe Kopf/Schulter" fill={COL.forest} size={32} o={win(t, S(L, "b1") + 0.9, S(L, "c1") - 0.1)} />
      <Pop t={t} a={S(L, "d1") + 0.4} x={HX + 40} y={HY + 230} text="Strick locker · etwas Abstand" fill={COL.forest} size={32} o={win(t, S(L, "d1") + 0.4, S(L, "e1") - 0.1)} />
      {/* Stopp */}
      <g opacity={win(t, stopT, S(L, "f1"))}>
        <g transform={`translate(${HX + 40} ${HY + 240}) scale(${back((t - stopT) / 0.4)})`}>
          <rect x={-250} y={-40} width={500} height={80} rx="40" fill={COL.forestDeep} />
          <T x={0} y={12} size={36} font={FONT_BODY} weight={800} color={PAPER}>✋ Stopp – beide halten</T>
        </g>
        <Pop t={t} a={at("e1", "üben")} x={540} y={1500} text="kann man üben 💪" fill={COL.honey} color={COL.forestDeep} size={34} />
      </g>
      {/* Nahaufnahme Hand */}
      {handClose > 0.01 && (
        <g opacity={handClose}>
          <rect x={0} y={0} width={W} height={H} fill={COL.bg} opacity=".86" />
          <g transform={`translate(540 1020) scale(${0.8 + 0.2 * ease((t - S(L, "d2") + 0.1) / 0.4)})`}>
            <rect x={-360} y={-260} width={720} height={520} rx="44" fill={PAPER} />
            <path d="M-300 40 C-160 40 -120 -20 -40 -10" stroke="#7A4E2D" strokeWidth="18" fill="none" strokeLinecap="round" />
            {/* Hand */}
            <path d="M-60 -70 Q40 -110 110 -60 Q150 -20 120 40 Q80 90 -20 80 Q-80 70 -90 10 Q-95 -40 -60 -70 Z" fill="#E9B48F" stroke="#B9835E" strokeWidth="5" />
            {/* Schlaufe um die Hand */}
            <path d="M-40 -10 C40 -90 160 -60 120 0 C90 60 -20 70 -10 0 C0 -60 120 -40 140 30 L260 120" stroke="#7A4E2D" strokeWidth="18" fill="none" strokeLinecap="round" />
            <g opacity={ease((t - S(L, "d2") - 0.6) / 0.3)}>
              <path d="M-200 -170 L220 190 M220 -170 L-200 190" stroke={COL.rust} strokeWidth="26" strokeLinecap="round" />
            </g>
            <T x={0} y={230} size={36} font={FONT_BODY} weight={800} color={COL.rust}>nie um die Hand wickeln</T>
          </g>
        </g>
      )}
      {/* Ende */}
      <g opacity={win(t, S(L, "f1") - 0.1, 99, 0.3)}>
        <rect x={0} y={0} width={W} height={H} fill={COL.bg} opacity=".55" />
        <g transform={`translate(540 1500) scale(${back((t - S(L, "f2")) / 0.5)})`}>
          <rect x={-420} y={-70} width={840} height={140} rx="40" fill={COL.honey} />
          <T x={0} y={-6} size={44} color={COL.forestDeep}>📌 Speichern</T>
          <T x={0} y={44} size={28} font={FONT_BODY} weight={800} color={COL.forestDeep}>& beim nächsten Stallbesuch testen</T>
        </g>
        <Brand t={t} a={S(L, "f2") + 1.2} y={1660} />
      </g>
      <Header t={t} label="Die Hofgeschichten · Stallwissen" hide={win(t, 0, E(L, "a2") + 0.2)} />
      <HookText t={t} end={E(L, "a2") + 0.2} y0={300} lines={[
        { text: "Dein Pferd ZIEHT", at: -0.9, hi: true, size: 84 },
        { text: "beim Führen?", at: 0.6, size: 80 },
      ]} />
      <Title t={t} a={S(L, "b1")} b={S(L, "c1") - 0.1} top="Hier läufst du richtig" sub="links · etwa auf Höhe von Kopf und Schulter" color={COL.forest} y={400} />
      <Title t={t} a={S(L, "c1")} b={S(L, "c2") - 0.1} top="Zu weit vorn" sub="du ziehst – dein Pferd zieht dagegen" color={COL.rust} y={400} />
      <Title t={t} a={S(L, "c2")} b={S(L, "d1") - 0.1} top="Zu weit hinten" sub="es überholt dich – du siehst nicht, was es vorhat" color={COL.rust} y={400} />
      <Title t={t} a={S(L, "d1")} b={S(L, "e1") - 0.1} top="Strick locker" sub="etwas Abstand · nie um die Hand" color={COL.forest} y={400} />
      <Title t={t} a={S(L, "e1")} b={S(L, "f1") - 0.1} top="Du hältst – es hält" sub="das kann man üben" color={COL.forest} y={400} />
      <Title t={t} a={S(L, "f1")} b={99} top="Wie führst du?" sub="Speichern & testen" color={COL.forestDeep} y={400} />
      <Caption t={t} lines={L} skip={["a1", "f1", "f2"]} y={1700} />
    </svg>
  );
}
