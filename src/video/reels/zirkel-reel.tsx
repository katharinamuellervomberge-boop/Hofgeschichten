import { Arrow, COL, Caption, Chip, E, FONT_BODY, Header, PAPER, PointHead, S, T, W, H, back, clamp01, ease, lerp, sm, win, type VLine } from "./rkit";
import { LOOKS, TopHorse, type Pt } from "./top";

/* Reel 16 (9:16): „Dein Zirkel ist ein Ei“ – Bahn von oben, linke Hand.
   Fehler 1: das Tor zieht (dort schneller, gegenüber abgekürzt) → Ei.
   Fehler 2: zu lange an der Bande kleben → eckig.
   Was in der Akademie bleibt: wie man das Pferd im Sattel wirklich rund bekommt. */

/** Zeiten aus der Aufnahme (Brittney v4, 29.10.), Stimme beginnt bei 0,4 s im Reel */
const VO = 0.4;
const REC: Array<[string, string, number, number]> = [
  ["hook", "Ist das ein Zirkel? Nein. Das ist ein Ei.", 0, 3.47],
  ["kennt", "Und fast jedes Reitkind kennt das.", 3.81, 5.9],
  ["f1a", "Fehler Nummer eins: Das Pferd will zum Tor.", 6.43, 9.15],
  ["f1b", "Also wird es dort schneller, und auf der anderen Seite schneidet es die Ecke ab.", 9.47, 13.9],
  ["f2a", "Fehler Nummer zwei: Man bleibt viel zu lange an der Bande kleben.", 14.27, 17.96],
  ["f2b", "Und schon ist der Kreis eckig.", 18.23, 19.91],
  ["rund", "Ein echter Zirkel ist rund und berührt die Bande nur ganz kurz.", 20.45, 24.1],
  ["q", "Wie man das Pferd wirklich rund bekommt?", 24.57, 26.4],
  ["tease", "Das lernt dein Kind in der Reitakademie.", 26.78, 28.92],
];
export const ZIRKEL_LINES: VLine[] = REC.map(([id, text, a, b]) => ({ id, text, start: a + VO, dur: b - a }));
const L = ZIRKEL_LINES;
export const ZIRKEL_TOTAL = E(L, "tease") + 2.6;
const NEIN = 1.62 + VO; // „Nein. Das ist ein Ei.“

/* ---------- Bahn (von oben, Tor unten) ---------- */
const CX = 540;
const CY = 1060;
const R = 400;
const WL = CX - R; // Bande links
const WR = CX + R; // Bande rechts
const WB = CY + R; // kurze Seite mit Tor
const TOP = 600;

