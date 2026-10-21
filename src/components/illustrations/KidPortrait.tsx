import type { Character } from "@/content/types";

/**
 * Porträt eines Hofkinds. Nutzt das gemalte Porträt aus /public/kids,
 * sonst die einfache SVG-Zeichnung als Rückfall.
 */
export function KidPortrait({
  kid,
  className,
  sizes = "110px",
}: {
  kid: Character;
  className?: string;
  sizes?: string;
}) {
  if (kid.portrait) {
    const { base, alt } = kid.portrait;
    return (
      // eslint-disable-next-line @next/next/no-img-element -- statische WebP-Dateien mit srcset, kein Bildserver nötig
      <img
        src={`${base}-320.webp`}
        srcSet={`${base}-160.webp 160w, ${base}-320.webp 320w, ${base}-640.webp 640w`}
        sizes={sizes}
        width={320}
        height={320}
        alt={alt}
        className={className}
        style={{ aspectRatio: "1", objectFit: "cover", background: "#FBF7EE" }}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    );
  }
  return <KidSvg kid={kid} className={className} />;
}

function KidSvg({ kid, className }: { kid: Character; className?: string }) {
  const { skin, hair, hairStyle, shirt } = kid.look;
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label={kid.name}>
      <circle cx="50" cy="50" r="50" fill="#E8DCC4" />
      <path d="M18,100 C20,80 34,72 50,72 C66,72 80,80 82,100 Z" fill={shirt} />
      <rect x="44" y="60" width="12" height="14" rx="5" fill={skin} />
      {hairStyle === "braid" && (
        <path d="M66,46 C76,58 74,74 70,84 C66,80 64,70 64,60 Z" fill={hair} />
      )}
      {hairStyle === "curls" && (
        <g fill={hair}>
          <circle cx="50" cy="18" r="11" />
          <circle cx="30" cy="34" r="9" />
          <circle cx="70" cy="34" r="9" />
        </g>
      )}
      <ellipse cx="50" cy="44" rx="20" ry="22" fill={skin} />
      {/* Haare oben */}
      {hairStyle === "short" ? (
        <path d="M29,42 C27,26 38,18 50,18 C64,18 74,26 71,42 C66,32 58,30 50,31 C42,31 34,34 29,42 Z" fill={hair} />
      ) : (
        <path d="M29,46 C26,28 37,20 50,20 C64,20 75,28 71,46 C68,36 60,30 48,30 C40,30 34,36 29,46 Z" fill={hair} />
      )}
      {hairStyle === "curls" && (
        <g fill={hair}>
          <circle cx="32" cy="44" r="5" />
          <circle cx="68" cy="44" r="5" />
        </g>
      )}
      {/* Gesicht */}
      <circle cx="42" cy="46" r="2.4" fill="#2C2A24" />
      <circle cx="58" cy="46" r="2.4" fill="#2C2A24" />
      <circle cx="37" cy="53" r="3.2" fill="#D98C76" opacity=".35" />
      <circle cx="63" cy="53" r="3.2" fill="#D98C76" opacity=".35" />
      <path d="M44,55 C47,58 53,58 56,55" fill="none" stroke="#2C2A24" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
