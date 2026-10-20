import type { ReactNode } from "react";
/** Illustrierte Gegenstände für die Spiele (64×64, Markenpalette). */

export type ItemName =
  | "heu"
  | "gras"
  | "karotte"
  | "apfel"
  | "wasser"
  | "schokolade"
  | "bonbon"
  | "kuchen"
  | "hufeisen"
  | "sattel"
  | "halfter"
  | "buerste"
  | "hufkratzer"
  | "kamm"
  | "striegel"
  | "strick"
  | "fell"
  | "huf"
  | "maehne"
  | "fuehren"
  | "reiten"
  | "pferd"
  | "rasenschnitt"
  | "kuerbis"
  | "laterne"
  | "haken"
  | "tuer"
  | "leder"
  | "haare"
  | "tor"
  | "decke"
  | "huette"
  | "zettel"
  | "lupe"
  | "handschuh"
  | "reflektor"
  | "garn"
  | "schere";

const OUT = "#5E4636"; // Konturfarbe

const items: Record<ItemName, ReactNode> = {
  heu: (
    <>
      <rect x="8" y="22" width="48" height="30" rx="10" fill="#E3C47A" stroke={OUT} strokeWidth="2.5" />
      <path d="M14 31h36M12 39h40M15 46h34" stroke="#B8954D" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M24 22v30M40 22v30" stroke="#A4573A" strokeWidth="2.5" />
      <path d="M12 22c2-5 6-6 8-3M44 21c3-4 7-4 8 0M28 21c1-5 5-6 7-2" stroke="#B8954D" strokeWidth="2" fill="none" strokeLinecap="round" />
    </>
  ),
  gras: (
    <>
      <path d="M12 54c4-14 2-26-2-36 8 8 12 20 12 34M22 54c0-16 2-30 8-40 1 14 2 28 0 40M30 54c2-12 8-22 16-28-4 10-6 20-6 28M40 54c2-8 6-14 12-18-2 6-4 12-4 18" fill="#7E9468" stroke="#4F6A47" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M6 54h52" stroke={OUT} strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
  karotte: (
    <>
      <path d="M18 50c-4 4 0 8 4 5L46 30c4-4 2-12-6-12-4 0-6 2-8 5Z" fill="#D9803E" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M26 36l4 3M22 43l4 3M33 28l3 3" stroke="#A4573A" strokeWidth="2" strokeLinecap="round" />
      <path d="M44 20c2-8 8-12 12-10-2 4-6 8-10 11M46 22c6-2 12 0 12 4-4 1-9 0-12-2M42 18c-2-6 0-12 4-12 1 4 0 9-2 12" fill="#7E9468" stroke="#4F6A47" strokeWidth="2" strokeLinejoin="round" />
    </>
  ),
  apfel: (
    <>
      <path d="M32 20c-6-4-18-4-20 8-2 12 6 26 14 26 3 0 4-2 6-2s3 2 6 2c8 0 16-14 14-26-2-12-14-12-20-8Z" fill="#B85A3E" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M32 20c0-6 2-10 4-12" stroke={OUT} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M35 14c4-6 12-6 14-4-4 5-10 6-14 4Z" fill="#7E9468" stroke="#4F6A47" strokeWidth="2" />
      <path d="M20 30c1-4 4-6 7-6" stroke="#FBF8F1" strokeWidth="2.5" strokeLinecap="round" opacity=".7" fill="none" />
    </>
  ),
  wasser: (
    <>
      <path d="M14 24h36l-4 28c0 2-2 4-4 4H22c-2 0-4-2-4-4Z" fill="#80634D" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
      <ellipse cx="32" cy="24" rx="18" ry="5" fill="#8FB3BE" stroke={OUT} strokeWidth="2.5" />
      <path d="M14 24c0-12 36-12 36 0" fill="none" stroke={OUT} strokeWidth="2.2" />
      <path d="M17 36h30" stroke="#5E4636" strokeWidth="2" opacity=".6" />
      <path d="M44 10c3 4 4 7 4 9a4 4 0 0 1-8 0c0-2 1-5 4-9Z" fill="#8FB3BE" stroke={OUT} strokeWidth="2" />
    </>
  ),
  schokolade: (
    <>
      <rect x="14" y="10" width="36" height="46" rx="4" fill="#5E3B2A" stroke="#3B261B" strokeWidth="2.5" />
      <path d="M14 25h36M14 40h36M26 10v46M38 10v46" stroke="#3B261B" strokeWidth="2" />
      <path d="M14 34l36-10v32H18a4 4 0 0 1-4-4Z" fill="#C4AC84" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M20 46h22" stroke="#A4573A" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  bonbon: (
    <>
      <path d="M18 32 6 22v20Z M46 32l12-10v20Z" fill="#E3B4A4" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="32" cy="32" r="14" fill="#C96B5A" stroke={OUT} strokeWidth="2.5" />
      <path d="M24 24c4 4 12 12 16 16M22 34c3 3 6 6 8 8M34 22c3 3 6 6 8 8" stroke="#FBF8F1" strokeWidth="2.5" strokeLinecap="round" opacity=".75" />
    </>
  ),
  kuchen: (
    <>
      <path d="M8 46 32 18l24 28Z" fill="#E8DCC4" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M8 46h48v8H8Z" fill="#D9B86A" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M14 39c4 3 6-1 9 2s6-1 9 2 6-1 9 2 6-1 9 1" stroke="#C96B5A" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="32" cy="14" r="5" fill="#B85A3E" stroke={OUT} strokeWidth="2.2" />
    </>
  ),
  hufeisen: (
    <>
      <path d="M14 54V30a18 18 0 0 1 36 0v24h-10V30a8 8 0 0 0-16 0v24Z" fill="#9A9893" stroke="#4A4540" strokeWidth="2.5" strokeLinejoin="round" />
      {[[19, 46], [19, 36], [22, 26], [45, 46], [45, 36], [42, 26]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="1.8" fill="#4A4540" />
      ))}
    </>
  ),
  sattel: (
    <>
      <path d="M8 30c8 2 14-6 24-6s16 8 24 6c0 10-6 18-14 20H22C14 48 8 40 8 30Z" fill="#80634D" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M16 32c6 6 26 6 32 0" stroke="#C4AC84" strokeWidth="2" fill="none" strokeDasharray="3 3" />
      <path d="M30 50v6M34 50v6" stroke={OUT} strokeWidth="2.5" />
      <rect x="26" y="54" width="12" height="5" rx="2" fill="#9A9893" stroke="#4A4540" strokeWidth="2" />
      <path d="M8 30c-1-4 2-8 6-6M56 30c1-4-2-8-6-6" stroke={OUT} strokeWidth="2.5" fill="none" />
    </>
  ),
  halfter: (
    <>
      <path d="M20 10c-6 14-8 30-2 44M44 10c6 14 8 30 2 44" stroke="#344638" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M19 26h26M18 46h28" stroke="#344638" strokeWidth="5" strokeLinecap="round" />
      <path d="M20 10c4-4 20-4 24 0" stroke="#344638" strokeWidth="5" fill="none" />
      <circle cx="19" cy="26" r="4" fill="#C9A15E" stroke="#4A4540" strokeWidth="2" />
      <circle cx="45" cy="26" r="4" fill="#C9A15E" stroke="#4A4540" strokeWidth="2" />
      <circle cx="32" cy="50" r="4.5" fill="#C9A15E" stroke="#4A4540" strokeWidth="2" />
    </>
  ),
  buerste: (
    <>
      <rect x="8" y="22" width="48" height="18" rx="9" fill="#A4573A" stroke={OUT} strokeWidth="2.5" />
      <path d="M14 22c0-6 36-6 36 0" stroke={OUT} strokeWidth="3" fill="none" />
      <path d="M12 40v12M18 40v13M24 40v13M30 40v13M36 40v13M42 40v13M48 40v13M54 40v11" stroke="#3B261B" strokeWidth="2.6" strokeLinecap="round" />
    </>
  ),
  hufkratzer: (
    <>
      <rect x="10" y="30" width="30" height="12" rx="6" fill="#344638" stroke="#26342A" strokeWidth="2.5" />
      <path d="M40 36h8c4 0 6 4 4 8l-4 6" stroke="#9A9893" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 30v-6c0-4 4-6 8-4" stroke="#C4AC84" strokeWidth="4" fill="none" strokeLinecap="round" />
    </>
  ),
  kamm: (
    <>
      <rect x="8" y="16" width="48" height="12" rx="5" fill="#C4AC84" stroke={OUT} strokeWidth="2.5" />
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M${13 + i * 4.8} 28v${i % 2 ? 18 : 22}`} stroke={OUT} strokeWidth="2.6" strokeLinecap="round" />
      ))}
    </>
  ),
  striegel: (
    <>
      <ellipse cx="32" cy="34" rx="22" ry="18" fill="#A4573A" stroke={OUT} strokeWidth="2.5" />
      <ellipse cx="32" cy="34" rx="14" ry="11" fill="none" stroke="#7a3d27" strokeWidth="2.5" />
      <ellipse cx="32" cy="34" rx="6" ry="4.5" fill="none" stroke="#7a3d27" strokeWidth="2.5" />
      <path d="M14 22c4-8 32-8 36 0" stroke={OUT} strokeWidth="4" fill="none" strokeLinecap="round" />
    </>
  ),
  strick: (
    <>
      <path d="M12 52c10-4 8-16 18-18s16 8 22-2" fill="none" stroke="#C4AC84" strokeWidth="6" strokeLinecap="round" />
      <path d="M12 52c10-4 8-16 18-18s16 8 22-2" fill="none" stroke="#80634D" strokeWidth="2" strokeDasharray="3 4" strokeLinecap="round" />
      <path d="M50 30c2-6 2-12-2-16" stroke="#9A9893" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M44 14c2-4 8-4 8 2" stroke="#9A9893" strokeWidth="4" fill="none" strokeLinecap="round" />
    </>
  ),
  fell: (
    <>
      <path d="M8 40c6-16 18-24 32-24 10 0 16 6 16 16 0 14-12 22-26 22-12 0-24-4-22-14Z" fill="#7A5038" stroke={OUT} strokeWidth="2.5" />
      <path d="M18 34c6-4 12-6 18-6M20 42c6-3 14-4 22-3M28 48c4-1 9-1 14 0" stroke="#5E3D2A" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M44 22l2-6 2 6 6 2-6 2-2 6-2-6-6-2Z" fill="#F2D7A0" />
    </>
  ),
  huf: (
    <>
      <path d="M22 10h20l4 26c2 10-2 18-14 18s-16-8-14-18Z" fill="#7A5038" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M16 40c0 8 6 14 16 14s16-6 16-14l-2-4H18Z" fill="#3A2C24" stroke="#2B1D16" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M26 12c0 6 1 12 2 18" stroke="#5E3D2A" strokeWidth="2" fill="none" strokeLinecap="round" />
    </>
  ),
  maehne: (
    <>
      <path d="M16 58c2-20 10-38 26-48 6 2 8 8 6 14-8 8-12 20-12 34Z" fill="#7A5038" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M42 10c-6 6-10 14-14 22-2 6-4 12-6 18M46 14c-6 8-10 18-12 28M38 12c-6 6-12 14-16 24" stroke="#2B1D16" strokeWidth="4" fill="none" strokeLinecap="round" />
    </>
  ),
  fuehren: (
    <>
      <path d="M14 46c-2-12 2-24 12-32 6-4 12-2 14 4l8 20c2 6-2 12-8 12-6 0-10-2-14-2Z" fill="#7A5038" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M24 18c4 6 10 12 18 16M26 34c6 0 12 0 18-2" stroke="#344638" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M42 36c4 8 10 14 16 18" stroke="#C4AC84" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="42" cy="35" r="3" fill="#C9A15E" stroke="#4A4540" strokeWidth="1.5" />
    </>
  ),
  reiten: (
    <>
      <path d="M12 40c0-14 9-24 20-24s20 10 20 24Z" fill="#344638" stroke="#26342A" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M8 40h40c4 0 8 2 8 4H8Z" fill="#26342A" />
      <path d="M32 16v24M22 20c-2 6-2 14 0 20M42 20c2 6 2 14 0 20" stroke="#5E7360" strokeWidth="2" />
      <path d="M16 44c0 6 4 10 8 12M48 44c0 6-4 10-8 12" stroke={OUT} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </>
  ),
  pferd: (
    <>
      <path d="M14 56V40c0-6 4-10 10-12l14-4 6-12 4 2-2 8 8 6-2 6-8-2-4 6v18h-6V44H22v12Z" fill="#80634D" stroke={OUT} strokeWidth="2" strokeLinejoin="round" />
      <path d="M38 24c2-4 4-8 6-12" stroke="#2B1D16" strokeWidth="4" strokeLinecap="round" />
      <path d="M14 40c-4 4-6 10-6 14" stroke="#2B1D16" strokeWidth="4" strokeLinecap="round" fill="none" />
    </>
  ),
  rasenschnitt: (
    <>
      <path d="M6 52c4-12 14-18 26-18s22 6 26 18Z" fill="#8FA07A" stroke="#4F6A47" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M14 46l4-3M22 42l3-4M30 44l2-5M38 41l3 4M46 45l4-2M26 48l3-2" stroke="#4F6A47" strokeWidth="2" strokeLinecap="round" />
      <rect x="34" y="8" width="22" height="16" rx="3" fill="#A4573A" stroke={OUT} strokeWidth="2.2" />
      <path d="M40 24v6M52 24v6" stroke={OUT} strokeWidth="2.5" />
      <circle cx="40" cy="31" r="3" fill="#3A2C24" />
      <circle cx="52" cy="31" r="3" fill="#3A2C24" />
      <path d="M34 12l-10-6" stroke={OUT} strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
  kuerbis: (
    <>
      <ellipse cx="32" cy="38" rx="24" ry="18" fill="#D9803E" stroke={OUT} strokeWidth="2.5" />
      <path d="M32 20c-6 6-6 30 0 36M32 20c6 6 6 30 0 36M18 24c-6 6-6 22 2 30M46 24c6 6 6 22-2 30" stroke="#B8622E" strokeWidth="2" fill="none" />
      <path d="M32 21c0-6 2-10 6-12" stroke="#4F6A47" strokeWidth="4" fill="none" strokeLinecap="round" />
    </>
  ),
  laterne: (
    <>
      <path d="M32 4v8" stroke={OUT} strokeWidth="2.5" />
      <circle cx="32" cy="34" r="20" fill="#EFD39A" stroke={OUT} strokeWidth="2.5" />
      <circle cx="32" cy="34" r="10" fill="#F7E7C0" />
      <path d="M14 26h36M14 42h36" stroke="#C99A4E" strokeWidth="2" />
      <rect x="24" y="12" width="16" height="4" rx="2" fill="#344638" />
      <rect x="24" y="52" width="16" height="4" rx="2" fill="#344638" />
    </>
  ),
  haken: (
    <>
      <rect x="6" y="8" width="52" height="10" rx="3" fill="#80634D" stroke={OUT} strokeWidth="2.2" />
      <path d="M32 18v14c0 6 8 6 8 0" stroke="#4A4540" strokeWidth="4" fill="none" strokeLinecap="round" />
      <rect x="16" y="40" width="32" height="14" rx="3" fill="#FBF8F1" stroke={OUT} strokeWidth="2" />
      <path d="M22 47h20" stroke={OUT} strokeWidth="2.5" strokeLinecap="round" />
    </>
  ),
  tuer: (
    <>
      <rect x="10" y="6" width="34" height="52" rx="2" fill="#5E4636" stroke="#3B261B" strokeWidth="2.5" />
      <path d="M44 6l12 6v40l-12 6Z" fill="#9A6A4C" stroke="#3B261B" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M14 10l26 0" stroke="#F2D7A0" strokeWidth="3" opacity=".5" />
      <rect x="47" y="30" width="10" height="4" rx="1" fill="#9A9893" transform="rotate(25 52 32)" />
    </>
  ),
  leder: (
    <>
      <path d="M8 30c8-6 40-10 48-4l-2 10c-8-4-38 0-44 6Z" fill="#344638" stroke="#26342A" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M50 26l2-3 2 4M44 26l1-3 2 4M10 40l1 3 2-3M16 38l1 3 2-3" stroke="#FBF8F1" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <circle cx="30" cy="32" r="3" fill="#C9A15E" stroke="#4A4540" strokeWidth="1.5" />
    </>
  ),
  haare: (
    <>
      <path d="M20 54c0-14 6-30 18-42M26 54c2-14 8-28 18-38M14 54c-2-12 2-26 12-36M32 54c4-12 12-22 22-28" stroke="#E8D9BE" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M20 54c0-14 6-30 18-42M32 54c4-12 12-22 22-28" stroke="#C9A97F" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </>
  ),
  tor: (
    <>
      <path d="M8 14v42M56 14v42" stroke="#80634D" strokeWidth="6" strokeLinecap="round" />
      <path d="M8 22h48M8 34h48M8 46h48M8 46l48-24" stroke="#C4AC84" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  decke: (
    <>
      <path d="M4 18h56" stroke="#80634D" strokeWidth="4" strokeLinecap="round" />
      <path d="M10 18c0 16 2 28 6 36 6-4 10-2 16 2 6-4 10-6 16-2 4-8 6-20 6-36Z" fill="#F7F3EC" stroke="#A9A398" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M18 28c8 2 20 2 28 0" stroke="#D9C6A5" strokeWidth="2" fill="none" />
    </>
  ),
  huette: (
    <>
      <path d="M8 30 32 10l24 20" fill="#344638" stroke="#26342A" strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="12" y="28" width="40" height="28" fill="#9A6A4C" stroke={OUT} strokeWidth="2.5" />
      <rect x="26" y="36" width="12" height="20" fill="#5E4636" />
      <rect x="29" y="44" width="6" height="6" rx="1.5" fill="#C9A15E" />
    </>
  ),
  zettel: (
    <>
      <path d="M14 8h30l8 8v40H14Z" fill="#FBF8F1" stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M44 8v8h8" fill="none" stroke={OUT} strokeWidth="2.2" />
      <path d="M20 26h24M20 34h24M20 42h16" stroke="#C4AC84" strokeWidth="2.5" strokeLinecap="round" />
      <text x="40" y="50" fontSize="14" fontWeight="700" fill="#A4573A" fontFamily="Georgia, serif">?</text>
      <circle cx="33" cy="10" r="3" fill="#A4573A" />
    </>
  ),
  handschuh: (
    <>
      <path d="M18 56V30c0-4 2-6 5-6s5 2 5 6V14c0-4 2-6 5-6s5 2 5 6v2c0-4 2-6 5-6s5 2 5 6v10c0-3 2-5 4-5s4 2 4 5v12c0 12-8 20-20 20H24c-3 0-6-1-6-2Z" fill="#344638" stroke="#26342A" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M22 48h26" stroke="#5E7360" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  reflektor: (
    <>
      <rect x="6" y="24" width="52" height="16" rx="3" fill="#E6E9EC" stroke="#9A9893" strokeWidth="2.5" transform="rotate(-10 32 32)" />
      <path d="M14 28l6 10M26 26l6 10M38 24l6 10" stroke="#FFFFFF" strokeWidth="3" transform="rotate(-10 32 32)" />
      <path d="M50 8l3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" fill="#E3C47A" />
    </>
  ),
  garn: (
    <>
      <rect x="18" y="8" width="28" height="8" rx="2" fill="#C4AC84" stroke={OUT} strokeWidth="2" />
      <rect x="22" y="16" width="20" height="32" fill="#E6E9EC" stroke="#9A9893" strokeWidth="2" />
      <path d="M22 22h20M22 29h20M22 36h20M22 43h20" stroke="#B8BEC4" strokeWidth="1.5" />
      <rect x="18" y="48" width="28" height="8" rx="2" fill="#C4AC84" stroke={OUT} strokeWidth="2" />
      <path d="M42 30c10 2 14 10 12 20" stroke="#9A9893" strokeWidth="2" fill="none" />
    </>
  ),
  schere: (
    <>
      <g fill="none" stroke="#4A4540" strokeWidth="4.5" strokeLinecap="round">
        <circle cx="20" cy="48" r="9" />
        <circle cx="44" cy="48" r="9" />
        <path d="M25 40l18-32M39 40L21 8" />
      </g>
      <circle cx="32" cy="26" r="2.5" fill="#4A4540" />
    </>
  ),
  lupe: (
    <>
      <circle cx="26" cy="26" r="16" fill="#DDE3D6" stroke="#344638" strokeWidth="5" />
      <path d="M38 38l16 16" stroke="#80634D" strokeWidth="8" strokeLinecap="round" />
      <path d="M18 20a10 10 0 0 1 8-6" stroke="#FBF8F1" strokeWidth="3" fill="none" strokeLinecap="round" />
    </>
  ),
};

export function isItemName(n: string): n is ItemName {
  return n in items;
}

export function ItemIcon({
  name,
  className,
  title,
  size,
}: {
  name: ItemName;
  className?: string;
  title?: string;
  /** Feste Größe, z. B. wenn das Symbol in einer Szene steckt */
  size?: number;
}) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      {items[name]}
    </svg>
  );
}
