import { legPhase } from "@/components/illustrations/akademie/AnimHorse";
import { BIT, SITZ, type P } from "@/components/illustrations/akademie/geometry";
import { getHorse } from "@/content/horses";
import { Arrow, Brand, COL, Caption, CommentCard, E, FONT_BODY, Header, HookText, IconBadge, PAPER, Pop, S, T, Title, W, H, back, ease, headPoint, hs, lerp, mkLines, sm, win, wordAt, type Place } from "./nov-kit";
import { Arena, LEATHER, RidingHorse, groundSpeed, rideInfo, type RideState } from "./rs-kit";

/* Reitlehrer-Sätze 01 (9:16): „Reite dein Pferd von hinten nach vorne!“
   Hook: Hinterhand ↔ Zügel. Denkfehler: Kopf mit rückwärtswirkender Hand eingestellt (moderat, Stirnlinie knapp
   hinter der Senkrechten). Erklärung: Sitz + treibende Hilfen → aktive, taktreine Hinterbeine; losgelassen schwingt die
   Bewegung durch Rücken und Rumpf, das Pferd sucht die Verbindung zur Hand. Bewusst keine starre „Kraft-Pfeil“-Kette und
   nicht „mehr treiben = richtig“: Takt, Balance, Losgelassenheit. Vergleich links/rechts, Abschlussfrage. */

const REC: Array<[string, string, number, number]> = [
  ["a1", "Reite dein Pferd von hinten nach vorne!", 0, 2.27],
  ["a2", "Aber wie soll das gehen, wenn du die Zügel doch vorne in der Hand hast?", 2.69, 6.01],
  ["b1", "Viele glauben, sie müssten ihr Pferd vorne mit den Zügeln in Form bringen.", 6.46, 10.11],
  ["b2", "Aber eine Kopfhaltung allein sagt nichts darüber, ob dein Pferd gut läuft.", 10.51, 14.82],
  ["c0", "Von hinten nach vorne heißt:", 15.2, 16.88],
  ["c1", "Mit Sitz und treibenden Hilfen förderst du eine aktive, taktreine Bewegung der Hinterbeine.", 17.14, 22.5],
  ["c2", "Ist dein Pferd losgelassen, schwingt diese Bewegung durch Rücken und Rumpf, und es sucht von sich aus eine weiche Verbindung zu deiner Hand.", 22.91, 30.27],
  ["d1", "Einfach mehr treiben reicht dafür nicht.", 30.67, 32.64],
  ["d2", "Takt, Balance und Losgelassenheit müssen stimmen.", 32.96, 35.92],
  ["e0", "Also:", 36.37, 36.85],
  ["e1", "Nicht vorne die Form erzwingen,", 37.17, 38.97],
  ["e2", "sondern von hinten die Bewegung entwickeln.", 39.23, 41.57],
  ["f1", "Jetzt weißt du, was deine Reitlehrerin mit diesem Satz wirklich meint.", 41.94, 45.48],
  ["f2", "Hast du das gewusst?", 45.92, 46.85],
];
export const RS01_LINES = mkLines(REC);
const L = RS01_LINES;
export const RS01_TOTAL = E(L, "f2") + 2.8;
const at = (id: string, w: string) => wordAt(L, id, w);

const LOOK = getHorse("tonga")!.look;
const GAIT = "trab" as const;
const K = 2.6;
const GROUND = 1390;
const PL: Place = { x: 540 - 160 * K, y: GROUND - 285 * K, k: K };

const dist = (nod: number, hand: P) => {
  const b = headPoint(BIT, nod, 0);
  return Math.hypot(b[0] - hand[0] - 2, b[1] - hand[1]);
};
/** Grundhaltungen */
const START = { nod: 10, hand: SITZ.hand };
const FORCED = { nod: 36, hand: [241, 97] as P };
const GOOD = { nod: 16, hand: SITZ.hand };
const st = (p: { nod: number; hand: P }, slack: number): RideState => ({ nod: p.nod, reach: 0, hand: p.hand, rein: dist(p.nod, p.hand) + slack });
const mix = (a: RideState, b: RideState, u: number): RideState => ({ nod: lerp(a.nod, b.nod, u), reach: 0, hand: [lerp(a.hand[0], b.hand[0], u), lerp(a.hand[1], b.hand[1], u)], rein: lerp(a.rein, b.rein, u) });
const S_START = st(START, 0.25);
const S_FORCED = st(FORCED, -1.4);
const S_GOOD = st(GOOD, 0.2);

