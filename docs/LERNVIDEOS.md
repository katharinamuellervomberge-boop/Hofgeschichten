# Lernvideos der Großen Reitakademie

Animierte Lernvideos (1280 × 720, 25 Bilder/s), gerendert aus `src/video`. Sie erscheinen in der jeweiligen Lektion und in der Übersicht der Großen Akademie und werden nur nach Freischaltung über `/api/akademie-video/<slug>.mp4` ausgeliefert (Dateien in `private/akademie-video`).

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

## Neue Lernvideos der Module 10–14 (28, Stand 13.11.2026)

Gerendert ohne Sprecher, der Text steht als Einblendung im Bild. Vertonen: GitHub → Actions → „Lernvideos vertonen“ → Run workflow (nutzt das Secret `ELEVENLABS_API_KEY`; erzeugt `voice/video/<slug>/NN.mp3`, rendert neu, trägt Länge und `voiced: true` ein und committet auf den Branch).

### So funktioniert die Pferdeverdauung – `pferdeverdauung` (ca. 58 s)

01. So funktioniert die Pferdeverdauung.
02. Das Futter wandert vom Maul über den Magen und den Dünndarm in den großen Dickdarm. Insgesamt sind das rund dreißig Meter.
03. Der Magen ist erstaunlich klein: Er fasst nur etwa zehn bis fünfzehn Liter. Der Dickdarm dagegen ist riesig.
04. Weil der Magen ständig Säure bildet, braucht das Pferd fast ununterbrochen etwas zu kauen. Kauen macht Speichel, und Speichel puffert die Säure.
05. Im Dickdarm bauen Milliarden Mikroorganismen die Faser aus Heu und Gras ab. Sie liefern so die wichtigste Energie – und Wärme.
06. Daraus folgen die wichtigsten Fütterungsregeln.
07. Merke: Pferde sind Dauerfresser mit kleinem Magen und großem Dickdarm. Und sie können nicht erbrechen.

### Raufutterbedarf berechnen – `raufutterbedarf` (ca. 52 s)

01. Wie viel Raufutter braucht mein Pferd mindestens?
02. Die Faustregel: mindestens anderthalb Kilogramm Trockensubstanz je hundert Kilogramm Körpermasse und Tag.
03. Trockensubstanz ist das Futter ohne Wasser. Heu ist fast trocken, Heulage enthält deutlich mehr Wasser, Gras am meisten.
04. Beispiel: ein Pferd mit sechshundert Kilogramm. Sechs mal anderthalb ergibt neun Kilogramm Trockensubstanz.
05. Jetzt rechnest du in Frischmasse um: Trockensubstanz geteilt durch den TS-Gehalt.
06. Auch ein zu dickes Pferd braucht diese Mindestmenge. Abnehmen geht über energieärmeres Heu, etwas Stroh und mehr Bewegung – nicht über Hungern.
07. Merke: Frischmasse gleich Trockensubstanz geteilt durch TS-Gehalt. Und Gewicht regelmäßig kontrollieren.

### Pferde richtig anweiden – `anweiden` (ca. 45 s)

01. Pferde richtig anweiden.
02. Im Winter hat sich die Darmflora auf Heu eingestellt. Frisches Gras enthält mehr Wasser, Zucker und Eiweiß. Kommt es plötzlich, drohen Durchfall, Kolik und Hufrehe.
03. Beginne mit zehn bis fünfzehn Minuten am Tag und steigere langsam über zwei bis vier Wochen.
04. Füttere vorher Heu. Ein hungriges Pferd schlingt.
05. Vorsicht an sonnigen Tagen nach kalten Nächten: Dann wächst das Gras kaum, und der Zuckergehalt bleibt hoch.
06. Merke: Anweiden dauert Wochen, nicht Tage. Und Hufrehe ist ein Notfall.

### Stallhaltung vergleichen – `stallhaltung-vergleichen` (ca. 44 s)

01. Box, Paddockbox, Offenstall, Aktivstall, Weide – welche Haltung ist die beste?
02. Jede Haltung misst sich an denselben Fragen.
03. Jede Form hat Stärken und Schwächen.
04. Eine Einzelbox soll mindestens zwei mal Widerristhöhe zum Quadrat groß sein. Bei einem Meter fünfundsechzig sind das knapp elf Quadratmeter.
05. Entscheidend ist nicht das Etikett, sondern die Umsetzung: Eine gut geführte Box mit viel Weidegang kann besser sein als ein überfüllter Offenstall.
06. Merke: Die Umsetzung entscheidet – und das Pferd zeigt dir, ob es passt.

