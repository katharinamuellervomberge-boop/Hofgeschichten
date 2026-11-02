import { COL, Caption, E, FONT_BODY, Header, PAPER, S, T, W, H, back, clamp01, ease, lerp, sm, win, type VLine } from "./rkit";
import { LOOKS, TopHorse, type Pt } from "./top";

/* Reiten verstehen · Reel 02 (9:16): „Warum reitet man eine Ecke eigentlich aus?“
   Reitbahn von oben, linke obere Ecke: Pferd kommt die lange Seite hoch und biegt nach rechts auf die kurze Seite.
   Falsch: zu früh abbiegen (großer Bogen, Ecke abgeschnitten). Richtig: auf dem Hufschlag bis in den Eckbereich,
   dann ein Viertelkreis (Radius je nach Ausbildungsstand). Warum: Biegung · Balance · Vorbereitung.
   Split-Screen falsch/richtig, Merksatz „Viertelkreis – kein rechter Winkel“, Abschluss mit Speichern-Aufruf. */

/** Zeiten aus der Aufnahme (Jessica v4, 02.11.), Stimme beginnt bei 0,4 s im Reel. Teilsätze aus den Sprechpausen. */
const VO = 0.4;
const REC: Array<[string, string, number, number]> = [
  ["h1", "Du reitest deine Ecken falsch?!", 0, 1.95],
  ["h2", "Diesen Fehler machen viele Anfänger.", 2.32, 4.27],
  ["w", "Was bedeutet eigentlich: Ecke ausreiten?", 4.69, 7.3],
  ["f", "Viele biegen zu früh ab und schneiden die Ecke ab.", 7.64, 10.51],
  ["r1", "Richtig ist:", 10.85, 11.72],
  ["r2", "auf dem Hufschlag bleiben und die Ecke als gebogene Linie reiten.", 11.98, 15.55],
  ["y0", "Warum?", 15.92, 16.4],
  ["y1", "Für die Biegung.", 16.69, 17.51],
  ["y2", "Für die Balance.", 17.77, 18.68],
  ["y3", "Und als Vorbereitung auf die nächste Lektion.", 19.02, 21.38],
  ["m0", "Merke:", 21.74, 22.26],
  ["m1", "Eine gute Ecke ist ein Viertelkreis –", 22.64, 25.02],
  ["m2", "kein rechter Winkel.", 25.31, 26.44],
  ["m3", "Wie eng, hängt vom Ausbildungsstand deines Pferdes ab.", 26.79, 29.64],
  ["c0", "Und?", 29.99, 30.34],
  ["c1", "Reitest du deine Ecken wirklich aus?", 30.6, 32.48],
  ["c2", "Speichere dir das für deine nächste Reitstunde!", 32.75, 35.03],
];
export const ECKE_LINES: VLine[] = REC.map(([id, text, a, b]) => ({ id, text, start: a + VO, dur: b - a }));
const L = ECKE_LINES;
export const ECKE_TOTAL = E(L, "c2") + 2.6;
const at = (id: string, word: string) => {
  const l = L.find((x) => x.id === id)!;
  const i = Math.max(0, l.text.indexOf(word));
  return l.start + (l.dur * i) / l.text.length;
};

const LOOK = LOOKS.tonga;
const GOOD = COL.forest;
const BAD = COL.rust;

/* ---------- Reitbahn ---------- */
const FX = 110; // Bande links
const FY = 650; // Bande oben
const TX = 185; // Hufschlag lange Seite
const TY = 725; // Hufschlag kurze Seite
const BOTTOM = 1500;

