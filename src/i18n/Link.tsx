"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { localizePath } from "./locale";
import { useLocale } from "./LocaleProvider";

/**
 * Wie next/link, setzt aber in der englischen App automatisch /en vor interne Adressen.
 * Sprachwechsel selbst laufen über normale <a>-Links (volles Neuladen), damit Layout
 * und Sprache sicher mitwechseln.
 */
export default function Link({ href, ...rest }: ComponentProps<typeof NextLink>) {
  const locale = useLocale();
  const target = typeof href === "string" ? localizePath(href, locale) : href;
  return <NextLink href={target} {...rest} />;
}
