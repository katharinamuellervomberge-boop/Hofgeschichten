import type { ReactNode } from "react";
import { renderFuss } from "./fuss-reel";
import { renderHilfen } from "./hilfen-reel";
import { renderHilfenEn } from "./hilfen-reel-en";
import { COL, Caption, E, FONT_BODY, FONT_DISPLAY, PAPER, S, T, W, H, back, clamp01, ease, seq, sm, win, type VLine } from "./rkit";

/* Werbe-Ad Reitakademie (9:16, ~26 s), Deutsch + Englisch. Zielgruppe: Eltern.
   Hook (Schmerzpunkt) → Reitlehrer-Sprüche → Akademie im Handy → Umfang → Lernwege → Preis → CTA. */

type Lang = "de" | "en";

const TX = {
  de: {
    lines: [
      ["hook", "Dein Kind reitet – aber versteht es auch, was es da tut?", 3.6],
      ["problem", "„Mehr Bein!“, „Falscher Fuß!“ – in der Reitstunde bleibt kaum Zeit zum Erklären.", 4.6],
      ["loesung", "Die Reitakademie erklärt alles, Schritt für Schritt: mit Lernvideos, Bildern und Quiz.", 5.2],
      ["umfang", "Neun Module, einundachtzig Lektionen – vom ersten Putzen bis zum Springen.", 4.4],
      ["wege", "Für Kinder, Teens und Erwachsene.", 2.4],
      ["preis", "Einmal 19,90 Euro, kein Abo. Und in jedem Modul ist eine Probelektion gratis.", 5.0],
      ["cta", "Link in der Bio – probier’s aus!", 2.4],
    ] as Array<[string, string, number]>,
    header: "Die Hofgeschichten · Reitakademie",
    hook: ["Dein Kind reitet –", "aber versteht es,", "was es da tut?"],
    shouts: ["Mehr Bein!", "Falscher Fuß!", "Hände ruhig!", "Schulter raus!", "Nicht ziehen!"],
    problemTitle: "Kaum Zeit zum Erklären",
    solTop: "Die Reitakademie",
    solSub: "erklärt alles – Schritt für Schritt",
    feats: [["Lernvideos", "Lernvideos"], ["Bilder", "Bildern"], ["Quiz", "Quiz"]] as Array<[string, string]>,
    quizQ: "Wann treibst du beim Leichttraben?",
    quizA: ["beim Aufstehen", "beim Hinsetzen", "immer"],
    modules: ["Pferde verstehen", "Umgang mit Pferden", "Reiten lernen", "Reiterhilfen", "Bahnfiguren", "Besser reiten", "Dressur", "Springen", "Abschluss + Zertifikat"],
    stat1: "Module",
    stat2: "Lektionen",
    range: "vom Putzen bis zum Springen",
    ways: [["Kids", "6–11"], ["Teens", "12–17"], ["Erwachsene", "ab 18"]] as Array<[string, string]>,
    waysTitle: "Für jedes Alter",
    price: "19,90 €",
    priceSub: "einmalig · kein Abo",
    trial: "In jedem Modul: 1 Probelektion gratis",
    ctaTop: "Jetzt gratis testen",
    ctaSub: "Link in der Bio",
    lesson: "LERNVIDEO",
    words: { umfang: "einundachtzig", preis: "Probelektion", ways: ["Kindern", "Teens", "Erwachsene"] },
  },
  en: {
    lines: [
      ["hook", "Your child rides – but do they really understand what they're doing?", 3.8],
      ["problem", "“More leg!” “Wrong diagonal!” – there's hardly time to explain in a riding lesson.", 4.6],
      ["loesung", "The Riding Academy explains everything, step by step: with animations, pictures and quizzes.", 5.4],
      ["umfang", "Nine modules, eighty-one lessons – from grooming to jumping.", 3.8],
      ["wege", "For kids, teens and adults.", 2.2],
      ["preis", "19.90 euros, once. No subscription. And every module has a free trial lesson.", 5.0],
      ["cta", "Link in bio – try it now!", 2.2],
    ] as Array<[string, string, number]>,
    header: "Hofgeschichten · Riding Academy",
    hook: ["Your child rides –", "but do they get", "what they’re doing?"],
    shouts: ["More leg!", "Wrong diagonal!", "Quiet hands!", "Mind the shoulder!", "Don’t pull!"],
    problemTitle: "No time to explain",
    solTop: "The Riding Academy",
    solSub: "explains everything – step by step",
    feats: [["Animations", "animations"], ["Pictures", "pictures"], ["Quizzes", "quizzes"]] as Array<[string, string]>,
    quizQ: "When do you use your legs in rising trot?",
    quizA: ["when you rise", "when you sit", "all the time"],
    modules: ["Understanding horses", "Handling horses", "Learning to ride", "Riding aids", "School figures", "Riding better", "Dressage", "Jumping", "Final test"],
    stat1: "modules",
    stat2: "lessons",
    range: "from grooming to jumping",
    ways: [["Kids", "6–11"], ["Teens", "12–17"], ["Adults", "18+"]] as Array<[string, string]>,
    waysTitle: "For every age",
    price: "€19.90",
    priceSub: "one-time · no subscription",
    trial: "Every module: 1 free trial lesson",
    ctaTop: "Try it free now",
    ctaSub: "Link in bio",
    lesson: "LESSON",
    words: { umfang: "eighty-one", preis: "free trial", ways: ["kids", "teens", "adults"] },
  },
};