type Shape = { egg: number; box: number };
function shapeAt(t: number): Shape {
  const egg = sm((t - NEIN + 0.1) / 0.9) * (1 - sm((t - S(L, "f2a") + 0.1) / 1.0));
  const box = sm((t - S(L, "f2a") + 0.1) / 1.0) * (1 - sm((t - S(L, "rund") + 0.15) / 0.9));
  return { egg, box };
}
const circ = (th: number): Pt => [CX + R * Math.cos(th), CY + R * Math.sin(th)];
function eggP(th: number): Pt {
  const c = Math.cos(th);
  const s = Math.sin(th);
  return [CX + R * c * (s < 0 ? 1 - 0.3 * Math.pow(-s, 1.6) : 1), CY + R * s * (s < 0 ? 0.74 : 1)];
}
function boxP(th: number): Pt {
  const c = Math.cos(th);
  const s = Math.sin(th);
  const p = 0.36;
  return [CX + R * Math.sign(c) * Math.pow(Math.abs(c), p), CY + R * (s > 0 ? Math.pow(s, p) : s * 0.98)];
}
function pathP(th: number, sh: Shape): Pt {
  const c = circ(th);
  const e = eggP(th);
  const b = boxP(th);
  const w0 = 1 - sh.egg - sh.box;
  return [c[0] * w0 + e[0] * sh.egg + b[0] * sh.box, c[1] * w0 + e[1] * sh.egg + b[1] * sh.box];
}
function pathD(f: (th: number) => Pt, a = 0, b = Math.PI * 2, n = 160, close = true) {
  let d = "";
  for (let i = 0; i <= n; i++) {
    const p = f(a + ((b - a) * i) / n);
    d += `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
  }
  return d + (close ? "Z" : "");
}

/** Winkel auf der Bahn: linke Hand = gegen den Uhrzeigersinn (θ nimmt ab). Am Tor schneller in Fehler 1. */
function thetaAt(t: number) {
  const dt = 1 / 60;
  let th = Math.PI * 0.15;
  for (let x = 0; x < t; x += dt) {
    const pull = win(x, S(L, "f1a") + 1.0, E(L, "f1b"), 0.5);
    const w = 0.85 * (1 + 0.55 * pull * Math.sin(th));
    th -= w * Math.min(dt, t - x);
  }
  return th;
}

function Arena({ t, sh }: { t: number; sh: Shape }) {
  const gate = win(t, S(L, "f1a") + 1.0, E(L, "f1b"));
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  const stick = win(t, S(L, "f2a") + 1.8, E(L, "f2b"));
  return (
    <g>
      <defs>
        <linearGradient id="zk-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={COL.bg} />
          <stop offset="1" stopColor={COL.bg} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Sand */}
      <rect x={WL} y={TOP} width={WR - WL} height={WB - TOP} fill="#E3D3B4" />
      <g fill="#D3BF9C">
        {Array.from({ length: 46 }, (_, i) => {
          const x = WL + 20 + ((i * 211) % (WR - WL - 40));
          const y = TOP + 30 + ((i * 137) % (WB - TOP - 50));
          return <ellipse key={i} cx={x} cy={y} rx={i % 3 ? 14 : 22} ry="5" transform={`rotate(${(i * 37) % 180} ${x} ${y})`} />;
        })}
      </g>
      {/* Mittellinie / X */}
      <path d={`M${CX} ${TOP} V${CY - R + 30}`} stroke={COL.sand} strokeWidth="4" strokeDasharray="10 12" />
      <g transform={`translate(${CX} ${CY - R})`}>
        <path d="M-14 -14 L14 14 M14 -14 L-14 14" stroke={COL.brown} strokeWidth="5" strokeLinecap="round" opacity=".55" />
      </g>
      {/* Bande */}
      <path d={`M${WL - 11} ${TOP} V${WB + 11} H${CX - 75} M${CX + 75} ${WB + 11} H${WR + 11} V${TOP}`} fill="none" stroke={COL.brown} strokeWidth="22" />
      {/* Tor */}
      <g>
        <rect x={CX - 80} y={WB - 2} width={14} height={30} rx="4" fill={COL.brownDeep} />
        <rect x={CX + 66} y={WB - 2} width={14} height={30} rx="4" fill={COL.brownDeep} />
        <path d={`M${CX - 66} ${WB + 4} H${CX + 66} M${CX - 66} ${WB + 18} H${CX + 66}`} stroke={gate > 0.3 ? COL.honey : COL.brown} strokeWidth="6" />
        {gate > 0 && <rect x={CX - 120} y={WB - 60} width={240} height={110} rx="40" fill={COL.honey} opacity={gate * (0.22 + 0.2 * pulse)} />}
      </g>
      {/* Fehler 2: klebt an der Bande */}
      {stick > 0 && (
        <g opacity={stick} fill="none" stroke={COL.rust} strokeLinecap="round" strokeWidth="16">
          <path d={`M${WL + 4} ${CY - 120} V${WB - 4} H${WR - 4} V${CY - 120}`} opacity={0.5 + 0.3 * pulse} />
        </g>
      )}
      <rect x={0} y={TOP - 2} width={W} height={160} fill="url(#zk-fade)" />
      {/* Hufschlag der Figur */}
      {sh && null}
    </g>
  );
}

/** Abgekürzte Fläche oben (zwischen echtem Zirkel und Ei) */
function CutArea({ k }: { k: number }) {
  if (k <= 0) return null;
  let d = pathD(circ, Math.PI, Math.PI * 2, 60, false);
  const back_ = pathD(eggP, Math.PI * 2, Math.PI, 60, false).replace(/^M/, "L");
  d += back_ + "Z";
  return <path d={d} fill={COL.rust} opacity={0.3 * k} />;
}

function Ring({ at, k, t, col = COL.honey }: { at: Pt; k: number; t: number; col?: string }) {
  if (k <= 0) return null;
  const p = 0.5 + 0.5 * Math.sin(t * 6);
  return (
    <g opacity={k} transform={`translate(${at[0]} ${at[1]}) scale(${Math.max(0.01, back(k))})`}>
      <circle r={34 + 6 * p} fill={col} opacity=".28" />
      <circle r="22" fill="none" stroke={col} strokeWidth="7" />
    </g>
  );
}

function Title({ t, at, until, top, sub, color = COL.forestDeep }: { t: number; at: number; until: number; top: string; sub?: string; color?: string }) {
  const o = win(t, at, until);
  if (o <= 0) return null;
  const k1 = ease((t - at) / 0.4);
  const k2 = ease((t - at - 0.2) / 0.4);
  return (
    <g opacity={o}>
      <g opacity={k1} transform={`translate(0 ${(1 - k1) * 30})`}>
        <T x={540} y={300} size={Math.min(88, 900 / (top.length * 0.53))} color={color}>{top}</T>
      </g>
      {sub && (
        <g opacity={k2} transform={`translate(0 ${(1 - k2) * 30})`}>
          <T x={540} y={378} size={40} font={FONT_BODY} weight={700} color={COL.inkSoft}>{sub}</T>
        </g>
      )}
    </g>
  );
}

function HookText({ t }: { t: number }) {
  const o = win(t, 0, E(L, "hook"));
  if (o <= 0) return null;
  const a = 1 - sm((t - NEIN + 0.05) / 0.25);
  const k = ease((t - NEIN) / 0.35);
  return (
    <g opacity={o}>
      {a > 0 &&
        [["Ist das ein", COL.forestDeep], ["Zirkel?", COL.forestDeep]].map(([s, c], i) => {
          const e = ease((t + 0.45 - i * 0.15) / 0.45);
          return (
            <g key={i} opacity={e * a} transform={`translate(0 ${(1 - e) * 40})`}>
              <T x={540} y={330 + i * 120} size={110} color={c}>{s}</T>
            </g>
          );
        })}
      {k > 0 && (
        <g opacity={k}>
          <T x={540} y={300} size={62} color={COL.inkSoft}>Nein –</T>
          <g transform={`translate(540 440) scale(${Math.max(0.01, back((t - NEIN - 0.7) / 0.45))})`}>
            <T x={0} y={0} size={104} color={COL.rust}>das ist ein Ei!</T>
          </g>
        </g>
      )}
    </g>
  );
}

/** Schlusskarte: Neugier auf die Akademie, ohne die Lösung zu verraten */
function Tease({ t }: { t: number }) {
  const at = S(L, "tease") - 0.1;
  const k = ease((t - at) / 0.45);
  if (k <= 0) return null;
  const pulse = 1 + 0.02 * Math.sin(Math.max(0, t - at - 2) * 5);
  return (
    <g opacity={k} transform={`translate(540 ${1540 + (1 - k) * 40}) scale(${pulse}) translate(-540 -1540)`}>
      <rect x={90} y={1420} width={900} height={250} rx="36" fill={COL.honey} />
      <T x={540} y={1497} size={50} color={COL.forestDeep}>Das lernt dein Kind</T>
      <T x={540} y={1557} size={40} font={FONT_BODY} weight={700} color={COL.forestDeep}>in der Reitakademie</T>
      <T x={540} y={1625} size={32} font={FONT_BODY} weight={700} color={COL.brownDeep}>Modul Bahnfiguren · Link in der Bio</T>
    </g>
  );
}

export function renderZirkel(t: number) {
  const sh = shapeAt(t);
  const th = thetaAt(t);
  const at = pathP(th, sh);
  const ahead = pathP(th - 0.02, sh);
  const heading = (Math.atan2(ahead[1] - at[1], ahead[0] - at[0]) * 180) / Math.PI;
  const errors = sh.egg + sh.box;
  const ghost = errors * win(t, S(L, "kennt"), S(L, "rund") + 0.4, 0.5);
  const rund = win(t, S(L, "rund") + 0.4, ZIRKEL_TOTAL + 1, 0.5);
  const cut = win(t, S(L, "f1b") + 1.8, E(L, "f1b"));
  const pull = win(t, S(L, "f1a") + 1.2, E(L, "f1b"));
  const fast = win(t, S(L, "f1b") + 0.2, E(L, "f1b")) * clamp01(Math.sin(th) * 2);
  const hr = (heading * Math.PI) / 180;
  const touch = (d: number) => win(t, S(L, "rund") + d, ZIRKEL_TOTAL + 1) * (1 - win(t, S(L, "tease") - 0.2, ZIRKEL_TOTAL + 1, 0.4));
  const qTitle = win(t, S(L, "q"), ZIRKEL_TOTAL + 1);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      <Arena t={t} sh={sh} />
      <CutArea k={cut} />
      {/* Soll-Zirkel (gestrichelt) */}
      {ghost > 0 && <path d={pathD(circ)} fill="none" stroke={COL.forest} strokeWidth="5" strokeDasharray="14 14" opacity={0.55 * ghost} />}
      {/* gerittene Linie */}
      <path d={pathD((x) => pathP(x, sh))} fill="none" stroke={errors > 0.5 ? COL.rust : COL.honey} strokeWidth={7 + 3 * rund} strokeDasharray={rund > 0.5 ? undefined : "22 16"} opacity={0.9} />
      {rund > 0 && <path d={pathD(circ)} fill="none" stroke={COL.forest} strokeWidth="10" opacity={rund * (1 - sh.box)} />}
      {/* Pferd */}
      {fast > 0 && (
        <g opacity={fast} stroke={COL.honey} strokeWidth="6" strokeLinecap="round">
          {[-26, 0, 26].map((o, i) => {
            const bx = at[0] - Math.cos(hr) * 150 - Math.sin(hr) * o;
            const by = at[1] - Math.sin(hr) * 150 + Math.cos(hr) * o;
            return <path key={i} d={`M${bx} ${by} L${bx - Math.cos(hr) * (60 + 20 * (i % 2))} ${by - Math.sin(hr) * (60 + 20 * (i % 2))}`} />;
          })}
        </g>
      )}
      <TopHorse at={at} ang={heading} look={LOOKS.tivoli} step={t * 1.4} s={2.3} bend={-10} />
      {/* Fehler 1: Zug zum Tor */}
      {pull > 0 && Math.sin(th) > 0.1 && (
        <g opacity={pull * clamp01((Math.sin(th) - 0.1) * 3)}>
          <Arrow from={[at[0] + (CX - at[0]) * 0.25, at[1] + 40]} to={[lerp(at[0], CX, 0.55), WB - 50]} color={COL.honey} w={8} head={20} />
        </g>
      )}
      {pull > 0 && <g opacity={pull}><Chip x={CX} y={1320} text="das Tor zieht!" fill={COL.honey} color={COL.forestDeep} size={36} /></g>}
      {fast > 0.05 && <g opacity={win(t, S(L, "f1b") + 0.2, E(L, "f1b"))}><Chip x={CX} y={1200} text="hier schneller" fill={COL.forest} size={32} /></g>}
      {cut > 0 && <g opacity={cut}><Chip x={CX} y={850} text="abgekürzt!" fill={COL.rust} size={38} /></g>}
      {/* Fehler 2 */}
      {win(t, S(L, "f2a") + 1.8, E(L, "f2b")) > 0 && (
        <g opacity={win(t, S(L, "f2a") + 1.8, E(L, "f2b"))}>
          <Chip x={CX} y={1000} text="klebt an der Bande" fill={COL.rust} size={36} />
        </g>
      )}
      <Ring at={[WL + 40, WB - 40]} k={win(t, S(L, "f2b") + 0.3, E(L, "f2b"))} t={t} col={COL.rust} />
      <Ring at={[WR - 40, WB - 40]} k={win(t, S(L, "f2b") + 0.45, E(L, "f2b"))} t={t} col={COL.rust} />
      {win(t, S(L, "f2b") + 0.3, E(L, "f2b")) > 0 && (
        <g opacity={win(t, S(L, "f2b") + 0.3, E(L, "f2b"))}>
          <Chip x={CX} y={1130} text="eckig statt rund" fill={COL.forestDeep} size={36} />
        </g>
      )}
      {/* Richtig: rund, Bande nur kurz berühren */}
      <Ring at={[WL, CY]} k={touch(1.6)} t={t} />
      <Ring at={[CX, WB]} k={touch(1.9)} t={t} />
      <Ring at={[WR, CY]} k={touch(2.2)} t={t} />
      {touch(0.5) > 0 && (
        <g opacity={touch(0.5)}>
          <Chip x={CX} y={1000} text="✓ schön rund" fill={COL.forest} size={40} />
          <g opacity={ease((t - S(L, "rund") - 1.6) / 0.4)}>
            <Chip x={CX} y={1120} text="Bande nur kurz berühren" fill={COL.honey} color={COL.forestDeep} size={32} />
          </g>
        </g>
      )}
      <Header t={t} hide={qTitle} />
      <HookText t={t} />
      <Title t={t} at={S(L, "kennt")} until={E(L, "kennt")} top="Kennt jedes Reitkind!" sub="zwei typische Gründe" />
      <PointHead t={t} start={S(L, "f1a")} end={E(L, "f1b")} n="1" title="Das Tor zieht" sub="dort schneller – gegenüber abgekürzt" />
      <PointHead t={t} start={S(L, "f2a")} end={E(L, "f2b")} n="2" title="An der Bande kleben" sub="zu lange an der Wand entlang" />
      <Title t={t} at={S(L, "rund")} until={E(L, "rund")} top="So ist es richtig" sub="rund – die Bande nur kurz berühren" color={COL.forest} />
      {qTitle > 0 && (
        <g opacity={qTitle}>
          <g opacity={ease((t - S(L, "q")) / 0.4)} transform={`translate(0 ${(1 - ease((t - S(L, "q")) / 0.4)) * 30})`}>
            <T x={540} y={250} size={84}>Und wie wird</T>
            <T x={540} y={350} size={84} color={COL.rust}>es wirklich rund?</T>
          </g>
          <g opacity={ease((t - S(L, "q") - 1.0) / 0.4)}>
            <T x={540} y={430} size={40} font={FONT_BODY} weight={700} color={COL.inkSoft}>das spürt man im Sattel</T>
          </g>
        </g>
      )}
      <Caption t={t} lines={L} skip={["tease"]} y={1610} />
      <Tease t={t} />
      <rect width={0} height={0} fill={PAPER} />
    </svg>
  );
}
