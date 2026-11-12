import type { ReactNode } from "react";
import { COL, FONT_BODY, NodHorse, PAPER, T, back, ease, sm } from "./nov-kit";
import { LOOK_T, LOOK_TO, LOOK_S, Ride, pose } from "./n2-kit";
import { LOOKS, TopHorse } from "./top";
import { Big, BrandLine, Bubble, Face, Frame, Translate, vo, type Mood, type VoLines } from "./viral-kit";
import LJ from "./reitersprache-lines.json";

/* Reel „Sätze, die nur Reiter verstehen“ (comp `reitersprache`, 12.11.2026) – Kommentar-/Share-Reel.
   Je Satz: Sprechblase „Reiter“ oben, Bild-Übersetzung in der Mitte, Reaktionen unten (Reiter vs. Nicht-Reiter).
   Stimme Jessica v4, geschnitten mit scripts/video/n2/vo_place.py (plans/reitersprache.json). */

const { S, E, total } = vo(LJ as VoLines);
export const RSP_TOTAL = total;

type Item = { ph: string; text: string[]; label?: string; re?: string; reText?: string; tr?: string; trAt?: number; laie: Mood; reiter?: Mood; vis: (t: number, a: number) => ReactNode };
const end = (id: string) => E(id);

/* ---------- Bild-Übersetzungen ---------- */
const PL = { x: 540 - 165 * 2.1, y: 1120 - 285 * 2.1, k: 2.1 };
function Back({ t, a }: { t: number; a: number }) {
  const k = sm((t - a - 0.3) / 0.4);
  return (
    <g>
      <NodHorse t={t} pl={PL} look={LOOK_T} id="rsp1" gait="schritt" nod={-10} />
      <path d={`M${PL.x + 112 * 2.1} ${PL.y + 96 * 2.1} Q ${PL.x + 170 * 2.1} ${PL.y + 76 * 2.1} ${PL.x + 228 * 2.1} ${PL.y + 98 * 2.1}`} fill="none" stroke={COL.rust} strokeWidth="12" strokeLinecap="round" strokeDasharray="22 14" opacity={k} />
    </g>
  );
}
function TopLegRein({ t, a }: { t: number; a: number }) {
  const p = 0.5 + 0.5 * Math.sin((t - a) * 6);
  return (
    <g>
      <rect x={140} y={560} width={800} height={540} rx="30" fill="#E3D3B4" />
      <TopHorse at={[540, 830]} ang={-90} look={LOOKS.tivoli} step={t * 1.2} s={4.2} bend={-6} glow={{ innerLeg: t > a + 0.4 ? p : 0, outerRein: t > a + 0.7 ? 1 : 0 }} />
    </g>
  );
}
function Bucket({ t, a }: { t: number; a: number }) {
  const scared = t > a + 0.5;
  const k = back((t - a - 0.7) / 0.3);
  return (
    <g>
      <g transform={scared ? `translate(${-30 * sm((t - a - 0.5) / 0.15)} 0)` : undefined}>
        <NodHorse t={t} pl={{ x: 60, y: 1120 - 285 * 2, k: 2 }} look={LOOK_T} id="rsp3" nod={scared ? -22 : 4} />
      </g>
      <g transform="translate(860 1060)">
        <path d="M-60 -70 L60 -70 L46 40 L-46 40 Z" fill="#8FA3B8" />
        <ellipse cx={0} cy={-70} rx={60} ry={14} fill="#B8C7D4" />
        <path d="M-58 -70 Q0 -150 58 -70" fill="none" stroke="#6A7A88" strokeWidth="6" />
      </g>
      {k > 0.01 && (
        <g opacity={Math.min(1, k)} transform={`translate(520 640) scale(${Math.max(0.01, k)})`}>
          <circle cx={-150} cy={110} r={16} fill={PAPER} stroke={COL.forest} strokeWidth="5" />
          <circle cx={-185} cy={150} r={10} fill={PAPER} stroke={COL.forest} strokeWidth="5" />
          <ellipse rx={170} ry={90} fill={PAPER} stroke={COL.forest} strokeWidth="6" />
          <T x={0} y={34} size={100} color={COL.rust}>TOD.</T>
        </g>
      )}
    </g>
  );
}
function Sit({ t, gait, glow }: { t: number; gait: "trab" | "galopp-links" | "schritt"; glow?: string }) {
  return <Ride t={t} pl={PL} gait={gait} id={`rsp-${gait}`} b={pose({})} look={LOOK_TO} glow={glow} />;
}
function Hind({ t, a }: { t: number; a: number }) {
  const peek = sm((t - a - 0.2) / 0.3) * (1 - sm((t - S("10")) / 0.25));
  const act = t > S("10") + 0.4;
  return (
    <g>
      {peek > 0.01 && <g opacity={peek}><Face t={t} x={170} y={760 - 60 * peek} r={70} kind="laie" mood="peek" look={1} /></g>}
      <NodHorse t={t} pl={PL} look={LOOK_S} id="rsp5" gait={act ? "schritt" : "stand"} highlight={act ? { HL: COL.forest, HR: COL.forest } : undefined} />
      {act && <path d={`M${PL.x + 120 * 2.1} ${PL.y + 300 * 2.1} l120 0 m-26 -18 l26 18 l-26 18`} stroke={COL.forest} strokeWidth="10" fill="none" strokeLinecap="round" transform="translate(0 -40)" />}
    </g>
  );
}
function Shoulder({ t, a }: { t: number; a: number }) {
  const u = (t - a) * 0.12;
  const R = 230, cx = 540, cy = 830;
  const ang = -90 + u * 360;
  const rr = R - 70 * sm((t - a - 0.5) / 1.2);
  const at: [number, number] = [cx + rr * Math.cos((ang * Math.PI) / 180), cy + rr * Math.sin((ang * Math.PI) / 180)];
  return (
    <g>
      <rect x={140} y={560} width={800} height={540} rx="30" fill="#E3D3B4" />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={PAPER} strokeWidth="6" strokeDasharray="16 12" />
      <TopHorse at={at} ang={ang + 90} look={LOOKS.tivoli} step={t * 1.4} s={3.4} bend={4} />
      <path d={`M${at[0]} ${at[1]} L${cx + (rr - 90) * Math.cos((ang * Math.PI) / 180)} ${cy + (rr - 90) * Math.sin((ang * Math.PI) / 180)}`} stroke={COL.rust} strokeWidth="9" strokeLinecap="round" opacity={sm((t - a - 0.6) / 0.3)} />
    </g>
  );
}
function Parade({ t, a }: { t: number; a: number }) {
  const p = Math.max(0, Math.sin((t - a - 0.3) * 7));
  return (
    <g>
      <rect x={140} y={560} width={800} height={540} rx="30" fill="#E3D3B4" />
      <TopHorse at={[540, 830]} ang={-90} look={LOOKS.scrabble} step={t * 1.2} s={4.2} glow={{ innerLeg: p, outerLeg: p, outerRein: p, seat: p }} />
    </g>
  );
}
function Dict({ t, a }: { t: number; a: number }) {
  const k = back((t - a) / 0.35);
  const rows: Array<[string, string]> = [["guckig", "skeptisch"], ["durchlässig", "fein an den Hilfen"], ["halbe Parade", "kurz annehmen + treiben"]];
  return (
    <g opacity={Math.min(1, k)} transform={`translate(540 860) scale(${Math.max(0.01, k)}) translate(-540 -860)`}>
      <rect x={130} y={620} width={820} height={480} rx="34" fill={PAPER} stroke={COL.forest} strokeWidth="6" />
      <rect x={130} y={620} width={820} height={100} rx="34" fill={COL.forest} />
      <T x={540} y={688} size={46} color={PAPER}>Reiterisch → Deutsch</T>
      {rows.map(([r, d], i) => (
        <g key={r} opacity={ease((t - a - 0.3 - i * 0.2) / 0.25)}>
          <T x={170} y={800 + i * 100} size={40} anchor="start" color={COL.rust}>{r}</T>
          <T x={910} y={800 + i * 100} size={32} anchor="end" font={FONT_BODY} weight={700} color={COL.inkSoft}>{d}</T>
        </g>
      ))}
    </g>
  );
}

