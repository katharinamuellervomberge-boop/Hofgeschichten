import { BIT, SITZ, type P } from "@/components/illustrations/akademie/geometry";
import { getHorse } from "@/content/horses";
import { Arrow, Brand, COL, Caption, CommentCard, E, FONT_BODY, Header, HookText, PAPER, Pop, S, T, Title, W, H, ease, headPoint, hs, lerp, mkLines, sm, win, wordAt, type Place } from "./nov-kit";
import { Arena, LEATHER, REIN_DIR, RidingHorse, groundSpeed, reinGeom, rideInfo, type RideState } from "./rs-kit";

/* Reitlehrer-Sätze 02 (9:16): „Halt deine Hände ruhig!“
   Schritt als Hauptbeispiel: Kopf und Hals nicken im Takt vor und zurück (hier ±3 cm, zweimal pro Schritt-Zyklus).
   Starre Hand: feste Zügellänge, der Zügel wird bei jedem Nicken kurz straff und hängt dazwischen durch (Spannungskurve).
   Elastische Hand: geht nur entlang der Zügellinie mit (Schulter–Ellenbogen–Handgelenk, Ellenbogen per IK) – kein
   aktives Vor-Zurück-Pumpen, keine durchhängenden Zügel. Zeitlupe nur im Arm-Detail. */

const REC: Array<[string, string, number, number]> = [
  ["a1", "Halt deine Hände ruhig!", 0, 1.54],
  ["a2", "Aber dein Pferd bewegt sich doch die ganze Zeit?!", 1.92, 4.17],
  ["b1", "Viele halten ihre Hände deshalb starr an einer Stelle fest.", 4.56, 7.79],
  ["b2", "Dann wird der Zügel bei jeder Halsbewegung kurz fest,", 8.24, 11.53],
  ["b3", "und dein Pferd spürt das im Maul.", 11.85, 13.55],
  ["c1", "Im Schritt nickt dein Pferd mit Kopf und Hals im Takt vor und zurück.", 13.99, 18.03],
  ["c2", "Eine ruhige Hand begleitet diese Bewegung:", 18.46, 20.76],
  ["c3", "aus lockeren Schultern, elastischen Ellenbogen und einem weichen Handgelenk.", 21.1, 25.43],
  ["c4", "Das gelingt nur, wenn deine Hand unabhängig von deinem Sitz ist.", 25.84, 29.41],
  ["c5", "So bleibt die Verbindung gleichmäßig, ohne Ziehen und ohne durchhängende Zügel.", 29.8, 34.44],
  ["d1", "Eine ruhige Hand ist nicht bewegungslos.", 34.84, 37.45],
  ["d2", "Sie ist unabhängig und elastisch.", 37.79, 39.8],
  ["e1", "Deine Hände sollen also nicht starr sein, sondern die Bewegung deines Pferdes feinfühlig begleiten.", 40.17, 45.63],
  ["e2", "Hat dir das schon mal jemand so erklärt?", 46.01, 47.88],
];
export const RS02_LINES = mkLines(REC);
const L = RS02_LINES;
export const RS02_TOTAL = E(L, "e2") + 2.8;
const at = (id: string, w: string) => wordAt(L, id, w);

const LOOK = getHorse("tivoli")!.look;
const GAIT = "schritt" as const;
const CYCLE = 2.4;

/* ---------- Nicken im Schritt ---------- */
const BASE_NOD = 12;
const nodW = (tt: number) => Math.sin(4 * Math.PI * (tt / CYCLE) + 0.6);
const B_MEAN = headPoint(BIT, BASE_NOD, 0);
const D_MEAN = Math.hypot(B_MEAN[0] - SITZ.hand[0] - 2, B_MEAN[1] - SITZ.hand[1]);
/** elastic: 0 = starre Hand, 1 = Hand begleitet */
function ride(tt: number, elastic: number): RideState {
  const w = nodW(tt);
  const nod = BASE_NOD + 2.4 * w;
  const reach = 3 * w;
  const b = headPoint(BIT, nod, reach);
  const proj = (b[0] - B_MEAN[0]) * REIN_DIR[0] + (b[1] - B_MEAN[1]) * REIN_DIR[1];
  const hand: P = [SITZ.hand[0] + REIN_DIR[0] * proj * elastic, SITZ.hand[1] + REIN_DIR[1] * proj * elastic];
  return { nod, reach, hand, rein: D_MEAN + 0.3 };
}
const tensionAt = (tt: number, elastic: number) => reinGeom(ride(tt, elastic)).tension;