/** Echte Aufnahmezeiten [Start, Ende] je Satz + Wortmarken (Jessica v4); ohne Eintrag: Schätzung */
const VO = 0.4;
const REC: Record<Lang, { lines?: Record<string, [number, number]>; marks?: Record<string, number> }> = {
  de: {
    lines: { hook: [0, 3.74], problem: [4.12, 9.13], loesung: [9.48, 15.01], umfang: [15.34, 19.97], wege: [20.26, 22.25], preis: [22.54, 27.89], cta: [28.19, 30.2] },
    marks: { "loesung|Lernvideos": 13.0, "loesung|Bildern": 13.85, "loesung|Quiz": 14.55, "umfang|einundachtzig": 16.2, "wege|Kindern": 20.55, "wege|Teens": 21.15, "wege|Erwachsene": 21.6, "preis|Probelektion": 26.6 },
  },
  en: {},
};
function make(lang: Lang) {
  const x = TX[lang];
  const rec = REC[lang];
  const L: VLine[] = rec.lines
    ? x.lines.map(([id, text]) => ({ id, text, start: rec.lines![id][0] + VO, dur: rec.lines![id][1] - rec.lines![id][0] }))
    : seq(x.lines, 0.4, 0.35);
  const at = (id: string, word: string) => {
    const m = rec.marks?.[`${id}|${word}`];
    if (m !== undefined) return m + VO;
    const l = L.find((q) => q.id === id)!;
    const i = Math.max(0, l.text.indexOf(word));
    return l.start + (l.dur * i) / l.text.length;
  };
  return { x, L, at, total: E(L, "cta") + 2.4 };
}
const DE = make("de");
const EN = make("en");
export const AD_LINES_DE = DE.L;
export const AD_LINES_EN = EN.L;
export const AD_TOTAL_DE = DE.total;
export const AD_TOTAL_EN = EN.total;

/* ---------- Bausteine ---------- */

function Header({ t, label, hide }: { t: number; label: string; hide: number }) {
  const w = label.length * 16.2 + 90;
  return (
    <g transform="translate(60 92)" opacity={(1 - hide) * ease((t + 0.3) / 0.4)}>
      <rect width={w} height="64" rx="32" fill={COL.forest} />
      <path d="M30 44v-15a10 10 0 0 1 20 0v15" fill="none" stroke={COL.sand} strokeWidth="5.5" strokeLinecap="round" />
      <text x="66" y="43" fontFamily={FONT_BODY} fontSize="30" fontWeight="700" fill={PAPER}>{label}</text>
    </g>
  );
}

