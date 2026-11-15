import type { ReactNode } from "react";
import { COL, CommentCard, FONT_BODY, NodHorse, PAPER, T, back, ease, sm } from "./nov-kit";
import { LOOK_T, LOOK_TO, Mark, Stamp } from "./n2-kit";
import { Clock } from "./r40-reiter-reel";
import { Big, BrandLine, Face, Frame, vo, type VoLines } from "./viral-kit";
import LJ from "./mathe-lines.json";

/* Tagesset 01 · Reel 01 „Reiter-Mathematik in 40 Sekunden erklärt“ (comp `mathe`, 15.11.2026) – Funny/Share-Reel.
   Vier Vergleiche (oben normale Ausgabe ✗, unten Pferde-Ausgabe ✓), Pferd nickt zustimmend, Finale mit Taschenrechner → ERROR.
   Stimme Jessica v4, geschnitten mit scripts/video/n2/vo_place.py (plans/mathe.json). Preise = bewusst übertriebene Comedy-Beispiele. */

const { S, E, total } = vo(LJ as VoLines);
export const MATHE_TOTAL = total;

/* ---------- Icons ---------- */
const Jeans = () => (
  <g>
    <path d="M-70 -110 L70 -110 L82 110 L22 110 L0 -20 L-22 110 L-82 110 Z" fill="#4E6E92" />
    <path d="M-70 -110 L70 -110 L72 -84 L-72 -84 Z" fill="#3D5878" />
    <path d="M-40 -84 q8 30 -12 40 M40 -84 q-8 30 12 40" stroke="#C9A35A" strokeWidth="4" fill="none" />
  </g>
);
const Pad = () => (
  <g>
    <path d="M-110 -80 L110 -80 L110 40 Q110 100 50 100 L-50 100 Q-110 100 -110 40 Z" fill={COL.rust} />
    <path d="M-96 -66 L96 -66 L96 36 Q96 86 46 86 L-46 86 Q-96 86 -96 36 Z" fill="none" stroke={COL.honey} strokeWidth="6" strokeDasharray="14 8" />
    <path d="M-40 -80 Q0 -40 40 -80" fill="#8E4A30" />
  </g>
);
const Coffee = ({ t }: { t: number }) => (
  <g>
    {[-24, 0, 24].map((x, i) => (
      <path key={i} d={`M${x} -70 q${12 * Math.sin(t * 4 + i)} -20 0 -40 q${-12 * Math.sin(t * 4 + i)} -20 0 -40`} stroke={COL.sand} strokeWidth="7" fill="none" strokeLinecap="round" />
    ))}
    <path d="M-70 -60 L70 -60 L56 80 Q54 96 38 96 L-38 96 Q-54 96 -56 80 Z" fill={PAPER} stroke={COL.brownDeep} strokeWidth="7" />
    <path d="M66 -30 q46 0 40 40 q-6 34 -46 34" stroke={COL.brownDeep} strokeWidth="9" fill="none" />
    <rect x={-60} y={-64} width={120} height={18} rx="9" fill={COL.brownDeep} />
  </g>
);
const Treats = ({ k = 1 }: { k?: number }) => (
  <g transform={`scale(${k})`}>
    <path d="M-62 -90 L62 -90 L74 100 L-74 100 Z" fill={COL.honey} />
    <path d="M-62 -90 L62 -90 L58 -66 L-58 -66 Z" fill="#B0843E" />
    <path d="M-10 -20 L28 40 L-34 0 Z" fill={COL.rust} />
    <path d="M-30 -2 l-18 -22 M-26 -6 l-6 -28 M-22 -8 l8 -26" stroke={COL.forest} strokeWidth="6" strokeLinecap="round" />
  </g>
);
const Dumbbell = () => (
  <g fill={COL.inkSoft}>
    <rect x={-80} y={-10} width={160} height={20} rx="10" />
    <rect x={-110} y={-60} width={34} height={120} rx="12" />
    <rect x={76} y={-60} width={34} height={120} rx="12" />
    <rect x={-140} y={-40} width={28} height={80} rx="10" />
    <rect x={112} y={-40} width={28} height={80} rx="10" />
  </g>
);
const Saddle = () => (
  <g>
    <path d="M-120 -10 Q-110 -70 -60 -40 Q0 -10 60 -40 Q110 -70 120 -10 Q90 60 0 60 Q-90 60 -120 -10 Z" fill={COL.brownDeep} />
    <path d="M-70 -30 Q0 10 70 -30" stroke={COL.brown} strokeWidth="10" fill="none" />
    <path d="M-10 60 L-10 120 M-30 120 L10 120" stroke={COL.inkSoft} strokeWidth="8" strokeLinecap="round" />
    <circle cx={0} cy={0} r={0} />
  </g>
);

