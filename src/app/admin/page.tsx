import type { Metadata } from "next";
import { adminProducts } from "@/content/admin-products";
import { AdminScreen } from "@/features/admin/AdminScreen";
import { adminConfigured, isAdmin } from "@/lib/admin";

export const metadata: Metadata = { title: "Verwaltung", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function Page() {
  return <AdminScreen configured={adminConfigured()} loggedIn={await isAdmin()} products={adminProducts} />;
}
