import { emptyHoftag, type HoftagProgress, type HorseId } from "@/content/hoftag/types";

const HORSES: HorseId[] = ["tivoli", "tonga", "scrabble"];
const isHorse = (v: unknown): v is HorseId => typeof v === "string" && (HORSES as string[]).includes(v);
const strings = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);
const num = (v: unknown, d = 0) => (typeof v === "number" && Number.isFinite(v) && v >= 0 ? v : d);

/**
 * Spielstand „Mein Tag am Hof“ beim Laden prüfen. Unbrauchbares wird verworfen;
 * ein kaputter laufender Tag wird einfach neu begonnen (nie eine Strafe).
 */
export function migrateHoftag(raw: unknown): HoftagProgress | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const r = raw as Partial<HoftagProgress>;
  const trust: HoftagProgress["trust"] = {};
  if (r.trust && typeof r.trust === "object") for (const h of HORSES) if (typeof r.trust[h] === "number") trust[h] = num(r.trust[h]);
  const day = r.day && typeof r.day === "object" && isHorse(r.day.horse) && Array.isArray(r.day.completedTasks) && r.day.stats ? r.day : null;
  return {
    ...emptyHoftag,
    horse: isHorse(r.horse) ? r.horse : null,
    introSeen: r.introSeen === true,
    xp: num(r.xp),
    trust,
    knowledge: num(r.knowledge),
    cards: strings(r.cards),
    found: strings(r.found),
    badges: strings(r.badges),
    daysCompleted: num(r.daysCompleted),
    history: Array.isArray(r.history) ? r.history.filter((h) => h && isHorse(h.horse)).slice(0, 20) : [],
    day,
    lastPlayedAt: typeof r.lastPlayedAt === "number" ? r.lastPlayedAt : null,
  };
}