/* ---------- Wege ---------- */
type Seg = { kind: "line"; a: Pt; b: Pt } | { kind: "arc"; c: Pt; r: number };
type Path = { segs: Seg[]; len: number[] };
function mkPath(segs: Seg[]): Path {
  return { segs, len: segs.map((s) => (s.kind === "line" ? Math.hypot(s.b[0] - s.a[0], s.b[1] - s.a[1]) : (Math.PI / 2) * s.r)) };
}
/** Ecke: hoch bis zum Bogen, Viertelkreis nach rechts, dann auf der kurzen Seite weiter */
function corner(r: number): Path {
  return mkPath([
    { kind: "line", a: [TX, 1560], b: [TX, TY + r] },
    { kind: "arc", c: [TX + r, TY + r], r },
    { kind: "line", a: [TX + r, TY], b: [1300, TY] },
  ]);
}
const R_GOOD = 140;
const R_BAD = 435;
const GOOD_P = corner(R_GOOD);
const BAD_P = corner(R_BAD);
const total = (p: Path) => p.len.reduce((a, b) => a + b, 0);

/** Punkt + Blickrichtung (Grad) + liegt im Bogen? */
function pose(p: Path, s: number): { pt: Pt; ang: number; arc: number } {
  let rest = Math.max(0, Math.min(total(p), s));
  for (let i = 0; i < p.segs.length; i++) {
    const g = p.segs[i];
    if (rest <= p.len[i] || i === p.segs.length - 1) {
      const u = clamp01(rest / p.len[i]);
      if (g.kind === "line") {
        return { pt: [lerp(g.a[0], g.b[0], u), lerp(g.a[1], g.b[1], u)], ang: (Math.atan2(g.b[1] - g.a[1], g.b[0] - g.a[0]) * 180) / Math.PI, arc: 0 };
      }
      const th = Math.PI + (u * Math.PI) / 2;
      return { pt: [g.c[0] + g.r * Math.cos(th), g.c[1] + g.r * Math.sin(th)], ang: (th * 180) / Math.PI + 90, arc: Math.sin(u * Math.PI) };
    }
    rest -= p.len[i];
  }
  return { pt: [0, 0], ang: 0, arc: 0 };
}
/** SVG-Pfad vom Anfang bis zur Strecke s */
function pathD(p: Path, s: number) {
  let rest = s;
  const g0 = p.segs[0] as { a: Pt };
  let d = `M${g0.a[0]},${g0.a[1]}`;
  for (let i = 0; i < p.segs.length && rest > 0; i++) {
    const g = p.segs[i];
    const u = clamp01(rest / p.len[i]);
    if (g.kind === "line") d += ` L${lerp(g.a[0], g.b[0], u)},${lerp(g.a[1], g.b[1], u)}`;
    else {
      const th = Math.PI + (u * Math.PI) / 2;
      d += ` A${g.r} ${g.r} 0 0 1 ${g.c[0] + g.r * Math.cos(th)},${g.c[1] + g.r * Math.sin(th)}`;
    }
    rest -= p.len[i];
  }
  return d;
}

function Arena({ id }: { id: string }) {
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E3D3B4" stopOpacity="0" />
          <stop offset="1" stopColor="#E3D3B4" />
        </linearGradient>
      </defs>
      <rect x={FX} y={FY} width={W - FX + 400} height={BOTTOM - FY} fill="#E3D3B4" />
      <g fill="#D3BF9C">
        {Array.from({ length: 40 }, (_, i) => {
          const x = FX + 20 + ((i * 211) % (W - FX));
          const y = FY + 30 + ((i * 137) % (BOTTOM - FY - 40));
          return <ellipse key={i} cx={x} cy={y} rx={i % 3 ? 13 : 20} ry="5" transform={`rotate(${(i * 37) % 180} ${x} ${y})`} />;
        })}
      </g>
      {/* Hufschlag (ausgetretene Spur) */}
      <path d={`M${TX} ${BOTTOM} V${TY} H${W + 400}`} fill="none" stroke="#CDB68F" strokeWidth="34" strokeLinejoin="miter" opacity=".55" />
      {/* Bande */}
      <path d={`M${FX} ${BOTTOM} V${FY} H${W + 400}`} fill="none" stroke={COL.brownDeep} strokeWidth="20" strokeLinejoin="round" />
      <path d={`M${FX} ${BOTTOM} V${FY} H${W + 400}`} fill="none" stroke="#F7F3EC" strokeWidth="12" strokeLinejoin="round" />
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i} fill={COL.brownDeep}>
          <circle cx={FX} cy={FY + i * 125} r="11" />
          <circle cx={FX + i * 125} cy={FY} r="11" />
        </g>
      ))}
    </g>
  );
}

