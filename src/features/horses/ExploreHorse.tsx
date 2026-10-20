"use client";

import { Horse } from "@/components/illustrations/Horse";
import { entdeckenActivity } from "@/content/games/entdecken";
import { getHorse } from "@/content/horses";
import { GameScreen } from "@/features/games/GameScreen";

/** „Pferde kennenlernen“: Körperteile am Pferd entdecken. */
export function ExploreHorse({ slug }: { slug: string }) {
  const horse = getHorse(slug)!;
  return (
    <GameScreen
      activity={entdeckenActivity(horse.slug, horse.name)}
      stampId="entdecker"
      backHref={`/pferde/${horse.slug}`}
      backLabel={`Zurück zu ${horse.name}`}
      tint={horse.tint}
      introArt={<Horse look={horse.look} uid={`ex-${horse.slug}`} />}
      more={{ href: "/pferde", label: "Andere Pferde" }}
    />
  );
}
