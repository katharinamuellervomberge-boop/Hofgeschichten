/**
 * Sprachen der App. Deutsch ist Standard (ohne Präfix), Englisch liegt unter /en/…
 * src/proxy.ts schreibt /en/<pfad> intern auf /<pfad> um und setzt den Header
 * LOCALE_HEADER – dieselben Seiten liefern dann englische Texte.
 */
export type Locale = "de" | "en";
export const LOCALE_HEADER = "x-hg-locale";

/** Interne Adresse in der passenden Sprache ("/akademie" → "/en/akademie") */
export function localizePath(path: string, locale: Locale): string {
  if (locale !== "en" || !path.startsWith("/") || path.startsWith("//")) return path;
  if (path === "/en" || path.startsWith("/en/") || path.startsWith("/en#") || path.startsWith("/en?") || path.startsWith("/api/")) return path;
  return path === "/" ? "/en" : `/en${path}`;
}

/** "/en/akademie" → "/akademie" */
export function stripLocale(path: string): string {
  if (path === "/en") return "/";
  return path.startsWith("/en/") ? path.slice(3) : path;
}

/** Text je Sprache wählen */
export function pickLocale<T>(locale: Locale, de: T, en: T): T {
  return locale === "en" ? en : de;
}