/** Handy mit Inhalt (Inhalt im 1080×1920-Koordinatensystem) */
const PH = { x: 250, y: 560, w: 580, h: 1031 };
function Phone({ o, dy, children }: { o: number; dy: number; children: ReactNode }) {
  if (o <= 0) return null;
  const { x, y, w, h } = PH;
  return (
    <g opacity={o} transform={`translate(0 ${dy})`}>
      <rect x={x - 26} y={y - 26} width={w + 52} height={h + 52} rx="74" fill="#1F2A24" />
      <rect x={x - 26} y={y - 26} width={w + 52} height={h + 52} rx="74" fill="none" stroke="#3A4A40" strokeWidth="4" />
      <defs>
        <clipPath id="ad-screen">
          <rect x={x} y={y} width={w} height={h} rx="52" />
        </clipPath>
      </defs>
      <g clipPath="url(#ad-screen)">
        <rect x={x} y={y} width={w} height={h} fill={COL.bg} />
        <svg x={x} y={y} width={w} height={h} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice">
          {children}
        </svg>
      </g>
      <rect x={x + w / 2 - 80} y={y + 16} width={160} height={36} rx="18" fill="#1F2A24" />
    </g>
  );
}

function QuizScreen({ t, a, x }: { t: number; a: number; x: (typeof TX)["de"] }) {
  const pick = ease((t - a - 1.1) / 0.3);
  return (
    <g>
      <rect width={W} height={H} fill={COL.bg} />
      <rect x={60} y={140} width={300} height={70} rx="35" fill={COL.rust} />
      <T x={210} y={188} size={36} font={FONT_BODY} weight={700} color={PAPER}>QUIZ · 3 / 5</T>
      <foreignObject x={80} y={300} width={920} height={360}>
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 84, lineHeight: 1.12, color: COL.forestDeep }}>{x.quizQ}</div>
      </foreignObject>
      {x.quizA.map((ans, i) => {
        const right = i === 1;
        const k = ease((t - a - 0.2 - i * 0.15) / 0.3);
        const fill = pick > 0.5 && right ? COL.forest : PAPER;
        return (
          <g key={ans} opacity={k} transform={`translate(${(1 - k) * 60} 0)`}>
            <rect x={80} y={760 + i * 220} width={920} height={170} rx="85" fill={fill} stroke={right && pick > 0.5 ? COL.forest : COL.sand} strokeWidth="6" />
            <T x={540} y={865 + i * 220} size={64} font={FONT_BODY} weight={700} color={pick > 0.5 && right ? PAPER : COL.forestDeep}>{(pick > 0.5 && right ? "✓ " : "") + ans}</T>
          </g>
        );
      })}
      {pick > 0 && (
        <g opacity={pick} transform={`translate(540 1560) scale(${Math.max(0.01, back((t - a - 1.1) / 0.4))})`}>
          <rect x={-300} y={-80} width={600} height={160} rx="80" fill={COL.honey} />
          <T x={0} y={26} size={72} color={COL.forestDeep}>{x === TX.de ? "Richtig!" : "Correct!"}</T>
        </g>
      )}
    </g>
  );
}

function ModuleScreen({ t, a, x }: { t: number; a: number; x: (typeof TX)["de"] }) {
  const scroll = 520 * sm((t - a - 0.6) / 3.0);
  return (
    <g>
      <rect width={W} height={H} fill={COL.bg} />
      <g transform={`translate(0 ${-scroll})`}>
        <T x={540} y={240} size={88}>{x.solTop}</T>
        {x.modules.map((m, i) => {
          const k = ease((t - a - i * 0.12) / 0.3);
          const done = (t - a) * 2.4 > i + 1;
          return (
            <g key={m} opacity={k} transform={`translate(${(1 - k) * 80} 0)`}>
              <rect x={70} y={330 + i * 190} width={940} height={160} rx="40" fill={PAPER} stroke={COL.sandLight} strokeWidth="4" />
              <circle cx={170} cy={410 + i * 190} r="52" fill={done ? COL.forest : COL.honey} />
              <T x={170} y={432 + i * 190} size={56} color={done ? PAPER : COL.forestDeep}>{done ? "✓" : String(i + 1)}</T>
              <T x={260} y={430 + i * 190} size={54} font={FONT_BODY} weight={700} color={COL.forestDeep} anchor="start">{m}</T>
            </g>
          );
        })}
      </g>
    </g>
  );
}

