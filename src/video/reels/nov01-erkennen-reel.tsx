import { getHorse } from "@/content/horses";
import { Brand, COL, Caption, CommentCard, E, FONT_BODY, Header, HookText, IconBadge, NodHorse, PAPER, Pop, S, T, Title, W, H, back, clamp01, ease, hs, lerp, mkLines, sm, win, wordAt, type Place } from "./nov-kit";

/* November 01 (9:16): „Kann dein Pferd dich erkennen?“ – Koppel, Pferd grast, Person kommt, Pferd hebt den Kopf.
   Stimme · Gesicht · Geruch; Stimme und Gesicht werden verknüpft; Vorsicht: Wiehern/Entgegenlaufen ≠ automatisch erkannt.
   Fachlich: Pferde erkennen vertraute Menschen u. a. an Stimme, Gesicht, Geruch und verknüpfen Stimme mit Gesicht
   (cross-modal, z. B. Proops & McComb 2012). */

const REC: Array<[string, string, number, number]> = [
  ["p1", "Hast du dich schon mal gefragt, ob dein Pferd wirklich weiß, wer du bist?", 0, 3.99],
  ["p2", "Tatsächlich können Pferde vertraute Menschen wiedererkennen.", 4.38, 7.56],
  ["p3", "Sie orientieren sich dabei unter anderem an Stimmen, Gesichtern und Gerüchen.", 7.98, 12.67],
  ["p4a", "Besonders spannend:", 13.05, 14.25],
  ["p4b", "Pferde können sogar menschliche Stimmen und Gesichter miteinander verknüpfen.", 14.56, 18.34],
  ["p5", "Aber nicht jedes Wiehern oder Entgegenlaufen bedeutet automatisch, dass dein Pferd dich persönlich erkannt hat.", 18.75, 24.87],
  ["p6a", "Jetzt interessiert uns:", 25.23, 26.62],
  ["p6b", "Erkennt dein Pferd dich schon, wenn du zum Stall kommst?", 26.91, 29.39],
];
export const N01_LINES = mkLines(REC);
const L = N01_LINES;
export const N01_TOTAL = E(L, "p6b") + 2.8;
const at = (id: string, w: string) => wordAt(L, id, w);

const LOOK = getHorse("tonga")!.look;
const PL: Place = { x: 330, y: 748, k: 2.4 };

/* ---------- Koppel ---------- */
function Paddock() {
  return (
    <g>
      <rect x={0} y={1020} width={W} height={540} fill="#D8DDBF" />
      <path d="M0 1030 Q270 1000 540 1022 T1080 1012 V1060 H0 Z" fill="#C9D0AC" />
      {/* Zaun hinten */}
      <g stroke="#8A6A4E" strokeLinecap="round">
        <path d="M0 930 H1080" strokeWidth="9" />
        <path d="M0 975 H1080" strokeWidth="9" />
        {Array.from({ length: 6 }, (_, i) => <path key={i} d={`M${40 + i * 200} 900 V1035`} strokeWidth="16" />)}
      </g>
      <g fill="#B9C296">
        {Array.from({ length: 22 }, (_, i) => {
          const x = (i * 157) % W;
          const y = 1080 + ((i * 89) % 440);
          return <path key={i} d={`M${x} ${y} l-6 -18 M${x} ${y} l2 -22 M${x} ${y} l9 -16`} stroke="#AAB585" strokeWidth="4" strokeLinecap="round" />;
        })}
      </g>
      <rect x={0} y={1550} width={W} height={10} fill={COL.brown} opacity=".3" />
    </g>
  );
}