/* ---------- Taschenrechner ---------- */
function Calc({ x, y, s = 1, text, err = 0, t }: { x: number; y: number; s?: number; text: string; err?: number; t: number }) {
  const keys = ["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "−", "0", ",", "=", "+"];
  const shake = err > 0 ? 8 * Math.sin(t * 70) * err : 0;
  return (
    <g transform={`translate(${x + shake} ${y}) scale(${s})`}>
      <rect x={-190} y={-270} width={380} height={540} rx="44" fill={COL.forestDeep} />
      <rect x={-160} y={-240} width={320} height={120} rx="20" fill={err > 0 ? COL.rust : "#DDE3D6"} />
      <T x={140} y={-158} size={Math.min(64, 290 / (Math.max(4, text.length) * 0.58))} font={FONT_BODY} weight={900} color={err > 0 ? PAPER : COL.forestDeep} anchor="end">{text}</T>
      {keys.map((k, i) => (
        <g key={k} transform={`translate(${-120 + (i % 4) * 80} ${-60 + Math.floor(i / 4) * 80})`}>
          <circle r="32" fill={i % 4 === 3 || k === "=" ? COL.honey : COL.sandLight} />
          <T x={0} y={13} size={36} font={FONT_BODY} weight={800} color={COL.forestDeep}>{k}</T>
        </g>
      ))}
    </g>
  );
}

/* ---------- Vergleichskarte ---------- */
type Card = { icon: (t: number) => ReactNode; label: string; price: (t: number) => string; quote: string; stamp: string };
function Row({ t, a, y, c, ok, sA, qA }: { t: number; a: number; y: number; c: Card; ok: boolean; sA: number; qA: number }) {
  const k = back((t - a) / 0.35);
  if (k <= 0.01) return null;
  const col = ok ? COL.forest : COL.rust;
  return (
    <g opacity={Math.min(1, k)} transform={`translate(540 ${y + 230}) scale(${Math.max(0.01, k)}) translate(-540 ${-(y + 230)})`}>
      <rect x={70} y={y} width={940} height={460} rx="44" fill={PAPER} stroke={t >= sA ? col : COL.sandLight} strokeWidth="8" />
      <rect x={110} y={y + 36} width={c.label.length * 24 + 60} height={62} rx="31" fill={ok ? COL.forest : COL.sandLight} />
      <T x={140 + (c.label.length * 24) / 2} y={y + 79} size={36} font={FONT_BODY} weight={800} color={ok ? PAPER : COL.forestDeep}>{c.label}</T>
      <g transform={`translate(270 ${y + 270})`}>{c.icon(t)}</g>
      <T x={720} y={y + 240} size={128} color={COL.forestDeep}>{c.price(t)}</T>
      {t >= qA && <g opacity={ease((t - qA) / 0.25)}><T x={720} y={y + 330} size={Math.min(42, 520 / (c.quote.length * 0.48))} font={FONT_BODY} weight={700} italic color={COL.inkSoft}>{c.quote}</T></g>}
      <Stamp t={t} a={sA} x={720} y={y + 410} text={c.stamp} col={col} size={52} rot={ok ? -4 : -7} />
      <Mark x={960} y={y + 20} ok={ok} k={back((t - sA) / 0.3)} r={44} />
    </g>
  );
}

const PAIRS: Array<{ ids: [string, string, string, string]; head: string; a: Card; b: Card }> = [
  {
    ids: ["03", "04", "05", "06"], head: "Shopping",
    a: { icon: () => <Jeans />, label: "Jeans", price: () => "80 €", quote: "„Viel zu teuer.“", stamp: "ZU TEUER" },
    b: { icon: () => <Pad />, label: "Schabracke", price: () => "180 €", quote: "„Die Farbe hatte ich noch nicht.“", stamp: "GEKAUFT" },
  },
  {
    ids: ["07", "08", "09", "10"], head: "Snacks",
    a: { icon: (t) => <Coffee t={t} />, label: "Kaffee", price: () => "6 €", quote: "„Absolute Frechheit.“", stamp: "FRECHHEIT" },
    b: {
      icon: (t) => (
        <g>
          {[0, 1, 2].map((i) => {
            const k = i === 0 ? 1 : back((t - S("10") - 0.25 * i) / 0.3);
            return k > 0.01 ? <g key={i} transform={`translate(${(i - 1) * 70 * Math.min(1, k)} ${i * 6}) scale(${0.75 * Math.max(0.01, k)})`}><Treats /></g> : null;
          })}
        </g>
      ),
      label: "Leckerlis", price: (t) => (t >= S("10") + 0.2 ? "3 × 6 €" : "6 €"), quote: "„Ach komm, gleich drei.“", stamp: "BRAUCHE ICH",
    },
  },
  {
    ids: ["11", "12", "13", "14"], head: "Gesundheit",
    a: { icon: () => <Dumbbell />, label: "Fitnessstudio", price: () => "30 €", quote: "„Brauch ich nicht.“", stamp: "UNNÖTIG" },
    b: { icon: () => <Saddle />, label: "Sattel-Check", price: () => "300 €", quote: "„Gesundheitsvorsorge.“", stamp: "INVESTITION" },
  },
  {
    ids: ["15", "16", "17", "18"], head: "Zeit",
    a: {
      icon: (t) => (
        <g>
          <Face t={t} x={-60} y={0} r={62} kind="laie" mood="smile" />
          <Face t={t} x={64} y={10} r={56} kind="laie" mood="nod" a={-1} />
        </g>
      ),
      label: "Freunde treffen", price: () => "1 Std.", quote: "„Keine Zeit.“", stamp: "KEINE ZEIT",
    },
    b: {
      icon: (t) => <g transform="scale(0.62)"><Clock min={15 + 225 * sm((t - S("17") - 0.2) / Math.max(0.5, E("18") - S("17")))} x={0} y={0} r={150} /></g>,
      label: "Im Stall", price: (t) => (t >= S("18") - 0.1 ? "4 Std." : "15 Min."), quote: "„War doch nur ganz kurz.“", stamp: "NUR KURZ",
    },
  },
];
const PSTART = PAIRS.map((p) => S(p.ids[0]) - 0.12);

function Pair({ t, i }: { t: number; i: number }) {
  const p = PAIRS[i];
  const [a1, a2, b1, b2] = p.ids;
  const nod = t >= S(b2) ? 8 * Math.max(0, Math.sin((t - S(b2)) * 9)) : 0;
  return (
    <g>
      <Big t={t} a={PSTART[i]} lines={[p.head]} y={250} size={70} col={COL.rust} />
      <Row t={t} a={PSTART[i]} y={330} c={p.a} ok={false} sA={S(a2) - 0.05} qA={S(a2) - 0.05} />
      <Row t={t} a={S(b1) - 0.1} y={860} c={p.b} ok sA={S(b2) - 0.05} qA={S(b2) - 0.05} />
      <g opacity={ease((t - S(b1)) / 0.3)}>
        <NodHorse t={t} pl={{ x: 560, y: 1355, k: 1.35 }} look={LOOK_T} id={`ma-h${i}`} nod={nod} />
      </g>
    </g>
  );
}

/* ---------- Finale ---------- */
function Finale({ t }: { t: number }) {
  const s19 = S("19"), s20 = S("20"), s21 = S("21"), s22 = S("22"), s23 = S("23");
  const h2 = back((t - s21 - 0.1) / 0.35);
  const rattle = t >= s22 && t < s23;
  const digits = rattle ? String(1000 + Math.floor(((t * 37) % 1) * 9000)) + " €" : "";
  const text = t >= s23 ? "ERROR" : rattle ? digits : t >= s21 ? "1000+1000=" : t >= s20 ? "1000 €" : "0";
  const err = t >= s23 ? Math.max(0.15, 1 - (t - s23) / 0.6) : 0;
  const calcY = t >= S("24") ? 1040 : 1180;
  return (
    <g>
      {t < S("24") && <Big t={t} a={s19 - 0.1} b={s20 - 0.01} lines={["Und jetzt die", "wichtigste Rechnung:"]} y={300} size={80} />}
      {t >= s20 && t < S("24") && (
        <g>
          <g opacity={ease((t - s20) / 0.3)}>
            <NodHorse t={t} pl={{ x: h2 > 0.01 ? 0 : 200, y: 330, k: 1.45 }} look={LOOK_T} id="ma-f1" />
            <Tag x={h2 > 0.01 ? 260 : 460} y={330} text="1.000 € / Monat" />
          </g>
          {h2 > 0.01 && (
            <g opacity={Math.min(1, h2)}>
              <NodHorse t={t} pl={{ x: 540, y: 330, k: 1.45 * Math.max(0.01, Math.min(1, h2)) }} look={LOOK_TO} id="ma-f2" />
              <Tag x={800} y={330} text={t >= s22 ? "„nicht viel mehr“" : "+ ???"} />
            </g>
          )}
        </g>
      )}
      <g opacity={ease((t - s19) / 0.3)}><Calc t={t} x={540} y={calcY} s={t >= S("24") ? 0.62 : 1} text={text} err={err} /></g>
      {t >= S("24") && (
        <g>
          <Big t={t} a={S("24") - 0.1} lines={["Wissenschaftlich", "nicht erklärbar."]} y={300} size={86} />
          {t >= S("25") - 0.1 && <Big t={t} a={S("25") - 0.1} lines={["Emotional absolut", "korrekt."]} y={560} size={86} col={COL.rust} />}
          <CommentCard t={t} a={E("25") + 0.1} lines={["Welche Reiter-Rechnung ist", "bei dir absolut logisch?"]} sub="Schreib sie in die Kommentare 👇" y={1420} />
          <BrandLine t={t} a={E("25") + 0.4} text="Hofgeschichten" />
        </g>
      )}
    </g>
  );
}
function Tag({ x, y, text }: { x: number; y: number; text: string }) {
  const w = text.length * 22 + 50;
  return (
    <g>
      <rect x={x - w / 2} y={y - 40} width={w} height={70} rx="35" fill={COL.honey} />
      <T x={x} y={y + 8} size={36} font={FONT_BODY} weight={900} color={COL.forestDeep}>{text}</T>
    </g>
  );
}

/* ---------- Hook ---------- */
function Hook({ t }: { t: number }) {
  const eqs = ["80 € = zu teuer", "180 € = logisch", "4 Std. = kurz", "2 Pferde ≈ 1"];
  const i = Math.min(eqs.length - 1, Math.floor(t / 0.75));
  return (
    <g>
      <Big t={t} a={0} lines={["REITER-", "MATHEMATIK"]} y={290} size={120} shake={6} />
      {t >= S("02") - 0.1 && <Big t={t} a={S("02") - 0.1} lines={["in 40 Sekunden erklärt"]} y={560} size={60} col={COL.rust} />}
      <Calc t={t} x={680} y={1130} s={0.95} text={eqs[i]} />
      <NodHorse t={t} pl={{ x: 10, y: 980, k: 1.5 }} look={LOOK_T} id="ma-hk" nod={4 * Math.sin(t * 3)} />
    </g>
  );
}

export function renderMathe(t: number) {
  const scene = PSTART.filter((s) => s <= t).length - 1;
  let body: ReactNode;
  if (t < PSTART[0]) body = <Hook t={t} />;
  else if (t < S("19") - 0.12) body = <Pair t={t} i={scene} />;
  else body = <Finale t={t} />;
  const cuts = [...PSTART, S("19") - 0.12, S("23"), S("24") - 0.1];
  return (
    <Frame t={t} cuts={cuts} progress={{ a: PSTART[0], b: S("19") - 0.12, label: `${Math.max(1, scene + 1)}/4` }}>
      {body}
    </Frame>
  );
}