function Line({ p, s, col, dash, w = 10, o = 1 }: { p: Path; s: number; col: string; dash?: boolean; w?: number; o?: number }) {
  if (s <= 1 || o <= 0) return null;
  const d = pathD(p, s);
  return (
    <g opacity={o}>
      <path d={d} fill="none" stroke={PAPER} strokeWidth={w + 8} strokeLinecap="round" opacity=".8" />
      <path d={d} fill="none" stroke={col} strokeWidth={w} strokeLinecap="round" strokeDasharray={dash ? "22 16" : undefined} />
    </g>
  );
}

function Rider({ t, p, s, bad, o = 1 }: { t: number; p: Path; s: number; bad?: boolean; o?: number }) {
  if (o <= 0.01) return null;
  const q = pose(p, s);
  // Biegung im Bogen (positiv = nach rechts/innen); falsch: ohne Biegung, eher steif
  const bend = bad ? -3 * q.arc : 9 * q.arc;
  return (
    <g opacity={o}>
      <TopHorse at={q.pt} ang={q.ang} look={LOOK} step={t * 1.4} s={2.3} bend={bend} />
    </g>
  );
}

function Pop({ t, a, x, y, text, fill, size = 32, o = 1 }: { t: number; a: number; x: number; y: number; text: string; fill: string; size?: number; o?: number }) {
  const k = back((t - a) / 0.4);
  if (k <= 0.01 || o <= 0) return null;
  const w = text.length * size * 0.56 + 56;
  return (
    <g opacity={Math.min(1, k) * o} transform={`translate(${x} ${y}) scale(${Math.max(0.01, k)}) translate(${-x} ${-y})`}>
      <rect x={x - w / 2} y={y - size * 1.35} width={w} height={size * 2} rx={size} fill={fill} />
      <T x={x} y={y} size={size} font={FONT_BODY} weight={700} color={PAPER}>{text}</T>
    </g>
  );
}

function XMark({ x, y, k, r = 50 }: { x: number; y: number; k: number; r?: number }) {
  if (k <= 0.01) return null;
  return (
    <g transform={`translate(${x} ${y}) scale(${Math.max(0.01, k)})`} opacity={Math.min(1, k)}>
      <circle r={r} fill={BAD} />
      <path d={`M${-r * 0.4} ${-r * 0.4} L${r * 0.4} ${r * 0.4} M${r * 0.4} ${-r * 0.4} L${-r * 0.4} ${r * 0.4}`} stroke={PAPER} strokeWidth={r * 0.2} strokeLinecap="round" />
    </g>
  );
}

function Title({ t, a, b, top, sub, color = COL.forestDeep }: { t: number; a: number; b: number; top: string; sub?: string; color?: string }) {
  const o = win(t, a, b);
  if (o <= 0) return null;
  const k1 = ease((t - a) / 0.4);
  const k2 = ease((t - a - 0.25) / 0.4);
  return (
    <g opacity={o}>
      <g opacity={k1} transform={`translate(0 ${(1 - k1) * 30})`}>
        <T x={540} y={300} size={Math.min(84, 900 / (top.length * 0.53))} color={color}>{top}</T>
      </g>
      {sub && (
        <g opacity={k2} transform={`translate(0 ${(1 - k2) * 30})`}>
          <T x={540} y={378} size={Math.min(42, 940 / (sub.length * 0.52))} font={FONT_BODY} weight={700} color={COL.inkSoft}>{sub}</T>
        </g>
      )}
    </g>
  );
}

