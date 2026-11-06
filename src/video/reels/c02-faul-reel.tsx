import { Brand, COL, Caption, CommentCard, E, FONT_BODY, Header, HookText, IconBadge, PAPER, Pop, S, T, Title, W, H, ease, lerp, mkLines, sm, win, wordAt } from "./nov-kit";
import { Arena, LEG, Mark, Ride, V_SIDE, groundSpeed, mixLeg, pose, scr, type Leg } from "./n2-kit";

/* Community-Reel R2 (9:16): „Dein Pferd ist nicht faul.“ (comp `faul`)
   Reiterin seitlich auf Tivoli im Schritt. Dauertreiben (Unterschenkel pumpt, rot), Tempo-Anzeige sinkt,
   Lautsprecher-Symbol: die Hilfe wird leiser. Hand zieht mit (Gas + Bremse). Plötzlich träge → Sattel/Gesundheit.
   Richtig: ein kurzer, deutlicher Impuls, dann Ruhe, Loben. */

const REC: Array<[string, string, number, number]> = [
  ["a1", "Du treibst und treibst –", 0, 1.93],
  ["a2", "und dein Pferd wird nur noch langsamer?", 2.39, 4.31],
  ["b1", "Dein Pferd ist nicht faul.", 4.77, 6.31],
  ["c1", "Oft hat es gelernt, den Schenkel zu überhören:", 6.78, 9.22],
  ["c2", "Wer dauernd treibt, macht die Hilfe leiser.", 9.56, 11.83],
  ["d1", "Manchmal bremst die Hand unbewusst mit –", 12.26, 14.42],
  ["d2", "Gas und Bremse gleichzeitig.", 14.72, 16.65],
  ["e1", "Und wird ein Pferd plötzlich träge, lass auch Sattel und Gesundheit prüfen.", 17.02, 21.02],
  ["f1", "Was hilft: kurz und deutlich treiben, dann sofort wieder ruhig werden –", 21.39, 25.32],
  ["f2", "und loben, wenn es reagiert.", 25.57, 27.22],
  ["g1", "Kennst du das?", 27.54, 28.22],
  ["g2", "Schreib AKADEMIE, dann zeigen wir dir, wie Hilfen wirklich funktionieren.", 28.52, 32.52],
];
export const FAUL_LINES = mkLines(REC);
const L = FAUL_LINES;
export const FAUL_TOTAL = E(L, "g2") + 2.6;
const at = (id: string, w: string) => wordAt(L, id, w);

const TREIB: Leg = { knee: [244, 147], ankle: [220, 184], heel: [215, 188], toe: [234, 193] };

/** Tempo-Anzeige */
function Gauge({ v, x, y, o }: { v: number; x: number; y: number; o: number }) {
  if (o <= 0.01) return null;
  const a = Math.PI * (1 - v);
  const r = 110;
  return (
    <g opacity={o} transform={`translate(${x} ${y})`}>
      <path d={`M${-r} 0 A${r} ${r} 0 0 1 ${r} 0`} fill="none" stroke={COL.sandLight} strokeWidth="22" strokeLinecap="round" />
      <path d={`M${-r} 0 A${r} ${r} 0 0 1 ${Math.cos(a) * r} ${-Math.sin(a) * r}`} fill="none" stroke={v < 0.35 ? COL.rust : COL.forest} strokeWidth="22" strokeLinecap="round" />
      <path d={`M0 0 L${Math.cos(a) * (r - 30)} ${-Math.sin(a) * (r - 30)}`} stroke={COL.forestDeep} strokeWidth="8" strokeLinecap="round" />
      <circle r="12" fill={COL.forestDeep} />
      <T x={0} y={56} size={30} font={FONT_BODY} weight={800} color={COL.forestDeep}>Tempo</T>
    </g>
  );
}

