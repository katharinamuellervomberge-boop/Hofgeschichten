import { AnimHorse, GAIT_DEFS, bodyBob, type LegId } from "@/components/illustrations/akademie/AnimHorse";
import { BODIES } from "@/components/illustrations/akademie/geometry";
import { Rider, Tack } from "@/components/illustrations/akademie/RiderScene";
import { getHorse } from "@/content/horses";
import type { HorseLook } from "@/content/types";
import type { ReactNode } from "react";
import { Brand, COL, Caption, CommentCard, E, FONT_BODY, Header, HookText, PAPER, Pop, S, T, Title, W, H, back, ease, lerp, mkLines, sm, win, wordAt, along, samplePath } from "./nov-kit";
import { Arena, groundSpeed } from "./rs-kit";
import { HAND_IN, HAND_OUT, LEG_IN, LOOKS, TopHorse, legOut, world, type Pt } from "./top";

/* Reiten verstehen (9:16): „Wie geht eigentlich ein Galoppwechsel?“ (comp `galoppwechsel`)
   A  Seitenansicht: Hook, das Pferd springt in der Schwebephase vom Links- in den Rechtsgalopp (führendes Vorderbein markiert).
   B  Bahn von oben: durch die ganze Bahn wechseln = Handwechsel. Einfacher Galoppwechsel auf der Diagonale:
      Linksgalopp → Trab/Schritt, ein paar Tritte geradeaus → Rechtsgalopp.
   D  Pferd groß von oben (rechte Hand, gespiegelt: innen = rechts im Bild): stellen + halbe Parade,
      Galopphilfe: Gewicht innerer Gesäßknochen · innerer Schenkel am Gurt · äußerer eine Handbreit dahinter ·
      innerer Zügel stellt · äußerer begrenzt → springt im Rechtsgalopp an.
   E  Seitenansicht: fliegender Wechsel (rechts → links) in Zeitlupe, Standbild in der Schwebephase.
   Beine: eigene Fußfolge mit gleitendem Wechsel der Auffuß-Zeitpunkte während der Schwebe (AnimHorse bleibt unverändert). */

/** Zeiten aus der Aufnahme (Jessica v4, 04.11.2026 20:00, 60,6 s), Teilsätze aus den Sprechpausen */
const REC: Array<[string, string, number, number]> = [
  ["g1", "Wie geht eigentlich ein Galoppwechsel?", 0, 2.09],
  ["g2a", "Dein Pferd wechselt dabei vom Linksgalopp in den Rechtsgalopp", 2.49, 5.92],
  ["g2b", "– oder umgekehrt.", 6.28, 7.16],
  ["g3a", "Das brauchst du immer dann, wenn du im Galopp die Hand wechselst,", 7.59, 10.71],
  ["g3b", "zum Beispiel durch die ganze Bahn.", 10.95, 12.49],
  ["g4a", "Am Anfang reitest du einen einfachen Galoppwechsel.", 12.85, 15.46],
  ["g4b", "Du parierst zum Trab oder Schritt durch und reitest ein paar Tritte geradeaus.", 15.86, 20.75],
  ["g5", "Dann stellst du dein Pferd zur neuen Seite und kündigst mit einer halben Parade an, dass gleich etwas Neues kommt.", 21.14, 27.35],
  ["g6a", "Jetzt gibst du die Galopphilfe für die neue Hand:", 27.72, 30.24],
  ["g6b", "Gewicht auf den neuen inneren Gesäßknochen,", 30.59, 33.37],
  ["g6c", "der innere Schenkel treibt am Gurt,", 33.72, 35.65],
  ["g6d", "der äußere liegt verwahrend eine Handbreit dahinter.", 36.04, 39.14],
  ["g7a", "Der innere Zügel stellt,", 39.54, 40.96],
  ["g7b", "der äußere begrenzt.", 41.19, 42.55],
  ["g7c", "Und schon springt dein Pferd im neuen Galopp an.", 42.93, 45.44],
  ["g8a", "Und der fliegende Galoppwechsel?", 45.8, 47.43],
  ["g8b", "Da wechselt das Pferd ganz ohne Trab oder Schritt –", 47.84, 50.6],
  ["g8c", "genau in der Schwebephase, wenn kein Bein den Boden berührt.", 50.87, 54.18],
  ["g9a", "Das ist schon etwas für Fortgeschrittene.", 54.55, 56.52],
  ["g9b", "Hast du schon mal einen Galoppwechsel geritten?", 56.9, 58.82],
  ["g9c", "Schreib es in die Kommentare!", 59.15, 60.46],
];
export const GW_LINES = mkLines(REC);
const L = GW_LINES;
export const GW_TOTAL = E(L, "g9c") + 2.6;
const at = (id: string, w: string) => wordAt(L, id, w);

const LOOK: HorseLook = getHorse("tonga")!.look;
const LEFT = COL.rust; // Linksgalopp
const RIGHT = COL.forest; // Rechtsgalopp
const IN_COL = COL.honey; // innen
const OUT_COL = COL.forest; // außen

