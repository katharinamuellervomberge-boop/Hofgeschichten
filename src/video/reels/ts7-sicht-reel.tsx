import type { ReactNode } from "react";
import { COL, FONT_BODY, NodHorse, PAPER, T, back, ease, lerp, sm } from "./nov-kit";
import { LOOK_T } from "./n2-kit";
import { LOOKS, TopHorse, world, type Pt } from "./top";
import { Big, BrandLine, Bubble, Face, Frame, vo, type VoLines } from "./viral-kit";
import LJ from "./sicht-lines.json";

/* Tagesset 02 · Reel 03 „Warum Pferde fast rundherum sehen“ (comp `sicht`, 16.11.2026) – Horse Facts, ab ca. 8 Jahren.
   Schematisch: je Auge ein Sichtfächer (ca. 205°), vorn überlappend (ca. 60° beidäugig), hinten ca. 10° blind, vor/unter der
   Nase ein kleiner blinder Bereich. Werte nach Horse Illustrated / UC Davis (ca. 350° gesamt, beidäugig 55–80°). */

const { S, E, total } = vo(LJ as VoLines);
export const SICHT_TOTAL = total;

const GRASS = "#B9C59B";
const C: Pt = [540, 1330];
const ANG = -90;
const HS = 6;
const EYE_L: Pt = [52, -7.2];
const EYE_R: Pt = [52, 7.2];
const BIN = 30; // halbe Breite des beidäugigen Bereichs (Grad)

function Meadow({ y = 560 }: { y?: number }) {
  return (
    <g>
      <rect x={0} y={y} width={1080} height={1920 - y} fill={GRASS} />
      <g stroke="#8FA273" strokeWidth="5" strokeLinecap="round">
        {Array.from({ length: 30 }, (_, i) => {
          const x = (i * 149) % 1080, yy = y + 40 + ((i * 97) % (1880 - y));
          return <path key={i} d={`M${x} ${yy} l-8 -18 M${x} ${yy} l2 -22 M${x} ${yy} l10 -16`} />;
        })}
      </g>
    </g>
  );
}

/** Sektor in Bildschirm-Koordinaten. a0/a1 = Winkel relativ zur Blickrichtung (Grad, + = rechts vom Pferd) */
function sector(o: Pt, a0: number, a1: number, r: number) {
  const pts: string[] = [`${o[0]},${o[1]}`];
  for (let i = 0; i <= 40; i++) {
    const a = ((ANG + lerp(a0, a1, i / 40)) * Math.PI) / 180;
    pts.push(`${(o[0] + r * Math.cos(a)).toFixed(1)},${(o[1] + r * Math.sin(a)).toFixed(1)}`);
  }
  return "M" + pts.join(" L") + " Z";
}
const eyeL = () => world(C, ANG, HS, EYE_L);
const eyeR = () => world(C, ANG, HS, EYE_R);

