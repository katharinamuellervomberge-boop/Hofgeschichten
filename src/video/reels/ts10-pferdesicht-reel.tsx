import type { ReactNode } from "react";
import { COL, Caption, FONT_BODY, Ground, NodHorse, PAPER, Pop, T, W, back, ease, hs, lerp, sm, type Place, type VLine } from "./nov-kit";
import { LOOK_T } from "./n2-kit";
import { LOOKS, TopHorse, world, type Pt } from "./top";
import { Big, Frame, vo, type VoLines } from "./viral-kit";
import { Tag } from "./hg1-haenger-reel";
import { AkCTA, Mark2 } from "./t3-kit";
import LJ from "./pferdesicht-lines.json";

/* Tagesset 03 · Reel 3 „Dein Pferd sieht die Welt VÖLLIG anders als du!“ (comp `pferdesicht`, 18.11.2026), Jessica v4 ×1,12.
   Fakten: Dichromasie (Carroll et al. 2001; Hanggi et al. 2007), Gesichtsfeld ca. 340–350° (nur Rückgriff auf `sicht`),
   Visual Streak (Harman et al. 1999; Timney & Keil 1992), Tapetum lucidum (Ollivier et al. 2004; Shinozaki et al. 2013).
   Farbvergleich = schematische Annäherung: Rot-Grün-Dichromaten-Simulation (Machado, Oliveira & Fernandes 2009, Deuteranopie,
   Schweregrad 1,0) als SVG-Farbmatrix im linearen RGB. Ausdrücklich keine Simulation der subjektiven Pferdewahrnehmung.
   Neu: Weide-Slider, Zapfen-Karten, Netzhaut-Band, Augen-Querschnitt, Blitzfoto. Bestand: NodHorse, TopHorse, Ground, Tag/Pop, Akademie. */

const { S, E, total } = vo(LJ as VoLines);
export const PS_TOTAL = total;

const TEXT: Record<string, string> = {
  "01": "Du glaubst, dein Pferd sieht dieselben Farben wie du?", "02": "Tatsächlich sieht seine Welt ganz anders aus.",
  "03": "Wir haben drei Arten Farbzapfen, Pferde nur zwei.", "04": "Blau und Gelb erkennen sie gut,", "05": "Rot und Grün halten sie kaum auseinander.",
  "06": "Schwarz-weiß ist ihre Welt aber nicht.", "07": "Dafür sehen sie fast rundherum –", "08": "aber scharf nur in einem schmalen Band quer durchs Auge.",
  "09": "Darum hebt oder senkt dein Pferd den Kopf, wenn es etwas genau anschauen will.", "10": "Und hinter der Netzhaut liegt eine Spiegelschicht.",
  "11": "Sie hilft bei schwachem Licht – und lässt Pferdeaugen auf Blitzfotos leuchten.", "12": "Zögert dein Pferd vor einer Schattenkante, ist das nicht unbedingt Sturheit.",
  "13": "Vielleicht ist es einfach unsicher.", "14": "Du willst dein Pferd nicht nur reiten, sondern wirklich verstehen?", "15": "Dann entdecke die Reitakademie von Hofgeschichten.",
};
const CAP: VLine[] = Object.entries((LJ as VoLines).lines).map(([id, [a, b]]) => ({ id, text: TEXT[id], start: a, dur: b - a }));

