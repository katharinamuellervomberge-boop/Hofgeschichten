import type { Locale } from "@/i18n/locale";
import { translateDeep, type Dict } from "@/i18n/translate";
import katalogEn from "./en/katalog.json";

/**
 * Übersetzte Übersichten der Reitakademie (Module, Lernwelten, Lektionstitel,
 * Spiele, Lernwege, Videos) – für den Browser. Die Lektionsinhalte werden
 * serverseitig übersetzt (inhalte.server.ts).
 */
const cache = new WeakMap<object, unknown>();

export function loc<T extends object>(value: T, locale: Locale): T {
  if (locale !== "en") return value;
  const hit = cache.get(value);
  if (hit) return hit as T;
  const out = translateDeep(value, katalogEn as Dict);
  cache.set(value, out);
  return out;
}
