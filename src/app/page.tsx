import { HomeScreen } from "@/features/home/HomeScreen";
import { getLocale } from "@/i18n/server";
import { hasAcademy, hasDiary, hasRiderCoach } from "@/lib/entitlements/server";

export const dynamic = "force-dynamic";

/** Startseite – die Freischaltungen (serverseitig geprüft) steuern nur Beschriftungen und „Dein nächster Schritt“ */
export default async function Page() {
  const locale = await getLocale();
  const [academy, diary, coach] = await Promise.all([hasAcademy(), hasDiary(), hasRiderCoach()]);
  return <HomeScreen locale={locale} access={{ academy, diary, coach }} />;
}