/* ---------- Szenen in der großen Reitbahn ---------- */
const HOOK_END = E(L, "h2");
const SPEED = 300;

function BigScene({ t }: { t: number }) {
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  // Hook: Pferd schneidet die Ecke (Start schon im Bild)
  const hookO = win(t, 0, HOOK_END + 0.1);
  const sHook = 380 + SPEED * t;
  const xK = back((t - S(L, "h2") + 0.2) / 0.45) * hookO;
  // Was bedeutet …: leere Ecke, Ecke leuchtet
  const wO = win(t, S(L, "w") - 0.1, E(L, "w"));
  // Falsch
  const fA = S(L, "f") - 0.2;
  const fO = win(t, fA, E(L, "f") + 0.2);
  const sF = 120 + 300 * (t - fA);
  const badDraw = Math.max(0, sF + 160);
  // Richtig
  const rA = S(L, "r1") - 0.1;
  const rO = win(t, rA, E(L, "r2"));
  const sR = 60 + 235 * (t - rA);
  // Warum
  const yA = S(L, "y0") - 0.1;
  const yO = win(t, yA, E(L, "y3"));
  const sY = 330 + 220 * (t - yA);
  // Abschluss: verlässt die Ecke und reitet geradeaus
  const cA = S(L, "c0") - 0.3;
  const cO = win(t, cA, ECKE_TOTAL + 1);
  const sC = 520 + 210 * (t - cA);

  const sceneO = Math.max(hookO, wO, fO, rO, yO, cO);
  if (sceneO <= 0) return null;
  const goodLineO = Math.max(rO, yO * 0.9, cO * 0.9);
  const badLineO = Math.max(hookO, fO, rO * 0.35);

  // „Warum?“-Effekte
  const bieg = win(t, S(L, "y1") - 0.1, E(L, "y3"));
  const bal = win(t, S(L, "y2") - 0.1, E(L, "y3"));
  const vor = win(t, S(L, "y3") - 0.1, E(L, "y3"));
  const qY = pose(GOOD_P, sY);

  return (
    <g opacity={sceneO}>
      <Arena id="big" />
      {/* Ecke markieren */}
      {wO > 0 && (
        <g opacity={wO}>
          <circle cx={TX + 40} cy={TY + 40} r={150 + 12 * pulse} fill={COL.honey} opacity=".22" />
          <circle cx={TX + 40} cy={TY + 40} r={150} fill="none" stroke={COL.honey} strokeWidth="6" strokeDasharray="14 10" />
          <Pop t={t} a={S(L, "w") + 0.5} x={560} y={960} text="die Ecke" fill={COL.brownDeep} size={40} />
        </g>
      )}
      {/* falsche Linie */}
      <Line p={BAD_P} s={hookO > 0 ? sHook : fO > 0 ? badDraw : total(BAD_P)} col={BAD} dash o={badLineO} />
      {/* abgeschnittene Fläche */}
      {Math.max(xK, fO * ease((t - fA - 1.2) / 0.5)) > 0.01 && (
        <path d={`M${TX} ${TY + R_BAD} V${TY} H${TX + R_BAD} A${R_BAD} ${R_BAD} 0 0 0 ${TX} ${TY + R_BAD} Z`} fill={BAD} opacity={0.16 * Math.max(Math.min(1, xK), fO * ease((t - fA - 1.2) / 0.5))} />
      )}
      {/* richtige Linie */}
      <Line p={GOOD_P} s={rO > 0 && yO <= 0 ? Math.max(0, sR + 200) : total(GOOD_P)} col={GOOD} w={11} o={goodLineO} />

      {/* Pferde */}
      <Rider t={t} p={BAD_P} s={sHook} bad o={hookO} />
      <Rider t={t} p={BAD_P} s={sF} bad o={fO} />
      <Rider t={t} p={GOOD_P} s={sR} o={rO} />
      <Rider t={t} p={GOOD_P} s={sY} o={yO} />
      <Rider t={t} p={GOOD_P} s={sC} o={cO} />

      {/* Hook: X + Hinweis */}
      <XMark x={232} y={772} k={xK} r={44} />
      {hookO > 0 && (
        <g opacity={ease((t - S(L, "h2") + 0.1) / 0.4) * hookO}>
          <rect x={150} y={1330} width={780} height={96} rx="48" fill={COL.forestDeep} />
          <T x={540} y={1392} size={40} font={FONT_BODY} weight={700} color={PAPER}>Diesen Fehler machen viele Anfänger.</T>
        </g>
      )}
      {/* Falsch */}
      {fO > 0 && (
        <g opacity={fO}>
          <Pop t={t} a={at("f", "zu früh") - 0.1} x={470} y={1230} text="✗ zu früh abgebogen" fill={BAD} size={34} />
          <Pop t={t} a={at("f", "schneiden")} x={420} y={870} text="Ecke abgeschnitten" fill={BAD} size={30} />
        </g>
      )}
      {/* Richtig */}
      {rO > 0 && (
        <g opacity={rO}>
          <Pop t={t} a={S(L, "r2")} x={500} y={1180} text="auf dem Hufschlag bleiben" fill={GOOD} size={34} />
          <Pop t={t} a={at("r2", "gebogene")} x={560} y={1010} text="✓ gebogene Linie" fill={GOOD} size={34} />
        </g>
      )}
      {/* Warum: Biegung · Balance · Vorbereitung */}
      {yO > 0 && (
        <g opacity={yO}>
          {bieg > 0.01 && qY.arc > 0.05 && (
            <path d={`M${TX + R_GOOD + (R_GOOD - 46) * Math.cos(Math.PI * 1.08)} ${TY + R_GOOD + (R_GOOD - 46) * Math.sin(Math.PI * 1.08)} A${R_GOOD - 46} ${R_GOOD - 46} 0 0 1 ${TX + R_GOOD + (R_GOOD - 46) * Math.cos(Math.PI * 1.42)} ${TY + R_GOOD + (R_GOOD - 46) * Math.sin(Math.PI * 1.42)}`} fill="none" stroke={COL.honey} strokeWidth="9" strokeLinecap="round" opacity={bieg * qY.arc} />
          )}
          {vor > 0.01 && (
            <g opacity={vor}>
              <path d={`M${qY.pt[0] + 180} ${TY} H${Math.min(1040, qY.pt[0] + 420 + 14 * pulse)}`} stroke={COL.honey} strokeWidth="10" strokeLinecap="round" strokeDasharray="20 14" />
              <path d={`M${Math.min(1040, qY.pt[0] + 420 + 14 * pulse) - 26} ${TY - 22} L${Math.min(1040, qY.pt[0] + 420 + 14 * pulse) + 4} ${TY} L${Math.min(1040, qY.pt[0] + 420 + 14 * pulse) - 26} ${TY + 22}`} fill="none" stroke={COL.honey} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          )}
          {bal > 0.01 && (
            <g opacity={bal} transform={`translate(${qY.pt[0]} ${qY.pt[1]})`}>
              <circle r={34 + 4 * pulse} fill="none" stroke={COL.honey} strokeWidth="6" />
            </g>
          )}
          {[
            ["1", "Biegung", "das Pferd passt sich dem Bogen an", "y1"],
            ["2", "Balance", "du hilfst ihm im Gleichgewicht", "y2"],
            ["3", "Vorbereitung", "auf die nächste Linie oder Lektion", "y3"],
          ].map(([n, head, sub, id], i) => {
            const k = ease((t - S(L, id) + 0.1) / 0.4);
            if (k <= 0) return null;
            const y = 920 + i * 160;
            const cur = t >= S(L, id) - 0.1 && (i === 2 || t < S(L, ["y2", "y3"][i]) - 0.1);
            return (
              <g key={n} opacity={k * (cur ? 1 : 0.75)} transform={`translate(${(1 - k) * 60} 0)`}>
                <rect x={330} y={y - 62} width={690} height={130} rx="34" fill={cur ? COL.forest : PAPER} stroke={COL.forest} strokeWidth="4" />
                <circle cx={400} cy={y + 3} r="40" fill={COL.honey} />
                <T x={400} y={y + 20} size={46} color={COL.forestDeep}>{n}</T>
                <T x={465} y={y - 2} size={46} color={cur ? PAPER : COL.forestDeep} anchor="start">{head}</T>
                <T x={465} y={y + 42} size={28} font={FONT_BODY} weight={700} color={cur ? COL.sand : COL.inkSoft} anchor="start">{sub}</T>
              </g>
            );
          })}
        </g>
      )}
    </g>
  );
}

