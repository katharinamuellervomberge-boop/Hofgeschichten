"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { useDiary } from "./store";
import { HomeView } from "./views/HomeView";
import { ProfileView } from "./views/ProfileView";
import { HorsesView, HorseEditor } from "./views/HorsesView";
import { EntryEditor } from "./views/EntryEditor";
import { EntriesView, EntryDetail } from "./views/EntriesView";
import { GoalsView } from "./views/GoalsView";
import { MomentsView } from "./views/MomentsView";
import { ReviewView } from "./views/ReviewView";
import { EmptyState, Toast } from "./ui";
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
 * Mein Reitertagebuch – für Mitglieder und Käufer der Reitakademie (Prüfung auf dem Server in
 * app/tagebuch/[[...view]]/page.tsx). Unterseiten über die Adresse:
 *   /tagebuch · /pferde · /pferde/neu · /pferde/<id> · /stunde · /stunde/<id>
 *   /eintraege · /eintrag/<id> · /ziele · /momente · /entwicklung · /profil
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
    const [a, b] = view;
    const props = { data: d, notify };
    switch (a) {
      case undefined:
        body = <HomeView {...props} persisted={state.persisted} />;
        break;
      case "profil":
        body = <ProfileView {...props} />;
        break;
      case "pferde":
        body = b ? <HorseEditor {...props} horseId={b === "neu" ? undefined : b} /> : <HorsesView {...props} />;
        break;
      case "stunde":
        body = <EntryEditor {...props} entryId={b} />;
        break;
      case "eintraege":
        body = <EntriesView {...props} />;
        break;
      case "eintrag":
        body = <EntryDetail {...props} entryId={b ?? ""} />;
        break;
      case "ziele":
        body = <GoalsView {...props} />;
        break;
      case "momente":
        body = <MomentsView {...props} />;
        break;
      case "entwicklung":
        body = <ReviewView {...props} />;
        break;
      default:
        body = <EmptyState art="book" title="Diese Seite gibt es nicht" text="Geh zurück zur Startseite deines Tagebuchs." />;
    }
  }

  return (
    <div className={`page ${s.diary}`}>
      <div key={view.join("/")}>{body}</div>
      <Toast text={toast} onDone={clearToast} />
    </div>
  );
}
