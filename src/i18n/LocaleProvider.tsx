"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { setSpeechLang } from "@/lib/speech";
import { localizePath, type Locale } from "./locale";

const Ctx = createContext<Locale>("de");

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  // Vorlesestimme passend zur Sprache
  setSpeechLang(locale);
  useEffect(() => setSpeechLang(locale), [locale]);
  return <Ctx.Provider value={locale}>{children}</Ctx.Provider>;
}

export function useLocale(): Locale {
  return useContext(Ctx);
}

/** Adresse in der aktuellen Sprache */
export function useHref(): (path: string) => string {
  const locale = useLocale();
  return (path) => localizePath(path, locale);
}
