"use client";

import { useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "@/i18n/Link";
import { Icon } from "@/components/illustrations/Icons";
import { COACH_PLACEHOLDER, coachCategories, problemHref } from "@/content/coach/index";
import { searchProblems } from "@/content/coach/search";
import s from "./coach.module.css";

/**
 * Prominente Problemsuche. Trefferliste wie eine Combobox (Pfeiltasten, Enter, Escape).
 * Läuft komplett im Browser über die öffentlichen Suchbegriffe – keine Inhalte, kein Server.
 */
export function CoachSearch({ owned }: { owned: boolean }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const hits = useMemo(() => searchProblems(q), [q]);
  const show = open && q.trim().length >= 2;

  const go = (slug: string) => router.push(problemHref({ slug }));

  return (
    <div className={s.search} role="search">
      <label htmlFor={`${listId}-in`} className="visually-hidden">
        {COACH_PLACEHOLDER}
      </label>
      <div className={s.searchBox}>
        <Icon name="lupe" />
        <input
          ref={inputRef}
          id={`${listId}-in`}
          className={s.searchInput}
          type="search"
          role="combobox"
          aria-expanded={show}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={show && hits[active] ? `${listId}-${active}` : undefined}
          autoComplete="off"
          enterKeyHint="search"
          placeholder={COACH_PLACEHOLDER}
          value={q}
          maxLength={160}
          onChange={(e) => {
            setQ(e.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, Math.max(hits.length - 1, 0)));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, 0));
            } else if (e.key === "Enter" && hits[active]) {
              e.preventDefault();
              go(hits[active].problem.slug);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
        />
        {q && (
          <button
            type="button"
            className={s.searchClear}
            aria-label="Eingabe löschen"
            onClick={() => {
              setQ("");
              inputRef.current?.focus();
            }}
          >
            <Icon name="close" />
          </button>
        )}
      </div>
      {show && (
        <ul id={listId} className={s.results} role="listbox" aria-label="Passende Themen">
          {hits.length === 0 ? (
            <li className={s.noResult} role="option" aria-selected={false} aria-disabled>
              Dazu haben wir noch keinen Lösungsweg. Beschreib es anders oder wähl unten ein Thema aus der Liste.
            </li>
          ) : (
            hits.map((h, i) => (
              <li key={h.problem.id} id={`${listId}-${i}`} role="option" aria-selected={i === active}>
                <Link
                  href={problemHref(h.problem)}
                  className={`${s.result} ${i === active ? s.resultActive : ""}`}
                  onMouseEnter={() => setActive(i)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <span className={s.resultIcon} aria-hidden>
                    <Icon name={!owned && !h.problem.demo ? "lock" : "coach"} />
                  </span>
                  <span>
                    <span className={s.resultTitle}>{h.problem.title}</span>
                    <span className={s.resultText}>
                      {coachCategories.find((c) => c.id === h.problem.category)?.title}
                      {!owned && (h.problem.demo ? " · kostenloser Demo-Lösungsweg" : " · Premium")}
                    </span>
                  </span>
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