### Hufaufbau animiert – `hufaufbau` (ca. 50 s)

01. Wie ist ein Pferdehuf aufgebaut?
02. Von unten siehst du die Hufwand, die Sohle, den Strahl, die Eckstreben, die Ballen und die weiße Linie.
03. Innen liegen Hufbein und Strahlbein, umgeben von der gut durchbluteten, empfindlichen Huflederhaut.
04. Die Hufwand wächst etwa acht bis zehn Millimeter im Monat. Vom Kronrand bis zur Zehe dauert es rund ein Jahr.
05. Beim Auffußen weitet sich der Huf hinten leicht. Dieser Hufmechanismus dämpft Stöße und pumpt Blut. Dafür braucht das Pferd Bewegung.
06. Merke: Der Huf ist ein lebendes Organ. Tägliche Pflege, Bewegung und regelmäßige Bearbeitung halten ihn gesund.

### Pferdezähne verstehen – `pferdezaehne` (ca. 37 s)

01. Pferdezähne verstehen.
02. Ein erwachsenes Pferd hat sechsunddreißig bis vierundvierzig Zähne.
03. Pferdezähne werden über viele Jahre aus dem Kiefer nachgeschoben, während das Kauen die Kaufläche abreibt.
04. Weil der Oberkiefer etwas breiter ist, entstehen scharfe Kanten – oben außen zur Wange, unten innen zur Zunge.
05. Achte auf Warnzeichen.
06. Merke: Mindestens einmal im Jahr zur Zahnkontrolle – bei Jungpferden und Senioren oft zweimal.

### Stallapotheke zusammenstellen – `stallapotheke` (ca. 36 s)

01. Was gehört in eine gute Stallapotheke?
02. Zum Messen und Untersuchen.
03. Verbandmaterial in verschiedenen Größen.
04. Zum Reinigen: saubere Kompressen, Spritzen ohne Kanüle und ein Wundmittel, das du vorher mit deinem Tierarzt abgesprochen hast.
05. Medikamente gehören nur nach tierärztlicher Verordnung hinein – für ein bestimmtes Pferd, beschriftet und mit Verfallsdatum.
06. Merke: Vollständig, ordentlich, für alle auffindbar – und nach jedem Einsatz auffüllen.

### Pferdeohren und ihre Bedeutung – `pferdeohren` (ca. 40 s)

01. Was sagen die Ohren eines Pferdes?
02. Nach vorn gerichtete, bewegliche Ohren zeigen Aufmerksamkeit für etwas vor dem Pferd.
03. Seitlich hängende, lockere Ohren zeigen meist Entspannung – zum Beispiel beim Dösen.
04. Flach zurückgelegte Ohren mit angespanntem Gesicht sind ein Warnsignal.
05. Aber Vorsicht: Ein Ohr, das beim Reiten zum Reiter zeigt, bedeutet oft einfach: Ich höre dir zu.
06. Merke: Kein Signal allein. Schau dir immer das ganze Pferd und die Situation an.

### Pferdekommunikation in der Herde – `herdenkommunikation` (ca. 39 s)

01. Wie verständigen sich Pferde in der Herde?
02. Die Gruppe bietet Schutz, Wärme, Fellpflege und Orientierung. Viele Pferde haben feste Freunde.
03. Pferde vermeiden Kämpfe. Meist genügt ein Blick oder ein angelegtes Ohr, und das andere Pferd weicht aus.
04. Rangbeziehungen gibt es – aber sie hängen von Situation und Ressource ab. Das Bild der allmächtigen Leitstute ist zu einfach.
05. Pferde wissen, dass wir keine Pferde sind. Beziehung entsteht durch klare, verlässliche Kommunikation.

### Warum Pferde erschrecken – `warum-pferde-erschrecken` (ca. 50 s)

