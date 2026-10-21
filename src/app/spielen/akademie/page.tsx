import type { Metadata } from "next";
import { ACADEMY_TITLE } from "@/content/akademie";
import { AcademyOverview } from "@/features/akademie/AcademyOverview";

export const metadata: Metadata = { title: ACADEMY_TITLE };

export default function Page() {
  return <AcademyOverview />;
}
