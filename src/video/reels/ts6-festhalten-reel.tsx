import type { ReactNode } from "react";
import { BIT, SITZ, type P } from "@/components/illustrations/akademie/geometry";
import { getHorse } from "@/content/horses";
import { COL, FONT_BODY, PAPER, Phone, T, back, ease, headPoint, hs, lerp, sm, type Place } from "./nov-kit";
import { HomeScreen } from "./nov-akademie";
import { Stamp } from "./n2-kit";
import { Arena, LEATHER, RidingHorse, groundSpeed, rideInfo, type RideState } from "./rs-kit";
import { Big, BrandLine, Frame, vo, type VoLines } from "./viral-kit";
import LJ from "./festhalten-lines.json";

/* Tagesset 02 · Reel 02 „Ruhige Hände ≠ starre Hände“ (comp `festhalten`, 16.11.2026) – Ride Smarter.
   Neuer Winkel zum Reel `haende`: der Fehler ist das Festhalten-Wollen. Aussitzen im Trab, steife Arme → Hand hüpft im Takt,
   Zügel straff/locker (feste Länge). Lösung: Oberkörper ausbalanciert, Schultern locker, Ellenbogen elastisch → Hand ruhig zum Maul.
   Gangart-Einschub Schritt: Kopf nickt, Hand geht mit (Zügellänge bleibt). Weitere Ursachen als Chips. Akademie: Modul Reiterhilfen. */

const { S, E, total } = vo(LJ as VoLines);
export const FH_TOTAL = total;

const LOOK = getHorse("tonga")!.look;
const CYC = 1.6;
const NOD = 10;
const B0 = headPoint(BIT, NOD, 0);
const REIN = Math.hypot(B0[0] - SITZ.hand[0] - 2, B0[1] - SITZ.hand[1]) + 0.3;
function wobble(tt: number): P {
  const ph = (2 * Math.PI * 2 * tt) / CYC;
  return [1.6 * Math.sin(ph * 0.5 + 0.7) + 0.8 * Math.sin(tt * 7.3), 5.2 * Math.sin(ph + 0.4) + 1.4 * Math.sin(tt * 11.1)];
}
function ride(tt: number, shaky: number, walk = 0): RideState {
  const w = wobble(tt);
  // Schritt: Kopf nickt, Hand geht nach vorn/zurück mit → Zügellänge bleibt gleich
  const nodW = walk * 4 * Math.sin((2 * Math.PI * tt) / 1.1);
  const bit = headPoint(BIT, NOD + nodW, 0);
  const follow = walk ? bit[0] - B0[0] : 0;
  return { nod: NOD + nodW, reach: 0, hand: [SITZ.hand[0] + w[0] * shaky + follow, SITZ.hand[1] + w[1] * shaky + (walk ? bit[1] - B0[1] : 0) * 0.6], rein: REIN };
}

const V_FULL: Place = { x: 540 - 160 * 2.6, y: 1390 - 285 * 2.6, k: 2.6 };
const V_MED: Place = { x: 540 - (215 - 70) * 4.4, y: 880 - (75 - 20) * 4.4, k: 4.4 };
const V_SEAT: Place = { x: 540 - (195 - 70) * 4.6, y: 900 - (100 - 20) * 4.6, k: 4.6 };
function camera(t: number): Place {
  const keys: Array<[number, Place]> = [[0, V_FULL], [S("03") - 0.3, V_MED], [S("08") - 0.2, V_SEAT], [S("09") - 0.1, V_MED], [S("13") - 0.3, V_FULL]];
  let v = keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const u = sm((t - keys[i][0]) / 0.7);
    if (u <= 0) break;
    const n = keys[i][1];
    v = { x: lerp(v.x, n.x, u), y: lerp(v.y, n.y, u), k: lerp(v.k, n.k, u) };
  }
  return v;
}

