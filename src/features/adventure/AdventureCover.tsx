import { GeisterweideScene } from "@/components/illustrations/scenes/Geisterweide";

/** Titelbild je Abenteuer. Neues Abenteuer → hier ein Bild ergänzen. */
export function AdventureCover({ slug, className }: { slug: string; className?: string }) {
  switch (slug) {
    case "geisterweide":
      return <GeisterweideScene className={className} calm />;
    default:
      return null;
  }
}
