# Werbevideo „Reitakademie + Rider Lab + Reitertagebuch“ (06.11.2026)

Datei: hofgeschichten-reitakademie-rider-lab-werbung.mp4 · 38 s · 1080×1920 · Musik selbst erzeugt (120 BPM, lizenzfrei), −14 LUFS · **ohne Preis** (Preiserhöhung ab 07.11.).
Dazu: hofgeschichten-werbung-ohne-preis.mp4 = das Werbevideo vom Morgen, Preis-Kreis „19,90 € einmalig“ ersetzt durch „kein Abo · einmal kaufen“ (ab 22,47 s überblendet), sonst unverändert.

## Ablauf
0–3,2 Hook aus dem Knie-Reel (comp `bein`) · 3,2 „Das Problem sitzt nicht im Sattel – sondern in deinem Körper“ · 5,2 RIDER LAB Reveal (dunkelgrün, Impact) · 7,3 5 Bereiche, Zähler bis 20 Übungen · 9,8 Montage Hüftöffner/Beckenuhr/Wasserglas/Dead Bug/Reiter-Hocke (echte Rider-Lab-Animationen) · 13,8 Richtig vs. Fehler (Hip Hinge) · 16,2 echte App: Beckenuhr + „Häufiger Fehler“ · 18,4 Trainer zählt bis 10, Konfetti, „Übung abschließen“ · 22,0 „Und dann? Ab ins Reitertagebuch“ · 23,6 Tagebuch-Start · 25,2 Reitstunde eintragen (Tippen) · 28,3 Eintrag schlägt Rider-Lab-Übung vor · 31,0 81 Lektionen · 32,9 Endkarte (Reitakademie + Rider Lab + Tagebuch, Checkliste, „Einmal kaufen · kein Abo“, Link in der Bio, Tivoli/Tonga/Scrabble).

## Technik
App-Aufnahmen: echte Komponenten der App (main 1e54524) im Testbündel, Handy 390×844 @2x, Beispieldaten (Lea, Tivoli, Scrabble, 3 Stunden, 3 Ziele), Bild für Bild mit gesteuerter Uhr aufgenommen. Komposition: React-Seite `promo.tsx` (unten), gerendert mit Playwright, Musik `music_promo.py` (unten), Mix: loudnorm I=−14.

## Caption
Deine Knie rutschen beim Reiten immer hoch? 🦵🐴
Das Problem sitzt oft nicht im Sattel – sondern im Körper.
✨ NEU in der Hofgeschichten Reitakademie: das RIDER LAB
5 Bereiche · 20 animierte Übungen für zu Hause – das lange Bein, Leichttraben, Galopp, die ruhige Hand, leichter Sitz
✅ jede Übung mit „richtig vs. typischer Fehler“
✅ Mitmachen mit Timer & Wiederholungszähler
✅ Reitertagebuch inklusive – es schlägt dir sogar die passende Übung vor
✅ 81 Lektionen & Lernvideos
Einmal kaufen, kein Abo. In jedem Modul eine Probelektion gratis.
👉 Link in der Bio · Schreib RIDERLAB, dann schicken wir dir den Link 🤎
#reitenlernen #reitersitz #reiterfitness #reitenverstehen #reitertagebuch #dressur #pferdemädchen #diehofgeschichten