function Fields({ k, bin = 0, dim = 0, r = 1100 }: { k: number; bin?: number; dim?: number; r?: number }) {
  if (k <= 0.01) return null;
  const half = 175 * k;
  const o: Pt = [(eyeL()[0] + eyeR()[0]) / 2, eyeL()[1]];
  return (
    <g>
      <path d={sector(o, -half, half, r)} fill={COL.honey} opacity={0.34 * (1 - dim * 0.6)} />
      {bin > 0.01 && <path d={sector(o, -BIN, BIN, r)} fill={COL.forest} opacity={0.5 * bin} />}
    </g>
  );
}
function BlindBack({ k, t }: { k: number; t: number }) {
  if (k <= 0.01) return null;
  const tail = world(C, ANG, HS, [-40, 0]);
  return (
    <g opacity={k}>
      <path d={sector(tail, 180 - 5, 180 + 5, 900)} fill="#5A5A5A" opacity={0.45 + 0.1 * Math.sin(t * 6)} />
      <path d={`M${tail[0] - 40} ${tail[1] + 300} h80`} stroke="none" />
    </g>
  );
}
function BlindFront({ k, t }: { k: number; t: number }) {
  if (k <= 0.01) return null;
  const a = world(C, ANG, HS, [52, -7]);
  const b = world(C, ANG, HS, [52, 7]);
  const tip = world(C, ANG, HS, [100, 0]);
  return <path d={`M${a[0]} ${a[1]} L${tip[0]} ${tip[1]} L${b[0]} ${b[1]} Z`} fill="#5A5A5A" opacity={k * (0.6 + 0.1 * Math.sin(t * 6))} />;
}
function TopScene({ t, fields = 1, bin = 0, dim = 0, back: bk = 0, front = 0, children }: { t: number; fields?: number; bin?: number; dim?: number; back?: number; front?: number; children?: ReactNode }) {
  return (
    <g>
      <Meadow />
      <Fields k={fields} bin={bin} dim={dim} />
      <BlindBack k={bk} t={t} />
      <TopHorse at={C} ang={ANG} look={LOOKS.tivoli} step={0} s={HS} noRider />
      <BlindFront k={front} t={t} />
      {[eyeL(), eyeR()].map((e, i) => <circle key={i} cx={e[0]} cy={e[1]} r="9" fill="#1A120D" stroke={PAPER} strokeWidth="3" />)}
      {children}
    </g>
  );
}