/* ---------- Split-Screen: abschneiden ✗ / ausreiten ✓ ---------- */
const PANEL_Y = 520;
const PANEL_H = 600;
const MS = 0.46; // Maßstab der kleinen Bahnen
function Panel({ t, x, good, o, label }: { t: number; x: number; good: boolean; o: number; label: string }) {
  const p = good ? GOOD_P : BAD_P;
  const len = total(p) - 300;
  const s = 380 + ((t * 300) % (len - 380));
  const pulse = 0.5 + 0.5 * Math.sin(t * 6);
  const qc = ease((t - S(L, "m1") - 0.6) / 0.8);
  const right = ease((t - S(L, "m2") + 0.05) / 0.5);
  const radius = good ? sm((t - S(L, "m3") - 0.4) / 0.6) : 0;
  const rr = R_GOOD + 70 * radius * (0.5 + 0.5 * Math.sin((t - S(L, "m3")) * 2.2));
  const rp = corner(rr);
  const id = good ? "pg" : "pb";
  return (
    <g opacity={o}>
      <defs>
        <clipPath id={`${id}-clip`}><rect x={x} y={PANEL_Y} width={470} height={PANEL_H} rx="30" /></clipPath>
      </defs>
      <rect x={x} y={PANEL_Y} width={470} height={PANEL_H} rx="30" fill={PAPER} />
      <g clipPath={`url(#${id}-clip)`}>
        <g transform={`translate(${x + 10 - FX * MS + 30} ${PANEL_Y + 110 - FY * MS}) scale(${MS})`}>
          <Arena id={id} />
          {!good && (
            <path d={`M${TX} ${TY + R_BAD} V${TY} H${TX + R_BAD} A${R_BAD} ${R_BAD} 0 0 0 ${TX} ${TY + R_BAD} Z`} fill={BAD} opacity=".16" />
          )}
          {good && qc > 0.01 && (
            <g opacity={qc}>
              <circle cx={TX + R_GOOD} cy={TY + R_GOOD} r={R_GOOD} fill="none" stroke={COL.honey} strokeWidth="6" strokeDasharray="12 12" />
              <path d={`M${TX + R_GOOD} ${TY + R_GOOD} L${TX + R_GOOD - R_GOOD * 0.707} ${TY + R_GOOD - R_GOOD * 0.707}`} stroke={COL.honey} strokeWidth="6" />
            </g>
          )}
          {good && right > 0.01 && (
            <g opacity={right * 0.9}>
              <path d={`M${TX - 18} ${TY + 330} V${TY - 18} H${TX + 330}`} fill="none" stroke={BAD} strokeWidth="10" strokeDasharray="18 14" />
            </g>
          )}
          <Line p={good && radius > 0 ? rp : p} s={total(p)} col={good ? GOOD : BAD} dash={!good} w={14} />
          <Rider t={t} p={good && radius > 0 ? rp : p} s={s} bad={!good} />
          {good && right > 0.01 && <XMark x={TX - 18} y={TY - 18} k={right} r={46} />}
        </g>
      </g>
      <rect x={x} y={PANEL_Y} width={470} height={PANEL_H} rx="30" fill="none" stroke={good ? GOOD : BAD} strokeWidth="6" />
      <rect x={x + 30} y={PANEL_Y + 22} width={410} height={70} rx="35" fill={good ? GOOD : BAD} />
      <T x={x + 235} y={PANEL_Y + 70} size={36} font={FONT_BODY} weight={700} color={PAPER}>{label}</T>
      {good && qc > 0.01 && (
        <g opacity={qc * (1 - right * 0.0)}>
          <rect x={x + 210} y={PANEL_Y + 480 + 4 * pulse} width={230} height={62} rx="31" fill={COL.honey} />
          <T x={x + 325} y={PANEL_Y + 522 + 4 * pulse} size={30} font={FONT_BODY} weight={700} color={COL.forestDeep}>¼ Kreis ✓</T>
        </g>
      )}
    </g>
  );
}

