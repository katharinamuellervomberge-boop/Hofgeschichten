import type { ReactNode } from "react";
import { Arrow, COL, FONT_BODY, PAPER, Phone, T, back, ease, lerp, sm } from "./nov-kit";
import { HomeScreen } from "./nov-akademie";
import { TopBahn, bx, by, type Bahn } from "./n2-kit";
import { HAND_IN, HAND_OUT, LOOKS, TopHorse, world, type Pt } from "./top";
import { Big, BrandLine, Bubble, Face, Frame, vo, type VoLines } from "./viral-kit";
import LJ from "./handseite-lines.json";

/* Tagesset 01 · Reel 04 „Was heißt linke und rechte Hand?“ (comp `handseite`, 15.11.2026) – Riding 101 / „Reiten einfach erklärt“.
   Nur Hufschlag an der Bande (keine Bahnfiguren, keine Vorfahrt). Rechte Hand = im Uhrzeigersinn, rechte Hand des Reiters zeigt
   zur Bahnmitte (grün). Linke Hand = gegen den Uhrzeigersinn, linke Hand zur Mitte (honig). Schluss: echte Akademie-Startseite. */

const { S, E, total } = vo(LJ as VoLines);
export const HS_TOTAL = total;
const RIGHT = COL.forest;
const LEFT = COL.honey;