01. Warum erschrecken Pferde vor Dingen, die sie doch kennen?
02. Die Augen sitzen seitlich. Pferde sehen fast rundum – nur direkt hinter sich und direkt vor der Nase nicht.
03. Jedes Auge sieht seinen eigenen Bereich. Was das Pferd links kennt, muss es rechts oft noch kennenlernen.
04. Ein Fluchttier reagiert zuerst – und schaut danach. Bewegungen am Rand des Blickfelds lösen schnell Flucht aus.
05. So hilfst du deinem Pferd: Ansprechen, seitlich nähern, Zeit zum Schauen geben und Neues von beiden Seiten zeigen.
06. Merke: Erschrecken ist kein Ungehorsam. Ruhe und Zeit helfen mehr als Druck.

### Körpersprache beim Führen – `koerpersprache-fuehren` (ca. 39 s)

01. Führen mit Körpersprache.
02. Geh etwa auf Höhe zwischen Kopf und Schulter, eine Armlänge Abstand. Schau dorthin, wohin du gehen willst. Der Strick hängt locker.
03. Zum Losgehen: einatmen, aufrichten, losgehen. Zum Anhalten: langsamer werden, ausatmen, stehen bleiben.
04. Abstand lässt sich freundlich trainieren: ein Signal zur Schulter, ein Schritt zur Seite, sofort Ruhe und Lob.
05. Und für deine Sicherheit: Strick nie um die Hand wickeln, Handschuhe und feste Schuhe tragen.

### Die Ausbildungsskala animiert – `ausbildungsskala` (ca. 34 s)

01. Die Ausbildungsskala – der rote Faden der klassischen Reitlehre.
02. Takt, Losgelassenheit, Anlehnung, Schwung, Geraderichtung und Versammlung. Ziel ist die Durchlässigkeit.
03. Die Ausbildung verläuft in drei Phasen: Gewöhnung, Entwicklung der Schubkraft und Entwicklung der Tragkraft.
04. Auch jede einzelne Reitstunde folgt der Skala.
05. Klappt etwas nicht, geh einen Schritt zurück. Ein Anlehnungsproblem liegt oft an fehlendem Takt oder fehlender Losgelassenheit.

### Pferdebiomechanik verstehen – `pferdebiomechanik` (ca. 48 s)

01. Wie trägt ein Pferd seinen Reiter?
02. Die Vorhand trägt im Stand etwa fünfundfünfzig bis sechzig Prozent des Gewichts. Die Hinterhand ist der Motor.
03. In der Bewegung schieben die Hinterbeine den Körper nach vorn.
04. Der Rücken ist eine Brücke ohne Stützpfeiler. Er trägt am besten, wenn er sich leicht aufwölbt – unterstützt von Bauchmuskeln und untertretenden Hinterbeinen.
05. Pferde haben kein Schlüsselbein. Der Brustkorb hängt in Muskeln zwischen den Schultern – trainierte Rumpfträger heben ihn an.
06. Merke: Rücken vor Kopf. Eine schöne Kopfhaltung ohne arbeitenden Rücken ist nur Fassade.

### Die korrekte Reiterposition – `reiterposition` (ca. 34 s)

01. Der unabhängige, ausbalancierte Sitz.
02. Ohr, Schulter, Hüfte und Absatz bilden eine senkrechte Linie.
03. Ellbogen, Hand und Pferdemaul bilden eine gerade Linie.
04. Ein guter Sitz ist ruhig, weil er sich mitbewegt: Das Becken folgt der Bewegung des Pferderückens.
05. Typische Fehler sind Stuhlsitz, Spaltsitz und klammernde Beine – meistens fehlt Balance.
06. Merke: Ohne unabhängigen Sitz keine feinen Hilfen.

### Halbe Paraden erklärt – `halbe-paraden` (ca. 47 s)

01. Was ist eine halbe Parade – wirklich?
02. Eine halbe Parade ist kein Zügelruck, sondern ein kurzes Zusammenspiel aller Hilfen.
03. Sie macht das Pferd aufmerksam, verbessert die Balance und bereitet Übergänge und Lektionen vor.
04. Kommt sie durch, wird das Pferd vorn leichter und hinten aktiver. Kommt sie nicht durch, wird es schwer in der Hand.
05. Übe mit vielen Übergängen: Trab, Schritt, Trab – vor jedem eine halbe Parade.
06. Merke: Die halbe Parade beginnt im Körper, nicht in der Hand – und endet immer mit Nachgeben.

### Anlehnung verstehen – `anlehnung` (ca. 36 s)