/* Szenen */
const A_END = S(L, "g3a") - 0.15;
const B_END = S(L, "g5") - 0.2;
const D_END = S(L, "g8a") - 0.2;

/* ======================= Galopp mit Wechsel (Seitenansicht) ======================= */
type Lead = "L" | "R";
const CYC = GAIT_DEFS["galopp-links"].cycle;
const DUTY = GAIT_DEFS["galopp-links"].duty;
const STRIDE = GAIT_DEFS["galopp-links"].stride;
const LIFT = GAIT_DEFS["galopp-links"].lift;
const OFF: Record<Lead, Record<LegId, number>> = {
  L: { HR: 0, HL: 0.2, VR: 0.2, VL: 0.4 },
  R: { HL: 0, HR: 0.2, VL: 0.2, VR: 0.4 },
};
/* Wechselfenster: in der Schwebephase des Sprungs n (alle vier Beine in der Luft) */
const WA = 0.76;
const WB = 0.98;
/** Auffuß-Zeitpunkte + Gewicht der führenden Seite (1 = links führt) zur Bewegungszeit ta */
function gallopState(ta: number, start: Lead, changes: number[]) {
  const c = ta / CYC;
  let lead: Lead = start;
  for (const n of changes) {
    if (c >= n + WB) {
      lead = lead === "L" ? "R" : "L";
      continue;
    }
    if (c > n + WA) {
      const u = sm((c - n - WA) / (WB - WA));
      const to: Lead = lead === "L" ? "R" : "L";
      const off = {} as Record<LegId, number>;
      for (const l of ["VL", "VR", "HL", "HR"] as LegId[]) off[l] = lerp(OFF[lead][l], OFF[to][l], u);
      return { off, leftW: lead === "L" ? 1 - u : u, lead, changing: u };
    }
    break;
  }
  return { off: OFF[lead], leftW: lead === "L" ? 1 : 0, lead, changing: 0 };
}

/* Bein-Geometrie wie in AnimHorse (Pferde-Koordinaten) */
type P = [number, number];
const G0 = 288;
const TOPL: Record<LegId, P> = { VL: [251, 182], VR: [265, 180], HL: [127, 178], HR: [143, 176] };
const LENL: Record<"V" | "H", [number, number]> = { V: [58, 50], H: [56, 52] };
const easeC = (s: number) => 0.5 - 0.5 * Math.cos(Math.PI * s);
function kneeOf(top: P, foot: P, [l1, l2]: [number, number], fwd: boolean): P {
  const dx = foot[0] - top[0];
  const dy = foot[1] - top[1];
  const d = Math.min(Math.hypot(dx, dy), l1 + l2 - 0.01);
  const a = Math.atan2(dy, dx);
  const b = Math.acos(Math.max(-1, Math.min(1, (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d))));
  const ang = fwd ? a - b : a + b;
  return [top[0] + l1 * Math.cos(ang), top[1] + l1 * Math.sin(ang)];
}
function legPh(ta: number, off: number) {
  const p = (((ta / CYC - off) % 1) + 1) % 1;
  return { p, stance: p < DUTY };
}
function ChangeHorse({ ta, start, changes, look, highlight, children }: { ta: number; start: Lead; changes: number[]; look: HorseLook; highlight?: Partial<Record<LegId, string>>; children?: ReactNode }) {
  const st = gallopState(ta, start, changes);
  const bob = bodyBob("galopp-links", ta);
  const legs: Partial<Record<LegId, { knee: P; foot: P }>> = {};
  for (const l of ["VL", "VR", "HL", "HR"] as LegId[]) {
    const front = l[0] === "V";
    const [tx, ty] = TOPL[l];
    const lead = 9 * (l[1] === "L" ? st.leftW : 1 - st.leftW);
    const nx = tx + (front ? 2 : -4) + lead;
    const { p } = legPh(ta, st.off[l]);
    let foot: P;
    if (p < DUTY) foot = [nx + STRIDE / 2 - STRIDE * (p / DUTY), G0];
    else {
      const s = (p - DUTY) / (1 - DUTY);
      const fold = front ? 10 * Math.sin(Math.PI * Math.min(1, s * 1.6)) * (1 - s) : 0;
      foot = [nx - STRIDE / 2 + STRIDE * easeC(s) - fold, G0 - LIFT * Math.sin(Math.PI * s) * (front ? 1.15 : 0.9)];
    }
    const top: P = [tx, ty + bob];
    legs[l] = { knee: kneeOf(top, foot, LENL[front ? "V" : "H"], front), foot };
  }
  return (
    <AnimHorse look={look} gait="galopp-links" time={ta} legs={legs} highlight={highlight}>
      {children}
    </AnimHorse>
  );
}
const onGround = (ta: number, start: Lead, changes: number[]) => {
  const st = gallopState(ta, start, changes);
  return (["VL", "VR", "HL", "HR"] as LegId[]).filter((l) => legPh(ta, st.off[l]).stance);
};

