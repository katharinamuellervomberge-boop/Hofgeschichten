import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Andika, Fraunces } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import { site } from "@/content/site";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { getLocale } from "@/i18n/server";
import { Analytics } from "@vercel/analytics/next";
import "@/styles/globals.css";

/* Schriften werden beim Build selbst gehostet – keine Anfragen an Google aus dem Browser. */
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

/* Andika: eigens für Leseanfänger gestaltete Schrift */
const andika = Andika({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-andika",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const en = (await getLocale()) === "en";
  const name = en ? EN_NAME : site.name;
  return {
    title: { default: en ? `${EN_NAME} – Riding Academy: learn to ride, understand horses` : site.name, template: `%s · ${name}` },
    description: en
      ? "The interactive Riding Academy for kids, teens and adults: 81 lessons from understanding horses to dressage and jumping. Free sample lesson in every module."
      : `${site.claim} Hörspiele, Pferdesteckbriefe und Lernspiele – ${site.producer}.`,
    applicationName: name,
    alternates: { languages: { de: "/", en: "/en" } },
    ...BASE_META,
  };
}

/** Name der App in der englischen Version */
const EN_NAME = "Hofgeschichten";

const BASE_META: Metadata = {
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#344638",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale === "en" ? "en-GB" : "de"} className={`${fraunces.variable} ${andika.variable}`}>
      <body>
        <LocaleProvider locale={locale}>
          <AppShell>{children}</AppShell>
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}
