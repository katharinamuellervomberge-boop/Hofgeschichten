import type { ReactNode } from "react";
import { AnimHorse, GAIT_DEFS, type LegId } from "@/components/illustrations/akademie/AnimHorse";
import { Rider, Tack } from "@/components/illustrations/akademie/RiderScene";
import { getHorse } from "@/content/horses";
import { BigWord, COL, Card, FONT_BODY, FONT_DISPLAY, Frame, ScrollingArena, clamp01, fade, smooth, type Timeline, type VideoDef } from "./kit";
import { riderBody, riseAmount } from "./leichttraben";

/* Reitbahn-Videos: Bahnfiguren (von oben) und „Auf dem richtigen Fuß“ */

type P = [number, number];

/* Bahn 20 × 40 m, A links, C rechts, K-E-H oben, F-B-M unten (wie in den Lektionen) */
const M = 15; // Pixel pro Meter
const AX = 90;
const AY = 175;
const TRACK = 1.2; // Hufschlag: 1,2 m von der Bande
const pt = (fromA: number, fromTop: number): P => [AX + fromA * M, AY + fromTop * M];

const LETTERS: Array<[string, P]> = [
  ["A", [AX - 30, AY + 10 * M]],
  ["C", [AX + 40 * M + 30, AY + 10 * M]],
  ["K", [AX + 6 * M, AY - 26]],
  ["E", [AX + 20 * M, AY - 26]],
  ["H", [AX + 34 * M, AY - 26]],
  ["F", [AX + 6 * M, AY + 20 * M + 26]],
  ["B", [AX + 20 * M, AY + 20 * M + 26]],
  ["M", [AX + 34 * M, AY + 20 * M + 26]],
];

function ArenaTop({ children, labels = true, sides }: { children?: ReactNode; labels?: boolean; sides?: "links" | "rechts" | null }) {
  return (
    <g>
      <rect x={AX - 16} y={AY - 16} width={40 * M + 32} height={20 * M + 32} rx="10" fill={COL.brown} />
      <rect x={AX} y={AY} width={40 * M} height={20 * M} fill="#E3D3B4" />
      <rect x={AX + TRACK * M} y={AY + TRACK * M} width={(40 - 2 * TRACK) * M} height={(20 - 2 * TRACK) * M} fill="none" stroke="#C4AC84" strokeWidth="2" strokeDasharray="6 6" />
      <circle cx={AX + 20 * M} cy={AY + 10 * M} r="4" fill={COL.brown} />
      <text x={AX + 20 * M + 10} y={AY + 10 * M + 20} fontFamily={FONT_BODY} fontSize="18" fill={COL.brown}>
        X
      </text>
      {labels &&
        LETTERS.map(([l, [x, y]]) => (
          <g key={l}>
            <circle cx={x} cy={y} r="17" fill={COL.paper} stroke={COL.brown} strokeWidth="2.5" />
            <text x={x} y={y + 7} textAnchor="middle" fontFamily={FONT_BODY} fontSize="20" fontWeight="700" fill={COL.forestDeep}>
              {l}
            </text>
          </g>
        ))}
      {sides && (
        <g fontFamily={FONT_BODY} fontSize="22" fontWeight="700">
          <text x={AX + 20 * M} y={AY + 10 * M - 30} textAnchor="middle" fill={COL.forest}>
            innen
          </text>
          <text x={AX + 20 * M} y={AY + 20 * M + 64} textAnchor="middle" fill={COL.rust}>
            außen = Bande
          </text>
        </g>
      )}
      {children}
    </g>
  );
}

/** Kleines Pferd von oben, Blickrichtung `ang` (Bogenmaß) */
function TopHorse({ at, ang, color = COL.forest }: { at: P; ang: number; color?: string }) {
  return (
    <g transform={`translate(${at[0]} ${at[1]}) rotate(${(ang * 180) / Math.PI})`}>
      <ellipse cx="0" cy="0" rx="22" ry="10" fill={color} />
      <path d="M16 -5 q16 -2 22 5 q-6 7 -22 5Z" fill={color} />
      <circle cx="-2" cy="0" r="6" fill={COL.paper} />
    </g>
  );
}

/* ---------- Wege als Punktfolgen ---------- */

type Path = P[];

