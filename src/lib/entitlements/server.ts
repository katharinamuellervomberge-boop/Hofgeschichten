import "server-only";
import { cookies } from "next/headers";
import { adventures, isVisible } from "@/content/adventures";
import { COOKIE_NAME, readToken } from "./token";

/**
 * Welche Premium-Abenteuer sind auf diesem Gerät freigeschaltet?
 * Wird ausschließlich auf dem Server ausgewertet.
 */
export async function getOwnedAdventures(): Promise<string[]> {
  const jar = await cookies();
  const owned = readToken(jar.get(COOKIE_NAME)?.value);
  const valid = new Set(adventures.map((a) => a.slug));
  return owned.filter((s) => valid.has(s));
}

export async function canAccessAdventure(slug: string): Promise<boolean> {
  const a = adventures.find((x) => x.slug === slug);
  if (!a || !isVisible(a)) return false;
  if (a.access === "free") return true;
  return (await getOwnedAdventures()).includes(slug);
}
