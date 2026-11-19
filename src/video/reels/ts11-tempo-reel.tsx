import type { ReactNode } from "react";
import { BIT, SITZ, type P } from "@/components/illustrations/akademie/geometry";
import { getHorse } from "@/content/horses";
import { COL, Caption, FONT_BODY, PAPER, Pop, T, ease, headPoint, hs, lerp, sm, type Place, type VLine } from "./nov-kit";
import { LOOK_T, Ride, Stamp, pose } from "./n2-kit";
import { Arena, LEATHER, RidingHorse, groundSpeed, rideInfo, type RideState } from "./rs-kit";
import { Big, Frame, vo, type VoLines } from "./viral-kit";
import { ArrowL, Tag } from "./hg1-haenger-reel";
import { Mark2, RiderCTA, Ring, StepHead } from "./t3-kit";
import LJ from "./tempo-lines.json";

/* Rider Academy · „Wie kontrolliere ich das Tempo im Trab?“ (comp `tempo`, 19.11.2026), Jessica v4 ×1,25.
   Fachlich: eigener ruhiger Leichttrab-Rhythmus ist nur EIN Baustein („Das allein bremst nicht“); dazu aufgerichteter,
   stabiler Sitz und die halbe Parade (Körpermitte stabilisieren, Bein bleibt dran, kurz annehmen, reagieren lassen,
   wieder weich). Reagiert das Pferd, wird die Hilfe sofort weniger. Keine dauerhaft rückwärts wirkende Hand.
   Bestand: RidingHorse (posting), n2 Ride + pose (Vorkippen), Arena, Ring/Mark2/Tag/Stamp, Akademie-Handy. */

const { S, E, total } = vo(LJ as VoLines);
export const TEMPO_TOTAL = total;
const TXT = [
  "Dein Pferd wird im Trab immer schneller –", "und du weißt nicht, wie du es langsamer bekommst?", "Zieh nicht einfach stärker am Zügel.",
  "Ich zeig dir, wie du das Tempo wirklich beeinflusst.", "Erstens:", "Stell dir vor, du gibst den Takt vor.",
  "Steh beim Leichttraben ruhig auf und sitz kontrolliert ein, statt immer hektischer zu werden.", "Das allein bremst nicht.",
  "Aber es hilft deinem Pferd, seinen Rhythmus wiederzufinden.", "Zweitens:", "Bleib aufgerichtet und stabil in deiner Körpermitte.",
  "Kipp nicht nach vorne.", "Drittens:", "die halbe Parade.", "Körpermitte stabilisieren,", "Bein bleibt dran,", "kurz annehmen,",
  "reagieren lassen –", "und wieder weich werden.", "Sie sagt nicht: Stopp.", "Sie sagt:", "Komm wieder zu mir.", "Wichtig:",
  "Reagiert dein Pferd, wird deine Hilfe sofort weniger.", "Und wenn dir solche Dinge beim Reiten noch nie jemand so erklärt hat:",
  "Genau dafür gibt es unsere Rider Academy.",
];
const id = (i: number) => String(i).padStart(2, "0");
const CAP: VLine[] = TXT.map((text, i) => { const [a, b] = (LJ as VoLines).lines[id(i + 1)]; return { id: id(i + 1), text, start: a, dur: b - a }; });

const LOOK = getHorse("tonga")!.look;
const NOD = 9;
const B0 = headPoint(BIT, NOD, 0);
const REIN = Math.hypot(B0[0] - SITZ.hand[0] - 2, B0[1] - SITZ.hand[1]) + 0.3;
const rs = (pull = 0, nod = NOD): RideState => ({ nod, reach: 0, hand: [SITZ.hand[0] - 9 * pull, SITZ.hand[1] + pull], rein: REIN });
const V: Place = { x: 540 - 160 * 3.0, y: 1440 - 285 * 3.0, k: 3.0 };

/** Tempo-Anzeige 0…1 */
function Speed({ v, y = 470, label = "TEMPO" }: { v: number; y?: number; label?: string }) {
  const x0 = 160, x1 = 920;
  const col = v > 0.7 ? COL.rust : v > 0.45 ? COL.honey : COL.forest;
  return (
    <g>
      <T x={x0} y={y - 32} size={28} font={FONT_BODY} weight={900} color={COL.inkSoft} anchor="start">{label}</T>
      <rect x={x0} y={y - 18} width={x1 - x0} height={36} rx={18} fill={COL.sandLight} />
      <rect x={x0} y={y - 18} width={Math.max(36, (x1 - x0) * v)} height={36} rx={18} fill={col} />
    </g>
  );
}

