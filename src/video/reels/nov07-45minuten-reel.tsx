import { HomeScreen, LessonScreen } from "./nov-akademie";
import { Brand, COL, Caption, E, FONT_BODY, Header, HookText, PAPER, Phone, Pop, S, T, Title, W, H, back, ease, lerp, mkLines, sm, win, wordAt } from "./nov-kit";

/* November 07 (9:16, Verkauf): „Deine Reitstunde dauert 45 Minuten“ – Uhr (45 min) → Wochenkalender
   (Reitstunde 45 min, Rest der Woche 167 Std. 15 Min.) → Smartphone mit echten Inhalten der Reitakademie
   (Startseite + Lektionen aus Reiten lernen, Reiterhilfen, Bahnfiguren) → Einmalig 19,90 €, kein Abo.
   Ergänzung zum Reitunterricht, kein Ersatz. */

const REC: Array<[string, string, number, number]> = [
  ["a", "45 Minuten Reitunterricht.", 0, 2.31],
  ["b", "Du lernst neue Hilfen, Bahnfiguren und Bewegungsabläufe.", 2.75, 6.53],
  ["c", "Und dann?", 6.93, 7.42],
  ["d", "Bis zur nächsten Reitstunde vergeht oft eine ganze Woche.", 7.75, 10.76],
  ["e", "Aber Reiten verstehen kannst du auch zwischen deinen Reitstunden.", 11.09, 14.25],
  ["f", "Mit der Hofgeschichten Reitakademie kannst du die Grundlagen jederzeit wiederholen.", 14.56, 18.76],
  ["g", "Du lernst in deinem eigenen Tempo, verstehst Zusammenhänge und kannst dich auf deine nächste Reitstunde vorbereiten.", 19.08, 25.37],
  ["h", "Einmalig 19,90 Euro. Kein Abo.", 25.65, 28.7],
  ["i", "Entdecke jetzt unsere digitale Reitakademie!", 28.99, 31.76],
];
export const N07_LINES = mkLines(REC);
const L = N07_LINES;
export const N07_TOTAL = E(L, "i") + 2.6;
const at = (id: string, w: string) => wordAt(L, id, w);

/* ---------- Uhr ---------- */
function Clock({ t, cx, cy, r }: { t: number; cx: number; cy: number; r: number }) {
  const u = sm((t - 0.2) / 2.3) * 0.75;
  const a0 = -Math.PI / 2;
  const a1 = a0 + u * Math.PI * 2;
  const large = u > 0.5 ? 1 : 0;
  const pie = u > 0.001 ? `M${cx} ${cy} L${cx} ${cy - r + 24} A${r - 24} ${r - 24} 0 ${large} 1 ${cx + (r - 24) * Math.cos(a1)} ${cy + (r - 24) * Math.sin(a1)} Z` : "";
  return (
    <g>
      <circle cx={cx} cy={cy} r={r + 14} fill={COL.forest} />
      <circle cx={cx} cy={cy} r={r} fill={PAPER} />
      <path d={pie} fill={COL.honey} opacity=".85" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return <path key={i} d={`M${cx + Math.cos(a) * (r - 10)} ${cy + Math.sin(a) * (r - 10)} L${cx + Math.cos(a) * (r - (i % 3 ? 30 : 46))} ${cy + Math.sin(a) * (r - (i % 3 ? 30 : 46))}`} stroke={COL.forestDeep} strokeWidth={i % 3 ? 5 : 9} strokeLinecap="round" />;
      })}
      <path d={`M${cx} ${cy} L${cx + Math.cos(a1) * (r - 60)} ${cy + Math.sin(a1) * (r - 60)}`} stroke={COL.rust} strokeWidth="12" strokeLinecap="round" />
      <path d={`M${cx} ${cy} L${cx} ${cy - r * 0.45}`} stroke={COL.forestDeep} strokeWidth="16" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="18" fill={COL.forestDeep} />
      <T x={cx} y={cy + r * 0.55} size={64} color={COL.forestDeep}>{`${Math.round((u / 0.75) * 45)} min`}</T>
    </g>
  );
}

