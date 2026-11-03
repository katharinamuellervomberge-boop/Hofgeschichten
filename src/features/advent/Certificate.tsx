"use client";

import { useState } from "react";
import { Icon } from "@/components/illustrations/Icons";
import { GoldShoePath } from "@/components/illustrations/advent/WinterStall";
import { useAdvent } from "./DecorateGame";
import styles from "./advent.module.css";

/**
 * Digitale Weihnachtsurkunde. Der Name wird freiwillig eingegeben und
 * NICHT gespeichert – er lebt nur, solange die Seite offen ist.
 */
export function Certificate({ finale }: { finale?: boolean }) {
  const [name, setName] = useState("");
  const doors = Object.keys(useAdvent().doors);
  // Im Finale wird die Urkunde vor dem letzten Hufeisen gezeigt – das 24. zählt schon mit
  const shoes = new Set(finale ? [...doors, "24"] : doors).size;
  const shown = name.trim() || "ein echtes Hofkind";
  return (
    <div>
      <div className={styles.certForm}>
        <label htmlFor="cert-name">Dein Name für die Urkunde (freiwillig)</label>
        <input id="cert-name" value={name} onChange={(e) => setName(e.target.value.slice(0, 40))} autoComplete="off" placeholder="Vorname" />
        <span className={styles.certNote}>Der Name wird nicht gespeichert und verlässt dieses Gerät nicht.</span>
      </div>
      <div className={styles.printArea}>
        <svg viewBox="0 0 1120 790" className={styles.certificate} role="img" aria-label={`Weihnachtsurkunde für ${shown}`}>
          <defs>
            <linearGradient id="cert-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#F6DD98" />
              <stop offset=".55" stopColor="#D4A84F" />
              <stop offset="1" stopColor="#A67C2E" />
            </linearGradient>
          </defs>
          <rect width="1120" height="790" fill="#FBF6EA" />
          <rect x="26" y="26" width="1068" height="738" fill="none" stroke="#1E3A2F" strokeWidth="10" />
          <rect x="44" y="44" width="1032" height="702" fill="none" stroke="url(#cert-gold)" strokeWidth="3" />
          {/* Tannenecken */}
          {[
            [60, 60, 0],
            [1060, 60, 90],
            [1060, 730, 180],
            [60, 730, 270],
          ].map(([x, y, r], i) => (
            <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
              {Array.from({ length: 6 }, (_, k) => (
                <path key={k} d={`M${12 + k * 16} 8l10 14M${12 + k * 16} 8l10-2`} stroke="#2F4A3A" strokeWidth="5" strokeLinecap="round" />
              ))}
              {Array.from({ length: 6 }, (_, k) => (
                <path key={`b${k}`} d={`M8 ${12 + k * 16}l14 10M8 ${12 + k * 16}l-2 10`} stroke="#2F4A3A" strokeWidth="5" strokeLinecap="round" />
              ))}
              <circle cx="16" cy="16" r="8" fill="#B5323F" />
            </g>
          ))}
          <text x="560" y="120" textAnchor="middle" fontFamily="var(--font-body), sans-serif" fontSize="20" letterSpacing="6" fill="#7A2533" fontWeight="700">
            HOFGESCHICHTEN · DAS GEHEIMNIS DES WINTERHOFS
          </text>
          <text x="560" y="200" textAnchor="middle" fontFamily="var(--font-display), serif" fontSize="68" fontWeight="700" fill="#1E3A2F">
            Weihnachtsurkunde
          </text>
          <g transform="translate(560 270) scale(1.5)">
            <GoldShoePath fill="url(#cert-gold)" />
          </g>
          <text x="560" y="350" textAnchor="middle" fontFamily="var(--font-body), sans-serif" fontSize="24" fill="#5D574C">
            Hiermit wird feierlich bestätigt, dass
          </text>
          <text x="560" y="425" textAnchor="middle" fontFamily="var(--font-display), serif" fontSize="58" fontStyle="italic" fill="#7A2533">
            {shown}
          </text>
          <path d="M300 445h520" stroke="#C9A24E" strokeWidth="2" />
          <text x="560" y="495" textAnchor="middle" fontFamily="var(--font-body), sans-serif" fontSize="24" fill="#2C2A24">
            im Advent 2026 das Geheimnis des Winterhofs gelüftet
          </text>
          <text x="560" y="530" textAnchor="middle" fontFamily="var(--font-body), sans-serif" fontSize="24" fill="#2C2A24">
            {`und ${shoes} von 24 goldenen Hufeisen gesammelt hat.`}
          </text>
          <text x="560" y="580" textAnchor="middle" fontFamily="var(--font-display), serif" fontSize="22" fontStyle="italic" fill="#4E6B52">
            Die Hufeisenweihnacht geht weiter – mit dir.
          </text>
          {/* Unterschriften */}
          <g fontFamily="var(--font-body), sans-serif" fill="#5D574C" fontSize="18" textAnchor="middle">
            <path d="M170 680h260M690 680h260" stroke="#2C2A24" strokeWidth="1.5" />
            <text x="300" y="668" fontFamily="var(--font-display), serif" fontStyle="italic" fontSize="30" fill="#1E3A2F">
              Wilhelm Brandt
            </text>
            <text x="300" y="706">Stallmeister</text>
            <text x="820" y="668" fontFamily="var(--font-display), serif" fontStyle="italic" fontSize="30" fill="#1E3A2F">
              Martha Lindner
            </text>
            <text x="820" y="706">Hüterin der Hufeisenweihnacht</text>
            <text x="560" y="706">Heiligabend 2026</text>
          </g>
        </svg>
      </div>
      <div className={styles.certActions}>
        <button type="button" className={styles.btn} onClick={() => window.print()}>
          Urkunde drucken
          <Icon name="star" />
        </button>
      </div>
    </div>
  );
}