function line(a: P, b: P, n = 40): Path {
  return Array.from({ length: n + 1 }, (_, i) => [a[0] + ((b[0] - a[0]) * i) / n, a[1] + ((b[1] - a[1]) * i) / n] as P);
}
function arc(c: P, r: number, a0: number, a1: number, n = 60): Path {
  return Array.from({ length: n + 1 }, (_, i) => {
    const a = a0 + ((a1 - a0) * i) / n;
    return [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)] as P;
  });
}
const join = (...ps: Path[]): Path => ps.flatMap((p, i) => (i === 0 ? p : p.slice(1)));

/** Ganze Bahn auf der linken Hand (von oben gegen den Uhrzeigersinn), Start bei A */
function ganzeBahnLinks(): Path {
  const t = TRACK;
  const r = 3; // ausgerittene Ecke
  return join(
    line(pt(t, 10), pt(t, 20 - t - r)),
    arc(pt(t + r, 20 - t - r), r * M, Math.PI, Math.PI / 2, 12),
    line(pt(t + r, 20 - t), pt(40 - t - r, 20 - t)),
    arc(pt(40 - t - r, 20 - t - r), r * M, Math.PI / 2, 0, 12),
    line(pt(40 - t, 20 - t - r), pt(40 - t, t + r)),
    arc(pt(40 - t - r, t + r), r * M, 0, -Math.PI / 2, 12),
    line(pt(40 - t - r, t), pt(t + r, t)),
    arc(pt(t + r, t + r), r * M, -Math.PI / 2, -Math.PI, 12),
    line(pt(t, t + r), pt(t, 10)),
  );
}

/** Durch die ganze Bahn wechseln: auf der linken Hand bis F, über X nach H, weiter auf der rechten Hand */
function wechsel(): Path {
  const t = TRACK;
  const r = 3;
  return join(
    line(pt(t, 10), pt(t, 20 - t - r), 20),
    arc(pt(t + r, 20 - t - r), r * M, Math.PI, Math.PI / 2, 10),
    line(pt(t + r, 20 - t), pt(6, 20 - t), 10),
    line(pt(6, 20 - t), pt(20, 10), 40),
    line(pt(20, 10), pt(34, t), 40),
    line(pt(34, t), pt(40 - t - r, t), 10),
    arc(pt(40 - t - r, t + r), r * M, -Math.PI / 2, 0, 10),
    line(pt(40 - t, t + r), pt(40 - t, 10), 16),
  );
}

/** Zirkel am A-Ende (Durchmesser 20 m), linke Hand */
function zirkel(): Path {
  return arc(pt(10, 10), (10 - TRACK) * M, Math.PI, Math.PI - 2 * Math.PI, 120);
}

/** Volte bei E (10 m), linke Hand: von E nach innen und zurück */
function volte(): Path {
  const t = TRACK;
  return join(line(pt(26, t), pt(20, t), 12), arc(pt(20, t + 5), 5 * M, -Math.PI / 2, -Math.PI / 2 - 2 * Math.PI, 90), line(pt(20, t), pt(14, t), 12));
}

/** Schlangenlinien durch die ganze Bahn, drei Bögen, von A nach C */
function schlange(): Path {
  return Array.from({ length: 181 }, (_, i) => {
    const x = TRACK + ((40 - 2 * TRACK) * i) / 180;
    const y = 10 - (10 - TRACK - 0.4) * Math.sin((3 * Math.PI * (x - TRACK)) / (40 - 2 * TRACK));
    return pt(x, y);
  });
}