/* ---------- 1 · Hook ---------- */
function Hook({ t }: { t: number }) {
  const tw = t * 1.5;
  const pull = sm((t - S("03") - 0.1) / 0.3) * (1 - sm((t - S("04") + 0.1) / 0.3));
  const v = Math.min(0.95, 0.5 + 0.18 * t);
  return (
    <g>
      <Arena t={tw} speed={groundSpeed("trab", V.k)} y={V.y + 285 * V.k} top={540} />
      <RidingHorse t={tw} pl={V} look={LOOK} gait="trab" id="tp-h" s={rs(pull)} posting reinColor={pull > 0.2 ? COL.rust : LEATHER} reinW={2.8} />
      {t < S("03") - 0.1 && <Big t={t} a={0} lines={["Immer schneller?!"]} y={250} size={112} col={COL.rust} />}
      {t < S("03") - 0.1 && <Speed v={v} />}
      {t >= S("03") - 0.1 && t < S("04") - 0.1 && <Stamp t={t} a={S("03")} x={540} y={300} text="✗ STÄRKER ZIEHEN" size={80} />}
      {t >= S("04") - 0.1 && (
        <g>
          <Big t={t} a={S("04") - 0.1} lines={["So geht's wirklich:"]} y={250} size={92} />
          {["1 Takt", "2 Sitz", "3 halbe Parade"].map((c, i) => <Pop key={c} t={t} a={S("04") + 0.4 + i * 0.25} x={[200, 450, 790][i]} y={430} text={c} fill={[COL.forest, COL.honey, COL.rust][i]} color={i === 1 ? COL.forestDeep : PAPER} size={40} />)}
        </g>
      )}
    </g>
  );
}

