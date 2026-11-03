import type { CastRef } from "@/content/advent/types";
import styles from "./advent.module.css";

/** Gemalte Porträts aus /public (Kinder, Krümel, Hof-Leute, Pferde) */
const SRC: Record<CastRef, { src: string; alt: string }> = {
  lea: { src: "/kids/lea-160.webp", alt: "Lea" },
  mila: { src: "/kids/mila-160.webp", alt: "Mila" },
  ben: { src: "/kids/ben-160.webp", alt: "Ben" },
  kruemel: { src: "/kids/kruemel-160.webp", alt: "Krümel, der Hofhund" },
  wilhelm: { src: "/people/wilhelm-160.webp", alt: "Wilhelm, der Stallmeister" },
  tilda: { src: "/people/tilda-160.webp", alt: "Tilda, die Reitlehrerin" },
  hanna: { src: "/people/hanna-160.webp", alt: "Hanna, der der Hof gehört" },
  tivoli: { src: "/horses/tivoli-480.webp", alt: "Tivoli" },
  scrabble: { src: "/horses/scrabble-480.webp", alt: "Scrabble" },
  tonga: { src: "/horses/tonga-480.webp", alt: "Tonga" },
};

export function Portrait({ who, className }: { who: CastRef; className?: string }) {
  const p = SRC[who];
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={p.src} alt={p.alt} title={p.alt} width={58} height={58} loading="lazy" decoding="async" className={`${styles.portrait} ${className ?? ""}`} />;
}