/* ---------- Mensch seitlich (Blick nach rechts), läuft ---------- */
export function Person({ x, y, walk, s = 1, wave = 0 }: { x: number; y: number; walk: number; s?: number; wave?: number }) {
  const sw = Math.sin(walk * Math.PI * 2) * 22 * Math.min(1, Math.abs(walk) > 0 ? 1 : 0);
  const bob = Math.abs(Math.sin(walk * Math.PI * 2)) * 4;
  const arm = -sw * 0.8;
  return (
    <g transform={`translate(${x} ${y - bob}) scale(${s})`}>
      <ellipse cx="0" cy="4" rx="70" ry="10" fill="#000" opacity=".08" />
      {/* Beine */}
      <g strokeLinecap="round">
        <path d={`M0 -230 L${-sw * 0.9} -120 L${-sw} 0`} stroke="#9C8B70" strokeWidth="30" fill="none" strokeLinejoin="round" />
        <path d={`M${-sw} -70 L${-sw} 0`} stroke="#3A2C22" strokeWidth="30" />
        <path d={`M${-sw - 6} 0 h44`} stroke="#3A2C22" strokeWidth="18" />
        <path d={`M0 -230 L${sw * 0.9} -120 L${sw} 0`} stroke="#B3A386" strokeWidth="30" fill="none" strokeLinejoin="round" />
        <path d={`M${sw} -70 L${sw} 0`} stroke="#4A3A2E" strokeWidth="30" />
        <path d={`M${sw - 6} 0 h44`} stroke="#4A3A2E" strokeWidth="18" />
      </g>
      {/* Körper */}
      <path d="M-34 -232 Q-40 -330 -22 -380 L26 -380 Q42 -330 34 -232 Z" fill={COL.forest} />
      {/* Arm (hinten) und vorn */}
      <path d={`M4 -365 L${8 + arm * 0.6} -290 L${14 + arm} -228`} stroke="#2C3A2F" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d={wave > 0.01 ? `M10 -365 L${60} -${330 + 30 * wave} L${80} -${400 + 40 * wave}` : `M10 -365 L${14 - arm * 0.6} -290 L${20 - arm} -228`} stroke={COL.forest} strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx={wave > 0.01 ? 80 : 20 - arm} cy={wave > 0.01 ? -400 - 40 * wave : -224} r="13" fill="#E6C3A3" />
      {/* Hals + Kopf */}
      <path d="M2 -380 L6 -398" stroke="#E6C3A3" strokeWidth="18" strokeLinecap="round" />
      <path d="M-30 -440 Q-44 -400 -26 -380 L-6 -392 Z" fill="#6B4A33" />
      <circle cx="6" cy="-430" r="36" fill="#E6C3A3" />
      <path d="M-30 -436 Q-26 -478 14 -470 Q40 -462 40 -440 Q10 -452 -14 -440 Z" fill="#6B4A33" />
      <circle cx="26" cy="-432" r="4" fill="#2C2A24" />
      <path d="M30 -414 q8 2 10 -4" stroke="#B7795A" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  );
}

/* ---------- Symbole ---------- */
const ICON_VOICE = (
  <g fill="none" stroke={PAPER} strokeWidth="7" strokeLinecap="round">
    <path d="M-34 -14 h16 l22 -20 v68 l-22 -20 h-16 Z" fill={PAPER} />
    <path d="M16 -14 q12 14 0 28" />
    <path d="M28 -28 q24 28 0 56" />
  </g>
);
const ICON_FACE = (
  <g fill="none" stroke={PAPER} strokeWidth="7" strokeLinecap="round">
    <circle r="40" />
    <circle cx="-14" cy="-8" r="5" fill={PAPER} />
    <circle cx="14" cy="-8" r="5" fill={PAPER} />
    <path d="M-16 14 q16 14 32 0" />
  </g>
);
const ICON_SMELL = (
  <g fill="none" stroke={PAPER} strokeWidth="7" strokeLinecap="round">
    <path d="M-30 30 q-14 -20 0 -40 q14 -20 0 -40" />
    <path d="M0 30 q-14 -20 0 -40 q14 -20 0 -40" />
    <path d="M30 30 q-14 -20 0 -40 q14 -20 0 -40" />
  </g>
);

