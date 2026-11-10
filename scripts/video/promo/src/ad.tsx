/* Werbe-Ad „Reitakademie → Reitertagebuch → Rider Lab“ (9:16, ~17 s) – ohne Preis, Hook ab Bild 0. */
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import type { CSSProperties, ReactNode } from "react";
import { riderLabAreas } from "@/content/riderlab/uebungen.server";
import { FigureScene } from "@/features/riderlab/Figure";
import { GROUND, loopLength, poseAt } from "@/features/riderlab/kinematics";
import type { Exercise } from "@/features/riderlab/types";

const W = 1080;
const H = 1920;
const C = {
  bg: "#f3ede4",
  ivory: "#f5f0e5",
  paper: "#fbf8f1",
  forest: "#344638",
  forestDeep: "#26342a",
  sage: "#dde3d6",
  sand: "#d9c6a5",
  sandLight: "#e8dcc4",
  honey: "#c99a4e",
  rust: "#a4573a",
  brown: "#80634d",
  ink: "#2c2a24",
};
const DISPLAY = "FrauncesL, Georgia, serif";
const BODY = "Inter, system-ui, sans-serif";

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const sm = (u: number) => {
  const x = clamp(u);
  return x * x * (3 - 2 * x);
};
const back = (u: number) => {
  const x = clamp(u);
  const c = 1.7;
  return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2);
};
const win = (t: number, a: number, b: number, d = 0.18) => clamp((t - a) / d) * clamp((b - t) / d);

/* Anzahl Bilder je Aufnahme (wird vom Renderer gesetzt) */
declare global {
  interface Window {
    __counts: Record<string, number>;
    __setT: (t: number) => Promise<void>;
    __total: number;
    __ready: Promise<void>;
  }
}

function takeSrc(name: string, t: number, start: number, speed = 1, offset = 0) {
  const n = window.__counts?.[name] ?? 1;
  const i = Math.max(0, Math.min(n - 1, Math.floor((t - start) * 30 * speed + offset)));
  return `/takes/${name}/${String(i).padStart(4, "0")}.jpg`;
}

/* ---------- Bausteine ---------- */

const abs = (s: CSSProperties): CSSProperties => ({ position: "absolute", ...s });

function Txt({ children, s }: { children: ReactNode; s: CSSProperties }) {
  return <div style={abs({ fontFamily: DISPLAY, color: C.forestDeep, textAlign: "center", left: 0, right: 0, ...s })}>{children}</div>;
}
function Eyebrow({ text, y, o = 1, color = C.brown }: { text: string; y: number; o?: number; color?: string }) {
  return (
    <div style={abs({ left: 0, right: 0, top: y, textAlign: "center", fontFamily: BODY, fontWeight: 800, letterSpacing: 4, fontSize: 30, color, opacity: o })}>
      {text}
    </div>
  );
}
function Pill({ text, x, y, bg, color, size = 34, k = 1, o = 1 }: { text: string; x: number; y: number; bg: string; color: string; size?: number; k?: number; o?: number }) {
  return (
    <div
      style={abs({
        left: x,
        top: y,
        transform: `translate(-50%,-50%) scale(${k})`,
        background: bg,
        color,
        fontFamily: BODY,
        fontWeight: 800,
        fontSize: size,
        padding: `${size * 0.42}px ${size * 0.9}px`,
        borderRadius: 999,
        whiteSpace: "nowrap",
        opacity: o,
        boxShadow: "0 10px 30px rgba(38,52,42,.18)",
      })}
    >
      {text}
    </div>
  );
}
/** Wort mit honigfarbener Unterstreichung, die sich zeichnet */
function Mark({ children, u }: { children: ReactNode; u: number }) {
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span style={abs({ left: -4, right: -4, bottom: "0.06em", height: "0.28em", background: C.honey, opacity: 0.55, transformOrigin: "left", transform: `scaleX(${sm(u)})`, borderRadius: 8 })} />
      <span style={{ position: "relative" }}>{children}</span>
    </span>
  );
}
function Caption({ eyebrow, title, t, a, y = 150 }: { eyebrow: string; title: ReactNode; t: number; a: number; y?: number }) {
  const k = sm((t - a) / 0.3);
  return (
    <>
      <Eyebrow text={eyebrow} y={y} o={k} />
      <Txt s={{ top: y + 46, fontSize: 82, lineHeight: 1.04, fontWeight: 600, opacity: k, transform: `translateY(${(1 - k) * 30}px)`, padding: "0 50px" }}>{title}</Txt>
    </>
  );
}

