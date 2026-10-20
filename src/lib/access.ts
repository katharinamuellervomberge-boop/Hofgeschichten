import type { Episode } from "@/content/types";

/**
 * Zugriffslogik – bewusst OHNE Schein-Sicherung im Browser.
 *
 * V1: Alle Folgen sind frei (`access: "free"`). Es gibt keine gesperrten
 * Inhalte und daher auch keine PIN, kein Passwort und keine
 * Browser-seitige "Sperre", die man umgehen könnte.
 *
 * Für spätere Kaufberechtigungen (Shopify):
 *  1. Elternkonto mit echter Anmeldung (z. B. Shopify Customer Account API)
 *  2. Serverseitige Prüfung in einem Route Handler / Server Action:
 *     hat das Konto das Produkt `episode.shopifyProductHandle` gekauft?
 *  3. Erst dann eine kurzlebige, signierte Audio-URL ausgeben.
 *  Kostenpflichtige Audiodateien dürfen NIE in /public liegen.
 */
export function isFreelyAvailable(episode: Episode): boolean {
  return episode.access === "free";
}

/** Nur Folgen, die ohne Server-Prüfung ausgeliefert werden dürfen. */
export function publicEpisodes(list: Episode[]): Episode[] {
  return list.filter(isFreelyAvailable);
}
