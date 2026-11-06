import { Brand, COL, Caption, CommentCard, E, FONT_BODY, Header, HookText, PAPER, Pop, S, T, Title, W, H, back, ease, mkLines, sm, win, wordAt } from "./nov-kit";
import { Arena, LEG, LOOK_TO, Mark, Ride, Takt, V_SIDE, groundSpeed, mixLeg, pose, scr } from "./n2-kit";
import { LOOKS, TopHorse } from "./top";

/* Reel R9 (9:16): „Was dein Sitz mit deinem Pferd macht“ (comp `sitz`) – drei Ketten Ursache → Reaktion.
   1 Blick nach unten → Oberkörper vor → Vorhand (Seitenansicht, Gewichtspfeil)
   2 schief → Pferd tritt unter das Gewicht, driftet (von oben, Spur)
   3 Knie klemmen → eiliger, fester (Seitenansicht, Takt schneller)  → Spiegel-Karte → AKADEMIE */

const REC: Array<[string, string, number, number]> = [
  ["a1", "Was dein Sitz mit deinem Pferd macht –", 0, 2.05],
  ["a2", "du wirst staunen.", 2.3, 3.67],
  ["b1", "Du schaust nach unten?", 4.18, 5.22],
  ["b2", "Dein Oberkörper kippt vor –", 5.71, 7.23],
  ["b3", "und dein Pferd kommt mehr auf die Vorhand.", 7.52, 9.57],
  ["c1", "Du sitzt schief?", 10.02, 11.03],
  ["c2", "Dein Pferd versucht, unter dein Gewicht zu treten – und driftet zur Seite.", 11.47, 15.3],
  ["d1", "Du klemmst mit den Knien?", 15.73, 17.05],
  ["d2", "Viele Pferde werden dann eiliger und fester.", 17.45, 19.99],
  ["e1", "Dein Pferd spiegelt deinen Sitz.", 20.48, 22.93],
  ["f1", "Welche Kette kennst du von dir?", 23.32, 24.94],
  ["f2", "Schreib AKADEMIE – dort zeigen wir dir, wie du's löst.", 25.24, 28.21],
];
export const SITZ_LINES = mkLines(REC);
const L = SITZ_LINES;
export const SITZ_TOTAL = E(L, "f2") + 2.6;
const at = (id: string, w: string) => wordAt(L, id, w);

function Arrow({ a, b, col, w = 12 }: { a: [number, number]; b: [number, number]; col: string; w?: number }) {
  const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
  const h = 30;
  const p1: [number, number] = [b[0] - h * Math.cos(ang - 0.5), b[1] - h * Math.sin(ang - 0.5)];
  const p2: [number, number] = [b[0] - h * Math.cos(ang + 0.5), b[1] - h * Math.sin(ang + 0.5)];
  return <path d={`M${a[0]} ${a[1]} L${b[0]} ${b[1]} M${p1[0]} ${p1[1]} L${b[0]} ${b[1]} L${p2[0]} ${p2[1]}`} stroke={col} strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round" />;
}

