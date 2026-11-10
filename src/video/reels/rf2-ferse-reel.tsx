import { bodyBob } from "@/components/illustrations/akademie/AnimHorse";
import type { P } from "@/components/illustrations/akademie/geometry";
import { Brand, COL, Caption, E, Header, HookText, Pop, S, Title, W, H, ease, hs, lerp, mkLines, win, wordAt } from "./nov-kit";
import { Merk } from "./rkit";
import { Arena, groundSpeed } from "./rs-kit";
import { Mark, NumCard } from "./n2-kit";
import { Arr, LEG, RideFig, Ring, bodyFor, legAt, type Leg } from "./bein-reel";
import { RF_HEADER, RfTag, SaveCard } from "./rf-kit";

/* RIDER FIX 2 (9:16): „Warum bekommst du deine Ferse nicht tief?“ (comp `rf-ferse`)
   Bein-Nahansicht (V_LEG, Tivoli im Schritt). Ferse mit Kraft gedrückt → Bein rutscht vor, Knie hoch, steif (rot).
   Lösung: Bein aus der Hüfte fallen lassen, Sprunggelenk elastisch, Bügel am Fußballen (grün).
   Vergleich verkrampft ↔ elastisch, Merksatz, Teilen. */

const REC: Array<[string, string, number, number]> = [
  ["a1", "Dein Reitlehrer sagt ständig: Fersen tief?", 0, 2.87],
  ["a2", "Aber es klappt einfach nicht?", 3.18, 4.72],
  ["b1", "Vielleicht drückst du die Ferse viel zu stark runter.", 5.08, 7.76],
  ["b2", "Dann wird dein ganzes Bein steif.", 8.16, 10.51],
  ["c0", "Eins:", 10.91, 11.42],
  ["c1", "Lass das Bein aus der Hüfte locker fallen.", 11.75, 14.07],
  ["d0", "Zwei:", 14.45, 14.88],
  ["d1", "Das Sprunggelenk bleibt elastisch, nicht pressen.", 15.28, 18.04],
  ["e0", "Drei:", 18.43, 18.79],
  ["e1", "Der Bügel liegt am Fußballen, der Fuß bleibt ruhig.", 19.21, 22.16],
  ["f1", "Deine Ferse muss nicht erzwungen tief sein.", 22.55, 25.0],
  ["f2", "Dein Bein muss funktionieren.", 25.37, 27.24],
  ["g1", "Schick das jemandem, der ständig „Fersen tief“ hört!", 27.62, 30.69],
];
export const RF2_LINES = mkLines(REC);
const L = RF2_LINES;
export const RF2_TOTAL = E(L, "g1") + 2.6;
const at = (id: string, w: string) => wordAt(L, id, w);

/** nähere Bein-Nahaufnahme als V_LEG: Knie bis Fuß füllen das Bild */
const V_CLOSE = { x: 540 - (228 - 70) * 4.8, y: 448, k: 4.8 };
const mix = (a: P, b: P, u: number): P => [lerp(a[0], b[0], u), lerp(a[1], b[1], u)];
const legD = (l: Leg) => `M${l.knee[0]},${l.knee[1]} L${l.ankle[0]},${l.ankle[1]} L${l.toe[0]},${l.toe[1]} M${l.ankle[0]},${l.ankle[1]} L${l.heel[0]},${l.heel[1]}`;

