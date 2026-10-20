import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Andika, Fraunces } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import { site } from "@/content/site";
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

export const metadata: Metadata = {
  title: { default: site.name, template: `%s · ${site.name}` },
  description: `${site.claim} Hörspiele, Pferdesteckbriefe und Lernspiele – ${site.producer}.`,
  applicationName: site.name,
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className={`${fraunces.variable} ${andika.variable}`}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
