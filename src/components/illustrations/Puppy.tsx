/** Krümel, der junge Hofhund – heller Welpe mit braunen Ohren. */
export function Puppy({ pose = "sit", className, title }: { pose?: "sit" | "sleep"; className?: string; title?: string }) {
  const fur = "#EFE3CC";
  const patch = "#B07A4F";
  const line = "#5E4636";
  if (pose === "sleep") {
    return (
      <svg viewBox="0 0 200 120" width="200" height="120" className={className} role="img" aria-label={title ?? "Krümel schläft"}>
        <ellipse cx="100" cy="104" rx="84" ry="10" fill="#000" opacity=".12" />
        <path d="M30 96c-4-30 24-52 70-52s76 18 72 46c-2 10-14 14-40 14H58c-18 0-27-0-28-8Z" fill={fur} stroke={line} strokeWidth="2.5" />
        <path d="M150 62c12 6 18 20 12 34" fill="none" stroke={line} strokeWidth="2" opacity=".5" />
        {/* Schwanz um den Körper */}
        <path d="M168 90c10-2 16-10 12-18" fill="none" stroke={fur} strokeWidth="9" strokeLinecap="round" />
        <path d="M168 90c10-2 16-10 12-18" fill="none" stroke={line} strokeWidth="2" strokeLinecap="round" opacity=".6" />
        {/* Kopf auf den Pfoten */}
        <ellipse cx="62" cy="80" rx="30" ry="24" fill={fur} stroke={line} strokeWidth="2.5" />
        <path d="M40 64c-12 2-18 16-12 30 8-2 14-12 14-22Z" fill={patch} stroke={line} strokeWidth="2" />
        <path d="M76 60c10 0 18 10 16 22-8-2-14-10-16-18Z" fill={patch} stroke={line} strokeWidth="2" />
        <path d="M50 82c4 3 8 3 12 0M66 82c4 3 8 3 12 0" stroke={line} strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <ellipse cx="62" cy="94" rx="6" ry="4" fill="#3A2C24" />
        <path d="M26 100c10-4 30-4 44 0" stroke={fur} strokeWidth="10" strokeLinecap="round" />
        <path d="M26 100c10-4 30-4 44 0" stroke={line} strokeWidth="2" fill="none" opacity=".4" />
        {/* Zzz */}
        <path d="M100 20h12l-12 14h12M120 8h8l-8 9h8" fill="none" stroke="#5E7360" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 120 140" width="120" height="140" className={className} role="img" aria-label={title ?? "Krümel"}>
      <ellipse cx="60" cy="132" rx="40" ry="6" fill="#000" opacity=".12" />
      <path d="M30 130c-6-30 6-58 30-58s36 28 30 58Z" fill={fur} stroke={line} strokeWidth="2.5" />
      <path d="M86 112c14-4 20-18 14-30" fill="none" stroke={fur} strokeWidth="9" strokeLinecap="round" />
      <path d="M86 112c14-4 20-18 14-30" fill="none" stroke={line} strokeWidth="2" strokeLinecap="round" opacity=".6" />
      <path d="M44 130v-22M76 130v-22" stroke={line} strokeWidth="2" opacity=".5" />
      <ellipse cx="60" cy="52" rx="32" ry="30" fill={fur} stroke={line} strokeWidth="2.5" />
      <path d="M32 32c-14 4-18 24-10 40 10-4 16-18 14-32Z" fill={patch} stroke={line} strokeWidth="2" />
      <path d="M88 32c14 4 18 24 10 40-10-4-16-18-14-32Z" fill={patch} stroke={line} strokeWidth="2" />
      <circle cx="48" cy="50" r="4.5" fill="#2C2A24" />
      <circle cx="72" cy="50" r="4.5" fill="#2C2A24" />
      <circle cx="49.5" cy="48.5" r="1.4" fill="#fff" />
      <circle cx="73.5" cy="48.5" r="1.4" fill="#fff" />
      <ellipse cx="60" cy="64" rx="13" ry="10" fill="#FBF6EC" />
      <ellipse cx="60" cy="60" rx="6" ry="4.5" fill="#3A2C24" />
      <path d="M54 68c3 3 9 3 12 0" stroke={line} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M58 70c0 6 4 8 6 4" fill="#D98C76" />
    </svg>
  );
}
