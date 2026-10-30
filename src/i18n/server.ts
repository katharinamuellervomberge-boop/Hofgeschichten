import "server-only";
import { headers } from "next/headers";
import { LOCALE_HEADER, type Locale } from "./locale";

/** Sprache der aktuellen Anfrage (gesetzt von src/proxy.ts) */
export async function getLocale(): Promise<Locale> {
  return (await headers()).get(LOCALE_HEADER) === "en" ? "en" : "de";
}
