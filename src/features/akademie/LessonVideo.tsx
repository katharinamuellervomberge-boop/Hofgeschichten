import { Icon } from "@/components/illustrations/Icons";
import { videoSrc, type AcademyVideo } from "@/content/akademie/videos";
import styles from "./akademie.module.css";

/** Lernvideo zu einer Lektion (nur Große Akademie, Datei kommt geschützt vom Server) */
export function LessonVideo({ video, compact }: { video: AcademyVideo; compact?: boolean }) {
  const src = videoSrc(video);
  return (
    <figure className={`${styles.video} ${compact ? styles.videoCompact : ""}`}>
      <video controls playsInline preload="metadata" poster={src.poster} className={styles.videoEl}>
        <source src={src.video} type="video/mp4" />
      </video>
      <figcaption className={styles.videoCap}>
        <Icon name="play" />
        <span>
          <strong>Lernvideo:</strong> {video.title} · {Math.round(video.seconds / 6) / 10} Min.
        </span>
      </figcaption>
    </figure>
  );
}
