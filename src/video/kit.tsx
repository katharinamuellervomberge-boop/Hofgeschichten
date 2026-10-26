import type { ReactNode } from "react";

/**
 * Baukasten für die Lernvideos der Reitakademie.
 *
 * Ein Video ist eine Liste von Sprechersätzen (`lines`). Jeder Satz hat eine
 * geschätzte Dauer; liegen echte Aufnahmen vor (ElevenLabs), werden die
 * gemessenen Längen in `durations` eingetragen und das Video neu gerendert –
 * Bild und Ton passen dann genau zusammen.
 *
 * Gerendert wird Bild für Bild (`render(t)`), nichts hängt an CSS-Animationen.
 */

export const W = 1280;
export const H = 720;
export const FPS = 25;

export const COL = {
  bg: "#F5F0E5",
  paper: "#FBF8F1",
  forest: "#344638",
  forestDeep: "#26342A",
  sage: "#DDE3D6",
  sand: "#D9C6A5",
  sandLight: "#E8DCC4",
  brown: "#80634D",
  brownDeep: "#5E4636",
  honey: "#C99A4E",
  rust: "#A4573A",
  ink: "#2C2A24",
  inkSoft: "#5D574C",
  pairA: "#C99A4E",
  pairB: "#5E7360",
};

export const FONT_DISPLAY = "Fraunces, 'Iowan Old Style', Georgia, serif";
export const FONT_BODY = "Andika, 'Trebuchet MS', system-ui, sans-serif";

export type Line = {
  id: string;
  /** Sprechertext für ElevenLabs (genau so einsprechen) */
  text: string;
  /** Untertitel, falls kürzer als der Sprechertext */
  caption?: string;
  /** Pause nach dem Satz in Sekunden */
  pause?: number;
};

export type VideoDef = {
  slug: string;
  title: string;
  /** Lektion, in der das Video erscheint */
  lesson: string;
  world: string;
  lines: Line[];
  /** Gemessene Dauern der Aufnahmen in Sekunden (überschreibt die Schätzung) */
  durations?: Record<string, number>;
  render: (t: number, tl: Timeline) => ReactNode;
};

/** Geschätzte Sprechdauer: ruhiges Kindertempo, ca. 2,2 Wörter pro Sekunde */
export function estimate(text: string) {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(2.2, words / 2.2 + 0.4);
}

export type Timeline = {
  start: (id: string) => number;
  end: (id: string) => number;
  total: number;
  current: (t: number) => Line | undefined;
  /** 0–1 innerhalb eines Satzes */
  progress: (id: string, t: number) => number;
};

export function timeline(v: Pick<VideoDef, "lines" | "durations">, lead = 0.6, tail = 1.2): Timeline {
  const starts: Record<string, number> = {};
  const ends: Record<string, number> = {};
  let t = lead;
  for (const l of v.lines) {
    starts[l.id] = t;
    t += v.durations?.[l.id] ?? estimate(l.text);
    ends[l.id] = t;
    t += l.pause ?? 0.5;
  }
  const total = t + tail;
  return {
    start: (id) => starts[id],
    end: (id) => ends[id],
    total,
    current: (x) => v.lines.find((l) => x >= starts[l.id] - 0.05 && x < (ends[l.id] + (l.pause ?? 0.5) * 0.8)),
    progress: (id, x) => Math.max(0, Math.min(1, (x - starts[id]) / (ends[id] - starts[id]))),
  };
}

/** Sanftes Ein-/Ausblenden zwischen zwei Zeitpunkten */
export function fade(t: number, from: number, to: number, d = 0.4) {
  if (t < from - d || t > to + d) return 0;
  const a = Math.min(1, (t - (from - d)) / d);
  const b = Math.min(1, (to + d - t) / d);
  return Math.max(0, Math.min(a, b));
}

export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
export const smooth = (x: number) => {
  const c = clamp01(x);
  return c * c * (3 - 2 * c);
};

