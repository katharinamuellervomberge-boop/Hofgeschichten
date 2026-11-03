"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/illustrations/Icons";
import { HorseHead } from "@/components/illustrations/HorseHead";
import { GoldShoePath, SLOT_CROP, SLOT_POS, WinterStall } from "@/components/illustrations/advent/WinterStall";
import { CARD_AREAS, DECOS, STALL_SLOTS, cardGreeting, type Deco } from "@/content/advent/decor";
import type { DecorateGoal } from "@/content/advent/types";
import { horses } from "@/content/horses";
import { progressActions, useProgress } from "@/lib/progress/store";
import { emptyAdvent } from "@/lib/progress/types";
import styles from "./advent.module.css";

/**
 * DecorateGame – Spielkomponente 5 von 5.
 * Modus „stall“: Dekorationen auswählen und an festen Plätzen im Weihnachtsstall platzieren.
 * Modus „card“: die Weihnachtskarte für Tivoli gestalten (gleiche Bedienung: Bereich wählen, Auswahl antippen).
 * Alles wird sofort auf dem Gerät gespeichert und ist beim nächsten Besuch wieder da.
 */

export function useAdvent() {
  return useProgress().advent ?? emptyAdvent;
}

/** Kleines Vorschaubild einer Dekoration im Zusammenhang */
export function DecoThumb({ deco, card }: { deco: Deco; card?: Record<string, string> }) {
  return <WinterStall decor={{ [deco.slot]: deco.id }} card={card} viewBox={SLOT_CROP[deco.slot]} label={deco.name} />;
}

/**
 * Ziel prüfen. Die Mindestanzahl richtet sich nach den Plätzen, für die es schon Schmuck gibt –
 * wer Türchen verpasst hat, kann so trotzdem nie hängen bleiben.
 */
function checkGoal(goal: DecorateGoal | undefined, stall: Record<string, string>, availableSlots: number) {
  if (!goal) return { done: true, items: [] as Array<{ label: string; ok: boolean }> };
  const placed = new Set(Object.values(stall));
  const items = goal.required.map((id) => ({ label: `${DECOS.find((d) => d.id === id)?.name ?? id} aufhängen`, ok: placed.has(id) }));
  const min = Math.min(goal.minPlaced ?? 0, availableSlots);
  if (min > goal.required.length) {
    const n = Object.keys(stall).length;
    items.push({ label: `Mindestens ${min} Plätze schmücken (${Math.min(n, min)}/${min})`, ok: n >= min });
  }
  return { done: items.every((i) => i.ok), items };
}

type StallProps = {
  goal?: DecorateGoal;
  /** Zusätzlich freigeschaltete Dekorationen (z. B. die des laufenden Türchens, bevor es abgeschlossen ist) */
  extraUnlocked?: string[];
  onDone?: () => void;
  doneLabel?: string;
  wide?: boolean;
};

