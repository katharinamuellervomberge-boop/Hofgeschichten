import type { ReactNode } from "react";
import { BIT, SITZ, type P } from "@/components/illustrations/akademie/geometry";
import { getHorse } from "@/content/horses";
import { COL, Caption, FONT_BODY, NodHorse, PAPER, Pop, T, W, ease, headPoint, hs, lerp, sm, type Place, type VLine } from "./nov-kit";
import { Ride, Stamp, pose } from "./n2-kit";
import { Arena, LEATHER, RidingHorse, groundSpeed, rideInfo, type RideState } from "./rs-kit";
import { Big, Bubble, Face, Frame, vo, type VoLines } from "./viral-kit";
import { Tag } from "./hg1-haenger-reel";
import { Mark2, RiderCTA, Ring, StepHead } from "./t3-kit";
import LJ from "./anlehnung-lines.json";

/* Rider Academy · „Was bedeutet eigentlich Anlehnung?“ (comp `anlehnung`, 19.11.2026), Jessica v4 ×1,25.
   Fachlich: Anlehnung = stete, weich federnde Verbindung zwischen Reiterhand und Pferdemaul; sie entsteht von hinten
   (Hinterhand → Rücken → nach vorn) und trifft auf eine ruhige, elastisch mitgehende Hand. Keine Kopfposition:
   Kopf herunterziehen, Form erzwingen oder viel Zügeldruck sind keine Anlehnung; ein tiefer Kopf allein auch nicht.
   Bestand: RidingHorse/rideInfo, n2 Ride + pose, NodHorse, Face/Bubble/Big/Stamp, Ring/Mark2/Tag, Akademie-Handy.
   Neu: Energie-Linie über den Pferdekörper, Feder-Zügel (elastische Verbindung statt starrem Seil). */

const { S, E, total } = vo(LJ as VoLines);
export const ANL_TOTAL = total;
const TXT = [
  "Alle sagen immer:", "Dein Pferd muss in Anlehnung laufen.", "Aber was bedeutet Anlehnung eigentlich?",
  "Und nein: Es bedeutet nicht, den Kopf irgendwie runterzuziehen.",
  "Anlehnung ist eine weiche, gleichmäßige Verbindung zwischen deiner Hand und dem Pferdemaul.", "Stell sie dir vor wie ein ruhiges Gespräch.",
  "Keine durchhängenden Zügel.", "Und kein Ziehen nach hinten.", "Das Wichtigste:", "Anlehnung beginnt nicht an der Hand.",
  "Dein Pferd geht locker und aktiv von hinten nach vorne.", "Die Bewegung läuft über den Rücken nach vorn –", "zu einer ruhigen, mitgehenden Hand.",
  "Also:", "vorwärts reiten,", "Verbindung halten,", "mitgehen.", "Du solltest das Pferdemaul fühlen –", "aber nicht daran ziehen müssen.",
  "Ein tiefer Kopf allein ist keine Anlehnung.", "Anlehnung ist keine Kopfposition.", "Sie ist eine Verbindung.",
  "Genau solche Begriffe übersetzen wir dir in unserer Rider Academy.",
];
const id = (i: number) => String(i).padStart(2, "0");
const CAP: VLine[] = TXT.map((text, i) => { const [a, b] = (LJ as VoLines).lines[id(i + 1)]; return { id: id(i + 1), text, start: a, dur: b - a }; });

const LOOK = getHorse("tonga")!.look;
const NOD = 9;
const B0 = headPoint(BIT, NOD, 0);
const REIN = Math.hypot(B0[0] - SITZ.hand[0] - 2, B0[1] - SITZ.hand[1]) + 0.3;
const rs = (pull = 0, nod = NOD, slack = 0.3): RideState => ({ nod, reach: 0, hand: [SITZ.hand[0] - 9 * pull, SITZ.hand[1] + pull], rein: REIN - 0.3 + slack });
const V: Place = { x: 540 - 160 * 3.0, y: 1440 - 285 * 3.0, k: 3.0 };