/* Weg der Bewegung: Hinterbein → Kruppe → Rücken → Halsoberlinie (Pferde-Koordinaten) */
const FLOW = "M126,262 C124,220 118,170 134,128 C160,108 205,116 252,116 C282,112 300,84 318,56";
const HINDQ = "M92,150 C96,118 128,104 160,112 C176,150 172,206 156,240 C138,266 104,262 96,236 C88,206 88,176 92,150 Z";

/* Symbole */
const I_TAKT = (
  <g fill={PAPER} stroke={PAPER} strokeWidth="7" strokeLinecap="round">
    <circle cx="-20" cy="24" r="12" />
    <circle cx="22" cy="14" r="12" />
    <path d="M-8 24 V-30 L34 -40 V14" fill="none" />
  </g>
);
const I_BAL = (
  <g fill="none" stroke={PAPER} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M0 -40 V36 M-30 36 H30" />
    <path d="M-44 -24 H44" />
    <path d="M-44 -24 l-14 30 h28 Z M44 -24 l-14 30 h28 Z" fill={PAPER} />
  </g>
);
const I_LOS = (
  <g fill="none" stroke={PAPER} strokeWidth="7" strokeLinecap="round">
    <path d="M-44 -18 q11 -16 22 0 t22 0 t22 0 t22 0" />
    <path d="M-44 6 q11 -16 22 0 t22 0 t22 0 t22 0" opacity=".8" />
    <path d="M-44 30 q11 -16 22 0 t22 0 t22 0 t22 0" opacity=".6" />
  </g>
);

/** Ring + Puls an einem Punkt (Pferde-Koordinaten, im wippenden Rumpf) */
function Ring({ p, col, o, pulse }: { p: P; col: string; o: number; pulse?: number }) {
  if (o <= 0) return null;
  return (
    <g opacity={o}>
      <circle cx={p[0]} cy={p[1]} r="9" fill="none" stroke={col} strokeWidth="3.2" />
      {pulse !== undefined && <circle cx={p[0]} cy={p[1]} r={9 + pulse * 14} fill="none" stroke={col} strokeWidth="2.4" opacity={1 - pulse} />}
    </g>
  );
}

/** Ein Pferd mit eigenem Boden in einem Bildausschnitt (Vergleich) */
function Panel({ t, x, good, o }: { t: number; x: number; good: boolean; o: number }) {
  const k = 1.55;
  const gy = 1250;
  const pl: Place = { x: x + 270 - 160 * k, y: gy - 285 * k, k };
  const tk = good ? 1 : 0.86;
  const sk = good ? 1 : 0.74;
  const tt = t * tk + (good ? 0.3 : 0);
  const s = good ? S_GOOD : S_FORCED;
  const col = good ? COL.forest : COL.rust;
  const id = good ? "p-r" : "p-l";
  const hl = (["HL", "HR"] as const).reduce((m, l) => ({ ...m, [l]: legPhase(GAIT, l, tt).stance ? (good ? COL.honey : COL.sand) : undefined }), {});
  return (
    <g opacity={o}>
      <defs>
        <clipPath id={`${id}-clip`}><rect x={x + 10} y={620} width={520} height={820} rx="36" /></clipPath>
      </defs>
      <g clipPath={`url(#${id}-clip)`}>
        <g transform={`translate(${x - 270} 0)`}>
          <Arena t={t} speed={groundSpeed(GAIT, k, sk) * tk} y={gy} top={620} />
        </g>
        <RidingHorse t={tt} pl={pl} look={LOOK} gait={GAIT} id={id} s={s} posting reinColor={good ? LEATHER : COL.rust} glow={good ? COL.forest : COL.rust} strideK={sk} highlight={hl} />
      </g>
      <rect x={x + 10} y={620} width={520} height={820} rx="36" fill="none" stroke={col} strokeWidth="6" />
      <g transform={`translate(${x + 270} 690)`}>
        <circle r="40" fill={col} />
        <T x={0} y={18} size={50} font={FONT_BODY} weight={700} color={PAPER}>{good ? "✓" : "✗"}</T>
      </g>
      <T x={x + 270} y={1330} size={34} font={FONT_BODY} weight={700} color={col}>{good ? "taktrein & losgelassen" : "Kopf eingestellt"}</T>
      <T x={x + 270} y={1385} size={30} font={FONT_BODY} weight={700} color={COL.inkSoft}>{good ? "elastische Verbindung" : "Hinterbeine wenig aktiv"}</T>
    </g>
  );
}

