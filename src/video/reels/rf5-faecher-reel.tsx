import { Brand, COL, Caption, E, FONT_BODY, Header, HookText, PAPER, Pop, S, T, Title, W, H, ease, lerp, mkLines, sm, win, wordAt } from "./nov-kit";
import { Chip } from "./rkit";
import { Arena, LEG, LOOK_S, Mark, Ride, Takt, V_SIDE, groundSpeed, pose } from "./n2-kit";
import { Callout, HAND_IN, HAND_OUT, LEG_IN, LOOKS, TopHorse, legOut, world, type Pt } from "./top";
import { RF_HEADER, RfTag, SaveCard } from "./rf-kit";

/* RIDER FIX 5 (9:16): „3 Stangen, 1 Übung“ – Stangenfächer im Galopp (comp `rf-faecher`)
   Geometrie nach Referenz: drei Stangen im Fächer (gerade + 2 schräg), Linien laufen an einem gemeinsamen Punkt zusammen,
   je ca. 15 m (≈ 4–5 Galoppsprünge je nach Pferd – NICHT 3). Linksgalopp, Rückweg über Linkswendungen (LSL).
   Hilfen: Blick, Sitz, Schenkel, äußerer Zügel; innerer Zügel nur stellen (Fehlerbild „ziehen“ kurz rot).
   Seitenansicht: Takt + Vor-/Hinterhand + Rumpf als stilisierte Hervorhebung (keine Muskel-Behauptungen).
   Split: driftet nach innen ↔ gleichmäßige Linie. Ende: Speichern + Akademie. */

const REC: Array<[string, string, number, number]> = [
  ["a1", "Dein Pferd fällt in Wendungen immer wieder auf die innere Schulter?", 0, 3.49],
  ["a2", "Dann schau dir diese Übung an.", 3.84, 5.55],
  ["b1", "Drei geschickt platzierte Stangen trainieren Linienführung, Rhythmus und Balance.", 5.88, 10.51],
  ["c1", "Du führst dein Pferd mit Blick, Sitz und Schenkeln auf einer klaren Linie.", 10.76, 15.17],
  ["c2", "Der äußere Zügel hilft dir, die Schulter zu kontrollieren.", 15.47, 18.46],
  ["c3", "Wichtig:", 18.78, 19.37],
  ["c4", "Nicht am inneren Zügel ziehen!", 19.61, 21.41],
  ["d1", "Die Stangen fordern dein Pferd auf, seine Galoppsprünge bewusster zu koordinieren.", 21.74, 26.04],
  ["d2", "Und du übst, Rhythmus und Balance auch auf gebogenen Linien zu halten.", 26.47, 30.36],
  ["e1", "Das Ziel ist nicht, schneller über die Stangen zu kommen.", 30.7, 33.66],
  ["e2", "Sondern ruhiger, gerader und ausbalancierter.", 33.96, 37.17],
  ["f1", "Speicher dir die Übung – und entdecke mehr Reitwissen in unserer Reitakademie.", 37.48, 41.62],
];
export const FA_LINES = mkLines(REC);
const L = FA_LINES;
export const FA_TOTAL = E(L, "f1") + 2.6;
const at = (id: string, w: string) => wordAt(L, id, w);
const TEAL = "#4E9A96";

/* ---------- Geometrie (1 m = 25 Einheiten) ---------- */
const M = 25;
const P: Pt = [300, 0]; // gemeinsamer Punkt
const DIST = 15 * M;
const POLE = 3 * M;
const STRIDE = 3 * M;
const dir = (h: number): Pt => [Math.cos((h * Math.PI) / 180), Math.sin((h * Math.PI) / 180)];
const add = (a: Pt, b: Pt, k = 1): Pt => [a[0] + b[0] * k, a[1] + b[1] * k];
const LINES = [210, 180, 150]; // Blickrichtung: oben-links, gerade, unten-links
const POLES = LINES.map((h) => ({ c: add(P, dir(h), DIST), h }));