function LessonTag({ label }: { label: string }) {
  return (
    <g>
      <rect x={60} y={1730} width={420} height={110} rx="55" fill={COL.rust} />
      <T x={270} y={1805} size={56} font={FONT_BODY} weight={700} color={PAPER}>{`▶ ${label}`}</T>
    </g>
  );
}

function Count({ t, a, to, x, y, label, col }: { t: number; a: number; to: number; x: number; y: number; label: string; col: string }) {
  const k = ease((t - a) / 0.4);
  if (k <= 0) return null;
  const n = Math.round(to * sm((t - a) / 1.0));
  return (
    <g opacity={k} transform={`translate(${x} ${y + (1 - k) * 30})`}>
      <T x={0} y={0} size={150} color={col}>{String(n)}</T>
      <T x={0} y={60} size={44} font={FONT_BODY} weight={700} color={COL.inkSoft}>{label}</T>
    </g>
  );
}

/* ---------- Render ---------- */

function render(t: number, lang: Lang) {
  const { x, L, at, total } = lang === "de" ? DE : EN;
  const s = (id: string) => S(L, id);
  const e = (id: string) => E(L, id);
  const hookO = win(t, 0, e("hook") + 0.1, 0.3);
  const probO = win(t, s("problem") - 0.1, e("problem"), 0.3);
  const phoneO = win(t, s("loesung") - 0.1, e("umfang") + 0.1, 0.35);
  const phoneDy = (1 - ease((t - s("loesung") + 0.1) / 0.5)) * 500;
  const solO = win(t, s("loesung"), e("loesung"));
  const umO = win(t, s("umfang"), e("umfang"));
  const waysO = win(t, s("wege") - 0.05, e("wege") + 0.1);
  const priceO = win(t, s("preis") - 0.1, total + 1, 0.3);
  // Bildschirm-Wechsel im Handy
  const a0 = s("loesung") - 0.1;
  const seg = (e("loesung") - a0) / 3;
  let screen: ReactNode;
  if (t < a0 + seg) screen = <>{lang === "de" ? renderFuss(Math.min(30, 20.4 + (t - a0))) : renderHilfenEn(Math.min(15, 12.0 + (t - a0)))}<LessonTag label={x.lesson} /></>;
  else if (t < a0 + 2 * seg) screen = <>{lang === "de" ? renderHilfen(Math.min(30.5, 26.3 + (t - a0 - seg))) : renderHilfenEn(Math.min(29.5, 26.0 + (t - a0 - seg)))}<LessonTag label={x.lesson} /></>;
  else if (t < s("umfang") - 0.1) screen = <QuizScreen t={t} a={a0 + 2 * seg} x={x} />;
  else screen = <ModuleScreen t={t} a={s("umfang") - 0.1} x={x} />;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      {/* weiche Formen im Hintergrund */}
      <circle cx={940} cy={1700} r={380} fill={COL.sandLight} opacity=".5" />
      <circle cx={120} cy={520} r={260} fill={COL.sandLight} opacity=".4" />

      {/* 1 Hook: echtes Pferdefoto + Frage */}
      {hookO > 0 && (
        <g opacity={hookO}>
          <defs>
            <clipPath id="ad-photo">
              <circle cx={540} cy={1150} r={360} />
            </clipPath>
          </defs>
          <circle cx={540} cy={1150} r={384} fill={COL.honey} />
          <image href="/horses/tivoli-960.webp" x={540 - 420} y={1150 - 525 + 60} width={840} height={1050} preserveAspectRatio="xMidYMid slice" clipPath="url(#ad-photo)" transform={`scale(${1 + 0.04 * clamp01(t / 4)})`} style={{ transformOrigin: "540px 1150px" }} />
          {x.hook.map((line, i) => {
            const k = ease((t + 0.4 - i * 0.18) / 0.45);
            return (
              <g key={i} opacity={k} transform={`translate(0 ${(1 - k) * 40})`}>
                <T x={540} y={330 + i * 112} size={Math.min(96, 960 / (line.length * 0.52))} color={i === 2 ? COL.rust : COL.forestDeep}>{line}</T>
              </g>
            );
          })}
        </g>
      )}

      {/* 2 Problem: Reitlehrer-Sprüche */}
      {probO > 0 && (
        <g opacity={probO}>
          <g opacity={ease((t - s("problem") - 0.1) / 0.4)}>
            <T x={540} y={300} size={Math.min(88, 900 / (x.problemTitle.length * 0.53))}>{x.problemTitle}</T>
          </g>
          {x.shouts.map((sh, i) => {
            const pos: Array<[number, number, number]> = [[300, 640, -6], [760, 820, 5], [330, 1020, 4], [740, 1220, -5], [420, 1420, 3]];
            const [px, py, rot] = pos[i];
            const k = back((t - s("problem") - 0.15 - i * 0.42) / 0.4);
            if (k <= 0) return null;
            const wdt = sh.length * 34 + 90;
            const shake = 3 * Math.sin(t * 20 + i) * clamp01(1 - (t - s("problem") - i * 0.42) / 0.6);
            return (
              <g key={sh} transform={`translate(${px + shake} ${py}) rotate(${rot}) scale(${Math.max(0.01, k)})`}>
                <path d="M-40 50 l-30 50 l70 -40 Z" fill={i % 2 ? COL.forest : COL.rust} />
                <rect x={-wdt / 2} y={-62} width={wdt} height={124} rx="62" fill={i % 2 ? COL.forest : COL.rust} />
                <T x={0} y={20} size={60} color={PAPER}>{sh}</T>
              </g>
            );
          })}
          <g opacity={ease((t - s("problem") - 2.4) / 0.4)}>
            <T x={880} y={1560} size={220} color={COL.honey}>?</T>
          </g>
        </g>
      )}

      {/* 3 + 4 Akademie im Handy */}
      <Phone o={phoneO} dy={phoneDy}>{screen}</Phone>
      {solO > 0 && (
        <g opacity={solO}>
          <g opacity={ease((t - s("loesung")) / 0.4)}>
            <T x={540} y={300} size={Math.min(92, 900 / (x.solTop.length * 0.53))} color={COL.forest}>{x.solTop}</T>
            <T x={540} y={378} size={42} font={FONT_BODY} weight={700} color={COL.inkSoft}>{x.solSub}</T>
          </g>
          {x.feats.map(([label, word], i) => {
            const k = back((t - at("loesung", word)) / 0.4);
            if (k <= 0) return null;
            return (
              <g key={label} transform={`translate(${540 + (i - 1) * 300} 475) scale(${Math.max(0.01, k)})`}>
                <rect x={-135} y={-42} width={270} height={84} rx="42" fill={[COL.honey, COL.forest, COL.rust][i]} />
                <T x={0} y={13} size={38} font={FONT_BODY} weight={700} color={i === 0 ? COL.forestDeep : PAPER}>{label}</T>
              </g>
            );
          })}
        </g>
      )}
      {umO > 0 && (
        <g opacity={umO}>
          <Count t={t} a={s("umfang")} to={9} x={300} y={330} label={x.stat1} col={COL.forest} />
          <Count t={t} a={at("umfang", x.words.umfang) - 0.2} to={81} x={780} y={330} label={x.stat2} col={COL.rust} />
          <g opacity={ease((t - s("umfang") - 2.2) / 0.4)}>
            <rect x={260} y={430} width={560} height={76} rx="38" fill={COL.honey} />
            <T x={540} y={480} size={36} font={FONT_BODY} weight={700} color={COL.forestDeep}>{x.range}</T>
          </g>
        </g>
      )}

      {/* 5 Lernwege */}
      {waysO > 0 && (
        <g opacity={waysO}>
          <T x={540} y={330} size={90}>{x.waysTitle}</T>
          {x.ways.map(([label, age], i) => {
            const k = back((t - at("wege", x.words.ways[i]) + 0.1) / 0.4);
            if (k <= 0) return null;
            const img = ["/kids/mila-640.webp", "/kids/ben-640.webp", "/people/hanna-640.webp"][i];
            const cy = 640 + i * 330;
            return (
              <g key={label} transform={`translate(540 ${cy}) scale(${Math.max(0.01, k)})`}>
                <rect x={-400} y={-140} width={800} height={280} rx="140" fill={PAPER} stroke={[COL.honey, COL.forest, COL.rust][i]} strokeWidth="8" />
                <defs>
                  <clipPath id={`ad-way-${i}`}>
                    <circle cx={-262} cy={0} r={112} />
                  </clipPath>
                </defs>
                <circle cx={-262} cy={0} r={120} fill={[COL.honey, COL.forest, COL.rust][i]} />
                <image href={img} x={-374} y={-112} width={224} height={224} clipPath={`url(#ad-way-${i})`} preserveAspectRatio="xMidYMid slice" />
                <T x={80} y={-4} size={Math.min(78, 520 / (label.length * 0.55))}>{label}</T>
                <T x={80} y={60} size={44} font={FONT_BODY} weight={700} color={COL.inkSoft}>{age}</T>
              </g>
            );
          })}
        </g>
      )}

      {/* 6 + 7 Preis und CTA */}
      {priceO > 0 && (
        <g opacity={priceO}>
          <rect width={W} height={H} fill={COL.forestDeep} />
          <circle cx={940} cy={1700} r={380} fill={COL.forest} opacity=".6" />
          <circle cx={120} cy={420} r={260} fill={COL.forest} opacity=".5" />
          <g opacity={ease((t - s("preis") + 0.1) / 0.4)}>
            <T x={540} y={330} size={44} font={FONT_BODY} weight={700} color={COL.honey}>{x.solTop.toUpperCase()}</T>
          </g>
          {(() => {
            const k = back((t - s("preis")) / 0.5);
            return (
              <g transform={`translate(540 640) scale(${Math.max(0.01, k)})`}>
                <T x={0} y={0} size={250} color={PAPER}>{x.price}</T>
                <T x={0} y={90} size={52} font={FONT_BODY} weight={700} color={COL.sand}>{x.priceSub}</T>
              </g>
            );
          })()}
          {(() => {
            const k = ease((t - at("preis", x.words.preis) + 0.6) / 0.4);
            if (k <= 0) return null;
            return (
              <g opacity={k} transform={`translate(0 ${(1 - k) * 30})`}>
                <rect x={110} y={860} width={860} height={110} rx="55" fill={COL.forest} stroke={COL.honey} strokeWidth="4" />
                <T x={540} y={930} size={42} font={FONT_BODY} weight={700} color={PAPER}>{`✓ ${x.trial}`}</T>
              </g>
            );
          })()}
          {/* Mini-Pferd unten: trabendes Pferd aus der Akademie */}
          <g opacity={ease((t - s("preis") - 0.4) / 0.5)}>
            <defs>
              <clipPath id="ad-mini">
                <rect x={160} y={1010} width={760} height={420} rx="44" />
              </clipPath>
            </defs>
            <rect x={150} y={1000} width={780} height={440} rx="52" fill={COL.honey} />
            <g clipPath="url(#ad-mini)">
              <rect x={160} y={1010} width={760} height={420} fill="#E3D3B4" />
              <svg x={160} y={1010} width={760} height={420} viewBox="-110 600 1300 718" preserveAspectRatio="xMidYMid slice">
                {renderFuss(38.2 + (t % 1.6))}
              </svg>
            </g>
          </g>
          {(() => {
            const k = ease((t - s("cta") + 0.2) / 0.45);
            if (k <= 0) return null;
            const pulse = 1 + 0.025 * Math.sin(Math.max(0, t - s("cta")) * 6);
            return (
              <g opacity={k} transform={`translate(540 ${1600 + (1 - k) * 40}) scale(${pulse})`}>
                <rect x={-430} y={-110} width={860} height={220} rx="110" fill={COL.honey} />
                <T x={0} y={-6} size={70} color={COL.forestDeep}>{x.ctaTop}</T>
                <T x={0} y={62} size={42} font={FONT_BODY} weight={700} color={COL.forestDeep}>{`${x.ctaSub} →`}</T>
              </g>
            );
          })()}
        </g>
      )}

      <Header t={t} label={x.header} hide={Math.max(hookO, priceO)} />
      <Caption t={t} lines={L} skip={["preis", "cta"]} y={1640} />
    </svg>
  );
}

export const renderAdDe = (t: number) => render(t, "de");
export const renderAdEn = (t: number) => render(t, "en");
