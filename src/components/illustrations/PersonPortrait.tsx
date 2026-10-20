import type { Person } from "@/content/people";

/** Rundes Porträt einer Fallfigur – gleiche Bildsprache wie die Kinderporträts. */
export function PersonPortrait({ person, className }: { person: Person; className?: string }) {
  const { skin, hair, hairStyle, shirt, hat, glasses, pencil, mustache, scarf, headphones } = person.look;
  const line = "#2C2A24";
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label={person.name}>
      <circle cx="50" cy="50" r="50" fill="#E8DCC4" />
      <path d="M16,100 C18,80 32,72 50,72 C68,72 82,80 84,100 Z" fill={shirt} />
      {scarf && <path d="M34,74 C42,82 58,82 66,74 L64,84 C56,88 44,88 36,84 Z" fill={scarf} />}
      <rect x="44" y="60" width="12" height="14" rx="5" fill={skin} />

      {hairStyle === "ponytail" && <path d="M68,34 C82,40 82,62 72,72 C70,62 70,48 64,40 Z" fill={hair} />}
      {hairStyle === "bun" && <circle cx="50" cy="18" r="10" fill={hair} />}

      <ellipse cx="50" cy="44" rx="20" ry="22" fill={skin} />

      {hairStyle === "spiky" && (
        <path d="M28,40 L30,24 L36,30 L40,16 L46,26 L52,14 L56,26 L62,16 L64,30 L70,24 L72,40 C66,32 58,30 50,30 C42,30 34,32 28,40 Z" fill={hair} />
      )}
      {hairStyle === "short" && (
        <path d="M29,42 C27,26 38,18 50,18 C64,18 74,26 71,42 C66,32 58,30 50,31 C42,31 34,34 29,42 Z" fill={hair} />
      )}
      {hairStyle === "bob" && (
        <path d="M27,56 C22,30 36,20 50,20 C66,20 78,30 73,56 C70,46 70,38 62,32 C54,36 42,36 34,32 C30,38 30,46 27,56 Z" fill={hair} />
      )}
      {(hairStyle === "bun" || hairStyle === "ponytail") && (
        <path d="M29,46 C26,28 37,20 50,20 C64,20 75,28 71,46 C68,36 60,30 48,30 C40,30 34,36 29,46 Z" fill={hair} />
      )}

      {hat?.type === "cap" && (
        <g>
          <path d="M28,34 C28,20 40,14 50,14 C62,14 72,20 72,34 Z" fill={hat.color} />
          <path d="M24,34 H78 C78,38 74,40 70,40 H28 C25,40 24,37 24,34 Z" fill={hat.color} stroke={line} strokeWidth="1.2" />
        </g>
      )}
      {hat?.type === "brim" && (
        <g>
          <path d="M34,30 C34,16 42,12 50,12 C58,12 66,16 66,30 Z" fill={hat.color} />
          <rect x="34" y="24" width="32" height="5" fill="#6E3B3F" />
          <ellipse cx="50" cy="31" rx="28" ry="5" fill={hat.color} />
        </g>
      )}

      {pencil && (
        <g transform="rotate(-28 72 36)">
          <rect x="66" y="33" width="22" height="6" rx="1" fill="#D9803E" stroke={line} strokeWidth="1" />
          <path d="M88,33 L94,36 L88,39 Z" fill="#E8C9A0" stroke={line} strokeWidth="1" />
        </g>
      )}

      {headphones && (
        <path d="M30,62 C24,74 30,84 50,86 C70,84 76,74 70,62" fill="none" stroke={headphones} strokeWidth="6" strokeLinecap="round" />
      )}

      {/* Gesicht */}
      <circle cx="42" cy="46" r="2.4" fill={line} />
      <circle cx="58" cy="46" r="2.4" fill={line} />
      {glasses && (
        <g fill="none" stroke={line} strokeWidth="1.8">
          <circle cx="42" cy="46" r="6" />
          <circle cx="58" cy="46" r="6" />
          <path d="M48,46 H52" />
        </g>
      )}
      <circle cx="36" cy="54" r="3" fill="#D98C76" opacity=".3" />
      <circle cx="64" cy="54" r="3" fill="#D98C76" opacity=".3" />
      {mustache ? (
        <path d="M40,56 C44,52 48,54 50,55 C52,54 56,52 60,56 C56,59 52,58 50,57 C48,58 44,59 40,56 Z" fill={mustache} />
      ) : (
        <path d="M44,56 C47,59 53,59 56,56" fill="none" stroke={line} strokeWidth="2" strokeLinecap="round" />
      )}
    </svg>
  );
}