function Side({ t }: { t: number }) {
  const k3a = S(L, "d1") + 0.3;
  const k3b = E(L, "d2") + 0.3;
  const fast = 0.45;
  const tt = t + Math.max(0, Math.min(t, k3b) - k3a) * fast;
  const u1 = sm((t - S(L, "b1") - 0.1) / 0.6) * (1 - sm((t - E(L, "b3") - 0.2) / 0.5));
  const lean = u1 * 14 + sm((t - S(L, "b2")) / 0.6) * (1 - sm((t - E(L, "b3") - 0.2) / 0.5)) * 8;
  const headDown = u1 * 26;
  const uK = sm((t - S(L, "d1") - 0.1) / 0.5);
  const b = pose({ lean, headDown, leg: mixLeg(LEG.sitz, LEG.klemm, uK) });
  const pl = V_SIDE;
  const gait = "trab" as const;
  const wither = scr(pl, gait, tt, [262, 100]);
  const fore = scr(pl, gait, tt, [300, 270]);
  const knee = scr(pl, gait, tt, b.knee);
  const eye = scr(pl, gait, tt, b.head);
  const arrO = win(t, S(L, "b3") + 0.2, E(L, "b3") + 0.3);
  const klemmO = win(t, S(L, "d1") + 0.4, E(L, "d2") + 0.3);
  return (
    <g>
      <Arena t={tt} speed={groundSpeed(gait, pl.k)} y={pl.y + 285 * pl.k} />
      <Ride t={tt} pl={pl} gait={gait} id="sitz" b={b} look={LOOK_TO} nod={t > S(L, "b3") && t < E(L, "b3") + 0.5 ? 2 : uK > 0.5 ? 3 : 8} glow={klemmO > 0.3 ? COL.rust : undefined} />
      <g opacity={win(t, S(L, "b1") + 0.2, E(L, "b2") + 0.2)}>
        <Arrow a={[eye[0] + 20, eye[1] + 10]} b={[eye[0] + 90, eye[1] + 150]} col={COL.rust} w={9} />
        <Pop t={t} a={S(L, "b1") + 0.3} x={eye[0] + 40} y={eye[1] - 80} text="Blick nach unten" fill={COL.rust} size={30} />
      </g>
      <g opacity={arrO}>
        <Arrow a={wither} b={[fore[0] + 10, fore[1] - 20]} col={COL.rust} w={16} />
        <Pop t={t} a={S(L, "b3") + 0.4} x={fore[0] - 20} y={fore[1] + 70} text="mehr auf der Vorhand" fill={COL.rust} size={32} />
      </g>
      <g opacity={klemmO}>
        <circle cx={knee[0]} cy={knee[1]} r="46" fill="none" stroke={COL.rust} strokeWidth="9" />
        <Pop t={t} a={S(L, "d1") + 0.4} x={knee[0] - 250} y={knee[1] + 10} text="Knie klemmen" fill={COL.rust} size={30} />
        <Pop t={t} a={at("d2", "eiliger")} x={540} y={1470} text="eiliger · fester" fill={COL.rust} size={36} />
      </g>
      <Takt t={tt} cycle={0.72} beats={[0, 0.36]} labels={["1", "2"]} col={klemmO > 0.3 ? COL.rust : COL.honey} y={1590} o={klemmO} />
    </g>
  );
}

function Top({ t }: { t: number }) {
  const a = S(L, "c1");
  const u = Math.max(0, t - a);
  // Pferd läuft nach oben, driftet ab c2 nach rechts (unter das Gewicht)
  const drift = (tt: number) => 230 * sm(Math.max(0, tt - (S(L, "c2") + 0.6 - a)) / 3.2);
  const x0 = 380;
  const hy0 = 1060;
  const pts: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const tt = (u * i) / 60;
    pts.push(`${x0 + drift(tt)},${Math.min(1780, hy0 + 60 + (u - tt) * 140)}`);
  }
  const hx = x0 + drift(u);
  const hy = 1060;
  const lean = sm((t - a - 0.2) / 0.5);
  return (
    <g>
      <rect x={0} y={560} width={W} height={1200} fill="#E4D3B4" />
      {Array.from({ length: 24 }, (_, i) => (
        <ellipse key={i} cx={(i * 211) % 1080} cy={((i * 173 + u * 140) % 1200) + 560} rx="9" ry="4" fill="#C9B48F" />
      ))}
      <path d={`M${x0} 600 L${x0} 1760`} stroke={COL.forest} strokeWidth="6" strokeDasharray="20 18" opacity=".6" />
      <Pop t={t} a={a + 0.3} x={x0} y={640} text="gerade Linie" fill={COL.forest} size={26} />
      <polyline points={pts.join(" ")} fill="none" stroke={COL.rust} strokeWidth="10" strokeLinecap="round" opacity={win(t, S(L, "c2"), 99)} />
      <TopHorse at={[hx, hy]} ang={-90 + Math.min(14, drift(u) > 1 ? 14 * (1 - sm(Math.max(0, u - 3.5))) : 0)} look={LOOKS.tonga} step={t * 1.4} s={3.4} />
      {/* Gewicht schief: Punkt nach rechts verschoben */}
      <g opacity={lean}>
        <circle cx={hx + 34 * lean} cy={hy} r="24" fill={COL.rust} opacity=".85" />
        <Arrow a={[hx + 40, hy - 2]} b={[hx + 150, hy - 2]} col={COL.rust} w={10} />
        <Pop t={t} a={a + 0.4} x={hx + 230} y={hy - 90} text="Gewicht rechts" fill={COL.rust} size={28} />
      </g>
      <Pop t={t} a={at("c2", "driftet")} x={Math.min(860, hx + 120)} y={hy + 250} text="driftet zur Seite" fill={COL.rust} size={32} />
    </g>
  );
}