/* Pfad als Folge von Geraden und Linksbögen */
type Seg = { k: "S"; len: number } | { k: "A"; deg: number; r: number };
type Piece = { u0: number; len: number; seg: Seg; p0: Pt; h0: number };
function build(p0: Pt, h0: number, segs: Seg[]) {
  const out: Piece[] = [];
  let p = p0;
  let h = h0;
  let u = 0;
  for (const seg of segs) {
    const len = seg.k === "S" ? seg.len : (seg.r * seg.deg * Math.PI) / 180;
    out.push({ u0: u, len, seg, p0: p, h0: h });
    if (seg.k === "S") p = add(p, dir(h), seg.len);
    else {
      const c = add(p, dir(h - 90), seg.r);
      h -= seg.deg;
      p = add(c, dir(h + 90), seg.r);
    }
    u += len;
  }
  return out;
}
function poseOn(path: Piece[], u: number): { p: Pt; h: number; arc: boolean } {
  const pc = path.find((q) => u < q.u0 + q.len) ?? path[path.length - 1];
  const d = Math.max(0, Math.min(pc.len, u - pc.u0));
  if (pc.seg.k === "S") return { p: add(pc.p0, dir(pc.h0), d), h: pc.h0, arc: false };
  const r = pc.seg.r;
  const c = add(pc.p0, dir(pc.h0 - 90), r);
  const h = pc.h0 - (d / r) * (180 / Math.PI);
  return { p: add(c, dir(h + 90), r), h, arc: true };
}
const mod = (a: number) => ((a % 360) + 360) % 360;
function lsl(A: Pt, hA: number, B: Pt, hB: number, r: number): Seg[] {
  const c1 = add(A, dir(hA - 90), r);
  const c2 = add(B, dir(hB - 90), r);
  const hs = (Math.atan2(c2[1] - c1[1], c2[0] - c1[0]) * 180) / Math.PI;
  return [{ k: "A", deg: mod(hA - hs), r }, { k: "S", len: Math.hypot(c2[0] - c1[0], c2[1] - c1[1]) }, { k: "A", deg: mod(hs - hB), r }];
}
/* gerade Linie über die mittlere Stange, Linksbogen zurück, Anreiten der oberen Linie */
const LEAD = 8 * M;
const AFTER = 3 * M;
const START: Pt = add(P, dir(0), LEAD);
const A_END: Pt = add(POLES[1].c, dir(180), AFTER);
const B_APP: Pt = add(P, dir(30), 6 * M);
const PATH = build(START, 180, [{ k: "S", len: LEAD + DIST + AFTER }, ...lsl(A_END, 180, B_APP, 210, 4.4 * M), { k: "S", len: 6 * M + DIST + 4 * M }]);
const U_POLE1 = LEAD + DIST;
const V = 125; // ≈ 5 m/s, Galoppsprung ≈ 3 m in 0,6 s
const PATH_D = (() => {
  const end = PATH[PATH.length - 1];
  const pts: string[] = [];
  for (let u = 0; u <= end.u0 + end.len; u += 6) {
    const q = poseOn(PATH, u).p;
    pts.push(`${pts.length ? "L" : "M"}${q[0].toFixed(1)},${q[1].toFixed(1)}`);
  }
  return pts.join(" ");
})();

