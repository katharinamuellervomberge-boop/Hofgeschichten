import type { HorseLook } from "@/content/types";

export type EarMood = "neugierig" | "entspannt" | "grummelig" | "aufgeregt";

type Props = {
  look: HorseLook;
  mood: EarMood;
  className?: string;
  title?: string;
};

/* Ohrform, Basis im Ursprung, Spitze nach oben */
const EAR = "M-9,0 C-12,-22 -6,-42 1,-54 C9,-42 13,-22 9,0 Z";
const EAR_INNER = "M-4,-4 C-6,-20 -3,-34 1,-44 C5,-34 7,-20 4,-4 Z";

/** Ohrwinkel je Stimmung (Grad, positiv = nach vorne zur Nase) */
const EAR_ANGLE: Record<EarMood, { near: number; far: number; scaleY: number }> = {
  neugierig: { near: 18, far: 10, scaleY: 1 },
  entspannt: { near: -48, far: -30, scaleY: 0.82 },
  grummelig: { near: -84, far: -80, scaleY: 0.95 },
  aufgeregt: { near: 8, far: 2, scaleY: 1.08 },
};

/** Großer Pferdekopf im Profil – für das Pferdesprache-Spiel. */
export function HorseHead({ look, mood, className, title }: Props) {
  const ear = EAR_ANGLE[mood];
  return (
    <svg viewBox="0 0 260 240" className={className} role="img" aria-label={title ?? "Pferdekopf"}>
      {/* Hals */}
      <path
        d="M40,240 C46,190 60,130 92,86 L150,150 C132,180 120,210 118,240 Z"
        fill={look.coat}
      />
      {/* Mähne */}
      <path d="M40,240 C42,180 58,120 90,80 C96,74 104,72 108,76 C84,110 70,170 66,240 Z" fill={look.maneLight ?? look.mane} />

      {/* fernes Ohr */}
      <g transform={`translate(110 62) rotate(${ear.far}) scale(1 ${ear.scaleY})`}>
        <path d={EAR} fill={look.coatShade} />
      </g>

      {/* Kopf */}
      <path
        d="M96,70 C110,56 132,56 146,66 C168,84 196,128 218,168 C228,186 222,204 204,208 C190,211 178,206 170,198 C160,194 148,192 138,184 C112,172 92,150 86,124 C82,104 84,84 96,70 Z"
        fill={look.coat}
      />
      {/* Ganasche */}
      <path d="M96,150 C84,128 92,104 116,104" fill="none" stroke={look.coatShade} strokeWidth="3" strokeLinecap="round" opacity="0.6" />

      {/* nahes Ohr */}
      <g transform={`translate(122 64) rotate(${ear.near}) scale(1 ${ear.scaleY})`}>
        <path d={EAR} fill={look.coat} />
        <path d={EAR_INNER} fill={look.coatShade} />
      </g>

      {/* Schopf */}
      <path d="M118,60 C134,58 146,66 148,82 C140,76 130,72 118,70 Z" fill={look.mane} />

      {look.face === "blaze" && (
        <path d="M150,82 C162,98 180,128 196,160 C204,176 210,188 212,196 C206,198 202,196 199,192 C190,170 176,140 162,112 C156,100 150,90 150,82 Z" fill="#F7F3EC" />
      )}
      {look.face === "star" && <path d="M164,110 l5,10 11,2 -8,7 2,11 -10,-5 -10,5 2,-11 -8,-7 11,-2 Z" fill="#F7F3EC" />}

      {/* Auge */}
      {mood === "entspannt" ? (
        <>
          <path d="M126,104 C132,110 142,110 148,104" fill="none" stroke="#1A120D" strokeWidth="3" strokeLinecap="round" />
          <path d="M128,108 l-2,4 M136,110 l-1,4 M144,108 l1,4" stroke="#1A120D" strokeWidth="1.6" strokeLinecap="round" />
        </>
      ) : mood === "aufgeregt" ? (
        <>
          {/* weit aufgerissenes Auge, das Weiße ist sichtbar */}
          <ellipse cx="137" cy="104" rx="10.5" ry="10" fill="#FBF8F1" stroke="#1A120D" strokeWidth="2" />
          <circle cx="139" cy="104" r="6" fill="#1A120D" />
          <circle cx="141" cy="101.5" r="1.8" fill="#fff" />
          <path d="M124,92 C130,86 144,86 150,91" fill="none" stroke="#1A120D" strokeWidth="2.2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <ellipse cx="137" cy="104" rx="7" ry={mood === "grummelig" ? 5 : 7} fill="#1A120D" />
          {mood === "grummelig" && <path d="M127,100 C132,104 142,104 148,98" fill={look.coat} stroke="#1A120D" strokeWidth="2.5" strokeLinecap="round" />}
          <circle cx="139.5" cy="101.5" r="2" fill="#fff" opacity="0.9" />
          {mood === "neugierig" && <path d="M126,96 C131,90 142,90 148,95" fill="none" stroke="#1A120D" strokeWidth="2" strokeLinecap="round" opacity="0.6" />}
        </>
      )}

      {/* Nüster */}
      {mood === "aufgeregt" ? (
        <ellipse cx="203" cy="174" rx="8" ry="6.5" fill="#2B1D16" opacity=".85" />
      ) : mood === "grummelig" ? (
        <path d="M198,176 C202,172 208,173 210,178" fill="none" stroke="#2B1D16" strokeWidth="3.5" strokeLinecap="round" />
      ) : (
        <path d="M196,174 C200,166 210,168 211,178" fill="none" stroke="#2B1D16" strokeWidth="3" strokeLinecap="round" />
      )}
      {/* Maul */}
      <path
        d={mood === "grummelig" ? "M176,198 C184,200 192,201 200,200" : "M178,196 C186,202 194,204 202,202"}
        fill="none"
        stroke="#2B1D16"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}
