import { Brand, COL, Caption, CommentCard, E, FONT_BODY, Header, HookText, PAPER, Pop, S, T, Title, W, H, ease, lerp, mkLines, sm, win, wordAt, type Place } from "./nov-kit";
import { V_LEG } from "./bein-reel";
import { Arena, LEG, LOOK_TO, Mark, Ride, Stamp, V_SIDE, groundSpeed, mixLeg, pose, scr } from "./n2-kit";

/* Community-Reel R4 (9:16): „3 Reitmythen, die fast alle glauben“ (comp `mythen`)
   1 Ferse drücken (Bein rutscht vor) → Ferse sinkt bei lockerem Bein · 2 Kopf unten (eingerollt) → weiche, gleichmäßige
   Verbindung, entsteht von hinten · 3 Bremsen am Zügel (Pferd macht sich fest) → Sitz, Schenkel und Zügel zusammen. */

const REC: Array<[string, string, number, number]> = [
  ["a1", "Drei Reitmythen, die fast alle glauben.", 0, 3.13],
  ["b0", "Mythos eins:", 3.62, 4.55],
  ["b1", "Die Ferse muss runtergedrückt werden.", 4.92, 6.91],
  ["b2", "Falsch –", 7.23, 7.79],
  ["b3", "die Ferse sinkt von selbst, wenn das Bein locker ist.", 8.05, 10.68],
  ["c0", "Mythos zwei:", 11.09, 12.02],
  ["c1", "Kopf unten heißt Anlehnung.", 12.42, 14.34],
  ["c2", "Falsch –", 14.63, 15.22],
  ["c3", "Anlehnung ist eine weiche, gleichmäßige Verbindung zum Pferdemaul,", 15.54, 19.3],
  ["c4", "und sie entsteht von hinten.", 19.66, 21.1],
  ["d0", "Mythos drei:", 21.49, 22.35],
  ["d1", "Gebremst wird mit dem Zügel.", 22.74, 24.4],
  ["d2", "Falsch –", 24.71, 25.27],
  ["d3", "beim Durchparieren wirken Sitz, Schenkel und Zügel zusammen.", 25.61, 29.39],
  ["d4", "Nur Ziehen macht das Pferd eher fest.", 29.73, 31.73],
  ["e1", "Welchen Mythos hast du auch geglaubt? Schreib die Nummer in die Kommentare!", 32.13, 35.71],
];
export const MYTH_LINES = mkLines(REC);
const L = MYTH_LINES;
export const MYTH_TOTAL = E(L, "e1") + 2.6;
const at = (id: string, w: string) => wordAt(L, id, w);

const MYTHS = [
  { k: "b", n: "1", myth: "„Ferse runterdrücken!“", truth: "Die Ferse sinkt von selbst" },
  { k: "c", n: "2", myth: "„Kopf unten = Anlehnung“", truth: "Weiche Verbindung – von hinten" },
  { k: "d", n: "3", myth: "„Bremsen mit dem Zügel“", truth: "Sitz + Schenkel + Zügel" },
];

function Head({ t, i }: { t: number; i: number }) {
  const m = MYTHS[i];
  const a = S(L, `${m.k}0`) - 0.1;
  const b = i < 2 ? S(L, `${MYTHS[i + 1].k}0`) - 0.2 : S(L, "e1") - 0.2;
  const o = win(t, a, b, 0.2);
  if (o <= 0.01) return null;
  const tF = S(L, `${m.k}2`) - 0.05;
  const truthK = ease((t - S(L, `${m.k}3`) + 0.1) / 0.35);
  return (
    <g opacity={o}>
      <g transform="translate(540 250)">
        <rect x={-150} y={-40} width={300} height={66} rx="33" fill={COL.forestDeep} />
        <T x={0} y={6} size={34} font={FONT_BODY} weight={900} color={COL.honey}>MYTHOS {m.n}</T>
      </g>
      <g opacity={1 - 0.55 * truthK}>
        <T x={540} y={385} size={Math.min(74, 900 / (m.myth.length * 0.5))} color={COL.forestDeep}>{m.myth}</T>
        {truthK > 0 && <path d={`M150 362 H${150 + 780 * sm(truthK * 1.5)}`} stroke={COL.rust} strokeWidth="9" strokeLinecap="round" />}
      </g>
      <Stamp t={t} a={tF} x={790} y={300} text="FALSCH" size={64} rot={-10} o={1 - truthK} />
      <g opacity={truthK} transform={`translate(0 ${(1 - truthK) * 30})`}>
        <rect x={110} y={430} width={860} height={96} rx="48" fill={COL.forest} />
        <T x={160} y={492} size={44} font={FONT_BODY} weight={900} color={PAPER} anchor="start">✓</T>
        <T x={560} y={494} size={Math.min(44, 760 / (m.truth.length * 0.52))} font={FONT_BODY} weight={800} color={PAPER}>{m.truth}</T>
      </g>
    </g>
  );
}

