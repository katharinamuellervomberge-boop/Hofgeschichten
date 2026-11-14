"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { useDiary } from "./store";
import { BackupPanel } from "./views/BackupPanel";
import { RidingSpace } from "./riding/RidingSpace";
import { ProfileView } from "./views/ProfileView";
import { MomentsView } from "./views/MomentsView";
import { ReviewView } from "./views/ReviewView";
import { EmptyState, SubHeader, Toast } from "./ui";
import s from "./tagebuch.module.css";

export type Notify = (text: string) => void;

/* Hinweis-Text auf Modulebene, damit er einen Seitenwechsel (router.push) übersteht */
let toastText: string | null = null;
const toastListeners = new Set<() => void>();
const setToastText = (t: string | null) => {
  toastText = t;
  toastListeners.forEach((l) => l());
};
const notify: Notify = (t) => setToastText(t);
const clearToast = () => setToastText(null);
function useToast() {
  return useSyncExternalStore(
    (l) => {
      toastListeners.add(l);
      return () => toastListeners.delete(l);
    },
    () => toastText,
    () => null,
  );
}

/**
 * Mein Reitertagebuch – für Käufer der Reitakademie (und bestehende Mitglieder) (Prüfung auf dem Server in
 * app/tagebuch/[[...view]]/page.tsx). Unterseiten über die Adresse:
 *   /tagebuch · /pferde · /pferde/neu · /pferde/<id> · /stunde · /stunde/<id>
 *   /eintraege · /eintrag/<id> · /ziele · /momente · /entwicklung · /profil
 *   /plan · /plan/<Montag YYYY-MM-DD>   (Trainingsplan, seit 09.11.2026)
 *
 * Seit 14.11.2026 laufen Start, Pferde, Einträge, Ziele und Plan über den Riding Space
 * (riding/engine.ts, neue Adressen u. a. /fortschritt, /uebungen, /meilensteine).
 * Profil, Lieblingsmomente, Rückblick und Sicherung bleiben die bisherigen Seiten.
 */
export function DiaryApp({ view }: { view: string[] }) {
  const state = useDiary();
  const toast = useToast();

  let body: ReactNode;
  if (state.status === "loading") {
    body = (
      <div className={s.loading} aria-busy="true">
        <span className={s.loadingDot} />
        <p>Dein Tagebuch wird geöffnet …</p>
      </div>
    );
  } else if (state.status === "error") {
    body = (
      <EmptyState
        art="book"
        title="Das Tagebuch kann hier nicht speichern"
        text="Dieser Browser erlaubt keine Speicherung auf dem Gerät (zum Beispiel im privaten Modus). Öffne die App bitte in einem normalen Browserfenster oder vom Home-Bildschirm."
      />
    );
  } else {
    const d = state.data;
    const [a] = view;
    const props = { data: d, notify };
    switch (a) {
      case "profil":
        body = <ProfileView {...props} />;
        break;
      case "momente":
        body = <MomentsView {...props} />;
        break;
      case "entwicklung":
        body = <ReviewView {...props} />;
        break;
      case "sicherung":
        body = (
          <div className={s.stack}>
            <SubHeader title="Sicherung & Gerätewechsel" />
            <BackupPanel {...props} persisted={state.persisted} />
          </div>
        );
        break;
      default:
        body = <RidingSpace data={d} view={view} />;
    }
  }

  return (
    <div className={`page ${s.diary}`}>
      <div key={view.join("/")}>{body}</div>
      <Toast text={toast} onDone={clearToast} />
    </div>
  );
}