const ITEMS: Item[] = [
  { ph: "03", text: ["„Der läuft heute nicht", "richtig über den Rücken.“"], laie: "confused", tr: "verspannt statt locker über den Rücken", vis: (t, a) => <Back t={t} a={a} /> },
  { ph: "04", text: ["„Mehr inneres Bein an", "den äußeren Zügel.“"], re: "05", reText: "Was?", laie: "what", reiter: "nod", tr: "inneres Bein treibt das Pferd an den äußeren Zügel", vis: (t, a) => <TopLegRein t={t} a={a} /> },
  { ph: "06", text: ["„Der ist heute", "total guckig.“"], laie: "neutral", tr: "Pferd beäugt alles misstrauisch", vis: (t, a) => <Bucket t={t} a={a} /> },
  { ph: "07", text: ["„Ich hab heute richtig", "ausgesessen.“"], re: "08", reText: "Glückwunsch?", laie: "confused", reiter: "proud", tr: "Trab sitzen, ohne aus dem Sattel zu hüpfen", vis: (t) => <Sit t={t} gait="trab" /> },
  { ph: "09", text: ["„Der muss mehr", "von hinten kommen.“"], re: "10", reText: "Nein. Anders.", laie: "peek", tr: "Hinterbeine treten aktiver unter – mehr Schub", trAt: 0.5, vis: (t, a) => <Hind t={t} a={a} /> },
  { ph: "11", text: ["„Ich hab meinen", "Galopp verloren.“"], re: "12", reText: "Wo hattest du ihn zuletzt?", laie: "neutral", reiter: "worried", tr: "Pferd fällt aus dem Galopp in den Trab", vis: (t) => <Sit t={t} gait={t < S("11") + 0.7 ? "galopp-links" : "trab"} /> },
  { ph: "13", text: ["„Der fällt mir auf", "die innere Schulter.“"], laie: "worried", tr: "drängt über die innere Schulter nach innen", vis: (t, a) => <Shoulder t={t} a={a} /> },
  { ph: "14", text: ["„Mach mal eine", "halbe Parade.“"], re: "15", reText: "Eine WAS?", laie: "what", reiter: "nod", tr: "kurz annehmen + treiben: Pferd wird aufmerksam", vis: (t, a) => <Parade t={t} a={a} /> },
  { ph: "16", text: ["„Heute war er richtig", "durchlässig.“"], laie: "dizzy", reiter: "proud", tr: "reagiert fein und willig auf die Hilfen", vis: (t) => <Sit t={t} gait="schritt" glow={COL.forest} /> },
];
const STARTS = [...ITEMS.map((it) => S(it.ph) - 0.12), S("17") - 0.12, S("19") - 0.12];