/** Lautsprecher: Hilfe wird leiser */
function Speaker({ x, y, waves, o }: { x: number; y: number; waves: number; o: number }) {
  if (o <= 0.01) return null;
  return (
    <g opacity={o} transform={`translate(${x} ${y})`}>
      <circle r="78" fill={PAPER} />
      <path d="M-36 -16 H-14 L12 -40 V40 L-14 16 H-36 Z" fill={COL.forestDeep} />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${24 + i * 16} -${20 + i * 12} A${26 + i * 16} ${26 + i * 16} 0 0 1 ${24 + i * 16} ${20 + i * 12}`} fill="none" stroke={COL.honey} strokeWidth="7" strokeLinecap="round" opacity={waves > i ? 1 : 0.15} />
      ))}
    </g>
  );
}

function Pedals({ x, y, o }: { x: number; y: number; o: number }) {
  if (o <= 0.01) return null;
  return (
    <g opacity={o} transform={`translate(${x} ${y})`}>
      {[["Gas", COL.forest, -110], ["Bremse", COL.rust, 110]].map(([l, c, dx]) => (
        <g key={l as string} transform={`translate(${dx} 0)`}>
          <rect x={-90} y={-60} width={180} height={120} rx="26" fill={c as string} />
          <path d="M-50 -24 H50 M-50 0 H50 M-50 24 H50" stroke={PAPER} strokeWidth="6" opacity=".45" />
          <T x={0} y={100} size={34} font={FONT_BODY} weight={800} color={c as string}>{l as string}</T>
        </g>
      ))}
      <T x={0} y={16} size={60} font={FONT_BODY} weight={900} color={COL.forestDeep}>+</T>
    </g>
  );
}

export function renderFaul(t: number) {
  const hookEnd = E(L, "a2") + 0.15;
  const okPhase = t >= S(L, "f1") - 0.2;
  // Dauertreiben: Unterschenkel pumpt (bis zur Lösung)
  const pump = !okPhase && t < S(L, "e1") ? Math.max(0, Math.sin(t * 2 * Math.PI * 2.6)) : 0;
  // Lösung: ein kurzer Impuls bei „deutlich“
  const tImp = at("f1", "deutlich");
  const imp = okPhase ? Math.max(0, 1 - Math.abs(t - tImp) / 0.22) : 0;
  const leg = mixLeg(LEG.sitz, TREIB, Math.max(pump, imp));
  const pull = win(t, S(L, "d1"), E(L, "d2") + 0.1, 0.3);
  const b = pose({ leg, handDx: -9 * pull, lean: -2 * pull });
  // Tempo: sinkt beim Dauertreiben, steigt nach dem Impuls
  const v = okPhase ? lerp(0.25, 0.75, sm((t - tImp) / 0.5)) : lerp(0.6, 0.2, sm(t / 11));
  const strideK = okPhase ? lerp(0.85, 1.12, sm((t - tImp) / 0.5)) : lerp(1, 0.82, sm(t / 11));
  const gait = "schritt" as const;
  const pl = V_SIDE;
  const knee = scr(pl, gait, t, b.ankle);
  const hand = scr(pl, gait, t, b.hand);
  const sceneO = win(t, 0, S(L, "g1") - 0.1, 0.3);
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  const waves = t < S(L, "c2") ? 3 : t < at("c2", "leiser") ? 2 : 1;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      <g opacity={sceneO}>
        <Arena t={t * strideK} speed={groundSpeed(gait, pl.k)} y={pl.y + 285 * pl.k} />
        <Ride t={t * strideK} pl={pl} gait={gait} id="fa" b={b} strideK={strideK} glow={pump > 0.2 ? COL.rust : imp > 0.2 ? COL.forest : undefined} />
        {/* Treibender Unterschenkel */}
        {(pump > 0.05 || imp > 0.05) && <circle cx={knee[0]} cy={knee[1]} r={30 + 16 * Math.max(pump, imp)} fill="none" stroke={imp > 0 ? COL.forest : COL.rust} strokeWidth="6" />}
        {/* Hand zieht */}
        {pull > 0.05 && (
          <g opacity={pull}>
            <circle cx={hand[0]} cy={hand[1]} r={26 + 4 * pulse} fill="none" stroke={COL.rust} strokeWidth="6" />
            <path d={`M${hand[0] - 20} ${hand[1] - 50} h-70`} stroke={COL.rust} strokeWidth="9" strokeLinecap="round" />
            <path d={`M${hand[0] - 90} ${hand[1] - 50} l22 -16 v32 Z`} fill={COL.rust} />
          </g>
        )}
        <Gauge v={v} x={880} y={640} o={Math.max(win(t, -1, S(L, "b1")), win(t, S(L, "f1"), S(L, "g1") - 0.1))} />
        <Speaker x={200} y={600} waves={waves} o={win(t, S(L, "c1") - 0.1, E(L, "c2") + 0.2)} />
        <Pop t={t} a={at("c2", "dauernd") - 0.1} x={620} y={600} text="Dauertreiben = leiser" fill={COL.rust} size={34} o={win(t, at("c2", "dauernd") - 0.1, E(L, "c2") + 0.2)} />
        <Pedals x={540} y={560} o={win(t, S(L, "d2") - 0.15, E(L, "d2") + 0.2)} />
        {/* Plötzlich träge */}
        <g opacity={win(t, S(L, "e1") - 0.1, E(L, "e1") + 0.2)}>
          <IconBadge t={t} a={at("e1", "träge")} x={360} y={560} r={84} col={COL.honey} label="Sattel" icon={
            <path d="M-50 -10 C-32 10 22 12 40 -12 L50 -20 C48 4 38 22 18 28 L-32 28 C-46 20 -54 4 -50 -10 Z" fill={PAPER} />} />
          <IconBadge t={t} a={at("e1", "träge") + 0.25} x={720} y={560} r={84} col={COL.honey} label="Gesundheit" icon={
            <path d="M-14 -42 H14 V-14 H42 V14 H14 V42 H-14 V14 H-42 V-14 H-14 Z" fill={PAPER} />} />
        </g>
        {/* Lösung */}
        <Pop t={t} a={tImp - 0.1} x={540} y={470} text="kurz · deutlich · dann Ruhe" fill={COL.forest} size={36} o={win(t, tImp - 0.1, E(L, "f1") + 0.2)} />
        <g opacity={win(t, S(L, "f2") - 0.1, S(L, "g1") - 0.1)}>
          <Pop t={t} a={S(L, "f2") - 0.1} x={540} y={470} text="❤ loben, wenn es reagiert" fill={COL.honey} color={COL.forestDeep} size={36} />
        </g>
        <Mark x={150} y={470} ok k={ease((t - tImp + 0.1) / 0.3) * win(t, tImp - 0.1, S(L, "g1") - 0.1)} />
      </g>
      <g opacity={ease((t - S(L, "g1") + 0.15) / 0.3)}>
        <CommentCard t={t} a={S(L, "g1") - 0.1} lines={["Kennst du das?", "Schreib AKADEMIE"]} sub="… und wir zeigen dir, wie Hilfen wirken" y={640} />
        <Brand t={t} a={S(L, "g2") + 0.3} />
      </g>
      <Header t={t} label="Die Hofgeschichten · Reiten verstehen" hide={win(t, 0, hookEnd)} />
      <HookText t={t} end={hookEnd} y0={270} lines={[
        { text: "Du treibst und treibst …", at: -0.9, size: 76 },
        { text: "und es wird LANGSAMER?", at: S(L, "a2") - 0.1, hi: true, size: 84 },
      ]} />
      <Title t={t} a={S(L, "b1") - 0.05} b={E(L, "b1") + 0.3} top="Dein Pferd ist nicht faul." color={COL.forestDeep} y={330} />
      <Title t={t} a={S(L, "c1")} b={E(L, "c2") + 0.2} top="Es überhört den Schenkel" sub="weil er dauernd treibt" color={COL.rust} y={330} />
      <Title t={t} a={S(L, "d1")} b={E(L, "d2") + 0.2} top="Die Hand bremst mit" color={COL.rust} y={330} />
      <Title t={t} a={S(L, "e1")} b={E(L, "e1") + 0.2} top="Plötzlich träge?" sub="Sattel und Gesundheit prüfen lassen" color={COL.forestDeep} y={330} />
      <Title t={t} a={S(L, "f1")} b={S(L, "g1") - 0.1} top="Was hilft" color={COL.forest} y={330} />
      <Caption t={t} lines={L} skip={["a1", "a2", "b1", "g1", "g2"]} y={1610} />
    </svg>
  );
}
