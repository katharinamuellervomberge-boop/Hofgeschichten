import "server-only";

/**
 * Einfache Drosselung gegen Durchprobieren (pro Server-Instanz).
 * Für stärkeren Schutz zusätzlich eine Vercel-Firewall-Regel (Rate Limit)
 * auf /api/freischalten setzen – siehe docs/PREMIUM-FREISCHALTUNG.md.
 */
const hits = new Map<string, number[]>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX = 8;

export function allow(key: string): boolean {
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (list.length >= MAX) {
    hits.set(key, list);
    return false;
  }
  list.push(now);
  hits.set(key, list);
  if (hits.size > 5000) hits.clear();
  return true;
}
