/**
 * Fortschritt: Level (XP) und Vertrauen. Vertrauen wächst langsam und sinkt nie –
 * auch nicht, wenn ein Kind tagelang nicht spielt.
 */
export type Level = { level: number; name: string; minXp: number };

export const LEVELS: Level[] = [
  { level: 1, name: "Stallneuling", minXp: 0 },
  { level: 2, name: "Pferdefreund", minXp: 300 },
  { level: 3, name: "Pflegeprofi", minXp: 1000 },
  { level: 4, name: "Stallprofi", minXp: 2200 },
  { level: 5, name: "Pferdekenner", minXp: 4000 },
  { level: 6, name: "Hofexperte", minXp: 6500 },
];

export function levelFor(xp: number): { current: Level; next: Level | null; progress: number } {
  let current = LEVELS[0];
  for (const l of LEVELS) if (xp >= l.minXp) current = l;
  const next = LEVELS.find((l) => l.level === current.level + 1) ?? null;
  const progress = next ? (xp - current.minXp) / (next.minXp - current.minXp) : 1;
  return { current, next, progress: Math.max(0, Math.min(1, progress)) };
}

/** Vertrauensstufen je Pferd (Grundlage für spätere Freischaltungen) */
export const TRUST_STEPS = [
  { min: 0, label: "Ihr lernt euch kennen" },
  { min: 25, label: "Ihr seid ein Team" },
  { min: 60, label: "Gute Freunde" },
  { min: 120, label: "Beste Freunde" },
] as const;

export function trustLabel(trust: number): string {
  let label: string = TRUST_STEPS[0].label;
  for (const s of TRUST_STEPS) if (trust >= s.min) label = s.label;
  return label;
}

/**
 * Abzeichen – vorbereitet, im MVP werden die ersten drei schon vergeben.
 * Weitere (Streaks, Turniere, Saisonales) kommen als Daten dazu.
 */
export type Badge = { id: string; name: string; text: string };

export const BADGES: Badge[] = [
  { id: "erster-tag", name: "Erster Hoftag", text: "Du hast deinen ersten ganzen Tag auf dem Hof geschafft." },
  { id: "alle-pferde", name: "Kennt alle drei", text: "Du hast dich um Tivoli, Tonga und Scrabble gekümmert." },
  { id: "fuenf-tage", name: "Fünf Hoftage", text: "Fünf Tage Verantwortung – stark!" },
];
