import type { ReactNode } from "react";
import { AnimHorse, type LegId, type LegJoints } from "@/components/illustrations/akademie/AnimHorse";
import { COL, CommentCard, FONT_BODY, PAPER, T, back, ease, sm } from "./nov-kit";
import { LOOK_T } from "./n2-kit";
import { Big, BrandLine, Frame, vo, type VoLines } from "./viral-kit";
import LJ from "./schlaf-lines.json";

/* Tagesset 01 · Reel 03 „Warum schlafen Pferde im Stehen?“ (comp `schlaf`, 15.11.2026) – Horse Facts, ab ca. 8 Jahren.
   Weide in Seitenansicht. Stehapparat bewusst schematisch (Linien entlang der Beine, Gelenkpunkte), kein Detail-Anatomiebild.
   Dösen: Augen zu, ein Hinterbein entlastet (Huf auf der Spitze). Liegen: Seitenlage, gezeigt VON OBEN (so sieht man die
   Seite des Pferdes) – keine neue Figur nötig. Schlafmangel: Pferd knickt vorn kurz ein (dezent, keine Verletzung).
   Fakten: Stehapparat, REM nur im Liegen, Kollaps bei längerem REM-Mangel (The Horse/Houpt; LMU-Studie Fuchs). */

const { S, E, total } = vo(LJ as VoLines);
export const SCHLAF_TOTAL = total;

type P = [number, number];
const GROUND = 288;
const TOP: Record<LegId, P> = { VL: [251, 182], VR: [265, 180], HL: [127, 178], HR: [143, 176] };
const LEN = { V: [58, 50] as [number, number], H: [56, 52] as [number, number] };
const FOOT: Record<LegId, P> = { VL: [253, GROUND], VR: [267, GROUND], HL: [123, GROUND], HR: [139, GROUND] };
function knee(top: P, foot: P, [l1, l2]: [number, number], fwd: boolean): P {
  const dx = foot[0] - top[0], dy = foot[1] - top[1];
  const d = Math.min(Math.hypot(dx, dy), l1 + l2 - 0.01);
  const a = Math.atan2(dy, dx);
  const b = Math.acos(Math.max(-1, Math.min(1, (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d))));
  const ang = fwd ? a - b : a + b;
  return [top[0] + l1 * Math.cos(ang), top[1] + l1 * Math.sin(ang)];
}
const joints = (leg: LegId, foot: P): LegJoints => ({ foot, knee: knee(TOP[leg], foot, LEN[leg[0] === "V" ? "V" : "H"], leg[0] === "V") });
/** entlastetes Hinterbein (nah, HL): Fessel vor und hoch, Huf auf der Spitze */
const cocked = (k: number): Partial<Record<LegId, LegJoints>> => (k > 0.01 ? { HL: joints("HL", [123 + 14 * k, GROUND - 12 * k]) } : {});

const GRASS = "#B9C59B";
function Meadow({ y = 1420 }: { y?: number }) {
  return (
    <g>
      <rect x={0} y={y} width={1080} height={1920 - y} fill={GRASS} />
      <g stroke="#8FA273" strokeWidth="5" strokeLinecap="round">
        {Array.from({ length: 22 }, (_, i) => {
          const x = (i * 149) % 1080, yy = y + 40 + ((i * 53) % 380);
          return <path key={i} d={`M${x} ${yy} l-8 -18 M${x} ${yy} l2 -22 M${x} ${yy} l10 -16`} />;
        })}
      </g>
    </g>
  );
}

