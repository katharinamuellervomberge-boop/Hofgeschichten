import type { ReactNode } from "react";
import { GROUND, LEN, add, dir, mix, solve, up, type Joints, type P, type Pose } from "./kinematics";
import type { Anchor, Overlay, Prop, Tone, View } from "./types";

/* Farben aus dem Hofgeschichten-Designsystem (globals.css) */
export const C = {
  forest: "#344638",
  forestDeep: "#26342a",
  forestSoft: "#5e7360",
  meadow: "#9fae8a",
  sage: "#dde3d6",
  sand: "#d9c6a5",
  sandLight: "#e8dcc4",
  sandDeep: "#c4ac84",
  brown: "#80634d",
  brownDeep: "#5e4636",
  honey: "#c99a4e",
  rust: "#a4573a",
  paper: "#fbf8f1",
  ivory: "#f5f0e5",
  ink: "#2c2a24",
};
const SKIN = "#e8ae86";
const SKIN_SHADE = "#d49a74";
const HAIR = "#5a3420";
const TOP = C.forest;
const TOP_SHADE = "#2a3a2e";
const LEGS = C.brownDeep;
const LEGS_SHADE = "#4a372a";
const SHOE = C.paper;
const SHOE_SHADE = "#e4dccb";

export const toneColor = (t: Tone | undefined) => (t === "bad" ? C.rust : t === "hint" ? C.honey : C.forest);

const line = (a: P, b: P, col: string, w: number, key?: string) => (
  <path key={key} d={`M${a[0].toFixed(1)},${a[1].toFixed(1)} L${b[0].toFixed(1)},${b[1].toFixed(1)}`} stroke={col} strokeWidth={w} strokeLinecap="round" fill="none" />
);

function Foot({ an, he, to, col }: { an: P; he: P; to: P; col: string }) {
  const top = mix(an, to, 0.45);
  return (
    <path
      d={`M${an[0]},${an[1] - 2} L${he[0]},${he[1]} L${to[0]},${to[1]} Q${top[0]},${top[1] - 3} ${an[0]},${an[1] - 2} Z`}
      fill={col}
      stroke={col}
      strokeWidth="4"
      strokeLinejoin="round"
    />
  );
}

function Head({ c, face, front }: { c: P; face: P; front?: boolean }) {
  const [x, y] = c;
  if (front) {
    return (
      <g>
        <circle cx={x} cy={y} r="11.5" fill={SKIN} />
        <path d={`M${x - 11.5},${y - 1} C${x - 11},${y - 15} ${x + 11},${y - 15} ${x + 11.5},${y - 1} C${x + 6},${y - 8} ${x - 6},${y - 8} ${x - 11.5},${y - 1} Z`} fill={HAIR} />
        <circle cx={x - 4} cy={y + 1} r="1.4" fill={C.ink} />
        <circle cx={x + 4} cy={y + 1} r="1.4" fill={C.ink} />
        <path d={`M${x - 3},${y + 6} Q${x},${y + 8} ${x + 3},${y + 6}`} stroke={C.ink} strokeWidth="1.1" fill="none" strokeLinecap="round" />
      </g>
    );
  }
  const back: P = [-face[0], -face[1]];
  // Scheitel-Richtung (vom Hals weg): senkrecht zur Blickrichtung
  const crown: P = [face[1], -face[0]];
  const lying = Math.abs(crown[1]) < 0.55;
  const tail = add(c, back, 9);
  const tailPath = lying
    ? `M${tail[0] + crown[0] * 2},${tail[1]} q${crown[0] * 8},${1} ${crown[0] * 15},${2}`
    : `M${tail[0]},${tail[1] - 3} q${back[0] * 9},${back[1] * 9 + 6} ${back[0] * 5},${back[1] * 5 + 14}`;
  return (
    <g>
      <path d={tailPath} stroke={HAIR} strokeWidth="5.5" fill="none" strokeLinecap="round" />
      <circle cx={x} cy={y} r="11" fill={SKIN} />
      {/* Haarkappe zur Rückseite */}
      <path
        d={`M${x + back[0] * 11 + face[1] * 0},${y + back[1] * 11} A11 11 0 0 1 ${x - back[1] * 11},${y + back[0] * 11}`}
        stroke={HAIR}
        strokeWidth="7"
        fill="none"
        transform={`rotate(0 ${x} ${y})`}
      />
      <circle cx={x + face[0] * 6 - face[1] * -2} cy={y + face[1] * 6 + face[0] * -2} r="1.4" fill={C.ink} />
    </g>
  );
}