/** Rot-Grün-Dichromat (Machado et al. 2009, Deuteranopie 1,0), linear RGB */
const DICH = "0.367322 0.860646 -0.227968 0 0 0.280085 0.672501 0.047413 0 0 -0.011820 0.042940 0.968881 0 0 0 0 0 1 0";
function Defs() {
  return (
    <defs>
      <filter id="ps-dich" colorInterpolationFilters="linearRGB"><feColorMatrix type="matrix" values={DICH} /></filter>
      <filter id="ps-gray"><feColorMatrix type="saturate" values="0" /></filter>
      <linearGradient id="ps-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#BFDDF0" /><stop offset="1" stopColor="#EAF3F4" /></linearGradient>
      <radialGradient id="ps-shine" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#E9FFB8" /><stop offset="0.45" stopColor="#7FE0C2" /><stop offset="1" stopColor="#2A8C7A" stopOpacity="0" /></radialGradient>
    </defs>
  );
}
function FactHead({ t, a, n, title, size = 96 }: { t: number; a: number; n: number; title: string; size?: number }) {
  const k = ease((t - a) / 0.3);
  return (
    <g>
      <g opacity={k}>
        {[0, 1, 2, 3].map((i) => <circle key={i} cx={486 + i * 36} cy={86} r={11} fill={i < n ? COL.honey : COL.sand} />)}
        <T x={540} y={150} size={30} font={FONT_BODY} weight={800} color={COL.rust}>{`FAKT ${n}`}</T>
      </g>
      <Big t={t} a={a} lines={[title]} y={265} size={size} />
    </g>
  );
}

