import { Brand, COL, Caption, E, Header, HookText, PAPER, Pop, S, T, Title, W, H, ease, lerp, mkLines, sm, win, wordAt } from "./nov-kit";
import { Merk } from "./rkit";
import { Callout, HAND_IN, HAND_OUT, LEG_IN, LOOKS, TopHorse, legOut, world, type Pt } from "./top";
import { RF_HEADER, RfTag, SaveCard } from "./rf-kit";

/* RIDER FIX 4 (9:16): „Kleeblatt über vier Stangen im Galopp“ (comp `rf-kleeblatt`)
   Draufsicht: vier Bodenstangen als Kreuz, Kleeblatt-Linie mit vier Linkswendungen (270°) → durchgehend Linksgalopp.
   Hilfen nach FN: halbe Parade vor jeder Wendung / nach der Landung; Einrahmen in der Wendung
   (Gewicht innen, innerer Schenkel am Gurt treibt + biegt, äußerer Schenkel verwahrend dahinter,
   innerer Zügel stellt, äußerer begrenzt); drängt das Pferd nach innen → innerer Schenkel treibt mehr an den äußeren Zügel.
   Stange: gerade auf die Mitte, drüber leicht entlasten, Hand geht mit. Sprung von oben: Schatten löst sich, Pferd wird größer, Zeitlupe. */

const REC: Array<[string, string, number, number]> = [
  ["a1", "Vier Stangen, ein Kleeblatt – alles im Linksgalopp.", 0, 3.32],
  ["a2", "Aber wann kommt welche Hilfe?", 3.72, 5.4],
  ["b1", "Vor jeder Wendung kommt eine halbe Parade.", 5.72, 8.05],
  ["b2", "So wird dein Pferd aufmerksam und nimmt sich zurück.", 8.37, 10.93],
  ["c0", "In der Wendung rahmst du ein:", 11.33, 12.96],
  ["c1", "Gewicht leicht nach innen,", 13.38, 14.9],
  ["c2", "innerer Schenkel am Gurt.", 15.26, 16.71],
  ["c3", "Der äußere Schenkel verwahrt, eine Handbreit dahinter.", 17.23, 20.31],
  ["c4", "Innerer Zügel stellt,", 20.82, 22.15],
  ["c5", "äußerer Zügel begrenzt.", 22.4, 23.96],
  ["d1", "Drängt dein Pferd nach innen, treibt der innere Schenkel mehr –", 24.36, 27.53],
  ["d2", "hin an den äußeren Zügel.", 27.76, 29.23],
  ["e1", "Zur Stange reitest du gerade auf die Mitte zu.", 29.67, 32.11],
  ["e2", "Drüber entlastest du leicht, und die Hand geht mit.", 32.51, 35.35],
  ["e3", "Nach der Landung:", 35.77, 36.59],
  ["e4", "halbe Parade –", 36.89, 37.84],
  ["e5", "und die nächste Wendung.", 38.08, 39.41],
  ["f1", "Innerer Schenkel an den äußeren Zügel –", 39.78, 41.85],
  ["f2", "das ist dein Rahmen.", 42.17, 43.39],
  ["g1", "Speichern für deine nächste Stangenstunde!", 43.71, 46.09],
];
export const KB_LINES = mkLines(REC);
const L = KB_LINES;
export const KB_TOTAL = E(L, "g1") + 2.6;
const at = (id: string, w: string) => wordAt(L, id, w);
const VO = 0.4;

