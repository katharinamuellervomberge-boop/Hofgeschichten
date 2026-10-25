import type { AcademyGame, AcademyGameInfo, AcademyTier, AcademyWorld, AcademyWorldInfo } from "./types";

/** Lernwelt → nur die Angaben, die der Browser sehen darf */
export function worldInfo(w: AcademyWorld, tier: AcademyTier): AcademyWorldInfo {
  return {
    id: w.id,
    number: w.number,
    slug: w.slug,
    title: w.title,
    teaser: w.teaser,
    learns: w.learns,
    tint: w.tint,
    cover: w.cover,
    badge: w.badge,
    tier,
    lessons: w.lessons.map((l) => ({ id: l.id, slug: l.slug, number: l.number, title: l.title })),
  };
}

/** Mini-Spiel → nur die Angaben für Übersichten */
export function gameInfo(g: AcademyGame, tier: AcademyTier): AcademyGameInfo {
  return { id: g.id, slug: g.slug, title: g.title, teaser: g.teaser, learns: g.learns, tint: g.tint, cover: g.cover, tier };
}