function Ring({ p, col, o, r = 26, t }: { p: P; col: string; o: number; r?: number; t: number }) {
  if (o <= 0.01) return null;
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  return (
    <g opacity={o}>
      <circle cx={p[0]} cy={p[1]} r={r + 6 * pulse} fill="none" stroke={col} strokeWidth="7" />
      <circle cx={p[0]} cy={p[1]} r={r * 0.4} fill={col} opacity=".35" />
    </g>
  );
}
function Bounce({ p, col, o, amp = 34 }: { p: P; col: string; o: number; amp?: number }) {
  if (o <= 0.01) return null;
  const [x, y] = p;
  return (
    <g opacity={o} stroke={col} strokeWidth="7" strokeLinecap="round" fill="none">
      <path d={`M${x} ${y - amp} V${y + amp}`} />
      <path d={`M${x - 13} ${y - amp + 15} L${x} ${y - amp} L${x + 13} ${y - amp + 15}`} />
      <path d={`M${x - 13} ${y + amp - 15} L${x} ${y + amp} L${x + 13} ${y + amp - 15}`} />
    </g>
  );
}
function Ice({ p, t, o }: { p: P; t: number; o: number }) {
  if (o <= 0.01) return null;
  return (
    <g opacity={o * 0.85} stroke="#8FB7D4" strokeWidth="5" strokeLinecap="round">
      {[[-70, -40], [60, -60], [30, 50]].map(([dx, dy], i) => {
        const r = 22 + 4 * Math.sin(t * 3 + i);
        const c: P = [p[0] + dx, p[1] + dy];
        return (
          <g key={i} transform={`translate(${c[0]} ${c[1]}) rotate(${i * 20})`}>
            {[0, 60, 120].map((a) => <path key={a} transform={`rotate(${a})`} d={`M${-r} 0 L${r} 0 M${r * 0.55} -8 L${r * 0.75} 0 L${r * 0.55} 8 M${-r * 0.55} -8 L${-r * 0.75} 0 L${-r * 0.55} 8`} />)}
          </g>
        );
      })}
    </g>
  );
}
function Chip({ t, a, x, y, text, col = COL.forest, size = 40 }: { t: number; a: number; x: number; y: number; text: string; col?: string; size?: number }) {
  const k = back((t - a) / 0.35);
  if (k <= 0.01) return null;
  const w = text.length * size * 0.56 + 80;
  return (
    <g opacity={Math.min(1, k)} transform={`translate(${x} ${y}) scale(${Math.max(0.01, Math.min(1, k))})`}>
      <rect x={-w / 2} y={-size * 1.05} width={w} height={size * 2} rx={size} fill={col} />
      <T x={0} y={size * 0.36} size={size} font={FONT_BODY} weight={800} color={PAPER}>{text}</T>
    </g>
  );
}

/* ---------- Hauptszene: Pferd + Reiterin seitlich ---------- */
function Main({ t }: { t: number }) {
  const good = sm((t - S("09") + 0.2) / 0.6);
  const walk = t >= S("13") - 0.3 ? 1 : 0;
  const gait = walk ? ("schritt" as const) : ("trab" as const);
  const pl = camera(t);
  const s = ride(t, 1 - good, walk);
  const info = rideInfo(t, gait, s);
  const scr = (p: P) => hs(pl, [p[0], p[1] + info.bob]);
  const tight = good < 0.5 && info.tension > 0.15;
  const stiff = t >= S("03") - 0.1 && good < 0.5 ? 1 : 0;
  const wave = t >= S("04") && t < S("07") - 0.1;
  const chain: P[] = [[150, 120], info.body.hip, info.body.shoulder, info.body.elbow, info.body.hand];
  const sc = chain.map(scr);
  return (
    <g>
      <Arena t={t} speed={groundSpeed(gait, pl.k)} y={pl.y + 285 * pl.k} top={600} />
      <RidingHorse t={t} pl={pl} look={LOOK} gait={gait} id="fh-r" s={s} reinColor={tight ? COL.rust : LEATHER} reinW={2.8} glow={good > 0.5 && t >= S("12") - 0.1 && t < S("13") - 0.3 ? COL.forest : tight ? COL.rust : undefined} />
      {/* steife Arme */}
      {stiff > 0 && (
        <g>
          <path d={`M${sc[2][0]} ${sc[2][1]} L${sc[3][0]} ${sc[3][1]} L${sc[4][0]} ${sc[4][1]}`} fill="none" stroke={COL.rust} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" opacity=".45" />
          <Ice p={sc[3]} t={t} o={t < S("04") ? 1 : 0.5} />
        </g>
      )}
      {/* Bewegungswelle Rücken → Becken → Schulter → Ellenbogen → Hand */}
      {wave && (() => {
        const u = ((t - S("04")) * 0.8) % 1;
        const segs = sc.length - 1;
        const f = u * segs, i = Math.min(segs - 1, Math.floor(f)), q = f - i;
        const p: P = [lerp(sc[i][0], sc[i + 1][0], q), lerp(sc[i][1], sc[i + 1][1], q)];
        return (
          <g>
            <path d={"M" + sc.map((c) => `${c[0]} ${c[1]}`).join(" L")} fill="none" stroke={COL.honey} strokeWidth="5" strokeDasharray="8 10" opacity=".8" />
            <circle cx={p[0]} cy={p[1]} r="20" fill={i >= 3 ? COL.rust : COL.honey} />
          </g>
        );
      })()}
      <Bounce p={[scr(info.h)[0] + 56, scr(info.h)[1]]} col={COL.rust} o={t >= S("05") - 0.1 && t < S("07") - 0.1 ? 1 : 0} />
      {/* Lösung */}
      <Ring t={t} p={scr(info.body.hip)} col={COL.honey} o={t >= S("08") && t < S("09") ? 1 : 0} r={34} />
      <Ring t={t} p={[lerp(scr(info.body.hip)[0], scr(info.body.shoulder)[0], 0.5), lerp(scr(info.body.hip)[1], scr(info.body.shoulder)[1], 0.5)]} col={COL.forest} o={t >= S("09") - 0.05 && t < S("13") - 0.3 ? 1 : 0} r={30} />
      <Ring t={t} p={scr(info.body.shoulder)} col={COL.forest} o={t >= S("10") - 0.05 && t < S("13") - 0.3 ? 1 : 0} r={24} />
      <Ring t={t} p={scr(info.body.elbow)} col={COL.forest} o={t >= S("11") - 0.05 && t < S("13") - 0.3 ? 1 : 0} r={26} />
      {walk > 0 && (() => {
        const h = scr(info.h);
        return (
          <g stroke={COL.forest} strokeWidth="7" strokeLinecap="round" fill="none">
            <path d={`M${h[0] - 50} ${h[1] - 40} H${h[0] + 50}`} />
            <path d={`M${h[0] - 36} ${h[1] - 54} L${h[0] - 50} ${h[1] - 40} L${h[0] - 36} ${h[1] - 26} M${h[0] + 36} ${h[1] - 54} L${h[0] + 50} ${h[1] - 40} L${h[0] + 36} ${h[1] - 26}`} />
          </g>
        );
      })()}
    </g>
  );
}