/* ---------- Kleeblatt-Geometrie (Feld-Einheiten, Mitte = 0,0) ---------- */
const D = 125; // Abstand der Linien von der Mitte
const R = 175; // Radius der Bögen
const SEG = 2 * (D + R); // Gerade
const LOOP = 1.5 * Math.PI * R; // 270°-Bogen
const PART = SEG + LOOP;
const LAP = 4 * PART;
const POLE = 120; // Stangenlänge
type Pose = { p: Pt; h: number; loop: boolean };
const rot90 = ([x, y]: Pt, n: number): Pt => {
  let q: Pt = [x, y];
  for (let i = 0; i < n; i++) q = [-q[1], q[0]];
  return q;
};
function pathPose(u: number): Pose {
  const uu = ((u % LAP) + LAP) % LAP;
  const i = Math.floor(uu / PART);
  const l = uu - i * PART;
  let p: Pt;
  let h: number;
  let loop = false;
  if (l < SEG) {
    p = [-D, D + R - l];
    h = -90;
  } else {
    const a = (l - SEG) / R;
    p = [-(D + R) + R * Math.cos(-a), -(D + R) + R * Math.sin(-a)];
    h = (-a * 180) / Math.PI - 90;
    loop = true;
  }
  return { p: rot90(p, i), h: h + 90 * i, loop };
}
const PATH_D = (() => {
  const pts: string[] = [];
  for (let u = 0; u <= LAP; u += 8) {
    const q = pathPose(u).p;
    pts.push(`${pts.length ? "L" : "M"}${q[0].toFixed(1)},${q[1].toFixed(1)}`);
  }
  return pts.join(" ") + " Z";
})();
/* Stangen: Mitte jeder Geraden */
const POLES: Array<{ c: Pt; vertical: boolean }> = [0, 1, 2, 3].map((i) => {
  const c = pathPose(i * PART + SEG / 2).p;
  return { c, vertical: i % 2 === 1 };
});

/* ---------- Zeitplan ---------- */
const V = 93; // ruhiger Arbeitsgalopp
const SLOW_A = 32.4; // Zeitlupe über der Stange (Sprechzeit)
const SLOW_B = 35.4;
const SLOW_K = 0.35;
/** Pferde-Zeit aus Sprechzeit (Zeitlupe im Fenster) */
function tau(r: number) {
  if (r < SLOW_A) return r;
  if (r < SLOW_B) return SLOW_A + (r - SLOW_A) * SLOW_K;
  return SLOW_A + (SLOW_B - SLOW_A) * SLOW_K + (r - SLOW_B);
}
const TAU_POLE = SLOW_A + (33.9 - SLOW_A) * SLOW_K; // Stange 4 genau bei „Drüber“
const U_POLE = 3 * PART + SEG / 2;
const uAt = (tt: number) => U_POLE + V * (tt - TAU_POLE);
const LAP_T = PART / V;
const POLE_TAUS = [TAU_POLE - 2 * LAP_T, TAU_POLE - LAP_T, TAU_POLE];
const LOOP_TAUS = POLE_TAUS.map((p) => p + SEG / 2 / V);
const PARADES = LOOP_TAUS.map((l) => l - 0.9);

/* ---------- Kamera ---------- */
const SCN: Pt = [540, 1060];
function zoomAt(r: number) {
  const k = (a: number, d = 0.9) => sm((r - a) / d);
  return 1 + 1.6 * k(10.9) - 0.7 * k(29.4) - 0.9 * k(39.3);
}