export function renderRS01(t: number) {
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  /* Haltung des großen Pferdes */
  const uF = sm((t - at("b1", "Zügeln") + 0.2) / 1.3);
  const uG = sm((t - S(L, "c0") - 0.2) / 1.4);
  const s0 = mix(S_START, S_FORCED, uF);
  const s = uG > 0 ? mix(s0, S_GOOD, uG) : s0;
  const forcedO = uF * (1 - uG);
  const info = rideInfo(t, GAIT, s, true);

  const splitA = S(L, "e0") - 0.1;
  const splitB = E(L, "e2") + 0.25;
  const mainO = 1 - sm((t - splitA) / 0.45) + sm((t - splitB) / 0.45);
  const splitO = win(t, splitA, splitB, 0.45);

  /* Hook-Markierungen */
  const hindO = win(t, at("a1", "hinten") - 0.1, E(L, "a2") + 0.2);
  const reinHookO = win(t, at("a2", "Zügel") - 0.15, E(L, "a2") + 0.2);
  /* Erklärung */
  const c1O = win(t, S(L, "c1"), E(L, "c1") + 0.2);
  const sitzO = c1O * ease((t - at("c1", "Sitz") + 0.1) / 0.3);
  const legO = c1O * ease((t - at("c1", "treibenden") + 0.1) / 0.3);
  const hindC = win(t, at("c1", "aktive") - 0.1, E(L, "c2"));
  const flowO = win(t, at("c2", "schwingt") - 0.15, E(L, "d2"));
  const connO = win(t, at("c2", "Verbindung") - 0.2, E(L, "d2"));
  const d1O = win(t, S(L, "d1"), E(L, "d1") + 0.2);
  const d2O = win(t, S(L, "d2"), E(L, "d2") + 0.3);
  const stance = (l: "HL" | "HR") => legPhase(GAIT, l, t).stance;
  const hl = hindC > 0.3 ? { HL: stance("HL") ? COL.honey : undefined, HR: stance("HR") ? COL.honey : undefined } : {};
  const impulse = ((t - at("c1", "treibenden")) / 0.8) % 1;

  const reinColor = forcedO > 0.5 ? COL.rust : LEATHER;
  const reinGlow = reinHookO > 0.01 ? COL.rust : forcedO > 0.3 ? COL.rust : connO > 0.01 ? COL.forest : undefined;

  const hookEnd = E(L, "a2") + 0.1;
  const endO = win(t, S(L, "f2") - 0.1, RS01_TOTAL + 1);
  const hideHead = Math.max(win(t, 0, hookEnd), splitO, endO);

  const ankle: P = [info.body.ankle[0] + 4, info.body.ankle[1] - 22];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />

      {/* Großes Pferd (Hook, Denkfehler, Erklärung, Abschluss) */}
      {mainO > 0.01 && (
        <g opacity={Math.min(1, mainO)}>
          <Arena t={t} speed={groundSpeed(GAIT, K)} y={GROUND} />
          <RidingHorse
            t={t} pl={PL} look={LOOK} gait={GAIT} id="rs01" s={s} posting reinColor={reinColor} reinW={2.6}
            glow={reinGlow} highlight={hl}
            over={
              <g>
                {hindO > 0 && <path d={HINDQ} fill={COL.honey} fillOpacity={0.18 + 0.12 * pulse} stroke={COL.honey} strokeWidth="3.5" strokeDasharray="7 6" opacity={hindO} />}
                <Ring p={info.body.hip} col={COL.honey} o={sitzO} />
                <Ring p={ankle} col={COL.honey} o={legO} pulse={impulse} />
                {flowO > 0 && (
                  <g opacity={flowO}>
                    <path d={FLOW} fill="none" stroke={COL.honey} strokeWidth={10 + 2 * Math.sin(t * 7.8)} strokeLinecap="round" opacity=".28" />
                    <path d={FLOW} fill="none" stroke={COL.honey} strokeWidth="4.5" strokeLinecap="round" strokeDasharray="14 18" strokeDashoffset={-t * 70} />
                  </g>
                )}
                {forcedO > 0.05 && (
                  <g opacity={forcedO}>
                    <path d="M352,84 C366,100 368,118 360,134" fill="none" stroke={COL.rust} strokeWidth="3" strokeLinecap="round" strokeDasharray="5 4" />
                    <path d="M354,128 L360,136 L366,127" fill="none" stroke={COL.rust} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                )}
              </g>
            }
          />
          {/* Pfeil am Zügel: Hand wirkt rückwärts */}
          {forcedO > 0.05 && (() => {
            const b = hs(PL, [info.b[0], info.b[1] + info.bob]);
            const h = hs(PL, [info.h[0], info.h[1] + info.bob]);
            const m: P = [lerp(b[0], h[0], 0.35), lerp(b[1], h[1], 0.35) - 34];
            const m2: P = [lerp(b[0], h[0], 0.75), lerp(b[1], h[1], 0.75) - 34];
            return <g opacity={forcedO}><Arrow from={m} to={m2} color={PAPER} w={15} head={24} /><Arrow from={m} to={m2} color={COL.rust} w={7} head={20} /></g>;
          })()}

          {/* Hook: hinten / vorne */}
          <Pop t={t} a={at("a1", "hinten") - 0.05} x={250} y={800} text="HINTEN" fill={COL.honey} color={COL.forestDeep} size={36} o={hindO} />
          {reinHookO > 0 && (
            <g opacity={reinHookO}>
              <path d={`M880 1110 L${hs(PL, [300, 116 + info.bob])[0]} ${hs(PL, [300, 116 + info.bob])[1] + 6}`} stroke={COL.rust} strokeWidth="4" strokeDasharray="8 7" />
            </g>
          )}
          <Pop t={t} a={at("a2", "Zügel") - 0.1} x={880} y={1160} text="VORNE · Zügel" fill={COL.rust} size={34} o={reinHookO} />

          {/* Denkfehler */}
          <Pop t={t} a={at("b1", "Zügeln") + 0.6} x={860} y={1180} text="Hand wirkt rückwärts" fill={COL.rust} size={30} o={win(t, S(L, "b1"), E(L, "b1") + 0.2)} />
          <Pop t={t} a={S(L, "b2") - 0.05} x={540} y={560} text="KOPFPOSITION ≠ KORREKTES REITEN" fill={COL.rust} size={40} o={win(t, S(L, "b2"), E(L, "b2") + 0.2)} />

          {/* Erklärung */}
          <Pop t={t} a={at("c1", "Sitz") - 0.05} x={300} y={570} text="Sitz" fill={COL.honey} color={COL.forestDeep} size={32} o={c1O} />
          <Pop t={t} a={at("c1", "treibenden") - 0.05} x={680} y={570} text="treibende Hilfen" fill={COL.honey} color={COL.forestDeep} size={32} o={c1O} />
          <Pop t={t} a={at("c1", "aktive") - 0.05} x={300} y={1480} text="Hinterbeine: aktiv & taktrein" fill={COL.forest} size={32} o={hindC} />
          <Pop t={t} a={at("c2", "losgelassen") - 0.1} x={300} y={570} text="losgelassen" fill={COL.forest} size={34} o={win(t, S(L, "c2"), E(L, "c2") + 0.2)} />
          <Pop t={t} a={at("c2", "schwingt") - 0.05} x={265} y={800} text="schwingt durch Rücken & Rumpf" fill={COL.honey} color={COL.forestDeep} size={26} o={win(t, at("c2", "schwingt"), E(L, "c2") + 0.2)} />
          <Pop t={t} a={at("c2", "Verbindung") - 0.1} x={860} y={1180} text="sucht die Verbindung" fill={COL.forest} size={30} o={win(t, at("c2", "Verbindung"), E(L, "c2") + 0.2)} />
          <Pop t={t} a={at("c2", "Verbindung") + 0.3} x={860} y={1260} text="elastisch zur Hand" fill={COL.forest} size={30} o={win(t, at("c2", "Verbindung"), E(L, "c2") + 0.2)} />

          {d1O > 0 && (
            <g opacity={d1O}>
              <Pop t={t} a={S(L, "d1") + 0.2} x={540} y={570} text="„Mehr treiben“ ≠ automatisch richtig" fill={COL.rust} size={34} />
            </g>
          )}
          {d2O > 0 && (
            <g opacity={d2O}>
              <IconBadge t={t} a={at("d2", "Takt") - 0.05} x={220} y={500} icon={I_TAKT} label="Takt" r={66} />
              <IconBadge t={t} a={at("d2", "Balance") - 0.05} x={540} y={500} icon={I_BAL} label="Balance" r={66} />
              <IconBadge t={t} a={at("d2", "Losgelassenheit") - 0.05} x={860} y={500} icon={I_LOS} label="Losgelassenheit" r={66} />
            </g>
          )}
        </g>
      )}

      {/* Vergleich */}
      {splitO > 0.01 && (
        <g opacity={splitO}>
          <rect width={W} height={H} fill={COL.bg} />
          <Panel t={t} x={0} good={false} o={1} />
          <Panel t={t} x={540} good o={1} />
          <g opacity={ease((t - S(L, "e1") + 0.15) / 0.4)} transform={`translate(0 ${(1 - ease((t - S(L, "e1") + 0.15) / 0.4)) * 30})`}>
            <T x={540} y={260} size={64} color={COL.rust}>NICHT VORNE DIE</T>
            <T x={540} y={335} size={64} color={COL.rust}>FORM ERZWINGEN.</T>
          </g>
          <g opacity={ease((t - S(L, "e2") + 0.1) / 0.4)} transform={`translate(0 ${(1 - ease((t - S(L, "e2") + 0.1) / 0.4)) * 30})`}>
            <T x={540} y={450} size={56} color={COL.forest}>SONDERN VON HINTEN DIE</T>
            <T x={540} y={525} size={56} color={COL.forest}>BEWEGUNG ENTWICKELN.</T>
          </g>
          {t < S(L, "e1") && <T x={540} y={330} size={84} color={COL.forestDeep} o={ease((t - splitA) / 0.4)}>Also:</T>}
        </g>
      )}

      {/* Abschluss */}
      {endO > 0 && (
        <g opacity={endO}>
          <CommentCard t={t} a={S(L, "f2") - 0.05} lines={["Hast du das", "bisher gewusst?"]} sub="Schreib’s in die Kommentare 👇" y={250} />
          <Brand t={t} a={E(L, "f2") - 0.1} sub="Reiten endlich verstehen · Reitakademie" y={1430} />
        </g>
      )}

      <Header t={t} label="Die Hofgeschichten · Reitlehrer-Sätze" hide={hideHead} />
      <HookText t={t} end={hookEnd} size={70} gap={86} y0={230} lines={[
        { text: "„Reite dein Pferd", at: -0.9 },
        { text: "VON HINTEN", at: at("a1", "hinten") - 0.25, hi: true, size: 84 },
        { text: "NACH VORNE!“", at: at("a1", "vorne") - 0.2, hi: true, size: 84 },
        { text: "Aber wie – wenn du vorne", at: S(L, "a2") + 0.1 },
        { text: "die Zügel hältst? 👀", at: at("a2", "Zügel") - 0.1, italic: true },
      ]} />
      <Title t={t} a={S(L, "b1")} b={E(L, "b2")} top="Der Denkfehler" sub="die Form vorne mit den Zügeln „machen“" color={COL.rust} />
      <Title t={t} a={S(L, "c0")} b={E(L, "c0")} top="Von hinten nach vorne heißt …" color={COL.forest} />
      <Title t={t} a={S(L, "c1")} b={E(L, "c1")} top="Sitz & treibende Hilfen" sub="fördern aktive, taktreine Hinterbeine" y={290} />
      <Title t={t} a={S(L, "c2")} b={E(L, "c2")} top="Durch den ganzen Körper" sub="losgelassen schwingt die Bewegung mit" y={290} />
      <Title t={t} a={S(L, "d1")} b={E(L, "d1")} top="Einfach mehr treiben?" sub="bringt dein Pferd nicht automatisch über den Rücken" color={COL.rust} y={290} />
      <Title t={t} a={S(L, "d2")} b={E(L, "d2")} top="Entscheidend ist:" color={COL.forest} y={290} />
      <Title t={t} a={S(L, "f1")} b={E(L, "f1") + 0.3} top="Jetzt weißt du’s 💡" sub="das meint deine Reitlehrerin wirklich" color={COL.forest} />
      <Caption t={t} lines={L} skip={["a1", "a2", "e1", "e2", "f2"]} y={1600} />
    </svg>
  );
}
