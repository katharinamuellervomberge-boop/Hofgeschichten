import "server-only";
import { adventures } from "@/content/adventures";

/**
 * Prüft eine Bestellung direkt über die Shopify Admin GraphQL API.
 *
 * Zugang (eine der beiden Varianten, nur als Umgebungsvariablen bei Vercel):
 *  A) Dev-Dashboard-App (empfohlen seit 2026):
 *     SHOPIFY_STORE_DOMAIN, SHOPIFY_CLIENT_ID, SHOPIFY_CLIENT_SECRET
 *     → Token per „client credentials grant“, gilt 24 h, wird hier zwischengespeichert.
 *  B) Bestehender Admin-API-Token einer älteren Custom App:
 *     SHOPIFY_STORE_DOMAIN, SHOPIFY_ADMIN_TOKEN
 *
 * Benötigte Berechtigung: read_orders (bei Bestellungen älter als 60 Tage zusätzlich read_all_orders)
 * sowie Zugriff auf geschützte Kundendaten (E-Mail) im Dev Dashboard.
 *
 * Datensparsam: Die E-Mail wird nur zum Abgleich verwendet und nirgends gespeichert.
 */

const API_VERSION = process.env.SHOPIFY_API_VERSION || "2026-07";

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(domain: string): Promise<string | null> {
  if (process.env.SHOPIFY_ADMIN_TOKEN) return process.env.SHOPIFY_ADMIN_TOKEN;
  const id = process.env.SHOPIFY_CLIENT_ID;
  const secret = process.env.SHOPIFY_CLIENT_SECRET;
  if (!id || !secret) return null;
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.token;
  const res = await fetch(`https://${domain}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "client_credentials", client_id: id, client_secret: secret }),
    cache: "no-store",
  });
  if (!res.ok) return null;
  const json = (await res.json()) as { access_token?: string; expires_in?: number };
  if (!json.access_token) return null;
  cachedToken = { token: json.access_token, expiresAt: Date.now() + (json.expires_in ?? 3600) * 1000 };
  return json.access_token;
}

export function shopifyConfigured(): boolean {
  return Boolean(
    process.env.SHOPIFY_STORE_DOMAIN &&
      (process.env.SHOPIFY_ADMIN_TOKEN || (process.env.SHOPIFY_CLIENT_ID && process.env.SHOPIFY_CLIENT_SECRET)),
  );
}

const ORDER_QUERY = /* GraphQL */ `
  query HofgeschichtenOrder($q: String!) {
    orders(first: 5, query: $q) {
      nodes {
        name
        email
        test
        cancelledAt
        displayFinancialStatus
        lineItems(first: 50) {
          nodes {
            quantity
            product {
              handle
            }
          }
        }
      }
    }
  }
`;

type OrderNode = {
  name: string;
  email: string | null;
  test: boolean;
  cancelledAt: string | null;
  displayFinancialStatus: string | null;
  lineItems: { nodes: Array<{ quantity: number; product: { handle: string } | null }> };
};

export type VerifyResult = { ok: true; adventures: string[] } | { ok: false; reason: "not_found" | "not_paid" | "no_product" | "unavailable" };

/** Bestellnummer normalisieren: "#1234", "1234", " #1234 " → "1234" */
export function normalizeOrderNumber(input: string): string | null {
  const n = input.trim().replace(/^#/, "");
  return /^[A-Za-z0-9-]{1,20}$/.test(n) ? n : null;
}

export async function verifyShopifyOrder(orderNumber: string, email: string): Promise<VerifyResult> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  if (!domain || !shopifyConfigured()) return { ok: false, reason: "unavailable" };
  const token = await getAccessToken(domain);
  if (!token) return { ok: false, reason: "unavailable" };

  const res = await fetch(`https://${domain}/admin/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": token },
    // Suche nach Bestellnummer; die E-Mail wird danach exakt verglichen.
    body: JSON.stringify({ query: ORDER_QUERY, variables: { q: `name:#${orderNumber}` } }),
    cache: "no-store",
  });
  if (!res.ok) return { ok: false, reason: "unavailable" };
  const json = (await res.json()) as { data?: { orders?: { nodes: OrderNode[] } }; errors?: unknown };
  if (!json.data?.orders) return { ok: false, reason: "unavailable" };

  const wanted = email.trim().toLowerCase();
  const order = json.data.orders.nodes.find(
    (o) => o.name.replace(/^#/, "") === orderNumber && (o.email ?? "").toLowerCase() === wanted,
  );
  if (!order) return { ok: false, reason: "not_found" };

  const paid = ["PAID", "PARTIALLY_REFUNDED"].includes(order.displayFinancialStatus ?? "");
  // Testbestellungen nur zulassen, wenn ausdrücklich erlaubt (für den Testkauf vor dem Launch)
  const testOk = !order.test || process.env.SHOPIFY_ALLOW_TEST_ORDERS === "1";
  if (!paid || order.cancelledAt || !testOk) return { ok: false, reason: "not_paid" };

  const handles = new Set(order.lineItems.nodes.map((li) => li.product?.handle).filter(Boolean));
  const unlocked = adventures
    .filter((a) => a.published && a.access === "premium" && a.shopifyProductHandle && handles.has(a.shopifyProductHandle))
    .map((a) => a.slug);
  return unlocked.length ? { ok: true, adventures: unlocked } : { ok: false, reason: "no_product" };
}
