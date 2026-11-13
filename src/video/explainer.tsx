import type { ReactNode } from "react";
import { AnimHorse, legsOnGround, type Gait, type LegId } from "@/components/illustrations/akademie/AnimHorse";
import { AK_SCENES } from "@/components/illustrations/akademie/scenes";
import { HorseHead } from "@/components/illustrations/HorseHead";
import { getHorse } from "@/content/horses";
import { COL, Card, FONT_BODY, FONT_DISPLAY, Frame, H, W, clamp01, fade, smooth, wrap, type Line, type Timeline, type VideoDef } from "./kit";

/**
 * Baukasten für die Erklärvideos der Module 10–14 (Ausbau 13.11.2026).
 * Ein Video ist eine Folge von „Beats“: ein Sprechersatz + ein Bild, das während des
 * Satzes animiert wird (Einblenden, Aufzählen, Hervorheben, Bewegung).
 */

type Mood = "neugierig" | "entspannt" | "grummelig" | "aufgeregt";

export type Visual =
  | { k: "title"; kicker: string; title: string }
  | { k: "bullets"; heading: string; items: string[] }
  | { k: "steps"; heading: string; items: string[] }
  | { k: "table"; heading: string; rows: string[][] }
  | { k: "scene"; scene: string; label?: string; note?: string }
  | { k: "head"; horse: string; mood: Mood; label: string; points: string[] }
  | { k: "gait"; gait: Exclude<Gait, "stand">; label: string; slow?: boolean }
  | { k: "compare"; good: { title: string; items: string[] }; bad: { title: string; items: string[] } }
  | { k: "calc"; heading: string; lines: string[] }
  | { k: "bars"; heading: string; bars: Array<{ label: string; value: number; unit: string }> }
  | { k: "timeline"; heading: string; items: Array<[string, string]> }
  | { k: "merke"; text: string };

export type Beat = { id: string; text: string; caption?: string; visual: Visual; pause?: number };

export type ExplainerConfig = { slug: string; title: string; world: string; lesson: string; chip: string; beats: Beat[] };

const LEG_LABEL: Record<LegId, string> = { VL: "vorne links", VR: "vorne rechts", HL: "hinten links", HR: "hinten rechts" };
const GAIT_BEATS: Record<Exclude<Gait, "stand">, LegId[][]> = {
  schritt: [["HL"], ["VL"], ["HR"], ["VR"]],
  trab: [["HL", "VR"], ["HR", "VL"]],
  "galopp-rechts": [["HL"], ["HR", "VL"], ["VR"]],
  "galopp-links": [["HR"], ["HL", "VR"], ["VL"]],
};
const BEAT_COLORS = [COL.honey, COL.pairB, COL.rust, COL.brown];

/* ---------- Bausteine ---------- */

function Heading({ text, y = 130 }: { text: string; y?: number }) {
  return (
    <text x={W / 2} y={y} textAnchor="middle" fontFamily={FONT_DISPLAY} fontSize="44" fontWeight="800" fill={COL.forestDeep}>
      {text}
    </text>
  );
}

function TextLines({ x, y, text, size = 28, max = 40, color = COL.ink, weight = 400, anchor = "start" }: { x: number; y: number; text: string; size?: number; max?: number; color?: string; weight?: number; anchor?: "start" | "middle" }) {
  return (
    <>
      {wrap(text, max).map((l, i) => (
        <text key={i} x={x} y={y + i * size * 1.25} textAnchor={anchor} fontFamily={FONT_BODY} fontSize={size} fontWeight={weight} fill={color}>
          {l}
        </text>
      ))}
    </>
  );
}

/** Wie viele Einträge sind nach Fortschritt p (0–1) sichtbar? */
const shown = (n: number, p: number) => Math.min(n, Math.floor(p * n * 1.15) + 1);

function Scene({ name }: { name: string }) {
  const S = AK_SCENES[name];
  return S ? <S.component /> : null;
}