/** Seitliche Figur */
function SideBody({ j, pose }: { j: Joints; pose: Pose }) {
  const face = up(pose.tr + (pose.neck ?? 0) + 90);
  const tStart = mix(j.hip, j.sh, 0.12);
  return (
    <g>
      {/* hinterer Arm und hinteres Bein etwas dunkler */}
      {line(j.sh, j.el2, TOP_SHADE, 8.5)}
      {line(j.el2, j.ha2, SKIN_SHADE, 7)}
      {line(j.hip, j.kn2, LEGS_SHADE, 15)}
      {line(j.kn2, j.an2, LEGS_SHADE, 11)}
      <Foot an={j.an2} he={j.he2} to={j.to2} col={SHOE_SHADE} />
      <circle cx={j.hip[0]} cy={j.hip[1]} r="12.5" fill={LEGS} />
      <path d={`M${tStart[0]},${tStart[1]} Q${j.spineCtrl[0]},${j.spineCtrl[1]} ${j.sh[0]},${j.sh[1]}`} stroke={TOP} strokeWidth="25" strokeLinecap="round" fill="none" />
      {line(j.sh, j.head, SKIN, 7)}
      <Head c={j.head} face={face} />
      {line(j.hip, j.kn1, LEGS, 15)}
      {line(j.kn1, j.an1, LEGS, 11)}
      <Foot an={j.an1} he={j.he1} to={j.to1} col={SHOE} />
      {line(j.sh, j.el1, "#3d5242", 8.5)}
      {line(j.el1, j.ha1, SKIN, 7)}
      <circle cx={j.ha1[0]} cy={j.ha1[1]} r="4.2" fill={SKIN} />
    </g>
  );
}

/** Figur von vorn */
function FrontBody({ j }: { j: Joints }) {
  const n = 1;
  return (
    <g>
      {line(j.hip1, j.kn1, LEGS, 15 * n)}
      {line(j.kn1, j.an1, LEGS, 11)}
      {line(j.hip2, j.kn2, LEGS, 15)}
      {line(j.kn2, j.an2, LEGS, 11)}
      <ellipse cx={j.an1[0] - 2} cy={j.an1[1] + 4} rx="8" ry="5" fill={SHOE} stroke={SHOE_SHADE} strokeWidth="1.5" />
      <ellipse cx={j.an2[0] + 2} cy={j.an2[1] + 4} rx="8" ry="5" fill={SHOE} stroke={SHOE_SHADE} strokeWidth="1.5" />
      <path
        d={`M${j.hip1[0] - 3},${j.hip1[1] + 5} L${j.hip2[0] + 3},${j.hip2[1] + 5} L${j.hip2[0] + 4},${j.hip2[1] - 6} L${j.hip1[0] - 4},${j.hip1[1] - 6} Z`}
        fill={LEGS}
        stroke={LEGS}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <path
        d={`M${j.hip1[0] - 3},${j.hip1[1] - 6} L${j.sh1[0] - 2},${j.sh1[1] + 2} Q${j.sh[0]},${j.sh[1] - 6} ${j.sh2[0] + 2},${j.sh2[1] + 2} L${j.hip2[0] + 3},${j.hip2[1] - 6} Z`}
        fill={TOP}
        stroke={TOP}
        strokeWidth="8"
        strokeLinejoin="round"
      />
      {line(j.sh, add(j.head, [0, 8]), SKIN, 8)}
      <Head c={j.head} face={[0, 1]} front />
      {line(j.sh1, j.el1, "#3d5242", 8.5)}
      {line(j.el1, j.ha1, SKIN, 7)}
      {line(j.sh2, j.el2, "#3d5242", 8.5)}
      {line(j.el2, j.ha2, SKIN, 7)}
      <circle cx={j.ha1[0]} cy={j.ha1[1]} r="4.2" fill={SKIN} />
      <circle cx={j.ha2[0]} cy={j.ha2[1]} r="4.2" fill={SKIN} />
    </g>
  );
}