function Overlay({ t }: { t: number }) {
  const bottom = 1540;
  let head: ReactNode = null;
  if (t < S("03") - 0.1) head = <Big t={t} a={0} lines={["DEINE HÄNDE", "SIND UNRUHIG?"]} y={260} size={96} />;
  else if (t < S("04") - 0.1) head = <Big t={t} a={S("03") - 0.1} lines={["STARR ≠ RUHIG"]} y={300} size={112} col={COL.rust} />;
  else if (t < S("07") - 0.1) head = <Big t={t} a={S("04") - 0.1} lines={["Steife Arme:", "Bewegung landet in der Hand"]} y={260} size={70} />;
  else if (t < S("09") - 0.1) head = null;
  else if (t < S("13") - 0.1) head = <Big t={t} a={S("09") - 0.1} lines={["So wird die", "Hand ruhig"]} y={260} size={84} col={COL.forest} />;
  else if (t < S("15") - 0.1) head = <Big t={t} a={S("13") - 0.1} lines={["Je nach Gangart:", "Hand geht mit"]} y={260} size={84} />;
  else head = <Big t={t} a={S("15") - 0.1} lines={["Auch möglich:"]} y={300} size={84} />;
  return (
    <g>
      {head}
      {t >= S("02") - 0.05 && t < S("03") - 0.1 && <Stamp t={t} a={S("02") - 0.05} x={540} y={bottom} text="FESTHALTEN?" size={88} />}
      {t >= S("05") - 0.1 && t < S("07") - 0.1 && (
        <g>
          <Chip t={t} a={S("05") - 0.1} x={540} y={bottom - 20} text="Hand hüpft mit" col={COL.rust} size={46} />
          <Chip t={t} a={S("06")} x={540} y={bottom + 120} text="Verbindung unruhig oder hart" col={COL.rust} size={40} />
        </g>
      )}
      {t >= S("07") - 0.1 && t < S("09") - 0.1 && (
        <g>
          {t < S("08") - 0.1 && <rect width={1080} height={1920} fill={COL.forestDeep} />}
          {t < S("08") - 0.1 ? (
            <Big t={t} a={S("07") - 0.1} lines={["Das Problem liegt", "nicht immer", "in den Händen."]} y={760} size={100} col={COL.sandLight} />
          ) : (
            <Big t={t} a={S("08") - 0.1} lines={["…sondern im SITZ."]} y={290} size={96} col={COL.honey} />
          )}
        </g>
      )}
      {t >= S("09") - 0.1 && t < S("13") - 0.1 && (
        <g>
          <Chip t={t} a={S("09") - 0.05} x={540} y={bottom - 40} text="① Oberkörper ausbalanciert" size={40} />
          <Chip t={t} a={S("10") - 0.05} x={540} y={bottom + 70} text="② Schultern locker" size={40} />
          <Chip t={t} a={S("11") - 0.05} x={540} y={bottom + 180} text="③ Ellenbogen elastisch" size={40} />
          {t >= S("12") - 0.1 && <Chip t={t} a={S("12") - 0.1} x={540} y={470} text="Hand ruhig zum Pferdemaul ✓" col={COL.forestDeep} size={42} />}
        </g>
      )}
      {t >= S("13") - 0.1 && t < S("15") - 0.1 && <Chip t={t} a={S("14") - 0.1} x={540} y={bottom + 40} text="Schritt · Galopp: Hand geht mit" col={COL.forestDeep} size={42} />}
      {t >= S("15") - 0.1 && t < S("16") - 0.12 && (
        <g>
          {["Balance", "Spannung", "Körpermitte"].map((c, i) => <Chip key={c} t={t} a={S("15") + 0.4 + i * 0.7} x={540} y={bottom - 80 + i * 120} text={c} col={i === 2 ? COL.rust : COL.forest} size={46} />)}
        </g>
      )}
    </g>
  );
}

