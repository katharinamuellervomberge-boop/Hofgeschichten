import { GeisterweideScene } from "@/components/illustrations/scenes/Geisterweide";
import { GeisterstallCover } from "@/components/illustrations/scenes/Lindenhof";

/** Titelbild je Abenteuer. Neues Abenteuer → hier ein Bild ergänzen. */
export function AdventureCover({ slug, className }: { slug: string; className?: string }) {
  switch (slug) {
    case "geisterweide":
      return <GeisterweideScene className={className} calm />;
    case "geisterstall":
      return <GeisterstallCover className={className} />;
    default:
      return null;
  }
}
