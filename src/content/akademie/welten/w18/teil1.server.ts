import "server-only";
import { tag } from "../../build";
import { scene } from "../../types";
import { begriffe, fehler, frage, tabelle, wahl, weiter, type DeepInput } from "../deep-kit";

/** Modul 13, Lektionen 1–4 */
export const teil1: DeepInput[] = [
  /* ---------- 1. Ausbildungsskala ---------- */
  {
    slug: "ausbildungsskala-im-detail",
    title: "Die Ausbildungsskala im Detail",
    speaker: "mila",
    intro:
      "Viele Reiter kennen die sechs Punkte der Ausbildungsskala auswendig. Weniger wissen, wie sie in einer ganz normalen Reitstunde zusammenspielen – und warum ein Problem bei der Anlehnung oft gar nicht an der Hand liegt, sondern am Takt oder an der Losgelassenheit.",
    illustration: tag("Takt · Losgelassenheit · Anlehnung · Schwung · Geraderichtung · Versammlung"),
    terms: begriffe(
      ["Durchlässigkeit", "Ziel der Ausbildung: Das Pferd nimmt die Hilfen willig an und lässt sie durch den ganzen Körper wirken."],
      ["Schubkraft", "Kraft der Hinterhand, den Körper nach vorn zu schieben."],
      ["Tragkraft", "Fähigkeit der Hinterhand, mehr Gewicht aufzunehmen und zu tragen."],
    ),
    deep: {
      minutes: 11,
      sections: [
        {
          heading: "Keine Treppe, sondern ein Netz",
          text: "Die sechs Punkte – Takt, Losgelassenheit, Anlehnung, Schwung, Geraderichtung, Versammlung – werden oft als Treppe dargestellt. Das ist richtig, was die Reihenfolge der Ausbildung angeht: Ohne Takt keine echte Losgelassenheit, ohne Losgelassenheit keine echte Anlehnung. Im Alltag beeinflussen sich die Punkte aber gegenseitig: Bessere Geraderichtung verbessert die Anlehnung, Versammlung verbessert den Takt in schwierigen Lektionen.\n\nDie FN beschreibt drei Phasen: In der Gewöhnungsphase geht es um Takt, Losgelassenheit und Anlehnung. Danach wird die Schubkraft entwickelt (Losgelassenheit, Anlehnung, Schwung, Geraderichtung) und schließlich die Tragkraft (Schwung, Geraderichtung, Versammlung). Ziel ist die Durchlässigkeit.",
        },
        {
          heading: "Was jeder Punkt biomechanisch bedeutet",
          text: "• Takt: gleichmäßige Fußfolge und gleiche Zeitabstände. Er zeigt, ob das Pferd im Gleichgewicht und frei von Spannungen und Schmerzen ist.\n• Losgelassenheit: Muskeln arbeiten im Wechsel von An- und Abspannung, der Rücken schwingt, das Pferd ist innerlich zufrieden.\n• Anlehnung: weiche, stete Verbindung zur Reiterhand, die von hinten nach vorn entsteht, weil das Pferd an das Gebiss herantritt.\n• Schwung: Energie aus der Hinterhand, die über den schwingenden Rücken nach vorn übertragen wird – mit deutlicher Schwebephase in Trab und Galopp.\n• Geraderichtung: Die Hinterbeine fußen in Richtung der Vorderbeine; das Pferd ist auf beiden Seiten gleich gut gymnastiziert.\n• Versammlung: Die Hinterhand beugt sich mehr und nimmt mehr Last auf, die Vorhand wird leichter, das Pferd wird „bergauf“.",
        },
        {
          heading: "Die Skala in jeder Reitstunde",
          text: "Auch eine einzelne Reiteinheit folgt der Skala:\n\n1. Schrittphase am langen Zügel: Gelenke, Sehnen und Muskeln werden vorbereitet (mindestens 10 Minuten).\n2. Lösungsphase: im Arbeitstempo auf großen Linien, mit Übergängen und Dehnung – Takt und Losgelassenheit stehen im Vordergrund.\n3. Arbeitsphase: Anlehnung verbessern, Schwung entwickeln, Geraderichtung, je nach Ausbildungsstand Versammlung.\n4. Entspannung: Dehnung, Schritt am langen Zügel.\n\nTritt in der Arbeitsphase ein Problem auf, geht man auf der Skala einen Schritt zurück: Klappt die Anlehnung nicht, ist meist Takt oder Losgelassenheit nicht stabil.",
        },
        {
          heading: "Woran du erkennst, dass es stimmt",
          text: "• Das Pferd geht gleichmäßig im Takt, auch in Wendungen und Übergängen.\n• Es kaut leicht, schnaubt ab, der Schweif schwingt.\n• Es dehnt sich willig an die Hand, wenn du die Zügel nachgibst (Zügel-aus-der-Hand-kauen-lassen).\n• Die Verbindung fühlt sich auf beiden Seiten gleich an.\n• Übergänge gelingen mit wenig Hilfe.\n\nWenn du einen dieser Punkte nicht spürst, weißt du, woran du arbeiten musst.",
        },
      ],
      praxis: {
        title: "Die feste Hand, die keine war",
        text: "Lea beklagt sich: Tivoli sei „fest im Maul“, sie bekomme ihn nicht an die Hand. Die Reitlehrerin lässt sie Zügel aus der Hand kauen lassen. Tivoli dehnt sich kaum, geht eilig, der Takt im Trab ist unregelmäßig.\n\nStatt an der Anlehnung zu arbeiten, reitet Lea zehn Minuten nur große gebogene Linien im ruhigen Trab, viele Übergänge Trab–Schritt–Trab, bis Tivoli gleichmäßig wird und abschnaubt. Danach steht er von allein weicher an der Hand. Das Problem lag nicht vorn, sondern zwei Stufen tiefer.",
      },
      fehler: fehler(
        ["Anlehnungsprobleme mit der Hand lösen wollen.", "Auf der Skala zurückgehen: Takt und Losgelassenheit verbessern."],
        ["Ohne Schrittphase direkt mit der Arbeit beginnen.", "Mindestens 10 Minuten Schritt am langen Zügel."],
        ["Versammlung „herstellen“, bevor das Pferd gerade und losgelassen ist.", "Die Reihenfolge der Ausbildung respektieren."],
        ["Die Entspannungsphase weglassen.", "Jede Einheit mit Dehnung und Schritt beenden."],
      ),
      richtig: [
        "Plane jede Reiteinheit in vier Phasen: Schritt, Lösen, Arbeit, Entspannung.",
        "Prüfe in der Lösungsphase Takt und Losgelassenheit.",
        "Teste mit Zügel-aus-der-Hand-kauen-lassen, ob das Pferd sich vertrauensvoll dehnt.",
        "Bei Problemen einen Schritt auf der Skala zurückgehen.",
        "Schreibe nach dem Reiten auf, welcher Punkt der Skala gut und welcher schwierig war.",
      ],
      merke: [
        "Die Skala ist Reihenfolge der Ausbildung und Netz zugleich.",
        "Gewöhnung → Schubkraft → Tragkraft.",
        "Jede Reitstunde folgt der Skala.",
        "Bei Problemen einen Schritt zurück auf der Skala.",
      ],
      weiter: weiter(["Dressur: Die Skala der Ausbildung", "ra-w13-l2"], ["Biomechanik und Bewegungsabläufe", "ra-w18-l2"], ["Trainingsprobleme systematisch verbessern", "ra-w18-l20"]),
    },
    exercise: [
      wahl(
        "ra-w18-l1-entscheidung",
        "Dein Pferd geht nicht an die Hand und eilt im Trab. Woran arbeitest du zuerst?",
        "An Takt und Losgelassenheit: ruhiges Tempo, große Linien, Übergänge",
        [
          ["An der Anlehnung: Zügel kürzer nehmen", "Ohne Takt und Losgelassenheit entsteht keine echte Anlehnung."],
          ["An der Versammlung: mehr halbe Paraden", "Versammlung kommt ganz zuletzt."],
        ],
        "Richtig. Ein Schritt zurück auf der Skala löst oft das Problem.",
      ),
    ],
    quiz: [
      frage("reihenfolge", "Welche Reihenfolge ist richtig?", "Takt – Losgelassenheit – Anlehnung – Schwung – Geraderichtung – Versammlung", [["Anlehnung – Takt – Versammlung – Schwung – Losgelassenheit – Geraderichtung", "Die Anlehnung baut auf Takt und Losgelassenheit auf."], ["Versammlung – Schwung – Takt – Anlehnung – Losgelassenheit – Geraderichtung", "Versammlung steht ganz am Ende."]], "Genau. Ziel ist die Durchlässigkeit."),
      frage("phasen", "Was wird in der letzten Ausbildungsphase entwickelt?", "Die Tragkraft", [["Die Gewöhnung", "Die Gewöhnung steht am Anfang."], ["Nur der Takt", "Der Takt ist die Basis von Anfang an."]], "Richtig. Mit Schwung, Geraderichtung und Versammlung."),
      frage("schritt", "Wie lange sollte die Schrittphase zu Beginn mindestens dauern?", "Etwa 10 Minuten", [["Eine Minute", "Gelenke und Sehnen brauchen mehr Zeit."], ["Gar nicht, man kann direkt traben", "Das belastet Sehnen und Gelenke unnötig."]], "Genau. Am langen Zügel, damit Gelenke und Sehnen vorbereitet werden."),
      frage("test", "Womit kannst du testen, ob Anlehnung und Losgelassenheit stimmen?", "Mit Zügel-aus-der-Hand-kauen-lassen", [["Mit einem Sprung", "Das testet etwas anderes."], ["Mit einem schnellen Galopp", "Tempo zeigt nicht, ob das Pferd sich dehnt."]], "Richtig. Das Pferd sollte sich willig vorwärts-abwärts dehnen."),
    ],
  },

  /* ---------- 2. Biomechanik ---------- */
  {
    slug: "biomechanik",
    title: "Biomechanik und Bewegungsabläufe des Pferdes",
    speaker: "ben",
    intro:
      "Ein Pferd ist von Natur aus nicht gebaut, um einen Menschen zu tragen. Sein Rücken ist eine Brücke zwischen Vorder- und Hinterbeinen – ohne Stützpfeiler in der Mitte. Wie kann ein Pferd trotzdem gesund unter dem Reiter bleiben?",
    illustration: scene("ak-gang-trab"),
    terms: begriffe(
      ["Rumpfträger", "Muskeln, in denen der Brustkorb zwischen den Vorderbeinen aufgehängt ist – das Pferd hat kein Schlüsselbein."],
      ["Nackenband", "Kräftiges Band vom Genick bis zum Widerrist; beim Senken des Halses spannt es sich."],
      ["Bogen-Sehne-Modell", "Vereinfachtes Modell: Wirbelsäule als Bogen, Bauchmuskeln als Sehne, die den Rücken anheben."],
      ["Hankenbeugung", "Beugung von Hüft-, Knie- und Sprunggelenk; Voraussetzung für Lastaufnahme."],
    ),
    deep: {
      minutes: 11,
      sections: [
        {
          heading: "Gewichtsverteilung und Vorhand",
          text: "Im Stand trägt die Vorhand eines Pferdes etwa 55 bis 60 Prozent des Körpergewichts, weil Kopf und Hals vorn liegen. Kommt ein Reiter dazu, verschiebt sich noch mehr Gewicht nach vorn. Die Vorderbeine sind vor allem Stützen; die Hinterbeine sind der Motor.\n\nPferde haben kein Schlüsselbein. Der Brustkorb hängt zwischen den Schulterblättern in einer Muskelschlinge, den Rumpfträgern. Sind diese Muskeln gut trainiert, hebt sich der Brustkorb zwischen den Schultern an; das Pferd wirkt „vorn höher“. Sind sie schwach, „fällt“ das Pferd zwischen die Schultern und läuft auf der Vorhand.",
        },
        {
          heading: "Der Rücken als Brücke",
          text: "Die Wirbelsäule spannt sich zwischen Vorder- und Hinterbeinen wie eine Brücke. Damit sie das Reitergewicht gut tragen kann, muss sie leicht nach oben gewölbt sein. Ein klassisches, vereinfachtes Erklärungsmodell ist das Bogen-Sehne-Prinzip: Die Wirbelsäule ist der Bogen, die Bauchmuskeln sind die Sehne. Spannen sich die Bauchmuskeln und treten die Hinterbeine unter den Körper, wölbt sich der Rücken auf.\n\nDazu kommt die Hals-Rücken-Verbindung: Senkt das Pferd den Hals nach vorwärts-abwärts, spannt sich das Nackenband, das über die Dornfortsätze des Widerrists läuft. Das unterstützt eine Aufwölbung im vorderen Rückenbereich. Die Forschung zeigt, dass die Zusammenhänge komplexer sind als diese Modelle – für das Reiten sind sie trotzdem eine hilfreiche Vorstellung.",
        },
        {
          heading: "Die Hinterhand: schieben und tragen",
          text: "Die Hinterbeine erzeugen den Vortrieb (Schubkraft). Je weiter sie unter den Schwerpunkt fußen und je mehr sich Hüft-, Knie- und Sprunggelenk beugen, desto mehr Gewicht können sie aufnehmen (Tragkraft). Diese Fähigkeit wird über Jahre entwickelt – wie bei einem Sportler, der Kniebeugen trainiert.\n\nEin Pferd, das „von hinten nach vorn“ geht, tritt aktiv unter, der Rücken schwingt, die Energie geht durch den ganzen Körper bis an die Hand. Ein Pferd, das nur „vorn“ läuft, zieht sich mit der Vorhand vorwärts, die Hinterbeine schieben hinten heraus.",
        },
        {
          heading: "Was das für das Reiten bedeutet",
          text: "• Rücken vor Kopf: Eine schöne Kopfhaltung ohne schwingenden Rücken ist nur Fassade.\n• Dehnungshaltung (vorwärts-abwärts) mit Maul etwa auf Buggelenkshöhe hilft, die Rückenmuskulatur zu lösen.\n• Ein Pferd, das den Kopf hoch trägt und den Rücken wegdrückt, kann das Reitergewicht schlecht tragen.\n• Kraft und Koordination entstehen durch regelmäßiges, abwechslungsreiches Training: Übergänge, Biegung, Bergauf-Arbeit, Cavaletti.\n• Der Reiter muss so sitzen, dass er die Rückenbewegung nicht stört – sonst blockiert er genau den Bereich, der arbeiten soll.",
        },
      ],
      praxis: {
        title: "Der hohle Rücken",
        text: "Ein Einstellerpferd trägt beim Reiten den Kopf hoch, der Rücken hängt durch, unter dem Sattel ist die Muskulatur eingefallen. Die Besitzerin möchte es mit Hilfszügeln „in Form bringen“. Die Reitlehrerin rät stattdessen: Sattel prüfen lassen, dann viel Schritt und Trab in Dehnungshaltung, Bergauf-Wege im Gelände, Cavaletti im Schritt und Trab und Longieren mit korrekter Ausrüstung.\n\nNach drei Monaten ist die Muskulatur hinter dem Widerrist sichtbar gewachsen. Das Pferd dehnt sich willig und trägt den Rücken. Hilfszügel hätten den Kopf nach unten gebracht – aber nicht den Rücken nach oben.",
      },
      fehler: fehler(
        ["Die Kopfhaltung für das Ziel halten.", "Der schwingende, getragene Rücken ist das Ziel."],
        ["Hilfszügel als Abkürzung nutzen.", "Muskulatur über Zeit aufbauen: Dehnung, Übergänge, Cavaletti, Bergauf."],
        ["Ein Pferd dauerhaft auf der Vorhand laufen lassen.", "Hinterhand aktivieren, Übergänge reiten."],
        ["Mit festem Sitz auf dem Rücken „draufsitzen“.", "Mitschwingen, damit der Rücken arbeiten kann."],
      ),
      richtig: [
        "Beginne jede Einheit mit Schritt und Dehnung.",
        "Arbeite viele Übergänge, um die Hinterhand zu aktivieren.",
        "Nutze Cavaletti und Bergauf-Wege zur Kräftigung.",
        "Beobachte die Bemuskelung hinter dem Widerrist und an der Kruppe.",
        "Lass den Sattel bei Muskelveränderungen prüfen.",
      ],
      merke: [
        "Die Vorhand trägt mehr Gewicht – die Hinterhand ist der Motor.",
        "Der Rücken muss sich aufwölben, um den Reiter gut zu tragen.",
        "Dehnungshaltung löst und kräftigt die Rückenmuskulatur.",
        "Rücken vor Kopf: Eine schöne Kopfhaltung allein ist kein Ziel.",
      ],
      weiter: weiter(["Losgelassenheit und Dehnung", "ra-w12-l2"], ["Versammlung, Tragkraft und weiterführende Lektionen", "ra-w18-l19"], ["Geländetraining sinnvoll aufbauen", "ra-w19-l12"]),
    },
    exercise: [
      wahl(
        "ra-w18-l2-entscheidung",
        "Ein Pferd geht mit hohem Kopf und weggedrücktem Rücken. Was hilft langfristig am meisten?",
        "Sattel prüfen, dann viel Dehnungsarbeit, Übergänge, Cavaletti und Bergauf-Wege",
        [
          ["Ausbinder kürzer schnallen, damit der Kopf runtergeht", "Der Kopf geht runter, aber der Rücken kommt nicht hoch."],
          ["Schneller reiten, damit es sich streckt", "Tempo macht ein verspanntes Pferd eher noch fester."],
        ],
        "Richtig. Muskeln brauchen Zeit und gezieltes Training.",
      ),
    ],
    quiz: [
      frage("vorhand", "Wie viel Gewicht trägt die Vorhand im Stand ungefähr?", "Etwa 55–60 Prozent", [["Etwa 20 Prozent", "Die Vorhand trägt mehr als die Hälfte."], ["Etwa 90 Prozent", "So viel ist es nicht."]], "Genau. Mit Reiter verschiebt sich noch mehr nach vorn."),
      frage("schluessel", "Wie ist der Brustkorb zwischen den Vorderbeinen aufgehängt?", "In einer Muskelschlinge – das Pferd hat kein Schlüsselbein", [["Am Schlüsselbein", "Pferde haben kein Schlüsselbein."], ["An der Wirbelsäule allein", "Der Brustkorb hängt in Muskeln zwischen den Schulterblättern."]], "Richtig. Diese Rumpfträger kann man trainieren."),
      frage("ziel", "Was ist wichtiger: Kopfhaltung oder Rücken?", "Der schwingende, aufgewölbte Rücken", [["Die Kopfhaltung", "Eine schöne Kopfhaltung ohne Rückentätigkeit ist nur Fassade."], ["Beides ist unwichtig", "Der Rücken entscheidet, ob das Pferd gesund trägt."]], "Genau. Rücken vor Kopf – nur ein tragender Rücken schützt das Pferd."),
      frage("tragkraft", "Wodurch entsteht Tragkraft der Hinterhand?", "Durch stärkere Beugung von Hüft-, Knie- und Sprunggelenk", [["Durch schnelles Reiten", "Tempo entwickelt eher Schubkraft."], ["Durch kurze Zügel", "Die Hand kann keine Tragkraft erzeugen."]], "Richtig. Sie wird über Jahre entwickelt."),
    ],
  },

  /* ---------- 3. Sitz ---------- */
  {
    slug: "unabhaengiger-sitz",
    title: "Der unabhängige, ausbalancierte Reitersitz",
    speaker: "lea",
    intro:
      "Ein guter Sitz sieht ruhig aus, ist aber alles andere als still: Becken, Rücken und Beine bewegen sich ständig mit dem Pferd. Gerade diese Bewegung macht es möglich, dass Hände und Schenkel ruhig und unabhängig bleiben.",
    illustration: scene("ak-reiter-sitz-linie"),
    terms: begriffe(
      ["Unabhängiger Sitz", "Sitz, in dem sich Hand, Schenkel und Oberkörper unabhängig voneinander bewegen können, ohne das Gleichgewicht zu stören."],
      ["Dreipunktsitz", "Das Gewicht verteilt sich auf beide Gesäßknochen und den Schambeinbereich."],
      ["Mitschwingen", "Das Becken folgt der Bewegung des Pferderückens."],
    ),
    deep: {
      minutes: 10,
      sections: [
        {
          heading: "Die Grundlinie",
          text: "Im Dressursitz bilden Ohr, Schulter, Hüfte und Absatz von der Seite gesehen eine senkrechte Linie. Eine zweite Linie verläuft von Ellbogen über die Hand zum Pferdemaul. Das Gewicht ruht gleichmäßig auf beiden Gesäßknochen und dem Schambeinbereich (Dreipunktsitz).\n\nDas Becken steht aufrecht, nicht nach vorn gekippt (Hohlkreuz) und nicht nach hinten gekippt (Stuhlsitz). Die Beine liegen lang und locker am Pferd, das Knie ist leicht gebeugt, der Absatz ist der tiefste Punkt, weil das Gewicht durch das Bein nach unten fällt – nicht, weil er hinuntergedrückt wird.",
        },
        {
          heading: "Biomechanik des Mitschwingens",
          text: "Der Pferderücken hebt und senkt sich in jedem Schritt und Trab und schwingt im Galopp in einer wiegenden Bewegung. Damit du diese Bewegung nicht störst, muss dein Becken mitgehen. Im Schritt bewegt sich das Becken abwechselnd links und rechts ein wenig mit, im Aussitzen im Trab federt der untere Rücken die Auf-und-ab-Bewegung ab, im Galopp schwingt das Becken mit einer Art Wischbewegung vorwärts.\n\nDie Bewegung kommt aus einem lockeren unteren Rücken und Hüftgelenk, getragen von einer stabilen Körpermitte. Steif im Rücken bedeutet: Der Reiter wird geworfen. Zu locker ohne Rumpfspannung bedeutet: Der Oberkörper wackelt, die Hände wackeln mit.",
        },
        {
          heading: "Wie sich ein guter Sitz anfühlt",
          text: "• Du hast das Gefühl, mit dem Pferd zu gehen, nicht auf ihm zu sitzen.\n• Deine Gesäßknochen bleiben im Sattel, ohne zu klopfen oder zu rutschen.\n• Deine Beine hängen schwer und locker, du musst dich nicht festhalten.\n• Deine Hände können ruhig bleiben, während dein Körper sich bewegt.\n• Du kannst ruhig atmen und sprechen.\n\nWoran du es erkennst: Das Pferd geht losgelassen, der Rücken schwingt, es reagiert auf kleine Gewichts- und Schenkelhilfen, weil diese nicht im Wackeln untergehen.",
        },
        {
          heading: "Typische Sitzfehler und Ursachen",
          text: "• Stuhlsitz (Becken nach hinten, Knie hochgezogen): oft zu kurze Bügel, Angst, verkürzte Hüftbeuger.\n• Spaltsitz (Hohlkreuz, Gewicht auf den Oberschenkeln): oft zu lange Bügel, „schöne Haltung“ durch Anspannen.\n• Hochgezogene Absätze und klammernde Knie: Unsicherheit, fehlende Balance.\n• Einseitiges Sitzen (eine Hüfte eingeknickt): eigene Schiefe oder ein schief liegender Sattel.\n• Unruhige Hände: Der Sitz ist nicht ausbalanciert, die Hände dienen zum Festhalten.\n\nDie meisten Sitzfehler sind Folgen fehlender Balance – nicht mangelnden Willens.",
        },
        {
          heading: "Übungen",
          text: "• Longenstunden ohne Zügel und ohne Bügel: Balance und Mitschwingen ohne Ablenkung.\n• Im Schritt die Arme kreisen, den Oberkörper drehen, die Beine abspreizen und wieder fallen lassen.\n• Leichttraben mit Wechsel zwischen mehreren Takten aufstehen und sitzen – fördert Gleichgewicht.\n• Aussitzen in kurzen Reprisen, dann wieder leichttraben.\n• Außerhalb des Sattels: Rumpfkraft, Beweglichkeit der Hüfte (z. B. Pilates oder gezieltes Reitertraining).\n\nVideoaufnahmen von der Seite und von hinten zeigen dir, was du nicht spürst.",
        },
      ],
      praxis: {
        title: "Ohne Bügel an der Longe",
        text: "Ben sitzt im Trab unruhig, seine Hände springen mit. Die Reitlehrerin nimmt ihn für drei Stunden an die Longe: erst Schritt ohne Bügel mit Armkreisen, dann kurze Trabreprisen ohne Bügel, Hände auf den Oberschenkeln.\n\nAm Anfang rutscht Ben hin und her, dann findet sein Becken den Takt. Als er wieder mit Zügeln reitet, sind die Hände von allein ruhiger. Tivoli, der vorher immer mit dem Kopf schlug, geht deutlich gleichmäßiger.",
      },
      fehler: fehler(
        ["Den Absatz nach unten drücken.", "Das Gewicht locker durch das Bein fallen lassen."],
        ["„Schön sitzen“ durch Anspannen.", "Balance und Mitschwingen statt Haltung."],
        ["Unruhige Hände durch Festhalten der Hände lösen.", "Den Sitz verbessern – dann werden die Hände ruhig."],
        ["Bügel zu kurz oder zu lang schnallen.", "Bügellänge prüfen: Bügel etwa am Knöchel bei hängendem Bein."],
      ),
      richtig: [
        "Prüfe die Linien Ohr–Schulter–Hüfte–Absatz und Ellbogen–Hand–Maul.",
        "Lass dein Becken die Bewegung des Pferderückens mitgehen.",
        "Trainiere Balance an der Longe ohne Zügel und ohne Bügel.",
        "Lass dich filmen und vergleiche mit deinem Gefühl.",
        "Trainiere Rumpfkraft und Beweglichkeit auch außerhalb des Sattels.",
      ],
      merke: [
        "Ein guter Sitz ist ruhig, weil er sich mitbewegt.",
        "Ohr–Schulter–Hüfte–Absatz in einer Linie, Ellbogen–Hand–Maul in einer Linie.",
        "Sitzfehler sind meist Balanceprobleme.",
        "Ohne unabhängigen Sitz keine feinen Hilfen.",
      ],
      weiter: weiter(["Grundkurs: Der Reitersitz", "ra-w2-l1"], ["Gewichtshilfen und Beckeneinwirkung", "ra-w18-l4"], ["Sicherer im Sattel werden", "ra-w12-l4"]),
    },
    exercise: [
      wahl(
        "ra-w18-l3-entscheidung",
        "Im Aussitzen wirst du bei jedem Tritt aus dem Sattel geworfen. Was ist die wahrscheinlichste Ursache?",
        "Ein fester unterer Rücken, der die Bewegung nicht mitgeht",
        [
          ["Zu lockere Zügel", "Die Zügel beeinflussen dein Mitschwingen kaum."],
          ["Zu wenig Schenkeldruck", "Mehr Druck mit den Beinen macht dich eher steifer."],
        ],
        "Richtig. Nur ein lockerer, getragener Rücken kann die Bewegung abfedern.",
      ),
    ],
    quiz: [
      frage("linie", "Welche Linie gehört zum Dressursitz?", "Ohr – Schulter – Hüfte – Absatz", [["Nase – Knie – Zehe", "Diese Linie gibt es nicht."], ["Kopf – Hand – Bügel", "Die Hand liegt auf einer anderen Linie."]], "Genau. Von der Seite betrachtet senkrecht."),
      frage("absatz", "Wie wird der Absatz zum tiefsten Punkt?", "Durch das Gewicht, das locker durch das Bein fällt", [["Durch kräftiges Herunterdrücken", "Drücken macht das Bein steif."], ["Durch kurze Bügel", "Kurze Bügel ziehen das Knie hoch."]], "Richtig. Locker statt gedrückt."),
      frage("haende", "Warum sind unruhige Hände oft ein Sitzproblem?", "Weil ein unausbalancierter Körper die Bewegung bis in die Hände weitergibt", [["Weil die Zügel zu lang sind", "Die Ursache liegt meist im Sitz."], ["Weil das Pferd zieht", "Oft beginnt es beim Reiter."]], "Genau. Erst Balance, dann ruhige Hände."),
      frage("stuhl", "Was ist eine häufige Ursache für den Stuhlsitz?", "Zu kurze Bügel", [["Zu lange Bügel", "Die führen eher zum Spaltsitz."], ["Ein zu großes Pferd", "Die Größe ist selten die Ursache."]], "Richtig. Auch Angst kann zum Stuhlsitz führen."),
    ],
  },

  /* ---------- 4. Gewichtshilfen ---------- */
  {
    slug: "gewichtshilfen-becken",
    title: "Gewichtshilfen und Beckeneinwirkung",
    speaker: "mila",
    intro:
      "„Lehn dich in die Kurve“ – das ist beim Fahrradfahren richtig, beim Reiten aber einer der häufigsten Fehler. Gewichtshilfen wirken fein und kommen aus dem Becken, nicht aus dem Oberkörper.",
    illustration: scene("ak-reiter-hilfen"),
    terms: begriffe(
      ["Beidseitig belastende Gewichtshilfe", "Beide Gesäßknochen werden durch Anspannen der Rumpfmuskulatur etwas deutlicher belastet; unterstützt das Treiben und Paraden."],
      ["Einseitig belastende Gewichtshilfe", "Mehr Gewicht auf einen Gesäßknochen; für Wendungen, Biegung, Angaloppieren und Seitengänge."],
      ["Entlastende Gewichtshilfe", "Der Oberkörper neigt sich leicht vor, der Rücken des Pferdes wird entlastet, z. B. beim jungen Pferd oder Rückwärtsrichten."],
    ),
    deep: {
      minutes: 9,
      sections: [
        {
          heading: "Warum Gewichtshilfen wirken",
          text: "Ein Pferd versucht immer, unter dem Schwerpunkt seines Reiters zu bleiben. Verlagert der Reiter sein Gewicht etwas zur Seite, tritt das Pferd dorthin, um das Gleichgewicht wiederherzustellen. Dazu kommt die direkte Wirkung auf den Rücken: Ein angespannter oder belastender Sitz wird anders gespürt als ein lockerer, mitschwingender.\n\nGewichtshilfen sind deshalb die Grundlage aller anderen Hilfen. Sie wirken immer im Zusammenspiel mit Schenkel und Zügel.",
        },
        {
          heading: "Die drei Gewichtshilfen",
          text: "• Beidseitig belastend: Du richtest dich auf, spannst kurz die Bauch- und Rückenmuskeln an und sitzt dadurch etwas tiefer in den Sattel. Diese Hilfe unterstützt das Treiben und gehört zu jeder halben und ganzen Parade.\n• Einseitig belastend: Du verlagerst das Gewicht etwas mehr auf den inneren Gesäßknochen. Dafür schiebst du die innere Hüfte leicht vor und lässt das innere Knie etwas tiefer gleiten – der Oberkörper bleibt aufrecht. Diese Hilfe brauchst du in Wendungen, Biegung, beim Angaloppieren und in Seitengängen.\n• Entlastend: Du neigst den Oberkörper leicht vor und nimmst etwas Gewicht aus dem Sattel. Das schont den Rücken, etwa bei jungen Pferden, beim Rückwärtsrichten oder im leichten Sitz.",
        },
        {
          heading: "Wie es sich richtig anfühlt",
          text: "Richtig ausgeführt ist die einseitig belastende Gewichtshilfe von außen kaum zu sehen. Du spürst den inneren Gesäßknochen etwas deutlicher, dein inneres Bein wird etwas länger, die Schultern bleiben waagerecht und parallel zu den Schultern des Pferdes.\n\nWoran du erkennst, dass sie funktioniert: Das Pferd folgt in Wendungen ohne viel Zügel, die Wendung bleibt rund, das Pferd fällt nicht über die Schulter, und es bleibt im Takt.",
        },
        {
          heading: "Typische Fehler und Ursachen",
          text: "• In der Hüfte einknicken: Der Reiter möchte innen belasten, schiebt aber die Hüfte nach außen und rutscht dadurch nach außen – das Pferd fällt nach außen. Ursache: Oberkörper geht nach innen.\n• In die Kurve lehnen: Das Gewicht geht nach innen, das Pferd verliert die Balance und fällt über die innere Schulter.\n• Zu starke, dauerhafte Belastung: Das Pferd macht den Rücken fest.\n• Hinter der Bewegung sitzen und mit dem Gesäß „schieben“: Das Pferd drückt den Rücken weg.\n\nÜbungen: Volten und Schlangenlinien nur mit Gewicht und wenig Zügel reiten; an der Longe die Gewichtsverlagerung fühlen lernen; vor einem Spiegel oder mit Video kontrollieren, ob die Schultern waagerecht bleiben.",
        },
      ],
      praxis: {
        title: "Die Volte ohne Zügel",
        text: "Mila soll eine Volte nur mit Gewicht und Schenkel einleiten. Beim ersten Versuch lehnt sie sich nach innen – Tonga wird schneller und die Volte eckig. Die Reitlehrerin ruft: „Innere Hüfte vor, inneres Knie tief, Kopf hoch!“\n\nBeim zweiten Mal bleibt Mila aufrecht und belastet nur den inneren Gesäßknochen. Tonga wendet ruhig und rund ab, fast wie von selbst. Mila staunt, wie wenig nötig war.",
      },
      fehler: fehler(
        ["In die Kurve lehnen.", "Oberkörper aufrecht, innere Hüfte vor, inneres Knie tief."],
        ["In der Hüfte einknicken.", "Schultern waagerecht halten, Gewicht über den Gesäßknochen verlagern."],
        ["Dauerhaft stark belasten.", "Gewichtshilfen kurz und fein geben."],
        ["Mit dem Gesäß schieben.", "Mitschwingen statt schieben."],
      ),
      richtig: [
        "Halte den Oberkörper aufrecht, die Schultern waagerecht.",
        "Verlagere Gewicht über den inneren Gesäßknochen, nicht über den Oberkörper.",
        "Nutze beidseitig belastende Gewichtshilfen in Paraden.",
        "Setze die entlastende Gewichtshilfe gezielt ein.",
        "Übe Wendungen mit möglichst wenig Zügel.",
      ],
      merke: [
        "Gewichtshilfen wirken über das Becken, nicht über den Oberkörper.",
        "Drei Arten: beidseitig belastend, einseitig belastend, entlastend.",
        "Nicht in die Kurve lehnen.",
        "Richtige Gewichtshilfen sind von außen kaum zu sehen.",
      ],
      weiter: weiter(["Grundkurs: Gewichtshilfen", "ra-w3-l3"], ["Schenkelhilfen und ihre genaue Funktion", "ra-w18-l5"], ["Geraderichtung und natürliche Schiefe", "ra-w18-l10"]),
    },
    exercise: [
      wahl(
        "ra-w18-l4-entscheidung",
        "In einer Volte wird das Pferd schneller und fällt über die innere Schulter. Was machst du wahrscheinlich falsch?",
        "Du lehnst dich mit dem Oberkörper in die Kurve",
        [
          ["Du sitzt zu aufrecht", "Aufrecht sitzen ist richtig."],
          ["Du belastest den inneren Gesäßknochen", "Das ist die richtige Gewichtshilfe – solange der Oberkörper aufrecht bleibt."],
        ],
        "Richtig. Lehnen bringt das Pferd aus der Balance.",
      ),
    ],
    quiz: [
      frage("einseitig", "Wie gibst du eine einseitig belastende Gewichtshilfe nach innen?", "Innere Hüfte leicht vor, inneres Knie tiefer, Oberkörper aufrecht", [["Oberkörper nach innen lehnen", "So verlierst du das Gleichgewicht."], ["Inneren Fuß aus dem Bügel nehmen", "Das ist keine Gewichtshilfe."]], "Genau. Von außen kaum zu sehen."),
      frage("entlastend", "Wann setzt man die entlastende Gewichtshilfe ein?", "Z. B. bei jungen Pferden, beim Rückwärtsrichten und im leichten Sitz", [["Bei jeder Parade", "Bei Paraden wird beidseitig belastet."], ["Nie", "Sie ist eine wichtige Hilfe zum Schonen des Rückens."]], "Richtig. Der Rücken des Pferdes wird entlastet."),
      frage("parade", "Welche Gewichtshilfe gehört zur halben Parade?", "Die beidseitig belastende", [["Die entlastende", "Bei der Parade sitzt du tiefer ein."], ["Gar keine", "Gewicht ist ein wichtiger Teil jeder Parade."]], "Genau. Zusammen mit Schenkel und Zügel."),
    ],
  },
];