export function renderKleeblatt(t: number) {
  const r = t - VO;
  const tt = tau(r);
  const u = uAt(tt);
  const ps = pathPose(u);
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  const hookEnd = E(L, "a2") + 0.15;

  /* Sprung: Abstand zur nächsten Stange auf der Linie */
  const du = (((u - SEG / 2) % PART) + PART) % PART;
  const dd = du > PART / 2 ? du - PART : du;
  const JW = 52;
  const lift = Math.abs(dd) < JW ? Math.sin((Math.PI * (dd + JW)) / (2 * JW)) : 0;

  /* Fehler: drängt nach innen (Bogen 3), Korrektur mit innerem Schenkel */
  const tIn = S(L, "d1");
  const tFix = at("d1", "treibt");
  const fall = sm((t - tIn - 0.2) / 0.9) * (1 - sm((t - tFix - 0.3) / 1.2));
  const drift = 30 * fall;
  const nrm = ((ps.h - 90) * Math.PI) / 180;
  const pos: Pt = [ps.p[0] + drift * Math.cos(nrm) - 8 * lift, ps.p[1] + drift * Math.sin(nrm) - 11 * lift];
  const yaw = -10 * fall;
  const ang = ps.h + yaw;
  const bend = (ps.loop ? -14 : -4) * (1 - fall) + 3 * fall;
  const s = 0.9 * (1 + 0.22 * lift);

  /* Kamera */
  const z = zoomAt(r);
  const f = Math.min(1, Math.max(0, (z - 1) / 0.9));
  const focus: Pt = [lerp(0, ps.p[0], f), lerp(0, ps.p[1], f)];
  const cam = (p: Pt): Pt => [SCN[0] + z * (p[0] - focus[0]), SCN[1] + z * (p[1] - focus[1])];
  const hw = (p: Pt) => cam(world(pos, ang, s, p));
  const hc = cam(pos);

  /* Hilfen */
  const endIn = S(L, "e1") - 0.2;
  const gSeat = win(t, S(L, "c1") - 0.1, endIn);
  const gInLeg = Math.max(win(t, S(L, "c2") - 0.1, endIn), win(t, S(L, "f1") - 0.1, S(L, "g1")));
  const gOutLeg = Math.max(win(t, S(L, "c3") - 0.1, endIn), win(t, S(L, "f1") - 0.1, S(L, "g1")));
  const gInRein = win(t, S(L, "c4") - 0.1, endIn);
  const gOutRein = Math.max(win(t, S(L, "c5") - 0.1, endIn), win(t, S(L, "d2") - 0.2, endIn), win(t, S(L, "f1") - 0.1, S(L, "g1")));
  const fixO = win(t, tFix - 0.1, E(L, "d2") + 0.2);
  const overPole = win(t, S(L, "e2") - 0.1, E(L, "e2"));
  const handFwd = lift > 0.05 || (t > S(L, "e2") && t < at("e2", "Hand") + 1.0) ? 1 : 0;

  /* halbe Parade (Puls) */
  const parAge = Math.min(...PARADES.map((p) => (tt >= p ? tt - p : 99)));
  const parO = parAge < 1.1 ? 1 - parAge / 1.1 : 0;

  /* Stange vorn: Mitte markieren */
  const nextPole = POLES[Math.floor((((u + SEG / 2) % LAP) + LAP) % LAP / PART) % 4];
  const aimO = win(t, S(L, "e1"), E(L, "e1") + 0.6);
  const slowO = win(t, SLOW_A + VO + 0.1, SLOW_B + VO - 0.2);

  /* Callouts: aktiv groß, ältere klein */
  const act = (id: string) => (t >= S(L, id) - 0.1 && t < (L[L.findIndex((l) => l.id === id) + 1]?.start ?? 99) ? 1 : 0);
  const zoomO = win(t, S(L, "c0"), endIn, 0.3);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      {/* Feld */}
      <g transform={`translate(${SCN[0]} ${SCN[1]}) scale(${z}) translate(${-focus[0]} ${-focus[1]})`}>
        <rect x={-3000} y={-3000} width={6000} height={6000} fill="#E3D3B4" />
        <rect x={-520} y={-520} width={1040} height={1040} rx="30" fill="none" stroke="#CDB68F" strokeWidth="6" />
        <g fill="#D3BF9C">
          {Array.from({ length: 60 }, (_, i) => {
            const x = -500 + ((i * 211) % 1000);
            const y = -500 + ((i * 137) % 1000);
            return <ellipse key={i} cx={x} cy={y} rx={i % 3 ? 9 : 14} ry="3.5" transform={`rotate(${(i * 37) % 180} ${x} ${y})`} />;
          })}
        </g>
        <path d={PATH_D} fill="none" stroke={COL.forestDeep} strokeWidth="4" strokeDasharray="14 10" opacity=".45" />
        {/* Pfeile auf der Linie */}
        {[0.25, 0.75].flatMap((q) => [0, 1, 2, 3].map((i) => {
          const pp = pathPose(i * PART + SEG + LOOP * q);
          return <path key={`${q}-${i}`} d="M-9 -8 L5 0 L-9 8" transform={`translate(${pp.p[0]} ${pp.p[1]}) rotate(${pp.h})`} fill="none" stroke={COL.forestDeep} strokeWidth="4" strokeLinecap="round" opacity=".5" />;
        }))}
        {/* Stangen */}
        {POLES.map(({ c, vertical }, i) => (
          <g key={i} transform={`translate(${c[0]} ${c[1]}) rotate(${vertical ? 90 : 0})`}>
            <rect x={-POLE / 2 + 3} y={-5} width={POLE} height={12} rx="6" fill="#000" opacity=".12" />
            <rect x={-POLE / 2} y={-7} width={POLE} height={12} rx="6" fill={PAPER} />
            {[0, 2, 4].map((k) => <rect key={k} x={-POLE / 2 + (k * POLE) / 6} y={-7} width={POLE / 6} height={12} fill={COL.rust} rx={k === 0 ? 6 : 0} />)}
          </g>
        ))}
        {/* Ziel: Stangenmitte */}
        {aimO > 0.01 && (
          <g opacity={aimO}>
            <circle cx={nextPole.c[0]} cy={nextPole.c[1]} r={16 + 4 * pulse} fill="none" stroke={COL.forest} strokeWidth="4" />
          </g>
        )}
        {/* Bodenschatten beim Sprung */}
        {lift > 0.01 && <ellipse cx={ps.p[0] + drift * Math.cos(nrm) + 8 * lift} cy={ps.p[1] + drift * Math.sin(nrm) + 10 * lift} rx={44} ry={17} transform={`rotate(${ang} ${ps.p[0] + 6 * lift} ${ps.p[1] + 8 * lift})`} fill="#000" opacity={0.28 * lift} />}
        {/* Staub bei Absprung und Landung */}
        {Math.abs(dd) < JW + 30 && [-1, 1].map((sd) => {
          const age = (dd - sd * JW) / 30;
          if (sd * dd < JW - 4 || age * sd > 1.2) return null;
          const q = pathPose(u - dd + sd * JW).p;
          const k = Math.min(1, Math.abs(age));
          return <g key={sd} opacity={(1 - k) * 0.6}>{[0, 1, 2].map((j) => <circle key={j} cx={q[0] + (j - 1) * 10} cy={q[1] + (j % 2) * 6} r={4 + 6 * k} fill="#CDB68F" />)}</g>;
        })}
        <TopHorse at={pos} ang={ang} look={LOOKS.scrabble} step={tt / 0.62} s={s} bend={bend} poll={ps.loop ? -6 : -2}
          handPull={handFwd ? -1.2 : 0} outBack={gOutLeg}
          glow={{ seat: gSeat, innerLeg: gInLeg, outerLeg: gOutLeg, innerRein: gInRein, outerRein: gOutRein }} />
      </g>

      {/* halbe Parade */}
      {parO > 0.01 && (
        <g opacity={parO}>
          <circle cx={hc[0]} cy={hc[1]} r={(40 + 70 * (1 - parO)) * z} fill="none" stroke={COL.honey} strokeWidth="8" />
          <Pop t={t} a={-1} x={hc[0]} y={hc[1] - 70 * z - 40} text="halbe Parade" fill={COL.honey} color={COL.forestDeep} size={30} />
        </g>
      )}
      <g opacity={win(t, S(L, "b1"), E(L, "b2") + 0.2)}>
        <Pop t={t} a={at("b1", "halbe")} x={540} y={470} text="Gewicht + Schenkel treiben" fill={COL.forest} size={32} />
        <Pop t={t} a={at("b1", "Parade")} x={540} y={545} text="Hand kurz annehmen → nachgeben" fill={COL.forest} size={32} />
      </g>

      {/* Einrahmen: Beschriftungen */}
      <g opacity={zoomO}>
        <Callout from={hw([0, -4])} to={[540, 600]} text="Gewicht leicht innen" color={COL.honey} k={gSeat * (act("c1") ? 1 : 0.8)} size={act("c1") ? 32 : 24} />
        <Callout from={hw(LEG_IN)} to={[290, 760]} text="innen am Gurt: treibt + biegt" color={COL.brownDeep} k={gInLeg * (act("c2") ? 1 : 0.8)} size={act("c2") ? 30 : 24} />
        <Callout from={hw(legOut(1))} to={[790, 1370]} text="außen dahinter: verwahrt" color={COL.forest} k={gOutLeg * (act("c3") ? 1 : 0.8)} size={act("c3") ? 30 : 24} />
        <Callout from={hw(HAND_IN)} to={[300, 1370]} text="innerer Zügel: stellt" color={COL.brownDeep} k={gInRein * (act("c4") ? 1 : 0.8)} size={act("c4") ? 30 : 24} />
        <Callout from={hw(HAND_OUT)} to={[790, 1460]} text="äußerer Zügel: begrenzt" color={COL.forest} k={gOutRein * (act("c5") || act("d2") ? 1 : 0.8)} size={act("c5") || act("d2") ? 30 : 24} />
      </g>
      {/* Fehler + Korrektur */}
      <Pop t={t} a={tIn + 0.3} x={540} y={470} text="drängt nach innen – Bogen wird klein" fill={COL.rust} size={32} o={win(t, tIn + 0.3, tFix + 0.2)} />
      {fixO > 0.01 && (() => {
        const a = hw(LEG_IN);
        const b = hw(HAND_OUT);
        const ang2 = Math.atan2(b[1] - a[1], b[0] - a[0]);
        return (
          <g opacity={fixO}>
            <path d={`M${a[0]} ${a[1]} L${b[0]} ${b[1]}`} stroke={COL.forest} strokeWidth="12" strokeLinecap="round" opacity=".85" />
            <path d={`M${b[0]} ${b[1]} l${-34 * Math.cos(ang2 - 0.45)} ${-34 * Math.sin(ang2 - 0.45)} M${b[0]} ${b[1]} l${-34 * Math.cos(ang2 + 0.45)} ${-34 * Math.sin(ang2 + 0.45)}`} stroke={COL.forest} strokeWidth="12" strokeLinecap="round" />
            <circle cx={a[0]} cy={a[1]} r={20 + 6 * pulse} fill="none" stroke={COL.honey} strokeWidth="6" />
            <Pop t={t} a={tFix} x={540} y={470} text="innerer Schenkel treibt mehr → an den äußeren Zügel" fill={COL.forest} size={30} />
          </g>
        );
      })()}
      {/* Stange */}
      <Pop t={t} a={S(L, "e1")} x={540} y={470} text="gerade · auf die Mitte" fill={COL.forest} size={34} o={win(t, S(L, "e1"), E(L, "e1"))} />
      <g opacity={overPole}>
        <Pop t={t} a={S(L, "e2")} x={540} y={470} text="leicht entlasten · Hand geht mit" fill={COL.forest} size={34} />
      </g>
      <g opacity={slowO}>
        <rect x={840} y={590} width={180} height={52} rx="26" fill={COL.forestDeep} opacity=".8" />
        <T x={930} y={626} size={26} color={PAPER}>Zeitlupe</T>
      </g>
      <Pop t={t} a={S(L, "e3")} x={540} y={470} text="Landung → halbe Parade → Wendung" fill={COL.honey} color={COL.forestDeep} size={32} o={win(t, S(L, "e3"), E(L, "e5") + 0.2)} />

      <Merk t={t} at={S(L, "f1") - 0.1} lines={["Innerer Schenkel", "an den äußeren Zügel"]} sub="das ist dein Rahmen" />
      <g opacity={win(t, S(L, "g1") - 0.1, 99, 0.3)}>
        <SaveCard t={t} a={S(L, "g1")} title="📌 Speichern" sub="für deine nächste Stangenstunde" y={1480} />
        <Brand t={t} a={S(L, "g1") + 1.2} y={1600} />
      </g>
      <Header t={t} label={RF_HEADER} hide={win(t, 0, hookEnd)} />
      <RfTag o={win(t, -1, hookEnd)} />
      <HookText t={t} end={hookEnd} y0={290} lines={[
        { text: "KLEEBLATT im Galopp", at: -0.9, size: 84 },
        { text: "Welche Hilfe wann?", at: S(L, "a2") - 0.1, hi: true, size: 76 },
      ]} />
      <Title t={t} a={S(L, "b1")} b={S(L, "c0") - 0.1} top="Halbe Parade" sub="vor jeder Wendung" color={COL.forestDeep} y={330} />
      <Title t={t} a={S(L, "c0") - 0.05} b={S(L, "d1") - 0.1} top="Einrahmen" sub="in jeder Wendung" color={COL.forest} y={330} />
      <Title t={t} a={S(L, "d1") - 0.05} b={S(L, "e1") - 0.1} top="Fällt es nach innen?" color={COL.rust} y={330} />
      <Title t={t} a={S(L, "e1") - 0.05} b={S(L, "e3") - 0.1} top="Über die Stange" color={COL.forest} y={330} />
      <Title t={t} a={S(L, "e3") - 0.05} b={S(L, "f1") - 0.1} top="Nach der Landung" color={COL.forestDeep} y={330} />
      <Caption t={t} lines={L} skip={["g1"]} y={1720} />
    </svg>
  );
}