/* Seitenansicht: Bühne */
const K = 2.6;
const GROUND = 1390;
const SV = { x: 540 - 160 * K, y: GROUND - 285 * K };
function SideStage({ ta, start, changes, highlight }: { ta: number; start: Lead; changes: number[]; highlight?: Partial<Record<LegId, string>> }) {
  return (
    <g>
      <Arena t={ta} speed={groundSpeed("galopp-links", K)} y={GROUND} />
      <svg x={SV.x} y={SV.y} width={320 * K} height={292 * K} viewBox="70 20 320 292" overflow="visible">
        <ChangeHorse ta={ta} start={start} changes={changes} look={LOOK} highlight={highlight}>
          <Tack hand={BODIES.sitz.hand} longRein={false} stirrupsDown={false} />
          <Rider b={BODIES.sitz} pose="sitz" />
        </ChangeHorse>
      </svg>
    </g>
  );
}

/** Pille für die aktuelle Galopp-Seite (wechselt mit Aufspringen) */
function LeadPill({ t, lead, y, o, a }: { t: number; lead: Lead; y: number; o: number; a: number }) {
  if (o <= 0.01) return null;
  return (
    <g opacity={o}>
      {lead === "L" ? (
        <Pop t={t} a={a} x={540} y={y} text="⟵  Linksgalopp" fill={LEFT} size={40} />
      ) : (
        <Pop t={t} a={a} x={540} y={y} text="Rechtsgalopp  ⟶" fill={RIGHT} size={40} />
      )}
    </g>
  );
}

/* ---------- A: Hook ---------- */
const A_CHANGE = 2; // Sprung, in dem gewechselt wird
const A_PHI = (A_CHANGE + 0.87) * CYC - (at("g2a", "Rechtsgalopp") + 0.25);
function SceneA({ t, o }: { t: number; o: number }) {
  if (o <= 0.01) return null;
  const ta = t + A_PHI;
  const st = gallopState(ta, "L", [A_CHANGE]);
  const leadLeg: LegId = st.leftW > 0.5 ? "VL" : "VR";
  const markO = ease((t - at("g2a", "Linksgalopp") + 0.1) / 0.3);
  const hl: Partial<Record<LegId, string>> = markO > 0.3 ? { [leadLeg]: leadLeg === "VL" ? LEFT : RIGHT } : {};
  const flipT = at("g2a", "Rechtsgalopp") + 0.3;
  const pillO = win(t, at("g2a", "Linksgalopp") - 0.1, A_END - 0.2);
  return (
    <g opacity={o}>
      <SideStage ta={ta} start="L" changes={[A_CHANGE]} highlight={hl} />
      <LeadPill t={t} lead={t < flipT ? "L" : "R"} a={t < flipT ? at("g2a", "Linksgalopp") - 0.1 : flipT} y={560} o={pillO} />
      {st.changing > 0.02 && st.changing < 0.98 && <Pop t={t} a={flipT - 0.45} x={790} y={700} text="Wechsel!" fill={COL.honey} color={COL.forestDeep} size={32} o={win(t, flipT - 0.5, flipT + 0.3)} />}
      <Pop t={t} a={S(L, "g2b") - 0.05} x={540} y={1490} text="⇄  oder umgekehrt" fill={COL.forestDeep} size={36} o={win(t, S(L, "g2b") - 0.05, A_END - 0.2)} />
      <g opacity={markO * win(t, at("g2a", "Linksgalopp"), A_END - 0.2)}>
        <T x={540} y={1470} size={30} font={FONT_BODY} weight={700} color={COL.brownDeep} o={t < S(L, "g2b") - 0.1 ? 1 : 0}>Markiert: das führende Vorderbein</T>
      </g>
    </g>
  );
}

/* ======================= B: Bahn von oben ======================= */
const M = 23;
const AX = 80;
const AY = 540;
const px = (m: number) => AX + m * M;
const py = (m: number) => AY + m * M;
const DIAG_A: Pt = [px(34), py(1)];
const DIAG_B: Pt = [px(6), py(19)];
const PATH = [
  `M${px(30)},${py(19)} L${px(36)},${py(19)} Q${px(39)},${py(19)} ${px(39)},${py(16)} L${px(39)},${py(4)} Q${px(39)},${py(1)} ${px(36)},${py(1)} L${DIAG_A[0]},${DIAG_A[1]}`,
  `L${DIAG_B[0]},${DIAG_B[1]} L${px(4)},${py(19)} Q${px(1)},${py(19)} ${px(1)},${py(16)} L${px(1)},${py(8)}`,
].join(" ");
const PRE = 6 + 4.71 + 12 + 4.71 + 2; // m bis zum Wechselpunkt
const DIAG = Math.hypot(28, 18);
/* Abschnitte auf der Diagonale (m ab Wechselpunkt) */
const TROT_A = 12.5;
const TROT_B = 21;
/** Strecke (m) über der Zeit */
const KEYS: Array<[number, number]> = [
  [A_END - 0.4, 0],
  [at("g3b", "ganze") - 0.2, PRE],
  [at("g4b", "parierst") + 0.1, PRE + TROT_A],
  [E(L, "g4b") - 0.2, PRE + TROT_B],
  [B_END + 0.6, PRE + DIAG + 3],
];
function distAt(t: number) {
  if (t <= KEYS[0][0]) return 0;
  for (let i = 0; i < KEYS.length - 1; i++) {
    const [t0, s0] = KEYS[i];
    const [t1, s1] = KEYS[i + 1];
    if (t <= t1) return s0 + ((s1 - s0) * (t - t0)) / (t1 - t0);
  }
  return KEYS[KEYS.length - 1][1];
}
const segPt = (m: number): Pt => [lerp(DIAG_A[0], DIAG_B[0], m / DIAG), lerp(DIAG_A[1], DIAG_B[1], m / DIAG)];

