import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  CLAIM_COOKIE,
  CLAIM_FLAG_COOKIE,
  CLAIM_MAX_AGE_SECONDS,
  checkoutPermalink,
  directProduct,
  isClaim,
  newClaim,
} from "@/lib/entitlements/directCheckout";
import { grosseAkademie } from "@/content/products";

export const dynamic = "force-dynamic";

/**
 * Direktkauf starten: Kauf-Kennung im Cookie ablegen und direkt in die Shopify-Kasse leiten.
 * GET /api/kaufen?produkt=akademie&lang=de
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const product = directProduct(url.searchParams.get("produkt") ?? "");
  const locale = url.searchParams.get("lang") === "en" ? "en" : "de";
  // Unbekanntes Produkt: zur bisherigen Produktseite im Shop (nie ins Leere)
  if (!product) return NextResponse.redirect(grosseAkademie.checkoutUrl ?? "https://www.horseandharmonie-shop.de", 303);

  // Vorhandene Kennung wiederverwenden: mehrfaches Klicken führt zur selben Zuordnung
  const jar = await cookies();
  const existing = jar.get(CLAIM_COOKIE)?.value;
  const claim = isClaim(existing) ? existing : newClaim();

  const res = NextResponse.redirect(checkoutPermalink(product, claim, locale), 303);
  const secure = process.env.NODE_ENV === "production";
  res.cookies.set(CLAIM_COOKIE, claim, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: CLAIM_MAX_AGE_SECONDS });
  res.cookies.set(CLAIM_FLAG_COOKIE, "1", { httpOnly: false, secure, sameSite: "lax", path: "/", maxAge: CLAIM_MAX_AGE_SECONDS });
  res.headers.set("Cache-Control", "no-store");
  return res;
}