const PL3: Place = { x: 540 - 160 * 2.6, y: 1420 - 285 * 2.6, k: 2.6 };

export function renderMythen(t: number) {
  const hookEnd = E(L, "a1") + 0.15;
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  const ix = t < S(L, "c0") - 0.2 ? 0 : t < S(L, "d0") - 0.2 ? 1 : 2;
  const sceneO = (i: number) => win(t, i === 0 ? -1 : S(L, `${MYTHS[i].k}0`) - 0.2, i < 2 ? S(L, `${MYTHS[i + 1].k}0`) - 0.2 : S(L, "e1") - 0.2, 0.3);

  /* 1 · Bein */
  const fix1 = sm((t - S(L, "b3") + 0.1) / 0.6);
  const leg1 = mixLeg(t < S(L, "b0") ? LEG.sitz : mixLeg(LEG.sitz, LEG.drueck, sm((t - S(L, "b1")) / 0.6)), LEG.lang, fix1);
  const b1 = pose({ leg: leg1, lean: -4 * sm((t - S(L, "b1")) / 0.6) * (1 - fix1) });
  const heel = scr(V_LEG, "schritt", t, b1.heel);
  /* 2 · Anlehnung */
  const fix2 = sm((t - S(L, "c3") + 0.1) / 0.8);
  const nod2 = lerp(lerp(8, 36, sm((t - S(L, "c1")) / 0.8)), 9, fix2);
  /* 3 · Bremsen */
  const pull3 = sm((t - S(L, "d1")) / 0.5) * (1 - sm((t - S(L, "d3") + 0.1) / 0.5)) + sm((t - S(L, "d4")) / 0.4);
  const nod3 = lerp(6, -10, Math.min(1, pull3));
  const b3 = pose({ handDx: -12 * Math.min(1, pull3), lean: -3 * Math.min(1, pull3) });
  const slow3 = lerp(1, 0.45, sm((t - S(L, "d3")) / 3));
  const hip3 = scr(PL3, "schritt", t * slow3, b3.hip);
  const ank3 = scr(PL3, "schritt", t * slow3, b3.ankle);
  const hand3 = scr(PL3, "schritt", t * slow3, b3.hand);
  const aidsO = win(t, S(L, "d3"), E(L, "d3") + 0.2);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      {/* 1 */}
      {sceneO(0) > 0.01 && (
        <g opacity={sceneO(0)}>
          <Arena t={t} speed={groundSpeed("schritt", V_LEG.k)} y={V_LEG.y + 285 * V_LEG.k} />
          <Ride t={t} pl={V_LEG} gait="schritt" id="my1" b={b1} glow={t > S(L, "b1") ? (fix1 > 0.5 ? COL.forest : COL.rust) : undefined} />
          {t > S(L, "b1") && (
            <g>
              <circle cx={heel[0]} cy={heel[1]} r={28 + 5 * pulse} fill="none" stroke={fix1 > 0.5 ? COL.forest : COL.rust} strokeWidth="6" />
              {fix1 < 0.5 && <path d={`M${heel[0]} ${heel[1] - 170} v110`} stroke={COL.rust} strokeWidth="11" strokeLinecap="round" />}
              {fix1 < 0.5 && <path d={`M${heel[0]} ${heel[1] - 40} l-20 -30 h40 Z`} fill={COL.rust} />}
              <Pop t={t} a={at("b1", "runtergedrückt") - 0.2} x={heel[0] - 230} y={heel[1] + 20} text="Bein rutscht vor" fill={COL.rust} size={32} o={1 - fix1} />
              <Pop t={t} a={at("b3", "locker") - 0.2} x={heel[0] - 200} y={heel[1] + 20} text="lockeres Bein" fill={COL.forest} size={32} />
            </g>
          )}
        </g>
      )}
      {/* 2 */}
      {sceneO(1) > 0.01 && (
        <g opacity={sceneO(1)}>
          <Arena t={t} speed={groundSpeed("trab", V_SIDE.k)} y={V_SIDE.y + 285 * V_SIDE.k} />
          <Ride t={t} pl={V_SIDE} gait="trab" id="my2" b={pose({})} look={LOOK_TO} nod={nod2} />
          {(() => {
            const neck = scr(V_SIDE, "trab", t, [318, 92]);
            return (
              <g>
                <circle cx={neck[0]} cy={neck[1]} r={70 + 6 * pulse} fill="none" stroke={fix2 > 0.5 ? COL.forest : COL.rust} strokeWidth="6" opacity={win(t, S(L, "c1") + 0.4, S(L, "d0") - 0.2)} />
                <Pop t={t} a={S(L, "c1") + 0.6} x={neck[0] - 30} y={neck[1] - 110} text="eingerollt" fill={COL.rust} size={32} o={1 - fix2} />
                <Pop t={t} a={at("c3", "weiche") - 0.2} x={neck[0] - 60} y={neck[1] - 110} text="weich & gleichmäßig" fill={COL.forest} size={32} />
              </g>
            );
          })()}
          <g opacity={win(t, S(L, "c4") - 0.1, S(L, "d0") - 0.2)}>
            <path d={`M${V_SIDE.x + 60 * V_SIDE.k} ${V_SIDE.y + 120 * V_SIDE.k} q170 -110 ${430 + 20 * pulse} -40`} fill="none" stroke={COL.forest} strokeWidth="12" strokeLinecap="round" />
            <Pop t={t} a={S(L, "c4")} x={330} y={1490} text="entsteht von hinten" fill={COL.forest} size={34} />
          </g>
        </g>
      )}
      {/* 3 */}
      {sceneO(2) > 0.01 && (
        <g opacity={sceneO(2)}>
          <Arena t={t * slow3} speed={groundSpeed("schritt", PL3.k)} y={PL3.y + 285 * PL3.k} />
          <Ride t={t * slow3} pl={PL3} gait="schritt" id="my3" b={b3} look={LOOK_TO} nod={nod3} strideK={slow3} />
          {pull3 > 0.05 && (
            <g opacity={Math.min(1, pull3)}>
              <circle cx={hand3[0]} cy={hand3[1]} r={26 + 4 * pulse} fill="none" stroke={COL.rust} strokeWidth="6" />
              <path d={`M${hand3[0] - 20} ${hand3[1] - 50} h-80`} stroke={COL.rust} strokeWidth="9" strokeLinecap="round" />
              <path d={`M${hand3[0] - 100} ${hand3[1] - 50} l22 -16 v32 Z`} fill={COL.rust} />
              <Pop t={t} a={t > S(L, "d4") ? S(L, "d4") : S(L, "d1") + 0.3} x={760} y={620} text={t > S(L, "d4") ? "Pferd macht sich fest" : "nur ziehen?"} fill={COL.rust} size={32} />
            </g>
          )}
          {aidsO > 0.01 && (
            <g opacity={aidsO}>
              {[[hip3, "Sitz", at("d3", "Sitz")], [ank3, "Schenkel", at("d3", "Schenkel")], [hand3, "Zügel", at("d3", "Zügel")]].map(([p, l, a], i) => {
                const pp = p as [number, number];
                const k = ease(((t as number) - (a as number) + 0.1) / 0.3);
                return (
                  <g key={i} opacity={k}>
                    <circle cx={pp[0]} cy={pp[1]} r={30 + 4 * pulse} fill="none" stroke={COL.forest} strokeWidth="6" />
                    <Pop t={t} a={(a as number) - 0.1} x={pp[0] + (i === 2 ? 170 : -170)} y={pp[1] + (i === 1 ? 60 : -20)} text={l as string} fill={COL.forest} size={32} />
                  </g>
                );
              })}
            </g>
          )}
        </g>
      )}
      <Head t={t} i={ix} />
      <g opacity={ease((t - S(L, "e1") + 0.15) / 0.3)}>
        <CommentCard t={t} a={S(L, "e1") - 0.1} lines={["Welchen Mythos hast", "du auch geglaubt?"]} sub="1, 2 oder 3 – ab in die Kommentare 💬" y={640} />
        <Brand t={t} a={S(L, "e1") + 1.6} />
      </g>
      <Header t={t} label="Die Hofgeschichten · Reiten verstehen" hide={win(t, 0, hookEnd)} />
      <HookText t={t} end={hookEnd} y0={300} lines={[
        { text: "3 Reitmythen,", at: -0.9, size: 96 },
        { text: "die fast ALLE glauben", at: at("a1", "fast") - 0.2, hi: true, size: 84 },
      ]} />
      <Caption t={t} lines={L} skip={["a1", "b0", "b2", "c0", "c2", "d0", "d2", "e1"]} y={1700} />
    </svg>
  );
}