function Steps({ t, items, o, y0 = 1130 }: { t: number; items: Array<{ text: string; at: number; col: string; dark?: boolean }>; o: number; y0?: number }) {
  if (o <= 0) return null;
  const cur = items.reduce((c, it, i) => (t >= it.at ? i : c), -1);
  return (
    <g opacity={o}>
      {items.map((it, i) => {
        const k = ease((t - it.at) / 0.35);
        if (k <= 0) return null;
        const on = i === cur;
        const y = y0 + i * 96;
        return (
          <g key={i} opacity={k * (on ? 1 : 0.75)} transform={`translate(${(1 - k) * -60} 0)`}>
            <rect x={150} y={y - 40} width={780} height={80} rx="40" fill={on ? it.col : PAPER} stroke={it.col} strokeWidth="4" />
            <circle cx={196} cy={y} r="26" fill={on ? PAPER : it.col} />
            <T x={196} y={y + 11} size={30} font={FONT_BODY} weight={700} color={on ? it.col : PAPER}>{String(i + 1)}</T>
            <T x={560} y={y + 12} size={34} font={FONT_BODY} weight={700} color={on ? (it.dark ? COL.forestDeep : PAPER) : COL.forestDeep}>{it.text}</T>
          </g>
        );
      })}
    </g>
  );
}

function SceneB({ t, o }: { t: number; o: number }) {
  if (o <= 0.01) return null;
  const s = distAt(t);
  const { len } = samplePath(PATH);
  const pos = along(PATH, (s * M) / len);
  const onDiag = s - PRE;
  const trot = onDiag > TROT_A && onDiag < TROT_B;
  const bend = onDiag < -1 ? -8 : onDiag > TROT_B + 1 ? 8 : 0;
  const routeO = ease((t - at("g3b", "ganze") + 0.3) / 0.5);
  const colO = ease((t - S(L, "g4a") - 0.2) / 0.5);
  const handLO = win(t, A_END, at("g3b", "ganze") + 0.6);
  const handRO = win(t, at("g3b", "ganze") + 0.2, S(L, "g4a") + 0.2);
  const trotA = segPt(TROT_A);
  const trotB = segPt(TROT_B);
  return (
    <g opacity={o}>
      {/* Reitbahn 20 × 40 m */}
      <rect x={px(0)} y={py(0)} width={40 * M} height={20 * M} rx="6" fill="#E3D3B4" stroke={PAPER} strokeWidth="10" />
      <g fill="#D3BF9C">
        {Array.from({ length: 26 }, (_, i) => (
          <ellipse key={i} cx={px(1 + ((i * 7.3) % 38))} cy={py(1 + ((i * 5.7) % 18))} rx={i % 3 ? 10 : 16} ry="4" />
        ))}
      </g>
      {[["A", px(0) - 26, py(10) + 10], ["C", px(40) + 26, py(10) + 10], ["E", px(20), py(0) - 14], ["B", px(20), py(20) + 38], ["M", px(34), py(0) - 14], ["K", px(6), py(20) + 38], ["X", px(20) + 22, py(10) - 14]].map(([l, x, y]) => (
        <T key={l as string} x={x as number} y={y as number} size={28} font={FONT_BODY} weight={700} color={COL.brownDeep}>{l as string}</T>
      ))}
      <circle cx={px(20)} cy={py(10)} r="6" fill={COL.brownDeep} />
      {/* Handwechsel: Diagonale */}
      {routeO > 0 && (
        <g opacity={routeO * (1 - colO)}>
          <path d={`M${DIAG_A[0]},${DIAG_A[1]} L${DIAG_B[0]},${DIAG_B[1]}`} stroke={COL.honey} strokeWidth="8" strokeDasharray="18 12" strokeDashoffset={-t * 60} strokeLinecap="round" />
        </g>
      )}
      {colO > 0 && (
        <g opacity={colO}>
          <path d={`M${DIAG_A[0]},${DIAG_A[1]} L${trotA[0]},${trotA[1]}`} stroke={LEFT} strokeWidth="12" strokeLinecap="round" />
          <path d={`M${trotA[0]},${trotA[1]} L${trotB[0]},${trotB[1]}`} stroke={COL.honey} strokeWidth="12" strokeLinecap="round" strokeDasharray="4 14" />
          <path d={`M${trotB[0]},${trotB[1]} L${DIAG_B[0]},${DIAG_B[1]}`} stroke={RIGHT} strokeWidth="12" strokeLinecap="round" />
        </g>
      )}
      <TopHorse at={pos.p} ang={pos.ang} look={LOOKS.tonga} step={s / (trot ? 2.4 : 3.2)} s={1.55} bend={bend} />
      {/* Beschriftung im Bild */}
      <Pop t={t} a={A_END} x={px(14)} y={py(16.6)} text="linke Hand" fill={LEFT} size={28} o={handLO} />
      <Pop t={t} a={at("g3b", "ganze") + 0.2} x={px(14)} y={py(4.2)} text="neue Hand: rechts" fill={RIGHT} size={28} o={handRO} />
      <Pop t={t} a={at("g3b", "ganze") - 0.1} x={540} y={py(20) + 130} text="durch die ganze Bahn wechseln" fill={COL.honey} color={COL.forestDeep} size={34} o={win(t, at("g3b", "ganze") - 0.1, S(L, "g4a") + 0.1)} />
      <Steps t={t} o={win(t, S(L, "g4a"), B_END - 0.1)} items={[
        { text: "Linksgalopp", at: S(L, "g4a") + 0.3, col: LEFT },
        { text: "zum Trab oder Schritt", at: at("g4b", "parierst"), col: COL.honey, dark: true },
        { text: "ein paar Tritte geradeaus", at: at("g4b", "Tritte") - 0.1, col: COL.honey, dark: true },
        { text: "Rechtsgalopp", at: E(L, "g4b") - 0.15, col: RIGHT },
      ]} />
    </g>
  );
}

