"use client";

import { useLocale } from "./LocaleProvider";

/** Kleiner Text je Sprache – für Server-Komponenten, die die Sprache nicht selbst kennen */
export function LocalizedText({ de, en }: { de: string; en: string }) {
  return <>{useLocale() === "en" ? en : de}</>;
}