function VisualFrame({ v, p, t }: { v: Visual; p: number; t: number }): ReactNode {
  switch (v.k) {
    case "title":
      return (
        <g>
          <Card x={190} y={170} w={900} h={300}>
            <text x={W / 2} y={265} textAnchor="middle" fontFamily={FONT_BODY} fontSize="26" fontWeight="700" fill={COL.brown} letterSpacing="3">
              {v.kicker.toUpperCase()}
            </text>
            {wrap(v.title, 30).map((l, i) => (
              <text key={i} x={W / 2} y={340 + i * 62} textAnchor="middle" fontFamily={FONT_DISPLAY} fontSize="56" fontWeight="800" fill={COL.forestDeep}>
                {l}
              </text>
            ))}
          </Card>
        </g>
      );
    case "bullets":
    case "steps": {
      const n = shown(v.items.length, p);
      const gap = Math.min(72, 320 / v.items.length);
      return (
        <g>
          <Heading text={v.heading} />
          <Card x={170} y={165} w={940} h={Math.max(160, v.items.length * gap + 50)}>
            {v.items.slice(0, n).map((it, i) => {
              const a = clamp01((p * v.items.length * 1.15 - i) * 2.5);
              const y = 220 + i * gap;
              return (
                <g key={i} opacity={a} transform={`translate(${(1 - smooth(a)) * 30} 0)`}>
                  {v.k === "steps" ? (
                    <>
                      <circle cx={225} cy={y - 10} r="22" fill={i === n - 1 ? COL.honey : COL.forest} />
                      <text x={225} y={y - 1} textAnchor="middle" fontFamily={FONT_BODY} fontSize="24" fontWeight="700" fill={COL.paper}>
                        {i + 1}
                      </text>
                    </>
                  ) : (
                    <circle cx={225} cy={y - 10} r="9" fill={i === n - 1 ? COL.honey : COL.forest} />
                  )}
                  <TextLines x={265} y={y} text={it} size={28} max={52} />
                </g>
              );
            })}
          </Card>
        </g>
      );
    }
    case "table": {
      const cols = v.rows[0].length;
      const cw = 940 / cols;
      const n = shown(v.rows.length - 1, p);
      return (
        <g>
          <Heading text={v.heading} />
          <Card x={170} y={165} w={940} h={70 + (v.rows.length - 1) * 62}>
            {v.rows[0].map((h, c) => (
              <text key={c} x={200 + c * cw} y={212} fontFamily={FONT_BODY} fontSize="24" fontWeight="700" fill={COL.brown}>
                {h}
              </text>
            ))}
            {v.rows.slice(1, n + 1).map((r, i) => (
              <g key={i} opacity={clamp01((p * (v.rows.length - 1) * 1.15 - i) * 2.5)}>
                <rect x={185} y={232 + i * 62} width={910} height={52} rx="12" fill={i % 2 ? COL.paper : COL.sandLight} opacity=".7" />
                {r.map((cell, c) => (
                  <text key={c} x={200 + c * cw} y={266 + i * 62} fontFamily={FONT_BODY} fontSize="25" fontWeight={c === 0 ? 700 : 400} fill={COL.ink}>
                    {cell}
                  </text>
                ))}
              </g>
            ))}
          </Card>
        </g>
      );
    }
    case "scene":
      return (
        <g>
          {v.label && <Heading text={v.label} y={118} />}
          <svg x={330} y={v.label ? 140 : 110} width={620} height={v.note ? 360 : 410} viewBox="0 0 800 600">
            <Scene name={v.scene} />
          </svg>
          {v.note && (
            <g opacity={smooth(clamp01(p * 3))}>
              <TextLines x={W / 2} y={528} text={v.note} size={26} max={60} color={COL.forestDeep} weight={700} anchor="middle" />
            </g>
          )}
        </g>
      );
    case "head": {
      const h = getHorse(v.horse);
      const n = shown(v.points.length, p);
      return (
        <g>
          <Heading text={v.label} />
          <svg x={150} y={170} width={420} height={360} viewBox="0 0 200 200">
            {h && <HorseHead look={h.look} mood={v.mood} />}
          </svg>
          <Card x={620} y={180} w={520} h={Math.max(140, v.points.length * 66 + 40)}>
            {v.points.slice(0, n).map((pt, i) => (
              <g key={i} opacity={clamp01((p * v.points.length * 1.15 - i) * 2.5)}>
                <circle cx={655} cy={226 + i * 66} r="8" fill={COL.honey} />
                <TextLines x={680} y={236 + i * 66} text={pt} size={26} max={30} />
              </g>
            ))}
          </Card>
        </g>
      );
    }
    case "gait": {
      const look = getHorse("tivoli")!.look;
      const time = v.slow ? t * 0.35 : t;
      const ground = legsOnGround(v.gait, time);
      const beats = GAIT_BEATS[v.gait];
      return (
        <g>
          <Heading text={v.label} y={110} />
          <svg x={150} y={150} width={540} height={380} viewBox="40 60 340 260">
            <rect x="40" y="300" width="340" height="20" fill="#E3D3B4" />
            <AnimHorse look={look} gait={v.gait} time={time} />
          </svg>
          <Card x={790} y={170} w={400} h={360}>
            {(["HL", "VL", "HR", "VR"] as LegId[]).map((leg, i) => {
              const b = beats.findIndex((x) => x.includes(leg));
              const on = ground.includes(leg);
              const y = 230 + i * 74;
              return (
                <g key={leg}>
                  <circle cx={840} cy={y - 8} r="24" fill={on ? BEAT_COLORS[b] : COL.paper} stroke={BEAT_COLORS[b]} strokeWidth="4" />
                  <text x={840} y={y} textAnchor="middle" fontFamily={FONT_BODY} fontSize="22" fontWeight="700" fill={on ? COL.paper : COL.ink}>
                    {b + 1}
                  </text>
                  <text x={880} y={y} fontFamily={FONT_BODY} fontSize="26" fill={COL.ink}>
                    {LEG_LABEL[leg]}
                  </text>
                </g>
              );
            })}
            {ground.length === 0 && (
              <text x={990} y={515} textAnchor="middle" fontFamily={FONT_BODY} fontSize="26" fontWeight="700" fill={COL.rust}>
                Schwebephase!
              </text>
            )}
          </Card>
        </g>
      );
    }
    case "compare": {
      const col = (x: number, title: string, items: string[], good: boolean, delay: number) => {
        const a = smooth(clamp01((p - delay) * 3));
        return (
          <g opacity={a}>
            <Card x={x} y={165} w={500} h={Math.max(200, items.length * 72 + 90)} fill={good ? "#EEF2E8" : "#F6E9E2"}>
              <text x={x + 34} y={215} fontFamily={FONT_DISPLAY} fontSize="34" fontWeight="800" fill={good ? COL.forest : COL.rust}>
                {good ? "✓ " : "✗ "}
                {title}
              </text>
              {items.map((it, i) => (
                <TextLines key={i} x={x + 34} y={270 + i * 72} text={it} size={26} max={34} />
              ))}
            </Card>
          </g>
        );
      };
      return (
        <g>
          {col(110, v.bad.title, v.bad.items, false, 0)}
          {col(670, v.good.title, v.good.items, true, 0.35)}
        </g>
      );
    }
    case "calc": {
      const n = shown(v.lines.length, p);
      return (
        <g>
          <Heading text={v.heading} />
          <Card x={220} y={165} w={840} h={v.lines.length * 72 + 60}>
            {v.lines.slice(0, n).map((l, i) => (
              <text key={i} x={W / 2} y={230 + i * 72} textAnchor="middle" fontFamily={FONT_BODY} fontSize={i === v.lines.length - 1 ? 40 : 32} fontWeight={i === v.lines.length - 1 ? 800 : 400} fill={i === v.lines.length - 1 ? COL.forestDeep : COL.ink} opacity={clamp01((p * v.lines.length * 1.15 - i) * 2.5)}>
                {l}
              </text>
            ))}
          </Card>
        </g>
      );
    }
    case "bars": {
      const max = Math.max(...v.bars.map((b) => b.value));
      const g = smooth(clamp01(p * 1.6));
      return (
        <g>
          <Heading text={v.heading} />
          {v.bars.map((b, i) => {
            const y = 200 + i * 80;
            const w = (b.value / max) * 640 * g;
            return (
              <g key={i}>
                <text x={340} y={y + 34} textAnchor="end" fontFamily={FONT_BODY} fontSize="28" fontWeight="700" fill={COL.ink}>
                  {b.label}
                </text>
                <rect x={360} y={y} width={Math.max(4, w)} height={48} rx="12" fill={BEAT_COLORS[i % 4]} />
                <text x={370 + w} y={y + 34} fontFamily={FONT_BODY} fontSize="26" fill={COL.inkSoft} opacity={g}>
                  {b.unit}
                </text>
              </g>
            );
          })}
        </g>
      );
    }
    case "timeline": {
      const n = shown(v.items.length, p);
      const step = 980 / v.items.length;
      return (
        <g>
          <Heading text={v.heading} />
          <path d={`M150 330H${150 + 980 * smooth(clamp01(p * 1.2))}`} stroke={COL.forest} strokeWidth="8" strokeLinecap="round" />
          {v.items.slice(0, n).map(([a, b], i) => {
            const x = 150 + step * i + step / 2;
            return (
              <g key={i} opacity={clamp01((p * v.items.length * 1.15 - i) * 2.5)}>
                <circle cx={x} cy={330} r="18" fill={COL.honey} stroke={COL.paper} strokeWidth="5" />
                <TextLines x={x} y={290} text={a} size={26} max={14} weight={700} color={COL.forestDeep} anchor="middle" />
                <TextLines x={x} y={385} text={b} size={23} max={16} anchor="middle" />
              </g>
            );
          })}
        </g>
      );
    }
    case "merke":
      return (
        <g>
          <Card x={190} y={180} w={900} h={280} fill="#FBF3DF">
            <text x={W / 2} y={250} textAnchor="middle" fontFamily={FONT_BODY} fontSize="26" fontWeight="700" fill={COL.brown} letterSpacing="3">
              MERKE
            </text>
            {wrap(v.text, 38).map((l, i) => (
              <text key={i} x={W / 2} y={320 + i * 54} textAnchor="middle" fontFamily={FONT_DISPLAY} fontSize="44" fontWeight="800" fill={COL.forestDeep}>
                {l}
              </text>
            ))}
          </Card>
        </g>
      );
  }
}