/* ======================= D: Hilfen, Pferd groß von oben ======================= */
const HC: Pt = [540, 1030];
const SC = 6.6;
/** gespiegelt: rechte Hand, innen = rechts im Bild */
const mir = (p: Pt): Pt => [W - p[0], p[1]];

function List({ t, items, o, x }: { t: number; items: Array<{ head: string; sub: string; at: number; col: string }>; o: number; x: number }) {
  if (o <= 0) return null;
  const cur = items.reduce((c, it, i) => (t >= it.at ? i : c), -1);
  return (
    <g opacity={o}>
      {items.map((it, i) => {
        const k = ease((t - it.at) / 0.35);
        if (k <= 0) return null;
        const on = i === cur;
        const y = 800 + i * 128;
        const dark = it.col === IN_COL;
        return (
          <g key={i} opacity={k * (on ? 1 : 0.8)} transform={`translate(${x + (1 - k) * (x < 540 ? -60 : 60)} ${y}) scale(${on ? 1 : 0.94})`}>
            <rect x={-185} y={-52} width={370} height={108} rx="34" fill={on ? it.col : PAPER} stroke={it.col} strokeWidth="4" />
            <T x={0} y={-6} size={32} font={FONT_BODY} weight={800} color={on ? (dark ? COL.forestDeep : PAPER) : dark ? COL.brownDeep : it.col}>{it.head}</T>
            <T x={0} y={34} size={25} font={FONT_BODY} weight={700} color={on ? (dark ? COL.brownDeep : COL.sand) : COL.inkSoft}>{it.sub}</T>
          </g>
        );
      })}
    </g>
  );
}

