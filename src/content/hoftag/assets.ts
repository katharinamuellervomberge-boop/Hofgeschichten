/**
 * Asset-Platzhalter für „Mein Tag am Hof“.
 *
 * Das Spiel läuft komplett mit den vorhandenen Hofgeschichten-Grafiken
 * (gemalte Pferde- und Figurenporträts, SVG-Pferd, Krümel, Putzzeug-Symbole)
 * und gezeichneten SVG-Szenen. Sobald gemalte Bilder fertig sind, werden sie
 * hier eingetragen (`src`) und ersetzen automatisch die SVG-Szene.
 *
 * Format wie bei den Porträts: WebP, je zwei Breiten (<name>-800.webp, <name>-1600.webp),
 * Ablage in /public/hoftag/. Querformat 8:5 (Szenen), Hochformat 10:13 (Karte).
 */
export type AssetSlot = {
  id: string;
  /** Wofür das Bild gebraucht wird */
  purpose: string;
  /** Format */
  format: string;
  /** Pfad ohne Breite, z. B. "/hoftag/karte" – null = noch nicht vorhanden (SVG-Rückfall) */
  src: string | null;
};

export const HOFTAG_ASSETS: AssetSlot[] = [
  { id: "karte", purpose: "Illustrierte Hofkarte von oben (Kinderbuchkarte nach Hof-Lageplan), ohne Beschriftung", format: "10:13 Hochformat", src: null },
  { id: "szene-box", purpose: "Innenansicht einer Box: Stroh, Fenster, Heuraufe links, Tränke rechts, ohne Pferd", format: "8:5 Querformat", src: null },
  { id: "szene-boxtuer", purpose: "Box mit Platz für das Pferd in Seitenansicht (Pferd wird darübergelegt)", format: "8:5 Querformat", src: null },
  { id: "szene-paddock", purpose: "Sandpaddock hinter dem Stall mit Holzzaun, Heunetz, Wassertrog, Wald im Hintergrund", format: "8:5 Querformat", src: null },
  { id: "szene-putzplatz", purpose: "Überdachter Putzplatz mit Anbindering und Putzkasten", format: "8:5 Querformat", src: null },
  { id: "szene-heulager", purpose: "Scheune mit Heuballen, Heubedampfer, Werkbank", format: "8:5 Querformat", src: null },
  { id: "szene-futterkammer", purpose: "Futterkammer mit Futtertonnen und Mineralfutter", format: "8:5 Querformat", src: null },
  { id: "szene-reitplatz", purpose: "Reitplatz 20 × 40 m mit heller Bande, Bodenstangen, Flutlicht", format: "8:5 Querformat", src: null },
  { id: "szene-hof", purpose: "Hofplatz mit Linde, Bank, Kies, Stall im Hintergrund", format: "8:5 Querformat", src: null },
  { id: "abend", purpose: "Abendbild: Stall mit warmem Licht, Pferd mit Heu in der Box (Abschlussbild)", format: "8:5 Querformat", src: null },
  { id: "pferd-tivoli-seite", purpose: "Tivoli in Seitenansicht, freigestellt (ersetzt das SVG-Pferd in den Szenen)", format: "PNG/WebP transparent, 320:292", src: null },
  { id: "pferd-tonga-seite", purpose: "Tonga in Seitenansicht, freigestellt", format: "PNG/WebP transparent, 320:292", src: null },
  { id: "pferd-scrabble-seite", purpose: "Scrabble in Seitenansicht, freigestellt", format: "PNG/WebP transparent, 320:292", src: null },
  { id: "kruemel-ganz", purpose: "Krümel ganzkörper, sitzend (das Porträt gibt es schon in /public/kids) – für Szenen", format: "Quadrat, transparent", src: null },
];

export function assetSrc(id: string): string | null {
  return HOFTAG_ASSETS.find((a) => a.id === id)?.src ?? null;
}
