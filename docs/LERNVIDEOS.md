# Lernvideos der Großen Reitakademie

Sechs animierte Lernvideos (1280 × 720, 25 Bilder/s), gerendert aus `src/video`. Sie erscheinen in der jeweiligen Lektion und in der Übersicht der Großen Akademie und werden nur nach Freischaltung über `/api/akademie-video/<slug>.mp4` ausgeliefert (Dateien in `private/akademie-video`).

## Ton mit ElevenLabs einfügen

1. Jeden Satz unten als eigene Datei einsprechen, Name = Nummer: `01.mp3`, `02.mp3` …
2. Dateien ablegen unter `voice/video/<slug>/` (z. B. `voice/video/leichttraben/01.mp3`).
3. `node scripts/video/voice.mjs <slug>` misst die Aufnahmen und passt die Bildzeiten an.
4. `NODE_TOOLS=<pfad>/node_modules node scripts/video/render.mjs <slug>` rendert das Video neu und legt die Stimme darunter.
5. In `src/content/akademie/videos.ts` `voiced: true` und die neue Länge eintragen.

Stimme: warm, ruhig, Kinderbuch-Tempo. Rhythmus-Silben (ta-tam, ba-da-bumm, auf – ab) deutlich im Takt.

## Sprechertexte

### Der Schritt im Viertakt – `schritt-viertakt` (ca. 42 s)

Lektion: schritt-reiten / der-viertakt

01. Der Schritt – im Viertakt.
02. Im Schritt setzt das Pferd jeden Huf einzeln auf. Zähl mit: eins, zwei, drei, vier.
03. Erst hinten links, dann vorne links. Dann hinten rechts und dann vorne rechts.
04. Immer sind zwei oder drei Hufe am Boden. Darum gibt es im Schritt keine Schwebephase.
05. Deshalb ist der Schritt so ruhig und gemütlich. Er ist die langsamste Gangart.
06. Merke: Schritt ist Viertakt – eins, zwei, drei, vier.

### Der Trab im Zweitakt – `trab-zweitakt` (ca. 49 s)

Lektion: trab-reiten / der-zweitakt

01. Der Trab – im Zweitakt.
02. Im Trab bewegen sich immer zwei Beine gleichzeitig: ein Vorderbein und das Hinterbein über Kreuz.
03. Hinten links geht mit vorne rechts, hinten rechts mit vorne links. Das nennt man diagonale Beinpaare.
04. Hör auf den Takt: ta-tam, ta-tam. Das sind die zwei Takte.
05. Zwischen den Takten schwebt das Pferd ganz kurz. Dann berührt kein Huf den Boden.
06. Darum spürst du im Trab ein Auf und Ab im Sattel.
07. Merke: Trab ist Zweitakt mit diagonalen Beinpaaren und einer kleinen Schwebephase.

### Leichttraben – so geht’s! – `leichttraben` (ca. 70 s)

Lektion: trab-reiten / leichttraben

01. Leichttraben – so geht's!
02. Im Trab bewegen sich immer zwei Beine zusammen: ein Vorderbein und das Hinterbein über Kreuz.
03. Darum hüpfst du im Sattel: ta-tam, ta-tam.
04. Beim Leichttraben stehst du bei einem Takt ein kleines bisschen auf …
05. … und beim nächsten Takt setzt du dich weich wieder hin. Auf – ab, auf – ab.
06. Die Bewegung kommt aus der Hüfte, nach vorn und nach oben. Das Knie federt, der Absatz bleibt tief.
07. Ganz wichtig: Deine Hände bleiben ruhig an derselben Stelle.
08. So ziehst du nicht am Maul, und der Rücken deines Pferdes wird geschont.
09. Profi-Tipp: Du stehst auf, wenn die äußere Schulter des Pferdes nach vorne geht.
10. Merke: Auf – ab im Takt des Pferdes. Die Hände bleiben ruhig.

### Auf dem richtigen Fuß leichttraben – `richtiger-fuss` (ca. 64 s)

Lektion: trab-reiten / richtiger-fuss

01. Auf dem richtigen Fuß leichttraben.
02. In der Reitbahn gibt es innen und außen. Innen ist die Seite zur Mitte, außen die Seite zur Bande.
03. Auf der linken Hand ist links innen und rechts außen.
04. Du sitzt ein, wenn das innere Hinterbein und das äußere Vorderbein auffußen …
05. … und du stehst auf, wenn diese beiden Beine nach vorne schwingen.
06. Zur Kontrolle schaust du kurz, nur mit den Augen, auf die äußere Schulter. Geht sie nach vorne, bist du oben.
07. Wechselst du die Hand, ändern sich innen und außen. Dann bleibst du einen Takt länger sitzen: ab – ab – auf.
08. Merke: Äußere Schulter vor – du bist oben. Beim Handwechsel einmal doppelt sitzen.

### Der Galopp im Dreitakt – `galopp-dreitakt` (ca. 60 s)

Lektion: galopp-verstehen / der-dreitakt

01. Der Galopp – im Dreitakt.
02. Im Galopp hörst du drei Takte und dann eine kleine Pause: ba-da-bumm, ba-da-bumm.
03. Im Rechtsgalopp fußt zuerst das linke Hinterbein auf. Dann das rechte Hinterbein und das linke Vorderbein zusammen. Zuletzt das rechte Vorderbein.
04. Danach fliegt das Pferd kurz durch die Luft. Das ist die Schwebephase.
05. Im Rechtsgalopp greifen die rechten Beine weiter nach vorne.
06. Im Linksgalopp ist es genau andersherum: Jetzt greifen die linken Beine weiter vor.
07. In der Reitbahn galoppierst du auf der rechten Hand im Rechtsgalopp und auf der linken Hand im Linksgalopp.
08. Merke: Galopp ist Dreitakt mit Schwebephase. Im Rechtsgalopp greifen die rechten Beine weiter vor.

### Bahnfiguren in der Reitbahn – `bahnfiguren` (ca. 82 s)

Lektion: reiten-in-der-bahn / ganze-bahn-und-handwechsel

01. Bahnfiguren – so reitest du in der Reitbahn.
02. Die Reitbahn ist oft zwanzig mal vierzig Meter groß. An der Bande stehen Buchstaben. So wissen alle, wo sie reiten.
03. Ganze Bahn: Du reitest an allen vier Seiten entlang und reitest die Ecken schön aus. Auf der linken Hand ist deine linke Seite innen.
04. Durch die ganze Bahn wechseln: Du reitest schräg von F über X nach H. Danach bist du auf der anderen Hand.
05. Der Zirkel ist ein großer Kreis an einer kurzen Seite. Er ist zwanzig Meter groß – so breit wie die Bahn.
06. Die Volte ist ein kleiner Kreis. Meistens ist sie sechs, acht oder zehn Meter groß.
07. Schlangenlinien: Du reitest gleichmäßige Bögen von einem Ende der Bahn zum anderen.
08. Bei allen Figuren gilt: rund reiten, nicht eckig. Und schau mit den Augen schon dorthin, wo du hinreiten willst.
09. Merke: Mit den Buchstaben findest du dich in jeder Reitbahn zurecht.