/* ---------- Video aus Beats ---------- */

export function explainer(cfg: ExplainerConfig): VideoDef {
  const lines: Line[] = cfg.beats.map((b) => ({ id: b.id, text: b.text, caption: b.caption, pause: b.pause ?? 0.7 }));
  return {
    slug: cfg.slug,
    title: cfg.title,
    world: cfg.world,
    lesson: cfg.lesson,
    lines,
    render: (t: number, tl: Timeline) => {
      // aktiver Beat: der letzte, dessen Start erreicht ist
      let idx = 0;
      cfg.beats.forEach((b, i) => {
        if (t >= tl.start(b.id) - 0.4) idx = i;
      });
      const beat = cfg.beats[idx];
      const start = tl.start(beat.id);
      const end = tl.end(beat.id);
      const p = clamp01((t - start) / Math.max(0.5, end - start));
      const next = cfg.beats[idx + 1];
      const out = next ? tl.start(next.id) - 0.4 : tl.total;
      const a = fade(t, start, out, 0.4);
      return (
        <Frame t={t} tl={tl} chip={cfg.chip}>
          <g opacity={a} transform={`translate(0 ${(1 - a) * 12})`}>
            <VisualFrame v={beat.visual} p={p} t={t} />
          </g>
          <rect x={0} y={H - 6} width={W * clamp01(t / tl.total)} height={6} fill={COL.honey} />
        </Frame>
      );
    },
  };
}
