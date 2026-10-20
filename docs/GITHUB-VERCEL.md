# GitHub + Vercel – Schritt für Schritt

Für den Launch ist die Vorlesestimme ausgeschaltet (`features.voice = false` in
`src/content/site.ts`). Ihr braucht also **keinen** ElevenLabs-Schlüssel – nur GitHub und Vercel.

## 1. Projekt zu GitHub bringen (mit GitHub Desktop)
1. Konto auf github.com anlegen (falls noch keins).
2. **GitHub Desktop** installieren (desktop.github.com) und mit dem Konto anmelden.
3. `hofgeschichten-detective-edition.zip` entpacken.
4. GitHub Desktop → *File → Add local repository* → Ordner **hofgeschichten** wählen
   → Hinweis „not a Git repository“ → **create a repository** → *Create repository*.
5. Oben **Publish repository** → Häkchen **Keep this code private** bleibt gesetzt → *Publish*.

(Über die GitHub-Webseite hochladen geht auch, ist aber unzuverlässig: versteckte Ordner wie
`.github` werden oft nicht mitgenommen, und es gibt ein Limit pro Upload.)

## 2. Vercel verbinden (einmalig)
vercel.com → mit GitHub anmelden → **Add New → Project** → Repository **hofgeschichten**
→ **Import** → unter *Environment Variables* die Werte aus `docs/PREMIUM-FREISCHALTUNG.md`
eintragen (können auch später folgen, dann *Redeploy*) → **Deploy**.

Nach 1–2 Minuten ist die App unter `https://hofgeschichten-….vercel.app` erreichbar.
Ab jetzt gilt: Jede Änderung auf GitHub veröffentlicht Vercel automatisch neu.

## 3. Änderungen später hochladen
Dateien im Ordner ändern (oder neue ZIP-Version von uns hineinkopieren) → GitHub Desktop zeigt
die Änderungen → unten kurze Beschreibung eintippen → **Commit to main** → oben **Push origin**.

---

## Später: Stimme wieder einschalten (mit den Hörspielen)
1. `src/content/site.ts` → `features.voice = true`.
2. ElevenLabs-Tarif **mit kommerzieller Lizenz** buchen, API-Schlüssel anlegen
   (Developers → API Keys, Berechtigung „Text to Speech“). Schlüssel nie in Chat, Mail oder Dateien.
3. GitHub → Repository → **Settings → Secrets and variables → Actions → New repository secret**:
   Name `ELEVENLABS_API_KEY`, Wert = Schlüssel.
4. Reiter **Actions → Stimme erzeugen → Run workflow** (erst mit *limit* `10` probehören,
   dann ohne Limit). Bei „Permission denied“: Settings → Actions → General →
   *Workflow permissions* → **Read and write permissions**.
5. Voice-ID in `voice/config.json` mit ElevenLabs vergleichen („Copy voice ID“).

Details: `docs/STIMME.md`.
