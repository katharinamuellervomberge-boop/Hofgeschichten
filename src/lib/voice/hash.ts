/**
 * Stabile Kennung für einen gesprochenen Satz.
 *
 * Die Kennung wird aus dem Text selbst berechnet. Ändert sich ein Text,
 * ändert sich auch die Kennung – die alte Aufnahme wird dann automatisch
 * nicht mehr verwendet (Ersatz: Gerätestimme), bis sie neu erzeugt ist.
 *
 * Wird identisch in der App und in den Skripten (scripts/voice-*.ts) genutzt.
 */

export function normalizeSpeech(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

/** cyrb53 – kleiner, schneller 53-Bit-Hash (kein Kryptozweck). */
function cyrb53(str: string, seed = 0): number {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

export function speechId(text: string): string {
  return cyrb53(normalizeSpeech(text)).toString(36).padStart(11, "0");
}
