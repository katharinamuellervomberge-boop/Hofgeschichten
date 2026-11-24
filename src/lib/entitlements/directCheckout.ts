import "server-only";
import { randomBytes } from "node:crypto";
import { grosseAkademie } from "@/content/products";

/**
 * Direktkauf von der Landingpage (seit 24.11.2026).
 *
 * Ablauf:
 *  1. „Jetzt freischalten“ → /api/kaufen?produkt=akademie
 *     Der Server erzeugt eine zufällige Kauf-Kennung („Claim“), legt sie als HttpOnly-Cookie ab
 *     und leitet per Shopify-Warenkorb-Link DIREKT in die Kasse (ohne Produktseite/Warenkorb).
 *     Die Kennung reist als Warenkorb-Attribut `hg_claim` mit und steht danach an der Bestellung.
 *  2. Während im neuen Tab bezahlt wird, fragt die Landingpage /api/kauf-status ab.
 *     Der Server sucht die bezahlte Bestellung mit dieser Kennung (Admin API, read_orders)
 *     und setzt das normale Berechtigungs-Cookie – ohne Bestellnummer abzutippen.
 *  3. Rückweg von einem anderen Gerät: Link in der Bestellbestätigung
 *     https://www.hofgeschichten.app/kauf/fertig?c={{ attributes.hg_claim }}
 *
 * Bezahlung, Rechnung, Steuern und Widerruf bleiben vollständig im Shopify-Shop.
 * Der bisherige Weg (Bestellnummer + E-Mail im Elternbereich) bleibt als Rückfall bestehen.
 */

export const SHOP_BASE = "https://www.horseandharmonie-shop.de";
export const CLAIM_COOKIE = "hg_claim";
/** Nicht HttpOnly: sagt der Seite nur „es läuft ein Kauf“, damit sie nach der Rückkehr nachfragt */
export const CLAIM_FLAG_COOKIE = "hg_claim_pending";
export const CLAIM_ATTRIBUTE = "hg_claim";
export const CLAIM_MAX_AGE_SECONDS = 60 * 60 * 24 * 14;

export type DirectProduct = { key: string; variantId: string; name: string };

/** Produkte, die direkt von der Landingpage aus gekauft werden können */
export function directProduct(key: string): DirectProduct | null {
  if (key === "akademie" && grosseAkademie.shopifyVariantId) {
    return { key, variantId: grosseAkademie.shopifyVariantId, name: grosseAkademie.name };
  }
  return null;
}

export function newClaim(): string {
  return randomBytes(18).toString("base64url");
}

/** Kauf-Kennungen sind 24 Zeichen base64url (18 Byte) */
export function isClaim(value: unknown): value is string {
  return typeof value === "string" && /^[A-Za-z0-9_-]{24}$/.test(value);
}

/**
 * Shopify-Warenkorb-Link: führt direkt in die Kasse mit genau diesem Produkt.
 * https://shopify.dev/docs/apps/build/checkout/create-cart-permalinks
 */
export function checkoutPermalink(product: DirectProduct, claim: string, locale: "de" | "en"): string {
  const url = new URL(`${SHOP_BASE}/cart/${product.variantId}:1`);
  url.searchParams.set(`attributes[${CLAIM_ATTRIBUTE}]`, claim);
  url.searchParams.set("ref", "hofgeschichten-app");
  if (locale === "en") url.searchParams.set("locale", "en");
  return url.toString();
}