## promo.tsx
```tsx
/* Werbevideo „Reitakademie + Rider Lab + Reitertagebuch“ (9:16, 1080×1920) – ohne Preis.
   Szenen: Hook (Knie-Reel) · Problem · RIDER LAB Reveal · 5 Bereiche · Übungs-Montage · Richtig/Fehler ·
   echte App-Aufnahmen (Übung, Trainer, Tagebuch, Eintrag mit Rider-Lab-Vorschlag, Akademie) · Endkarte. */
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

/* ---------- Zeitplan ---------- */
const S = {
  hook: [0, 3.2],
  problem: [3.2, 5.2],
  reveal: [5.2, 7.3],
  areas: [7.3, 9.8],
  montage: [9.8, 13.8],
  compare: [13.8, 16.2],
  uebung: [16.2, 18.4],
  trainer: [18.4, 22.0],
  bridge: [22.0, 23.6],
  tbhome: [23.6, 25.2],
  stunde: [25.2, 28.3],
  eintrag: [28.3, 31.0],
  akademie: [31.0, 32.9],
  end: [32.9, 38.0],
} as const;
export const TOTAL = S.end[1];

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

const EX = Object.fromEntries(riderLabAreas.flatMap((a) => a.exercises.map((e) => [e.slug, e]))) as Record<string, Exercise>;

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

/* ---------- Szenen ---------- */

function Frame({ t }: { t: number }) {
  const o = (k: keyof typeof S, d = 0.14) => win(t, S[k][0], S[k][1], d);
  const lt = (k: keyof typeof S) => t - S[k][0];
  const out: ReactNode[] = [];

  /* 1 · Hook: Knie-Reel */
  if (o("hook") > 0) out.push(<img key="hook" src={takeSrc("bein", t, 0, 1)} style={abs({ left: 0, top: 0, width: W, height: H, opacity: o("hook") })} />);

  /* 2 · Problem */
  if (o("problem") > 0) {
    const l = lt("problem");
    out.push(
      <div key="p" style={abs({ inset: 0, background: C.bg, opacity: o("problem") })}>
        <Txt s={{ top: 560, fontSize: 104, fontWeight: 600, lineHeight: 1.05, transform: `scale(${back(l / 0.3)})` }}>
          Das Problem sitzt
          <br />
          nicht im <span style={{ color: C.rust }}>Sattel.</span>
        </Txt>
        <Txt s={{ top: 900, fontSize: 92, fontWeight: 600, lineHeight: 1.08, opacity: sm((l - 0.85) / 0.25), transform: `translateY(${(1 - sm((l - 0.85) / 0.25)) * 40}px)` }}>
          Sondern in
          <br />
          <Mark u={(l - 1.1) / 0.4}>deinem Körper.</Mark>
        </Txt>
        <Anim ex={EX["hueftoeffner"]} t={5.6 + l} x={290} y={1210} w={500} h={360} crop={[60, 110, 260, 140]} />
      </div>,
    );
  }

  /* 3 · RIDER LAB Reveal */
  if (o("reveal", 0.08) > 0) {
    const l = lt("reveal");
    const flash = clamp(1 - l / 0.25);
    out.push(
      <div key="r" style={abs({ inset: 0, background: `radial-gradient(120% 80% at 50% 40%, #3b5040 0%, ${C.forestDeep} 70%)`, opacity: o("reveal", 0.08) })}>
        <Pill text="NEU IN DER REITAKADEMIE" x={540} y={600} bg={C.honey} color={C.forestDeep} size={34} k={back(l / 0.3)} />
        <Txt s={{ top: 700, fontSize: 210, fontWeight: 600, color: C.paper, letterSpacing: -4, lineHeight: 0.95, transform: `scale(${0.6 + 0.4 * back((l - 0.15) / 0.35)})`, opacity: sm((l - 0.12) / 0.15) }}>
          RIDER
          <br />
          LAB
        </Txt>
        {["Dein Körper.", "Dein Sitz.", "Dein Reiten."].map((s, i) => (
          <Txt key={s} s={{ top: 1150 + i * 92, fontSize: 74, fontWeight: 600, color: i === 2 ? C.honey : "#e9e2d2", opacity: sm((l - 0.7 - i * 0.28) / 0.2), transform: `translateY(${(1 - sm((l - 0.7 - i * 0.28) / 0.2)) * 30}px)` }}>
            {s}
          </Txt>
        ))}
        <div style={abs({ inset: 0, background: C.paper, opacity: flash * 0.8 })} />
      </div>,
    );
  }

  /* 4 · 5 Bereiche · 20 Übungen */
  if (o("areas") > 0) {
    const l = lt("areas");
    const count = Math.round(20 * sm((l - 0.2) / 1.4));
    out.push(
      <div key="a" style={abs({ inset: 0, background: C.bg, opacity: o("areas") })}>
        <Eyebrow text="RIDER LAB" y={150} />
        <Txt s={{ top: 196, fontSize: 92, fontWeight: 600, lineHeight: 1 }}>
          5 Bereiche · <span style={{ color: C.honey }}>{count}</span> Übungen
        </Txt>
        {riderLabAreas.map((a, i) => {
          const k = sm((l - 0.15 - i * 0.16) / 0.28);
          const y = 360 + i * 286;
          return (
            <div key={a.id} style={abs({ left: 70, right: 70, top: y, height: 250, borderRadius: 40, background: C.paper, boxShadow: "0 16px 40px rgba(38,52,42,.10)", opacity: k, transform: `translateX(${(1 - k) * (i % 2 ? 220 : -220)}px)` })}>
              <div style={abs({ left: 18, top: 18, width: 300, height: 214, borderRadius: 28, background: a.tint, overflow: "hidden" })}>
                <Anim ex={a.exercises[0]} t={l * 1.2 + i} x={0} y={0} w={300} h={214} crop={[40, 50, 290, 205]} />
              </div>
              <div style={abs({ left: 350, top: 40, right: 30, fontFamily: DISPLAY, fontSize: 56, fontWeight: 600, color: C.forestDeep })}>{a.title}</div>
              <div style={abs({ left: 350, top: 120, right: 30, fontFamily: BODY, fontSize: 28, lineHeight: 1.3, color: C.brown })}>{a.problem}</div>
            </div>
          );
        })}
      </div>,
    );
  }

  /* 5 · Übungs-Montage (auf den Beat) */
  if (o("montage", 0.08) > 0) {
    const l = lt("montage");
    const list: Array<[string, number, string]> = [
      ["hueftoeffner", 5.2, "Der Hüftöffner"],
      ["beckenuhr", 0.6, "Die Beckenuhr"],
      ["wasserglas-challenge", 1.2, "Wasserglas-Challenge"],
      ["dead-bug", 1.4, "Dead Bug"],
      ["reiter-hocke", 2.4, "Die Reiter-Hocke"],
    ];
    const seg = (S.montage[1] - S.montage[0]) / list.length;
    const i = Math.min(list.length - 1, Math.floor(l / seg));
    const [slug, off, label] = list[i];
    const ll = l - i * seg;
    const ex = EX[slug];
    const area = riderLabAreas.find((a) => a.exercises.some((e) => e.id === ex.id))!;
    const zoom = 1 + 0.06 * ll;
    out.push(
      <div key="m" style={abs({ inset: 0, background: area.tint, opacity: o("montage", 0.08) })}>
        <Eyebrow text={`ÜBUNG ${ex.number} VON 20 · ${area.title.toUpperCase()}`} y={170} color={C.forest} />
        <Txt s={{ top: 214, fontSize: 96, fontWeight: 600, lineHeight: 1, transform: `scale(${back(ll / 0.22)})` }}>{label}</Txt>
        <div style={abs({ left: 40, top: 420, width: 1000, height: 1000, borderRadius: 60, overflow: "hidden", background: C.ivory, boxShadow: "0 30px 80px rgba(38,52,42,.18)" })}>
          <div style={abs({ inset: 0, transform: `scale(${zoom})` })}>
            <Anim ex={ex} t={off + ll * 1.3} x={0} y={0} w={1000} h={1000} crop={slug === "dead-bug" ? [60, 60, 270, 270] : slug === "beckenuhr" ? [40, 0, 330, 330] : slug === "wasserglas-challenge" ? [70, 20, 280, 280] : slug === "reiter-hocke" ? [70, 10, 270, 270] : [50, 10, 250, 250]} />
          </div>
        </div>
        <Pill text={ex.doseLabel} x={540} y={1530} bg={C.forestDeep} color={C.paper} size={36} k={back((ll - 0.1) / 0.25)} />
        <Txt s={{ top: 1610, fontSize: 44, fontWeight: 600, color: C.forest, padding: "0 80px", fontFamily: BODY, lineHeight: 1.25, opacity: sm((ll - 0.15) / 0.2) }}>
          {i === 0 ? "Jede Übung echt animiert" : i === 1 ? "mit Markierungen" : i === 2 ? "zum Mitmachen zu Hause" : i === 3 ? "für einen unabhängigen Sitz" : "für Balance im leichten Sitz"}
        </Txt>
      </div>,
    );
  }

  /* 6 · Richtig / Fehler */
  if (o("compare") > 0) {
    const l = lt("compare");
    const ex = EX["hip-hinge"];
    out.push(
      <div key="c" style={abs({ inset: 0, background: C.bg, opacity: o("compare") })}>
        <Txt s={{ top: 130, fontSize: 92, fontWeight: 600, lineHeight: 1.02 }}>
          Siehst du den
          <br />
          <Mark u={(l - 0.3) / 0.4}>Unterschied?</Mark>
        </Txt>
        {[false, true].map((bad, i) => {
          const k = sm((l - 0.15 - i * 0.25) / 0.3);
          return (
            <div key={i} style={abs({ left: 60, right: 60, top: 400 + i * 700, height: 640, borderRadius: 50, overflow: "hidden", border: `8px solid ${bad ? C.rust : C.forest}`, background: C.ivory, opacity: k, transform: `scale(${0.9 + 0.1 * k})` })}>
              <Anim ex={ex} t={1.9 + l * 0.9} bad={bad} x={0} y={0} w={944} h={624} crop={[60, 20, 260, 172]} />
              <div style={abs({ left: 30, top: 26, padding: "14px 30px", borderRadius: 999, background: bad ? C.rust : C.forest, color: C.paper, fontFamily: BODY, fontWeight: 800, fontSize: 38 })}>
                {bad ? "✗ Häufiger Fehler: Rundrücken" : "✓ Richtig: aus der Hüfte"}
              </div>
            </div>
          );
        })}
        <Txt s={{ top: 1790, fontSize: 40, fontFamily: BODY, fontWeight: 700, color: C.brown, opacity: sm((l - 0.8) / 0.3) }}>Bei jeder Übung: richtig vs. typischer Fehler</Txt>
      </div>,
    );
  }

  /* 7 · Echte App: Übung mit Fehler-Ansicht */
  if (o("uebung") > 0) {
    const l = lt("uebung");
    out.push(
      <div key="u" style={abs({ inset: 0, background: C.bg, opacity: o("uebung") })}>
        <Caption eyebrow="IN DER APP" title={<>Richtig <span style={{ color: C.rust }}>oder</span> Fehler?</>} t={t} a={S.uebung[0]} />
        <Phone src={takeSrc("uebung", t, S.uebung[0], 1.5, 20)} k={0.94 + 0.06 * sm(l / 0.4)} y={1210} />
      </div>,
    );
  }

  /* 8 · Trainer */
  if (o("trainer") > 0) {
    const l = lt("trainer");
    const doneAt = S.trainer[0] + 1.7;
    out.push(
      <div key="tr" style={abs({ inset: 0, background: C.bg, opacity: o("trainer") })}>
        <Caption eyebrow="MITMACHEN" title={<>Mit <Mark u={(l - 0.3) / 0.4}>Timer</Mark> & Zähler</>} t={t} a={S.trainer[0]} />
        <Phone src={takeSrc("trainer", t, S.trainer[0], 1.45, 16)} y={1210} />
        <Confetti t={t} a={doneAt} x={540} y={1000} />
        {t > doneAt && <Pill text="Geschafft! ✓" x={540} y={470} bg={C.honey} color={C.forestDeep} size={48} k={back((t - doneAt) / 0.3)} />}
      </div>,
    );
  }

  /* 9 · Überleitung Tagebuch */
  if (o("bridge") > 0) {
    const l = lt("bridge");
    out.push(
      <div key="b" style={abs({ inset: 0, background: C.forestDeep, opacity: o("bridge") })}>
        <Txt s={{ top: 690, fontSize: 100, fontWeight: 600, color: "#e9e2d2", transform: `scale(${back(l / 0.3)})` }}>Und dann?</Txt>
        <Txt s={{ top: 850, fontSize: 92, fontWeight: 600, color: C.paper, lineHeight: 1.05, opacity: sm((l - 0.55) / 0.25) }}>
          Ab ins
          <br />
          <span style={{ color: C.honey }}>Reitertagebuch.</span>
        </Txt>
        <svg viewBox="0 0 24 24" width="150" height="150" style={abs({ left: 465, top: 1130, opacity: sm((l - 0.8) / 0.25) })} fill="none" stroke={C.honey} strokeWidth="1.6" strokeLinejoin="round">
          <path d="M3 5.5C5.5 4.5 8.5 4.5 12 6c3.5-1.5 6.5-1.5 9-.5V19c-2.5-1-5.5-1-9 .5-3.5-1.5-6.5-1.5-9-.5Z" />
          <path d="M12 6v13.5" />
        </svg>
      </div>,
    );
  }

  /* 10 · Tagebuch Start */
  if (o("tbhome") > 0)
    out.push(
      <div key="th" style={abs({ inset: 0, background: C.bg, opacity: o("tbhome") })}>
        <Caption eyebrow="MEIN REITERTAGEBUCH" title={<>Deine Pferde. Deine <Mark u={(t - S.tbhome[0] - 0.3) / 0.4}>Momente.</Mark></>} t={t} a={S.tbhome[0]} />
        <Phone src={takeSrc("tbhome", t, S.tbhome[0], 1.2)} y={1230} />
      </div>,
    );

  /* 11 · Reitstunde eintragen */
  if (o("stunde") > 0)
    out.push(
      <div key="st" style={abs({ inset: 0, background: C.bg, opacity: o("stunde") })}>
        <Caption eyebrow="NEUE REITSTUNDE" title={<>In <Mark u={(t - S.stunde[0] - 0.3) / 0.4}>Sekunden</Mark> eingetragen</>} t={t} a={S.stunde[0]} />
        <Phone src={takeSrc("stunde", t, S.stunde[0], 2.1, 2)} y={1230} />
      </div>,
    );

  /* 12 · Eintrag → passende Rider-Lab-Übung */
  if (o("eintrag") > 0) {
    const l = lt("eintrag");
    out.push(
      <div key="en" style={abs({ inset: 0, background: C.bg, opacity: o("eintrag") })}>
        <Caption eyebrow="DEIN TAGEBUCH DENKT MIT" title={<>…und schlägt die <Mark u={(l - 0.3) / 0.4}>passende Übung</Mark> vor</>} t={t} a={S.eintrag[0]} y={110} />
        <Phone src={takeSrc("eintrag", t, S.eintrag[0], 1.55)} y={1250} />
        {l > 1.7 && <Pill text="Rider Lab ✨" x={870} y={1505} bg={C.honey} color={C.forestDeep} size={40} k={back((l - 1.7) / 0.3)} />}
      </div>,
    );
  }

  /* 13 · Akademie */
  if (o("akademie") > 0) {
    const l = lt("akademie");
    const n = Math.round(81 * sm(l / 1.2));
    out.push(
      <div key="ak" style={abs({ inset: 0, background: C.bg, opacity: o("akademie") })}>
        <Eyebrow text="DIE REITAKADEMIE" y={130} />
        <Txt s={{ top: 168, fontSize: 150, fontWeight: 600, color: C.honey, lineHeight: 1 }}>{n}</Txt>
        <Txt s={{ top: 330, fontSize: 62, fontWeight: 600 }}>Lektionen & Lernvideos</Txt>
        <Phone src={takeSrc("akademie", t, S.akademie[0], 1.8)} y={1270} w={600} />
      </div>,
    );
  }

  /* 14 · Endkarte (ohne Preis) */
  if (o("end") > 0) {
    const l = lt("end");
    const items = ["81 Lektionen & Lernvideos", "NEU: Rider Lab – 20 Übungen", "Reitertagebuch inklusive", "Für Kids, Teens & Erwachsene", "In jedem Modul 1 Probelektion gratis"];
    out.push(
      <div key="e" style={abs({ inset: 0, background: C.bg, opacity: o("end") })}>
        <Pill text="DIE HOFGESCHICHTEN" x={540} y={250} bg={C.sage} color={C.forestDeep} size={30} k={back(l / 0.3)} />
        <Txt s={{ top: 300, fontSize: 150, fontWeight: 600, letterSpacing: -2, transform: `scale(${back((l - 0.1) / 0.35)})` }}>Reitakademie</Txt>
        <Txt s={{ top: 490, fontSize: 66, fontWeight: 600, opacity: sm((l - 0.4) / 0.25) }}>
          + <span style={{ color: C.honey }}>Rider Lab</span> + Tagebuch
        </Txt>
        <div style={abs({ left: 150, top: 640, right: 60 })}>
          {items.map((s, i) => {
            const k = sm((l - 0.7 - i * 0.18) / 0.22);
            return (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 26, marginBottom: 34, opacity: k, transform: `translateX(${(1 - k) * -40}px)` }}>
                <span style={{ width: 62, height: 62, borderRadius: 31, background: i === 1 ? C.forest : C.honey, color: C.paper, display: "grid", placeItems: "center", fontFamily: BODY, fontWeight: 900, fontSize: 36, flex: "none" }}>✓</span>
                <span style={{ fontFamily: BODY, fontWeight: 700, fontSize: 44, color: C.forestDeep }}>{s}</span>
              </div>
            );
          })}
        </div>
        <Pill text="Einmal kaufen · kein Abo" x={540} y={1200} bg={C.sandLight} color={C.brown} size={36} k={back((l - 1.7) / 0.3)} />
        <Pill text="Link in der Bio" x={540} y={1340} bg={C.forestDeep} color={C.paper} size={56} k={back((l - 2.0) / 0.3) * (1 + 0.035 * Math.sin((l - 2.3) * 6) * (l > 2.3 ? 1 : 0))} />
        {["tivoli", "tonga", "scrabble"].map((h, i) => {
          const k = back((l - 2.3 - i * 0.12) / 0.3);
          return (
            <div key={h} style={abs({ left: 300 + i * 180 - 75, top: 1500, width: 150, height: 150, borderRadius: 75, overflow: "hidden", background: C.paper, boxShadow: "0 14px 30px rgba(38,52,42,.18)", transform: `scale(${k})`, border: `6px solid ${C.paper}` })}>
              <img src={`/horses/${h}-480.webp`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          );
        })}
        <Txt s={{ top: 1720, fontSize: 36, fontFamily: BODY, fontWeight: 700, color: C.brown, opacity: sm((l - 2.8) / 0.3) }}>Tivoli, Tonga & Scrabble freuen sich auf dich</Txt>
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
```

## music_promo.py
```python
# Treibende, lizenzfreie Musik für das Werbevideo (120 BPM, selbst erzeugt).
# Aufruf: python3 music_promo.py out.wav
import numpy as np, scipy.io.wavfile as wf, sys

SR = 44100
T = 38.0
n = int(SR * T)
out = np.zeros((n, 2))
rng = np.random.default_rng(7)
BEAT = 0.5

def add(sig, start, pan=0.5, gain=1.0):
    i = int(start * SR)
    if i >= n or i < 0:
        return
    j = min(n, i + len(sig))
    out[i:j, 0] += sig[: j - i] * (1 - pan) * gain * 2
    out[i:j, 1] += sig[: j - i] * pan * gain * 2

mid = lambda m: 440 * 2 ** ((m - 69) / 12)
tt = lambda d: np.arange(int(SR * d)) / SR

def kick(a=0.9):
    t = tt(0.32)
    f = 45 + 95 * np.exp(-t * 28)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t * 9) * a