function Merke({ t }: { t: number }) {
  const a = S(L, "m0") - 0.2;
  const o = win(t, a, E(L, "m3") + 0.1, 0.35);
  if (o <= 0) return null;
  const k = ease((t - a) / 0.45);
  const k2 = ease((t - S(L, "m2") + 0.05) / 0.4);
  const k3 = ease((t - S(L, "m3") + 0.05) / 0.45);
  return (
    <g opacity={o}>
      <rect width={W} height={H} fill={COL.bg} />
      <g opacity={k} transform={`translate(0 ${(1 - k) * 30})`}>
        <rect x={380} y={150} width={320} height={64} rx="32" fill={COL.honey} />
        <T x={540} y={194} size={34} font={FONT_BODY} weight={700} color={COL.forestDeep}>MERKE</T>
        <T x={540} y={310} size={76}>Eine gute Ecke ist ein</T>
        <T x={540} y={404} size={84} color={GOOD} italic>Viertelkreis</T>
      </g>
      <g opacity={k2} transform={`translate(0 ${(1 - k2) * 20})`}>
        <T x={540} y={480} size={52} color={BAD}>– kein rechter Winkel!</T>
      </g>
      <g transform={`translate(0 30)`}>
        <Panel t={t} x={50} good={false} o={ease((t - S(L, "m0")) / 0.4)} label="Ecke abschneiden ✗" />
        <Panel t={t} x={560} good o={ease((t - S(L, "m0") - 0.2) / 0.4)} label="Ecke ausreiten ✓" />
      </g>
      <g opacity={k3} transform={`translate(0 ${(1 - k3) * 30})`}>
        <rect x={90} y={1200} width={900} height={190} rx="36" fill={COL.forest} />
        <T x={540} y={1272} size={40} color={PAPER}>Wie eng du sie reitest,</T>
        <T x={540} y={1340} size={36} font={FONT_BODY} weight={700} color={COL.sand}>hängt vom Ausbildungsstand deines Pferdes ab.</T>
      </g>
    </g>
  );
}