function Pill({ t, a, x, y, text, col = COL.forestDeep, size = 40 }: { t: number; a: number; x: number; y: number; text: string; col?: string; size?: number }) {
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

/* ---------- Szenen ---------- */
function Hook({ t }: { t: number }) {
  const q = t >= S("02") - 0.1;
  const nose = world(C, ANG, HS, [72, 0]);
  return (
    <g>
      <TopScene t={t} fields={0.85 + 0.15 * sm(t / 1.5)} />
      <rect x={0} y={0} width={1080} height={560} fill={COL.bg} />
      <Big t={t} a={0} lines={["FAST 360°", "SICHT?!"]} y={250} size={130} />
      {q && (
        <g transform={`translate(${nose[0]} ${nose[1] - 70}) scale(${back((t - S("02")) / 0.35) * (1 + 0.08 * Math.sin(t * 7))})`}>
          <circle r="60" fill={COL.rust} />
          <T x={0} y={28} size={84} color={PAPER}>?</T>
        </g>
      )}
      {q && <Pill t={t} a={S("02") + 0.3} x={540} y={1730} text="direkt vor der Nase: ein Problem" col={COL.rust} />}
    </g>
  );
}
function Eyes({ t }: { t: number }) {
  const hk = ease((t - S("04") + 0.1) / 0.4);
  // Mensch von oben: Kopf mit zwei Augen vorn, Sichtfeld nach vorn
  const hx = 270, hy = 1160;
  const horseAt: Pt = [800, 1180];
  return (
    <g>
      <Big t={t} a={S("03") - 0.1} lines={["Wo sitzen", "die Augen?"]} y={260} size={96} />
      <defs>
        <clipPath id="si-cl"><rect x={30} y={560} width={500} height={1000} rx="40" /></clipPath>
        <clipPath id="si-cr"><rect x={550} y={560} width={500} height={1000} rx="40" /></clipPath>
      </defs>
      <rect x={30} y={560} width={500} height={1000} rx="40" fill={PAPER} />
      <rect x={550} y={560} width={500} height={1000} rx="40" fill={GRASS} opacity={hk} />
      <g clipPath="url(#si-cl)">
      {/* Mensch */}
      <path d={`M${hx} ${hy - 60} L${hx - 300} ${hy - 470} A520 520 0 0 1 ${hx + 300} ${hy - 470} Z`} fill={COL.honey} opacity=".3" />
      <circle cx={hx} cy={hy} r="95" fill="#E8B48E" />
      <path d={`M${hx - 95} ${hy + 10} A95 95 0 0 1 ${hx + 95} ${hy + 10} L${hx + 95} ${hy + 30} A95 95 0 0 0 ${hx - 95} ${hy + 30} Z`} fill={COL.forestDeep} opacity="0" />
      <circle cx={hx - 32} cy={hy - 70} r="13" fill="#1A120D" />
      <circle cx={hx + 32} cy={hy - 70} r="13" fill="#1A120D" />
      </g>
      <T x={hx} y={1420} size={50} color={COL.forestDeep}>Mensch</T>
      <T x={hx} y={1480} size={34} font={FONT_BODY} weight={800} color={COL.inkSoft}>Augen vorne</T>
      {/* Pferd */}
      {hk > 0.01 && (
        <g opacity={hk}>
          <g clipPath="url(#si-cr)">
            <path d={sector(world(horseAt, ANG, 4.5, EYE_L), -150, -30, 600)} fill={COL.honey} opacity=".4" />
            <path d={sector(world(horseAt, ANG, 4.5, EYE_R), 30, 150, 600)} fill={COL.honey} opacity=".4" />
            <TopHorse at={horseAt} ang={ANG} look={LOOKS.tivoli} step={0} s={4.5} noRider />
            {[world(horseAt, ANG, 4.5, EYE_L), world(horseAt, ANG, 4.5, EYE_R)].map((e, i) => <circle key={i} cx={e[0]} cy={e[1]} r="10" fill="#1A120D" stroke={PAPER} strokeWidth="3" />)}
          </g>
          <rect x={620} y={1370} width={360} height={140} rx="30" fill={PAPER} opacity=".9" />
          <T x={800} y={1420} size={50} color={COL.forestDeep}>Pferd</T>
          <T x={800} y={1480} size={34} font={FONT_BODY} weight={800} color={COL.inkSoft}>Augen seitlich</T>
        </g>
      )}
    </g>
  );
}
function Field({ t }: { t: number }) {
  const a = S("05");
  const grow = sm((t - a + 0.1) / 1.4);
  const nur = t >= S("07") - 0.1;
  const deg = Math.round(lerp(0, 350, grow));
  return (
    <g>
      <TopScene t={t} fields={grow} />
      <rect x={0} y={0} width={1080} height={560} fill={COL.bg} />
      {!nur ? (
        <g>
          <Big t={t} a={a - 0.1} lines={["Fast im Kreis"]} y={260} size={92} />
          <T x={540} y={480} size={150} color={COL.forestDeep}>{t >= S("06") - 0.1 ? "ca. 340–350°" : `${deg}°`}</T>
        </g>
      ) : (
        <Big t={t} a={S("07") - 0.1} lines={["Aber eben", "NUR FAST."]} y={260} size={110} col={COL.rust} shake={5} />
      )}
    </g>
  );
}
function Blind({ t }: { t: number }) {
  const bk = sm((t - S("08") + 0.1) / 0.4);
  const fr = sm((t - S("09") + 0.1) / 0.4);
  const tail = world(C, ANG, HS, [-40, 0]);
  const nose = world(C, ANG, HS, [80, 0]);
  return (
    <g>
      <TopScene t={t} dim={0.3} back={bk} front={fr}>
        <Pill t={t} a={S("08") + 0.2} x={540} y={tail[1] + 420} text="✗ hinten: blind" col="#4A4A4A" size={44} />
        {fr > 0.01 && <Pill t={t} a={S("09") + 0.3} x={540} y={nose[1] - 130} text="✗ vor & unter der Nase" col="#4A4A4A" size={44} />}
      </TopScene>
      <rect x={0} y={0} width={1080} height={560} fill={COL.bg} />
      <Big t={t} a={S("08") - 0.1} lines={["Blinde Bereiche"]} y={300} size={100} />
    </g>
  );
}
/* Seitenansicht: Kopf senken/drehen, um etwas anzuschauen */
function Look({ t }: { t: number }) {
  const a = S("10");
  const nod = 26 * sm((t - a - 0.6) / 1.2) - 10 * sm((t - a - 2.8) / 0.8);
  const seen = t >= a + 2.2;
  const k = 2.6;
  const pl = { x: 470 - 160 * k, y: 1450 - 285 * k, k };
  // grauer Keil unter der Nase (bei Kopf oben)
  return (
    <g>
      <Meadow y={1400} />
      <Big t={t} a={a - 0.1} lines={["Darum: Kopf heben,", "senken, drehen"]} y={260} size={84} />
      <NodHorse t={t} pl={pl} look={LOOK_T} gait="stand" id="si-n" nod={nod} />
      {/* Gegenstand: Ball */}
      <g transform={`translate(930 1420)`}>
        <circle r="46" fill={COL.rust} />
        <path d="M-46 0 Q0 -30 46 0" stroke={PAPER} strokeWidth="6" fill="none" />
      </g>
      <g transform={`translate(930 1290) scale(${0.9 + 0.08 * Math.sin(t * 7)})`}>
        <circle r="50" fill={seen ? COL.forest : COL.rust} />
        <T x={0} y={24} size={70} color={PAPER}>{seen ? "!" : "?"}</T>
      </g>
    </g>
  );
}
function Binocular({ t }: { t: number }) {
  const bin = sm((t - S("11") + 0.1) / 0.5);
  return (
    <g>
      <TopScene t={t} dim={bin} bin={bin} />
      <rect x={0} y={0} width={1080} height={560} fill={COL.bg} />
      <Big t={t} a={S("11") - 0.1} lines={["Beide Augen", "zusammen: nur vorn"]} y={260} size={84} />
      {t >= S("12") - 0.1 && <Pill t={t} a={S("12") - 0.1} x={540} y={640} text="hier: Abstände am besten einschätzen" col={COL.forestDeep} size={38} />}
      <Pill t={t} a={S("11") + 0.6} x={540} y={1760} text="ca. 55–80° beidäugig" col={COL.honey} size={40} />
    </g>
  );
}
function Tip({ t }: { t: number }) {
  const a = S("13");
  const walk = sm((t - a) / 1.6);
  const tail = world(C, ANG, HS, [-40, 0]);
  const px = 540, py = lerp(1900, tail[1] + 260, walk);
  return (
    <g>
      <TopScene t={t} dim={0.2} back={1}>
        <Face t={t} x={px} y={py} r={70} kind="laie" mood="smile" />
        {t >= S("14") - 0.1 && <Bubble t={t} a={S("14") - 0.1} lines={["„Hallo, ich bin’s!“"]} y={tail[1] + 100} size={48} fill={COL.forest} />}
      </TopScene>
      <rect x={0} y={0} width={1080} height={560} fill={COL.bg} />
      <Big t={t} a={a - 0.1} lines={["Von hinten:", "erst ansprechen!"]} y={260} size={96} col={COL.forest} />
    </g>
  );
}
function End({ t }: { t: number }) {
  const k = 3.2;
  const pl = { x: 540 - 230 * k, y: 1500 - 285 * k, k };
  return (
    <g>
      <Meadow y={1450} />
      <NodHorse t={t} pl={pl} look={LOOK_T} gait="stand" id="si-e" nod={-4 + 3 * Math.sin(t * 2)} />
      <Big t={t} a={S("15") - 0.1} lines={["WUSSTEST", "DU DAS?"]} y={300} size={130} col={COL.rust} />
      <BrandLine t={t} a={E("15") + 0.3} text="Mehr Pferdewissen bei Hofgeschichten" />
    </g>
  );
}

export function renderSicht(t: number) {
  const cuts = [S("03") - 0.12, S("05") - 0.12, S("08") - 0.12, S("10") - 0.12, S("11") - 0.12, S("13") - 0.12, S("15") - 0.12];
  let body: ReactNode;
  if (t < cuts[0]) body = <Hook t={t} />;
  else if (t < cuts[1]) body = <Eyes t={t} />;
  else if (t < cuts[2]) body = <Field t={t} />;
  else if (t < cuts[3]) body = <Blind t={t} />;
  else if (t < cuts[4]) body = <Look t={t} />;
  else if (t < cuts[5]) body = <Binocular t={t} />;
  else if (t < cuts[6]) body = <Tip t={t} />;
  else body = <End t={t} />;
  return <Frame t={t} cuts={cuts}>{body}</Frame>;
}