/** Feder zwischen zwei Punkten (elastische Verbindung) */
function Spring({ a, b, coils = 9, amp = 18, col = COL.forest, w = 7 }: { a: P; b: P; coils?: number; amp?: number; col?: string; w?: number }) {
  const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy), ux = dx / l, uy = dy / l, nx = -uy, ny = ux;
  const pts: string[] = [`${a[0]},${a[1]}`];
  const n = coils * 2;
  for (let i = 1; i < n; i++) {
    const u = 0.08 + 0.84 * (i / n), s = i % 2 ? amp : -amp;
    pts.push(`${(a[0] + dx * u + nx * s).toFixed(1)},${(a[1] + dy * u + ny * s).toFixed(1)}`);
  }
  pts.push(`${b[0]},${b[1]}`);
  return <path d={"M" + pts.join(" L")} stroke={col} strokeWidth={w} fill="none" strokeLinejoin="round" strokeLinecap="round" />;
}

/* ---------- Szenen ---------- */
function Hook({ t }: { t: number }) {
  const q = t >= S("03") - 0.1;
  return (
    <g>
      {q && <Big t={t} a={S("03") - 0.1} lines={["Was bedeutet", "Anlehnung eigentlich?"]} y={230} size={90} col={COL.rust} />}
      <Face t={t} x={270} y={q ? 760 : 640} r={130} kind="trainer" mood="neutral" label="Alle" />
      <Face t={t} x={810} y={q ? 760 : 640} r={130} kind="reiter" mood={q ? "what" : "confused"} label="Ich" look={-0.6} />
      <Bubble t={t} a={0.05} label="Reitlehrerin" lines={["„Dein Pferd muss in", "ANLEHNUNG laufen!“"]} y={1060} size={66} fill={COL.forest} />
    </g>
  );
}
function NotPull({ t }: { t: number }) {
  const a = S("04");
  const pull = sm((t - a - 0.3) / 0.5);
  const s = rs(pull * 1.1, lerp(NOD, 38, pull));
  return (
    <g>
      <Arena t={t} speed={groundSpeed("trab", V.k)} y={V.y + 285 * V.k} top={540} />
      <RidingHorse t={t} pl={V} look={LOOK} gait="trab" id="an-np" s={s} reinColor={COL.rust} reinW={3.2} glow={pull > 0.4 ? COL.rust : undefined} />
      <Big t={t} a={a - 0.12} lines={["Und nein:"]} y={250} size={110} />
      {t >= a + 0.9 && <Stamp t={t} a={a + 0.9} x={540} y={450} text="✗ KOPF RUNTERZIEHEN" size={50} />}
    </g>
  );
}
function Define({ t }: { t: number }) {
  const a = S("05");
  const talk = t >= S("06");
  const info = rideInfo(t, "trab", rs());
  const hand = hs(V, [info.h[0], info.h[1] + info.bob]);
  const bit = hs(V, [info.b[0], info.b[1] + info.bob]);
  const turn = Math.floor((t - S("06")) / 0.7) % 2;
  return (
    <g>
      <Arena t={t} speed={groundSpeed("trab", V.k)} y={V.y + 285 * V.k} top={540} />
      <RidingHorse t={t} pl={V} look={LOOK} gait="trab" id="an-df" s={rs()} reinColor={COL.forest} reinW={3.2} />
      <Big t={t} a={a - 0.12} lines={["Anlehnung =", "eine Verbindung"]} y={210} size={92} />
      <Tag x={540} y={470} text="weich · gleichmäßig · Hand ↔ Pferdemaul" size={36} fill={COL.forest} o={ease((t - a - 0.6) / 0.3)} />
      {talk && [hand, bit].map((p, i) => (
        <g key={i} transform={`translate(${p[0] + (i ? 40 : -70)} ${p[1] - 120})`} opacity={turn === i ? 1 : 0.35}>
          <rect x={-60} y={-40} width={120} height={70} rx={30} fill={PAPER} stroke={COL.forest} strokeWidth="5" />
          <T x={0} y={12} size={40} font={FONT_BODY} weight={900} color={COL.forest}>…</T>
        </g>
      ))}
      {talk && <Tag x={540} y={570} text="wie ein ruhiges Gespräch" size={34} fill={COL.honey} color={COL.forestDeep} o={ease((t - S("06")) / 0.3)} />}
    </g>
  );
}
function NotSo({ t }: { t: number }) {
  const a = S("07");
  const k = 1.45;
  const R = Math.hypot(headPoint(BIT, 6, 0)[0] - SITZ.hand[0], headPoint(BIT, 6, 0)[1] - SITZ.hand[1]) + 1.5;
  const panel = (g: number, kind: "slack" | "pull", o: number, idp: string, label: string) => {
    if (o <= 0.01) return null;
    const pl: Place = { x: 560 - 160 * k, y: g - 285 * k, k };
    const b = kind === "pull" ? pose({ handDx: -10, handDy: 2 }) : pose({});
    return (
      <g opacity={o}>
        <rect x={40} y={g - 410} width={1000} height={480} rx={34} fill="#F3DED6" />
        <Ride t={t} pl={pl} gait="trab" id={idp} b={b} nod={kind === "pull" ? 30 : 6} look={LOOK} rein={kind === "slack" ? R + 16 : undefined} glow={COL.rust} />
        <Mark2 t={t} a={kind === "slack" ? a + 0.1 : S("08")} x={110} y={g - 340} ok={false} r={40} />
        <T x={540} y={g + 50} size={34} font={FONT_BODY} weight={900} color={COL.rust}>{label}</T>
      </g>
    );
  };
  return (
    <g>
      <Big t={t} a={a - 0.12} lines={["Nicht so:"]} y={260} size={110} />
      {t >= S("08") + 1.0 && <Tag x={540} y={460} text="✓ weich & gleichmäßig" size={40} fill={COL.forest} o={ease((t - S("08") - 1.0) / 0.3)} />}
      {panel(940, "slack", ease((t - a) / 0.3), "an-sl", "Zügel hängen durch")}
      {panel(1430, "pull", ease((t - S("08") + 0.05) / 0.3), "an-pl", "Kopf nach hinten ziehen")}
    </g>
  );
}
function Big1({ t }: { t: number }) {
  const a = S("09");
  const z = 1 + 0.05 * sm((t - a) / 2);
  return (
    <g transform={`translate(540 960) scale(${z}) translate(-540 -960)`}>
      <T x={540} y={700} size={40} font={FONT_BODY} weight={900} color={COL.rust}>DAS WICHTIGSTE</T>
      <Big t={t} a={S("10") - 0.1} lines={["ANLEHNUNG", "BEGINNT NICHT", "AN DER HAND."]} y={880} size={110} col={COL.forestDeep} />
    </g>
  );
}
const FLOW: P[] = [[112, 268], [106, 190], [112, 128], [150, 104], [215, 102], [268, 96], [300, 82], [330, 62]];
function Flow({ t }: { t: number }) {
  const a = S("11");
  const info = rideInfo(t, "trab", rs());
  const pts = FLOW.map((p) => hs(V, [p[0], p[1] + info.bob]));
  const bit = hs(V, [info.b[0], info.b[1] + info.bob]);
  const hand = hs(V, [info.h[0], info.h[1] + info.bob]);
  const all = [...pts, bit, hand];
  const d = "M" + all.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" L");
  const grow = sm((t - a - 0.2) / (E("13") - a - 0.4));
  const chain = ["HINTERHAND", "RÜCKEN", "NACH VORNE", "WEICHE HAND"];
  const ci = Math.min(3, Math.floor(grow * 4.2));
  return (
    <g>
      <Arena t={t} speed={groundSpeed("trab", V.k)} y={V.y + 285 * V.k} top={540} />
      <RidingHorse t={t} pl={V} look={LOOK} gait="trab" id="an-fl" s={rs()} reinColor={COL.forest} reinW={3} />
      <path d={d} stroke={COL.honey} strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={`${grow} 1`} opacity=".9" />
      <path d={d} stroke={PAPER} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="0.02 0.05" strokeDashoffset={-t * 0.25} opacity={0.8 * Math.min(1, grow * 3)} />
      {grow > 0.95 && <Ring t={t} x={hand[0]} y={hand[1]} col={COL.forest} o={sm((t - S("13")) / 0.3)} r={26} />}
      <StepHead t={t} a={a - 0.12} label="VON HINTEN NACH VORNE" title="So entsteht Anlehnung" size={80} />
      {chain.map((c, i) => i <= ci && (
        <g key={c} opacity={ease((grow * 4.2 - i) / 0.6)}>
          <Tag x={[165, 395, 640, 900][i]} y={430} text={c} size={31} fill={i === 3 ? COL.forest : COL.honey} color={i === 3 ? PAPER : COL.forestDeep} />
          {i > 0 && <T x={[290, 520, 770][i - 1]} y={442} size={30} font={FONT_BODY} weight={900} color={COL.inkSoft}>→</T>}
        </g>
      ))}
      {t >= S("13") && <Tag x={540} y={530} text="die Hand blockiert die Bewegung nicht" size={30} fill={COL.forestDeep} o={ease((t - S("13")) / 0.3)} />}
    </g>
  );
}
function Tasks({ t }: { t: number }) {
  const a = S("14");
  const info = rideInfo(t, "trab", rs());
  const hand = hs(V, [info.h[0], info.h[1] + info.bob]);
  const items: Array<[string, string]> = [["1 Vorwärts reiten", COL.honey], ["2 Verbindung halten", COL.forest], ["3 Mit der Bewegung mitgehen", COL.brown]];
  return (
    <g>
      <Arena t={t} speed={groundSpeed("trab", V.k)} y={V.y + 285 * V.k} top={540} />
      <RidingHorse t={t} pl={V} look={LOOK} gait="trab" id="an-ts" s={rs()} reinColor={t >= S("16") ? COL.forest : LEATHER} reinW={3} />
      <Big t={t} a={a - 0.12} lines={["Deine Aufgabe"]} y={230} size={100} />
      {items.map(([s, c], i) => t >= S(id(15 + i)) - 0.05 && <Tag key={s} x={540} y={350 + i * 82} text={s} size={38} fill={c} color={i === 0 ? COL.forestDeep : PAPER} o={ease((t - S(id(15 + i)) + 0.05) / 0.25)} />)}
      {t >= S("15") && <g opacity={ease((t - S("15")) / 0.3) * (t < S("16") ? 1 : 0.4)}><path d={`M680 ${1030} H${880 + 20 * Math.sin(t * 6)}`} stroke={COL.honey} strokeWidth="14" strokeLinecap="round" /><path d={`M${880 + 20 * Math.sin(t * 6)} 1010 l30 20 l-30 20`} fill={COL.honey} /></g>}
      <Ring t={t} x={hand[0]} y={hand[1]} col={COL.brown} o={sm((t - S("17") + 0.05) / 0.25)} r={24} />
    </g>
  );
}
function Feel({ t }: { t: number }) {
  const a = S("18");
  const k = 4.2;
  const nod = 6 + 4 * Math.sin(t * 3.4);
  const pl: Place = { x: 860 - (352 - 70) * k, y: 1080 - (118 - 20) * k, k };
  const bit = hs(pl, headPoint(BIT, nod, 0));
  const hand: P = [190 + 14 * Math.sin(t * 3.4), 1140];
  const no = t >= S("19") - 0.05;
  return (
    <g>
      <defs><clipPath id="an-fc"><rect x={500} y={560} width={W - 500} height={950} rx={40} /></clipPath></defs>
      <g clipPath="url(#an-fc)">
        <NodHorse t={t} pl={pl} look={LOOK} gait="stand" id="an-fe" nod={nod} />
      </g>
      <path d={`M-40 1260 L${hand[0] - 20} ${hand[1] + 20}`} stroke="#2E3D31" strokeWidth="60" strokeLinecap="round" />
      <circle cx={hand[0]} cy={hand[1]} r={42} fill="#E8AE86" stroke="#C98E68" strokeWidth="5" />
      <Spring a={[hand[0] + 30, hand[1] - 6]} b={bit} amp={16 + 4 * Math.sin(t * 3.4)} col={COL.forest} w={8} />
      <Tag x={hand[0] + 10} y={1250} text="Hand" size={30} fill={PAPER} color={COL.forestDeep} />
      <Tag x={bit[0] - 40} y={bit[1] + 110} text="Pferdemaul" size={30} fill={PAPER} color={COL.forestDeep} />
      <Big t={t} a={a - 0.12} lines={["Das Gefühl"]} y={230} size={100} />
      <Pop t={t} a={a + 0.4} x={330} y={430} text="fühlen ✓" fill={COL.forest} size={48} />
      {no && <Pop t={t} a={S("19")} x={760} y={430} text="ziehen ✗" fill={COL.rust} size={48} />}
      {t >= S("19") + 0.6 && <Tag x={540} y={540} text="elastisch wie eine Feder – kein starres Seil" size={30} fill={COL.honey} color={COL.forestDeep} o={ease((t - S("19") - 0.6) / 0.3)} />}
    </g>
  );
}
function LowHead({ t }: { t: number }) {
  const a = S("20");
  const s = rs(0.9, 34);
  return (
    <g>
      <Arena t={t} speed={groundSpeed("trab", V.k)} y={V.y + 285 * V.k} top={540} />
      <RidingHorse t={t} pl={V} look={LOOK} gait="trab" id="an-lh" s={s} reinColor={COL.rust} reinW={3} />
      <Big t={t} a={a - 0.12} lines={["Kopf tief ≠ Anlehnung"]} y={240} size={88} col={COL.rust} />
      {["✗ Kopf runterziehen", "✗ Form erzwingen", "✗ viel Druck"].map((c, i) => <Pop key={c} t={t} a={a + 0.5 + i * 0.3} x={[200, 540, 880][i]} y={420} text={c} fill={COL.rust} size={32} />)}
    </g>
  );
}
function Motto({ t }: { t: number }) {
  const a = S("21");
  const two = t >= S("22") - 0.1;
  const sp = sm((t - S("22")) / 0.5);
  return (
    <g>
      <Big t={t} a={a - 0.1} lines={["Anlehnung ist", "keine Kopfposition."]} y={560} size={92} />
      {two && <Big t={t} a={S("22") - 0.1} lines={["Sie ist eine", "VERBINDUNG."]} y={900} size={104} col={COL.forest} />}
      {two && (
        <g opacity={sp}>
          <circle cx={250} cy={1260} r={40} fill="#E8AE86" stroke="#C98E68" strokeWidth="5" />
          <Spring a={[290, 1260]} b={[790, 1260]} amp={18 + 5 * Math.sin(t * 3)} col={COL.forest} w={8} />
          <circle cx={830} cy={1260} r={40} fill={COL.brown} />
          <T x={250} y={1350} size={28} font={FONT_BODY} weight={800} color={COL.inkSoft}>Hand</T>
          <T x={830} y={1350} size={28} font={FONT_BODY} weight={800} color={COL.inkSoft}>Pferdemaul</T>
        </g>
      )}
    </g>
  );
}