/* ---------- 90/90 am Boden (leicht von oben, von vorn) ---------- */

/** Projektion: x seitlich, z nach vorn (zum Betrachter), h Höhe */
const pr = (x: number, z: number, h: number): P => [180 + x * 1.25, 196 + z * 0.55 - h * 1.25];
function ninetyLegs(s: number) {
  // s = −1: linkes Bein vorn (Knie zeigen nach links/rechts …), +1: gespiegelt. Dazwischen stehen die Knie auf.
  const a = Math.abs(s);
  const sg = s < 0 ? -1 : 1;
  const lift = 1 - a; // 1 = Knie oben (Zwischenstellung)
  // Endstellung für sg = +1: rechtes Bein vorn (Oberschenkel nach vorn, Unterschenkel quer nach links),
  // linkes Bein seitlich (Oberschenkel nach links außen, Unterschenkel nach hinten)
  const front = { hipX: 9 * sg, knee: [9 * sg, 42, 4] as const, ank: [9 * sg - 40 * sg, 46, 4] as const };
  const side = { hipX: -9 * sg, knee: [-9 * sg - 42 * sg, 6, 4] as const, ank: [-9 * sg - 44 * sg, -34, 4] as const };
  const mid = (x: number) => ({ knee: [x * 26, 30, 38] as const, ank: [x * 34, 36, 4] as const });
  const blend = (e: readonly number[], m: readonly number[]) => e.map((v, i) => v + (m[i] - v) * lift);
  const mF = mid(sg);
  const mS = mid(-sg);
  return {
    front: { hip: pr(front.hipX, 0, 6), knee: pr(...(blend(front.knee, mF.knee) as [number, number, number])), ank: pr(...(blend(front.ank, mF.ank) as [number, number, number])) },
    side: { hip: pr(side.hipX, 0, 6), knee: pr(...(blend(side.knee, mS.knee) as [number, number, number])), ank: pr(...(blend(side.ank, mS.ank) as [number, number, number])) },
  };
}
function NinetyBody({ pose }: { pose: Pose }) {
  const s = pose.x?.s ?? 1;
  const lean = pose.x?.lean ?? 0;
  const L = ninetyLegs(s);
  const hipC = pr(0, 0, 6);
  const shC = add(hipC, up(lean), 70);
  const head = add(shC, up(lean), 21);
  const sh1: P = [shC[0] - 20, shC[1]];
  const sh2: P = [shC[0] + 20, shC[1]];
  // Hände leicht hinter dem Körper aufgestützt
  const ha1 = pr(-34, -18, 2);
  const ha2 = pr(34, -18, 2);
  const el1 = mix(sh1, ha1, 0.5);
  const el2 = mix(sh2, ha2, 0.5);
  const legs = [L.side, L.front].sort((a, b) => a.knee[1] - b.knee[1]);
  return (
    <g>
      <ellipse cx={hipC[0]} cy={hipC[1] + 10} rx="62" ry="10" fill={C.sand} opacity=".5" />
      {legs.map((l, i) => (
        <g key={i}>
          {line(l.hip, l.knee, i === 0 ? LEGS_SHADE : LEGS, 15)}
          {line(l.knee, l.ank, i === 0 ? LEGS_SHADE : LEGS, 11)}
          <ellipse cx={l.ank[0]} cy={l.ank[1] + 3} rx="8" ry="5" fill={i === 0 ? SHOE_SHADE : SHOE} />
        </g>
      ))}
      {line(sh1, [el1[0] - 4, el1[1]], "#3d5242", 8.5)}
      {line([el1[0] - 4, el1[1]], ha1, SKIN, 7)}
      {line(sh2, [el2[0] + 4, el2[1]], "#3d5242", 8.5)}
      {line([el2[0] + 4, el2[1]], ha2, SKIN, 7)}
      <path
        d={`M${hipC[0] - 14},${hipC[1] + 2} L${sh1[0]},${sh1[1] + 2} Q${shC[0]},${shC[1] - 6} ${sh2[0]},${sh2[1] + 2} L${hipC[0] + 14},${hipC[1] + 2} Z`}
        fill={TOP}
        stroke={TOP}
        strokeWidth="8"
        strokeLinejoin="round"
      />
      {line(shC, add(head, [0, 8]), SKIN, 8)}
      <Head c={head} face={[0, 1]} front />
      <g data-knees>
        <circle cx={L.front.knee[0]} cy={L.front.knee[1]} r="0" />
      </g>
    </g>
  );
}
export function ninetyKnees(pose: Pose) {
  const L = ninetyLegs(pose.x?.s ?? 1);
  return { front: L.front.knee, side: L.side.knee };
}

