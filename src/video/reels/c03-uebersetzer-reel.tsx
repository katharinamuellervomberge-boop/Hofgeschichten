import { Brand, COL, Caption, CommentCard, E, FONT_BODY, FONT_DISPLAY, Header, HookText, PAPER, Pop, S, T, W, H, back, ease, mkLines, sm, win, wordAt, type Place } from "./nov-kit";
import { LOOKS, TopHorse } from "./top";
import { Arena, LEG, LOOK_TO, Mark, Ride, TopBahn, bx, by, groundSpeed, pose, scr, type Bahn } from "./n2-kit";

/* Community-Reel R3 (9:16): „Reitlehrer-Übersetzer“ (comp `uebersetzer`)
   Oben Sprechblase mit dem Satz, darunter die Übersetzung, unten eine kleine Animation:
   Mehr Vorwärts = Schwung aus der Hinterhand · Sitz ein = weich in den Sattel · Außen begrenzen = äußere Wand ·
   Hände ruhig = federnde Ellbogen. */

const REC: Array<[string, string, number, number]> = [
  ["a1", "Was dein Reitlehrer sagt –", 0, 1.76],
  ["a2", "und was er eigentlich meint.", 2.08, 3.66],
  ["b1", "„Mehr Vorwärts!“", 4.03, 5.15],
  ["b2", "Nicht schneller – sondern mehr Schwung aus der Hinterhand.", 5.51, 8.45],
  ["c1", "„Sitz ein!“", 8.83, 9.59],
  ["c2", "Setz dich weich wieder in den Sattel – ohne reinzuplumpsen.", 9.99, 13.19],
  ["d1", "„Außen begrenzen!“", 13.57, 14.68],
  ["d2", "Äußerer Zügel und Schenkel sind die Wand, an der dein Pferd entlanggeht.", 15.04, 18.84],
  ["e1", "„Hände ruhig!“", 19.22, 20.2],
  ["e2", "Nicht festhalten –", 20.53, 21.52],
  ["e3", "deine Ellbogen federn die Bewegung ab.", 21.81, 23.77],
  ["f1", "Welchen Satz hörst du am häufigsten?", 24.28, 26.13],
  ["f2", "Ab in die Kommentare – wir übersetzen ihn!", 26.45, 29.0],
];
export const UEB_LINES = mkLines(REC);
const L = UEB_LINES;
export const UEB_TOTAL = E(L, "f2") + 2.6;
const at = (id: string, w: string) => wordAt(L, id, w);

const ITEMS = [
  { q: "b1", tr: "b2", say: "„Mehr Vorwärts!“", mean: ["Nicht schneller –", "mehr Schwung von hinten"] },
  { q: "c1", tr: "c2", say: "„Sitz ein!“", mean: ["Weich zurück in den Sattel –", "nicht reinplumpsen"] },
  { q: "d1", tr: "d2", say: "„Außen begrenzen!“", mean: ["Äußerer Zügel + Schenkel", "sind deine Wand"] },
  { q: "e1", tr: "e3", say: "„Hände ruhig!“", mean: ["Nicht festhalten –", "Ellbogen federn ab"] },
];
const PL: Place = { x: 540 - 160 * 2.2, y: 1500 - 285 * 2.2, k: 2.2 };
const BAHN: Bahn = { x: 120, y: 980, m: 21 };

function Bubble({ t, a, text }: { t: number; a: number; text: string }) {
  const k = back((t - a) / 0.4);
  if (k <= 0.01) return null;
  return (
    <g opacity={Math.min(1, k)} transform={`translate(540 330) scale(${Math.max(0.01, k)}) translate(-540 -330)`}>
      <rect x={110} y={230} width={860} height={200} rx="48" fill={COL.rust} />
      <path d="M230 428 l-20 60 l80 -60 Z" fill={COL.rust} />
      <T x={540} y={292} size={30} font={FONT_BODY} weight={800} color="#F3D9C9">DEIN REITLEHRER</T>
      <T x={540} y={378} size={Math.min(84, 820 / (text.length * 0.5))} color={PAPER}>{text}</T>
    </g>
  );
}
function Meaning({ t, a, lines }: { t: number; a: number; lines: string[] }) {
  const k = ease((t - a) / 0.35);
  if (k <= 0.01) return null;
  return (
    <g opacity={k} transform={`translate(0 ${(1 - k) * 30})`}>
      <rect x={110} y={520} width={860} height={230} rx="36" fill={PAPER} stroke={COL.forest} strokeWidth="5" />
      <rect x={140} y={500} width={250} height={46} rx="23" fill={COL.forest} />
      <T x={265} y={533} size={26} font={FONT_BODY} weight={800} color={PAPER}>ÜBERSETZT</T>
      {lines.map((l, i) => (
        <T key={i} x={540} y={620 + i * 70} size={Math.min(54, 800 / (l.length * 0.5))} color={COL.forestDeep} font={FONT_DISPLAY}>{l}</T>
      ))}
    </g>
  );
}

