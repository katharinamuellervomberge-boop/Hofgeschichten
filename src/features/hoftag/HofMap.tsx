"use client";

import type { KeyboardEvent } from "react";
import { PLACES } from "@/content/hoftag/places";
import type { PlaceId, TimeOfDay } from "@/content/hoftag/types";
import styles from "./hoftag.module.css";

/**
 * Illustrierte Hofkarte von oben – nach dem verbindlichen Hof-Lageplan.
 * Norden oben: Paddocks hinter dem Stall, Putzplatz/Futterkammer und Scheune im Osten,
 * Reitplatz im Südosten, Hannas Haus im Süden, Wald und Bach im Westen.
 */
const OUT = "#5E4636";

type Props = {
  /** Ort der aktuellen Aufgabe (wird hervorgehoben) */
  highlight?: PlaceId | null;
  time: TimeOfDay;
  onSelect: (id: PlaceId) => void;
};

export function HofMap({ highlight, time, onSelect }: Props) {
  const night = time === "abend";
  const key = (id: PlaceId) => (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(id);
    }
  };
  return (
    <svg viewBox="0 0 400 520" className={styles.map} role="group" aria-label="Hofkarte">
      <defs>
        <pattern id="map-kies" width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill="#E8DCC4" />
          <circle cx="3" cy="3" r="1" fill="#C4AC84" />
          <circle cx="8" cy="7" r=".8" fill="#C4AC84" />
        </pattern>
        <pattern id="map-sand" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="#E9D7AE" />
          <circle cx="2" cy="5" r=".7" fill="#C9AE7E" />
        </pattern>
      </defs>

      {/* Wiese */}
      <rect width="400" height="520" rx="22" fill="#D9E0CC" />
      {/* Wald im Westen mit Bach */}
      <g>
        <rect x="0" y="0" width="34" height="520" fill="#9FAE8A" />
        {[20, 70, 120, 180, 240, 330, 400, 470].map((y, i) => (
          <circle key={y} cx={i % 2 ? 12 : 26} cy={y} r="16" fill={i % 2 ? "#6F8466" : "#7E9468"} />
        ))}
        <path d="M18 0c10 60-8 110 2 170s-10 120 0 190 8 110-2 160" fill="none" stroke="#8FB3BE" strokeWidth="5" strokeLinecap="round" />
      </g>
      {/* Weiden im Osten (im Herbst geschont) */}
      <rect x="296" y="24" width="96" height="116" rx="8" fill="#B9C6A0" stroke={OUT} strokeWidth="1.5" strokeDasharray="4 3" />
      <circle cx="350" cy="62" r="14" fill="#7E9468" />
      <circle cx="322" cy="110" r="10" fill="#7E9468" />
      <text x="344" y="134" textAnchor="middle" className={styles.mapSmall}>
        Weiden
      </text>

      {/* Paddocks */}
      {[46, 130, 214].map((x, i) => (
        <g key={x}>
          <rect x={x} y="34" width="78" height="100" rx="6" fill="url(#map-sand)" stroke={OUT} strokeWidth="2" />
          {i === 1 && (
            <g>
              <ellipse cx={x + 24} cy="96" rx="9" ry="5" fill="#B0683A" />
              <ellipse cx={x + 46} cy="104" rx="10" ry="5.5" fill="#3A2C25" />
              <ellipse cx={x + 52} cy="82" rx="9" ry="5" fill="#8A4A26" />
              <rect x={x + 6} y="44" width="16" height="8" rx="3" fill="#E3C47A" stroke={OUT} strokeWidth="1" />
            </g>
          )}
        </g>
      ))}

      {/* Stall */}
      <g>
        <rect x="42" y="160" width="198" height="66" rx="4" fill="#9C6B4A" stroke={OUT} strokeWidth="2.5" />
        <path d="M42 193h198" stroke="#7E5A44" strokeWidth="3" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M${58 + i * 30} 162v62`} stroke="#B07A4F" strokeWidth="1.5" opacity=".7" />
        ))}
        <rect x="36" y="184" width="10" height="18" fill="#3E5A45" stroke={OUT} strokeWidth="1.5" />
        {night && [70, 130, 190].map((x) => <circle key={x} cx={x} cy="230" r="3" fill="#FFD892" />)}
      </g>
      {/* Futterkammer + Putzplatz (östlich am Stall) */}
      <rect x="242" y="160" width="48" height="32" rx="3" fill="#80634D" stroke={OUT} strokeWidth="2" />
      <rect x="242" y="196" width="48" height="40" rx="3" fill="#C4AC84" stroke={OUT} strokeWidth="2" strokeDasharray="5 3" />
      {/* Scheune mit Heulager */}
      <rect x="298" y="152" width="88" height="88" rx="4" fill="#A4573A" stroke={OUT} strokeWidth="2.5" />
      <path d="M298 196h88" stroke="#7E3F2A" strokeWidth="3" />
      <rect x="308" y="206" width="22" height="14" rx="3" fill="#E3C47A" />
      <rect x="334" y="206" width="22" height="14" rx="3" fill="#E3C47A" />

      {/* Hofplatz mit Linde */}
      <rect x="40" y="240" width="190" height="96" rx="10" fill="url(#map-kies)" stroke="#C4AC84" strokeWidth="1.5" />
      <circle cx="132" cy="288" r="22" fill="#B9C6A0" />
      <circle cx="132" cy="284" r="16" fill="#6F8466" />
      <rect x="120" y="308" width="24" height="5" rx="2" fill="#80634D" />
      {/* Hoftor */}
      <path d="M36 272v28" stroke={OUT} strokeWidth="4" strokeLinecap="round" />
      <text x="58" y="330" className={styles.mapSmall}>
        Hoftor
      </text>

      {/* Reitplatz */}
      <g>
        <rect x="236" y="304" width="142" height="164" rx="4" fill="url(#map-sand)" stroke="#F3EEE4" strokeWidth="5" />
        <rect x="236" y="304" width="142" height="164" rx="4" fill="none" stroke={OUT} strokeWidth="1.5" />
        {[[236, 304], [378, 304], [236, 386], [378, 386], [236, 468], [378, 468]].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill={night ? "#FFD892" : "#7C8682"} stroke={OUT} strokeWidth="1" />
        ))}
        <path d="M272 430h40M276 442h40" stroke="#A4573A" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Hannas Haus */}
      <g>
        <rect x="58" y="372" width="108" height="64" rx="3" fill="#F3EEE4" stroke={OUT} strokeWidth="2" />
        <path d="M54 372h116l-12-22H66Z" fill="#A4573A" stroke={OUT} strokeWidth="2" />
        <rect x="100" y="406" width="18" height="30" fill="#344638" />
        {night && <rect x="72" y="388" width="16" height="12" fill="#FFD892" />}
        <path d="M58 448h108" stroke="#F3EEE4" strokeWidth="3" strokeDasharray="4 3" />
        <text x="112" y="468" textAnchor="middle" className={styles.mapSmall}>
          Hannas Haus
        </text>
      </g>
      {/* Zufahrt */}
      <path d="M200 520c0-40 0-80 10-110" stroke="#E8DCC4" strokeWidth="16" fill="none" />

      {night && <rect width="400" height="520" rx="22" fill="#1D2433" opacity=".22" pointerEvents="none" />}

      {/* Tippbare Bereiche */}
      {PLACES.map((p) => {
        const active = highlight === p.id;
        return (
          <g
            key={p.id}
            role="button"
            tabIndex={0}
            aria-label={`${p.name}${active ? " – hier ist deine Aufgabe" : ""}`}
            className={`${styles.mapHit} ${active ? styles.mapHitActive : ""}`}
            onClick={() => onSelect(p.id)}
            onKeyDown={key(p.id)}
          >
            <rect x={p.hit.x} y={p.hit.y} width={p.hit.w} height={p.hit.h} rx="10" className={styles.mapHitArea} />
            <g transform={`translate(${p.label.x} ${p.label.y})`}>
              <rect x={-(p.name.length * 4.1 + 12)} y="-13" width={p.name.length * 8.2 + 24} height="24" rx="12" className={styles.mapLabel} />
              <text textAnchor="middle" y="4" className={styles.mapLabelText}>
                {p.name}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
}