/* ---------- Zeitlupe im Arm-Detail ---------- */
function trapInt(t: number, a: number, b: number, r: number) {
  // Integral einer Trapezfunktion (0→1 in r, 1, 1→0 in r) von -∞ bis t
  const f = (x: number) => {
    if (x <= a) return 0;
    if (x <= a + r) return ((x - a) * (x - a)) / (2 * r);
    if (x <= b - r) return r / 2 + (x - a - r);
    if (x <= b) return r / 2 + (b - a - 2 * r) + (r - ((b - x) * (b - x)) / r) / 2;
    return b - a - r;
  };
  return f(t);
}
const slowA = () => S(L, "c2") + 0.2;
const slowB = () => E(L, "c3") + 0.1;
const SLOW = 0.45;
const horseTime = (t: number) => t - SLOW * trapInt(t, slowA(), slowB(), 0.5);

/* ---------- Kamera ---------- */
const V_FULL: Place = { x: 540 - 160 * 2.6, y: 1390 - 285 * 2.6, k: 2.6 };
const V_HEAD: Place = { x: 540 - 230 * 4.3, y: 1000 - 85 * 4.3, k: 4.3 };
const V_MED: Place = { x: 540 - 190 * 3.2, y: 1010 - 90 * 3.2, k: 3.2 };
const V_ARM: Place = { x: 540 - 205 * 4.8, y: 980 - 72 * 4.8, k: 4.8 };
function camera(t: number): Place {
  const keys: Array<[number, Place]> = [
    [0, V_FULL],
    [S(L, "b1") - 0.35, V_HEAD],
    [S(L, "c1") - 0.2, V_MED],
    [S(L, "c2") - 0.1, V_ARM],
    [S(L, "c4") - 0.2, V_MED],
    [S(L, "e1") - 0.3, V_FULL],
  ];
  let v = keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const u = sm((t - keys[i][0]) / 0.8);
    if (u <= 0) break;
    const n = keys[i][1];
    v = { x: lerp(v.x, n.x, u), y: lerp(v.y, n.y, u), k: lerp(v.k, n.k, u) };
  }
  return v;
}

/** Spannungskurve der Zügelverbindung (letzte 2,4 s) */
function Graph({ t, tt, elastic, x, y, w, h, o, small }: { t: number; tt: number; elastic: number; x: number; y: number; w: number; h: number; o: number; small?: boolean }) {
  if (o <= 0) return null;
  const n = 90;
  const span = 2.4;
  const mid = y + h * 0.55;
  const sc = (h * 0.42) / 4;
  const pts = Array.from({ length: n + 1 }, (_, i) => {
    const q = tt - span + (span * i) / n;
    const v = Math.max(-4.2, Math.min(4.2, tensionAt(q, elastic)));
    return `${(x + 24 + ((w - 48) * i) / n).toFixed(1)},${(mid - v * sc).toFixed(1)}`;
  });
  const cur = tensionAt(tt, elastic);
  const band = [mid - 0.7 * sc, mid + 1.3 * sc];
  const fs = small ? 22 : 26;
  return (
    <g opacity={o}>
      <rect x={x} y={y} width={w} height={h} rx="26" fill={PAPER} stroke={COL.sand} strokeWidth="3" />
      <rect x={x + 16} y={band[0]} width={w - 32} height={band[1] - band[0]} rx="8" fill={COL.sage} />
      <T x={x + w - 24} y={y + fs + 10} size={fs} font={FONT_BODY} weight={700} color={COL.rust} anchor="end">zieht</T>
      <T x={x + w - 24} y={y + h - 14} size={fs} font={FONT_BODY} weight={700} color={COL.honey} anchor="end">hängt durch</T>
      <T x={x + 24} y={y + fs + 10} size={fs} font={FONT_BODY} weight={700} color={COL.inkSoft} anchor="start">Zügelspannung</T>
      <polyline points={pts.join(" ")} fill="none" stroke={elastic > 0.5 ? COL.forest : COL.rust} strokeWidth={small ? 5 : 6} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={x + w - 24} cy={mid - Math.max(-4.2, Math.min(4.2, cur)) * sc} r={small ? 8 : 10} fill={elastic > 0.5 ? COL.forest : COL.rust} />
    </g>
  );
}

/** Nick-Spur des Trensenrings über einen Takt (Pferde-Koordinaten) */
const TRACE = (() => {
  const pts = Array.from({ length: 41 }, (_, i) => {
    const q = (i / 40) * (CYCLE / 2);
    const w = nodW(q);
    return headPoint(BIT, BASE_NOD + 2.4 * w, 3 * w);
  });
  return "M" + pts.map((p) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" L");
})();