function Hook({ t }: { t: number }) {
  const o = win(t, 0, HOOK_END + 0.1, 0.35);
  if (o <= 0) return null;
  const k = (a: number) => ease((t - a) / 0.4);
  const f = back((t - at("h1", "falsch") + 0.1) / 0.45);
  return (
    <g opacity={o}>
      <g opacity={k(-0.9)} transform={`translate(0 ${(1 - k(-0.9)) * 30})`}>
        <T x={540} y={300} size={96}>Du reitest deine</T>
      </g>
      <g opacity={k(0.3)} transform={`translate(0 ${(1 - k(0.3)) * 30})`}>
        <T x={430} y={430} size={110} anchor="end">Ecken</T>
      </g>
      {f > 0.01 && (
        <g opacity={Math.min(1, f)} transform={`translate(470 400) scale(${Math.max(0.01, f)}) translate(-470 -400)`}>
          <T x={460} y={430} size={120} color={BAD} anchor="start" italic>falsch?!</T>
        </g>
      )}
      <g opacity={k(at("h1", "falsch") + 0.3)}>
        <T x={540} y={575} size={96}>🐎</T>
      </g>
    </g>
  );
}

function Ende({ t }: { t: number }) {
  const a = S(L, "c0") - 0.2;
  const k1 = ease((t - a) / 0.45);
  if (k1 <= 0) return null;
  const k2 = back((t - S(L, "c2") + 0.15) / 0.5);
  const kb = ease((t - S(L, "c2") - 1.0) / 0.5);
  const pulse = 1 + 0.025 * Math.sin(Math.max(0, t - S(L, "c2")) * 5);
  return (
    <g>
      <g opacity={k1} transform={`translate(0 ${(1 - k1) * 30})`}>
        <T x={540} y={270} size={80}>Und? Reitest du deine</T>
        <T x={540} y={370} size={80}>Ecken wirklich aus? 👀</T>
      </g>
      {k2 > 0.01 && (
        <g opacity={Math.min(1, k2)} transform={`translate(540 470) scale(${Math.max(0.01, k2) * pulse}) translate(-540 -470)`}>
          <rect x={150} y={410} width={780} height={150} rx="40" fill={BAD} />
          <path d="M200 440 h38 v64 l-19 -14 l-19 14 Z" fill={PAPER} />
          <T x={585} y={474} size={40} font={FONT_BODY} weight={700} color={PAPER}>Speichere dir das für</T>
          <T x={585} y={528} size={40} font={FONT_BODY} weight={700} color={PAPER}>deine nächste Reitstunde!</T>
        </g>
      )}
      <g opacity={kb} transform={`translate(0 ${(1 - kb) * 40})`}>
        <rect x={90} y={1560} width={900} height={170} rx="34" fill={COL.honey} />
        <path d="M150 1676 v-42 a26 26 0 0 1 52 0 v42" fill="none" stroke={COL.forestDeep} strokeWidth="9" strokeLinecap="round" />
        <T x={580} y={1636} size={54} color={COL.forestDeep}>Die Hofgeschichten</T>
        <T x={580} y={1696} size={32} font={FONT_BODY} weight={700} color={COL.brownDeep}>Reiten verstehen · Link in der Bio</T>
      </g>
    </g>
  );
}

