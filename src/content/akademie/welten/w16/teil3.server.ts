import "server-only";
import { item } from "../../build";
import { begriffe, fehler, frage, tabelle, wahl, weiter, type DeepInput } from "../deep-kit";

/** Modul 11, Lektionen 10–14 */
export const teil3: DeepInput[] = [
  /* ---------- 10. Kolik ---------- */
  {
    slug: "kolik",
    title: "Kolik: Ursachen, Warnzeichen und Notfallmaßnahmen",
    speaker: "mila",
    intro:
      "„Kolik“ ist keine Diagnose, sondern ein Sammelbegriff für Bauchschmerzen. Dahinter kann eine leichte Verkrampfung stecken – oder eine Darmverschlingung, die nur eine Operation retten kann. Von außen ist das am Anfang oft nicht zu unterscheiden. Deshalb ist jede Kolik ein Fall für den Tierarzt.",
    illustration: tabelle("Kolik", "Warnzeichen", [
      ["Leicht", "Deutlich", "Schwer"],
      ["frisst schlechter, wenig Kot", "scharrt, schaut zum Bauch", "wälzt sich heftig, wirft sich hin"],
      ["döst ungewöhnlich, gähnt", "legt sich hin und steht auf", "schwitzt stark, Puls über 60"],
      ["streckt sich wie zum Urinieren", "tritt gegen den Bauch", "Schleimhäute dunkel oder bläulich"],
    ]),
    terms: begriffe(
      ["Kolik", "Sammelbegriff für Schmerzen im Bauchraum, meist vom Magen-Darm-Trakt ausgehend."],
      ["Verstopfungskolik", "Kolik durch festsitzenden Darminhalt, häufig im Dickdarm."],
      ["Krampfkolik", "Kolik durch verkrampfte Darmabschnitte."],
      ["Verlagerung / Verschlingung", "Ein Darmabschnitt liegt falsch oder ist verdreht – oft nur operativ zu behandeln."],
    ),
    deep: {
      minutes: 10,
      sections: [
        {
          heading: "Warum Pferde so anfällig sind",
          text: "Der Verdauungstrakt des Pferdes ist lang, hat enge Stellen und große, frei bewegliche Darmabschnitte. Pferde können nicht erbrechen. Dazu kommen Risikofaktoren aus der Haltung: plötzliche Futterwechsel, viel Kraftfutter, schlechtes Raufutter, zu wenig Wasser (vor allem im Winter), lange Fresspausen, Bewegungsmangel, Zahnprobleme, Parasiten, Stress oder Stallwechsel.\n\nViele Koliken sind leicht und lassen sich tierärztlich gut behandeln. Ein Teil ist aber lebensbedrohlich. Je früher ein Tierarzt untersucht, desto besser sind die Chancen – auch für eine eventuell nötige Operation in einer Klinik.",
        },
        {
          heading: "Warnzeichen erkennen",
          text: "Frühe, leichte Zeichen werden oft übersehen: Das Pferd frisst schlechter oder gar nicht, setzt weniger Kot ab, döst ungewöhnlich, gähnt häufig, streckt sich wie zum Urinieren, steht abseits.\n\nDeutlichere Zeichen: Scharren, Umschauen zum Bauch, Treten gegen den Bauch, häufiges Hinlegen und Aufstehen, Liegen in Seitenlage, Flehmen, Schwitzen.\n\nSchwere Zeichen: heftiges Wälzen, Sich-fallen-Lassen, starkes Schwitzen, Puls über 60, dunkle oder bläuliche Schleimhäute, verlängerte Füllungszeit, aufgeblähter Bauch, Teilnahmslosigkeit nach starken Schmerzen.\n\nAchtung: Ein Pferd, das plötzlich ruhig wird, nachdem es starke Schmerzen hatte, ist nicht unbedingt auf dem Weg der Besserung.",
        },
        {
          heading: "Sofortmaßnahmen",
          text: "1. Eigenschutz: Ein Pferd mit Kolikschmerzen kann sich plötzlich hinwerfen. Nicht in eine Box gehen, in der sich ein Pferd heftig wälzt; nie neben oder hinter einem liegenden Pferd knien.\n2. Tierarzt sofort anrufen. Durchgeben: Was du beobachtest, seit wann, PAT-Werte, Schleimhäute, Kot, letzte Fütterung, Vorerkrankungen.\n3. Futter wegnehmen. Ob das Pferd Wasser behalten darf, sagt dir der Tierarzt.\n4. Pferd beobachten und Werte regelmäßig notieren.\n5. Führen im Schritt kann ein unruhiges Pferd ablenken und verhindern, dass es sich in der Box gefährlich wälzt. Erzwungenes, stundenlanges Führen hilft nicht. Ein ruhig liegendes Pferd darf liegen.\n6. Keine Medikamente ohne tierärztliche Anweisung. Schmerzmittel können Zeichen verdecken, die der Tierarzt für seine Entscheidung braucht.\n7. Transport in die Klinik vorbereiten: Wer fährt? Hänger bereit? Equidenpass?",
        },
        {
          heading: "Vorbeugen",
          text: "Die meisten Risikofaktoren lassen sich beeinflussen:\n\n• Raufutterbasierte Fütterung, kurze Fresspausen, hygienisch einwandfreies Futter\n• Futterwechsel langsam über ein bis zwei Wochen\n• Ständig Zugang zu Wasser, im Winter frostfrei und gern temperiert\n• Tägliche Bewegung\n• Regelmäßige Zahnkontrolle und Parasitenmanagement\n• Kraftfutter nur bei Bedarf und in kleinen Portionen\n• Ruhige Abläufe bei Stallwechsel, Transport und Turnieren\n\nUnd: das Normalbild des Pferdes kennen, um frühe Zeichen zu bemerken.",
        },
      ],
      praxis: {
        title: "Kolik am Sonntagabend",
        text: "Am Sonntagabend liegt Scrabble in der Box, steht auf, legt sich wieder hin und schaut zum Bauch. Wilhelm bleibt vor der Box, misst durch die Tür den Puls nicht – das wäre zu gefährlich –, sondern ruft sofort die Tierärztin an und beschreibt: seit etwa 20 Minuten, wiederholtes Hinlegen, schwitzt am Hals, kaum Kot seit dem Mittag, Heu nicht aufgefressen.\n\nAls Scrabble kurz ruhig steht, misst Wilhelm mit Hanna gemeinsam: Puls 56, Schleimhäute rosa. Die Tierärztin bittet, ihn bis zu ihrer Ankunft im Schritt zu führen, wenn er sich wälzen will. Bei der Untersuchung findet sie eine Verstopfung im Dickdarm, die sie gut behandeln kann. Die Fütterung wird danach überprüft.",
      },
      fehler: fehler(
        ["Abwarten, ob es von allein besser wird.", "Bei Kolikzeichen sofort den Tierarzt anrufen."],
        ["Selbst ein Schmerzmittel geben.", "Medikamente nur nach tierärztlicher Anweisung."],
        ["In die Box zu einem sich heftig wälzenden Pferd gehen.", "Eigenschutz geht vor – von außen beobachten."],
        ["Das Pferd stundenlang im Trab longieren.", "Höchstens ruhiges Führen im Schritt, wenn der Tierarzt es empfiehlt."],
      ),
      richtig: [
        "Kenne die frühen Zeichen: weniger fressen, weniger Kot, Dösen, Gähnen, Strecken.",
        "Achte auf Eigenschutz, besonders bei heftigem Wälzen.",
        "Rufe den Tierarzt sofort an und gib konkrete Beobachtungen und Werte durch.",
        "Nimm das Futter weg und frag den Tierarzt nach dem Wasser.",
        "Führe nur im Schritt und nur, wenn es dem Pferd hilft.",
        "Gib keine Medikamente ohne Anweisung und bereite einen möglichen Transport vor.",
      ],
      merke: [
        "Jede Kolik ist ein Fall für den Tierarzt.",
        "Frühe Zeichen sind oft leise: weniger fressen, weniger Kot, Unruhe.",
        "Eigenschutz zuerst – ein Kolikpferd kann sich plötzlich hinwerfen.",
        "Keine Medikamente ohne tierärztliche Anweisung.",
      ],
      weiter: weiter(["Das Verdauungssystem verstehen", "ra-w15-l5"], ["Puls, Atmung und Temperatur messen", "ra-w16-l2"], ["Erste Hilfe und Verhalten im Notfall", "ra-w16-l16"], ["Lernvideo „Koliksymptome erkennen“ (Drehbuch liegt vor)"]),
    },
    exercise: [
      wahl(
        "ra-w16-l10-entscheidung",
        "Dein Pferd scharrt, legt sich hin, steht wieder auf und schaut zum Bauch. Was tust du zuerst?",
        "Tierarzt sofort anrufen, Futter wegnehmen, auf Eigenschutz achten",
        [
          ["Eine Stunde abwarten und dann entscheiden", "Bei Kolik zählt jede Minute. Früh anrufen."],
          ["Kolikmittel aus der Stallapotheke geben", "Medikamente nur nach tierärztlicher Anweisung. Sie können Zeichen verdecken."],
          ["Kräftig longieren, damit sich der Darm bewegt", "Starke Belastung hilft nicht und kann schaden."],
        ],
        "Richtig. Das sind deutliche Kolikzeichen – sofort tierärztlich abklären.",
      ),
    ],
    quiz: [
      frage("frueh", "Welches ist ein frühes, leicht übersehenes Kolikzeichen?", "Das Pferd frisst schlechter und setzt weniger Kot ab", [["Das Pferd wiehert zur Fütterung", "Das ist normales Verhalten."], ["Das Pferd wälzt sich einmal nach dem Reiten", "Einmaliges Wälzen ist normales Komfortverhalten."]], "Genau. Frühe Zeichen sind oft leise."),
      frage("medikament", "Warum gibst du kein Schmerzmittel ohne Anweisung?", "Weil es Zeichen verdecken kann, die der Tierarzt für seine Entscheidung braucht", [["Weil Pferde keine Schmerzmittel vertragen", "Das ist nicht der Grund."], ["Weil es dann zu schnell wirkt", "Es geht um die Beurteilung durch den Tierarzt."]], "Richtig. Vielleicht muss entschieden werden, ob eine Operation nötig ist."),
      frage("eigenschutz", "Was gilt für den Eigenschutz?", "Nicht in eine Box gehen, in der sich ein Pferd heftig wälzt", [["Sich neben das liegende Pferd knien und es beruhigen", "Ein Kolikpferd kann plötzlich aufspringen oder sich werfen."], ["Das Pferd mit Gewalt am Hinlegen hindern", "Das bringt dich in große Gefahr."]], "Genau. Erst Sicherheit, dann Hilfe."),
      frage("ruhig", "Ein Pferd mit starken Kolikschmerzen wird plötzlich ganz ruhig. Was bedeutet das?", "Nicht unbedingt Besserung – der Tierarzt muss es weiterhin untersuchen", [["Die Kolik ist sicher vorbei", "Plötzliche Ruhe nach starken Schmerzen kann auch ein schlechtes Zeichen sein."], ["Das Pferd ist eingeschlafen, also alles gut", "Ohne Untersuchung lässt sich das nicht beurteilen."]], "Richtig. Tierarzt nicht abbestellen."),
    ],
  },

  /* ---------- 11. Schlundverstopfung ---------- */
  {
    slug: "schlundverstopfung",
    title: "Schlundverstopfung erkennen und richtig reagieren",
    speaker: "ben",
    intro:
      "Ein Pferd hustet und würgt nach dem Füttern, aus beiden Nüstern läuft grünlicher Brei. Viele denken an eine Erkältung oder an Kolik. Tatsächlich steckt Futter in der Speiseröhre fest – eine Schlundverstopfung.",
    illustration: item("eimer"),
    terms: begriffe(
      ["Schlund", "Speiseröhre; Verbindung zwischen Maul und Magen."],
      ["Schlundverstopfung", "Futter bleibt in der Speiseröhre stecken."],
      ["Aspiration", "Futter oder Flüssigkeit gelangt in die Luftröhre und Lunge – Gefahr einer Lungenentzündung."],
    ),
    deep: {
      minutes: 6,
      sections: [
        {
          heading: "Was passiert",
          text: "Bei einer Schlundverstopfung bleibt Futter in der Speiseröhre stecken. Das Pferd kann weiter atmen, weil die Luftröhre frei ist, aber nicht mehr schlucken. Speichel und Futterbrei laufen deshalb aus Maul und Nüstern.\n\nHäufige Ursachen: hastiges Schlingen, trocken gefütterte Pellets oder Rübenschnitzel, die erst im Schlund aufquellen, große Stücke wie ganze Äpfel oder Möhren, Zahnprobleme, Erschöpfung oder Sedierung. Besonders gefährdet sind gierige Fresser und ältere Pferde mit schlechten Zähnen.",
        },
        {
          heading: "Woran du sie erkennst",
          text: "• Futterbrei, Speichel und Wasser laufen aus beiden Nüstern und dem Maul\n• Husten, Würgen, wiederholte Schluckversuche\n• Das Pferd streckt Hals und Kopf, wirkt unruhig oder ängstlich\n• Manchmal ist links am Hals eine Verdickung zu sehen oder zu fühlen\n• Das Pferd hört auf zu fressen, schwitzt eventuell\n\nVon einer Kolik unterscheidet sich die Schlundverstopfung vor allem durch den Ausfluss aus den Nüstern direkt nach dem Fressen.",
        },
        {
          heading: "Was du tust – und was nicht",
          text: "1. Futter und Wasser sofort entfernen, auch Einstreu, die das Pferd fressen könnte (zur Not auf einen leeren Paddock oder einen Platz ohne Futter stellen).\n2. Tierarzt anrufen.\n3. Pferd ruhig halten. Ein gesenkter Kopf erleichtert das Abfließen des Speichels und verringert die Gefahr, dass Futter in die Lunge gelangt – aber nicht mit Gewalt.\n4. Nicht versuchen, mit Wasser „nachzuspülen“, nichts ins Maul geben, nicht am Hals kräftig massieren.\n\nManche Verstopfungen lösen sich in kurzer Zeit von allein. Trotzdem sollte der Tierarzt das Pferd anschauen, weil die Speiseröhre verletzt sein und Futter in die Lunge gelangt sein kann. Wie und wann das Pferd danach wieder fressen darf, legt der Tierarzt fest.",
        },
        {
          heading: "Vorbeugen",
          text: "• Pellets, Cobs und Rübenschnitzel nach Herstelleranweisung einweichen\n• Äpfel und Möhren klein schneiden oder längs in Streifen geben\n• Kraftfutter mit Raufutter verlängern, für Schlinger größere Steine in den Trog legen oder spezielle Tröge nutzen\n• Zähne regelmäßig kontrollieren lassen\n• Nach Sedierung erst wieder füttern, wenn der Tierarzt es erlaubt",
        },
      ],
      praxis: {
        title: "Die trockenen Heucobs",
        text: "Ein älterer Einstellerwallach bekommt neuerdings Heucobs, weil er schlecht kaut. An einem Abend schüttet eine Aushilfe die Cobs trocken in den Trog. Kurz darauf hustet der Wallach, aus beiden Nüstern läuft grünlicher Brei.\n\nMats räumt Trog und Heu sofort weg, führt das Pferd auf den leeren Sandpaddock und ruft die Tierärztin. Er hält den Strick locker, damit der Wallach den Kopf senken kann. Die Tierärztin löst die Verstopfung und bespricht anschließend den Fütterungsplan. Am Futterraum hängt jetzt ein Schild: „Cobs mindestens 30 Minuten einweichen.“",
      },
      fehler: fehler(
        ["Futter stehen lassen, weil das Pferd ja „Hunger“ hat.", "Futter, Wasser und fressbare Einstreu sofort entfernen."],
        ["Wasser ins Maul spritzen, um nachzuspülen.", "Nichts ins Maul geben – Gefahr, dass es in die Lunge gelangt."],
        ["Bei Auflösung von allein den Tierarzt absagen.", "Trotzdem untersuchen lassen."],
        ["Pellets oder Rübenschnitzel trocken füttern.", "Nach Anweisung einweichen."],
      ),
      richtig: [
        "Erkenne die Zeichen: Futterbrei aus beiden Nüstern, Würgen, Husten, gestreckter Hals.",
        "Entferne Futter, Wasser und fressbare Einstreu.",
        "Rufe den Tierarzt an.",
        "Halte das Pferd ruhig und lass es den Kopf senken.",
        "Beuge vor durch Einweichen, kleine Stücke und Zahnkontrolle.",
      ],
      merke: [
        "Futterbrei aus beiden Nüstern nach dem Fressen spricht für eine Schlundverstopfung.",
        "Futter und Wasser weg, Tierarzt anrufen.",
        "Nichts ins Maul geben.",
        "Einweichen und kleine Stücke beugen vor.",
      ],
      weiter: weiter(["Pferdezähne", "ra-w16-l7"], ["Kraftfutter, Mineralfutter und Ergänzungsfutter", "ra-w15-l8"], ["Erste Hilfe und Verhalten im Notfall", "ra-w16-l16"]),
    },
    exercise: [
      wahl(
        "ra-w16-l11-entscheidung",
        "Nach der Fütterung würgt ein Pferd und Futterbrei läuft aus beiden Nüstern. Was tust du?",
        "Futter und Wasser entfernen, Tierarzt anrufen, Pferd ruhig halten und den Kopf senken lassen",
        [
          ["Mit einer Spritze Wasser ins Maul geben, damit es nachrutscht", "Wasser kann in die Lunge gelangen. Nichts ins Maul geben."],
          ["Weiterfressen lassen, damit es sich löst", "Mehr Futter verschlimmert die Verstopfung."],
        ],
        "Richtig. Das sind typische Zeichen einer Schlundverstopfung.",
      ),
    ],
    quiz: [
      frage("zeichen", "Welches Zeichen ist typisch für eine Schlundverstopfung?", "Futterbrei läuft nach dem Fressen aus beiden Nüstern", [["Das Pferd hat hohes Fieber", "Fieber ist kein typisches Frühzeichen."], ["Das Pferd lahmt", "Das hat mit dem Schlund nichts zu tun."]], "Genau. Dazu kommen Würgen und Husten."),
      frage("ursache", "Was kann eine Schlundverstopfung begünstigen?", "Trocken gefütterte Pellets oder Rübenschnitzel", [["Gut eingeweichtes Mash", "Eingeweichtes Futter beugt eher vor."], ["Langsames Fressen aus dem Heunetz", "Langsames Fressen ist eher günstig."]], "Richtig. Sie quellen erst im Schlund auf."),
      frage("wasser", "Darf ein Pferd mit Schlundverstopfung weiter trinken?", "Nein, Futter und Wasser werden entfernt, bis der Tierarzt entscheidet", [["Ja, so viel es will", "Das Pferd kann nicht schlucken – Wasser kann in die Lunge gelangen."], ["Ja, aber nur warmes Wasser", "Auch warmes Wasser wird entfernt."]], "Genau. Es kann ja nicht schlucken."),
      frage("kopf", "Warum ist ein gesenkter Kopf günstig?", "Speichel und Futter können abfließen und gelangen weniger leicht in die Lunge", [["Damit das Pferd besser sieht", "Es geht um die Gefahr der Aspiration."], ["Damit das Pferd schneller einschläft", "Der Grund ist der Abfluss."]], "Richtig – aber nie mit Gewalt."),
    ],
  },

  /* ---------- 12. Lahmheit ---------- */
  {
    slug: "lahmheit-erkennen",
    title: "Lahmheit und Bewegungsauffälligkeiten erkennen",
    speaker: "lea",
    intro:
      "„Irgendwie fühlt er sich heute komisch an.“ Viele Reiter spüren eine Lahmheit, bevor sie sie sehen. Damit du nicht nur ein Gefühl, sondern eine klare Beobachtung weitergeben kannst, lernst du in dieser Lektion, worauf man beim Vortraben achtet.",
    illustration: tabelle("Vortraben", "Worauf du schaust", [
      ["Lahmheit", "Typisches Zeichen"],
      ["vorne", "Kopf geht nach unten, wenn das gesunde Vorderbein auffußt"],
      ["hinten", "Hüfte der lahmen Seite hebt und senkt sich stärker"],
      ["beidseitig", "kurze, klamme Tritte, oft ohne Nicken"],
    ]),
    terms: begriffe(
      ["Lahmheit", "Störung des gleichmäßigen Gangbilds, meist durch Schmerz."],
      ["Vortraben", "Pferd wird an der Hand im Trab geradeaus vor- und zurückgeführt, damit man die Bewegung beurteilen kann."],
      ["Taktunrein", "Unregelmäßige Fußfolge oder ungleich lange Tritte."],
      ["Beugeprobe", "Tierärztlicher Test, bei dem ein Gelenk eine Zeit gebeugt und das Pferd danach vorgetrabt wird."],
    ),
    deep: {
      minutes: 9,
      sections: [
        {
          heading: "Was eine Lahmheit ist",
          text: "Eine Lahmheit ist eine Unregelmäßigkeit im Gangbild. Meist versucht das Pferd, ein schmerzendes Bein weniger zu belasten. Ursachen können im Huf, in Gelenken, Sehnen, Bändern, Muskeln, Knochen oder im Rücken liegen.\n\nLahmheiten reichen von kaum sichtbar bis zu einem Bein, das gar nicht mehr belastet wird. Tierärzte verwenden dafür Skalen, etwa von 0 (klar) bis 5 (Bein wird nicht belastet). Am besten sieht man eine Lahmheit im Trab, weil sich dort zwei Beine diagonal das Gewicht teilen und Unterschiede deutlich werden.",
        },
        {
          heading: "Vorne lahm: der Kopf zeigt es",
          text: "Lahmt ein Pferd vorne, versucht es, das schmerzende Bein zu entlasten. Dazu hebt es den Kopf, wenn das lahme Bein auffußt, und senkt ihn, wenn das gesunde Bein auffußt. Merksatz: „Der Kopf geht runter auf dem gesunden Bein.“\n\nSo beobachtest du: Das Pferd wird auf ebenem, festem Boden geradeaus vorgetrabt, am langen Strick, damit es den Kopf frei bewegen kann. Du stehst seitlich oder vor dem Pferd und schaust auf den Kopf. Zähle mit: Bei welchem Vorderbein geht der Kopf nach unten? Das andere ist das lahme.",
        },
        {
          heading: "Hinten lahm: die Hüfte zeigt es",
          text: "Bei Hinterhandlahmheiten nickt der Kopf kaum. Achte stattdessen auf die Hüfthöcker: Die Hüfte der lahmen Seite hebt und senkt sich stärker (Hüfthub), weil das Pferd versucht, das Bein schnell zu entlasten. Am besten siehst du das von hinten, wenn das Pferd von dir weggetrabt wird.\n\nWeitere Hinweise: kürzere Tritte eines Hinterbeins, schleifende Zehen, ungleiche Abnutzung der Hufe, Schwierigkeiten im Galopp oder beim Rückwärtsrichten.",
        },
        {
          heading: "Weitere Hinweise und was du tust",
          text: "Manche Lahmheiten zeigen sich deutlicher auf hartem Boden, auf dem Zirkel oder nach Belastung. Beidseitige Lahmheiten sind schwerer zu erkennen: Das Pferd geht kurz und klamm, aber gleichmäßig.\n\nUnter dem Sattel spürst du eine Lahmheit oft als ungleiches Gefühl im Takt, als Probleme auf einer Hand, schwierige Übergänge oder Widerstände.\n\nWas du tust: Pferd nicht weiter reiten. Beine und Hufe abtasten (Wärme, Schwellung, Fremdkörper, pochende Zehenarterie). Beobachtungen notieren, wenn möglich ein Video beim Vortraben aufnehmen. Tierarzt anrufen – bei hochgradiger Lahmheit oder wenn das Bein nicht belastet wird sofort. Die Ursache findet der Tierarzt durch Untersuchung, Beugeproben, Leitungsanästhesien und Bildgebung.",
        },
      ],
      praxis: {
        title: "Das Video vom Vortraben",
        text: "Tivoli fühlt sich für Ben im Trab auf der rechten Hand „holprig“ an. Statt weiterzureiten, steigt er ab. Lea trabt Tivoli auf dem gepflasterten Hofweg vor, Ben filmt von vorne und von der Seite. Auf dem Video sehen sie in Zeitlupe: Der Kopf geht immer nach unten, wenn das linke Vorderbein auffußt. Also ist eher das rechte Vorderbein betroffen.\n\nBen tastet das Bein ab: keine Schwellung, aber der rechte Huf ist wärmer. Die Tierärztin bekommt das Video vorab und kommt am Nachmittag. Ihre Untersuchung ergibt eine Prellung der Sohle nach einem Ausritt über steinigen Boden.",
      },
      fehler: fehler(
        ["Ein Pferd, das sich „komisch“ anfühlt, weiterreiten.", "Absteigen, beobachten, abtasten."],
        ["Am kurzen Strick vortraben.", "Am langen Strick, damit der Kopf frei nicken kann."],
        ["Auf weichem Boden oder im Kreis um sich herum vortraben.", "Gerade auf ebenem, festem Boden vortraben."],
        ["Vom Nicken auf das falsche Bein schließen.", "Der Kopf geht runter, wenn das gesunde Bein auffußt."],
      ),
      richtig: [
        "Bei Verdacht absteigen und das Pferd nicht weiter belasten.",
        "Auf ebenem, festem Boden am langen Strick geradeaus vortraben lassen.",
        "Vorne: auf den Kopf achten. Hinten: auf die Hüften von hinten achten.",
        "Beine und Hufe abtasten und mit der Gegenseite vergleichen.",
        "Ein Video aufnehmen und Beobachtungen notieren.",
        "Den Tierarzt informieren – bei hochgradiger Lahmheit sofort.",
      ],
      merke: [
        "Lahmheit sieht man am besten im Trab auf festem Boden.",
        "Vorne: Der Kopf geht runter auf dem gesunden Bein.",
        "Hinten: Die Hüfte der lahmen Seite hebt sich stärker.",
        "Lahmes Pferd nicht weiter reiten – Ursache tierärztlich klären.",
      ],
      weiter: weiter(["Der tägliche Gesundheitscheck", "ra-w16-l3"], ["Hufkrankheiten", "ra-w16-l6"], ["Takt und Rhythmus", "ra-w12-l1"], ["Lernvideo „Lahmheiten erkennen“ (Drehbuch liegt vor)"]),
    },
    exercise: [
      wahl(
        "ra-w16-l12-entscheidung",
        "Beim Vortraben geht der Kopf des Pferdes immer dann nach unten, wenn das rechte Vorderbein auffußt. Welches Bein ist wahrscheinlich lahm?",
        "Das linke Vorderbein",
        [
          ["Das rechte Vorderbein", "Der Kopf geht runter, wenn das gesunde Bein auffußt. Das rechte ist hier das gesunde."],
          ["Ein Hinterbein", "Bei Hinterhandlahmheit nickt der Kopf meist kaum."],
        ],
        "Richtig. „Der Kopf geht runter auf dem gesunden Bein.“",
      ),
    ],
    quiz: [
      frage("gangart", "In welcher Gangart erkennt man Lahmheiten am besten?", "Im Trab", [["Im Schritt", "Im Schritt sind viele Lahmheiten kaum zu sehen."], ["Im Galopp", "Im Galopp ist die Beurteilung schwieriger."]], "Genau. Dort tragen zwei Beine diagonal das Gewicht."),
      frage("hinten", "Woran erkennst du eine Hinterhandlahmheit?", "An einem stärkeren Hub der Hüfte auf der lahmen Seite", [["Am starken Kopfnicken", "Das ist typisch für Vorderhandlahmheit."], ["An den Ohren", "Die Ohren zeigen keine Lahmheit."]], "Richtig. Am besten von hinten beobachten."),
      frage("strick", "Warum trabst du am langen Strick vor?", "Damit das Pferd den Kopf frei bewegen kann", [["Damit es schneller trabt", "Es geht um die freie Kopfbewegung."], ["Damit du weiter weg stehst", "Der Hauptgrund ist das freie Nicken."]], "Genau. Sonst kann man das Nicken nicht sehen."),
      frage("boden", "Auf welchem Boden trabst du für die Beurteilung vor?", "Auf ebenem, festem Boden", [["Im tiefen Sand", "Tiefer Boden verdeckt viele Lahmheiten."], ["Auf nasser Wiese", "Dort ist es rutschig und uneben."]], "Richtig. Gleichmäßiger Boden macht Unterschiede sichtbar."),
    ],
  },

  /* ---------- 13. Atemwege ---------- */
  {
    slug: "atemwege-asthma",
    title: "Atemwegserkrankungen und equines Asthma",
    speaker: "mila",
    intro:
      "Ein Pferd hustet die ersten Minuten beim Reiten, danach geht es. „Das macht er schon immer, das ist nur Staub“, sagt die Besitzerin. Häufiger Husten ist beim Pferd aber nie normal – er ist oft ein frühes Zeichen für equines Asthma.",
    illustration: item("heu"),
    terms: begriffe(
      ["Equines Asthma", "Chronische, nicht ansteckende Entzündung der unteren Atemwege, meist ausgelöst durch Staub und Schimmelsporen."],
      ["Dampfrinne", "Sichtbare Muskelfurche am Rippenbogen bei angestrengter Ausatmung."],
      ["Influenza / Herpes", "Ansteckende Virusinfektionen der Atemwege, gegen die geimpft werden kann."],
      ["Druse", "Ansteckende bakterielle Infektion mit Fieber und geschwollenen Lymphknoten am Kopf."],
    ),
    deep: {
      minutes: 9,
      sections: [
        {
          heading: "Warum Atemwege im Stall leiden",
          text: "Pferde sind auf Leistung über die Atmung angewiesen: Ein galoppierendes Pferd bewegt große Mengen Luft. Gleichzeitig verbringen viele Pferde Stunden in Ställen mit Staub aus Heu, Stroh und Einstreu, mit Schimmelsporen und Ammoniak. Die feinen Atemwege reagieren darauf mit Entzündung.\n\nDazu kommen ansteckende Infektionen durch Viren (z. B. Influenza, Herpes) und Bakterien (z. B. Druse). Sie können sich in Ställen schnell ausbreiten.",
        },
        {
          heading: "Equines Asthma",
          text: "Equines Asthma ist eine chronische Entzündung der unteren Atemwege, nicht ansteckend, aber sehr häufig. Man unterscheidet eine milde bis mittelgradige Form – oft bei jüngeren Pferden mit Husten zu Arbeitsbeginn und Leistungsschwäche – und eine schwere Form, früher „Dämpfigkeit“ genannt, mit Atemnot schon in Ruhe.\n\nTypische Zeichen: Husten, vor allem beim Anreiten, beim Füttern oder in staubiger Umgebung; Nasenausfluss; verlängerte Erholung nach Belastung; erhöhte Atemfrequenz in Ruhe; angestrengte Bauchatmung, bei schwerer Form eine Dampfrinne; geblähte Nüstern.\n\nDie wichtigste Säule der Behandlung ist die Haltung: Staub reduzieren. Medikamente legt der Tierarzt fest; ohne bessere Luft wirken sie meist nur vorübergehend.",
        },
        {
          heading: "Ansteckende Infektionen",
          text: "Hinweise auf eine ansteckende Infektion sind Fieber, Mattigkeit, Futterunlust, Husten, Nasenausfluss und mehrere erkrankte Pferde im Stall. Bei Druse kommen geschwollene, später aufbrechende Lymphknoten an Kehlgang und Hals dazu.\n\nWas du tust: Fieber messen, betroffenes Pferd möglichst trennen, eigenes Zubehör nutzen, Tierarzt informieren, keine Turniere oder Lehrgänge besuchen. Ob ein Stall gesperrt wird oder andere Maßnahmen nötig sind, entscheidet der Tierarzt.\n\nImpfungen gegen Influenza und Herpes senken das Risiko und die Schwere (mehr in Lektion 15).",
        },
        {
          heading: "Staub reduzieren – im Alltag",
          text: "• Heu auf Hygiene prüfen, bei empfindlichen Pferden bedampfen oder Heulage nach Rücksprache\n• Heu bodennah füttern, nicht aus hohen Raufen, aus denen Staub in die Nüstern rieselt\n• Staubarme Einstreu (z. B. entstaubte Späne oder Pellets statt Stroh)\n• Misten, Fegen und Einstreuen, wenn die Pferde draußen sind\n• Viel Frischluft im Stall, möglichst viel Zeit im Freien\n• Reitbahn wässern, wenn der Boden staubt\n• Heu und Stroh nicht über den Boxen lagern\n\nBei Husten, der länger als ein paar Tage anhält oder immer wieder kommt: tierärztlich abklären lassen.",
        },
      ],
      praxis: {
        title: "Der Husten beim Anreiten",
        text: "Eine Einstellerstute hustet zu Beginn jeder Reitstunde einige Male. In der Halle staubt es, das Heu wird aus einer hohen Raufe gefüttert. Hanna rät der Besitzerin, die Tierärztin draufschauen zu lassen. Diese stellt eine milde Form von equinem Asthma fest.\n\nDie Stute bekommt bedampftes Heu vom Boden, Späne statt Stroh, mehr Weide- und Paddockzeit, und die Halle wird vor dem Reiten gewässert. Nach einigen Wochen hustet sie kaum noch. Die Tierärztin kontrolliert den Verlauf.",
      },
      fehler: fehler(
        ["Husten zu Arbeitsbeginn als „normal“ abtun.", "Wiederkehrenden Husten tierärztlich abklären lassen."],
        ["Heu aus hohen Raufen füttern.", "Bodennah füttern."],
        ["Misten, während die Pferde im Stall stehen.", "Staubige Arbeiten erledigen, wenn die Pferde draußen sind."],
        ["Mit Fieber und Husten zum Turnier fahren.", "Pferd trennen, Tierarzt, kein Kontakt zu fremden Pferden."],
      ),
      richtig: [
        "Achte auf Husten, Nasenausfluss, Atemfrequenz und Erholung nach Belastung.",
        "Miss bei Husten und Nasenausfluss Fieber.",
        "Reduziere Staub bei Futter, Einstreu, Stallarbeit und in der Reitbahn.",
        "Trenne Pferde mit Fieber und Husten und informiere den Tierarzt.",
        "Halte Impfungen aktuell.",
      ],
      merke: [
        "Husten ist beim Pferd nie normal.",
        "Equines Asthma ist häufig, nicht ansteckend und wird vor allem über die Haltung behandelt.",
        "Fieber plus Husten kann eine ansteckende Infektion sein – trennen und Tierarzt.",
        "Staub reduzieren: Heu, Einstreu, Stallarbeit, Reitbahn.",
      ],
      weiter: weiter(["Der optimale Pferdestall", "ra-w15-l3"], ["Heu, Heulage, Gras und Raufutterqualität", "ra-w15-l6"], ["Infektionen, Impfungen und Parasiten", "ra-w16-l15"]),
    },
    exercise: [
      wahl(
        "ra-w16-l13-entscheidung",
        "Im Stall husten plötzlich drei Pferde, zwei haben 39,2 °C Fieber. Was ist richtig?",
        "Betroffene Pferde trennen, Hygiene beachten, Tierarzt informieren und keinen Kontakt zu fremden Pferden zulassen",
        [
          ["Weiter wie bisher, das ist nur Staub", "Fieber bei mehreren Pferden spricht für eine ansteckende Infektion."],
          ["Mit den gesunden Pferden noch schnell zum Turnier", "Auch scheinbar gesunde Pferde können die Infektion tragen."],
        ],
        "Richtig. So wird eine Ausbreitung begrenzt.",
      ),
    ],
    quiz: [
      frage("husten", "Wie ist häufiger Husten beim Anreiten zu bewerten?", "Als Warnzeichen, das tierärztlich abgeklärt werden sollte", [["Als normal für jedes Pferd", "Husten ist beim Pferd nie normal."], ["Als Zeichen für gute Kondition", "Husten hat mit Kondition nichts zu tun."]], "Genau. Oft steckt equines Asthma dahinter."),
      frage("asthma", "Was ist die wichtigste Maßnahme bei equinem Asthma?", "Staub in Futter, Einstreu und Umgebung reduzieren", [["Mehr Kraftfutter", "Kraftfutter hat keinen Einfluss auf die Entzündung."], ["Pferd immer in der Box lassen", "Viel Zeit an der frischen Luft ist günstig."]], "Richtig. Medikamente legt der Tierarzt fest – die Haltung bleibt die Basis."),
      frage("raufe", "Wie fütterst du Heu bei Pferden mit Atemwegsproblemen am besten?", "Bodennah", [["Aus einer hohen Raufe", "Dabei rieselt Staub direkt in die Nüstern."], ["Kräftig ausgeschüttelt direkt vor dem Pferd", "Ausschütteln wirbelt Staub auf."]], "Genau. Die Kopfhaltung beim Fressen am Boden hilft auch beim Abfluss von Sekret."),
      frage("druse", "Was ist typisch für Druse?", "Fieber und geschwollene Lymphknoten am Kopf", [["Lahmheit an allen vier Beinen", "Das ist kein typisches Druse-Zeichen."], ["Haarausfall am Schweif", "Das gehört nicht zum Krankheitsbild."]], "Richtig. Druse ist ansteckend – Pferd trennen und Tierarzt informieren."),
    ],
  },

  /* ---------- 14. Wunden ---------- */
  {
    slug: "verletzungen-wundversorgung",
    title: "Verletzungen, Blutungen und Wundversorgung",
    speaker: "ben",
    intro:
      "Ein Pferd kommt mit einem blutigen Schnitt am Bein von der Weide. Sieht schlimm aus – oder ist es harmlos? Bei Wunden entscheidet nicht die Menge an Blut, sondern vor allem, wo die Wunde liegt und wie tief sie ist.",
    illustration: tabelle("Wunden", "Wann ist es ein Notfall?", [
      ["Sofort Tierarzt", "Tierarzt heute"],
      ["starke, spritzende Blutung", "Wunden, die genäht werden könnten"],
      ["Wunde nahe Gelenk oder Sehne", "Lahmheit nach einer Verletzung"],
      ["Fremdkörper steckt", "Stichwunden"],
      ["Pferd belastet Bein nicht", "Wunden am Kopf oder Auge"],
    ]),
    terms: begriffe(
      ["Druckverband", "Fester Verband auf einer Wunde, um eine Blutung zu stoppen."],
      ["Gelenknahe Wunde", "Verletzung in der Nähe eines Gelenks oder einer Sehnenscheide – kann schwere Infektionen auslösen."],
      ["Tetanus", "Wundstarrkrampf; durch Bakterien aus der Erde, beim Pferd oft tödlich. Impfschutz ist entscheidend."],
    ),
    deep: {
      minutes: 9,
      sections: [
        {
          heading: "Ruhe und Einschätzung",
          text: "Bei einer Verletzung zuerst: Ruhe bewahren, Pferd sichern, Eigenschutz beachten. Ein verletztes Pferd kann vor Schmerz oder Schreck schlagen.\n\nDann einschätzen:\n• Wo liegt die Wunde? Gelenke, Sehnen, Hufe, Augen und Brustkorb sind besonders kritisch.\n• Wie tief ist sie? Klafft sie, sieht man Gewebe darunter?\n• Wie stark blutet sie?\n• Steckt ein Fremdkörper?\n• Belastet das Pferd das Bein?\n• Wann war die letzte Tetanus-Impfung?\n\nFotos helfen dem Tierarzt bei der Einschätzung am Telefon.",
        },
        {
          heading: "Blutungen stillen",
          text: "Leichte Blutungen hören meist von allein auf. Bei starker oder spritzender Blutung legst du einen Druckverband an: eine saubere Wundauflage direkt auf die Wunde, darüber ein Polster (z. B. Watte oder ungeöffnete Binde) und dann fest umwickeln. Blutet es durch, nicht abwickeln, sondern eine weitere Lage darüber. Wo kein Verband hält, mit sauberem Material fest auf die Wunde drücken.\n\nEin Pferd hat viel Blut, und eine Pfütze sieht schnell dramatisch aus. Trotzdem: Starke Blutungen sind ein Notfall – Tierarzt sofort.",
        },
        {
          heading: "Welche Wunden dringend sind",
          text: "Besonders gefährlich sind Wunden an oder nahe von Gelenken, Sehnenscheiden und Schleimbeuteln – auch kleine Stichwunden. Gelangen dort Keime hinein, kann eine Infektion entstehen, die das Gelenk dauerhaft schädigt. Solche Wunden müssen innerhalb weniger Stunden tierärztlich versorgt werden.\n\nAuch Wunden, die genäht werden könnten, sollten zügig behandelt werden – idealerweise innerhalb weniger Stunden. Fremdkörper werden möglichst nicht entfernt, damit der Tierarzt Lage und Tiefe beurteilen kann. Eine Lahmheit nach einer Verletzung ist immer ein Grund für tierärztliche Untersuchung.",
        },
        {
          heading: "Kleine Wunden selbst versorgen",
          text: "Oberflächliche Schürfungen und kleine Kratzer, fern von Gelenken und Sehnen, ohne Lahmheit, kannst du selbst versorgen:\n\n1. Hände waschen, Einmalhandschuhe anziehen.\n2. Grob verschmutzte Wunden vorsichtig mit sauberem, lauwarmem Wasser spülen (z. B. mit einer Spritze ohne Kanüle oder einem sanften Wasserstrahl).\n3. Haare am Wundrand nicht in die Wunde fallen lassen.\n4. Wunde beobachten: Rötung, Schwellung, Wärme, Eiter oder Lahmheit sind Zeichen für eine Infektion – dann Tierarzt.\n\nWelche Wundmittel geeignet sind, besprichst du am besten vorher mit deinem Tierarzt. Puder, Salben oder Sprays sollten nicht auf Wunden kommen, die der Tierarzt noch beurteilen oder nähen soll.\n\nUnd immer: Tetanusschutz prüfen.",
        },
      ],
      praxis: {
        title: "Die kleine Wunde am Fesselgelenk",
        text: "Tonga hat sich auf der Weide an einem Zaunpfahl verletzt: eine nur daumennagelgroße Wunde vorne am Fesselgelenk, kaum Blut. Tilda will sie erst selbst sauber machen und abwarten. Dann fällt ihr ein: gelenknah.\n\nSie fotografiert die Wunde, ruft die Tierärztin an und schickt das Foto. Die Tierärztin kommt noch am selben Nachmittag und prüft, ob das Gelenk eröffnet ist. Zum Glück nicht. Hätte Tilda abgewartet, wäre eine mögliche Gelenkinfektion womöglich zu spät erkannt worden.",
      },
      fehler: fehler(
        ["Wunden nach der Blutmenge beurteilen.", "Lage und Tiefe sind wichtiger."],
        ["Kleine Wunden nahe am Gelenk selbst behandeln und abwarten.", "Gelenknahe Wunden zeitnah tierärztlich beurteilen lassen."],
        ["Einen durchgebluteten Verband abwickeln.", "Eine weitere Lage darüber wickeln."],
        ["Pulver oder Salbe auf eine Wunde, die genäht werden soll.", "Bis zur tierärztlichen Beurteilung nur sauber abdecken."],
      ),
      richtig: [
        "Ruhe bewahren, Pferd sichern, auf Eigenschutz achten.",
        "Lage, Tiefe, Blutung, Fremdkörper und Lahmheit einschätzen.",
        "Starke Blutung: Druckverband anlegen, Tierarzt sofort.",
        "Gelenk- oder sehnennahe Wunden, Stichwunden und Fremdkörper: Tierarzt zeitnah.",
        "Kleine, oberflächliche Wunden sauber spülen und beobachten.",
        "Tetanusschutz prüfen.",
      ],
      merke: [
        "Lage und Tiefe einer Wunde sind wichtiger als die Blutmenge.",
        "Wunden nahe Gelenk oder Sehne sind dringend.",
        "Starke Blutung: Druckverband und Tierarzt.",
        "Ohne Tetanusschutz ist jede Wunde gefährlich.",
      ],
      weiter: weiter(["Erste Hilfe und Verhalten im Notfall", "ra-w16-l16"], ["Die vollständige Stallapotheke", "ra-w16-l17"], ["Infektionen, Impfungen und Parasiten", "ra-w16-l15"]),
    },
    exercise: [
      wahl(
        "ra-w16-l14-entscheidung",
        "Ein Pferd hat eine kleine, kaum blutende Stichwunde direkt über dem Sprunggelenk. Es geht klar. Was tust du?",
        "Foto machen, sauber abdecken und den Tierarzt zeitnah draufschauen lassen",
        [
          ["Desinfizieren und eine Woche beobachten", "Gelenknahe Stichwunden können das Gelenk betreffen und brauchen schnelle tierärztliche Beurteilung."],
          ["Nichts tun – es blutet ja kaum", "Gerade kleine Stichwunden an Gelenken werden oft unterschätzt."],
        ],
        "Richtig. Gelenknahe Wunden sind dringend, auch wenn sie klein sind.",
      ),
    ],
    quiz: [
      frage("lage", "Was ist bei einer Wunde am wichtigsten für die Einschätzung?", "Lage und Tiefe", [["Die Farbe des Fells drumherum", "Die Fellfarbe spielt keine Rolle."], ["Nur die Menge an Blut", "Auch kleine Wunden können gefährlich sein."]], "Genau. Gelenke, Sehnen, Hufe und Augen sind besonders kritisch."),
      frage("druck", "Der Druckverband blutet durch. Was tust du?", "Eine weitere Lage darüber wickeln", [["Den Verband abwickeln und neu beginnen", "Dabei kann die Blutung wieder stärker werden."], ["Den Verband ganz entfernen", "Die Blutung muss gestoppt werden."]], "Richtig. Und den Tierarzt rufen."),
      frage("fremdkoerper", "Ein Holzsplitter steckt tief im Bein. Was ist richtig?", "Möglichst nicht entfernen und sofort den Tierarzt rufen", [["Sofort herausziehen", "Der Tierarzt muss Lage und Tiefe beurteilen."], ["Abschneiden und abwarten", "Das versteckt den Fremdkörper nur."]], "Genau. So kann der Tierarzt die Verletzung richtig beurteilen."),
      frage("tetanus", "Warum ist der Tetanusschutz bei Wunden so wichtig?", "Weil Wundstarrkrampf beim Pferd oft tödlich verläuft", [["Weil Wunden dann schneller heilen", "Die Impfung schützt vor Tetanus, nicht vor langsamer Heilung."], ["Weil sonst die Wunde blutet", "Tetanus hat mit Blutungen nichts zu tun."]], "Richtig. Pferde sind sehr empfindlich für Tetanus."),
    ],
  },
];