/* ---------- Hufschlag (1 m innen, Ecken gerundet), im Uhrzeigersinn ab Mitte der oberen langen Seite ---------- */
const TRACK: Pt[] = (() => {
  const pts: Pt[] = [];
  const x0 = 1, y0 = 1, x1 = 39, y1 = 19, r = 3;
  const seg = (a: Pt, b: Pt) => { for (let i = 0; i < 40; i++) pts.push([lerp(a[0], b[0], i / 40), lerp(a[1], b[1], i / 40)]); };
  const arc = (c: Pt, a0: number) => { for (let i = 0; i < 12; i++) { const a = a0 + (i / 12) * (Math.PI / 2); pts.push([c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)]); } };
  seg([20, y0], [x1 - r, y0]); arc([x1 - r, y0 + r], -Math.PI / 2);
  seg([x1, y0 + r], [x1, y1 - r]); arc([x1 - r, y1 - r], 0);
  seg([x1 - r, y1], [x0 + r, y1]); arc([x0 + r, y1 - r], Math.PI / 2);
  seg([x0, y1 - r], [x0, y0 + r]); arc([x0 + r, y0 + r], Math.PI);
  seg([x0 + r, y0], [20, y0]);
  return pts;
})();
const TLEN = (() => { let l = 0; for (let i = 1; i < TRACK.length; i++) l += Math.hypot(TRACK[i][0] - TRACK[i - 1][0], TRACK[i][1] - TRACK[i - 1][1]); return l; })();
function trackAt(dist: number): { p: Pt; ang: number } {
  let d = ((dist % TLEN) + TLEN) % TLEN;
  for (let i = 1; i < TRACK.length; i++) {
    const a = TRACK[i - 1], b = TRACK[i];
    const l = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (d <= l || i === TRACK.length - 1) {
      const u = l ? Math.min(1, d / l) : 0;
      return { p: [lerp(a[0], b[0], u), lerp(a[1], b[1], u)], ang: (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI };
    }
    d -= l;
  }
  return { p: TRACK[0], ang: 0 };
}

/** Pferd auf dem Hufschlag. dir 1 = rechte Hand (Uhrzeiger), −1 = linke Hand */
function Rider({ b, t, t0, dir, s, show = 1, startD = 0 }: { b: Bahn; t: number; t0: number; dir: 1 | -1; s: number; show?: number; startD?: number }) {
  const d = startD + dir * 4.2 * Math.max(0, t - t0);
  const { p, ang: a0 } = trackAt(d);
  const ang = dir === 1 ? a0 : a0 + 180;
  const at: Pt = [bx(b, p[0]), by(b, p[1])];
  const look = dir === 1 ? LOOKS.tivoli : LOOKS.tonga;
  // rechte Hand des Reiters = lokal y > 0 (HAND_OUT), linke = HAND_IN
  const hand = world(at, ang, s, dir === 1 ? HAND_OUT : HAND_IN);
  const mid: Pt = [bx(b, 20), by(b, 10)];
  const col = dir === 1 ? RIGHT : LEFT;
  const pulse = 1 + 0.15 * Math.sin(t * 6);
  return (
    <g>
      <TopHorse at={at} ang={ang} look={look} step={t * 1.2} s={s} />
      {show > 0.01 && (
        <g opacity={show}>
          <Arrow from={[lerp(hand[0], mid[0], 0.12), lerp(hand[1], mid[1], 0.12)]} to={[lerp(hand[0], mid[0], 0.86), lerp(hand[1], mid[1], 0.86)]} color={col} w={s > 2 ? 10 : 6} head={s > 2 ? 26 : 16} />
          <circle cx={hand[0]} cy={hand[1]} r={(s > 2 ? 22 : 13) * pulse} fill={col} opacity=".45" />
          <circle cx={hand[0]} cy={hand[1]} r={(s > 2 ? 22 : 13) * pulse} fill="none" stroke={col} strokeWidth={s > 2 ? 5 : 3} />
        </g>
      )}
    </g>
  );
}
function Mid({ b, k = 1, big = true }: { b: Bahn; k?: number; big?: boolean }) {
  if (k <= 0.01) return null;
  const c: Pt = [bx(b, 20), by(b, 10)];
  return (
    <g opacity={k}>
      <circle cx={c[0]} cy={c[1]} r={big ? 18 : 10} fill={COL.rust} />
      <circle cx={c[0]} cy={c[1]} r={big ? 34 : 18} fill="none" stroke={COL.rust} strokeWidth={big ? 5 : 3} strokeDasharray="6 6" />
      {big && <T x={c[0]} y={c[1] + 80} size={40} font={FONT_BODY} weight={900} color={COL.rust}>MITTE</T>}
    </g>
  );
}

/* ---------- Szenen ---------- */
function Hook({ t }: { t: number }) {
  const mood = t >= S("03") - 0.2 ? "confused" : t >= S("02") ? "what" : "neutral";
  return (
    <g>
      <Bubble t={t} a={0.05} label="Reitlehrerin" lines={["„RECHTE HAND!“"]} y={220} size={80} fill={COL.forestDeep} />
      <Face t={t} x={540} y={900} r={210} kind="reiter" mood={mood} />
      {t >= S("03") - 0.1 && <Big t={t} a={S("03") - 0.1} lines={["Was heißt das", "eigentlich?"]} y={1330} size={88} col={COL.rust} />}
    </g>
  );
}
function Easy({ t }: { t: number }) {
  return (
    <g>
      <Big t={t} a={S("04") - 0.1} lines={["Keine Sorge:", "ganz einfach."]} y={420} size={96} />
      <Face t={t} x={540} y={1050} r={210} kind="reiter" mood="smile" a={S("04") - 0.1} />
    </g>
  );
}
const BB: Bahn = { x: 80, y: 640, m: 23 };
function Explain({ t }: { t: number }) {
  // 05: an der Bande, 06: welche Hand zeigt zur Mitte? 07–08 rechte Hand, 09–10 linke Hand
  const right = t < S("09") - 0.12;
  const t0 = right ? S("05") - 0.12 : S("09") - 0.12;
  const showR = sm((t - S("07") + 0.1) / 0.3);
  const showL = sm((t - S("09") + 0.05) / 0.3);
  const q = t >= S("06") && t < S("07") - 0.1;
  let head: ReactNode;
  if (t < S("06") - 0.1) head = <Big t={t} a={S("05") - 0.1} lines={["Du reitest außen", "an der Bande"]} y={260} size={84} />;
  else if (t < S("07") - 0.1) head = <Big t={t} a={S("06") - 0.1} lines={["Welche Hand zeigt", "zur Mitte?"]} y={260} size={84} />;
  else if (right) head = <Big t={t} a={S("07") - 0.1} lines={["RECHTE HAND"]} y={330} size={130} col={RIGHT} shake={t < S("08") ? 0 : 4} />;
  else head = <Big t={t} a={S("09") - 0.05} lines={["LINKE HAND"]} y={330} size={130} col={LEFT} />;
  return (
    <g>
      {head}
      <TopBahn b={BB} letters={false}>
        <Mid b={BB} k={sm((t - S("05") - 0.6) / 0.4)} />
        {right ? <Rider b={BB} t={t} t0={t0} dir={1} s={2.1} show={showR} startD={8} /> : <Rider b={BB} t={t} t0={t0} dir={-1} s={2.1} show={showL} startD={-8} />}
      </TopBahn>
      {q && <g transform={`translate(${bx(BB, 20)} ${by(BB, 10) - 90}) scale(${1 + 0.1 * Math.sin(t * 7)})`}><T x={0} y={0} size={110} color={COL.rust}>?</T></g>}
      {t >= S("07") - 0.1 && (
        <g>
          <T x={540} y={1260} size={44} font={FONT_BODY} weight={800} color={COL.inkSoft}>{right ? "im Uhrzeigersinn" : "gegen den Uhrzeigersinn"}</T>
          <g opacity={ease((t - (right ? S("08") : S("10"))) / 0.3)}>
            <rect x={130} y={1330} width={820} height={130} rx="65" fill={right ? RIGHT : LEFT} />
            <T x={540} y={1414} size={50} color={PAPER}>{right ? "Rechte Hand zur Mitte ✓" : "Linke Hand zur Mitte ✓"}</T>
          </g>
        </g>
      )}
    </g>
  );
}
const BL: Bahn = { x: 50, y: 700, m: 11.8 };
const BR: Bahn = { x: 560, y: 700, m: 11.8 };
function Merk({ t }: { t: number }) {
  const t0 = S("11") - 0.12;
  return (
    <g>
      <Big t={t} a={S("11") - 0.1} lines={["Merk dir:"]} y={250} size={80} />
      {t >= S("12") - 0.1 && <Big t={t} a={S("12") - 0.1} lines={["Die Hand zur Mitte", "ist deine Hand."]} y={420} size={78} col={COL.rust} />}
      <TopBahn b={BL} letters={false}>
        <Mid b={BL} big={false} />
        <Rider b={BL} t={t} t0={t0} dir={-1} s={1.3} startD={-8} />
      </TopBahn>
      <TopBahn b={BR} letters={false}>
        <Mid b={BR} big={false} />
        <Rider b={BR} t={t} t0={t0} dir={1} s={1.3} startD={8} />
      </TopBahn>
      <T x={286} y={1030} size={50} color={LEFT}>LINKE HAND</T>
      <T x={796} y={1030} size={50} color={RIGHT}>RECHTE HAND</T>
      <T x={286} y={1080} size={30} font={FONT_BODY} weight={800} color={COL.inkSoft}>gegen den Uhrzeiger</T>
      <T x={796} y={1080} size={30} font={FONT_BODY} weight={800} color={COL.inkSoft}>im Uhrzeigersinn</T>
      <g opacity={ease((t - S("12") - 0.6) / 0.4)}>
        <rect x={110} y={1220} width={860} height={140} rx="70" fill={COL.forestDeep} />
        <T x={540} y={1310} size={52} color={PAPER}>Welche Hand zeigt zur Mitte?</T>
      </g>
    </g>
  );
}
function Loop({ x, y, r, cw, col, t }: { x: number; y: number; r: number; cw: boolean; col: string; t: number }) {
  const a = (t * 2.2 * (cw ? 1 : -1)) % (Math.PI * 2);
  const end: Pt = [x + r * Math.cos(a), y + r * Math.sin(a)];
  const tang = a + (cw ? Math.PI / 2 : -Math.PI / 2);
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="none" stroke={col} strokeWidth="14" strokeDasharray="30 22" opacity=".5" />
      <Arrow from={[end[0] - 30 * Math.cos(tang), end[1] - 30 * Math.sin(tang)]} to={end} color={col} w={14} head={34} />
    </g>
  );
}
function Wechsel({ t }: { t: number }) {
  const a = S("13") - 0.1;
  const k2 = sm((t - S("13") - 1.0) / 0.4);
  return (
    <g>
      {t < S("14") - 0.1 ? <Big t={t} a={a} lines={["Andere Richtung =", "andere Hand"]} y={280} size={84} /> : <Big t={t} a={S("14") - 0.1} lines={["Ganz einfach,", "oder?"]} y={280} size={96} col={COL.rust} />}
      <Loop x={290} y={860} r={150} cw t={t} col={RIGHT} />
      <T x={290} y={1100} size={44} color={RIGHT}>rechte Hand</T>
      <g opacity={k2}>
        <Arrow from={[470, 860]} to={[620, 860]} color={COL.rust} w={16} head={36} />
        <Loop x={800} y={860} r={150} cw={false} t={t} col={LEFT} />
        <T x={800} y={1100} size={44} color={LEFT}>linke Hand</T>
      </g>
      <g opacity={ease((t - S("13") - 1.6) / 0.3)}>
        <rect x={260} y={1220} width={560} height={110} rx="55" fill={COL.forest} />
        <T x={540} y={1292} size={48} color={PAPER}>= Hand wechseln</T>
      </g>
      {t >= S("14") - 0.1 && <Face t={t} x={540} y={1560} r={130} kind="reiter" mood="proud" a={S("14") - 0.1} />}
    </g>
  );
}
function Akademie({ t }: { t: number }) {
  const a = S("15");
  const py = lerp(1960, 430, ease((t - a + 0.1) / 0.6));
  const scroll = 620 * sm((t - a - 0.8) / 2.2);
  const hi = sm((t - a - 3.0) / 0.3);
  const fin = E("15") - 0.4;
  return (
    <g>
      <Big t={t} a={a - 0.1} lines={["Reiten lernen.", "Endlich verstehen."]} y={200} size={80} />
      <Phone x={280} y={py} w={520} id="hs-ph">
        <g transform={`translate(296 ${py + 16})`}>
          <HomeScreen scroll={scroll} />
          {hi > 0.01 && <rect x={10} y={1076 - 6 - scroll} width={468} height={164} rx="22" fill="none" stroke={COL.honey} strokeWidth={6 + 2 * Math.sin(t * 6)} opacity={hi} />}
        </g>
      </Phone>
      {t >= fin && (
        <g opacity={Math.min(1, back((t - fin) / 0.4))}>
          <rect x={90} y={1440} width={900} height={210} rx="44" fill={COL.forest} />
          <T x={540} y={1530} size={52} color={PAPER}>Hofgeschichten Reitakademie</T>
          <T x={540} y={1604} size={44} font={FONT_BODY} weight={800} color={COL.honey}>einmalig 29,90 €</T>
        </g>
      )}
      <BrandLine t={t} a={fin + 0.4} text="Link in der Bio" />
    </g>
  );
}

export function renderHandseite(t: number) {
  const cuts = [S("04") - 0.12, S("05") - 0.12, S("09") - 0.12, S("11") - 0.12, S("13") - 0.12, S("15") - 0.12];
  let body: ReactNode;
  if (t < cuts[0]) body = <Hook t={t} />;
  else if (t < cuts[1]) body = <Easy t={t} />;
  else if (t < cuts[3]) body = <Explain t={t} />;
  else if (t < cuts[4]) body = <Merk t={t} />;
  else if (t < cuts[5]) body = <Wechsel t={t} />;
  else body = <Akademie t={t} />;
  return <Frame t={t} cuts={cuts}>{body}</Frame>;
}
