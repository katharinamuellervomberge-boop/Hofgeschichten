import type { ReactNode } from "react";
import { COL, FONT_BODY, NodHorse, PAPER, Phone, Pop, T, W, back, ease, lerp, sm } from "./nov-kit";
import { LOOK_T, Mark } from "./n2-kit";
import { Cloud, Stopwatch, Thought } from "./r40-reiter-reel";
import { Big, BrandLine, Face, Frame, vo, type VoLines } from "./viral-kit";
import LJ from "./eindecken-lines.json";

/* Reel „Pferd eindecken – in 40 Sekunden erklärt“ (comp `eindecken`, 13.11.2026) – Comedy-/Share-Reel.
   Stil wie `reiter40`/`reitersprache`: harte Schnitte (Blitz + Zoom-Punch), große Snap-Typo, Fortschrittsbalken.
   Gedankenspirale: einfach → Faktoren stapeln sich → Chaos → Ruhe → Push „13 °C“ → Pointe.
   Stimme Jessica v4, geschnitten mit scripts/video/n2/vo_place.py (plans/eindecken.json, Tempo je Satz). */

const { S, E, total } = vo(LJ as VoLines);
export const EDK_TOTAL = total;

const pop = (t: number, a: number, d = 0.28) => back((t - a) / d);
const NOTE = E("21") + 0.35; // Push-Nachricht „13 °C“ (nur im Bild, Stimme schweigt)
const CTA = E("24") + 0.15;

/* ---------- Pferdedecke (Koordinaten von AnimHorse, Seitenansicht Kopf rechts) ---------- */
const RUG = "M104,128 C118,106 160,104 195,116 C215,122 236,116 254,106 C270,100 288,104 298,120 C302,142 298,166 292,186 C250,194 168,196 118,190 C104,178 98,152 104,128 Z";
const RUGS = {
  regen: { col: "#5E7360", edge: "#3F5243", label: "Regendecke" },
  ohne: { col: "#8FA3B8", edge: "#6A7A88", label: "ungefüttert" },
  g100: { col: COL.honey, edge: "#A87C38", label: "100 g" },
  g150: { col: "#C98AA0", edge: "#A06A80", label: "150 g" },
  g200: { col: COL.rust, edge: "#7E3F28", label: "200 g" },
};
type RugId = keyof typeof RUGS;
function Rug({ id, k = 1, wet = 0 }: { id: RugId; k?: number; wet?: number }) {
  if (k <= 0.01) return null;
  const r = RUGS[id];
  return (
    <g opacity={Math.min(1, k)}>
      <path d={RUG} fill={r.col} stroke={r.edge} strokeWidth="4" strokeLinejoin="round" />
      <path d="M118,186 C168,192 250,190 290,182" fill="none" stroke={r.edge} strokeWidth="6" strokeLinecap="round" />
      {/* Kreuzgurte + Brustverschluss */}
      <path d="M190,192 l14 10 M214,192 l-14 10" stroke={COL.forestDeep} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M292,128 l8 6 M291,140 l8 6" stroke={COL.forestDeep} strokeWidth="3.5" strokeLinecap="round" />
      {/* Schweifklappe */}
      <path d="M104,128 C100,140 100,154 104,164 L112,160 C109,150 109,140 112,130 Z" fill={r.edge} />
      {wet > 0.01 && Array.from({ length: 5 }, (_, i) => (
        <path key={i} d={`M${130 + i * 36} ${196 + ((wet * 40 + i * 9) % 18)} q-4 8 0 11 q4 -3 0 -11`} fill="#8FB7D4" opacity={0.9} />
      ))}
    </g>
  );
}
const HK = 2.5;
const HPL = (y = 1600, k = HK) => ({ x: 540 - 165 * k, y: y - 278 * k, k });
function Horse({ t, rug, rugK = 1, y = 1600, k = HK, id, clip = 0, sweat = 0, nod = 0, wet = 0 }: { t: number; rug?: RugId; rugK?: number; y?: number; k?: number; id: string; clip?: number; sweat?: number; nod?: number; wet?: number }) {
  return (
    <g>
      <rect x={0} y={y - 10} width={W} height={1930 - y} fill="#E3D3B4" />
      <NodHorse t={t} pl={HPL(y, k)} look={LOOK_T} id={id} nod={nod} blink={t % 3.1 < 0.12 ? 1 : 0}>
        {clip > 0.01 && (
          <g opacity={clip}>
            {/* „halb geschoren“: untere Hälfte heller, Schurlinie gestrichelt */}
            <path d="M120,160 C170,150 240,148 296,132 C298,160 294,178 290,188 C240,196 170,198 118,190 C112,180 114,170 120,160 Z" fill="#F3E3CF" opacity=".55" />
            <path d="M120,160 C170,150 240,148 296,132" fill="none" stroke={COL.forestDeep} strokeWidth="3" strokeDasharray="7 6" />
          </g>
        )}
        {rug && <Rug id={rug} k={rugK} wet={wet} />}
        {sweat > 0.01 && Array.from({ length: 4 }, (_, i) => {
          const ph = ((t * 1.6 + i * 0.27) % 1);
          return <path key={i} d={`M${150 + i * 40} ${100 + ph * 30} q-6 10 0 14 q6 -4 0 -14`} fill="#8FB7D4" opacity={sweat * (1 - ph)} />;
        })}
      </NodHorse>
    </g>
  );
}