/* ---------- Weide (bunt) ---------- */
const RED = "#D7362B", BLUE = "#2F6FB5", YELLOW = "#F2C230", GRASS = "#6FA24E";
const HK = 2.2;
const HPL: Place = { x: 540 - 230 * HK - 60, y: 1420 - 285 * HK, k: HK };
function Pasture({ t }: { t: number }) {
  return (
    <g>
      <rect x={0} y={540} width={W} height={520} fill="url(#ps-sky)" />
      <path d="M0 1000 Q200 930 420 980 T820 960 T1080 990 V1080 H0 Z" fill="#8DB86A" />
      <rect x={0} y={1040} width={W} height={470} fill={GRASS} />
      <g stroke="#4E7F35" strokeWidth="5" strokeLinecap="round">
        {Array.from({ length: 26 }, (_, i) => { const x = (i * 157) % 1080, y = 1080 + ((i * 89) % 400); return <path key={i} d={`M${x} ${y} l-8 -18 M${x} ${y} l2 -22 M${x} ${y} l10 -16`} />; })}
      </g>
      {/* Zaun */}
      <g fill="#F4EEE3" stroke="#9A8A72" strokeWidth="3">
        {[60, 300, 540, 780, 1020].map((x) => <rect key={x} x={x - 10} y={940} width={20} height={130} rx={4} />)}
        <rect x={0} y={970} width={W} height={14} /><rect x={0} y={1020} width={W} height={14} />
      </g>
      <NodHorse t={t} pl={HPL} look={LOOK_T} gait="stand" id="ps-h" nod={4 + 3 * Math.sin(t * 1.6)} />
      {/* Eimer blau */}
      <g transform="translate(800 1330)">
        <path d="M-70 -80 L70 -80 L52 60 L-52 60 Z" fill={BLUE} stroke="#1E4C80" strokeWidth="5" />
        <ellipse cx={0} cy={-80} rx={70} ry={16} fill="#5C93CF" stroke="#1E4C80" strokeWidth="5" />
        <path d="M-66 -78 Q0 -170 66 -78" fill="none" stroke="#1E4C80" strokeWidth="6" />
      </g>
      {/* Ball rot */}
      <g transform="translate(960 1440)">
        <circle r={62} fill={RED} />
        <path d="M-62 0 Q0 -40 62 0" stroke={PAPER} strokeWidth="8" fill="none" />
      </g>
      {/* Blumen gelb */}
      {[[90, 1460], [170, 1400], [640, 1480], [330, 1490], [720, 1420], [40, 1360]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx={0} cy={-14} rx={9} ry={14} fill={YELLOW} transform={`rotate(${a})`} />)}
          <circle r={8} fill="#E08A1E" />
        </g>
      ))}
    </g>
  );
}
function Hook({ t }: { t: number }) {
  const sx = lerp(1040, 540, sm((t - 0.15) / 1.0)) + 140 * Math.sin(Math.max(0, t - 1.6) * 1.4) * sm((t - 1.6) / 0.6);
  return (
    <g>
      <defs>
        <clipPath id="ps-L"><rect x={0} y={540} width={sx} height={970} /></clipPath>
        <clipPath id="ps-R"><rect x={sx} y={540} width={W - sx} height={970} /></clipPath>
      </defs>
      <g clipPath="url(#ps-L)"><Pasture t={t} /></g>
      <g clipPath="url(#ps-R)"><g filter="url(#ps-dich)"><Pasture t={t} /></g></g>
      <rect x={sx - 4} y={540} width={8} height={970} fill={PAPER} />
      <g transform={`translate(${sx} 1020)`}>
        <circle r={44} fill={PAPER} stroke={COL.forestDeep} strokeWidth="5" />
        <path d="M-12 -14 L-26 0 L-12 14 M12 -14 L26 0 L12 14" stroke={COL.forestDeep} strokeWidth="6" fill="none" strokeLinecap="round" />
      </g>
      <Tag x={150} y={600} text="Mensch" size={34} fill={COL.forestDeep} />
      <Tag x={900} y={600} text="Pferd*" size={34} fill={COL.forestDeep} />
      <Tag x={820} y={1500} text="*schematische Annäherung" size={26} fill={PAPER} color={COL.forestDeep} o={0.92} />
      <Big t={t} a={0} lines={["Dein Pferd sieht", "die Welt VÖLLIG anders!"]} y={220} size={84} />
    </g>
  );
}
function Cones({ x, y, cols, label }: { x: number; y: number; cols: string[]; label: string }) {
  return (
    <g>
      <rect x={x - 220} y={y - 90} width={440} height={200} rx={34} fill={PAPER} stroke={COL.sand} strokeWidth="4" />
      <T x={x} y={y - 30} size={40} color={COL.forestDeep}>{label}</T>
      {cols.map((c, i) => <circle key={i} cx={x + (i - (cols.length - 1) / 2) * 90} cy={y + 50} r={32} fill={c} stroke={COL.forestDeep} strokeWidth="3" />)}
    </g>
  );
}
function Colors({ t }: { t: number }) {
  const a = S("03");
  const k1 = sm((t - S("04") + 0.1) / 0.3), k2 = sm((t - S("05") + 0.1) / 0.3), k3 = sm((t - S("06") + 0.05) / 0.3);
  const pair = (y: number, c1: string, c2: string, k: number, ok: boolean, lab: string) => k > 0.01 && (
    <g opacity={k}>
      <T x={540} y={y - 80} size={34} font={FONT_BODY} weight={800} color={COL.inkSoft}>{lab}</T>
      {[c1, c2].map((c, i) => <circle key={i} cx={230 + i * 130} cy={y} r={56} fill={c} />)}
      <g filter="url(#ps-dich)">{[c1, c2].map((c, i) => <circle key={i} cx={720 + i * 130} cy={y} r={56} fill={c} />)}</g>
      <Mark2 t={t} a={(ok ? S("04") : S("05")) + 0.6} x={980} y={y} ok={ok} r={38} />
    </g>
  );
  return (
    <g>
      <Defs />
      <FactHead t={t} a={a - 0.12} n={1} title="Farben" />
      <Cones x={290} y={520} cols={["#3A63D6", "#3FAE4A", "#D9402F"]} label="Mensch: 3" />
      <Cones x={790} y={520} cols={["#3A63D6", "#C8C24A"]} label="Pferd: 2" />
      <T x={290} y={760} size={30} font={FONT_BODY} weight={800} color={COL.inkSoft}>Mensch</T>
      <T x={790} y={760} size={30} font={FONT_BODY} weight={800} color={COL.inkSoft}>Pferd* (schematisch)</T>
      {pair(930, BLUE, YELLOW, k1, true, "Blau ↔ Gelb")}
      {pair(1170, RED, GRASS, k2, false, "Rot ↔ Grün")}
      {k3 > 0.01 && (
        <g opacity={k3}>
          <g filter="url(#ps-gray)" transform="translate(360 1300) scale(0.32)" opacity=".9">
            <rect width={1080} height={520} fill="url(#ps-sky)" /><rect y={300} width={1080} height={220} fill={GRASS} />
            <circle cx={800} cy={380} r={110} fill={RED} /><circle cx={300} cy={400} r={90} fill={BLUE} />
          </g>
          <path d="M350 1300 L720 1470" stroke={COL.rust} strokeWidth="14" strokeLinecap="round" />
          <Tag x={540} y={1530} text="nicht schwarz-weiß!" size={34} fill={COL.rust} />
        </g>
      )}
    </g>
  );
}
/* Gesichtsfeld (Rückgriff auf `sicht`) */
function sector(o: Pt, a0: number, a1: number, r: number) {
  const pts: string[] = [`${o[0]},${o[1]}`];
  for (let i = 0; i <= 40; i++) {
    const a = ((-90 + lerp(a0, a1, i / 40)) * Math.PI) / 180;
    pts.push(`${(o[0] + r * Math.cos(a)).toFixed(1)},${(o[1] + r * Math.sin(a)).toFixed(1)}`);
  }
  return "M" + pts.join(" L") + " Z";
}
function Field({ t }: { t: number }) {
  const C: Pt = [540, 1080];
  const g = sm((t - S("07") + 0.1) / 0.9);
  const o: Pt = world(C, -90, 5, [52, 0]);
  return (
    <g>
      <rect x={0} y={540} width={W} height={970} fill="#B9C59B" />
      <path d={sector(o, -175 * g, 175 * g, 900)} fill={COL.honey} opacity=".35" />
      <path d={sector(o, -30, 30, 900)} fill={COL.forest} opacity={0.4 * g} />
      <TopHorse at={C} ang={-90} look={LOOKS.tivoli} step={0} s={5} noRider />
      <rect x={0} y={0} width={W} height={540} fill={COL.bg} />
      <FactHead t={t} a={S("07") - 0.12} n={2} title="Fast rundherum" />
      <Pop t={t} a={S("07") + 0.5} x={540} y={450} text="ca. 340–350° · je nach Messung" fill={COL.forest} size={36} />
    </g>
  );
}
/* Netzhaut mit Visual Streak */
function Retina({ t }: { t: number }) {
  const a = S("08");
  const band = sm((t - a - 0.6) / 0.6);
  const cx = 540, cy = 1000, rx = 420, ry = 330;
  const dots: ReactNode[] = [];
  let seed = 7;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  for (let i = 0; i < 900; i++) {
    const x = cx + (rnd() * 2 - 1) * rx, y = cy + (rnd() * 2 - 1) * ry;
    if (((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 > 0.92) continue;
    const d = Math.abs(y - (cy + 20));
    const keep = d < 34 ? 1 : d < 70 ? 0.35 : 0.1;
    if (rnd() > lerp(0.12, keep, band)) continue;
    dots.push(<circle key={i} cx={x} cy={y} r={d < 34 ? 6 : 5} fill={d < 34 && band > 0.5 ? COL.rust : COL.brownDeep} opacity=".75" />);
  }
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#F3D9C9" stroke="#C99A86" strokeWidth="8" />
      {dots}
      {band > 0.01 && <rect x={cx - rx + 30} y={cy + 20 - 40} width={2 * rx - 60} height={80} rx={40} fill="none" stroke={COL.rust} strokeWidth="6" strokeDasharray="14 10" opacity={band} />}
      <Tag x={540} y={1410} text="Visual Streak = Streifen für scharfe Details" size={32} fill={COL.rust} o={band} />
      <FactHead t={t} a={a - 0.12} n={2} title="Nicht überall scharf" size={84} />
      <Pop t={t} a={a + 0.2} x={540} y={450} text="Netzhaut, schematisch" fill={COL.forestDeep} size={34} />
    </g>
  );
}
function Look({ t }: { t: number }) {
  const a = S("09");
  const up = sm((t - a - 0.2) / 0.6) * (1 - sm((t - a - 1.9) / 0.6));
  const down = sm((t - a - 2.0) / 0.7);
  const nod = -16 * up + 26 * down;
  const k = 2.4;
  const pl: Place = { x: 380 - 160 * k, y: 1420 - 285 * k, k };
  return (
    <g>
      <rect x={0} y={540} width={W} height={880} fill="url(#ps-sky)" />
      <Ground y={1420} h={160} id="ps-l" />
      {/* Ferne: Baum */}
      <g transform="translate(930 900)" opacity={0.85}>
        <rect x={-10} y={0} width={20} height={70} fill="#7A5A3E" />
        <circle cx={0} cy={-20} r={56} fill="#6F9A55" />
      </g>
      <NodHorse t={t} pl={pl} look={LOOK_T} gait="stand" id="ps-lk" nod={nod} />
      <g transform="translate(860 1440)"><circle r={40} fill={COL.rust} /></g>
      <FactHead t={t} a={a - 0.12} n={2} title="Kopf hoch, Kopf tief" size={84} />
      {up > 0.3 && <Pop t={t} a={a + 0.5} x={850} y={760} text="Ferne: Kopf hoch" fill={COL.forest} size={34} />}
      {down > 0.3 && <Pop t={t} a={a + 2.3} x={800} y={1330} text="Nahes: Kopf tief" fill={COL.forest} size={34} />}
      {["Entfernung", "Kontrast", "Licht", "Blickrichtung"].map((c, i) => <Pop key={c} t={t} a={a + 0.3 + i * 0.25} x={[175, 425, 640, 880][i]} y={450} text={c} fill={COL.honey} color={COL.forestDeep} size={30} />)}
    </g>
  );
}
/* Augen-Querschnitt mit Tapetum lucidum */
function Eye({ t }: { t: number }) {
  const a = S("10");
  const flashAt = S("11") + 2.0;
  const flash = t >= flashAt;
  if (flash) return <Flash t={t} a={flashAt} />;
  const cx = 560, cy = 1010, r = 300;
  const tap = sm((t - a - 0.7) / 0.5);
  const ray = sm((t - S("11") + 0.05) / 1.0);
  const back_ = sm((t - S("11") - 0.9) / 0.8);
  const hit: Pt = [cx + 240, cy - 150];
  const start: Pt = [80, cy - 40];
  const pin: Pt = [cx - 260, cy - 20];
  const p1 = [lerp(start[0], pin[0], Math.min(1, ray * 2)), lerp(start[1], pin[1], Math.min(1, ray * 2))];
  const p2 = ray > 0.5 ? [lerp(pin[0], hit[0], (ray - 0.5) * 2), lerp(pin[1], hit[1], (ray - 0.5) * 2)] : null;
  return (
    <g>
      <FactHead t={t} a={a - 0.12} n={3} title="Die Spiegelschicht" size={90} />
      {/* Augapfel */}
      <circle cx={cx} cy={cy} r={r} fill="#FBF6EE" stroke="#BFA992" strokeWidth="8" />
      {/* Netzhaut (Innenseite hinten) */}
      <path d={`M${cx + r * Math.cos(-1.25)} ${cy + r * Math.sin(-1.25)} A${r - 16} ${r - 16} 0 0 1 ${cx + r * Math.cos(1.25)} ${cy + r * Math.sin(1.25)}`} fill="none" stroke="#E0896F" strokeWidth="18" />
      {/* Tapetum oben hinten, hinter der Netzhaut */}
      <path d={`M${cx + r * Math.cos(-1.2)} ${cy + r * Math.sin(-1.2)} A${r - 2} ${r - 2} 0 0 1 ${cx + r * Math.cos(-0.05)} ${cy + r * Math.sin(-0.05)}`} fill="none" stroke="#3FB59B" strokeWidth={16 * tap} strokeLinecap="round" />
      {/* Hornhaut + Linse */}
      <path d={`M${cx - r * 0.82} ${cy - 170} Q${cx - r - 70} ${cy} ${cx - r * 0.82} ${cy + 170}`} fill="#DCEFF5" stroke="#8FB7D4" strokeWidth="6" />
      <ellipse cx={cx - 190} cy={cy} rx={46} ry={110} fill="#E8F1F2" stroke="#8FB7D4" strokeWidth="6" />
      {/* Licht */}
      {ray > 0.01 && <path d={`M${start[0]} ${start[1]} L${p1[0]} ${p1[1]}${p2 ? ` L${p2[0]} ${p2[1]}` : ""}`} stroke="#F2C230" strokeWidth="12" strokeLinecap="round" fill="none" />}
      {back_ > 0.01 && <path d={`M${hit[0]} ${hit[1]} L${lerp(hit[0], cx - 60, back_)} ${lerp(hit[1], cy - 60, back_)}`} stroke="#F2C230" strokeWidth="8" strokeDasharray="16 12" strokeLinecap="round" opacity=".85" />}
      {/* Beschriftungen */}
      <Tag x={190} y={760} text="Hornhaut" size={28} fill={PAPER} color={COL.forestDeep} o={ease((t - a) / 0.3)} />
      <Tag x={360} y={1360} text="Linse" size={28} fill={PAPER} color={COL.forestDeep} o={ease((t - a - 0.2) / 0.3)} />
      <Tag x={800} y={1360} text="Netzhaut" size={28} fill={PAPER} color={COL.forestDeep} o={ease((t - a - 0.4) / 0.3)} />
      <Tag x={760} y={640} text="Tapetum lucidum = Spiegelschicht" size={30} fill="#2A8C7A" o={tap} />
      {back_ > 0.3 && <Pop t={t} a={S("11") + 1.1} x={540} y={450} text="Licht läuft 2× durch die Netzhaut" fill={COL.forest} size={34} />}
      <Tag x={540} y={1490} text="schematisch · nicht maßstabsgetreu" size={24} fill={PAPER} color={COL.inkSoft} o={0.9} />
    </g>
  );
}
function Flash({ t, a }: { t: number; a: number }) {
  const k = 3.0;
  const pl: Place = { x: 620 - (330 - 70) * k, y: 920 - (72 - 20) * k, k };
  const eye = hs(pl, [333, 77]);
  const fl = Math.max(0, 1 - (t - a) / 0.25);
  return (
    <g>
      <defs><clipPath id="ps-flc"><rect x={0} y={540} width={W} height={970} /></clipPath></defs>
      <g clipPath="url(#ps-flc)">
        <rect x={0} y={540} width={W} height={970} fill="#1C1A22" />
        <NodHorse t={t} pl={pl} look={LOOK_T} gait="stand" id="ps-fl" nod={0} />
        <rect x={0} y={540} width={W} height={970} fill="#0B0A10" opacity=".55" />
        <circle cx={eye[0]} cy={eye[1]} r={46} fill="url(#ps-shine)" opacity={sm((t - a - 0.1) / 0.2)} />
      </g>
      <rect x={60} y={580} width={960} height={890} rx={24} fill="none" stroke={PAPER} strokeWidth="6" opacity=".7" />
      <T x={130} y={650} size={34} font={FONT_BODY} weight={800} color={PAPER} anchor="start">⚡ Blitzfoto</T>
      <rect x={0} y={0} width={W} height={540} fill={COL.bg} />
      <FactHead t={t} a={S("10") - 0.12} n={3} title="Die Spiegelschicht" size={90} />
      <Pop t={t} a={a + 0.3} x={540} y={450} text="darum leuchten Pferdeaugen" fill={COL.forest} size={36} />
      <Tag x={540} y={1530} text="Gut bei wenig Licht – nicht in völliger Dunkelheit" size={28} fill={COL.honey} color={COL.forestDeep} o={ease((t - a - 0.6) / 0.3)} />
      {fl > 0 && <rect x={0} y={0} width={W} height={1920} fill="#FFFFFF" opacity={fl} />}
    </g>
  );
}
function Shadow({ t }: { t: number }) {
  const a = S("12");
  const k = 2.4;
  const pl: Place = { x: 260 - 230 * k, y: 1420 - 285 * k, k };
  const nod = 18 * sm((t - a - 0.4) / 0.8);
  const u = t >= S("13") - 0.1;
  return (
    <g>
      <rect x={0} y={540} width={W} height={880} fill={COL.bg} />
      <Ground y={1420} h={160} id="ps-s" />
      {/* Schattenkante quer über den Weg */}
      <path d="M640 1420 L1080 1420 L1080 1580 L720 1580 Z" fill="#2E2A25" opacity=".72" />
      <path d="M640 1420 L720 1580" stroke={COL.honey} strokeWidth="7" strokeDasharray="14 10" opacity={sm((t - a - 0.8) / 0.3)} />
      <NodHorse t={t} pl={pl} look={LOOK_T} gait="stand" id="ps-sh" nod={nod} />
      <Pop t={t} a={a + 0.9} x={850} y={1320} text="Schattenkante" fill={COL.forestDeep} size={34} />
      <Pop t={t} a={a + 1.4} x={850} y={1220} text="starker Kontrast" fill={COL.forestDeep} size={34} />
      <FactHead t={t} a={a - 0.12} n={4} title="Im Alltag" />
      {u && <Big t={t} a={S("13") - 0.1} lines={["Nicht stur.", "Vielleicht einfach unsicher."]} y={640} size={66} col={COL.forest} />}
      {u && <Tag x={540} y={820} text="mögliche Erklärung – keine Diagnose" size={28} fill={PAPER} color={COL.inkSoft} o={ease((t - S("13")) / 0.3)} />}
      {["auch:", "Geräusche", "Gerüche", "Bewegung", "Erfahrung"].map((c, i) => (
        <Pop key={c} t={t} a={a + 2.0 + i * 0.18} x={[110, 300, 520, 730, 945][i]} y={450} text={c} fill={i ? COL.honey : COL.bg} color={COL.forestDeep} size={28} />
      ))}
    </g>
  );
}

export function renderPferdesicht(t: number) {
  const cuts = [S("03") - 0.12, S("07") - 0.12, S("08") - 0.12, S("09") - 0.12, S("10") - 0.12, S("11") + 2.0, S("12") - 0.12, S("14") - 0.12];
  let body: ReactNode;
  if (t < cuts[0]) body = <Hook t={t} />;
  else if (t < cuts[1]) body = <Colors t={t} />;
  else if (t < cuts[2]) body = <Field t={t} />;
  else if (t < cuts[3]) body = <Retina t={t} />;
  else if (t < cuts[4]) body = <Look t={t} />;
  else if (t < cuts[6]) body = <Eye t={t} />;
  else if (t < cuts[7]) body = <Shadow t={t} />;
  else body = <AkCTA t={t} a={S("14")} b={S("15")} fin={E("15") + 0.3} module={1} title={["Pferde wirklich", "verstehen?"]} id="ps-ph" />;
  return <Frame t={t} cuts={cuts} after={<Caption t={t} lines={CAP} y={1580} />}><Defs />{body}</Frame>;
}
export function renderPferdesichtCover() {
  return <Frame t={2.2} cuts={[]}><Defs /><Hook t={2.2} /></Frame>;
}