/* ---------- Requisiten ---------- */

function PropView({ p, view }: { p: Prop; view: View }) {
  if (p.k === "chair") {
    const w = p.w ?? 56;
    const x0 = p.x;
    const y = p.seat;
    const back = p.back ?? "left";
    const bx = back === "left" ? x0 : x0 + w;
    return (
      <g>
        <rect x={x0 - 2} y={y} width={w + 4} height="7" rx="3" fill={C.brown} />
        {line([x0 + 3, y + 6], [x0 + 3, GROUND], C.brownDeep, 4.5)}
        {line([x0 + w - 3, y + 6], [x0 + w - 3, GROUND], C.brownDeep, 4.5)}
        {line([bx, y + 2], [bx + (back === "left" ? -4 : 4), y - 58], C.brown, 6)}
        {line([bx - (back === "left" ? 1 : -1), y - 30], [bx + (back === "left" ? -3 : 3), y - 52], C.brown, 3)}
      </g>
    );
  }
  if (p.k === "wall") {
    const left = p.x < 180;
    return (
      <g>
        <rect x={left ? p.x - 40 : p.x} y="20" width="40" height={GROUND - 20} fill={C.sandLight} />
        {line([p.x, 20], [p.x, GROUND], C.sandDeep, 3)}
      </g>
    );
  }
  if (p.k === "mat") return <rect x={p.x0} y={GROUND - 3} width={p.x1 - p.x0} height="6" rx="3" fill={C.forestSoft} />;
  if (p.k === "backwall") {
    return (
      <g>
        <rect x="110" y="18" width="140" height={GROUND - 18} rx="6" fill={C.sandLight} />
        {view === "front" && <text x="180" y="32" textAnchor="middle" fontSize="9" fill={C.brown} fontFamily="system-ui">Wand</text>}
      </g>
    );
  }
  return null;
}

function Glass({ j, pose }: { j: Joints; pose: Pose }) {
  const c = mix(j.ha1, j.ha2, 0.5);
  const tilt = pose.x?.gl ?? 0;
  const slosh = pose.x?.slosh ?? 0;
  const cx = c[0] + 8;
  const cy = c[1] - 14;
  // Wasseroberfläche bleibt waagerecht (Welt), schwappt bei Unruhe
  const id = "rl-glass";
  return (
    <g>
      <defs>
        <clipPath id={id}>
          <path d="M-11,-16 L11,-16 L8,16 L-8,16 Z" transform={`translate(${cx} ${cy}) rotate(${tilt})`} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <path d={`M${cx - 30},${cy + 1 + slosh} Q${cx},${cy + 1 - slosh * 1.6} ${cx + 30},${cy + 1 - slosh} L${cx + 30},${cy + 40} L${cx - 30},${cy + 40} Z`} fill="#8fb0c2" opacity=".85" />
      </g>
      <path d="M-11,-16 L11,-16 L8,16 L-8,16 Z" transform={`translate(${cx} ${cy}) rotate(${tilt})`} fill="rgba(255,255,255,.25)" stroke="#7f98a6" strokeWidth="2" strokeLinejoin="round" />
    </g>
  );
}