/* ---------- Wochenkalender ---------- */
const DAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
function Week({ t }: { t: number }) {
  const x0 = 110, y0 = 560, cw = 124, ch = 700;
  const fill = sm((t - S(L, "d") - 0.3) / 2.6);
  const lesson = { d: 2, h: 17 };
  const dots = win(t, S(L, "e") + 0.3, E(L, "e") + 0.4);
  return (
    <g>
      {DAYS.map((d, i) => (
        <g key={d}>
          <T x={x0 + i * cw + cw / 2} y={y0 - 20} size={34} font={FONT_BODY} weight={700} color={COL.forestDeep}>{d}</T>
          <rect x={x0 + i * cw + 6} y={y0} width={cw - 12} height={ch} rx="16" fill={PAPER} stroke={COL.sand} strokeWidth="3" />
          {/* restliche Zeit füllt sich */}
          <rect x={x0 + i * cw + 6} y={y0} width={cw - 12} height={ch * Math.min(1, Math.max(0, fill * 7 - i))} rx="16" fill={COL.sandLight} />
        </g>
      ))}
      {/* Reitstunde Mi 17:00–17:45 */}
      {(() => {
        const k = back((t - S(L, "c") - 0.1) / 0.45);
        const y = y0 + (lesson.h / 24) * ch;
        return (
          <g opacity={Math.min(1, Math.max(0, k))}>
            <rect x={x0 + lesson.d * cw} y={y - 6} width={cw} height={(0.75 / 24) * ch + 12} rx="6" fill={COL.rust} />
            <Pop t={t} a={S(L, "c") + 0.2} x={x0 + lesson.d * cw + cw / 2} y={y - 40} text="45 min Reitstunde" fill={COL.rust} size={28} />
          </g>
        );
      })()}
      {dots > 0.01 && (
        <g opacity={dots}>
          {[[0, 19], [1, 7], [3, 20], [4, 13], [5, 10], [6, 18]].map(([d, h], i) => {
            const k = back((t - S(L, "e") - 0.4 - i * 0.22) / 0.4);
            if (k <= 0.01) return null;
            const cx = x0 + d * cw + cw / 2;
            const cy = y0 + (h / 24) * ch;
            return (
              <g key={i} transform={`translate(${cx} ${cy}) scale(${Math.max(0.01, k)})`}>
                <rect x={-22} y={-36} width={44} height={72} rx="10" fill={COL.forest} />
                <rect x={-15} y={-26} width={30} height={46} rx="4" fill={COL.sage} />
              </g>
            );
          })}
        </g>
      )}
    </g>
  );
}

