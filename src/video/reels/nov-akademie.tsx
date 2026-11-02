import { GaitScene } from "@/components/illustrations/akademie/AkademieArt";
import { AK_SCENES } from "@/components/illustrations/akademie/scenes";
import { COL, FONT_BODY, PAPER, T, wrapText } from "./nov-kit";

/* Echte Inhalte der Hofgeschichten-Reitakademie für die Verkaufs-Reels (04, 07):
   Startseite (Texte aus AcademyHome.tsx, Module aus content/akademie/module.ts) und drei echte Lektionen
   (Texte „mittel“ aus welten/*.server.ts, Bilder = dieselben Szenen wie in der App). Nachgebaut im App-Stil,
   keine erfundenen Funktionen. Bildschirm lokal 488 × 1034. */

export const SW = 488;

function Scene({ name, x, y, w, gait }: { name?: string; x: number; y: number; w: number; gait?: "trab" }) {
  const h = (w * 600) / 800;
  const C = name ? AK_SCENES[name]?.component : null;
  return (
    <svg x={x} y={y} width={w} height={h} viewBox="0 0 800 600">
      {gait ? <GaitScene gait={gait} animate={false} /> : C ? <C /> : null}
    </svg>
  );
}

const MODULES: Array<[number, string, string, string, string]> = [
  [1, "Pferde verstehen", "Körpersprache, Herde, Sinne, Bedürfnisse und Verhalten des Fluchttiers Pferd.", "#E3E7DA", "ak-zonen"],
  [2, "Umgang mit Pferden", "Sicherheit, Putzen, Hufe, Führen, Satteln und Trensen.", "#EDE3CF", "ak-sattelzeug"],
  [3, "Reiten lernen", "Aufsteigen, Sitz, Balance – Schritt, Trab und Galopp.", "#DDE3D6", "ak-reiter-sitz"],
  [4, "Reiterhilfen", "Gewicht, Schenkel, Zügel – anreiten, anhalten, Übergänge.", "#E8DCC4", "ak-reiter-hilfen"],
  [5, "Bahnfiguren und Bahnregeln", "Ecken, Handwechsel, Zirkel, Volten und Schlangenlinien.", "#E3E7DA", "ak-bahn-zirkel"],
];

/** Startseite der Akademie (Lernweg Erwachsene), `scroll` in px */
export function HomeScreen({ scroll = 0 }: { scroll?: number }) {
  return (
    <g transform={`translate(0 ${-scroll})`}>
      <rect width={SW} height={2000} fill={COL.bg} />
      <T x={24} y={92} size={17} font={FONT_BODY} weight={700} color={COL.rust} anchor="start">DIE REITAKADEMIE · ERWACHSENE</T>
      {wrapText("Reiten verstehen – Schritt für Schritt.", 20).map((l, i) => (
        <T key={i} x={24} y={142 + i * 42} size={38} anchor="start">{l}</T>
      ))}
      {wrapText("9 Module vom ersten Kontakt mit dem Pferd über Bahnfiguren und Hilfen bis zu Dressur und Springen – mit Erklärungen, Lernvideos, Übungen und Quiz.", 40).map((l, i) => (
        <T key={i} x={24} y={238 + i * 26} size={18} font={FONT_BODY} weight={400} color={COL.inkSoft} anchor="start">{l}</T>
      ))}
      <T x={24} y={380} size={26} anchor="start">Module</T>
      {MODULES.map(([n, title, teaser, tint, cover], i) => {
        const y = 404 + i * 168;
        return (
          <g key={n}>
            <rect x={16} y={y} width={SW - 32} height={152} rx="20" fill={PAPER} stroke={COL.sand} strokeWidth="1.5" />
            <rect x={28} y={y + 12} width={140} height={128} rx="14" fill={tint} />
            <svg x={28} y={y + 12} width={140} height={128} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
              {(() => { const C = AK_SCENES[cover]?.component; return C ? <C /> : null; })()}
            </svg>
            <circle cx={50} cy={y + 34} r={16} fill={COL.forest} />
            <T x={50} y={y + 41} size={18} font={FONT_BODY} weight={700} color={PAPER}>{String(n)}</T>
            {wrapText(title, 18).map((l, j) => (
              <T key={j} x={184} y={y + 40 + j * 26} size={22} anchor="start">{l}</T>
            ))}
            {wrapText(teaser, 28).slice(0, 3).map((l, j) => (
              <T key={j} x={184} y={y + (title.length > 18 ? 98 : 72) + j * 22} size={15} font={FONT_BODY} weight={400} color={COL.inkSoft} anchor="start">{l}</T>
            ))}
          </g>
        );
      })}
    </g>
  );
}