def clap(a=0.35):
    t = tt(0.22)
    x = rng.standard_normal(len(t))
    x = np.diff(np.concatenate([[0], x]))
    env = np.exp(-t * 22) + 0.6 * np.exp(-((t - 0.012) ** 2) / 0.00002)
    return x * env * a

def hat(a=0.10, d=0.05):
    t = tt(d)
    x = rng.standard_normal(len(t))
    x = np.diff(np.diff(np.concatenate([[0, 0], x])))
    return x * np.exp(-t * 70) * a

def pluck(f, d=0.35, a=0.12):
    t = tt(d)
    w = np.sign(np.sin(2 * np.pi * f * t)) * 0.35 + np.sin(2 * np.pi * f * t) + 0.3 * np.sin(4 * np.pi * f * t)
    return w * np.exp(-t * 9) * np.minimum(1, t / 0.004) * a

def bass(f, d, a=0.32):
    t = tt(d)
    w = np.sin(2 * np.pi * f * t) + 0.45 * np.sin(4 * np.pi * f * t) + 0.18 * np.sin(6 * np.pi * f * t)
    env = np.minimum(1, t / 0.01) * np.exp(-t * 2.2)
    return w * env * a

def pad(fs, d, a=0.05):
    t = tt(d)
    w = sum(np.sin(2 * np.pi * f * t) + 0.3 * np.sin(2 * np.pi * f * 2.003 * t) for f in fs)
    env = np.minimum(1, t / 0.4) * np.minimum(1, (d - t) / 0.4)
    return w * env * a

