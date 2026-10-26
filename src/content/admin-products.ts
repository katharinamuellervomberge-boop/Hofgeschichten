import { publishedAdventures } from "./adventures";
import { membership } from "./membership";
import { grosseAkademie } from "./products";

/** Was auf der Admin-Seite freigeschaltet werden kann (Reihenfolge = Auswahlliste) */
export type AdminProduct = { slug: string; label: string; membership?: boolean; mailName: string };

export const adminProducts: AdminProduct[] = [
  { slug: membership.slug, label: "Mitgliedschaft (auch mit Hofpost)", membership: true, mailName: "Ihre Hof-Mitgliedschaft" },
  { slug: grosseAkademie.slug, label: grosseAkademie.name, mailName: grosseAkademie.name },
  ...publishedAdventures.filter((a) => a.access === "premium").map((a) => ({ slug: a.slug, label: `Abenteuer: ${a.title}`, mailName: `das Abenteuer „${a.title}“` })),
];