export function StallDecorator({ goal, extraUnlocked = [], onDone, doneLabel = "Fertig geschmückt", wide }: StallProps) {
  const advent = useAdvent();
  const unlocked = useMemo(() => new Set([...advent.decos, ...extraUnlocked]), [advent.decos, extraUnlocked]);
  const slots = STALL_SLOTS.filter((s) => DECOS.some((d) => d.slot === s.id && unlocked.has(d.id)));
  // Vorauswahl: der Platz der ersten geforderten Dekoration, sonst der erste Platz
  const firstGoalSlot = goal?.required.map((id) => DECOS.find((d) => d.id === id)?.slot).find(Boolean);
  const [active, setActive] = useState<string | null>(firstGoalSlot ?? slots[0]?.id ?? null);
  const stall = advent.stall;
  const status = checkGoal(goal, stall, slots.length);
  const lockedCount = DECOS.filter((d) => !unlocked.has(d.id)).length;

  const options = active ? DECOS.filter((d) => d.slot === active && unlocked.has(d.id)) : [];
  const activeLabel = STALL_SLOTS.find((s) => s.id === active)?.label;

  return (
    <div className={`${styles.decorate} ${wide ? styles.decorateWide : ""}`}>
      <div className={styles.stage}>
        <WinterStall decor={stall} card={advent.card} label="Dein Weihnachtsstall" />
        <svg viewBox="0 0 800 600" className={styles.overlay} role="group" aria-label="Plätze zum Schmücken">
          {slots.map((s) => {
            const p = SLOT_POS[s.id];
            const isActive = active === s.id;
            return (
              <g
                key={s.id}
                role="button"
                tabIndex={0}
                aria-label={`Platz: ${s.label}`}
                aria-pressed={isActive}
                className={`${styles.slotBtn} ${isActive ? styles.slotBtnActive : ""}`}
                onClick={() => setActive(s.id)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setActive(s.id))}
              >
                <circle cx={p.x} cy={p.y} r={isActive ? 40 : 28} className={stall[s.id] ? undefined : styles.slotPulse} />
              </g>
            );
          })}
        </svg>
      </div>

      <div className={styles.decorate}>
        {goal && (
          <div className={styles.goal} aria-live="polite">
            <strong>{goal.task}</strong>
            {status.items.map((i) => (
              <span key={i.label} className={`${styles.goalItem} ${i.ok ? styles.goalDone : ""}`}>
                <Icon name="check" />
                {i.label}
              </span>
            ))}
          </div>
        )}

        {slots.length === 0 ? (
          <p className={styles.hint}>Dein Stall ist noch schlicht. Die erste Dekoration gibt es am 9. Dezember – bis dahin sammelst du Hufeisen und Hinweise.</p>
        ) : (
          <>
            <p className={styles.hint}>Tippe auf einen leuchtenden Platz im Bild oder hier auf einen Namen. Dann wähle deinen Schmuck.</p>
            <div className={styles.slotList} role="toolbar" aria-label="Plätze">
              {slots.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`${styles.slotChip} ${active === s.id ? styles.slotChipActive : ""} ${stall[s.id] ? styles.slotChipFilled : ""}`}
                  aria-pressed={active === s.id}
                  onClick={() => setActive(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
            {active && (
              <div role="radiogroup" aria-label={`Schmuck für: ${activeLabel}`} className={styles.options}>
                {options.map((d) => {
                  const on = stall[active] === d.id;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      className={`${styles.option} ${on ? styles.optionActive : ""}`}
                      onClick={() => progressActions.setAdventStall(active, d.id)}
                    >
                      <span className={styles.optionThumb}>
                        <DecoThumb deco={d} card={advent.card} />
                      </span>
                      {d.name}
                    </button>
                  );
                })}
                <button
                  type="button"
                  role="radio"
                  aria-checked={!stall[active]}
                  className={`${styles.option} ${!stall[active] ? styles.optionActive : ""}`}
                  onClick={() => progressActions.setAdventStall(active, null)}
                >
                  <span className={styles.optionNone}>leer</span>
                  Nichts
                </button>
              </div>
            )}
          </>
        )}
        {lockedCount > 0 && <p className={styles.lockedDecos}>Noch {lockedCount} Dekorationen warten hinter den nächsten Türchen.</p>}
        {onDone && (
          <div className={styles.center}>
            <button type="button" className={styles.btn} disabled={!status.done} onClick={onDone}>
              {doneLabel}
              <Icon name="check" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Weihnachtskarte für Tivoli ---------- */

const PAPER: Record<string, { bg: string; ink: string }> = {
  creme: { bg: "#F6EFDF", ink: "#7A2533" },
  tanne: { bg: "#2F4A3A", ink: "#F6EFDF" },
  bordeaux: { bg: "#7A2533", ink: "#F6EFDF" },
  nacht: { bg: "#24324A", ink: "#F6EFDF" },
};

function wrap(text: string, max = 22): string[] {
  const lines: string[] = [];
  let line = "";
  for (const w of text.split(" ")) {
    if ((line + " " + w).trim().length > max && line) {
      lines.push(line);
      line = w;
    } else line = (line + " " + w).trim();
  }
  if (line) lines.push(line);
  return lines;
}

function starPath(cx: number, cy: number, r: number) {
  const p: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = i % 2 ? r * 0.45 : r;
    p.push(`${(cx + Math.cos(a) * rr).toFixed(1)} ${(cy + Math.sin(a) * rr).toFixed(1)}`);
  }
  return `M${p.join("L")}Z`;
}

export function CardCanvas({ card, className }: { card: Record<string, string>; className?: string }) {
  const paper = PAPER[card.papier ?? "creme"] ?? PAPER.creme;
  const greeting = cardGreeting(card) || "Frohe Weihnachten!";
  const tivoli = horses.find((h) => h.slug === "tivoli")!.look;
  return (
    <svg viewBox="0 0 300 420" className={className} role="img" aria-label={`Weihnachtskarte für Tivoli: ${greeting}`}>
      <defs>
        <linearGradient id="card-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F6DD98" />
          <stop offset=".55" stopColor="#D4A84F" />
          <stop offset="1" stopColor="#A67C2E" />
        </linearGradient>
      </defs>
      <rect width="300" height="420" rx="8" fill={paper.bg} />
      {card.rahmen === "gold" && <rect x="12" y="12" width="276" height="396" rx="4" fill="none" stroke="url(#card-gold)" strokeWidth="6" />}
      {card.rahmen === "tannen" && (
        <g stroke="#4E6B52" strokeWidth="5" strokeLinecap="round">
          {Array.from({ length: 14 }, (_, i) => (
            <g key={i}>
              <path d={`M${22 + i * 19} 20l8 10M${22 + i * 19} 20l-8 10`} />
              <path d={`M${22 + i * 19} 400l8-10M${22 + i * 19} 400l-8-10`} />
            </g>
          ))}
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cx={[30, 270, 30, 270][i]} cy={[30, 30, 390, 390][i]} r="5" fill="#B5323F" stroke="none" />
          ))}
        </g>
      )}
      {card.rahmen === "punkte" &&
        Array.from({ length: 36 }, (_, i) => {
          const t = i / 36;
          const per = 2 * (276 + 396);
          let d = t * per;
          let x = 12, y = 12;
          if (d < 276) x += d;
          else if ((d -= 276) < 396) { x = 288; y += d; }
          else if ((d -= 396) < 276) { x = 288 - d; y = 408; }
          else { d -= 276; y = 408 - d; }
          return <circle key={i} cx={x} cy={y} r="4.5" fill={i % 2 ? "#FFE3A3" : "#F2C46B"} />;
        })}
      {/* Motiv */}
      <g transform="translate(150 160)">
        {card.motiv === "tivoli" && (
          <g>
            <circle r="92" fill={paper.ink} opacity=".12" />
            <svg x="-92" y="-88" width="184" height="170" viewBox="0 0 260 240">
              <HorseHead look={tivoli} mood="neugierig" title="Tivoli" />
            </svg>
          </g>
        )}
        {card.motiv === "hufeisen" && (
          <g transform="scale(2.6)">
            <GoldShoePath fill="url(#card-gold)" />
          </g>
        )}
        {(card.motiv === "stern" || !card.motiv) && <path d={starPath(0, 0, 70)} fill="url(#card-gold)" stroke="#8C6A28" strokeWidth="2" />}
        {card.motiv === "zweig" && (
          <g transform="rotate(-20)">
            <path d="M-90 0H90" stroke="#5E4636" strokeWidth="6" strokeLinecap="round" />
            {Array.from({ length: 12 }, (_, i) => (
              <path key={i} d={`M${-80 + i * 14} 0l-14-22M${-80 + i * 14} 0l-14 22`} stroke="#2F4A3A" strokeWidth="7" strokeLinecap="round" />
            ))}
            <circle cx="40" cy="14" r="9" fill="#B5323F" />
            <circle cx="56" cy="8" r="8" fill="#C8414B" />
          </g>
        )}
      </g>
      {/* Gruß */}
      <text x="150" y={wrap(greeting).length > 1 ? 312 : 328} textAnchor="middle" fill={paper.ink} fontFamily="var(--font-display), serif" fontSize="21" fontWeight="600">
        {wrap(greeting).map((l, i) => (
          <tspan key={i} x="150" dy={i ? 28 : 0}>
            {l}
          </tspan>
        ))}
      </text>
      <text x="150" y="382" textAnchor="middle" fill={paper.ink} opacity=".7" fontFamily="var(--font-body), sans-serif" fontSize="13">
        Für Tivoli · Weihnachten 2026
      </text>
    </svg>
  );
}