/** Rahmen eines Videobilds: Hintergrund, Kopfzeile, Untertitel */
export function Frame({ t, tl, chip, children, captions = true }: { t: number; tl: Timeline; chip: string; children: ReactNode; captions?: boolean }) {
  const line = tl.current(t);
  const cap = line ? line.caption ?? line.text : "";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width={W} height={H} fill={COL.bg} />
      {children}
      {/* Kopfzeile */}
      <g transform="translate(32 28)">
        <rect width={chip.length * 11.5 + 48} height="40" rx="20" fill={COL.forest} />
        <path d="M18 27v-9a6 6 0 0 1 12 0v9" fill="none" stroke={COL.paper} strokeWidth="3.4" strokeLinecap="round" />
        <text x="40" y="27" fontFamily={FONT_BODY} fontSize="19" fontWeight="700" fill={COL.paper}>
          {chip}
        </text>
      </g>
      {/* Untertitel */}
      {captions && cap && <Caption text={cap} />}
    </svg>
  );
}

/** Untertitel unten, zweizeilig umbrochen */
export function Caption({ text }: { text: string }) {
  const lines = wrap(text, 58);
  const h = 26 + lines.length * 40;
  return (
    <g>
      <rect x="140" y={H - 28 - h} width={W - 280} height={h} rx="18" fill={COL.forestDeep} opacity="0.88" />
      {lines.map((l, i) => (
        <text key={i} x={W / 2} y={H - 28 - h + 46 + i * 40} textAnchor="middle" fontFamily={FONT_BODY} fontSize="30" fontWeight="700" fill={COL.paper}>
          {l}
        </text>
      ))}
    </g>
  );
}

export function wrap(text: string, max: number): string[] {
  const out: string[] = [];
  let cur = "";
  for (const w of text.split(" ")) {
    if ((cur + " " + w).trim().length > max) {
      out.push(cur.trim());
      cur = w;
    } else cur += " " + w;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

/** Reitplatz-Hintergrund, der sich mit der Geschwindigkeit `speed` (px/s) nach links bewegt */
export function ScrollingArena({ t, speed, y = 430 }: { t: number; speed: number; y?: number }) {
  const off = (t * speed) % (220 / 0.7);
  return (
    <g>
      <rect y="0" width={W} height={y} fill="#EFE8D8" />
      <path d={`M0 ${y - 70}c260-30 520-20 780-26s380-12 500-6v60H0Z`} fill="#C9CDB4" opacity=".7" />
      <rect y={y - 20} width={W} height={H - y + 20} fill="#E3D3B4" />
      <g stroke="#9A7B5E" strokeWidth="8" strokeLinecap="round">
        <path d={`M0 ${y}H${W}`} />
        <path d={`M0 ${y + 34}H${W}`} opacity=".75" />
      </g>
      <g fill={COL.brown}>
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x={i * 220 - off * 0.7} y={y - 14} width="12" height="74" rx="3" />
        ))}
      </g>
      <g fill="#D9C6A5" opacity=".7">
        {Array.from({ length: 12 }, (_, i) => (
          <ellipse key={i} cx={((i * 137 + 40 - t * speed) % (W + 120) + W + 120) % (W + 120) - 60} cy={y + 90 + (i % 4) * 26} rx="22" ry="5" />
        ))}
      </g>
    </g>
  );
}

/** Großes, pulsierendes Wort (z. B. „AUF“ / „AB“ oder Taktzahlen) */
export function BigWord({ x, y, text, on, color = COL.forest, size = 96 }: { x: number; y: number; text: string; on: number; color?: string; size?: number }) {
  const s = 0.86 + 0.14 * on;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={0.25 + 0.75 * on}>
      <text textAnchor="middle" fontFamily={FONT_DISPLAY} fontSize={size} fontWeight="800" fill={color}>
        {text}
      </text>
    </g>
  );
}

/** Kartenfeld mit Überschrift (Titel- und Merksatz-Karten) */
export function Card({ x, y, w, h, children, fill = COL.paper }: { x: number; y: number; w: number; h: number; children: ReactNode; fill?: string }) {
  return (
    <g>
      <rect x={x} y={y + 8} width={w} height={h} rx="28" fill="#80634D" opacity=".12" />
      <rect x={x} y={y} width={w} height={h} rx="28" fill={fill} />
      {children}
    </g>
  );
}
