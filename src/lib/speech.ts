"use client";

import manifest from "@/content/voice-manifest.json";
import { site } from "@/content/site";
import { readProgress } from "./progress/store";
import { normalizeSpeech, speechId } from "./voice/hash";

/**
 * Vorlesen für Kinder, die noch nicht lesen können.
 *
 * 1. Vorrang: vorab erzeugte Aufnahmen (KI-Stimme) aus dem Sprecherskript.
 *    - kostenlose Inhalte: /voice/<id>.mp3 (öffentlich)
 *    - Premium-Inhalte:    /api/voice/<id> (Server prüft den Kauf)
 * 2. Ersatz: Stimme des Geräts – nur lokale Stimmen (`localService`),
 *    damit kein Text an Server von Browserherstellern geht.
 *
 * Ein Aufruf kann mehrere Sätze (Segmente) enthalten; sie werden
 * nacheinander gesprochen, jeder Satz mit seiner eigenen Aufnahme.
 */

export type Speech = string | readonly string[];

/** Vorlesen insgesamt an/aus (src/content/site.ts → features.voice). */
export const voiceEnabled: boolean = site.features.voice;

type Manifest = { version: number; voice: string | null; clips: Record<string, string> };
const clips = (manifest as Manifest).clips;

function clipUrl(text: string): string | null {
  const id = speechId(text);
  const access = clips[id];
  if (!access) return null;
  return access === "free" ? `/voice/${id}.mp3` : `/api/voice/${id}`;
}

/** Gibt es überhaupt Aufnahmen (KI-Stimme) in dieser Version? */
export function recordingsAvailable(): boolean {
  return Object.keys(clips).length > 0;
}

export function hasRecording(text: Speech): boolean {
  const parts = (typeof text === "string" ? [text] : text).map(normalizeSpeech).filter(Boolean);
  return parts.length > 0 && parts.every((p) => clipUrl(p) !== null);
}

/* ---------- Gerätestimme ---------- */

let cachedVoice: SpeechSynthesisVoice | null | undefined;

function pickVoice(): SpeechSynthesisVoice | null {
  if (cachedVoice !== undefined) return cachedVoice;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null; // noch nicht geladen – später erneut versuchen
  const german = voices.filter((v) => v.lang?.toLowerCase().startsWith("de") && v.localService);
  cachedVoice = german.find((v) => v.lang === "de-DE") ?? german[0] ?? null;
  return cachedVoice;
}

export function speechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function hasLocalGermanVoice(): boolean {
  if (!speechSupported()) return false;
  return pickVoice() !== null;
}

function speakWithDevice(text: string, isCurrent: () => boolean): Promise<void> {
  return new Promise((resolve) => {
    if (!speechSupported() || !isCurrent()) return resolve();
    const voice = pickVoice();
    if (!voice) return resolve(); // Keine lokale deutsche Stimme: lieber still als Daten senden.
    const u = new SpeechSynthesisUtterance(text);
    u.voice = voice;
    u.lang = voice.lang;
    u.rate = 0.92;
    u.pitch = 1.05;
    u.onend = () => resolve();
    u.onerror = () => resolve();
    window.speechSynthesis.speak(u);
  });
}

/* ---------- Aufnahmen ---------- */

let audio: HTMLAudioElement | null = null;

/** 80 ms Stille (MP3) – nur zum Freischalten des Tons auf iOS */
const SILENCE = "data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjYwLjE2LjEwMAAAAAAAAAAAAAAA//NwwAAAAAAAAAAAAEluZm8AAAAPAAAABgAAAykAWlpaWlpaWlpaWlpaWlpaWnt7e3t7e3t7e3t7e3t7e3t7nJycnJycnJycnJycnJycnL29vb29vb29vb29vb29vb293t7e3t7e3t7e3t7e3t7e3t7/////////////////////AAAAAExhdmM2MC4zMQAAAAAAAAAAAAAAACQEUQAAAAAAAAMpso/G6AAAAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//NCxKMAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//NAxKQAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/80LEowAAA0gAAAAAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=";

function getAudio(): HTMLAudioElement {
  if (!audio) {
    audio = new Audio();
    audio.preload = "auto";
  }
  return audio;
}

/**
 * iOS/Safari erlaubt Ton nur nach einer Berührung. Beim ersten Tippen
 * wird das gemeinsame Audio-Element einmal „freigeschaltet“; danach
 * darf es auch zeitversetzt (z. B. beim automatischen Vorlesen) spielen.
 */
if (typeof window !== "undefined" && voiceEnabled) {
  const unlock = () => {
    const a = getAudio();
    if (!a.src) {
      a.src = SILENCE;
      a.muted = true;
      a.play()
        .then(() => {
          a.pause();
          a.muted = false;
        })
        .catch(() => {
          a.muted = false;
        });
    }
  };
  window.addEventListener("pointerdown", unlock, { once: true, passive: true });
  window.addEventListener("keydown", unlock, { once: true });
}

function playClip(url: string, isCurrent: () => boolean): Promise<boolean> {
  return new Promise((resolve) => {
    if (!isCurrent()) return resolve(true);
    const a = getAudio();
    const done = (ok: boolean) => {
      a.onended = null;
      a.onerror = null;
      resolve(ok);
    };
    a.onended = () => done(true);
    a.onerror = () => done(false);
    a.src = url;
    a.muted = false;
    a.play().catch(() => done(false));
  });
}

/* ---------- Öffentliche Schnittstelle ---------- */

let generation = 0;

/** Liest einen Satz oder mehrere Sätze nacheinander vor. Vorheriges Vorlesen wird abgebrochen. */
export function speak(text: Speech) {
  if (typeof window === "undefined" || !voiceEnabled) return;
  if (!readProgress().settings.speech) return;
  stopSpeaking();
  const my = ++generation;
  const isCurrent = () => my === generation;
  const parts = (typeof text === "string" ? [text] : [...text]).map(normalizeSpeech).filter(Boolean);

  void (async () => {
    for (const part of parts) {
      if (!isCurrent()) return;
      const url = clipUrl(part);
      // Testhilfe: zeichnet auf, welche Sätze ohne Aufnahme bleiben (nur wenn ein Test das Array anlegt)
      (window as { __hgSpeechLog?: Array<{ text: string; url: string | null }> }).__hgSpeechLog?.push({ text: part, url });
      const ok = url ? await playClip(url, isCurrent) : false;
      if (!ok) await speakWithDevice(part, isCurrent);
    }
  })();
}

export function stopSpeaking() {
  if (!voiceEnabled) return;
  generation++;
  if (audio && !audio.paused) audio.pause();
  if (speechSupported()) window.speechSynthesis.cancel();
}

if (typeof window !== "undefined" && speechSupported()) {
  window.speechSynthesis.addEventListener?.("voiceschanged", () => {
    cachedVoice = undefined;
  });
}