function SceneD({ t, o }: { t: number; o: number }) {
  if (o <= 0.01) return null;
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  /* Gangart: Trab, ab „springt“ Galopp */
  const jump = at("g7c", "springt");
  const gal = sm((t - jump + 0.1) / 0.5);
  const dist = t * 230 + gal * (t - jump) * 260;
  const step = dist / 260;
  /* Stellung + Halbe Parade */
  const stell = ease((t - at("g5", "stellst") + 0.1) / 0.6);
  const paradeA = at("g5", "halben");
  const parade = win(t, paradeA - 0.1, at("g5", "Neues") + 0.4, 0.2);
  const paradePulse = parade * (0.5 + 0.5 * Math.sin((t - paradeA) * 9));
  /* Galopphilfe */
  const seat = ease((t - at("g6b", "Gewicht") + 0.1) / 0.4);
  const inLeg = ease((t - at("g6c", "innere") + 0.1) / 0.4);
  const outBack = ease((t - at("g6d", "äußere") + 0.1) / 0.6);
  const inRein = ease((t - at("g7a", "innere") + 0.1) / 0.4);
  const outRein = ease((t - at("g7b", "äußere") + 0.1) / 0.4);
  const fadeAids = 1 - 0.55 * gal;
  const bend = -4 - 6 * stell;
  const poll = -8 * stell;
  const ang = -90;
  const P = (p: Pt) => mir(world(HC, ang, SC, p));
  const seatP = P([0, -5]);
  const legP = P(LEG_IN);
  const outLegP = P(legOut(outBack));
  const handIn = P(HAND_IN);
  const handOut = P(HAND_OUT);
  const kick = 1 + 0.4 * Math.max(0, Math.sin((t - jump) * 9)) * win(t, jump, jump + 0.8, 0.2);

  const ring = (p: Pt, col: string, k: number, r = 30) =>
    k > 0.01 ? (
      <g opacity={k}>
        <circle cx={p[0]} cy={p[1]} r={r + 6 * pulse} fill="none" stroke={col} strokeWidth="6" />
        <circle cx={p[0]} cy={p[1]} r={r * 0.45} fill={col} opacity=".35" />
      </g>
    ) : null;

  return (
    <g opacity={o}>
      {/* Boden zieht nach unten weg */}
      <rect x={0} y={560} width={W} height={980} fill="#E3D3B4" />
      <g fill="#D3BF9C">
        {Array.from({ length: 44 }, (_, i) => {
          const x = (i * 211) % W;
          const y = 560 + ((((i * 137) % 980) + dist * 0.9) % 980);
          return <ellipse key={i} cx={x} cy={y} rx={i % 3 ? 14 : 22} ry="5" />;
        })}
      </g>
      <path d={`M540 560 V1540`} stroke={COL.honey} strokeWidth="7" strokeDasharray="22 18" strokeDashoffset={-dist * 0.9} opacity=".55" />
      <rect x={0} y={556} width={W} height={40} fill={COL.bg} opacity=".6" />
      <rect x={0} y={1536} width={W} height={10} fill={COL.brown} opacity=".4" />

      <g transform={`translate(${W} 0) scale(-1 1)`}>
        <TopHorse at={HC} ang={ang} look={LOOKS.tonga} step={step} s={SC} bend={bend} poll={poll} outBack={outBack}
          glow={{ seat: seat * fadeAids, innerLeg: inLeg * fadeAids, outerLeg: outBack * fadeAids, innerRein: Math.max(inRein, stell * win(t, S(L, "g5"), at("g5", "halben"))) * fadeAids, outerRein: outRein * fadeAids }} />
      </g>

      {/* innen / außen */}
      <g opacity={win(t, B_END + 0.2, at("g5", "halben"))}>
        <T x={900} y={1330} size={50} color={COL.brownDeep}>innen</T>
        <T x={900} y={1375} size={26} font={FONT_BODY} weight={700} color={COL.inkSoft}>neue Hand: rechts</T>
        <T x={180} y={1330} size={50} color={OUT_COL}>außen</T>
      </g>
      <Pop t={t} a={at("g5", "stellst") + 0.2} x={540} y={470 + 0} text="Stellung zur neuen Seite" fill={COL.honey} color={COL.forestDeep} size={32} o={win(t, at("g5", "stellst"), at("g5", "halben") - 0.2)} />

      {/* Halbe Parade: kurz alles zusammen – „Achtung!“ */}
      {parade > 0.01 && (
        <g opacity={parade}>
          {[seatP, handIn, handOut].map((p, i) => (
            <circle key={i} cx={p[0]} cy={p[1]} r={24 + 26 * paradePulse} fill="none" stroke={COL.rust} strokeWidth="5" opacity={0.4 + 0.6 * paradePulse} />
          ))}
          <Pop t={t} a={paradeA} x={540} y={470} text="halbe Parade" fill={COL.rust} size={36} />
          {(() => {
            const k = back((t - at("g5", "gleich") + 0.1) / 0.4);
            const hp = P([60, 0]);
            return k > 0.01 ? (
              <g transform={`translate(${hp[0] + 170} ${hp[1] - 20}) scale(${Math.max(0.01, k)})`}>
                <rect x={-185} y={-46} width={370} height={92} rx="46" fill={PAPER} stroke={COL.rust} strokeWidth="5" />
                <path d="M-90 40 l-20 34 l50 -34 Z" fill={PAPER} stroke={COL.rust} strokeWidth="5" strokeLinejoin="round" />
                <rect x={-86} y={36} width={40} height={10} fill={PAPER} />
                <T x={0} y={12} size={34} font={FONT_BODY} weight={800} color={COL.rust}>Achtung, gleich …!</T>
              </g>
            ) : null;
          })()}
        </g>
      )}

      {/* Galopphilfe: Ringe am Pferd */}
      <g opacity={fadeAids * win(t, S(L, "g6a"), D_END)}>
        {ring(seatP, IN_COL, seat * win(t, at("g6b", "Gewicht"), E(L, "g6b") + 0.3) , 28)}
        {ring(legP, IN_COL, inLeg * win(t, at("g6c", "innere"), E(L, "g6c") + 0.3))}
        {ring(outLegP, OUT_COL, outBack * win(t, at("g6d", "äußere"), E(L, "g6d") + 0.3))}
        {ring(handIn, IN_COL, inRein * win(t, at("g7a", "innere"), E(L, "g7a") + 0.3), 24)}
        {ring(handOut, OUT_COL, outRein * win(t, at("g7b", "äußere"), E(L, "g7b") + 0.3), 24)}
        {/* eine Handbreit zurück */}
        {outBack > 0.05 && win(t, at("g6d", "Handbreit") - 0.2, E(L, "g6d") + 0.3) > 0 && (() => {
          const g0 = P(LEG_IN.map((v, i) => (i === 1 ? -v : v)) as Pt);
          const k = win(t, at("g6d", "Handbreit") - 0.2, E(L, "g6d") + 0.3);
          return (
            <g opacity={k}>
              <path d={`M${g0[0] - 70} ${g0[1]} H${g0[0] + 70}`} stroke={COL.brownDeep} strokeWidth="5" strokeDasharray="10 8" />
              <T x={g0[0] - 130} y={g0[1] + 10} size={24} font={FONT_BODY} weight={700} color={COL.brownDeep}>Gurt</T>
              <path d={`M${outLegP[0] - 52} ${g0[1]} V${outLegP[1]}`} stroke={OUT_COL} strokeWidth="5" />
              <path d={`M${outLegP[0] - 62} ${outLegP[1] - 12} L${outLegP[0] - 52} ${outLegP[1]} L${outLegP[0] - 42} ${outLegP[1] - 12}`} fill="none" stroke={OUT_COL} strokeWidth="5" strokeLinecap="round" />
            </g>
          );
        })()}
      </g>
      <List t={t} x={205} o={win(t, S(L, "g6b") - 0.1, D_END) * (1 - 0.4 * gal)} items={[
        { head: "Gewicht innen", sub: "innerer Gesäßknochen", at: at("g6b", "Gewicht") - 0.05, col: IN_COL },
        { head: "Innerer Schenkel", sub: "treibt am Gurt", at: at("g6c", "innere") - 0.05, col: IN_COL },
        { head: "Äußerer Schenkel", sub: "eine Handbreit dahinter", at: at("g6d", "äußere") - 0.05, col: OUT_COL },
      ]} />
      <List t={t} x={875} o={win(t, S(L, "g7a") - 0.1, D_END) * (1 - 0.4 * gal)} items={[
        { head: "Innerer Zügel", sub: "stellt", at: at("g7a", "innere") - 0.05, col: IN_COL },
        { head: "Äußerer Zügel", sub: "begrenzt", at: at("g7b", "äußere") - 0.05, col: OUT_COL },
      ]} />
      {/* springt an */}
      {gal > 0.01 && (
        <g opacity={win(t, jump - 0.1, D_END)}>
          <g transform={`translate(540 1470) scale(${kick}) translate(-540 -1470)`}>
            <Pop t={t} a={jump} x={540} y={1490} text="Rechtsgalopp ✓" fill={RIGHT} size={46} />
          </g>
        </g>
      )}
    </g>
  );
}