function along(path: Path, u: number): { at: P; ang: number; done: Path } {
  const n = path.length - 1;
  const f = clamp01(u) * n;
  const i = Math.min(n - 1, Math.floor(f));
  const k = f - i;
  const a = path[i];
  const b = path[i + 1];
  const at: P = [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
  return { at, ang: Math.atan2(b[1] - a[1], b[0] - a[0]), done: [...path.slice(0, i + 1), at] };
}

const d = (p: Path) => p.map((q, i) => `${i ? "L" : "M"}${q[0].toFixed(1)},${q[1].toFixed(1)}`).join(" ");

function Figure({ path, u, color, ghost = true }: { path: Path; u: number; color: string; ghost?: boolean }) {
  const { at, ang, done } = along(path, u);
  return (
    <g>
      {ghost && <path d={d(path)} fill="none" stroke={color} strokeWidth="3" strokeDasharray="4 8" opacity=".45" />}
      <path d={d(done)} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <TopHorse at={at} ang={ang} color={color} />
    </g>
  );
}

function SideLabel({ title, text, color, y = 130 }: { title: string; text: string[]; color: string; y?: number }) {
  return (
    <Card x={760} y={y} w={470} h={70 + text.length * 34}>
      <rect x={760} y={y} width={12} height={70 + text.length * 34} rx="6" fill={color} />
      <text x={792} y={y + 48} fontFamily={FONT_DISPLAY} fontSize="34" fontWeight="700" fill={COL.forestDeep}>
        {title}
      </text>
      {text.map((l, i) => (
        <text key={l} x={792} y={y + 88 + i * 34} fontFamily={FONT_BODY} fontSize="22" fill={COL.inkSoft}>
          {l}
        </text>
      ))}
    </Card>
  );
}

function Title({ t, tl, kicker, heading, sub, kid }: { t: number; tl: Timeline; kicker: string; heading: string; sub: string; kid: string }) {
  const o = fade(t, 0, tl.end("titel"), 0.5);
  if (o <= 0) return null;
  return (
    <g opacity={o}>
      <rect width="1280" height="720" fill={COL.bg} opacity="0.9" />
      <Card x={250} y={170} w={780} h={300}>
        <image href={`/kids/${kid}-320.webp`} x={290} y={215} width={210} height={210} />
        <text x={540} y={270} fontFamily={FONT_BODY} fontSize="24" fontWeight="700" fill={COL.rust}>
          {kicker}
        </text>
        <text x={540} y={340} fontFamily={FONT_DISPLAY} fontSize="56" fontWeight="800" fill={COL.forestDeep}>
          {heading}
        </text>
        <text x={540} y={392} fontFamily={FONT_DISPLAY} fontSize="36" fontWeight="600" fill={COL.forest}>
          {sub}
        </text>
      </Card>
    </g>
  );
}

function MerkCard({ t, tl, lines }: { t: number; tl: Timeline; lines: string[] }) {
  const o = fade(t, tl.start("merke"), tl.total + 1, 0.5);
  if (o <= 0) return null;
  return (
    <g opacity={o}>
      <Card x={740} y={110} w={490} h={70 + lines.length * 52} fill={COL.forest}>
        <text x={772} y={166} fontFamily={FONT_BODY} fontSize="22" fontWeight="700" fill={COL.honey}>
          MERKSATZ
        </text>
        {lines.map((l, i) => (
          <text key={l} x={772} y={222 + i * 50} fontFamily={FONT_DISPLAY} fontSize="34" fontWeight="700" fill={COL.paper}>
            {l}
          </text>
        ))}
      </Card>
    </g>
  );
}

/* ---------- Video: Bahnfiguren ---------- */

const FIGS = [
  { id: "ganze", path: ganzeBahnLinks(), color: COL.forest, title: "Ganze Bahn", text: ["einmal ganz herum,", "Ecken ausreiten"] },
  { id: "wechsel", path: wechsel(), color: COL.rust, title: "Durch die ganze Bahn", text: ["wechseln: F – X – H,", "danach die andere Hand"] },
  { id: "zirkel", path: zirkel(), color: COL.honey, title: "Zirkel", text: ["großer Kreis, 20 m,", "an einer kurzen Seite"] },
  { id: "volte", path: volte(), color: COL.pairB, title: "Volte", text: ["kleiner Kreis,", "meist 6 bis 10 m"] },
  { id: "schlange", path: schlange(), color: COL.brown, title: "Schlangenlinien", text: ["gleichmäßige Bögen", "von A bis C"] },
] as const;

export const bahnfiguren: VideoDef = {
  slug: "bahnfiguren",
  title: "Bahnfiguren in der Reitbahn",
  world: "reiten-in-der-bahn",
  lesson: "ganze-bahn-und-handwechsel",
  lines: [
    { id: "titel", text: "Bahnfiguren – so reitest du in der Reitbahn.", pause: 0.8 },
    { id: "bahn", text: "Die Reitbahn ist oft zwanzig mal vierzig Meter groß. An der Bande stehen Buchstaben. So wissen alle, wo sie reiten.", pause: 0.8 },
    { id: "ganze", text: "Ganze Bahn: Du reitest an allen vier Seiten entlang und reitest die Ecken schön aus. Auf der linken Hand ist deine linke Seite innen.", pause: 0.8 },
    { id: "wechsel", text: "Durch die ganze Bahn wechseln: Du reitest schräg von F über X nach H. Danach bist du auf der anderen Hand.", pause: 0.8 },
    { id: "zirkel", text: "Der Zirkel ist ein großer Kreis an einer kurzen Seite. Er ist zwanzig Meter groß – so breit wie die Bahn.", pause: 0.8 },
    { id: "volte", text: "Die Volte ist ein kleiner Kreis. Meistens ist sie sechs, acht oder zehn Meter groß.", pause: 0.8 },
    { id: "schlange", text: "Schlangenlinien: Du reitest gleichmäßige Bögen von einem Ende der Bahn zum anderen.", pause: 0.8 },
    { id: "rund", text: "Bei allen Figuren gilt: rund reiten, nicht eckig. Und schau mit den Augen schon dorthin, wo du hinreiten willst.", pause: 1 },
    { id: "merke", text: "Merke: Mit den Buchstaben findest du dich in jeder Reitbahn zurecht.", pause: 1.5 },
  ],
  render: (t, tl) => {
    const bahn = fade(t, tl.start("bahn"), tl.end("bahn"));
    const rund = fade(t, tl.start("rund"), tl.end("rund"));
    return (
      <Frame t={t} tl={tl} chip="Große Reitakademie · Reitbahn">
        <ArenaTop>
          {FIGS.map((f) => {
            const o = fade(t, tl.start(f.id), tl.end(f.id) + 0.6, 0.35);
            if (o <= 0) return null;
            const u = smooth((t - tl.start(f.id) + 0.2) / (tl.end(f.id) - tl.start(f.id) + 0.4));
            return (
              <g key={f.id} opacity={o}>
                <Figure path={f.path} u={u} color={f.color} />
              </g>
            );
          })}
          {rund > 0 && (
            <g opacity={rund}>
              <Figure path={zirkel()} u={((t - tl.start("rund")) / 6) % 1} color={COL.honey} ghost />
            </g>
          )}
        </ArenaTop>
        {bahn > 0 && (
          <g opacity={bahn}>
            <SideLabel title="20 × 40 m" text={["A und C an den kurzen Seiten", "K, E, H und F, B, M an", "den langen Seiten, X in der Mitte"]} color={COL.brown} />
          </g>
        )}
        {FIGS.map((f) => {
          const o = fade(t, tl.start(f.id), tl.end(f.id) + 0.4);
          return o > 0 ? (
            <g key={f.id} opacity={o}>
              <SideLabel title={f.title} text={[...f.text]} color={f.color} />
            </g>
          ) : null;
        })}
        {rund > 0 && (
          <g opacity={rund}>
            <SideLabel title="Rund, nicht eckig" text={["Blick schon dorthin,", "wo du hinreiten willst"]} color={COL.honey} />
          </g>
        )}
        <MerkCard t={t} tl={tl} lines={["Ganze Bahn, Wechsel,", "Zirkel, Volte und", "Schlangenlinien –", "die Buchstaben helfen."]} />
        <Title t={t} tl={tl} kicker="GROSSE REITAKADEMIE · REITEN IN DER BAHN" heading="Bahnfiguren" sub="– so reitest du in der Bahn" kid="mila" />
      </Frame>
    );
  },
};

/* ---------- Video: Auf dem richtigen Fuß ---------- */

const TROT = GAIT_DEFS.trab;
const K = 1.5;
const X0 = 80;
const GROUND_Y = 545;
const Y0 = GROUND_Y - 285 * K;

export const richtigerFuss: VideoDef = {
  slug: "richtiger-fuss",
  title: "Auf dem richtigen Fuß leichttraben",
  world: "trab-reiten",
  lesson: "richtiger-fuss",
  lines: [
    { id: "titel", text: "Auf dem richtigen Fuß leichttraben.", pause: 0.8 },
    { id: "seiten", text: "In der Reitbahn gibt es innen und außen. Innen ist die Seite zur Mitte, außen die Seite zur Bande.", pause: 0.8 },
    { id: "hand", text: "Auf der linken Hand ist links innen und rechts außen.", pause: 0.8 },
    { id: "sitzen", text: "Du sitzt ein, wenn das innere Hinterbein und das äußere Vorderbein auffußen …", pause: 0.3 },
    { id: "aufstehen", text: "… und du stehst auf, wenn diese beiden Beine nach vorne schwingen.", pause: 1 },
    { id: "schulter", text: "Zur Kontrolle schaust du kurz, nur mit den Augen, auf die äußere Schulter. Geht sie nach vorne, bist du oben.", pause: 1 },
    { id: "wechsel", text: "Wechselst du die Hand, ändern sich innen und außen. Dann bleibst du einen Takt länger sitzen: ab – ab – auf.", pause: 1.5 },
    { id: "merke", text: "Merke: Äußere Schulter vor – du bist oben. Beim Handwechsel einmal doppelt sitzen.", pause: 1.5 },
  ],
  render: (t, tl) => {
    const look = getHorse("tonga")!.look;
    const top = fade(t, tl.start("seiten"), tl.end("hand"));
    const side = t > tl.start("sitzen") - 0.4;
    const wech = fade(t, tl.start("wechsel"), tl.end("wechsel") + 0.4);
    // Doppelt einsitzen: ab einem Einsitz-Moment im Satz „wechsel“ eine halbe Bewegung lang unten bleiben
    const cyc = TROT.cycle;
    const ws = tl.start("wechsel") + 2;
    const sitAt = Math.ceil((ws / cyc) - 0.25) * cyc + 0.25 * cyc;
    const u = t < sitAt ? riseAmount(t) : t < sitAt + cyc / 2 ? 0 : riseAmount(t - cyc / 2);
    const rechts = t >= sitAt; // nach dem Wechsel: rechte Hand, außen ist links
    const b = riderBody(u);
    const hl: Partial<Record<LegId, string>> = rechts ? { HR: COL.forest, VL: COL.rust } : { HL: COL.forest, VR: COL.rust };
    const showLegs = fade(t, tl.start("sitzen"), tl.end("schulter"));
    const beatWord = u > 0.5 ? "AUF" : "ab";
    return (
      <Frame t={t} tl={tl} chip="Große Reitakademie · Trab">
        {(side || wech > 0) && (
          <g>
            <ScrollingArena t={t} speed={(TROT.stride / (TROT.duty * TROT.cycle)) * K} y={400} />
            <svg x={X0} y={Y0} width={320 * K} height={292 * K} viewBox="70 20 320 292" overflow="visible">
              <AnimHorse look={look} gait="trab" time={t} highlight={showLegs > 0.3 || wech > 0.3 ? hl : {}}>
                <Tack hand={b.hand} longRein={false} stirrupsDown={false} />
                <Rider b={b} pose={u > 0.5 ? "leicht" : "sitz"} />
              </AnimHorse>
            </svg>
            <Card x={760} y={110} w={470} h={300}>
              <text x={792} y={160} fontFamily={FONT_BODY} fontSize="22" fontWeight="700" fill={COL.rust}>
                {rechts ? "RECHTE HAND" : "LINKE HAND"}
              </text>
              <circle cx={800} cy={196} r="12" fill={COL.forest} />
              <text x={822} y={204} fontFamily={FONT_BODY} fontSize="22" fill={COL.ink}>
                inneres Hinterbein ({rechts ? "rechts" : "links"})
              </text>
              <circle cx={800} cy={236} r="12" fill={COL.rust} />
              <text x={822} y={244} fontFamily={FONT_BODY} fontSize="22" fill={COL.ink}>
                äußeres Vorderbein ({rechts ? "links" : "rechts"})
              </text>
              <BigWord x={995} y={360} text={beatWord} on={beatWord === "AUF" ? 1 : 0.5} color={beatWord === "AUF" ? COL.honey : COL.brown} size={88} />
            </Card>
          </g>
        )}
        {wech > 0 && t < sitAt + cyc * 1.5 && t > sitAt - cyc && (
          <g opacity={wech}>
            <rect x={X0 + 10} y={100} width={250} height={44} rx="22" fill={COL.rust} />
            <text x={X0 + 135} y={130} textAnchor="middle" fontFamily={FONT_BODY} fontSize="22" fontWeight="700" fill={COL.paper}>
              doppelt sitzen!
            </text>
          </g>
        )}
        {top > 0 && (
          <g opacity={top}>
            <rect width="1280" height="720" fill={COL.bg} />
            <ArenaTop sides="links">
              <Figure path={ganzeBahnLinks()} u={((t - tl.start("seiten")) / 9) % 1} color={COL.forest} ghost={false} />
            </ArenaTop>
            <SideLabel title="Linke Hand" text={["links = innen (zur Mitte)", "rechts = außen (zur Bande)"]} color={COL.forest} y={140} />
          </g>
        )}
        <MerkCard t={t} tl={tl} lines={["Äußere Schulter vor –", "du bist oben.", "Handwechsel:", "einmal doppelt sitzen."]} />
        <Title t={t} tl={tl} kicker="GROSSE REITAKADEMIE · TRAB REITEN" heading="Der richtige Fuß" sub="– beim Leichttraben" kid="lea" />
      </Frame>
    );
  },
};