export function renderAnlehnung(t: number) {
  const ids = ["04", "05", "07", "09", "11", "14", "18", "20", "21", "23"];
  const cuts = ids.map((k) => S(k) - 0.12);
  const scenes = [Hook, NotPull, Define, NotSo, Big1, Flow, Tasks, Feel, LowHead, Motto];
  let body: ReactNode = null;
  let i = 0;
  while (i < cuts.length && t >= cuts[i]) i++;
  if (i < scenes.length) { const Sc = scenes[i]; body = <Sc t={t} />; }
  else body = <RiderCTA t={t} a={S("23")} b={S("23") + 1.6} fin={E("23") + 0.5} module={4} title={["Reitbegriffe", "endlich verstehen?"]} id="an-ph" />;
  return <Frame t={t} cuts={cuts} after={<Caption t={t} lines={CAP} y={1580} />}>{body}</Frame>;
}
export function renderAnlehnungCover() {
  return (
    <Frame t={5} cuts={[]}>
      <Big t={5} a={0} lines={["Was bedeutet", "ANLEHNUNG", "eigentlich?"]} y={300} size={110} />
      <Tag x={540} y={720} text="Spoiler: keine Kopfposition" size={44} fill={COL.rust} />
      <circle cx={250} cy={1100} r={50} fill="#E8AE86" stroke="#C98E68" strokeWidth="5" />
      <Spring a={[300, 1100]} b={[790, 1100]} amp={22} col={COL.forest} w={10} />
      <circle cx={830} cy={1100} r={50} fill={COL.brown} />
      <T x={250} y={1210} size={34} font={FONT_BODY} weight={800} color={COL.inkSoft}>Hand</T>
      <T x={830} y={1210} size={34} font={FONT_BODY} weight={800} color={COL.inkSoft}>Pferdemaul</T>
    </Frame>
  );
}
