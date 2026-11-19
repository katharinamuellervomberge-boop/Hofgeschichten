import { HomeScreen } from "@/features/home/HomeScreen";
import { getLocale } from "@/i18n/server";
import { hasMutigReiten } from "@/lib/entitlements/server";

export default async function Page() {
  const locale = await getLocale();
  return <HomeScreen locale={locale} mutig={locale === "de" && (await hasMutigReiten())} />;
}