function Item({ t, it, a, b }: { t: number; it: Item; a: number; b: number }) {
  const reA = it.re ? S(it.re) : end(it.ph) + 0.15;
  const trA = it.re ? E(it.re) + (it.trAt ?? 0.05) : end(it.ph) + 0.35;
  const laieMood: Mood = t >= reA - 0.1 ? it.laie : "neutral";
  const reiterMood: Mood = t >= reA + 0.15 ? it.reiter ?? "smile" : "smile";
  return (
    <g>
      <Bubble t={t} a={a} label="Reiter" lines={it.text} y={170} size={58} />
      {it.vis(t, a)}
      <Translate t={t} a={trA} text={it.tr!} y={1235} />
      <Face t={t} x={270} y={1560} r={105} kind="reiter" mood={reiterMood} label="Reiter" a={a} />
      <Face t={t} x={810} y={1560} r={105} kind="laie" mood={laieMood === "peek" ? "confused" : laieMood} look={laieMood === "peek" ? -1 : 0} label="Nicht-Reiter" a={a + 0.05} />
      {it.reText && t >= reA && (
        <g transform={`translate(810 1385) scale(${Math.max(0.01, Math.min(1, back((t - reA) / 0.25)))})`}>
          <rect x={-(it.reText.length * 17 + 50) / 2} y={-46} width={it.reText.length * 17 + 50} height={76} rx="38" fill={it.ph === "09" ? COL.rust : PAPER} stroke={COL.forest} strokeWidth="4" />
          <T x={0} y={6} size={34} font={FONT_BODY} weight={900} color={it.ph === "09" ? PAPER : COL.forestDeep}>{it.reText}</T>
        </g>
      )}
      {b < 0 && null}
    </g>
  );
}

