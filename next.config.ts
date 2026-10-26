import type { NextConfig } from "next";

/**
 * Sicherheits-Header für eine Kinder-App:
 * - keine Einbettung in fremde Seiten (Clickjacking)
 * - keine Kamera/Mikrofon/Standort-Zugriffe
 * - keine Referrer-Weitergabe an fremde Seiten
 */
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "no-referrer" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Premium-Aufnahmen liegen außerhalb von /public und müssen mit der Server-Funktion ausgeliefert werden
  outputFileTracingIncludes: {
    "/api/voice/[id]": ["./private/voice/**/*"],
    "/api/akademie-video/[file]": ["./private/akademie-video/**/*"],
  },
  poweredByHeader: false,
  // Die Reitakademie hat einen eigenen Bereich bekommen – alte Links (auch gedruckte) leiten weiter
  async redirects() {
    return [
      { source: "/spielen/akademie", destination: "/akademie", permanent: true },
      { source: "/spielen/akademie/:path*", destination: "/akademie/:path*", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
