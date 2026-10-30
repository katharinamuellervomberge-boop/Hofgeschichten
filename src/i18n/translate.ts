/**
 * Übersetzung von Inhaltsdaten (Reitakademie usw.).
 *
 * Die deutschen Inhalte bleiben die einzige Quelle für Aufbau, IDs, richtige
 * Antworten und Bilder. Für Englisch wird jeder sichtbare Text über einen
 * Schlüssel (Prüfsumme des deutschen Textes) in einem Wörterbuch nachgeschlagen.
 *  - Aufbau und Lösungen können dadurch nie auseinanderlaufen.
 *  - Ändert sich ein deutscher Text, fehlt die Übersetzung und `npm run check:en`
 *    meldet ihn (statt still einen veralteten Text zu zeigen).
 */

export type Dict = Record<string, string>;

/** Felder, die nie übersetzt werden (IDs, Bildnamen, Technik) */
const SKIP_KEYS = new Set([
  "id", "slug", "scene", "name", "kind", "type", "target", "tint", "motif", "horse", "mood", "speaker",
  "src", "voice", "status", "date", "by", "layout", "levels", "track", "kid", "person", "clue", "cipher",
  "style", "world", "lesson", "mode", "pose", "review", "audio", "trial", "games", "message", "given",
  "awardsClues", "tier", "level", "href", "number", "seconds", "voiced", "correct",
]);

/** FNV-1a (32 Bit) – kurz, stabil, im Browser und auf dem Server gleich */
export function textKey(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}

/** Texte ohne Buchstaben-Wörter (z. B. „A“, „20 × 60“, „3“) bleiben, wie sie sind */
export function needsTranslation(s: string): boolean {
  if (/^[a-z0-9]+(-[a-z0-9]+)+$/.test(s)) return false; // Kennungen wie „ra-w1-l1“
  return /[A-Za-zÄÖÜäöüß]{2,}/.test(s);
}

export function translateText(s: string, dict: Dict, onMissing?: (s: string) => void): string {
  if (!needsTranslation(s)) return s;
  const hit = dict[textKey(s)];
  if (hit === undefined) {
    onMissing?.(s);
    return s;
  }
  return hit;
}

/** Übersetzt alle sichtbaren Texte eines Datenobjekts (tiefe Kopie). */
export function translateDeep<T>(value: T, dict: Dict, onMissing?: (s: string) => void): T {
  const walk = (v: unknown, key?: string): unknown => {
    if (key && SKIP_KEYS.has(key)) return v;
    if (typeof v === "string") return translateText(v, dict, onMissing);
    if (Array.isArray(v)) return v.map((x) => walk(x));
    if (v && typeof v === "object") {
      const out: Record<string, unknown> = {};
      for (const [k, x] of Object.entries(v)) out[k] = walk(x, k);
      return out;
    }
    return v;
  };
  return walk(value) as T;
}

/** Alle zu übersetzenden Texte eines Objekts (für das Werkzeug `npm run en:extract`) */
export function collectTexts(value: unknown): string[] {
  const out: string[] = [];
  translateDeep(value, {}, (s) => out.push(s));
  return [...new Set(out)];
}
