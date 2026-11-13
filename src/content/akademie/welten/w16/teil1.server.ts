import "server-only";
import { item } from "../../build";
import { begriffe, fehler, frage, tabelle, wahl, weiter, type DeepInput } from "../deep-kit";

/** Modul 11, Lektionen 1–5 */
export const teil1: DeepInput[] = [
  /* ---------- 1. Gesundes Pferd ---------- */
  {
    slug: "gesundes-pferd",
    title: "Wie erkenne ich ein gesundes Pferd?",
    speaker: "mila",
    intro:
      "Krankheit fällt oft erst auf, wenn ein Pferd lahmt, nicht frisst oder Fieber hat. Erfahrene Pferdeleute bemerken aber schon vorher, dass „etwas anders ist“. Das ist kein Bauchgefühl – sie kennen das Normalbild ihres Pferdes sehr genau.",
    illustration: item("lupe"),
    terms: begriffe(
      ["Normalbefund", "Wie ein bestimmtes Pferd aussieht und sich verhält, wenn es gesund ist."],
      ["Schleimhäute", "Feuchte Innenhäute, z. B. am Zahnfleisch oder im Auge. Ihre Farbe zeigt etwas über den Kreislauf."],
      ["Kapilläre Füllungszeit", "Zeit, bis eine weiß gedrückte Stelle am Zahnfleisch wieder rosa wird; normal unter etwa zwei Sekunden."],
    ),
    deep: {
      minutes: 8,
      sections: [
        {
          heading: "Gesund ist, was für dieses Pferd normal ist",
          text: "Es gibt allgemeine Normalwerte, aber jedes Pferd hat sein eigenes Normalbild: Wie es frisst, wo es gern steht, wie viel es liegt, wie es dich begrüßt, wie sein Kot aussieht. Wer dieses Bild kennt, bemerkt Abweichungen früh – oft Stunden oder Tage bevor deutliche Krankheitszeichen auftreten.\n\nDeshalb ist die wichtigste Fähigkeit nicht, Krankheiten zu benennen. Sie besteht darin, Veränderungen zu bemerken und richtig einzuordnen: Ist das harmlos, soll ich beobachten, den Tierarzt fragen – oder ist es ein Notfall?",
        },
        {
          heading: "Verhalten und Haltung",
          text: "Ein gesundes Pferd ist aufmerksam, reagiert auf seine Umgebung und auf Artgenossen, frisst mit Appetit und bewegt sich gleichmäßig. Es steht entspannt, oft mit einem angewinkelten Hinterbein, und verteilt sein Gewicht ansonsten gleichmäßig.\n\nWarnzeichen sind: Teilnahmslosigkeit, abgesonderter Stand von der Gruppe, Futterverweigerung, häufiges Hinlegen und Aufstehen, Scharren, Umschauen zum Bauch, ständiges Entlasten eines Vorderbeins, ungewöhnliches Schwitzen, gesenkter Kopf mit halb geschlossenen Augen außerhalb der Ruhezeiten. Auch ein sonst neugieriges Pferd, das plötzlich nicht an die Tür kommt, verdient einen zweiten Blick.",
        },
        {
          heading: "Körper von Kopf bis Huf",
          text: "• Augen: klar, offen, ohne Tränenfluss oder Schwellung.\n• Nüstern: trocken bis leicht feucht, ohne gelblichen oder blutigen Ausfluss.\n• Schleimhäute: blassrosa und feucht. Sehr blass, gelblich, dunkelrot oder bläulich ist auffällig.\n• Fell und Haut: glänzend, elastisch, ohne kahle Stellen, Krusten oder Schwellungen.\n• Beine: kühl, ohne neue Schwellungen oder warme Stellen.\n• Hufe: gleichmäßig warm, keine stark pochende Zehenarterie, sauberer Strahl.\n• Atmung: ruhig und gleichmäßig, in Ruhe kaum sichtbar.\n• Kot: geformte Äpfel, die beim Aufprall zerfallen; Menge und Häufigkeit wie gewohnt.\n• Urin: hell- bis dunkelgelb, oft trüb – beim Pferd normal.",
        },
        {
          heading: "Wenn etwas nicht stimmt",
          text: "Einordnen hilft:\n\n• Beobachten und notieren: kleine Veränderung, Pferd frisst, wirkt sonst normal (z. B. leicht verschmutztes Auge). Später erneut prüfen.\n• Tierarzt anrufen und beraten lassen: Veränderung hält an, verschlechtert sich oder du bist unsicher (z. B. Husten seit zwei Tagen, frische Schwellung am Bein).\n• Notfall, Tierarzt sofort: starke Schmerzen, Kolikzeichen, Fieber über etwa 39 °C mit Mattigkeit, starke Blutung, Pferd belastet ein Bein gar nicht, Atemnot, Festliegen.\n\nDu musst keine Diagnose stellen. Deine Aufgabe ist, gut zu beobachten, Werte zu messen und klar weiterzugeben, was du siehst.",
        },
      ],
      praxis: {
        title: "Tonga steht anders",
        text: "Tilda kommt abends in den Stall. Tonga steht in der hinteren Boxenecke statt an der Tür und hat ihr Heu kaum angerührt. Sonst wirkt sie ruhig. Tilda misst Puls, Atmung und Temperatur, schaut Schleimhäute und Kot an und notiert alles: Werte im Normalbereich, aber deutlich weniger Kot als sonst.\n\nSie ruft die Tierärztin an und beschreibt genau, was sie sieht. Die Tierärztin bittet sie, in einer Stunde erneut zu messen. Als Tonga dann zu scharren beginnt, kommt sie sofort. Diagnose: beginnende Verstopfungskolik. Weil Tilda Tongas Normalbild kannte, war sie früh dran.",
      },
      fehler: fehler(
        ["Erst reagieren, wenn das Pferd deutlich krank wirkt.", "Auf kleine Abweichungen vom Normalbild achten."],
        ["Dem Tierarzt nur „Es geht ihm nicht gut“ sagen.", "Konkrete Beobachtungen und gemessene Werte weitergeben."],
        ["Selbst eine Diagnose stellen und Medikamente geben.", "Beobachten, messen, Tierarzt entscheiden lassen."],
        ["Trüben Urin für ein Krankheitszeichen halten.", "Trüber Urin ist beim Pferd normal; auffällig sind z. B. dunkelbraune Färbung oder Blut."],
      ),
      richtig: [
        "Präge dir das Normalbild deines Pferdes ein: Verhalten, Fressen, Kot, Liegeplatz.",
        "Miss in Ruhe mehrfach Puls, Atmung und Temperatur, um seine eigenen Normalwerte zu kennen.",
        "Prüfe bei Auffälligkeiten von Kopf bis Huf und notiere, was du siehst.",
        "Ordne ein: beobachten, Tierarzt fragen oder Notfall.",
        "Gib Beobachtungen am Telefon kurz, konkret und mit Uhrzeit weiter.",
      ],
      merke: [
        "Gesund ist, was für dieses Pferd normal ist – kenne sein Normalbild.",
        "Verhalten, Fresslust und Kot sind frühe Gesundheitszeichen.",
        "Du stellst keine Diagnose: Du beobachtest, misst und informierst.",
        "Starke Schmerzen, Kolikzeichen, Atemnot, Festliegen: sofort Tierarzt.",
      ],
      weiter: weiter(["Puls, Atmung und Temperatur messen", "ra-w16-l2"], ["Der tägliche Gesundheitscheck", "ra-w16-l3"], ["Stallmanagement und tägliche Versorgung", "ra-w15-l13"]),
    },
    exercise: [
      wahl(
        "ra-w16-l1-entscheidung",
        "Dein Pferd frisst sein Heu nur zögerlich, wirkt aber sonst normal. Was tust du zuerst?",
        "Messen und genau beobachten (Puls, Atmung, Temperatur, Kot, Verhalten), notieren und bei Auffälligkeiten den Tierarzt anrufen",
        [
          ["Nichts – morgen ist es bestimmt wieder gut", "Futterunlust kann ein frühes Zeichen für Kolik oder Fieber sein. Erst hinschauen, dann entscheiden."],
          ["Ein Schmerzmittel aus der Stallapotheke geben", "Medikamente gibt es nur nach tierärztlicher Anweisung. Sie können wichtige Zeichen verdecken."],
        ],
        "Richtig. Gute Beobachtung ist die Grundlage jeder Entscheidung.",
      ),
    ],
    quiz: [
      frage("normal", "Was ist beim Pferd normal?", "Trüber, gelblicher Urin", [["Ständig gelblicher Nasenausfluss", "Gelblicher Ausfluss kann auf eine Infektion hinweisen."], ["Ein dauerhaft entlastetes Vorderbein", "Vorderbeine werden normalerweise nicht dauerhaft entlastet – Hinterbeine schon."]], "Genau. Pferdeurin ist oft trüb, das ist normal."),
      frage("schleimhaut", "Welche Farbe haben gesunde Schleimhäute?", "Blassrosa und feucht", [["Weiß und trocken", "Sehr blasse, trockene Schleimhäute sind auffällig."], ["Dunkelrot bis bläulich", "Das ist ein Warnzeichen für Kreislaufprobleme."]], "Richtig. Farbe und Feuchtigkeit zeigen viel über den Kreislauf."),
      frage("notfall", "Was ist ein Notfall?", "Ein Pferd, das sich immer wieder hinlegt, scharrt und zum Bauch schaut", [["Ein Pferd, das nach dem Wälzen staubig ist", "Wälzen allein ist normales Komfortverhalten."], ["Ein Pferd, das mit angewinkeltem Hinterbein döst", "Das ist entspanntes Ruheverhalten."]], "Genau. Das sind typische Kolikzeichen – sofort Tierarzt."),
      frage("aufgabe", "Was ist deine Aufgabe, wenn dein Pferd krank wirkt?", "Beobachten, messen, notieren und den Tierarzt informieren", [["Eine Diagnose stellen", "Die Diagnose stellt der Tierarzt."], ["Im Internet ein passendes Medikament suchen", "Medikamente nur nach tierärztlicher Anweisung."]], "Richtig. Klare Beobachtungen helfen dem Tierarzt am meisten."),
    ],
  },

  /* ---------- 2. PAT-Werte ---------- */
  {
    slug: "puls-atmung-temperatur",
    title: "Puls, Atmung und Temperatur richtig messen",
    speaker: "ben",
    intro:
      "Am Telefon fragt die Tierärztin: „Wie hoch ist der Puls?“ Viele Reiter wissen in diesem Moment nicht, wo sie fühlen sollen. Dabei sind Puls, Atmung und Temperatur – kurz PAT-Werte – die wichtigsten Informationen, die du im Notfall liefern kannst.",
    illustration: tabelle("Normalwerte", "PAT-Werte eines erwachsenen Pferdes in Ruhe", [
      ["Wert", "Normalbereich (Ruhe)"],
      ["Puls", "28–40 Schläge pro Minute"],
      ["Atmung", "8–16 Atemzüge pro Minute"],
      ["Temperatur", "37,5–38,0 °C"],
    ]),
    terms: begriffe(
      ["PAT-Werte", "Puls, Atmung und Temperatur."],
      ["Gesichtsarterie", "Arterie am Unterrand des Unterkiefers, an der man den Puls gut fühlen kann."],
      ["Fieber", "Erhöhte Körpertemperatur durch eine Reaktion des Körpers, oft bei Infektionen. Beim erwachsenen Pferd ab etwa 38,5 °C."],
    ),
    deep: {
      minutes: 9,
      sections: [
        {
          heading: "Die Normalwerte",
          text: "Für ein erwachsenes Pferd in Ruhe gelten als Orientierung: Puls 28 bis 40 Schläge pro Minute, Atmung 8 bis 16 Atemzüge pro Minute, Temperatur 37,5 bis 38,0 °C. Fohlen und junge Pferde haben höhere Werte, Ponys oft etwas höhere Pulsfrequenzen als große Pferde.\n\nNach Arbeit, bei Aufregung, Hitze oder Schmerzen steigen Puls und Atmung. Deshalb misst man in Ruhe, wenn das Pferd mindestens 15 bis 30 Minuten gestanden hat. Wichtig ist, die eigenen Ruhewerte des Pferdes zu kennen – mehrfach messen und aufschreiben.",
        },
        {
          heading: "Puls messen",
          text: "Am einfachsten fühlst du den Puls an der Gesichtsarterie: Sie verläuft am Unterrand des Unterkiefers, etwa dort, wo der Kiefer nach oben abknickt. Lege zwei oder drei Fingerkuppen flach an und drücke leicht gegen den Knochen. Nicht mit dem Daumen fühlen – er hat einen eigenen Puls.\n\nZähle die Schläge 15 Sekunden lang und nimm das Ergebnis mal vier. Wer ein Stethoskop hat, hört das Herz links hinter dem Ellbogen ab; dort sind die Herztöne in Ruhe deutlich zu hören.\n\nEin Ruhepuls über etwa 48 bis 50 Schlägen pro Minute ohne erkennbaren Grund (Arbeit, Aufregung) ist ein Warnzeichen, besonders zusammen mit Unruhe oder Futterverweigerung.",
        },
        {
          heading: "Atmung zählen",
          text: "Stell dich seitlich hinter das Pferd und beobachte Flanke und Bauch. Ein Heben und Senken zählt als ein Atemzug. Bei Kälte kannst du auch die Atemwolke vor den Nüstern zählen. 30 Sekunden zählen, mal zwei.\n\nAchte nicht nur auf die Zahl, sondern auch auf die Art: Normal ist eine ruhige, kaum sichtbare Atmung. Auffällig sind geblähte Nüstern in Ruhe, deutlich angestrengte Bauchatmung, Atemgeräusche, eine Furche entlang des Rippenbogens (Dampfrinne) oder schnelles, flaches Atmen.",
        },
        {
          heading: "Temperatur messen",
          text: "Gemessen wird im After mit einem digitalen Fieberthermometer. So geht es sicher:\n\n1. Pferd von einer zweiten Person halten lassen oder ruhig anbinden.\n2. Seitlich neben die Hinterhand stellen, nicht direkt dahinter, Hand auf die Kruppe legen.\n3. Schweif zur Seite nehmen, Thermometerspitze etwas anfeuchten oder mit Vaseline versehen.\n4. Thermometer leicht schräg zur Seite der Darmwand einführen, bis zum Signalton halten.\n5. Wert ablesen und notieren, Thermometer reinigen.\n\nEin Band mit Klemme am Thermometer, das am Schweifhaar befestigt wird, verhindert, dass es verloren geht. Werte über etwa 38,5 °C gelten beim erwachsenen Pferd als Fieber – rufe den Tierarzt an. Auch Untertemperatur kann ein ernstes Zeichen sein.",
        },
        {
          heading: "Weitere schnelle Checks",
          text: "• Schleimhäute: Lippe hochschieben und Zahnfleisch anschauen. Blassrosa und feucht ist normal.\n• Kapilläre Füllungszeit: Mit dem Finger kurz auf das Zahnfleisch drücken, loslassen und zählen, bis die weiße Stelle wieder rosa ist. Normal: unter etwa zwei Sekunden.\n• Darmgeräusche: Ohr oder Stethoskop an beide Flanken, oben und unten. Ein gesunder Darm gluckert und grummelt regelmäßig. Sehr stille Flanken können ein Warnzeichen sein.\n\nNotiere alle Werte mit Uhrzeit. Bei Verdacht auf Krankheit mehrmals messen, damit der Verlauf erkennbar wird.",
        },
      ],
      praxis: {
        title: "Das Messprotokoll",
        text: "Ben übt mit Mats an Scrabble, nachdem dieser eine Stunde ruhig in der Box gestanden hat. Puls an der Gesichtsarterie: 9 Schläge in 15 Sekunden, also 36. Atmung: 6 Atemzüge in 30 Sekunden, also 12. Temperatur: 37,7 °C. Schleimhäute blassrosa, Füllungszeit unter zwei Sekunden, Darmgeräusche auf beiden Seiten.\n\nSie wiederholen das an drei verschiedenen Tagen und schreiben die Werte auf eine Karte, die im Spind hängt. Als Scrabble Wochen später nach dem Training ungewöhnlich lange schnell atmet, kann Ben der Tierärztin sofort sagen, wie viel das im Vergleich zu seinem Normalwert ist.",
      },
      fehler: fehler(
        ["Direkt nach dem Reiten messen und die Werte für Ruhewerte halten.", "Mindestens 15 bis 30 Minuten Ruhe abwarten."],
        ["Den Puls mit dem Daumen fühlen.", "Zwei bis drei Fingerkuppen verwenden."],
        ["Beim Temperaturmessen direkt hinter dem Pferd stehen.", "Seitlich an der Hinterhand stehen, Hand auf der Kruppe."],
        ["Nur einmal messen, wenn das Pferd krank wirkt.", "Regelmäßig messen und den Verlauf notieren."],
      ),
      richtig: [
        "Pferd ruhig stehen lassen, bis es mindestens 15 bis 30 Minuten nicht gearbeitet hat.",
        "Puls an der Gesichtsarterie 15 Sekunden zählen, mal vier.",
        "Atmung an der Flanke 30 Sekunden zählen, mal zwei – und auf die Art der Atmung achten.",
        "Temperatur sicher im After messen, seitlich stehend.",
        "Schleimhäute, Füllungszeit und Darmgeräusche prüfen.",
        "Alles mit Uhrzeit notieren und bei Auffälligkeiten den Tierarzt informieren.",
      ],
      merke: [
        "Ruhewerte: Puls 28–40, Atmung 8–16, Temperatur 37,5–38,0 °C.",
        "Kenne die eigenen Ruhewerte deines Pferdes.",
        "Ab etwa 38,5 °C hat ein erwachsenes Pferd Fieber.",
        "Werte mit Uhrzeit notieren – der Verlauf ist wichtig.",
      ],
      weiter: weiter(["Der tägliche Gesundheitscheck", "ra-w16-l3"], ["Kolik: Ursachen, Warnzeichen und Notfallmaßnahmen", "ra-w16-l10"], ["Lernvideo „PAT-Werte messen“ (Drehbuch liegt vor)"]),
    },
    exercise: [
      wahl(
        "ra-w16-l2-entscheidung",
        "Du zählst an der Gesichtsarterie in 15 Sekunden 13 Schläge. Das Pferd steht seit einer Stunde ruhig in der Box. Wie ist das einzuordnen?",
        "52 Schläge pro Minute – deutlich erhöht, weitere Zeichen prüfen und den Tierarzt anrufen",
        [
          ["13 Schläge pro Minute – sehr niedrig", "Du musst mit vier multiplizieren: 13 × 4 = 52."],
          ["52 Schläge pro Minute – völlig normal", "In Ruhe liegt der Normalbereich bei 28–40. 52 ist deutlich erhöht."],
        ],
        "Richtig: 13 × 4 = 52. Ein so hoher Ruhepuls kann auf Schmerzen hinweisen.",
      ),
    ],
    quiz: [
      frage("puls", "Wie hoch ist der normale Ruhepuls eines erwachsenen Pferdes?", "28–40 Schläge pro Minute", [["60–80 Schläge pro Minute", "Das wäre in Ruhe deutlich zu hoch."], ["10–15 Schläge pro Minute", "Das wäre zu niedrig."]], "Genau. Ponys liegen oft etwas höher."),
      frage("temp", "Ab welcher Temperatur spricht man beim erwachsenen Pferd von Fieber?", "Ab etwa 38,5 °C", [["Ab 37,5 °C", "37,5 °C ist noch normal."], ["Erst ab 40 °C", "Fieber beginnt deutlich früher."]], "Richtig. Dann den Tierarzt anrufen."),
      frage("wo", "Wo fühlst du den Puls am einfachsten?", "An der Gesichtsarterie am Unterrand des Unterkiefers", [["An der Stirn", "Dort verläuft keine gut tastbare Arterie."], ["Am Widerrist", "Am Widerrist lässt sich der Puls nicht gut fühlen."]], "Genau – mit zwei oder drei Fingerkuppen."),
      frage("crt", "Was ist eine normale kapilläre Füllungszeit?", "Unter etwa zwei Sekunden", [["Über fünf Sekunden", "Das wäre deutlich verlängert und ein Warnzeichen."], ["Genau zehn Sekunden", "Das wäre stark verlängert."]], "Richtig. Eine verlängerte Zeit kann auf Kreislaufprobleme hindeuten."),
      frage("sicher", "Wo stehst du beim Temperaturmessen?", "Seitlich neben der Hinterhand, eine Hand auf der Kruppe", [["Direkt hinter dem Pferd", "Dort bist du in Reichweite der Hufe."], ["Vorne am Kopf", "Von dort erreichst du den After nicht sicher."]], "Genau. So spürst du, wenn das Pferd sich bewegt."),
    ],
  },

  /* ---------- 3. Gesundheitscheck ---------- */
  {
    slug: "gesundheitscheck",
    title: "Der tägliche Gesundheitscheck",
    speaker: "lea",
    intro:
      "Zwei Minuten am Tag reichen, um viele Probleme früh zu erkennen – wenn man jedes Mal dasselbe anschaut. Ein fester Ablauf verhindert, dass man etwas übersieht, nur weil das Pferd „ja eigentlich gut aussieht“.",
    illustration: item("stallbuch"),
    terms: begriffe(
      ["Gesundheitscheck", "Fester täglicher Ablauf, bei dem ein Pferd von Kopf bis Huf angeschaut wird."],
      ["Lahmheit", "Unregelmäßiger, ungleichmäßiger Gang, meist durch Schmerzen."],
      ["Mauke", "Entzündung der Haut in der Fesselbeuge."],
    ),
    deep: {
      minutes: 7,
      sections: [
        {
          heading: "Schritt 1: Aus der Entfernung",
          text: "Bevor du in die Box oder auf den Paddock gehst, schau aus ein paar Metern Abstand:\n\n• Wo steht das Pferd, wie steht es? Gewicht gleichmäßig verteilt?\n• Ist es aufmerksam, interessiert, frisst es?\n• Wie atmet es?\n• Sind Futter und Wasser verbraucht wie sonst?\n• Wie sehen Kotmenge und Kot aus? Gibt es Urin- oder Wälzspuren?\n\nViele Informationen verschwinden, sobald du da bist: Ein Pferd, das sich freut, dich zu sehen, wirkt für einen Moment munterer, als es ist.",
        },
        {
          heading: "Schritt 2: Von Kopf bis Schweif",
          text: "Gehe dann am Pferd entlang:\n\n• Kopf: Augen klar und offen, keine Schwellung, keine Wunden am Kopf oder an der Halfterlage, Nüstern ohne Ausfluss.\n• Hals und Rumpf: Schwellungen, Bisse, Kratzer, Scheuerstellen von Decke oder Ausrüstung?\n• Fell und Haut: Haarausfall, Krusten, Juckreiz?\n• Bauch und Flanken: Ist der Bauch normal gerundet? Bei Stuten Euter, bei Wallachen und Hengsten Schlauch und Hoden auf Schwellungen.\n• Kruppe und Schweif: Kot an den Hinterbacken (Hinweis auf Durchfall)?",
        },
        {
          heading: "Schritt 3: Beine und Hufe",
          text: "Fahre mit beiden Händen an jedem Bein von oben nach unten: Warm, geschwollen, schmerzempfindlich? Vergleiche immer mit dem anderen Bein. Achte auf die Fesselbeuge (Mauke), Sehnen an der Rückseite des Röhrbeins und die Gelenke.\n\nBeim Hufeauskratzen prüfst du: Strahl fest und ohne fauligen Geruch, keine Fremdkörper, Eisen fest, keine abgebrochenen Hufwände. Lege die Hand an die Hufwand: Ein Huf, der deutlich wärmer ist als die anderen, ist auffällig. Fühle bei Verdacht auch die Zehenarterie seitlich an der Fessel; ein deutlich pochender Puls dort ist ein Warnzeichen, etwa bei Hufrehe oder Hufabszess.",
        },
        {
          heading: "Schritt 4: Bewegung und Dokumentation",
          text: "Wenn du das Pferd ohnehin aus der Box holst, schau ihm beim Führen zu: Geht es gleichmäßig auf allen vier Beinen? Nickt es mit dem Kopf? Tritt es vorsichtig auf?\n\nNotiere Auffälligkeiten – auch kleine – mit Datum. Eine kleine Schwellung, die drei Tage hintereinander da ist, hat eine andere Bedeutung als eine, die morgen verschwunden ist. Fotos helfen beim Vergleich und beim Gespräch mit dem Tierarzt.",
        },
      ],
      praxis: {
        title: "Der Kratzer, der keiner war",
        text: "Lea macht ihren Morgencheck bei Tivoli. Am linken Hinterbein findet sie in der Fesselbeuge eine kleine, krustige Stelle. Sie fotografiert sie und schreibt sie auf die Stalltafel. Am nächsten Tag ist die Stelle größer und leicht nässend, das Bein etwas warm.\n\nHanna ruft die Tierärztin. Diagnose: beginnende Mauke. Weil sie so früh erkannt wurde, reicht eine kurze Behandlung nach tierärztlicher Anweisung, und Tivoli steht in dieser Zeit auf trockenem Boden.",
      },
      fehler: fehler(
        ["Das Pferd nur anschauen, wenn man es reiten will.", "Täglich einen kurzen Check machen, auch an reitfreien Tagen."],
        ["Jedes Mal in anderer Reihenfolge schauen.", "Immer denselben Ablauf nutzen, damit nichts vergessen wird."],
        ["Ein warmes Bein nicht mit dem anderen vergleichen.", "Immer beide Seiten vergleichen."],
        ["Kleine Veränderungen nicht notieren.", "Mit Datum und Foto festhalten."],
      ),
      richtig: [
        "Aus der Entfernung: Stand, Verhalten, Atmung, Futter, Wasser, Kot.",
        "Am Pferd: Kopf, Augen, Nüstern, Hals, Rumpf, Haut, Bauch, Kruppe.",
        "Beine abtasten und mit der Gegenseite vergleichen.",
        "Hufe auskratzen und auf Wärme, Geruch und Fremdkörper prüfen.",
        "Beim Führen auf gleichmäßigen Gang achten.",
        "Auffälligkeiten mit Datum notieren und weitergeben.",
      ],
      merke: [
        "Immer derselbe Ablauf: Entfernung, Kopf bis Schweif, Beine und Hufe, Bewegung.",
        "Beine immer mit der Gegenseite vergleichen.",
        "Kleine Veränderungen notieren – der Verlauf zählt.",
        "Ein warmer Huf mit pochender Zehenarterie ist ein Warnzeichen.",
      ],
      weiter: weiter(["Hufe auskratzen", "ra-w10-l2"], ["Lahmheit erkennen", "ra-w16-l12"], ["Lernvideo „Gesundheitscheck am Pferd“ (Drehbuch liegt vor)"]),
    },
    exercise: [
      wahl(
        "ra-w16-l3-entscheidung",
        "Beim Check ist das rechte Vorderbein unterhalb des Fesselgelenks warm und leicht geschwollen. Das linke ist kühl. Das Pferd geht klar. Was tust du?",
        "Notieren, fotografieren, in einigen Stunden erneut prüfen und den Tierarzt fragen, wenn es bleibt oder schlimmer wird",
        [
          ["Ignorieren, das Pferd lahmt ja nicht", "Eine einseitige Schwellung kann der Anfang einer Verletzung oder Entzündung sein."],
          ["Eine Stunde kräftig longieren, damit es abschwillt", "Belastung kann eine Verletzung verschlimmern."],
        ],
        "Genau. Vergleichen, festhalten, beobachten – und bei Verschlechterung tierärztlich abklären.",
      ),
    ],
    quiz: [
      frage("entfernung", "Warum beginnt der Check aus der Entfernung?", "Weil sich viele Pferde verändern, sobald ein Mensch kommt", [["Weil man sonst gebissen wird", "Es geht um unverfälschte Beobachtung."], ["Weil es schneller geht", "Der Grund ist, dass du das Pferd unbeobachtet siehst."]], "Richtig. Aus der Entfernung siehst du das echte Verhalten."),
      frage("bein", "Wie beurteilst du, ob ein Bein warm ist?", "Im Vergleich mit dem Bein der Gegenseite", [["Mit einem Fieberthermometer", "Am Bein misst man keine Temperatur – man vergleicht mit der Hand."], ["Gar nicht, das ist unwichtig", "Wärme kann auf eine Entzündung hinweisen."]], "Genau. Unterschiede sind entscheidend."),
      frage("huf", "Was kann ein deutlich pochender Puls an der Zehenarterie bedeuten?", "Eine Entzündung im Huf, z. B. Hufrehe oder Abszess", [["Dass das Pferd gut durchblutet und gesund ist", "Ein deutlich pochender Puls im Huf ist ein Warnzeichen."], ["Dass das Hufeisen locker ist", "Ein lockeres Eisen erkennt man anders."]], "Richtig. Dann den Tierarzt anrufen."),
      frage("notieren", "Warum notierst du auch kleine Auffälligkeiten?", "Weil der Verlauf zeigt, ob etwas harmlos ist oder sich verschlechtert", [["Damit der Stall weiß, dass du da warst", "Es geht um die Gesundheit des Pferdes."], ["Das ist überflüssig", "Gerade kleine Veränderungen sind wichtige Frühzeichen."]], "Genau. Mit Datum und Foto ist der Vergleich leicht."),
    ],
  },

  /* ---------- 4. Hufaufbau ---------- */
  {
    slug: "aufbau-des-hufs",
    title: "Aufbau und Funktion des Pferdehufs",
    speaker: "ben",
    intro:
      "„Ohne Huf kein Pferd“ – diesen Satz hört man in jedem Stall. Ein Pferd trägt sein ganzes Gewicht auf vier Hufen, die zusammen kaum größer sind als zwei Teller. Wie schafft der Huf das – und warum ist er so empfindlich?",
    illustration: item("huf"),
    terms: begriffe(
      ["Hufkapsel", "Äußere Hornschicht aus Wand, Sohle und Strahl."],
      ["Huflederhaut", "Gut durchblutete, empfindliche Schicht unter dem Horn; sie ernährt das Horn und verbindet es mit dem Hufbein."],
      ["Weiße Linie", "Verbindungszone zwischen Hufwand und Sohle, von unten als heller Streifen sichtbar."],
      ["Hufmechanismus", "Leichte Formveränderung des Hufs beim Auffußen, die Stöße dämpft und die Durchblutung fördert."],
    ),
    deep: {
      minutes: 8,
      sections: [
        {
          heading: "Außen: die Hufkapsel",
          text: "Von außen siehst du die Hufwand, die vom Kronrand nach unten wächst. Sie besteht aus Horn, ähnlich wie unsere Fingernägel, nur viel dicker. Von unten erkennst du die Sohle, den keilförmigen Strahl in der Mitte, die Eckstreben und hinten die Ballen.\n\nDie weiße Linie verbindet Hufwand und Sohle. Sie ist eine Schwachstelle: Hier dringen Schmutz und Keime ein, und hier setzt der Hufschmied beim Beschlag die Nägel.\n\nDie Hufwand wächst etwa 8 bis 10 mm pro Monat. Vom Kronrand bis zum Tragrand an der Zehe braucht das Horn deshalb rund ein Jahr. Was heute an der Krone passiert – etwa eine Verletzung oder eine Erkrankung –, sieht man Monate später noch als Ring oder Riss.",
        },
        {
          heading: "Innen: Knochen, Lederhaut und Polster",
          text: "In der Hufkapsel liegen das Hufbein, das Strahlbein und der untere Teil des Kronbeins. Das Hufbein ist über die Huflederhaut mit der Hufwand verbunden – mit Tausenden feiner, ineinandergreifender Blättchen. Diese Verbindung trägt das Gewicht des Pferdes.\n\nDie Huflederhaut ist gut durchblutet und sehr schmerzempfindlich. Deshalb tut es weh, wenn ein Nagel zu tief sitzt oder ein Stein Druck auf die Sohle ausübt. Hinter dem Hufbein liegen das Strahlpolster und die Hufknorpel, die Stöße abfangen.\n\nBei der Hufrehe entzündet sich die Verbindung zwischen Lederhaut und Hufwand. Im schlimmsten Fall löst sich das Hufbein und senkt oder dreht sich – deshalb ist Hufrehe ein Notfall.",
        },
        {
          heading: "Der Hufmechanismus",
          text: "Beim Auffußen weitet sich der Huf hinten leicht, die Sohle senkt sich ein wenig, der Strahl bekommt Bodenkontakt. Beim Abheben zieht sich alles wieder zusammen. Dieser Hufmechanismus dämpft Stöße und wirkt wie eine Pumpe für das Blut in Huf und Bein.\n\nDamit er funktioniert, braucht ein Pferd Bewegung – möglichst viel und auf unterschiedlichem Untergrund. Ein Pferd, das viel steht, hat eine schlechtere Hufdurchblutung, und auch die Hornqualität leidet.",
        },
        {
          heading: "Was den Huf gesund hält",
          text: "Gute Hufe entstehen aus mehreren Faktoren: regelmäßige, fachgerechte Bearbeitung (meist alle sechs bis acht Wochen), viel Bewegung, trockene und saubere Standflächen, ausgewogene Fütterung, tägliches Auskratzen und Kontrolle. Die Hornqualität ist zum Teil auch erblich.\n\nDauernasse oder mistige Böden weichen das Horn auf und fördern Strahlfäule. Sehr trockene Bedingungen machen das Horn spröde. Ölen und Fetten verbessern die Hornqualität nach heutigem Wissen kaum; wichtiger sind Haltung, Fütterung und Bearbeitung.",
        },
      ],
      praxis: {
        title: "Der Ring im Huf",
        text: "Mila entdeckt bei Tonga auf allen Hufen einen waagerechten Ring etwa in der Mitte der Hufwand. Sie fragt Mats, was das bedeutet. Mats rechnet zurück: Die Wand wächst etwa einen Zentimeter pro Monat, der Ring liegt rund vier Zentimeter unter dem Kronrand – also ist er vor ungefähr vier Monaten entstanden. Damals hatte Tonga nach dem Anweiden eine Phase mit weichem Kot.\n\nDer Hufschmied bestätigt: Solche Ringe zeigen oft eine Veränderung in Fütterung oder Gesundheit an. Er empfiehlt, beim nächsten Tierarzttermin darauf hinzuweisen. Ringe, die an der Zehe enger beieinanderliegen als an den Trachten, können ein Hinweis auf eine frühere Hufrehe sein.",
      },
      fehler: fehler(
        ["Den Huf für einen „toten Klotz“ halten.", "Er ist ein lebendiges, gut durchblutetes Organ mit Mechanik."],
        ["Hufe regelmäßig einfetten statt auf Haltung und Fütterung zu achten.", "Bewegung, trockene Böden, Fütterung und Bearbeitung zählen mehr."],
        ["Den Strahl beim Auskratzen tief ausschneiden.", "Strahl schneidet nur der Fachmann; du kratzt nur aus."],
        ["Hufbearbeitung nach Gefühl verschieben.", "Feste Intervalle, meist alle sechs bis acht Wochen."],
      ),
      richtig: [
        "Lerne die Teile von unten kennen: Wand, Sohle, Strahl, weiße Linie, Eckstreben, Ballen.",
        "Kratze täglich aus und prüfe Geruch, Fremdkörper und Wärme.",
        "Achte auf trockene, saubere Standflächen.",
        "Sorge für viel Bewegung.",
        "Halte die Termine beim Hufschmied oder Hufbearbeiter ein.",
        "Melde Ringe, Risse oder Veränderungen dem Fachmann.",
      ],
      merke: [
        "Der Huf ist ein lebendes Organ – innen gut durchblutet und schmerzempfindlich.",
        "Die Hufwand wächst rund 8–10 mm pro Monat.",
        "Der Hufmechanismus braucht Bewegung.",
        "Die Verbindung von Hufbein und Hufwand trägt das ganze Gewicht – bei Hufrehe ist sie gefährdet.",
      ],
      weiter: weiter(["Hufpflege, Barhuf und Beschlag", "ra-w16-l5"], ["Hufkrankheiten", "ra-w16-l6"], ["Das Verdauungssystem verstehen", "ra-w15-l5"]),
    },
    exercise: [
      wahl(
        "ra-w16-l4-entscheidung",
        "Ein Ring liegt 3 cm unterhalb des Kronrands. Wann ist er ungefähr entstanden, wenn die Hufwand etwa 1 cm pro Monat wächst?",
        "Vor etwa drei Monaten",
        [
          ["Gestern", "Ein Ring entsteht am Kronrand und wächst dann nach unten."],
          ["Vor etwa einem Jahr", "Dann läge er schon fast am Tragrand."],
        ],
        "Richtig. So kann man Hufveränderungen zeitlich einordnen.",
      ),
    ],
    quiz: [
      frage("lederhaut", "Warum tut ein Stein unter der Sohle weh?", "Weil darunter die empfindliche, gut durchblutete Huflederhaut liegt", [["Weil das Horn Nerven hat", "Das Horn selbst ist nicht schmerzempfindlich, die Lederhaut darunter schon."], ["Das tut gar nicht weh", "Druck auf die Sohle kann sehr schmerzhaft sein."]], "Genau. Darum ist auch Hufrehe so schmerzhaft."),
      frage("wachstum", "Wie schnell wächst die Hufwand ungefähr?", "Etwa 8–10 mm pro Monat", [["Etwa 1 cm pro Woche", "Das wäre viel zu schnell."], ["Etwa 1 mm pro Jahr", "Das wäre viel zu langsam."]], "Richtig. Von der Krone bis zur Zehe dauert es rund ein Jahr."),
      frage("mechanismus", "Was braucht der Hufmechanismus, um gut zu funktionieren?", "Bewegung", [["Hufschuhe rund um die Uhr", "Hufschuhe sind für bestimmte Situationen sinnvoll, ersetzen aber keine Bewegung."], ["Möglichst viel Huföl", "Öl hat kaum Einfluss auf die Mechanik."]], "Genau. Bewegung fördert Dämpfung und Durchblutung."),
      frage("weisse-linie", "Was ist die weiße Linie?", "Die Verbindungszone zwischen Hufwand und Sohle", [["Ein Zeichen für Krankheit", "Sie ist bei jedem Huf vorhanden."], ["Die Mitte des Strahls", "Der Strahl ist der keilförmige Teil in der Mitte."]], "Richtig. Sie ist eine wichtige Schwachstelle für Keime."),
    ],
  },

  /* ---------- 5. Hufpflege, Barhuf, Beschlag ---------- */
  {
    slug: "hufpflege-barhuf-beschlag",
    title: "Hufpflege, Barhuf und Beschlag",
    speaker: "mila",
    intro:
      "„Barhuf ist natürlicher!“ – „Ohne Eisen geht mein Pferd auf Schotter nicht!“ Bei kaum einem Thema wird im Stall so leidenschaftlich gestritten. Die sachliche Antwort: Es kommt auf das Pferd, seine Hufe, die Haltung und die Nutzung an.",
    illustration: item("hufeisen"),
    terms: begriffe(
      ["Hufbeschlagschmied", "In Deutschland staatlich geprüfter Beruf für Hufbearbeitung und Beschlag."],
      ["Barhuf", "Huf ohne Eisen, regelmäßig bearbeitet."],
      ["Hufschuh", "Abnehmbarer Schutz, z. B. für Ausritte auf hartem Untergrund."],
      ["Strahlfäule", "Bakterielle Zersetzung des Strahlhorns mit fauligem Geruch."],
    ),
    deep: {
      minutes: 8,
      sections: [
        {
          heading: "Tägliche Hufpflege",
          text: "Hufe werden täglich und vor sowie nach dem Reiten ausgekratzt – immer von der Ferse zur Zehe, damit du nicht in die empfindliche Strahlfurche stichst. Dabei prüfst du: Fremdkörper, Steine, Nägel? Riecht der Strahl faulig? Sitzt das Eisen fest, stehen Nägel heraus? Gibt es Risse oder ausgebrochene Wände?\n\nKommt ein Pferd von einer nassen Weide, sollten die Hufe in einem sauberen, trockenen Stall abtrocknen können. Bei Dauernässe hilft eine trockene Fläche mehr als jedes Pflegemittel.",
        },
        {
          heading: "Regelmäßige Bearbeitung",
          text: "Ob mit oder ohne Eisen: Hufe werden in regelmäßigen Abständen von einer Fachperson bearbeitet – meist alle sechs bis acht Wochen, bei manchen Pferden öfter. Wachsen Hufe zu lang, ändern sich Winkel und Belastung von Sehnen und Gelenken; die Zehe wird lang, die Trachten werden flach.\n\nIn Deutschland ist der Hufbeschlagschmied ein staatlich geregelter Beruf. Daneben gibt es Hufbearbeiter mit anderen Ausbildungen, vor allem für Barhufpferde. Wichtig ist, dass die Person nachweislich gut ausgebildet ist und mit Tierarzt und Besitzer zusammenarbeitet.",
        },
        {
          heading: "Barhuf",
          text: "Viele Freizeitpferde laufen gut barhuf, wenn ihre Hufe gesund sind, der Untergrund passt und sie regelmäßig bearbeitet werden. Vorteile: Der Hufmechanismus arbeitet frei, das Pferd spürt den Boden, Verletzungsgefahr durch Eisen beim Spielen in der Gruppe sinkt, Kosten sind geringer.\n\nGrenzen: Auf Schotter oder Asphalt, bei viel Arbeit oder bei dünner Sohle kann sich der Huf schneller abnutzen, als er nachwächst, und das Pferd geht klamm. Hufschuhe sind dann eine Lösung für Ausritte. Die Umstellung von Eisen auf Barhuf braucht Zeit, Geduld und fachliche Begleitung.",
        },
        {
          heading: "Beschlag",
          text: "Hufeisen schützen vor Abrieb und können orthopädisch wirken, etwa bei bestimmten Fehlstellungen oder Erkrankungen nach tierärztlicher Anweisung. Für Sportpferde, Pferde mit viel Arbeit auf hartem Boden oder mit schwachem Horn sind sie oft sinnvoll.\n\nNachteile: Der Hufmechanismus wird eingeschränkt, Nagellöcher schwächen die Wand, und ein lockeres Eisen kann zu Verletzungen führen. Stollen geben Halt auf rutschigem Boden, erhöhen aber die Belastung der Gelenke und das Verletzungsrisiko; sie gehören nur bei Bedarf und nur für die Arbeit ins Eisen.\n\nEin Eisen ist locker oder verschoben? Nicht selbst abreißen, wenn du es nicht gelernt hast – Pferd nicht reiten und den Hufschmied anrufen.",
        },
      ],
      praxis: {
        title: "Scrabble und der Schotterweg",
        text: "Scrabble läuft seit zwei Jahren barhuf und geht auf dem Reitplatz und den Wiesenwegen klar. Auf einem neuen Ausrittweg mit grobem Schotter geht er plötzlich vorsichtig und tritt kurz. Wilhelm fragt den Hufbearbeiter. Der schaut sich die Hufe an: gesund, aber die Sohle ist für diesen Untergrund zu dünn.\n\nSeitdem trägt Scrabble für Ausritte über Schotter Hufschuhe, die vorher angepasst wurden. Auf dem Platz und auf der Weide bleibt er barhuf.",
      },
      fehler: fehler(
        ["Von der Zehe zur Ferse auskratzen.", "Immer von der Ferse zur Zehe."],
        ["Barhuf oder Beschlag als Glaubensfrage sehen.", "Pferd, Huf, Untergrund und Nutzung entscheiden."],
        ["Die Bearbeitung um Wochen verschieben, weil der Huf „noch geht“.", "Feste Intervalle einhalten."],
        ["Ein lockeres Eisen dranlassen und weiterreiten.", "Nicht reiten, Hufschmied anrufen."],
      ),
      richtig: [
        "Kratze täglich und vor und nach dem Reiten aus – von der Ferse zur Zehe.",
        "Prüfe Strahl, Wand, Eisen und Nägel.",
        "Plane die Bearbeitung in festen Abständen.",
        "Entscheide mit Fachleuten, ob Barhuf, Hufschuh oder Beschlag passt.",
        "Bei lockerem Eisen: nicht reiten, Hufschmied informieren.",
      ],
      merke: [
        "Hufe täglich auskratzen, immer von der Ferse zur Zehe.",
        "Bearbeitung meist alle sechs bis acht Wochen.",
        "Barhuf oder Beschlag hängt von Pferd, Huf, Boden und Nutzung ab.",
        "Lockeres Eisen: nicht reiten, Fachmann rufen.",
      ],
      weiter: weiter(["Hufe auskratzen", "ra-w10-l2"], ["Hufkrankheiten", "ra-w16-l6"], ["Lernvideo „Hufe richtig auskratzen“ (Drehbuch liegt vor)"]),
    },
    exercise: [
      wahl(
        "ra-w16-l5-entscheidung",
        "Vor dem Reiten siehst du, dass ein Hufeisen vorn verschoben ist und ein Nagel heraussteht. Was tust du?",
        "Nicht reiten, das Pferd vorsichtig in die Box bringen und den Hufschmied anrufen",
        [
          ["Kurz reiten, nach der Stunde rufst du den Schmied", "Ein verschobenes Eisen kann Verletzungen verursachen. Nicht reiten."],
          ["Das Eisen mit der Zange selbst abreißen", "Ohne Ausbildung kann dabei die Hufwand stark beschädigt werden."],
        ],
        "Richtig. Sicherheit geht vor – das Eisen gehört in Fachhände.",
      ),
    ],
    quiz: [
      frage("auskratzen", "In welche Richtung kratzt du Hufe aus?", "Von der Ferse zur Zehe", [["Von der Zehe zur Ferse", "So kannst du in die empfindlichen Ballen rutschen."], ["Von innen nach außen in Kreisen", "Die Richtung Ferse–Zehe ist am sichersten."]], "Genau. So stichst du nicht in die Strahlfurche."),
      frage("intervall", "Wie oft werden Hufe meist bearbeitet?", "Alle sechs bis acht Wochen", [["Einmal im Jahr", "Das ist viel zu selten."], ["Jeden Tag", "Bearbeitung ist Fachsache in größeren Abständen; täglich wird nur ausgekratzt."]], "Richtig. Manche Pferde brauchen kürzere Abstände."),
      frage("barhuf", "Wann kann ein Hufschuh sinnvoll sein?", "Bei Ausritten auf hartem, steinigem Untergrund für Barhufpferde", [["Rund um die Uhr in der Box", "Hufschuhe sind für bestimmte Situationen gedacht."], ["Statt der Hufbearbeitung", "Auch mit Hufschuh muss der Huf bearbeitet werden."]], "Genau. So bleibt das Pferd barhuf und ist trotzdem geschützt."),
      frage("stollen", "Was gilt für Stollen im Hufeisen?", "Nur bei Bedarf und nur für die Arbeit, weil sie Gelenke belasten und das Verletzungsrisiko erhöhen", [["Sie gehören immer ins Eisen", "Stollen haben Nachteile und werden gezielt eingesetzt."], ["Sie schonen die Gelenke", "Im Gegenteil – sie erhöhen die Belastung."]], "Richtig. Auf der Weide haben Stollen nichts zu suchen."),
    ],
  },
];
