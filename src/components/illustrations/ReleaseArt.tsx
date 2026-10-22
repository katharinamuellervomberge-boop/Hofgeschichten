import { horses } from "@/content/horses";
import type { ReleaseArt as Art, Season } from "@/content/membership";
import { HorseHead } from "./HorseHead";
import { HofMorgenScene, StallboxScene } from "./scenes/HofTag";

/** Titelbilder der Freitagsfolgen und saisonale Monatsbilder (Markenpalette, Kinderbuch-Stil). */

const OUT = "#5E4636";

function Advent({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 600" className={className} role="img" aria-label="Ein Adventskranz mit einer brennenden Kerze im Stallfenster">
      <rect width="800" height="600" fill="#3E4F43" />
      {[[90, 80], [180, 160], [320, 60], [520, 110], [660, 70], [740, 180], [440, 200]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 2 ? 3 : 4} fill="#FBF8F1" opacity=".85" />
      ))}
      <rect x="200" y="140" width="400" height="300" rx="10" fill="#5E4636" />
      <rect x="226" y="166" width="348" height="250" rx="6" fill="#F2DDB3" />
      <path d="M400 166v250M226 290h348" stroke="#5E4636" strokeWidth="10" />
      <ellipse cx="400" cy="470" rx="230" ry="46" fill="#4F6A47" />
      {Array.from({ length: 18 }, (_, i) => {
        const a = (i / 18) * Math.PI * 2;
        return <ellipse key={i} cx={400 + Math.cos(a) * 190} cy={470 + Math.sin(a) * 36} rx="34" ry="14" fill={i % 2 ? "#6F8660" : "#7E9468"} />;
      })}
      {[-130, -45, 45, 130].map((dx, i) => (
        <g key={dx}>
          <rect x={400 + dx - 16} y="380" width="32" height="80" rx="4" fill={i === 0 ? "#A4573A" : "#E8DCC4"} stroke={OUT} strokeWidth="3" />
          <path d={`M${400 + dx} 380v-10`} stroke={OUT} strokeWidth="3" />
          {i === 0 && <path d={`M${400 + dx} 368c-12-16 0-30 0-38 10 12 12 26 0 38Z`} fill="#F2A65A" />}
        </g>
      ))}
      <circle cx="560" cy="476" r="12" fill="#A4573A" />
      <circle cx="250" cy="480" r="10" fill="#A4573A" />
    </svg>
  );
}

function Sprache({ className }: { className?: string }) {
  const t = horses.find((h) => h.slug === "tivoli")!;
  return (
    <div className={className} style={{ background: "#DDE3D6", display: "grid", placeItems: "center", aspectRatio: "4 / 3" }}>
      <HorseHead look={t.look} mood="neugierig" title="Tivoli spitzt die Ohren" />
    </div>
  );
}

export function ReleaseArt({ art, className }: { art: Art; className?: string }) {
  switch (art) {
    case "hof":
      return <HofMorgenScene className={className} />;
    case "stall":
      return <StallboxScene className={className} />;
    case "sprache":
      return <Sprache className={className} />;
    case "advent":
      return <Advent className={className} />;
  }
}

const SEASON = {
  herbst: { sky: "#F3DDBF", hill: "#C9A15E", tree: "#C2703A", accent: "#D9803E" },
  winter: { sky: "#E4E9EC", hill: "#F7F3EC", tree: "#5E7360", accent: "#FBF8F1" },
  fruehling: { sky: "#EAF0DE", hill: "#9FAE8A", tree: "#E3B4A4", accent: "#F7F3EC" },
  sommer: { sky: "#F6E7B8", hill: "#8FA07A", tree: "#6F8660", accent: "#F6D58C" },
} as const;

/** Kleines saisonales Bild für die Jahresübersicht */
export function SeasonArt({ season, className }: { season: Season; className?: string }) {
  const c = SEASON[season];
  return (
    <svg viewBox="0 0 160 100" className={className} aria-hidden>
      <rect width="160" height="100" fill={c.sky} />
      {season === "sommer" && <circle cx="128" cy="24" r="14" fill="#F2C46B" />}
      <path d="M0 66c40-16 80-18 160-6v40H0Z" fill={c.hill} />
      <path d="M44 70V44" stroke="#5E4636" strokeWidth="5" strokeLinecap="round" />
      <circle cx="44" cy="38" r="16" fill={c.tree} />
      {season === "winter" &&
        [[20, 20], [70, 12], [100, 30], [140, 16], [120, 50], [30, 50]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.5" fill="#FBF8F1" stroke="#C7CDB4" strokeWidth=".8" />)}
      {season === "herbst" && [[70, 60], [96, 72], [118, 62]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="5" ry="3" fill={c.accent} transform={`rotate(${i * 40} ${x} ${y})`} />)}
      {season === "fruehling" && [[80, 70], [100, 76], [122, 70], [140, 78]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" fill={c.accent} stroke="#E3B4A4" strokeWidth="1" />)}
      <path d="M96 66v-10M108 66v-10M96 56h12" stroke="#80634D" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