/* ---------- Bausteine ---------- */
function PoleBar({ c, h, k = 1 }: { c: Pt; h: number; k?: number }) {
  if (k <= 0.01) return null;
  return (
    <g transform={`translate(${c[0]} ${c[1]}) rotate(${h + 90}) scale(${k})`}>
      <rect x={-POLE / 2 + 2} y={-3} width={POLE} height={8} rx="4" fill="#000" opacity=".12" />
      <rect x={-POLE / 2} y={-5} width={POLE} height={8} rx="4" fill={PAPER} />
      {[0, 2, 4].map((i) => <rect key={i} x={-POLE / 2 + (i * POLE) / 6} y={-5} width={POLE / 6} height={8} fill={COL.forest} rx={i === 0 ? 4 : 0} />)}
      <path d={`M${-POLE / 2} -9 v16 M${POLE / 2} -9 v16`} stroke="#2E2A26" strokeWidth="3.5" strokeLinecap="round" />
    </g>
  );
}
function Fan({ t, poleA, lineA }: { t: number; poleA: number[]; lineA: number }) {
  return (
    <g>
      {LINES.map((h, i) => {
        const k = sm((t - lineA - i * 0.35) / 0.8);
        const a = add(P, dir(h + 180), 5 * M);
        const b = add(P, dir(h), DIST + 5 * M);
        const m = add(P, dir(h), DIST * 0.55);
        return (
          <g key={h} opacity={k}>
            <path d={`M${a[0]} ${a[1]} L${lerp(a[0], b[0], k)} ${lerp(a[1], b[1], k)}`} stroke={TEAL} strokeWidth="3.5" strokeDasharray="10 8" fill="none" />
            <path d="M5 -7 L-6 0 L5 7" transform={`translate(${m[0]} ${m[1]}) rotate(${h + 180})`} fill="none" stroke={TEAL} strokeWidth="4" strokeLinecap="round" />
          </g>
        );
      })}
      {POLES.map((p, i) => <PoleBar key={i} c={p.c} h={p.h} k={ease((t - poleA[i]) / 0.35)} />)}
      <circle cx={P[0]} cy={P[1]} r={7} fill={TEAL} opacity={sm((t - lineA) / 0.5)} />
    </g>
  );
}
function Sand() {
  return (
    <g>
      <rect x={-3000} y={-3000} width={6000} height={6000} fill="#E3D3B4" />
      <g fill="#D3BF9C">
        {Array.from({ length: 70 }, (_, i) => {
          const x = -400 + ((i * 211) % 1100);
          const y = -500 + ((i * 137) % 1000);
          return <ellipse key={i} cx={x} cy={y} rx={i % 3 ? 7 : 11} ry="3" transform={`rotate(${(i * 37) % 180} ${x} ${y})`} />;
        })}
      </g>
    </g>
  );
}
/** Pferd auf einem Kreisbogen (Hook / Split) – Bildschirmkoordinaten */
function Circler({ t, c, r0, drift, look, col, s, id }: { t: number; c: Pt; r0: number; drift: number; look: typeof LOOKS.scrabble; col: string; s: number; id: string }) {
  const om = (V * 1.1) / r0; // rad/s
  const a = -Math.PI / 2 - om * t + 1.2;
  const r = r0 - drift;
  const p: Pt = [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
  const h = (a * 180) / Math.PI - 90 - 14 * (drift / 70);
  return (
    <g>
      <circle cx={c[0]} cy={c[1]} r={r0} fill="none" stroke={TEAL} strokeWidth="6" strokeDasharray="16 12" opacity=".8" />
      {drift > 2 && (
        <path d={`M${c[0] + r0 * Math.cos(a + 0.9)} ${c[1] + r0 * Math.sin(a + 0.9)} A${r0} ${r0} 0 0 0 ${c[0] + r0 * Math.cos(a)} ${c[1] + r0 * Math.sin(a)} L${p[0]} ${p[1]} A${r} ${r} 0 0 1 ${c[0] + (r0 - drift * 0.4) * Math.cos(a + 0.9)} ${c[1] + (r0 - drift * 0.4) * Math.sin(a + 0.9)} Z`} fill={col} opacity=".25" />
      )}
      <TopHorse at={p} ang={h} look={look} step={t / 0.6} s={s} bend={drift > 2 ? 4 : -12} poll={drift > 2 ? 0 : -5} />
      {drift > 2 && <circle cx={world(p, h, s, [22, -12])[0]} cy={world(p, h, s, [22, -12])[1]} r={20 * (s / 1.6)} fill="none" stroke={col} strokeWidth="5" />}
      <text display="none">{id}</text>
    </g>
  );
}

export function renderFaecher(t: number) {
  const r = t - 0.4;
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  const hookEnd = E(L, "a2") + 0.1;

  const tSetup = S(L, "a2") + 0.2;
  const tRide = S(L, "c1") - 0.3;
  const tSide = S(L, "d1") - 0.25;
  const tSplit = S(L, "e1") - 0.25;
  const tEnd = S(L, "f1") - 0.25;
  const scene = t < tSetup ? 0 : t < tRide ? 1 : t < tSide ? 2 : t < tSplit ? 3 : t < tEnd ? 4 : 5;

  /* ---- Feld (Aufbau / Reiten / Ende) ---- */
  const fieldO = Math.max(win(t, tSetup - 0.3, tSide, 0.3), win(t, tEnd - 0.1, 99, 0.3));
  const uPole = U_POLE1;
  const tPoleCross = S(L, "c1") + 2.7;
  const uRide = scene >= 5 ? (t - tEnd) * V + 2 * M : uPole + V * (t - tPoleCross);
  const ride = poseOn(PATH, Math.max(0, uRide));
  // Sprung über die Stange
  const dPole = Math.min(...[uPole, PATH[PATH.length - 1].u0 + 6 * M + DIST].map((q) => Math.abs(uRide - q)));
  const JW = 1.1 * M;
  const lift = dPole < JW ? Math.cos((Math.PI / 2) * (dPole / JW)) : 0;
  // Fehler: innen ziehen
  const pullA = at("c4", "ziehen") - 0.6;
  const pull = sm((t - pullA) / 0.4) * (1 - sm((t - E(L, "c4") + 0.1) / 0.5));
  const bend = (ride.arc ? -13 : -4) - 26 * pull;
  const s = 0.62 * (1 + 0.18 * lift);
  const pos: Pt = [ride.p[0] - 4 * lift, ride.p[1] - 6 * lift];
  const zf = scene === 2 ? sm((t - tRide) / 1.0) : 0;
  const z = 1.5 + 1.3 * zf;
  const focus: Pt = [lerp(130, ride.p[0], zf), lerp(0, ride.p[1], zf)];
  const SCN: Pt = [540, 1010];
  const cam = (p: Pt): Pt => [SCN[0] + z * (p[0] - focus[0]), SCN[1] + z * (p[1] - focus[1])];
  const hw = (p: Pt) => cam(world(pos, ride.h, s, p));
  const showHorse = scene === 2 || scene === 5;

  const gGaze = win(t, at("c1", "Blick") - 0.1, tSide);
  const gSeat = win(t, at("c1", "Sitz") - 0.1, tSide);
  const gLegs = win(t, at("c1", "Schenkeln") - 0.1, tSide);
  const gOut = win(t, S(L, "c2") - 0.1, tSide);
  const gIn = win(t, S(L, "c3") - 0.1, tSide);
  // Galoppsprünge zählen (Anreiten der mittleren Stange)
  const strideO = win(t, S(L, "c1"), tPoleCross + 0.8);

  /* ---- Seitenansicht ---- */
  const pl = V_SIDE;
  const gy = pl.y + 285 * pl.k;
  const sp = groundSpeed("galopp-links", pl.k);
  const cyc = 0.75;
  const gap = sp * cyc * 4; // 4 Sprünge Abstand im Bild
  const hx = pl.x + (225 - 70) * pl.k;
  const sideT = t - tSide;
  const poleXs = [0, 1, 2, 3].map((i) => hx + 300 + i * gap - ((sideT * sp) % (4 * gap)) + (sideT * sp > 4 * gap ? 0 : 0));
  const near = Math.min(...poleXs.map((x) => Math.abs(x - hx)));
  const sLift = near < 70 ? Math.cos((Math.PI / 2) * (near / 70)) : 0;
  const bSide = pose({ leg: LEG.sitz, lean: 4 + 6 * sLift, dy: -3 * sLift, handDx: 6 * sLift });

  /* ---- Split ---- */
  const splitT = t - tSplit;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />

      {/* 0 Hook: fällt nach innen */}
      {scene === 0 && (
        <g>
          <rect x={0} y={560} width={W} height={1040} fill="#E3D3B4" />
          <Circler t={t} c={[540, 1250]} r0={430} drift={95 * sm((t - 0.3) / 2.2)} look={LOOKS.scrabble} col={COL.rust} s={1.7} id="hook" />
          <Pop t={t} a={1.2} x={540} y={680} text="fällt über die innere Schulter" fill={COL.rust} size={34} />
        </g>
      )}

      {/* 1/2/5 Feld */}
      {fieldO > 0.01 && (scene === 1 || scene === 2 || scene === 5 || t < tSide + 0.3) && (
        <g opacity={fieldO}>
          <g transform={`translate(${SCN[0]} ${SCN[1]}) scale(${z}) translate(${-focus[0]} ${-focus[1]})`}>
            <Sand />
            <Fan t={t} poleA={[at("b1", "Drei"), at("b1", "geschickt"), at("b1", "platzierte")]} lineA={at("b1", "Linienführung") - 0.3} />
            {showHorse && <path d={PATH_D} fill="none" stroke={COL.forestDeep} strokeWidth="2.5" strokeDasharray="5 7" opacity={scene === 2 ? 0.35 : 0} />}
            {/* Galoppsprünge */}
            {strideO > 0.01 && [1, 2, 3, 4].map((k) => {
              const q = add(P, dir(180), k * STRIDE);
              const on = uRide >= LEAD + k * STRIDE;
              return <circle key={k} cx={q[0]} cy={q[1]} r={on ? 7 : 5} fill={on ? TEAL : PAPER} stroke={TEAL} strokeWidth="2" opacity={strideO} />;
            })}
            {showHorse && lift > 0.01 && <ellipse cx={ride.p[0] + 6 * lift} cy={ride.p[1] + 8 * lift} rx={30} ry={12} transform={`rotate(${ride.h} ${ride.p[0] + 6 * lift} ${ride.p[1] + 8 * lift})`} fill="#000" opacity={0.25 * lift} />}
            {showHorse && (
              <TopHorse at={pos} ang={ride.h} look={LOOKS.scrabble} step={t / 0.6} s={s} bend={bend} poll={ride.arc ? -6 : -2} handPull={lift > 0.05 ? -1.2 : 1.3 * pull} outBack={gLegs}
                glow={{ gaze: gGaze, seat: gSeat, innerLeg: gLegs, outerLeg: gLegs, outerRein: gOut, innerRein: gIn, pull }} />
            )}
          </g>
          {/* Aufbau-Infos */}
          <g opacity={win(t, at("b1", "Linienführung"), tRide)}>
            <Chip x={540} y={1560} text="Linie · Rhythmus · Balance" fill={TEAL} size={34} />
          </g>
          {scene === 1 && (() => {
            const a = cam(add(P, dir(180), DIST * 0.5));
            return (
              <g opacity={win(t, at("b1", "Rhythmus"), tRide)}>
                <rect x={a[0] - 190} y={a[1] - 98} width={380} height={66} rx="33" fill={PAPER} stroke={TEAL} strokeWidth="3" />
                <T x={a[0]} y={a[1] - 55} size={30} font={FONT_BODY} weight={800} color={COL.forestDeep}>15 m ≈ 4–5 Galoppsprünge</T>
              </g>
            );
          })()}
          <Pop t={t} a={at("b1", "Balance")} x={540} y={470} text="⚠️ Abstände individuell anpassen" fill={COL.honey} color={COL.forestDeep} size={32} o={win(t, at("b1", "Balance"), tRide + 0.6)} />
        </g>
      )}

      {/* 2 Hilfen-Beschriftungen */}
      {scene === 2 && (
        <g>
          <Callout from={hw([6, -3])} to={[300, 600]} text="Blick auf die Linie" color={TEAL} k={gGaze * (t < at("c1", "Sitz") ? 1 : 0.8)} size={t < at("c1", "Sitz") ? 30 : 24} />
          <Callout from={hw([0, 0])} to={[790, 600]} text="Sitz ausbalanciert" color={COL.honey} k={gSeat * 0.95} size={t < at("c1", "Schenkeln") && t > at("c1", "Sitz") ? 30 : 24} />
          <Callout from={hw(LEG_IN)} to={[290, 1400]} text="innerer Schenkel: Biegung + Aktivität" color={COL.brownDeep} k={gLegs * 0.95} size={24} />
          <Callout from={hw(legOut(1))} to={[790, 1480]} text="äußerer Schenkel: Hinterhand" color={COL.forest} k={gLegs * 0.95} size={24} />
          <Callout from={hw(HAND_OUT)} to={[790, 1400]} text="äußerer Zügel: Schulter + Tempo" color={COL.forest} k={gOut} size={t < S(L, "c3") ? 30 : 24} />
          <Callout from={hw(HAND_IN)} to={[290, 1480]} text="innerer Zügel: nur stellen" color={COL.honey} k={gIn} size={26} />
          {strideO > 0.01 && <Pop t={t} a={S(L, "c1") + 0.3} x={540} y={470} text="Galoppsprünge zählen · ca. 3 m" fill={TEAL} size={30} o={strideO} />}
          {lift > 0.05 && <Pop t={t} a={tPoleCross - 0.4} x={540} y={540} text="Hand geht mit" fill={COL.forest} size={30} o={lift} />}
          <g opacity={pull}>
            <Mark x={hw([55, 0])[0] + 90} y={hw([55, 0])[1] - 90} ok={false} k={pull} />
            <Pop t={t} a={pullA} x={540} y={470} text="innen ziehen → Hals knickt ab" fill={COL.rust} size={32} />
          </g>
        </g>
      )}

      {/* 3 Seitenansicht: Pferdekörper */}
      {scene === 3 && (
        <g>
          <Arena t={sideT} speed={sp} y={gy} />
          {poleXs.map((x, i) => (
            <g key={i} transform={`translate(${x} ${gy - 8})`}>
              <ellipse cx={0} cy={10} rx={46} ry={7} fill="#000" opacity=".12" />
              <rect x={-44} y={-10} width={88} height={18} rx="9" fill={PAPER} stroke="#3A332C" strokeWidth="2" />
              <rect x={-44} y={-10} width={30} height={18} rx="9" fill={COL.forest} />
              <rect x={14} y={-10} width={30} height={18} rx="9" fill={COL.forest} />
            </g>
          ))}
          <g transform={`translate(0 ${-26 * sLift})`}>
            <Ride t={sideT} pl={pl} gait="galopp-links" id="rf5s" b={bSide} look={LOOK_S} nod={4} />
            {/* stilisierte Hervorhebungen */}
            <svg x={pl.x} y={pl.y} width={320 * pl.k} height={292 * pl.k} viewBox="70 20 320 292" overflow="visible">
              <g fill="none" strokeLinecap="round">
                <g opacity={win(t, at("d1", "Galoppsprünge") - 0.2, tSplit)}>
                  <ellipse cx={128} cy={150} rx={44} ry={56} fill={COL.honey} opacity={0.3 + 0.2 * pulse} />
                  <ellipse cx={282} cy={158} rx={40} ry={56} fill={TEAL} opacity={0.3 + 0.2 * (1 - pulse)} />
                  <path d="M140 150 C 190 132, 230 132, 270 152" stroke={COL.forestDeep} strokeWidth="3" strokeDasharray="5 5" />
                  <path d="M262 146 l10 6 -11 5" stroke={COL.forestDeep} strokeWidth="3" />
                </g>
                <g opacity={win(t, at("d2", "Balance") - 0.2, tSplit)}>
                  <path d="M128 118 C 175 104, 235 104, 285 124 L 268 196 C 236 212, 190 212, 150 198 Z" fill={COL.forest} opacity={0.22 + 0.08 * pulse} stroke={COL.forest} strokeWidth="2.5" />
                </g>
              </g>
            </svg>
          </g>
          <Takt t={sideT} cycle={cyc} beats={[0, 0.25, 0.5]} labels={["1", "2", "3"]} col={TEAL} y={1520} o={win(t, tSide, tSplit)} />
          <g opacity={win(t, at("d1", "koordinieren") - 0.3, tSplit)}><Chip x={540} y={470} text="KOORDINATION" fill={COL.honey} color={COL.forestDeep} size={36} /></g>
          <g opacity={win(t, at("d2", "Rhythmus") - 0.2, tSplit)}><Chip x={300} y={560} text="RHYTHMUS" fill={TEAL} size={34} /></g>
          <g opacity={win(t, at("d2", "Balance") - 0.2, tSplit)}><Chip x={780} y={560} text="BALANCE" fill={COL.forest} size={34} /></g>
          <T x={540} y={1610} size={26} font={FONT_BODY} weight={700} color={COL.inkSoft} o={win(t, tSide + 0.5, tSplit)}>Vor- und Hinterhand im Galopp-Takt · Rumpf trägt die Balance</T>
        </g>
      )}

      {/* 4 Split */}
      {scene === 4 && (
        <g>
          <defs>
            <clipPath id="rf5-l"><rect x={20} y={560} width={510} height={900} rx="30" /></clipPath>
            <clipPath id="rf5-r"><rect x={550} y={560} width={510} height={900} rx="30" /></clipPath>
          </defs>
          <g clipPath="url(#rf5-l)">
            <rect x={20} y={560} width={510} height={900} fill="#E3D3B4" />
            <Circler t={splitT + 2} c={[275, 1010]} r0={190} drift={55 + 12 * Math.sin(splitT * 2)} look={LOOKS.scrabble} col={COL.rust} s={1.0} id="l" />
          </g>
          <g clipPath="url(#rf5-r)">
            <rect x={550} y={560} width={510} height={900} fill="#E3D3B4" />
            <Circler t={splitT + 2} c={[805, 1010]} r0={190} drift={0} look={LOOKS.scrabble} col={COL.forest} s={1.0} id="r" />
          </g>
          <Mark x={275} y={640} ok={false} k={ease(splitT / 0.3)} />
          <Mark x={805} y={640} ok k={ease((splitT - 0.4) / 0.3)} />
          <T x={275} y={1520} size={36} color={COL.rust}>schneller, driftet</T>
          <T x={805} y={1520} size={36} color={COL.forest} o={ease((t - S(L, "e2")) / 0.4)}>ruhig, gerade</T>
          <g opacity={ease((t - S(L, "e1") - 0.2) / 0.4)}>
            <T x={540} y={430} size={64} color={COL.forestDeep}>Nicht mehr Tempo.</T>
          </g>
          <g opacity={ease((t - S(L, "e2")) / 0.4)}>
            <T x={540} y={510} size={64} color={COL.forest}>Mehr Balance.</T>
          </g>
        </g>
      )}

      {/* 5 Ende */}
      <g opacity={win(t, tEnd + 0.4, 99, 0.3)}>
        <SaveCard t={t} a={tEnd + 0.4} title="📌 Übung speichern" sub="Mehr Übungen & Reitwissen in der Akademie" y={1470} />
        <Brand t={t} a={at("f1", "Reitakademie") - 0.2} y={1600} />
      </g>

      <Header t={t} label={RF_HEADER} hide={win(t, 0, hookEnd)} />
      <RfTag o={win(t, -1, hookEnd)} />
      <HookText t={t} end={hookEnd} y0={290} lines={[
        { text: "Fällt dein Pferd", at: -0.9, size: 80 },
        { text: "auf die INNERE SCHULTER?", at: -0.7, hi: true, size: 66 },
        { text: "Probier diese 3-Stangen-Übung.", at: S(L, "a2") - 0.1, size: 50 },
      ]} />
      <Title t={t} a={tSetup} b={tRide - 0.1} top="3 Stangen, 1 Übung" sub="Fächer · gemeinsamer Punkt" color={COL.forestDeep} y={330} />
      <Title t={t} a={tRide} b={tSide - 0.1} top="So reitest du sie" color={COL.forest} y={330} />
      <Title t={t} a={tSide} b={tSplit - 0.1} top="Was im Pferd passiert" color={COL.forestDeep} y={330} />
      <Title t={t} a={tEnd} b={99} top="Speicher dir die Übung" color={COL.forest} y={330} />
      <Caption t={t} lines={L} y={1720} />
    </svg>
  );
}