/* ---------- Vergleich ---------- */
function Panel({ t, x, good }: { t: number; x: number; good: boolean }) {
  const k = 1.9;
  const pl: Place = { x: x + 250 - (225 - 70) * k, y: 1260 - 285 * k, k };
  const s = ride(t, good ? 0 : 1);
  const info = rideInfo(t, "trab", s);
  const col = good ? COL.forest : COL.rust;
  const tight = !good && info.tension > 0.15;
  const scr = (p: P) => hs(pl, [p[0], p[1] + info.bob]);
  const id = good ? "fh-pr" : "fh-pl";
  return (
    <g>
      <defs><clipPath id={`${id}-c`}><rect x={x + 10} y={640} width={520} height={760} rx="36" /></clipPath></defs>
      <g clipPath={`url(#${id}-c)`}>
        <g transform={`translate(${x - 270} 0)`}><Arena t={t} speed={groundSpeed("trab", k)} y={pl.y + 285 * k} top={640} /></g>
        <RidingHorse t={t} pl={pl} look={LOOK} gait="trab" id={id} s={s} reinColor={tight ? COL.rust : LEATHER} reinW={2.8} glow={good ? COL.forest : tight ? COL.rust : undefined} />
        {good ? <Ring t={t} p={scr(info.body.elbow)} col={COL.forest} o={1} r={20} /> : <Bounce p={[scr(info.h)[0] + 46, scr(info.h)[1]]} col={COL.rust} o={1} />}
      </g>
      <rect x={x + 10} y={640} width={520} height={760} rx="36" fill="none" stroke={col} strokeWidth="6" />
      <g transform={`translate(${x + 270} 1320)`}>
        <circle r="38" fill={col} />
        <T x={0} y={16} size={46} font={FONT_BODY} weight={700} color={PAPER}>{good ? "✓" : "✗"}</T>
      </g>
      <T x={x + 270} y={1450} size={38} font={FONT_BODY} weight={800} color={col}>{good ? "mitgehen" : "festhalten"}</T>
    </g>
  );
}
function Compare({ t }: { t: number }) {
  return (
    <g>
      <Big t={t} a={S("16") - 0.1} lines={["Nicht festhalten."]} y={330} size={88} col={COL.rust} />
      {t >= S("17") - 0.1 && <Big t={t} a={S("17") - 0.1} lines={["Mitgehen."]} y={460} size={100} col={COL.forest} />}
      <Panel t={t} x={0} good={false} />
      <Panel t={t} x={540} good />
    </g>
  );
}
function Akademie({ t }: { t: number }) {
  const a = S("18");
  const py = lerp(1960, 470, ease((t - a + 0.1) / 0.6));
  const scroll = 420 * sm((t - a - 0.6) / 1.8);
  const hi = sm((t - a - 2.4) / 0.3);
  const fin = E("18") - 0.3;
  return (
    <g>
      <Big t={t} a={a - 0.1} lines={["Reiten verstehen", "statt nur nachmachen."]} y={210} size={74} />
      <Phone x={280} y={py} w={520} id="fh-ph">
        <g transform={`translate(296 ${py + 16})`}>
          <HomeScreen scroll={scroll} />
          {hi > 0.01 && <rect x={10} y={908 - 6 - scroll} width={468} height={164} rx="22" fill="none" stroke={COL.honey} strokeWidth={6 + 2 * Math.sin(t * 6)} opacity={hi} />}
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

export function renderFesthalten(t: number) {
  const cuts = [S("03") - 0.1, S("07") - 0.1, S("08") - 0.1, S("13") - 0.1, S("16") - 0.12, S("18") - 0.12];
  let body: ReactNode;
  if (t < S("16") - 0.12) body = (<g><Main t={t} /><Overlay t={t} /></g>);
  else if (t < S("18") - 0.12) body = <Compare t={t} />;
  else body = <Akademie t={t} />;
  return <Frame t={t} cuts={cuts}>{body}</Frame>;
}