type Lesson = { module: string; n: string; title: string; intro: string; text: string; scene?: string; gait?: "trab"; terms: Array<[string, string]> };
export const LESSONS: Record<"gang" | "hilfen" | "bahn", Lesson> = {
  gang: {
    module: "Reiten lernen · Trab",
    n: "Lektion 1",
    title: "Der Zweitakt",
    intro: "Der Trab ist schwungvoller als der Schritt. Sein Geheimnis sind die diagonalen Beinpaare.",
    text: "Der Trab ist ein Zweitakt. Das Pferd bewegt jeweils zwei diagonale Beine gleichzeitig: hinten links mit vorne rechts, dann hinten rechts mit vorne links.",
    gait: "trab",
    terms: [["Zweitakt", "Zwei Hufschläge pro Bewegungsablauf."], ["Diagonales Beinpaar", "Ein Vorderbein und das gegenüberliegende Hinterbein."]],
  },
  hilfen: {
    module: "Reiterhilfen",
    n: "Lektion 2",
    title: "Schenkelhilfen",
    intro: "Der Unterschenkel liegt dicht am Pferd. Je nachdem, wo er wirkt, bedeutet er etwas anderes.",
    text: "Liegt er am Gurt, wirkt er vorwärtstreibend: Ein kurzer Impuls bittet das Pferd, loszugehen oder fleißiger zu laufen.",
    scene: "ak-reiter-schenkel",
    terms: [["Vorwärtstreibend", "Der Schenkel am Gurt bittet das Pferd vorwärts."], ["Verwahrend", "Der Schenkel hinter dem Gurt passt auf."]],
  },
  bahn: {
    module: "Bahnfiguren und Bahnregeln",
    n: "Lektion 3",
    title: "Zirkel und Volte",
    intro: "Zirkel und Volte sind Kreise in verschiedenen Größen.",
    text: "Der Zirkel ist ein großer Kreis, der in einer 20 × 40-Meter-Bahn einen Durchmesser von 20 Metern hat.",
    scene: "ak-bahn-zirkel",
    terms: [["Zirkel", "Großer Kreis über die ganze Bahnbreite (20 m)."], ["Volte", "Kleiner Kreis, meist 6 bis 10 m Durchmesser."]],
  },
};

/** Lektionsseite: Einstieg, Erklärung mit Bild, „Schon gewusst?“ (wie in der App) */
export function LessonScreen({ which, scroll = 0 }: { which: keyof typeof LESSONS; scroll?: number }) {
  const l = LESSONS[which];
  return (
    <g transform={`translate(0 ${-scroll})`}>
      <rect width={SW} height={2000} fill={COL.bg} />
      <T x={24} y={88} size={16} font={FONT_BODY} weight={700} color={COL.forest} anchor="start">{`← ${l.module}`}</T>
      <T x={24} y={124} size={16} font={FONT_BODY} weight={700} color={COL.rust} anchor="start">{l.n.toUpperCase()}</T>
      <T x={24} y={168} size={40} anchor="start">{l.title}</T>
      {wrapText(l.intro, 46).slice(0, 2).map((s, i) => (
        <T key={i} x={24} y={210 + i * 26} size={16} font={FONT_BODY} weight={700} color={COL.forestDeep} anchor="start">{s}</T>
      ))}
      <rect x={16} y={276} width={SW - 32} height={(SW - 32) * 0.75 + 8} rx="18" fill={PAPER} />
      <Scene name={l.scene} gait={l.gait} x={20} y={280} w={SW - 40} />
      {wrapText(l.text, 42).map((s, i) => (
        <T key={i} x={24} y={652 + i * 25} size={17} font={FONT_BODY} weight={400} color={COL.ink} anchor="start">{s}</T>
      ))}
      <rect x={16} y={770} width={SW - 32} height={200} rx="18" fill={COL.sage} />
      <T x={36} y={808} size={20} anchor="start" color={COL.forest}>Schon gewusst?</T>
      {l.terms.map(([a, b], i) => (
        <g key={a}>
          <T x={36} y={850 + i * 58} size={17} font={FONT_BODY} weight={700} color={COL.forestDeep} anchor="start">{a}</T>
          <T x={36} y={874 + i * 58} size={15} font={FONT_BODY} weight={400} color={COL.inkSoft} anchor="start">{b}</T>
        </g>
      ))}
      <rect x={16} y={990} width={(SW - 44) / 2} height={52} rx="26" fill={COL.forest} />
      <T x={16 + (SW - 44) / 4} y={1023} size={18} font={FONT_BODY} weight={700} color={PAPER}>Übung</T>
      <rect x={28 + (SW - 44) / 2} y={990} width={(SW - 44) / 2} height={52} rx="26" fill={COL.honey} />
      <T x={28 + (3 * (SW - 44)) / 4} y={1023} size={18} font={FONT_BODY} weight={700} color={COL.forestDeep}>Quiz</T>
    </g>
  );
}