/* ---------- 2 · Takt ---------- */
function Rhythm({ t }: { t: number }) {
  const a = S("05"), calm = S("07");
  const tw = t < calm ? t * 1.45 : calm * 1.45 + (t - calm);
  const fast = t < calm;
  const puzzle = t >= S("08") - 0.05;
  const row = (y: number, label: string, gap: number, col: string, o: number) => (
    <g opacity={o}>
      <T x={150} y={y + 14} size={36} font={FONT_BODY} weight={900} color={col} anchor="start">{label}</T>
      {Array.from({ length: Math.floor(560 / gap) }, (_, i) => <T key={i} x={430 + i * gap} y={y + 16} size={46} font={FONT_BODY} weight={900} color={col}>{i % 2 ? "↓" : "↑"}</T>)}
    </g>
  );
  return (
    <g>
      <Arena t={tw} speed={groundSpeed("trab", V.k)} y={V.y + 285 * V.k} top={540} />
      <RidingHorse t={tw} pl={V} look={LOOK} gait="trab" id="tp-r" s={rs()} posting />
      <StepHead t={t} a={a - 0.12} label="1 VON 3" title="Du gibst den Takt vor" size={82} dots={3} n={1} />
      {!puzzle ? (
        <g>
          {row(400, "SCHNELL:", 48, COL.rust, fast ? 1 : 0.35)}
          {t >= calm - 0.1 && row(480, "RUHIGER:", 110, COL.forest, ease((t - calm + 0.1) / 0.3))}
        </g>
      ) : (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${300 + i * 240} 390)`} opacity={i === 0 ? 1 : 0.35}>
              <rect x={-100} y={-50} width={200} height={100} rx={22} fill={i === 0 ? COL.forest : COL.sand} />
              <T x={0} y={14} size={36} font={FONT_BODY} weight={900} color={i === 0 ? PAPER : COL.inkSoft}>{["Takt", "Sitz", "Parade"][i]}</T>
            </g>
          ))}
          <Tag x={540} y={490} text="nur EIN Baustein – bremst nicht allein" size={34} fill={COL.rust} o={ease((t - S("08")) / 0.3)} />
          {t >= S("09") && <Tag x={540} y={560} text="hilft, den Rhythmus wiederzufinden ✓" size={32} fill={COL.forest} o={ease((t - S("09")) / 0.3)} />}
        </g>
      )}
    </g>
  );
}

/* ---------- 3 · Sitz ---------- */
function Seat({ t }: { t: number }) {
  const a = S("10");
  const k = 1.45;
  const panel = (g: number, bad: boolean, o: number, idp: string) => {
    if (o <= 0.01) return null;
    const pl: Place = { x: 560 - 160 * k, y: g - 285 * k, k };
    const tw = bad ? t * 1.5 : t;
    const b = bad ? pose({ lean: 16, headDown: 6, handDx: 2 + 3 * Math.sin(t * 13), handDy: 2 * Math.sin(t * 17) }) : pose({});
    return (
      <g opacity={o}>
        <rect x={40} y={g - 410} width={1000} height={480} rx={34} fill={bad ? "#F3DED6" : "#E1E9DA"} />
        <Ride t={tw} pl={pl} gait="trab" id={idp} b={b} nod={NOD} look={LOOK} glow={bad ? COL.rust : COL.forest} />
        <Mark2 t={t} a={bad ? a + 0.3 : S("11")} x={110} y={g - 340} ok={!bad} r={40} />
        <T x={540} y={g + 48} size={30} font={FONT_BODY} weight={800} color={bad ? COL.rust : COL.forest}>{bad ? "schneller → hektisch → kippt vor → Hände unruhig" : "aufgerichtet → ruhiger Rhythmus → Hilfen bewusst"}</T>
      </g>
    );
  };
  return (
    <g>
      <StepHead t={t} a={a - 0.12} label="2 VON 3" title="Dein Sitz" dots={3} n={2} />
      {panel(940, true, ease((t - a - 0.2) / 0.3), "tp-bad")}
      {panel(1430, false, ease((t - S("11")) / 0.3), "tp-ok")}
      {t >= S("12") && <Stamp t={t} a={S("12")} x={540} y={440} text="NICHT NACH VORNE KIPPEN" size={52} />}
    </g>
  );
}

/* ---------- 4 · Halbe Parade ---------- */
const STEPS = ["Körpermitte stabilisieren", "Bein bleibt dran", "kurz annehmen", "reagieren lassen", "wieder weich werden"];
function Parade({ t }: { t: number }) {
  const a = S("13");
  const at = (i: number) => S(id(15 + i));
  const pull = sm((t - at(2)) / 0.25) * (1 - sm((t - at(4)) / 0.4));
  const slow = sm((t - at(3)) / 1.2);
  const tw = a * 1.0 + (t - a) * lerp(1.25, 1.0, slow);
  const pl: Place = { x: 540 - 160 * 2.4, y: 1130 - 285 * 2.4, k: 2.4 };
  const s = rs(pull * 0.7);
  const info = rideInfo(tw, "trab", s, false);
  const scr = (p: P) => hs(pl, [p[0], p[1] + info.bob]);
  const core = scr([(info.body.hip[0] + info.body.shoulder[0]) / 2, (info.body.hip[1] + info.body.shoulder[1]) / 2]);
  const calf = scr([(info.body.knee[0] + info.body.ankle[0]) / 2 + 2, (info.body.knee[1] + info.body.ankle[1]) / 2]);
  const hand = scr(info.h);
  const head = scr(info.b);
  const talk = t >= S("20") - 0.1;
  return (
    <g>
      <Arena t={tw} speed={groundSpeed("trab", pl.k)} y={pl.y + 285 * pl.k} top={540} />
      <RidingHorse t={tw} pl={pl} look={LOOK} gait="trab" id="tp-p" s={s} reinColor={pull > 0.3 ? COL.honey : LEATHER} reinW={2.8} glow={t >= at(4) ? COL.forest : undefined} />
      <Ring t={t} x={core[0]} y={core[1]} col={COL.honey} o={sm((t - at(0) + 0.05) / 0.25)} r={30} n="1" />
      <Ring t={t} x={calf[0]} y={calf[1]} col={COL.forest} o={sm((t - at(1) + 0.05) / 0.25)} r={26} n="2" />
      <Ring t={t} x={hand[0]} y={hand[1]} col={COL.brown} o={sm((t - at(2) + 0.05) / 0.25)} r={22} n="3" />
      <StepHead t={t} a={a - 0.12} label="3 VON 3" title="Die halbe Parade" dots={3} n={3} />
      {!talk && <Speed v={lerp(0.85, 0.5, slow)} y={470} />}
      {/* Kette */}
      {!talk && STEPS.map((st, i) => {
        if (t < at(i) - 0.05) return null;
        const cur = i === STEPS.length - 1 ? true : t < at(i + 1) - 0.05;
        const y = 1210 + i * 66;
        return (
          <g key={st} opacity={cur ? 1 : 0.55}>
            {i > 0 && <T x={540} y={y - 26} size={26} font={FONT_BODY} weight={900} color={COL.inkSoft}>↓</T>}
            <Tag x={540} y={y + 14} text={st} size={cur ? 36 : 30} fill={[COL.honey, COL.forest, COL.brown, COL.forestDeep, COL.forest][i]} color={i === 0 ? COL.forestDeep : PAPER} />
          </g>
        );
      })}
      {talk && (
        <g>
          <g transform={`translate(780 ${1060})`} opacity={t < S("22") - 0.1 ? 1 : 0}>
            <rect x={-170} y={-60} width={340} height={110} rx={30} fill={COL.rust} />
            <T x={0} y={18} size={58} font={FONT_BODY} weight={900} color={PAPER}>STOPP!</T>
            {t >= S("20") + 0.6 && <path d={`M-180 ${-70 + 0} L180 ${60}`} stroke={COL.forestDeep} strokeWidth="14" strokeLinecap="round" />}
          </g>
          {t >= S("22") - 0.1 && (
            <g transform={`translate(540 ${1260}) scale(${Math.min(1, ease((t - S("22") + 0.1) / 0.3))})`}>
              <rect x={-360} y={-70} width={720} height={130} rx={36} fill={COL.forest} />
              <T x={0} y={18} size={52} font={FONT_BODY} weight={900} color={PAPER}>„Komm wieder zu mir.“</T>
            </g>
          )}
        </g>
      )}
    </g>
  );
}

/* ---------- 5 · Formel ---------- */
const F = ["RUHIGER EIGENER RHYTHMUS", "+ STABILER SITZ", "+ DOSIERTE HILFE", "+ WIEDER NACHGEBEN", "= TEMPO REGULIEREN"];
function Formula({ t }: { t: number }) {
  const a = S("23");
  const hl = t >= S("24") + 0.3;
  const help = lerp(0.9, 0.15, sm((t - S("24") - 0.8) / 1.0));
  return (
    <g>
      <T x={540} y={150} size={30} font={FONT_BODY} weight={800} color={COL.rust}>ZUM MERKEN</T>
      {F.map((l, i) => {
        const k = ease((t - a - 0.05 - i * 0.22) / 0.25);
        const y = 330 + i * 120;
        const last = i === F.length - 1;
        const isNach = i === 3;
        return (
          <g key={l} opacity={k}>
            {isNach && hl && <rect x={110} y={y - 70} width={860} height={100} rx={26} fill={COL.honey} opacity=".5" />}
            <T x={540} y={y} size={last ? 64 : 54} color={last ? COL.rust : COL.forestDeep}>{l}</T>
          </g>
        );
      })}
      {t >= S("24") && (
        <g opacity={ease((t - S("24")) / 0.3)}>
          <Tag x={540} y={1020} text="Pferd reagiert = Hilfe wird weniger" size={38} fill={COL.forest} />
          <T x={160} y={1150} size={28} font={FONT_BODY} weight={900} color={COL.inkSoft} anchor="start">HILFE</T>
          <rect x={160} y={1170} width={760} height={40} rx={20} fill={COL.sandLight} />
          <rect x={160} y={1170} width={Math.max(40, 760 * help)} height={40} rx={20} fill={help > 0.5 ? COL.honey : COL.forest} />
          <ArrowL from={[940 - 760 * (1 - help) + 120, 1290]} to={[940 - 760 * (1 - help) - 20, 1290]} col={COL.forest} w={10} head={26} o={sm((t - S("24") - 0.8) / 0.3)} />
        </g>
      )}
    </g>
  );
}

export function renderTempo(t: number) {
  const cuts = [S("05") - 0.12, S("10") - 0.12, S("13") - 0.12, S("23") - 0.12, S("25") - 0.12];
  let body: ReactNode;
  if (t < cuts[0]) body = <Hook t={t} />;
  else if (t < cuts[1]) body = <Rhythm t={t} />;
  else if (t < cuts[2]) body = <Seat t={t} />;
  else if (t < cuts[3]) body = <Parade t={t} />;
  else if (t < cuts[4]) body = <Formula t={t} />;
  else body = <RiderCTA t={t} a={S("25")} b={S("26") + 0.2} fin={E("26") + 0.4} module={4} title={["Noch nie so", "erklärt bekommen?"]} id="tp-ph" />;
  return <Frame t={t} cuts={cuts} after={<Caption t={t} lines={CAP} y={1580} />}>{body}</Frame>;
}
export function renderTempoCover() {
  const t = S("02");
  return (
    <Frame t={t} cuts={[]}>
      <Arena t={t * 1.5} speed={groundSpeed("trab", V.k)} y={V.y + 285 * V.k} top={540} />
      <RidingHorse t={t * 1.5} pl={V} look={LOOK} gait="trab" id="tp-c" s={rs()} posting />
      <Big t={5} a={0} lines={["Dein Pferd wird", "immer schneller?"]} y={210} size={96} col={COL.rust} />
      <Tag x={540} y={470} text="So kontrollierst du das Tempo im Trab" size={40} fill={COL.forest} />
    </Frame>
  );
}