/* ---------- Wetter-Symbole ---------- */
function Sun({ x, y, r = 60, t = 0 }: { x: number; y: number; r?: number; t?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${t * 20})`}>
      {Array.from({ length: 10 }, (_, i) => <path key={i} d={`M0 ${-r - 14} L0 ${-r - 38}`} stroke={COL.honey} strokeWidth="10" strokeLinecap="round" transform={`rotate(${i * 36})`} />)}
      <circle r={r} fill={COL.honey} />
    </g>
  );
}
function Wind({ x, y, s = 1, t = 0 }: { x: number; y: number; s?: number; t?: number }) {
  const d = 10 * Math.sin(t * 6);
  return (
    <g transform={`translate(${x + d} ${y}) scale(${s})`} fill="none" stroke={COL.forest} strokeWidth="11" strokeLinecap="round">
      <path d="M-90 -30 L40 -30 C80 -30 80 -80 46 -80 C26 -80 20 -64 24 -54" />
      <path d="M-110 10 L70 10" />
      <path d="M-80 50 L30 50 C66 50 66 96 36 96 C20 96 14 84 16 76" />
    </g>
  );
}
function Moon({ x, y, r = 46 }: { x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill="#8FA3B8" />
      <circle cx={r * 0.45} cy={-r * 0.3} r={r * 0.85} fill={COL.forestDeep} />
    </g>
  );
}
function Rain({ t, x0, x1, y0, y1, a = 0 }: { t: number; x0: number; x1: number; y0: number; y1: number; a?: number }) {
  const n = 26;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const x = x0 + ((i * 97) % (x1 - x0));
        const y = y0 + (((t - a) * 1400 + i * 173) % (y1 - y0));
        return <path key={i} d={`M${x} ${y} l-12 34`} stroke="#6F8DA6" strokeWidth="7" strokeLinecap="round" />;
      })}
    </g>
  );
}

/* ---------- Hook ---------- */
function Hook({ t }: { t: number }) {
  return (
    <g>
      <Stopwatch t={t} x={540} y={1160} r={290} />
      <Big t={t} a={0} lines={["Pferd eindecken"]} y={330} size={108} />
      <Big t={t} a={0.35} lines={["in 40 Sekunden"]} y={450} size={104} col={COL.rust} />
      <Big t={t} a={0.6} lines={["erklärt."]} y={570} size={104} />
      <Pop t={t} a={1.2} x={540} y={720} text="Herbst. Morgens. Stall." fill={COL.forestDeep} size={40} />
    </g>
  );
}

/* ---------- A: „Es sind 6 Grad. Also eigentlich ganz einfach.“ ---------- */
function SceneA({ t }: { t: number }) {
  const easy = t >= S("03") + 0.2;
  return (
    <g>
      <Horse t={t} id="edkA" y={1700} k={2.3} />
      <g transform={`translate(540 520) scale(${1 + 0.15 * Math.max(0, 1 - (t - S("02")) / 0.3)}) translate(-540 -520)`}>
        <rect x={250} y={380} width={580} height={280} rx="140" fill={PAPER} stroke={COL.forest} strokeWidth="8" />
        <Cloud x={380} y={500} s={0.9} col={COL.sandLight} />
        <Sun x={420} y={470} r={44} t={t} />
        <T x={670} y={590} size={170} color={COL.forestDeep}>6°C</T>
      </g>
      {easy && <Big t={t} a={S("03") + 0.2} lines={["„Also eigentlich…", "ganz einfach.“"]} y={830} size={84} col={COL.forest} />}
      {easy && <Face t={t} x={180} y={1130} r={92} kind="reiter" mood="smile" a={S("03") + 0.4} />}
    </g>
  );
}

/* ---------- B: Faktoren (Temperaturkurve, Sonne, Wind) ---------- */
const GX = (h: number) => 170 + ((h - 6) / 18) * 740; // 6–24 Uhr
const GY = (c: number) => 1010 - c * 30; // 0–14 °C
const TEMP: Array<[number, number]> = [[6, 3], [7, 3], [9, 5], [11, 9], [13, 11], [15, 10], [17, 7], [19, 4], [21, 2], [23, 1]];
function curve(upTo: number) {
  const pts = TEMP.filter(([h]) => h <= upTo);
  return pts.map(([h, c], i) => `${i ? "L" : "M"}${GX(h)} ${GY(c)}`).join(" ");
}
function Graph({ t, until, night = false }: { t: number; until: number; night?: boolean }) {
  return (
    <g>
      <rect x={110} y={560} width={860} height={560} rx="36" fill={PAPER} stroke={COL.sandLight} strokeWidth="5" />
      <T x={150} y={630} size={36} anchor="start" font={FONT_BODY} weight={800} color={COL.inkSoft}>Heute · am Hof</T>
      <path d={`M${GX(6)} ${GY(0)} L${GX(24)} ${GY(0)}`} stroke={COL.sand} strokeWidth="4" />
      {[6, 12, 18, 24].map((h) => <T key={h} x={GX(h)} y={GY(0) + 52} size={28} font={FONT_BODY} weight={700} color={COL.inkSoft}>{`${h}:00`}</T>)}
      <path d={curve(until)} fill="none" stroke={COL.rust} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      {until >= 7 && <g><circle cx={GX(7)} cy={GY(3)} r={16} fill={COL.forestDeep} /><T x={GX(7)} y={GY(3) - 34} size={50} color={COL.forestDeep}>3°</T></g>}
      {until >= 13 && <g><circle cx={GX(13)} cy={GY(11)} r={16} fill={COL.rust} /><T x={GX(13)} y={GY(11) - 34} size={58} color={COL.rust}>11°</T></g>}
      {night && <g><circle cx={GX(23)} cy={GY(1)} r={16} fill={COL.forestDeep} /><T x={GX(23) - 10} y={GY(1) - 34} size={50} color={COL.forestDeep}>1°</T></g>}
    </g>
  );
}
function SceneB({ t }: { t: number }) {
  const until = t < S("05") ? lerp(6, 7, sm((t - S("04")) / 0.3)) : lerp(7, 13, sm((t - S("05")) / 0.4));
  const quote: Array<[string, string[], string]> = [
    ["04", ["„Okay. Morgens 3 Grad.“"], COL.forestDeep],
    ["05", ["„Aber mittags 11.“"], COL.rust],
    ["06", ["„Und Sonne.“"], COL.forestDeep],
    ["07", ["„Aber WIND.“"], COL.rust],
    ["08", ["„Aber nur 17 km/h.“"], COL.forestDeep],
  ];
  const sunK = pop(t, S("06"));
  const windK = pop(t, S("07"));
  return (
    <g>
      {quote.map(([id, l, c], i) => <Big key={id} t={t} a={S(id)} b={(quote[i + 1] ? S(quote[i + 1][0]) : 99) - 0.01} lines={l} y={330} size={84} col={c} shake={id === "07" ? 10 : 0} />)}
      <Graph t={t} until={until} />
      {sunK > 0.01 && <g opacity={Math.min(1, sunK)} transform={`translate(300 1340) scale(${Math.max(0.01, sunK)}) translate(-300 -1340)`}><Sun x={300} y={1340} r={70} t={t} /><T x={300} y={1520} size={44} color={COL.forestDeep}>SONNE</T></g>}
      {windK > 0.01 && <g opacity={Math.min(1, windK)} transform={`translate(760 1340) scale(${Math.max(0.01, windK)}) translate(-760 -1340)`}><Wind x={760} y={1320} t={t} /><T x={760} y={1520} size={44} color={COL.rust}>WIND</T></g>}
      <Pop t={t} a={S("08") + 0.1} x={760} y={1610} text="17 km/h · „nur“" fill={COL.forestDeep} size={40} />
      <Face t={t} x={540} y={1760} r={84} kind="reiter" mood={t < S("07") ? "neutral" : "confused"} look={t < S("06") ? 0 : 0.6} />
    </g>
  );
}

/* ---------- C: Deckenstapel ---------- */
const STACK: RugId[] = ["regen", "ohne", "g100", "g150", "g200"];
function Stack({ t, pick }: { t: number; pick: Array<[RugId, number]> }) {
  return (
    <g>
      {STACK.map((id, i) => {
        const r = RUGS[id];
        const y = 760 + i * 150;
        const sel = pick.filter(([p, a]) => p === id && t >= a).pop();
        const k = sel ? Math.max(0, 1 - (t - sel[1]) / 0.25) : 0;
        const on = !!sel;
        return (
          <g key={id} transform={`translate(${on ? 60 : 0} 0) translate(540 ${y + 60}) scale(${1 + 0.1 * k}) translate(-540 ${-(y + 60)})`}>
            <rect x={170} y={y} width={740} height={128} rx="34" fill={r.col} stroke={on ? COL.forestDeep : r.edge} strokeWidth={on ? 9 : 5} />
            <rect x={170} y={y + 96} width={740} height={14} fill={r.edge} opacity=".55" />
            <T x={540} y={y + 80} size={52} color={id === "g100" ? COL.forestDeep : PAPER}>{r.label}</T>
          </g>
        );
      })}
    </g>
  );
}
function SceneC({ t }: { t: number }) {
  const q: Array<[string, string[], string]> = [
    ["09", ["100 G?"], COL.forestDeep],
    ["10", ["…oder ungefüttert?"], COL.forestDeep],
    ["11", ["„Aber heute Nacht", "1 Grad.“"], COL.rust],
    ["12", ["„Dann muss ich abends", "ja wieder umdecken.“"], COL.forestDeep],
  ];
  return (
    <g>
      {q.map(([id, l, c], i) => <Big key={id} t={t} a={S(id)} b={(q[i + 1] ? S(q[i + 1][0]) : 99) - 0.01} lines={l} y={id === "09" ? 360 : 300} size={id === "09" ? 170 : 80} col={c} />)}
      <Stack t={t} pick={[["g100", S("09") + 0.1], ["ohne", S("10")]]} />
      {t >= S("11") && (
        <g transform={`translate(860 620) scale(${Math.max(0.01, Math.min(1, pop(t, S("11"))))})`}>
          <rect x={-120} y={-80} width={240} height={160} rx="40" fill={COL.forestDeep} />
          <Moon x={-48} y={0} r={40} />
          <T x={50} y={22} size={64} color={PAPER}>1°</T>
        </g>
      )}
      {t >= S("12") && <Pop t={t} a={S("12") + 0.2} x={300} y={640} text="18:00 → umdecken" fill={COL.rust} size={40} />}
      <Face t={t} x={170} y={1690} r={78} kind="reiter" mood={t < S("11") ? "confused" : "worried"} look={0.8} />
    </g>
  );
}

/* ---------- D: 200 g → schwitzt, halb geschoren, Regen ---------- */
function SceneD({ t }: { t: number }) {
  const rain = t >= S("15");
  const clip = t >= S("14") ? sm((t - S("14") - 0.15) / 0.3) : 0;
  return (
    <g>
      <Horse t={t} id="edkD" rug={rain ? "regen" : "g200"} sweat={rain ? 0 : 1} clip={clip} y={1640} nod={rain ? 6 : 0} wet={rain ? (t - S("15")) * 3 : 0} />
      {!rain && <Sun x={880} y={720} r={70} t={t} />}
      {rain && (
        <g>
          <Cloud x={340} y={660} s={1.5} col="#B9C2BB" />
          <Cloud x={760} y={700} s={1.3} col="#A9B3AC" />
          <Rain t={t} x0={140} x1={980} y0={760} y1={1600} a={S("15")} />
        </g>
      )}
      <Big t={t} a={S("13")} b={S("14") - 0.01} lines={["200 G?!"]} y={360} size={190} col={COL.rust} shake={16} />
      <Pop t={t} a={S("13") + 0.45} x={540} y={520} text="…schwitzt er mittags!" fill={COL.rust} size={46} o={t < S("14") ? 1 : 0} />
      <Big t={t} a={S("14")} b={S("15") - 0.01} lines={["„Er ist ja nur", "HALB geschoren.“"]} y={300} size={86} />
      <Big t={t} a={S("15")} lines={["REGEN!"]} y={380} size={210} col={COL.forestDeep} shake={18} />
      {t >= S("14") && t < S("15") && <Pop t={t} a={S("14") + 0.3} x={760} y={1080} text="Schurlinie" fill={COL.forestDeep} size={34} />}
    </g>
  );
}

/* ---------- E: Tagesplan + Formel ---------- */
const PLAN: Array<[string, string, RugId | null]> = [["07:00", "100 g", "g100"], ["12:00", "ausziehen", null], ["18:00", "200 g", "g200"], ["+", "Regendecke drüber", "regen"]];
function ScenePlan({ t }: { t: number }) {
  const a0 = S("16");
  const step = (E("16") - a0) / 4.2;
  return (
    <g>
      <Big t={t} a={a0} lines={["DER PLAN:"]} y={300} size={110} col={COL.rust} />
      {PLAN.map(([h, txt, rug], i) => {
        const k = pop(t, a0 + 0.15 + i * step, 0.2);
        if (k <= 0.01) return null;
        const y = 470 + i * 230;
        return (
          <g key={i} opacity={Math.min(1, k)} transform={`translate(540 ${y + 90}) scale(${Math.max(0.01, Math.min(1.06, k))}) translate(-540 ${-(y + 90)})`}>
            <rect x={90} y={y} width={900} height={190} rx="40" fill={PAPER} stroke={COL.sandLight} strokeWidth="5" />
            <rect x={120} y={y + 45} width={210} height={100} rx="50" fill={COL.forestDeep} />
            <T x={225} y={y + 115} size={50} font={FONT_BODY} weight={900} color={PAPER}>{h}</T>
            {rug ? <rect x={370} y={y + 50} width={110} height={90} rx="24" fill={RUGS[rug].col} stroke={RUGS[rug].edge} strokeWidth="5" /> : <path d={`M385 ${y + 60} l80 70 M465 ${y + 60} l-80 70`} stroke={COL.rust} strokeWidth="14" strokeLinecap="round" />}
            <T x={520} y={y + 120} size={64} anchor="start" color={i === 3 ? COL.rust : COL.forestDeep}>{txt}</T>
          </g>
        );
      })}
      <Face t={t} x={900} y={1700} r={84} kind="reiter" mood="worried" look={-0.6} />
    </g>
  );
}
function SceneFormula({ t }: { t: number }) {
  const a0 = S("17");
  const parts: Array<[string, string]> = [["6°C", COL.forestDeep], ["+ REGEN", COL.forest], ["+ WIND", COL.forest], ["− Fell", COL.inkSoft], ["+ 11°C mittags", COL.rust]];
  return (
    <g>
      <rect x={70} y={420} width={940} height={980} rx="40" fill={COL.forestDeep} />
      {Array.from({ length: 14 }, (_, i) => <path key={i} d={`M100 ${470 + i * 68} L980 ${470 + i * 68}`} stroke="#ffffff10" strokeWidth="3" />)}
      {parts.map(([p, c], i) => {
        const k = pop(t, a0 - 0.05 + i * 0.12, 0.18);
        return k > 0.01 ? <g key={i} opacity={Math.min(1, k)}><T x={540} y={560 + i * 140} size={92} color={c === COL.forestDeep ? PAPER : c === COL.forest ? "#B9D0BE" : c === COL.inkSoft ? "#C9C2B4" : COL.honey}>{p}</T></g> : null;
      })}
      <path d="M180 1260 L900 1260" stroke={PAPER} strokeWidth="8" strokeLinecap="round" opacity={t > a0 + 0.6 ? 1 : 0} />
      {t > a0 + 0.65 && <T x={540} y={1360} size={100} color={COL.rust}>= ??? GRAMM</T>}
      <Big t={t} a={a0 + 0.4} lines={["…oder einfach", "die 150er?!"]} y={230} size={84} col={COL.rust} shake={8} />
      <g transform="translate(540 1650)">
        <rect x={-150} y={-110} width={300} height={220} rx="34" fill={RUGS.g150.col} stroke={RUGS.g150.edge} strokeWidth="6" />
        <T x={0} y={24} size={70} color={PAPER}>150 g</T>
      </g>
    </g>
  );
}

/* ---------- F: drei Wetter-Apps ---------- */
function MiniApp({ t, a, x, label, big, sub, col, icon }: { t: number; a: number; x: number; label: string; big: string; sub: string; col: string; icon: ReactNode }) {
  const k = pop(t, a, 0.22);
  if (k <= 0.01) return null;
  return (
    <g opacity={Math.min(1, k)} transform={`translate(${x} 1050) scale(${Math.max(0.01, k)}) translate(${-x} -1050)`}>
      <rect x={x - 150} y={720} width={300} height={640} rx="44" fill={COL.forestDeep} />
      <rect x={x - 134} y={740} width={268} height={600} rx="30" fill="#E4EAE2" />
      <T x={x} y={810} size={32} font={FONT_BODY} weight={800} color={COL.inkSoft}>{label}</T>
      <g transform={`translate(${x} 930)`}>{icon}</g>
      <T x={x} y={1150} size={big.length > 4 ? 38 : 104} color={col}>{big}</T>
      <T x={x} y={1240} size={30} font={FONT_BODY} weight={700} color={COL.inkSoft}>{sub}</T>
    </g>
  );
}
function SceneApps({ t }: { t: number }) {
  const a = S("18");
  const gap = (E("18") - a) / 3;
  return (
    <g>
      <MiniApp t={t} a={a} x={200} label="App 1" big="6°" sub="bewölkt" col={COL.forestDeep} icon={<Cloud x={0} y={0} s={0.7} col="#B9C2BB" />} />
      <MiniApp t={t} a={a + gap} x={540} label="App 2" big="9°" sub="sonnig" col={COL.forestDeep} icon={<Sun x={0} y={0} r={42} t={t} />} />
      <MiniApp t={t} a={a + gap * 2} x={880} label="App 3" big="GEWITTER" sub="?!" col={COL.rust} icon={<g><Cloud x={0} y={-10} s={0.7} col="#7F8A84" /><path d="M10 20 l-30 50 h26 l-18 46 l46 -66 h-26 l20 -30 Z" fill={COL.honey} /></g>} />
      <Big t={t} a={a} b={a + gap - 0.01} lines={["App 1: 6°"]} y={400} size={110} />
      <Big t={t} a={a + gap} b={a + 2 * gap - 0.01} lines={["App 2: 9°"]} y={400} size={110} />
      <Big t={t} a={a + 2 * gap} lines={["App 3:", "GEWITTER?!"]} y={330} size={120} col={COL.rust} shake={16} />
      <Face t={t} x={540} y={1610} r={96} kind="reiter" mood={t > a + 2 * gap ? "dizzy" : "worried"} />
    </g>
  );
}

/* ---------- G: Google + Forum ---------- */
function SceneSearch({ t }: { t: number }) {
  const q = "Welche Pferdedecke bei 7 Grad?";
  const a = S("19");
  const n = Math.min(q.length, Math.max(0, Math.floor((t - a) / ((E("19") - a) / q.length))));
  const forum = t >= S("20");
  return (
    <g>
      <rect x={70} y={430} width={940} height={150} rx="75" fill={PAPER} stroke={COL.forest} strokeWidth="6" />
      <circle cx={160} cy={500} r={30} fill="none" stroke={COL.forest} strokeWidth="9" />
      <path d="M182 522 l28 28" stroke={COL.forest} strokeWidth="11" strokeLinecap="round" />
      <T x={230} y={522} size={Math.min(52, 740 / (q.length * 0.5))} anchor="start" font={FONT_BODY} weight={800} color={COL.forestDeep}>{q.slice(0, n) + (t % 0.5 < 0.25 && !forum ? "|" : "")}</T>
      {!forum && <Big t={t} a={a} lines={["*googelt*"]} y={300} size={70} col={COL.inkSoft} italic />}
      {forum && (
        <g>
          <T x={540} y={680} size={36} font={FONT_BODY} weight={700} color={COL.inkSoft}>Ungefähr 2.340.000 Ergebnisse</T>
          {[0, 1, 2].map((i) => {
            const k = pop(t, S("20") + 0.05 + i * 0.12, 0.2);
            const y = 740 + i * 220;
            return k > 0.01 ? (
              <g key={i} opacity={Math.min(1, k) * (i === 2 ? 1 : 0.45)}>
                <rect x={90} y={y} width={900} height={190} rx="30" fill={PAPER} stroke={COL.sandLight} strokeWidth="5" />
                <T x={130} y={y + 64} size={34} anchor="start" font={FONT_BODY} weight={800} color={COL.forest}>{["Pferdeforum · 214 Antworten", "Reiterforum · Seite 1 von 38", "Antwort von PferdeMama2009"][i]}</T>
                {i < 2 && <rect x={130} y={y + 100} width={700 - i * 160} height={22} rx="11" fill={COL.sandLight} />}
                {i < 2 && <rect x={130} y={y + 138} width={520} height={22} rx="11" fill={COL.sandLight} />}
                {i === 2 && <T x={130} y={y + 150} size={72} anchor="start" color={COL.rust}>„Kommt drauf an.“</T>}
              </g>
            ) : null;
          })}
          <Big t={t} a={S("20")} lines={["Forum sagt:"]} y={300} size={80} />
        </g>
      )}
      <Face t={t} x={540} y={1600} r={110} kind="reiter" mood={forum ? "dizzy" : "worried"} />
    </g>
  );
}

/* ---------- H: Ruhe → Entscheidung → Push 13 °C ---------- */
function SceneCalm({ t }: { t: number }) {
  const a = S("21");
  const rugK = sm((t - a - 0.9) / 0.35);
  const done = t > a + 1.6;
  const note = t >= NOTE;
  const nk = ease((t - NOTE) / 0.3);
  const shock = t >= NOTE + 0.9;
  return (
    <g>
      <Horse t={t} id="edkH" rug="g100" rugK={rugK} y={1660} k={2.4} />
      <Big t={t} a={a + 0.3} b={note ? NOTE - 0.01 : 99} lines={["„Okay.“"]} y={320} size={110} />
      <Big t={t} a={a + 0.85} b={note ? NOTE + 0.9 : 99} lines={["100 Gramm."]} y={460} size={120} col={COL.forest} />
      {done && !shock && <g><Mark x={540} y={640} ok k={pop(t, a + 1.6)} r={56} /><T x={540} y={770} size={56} color={COL.forest} italic>Fertig.</T></g>}
      {note && (
        <g transform={`translate(0 ${(1 - nk) * -260})`}>
          <rect x={60} y={90} width={960} height={210} rx="44" fill={PAPER} stroke={COL.sandLight} strokeWidth="5" />
          <rect x={100} y={130} width={80} height={80} rx="20" fill="#6F8DA6" />
          <Sun x={140} y={170} r={18} />
          <T x={210} y={168} size={34} anchor="start" font={FONT_BODY} weight={800} color={COL.inkSoft}>WETTER · jetzt</T>
          <T x={100} y={262} size={44} anchor="start" font={FONT_BODY} weight={800} color={COL.forestDeep}>Vorhersage aktualisiert: heute 13 °C</T>
        </g>
      )}
      {shock && <Big t={t} a={NOTE + 0.9} lines={["13°C?!"]} y={560} size={230} col={COL.rust} />}
      {shock && <Face t={t} x={540} y={940} r={130} kind="reiter" mood="forced" a={NOTE + 1.05} />}
    </g>
  );
}

/* ---------- Finale ---------- */
const LINE: RugId[] = ["g200", "regen", "g150", "ohne"];
function SceneFinal({ t }: { t: number }) {
  const a22 = S("22"), a23 = S("23"), a24 = S("24");
  if (t < a24) {
    const strat = t >= a23;
    return (
      <g>
        <Big t={t} a={a22} lines={["Andere Menschen"]} y={330} size={96} col={COL.inkSoft} />
        <Big t={t} a={a22 + 0.6} lines={["schauen morgens", "aufs Wetter."]} y={460} size={84} />
        <Face t={t} x={strat ? 260 : 540} y={strat ? 1580 : 1000} r={strat ? 90 : 130} kind="laie" mood="smile" a={a22 + 0.2} label={strat ? "Wetter-Check: 3 Sek." : "Wetter-Check: 3 Sek."} />
        {strat && (
          <g>
            <Big t={t} a={a23} lines={["Pferdemenschen treffen"]} y={760} size={76} col={COL.forestDeep} />
            <Big t={t} a={a23 + 0.6} lines={["STRATEGISCHE", "ENTSCHEIDUNGEN."]} y={900} size={84} col={COL.rust} />
            <Face t={t} x={800} y={1520} r={150} kind="reiter" mood="proud" a={a23 + 0.3} label="Wetter-Check: 47 Min." />
          </g>
        )}
      </g>
    );
  }
  // „…die gerade trocken ist.“ – Wäscheleine
  const dry = t > a24 + 1.1;
  const share = ease((t - CTA) / 0.35);
  return (
    <g>
      <path d="M40 470 Q540 540 1040 470" fill="none" stroke={COL.brownDeep} strokeWidth="6" />
      {LINE.map((id, i) => {
        const x = 170 + i * 250, sw = 3 * Math.sin(t * 2 + i);
        return (
          <g key={id} transform={`rotate(${sw} ${x} 500)`}>
            <rect x={x - 100} y={500} width={200} height={230} rx="18" fill={RUGS[id].col} stroke={RUGS[id].edge} strokeWidth="5" />
            <rect x={x - 40} y={488} width={14} height={34} rx="4" fill={COL.honey} /><rect x={x + 26} y={488} width={14} height={34} rx="4" fill={COL.honey} />
            {Array.from({ length: 3 }, (_, j) => { const ph = (t * 1.3 + j * 0.33 + i * 0.2) % 1; return <path key={j} d={`M${x - 60 + j * 60} ${735 + ph * 90} q-6 10 0 14 q6 -4 0 -14`} fill="#6F8DA6" opacity={1 - ph} />; })}
            <T x={x} y={800 + 0} size={30} font={FONT_BODY} weight={800} color={COL.rust}>nass</T>
          </g>
        );
      })}
      <Horse t={t} id="edkF" rug="g100" y={1700} k={2.2} />
      {dry && <Pop t={t} a={a24 + 1.1} x={540} y={1100} text="trocken ✓" fill={COL.forest} size={52} />}
      <Big t={t} a={a24} b={CTA - 0.01} lines={["Am Ende trägt er eh", "die Decke, die gerade", "TROCKEN ist."]} y={200} size={72} gap={84} />
      {share > 0 && (
        <g opacity={share} transform={`translate(0 ${(1 - share) * 30})`}>
          <rect x={110} y={130} width={860} height={250} rx="44" fill={COL.forest} />
          <T x={540} y={225} size={56} color={PAPER}>Wie viele Decken hast DU?</T>
          <T x={540} y={310} size={40} font={FONT_BODY} weight={800} color={COL.honey}>…und trotzdem nie die richtige? 👇</T>
        </g>
      )}
      <BrandLine t={t} a={CTA + 0.6} text="Hofgeschichten | Die Reitakademie" />
    </g>
  );
}

/* ---------- Zusammenbau ---------- */
const FACT_IDS = ["04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];
export function renderEDK(t: number) {
  const cuts = [S("02") - 0.05, S("04") - 0.05, S("09") - 0.04, S("13") - 0.04, S("15") - 0.03, S("16") - 0.03, S("17") - 0.02, S("18") - 0.02, S("19") - 0.03, S("21") - 0.1, NOTE + 0.9, S("22") - 0.1, S("23") - 0.05, S("24") - 0.08, CTA];
  const n = FACT_IDS.filter((id) => t >= S(id)).length + (t >= S("18") ? 2 : 0);
  let scene: ReactNode;
  if (t < S("02") - 0.05) scene = <Hook t={t} />;
  else if (t < S("04") - 0.05) scene = <SceneA t={t} />;
  else if (t < S("09") - 0.04) scene = <SceneB t={t} />;
  else if (t < S("13") - 0.04) scene = <SceneC t={t} />;
  else if (t < S("16") - 0.03) scene = <SceneD t={t} />;
  else if (t < S("17") - 0.02) scene = <ScenePlan t={t} />;
  else if (t < S("18") - 0.02) scene = <SceneFormula t={t} />;
  else if (t < S("19") - 0.03) scene = <SceneApps t={t} />;
  else if (t < S("21") - 0.1) scene = <SceneSearch t={t} />;
  else if (t < S("22") - 0.1) scene = <SceneCalm t={t} />;
  else scene = <SceneFinal t={t} />;
  // Gedankenblasen-Wirbel in der Chaos-Phase (überlagert)
  const chaos = t >= S("16") && t < S("19");
  return (
    <Frame t={t} cuts={cuts} progress={{ a: S("04") - 0.05, b: S("21") - 0.1, label: `Faktoren: ${n}` }}>
      {scene}
      {chaos && t < S("17") && (
        <g opacity=".95">
          <Thought t={t} a={S("16") + 0.5} x={250} y={1700} text="Fell nass?" tail={1} />
          <Thought t={t} a={S("16") + 1.2} x={820} y={1560} text="Halsteil?" tail={-1} />
        </g>
      )}
    </Frame>
  );
}