01. Anlehnung verstehen.
02. Anlehnung entsteht von hinten nach vorn: Das Pferd tritt an eine ruhige, elastische Hand heran.
03. Das Genick ist der höchste Punkt, die Stirnlinie an oder leicht vor der Senkrechten.
04. Typische Fehler: gegen den Zügel, auf dem Zügel und hinter dem Zügel.
05. Der Test: Zügel aus der Hand kauen lassen. Ein Pferd in echter Anlehnung sucht die Hand nach vorn-unten.

### Stellung vs. Biegung – `stellung-biegung` (ca. 46 s)

01. Stellung und Biegung – zwei verschiedene Dinge.
02. Stellung findet nur im Genick statt: Du siehst das innere Auge und den Rand der inneren Nüster. Der Hals bleibt gerade.
03. Biegung betrifft das ganze Pferd: Es biegt sich gleichmäßig um den inneren Schenkel.
04. Die Hilfen: innen biegen, außen begrenzen.
05. Wer nur am inneren Zügel zieht, bekommt einen abgeknickten Hals – und das Pferd fällt über die äußere Schulter.
06. Merke: Das Pferd biegt sich um den inneren Schenkel und lehnt sich an den äußeren Zügel.

### Über die Schulter fallen – `ueber-die-schulter` (ca. 45 s)

01. Warum fällt mein Pferd über die Schulter?
02. Fast jedes Pferd ist von Natur aus schief – auf einer Seite hohl, auf der anderen steif.
03. Dann weicht es in Wendungen mit der Schulter aus, liegt auf einem Zügel fest und biegt sich ungleich.
04. Das Prinzip der Geraderichtung: Die Vorhand wird vor die Hinterhand gerichtet – nicht umgekehrt.
05. Das wichtigste Werkzeug ist Schultervor: Die Schultern werden ganz leicht nach innen geführt.
06. Merke: Außen begrenzen, Schultern führen – und beide Hände gleich oft reiten.

### Galopp-Fußfolge – `galopp-fussfolge` (ca. 36 s)

01. Die Fußfolge im Galopp.
02. Der Galopp ist ein Dreitakt mit Schwebephase. Im Rechtsgalopp: hinten links, dann hinten rechts und vorne links gleichzeitig, dann vorne rechts.
03. In Zeitlupe siehst du die Schwebephase: Kurz berührt kein Huf den Boden.
04. Im Linksgalopp ist es gespiegelt: hinten rechts, dann hinten links und vorne rechts, dann vorne links.
05. Wichtig für das Angaloppieren: Der Galopp beginnt mit dem äußeren Hinterbein.

### Richtig angaloppieren – `richtig-angaloppieren` (ca. 47 s)

01. Richtig angaloppieren.
02. Zuerst vorbereiten: ruhiger, fleißiger Trab, Pferd nach innen gestellt, eine oder zwei halbe Paraden.
03. Dann die Hilfe: Gewicht innen, äußerer Schenkel hinter dem Gurt, innerer Schenkel am Gurt gibt den Impuls.
04. Der äußere Schenkel spricht das äußere Hinterbein an – mit dem beginnt der erste Galoppsprung.
05. Rennt das Pferd im Trab davon, fehlt meist Vorbereitung – und es wurde nur mit dem inneren Schenkel getrieben.
06. Merke: In der Ecke oder auf dem Zirkel angaloppieren – aufrecht bleiben, nicht nach innen lehnen.

### Galoppfehler erkennen – `galoppfehler` (ca. 47 s)

01. Galoppfehler erkennen.
02. Falscher Galopp: Das Pferd galoppiert ungewollt auf der äußeren Hand. Kontergalopp sieht gleich aus – ist aber gewollt und kontrolliert.
03. Kreuzgalopp: Vorne galoppiert das Pferd auf der einen Hand, hinten auf der anderen. Es fühlt sich holprig und verdreht an.
04. Viertaktgalopp: Die Schwebephase fehlt, der Galopp wird flach und schleppend – oft zu viel Hand, zu wenig Schwung.
05. Bei Fehlern: ruhig durchparieren, neu vorbereiten und neu angaloppieren. Nicht strafen.
06. Merke: Häufige Galoppfehler können ein Schmerzzeichen sein – lass sie abklären.

### Schenkelweichen vs. Schulterherein – `schenkelweichen-schulterherein` (ca. 37 s)