/** Pferd in Seitenansicht. `place`: Bildschirm-x/y des Bodens unter dem Rumpf, k = Maßstab */
function Horse({ t, x, ground, k, eyes = 1, cock = 0, legs, rotate = 0, lift = 0, children }: { t: number; x: number; ground: number; k: number; eyes?: number; cock?: number; legs?: Partial<Record<LegId, LegJoints>>; rotate?: number; lift?: number; children?: ReactNode }) {
  const px = x - (195 - 70) * k;
  const py = ground - (300 - 20) * k;
  return (
    <svg x={px} y={py} width={320 * k} height={292 * k} viewBox="70 20 320 292" overflow="visible">
      <AnimHorse look={LOOK_T} gait="stand" time={t} legs={{ ...cocked(cock), ...legs }} rotate={rotate} pivot={[130, 290]} lift={lift} />
      {eyes < 0.99 && (
        <g transform={rotate ? `rotate(${rotate} 130 290)` : undefined}>
          <ellipse cx="330" cy={78 - lift} rx="5.6" ry={5.6 * (1 - eyes)} fill={LOOK_T.coat} />
          {eyes < 0.2 && <path d={`M325 ${79 - lift} q5 4 10 0`} stroke="#1A120D" strokeWidth="1.6" fill="none" strokeLinecap="round" />}
        </g>
      )}
      {children}
    </svg>
  );
}
function Zzz({ t, x, y, o = 1 }: { t: number; x: number; y: number; o?: number }) {
  if (o <= 0.01) return null;
  return (
    <g opacity={o}>
      {[0, 1, 2].map((i) => {
        const u = (t * 0.6 + i / 3) % 1;
        return <T key={i} x={x + u * 70} y={y - u * 150} size={44 + 24 * u} color={COL.forest} o={Math.sin(Math.PI * u)}>z</T>;
      })}
    </g>
  );
}

/* ---------- Stehapparat-Overlay (Pferde-Koordinaten) ---------- */
function StayOverlay({ t, a, cock, lift = 0 }: { t: number; a: number; cock: number; lift?: number }) {
  const legsShown: LegId[] = ["VL", "HL"];
  return (
    <g>
      {legsShown.map((leg, i) => {
        const k = sm((t - a - i * 0.25) / 0.5);
        if (k <= 0.01) return null;
        const foot = leg === "HL" && cock > 0.01 ? ([123 + 14 * cock, GROUND - 12 * cock] as P) : FOOT[leg];
        const top: P = [TOP[leg][0], TOP[leg][1] - lift];
        const kn = knee(TOP[leg], foot, LEN[leg[0] === "V" ? "V" : "H"], leg[0] === "V");
        const pulse = 0.7 + 0.3 * Math.sin(t * 5 + i);
        const resting = leg === "HL" && cock > 0.5;
        const col = resting ? COL.sand : COL.honey;
        return (
          <g key={leg} opacity={k}>
            <path d={`M${top[0] + (leg[0] === "V" ? 9 : -9)} ${top[1] - 6} L${kn[0] + (leg[0] === "V" ? 8 : -8)} ${kn[1]} L${foot[0] + (leg[0] === "V" ? 6 : -6)} ${foot[1]}`} fill="none" stroke={col} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={`${180 * k} 400`} />
            {[top, kn, foot].map((p, j) => <circle key={j} cx={p[0]} cy={p[1]} r={5.5 * pulse} fill={col} stroke={PAPER} strokeWidth="1.5" />)}
          </g>
        );
      })}
    </g>
  );
}

/* ---------- Liegendes Pferd von oben (Seitenlage) ---------- */
function LyingTop({ t, cx, cy, k }: { t: number; cx: number; cy: number; k: number }) {
  const breathe = 1 + 0.012 * Math.sin(t * 2.2);
  const rel: Partial<Record<LegId, LegJoints>> = {
    VL: joints("VL", [312, 258]), VR: joints("VR", [322, 246]), HL: joints("HL", [186, 278]), HR: joints("HR", [200, 266]),
  };
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={420 * k / 2.4} ry={300 * k / 2.4} fill="#A9B88A" />
      <ellipse cx={cx + 10 * k} cy={cy + 20 * k} rx={130 * k} ry={52 * k} fill="#000" opacity=".1" transform={`rotate(-12 ${cx} ${cy})`} />
      <g transform={`rotate(-12 ${cx} ${cy}) translate(${cx} ${cy}) scale(1 ${breathe}) translate(${-cx} ${-cy})`}>
        <Horse t={t} x={cx - 20} ground={cy + 150 * k / 2.4} k={k} eyes={0} legs={rel} />
      </g>
    </g>
  );
}

