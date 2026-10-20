import "server-only";
import type { AdventureContent } from "@/engine/types";
import { geisterweide } from "./geisterweide.server";

/** Alle Abenteuer-Inhalte (nur Server). Neues Abenteuer hier eintragen. */
const registry: Record<string, AdventureContent> = {
  geisterweide,
};

export function loadAdventureContent(slug: string): AdventureContent | undefined {
  return registry[slug];
}