export function renderRSP(t: number) {
  const idx = STARTS.filter((s) => s <= t).length - 1;
  let scene: ReactNode;
  if (idx < 0) {
    scene = (
      <g>
        <Big t={t} a={0} lines={["Sätze, die für Reiter", "völlig normal klingen …"]} y={330} size={80} />
        {t >= S("02") - 0.05 && <Big t={t} a={S("02") - 0.05} lines={["… und für alle anderen", "komplett verrückt."]} y={620} size={76} col={COL.rust} />}
        <Face t={t} x={300} y={1180} r={150} kind="reiter" mood="smile" label="Reiter" />
        <Face t={t} x={780} y={1180} r={150} kind="laie" mood={t >= S("02") + 0.3 ? "what" : "neutral"} label="alle anderen" />
      </g>
    );
  } else if (idx < ITEMS.length) {
    scene = <Item t={t} it={ITEMS[idx]} a={STARTS[idx]} b={STARTS[idx + 1]} />;
  } else if (idx === ITEMS.length) {
    scene = (
      <g>
        <Bubble t={t} a={STARTS[idx]} label="Trainer" lines={["„Sitz einfach.“"]} y={260} size={92} fill={COL.forestDeep} />
        <Face t={t} x={540} y={760} r={130} kind="trainer" mood="neutral" label="Trainer" />
        <Face t={t} x={540} y={1300} r={190} kind="reiter" mood={t >= S("18") - 0.1 ? "forced" : "neutral"} label="Reiter" />
        {t >= S("18") && <Big t={t} a={S("18")} lines={["„Einfach.“"]} y={1620} size={64} col={COL.inkSoft} font={FONT_BODY} />}
      </g>
    );
  } else {
    const cta = S("20");
    scene = (
      <g>
        <Big t={t} a={STARTS[idx]} b={cta - 0.01} lines={["Reitsprache ist", "eigentlich eine", "eigene Sprache."]} y={300} size={90} />
        {t < cta && <Dict t={t} a={STARTS[idx] + 0.6} />}
        {t >= cta && (
          <g>
            <Big t={t} a={cta} lines={["Welchen Satz verstehen", "wirklich NUR Reiter?"]} y={520} size={86} />
            {(() => {
              const k = back((t - cta - 0.6) / 0.4);
              if (k <= 0.01) return null;
              return (
                <g opacity={Math.min(1, k)} transform={`translate(540 1000) scale(${Math.max(0.01, k)}) translate(-540 -1000)`}>
                  <rect x={130} y={920} width={820} height={160} rx="80" fill={COL.forest} />
                  <T x={540} y={1018} size={46} color={PAPER}>Schreib ihn in die Kommentare</T>
                </g>
              );
            })()}
            <g opacity={ease((t - cta - 1.0) / 0.3)} transform={`translate(540 ${1230 + 18 * Math.sin((t - cta) * 6)})`}>
              <path d="M0 -60 L0 60 M-44 16 L0 60 L44 16" stroke={COL.rust} strokeWidth="18" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
        )}
        <BrandLine t={t} a={cta + 0.8} text="Hofgeschichten | Die Reitakademie" />
      </g>
    );
  }
  const cuts = [S("02") - 0.05, ...STARTS];
  const pi = Math.min(10, Math.max(1, idx + 1));
  return (
    <Frame t={t} cuts={cuts} progress={{ a: STARTS[0], b: STARTS[STARTS.length - 1], label: `${pi}/10` }}>
      {scene}
    </Frame>
  );
}