export function renderN07(t: number) {
  const clockO = 1 - sm((t - S(L, "c") + 0.15) / 0.4);
  const weekO = sm((t - S(L, "c") + 0.15) / 0.4) * (1 - sm((t - S(L, "f") + 0.2) / 0.5));
  const phoneIn = sm((t - S(L, "f") + 0.2) / 0.8);
  const priceA = S(L, "h") - 0.2;
  const phoneO = phoneIn * (1 - sm((t - priceA) / 0.5));
  const f0 = S(L, "f") + 1.6;
  const screens = [f0, f0 + 2.2, f0 + 4.4, f0 + 6.6];
  const screen = t < screens[0] ? "home" : t < screens[1] ? "gang" : t < screens[2] ? "hilfen" : "bahn";
  const scroll = screen === "home" ? 200 * sm((t - S(L, "f") - 0.3) / 1.4) : 0;
  const flash = Math.max(0, 1 - Math.min(...screens.map((a) => Math.abs(t - a))) / 0.18);
  const py = lerp(1700, 520, phoneIn);
  const priceO = win(t, priceA, N07_TOTAL + 1);
  const hookO = win(t, 0, E(L, "a") + 0.2);
  const hideHead = Math.max(hookO, priceO);
  const remain = sm((t - S(L, "d") - 0.3) / 2.6);
  const hrs = Math.floor(167.25 * remain);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      {clockO > 0.01 && (
        <g opacity={clockO}>
          <Clock t={t} cx={540} cy={960} r={290} />
          <g opacity={ease((t - 1.6) / 0.4)}>
            <rect x={110} y={1300} width={860} height={110} rx="55" fill={COL.forest} />
            <T x={540} y={1374} size={50} color={PAPER}>45 MINUTEN REITUNTERRICHT</T>
          </g>
          <Pop t={t} a={at("b", "Hilfen") - 0.05} x={200} y={620} text="Hilfen" fill={COL.rust} size={36} o={win(t, S(L, "b"), E(L, "b") + 0.4)} />
          <Pop t={t} a={at("b", "Bahnfiguren") - 0.05} x={870} y={640} text="Bahnfiguren" fill={COL.rust} size={36} o={win(t, S(L, "b"), E(L, "b") + 0.4)} />
          <Pop t={t} a={at("b", "Bewegungsabläufe") - 0.05} x={540} y={1490} text="Bewegungsabläufe" fill={COL.rust} size={36} o={win(t, S(L, "b"), E(L, "b") + 0.4)} />
        </g>
      )}
      {weekO > 0.01 && (
        <g opacity={weekO}>
          <Week t={t} />
          <g opacity={win(t, S(L, "d") + 0.3, E(L, "d") + 0.2)}>
            <rect x={140} y={1300} width={800} height={130} rx="40" fill={COL.forestDeep} />
            <T x={540} y={1352} size={30} font={FONT_BODY} weight={700} color={COL.honey}>bis zur nächsten Reitstunde</T>
            <T x={540} y={1404} size={50} color={PAPER}>{`${hrs} Std. ${hrs >= 167 ? "15 Min." : ""}`}</T>
          </g>
          <g opacity={win(t, S(L, "e"), E(L, "e") + 0.2)}>
            <rect x={110} y={1300} width={860} height={130} rx="40" fill={COL.forest} />
            <T x={540} y={1382} size={48} color={PAPER}>REITEN VERSTEHEN – JEDERZEIT</T>
          </g>
        </g>
      )}
      {phoneO > 0.01 && (
        <g opacity={phoneO}>
          <Phone x={300} y={py} w={520} id="n07">
            <g transform={`translate(316 ${py + 16})`}>
              {screen === "home" ? <HomeScreen scroll={scroll} /> : <LessonScreen which={screen} />}
              <rect width={488} height={1034} fill={PAPER} opacity={flash * 0.7} />
            </g>
          </Phone>
          <Pop t={t} a={screens[0]} x={150} y={700} text="Reiten lernen" fill={COL.forest} size={28} o={win(t, S(L, "f"), E(L, "g"))} />
          <Pop t={t} a={screens[1]} x={150} y={820} text="Reiterhilfen" fill={COL.forest} size={28} o={win(t, S(L, "f"), E(L, "g"))} />
          <Pop t={t} a={screens[2]} x={150} y={940} text="Bahnfiguren" fill={COL.forest} size={28} o={win(t, S(L, "f"), E(L, "g"))} />
          <Pop t={t} a={at("g", "Tempo") - 0.2} x={940} y={720} text="eigenes Tempo" fill={COL.honey} color={COL.forestDeep} size={26} o={win(t, S(L, "g"), E(L, "g"))} />
          <Pop t={t} a={at("g", "Zusammenhänge") - 0.2} x={940} y={840} text="Zusammenhänge" fill={COL.honey} color={COL.forestDeep} size={26} o={win(t, S(L, "g"), E(L, "g"))} />
          <Pop t={t} a={at("g", "vorbereiten") - 0.5} x={940} y={960} text="gut vorbereitet" fill={COL.honey} color={COL.forestDeep} size={26} o={win(t, S(L, "g"), E(L, "g"))} />
        </g>
      )}
      {priceO > 0 && (
        <g opacity={priceO}>
          {(() => {
            const k = back((t - priceA) / 0.5);
            return (
              <g opacity={Math.min(1, k)} transform={`translate(540 560) scale(${Math.max(0.01, k)}) translate(-540 -560)`}>
                <rect x={140} y={340} width={800} height={420} rx="48" fill={COL.forest} />
                <T x={540} y={450} size={46} font={FONT_BODY} weight={700} color={COL.honey}>EINMALIG</T>
                <T x={540} y={620} size={170} color={PAPER}>19,90 €</T>
                <T x={540} y={710} size={36} font={FONT_BODY} weight={700} color={COL.sand}>Hofgeschichten Reitakademie</T>
              </g>
            );
          })()}
          {(() => {
            const k = back((t - at("h", "Kein")) / 0.4);
            if (k <= 0.01) return null;
            return (
              <g opacity={Math.min(1, k)} transform={`translate(800 820) rotate(-8) scale(${Math.max(0.01, k)})`}>
                <rect x={-170} y={-60} width={340} height={120} rx="24" fill={COL.rust} />
                <T x={0} y={22} size={64} color={PAPER}>KEIN ABO</T>
              </g>
            );
          })()}
          <g opacity={ease((t - S(L, "i") + 0.1) / 0.4)}>
            <T x={540} y={1000} size={44} color={COL.forestDeep}>Entdecke die Hofgeschichten</T>
            <T x={540} y={1062} size={44} color={COL.forestDeep}>Reitakademie – Link im Profil</T>
            <T x={540} y={1130} size={30} font={FONT_BODY} weight={700} color={COL.inkSoft}>Ergänzung zum Reitunterricht – kein Ersatz</T>
          </g>
          <Brand t={t} a={S(L, "i") + 0.5} sub="Reitakademie · Link im Profil" y={1230} />
        </g>
      )}

      <Header t={t} label="Die Hofgeschichten · Reitakademie" hide={hideHead} />
      <HookText t={t} end={E(L, "a") + 0.2} size={72} gap={92} y0={240} lines={[
        { text: "Deine Reitstunde dauert 45 Minuten.", at: -0.9, size: 60 },
        { text: "Aber was ist mit den anderen", at: 0.5, size: 62 },
        { text: "167 Stunden der Woche?", at: 1.1, hi: true },
      ]} />
      <Title t={t} a={S(L, "b")} b={E(L, "b")} top="In der Reitstunde" sub="lernst du neue Hilfen, Bahnfiguren und Abläufe" />
      {win(t, S(L, "c") - 0.1, E(L, "c") + 0.4) > 0 && (
        <g opacity={win(t, S(L, "c") - 0.1, E(L, "c") + 0.4)} transform={`translate(540 330) scale(${Math.max(0.01, Math.min(1.05, back((t - S(L, "c") + 0.1) / 0.4)))}) translate(-540 -330)`}>
          <T x={540} y={360} size={120} color={COL.rust}>UND DANACH?</T>
        </g>
      )}
      <Title t={t} a={E(L, "c") + 0.4} b={E(L, "d")} top="Bis zur nächsten Stunde" sub="vergeht oft eine ganze Woche" />
      <Title t={t} a={S(L, "e")} b={E(L, "e")} top="Reiten verstehen" sub="auch zwischen deinen Reitstunden" color={COL.forest} />
      <Title t={t} a={S(L, "f")} b={E(L, "f")} top="Grundlagen jederzeit wiederholen" sub="echte Lektionen aus der Reitakademie" y={250} />
      <Title t={t} a={S(L, "g")} b={E(L, "g")} top="In deinem eigenen Tempo" sub="und vorbereitet in die nächste Reitstunde" color={COL.forest} y={250} />
      <Caption t={t} lines={L} skip={["c", "h", "i"]} y={1610} />
    </svg>
  );
}