/* ======================= E: fliegender Wechsel ======================= */
/* Zeitlupe: ab „ohne Trab“ langsamer, Standbild in der Schwebephase, danach wieder normal */
const E0 = D_END - 0.2;
const SLOW_A = at("g8b", "ohne") ;
const FREEZE_A = at("g8c", "Schwebephase") + 0.15;
const FREEZE_B = at("g8c", "berührt") + 0.5;
const FAST_B = E(L, "g8c") + 0.5;
function speedAt(t: number) {
  if (t < SLOW_A) return 1;
  if (t < FREEZE_A) return lerp(1, 0.22, sm((t - SLOW_A) / 0.8)) * (1 - sm((t - FREEZE_A + 0.35) / 0.35));
  if (t < FREEZE_B) return 0;
  return lerp(0.22, 1, sm((t - FREEZE_B) / (FAST_B - FREEZE_B)));
}
const DT = 1 / 240;
const TA_TABLE: number[] = (() => {
  const a: number[] = [0];
  let v = 0;
  for (let t = E0; t < GW_TOTAL + 2; t += DT) {
    v += speedAt(t + DT / 2) * DT;
    a.push(v);
  }
  return a;
})();
const taRaw = (t: number) => {
  const f = Math.max(0, (t - E0) / DT);
  const i = Math.min(TA_TABLE.length - 2, Math.floor(f));
  return lerp(TA_TABLE[i], TA_TABLE[i + 1], f - i);
};
const E_CHANGE = Math.ceil(taRaw(FREEZE_A) / CYC) + 2;
const E_PHI = (E_CHANGE + 0.86) * CYC - taRaw(FREEZE_A);