/** Vergleichsfenster: Vorderhälfte von Pferd + Reiterin */
function Panel({ t, tt, x, elastic }: { t: number; tt: number; x: number; elastic: boolean }) {
  const k = 2.2;
  const pl: Place = { x: x + 22 - (190 - 70) * k, y: 680 - 10 * k, k };
  const id = elastic ? "q-r" : "q-l";
  const s = ride(tt, elastic ? 1 : 0);
  const info = rideInfo(tt, GAIT, s);
  const col = elastic ? COL.forest : COL.rust;
  const tight = !elastic && info.tension > 0.2;
  return (
    <g>
      <defs><clipPath id={`${id}-c`}><rect x={x + 10} y={640} width={520} height={660} rx="36" /></clipPath></defs>
      <g clipPath={`url(#${id}-c)`}>
        <g transform={`translate(${x - 270} 0)`}><Arena t={tt} speed={groundSpeed(GAIT, k)} y={pl.y + 285 * k} top={640} /></g>
        <RidingHorse t={tt} pl={pl} look={LOOK} gait={GAIT} id={id} s={s} reinColor={tight ? COL.rust : LEATHER} reinW={2.8} glow={elastic ? COL.forest : tight ? COL.rust : undefined} />
      </g>
      <rect x={x + 10} y={640} width={520} height={660} rx="36" fill="none" stroke={col} strokeWidth="6" />
      <g transform={`translate(${x + 180} 596)`}>
        <circle r="30" fill={col} />
        <T x={0} y={14} size={38} font={FONT_BODY} weight={700} color={PAPER}>{elastic ? "✓" : "✗"}</T>
      </g>
      <T x={x + 225} y={610} size={38} font={FONT_BODY} weight={700} color={col} anchor="start">{elastic ? "elastisch" : "starr"}</T>
      <Graph t={t} tt={tt} elastic={elastic ? 1 : 0} x={x + 20} y={1320} w={500} h={190} o={1} small />
    </g>
  );
}

