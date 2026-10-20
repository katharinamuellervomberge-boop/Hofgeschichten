import type { Metadata } from "next";
import { horses } from "@/content/horses";
import { HorseGallery } from "@/features/horses/HorseGallery";

export const metadata: Metadata = { title: "Die Pferde" };

export default function Page() {
  return <HorseGallery horses={horses} />;
}
