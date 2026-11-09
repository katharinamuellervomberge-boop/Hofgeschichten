import { redirect } from "next/navigation";

/**
 * Die Hofwelt gibt es seit 09.11.2026 nicht mehr als eigenen Bereich.
 * Alte Links führen zur Reitakademie. Der frühere Bildschirm liegt weiter in
 * `features/hofwelt/HofweltScreen.tsx`, falls er zurückkommen soll.
 */
export default function Page() {
  redirect("/akademie");
}