function Mirror({ t, a }: { t: number; a: number }) {
  const rows: Array<[string, string]> = [
    ["Blick nach unten", "Vorhand"],
    ["schief sitzen", "driftet"],
    ["Knie klemmen", "eilig & fest"],
  ];
  return (
    <g>
      {rows.map(([l, r], i) => {
        const k = back((t - a - 0.3 - i * 0.25) / 0.45);
        if (k <= 0.001) return null;
        return (
          <g key={l} transform={`translate(540 ${820 + i * 190}) scale(${k})`}>
            <rect x={-460} y={-66} width={400} height={132} rx="34" fill={COL.rust} />
            <T x={-260} y={12} size={34} font={FONT_BODY} weight={800} color={PAPER}>{l}</T>
            <T x={0} y={18} size={56} color={COL.forestDeep}>→</T>
            <rect x={60} y={-66} width={400} height={132} rx="34" fill={PAPER} stroke={COL.rust} strokeWidth="5" />
            <T x={260} y={12} size={34} font={FONT_BODY} weight={800} color={COL.rust}>{r}</T>
          </g>
        );
      })}
      <g opacity={ease((t - a - 1.3) / 0.4)}>
        <T x={270} y={700} size={30} font={FONT_BODY} weight={800} color={COL.forestDeep}>dein Sitz</T>
        <T x={810} y={700} size={30} font={FONT_BODY} weight={800} color={COL.forestDeep}>dein Pferd</T>
      </g>
    </g>
  );
}

export function renderSitz(t: number) {
  const hookEnd = E(L, "a2") + 0.2;
  const sideO = Math.max(win(t, -1, S(L, "c1") - 0.15, 0.3), win(t, S(L, "d1") - 0.15, S(L, "e1") - 0.15, 0.3));
  const topO = win(t, S(L, "c1") - 0.15, S(L, "d1") - 0.15, 0.3);
  const mirO = win(t, S(L, "e1") - 0.15, S(L, "f1") - 0.1, 0.3);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      {sideO > 0.01 && <g opacity={sideO}><Side t={t} /></g>}
      {topO > 0.01 && <g opacity={topO}><Top t={t} /></g>}
      {mirO > 0.01 && <g opacity={mirO}><Mirror t={t} a={S(L, "e1")} /></g>}
      <g opacity={win(t, S(L, "b1") + 0.1, E(L, "b3") + 0.3)}><Mark x={960} y={640} ok={false} k={back((t - S(L, "b1") - 0.1) / 0.4)} /></g>
      {t > S(L, "f1") - 0.2 && (
        <g>
          <CommentCard t={t} a={S(L, "f1") - 0.1} lines={["Welche Kette", "kennst du von dir?"]} sub="Schreib AKADEMIE – wir zeigen dir die Lösung" y={680} />
          <Brand t={t} a={S(L, "f2") + 1.0} y={1460} />
        </g>
      )}
      <Header t={t} label="Die Hofgeschichten · Sitz" hide={win(t, 0, hookEnd)} />
      <HookText t={t} end={hookEnd} y0={290} lines={[
        { text: "Was dein SITZ", at: -0.9, hi: true, size: 84 },
        { text: "mit deinem Pferd macht", at: 0.5, size: 70 },
        { text: "du wirst staunen 👀", at: S(L, "a2") - 0.1, size: 56 },
      ]} />
      <Title t={t} a={S(L, "b1")} b={S(L, "c1") - 0.15} top="Du schaust nach unten?" sub="Oberkörper kippt vor → Pferd auf die Vorhand" color={COL.rust} y={400} />
      <Title t={t} a={S(L, "c1")} b={S(L, "d1") - 0.15} top="Du sitzt schief?" sub="Pferd tritt unter dein Gewicht → driftet" color={COL.rust} y={400} />
      <Title t={t} a={S(L, "d1")} b={S(L, "e1") - 0.15} top="Du klemmst mit den Knien?" sub="viele Pferde werden eiliger und fester" color={COL.rust} y={400} />
      <Title t={t} a={S(L, "e1")} b={S(L, "f1") - 0.1} top="Dein Pferd spiegelt" sub="deinen Sitz" color={COL.forestDeep} y={400} />
      <Caption t={t} lines={L} skip={["a1", "a2", "f1", "f2", "e1"]} y={1720} />
    </svg>
  );
}
