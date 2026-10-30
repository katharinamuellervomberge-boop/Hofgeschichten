import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_HEADER } from "@/i18n/locale";

/**
 * Englische Version unter /en/…: intern auf die gleichen Seiten umschreiben
 * und die Sprache als Header mitgeben (siehe src/i18n).
 */
export function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { pathname } = url;
  const headers = new Headers(req.headers);
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    url.pathname = pathname === "/en" ? "/" : pathname.slice(3);
    headers.set(LOCALE_HEADER, "en");
    return NextResponse.rewrite(url, { request: { headers } });
  }
  // Niemand darf die Sprache von außen per Header setzen
  headers.delete(LOCALE_HEADER);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!_next/|api/|favicon|icon|voice/|.*\\.(?:svg|png|jpg|jpeg|webp|mp3|mp4|ico|txt|xml)$).*)"],
};