/** Handy mit echter App-Aufnahme */
function Phone({ src, x = 540, y = 1190, w = 640, k = 1, rot = 0, o = 1 }: { src: string; x?: number; y?: number; w?: number; k?: number; rot?: number; o?: number }) {
  const sw = w - 36;
  const sh = sw * (844 / 390);
  return (
    <div
      style={abs({
        left: x - w / 2,
        top: y - (sh + 36) / 2,
        width: w,
        height: sh + 36,
        borderRadius: 78,
        background: C.forestDeep,
        boxShadow: "0 40px 90px rgba(38,52,42,.35), inset 0 0 0 3px #3d5242",
        transform: `scale(${k}) rotate(${rot}deg)`,
        opacity: o,
      })}
    >
      <img src={src} alt="" style={abs({ left: 18, top: 18, width: sw, height: sh, borderRadius: 62, objectFit: "cover", background: C.bg })} />
    </div>
  );
}

/** Übungsanimation groß (echte Rider-Lab-Animation) */
function Anim({ ex, t, bad, x, y, w, h, crop = [20, 20, 320, 230] }: { ex: Exercise; t: number; bad?: boolean; x: number; y: number; w: number; h: number; crop?: [number, number, number, number] }) {
  const a = ex.anim;
  const frames = bad && a.mistake ? a.mistake.frames : a.frames;
  const ov = bad && a.mistake ? a.mistake.overlays : a.overlays;
  const T = loopLength(frames);
  const { pose } = poseAt(frames, t, a.view === "front" ? "front" : "side");
  return (
    <svg viewBox={crop.join(" ")} width={w} height={h} style={abs({ left: x, top: y })}>
      <rect x="0" y="0" width="360" height="260" fill={C.ivory} />
      <rect x="0" y={GROUND} width="360" height={260 - GROUND} fill={C.sandLight} />
      <FigureScene view={a.view} pose={pose} props={a.props} overlays={ov} t={T > 0 ? t % T : 0} />
    </svg>
  );
}


/* Konfetti (deterministisch) */
function Confetti({ t, a, x = 540, y = 900 }: { t: number; a: number; x?: number; y?: number }) {
  const dt = t - a;
  if (dt < 0 || dt > 1.8) return null;
  const cols = [C.honey, C.forest, C.rust, C.sage, C.sand];
  return (
    <>
      {Array.from({ length: 46 }).map((_, i) => {
        const ang = (i * 137.5 * Math.PI) / 180;
        const sp = 520 + ((i * 53) % 380);
        const px = x + Math.cos(ang) * sp * dt;
        const py = y + Math.sin(ang) * sp * dt * 0.8 + 900 * dt * dt;
        return (
          <div
            key={i}
            style={abs({ left: px, top: py, width: 18, height: 10, background: cols[i % 5], borderRadius: 3, transform: `rotate(${i * 40 + dt * 600}deg)`, opacity: clamp(1.6 - dt) })}
          />
        );
      })}
    </>
  );
}

/* ---------- Zeitplan (Stimme beginnt bei 0, atempo 1,1) ---------- */
const S = {
  hook: [0, 3.62],
  ak: [3.62, 6.86],
  tb: [6.86, 9.8],
  rl: [9.8, 13.36],
  end: [13.36, 16.9],
} as const;
export const TOTAL = S.end[1];

const EX = Object.fromEntries(riderLabAreas.flatMap((a) => a.exercises.map((e) => [e.slug, e]))) as Record<string, Exercise>;

/** Kurzer Zoom-Punch am Szenenstart */
const punch = (l: number, k = 0.07) => 1 + k * (1 - sm(l / 0.22));
const shake = (t: number, a: number) => (a > 0 ? Math.sin(t * 70) * a : 0);