export function renderRS02(t: number) {
  const tt = horseTime(t);
  const pl = camera(t);
  const elastic = sm((t - S(L, "c2") + 0.1) / 0.6);
  const s = ride(tt, elastic);
  const info = rideInfo(tt, GAIT, s);
  const rigidO = 1 - elastic;
  const tight = info.tension > 0.2;

  const splitA = S(L, "d1") - 0.15;
  const splitB = E(L, "d2") + 0.25;
  const splitO = win(t, splitA, splitB, 0.4);
  const mainO = 1 - splitO;

  const hookEnd = E(L, "a2") + 0.1;
  const nodO = Math.max(win(t, at("a2", "bewegt") - 0.2, hookEnd), win(t, S(L, "c1"), E(L, "c1") + 0.2));
  const bTight = win(t, S(L, "b2"), E(L, "b3") + 0.2);
  const mouthO = win(t, at("b3", "Maul") - 0.4, E(L, "b3") + 0.2);
  const armO = win(t, S(L, "c3") - 0.1, E(L, "c3") + 0.2);
  const shO = armO * ease((t - at("c3", "Schultern") + 0.1) / 0.3);
  const elO = armO * ease((t - at("c3", "Ellenbogen") + 0.1) / 0.3);
  const wrO = armO * ease((t - at("c3", "Handgelenk") + 0.1) / 0.3);
  const followO = win(t, S(L, "c2") + 0.3, E(L, "c3") + 0.2);
  const indepO = win(t, S(L, "c4"), E(L, "c4") + 0.2);
  const graphO = Math.max(win(t, S(L, "b2"), E(L, "b3") + 0.2), win(t, S(L, "c5"), E(L, "c5") + 0.2));
  const slowO = win(t, slowA() + 0.2, slowB() - 0.2);
  const endO = win(t, S(L, "e2") - 0.1, RS02_TOTAL + 1);
  const hideHead = Math.max(win(t, 0, hookEnd), splitO, endO);

  const reinColor = rigidO > 0.5 && tight ? COL.rust : LEATHER;
  const glow = rigidO > 0.5 ? (tight && t > S(L, "b1") ? COL.rust : undefined) : t > S(L, "c2") ? COL.forest : undefined;
  const scr = (p: P) => hs(pl, [p[0], p[1] + info.bob]);
  const bitS = scr(info.b);
  const handS = scr(info.h);
  const elbowS = scr(info.body.elbow);
  const shS = scr(info.body.shoulder);
  const hipS = scr(info.body.hip);
  const w = nodW(tt);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />

      {mainO > 0.01 && (
        <g opacity={mainO}>
          <Arena t={tt} speed={groundSpeed(GAIT, pl.k)} y={pl.y + 285 * pl.k} />
          <RidingHorse
            t={tt} pl={pl} look={LOOK} gait={GAIT} id="rs02" s={s} reinColor={reinColor} reinW={2.6} glow={glow}
            over={
              <g>
                {nodO > 0 && (
                  <g opacity={nodO}>
                    <path d={TRACE} fill="none" stroke={COL.honey} strokeWidth="2.4" strokeDasharray="3 3" />
                  </g>
                )}
                {mouthO > 0 && (
                  <g opacity={mouthO}>
                    <circle cx={info.b[0]} cy={info.b[1]} r={10 + (tight ? 4 : 0)} fill="none" stroke={COL.rust} strokeWidth="3" />
                  </g>
                )}
              </g>
            }
          />

          {/* Hook + Nicken: vor / zurück */}
          {nodO > 0 && (
            <g opacity={nodO}>
              <Arrow from={[bitS[0] + 60, bitS[1] - 120]} to={[bitS[0] + 60 + 70 * Math.sign(w || 1), bitS[1] - 120 + 34 * Math.sign(w || 1)]} color={COL.honey} w={7} head={18} />
              <Pop t={t} a={-1} x={Math.min(960, bitS[0] + 40)} y={bitS[1] - 190} text={w > 0 ? "vor ↘" : "zurück ↖"} fill={COL.honey} color={COL.forestDeep} size={32} />
            </g>
          )}

          {/* Starre Hand */}
          <Pop t={t} a={at("b1", "starr") - 0.1} x={handS[0]} y={handS[1] - 120} text="starr fest" fill={COL.rust} size={32} o={win(t, S(L, "b1"), E(L, "b1") + 0.2)} />
          <Pop t={t} a={E(L, "b1") - 0.6} x={540} y={1470} text="RUHIG ≠ STARR" fill={COL.rust} size={48} o={win(t, E(L, "b1") - 0.6, E(L, "b3") + 0.2)} />
          {bTight > 0 && tight && <Pop t={t} a={-1} x={Math.min(950, bitS[0] + 20)} y={bitS[1] + 110} text="zieht!" fill={COL.rust} size={34} o={bTight} />}
          <Pop t={t} a={at("b3", "Maul") - 0.3} x={Math.min(930, bitS[0])} y={bitS[1] + 200} text="spürt es im Maul" fill={COL.rust} size={32} o={mouthO} />

          {/* Arm-Detail */}
          {armO > 0 && (
            <g opacity={armO}>
              {([[shS, shO, "lockere Schulter", [250, 600]], [elbowS, elO, "elastischer Ellenbogen", [300, 1180]], [handS, wrO, "weiches Handgelenk", [700, 1240]]] as Array<[P, number, string, P]>).map(([p, o, label, lp]) =>
                o > 0.01 ? (
                  <g key={label} opacity={o}>
                    <path d={`M${lp[0]} ${lp[1]} L${p[0]} ${p[1]}`} stroke={COL.honey} strokeWidth="4" strokeDasharray="8 7" />
                    <circle cx={p[0]} cy={p[1]} r="30" fill="none" stroke={COL.honey} strokeWidth="6" />
                    <Pop t={t} a={-1} x={lp[0]} y={lp[1] + 12} text={label} fill={COL.honey} color={COL.forestDeep} size={30} />
                  </g>
                ) : null,
              )}
            </g>
          )}
          {followO > 0 && (
            <g opacity={followO * (1 - armO * 0.6)}>
              <Arrow from={[handS[0] - REIN_DIR[0] * 80, handS[1] - REIN_DIR[1] * 80 - 50]} to={[handS[0] + REIN_DIR[0] * 80, handS[1] + REIN_DIR[1] * 80 - 50]} color={COL.forest} w={6} head={16} />
              <Arrow from={[handS[0] + REIN_DIR[0] * 80, handS[1] + REIN_DIR[1] * 80 - 50]} to={[handS[0] - REIN_DIR[0] * 80, handS[1] - REIN_DIR[1] * 80 - 50]} color={COL.forest} w={6} head={16} />
            </g>
          )}
          {slowO > 0 && <Pop t={t} a={slowA() + 0.2} x={900} y={500} text="Zeitlupe" fill={COL.forestDeep} size={28} o={slowO} />}

          {/* Unabhängig vom Sitz */}
          {indepO > 0 && (
            <g opacity={indepO}>
              <path d={`M260 700 L${hipS[0]} ${hipS[1]}`} stroke={COL.honey} strokeWidth="4" strokeDasharray="8 7" />
              <circle cx={hipS[0]} cy={hipS[1]} r="26" fill="none" stroke={COL.honey} strokeWidth="6" />
              <Pop t={t} a={S(L, "c4") + 0.3} x={250} y={670} text="Sitz schwingt mit" fill={COL.honey} color={COL.forestDeep} size={30} />
              <path d={`M800 700 L${handS[0]} ${handS[1]}`} stroke={COL.forest} strokeWidth="4" strokeDasharray="8 7" />
              <circle cx={handS[0]} cy={handS[1]} r="26" fill="none" stroke={COL.forest} strokeWidth="6" />
              <Pop t={t} a={at("c4", "unabhängig") - 0.1} x={810} y={670} text="Hand: unabhängig" fill={COL.forest} size={30} />
            </g>
          )}

          {/* Spannungskurve */}
          <Graph t={t} tt={tt} elastic={elastic} x={150} y={440} w={780} h={200} o={graphO} />
          <Pop t={t} a={at("c5", "Ziehen") - 0.1} x={330} y={700} text="✓ ohne Ziehen" fill={COL.forest} size={30} o={win(t, S(L, "c5"), E(L, "c5") + 0.2)} />
          <Pop t={t} a={at("c5", "durchhängende") - 0.1} x={740} y={700} text="✓ ohne Durchhängen" fill={COL.forest} size={30} o={win(t, S(L, "c5"), E(L, "c5") + 0.2)} />
        </g>
      )}

      {/* Vergleich */}
      {splitO > 0.01 && (
        <g opacity={splitO}>
          <rect width={W} height={H} fill={COL.bg} />
          <Panel t={t} tt={tt} x={0} elastic={false} />
          <Panel t={t} tt={tt + 0.0} x={540} elastic />
          <g opacity={ease((t - S(L, "d1") + 0.1) / 0.4)}>
            <T x={540} y={250} size={60} color={COL.rust}>EINE RUHIGE HAND IST</T>
            <T x={540} y={322} size={60} color={COL.rust}>NICHT BEWEGUNGSLOS.</T>
          </g>
          <g opacity={ease((t - S(L, "d2") + 0.1) / 0.4)} transform={`translate(0 ${(1 - ease((t - S(L, "d2") + 0.1) / 0.4)) * 30})`}>
            <T x={540} y={445} size={60} color={COL.forest}>SIE IST UNABHÄNGIG</T>
            <T x={540} y={517} size={60} color={COL.forest}>UND ELASTISCH.</T>
          </g>
        </g>
      )}

      {endO > 0 && (
        <g opacity={endO}>
          <CommentCard t={t} a={S(L, "e2") - 0.05} lines={["Hat dir das schon mal", "jemand so erklärt? 👀"]} sub="Schreib’s in die Kommentare 👇" y={250} />
          <Brand t={t} a={E(L, "e2") - 0.1} sub="Mehr Reitwissen, das endlich Sinn ergibt" y={1430} />
        </g>
      )}

      <Header t={t} label="Die Hofgeschichten · Reitlehrer-Sätze" hide={hideHead} />
      <HookText t={t} end={hookEnd} size={70} gap={88} y0={240} lines={[
        { text: "„Halt deine", at: -0.9 },
        { text: "HÄNDE RUHIG!“", at: at("a1", "Hände") - 0.15, hi: true, size: 90 },
        { text: "Aber dein Pferd bewegt sich", at: S(L, "a2") },
        { text: "doch die ganze Zeit?! 🤔", at: at("a2", "ganze") - 0.2, italic: true },
      ]} />
      <Title t={t} a={S(L, "b1")} b={E(L, "b3")} top="Die starre Hand" sub="Hände fest an einer Stelle" color={COL.rust} />
      <Title t={t} a={S(L, "c1")} b={E(L, "c1")} top="Nicken im Takt" sub="Kopf und Hals gehen im Schritt vor und zurück" color={COL.forest} />
      <Title t={t} a={S(L, "c2")} b={E(L, "c3")} top="Die Hand begleitet" sub="Schulter · Ellenbogen · Handgelenk" color={COL.forest} />
      <Title t={t} a={S(L, "c4")} b={E(L, "c4")} top="Unabhängig vom Sitz" sub="der Sitz geht mit – die Hand bleibt fein" color={COL.forest} />
      <Title t={t} a={S(L, "c5")} b={E(L, "c5")} top="Gleichmäßige Verbindung" color={COL.forest} />
      <Title t={t} a={S(L, "e1")} b={E(L, "e1") + 0.3} top="Nicht starr –" sub="sondern feinfühlig begleiten" color={COL.forest} />
      <Caption t={t} lines={L} skip={["a1", "a2", "d1", "d2", "e2"]} y={1600} />
    </svg>
  );
}
