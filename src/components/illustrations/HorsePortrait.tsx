import type { Horse } from "@/content/types";
import { Horse as HorseSvg } from "./Horse";

type Props = {
  horse: Horse;
  className?: string;
  /** Größenhinweis für den Browser, z. B. "(min-width: 720px) 33vw, 90vw" */
  sizes?: string;
  /** Oberhalb der Falz sofort laden */
  priority?: boolean;
};

/**
 * Gemaltes Porträt eines Pferdes. Fällt auf die gezeichnete
 * SVG-Illustration zurück, solange kein Porträt hinterlegt ist.
 */
export function HorsePortrait({ horse, className, sizes = "(min-width: 720px) 360px, 90vw", priority }: Props) {
  if (!horse.portrait) {
    return <HorseSvg look={horse.look} uid={`portrait-${horse.slug}`} title={horse.name} className={className} />;
  }
  const { base, alt } = horse.portrait;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- statische WebP-Dateien mit srcset, kein Bildserver nötig
    <img
      src={`${base}-960.webp`}
      srcSet={`${base}-480.webp 480w, ${base}-960.webp 960w`}
      sizes={sizes}
      width={960}
      height={1200}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
    />
  );
}