function Bar({ t, fill, col, y, label, o = 1 }: { t: number; fill: number; col: string; y: number; label: string; o?: number }) {
  return (
    <div style={abs({ left: 120, right: 120, top: y, opacity: o })}>
      <div style={{ fontFamily: BODY, fontWeight: 800, fontSize: 34, color: C.brown, display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <span>{label}</span>
        <span style={{ color: col }}>{Math.round(fill * 100)} %</span>
      </div>
      <div style={{ height: 46, borderRadius: 23, background: C.sandLight, overflow: "hidden", boxShadow: "inset 0 2px 6px rgba(38,52,42,.12)" }}>
        <div style={{ height: "100%", width: `${Math.max(4, fill * 100)}%`, background: col, borderRadius: 23 }} />
      </div>
    </div>
  );
}

function Slam({ text, sub, l, bg, color = C.paper }: { text: ReactNode; sub?: string; l: number; bg: string; color?: string }) {
  return (
    <div style={abs({ inset: 0, background: bg })}>
      {sub && <Pill text={sub} x={540} y={720} bg={C.honey} color={C.forestDeep} size={34} k={back(l / 0.2)} />}
      <Txt s={{ top: 790, fontSize: 150, fontWeight: 600, color, lineHeight: 0.98, letterSpacing: -2, transform: `scale(${0.7 + 0.3 * back(l / 0.22)})` }}>{text}</Txt>
      <div style={abs({ inset: 0, background: C.paper, opacity: clamp(1 - l / 0.16) * 0.7 })} />
    </div>
  );
}

function Frame({ t }: { t: number }) {
  const o = (k: keyof typeof S) => win(t, S[k][0], S[k][1], 0.05);
  const lt = (k: keyof typeof S) => t - S[k][0];
  const out: ReactNode[] = [];

  /* 1 · Hook – ab Bild 0 voll sichtbar */
  if (o("hook") > 0 || t < 0.05) {
    const l = t;
    const stuck = l > 2.55;
    const fill = 0.23 * sm(l / 1.0) + (stuck ? 0 : 0);
    out.push(
      <div key="h" style={abs({ inset: 0, background: C.bg, transform: `scale(${1 + 0.012 * l})` })}>
        <Txt s={{ top: 230, fontSize: 116, fontWeight: 600 }}>Reitest du</Txt>
        <Txt s={{ top: 370, fontSize: 150, fontWeight: 600, color: C.rust, letterSpacing: -3, whiteSpace: "nowrap", opacity: l > 0.62 ? 1 : 0, transform: `scale(${back((l - 0.62) / 0.18)})` }}>SEIT JAHREN</Txt>
        <Txt s={{ top: 560, fontSize: 76, fontWeight: 600, opacity: l > 1.62 ? 1 : 0, transform: `translateY(${(1 - sm((l - 1.62) / 0.15)) * 30}px)` }}>
          …und kommst {l > 2.18 ? "einfach" : ""}
        </Txt>
        <div style={abs({ left: 0, right: 0, top: 660, transform: `translateX(${shake(t, stuck ? 9 * clamp(1 - (l - 2.55) / 0.8) : 0)}px)` })}>
          <Txt s={{ top: 0, fontSize: 112, fontWeight: 600, color: C.forestDeep, letterSpacing: -2, whiteSpace: "nowrap", opacity: stuck ? 1 : 0, transform: `scale(${back((l - 2.55) / 0.18)})` }}>
            <Mark u={(l - 2.8) / 0.3}>NICHT WEITER?</Mark>
          </Txt>
        </div>
        <Bar t={t} fill={fill} col={stuck ? C.rust : C.honey} y={900} label={stuck ? "Dein Fortschritt · hängt fest" : "Dein Fortschritt"} />
        {/* wackelnde Reiterin (Fehler) */}
        <div style={abs({ left: 140, top: 1080, width: 800, height: 640, borderRadius: 40, overflow: "hidden", background: C.ivory, border: `6px solid ${stuck ? C.rust : C.sandLight}` })}>
          <Anim ex={EX["wasserglas-challenge"]} bad t={1.2 + l * 1.4} x={0} y={0} w={788} h={628} crop={[95, 25, 170, 150]} />
          {stuck && <Pill text="✗ wackelig" x={640} y={70} bg={C.rust} color={C.paper} size={34} k={back((l - 2.6) / 0.2)} />}
        </div>
      </div>,
    );
  }

  /* 2 · Reitakademie */
  if (o("ak") > 0) {
    const l = lt("ak");
    const hilfe = 4.86 - S.ak[0];
    out.push(
      <div key="ak" style={abs({ inset: 0, background: C.bg, opacity: o("ak"), transform: `scale(${punch(l)})` })}>
        {l < 0.55 ? (
          <Slam l={l} bg={C.forestDeep} sub="DIE HOFGESCHICHTEN" text={<>Reit&shy;akademie</>} />
        ) : l < hilfe ? (
          <>
            <Eyebrow text="DIE REITAKADEMIE" y={140} color={C.forest} />
            <Txt s={{ top: 186, fontSize: 92, fontWeight: 600, lineHeight: 1 }}>
              <span style={{ color: C.honey }}>{Math.round(81 * sm((l - 0.55) / 0.6))}</span> Lektionen
            </Txt>
            <Phone src={takeSrc("akademie", t, S.ak[0] + 0.55, 2.4, 10)} y={1180 + 500 * (1 - back((l - 0.55) / 0.3))} w={640} />
          </>
        ) : (
          <>
            <Eyebrow text="DIE REITAKADEMIE" y={150} color={C.forest} />
            <Txt s={{ top: 196, fontSize: 92, fontWeight: 600, lineHeight: 1.02, padding: "0 40px" }}>
              Jede Hilfe
              <br />
              <Mark u={(l - hilfe - 0.5) / 0.35}>verständlich</Mark> erklärt
            </Txt>
            <div style={abs({ left: 40, top: 470, width: 1000, height: 880, borderRadius: 56, overflow: "hidden", boxShadow: "0 30px 80px rgba(38,52,42,.22)", transform: `scale(${0.92 + 0.08 * back((l - hilfe) / 0.25)})` })}>
              <img src={takeSrc("reel", t, S.ak[0] + hilfe, 1.25, 4)} style={abs({ left: -60, top: -370, width: 1120 })} />
            </div>
            <Pill text="✓ animiert · Schritt für Schritt" x={540} y={1450} bg={C.forest} color={C.paper} size={40} k={back((l - hilfe - 0.6) / 0.25)} />
            <Pill text="81 Lektionen & Lernvideos" x={540} y={1570} bg={C.sandLight} color={C.brown} size={34} k={back((l - hilfe - 0.9) / 0.25)} />
          </>
        )}
      </div>,
    );
  }

  /* 3 · Reitertagebuch */
  if (o("tb") > 0) {
    const l = lt("tb");
    const fort = 8.28 - S.tb[0];
    out.push(
      <div key="tb" style={abs({ inset: 0, background: C.bg, opacity: o("tb"), transform: `scale(${punch(l)})` })}>
        {l < 0.5 ? (
          <Slam l={l} bg={C.honey} color={C.forestDeep} sub="📖 DEIN" text={<>Reiter&shy;tagebuch</>} />
        ) : l < fort ? (
          <>
            <Eyebrow text="DEIN REITERTAGEBUCH" y={140} color={C.forest} />
            <Txt s={{ top: 186, fontSize: 88, fontWeight: 600, lineHeight: 1 }}>Jede Stunde notiert</Txt>
            <Phone src={takeSrc("tbhome", t, S.tb[0] + 0.5, 1.6)} y={1170 + 500 * (1 - back((l - 0.5) / 0.3))} w={640} rot={-2} />
          </>
        ) : (
          <>
            <Eyebrow text="DEIN REITERTAGEBUCH" y={140} color={C.forest} />
            <Txt s={{ top: 186, fontSize: 92, fontWeight: 600, lineHeight: 1 }}>
              Fortschritt <Mark u={(l - fort - 0.6) / 0.3}>sichtbar</Mark>
            </Txt>
            <Phone src={takeSrc("entwicklung", t, S.tb[0] + fort, 1.6)} y={1150} w={600} k={0.94 + 0.06 * sm((l - fort) / 0.3)} />
            <div style={abs({ left: 60, right: 60, top: 1500, height: 230, borderRadius: 40, background: C.paper, boxShadow: "0 20px 50px rgba(38,52,42,.18)", transform: `scale(${back((l - fort - 0.1) / 0.25)})` })}>
              <Bar t={t} fill={0.23 + 0.77 * sm((l - fort - 0.25) / 0.8)} col={C.forest} y={40} label="Dein Fortschritt ✓" />
            </div>
          </>
        )}
      </div>,
    );
  }

  /* 4 · Rider Lab */
  if (o("rl") > 0) {
    const l = lt("rl");
    const rev = 10.62 - S.rl[0];
    const mont = 11.74 - S.rl[0];
    const list: Array<[string, number, [number, number, number, number]]> = [
      ["beckenuhr", 0.6, [40, 0, 330, 330]],
      ["dead-bug", 1.4, [60, 60, 270, 270]],
      ["reiter-hocke", 2.4, [70, 10, 270, 270]],
    ];
    out.push(
      <div key="rl" style={abs({ inset: 0, background: `radial-gradient(120% 80% at 50% 40%, #3b5040 0%, ${C.forestDeep} 70%)`, opacity: o("rl") })}>
        {l < rev ? (
          <>
            <Txt s={{ top: 780, fontSize: 130, fontWeight: 600, color: C.honey, transform: `scale(${back(l / 0.2) * (1 + 0.08 * clamp((l - 0.2) / 0.6))}) translateX(${shake(t, 4)}px)` }}>Und neu:</Txt>
          </>
        ) : l < mont ? (
          <div style={abs({ inset: 0, transform: `scale(${punch(l - rev, 0.12)})` })}>
            <Pill text="NEU IN DER REITAKADEMIE" x={540} y={620} bg={C.honey} color={C.forestDeep} size={34} k={back((l - rev) / 0.25)} />
            <Txt s={{ top: 700, fontSize: 230, fontWeight: 600, color: C.paper, letterSpacing: -4, lineHeight: 0.92 }}>
              RIDER
              <br />
              LAB
            </Txt>
            <div style={abs({ inset: 0, background: C.paper, opacity: clamp(1 - (l - rev) / 0.22) * 0.85 })} />
          </div>
        ) : (
          (() => {
            const ll = l - mont;
            const seg = 0.5;
            const i = Math.min(list.length - 1, Math.floor(ll / seg));
            const [slug, off, crop] = list[i];
            return (
              <>
                <Txt s={{ top: 150, fontSize: 92, fontWeight: 600, color: C.paper, lineHeight: 1.02 }}>
                  Dein Training
                  <br />
                  <span style={{ color: C.honey }}>ohne Pferd</span>
                </Txt>
                <div style={abs({ left: 90, top: 440, width: 900, height: 900, borderRadius: 60, overflow: "hidden", background: C.ivory, transform: `scale(${punch(ll - i * seg, 0.06)})` })}>
                  <Anim ex={EX[slug]} t={off + (ll - i * seg) * 1.6} x={0} y={0} w={900} h={900} crop={crop} />
                </div>
                <Pill text="20 Übungen · 5 Bereiche" x={540} y={1460} bg={C.honey} color={C.forestDeep} size={44} k={back(ll / 0.25)} />
                <Pill text="mit Timer · für zu Hause" x={540} y={1580} bg={C.paper} color={C.forestDeep} size={34} k={back((ll - 0.3) / 0.25)} />
              </>
            );
          })()
        )}
      </div>,
    );
  }

  /* 5 · Ende */
  if (o("end") > 0) {
    const l = lt("end");
    const link = 14.5 - S.end[0];
    out.push(
      <div key="e" style={abs({ inset: 0, background: C.bg, opacity: o("end"), transform: `scale(${punch(l, 0.05)})` })}>
        <Pill text="DIE" x={540} y={330} bg={C.sage} color={C.forestDeep} size={30} k={back(l / 0.2)} />
        <Txt s={{ top: 380, fontSize: 140, fontWeight: 600, letterSpacing: -2, transform: `scale(${back((l - 0.05) / 0.25)})` }}>Hofgeschichten</Txt>
        {["Reitakademie", "Reitertagebuch", "Rider Lab ✨"].map((s, i) => (
          <Pill key={s} text={s} x={540} y={640 + i * 120} bg={i === 2 ? C.forest : C.paper} color={i === 2 ? C.paper : C.forestDeep} size={46} k={back((l - 0.2 - i * 0.12) / 0.22)} />
        ))}
        <Pill text={new URLSearchParams(location.search).has("yt") ? "Link in der Beschreibung" : "Link in der Bio 👆"} x={540} y={1110} bg={C.honey} color={C.forestDeep} size={62} k={back((l - link) / 0.25) * (1 + 0.04 * Math.sin((l - link) * 8) * (l > link + 0.3 ? 1 : 0))} />
        {["tivoli", "tonga", "scrabble"].map((h, i) => {
          const k = back((l - link - 0.3 - i * 0.1) / 0.25);
          return (
            <div key={h} style={abs({ left: 300 + i * 180 - 75, top: 1290, width: 150, height: 150, borderRadius: 75, overflow: "hidden", background: C.paper, boxShadow: "0 14px 30px rgba(38,52,42,.18)", transform: `scale(${k})`, border: `6px solid ${C.paper}` })}>
              <img src={`/horses/${h}-480.webp`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          );
        })}
      </div>,
    );
  }

  return <div style={{ position: "relative", width: W, height: H, overflow: "hidden", background: C.bg }}>{out}</div>;
}

/* ---------- Einbindung in den Renderer ---------- */
const root = createRoot(document.getElementById("root")!);
window.__total = TOTAL;
window.__setT = async (t: number) => {
  flushSync(() => root.render(<Frame t={t} />));
  await Promise.all([...document.images].map((im) => (im.complete && im.naturalWidth ? Promise.resolve() : im.decode().catch(() => undefined))));
};
window.__ready = fetch("/takes/counts.json")
  .then((r) => r.json())
  .then((c) => {
    window.__counts = c;
  });
