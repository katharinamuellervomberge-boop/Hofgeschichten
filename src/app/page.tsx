import { HomeScreen } from "@/features/home/HomeScreen";
import { getLocale } from "@/i18n/server";

export default async function Page() {
  return <HomeScreen locale={await getLocale()} />;
}