export function renderN01(t: number) {
  // Person kommt von links, bleibt vor dem Pferdekopf stehen; bei „verknüpfen“ tritt sie zum Pferd
  const walkIn = sm((t - 0.2) / 3.6);
  const step2 = sm((t - at("p4b", "verknüpfen") + 1.4) / 1.2);
  const px = lerp(-140, 210, walkIn) + 70 * step2;
  const moving = (t > 0.2 && t < 3.8) || (t > at("p4b", "verknüpfen") - 1.4 && t < at("p4b", "verknüpfen") - 0.2);
  const walk = moving ? t * 1.25 : 0;
  // Pferd grast, hebt aufmerksam den Kopf, als die Person kommt
  const up = sm((t - 1.7) / 1.0);
  const nod = lerp(22, -6, up) + Math.sin(t * 1.1) * 1.2 * up;
  const eye = hs(PL, [330, 78], true);
  const attn = win(t, 2.4, E(L, "p2"));
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);

  const hookO = win(t, 0, E(L, "p1") + 0.1);
  const p3O = win(t, S(L, "p3"), E(L, "p4b"));
  const linkK = ease((t - at("p4b", "Stimmen") ) / 0.6);
  const together = win(t, at("p4b", "verknüpfen") - 0.2, E(L, "p4b") + 0.1);
  const p5O = win(t, S(L, "p5"), E(L, "p5"));
  const endO = win(t, S(L, "p6a") - 0.2, N01_TOTAL + 1);
  const hideHead = Math.max(hookO, endO);
  const neigh = win(t, at("p5", "Wiehern") - 0.1, at("p5", "Entgegenlaufen"));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      <Paddock />
      <NodHorse t={t} pl={PL} look={LOOK} nod={nod} id="n01" flip />
      <Person x={px} y={1430} s={1.12} walk={walk} wave={win(t, at("p4b", "Stimmen") - 0.2, at("p4b", "verknüpfen") - 1.4) * 1} />

      {/* Aufmerksamkeit am Pferdekopf */}
      {attn > 0.01 && (
        <g opacity={attn} stroke={COL.rust} strokeWidth="7" strokeLinecap="round">
          {[-1, 0, 1].map((i) => {
            const a = (-90 + i * 32 - 30) * (Math.PI / 180);
            const r0 = 70 + 8 * pulse;
            return <path key={i} d={`M${eye[0] + Math.cos(a) * r0} ${eye[1] - 40 + Math.sin(a) * r0} L${eye[0] + Math.cos(a) * (r0 + 34)} ${eye[1] - 40 + Math.sin(a) * (r0 + 34)}`} />;
          })}
        </g>
      )}
      {/* p2: Blicklinie Pferd → Person mit Haken */}
      {win(t, S(L, "p2") + 0.4, E(L, "p2")) > 0.01 && (
        <g opacity={win(t, S(L, "p2") + 0.4, E(L, "p2"))}>
          <path d={`M${eye[0] - 20} ${eye[1]} L${px + 40} ${1000}`} stroke={COL.honey} strokeWidth="6" strokeDasharray="14 10" />
          <Pop t={t} a={at("p2", "wiedererkennen") - 0.2} x={px + 40} y={560} text="✓ vertrauter Mensch" fill={COL.forest} size={36} />
        </g>
      )}
      {/* p3: Stimme · Gesicht · Geruch */}
      {p3O > 0 && (
        <g opacity={p3O}>
          <IconBadge t={t} a={at("p3", "Stimmen") - 0.1} x={lerp(220, 330, linkK)} y={560} icon={ICON_VOICE} label="Stimme" col={COL.forest} />
          <IconBadge t={t} a={at("p3", "Gesichtern") - 0.1} x={lerp(540, 750, linkK)} y={560} icon={ICON_FACE} label="Gesicht" col={COL.forest} />
          <g opacity={1 - linkK}>
            <IconBadge t={t} a={at("p3", "Gerüchen") - 0.1} x={860} y={560} icon={ICON_SMELL} label="Geruch" col={COL.forest} />
          </g>
          {linkK > 0.01 && (
            <g opacity={linkK}>
              <path d="M420 560 H660" stroke={COL.honey} strokeWidth="12" strokeLinecap="round" strokeDasharray={`${240 * linkK} 300`} />
              <circle cx="540" cy="560" r={34 + 4 * pulse} fill={COL.honey} />
              <T x={540} y={574} size={40} font={FONT_BODY} weight={700} color={COL.forestDeep}>+</T>
              <Pop t={t} a={at("p4b", "verknüpfen")} x={540} y={790} text="Stimme + Gesicht = du!" fill={COL.rust} size={38} />
            </g>
          )}
        </g>
      )}
      {/* zusammengehörig: weicher Rahmen um Person und Pferdekopf */}
      {together > 0.01 && (
        <g opacity={together}>
          <ellipse cx={(px + eye[0]) / 2 + 10} cy={1130} rx={330 + 6 * pulse} ry={360} fill="none" stroke={COL.honey} strokeWidth="8" strokeDasharray="20 14" />
          <path transform={`translate(${(px + eye[0]) / 2 + 20} ${870}) scale(${2.4 + 0.15 * pulse})`} d="M0 10c-9-6-13-11-13-16a6 6 0 0 1 13-3 6 6 0 0 1 13 3c0 5-4 10-13 16Z" fill={COL.rust} />
        </g>
      )}
      {/* p5: Vorsicht */}
      {p5O > 0 && (
        <g opacity={p5O}>
          {neigh > 0.01 && (
            <g opacity={neigh} stroke={COL.brownDeep} strokeWidth="6" fill="none" strokeLinecap="round">
              {[0, 1, 2].map((i) => {
                const k = ((t * 1.6 + i / 3) % 1);
                const mouth = hs(PL, [362, 124], true);
                return <path key={i} opacity={1 - k} d={`M${mouth[0] - 30 - k * 90} ${mouth[1] - 50 - k * 40} q-24 40 0 80`} />;
              })}
            </g>
          )}
          <Pop t={t} a={at("p5", "Wiehern") - 0.1} x={540} y={560} text="Wiehern ≠ automatisch erkannt" fill={COL.rust} size={36} />
          <Pop t={t} a={at("p5", "Entgegenlaufen") - 0.1} x={540} y={680} text="Entgegenlaufen ≠ automatisch erkannt" fill={COL.rust} size={34} />
        </g>
      )}

      <Header t={t} label="Die Hofgeschichten · Pferdewissen" hide={hideHead} />
      <HookText t={t} end={E(L, "p1") + 0.1} lines={[
        { text: "Dein Pferd erkennt dich", at: -0.9 },
        { text: "vielleicht schon, bevor du", at: 0.6 },
        { text: "überhaupt bei ihm bist!", at: 1.5, hi: true, size: 80 },
      ]} />
      <Title t={t} a={S(L, "p2")} b={E(L, "p2")} top="Ja – Pferde erkennen" sub="vertraute Menschen wieder" color={COL.forest} />
      <Title t={t} a={S(L, "p3")} b={E(L, "p3")} top="Woran?" sub="unter anderem an …" y={290} />
      <Title t={t} a={S(L, "p4a")} b={E(L, "p4b")} top="Besonders spannend" sub="Pferde verknüpfen Stimme und Gesicht" color={COL.rust} y={290} />
      <Title t={t} a={S(L, "p5")} b={E(L, "p5")} top="Aber Vorsicht!" sub="nicht alles heißt: „Ich kenne dich“" color={COL.forestDeep} y={290} />
      {endO > 0 && (
        <g opacity={endO}>
          <g opacity={ease((t - S(L, "p6a") + 0.2) / 0.4)}>
            <T x={540} y={280} size={64} color={COL.rust}>Jetzt interessiert uns:</T>
          </g>
          <CommentCard t={t} a={S(L, "p6b") - 0.1} lines={["Erkennt dein Pferd dich", "schon von Weitem? 🐴"]} sub="Schreib’s in die Kommentare 👇" y={360} />
          <Brand t={t} a={E(L, "p6b") - 0.6} sub="Pferdewissen · Reitakademie · Link in der Bio" />
        </g>
      )}
      <Caption t={t} lines={L} skip={["p6a", "p6b"]} y={1600} />
      {clamp01(0) > 1 && back(0)}
    </svg>
  );
}
