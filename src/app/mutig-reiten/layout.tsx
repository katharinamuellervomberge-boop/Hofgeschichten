import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getLocale } from "@/i18n/server";

/** Mutig reiten gibt es vorerst nur auf Deutsch – unter /en/… nicht erreichbar */
export default async function Layout({ children }: { children: ReactNode }) {
  if ((await getLocale()) === "en") notFound();
  return <div className="page">{children}</div>;
}
