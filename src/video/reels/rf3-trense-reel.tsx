import { BIT, type P } from "@/components/illustrations/akademie/geometry";
import { Brand, COL, Caption, E, FONT_BODY, Ground, Header, HookText, IconBadge, NodHorse, PAPER, Pop, S, T, Title, W, H, ease, headPoint, hs, lerp, mkLines, sm, win, wordAt, type Place } from "./nov-kit";
import { Merk } from "./rkit";
import { LOOK_TO, Mark, Note, NumCard } from "./n2-kit";
import { HELPER, Person, Ring, type Fig } from "./bein-reel";
import { RF_HEADER, RfTag, SaveCard } from "./rf-kit";

/* RIDER FIX 3 (9:16): „Dein Pferd nimmt die Trense nicht an?“ (comp `rf-trense`)
   Stallgasse seitlich: Tonga steht, Reiterin kommt von vorn mit der Trense, Tonga reißt den Kopf hoch (rot).
   Mögliche Ursachen als Symbole, 3 Punkte, Hinweis Tierarzt/Pferdezahnarzt, Merksatz, Speichern. */

const REC: Array<[string, string, number, number]> = [
  ["a1", "Dein Pferd reißt beim Trensen immer den Kopf hoch?", 0, 2.95],
  ["a2", "Das ist nicht automatisch Ungehorsam.", 3.47, 5.6],
  ["b1", "Vielleicht will es dir etwas sagen.", 6.03, 7.68],
  ["b2", "Gebiss, Zähne, Druckstellen, schlechte Erfahrungen oder Unsicherheit.", 8.16, 12.85],
  ["c0", "Eins:", 13.36, 13.85],
  ["c1", "Prüf, ob Trense und Gebiss richtig passen.", 14.14, 16.59],
  ["d0", "Zwei:", 16.98, 17.42],
  ["d1", "Weicht es schon beim Anblick aus – oder erst beim Gebiss?", 17.76, 20.83],
  ["e0", "Drei:", 21.25, 21.63],
  ["e1", "Ruhig gewöhnen und belohnen, ohne Druck und ohne Zwang.", 21.96, 25.81],
  ["f1", "Passiert das immer wieder, lass Tierarzt oder Pferdezahnarzt nachsehen.", 26.17, 30.21],
  ["g1", "Dein Pferd ist nicht automatisch stur.", 30.58, 32.63],
  ["g2", "Vielleicht ist ihm etwas unangenehm.", 32.89, 34.56],
  ["h1", "Speichern – und beim nächsten Trensen genauer hinschauen.", 34.89, 38.03],
];
export const RF3_LINES = mkLines(REC);
const L = RF3_LINES;
export const RF3_TOTAL = E(L, "h1") + 2.6;
const at = (id: string, w: string) => wordAt(L, id, w);

const PL: Place = { x: 20, y: 1390 - 285 * 2.4, k: 2.4 };
const mix = (a: P, b: P, u: number): P => [lerp(a[0], b[0], u), lerp(a[1], b[1], u)];
/** Helferin mit angehobener Hand (Trense Richtung Maul) */
function liftFig(u: number): Fig {
  return { ...HELPER, hand: mix(HELPER.hand, [364, 124], u), elbow: mix(HELPER.elbow, [384, 146], u) };
}
/** Trense, die in der Hand hängt (Pferde-Koordinaten) */
function HangingBridle({ hand }: { hand: P }) {
  const [x, y] = hand;
  return (
    <g fill="none" stroke="#5A3B26" strokeWidth="2.6" strokeLinecap="round">
      <ellipse cx={x - 2} cy={y + 20} rx={8} ry={20} />
      <path d={`M${x - 10} ${y + 8} h16`} />
      <path d={`M${x - 9} ${y + 34} h14`} strokeWidth="3.4" />
      <circle cx={x - 9} cy={y + 41} r={3.2} stroke="#A9A9A2" strokeWidth="2" />
      <circle cx={x + 5} cy={y + 41} r={3.2} stroke="#A9A9A2" strokeWidth="2" />
      <path d={`M${x - 6} ${y + 41} h8`} stroke="#A9A9A2" strokeWidth="2" />
    </g>
  );
}

