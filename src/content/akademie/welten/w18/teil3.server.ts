import "server-only";
import { scene } from "../../build";
import { begriffe, fehler, frage, tabelle, wahl, weiter, type DeepInput } from "../deep-kit";

/** Modul 13, Lektionen 9–12 */
export const teil3: DeepInput[] = [
  /* ---------- 9. Stellung und Biegung ---------- */
  {
    slug: "stellung-und-biegung-verstehen",
    title: "Stellung und Biegung richtig verstehen",
    speaker: "lea",
    intro:
      "„Stell ihn mal nach innen!“ – und schon ziehen viele Reiter den Kopf mit dem inneren Zügel herum. Der Hals knickt ab, die Schulter fällt nach außen, das Pferd ist alles andere als gebogen. Stellung und Biegung sind zwei verschiedene Dinge – und beide entstehen nicht durch Ziehen.",
    illustration: scene("ak-bahn-volte"),
    terms: begriffe(
      ["Stellung", "Seitliche Abwendung des Kopfes im Genick; der Reiter sieht das innere Auge und den inneren Nüsternrand."],
      ["Längsbiegung", "Gleichmäßige Biegung des Pferdes vom Genick bis zum Schweif um den inneren Schenkel."],
      ["Abknicken", "Der Hals wird vor dem Widerrist abgewinkelt, statt sich gleichmäßig zu biegen – ein Fehler."],
    ),
    deep: {
      minutes: 11,
      sections: [
        {
          heading: "Der Unterschied",
          text: "Stellung findet nur im Genick statt: Das Pferd wendet den Kopf ganz leicht zur Seite, so weit, dass du das innere Auge und den Rand der inneren Nüster sehen kannst. Der Hals bleibt gerade auf dem Widerrist. Stellung brauchst du zum Beispiel vor dem Angaloppieren, im Schenkelweichen oder als Vorstufe der Biegung.\n\nBiegung betrifft das ganze Pferd: Es biegt sich gleichmäßig vom Genick über den Hals und den Rumpf, sodass die Hinterbeine in die Spur der Vorderbeine treten, auch auf gebogenen Linien. Jede Biegung enthält eine Stellung – aber nicht jede Stellung eine Biegung.",
        },
        {
          heading: "Biomechanik der Biegung",
          text: "Die Wirbelsäule des Pferdes ist im Rumpfbereich nur wenig seitlich beweglich; die meiste sichtbare Biegung findet im Hals statt. Trotzdem spricht man von Längsbiegung, weil sich die Muskulatur auf der inneren Seite verkürzt und auf der äußeren dehnt und das Pferd seine Hinterhand auf die gebogene Linie einspurt.\n\nDas innere Hinterbein tritt in der Biegung vermehrt unter den Körper in Richtung Schwerpunkt und muss mehr tragen. Deshalb ist Biegungsarbeit Gymnastik: Sie dehnt die äußere Seite, kräftigt das innere Hinterbein und bereitet Versammlung vor.",
        },
        {
          heading: "Die Hilfen",
          text: "• Gewicht: etwas mehr auf dem inneren Gesäßknochen.\n• Innerer Schenkel: am Gurt, vorwärtstreibend – um ihn biegt sich das Pferd.\n• Äußerer Schenkel: etwas hinter dem Gurt, verwahrend – verhindert, dass die Hinterhand nach außen fällt.\n• Innerer Zügel: gibt die Stellung, annehmend und nachgebend, nie dauerhaft ziehend.\n• Äußerer Zügel: gibt so viel nach, wie für die Stellung nötig ist, begrenzt aber und verhindert, dass der Hals abknickt oder die Schulter ausweicht.\n\nDas Pferd biegt sich um den inneren Schenkel und lehnt sich an den äußeren Zügel an. Merksatz: „Innen biegen, außen begrenzen.“",
        },
        {
          heading: "Wie es sich anfühlt und woran du es erkennst",
          text: "Richtig: Du hast eine etwas deutlichere Verbindung am äußeren Zügel und eine leichte, weiche am inneren. Das Pferd fühlt sich an, als würde es sich um dein inneres Bein „herumlegen“. Die Volte wird rund, ohne dass du lenken musst.\n\nWoran du es erkennst: Hinterhufe spuren in die Vorderhufe (im Sand gut zu sehen), das Pferd bleibt im Takt, der Hals ist gleichmäßig gebogen, die Ohren bleiben auf einer Höhe (kein Verwerfen im Genick), und beim kurzen Überstreichen des inneren Zügels bleibt die Stellung erhalten.",
        },
        {
          heading: "Typische Fehler, Ursachen, Übungen",
          text: "• Abknicken im Hals: zu viel innerer Zügel, zu wenig äußerer. → Innere Hand vorgeben, äußere Hand begrenzen.\n• Verwerfen im Genick (ein Ohr tiefer): Zug mit dem inneren Zügel nach hinten-unten. → Hand höher und nachgebend.\n• Über die äußere Schulter fallen: Der äußere Zügel lässt los. → Äußere Hand begrenzt.\n• Hinterhand fällt nach außen: Der äußere Schenkel verwahrt nicht.\n• Reiter lehnt sich nach innen.\n\nÜbungen: Zirkel verkleinern und vergrößern; Volten im Wechsel mit geraden Linien; Schlangenlinien mit Umstellen in der Mitte; Stellungswechsel auf gerader Linie (nur im Genick, Hals bleibt gerade); Überstreichen des inneren Zügels.",
        },
      ],
      praxis: {
        title: "Die eckige Volte",
        text: "Milas Volten mit Tonga werden eckig, und Tonga fällt immer über die äußere Schulter. Die Reitlehrerin beobachtet: Mila zieht den inneren Zügel, um zu wenden, und lässt den äußeren locker. Tongas Kopf zeigt nach innen, der Körper geht geradeaus weiter.\n\nMila soll den inneren Zügel nur noch für die Stellung leicht annehmen und dann nachgeben, den äußeren Zügel ruhig halten und mit dem inneren Schenkel am Gurt treiben. Plötzlich wird die Volte rund – mit viel weniger Hand. „Das Pferd biegt sich um mein Bein“, sagt Mila verblüfft.",
      },
      fehler: fehler(
        ["Mit dem inneren Zügel herumziehen.", "Innerer Zügel stellt nur, äußerer begrenzt."],
        ["Den äußeren Zügel ganz loslassen.", "Außen begrenzen, damit die Schulter nicht ausweicht."],
        ["Stellung und Biegung verwechseln.", "Stellung nur im Genick, Biegung durch das ganze Pferd."],
        ["Ohne inneren Schenkel biegen wollen.", "Der innere Schenkel ist der Punkt, um den sich das Pferd biegt."],
      ),
      richtig: [
        "Gewicht nach innen, ohne zu lehnen.",
        "Innerer Schenkel am Gurt treibt, äußerer verwahrt.",
        "Innerer Zügel gibt Stellung und gibt nach, äußerer begrenzt.",
        "Prüfe die Spur der Hufe und die Höhe der Ohren.",
        "Übe Zirkel verkleinern, Volten, Schlangenlinien und Stellungswechsel.",
      ],
      merke: [
        "Stellung nur im Genick – Biegung durch das ganze Pferd.",
        "Das Pferd biegt sich um den inneren Schenkel und lehnt sich an den äußeren Zügel.",
        "Innen biegen, außen begrenzen.",
        "Biegung ist Gymnastik: dehnt außen, kräftigt das innere Hinterbein.",
      ],
      weiter: weiter(["Dressur: Stellung und Biegung", "ra-w13-l3"], ["Geraderichtung und natürliche Schiefe", "ra-w18-l10"], ["Seitengänge", "ra-w18-l17"], ["Reitlehre-Visualizer (interaktive Übung)"]),
    },
    exercise: [
      wahl(
        "ra-w18-l9-entscheidung",
        "Auf dem Zirkel zeigt der Kopf deines Pferdes deutlich nach innen, aber es drängt mit der Schulter nach außen. Was fehlt?",
        "Der begrenzende äußere Zügel und der innere Schenkel am Gurt",
        [
          ["Mehr innerer Zügel", "Mehr innerer Zügel verstärkt das Abknicken und das Ausweichen."],
          ["Mehr Tempo", "Tempo löst das Biegeproblem nicht."],
        ],
        "Richtig. Außen begrenzen, innen biegen.",
      ),
    ],
    quiz: [
      frage("stellung", "Woran erkennst du korrekte Stellung?", "Du siehst das innere Auge und den Rand der inneren Nüster", [["Der Kopf zeigt weit zur Seite", "Das wäre zu viel und meist ein Abknicken."], ["Die Ohren sind unterschiedlich hoch", "Das wäre ein Verwerfen im Genick."]], "Genau. Der Hals bleibt dabei gerade."),
      frage("biegung", "Worum biegt sich das Pferd?", "Um den inneren Schenkel", [["Um den äußeren Zügel", "An den äußeren Zügel lehnt es sich an."], ["Um die Gerte", "Die Gerte ist keine Biegehilfe."]], "Richtig. Der innere Schenkel liegt am Gurt."),
      frage("aussen", "Welche Aufgabe hat der äußere Zügel in der Biegung?", "Er begrenzt und verhindert das Ausweichen über die Schulter", [["Er hat keine Aufgabe", "Er ist entscheidend für Kontrolle und Anlehnung."], ["Er zieht den Kopf nach außen", "Er begrenzt, ohne den Kopf herumzuziehen."]], "Genau. Er gibt nur so viel nach, wie für die Stellung nötig ist."),
      frage("spur", "Woran erkennst du im Sand, dass das Pferd gebogen ist?", "Die Hinterhufe spuren in die Vorderhufe", [["Die Hufspuren liegen weit auseinander", "Dann ist das Pferd nicht gerade auf der Linie."], ["An den Spuren erkennt man nichts", "Die Spur zeigt sehr gut, ob das Pferd auf der Linie bleibt."]], "Richtig. Auch auf gebogenen Linien."),
    ],
  },

  /* ---------- 10. Geraderichtung ---------- */
  {
    slug: "geraderichtung-schiefe",
    title: "Geraderichtung und natürliche Schiefe",
    speaker: "ben",
    intro:
      "Fast jedes Pferd hat eine Lieblingsseite – wie Menschen Rechts- oder Linkshänder sind. Auf der einen Hand fühlt es sich weich und biegsam an, auf der anderen steif. Das ist kein Charakterzug, sondern natürliche Schiefe. Sie lässt sich verbessern, aber nur mit Geduld.",
    illustration: scene("ak-oben-gerade"),
    terms: begriffe(
      ["Natürliche Schiefe", "Angeborene Ungleichheit der beiden Körperseiten; das Pferd ist auf einer Seite hohl, auf der anderen steif."],
      ["Hohle Seite", "Die Seite, zu der sich das Pferd leicht biegt; die Muskeln sind dort kürzer."],
      ["Schultervor", "Leichte Vorstufe des Schulterherein; die Schultern werden ein wenig nach innen geführt."],
      ["Über die Schulter fallen", "Das Pferd weicht mit der Vorhand seitlich aus, meist über die äußere Schulter."],
    ),
    deep: {
      minutes: 11,
      sections: [
        {
          heading: "Was natürliche Schiefe ist",
          text: "Die meisten Pferde sind von Natur aus auf einer Seite hohl und auf der anderen steif; häufig sind sie rechts hohl. Auf der hohlen Seite sind die Muskeln kürzer, das Pferd biegt sich gern dorthin. Die Hinterhand weicht oft etwas zur hohlen Seite aus, und das Pferd belastet eine Schulter mehr. Ein Grund ist auch, dass die Vorhand schmaler ist als die Hinterhand – auf dem Hufschlag geht ein Pferd deshalb leicht schräg, wenn es sich nicht ausrichtet.\n\nIm Sattel spürst du die Schiefe zum Beispiel so: Auf einer Hand liegt das Pferd mehr am Zügel, auf der anderen kaum. Es springt auf einer Hand schlechter an, Volten werden auf einer Seite rund, auf der anderen eckig.",
        },
        {
          heading: "Warum Geraderichtung so wichtig ist",
          text: "Ein schiefes Pferd belastet seine Beine ungleich: ein Vorderbein und ein Hinterbein tragen mehr. Das führt auf Dauer zu Verschleiß. Außerdem können die Hilfen nicht gleichmäßig durchkommen, und Schwung wie Versammlung bleiben einseitig.\n\nGeraderichten bedeutet: Die Vorhand wird vor die Hinterhand gerichtet – nicht umgekehrt. Das Pferd lernt, mit beiden Hinterbeinen gleichmäßig in Richtung Schwerpunkt zu treten und beide Seiten gleich zu belasten. Das Ergebnis ist ein Pferd, das sich auf beiden Händen gleich anfühlt.",
        },
        {
          heading: "Die Hilfen: Schultern vor die Hinterhand",
          text: "Weil die Hinterhand stärker ist und das Pferd nach vorn treibt, richtet man die schmalere Vorhand vor die Hinterhand aus. Die wichtigsten Werkzeuge:\n\n• Schultervor: Auf gerader Linie werden die Schultern mit beiden Zügeln ganz leicht nach innen geführt, sodass das innere Hinterbein zwischen die Vorderbeine tritt. Innerer Schenkel am Gurt, äußerer verwahrt.\n• Schulterherein (Lektion 17) als stärkere Form.\n• Gebogene Linien auf beiden Händen gleich oft – auf der steifen Seite eher etwas mehr.\n• Konsequentes Begrenzen mit dem äußeren Zügel auf der Seite, über die das Pferd ausweicht.\n\nGeraderichtung ist ein langfristiges Ziel. Sie wird in jeder Reitstunde geübt.",
        },
        {
          heading: "Wie es sich anfühlt",
          text: "Ein geradegerichtetes Pferd fühlt sich an, als liefe es „zwischen den Zügeln und Schenkeln“ – mit gleichmäßiger Verbindung auf beiden Seiten. Du sitzt automatisch mittig. Auf der Mittellinie bleibt es ohne Schlangenbewegung gerade, im Galopp springt es auf beiden Händen gleich gut an.\n\nEin Test: Reite auf der Mittellinie im Trab. Weicht das Pferd mit der Hinterhand zu einer Seite aus oder wackelt es? Kontrolliere die Hufspuren im Sand oder lass dich von vorn filmen.",
        },
        {
          heading: "Typische Fehler, Ursachen, Übungen",
          text: "• Den Hals gerade ziehen, statt die Schultern zu richten: Das Pferd bleibt im Körper schief.\n• Nur die „gute“ Hand reiten, weil es leichter ist.\n• Die Hinterhand an die Vorhand anpassen (z. B. mit dem Schenkel nach außen drücken), statt die Vorhand vor die Hinterhand zu stellen.\n• Eigene Schiefe des Reiters: Wer schief sitzt, macht das Pferd schief.\n\nÜbungen: Schultervor auf beiden Händen; Zirkel mit Schultervor; Mittellinie im Schritt und Trab; Handwechsel durch die Länge der Bahn mit Fokus auf gerade Linie; Viereck verkleinern und vergrößern; Videos von vorn und hinten.",
        },
      ],
      praxis: {
        title: "Die gute und die schlechte Hand",
        text: "Scrabble ist auf der rechten Hand weich und biegsam, auf der linken fest im linken Zügel; Volten links werden eckig, und er fällt über die rechte Schulter. Wilhelm reitet seit Jahren lieber rechts herum.\n\nDie Reitlehrerin stellt einen Plan auf: in jeder Einheit Schultervor auf beiden Händen, links etwas häufiger, viele Handwechsel, außen konsequent begrenzen. Nach zwei Monaten sind die Unterschiede deutlich kleiner. Scrabble springt links sicherer an, und Wilhelm merkt, dass auch er links bisher schief saß.",
      },
      fehler: fehler(
        ["Die Hinterhand an die Vorhand anpassen.", "Die Schultern vor die Hinterhand richten."],
        ["Nur die Lieblingshand reiten.", "Beide Hände, die steife eher häufiger."],
        ["Den Hals gerade ziehen.", "Schultern führen, Hals folgt."],
        ["Die eigene Schiefe übersehen.", "Sitz von hinten filmen lassen."],
      ),
      richtig: [
        "Finde heraus, auf welcher Seite dein Pferd hohl und auf welcher steif ist.",
        "Reite Schultervor auf beiden Händen.",
        "Begrenze mit dem äußeren Zügel auf der Seite, über die das Pferd ausweicht.",
        "Teste auf der Mittellinie und kontrolliere die Hufspuren.",
        "Arbeite an deiner eigenen Geraderichtung im Sattel.",
      ],
      merke: [
        "Fast jedes Pferd ist natürlich schief – häufig rechts hohl.",
        "Geraderichten heißt: Vorhand vor die Hinterhand.",
        "Schultervor ist das wichtigste Werkzeug.",
        "Geraderichtung schont die Beine und macht Hilfen gleichmäßig.",
      ],
      weiter: weiter(["Stellung und Biegung richtig verstehen", "ra-w18-l9"], ["Seitengänge", "ra-w18-l17"], ["Lernvideo „Über die Schulter fallen“"]),
    },
    exercise: [
      wahl(
        "ra-w18-l10-entscheidung",
        "Auf der Mittellinie weicht die Hinterhand deines Pferdes nach rechts aus. Was ist der klassische Ansatz?",
        "Die Schultern ganz leicht nach rechts vor die Hinterhand führen (Schultervor)",
        [
          ["Mit dem rechten Schenkel die Hinterhand nach links drücken", "So wird die Hinterhand an die Vorhand angepasst, nicht umgekehrt."],
          ["Den Kopf mit dem linken Zügel nach links ziehen", "Der Hals wird gebogen, das Pferd bleibt schief."],
        ],
        "Richtig. Die Vorhand wird vor die Hinterhand gerichtet.",
      ),
    ],
    quiz: [
      frage("schief", "Was ist natürliche Schiefe?", "Eine angeborene Ungleichheit der beiden Körperseiten", [["Ein Zeichen für schlechte Reiter", "Sie ist angeboren, wird aber durch Reiten verbessert oder verschlechtert."], ["Eine Krankheit", "Sie ist normal, sollte aber bearbeitet werden."]], "Genau. Ähnlich wie Rechts- oder Linkshändigkeit."),
      frage("prinzip", "Was ist das Prinzip der Geraderichtung?", "Die Vorhand vor die Hinterhand richten", [["Die Hinterhand hinter die Vorhand drücken", "Die stärkere Hinterhand gibt die Richtung vor."], ["Den Kopf gerade halten", "Der Kopf allein sagt nichts über den Körper."]], "Richtig. Mit Schultervor und Schulterherein."),
      frage("warum", "Warum ist Geraderichtung wichtig für die Gesundheit?", "Weil ein schiefes Pferd seine Beine ungleich belastet", [["Weil es schöner aussieht", "Es geht vor allem um die Belastung."], ["Sie ist für die Gesundheit egal", "Ungleiche Belastung führt zu Verschleiß."]], "Genau. Gleichmäßige Belastung schont Sehnen und Gelenke."),
    ],
  },

  /* ---------- 11. Übergänge ---------- */
  {
    slug: "uebergaenge-tempo",
    title: "Übergänge und Tempounterschiede",
    speaker: "mila",
    intro:
      "Übergänge sind das Krafttraining des Pferdes. In jedem Übergang muss die Hinterhand mehr tragen oder mehr schieben. Gute Ausbilder reiten deshalb Hunderte Übergänge – nicht, um eine Lektion abzuhaken, sondern um das Pferd stärker und feiner zu machen.",
    illustration: tabelle("Tempi", "Tempounterschiede im Trab", [
      ["Tempo", "Merkmal"],
      ["Versammelt", "kürzere, erhabene Tritte, mehr Lastaufnahme"],
      ["Arbeitstempo", "natürliches, fleißiges Grundtempo"],
      ["Mitteltempo", "längere Tritte, Rahmen etwas erweitert"],
      ["Starkes Tempo", "größtmögliche Rahmenerweiterung bei gleichem Takt"],
    ]),
    terms: begriffe(
      ["Übergang", "Wechsel zwischen Gangarten (z. B. Trab–Schritt) oder Tempi (z. B. Arbeitstrab–Mitteltrab)."],
      ["Rahmenerweiterung", "Das Pferd verlängert Tritte und Hals, ohne schneller im Takt zu werden."],
      ["Durchlässigkeit", "Das Pferd lässt die Hilfen willig von hinten nach vorn und von vorn nach hinten durch."],
    ),
    deep: {
      minutes: 10,
      sections: [
        {
          heading: "Warum Übergänge so wirksam sind",
          text: "Beim Übergang in eine höhere Gangart muss die Hinterhand kräftig abdrücken (Schubkraft). Beim Übergang in eine niedrigere Gangart muss sie vermehrt unter den Körper treten und Last aufnehmen (Tragkraft). Jeder Übergang ist also eine Kraftübung für Hinterhand, Rücken und Bauchmuskeln.\n\nDazu kommt die Kopfarbeit: Das Pferd lernt, aufmerksam auf feine Hilfen zu reagieren. Übergänge verbessern damit fast jeden Punkt der Ausbildungsskala: Takt, Losgelassenheit, Anlehnung, Schwung und Versammlung.",
        },
        {
          heading: "Ein guter Übergang",
          text: "• Vorbereitet: mit einer oder mehreren halben Paraden.\n• An der gewünschten Stelle.\n• Im Takt bis zum letzten Tritt der alten und vom ersten Tritt der neuen Gangart.\n• Ohne Kopfschlagen, Festmachen oder Auseinanderfallen.\n• Mit gleichbleibender Anlehnung.\n• In der niedrigeren Gangart fleißig – nicht „hineingefallen“.\n\nAufwärts: Halbe Parade, dann treibende Hilfe für die neue Gangart, Hand lässt die Bewegung nach vorn heraus.\nAbwärts: Halbe Paraden aus dem Sitz, Schenkel bleiben dran, damit die Hinterhand herankommt, Hand fängt auf und gibt nach.",
        },
        {
          heading: "Tempounterschiede",
          text: "Innerhalb einer Gangart unterscheidet man Tempi. Wichtig: Ein höheres Tempo bedeutet längere Tritte, nicht schnellere. Der Takt bleibt gleich, das Pferd erweitert Rahmen und Tritte. Ein Pferd, das beim Zulegen eilt, schiebt nur von hinten, ohne zu tragen.\n\nZum Zulegen: Halbe Parade zum Vorbereiten, dann vermehrt treiben, Hand lässt Hals und Rahmen etwas länger werden. Zum Zurückführen: Mehrere halbe Paraden, Schenkel bleiben dran – die Tritte werden kürzer, aber nicht schlapper.\n\nIn den Zwischenstufen zwischen Arbeitstempo und starkem Tempo lernt das Pferd, sein Gleichgewicht zu regulieren.",
        },
        {
          heading: "Wie es sich anfühlt und typische Fehler",
          text: "Ein guter Übergang fühlt sich „rund“ an: Das Pferd bleibt in der Hand, du spürst den Rücken arbeiten, der neue Takt ist sofort da. Ein schlechter Übergang fühlt sich an wie ein Ruck – das Pferd fällt auseinander oder hebt den Kopf.\n\nFehler und Ursachen:\n• Pferd fällt in den Schritt auf die Vorhand: Schenkel fehlen.\n• Pferd wirft beim Angaloppieren den Kopf hoch: Hand hält fest oder Vorbereitung fehlt.\n• Pferd eilt beim Zulegen: Zu viel Treiben ohne vorbereitende Parade, Pferd noch nicht genug ausbalanciert.\n• Übergänge kommen „irgendwann“: Hilfen sind zu unklar.",
        },
        {
          heading: "Übungen",
          text: "• Trab–Schritt–Trab, jeweils nach 10 bis 15 Tritten, auf dem Zirkel.\n• Übergänge an jedem Bahnpunkt einer Seite.\n• Zulegen auf der langen Seite, Zurückführen vor der Ecke.\n• Trab–Halt–Trab, wenn die Übergänge über Schritt sicher sind.\n• Galopp–Trab–Galopp auf dem Zirkel.\n\nAchte darauf, das Pferd nicht zu überfordern: Übergänge sind anstrengend. Viele kurze Reprisen mit Pausen dazwischen sind besser als 20 Minuten am Stück.",
        },
      ],
      praxis: {
        title: "Zwanzig Übergänge",
        text: "Tilda reitet Tonga zehn Minuten nur Trab–Schritt–Trab auf dem Zirkel, alle zehn Tritte ein Übergang. Am Anfang kommen die Übergänge spät, Tonga fällt in den Schritt und muss neu angetrieben werden. Tilda achtet auf ihren Sitz: Aufrichten, einsitzen, Schenkel dran, Hand kurz schließen und nachgeben.\n\nNach etwa zwanzig Übergängen reagiert Tonga auf ein leichtes Einsitzen, ihr Trab wird schwungvoller und der Hals runder. Tilda gönnt ihr eine Dehnungspause. Danach fühlt sich der Arbeitstrab deutlich besser an als zu Beginn.",
      },
      fehler: fehler(
        ["Übergänge ohne Vorbereitung.", "Immer mit halben Paraden vorbereiten."],
        ["Zulegen durch schnelleren Takt.", "Längere Tritte im gleichen Takt."],
        ["Beim Durchparieren die Schenkel wegnehmen.", "Schenkel dranlassen, damit die Hinterhand herankommt."],
        ["Endlos Übergänge ohne Pause.", "Kurze Reprisen, Dehnungspausen dazwischen."],
      ),
      richtig: [
        "Bereite jeden Übergang mit halben Paraden vor.",
        "Reite Übergänge an festen Punkten und prüfe, ob sie pünktlich kommen.",
        "Lass beim Durchparieren die Schenkel dran.",
        "Lege durch längere Tritte zu, nicht durch schnelleren Takt.",
        "Plane viele kurze Reprisen mit Pausen.",
      ],
      merke: [
        "Übergänge sind Krafttraining für die Hinterhand.",
        "Vorbereitet, im Takt, an der gewünschten Stelle.",
        "Zulegen heißt längere Tritte, nicht schnellere.",
        "Lieber viele kurze Übergangsreprisen als lange Wiederholungen.",
      ],
      weiter: weiter(["Das Zusammenspiel der Hilfen und halbe Paraden", "ra-w18-l7"], ["Dressur: Tempi", "ra-w13-l4"], ["Richtig angaloppieren", "ra-w18-l13"]),
    },
    exercise: [
      wahl(
        "ra-w18-l11-entscheidung",
        "Beim Zulegen im Trab wird dein Pferd schneller im Takt und läuft auf die Vorhand. Was hilft?",
        "Vor dem Zulegen eine halbe Parade, dann dosiert treiben und die Hand den Rahmen erweitern lassen",
        [
          ["Noch kräftiger treiben", "Mehr Treiben ohne Balance macht das Eilen schlimmer."],
          ["Mit der Hand festhalten, damit es nicht schneller wird", "Dann entsteht ein Widerspruch: vorn halten, hinten treiben."],
        ],
        "Richtig. Erst ausbalancieren, dann zulegen.",
      ),
    ],
    quiz: [
      frage("kraft", "Warum sind Übergänge für das Pferd so wertvoll?", "Weil sie Schub- und Tragkraft der Hinterhand trainieren", [["Weil sie die Stunde schneller vergehen lassen", "Der Wert liegt in der Gymnastizierung."], ["Weil sie das Pferd müde machen", "Ziel ist Kräftigung, nicht Erschöpfung."]], "Genau. Jeder Übergang ist eine Kraftübung."),
      frage("zulegen", "Was bedeutet Zulegen im Trab?", "Längere Tritte im gleichen Takt", [["Schnellere Tritte", "Der Takt bleibt gleich."], ["Höhere Tritte", "Erhabenheit kommt eher in der Versammlung."]], "Richtig. Der Rahmen erweitert sich."),
      frage("durchparieren", "Was passiert, wenn du beim Durchparieren die Schenkel wegnimmst?", "Das Pferd fällt auf die Vorhand in die neue Gangart", [["Der Übergang wird besonders weich", "Ohne Schenkel fehlt die Hinterhand."], ["Nichts", "Die Schenkel sind entscheidend für die Lastaufnahme."]], "Genau. Schenkel dran, damit die Hinterhand herankommt."),
    ],
  },

  /* ---------- 12. Galopp-Fußfolge ---------- */
  {
    slug: "galopp-fussfolge-biomechanik",
    title: "Der Galopp: Fußfolge, Dreitakt und Biomechanik",
    speaker: "ben",
    intro:
      "Viele Reiter galoppieren jahrelang, ohne genau zu wissen, wie der Galopp funktioniert. Wer die Fußfolge kennt, versteht, warum man an einer bestimmten Stelle angaloppiert, warum Pferde falsch anspringen und wie man im Sattel richtig mitgeht.",
    illustration: scene("ak-takt-galopp-rechts"),
    terms: begriffe(
      ["Dreitakt", "Im Galopp sind pro Sprung drei Hufschläge zu hören."],
      ["Führendes Bein", "Das Vorderbein, das im Galopp weiter vorgreift; im Rechtsgalopp das rechte."],
      ["Schwebephase", "Moment, in dem kein Huf den Boden berührt."],
      ["Viertaktgalopp", "Fehlerhafter Galopp, bei dem das diagonale Beinpaar nicht mehr gleichzeitig auffußt."],
    ),
    deep: {
      minutes: 9,
      sections: [
        {
          heading: "Die Fußfolge",
          text: "Im Rechtsgalopp fußen die Beine so auf:\n1. hinten links\n2. gleichzeitig hinten rechts und vorne links (diagonales Beinpaar)\n3. vorne rechts\n– dann folgt die Schwebephase.\n\nDaraus entsteht der Dreitakt: ba-da-bumm. Das rechte Beinpaar greift weiter vor als das linke, deshalb heißt es Rechtsgalopp. Im Linksgalopp ist es genau gespiegelt: hinten rechts, dann hinten links mit vorne rechts, dann vorne links.\n\nDer Galopp beginnt also mit dem äußeren Hinterbein. Das ist für das Angaloppieren wichtig (Lektion 13).",
        },
        {
          heading: "Biomechanik des Galopps",
          text: "Im Galopp schwingt der ganze Körper wie eine Schaukel: Wenn das äußere Hinterbein aufsetzt, ist die Vorhand oben; wenn das führende Vorderbein aufsetzt, ist die Hinterhand oben. Kopf und Hals nicken in jedem Sprung mit und helfen dem Pferd, das Gleichgewicht zu halten.\n\nDas innere Hinterbein tritt im Galopp weit unter den Körper und trägt viel Gewicht. Das macht den Galopp zu einer guten Übung für Kraft und Balance – und zu einer anspruchsvollen Gangart für Pferde mit Problemen in der Hinterhand oder im Rücken.",
        },
        {
          heading: "Qualität des Galopps",
          text: "Ein guter Galopp ist:\n• klar im Dreitakt mit deutlicher Schwebephase,\n• bergauf: Die Vorhand hebt sich, die Hinterhand springt unter,\n• gerade: Die Hinterhand fällt nicht nach innen,\n• gleichmäßig im Tempo.\n\nSchlechte Galoppe: flach und eilig (Pferd läuft auf der Vorhand), Viertaktgalopp (das diagonale Paar fußt nicht mehr gleichzeitig, die Schwebephase fehlt – oft durch zu viel Hand und zu wenig Schwung), schief mit Hinterhand nach innen.",
        },
        {
          heading: "Wie du ihn fühlst",
          text: "Im Rechtsgalopp spürst du, dass deine rechte Hüfte etwas mehr vorgeht – das Pferd schwingt dich mit. Du kannst das führende Bein auch am Pferd sehen: Die rechte Schulter greift weiter vor. Mit Übung spürst du es ohne Hinsehen.\n\nZum Üben: Im Galopp laut mitzählen „ba-da-bumm“. Den Moment der Schwebephase spüren – hier bist du kurz leicht im Sattel. Kurz zur Schulter schauen, ohne den Oberkörper zu drehen, und prüfen, welches Bein führt; danach immer erst fühlen, dann kontrollieren.",
        },
      ],
      praxis: {
        title: "Ba-da-bumm",
        text: "Lea lässt sich an der Longe galoppieren, ohne Zügel. Die Reitlehrerin ruft bei jedem Sprung „ba-da-bumm“. Lea soll bei „bumm“ mit dem Becken nach vorn gehen. Nach einigen Runden spürt sie den Rhythmus. Dann soll sie mit geschlossenen Augen sagen, ob Tivoli auf der rechten oder linken Hand galoppiert – und liegt meistens richtig.\n\nAls Tivoli in der nächsten Reitstunde falsch anspringt, merkt Lea es sofort, ohne hinzuschauen.",
      },
      fehler: fehler(
        ["Zum Prüfen weit nach unten schauen.", "Erst fühlen, dann kurz zur Schulter schauen."],
        ["Galopp durch viel Hand langsam machen.", "Schwung erhalten – sonst droht Viertakt."],
        ["Die Fußfolge für egal halten.", "Wer sie kennt, galoppiert besser an."],
        ["Flachen, eiligen Galopp für Schwung halten.", "Schwung heißt Energie aus der Hinterhand, nicht Tempo."],
      ),
      richtig: [
        "Lerne die Fußfolge: äußeres Hinterbein – diagonales Paar – führendes Vorderbein – Schwebe.",
        "Zähle im Galopp mit „ba-da-bumm“.",
        "Fühle, welche Hüfte mehr vorgeht.",
        "Achte auf Dreitakt, Schwebephase, Bergauf-Tendenz und Geradheit.",
        "Erhalte Schwung, statt mit der Hand zu bremsen.",
      ],
      merke: [
        "Galopp ist Dreitakt mit Schwebephase.",
        "Der Galopp beginnt mit dem äußeren Hinterbein.",
        "Im Rechtsgalopp greift das rechte Beinpaar weiter vor.",
        "Ein guter Galopp ist taktklar, bergauf und gerade.",
      ],
      weiter: weiter(["Grundkurs: Der Dreitakt", "ra-w6-l1"], ["Richtig angaloppieren", "ra-w18-l13"], ["Galoppsitz, Balance und Mitschwingen", "ra-w18-l14"], ["Reitlehre-Visualizer (interaktive Übung)"]),
    },
    exercise: [
      wahl(
        "ra-w18-l12-entscheidung",
        "Mit welchem Bein beginnt die Fußfolge im Linksgalopp?",
        "Hinten rechts",
        [
          ["Vorne links", "Das führende Vorderbein kommt im Galopp zuletzt."],
          ["Hinten links", "Im Linksgalopp beginnt das äußere, also das rechte Hinterbein."],
        ],
        "Richtig: hinten rechts, dann hinten links mit vorne rechts, dann vorne links, Schwebe.",
      ),
    ],
    quiz: [
      frage("takt", "Wie viele Takte hat der Galopp?", "Drei", [["Zwei", "Das ist der Trab."], ["Vier", "Das wäre ein fehlerhafter Viertaktgalopp – oder der Schritt."]], "Genau. Ba-da-bumm."),
      frage("diagonal", "Was fußt im Rechtsgalopp als zweiter Takt auf?", "Hinten rechts und vorne links gleichzeitig", [["Beide Vorderbeine", "Die Vorderbeine fußen nacheinander auf."], ["Vorne rechts", "Vorne rechts kommt als dritter Takt."]], "Richtig. Das diagonale Beinpaar."),
      frage("viertakt", "Was ist ein Viertaktgalopp?", "Ein fehlerhafter Galopp ohne gleichzeitiges Auffußen des diagonalen Paars", [["Ein besonders schneller Galopp", "Er hat mit Tempo wenig zu tun."], ["Ein Galopp mit vier Sprüngen", "Es geht um den Takt innerhalb eines Sprungs."]], "Genau. Oft durch zu viel Hand und zu wenig Schwung."),
      frage("schwebe", "Wann liegt im Galopp die Schwebephase?", "Nach dem Auffußen des führenden Vorderbeins", [["Zwischen den beiden Hinterbeinen", "Dazwischen ist kein Moment ohne Bodenkontakt."], ["Der Galopp hat keine Schwebephase", "Er hat eine deutliche Schwebephase."]], "Richtig. Danach beginnt der nächste Sprung."),
    ],
  },
];