export function renderRf2(t: number) {
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  const hookEnd = E(L, "a2") + 0.15;
  const pl = V_CLOSE;
  const tPress = at("a1", "Fersen") - 0.1;
  const tFall = at("c1", "Hüfte") - 0.1;
  const leg = legAt(t, [[0, LEG.sitz], [tPress, LEG.drueck], [tFall, LEG.lang]], 0.6);
  const b = bodyFor(leg);
  const bob = bodyBob("schritt", t);
  const s = (p: P) => hs(pl, [p[0], p[1] + bob]);
  const hip = s(b.hip);
  const knee = s(b.knee);
  const ank = s(b.ankle);
  const heel = s(b.heel);
  const ball = s(mix(b.heel, b.toe, 0.68));
  const bad = t < tFall;
  const press = 10 * Math.sin(t * 9);
  const cardsO = win(t, S(L, "c0") - 0.1, S(L, "f1") - 0.1);
  const cmpO = win(t, S(L, "f1") - 0.1, S(L, "g1") - 0.1, 0.3);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      <Arena t={t} speed={groundSpeed("schritt", pl.k)} y={pl.y + 285 * pl.k} />
      <RideFig t={t} pl={pl} gait="schritt" id="rf2" b={b} glow={t > tPress + 0.3 && bad ? COL.rust : !bad && t > S(L, "c1") ? COL.forest : undefined} />
      {/* Vergleich: verkrampftes Bein als Geist */}
      <svg x={pl.x} y={pl.y} width={320 * pl.k} height={292 * pl.k} viewBox="70 20 320 292" overflow="visible" opacity={cmpO}>
        <g transform={`translate(0 ${bob})`}>
          <path d={legD(LEG.drueck)} fill="none" stroke={COL.rust} strokeWidth="3" strokeDasharray="5 4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
      {/* Hook: Reitlehrer-Ruf */}
      <Pop t={t} a={0.2} x={250} y={640} text="📣 „Fersen tief!“" fill={COL.honey} color={COL.forestDeep} size={36} o={win(t, 0.2, E(L, "a1") + 0.2)} />
      <Pop t={t} a={S(L, "a2")} x={250} y={640} text="klappt nicht 😩" fill={COL.rust} size={36} o={win(t, S(L, "a2"), hookEnd + 0.3)} />
      {/* Drücken → steif */}
      <Arr from={[heel[0], heel[1] - 170 + press]} to={[heel[0], heel[1] - 40]} col={COL.rust} o={win(t, tPress + 0.2, E(L, "b1") + 0.2)} w={10} />
      <Pop t={t} a={at("b1", "drückst")} x={heel[0] - 230} y={heel[1] - 110} text="mit Kraft runter" fill={COL.rust} size={30} o={win(t, at("b1", "drückst"), E(L, "b1") + 0.2)} />
      <g opacity={win(t, S(L, "b2") - 0.1, E(L, "b2") + 0.2)}>
        <Ring p={knee} col={COL.rust} o={1} pulse={pulse} r={30} />
        <Ring p={ank} col={COL.rust} o={1} pulse={pulse} r={24} />
        <Pop t={t} a={S(L, "b2")} x={knee[0] + 190} y={knee[1] - 40} text="Knie geht hoch" fill={COL.rust} size={30} />
        <Pop t={t} a={S(L, "b2") + 0.4} x={ank[0] + 230} y={ank[1] + 30} text="Bein rutscht vor" fill={COL.rust} size={30} />
        <Pop t={t} a={at("b2", "steif") - 0.1} x={hip[0] - 170} y={hip[1] + 40} text="alles steif" fill={COL.rust} size={30} />
      </g>
      {/* 1 aus der Hüfte fallen lassen */}
      <g opacity={win(t, S(L, "c1") - 0.1, E(L, "c1") + 0.3)}>
        <Ring p={hip} col={COL.forest} o={1} pulse={pulse} r={30} />
        <Arr from={[hip[0] - 90, hip[1] + 20]} to={[hip[0] - 90, hip[1] + 240]} col={COL.forest} o={1} w={9} />
        <Pop t={t} a={at("c1", "Hüfte")} x={hip[0] - 200} y={hip[1] - 60} text="aus der Hüfte" fill={COL.forest} size={30} />
      </g>
      {/* 2 Sprunggelenk federt */}
      <g opacity={win(t, S(L, "d1") - 0.1, E(L, "d1") + 0.3)}>
        <Ring p={ank} col={COL.forest} o={1} pulse={pulse} r={26 + 6 * Math.sin(t * 4)} />
        <Pop t={t} a={at("d1", "elastisch") - 0.2} x={ank[0] + 230} y={ank[1] - 20} text="federt mit" fill={COL.forest} size={30} />
      </g>
      {/* 3 Bügel am Fußballen */}
      <g opacity={win(t, S(L, "e1") - 0.1, E(L, "e1") + 0.3)}>
        <Ring p={ball} col={COL.honey} o={1} pulse={pulse} r={24} />
        <Pop t={t} a={at("e1", "Fußballen") - 0.2} x={ball[0] + 220} y={ball[1] + 40} text="Bügel am Fußballen" fill={COL.forest} size={30} />
      </g>
      {/* Vergleich */}
      <g opacity={cmpO}>
        <Mark x={ank[0] - 190} y={ank[1] - 40} ok={false} k={ease((t - S(L, "f1")) / 0.3)} />
        <Pop t={t} a={S(L, "f1") + 0.1} x={ank[0] - 190} y={ank[1] + 50} text="verkrampft" fill={COL.rust} size={28} />
        <Mark x={ank[0] + 160} y={ank[1] + 50} ok k={ease((t - S(L, "f1") - 0.4) / 0.3)} />
        <Pop t={t} a={S(L, "f1") + 0.5} x={ank[0] + 160} y={ank[1] + 140} text="elastisch" fill={COL.forest} size={28} />
      </g>
      {/* Punkte 1–3 */}
      <g opacity={cardsO}>
        <NumCard t={t} a={S(L, "c0") - 0.1} x={190} y={1450} w={300} n="1" title="Bein fallen lassen" sub="locker aus der Hüfte" col={COL.forest} dim={t > S(L, "d0") ? 1 : 0} />
        <NumCard t={t} a={S(L, "d0") - 0.1} x={540} y={1450} w={300} n="2" title="Sprunggelenk" sub="elastisch, nicht pressen" col={COL.forest} dim={t > S(L, "e0") ? 1 : 0} />
        <NumCard t={t} a={S(L, "e0") - 0.1} x={890} y={1450} w={300} n="3" title="Fußballen" sub="Bügel dort, Fuß ruhig" col={COL.forest} />
      </g>
      <Merk t={t} at={S(L, "f1") - 0.1} lines={["Ferse nicht erzwingen –", "das Bein muss funktionieren."]} />
      {/* Ende */}
      <g opacity={win(t, S(L, "g1") - 0.1, 99, 0.3)}>
        <SaveCard t={t} a={S(L, "g1")} title="📤 Schick's weiter" sub="an alle, die ständig „Fersen tief“ hören" y={1410} />
        <Brand t={t} a={S(L, "g1") + 1.2} y={1530} />
      </g>
      <Header t={t} label={RF_HEADER} hide={win(t, 0, hookEnd)} />
      <RfTag o={win(t, -1, hookEnd)} />
      <HookText t={t} end={hookEnd} y0={290} lines={[
        { text: "„FERSEN TIEF!“", at: -0.9, hi: true, size: 92 },
        { text: "… und es klappt nicht?", at: S(L, "a2") - 0.1, size: 70 },
      ]} />
      <Title t={t} a={S(L, "b1")} b={S(L, "c0") - 0.1} top="Zu stark gedrückt" sub="Ferse unten – Bein verkrampft" color={COL.rust} y={330} />
      <Title t={t} a={S(L, "c0") - 0.05} b={S(L, "f1") - 0.1} top="So klappt's" color={COL.forest} y={330} />
      <Caption t={t} lines={L} skip={["c0", "d0", "e0", "g1"]} y={1720} />
    </svg>
  );
}