export function renderUebersetzer(t: number) {
  const hookEnd = E(L, "a2") + 0.15;
  const idx = ITEMS.findIndex((it, i) => t >= S(L, it.q) - 0.2 && (i === ITEMS.length - 1 ? t < S(L, "f1") - 0.2 : t < S(L, ITEMS[i + 1].q) - 0.2));
  const it = ITEMS[idx];
  const winI = (i: number) => win(t, S(L, ITEMS[i].q) - 0.2, i === ITEMS.length - 1 ? S(L, "f1") - 0.2 : S(L, ITEMS[i + 1].q) - 0.2, 0.2);
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);

  /* 1 · Mehr Vorwärts: Trab, Schwung aus der Hinterhand */
  const o1 = winI(0);
  const b1 = pose({});
  /* 2 · Sitz ein: Aufstehen und weich einsitzen (Leichttraben) */
  const o2 = winI(1);
  const ph = ((t - S(L, "c1")) % 1.0 + 1) % 1.0;
  const rise = ph < 0.5 ? sm(ph / 0.35) : 1 - sm((ph - 0.5) / 0.4);
  const b2 = pose({ dy: -12 * rise, lean: 6 * rise, leg: LEG.sitz });
  /* 4 · Hände ruhig: Trab, Hand bleibt, Ellbogen federn */
  const o4 = winI(3);
  const b4 = pose({});
  const elbow = scr(PL, "trab", t, b4.elbow);
  const handP = scr(PL, "trab", t, b4.hand);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      {/* Hook-Bild: Reiterin im Schritt */}
      <g opacity={win(t, 0, S(L, "b1") - 0.2, 0.3)}>
        <Arena t={t} speed={groundSpeed("schritt", PL.k)} y={PL.y + 285 * PL.k} />
        <Ride t={t} pl={PL} gait="schritt" id="ue0" b={pose({})} look={LOOK_TO} />
        <Pop t={t} a={0.6} x={300} y={860} text="„Mehr Vorwärts!“" fill={COL.rust} size={34} />
        <Pop t={t} a={1.2} x={760} y={800} text="„Sitz ein!“" fill={COL.rust} size={34} />
        <Pop t={t} a={1.8} x={420} y={740} text="„Außen begrenzen!“" fill={COL.rust} size={34} />
        <Pop t={t} a={2.4} x={760} y={680} text="„Hände ruhig!“" fill={COL.rust} size={34} />
        <Pop t={t} a={S(L, "a2")} x={540} y={600} text="… und was ist gemeint? 🤔" fill={COL.forestDeep} size={36} />
      </g>
      {/* 1 */}
      {o1 > 0.01 && (
        <g opacity={o1}>
          <Arena t={t} speed={groundSpeed("trab", PL.k)} y={PL.y + 285 * PL.k} />
          <Ride t={t} pl={PL} gait="trab" id="ue1" b={b1} look={LOOK_TO} nod={10} />
          <g opacity={win(t, at("b2", "Schwung") - 0.2, S(L, "c1") - 0.2)}>
            <path d={`M${PL.x + (110 - 70) * PL.k} ${PL.y + (150 - 20) * PL.k} q160 -120 ${330 + 20 * pulse} -40`} fill="none" stroke={COL.forest} strokeWidth="12" strokeLinecap="round" />
            <path d={`M${PL.x + (110 - 70) * PL.k + 330 + 20 * pulse} ${PL.y + (150 - 20) * PL.k - 40} l-36 -22 l0 44 Z`} fill={COL.forest} transform={`rotate(14 ${PL.x + (110 - 70) * PL.k + 330} ${PL.y + (150 - 20) * PL.k - 40})`} />
            <Pop t={t} a={at("b2", "Schwung") - 0.2} x={330} y={850} text="Schwung aus der Hinterhand" fill={COL.forest} size={32} />
          </g>
          <g opacity={win(t, at("b2", "schneller") - 0.2, at("b2", "Schwung") - 0.2)}>
            <Pop t={t} a={at("b2", "schneller") - 0.2} x={540} y={850} text="schneller? ✗" fill={COL.rust} size={36} />
          </g>
        </g>
      )}
      {/* 2 */}
      {o2 > 0.01 && (
        <g opacity={o2}>
          <Arena t={t} speed={groundSpeed("trab", PL.k)} y={PL.y + 285 * PL.k} />
          <Ride t={t} pl={PL} gait="trab" id="ue2" b={b2} look={LOOK_TO} nod={10} />
          {(() => {
            const hip = scr(PL, "trab", t, b2.hip);
            return (
              <g opacity={win(t, at("c2", "weich") - 0.2, S(L, "d1") - 0.2)}>
                <path d={`M${hip[0] - 70} ${hip[1] - 70} q-10 60 40 80`} fill="none" stroke={COL.forest} strokeWidth="8" strokeLinecap="round" />
                <circle cx={hip[0]} cy={hip[1] + 18} r={30 + 6 * (1 - rise)} fill="none" stroke={COL.forest} strokeWidth="5" opacity={1 - rise} />
                <Pop t={t} a={at("c2", "weich") - 0.2} x={300} y={850} text="weich · leise" fill={COL.forest} size={34} />
                <Pop t={t} a={at("c2", "reinzuplumpsen") - 0.2} x={760} y={850} text="plumps ✗" fill={COL.rust} size={34} />
              </g>
            );
          })()}
        </g>
      )}
      {/* 3 · Außen begrenzen: von oben */}
      {winI(2) > 0.01 && (
        <g opacity={winI(2)}>
          <TopBahn b={BAHN} />
          {(() => {
            const u = ((t - S(L, "d1")) / 5.5) % 1;
            const x = bx(BAHN, 5 + 30 * u);
            const y = by(BAHN, 19);
            return (
              <g>
                <rect x={bx(BAHN, 0) + 8} y={by(BAHN, 19.9)} width={40 * BAHN.m - 16} height={26} rx="13" fill={COL.forest} opacity={0.35 + 0.25 * pulse} />
                <TopHorse at={[x, y]} ang={0} look={LOOKS.tonga} step={t * 1.3} s={3.6} bend={-4} glow={{ outerRein: win(t, at("d2", "Zügel") - 0.2, S(L, "e1")), outerLeg: win(t, at("d2", "Schenkel") - 0.2, S(L, "e1")) }} />
                <Pop t={t} a={at("d2", "Wand") - 0.2} x={540} y={by(BAHN, 20) + 110} text="äußere „Wand“" fill={COL.forest} size={36} />
              </g>
            );
          })()}
        </g>
      )}
      {/* 4 */}
      {o4 > 0.01 && (
        <g opacity={o4}>
          <Arena t={t} speed={groundSpeed("trab", PL.k)} y={PL.y + 285 * PL.k} />
          <Ride t={t} pl={PL} gait="trab" id="ue4" b={b4} look={LOOK_TO} nod={10} />
          <circle cx={elbow[0]} cy={elbow[1]} r={26 + 5 * pulse} fill="none" stroke={COL.forest} strokeWidth="5" opacity={win(t, S(L, "e3") - 0.2, S(L, "f1") - 0.2)} />
          <Pop t={t} a={S(L, "e3")} x={elbow[0] - 160} y={elbow[1] + 10} text="Ellbogen federn" fill={COL.forest} size={30} />
          <g opacity={win(t, S(L, "e2") - 0.1, S(L, "e3"))}>
            <Mark x={handP[0] + 70} y={handP[1] - 60} ok={false} />
            <Pop t={t} a={S(L, "e2") - 0.1} x={handP[0] + 70} y={handP[1] - 110} text="festhalten" fill={COL.rust} size={28} />
          </g>
        </g>
      )}
      {it && <Bubble t={t} a={S(L, it.q) - 0.15} text={it.say} />}
      {it && <Meaning t={t} a={S(L, it.tr) - 0.1} lines={it.mean} />}
      <g opacity={ease((t - S(L, "f1") + 0.15) / 0.3)}>
        <CommentCard t={t} a={S(L, "f1") - 0.1} lines={["Welchen Satz hörst du", "am häufigsten?"]} sub="Wir übersetzen ihn! 💬" y={640} />
        <Brand t={t} a={S(L, "f2") + 0.3} />
      </g>
      <Header t={t} label="Die Hofgeschichten · Reitlehrer-Übersetzer" hide={win(t, 0, hookEnd)} />
      <HookText t={t} end={hookEnd} y0={270} lines={[
        { text: "Was dein Reitlehrer sagt …", at: -0.9, size: 76 },
        { text: "und was er MEINT", at: S(L, "a2") - 0.1, hi: true, size: 92 },
      ]} />
      <Caption t={t} lines={L} skip={["a1", "a2", "b1", "c1", "d1", "e1", "f1", "f2"]} y={1700} />
    </svg>
  );
}