export function renderRf3(t: number) {
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  const hookEnd = E(L, "a2") + 0.15;
  const tUp = 0.7; // Kopf geht schon in der ersten Sekunde hoch
  const calm = S(L, "e1");
  /* Kopfhaltung: hoch im Hook, langsam runter, entspannt bei „ruhig gewöhnen“ */
  const nod =
    t < tUp ? lerp(4, -2, sm(t / tUp)) :
    t < S(L, "b1") ? lerp(-2, -30, sm((t - tUp) / 0.35)) + 2 * Math.sin(t * 3) * sm(t - tUp) :
    t < calm ? lerp(-30, -10, sm((t - S(L, "b1")) / 1.2)) :
    lerp(-10, 8, sm((t - calm) / 1.2));
  /* Annähern + Hand heben */
  const dx = lerp(50, -22, sm(t / 0.9));
  const lift = t < calm ? (t < S(L, "b1") ? sm(t / 0.9) : lerp(1, 0.25, sm((t - S(L, "b1")) / 0.8))) : lerp(0.25, 0.55, sm((t - calm - 1.2) / 1.5));
  const fig = liftFig(lift);
  const mouth = hs(PL, headPoint(BIT, nod, 0));
  const hand = hs(PL, [fig.hand[0] + dx, fig.hand[1]]);
  const eyeP = hs(PL, [fig.head[0] + dx - 8, fig.head[1]]);
  const causeO = win(t, S(L, "b2") - 0.2, S(L, "c0") - 0.1, 0.3);
  const cardsO = win(t, S(L, "c0") - 0.1, S(L, "f1") - 0.1);
  const vetO = win(t, S(L, "f1") - 0.1, S(L, "g1") - 0.1, 0.3);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      {/* Stallwand */}
      <rect x={0} y={760} width={W} height={640} fill="#E6D6BA" />
      {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M0 ${800 + i * 68} H${W}`} stroke="#D6C29F" strokeWidth="5" />)}
      <rect x={0} y={746} width={W} height={20} fill="#C9AE84" />
      <Ground y={1390} h={200} id="rf3g" />
      <NodHorse t={t} pl={PL} look={LOOK_TO} gait="stand" id="rf3" nod={nod} slices={18} />
      <svg x={PL.x} y={PL.y} width={320 * PL.k} height={292 * PL.k} viewBox="70 20 320 292" overflow="visible">
        <g transform={`translate(${dx} 0)`}>
          <Person f={fig} face={-1} jacket="#344638" legs="#EFE6D2" legsShade="#D9CBB0" boots="#3E2C22" />
          <HangingBridle hand={fig.hand} />
        </g>
      </svg>
      {/* Hook: Kopf hoch */}
      <g opacity={win(t, tUp, S(L, "b1"))}>
        <path d={`M${mouth[0] - 120} ${mouth[1] + 60} v-120`} stroke={COL.rust} strokeWidth="11" strokeLinecap="round" />
        <path d={`M${mouth[0] - 120} ${mouth[1] - 80} l-22 32 h44 Z`} fill={COL.rust} />
        <Pop t={t} a={tUp + 0.1} x={mouth[0] - 160} y={mouth[1] - 140} text="Kopf hoch!" fill={COL.rust} size={34} />
      </g>
      <Pop t={t} a={at("a2", "Ungehorsam") - 0.2} x={540} y={640} text="nicht automatisch Ungehorsam" fill={COL.forest} size={34} o={win(t, at("a2", "Ungehorsam") - 0.2, S(L, "b1") + 0.1)} />
      {/* b1: Pferd teilt etwas mit */}
      <g opacity={win(t, S(L, "b1"), S(L, "b2") - 0.1)}>
        <circle cx={mouth[0] - 60} cy={mouth[1] - 200} r={50} fill={PAPER} stroke={COL.honey} strokeWidth="6" />
        <T x={mouth[0] - 60} y={mouth[1] - 180} size={60} font={FONT_BODY} weight={900} color={COL.honey}>?</T>
      </g>
      {/* Ursachen */}
      {causeO > 0.01 && (
        <g opacity={causeO}>
          <rect width={W} height={H} fill={COL.bg} opacity=".88" />
          {([
            ["🔩", "Gebiss", "b2", "Gebiss", 220, 620],
            ["🦷", "Zähne", "b2", "Zähne", 540, 620],
            ["📍", "Druckstellen", "b2", "Druckstellen", 860, 620],
            ["💭", "schlechte Erfahrung", "b2", "schlechte", 360, 960],
            ["❔", "Unsicherheit", "b2", "Unsicherheit", 720, 960],
          ] as const).map(([ic, label, id, w, x, y]) => (
            <IconBadge key={label} t={t} a={at(id, w) - 0.15} x={x} y={y} r={86} col={COL.honey} label={label} icon={<T x={0} y={26} size={74}>{ic}</T>} />
          ))}
          <T x={540} y={1260} size={34} font={FONT_BODY} weight={700} color={COL.inkSoft}>mögliche Ursachen</T>
        </g>
      )}
      {/* 1 Passform */}
      <g opacity={win(t, S(L, "c1"), E(L, "c1") + 0.3)}>
        <Ring p={mouth} col={COL.forest} o={1} pulse={pulse} r={56} />
        <Pop t={t} a={at("c1", "Trense")} x={mouth[0] - 170} y={mouth[1] + 130} text="passt & richtig verschnallt?" fill={COL.forest} size={30} />
      </g>
      {/* 2 Wann weicht es aus? */}
      <g opacity={win(t, S(L, "d1"), E(L, "d1") + 0.3)}>
        <Pop t={t} a={at("d1", "Anblick") - 0.2} x={eyeP[0] - 40} y={eyeP[1] - 110} text="👀 schon beim Anblick?" fill={COL.honey} color={COL.forestDeep} size={30} />
        <Pop t={t} a={at("d1", "Gebiss") - 0.2} x={mouth[0] - 160} y={mouth[1] + 130} text="… oder erst beim Gebiss?" fill={COL.honey} color={COL.forestDeep} size={30} />
      </g>
      {/* 3 ruhig gewöhnen */}
      <g opacity={win(t, S(L, "e1"), E(L, "e1") + 0.3)}>
        <Pop t={t} a={at("e1", "ruhig")} x={mouth[0] - 170} y={mouth[1] + 130} text="ruhig · belohnen · kein Zwang" fill={COL.forest} size={30} />
        <Mark x={hand[0] + 10} y={hand[1] - 120} ok k={ease((t - at("e1", "belohnen")) / 0.3)} />
      </g>
      {/* Tierarzt */}
      {vetO > 0.01 && (
        <g opacity={vetO}>
          <rect width={W} height={H} fill={COL.bg} opacity=".7" />
          <IconBadge t={t} a={S(L, "f1") + 0.1} x={540} y={760} r={130} col={COL.forest} label="Tierarzt · Pferdezahnarzt" icon={<T x={0} y={36} size={100}>🩺</T>} />
          <Pop t={t} a={at("f1", "immer") - 0.2} x={540} y={520} text="immer wieder? → abklären lassen" fill={COL.rust} size={34} />
        </g>
      )}
      <Note text="Wiederholtes Abwehren immer fachlich abklären lassen." y={1570} o={win(t, S(L, "f1") - 0.1, S(L, "h1"), 0.3)} />
      {/* Punkte 1–3 */}
      <g opacity={cardsO}>
        <NumCard t={t} a={S(L, "c0") - 0.1} x={190} y={430} w={300} n="1" title="Passform prüfen" sub="Trense & Gebiss" col={COL.forest} dim={t > S(L, "d0") ? 1 : 0} />
        <NumCard t={t} a={S(L, "d0") - 0.1} x={540} y={430} w={300} n="2" title="genau hinschauen" sub="wann weicht es aus?" col={COL.forest} dim={t > S(L, "e0") ? 1 : 0} />
        <NumCard t={t} a={S(L, "e0") - 0.1} x={890} y={430} w={300} n="3" title="ruhig gewöhnen" sub="belohnen, ohne Zwang" col={COL.forest} />
      </g>
      <Merk t={t} at={S(L, "g1") - 0.1} lines={["Nicht stur –", "vielleicht ist ihm", "etwas unangenehm."]} />
      {/* Ende */}
      <g opacity={win(t, S(L, "h1") - 0.1, 99, 0.3)}>
        <SaveCard t={t} a={S(L, "h1")} title="📌 Speichern" sub="& beim nächsten Trensen genauer hinschauen" y={1480} />
        <Brand t={t} a={S(L, "h1") + 1.2} y={1600} />
      </g>
      <Header t={t} label={RF_HEADER} hide={win(t, 0, hookEnd)} />
      <RfTag o={win(t, -1, hookEnd)} />
      <HookText t={t} end={hookEnd} y0={290} lines={[
        { text: "KOPF HOCH", at: -0.9, hi: true, size: 92 },
        { text: "beim Trensen?", at: -0.6, size: 80 },
      ]} />
      <Title t={t} a={S(L, "b1")} b={S(L, "b2") - 0.2} top="Es will dir etwas sagen" color={COL.forestDeep} y={330} />
      <Title t={t} a={S(L, "b2") - 0.2} b={S(L, "c0") - 0.1} top="Was steckt dahinter?" color={COL.forestDeep} y={330} />
      <Title t={t} a={S(L, "c0") - 0.05} b={S(L, "f1") - 0.1} top="So gehst du vor" color={COL.forest} y={330} />
      <Title t={t} a={S(L, "f1") - 0.05} b={S(L, "g1") - 0.1} top="Wichtig" color={COL.rust} y={330} />
      <Caption t={t} lines={L} skip={["c0", "d0", "e0", "h1"]} y={1720} />
    </svg>
  );
}