def riser(d, a=0.25):
    t = tt(d)
    x = rng.standard_normal(len(t))
    x = np.diff(np.concatenate([[0], x])) * (t / d) ** 2
    tone = np.sin(2 * np.pi * np.cumsum(200 + 1400 * (t / d) ** 2) / SR) * 0.3 * (t / d) ** 2
    return (x * 0.6 + tone) * a

def impact(a=0.8):
    t = tt(1.6)
    boom = np.sin(2 * np.pi * np.cumsum(30 + 60 * np.exp(-t * 6)) / SR) * np.exp(-t * 2.5)
    x = rng.standard_normal(len(t))
    crash = np.diff(np.concatenate([[0], x])) * np.exp(-t * 3) * 0.35
    return (boom + crash) * a

def whoosh(a=0.14):
    t = tt(0.35)
    x = rng.standard_normal(len(t))
    env = np.sin(np.pi * t / 0.35) ** 2
    return np.diff(np.concatenate([[0], x])) * env * a

# Akkorde je Takt (2 s): Am – F – C – G (Grundtöne)
prog = [(57, [69, 72, 76]), (53, [65, 69, 72]), (48, [67, 72, 76]), (55, [67, 71, 74])]

def chord_at(t):
    return prog[int(t // 2.0) % 4]

FULL = [(5.2, 22.0), (23.6, 36.6)]
full = lambda t: any(a <= t < b for a, b in FULL)

b = 0
while b * BEAT < 37.0:
    t = b * BEAT
    root, ch = chord_at(t)
    hook = t < 3.2
    build = 3.2 <= t < 5.2
    brk = 22.0 <= t < 23.6
    if full(t) or hook:
        add(kick(0.75 if hook else 0.95), t)
    if full(t) and b % 2 == 1:
        add(clap(), t, 0.5)
    if full(t):
        add(hat(0.08), t + BEAT / 2, 0.65)
        add(hat(0.05, 0.03), t + BEAT / 4, 0.35)
        add(bass(mid(root - 12), BEAT * 0.9), t + (BEAT / 2 if b % 2 == 0 else 0), 0.5)
    if not brk:
        # Pluck-Arpeggio (Achtel)
        for k in range(2):
            m = ch[(b * 2 + k) % 3] + (12 if (b // 8) % 2 and full(t) else 0)
            add(pluck(mid(m), a=0.09 if hook else 0.11), t + k * BEAT / 2, 0.3 + 0.4 * k)
    b += 1

# Aufbau: Snare-Wirbel + Riser
roll_t = 3.2
step = 0.25
while roll_t < 5.2:
    add(clap(0.12 + 0.25 * (roll_t - 3.2) / 2), roll_t, 0.5)
    roll_t += step
    if roll_t > 4.2:
        step = 0.125
add(riser(2.0), 3.2)
add(impact(0.9), 5.2)
# Breakdown: Fläche
add(pad([mid(57), mid(64), mid(69)], 1.8, 0.05), 22.0)
add(riser(1.5, 0.18), 22.1)
add(impact(0.6), 23.6)
# Szenenwechsel
for c in [7.3, 9.8, 13.8, 16.2, 18.4, 25.2, 28.3, 31.0]:
    add(whoosh(), c - 0.18, 0.5)
add(impact(0.75), 32.9)
# Schlussakkord
add(pad([mid(57), mid(60), mid(64), mid(69)], 2.6, 0.07), 35.2)
add(pluck(mid(81), 1.2, 0.14), 36.6)

fo = int(SR * 1.6)
out[-fo:] *= np.linspace(1, 0, fo)[:, None]
out = np.tanh(out * 0.9)
out /= np.abs(out).max() / 0.85
wf.write(sys.argv[1], SR, (out * 32767).astype(np.int16))
print("ok", T)
```