/* ---------- Szenen ---------- */
const G1 = 1420;
function Intro({ t }: { t: number }) {
  const eyes = 1 - sm(t / 0.6);
  return (
    <g>
      <Big t={t} a={0} lines={["Pferde schlafen", "im Stehen."]} y={260} size={92} />
      {t >= S("02") - 0.1 && <Big t={t} a={S("02") - 0.1} lines={["Aber warum fallen", "sie nicht um?"]} y={520} size={74} col={COL.rust} />}
      <Meadow y={G1} />
      <Horse t={t} x={540} ground={G1 + 40} k={2.5} eyes={eyes} cock={sm((t - 0.4) / 0.6)} />
      <Zzz t={t} x={830} y={830} o={sm((t - 0.6) / 0.4)} />
    </g>
  );
}
function Legs({ t }: { t: number }) {
  const a = S("03");
  const cock = sm((t - S("06")) / 0.6);
  const k = 3.6;
  const ground = 1580;
  const toS = (p: P): P => [540 - (195 - 70) * k + (p[0] - 70) * k, ground - (300 - 20) * k + (p[1] - 20) * k];
  const hl = toS([123 + 14 * cock, GROUND - 12 * cock]);
  return (
    <g>
      <Big t={t} a={a - 0.1} b={S("05") - 0.15} lines={["Das Geheimnis:", "die Beine"]} y={240} size={84} />
      {t >= S("04") - 0.05 && t < S("05") - 0.15 && <Big t={t} a={S("04") - 0.05} lines={["STEHAPPARAT"]} y={470} size={96} col={COL.honey} shake={4} />}
      {t >= S("05") - 0.15 && t < S("06") - 0.1 && <Big t={t} a={S("05") - 0.15} lines={["Sehnen und Bänder", "halten die Gelenke"]} y={240} size={78} />}
      {t >= S("06") - 0.1 && <Big t={t} a={S("06") - 0.1} lines={["Ein Hinterbein", "ruht sich aus"]} y={240} size={84} />}
      <Meadow y={ground - 60} />
      <Horse t={t} x={540} ground={ground} k={k} eyes={0} cock={cock}>
        <StayOverlay t={t} a={a + 0.3} cock={cock} />
      </Horse>
      {/* Muskel-Anzeige: fast ohne Kraft */}
      {t >= E("05") - 1.6 && t < S("06") - 0.1 && (
        <g opacity={ease((t - E("05") + 1.6) / 0.3)}>
          <rect x={140} y={500} width={800} height={110} rx="55" fill={PAPER} stroke={COL.sandLight} strokeWidth="4" />
          <T x={300} y={570} size={36} font={FONT_BODY} weight={800} color={COL.inkSoft}>Muskelkraft</T>
          <rect x={470} y={538} width={420} height={36} rx="18" fill={COL.sandLight} />
          <rect x={470} y={538} width={420 * (1 - 0.85 * sm((t - E("05") + 1.4) / 0.8))} height={36} rx="18" fill={COL.forest} />
        </g>
      )}
      {cock > 0.3 && (
        <g opacity={sm((t - S("07")) / 0.3)}>
          <circle cx={hl[0]} cy={hl[1] + 10} r={56 + 6 * Math.sin(t * 6)} fill="none" stroke={COL.rust} strokeWidth="7" />
          <rect x={150} y={500} width={780} height={120} rx="60" fill={COL.forest} />
          <T x={540} y={578} size={52} color={PAPER}>Dösen auf drei Beinen</T>
        </g>
      )}
    </g>
  );
}
function Flight({ t }: { t: number }) {
  const alert = sm((t - S("09") - 0.2) / 0.3);
  return (
    <g>
      <Big t={t} a={S("08") - 0.1} lines={["Praktisch für", "ein Fluchttier"]} y={260} size={86} />
      <Meadow y={G1} />
      <Horse t={t} x={560} ground={G1 + 40} k={2.5} eyes={alert} cock={1 - alert} />
      <Zzz t={t} x={850} y={830} o={1 - alert} />
      {alert > 0.01 && (
        <g>
          {[0, 1, 2].map((i) => {
            const u = ((t - S("09")) * 0.9 + i / 3) % 1;
            return <path key={i} d={`M${120 + 60 * u} ${900 - 120 * u} a${150 * u} ${150 * u} 0 0 1 0 ${240 * u}`} fill="none" stroke={COL.rust} strokeWidth="7" opacity={(1 - u) * alert} />;
          })}
          <g opacity={alert} transform={`translate(830 760) scale(${back((t - S("09") - 0.3) / 0.3)})`}>
            <circle r="56" fill={COL.rust} />
            <T x={0} y={24} size={70} color={PAPER}>!</T>
          </g>
          <g opacity={ease((t - S("09") - 0.5) / 0.3)}>
            <rect x={170} y={460} width={740} height={100} rx="50" fill={COL.forest} />
            <T x={540} y={526} size={44} font={FONT_BODY} weight={800} color={PAPER}>schnell bereit loszulaufen</T>
          </g>
        </g>
      )}
    </g>
  );
}
function Twist({ t }: { t: number }) {
  return (
    <g>
      <rect width={1080} height={1920} fill={COL.forestDeep} />
      <Big t={t} a={S("10") - 0.1} lines={["Aber jetzt kommt’s:"]} y={640} size={70} col={COL.sandLight} />
      {t >= S("11") - 0.05 && <Big t={t} a={S("11") - 0.05} lines={["DAS REICHT", "NICHT!"]} y={900} size={150} col={COL.honey} shake={10} />}
    </g>
  );
}
function Rem({ t }: { t: number }) {
  const lie = sm((t - S("13") - 0.1) / 0.5);
  const tone = 1 - sm((t - S("12") - 0.3) / 1.4);
  return (
    <g>
      <Big t={t} a={S("12") - 0.1} lines={["REM-Schlaf:", "ganzer Körper schlaff"]} y={250} size={80} />
      {lie < 0.99 && (
        <g opacity={1 - lie}>
          <Meadow y={G1} />
          <Horse t={t} x={540} ground={G1 + 40} k={2.5} eyes={0} cock={1} />
          <rect x={140} y={500} width={800} height={110} rx="55" fill={PAPER} stroke={COL.sandLight} strokeWidth="4" />
          <T x={300} y={570} size={36} font={FONT_BODY} weight={800} color={COL.inkSoft}>Muskelspannung</T>
          <rect x={470} y={538} width={420} height={36} rx="18" fill={COL.sandLight} />
          <rect x={470} y={538} width={Math.max(0, 420 * tone)} height={36} rx="18" fill={COL.rust} />
        </g>
      )}
      {lie > 0.01 && (
        <g opacity={lie}>
          <rect x={0} y={480} width={1080} height={1440} fill={GRASS} />
          <LyingTop t={t} cx={540} cy={1060} k={2.6} />
          <Zzz t={t} x={820} y={760} />
          <rect x={220} y={1440} width={640} height={84} rx="42" fill={PAPER} />
          <T x={540} y={1495} size={36} font={FONT_BODY} weight={800} color={COL.forestDeep}>flach auf der Seite · von oben</T>
          <rect x={150} y={1570} width={780} height={120} rx="60" fill={COL.forest} />
          <T x={540} y={1648} size={50} color={PAPER}>Dafür: hinlegen!</T>
        </g>
      )}
    </g>
  );
}
function Deprived({ t }: { t: number }) {
  const buckle = sm((t - S("15") - 0.3) / 0.35) * (1 - sm((t - S("15") - 1.3) / 0.4));
  const legs: Partial<Record<LegId, LegJoints>> = buckle > 0.01 ? { VL: joints("VL", [253 - 10 * buckle, GROUND]), VR: joints("VR", [267 - 10 * buckle, GROUND]) } : {};
  return (
    <g>
      <Big t={t} a={S("14") - 0.1} lines={["Nie hinlegen =", "zu wenig Schlaf"]} y={260} size={86} col={COL.rust} />
      <Meadow y={G1} />
      <Horse t={t} x={540} ground={G1 + 40} k={2.5} eyes={buckle > 0.3 ? 0.6 : 0} cock={1 - buckle} legs={legs} rotate={7 * buckle} lift={-16 * buckle} />
      <Zzz t={t} x={830} y={830} o={1 - sm((t - S("15") - 0.2) / 0.2)} />
      {t >= S("15") && (
        <g opacity={ease((t - S("15")) / 0.3)}>
          <rect x={110} y={500} width={860} height={110} rx="55" fill={COL.rust} />
          <T x={540} y={572} size={44} font={FONT_BODY} weight={800} color={PAPER}>kann im Stehen einknicken</T>
        </g>
      )}
    </g>
  );
}
function Fazit({ t }: { t: number }) {
  const okL = back((t - S("18")) / 0.3);
  const okR = back((t - S("20")) / 0.3);
  return (
    <g>
      <Big t={t} a={S("16") - 0.1} b={S("21") - 0.1} lines={["Also:"]} y={240} size={80} />
      {t >= S("21") - 0.1 && <Big t={t} a={S("21") - 0.1} lines={["Wusstest du das schon?"]} y={240} size={78} col={COL.rust} />}
      <g opacity={ease((t - S("17") + 0.2) / 0.3)}>
        <rect x={40} y={400} width={490} height={880} rx="40" fill={PAPER} />
        <rect x={40} y={1000} width={490} height={280} rx="0" fill={GRASS} />
        <svg x={40} y={400} width={490} height={880} viewBox="0 0 490 880">
          <Horse t={t} x={240} ground={640} k={1.45} eyes={0} cock={1} />
        </svg>
        <T x={285} y={1120} size={50} color={COL.forestDeep}>Dösen</T>
        <T x={285} y={1180} size={34} font={FONT_BODY} weight={800} color={COL.inkSoft}>im Stehen</T>
        {okL > 0.01 && <g transform={`translate(285 480) scale(${Math.max(0.01, okL)})`}><circle r="46" fill={COL.forest} /><T x={0} y={18} size={52} font={FONT_BODY} color={PAPER}>✓</T></g>}
      </g>
      <g opacity={ease((t - S("19") + 0.2) / 0.3)}>
        <rect x={550} y={400} width={490} height={880} rx="40" fill={GRASS} />
        <svg x={550} y={400} width={490} height={880} viewBox="0 0 490 880">
          <LyingTop t={t} cx={245} cy={470} k={1.3} />
        </svg>
        <T x={795} y={1120} size={50} color={COL.forestDeep}>Tiefschlaf</T>
        <T x={795} y={1180} size={34} font={FONT_BODY} weight={800} color={COL.inkSoft}>nur im Liegen</T>
        {okR > 0.01 && <g transform={`translate(795 480) scale(${Math.max(0.01, okR)})`}><circle r="46" fill={COL.forest} /><T x={0} y={18} size={52} font={FONT_BODY} color={PAPER}>✓</T></g>}
      </g>
      {t >= S("21") - 0.1 && (
        <g>
          <CommentCard t={t} a={S("21") + 0.2} lines={["Beides gehört zu", "gutem Pferdeschlaf."]} y={1360} />
          <BrandLine t={t} a={E("21") + 0.3} text="Mehr Pferdewissen bei Hofgeschichten" />
        </g>
      )}
    </g>
  );
}

export function renderSchlaf(t: number) {
  const cuts = [S("03") - 0.12, S("08") - 0.12, S("10") - 0.12, S("12") - 0.12, S("14") - 0.12, S("16") - 0.12];
  let body: ReactNode;
  if (t < cuts[0]) body = <Intro t={t} />;
  else if (t < cuts[1]) body = <Legs t={t} />;
  else if (t < cuts[2]) body = <Flight t={t} />;
  else if (t < cuts[3]) body = <Twist t={t} />;
  else if (t < cuts[4]) body = <Rem t={t} />;
  else if (t < cuts[5]) body = <Deprived t={t} />;
  else body = <Fazit t={t} />;
  return <Frame t={t} cuts={cuts}>{body}</Frame>;
}