/* ---------- Markierungen ---------- */

const anchor = (j: Joints, a: Anchor): P => {
  if (typeof a === "string") return j[a];
  if (typeof a[0] === "string") {
    const [k, dx, dy] = a as [keyof Joints, number, number];
    return [j[k][0] + dx, j[k][1] + dy];
  }
  return a as P;
};

function inWin(o: Overlay, t: number) {
  return (o.from === undefined || t >= o.from) && (o.to === undefined || t <= o.to);
}

function OverlayView({ o, j, pose, t, trace }: { o: Overlay; j: Joints; pose: Pose; t: number; trace?: P[] }): ReactNode {
  const col = toneColor(o.tone);
  const pulse = 0.5 + 0.5 * Math.sin(t * 5);
  switch (o.k) {
    case "ring": {
      const p = anchor(j, o.at);
      const r = o.r ?? 12;
      return (
        <g>
          <circle cx={p[0]} cy={p[1]} r={r + pulse * 2.5} fill="none" stroke={col} strokeWidth="2.6" />
          <circle cx={p[0]} cy={p[1]} r={r * 0.32} fill={col} opacity=".45" />
        </g>
      );
    }
    case "dot": {
      const p = anchor(j, o.at);
      return <circle cx={p[0]} cy={p[1]} r={o.r ?? 4} fill={col} stroke={C.paper} strokeWidth="1.5" />;
    }
    case "arrow": {
      const s = add(anchor(j, o.at), o.o ?? [0, 0]);
      const e = add(s, o.d);
      const L = Math.hypot(o.d[0], o.d[1]) || 1;
      const ux = o.d[0] / L;
      const uy = o.d[1] / L;
      const h = 7;
      return (
        <g stroke={col} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d={`M${s[0]},${s[1]} L${e[0] - ux * 2},${e[1] - uy * 2}`} />
          <path d={`M${e[0] - ux * h - uy * h * 0.7},${e[1] - uy * h + ux * h * 0.7} L${e[0]},${e[1]} L${e[0] - ux * h + uy * h * 0.7},${e[1] - uy * h - ux * h * 0.7}`} />
        </g>
      );
    }
    case "arc": {
      const c = anchor(j, o.at);
      const pt = (a: number): P => [c[0] + Math.cos((a * Math.PI) / 180) * o.r, c[1] + Math.sin((a * Math.PI) / 180) * o.r];
      const s = pt(o.a0);
      const e = pt(o.a1);
      const sweep = o.a1 > o.a0 ? 1 : 0;
      const large = Math.abs(o.a1 - o.a0) > 180 ? 1 : 0;
      const tan = (o.a1 > o.a0 ? 1 : -1) * 90 + o.a1;
      const tx = Math.cos((tan * Math.PI) / 180);
      const ty = Math.sin((tan * Math.PI) / 180);
      return (
        <g stroke={col} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={`M${s[0]},${s[1]} A${o.r} ${o.r} 0 ${large} ${sweep} ${e[0]},${e[1]}`} />
          <path d={`M${e[0] - tx * 7 - ty * 5},${e[1] - ty * 7 + tx * 5} L${e[0]},${e[1]} L${e[0] - tx * 7 + ty * 5},${e[1] - ty * 7 - tx * 5}`} />
        </g>
      );
    }
    case "glow": {
      const a = anchor(j, o.a);
      const b = anchor(j, o.b);
      return (
        <path
          d={`M${a[0]},${a[1]} L${b[0]},${b[1]}`}
          stroke={col}
          strokeWidth={(o.w ?? 18) + (o.pulse ? pulse * 4 : 0)}
          strokeLinecap="round"
          opacity={o.pulse ? 0.25 + pulse * 0.2 : 0.35}
        />
      );
    }
    case "plumb": {
      const p = anchor(j, o.at);
      return (
        <g>
          <path d={`M${p[0]},${p[1]} L${p[0]},${GROUND}`} stroke={col} strokeWidth="2" strokeDasharray="4 4" />
          <circle cx={p[0]} cy={p[1]} r="5.5" fill={col} stroke={C.paper} strokeWidth="2" />
          <path d={`M${p[0] - 7},${GROUND} L${p[0] + 7},${GROUND}`} stroke={col} strokeWidth="3" strokeLinecap="round" />
        </g>
      );
    }
    case "level": {
      const a = anchor(j, o.a);
      const b = anchor(j, o.b);
      const e = o.ext ?? 18;
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      const ux = (b[0] - a[0]) / L;
      const uy = (b[1] - a[1]) / L;
      return <path d={`M${a[0] - ux * e},${a[1] - uy * e} L${b[0] + ux * e},${b[1] + uy * e}`} stroke={col} strokeWidth="2.6" strokeDasharray="6 4" strokeLinecap="round" />;
    }
    case "trace": {
      if (!trace || trace.length < 2) return null;
      const d = "M" + trace.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" L");
      const p = j[o.at];
      return (
        <g>
          <path d={d} stroke={col} strokeWidth="2.4" fill="none" strokeDasharray="3 3" opacity=".9" />
          <circle cx={p[0]} cy={p[1]} r="3" fill={col} />
        </g>
      );
    }
    case "text": {
      const p = add(anchor(j, o.at), o.o ?? [0, 0]);
      const w = o.text.length * 5.6 + 14;
      return (
        <g>
          <rect x={p[0] - w / 2} y={p[1] - 10} width={w} height="18" rx="9" fill={col} />
          <text x={p[0]} y={p[1] + 3} textAnchor="middle" fontSize="10.5" fontWeight="700" fill={C.paper} fontFamily="var(--font-body), system-ui, sans-serif">
            {o.text}
          </text>
        </g>
      );
    }
    case "spine": {
      // Linie am Rücken: von Kreuzbein über die Lendenkrümmung bis zwischen die Schulterblätter
      const back = up(pose.tr - 90);
      const a = add(j.hip, back, 12);
      const c = add(j.spineCtrl, back, 13);
      const b = add(j.sh, back, 11);
      return <path d={`M${a[0]},${a[1]} Q${c[0]},${c[1]} ${b[0]},${b[1]}`} stroke={col} strokeWidth="2.6" fill="none" strokeDasharray="5 4" strokeLinecap="round" />;
    }
    case "pelvis": {
      const a = pose.tr + (pose.pt ?? 0);
      return (
        <g transform={`translate(${j.hip[0]} ${j.hip[1]}) rotate(${a})`} opacity=".92">
          <path d="M-12,8 C-15,-4 -11,-16 0,-19 C9,-17 14,-8 12,4 C8,10 -6,12 -12,8 Z" fill="none" stroke={col} strokeWidth="2.6" />
          <path d="M0,-19 L0,10" stroke={col} strokeWidth="1.6" strokeDasharray="2 3" />
        </g>
      );
    }
    case "press": {
      const an = j[o.at];
      const cx = an[0] + (o.at === "an1" ? -2 : 2);
      const cy = an[1] + 9;
      return (
        <g fill={col}>
          {[
            [-6, 0],
            [6, 0],
            [0, 3],
          ].map(([dx, dy], i) => (
            <circle key={i} cx={cx + dx} cy={cy + dy} r={2.2 + pulse * 1.3} opacity={0.55 + pulse * 0.35} />
          ))}
        </g>
      );
    }
    case "clock": {
      const [x, y] = o.at;
      const a = ((pose.x?.clk ?? 0) - 90) * (Math.PI / 180);
      const r = 22;
      return (
        <g>
          <circle cx={x} cy={y} r={r + 8} fill={C.paper} stroke={C.sandDeep} strokeWidth="1.5" />
          <circle cx={x} cy={y} r={r} fill="none" stroke={C.sand} strokeWidth="1.5" strokeDasharray="2 3" />
          {[0, 90, 180, 270].map((d) => {
            const aa = ((d - 90) * Math.PI) / 180;
            return <circle key={d} cx={x + Math.cos(aa) * r} cy={y + Math.sin(aa) * r} r="1.8" fill={C.brown} />;
          })}
          <text x={x} y={y - r - 11} textAnchor="middle" fontSize="8" fill={C.brown} fontFamily="system-ui">12 · vorn</text>
          <text x={x} y={y + r + 18} textAnchor="middle" fontSize="8" fill={C.brown} fontFamily="system-ui">6 · hinten</text>
          <circle cx={x + Math.cos(a) * r} cy={y + Math.sin(a) * r} r="5" fill={col} stroke={C.paper} strokeWidth="1.5" />
          <circle cx={x} cy={y} r="2" fill={C.brown} />
        </g>
      );
    }
    case "scapula": {
      const sc = pose.x?.sc ?? 0;
      const one = (p: P, side: number) => (
        <g transform={`translate(${p[0] - side * 9} ${p[1] + 14}) rotate(${-side * sc})`}>
          <path d={`M${-side * 2},-9 L${side * 9},-8 L${side * 1},14 Z`} fill={col} opacity=".55" stroke={col} strokeWidth="1.6" strokeLinejoin="round" />
        </g>
      );
      return (
        <g>
          {one(j.sh1, -1)}
          {one(j.sh2, 1)}
        </g>
      );
    }
  }
}