export function CardDesigner({ onDone }: { onDone?: () => void }) {
  const advent = useAdvent();
  const card = advent.card;
  const done = CARD_AREAS.every((a) => card[a.id]);
  return (
    <div className={`${styles.decorate} ${styles.decorateWide}`}>
      <div className={styles.cardWrap}>
        <CardCanvas card={card} className={styles.cardSvg} />
      </div>
      <div className={styles.decorate}>
        {CARD_AREAS.map((a) => (
          <div key={a.id} className={styles.areaRow} role="radiogroup" aria-label={a.label}>
            <span className={styles.areaLabel}>{a.label}</span>
            <div className={styles.chips}>
              {a.options.map((o) => {
                const on = card[a.id] === o.id;
                return (
                  <button
                    key={o.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    className={`${styles.chip} ${on ? styles.chipActive : ""}`}
                    onClick={() => progressActions.setAdventCard(a.id, o.id)}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        {onDone && (
          <div className={styles.center}>
            <button type="button" className={styles.btn} disabled={!done} onClick={onDone}>
              Karte an Tivolis Box hängen
              <Icon name="check" />
            </button>
          </div>
        )}
        {!done && <p className={styles.hint}>Wähle in jedem Bereich etwas aus.</p>}
      </div>
    </div>
  );
}
