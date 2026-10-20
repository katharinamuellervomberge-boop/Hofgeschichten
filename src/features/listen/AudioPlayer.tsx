"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { Icon } from "@/components/illustrations/Icons";
import type { Episode } from "@/content/types";
import { site } from "@/content/site";
import { progressActions, readProgress } from "@/lib/progress/store";
import styles from "./AudioPlayer.module.css";

function fmt(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) sec = 0;
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

type Props = {
  episode: Episode;
  onCompleted?: () => void;
};

export function AudioPlayer({ episode, onCompleted }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const lastSaved = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(episode.durationSeconds);
  const [error, setError] = useState(false);

  const save = useCallback(
    (t: number) => {
      progressActions.saveEpisodePosition(episode.slug, Math.floor(t));
      lastSaved.current = t;
    },
    [episode.slug],
  );

  // Gespeicherte Position wiederherstellen
  const onLoaded = () => {
    const a = audioRef.current;
    if (!a) return;
    if (Number.isFinite(a.duration) && a.duration > 0) setDuration(a.duration);
    const saved = readProgress().episodes[episode.slug];
    if (saved && !saved.completed && saved.position > 2 && saved.position < a.duration - 3) {
      a.currentTime = saved.position;
      setCurrent(saved.position);
    }
  };

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      try {
        await a.play();
      } catch {
        setError(true);
      }
    } else {
      a.pause();
    }
  };

  const skip = (delta: number) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Math.min(Math.max(0, a.currentTime + delta), duration);
  };

  // Sperrbildschirm-/Kopfhörer-Steuerung
  useEffect(() => {
    if (typeof navigator === "undefined" || !("mediaSession" in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: episode.title,
      artist: site.name,
      album: site.producer,
    });
    navigator.mediaSession.setActionHandler("play", () => audioRef.current?.play());
    navigator.mediaSession.setActionHandler("pause", () => audioRef.current?.pause());
    navigator.mediaSession.setActionHandler("seekbackward", () => skip(-15));
    navigator.mediaSession.setActionHandler("seekforward", () => skip(15));
    return () => {
      (["play", "pause", "seekbackward", "seekforward"] as const).forEach((a) =>
        navigator.mediaSession.setActionHandler(a, null),
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episode.slug]);

  // Beim Verlassen der Seite Position sichern
  useEffect(() => {
    const a = audioRef.current;
    return () => {
      if (a && !a.ended && a.currentTime > 0) save(a.currentTime);
    };
  }, [save]);

  const pct = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div className={styles.player}>
      <audio
        ref={audioRef}
        src={episode.audioSrc}
        preload="metadata"
        onLoadedMetadata={onLoaded}
        onPlay={() => setPlaying(true)}
        onPause={() => {
          setPlaying(false);
          const a = audioRef.current;
          if (a && !a.ended) save(a.currentTime);
        }}
        onTimeUpdate={() => {
          const t = audioRef.current?.currentTime ?? 0;
          setCurrent(t);
          if (Math.abs(t - lastSaved.current) >= 5) save(t);
        }}
        onEnded={() => {
          setPlaying(false);
          setCurrent(0);
          progressActions.completeEpisode(episode.slug);
          onCompleted?.();
        }}
        onError={() => setError(true)}
      />

      <div className={styles.controls}>
        <button type="button" className={styles.skip} onClick={() => skip(-15)} aria-label="15 Sekunden zurück">
          <Icon name="rewind" />
        </button>
        <button
          type="button"
          className={`${styles.play} ${playing ? styles.isPlaying : ""}`}
          onClick={toggle}
          aria-label={playing ? "Pause" : "Abspielen"}
        >
          <Icon name={playing ? "pause" : "play"} />
        </button>
        <button type="button" className={styles.skip} onClick={() => skip(15)} aria-label="15 Sekunden vor">
          <Icon name="forward" />
        </button>
      </div>

      <div className={styles.timeline}>
        <input
          type="range"
          min={0}
          max={Math.max(1, Math.floor(duration))}
          step={1}
          value={Math.floor(current)}
          onChange={(e) => {
            const a = audioRef.current;
            const t = Number(e.target.value);
            if (a) a.currentTime = t;
            setCurrent(t);
          }}
          aria-label="Position in der Folge"
          aria-valuetext={`${fmt(current)} von ${fmt(duration)}`}
          style={{ "--pct": `${pct}%` } as CSSProperties}
          className={styles.range}
        />
        <div className={styles.times}>
          <span>{fmt(current)}</span>
          <span>{fmt(duration)}</span>
        </div>
      </div>

      {error && (
        <p className={styles.error} role="alert">
          Die Folge konnte gerade nicht abgespielt werden. Bitte später noch einmal versuchen.
        </p>
      )}
    </div>
  );
}