function SceneE({ t, o }: { t: number; o: number }) {
  if (o <= 0.01) return null;
  const ta = taRaw(t) + E_PHI;
  const st = gallopState(ta, "R", [E_CHANGE]);
  const lead: Lead = st.leftW > 0.5 ? "L" : "R";
  const leadLeg: LegId = lead === "L" ? "VL" : "VR";
  const frozen = t >= FREEZE_A - 0.05 && t < FREEZE_B;
  const air = onGround(ta, "R", [E_CHANGE]).length === 0;
  const hl: Partial<Record<LegId, string>> = frozen ? {} : { [leadLeg]: lead === "L" ? LEFT : RIGHT };
  const slowO = win(t, SLOW_A + 0.2, FAST_B);
  const frO = win(t, FREEZE_A - 0.05, FREEZE_B, 0.2);
  const flipT = FREEZE_B + 0.25;
  return (
    <g opacity={o}>
      <SideStage ta={ta} start="R" changes={[E_CHANGE]} highlight={hl} />
      {/* Schwebephase: Lücke zum Boden */}
      {frO > 0.01 && air && (
        <g opacity={frO}>
          <rect x={0} y={0} width={W} height={H} fill={COL.bg} opacity={0.12} />
          <path d={`M${SV.x + (110 - 70) * K} ${GROUND - 2} H${SV.x + (320 - 70) * K}`} stroke={COL.honey} strokeWidth="8" strokeDasharray="20 14" strokeLinecap="round" />
          <Pop t={t} a={FREEZE_A} x={540} y={1490} text="kein Bein am Boden!" fill={COL.honey} color={COL.forestDeep} size={40} />
          <Pop t={t} a={FREEZE_A + 0.5} x={790} y={640} text="Standbild: Schwebephase" fill={COL.forestDeep} size={32} />
          <Pop t={t} a={at("g8c", "berührt") - 0.3} x={300} y={640} text="hier wird gewechselt" fill={COL.rust} size={30} />
        </g>
      )}
      {slowO > 0.01 && !frozen && <Pop t={t} a={SLOW_A + 0.2} x={860} y={640} text="Zeitlupe" fill={COL.forestDeep} size={30} o={slowO} />}
      <LeadPill t={t} lead={t < flipT ? "R" : "L"} a={t < flipT ? E0 + 0.3 : flipT} y={560} o={win(t, E0 + 0.2, S(L, "g9a") - 0.1)} />
      <Pop t={t} a={S(L, "g9a")} x={540} y={560} text="★ für Fortgeschrittene" fill={COL.rust} size={40} o={win(t, S(L, "g9a"), E(L, "g9a") + 0.2)} />
    </g>
  );
}

export function renderGaloppwechsel(t: number) {
  const aO = win(t, 0, A_END, 0.4);
  const bO = win(t, A_END - 0.4, B_END, 0.4);
  const dO = win(t, B_END - 0.4, D_END, 0.4);
  const eO = win(t, D_END - 0.4, GW_TOTAL + 1, 0.4);
  const hookEnd = E(L, "g1") + 0.3;
  const endA = S(L, "g9b") - 0.15;
  const endO = win(t, endA, GW_TOTAL + 1);
  const hideHead = Math.max(win(t, 0, hookEnd), endO);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      <SceneA t={t} o={aO} />
      <SceneB t={t} o={bO} />
      <SceneD t={t} o={dO} />
      <SceneE t={t} o={eO} />

      {endO > 0 && (
        <g opacity={endO}>
          <CommentCard t={t} a={endA + 0.1} lines={["Schon mal einen", "Galoppwechsel geritten?"]} sub="Schreib’s in die Kommentare 👇" y={230} />
          <Brand t={t} a={S(L, "g9c") + 0.1} sub="Reiten verstehen · Reitakademie" y={1440} />
        </g>
      )}

      <Header t={t} label="Die Hofgeschichten · Reiten verstehen" hide={hideHead} />
      <HookText t={t} end={hookEnd} size={80} gap={96} y0={300} lines={[
        { text: "Wie geht eigentlich", at: -0.9 },
        { text: "ein Galoppwechsel?", at: at("g1", "Galoppwechsel") - 0.3, hi: true, size: 88 },
      ]} />
      <Title t={t} a={S(L, "g2a")} b={A_END - 0.25} top="Der Galoppwechsel" sub="vom Links- in den Rechtsgalopp" y={290} />
      <Title t={t} a={S(L, "g3a")} b={E(L, "g3b")} top="Wann brauchst du ihn?" sub="wenn du im Galopp die Hand wechselst" y={300} />
      <Title t={t} a={S(L, "g4a")} b={B_END - 0.25} top="Einfacher Galoppwechsel" sub="über Trab oder Schritt" color={COL.forest} y={300} />
      <Title t={t} a={S(L, "g5")} b={E(L, "g5")} top="1 · Vorbereiten" sub="stellen + halbe Parade" y={290} />
      <Title t={t} a={S(L, "g6a")} b={at("g7c", "springt") - 0.1} top="2 · Galopphilfe" sub="für die neue Hand (rechts)" color={COL.forest} y={290} />
      <Title t={t} a={at("g7c", "springt") - 0.1} b={D_END - 0.25} top="… und angaloppieren!" sub="Pferd springt im neuen Galopp an" color={COL.forest} y={290} />
      <Title t={t} a={S(L, "g8a")} b={E(L, "g8c")} top="Fliegender Galoppwechsel" sub="ohne Trab oder Schritt – in der Schwebephase" color={COL.rust} y={290} />
      <Caption t={t} lines={L} skip={["g1", "g9b", "g9c"]} y={1610} />
    </svg>
  );
}