01. Schenkelweichen oder Schulterherein – was ist der Unterschied?
02. Im Schenkelweichen geht das Pferd vorwärts-seitwärts, leicht gestellt gegen die Bewegungsrichtung, ohne Biegung. Es ist eine Lösungsübung.
03. Im Schulterherein wird die Vorhand etwa dreißig Grad nach innen geführt. Das Pferd ist gebogen und geht auf drei Hufschlägen.
04. Schenkelweichen lockert. Schulterherein richtet gerade und lässt das innere Hinterbein mehr Last aufnehmen.
05. Merke: In allen Seitengängen gilt: Takt vor Winkel.

### Galoppwechsel verstehen – `galoppwechsel` (ca. 35 s)

01. Galoppwechsel verstehen.
02. Beim einfachen Wechsel pariert man über einige klare Schritte durch und springt auf der anderen Hand wieder an.
03. Beim fliegenden Wechsel wechselt das Pferd in der Schwebephase – vorne und hinten gleichzeitig.
04. Vorher muss das Pferd ausbalanciert und gerade sein, einfache Wechsel sicher können und im Kontergalopp gehen.
05. Merke: Leise Hilfen im richtigen Moment – nicht werfen.

### Sicher bergauf und bergab – `bergauf-bergab` (ca. 31 s)

01. Sicher bergauf und bergab.
02. Bergauf: leichter Sitz, Hand nach vorn, gerade hinauf, ruhiges Tempo.
03. Bergab: im Schritt, aufrecht sitzen, Gewicht in den Bügeln, leichte Verbindung, gerade hinunter.
04. Nie schräg am Hang reiten – das Pferd kann seitlich wegrutschen.
05. Merke: Bei zu steilen Stücken absteigen und führen. Das ist keine Niederlage, sondern klug.

### Der erste Galopp im Gelände – `erster-galopp-gelaende` (ca. 32 s)

01. Der erste Galopp im Gelände.
02. Nur auf bekanntem, festem, einsehbarem Boden – und am besten leicht bergauf.
03. Ansage, Rückfrage, ruhig antraben, dann angaloppieren – und rechtzeitig vor dem Ende durchparieren.
04. Im leichten Sitz bleibst du im Gleichgewicht und entlastest den Rücken.
05. Merke: Erster Galopp kurz, bergauf, mit ruhigem Führpferd – und nie Richtung Stall.

### Gruppenregeln beim Ausreiten – `gruppenregeln-ausreiten` (ca. 30 s)

01. Gruppenregeln beim Ausreiten.
02. Vorne reitet eine erfahrene Person auf einem ruhigen Pferd, hinten ebenfalls. Dazwischen die Unsicheren.
03. Die wichtigsten Regeln.
04. Eine rote Schleife im Schweif heißt: Dieses Pferd schlägt. Eine grüne: Es ist noch jung.
05. Merke: Wer ein Problem hat, ruft laut – und die ganze Gruppe hält an.

### Gefahren im Gelände erkennen – `gefahren-gelaende` (ca. 36 s)

01. Gefahren im Gelände erkennen.
02. Radfahrer und Jogger von hinten: regelmäßig zurückschauen, Tempo raus, an den Rand, freundlich um Langsamfahrt bitten.
03. Ein Hund ohne Leine: stehen bleiben, Pferd zum Hund drehen, den Besitzer ansprechen. Nie davongaloppieren.
04. Wildtiere sind in der Dämmerung besonders aktiv. Ruhig bleiben, Abstand halten, auf Wegen bleiben.
05. Fahrzeuge und Traktoren: früh anhalten oder ausweichen, per Handzeichen um Langsamfahrt bitten, bedanken.

### Verhalten nach einem Reitunfall – `nach-dem-reitunfall` (ca. 32 s)

01. Was tun nach einem Reitunfall?
02. Eigenschutz, Pferde sichern, die gestürzte Person ansprechen, Lage einschätzen.
03. Bei Rücken- oder Nackenschmerzen, Kribbeln oder Taubheit: liegen lassen, beruhigen, nicht bewegen.
04. Notruf eins, eins, zwei: Wo? Was? Wie viele? Welche Verletzungen? Und dann auf Rückfragen warten.
05. Schick jemanden zum nächsten Weg, um den Rettungswagen einzuweisen, und informiere den Stall.