export function renderEcke(t: number) {
  const hideHead = Math.max(win(t, 0, HOOK_END), win(t, S(L, "m0") - 0.2, E(L, "m3")), win(t, S(L, "c0") - 0.2, ECKE_TOTAL + 1));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      <BigScene t={t} />
      <Header t={t} label="Die Hofgeschichten · Reiten verstehen" hide={hideHead} />
      <Title t={t} a={S(L, "w") - 0.1} b={E(L, "w")} top="Was bedeutet eigentlich:" />
      {win(t, S(L, "w"), E(L, "w")) > 0 && (
        <g opacity={win(t, S(L, "w"), E(L, "w")) * ease((t - S(L, "w") - 0.3) / 0.4)}>
          <T x={540} y={470} size={96} color={GOOD} italic>Ecke ausreiten?</T>
        </g>
      )}
      <Title t={t} a={S(L, "f") - 0.2} b={E(L, "f") + 0.2} top="Falsch: zu früh abbiegen" sub="die Ecke wird abgeschnitten" color={BAD} />
      <Title t={t} a={S(L, "r1") - 0.1} b={E(L, "r2")} top="Richtig: Ecke ausreiten" sub="als gebogene Linie – nicht abschneiden" color={GOOD} />
      <Title t={t} a={S(L, "y0") - 0.1} b={E(L, "y3")} top="Warum?" sub="drei gute Gründe" />
      <Caption t={t} lines={L} skip={["h1", "h2", "w", "y0", "y1", "y2", "y3", "m0", "m1", "m2", "m3", "c0", "c1", "c2"]} y={1580} />
      <Merke t={t} />
      <Ende t={t} />
      <Hook t={t} />
    </svg>
  );
}