/** Komplette Szene einer Pose */
export function FigureScene({
  view,
  pose,
  props,
  overlays,
  t,
  traces,
}: {
  view: View;
  pose: Pose;
  props?: Prop[];
  overlays?: Overlay[];
  t: number;
  traces?: Partial<Record<string, P[]>>;
}) {
  const j = view === "ninety" ? solve(pose, "side") : solve(pose, view === "front" ? "front" : "side");
  if (view === "ninety") {
    const k = ninetyKnees(pose);
    const jj = { ...j, kn1: k.side, kn2: k.front } as Joints;
    return (
      <g>
        <ellipse cx="180" cy="210" rx="120" ry="20" fill={C.forestSoft} opacity=".9" />
        <NinetyBody pose={pose} />
        {(overlays ?? []).filter((o) => inWin(o, t)).map((o, i) => (
          <OverlayView key={i} o={o} j={jj} pose={pose} t={t} />
        ))}
      </g>
    );
  }
  const behind = (props ?? []).filter((p) => p.k !== "glass");
  const glass = (props ?? []).some((p) => p.k === "glass");
  const pre = (overlays ?? []).filter((o) => inWin(o, t) && (o.k === "glow" || o.k === "scapula"));
  const post = (overlays ?? []).filter((o) => inWin(o, t) && o.k !== "glow" && o.k !== "scapula");
  return (
    <g>
      {behind.map((p, i) => (
        <PropView key={i} p={p} view={view} />
      ))}
      {view === "front" ? <FrontBody j={j} /> : <SideBody j={j} pose={pose} />}
      {pre.map((o, i) => (
        <OverlayView key={`a${i}`} o={o} j={j} pose={pose} t={t} />
      ))}
      {glass && <Glass j={j} pose={pose} />}
      {post.map((o, i) => (
        <OverlayView key={`b${i}`} o={o} j={j} pose={pose} t={t} trace={o.k === "trace" ? traces?.[o.at] : undefined} />
      ))}
    </g>
  );
}

export { LEN, dir };
