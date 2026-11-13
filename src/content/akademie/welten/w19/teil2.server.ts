import "server-only";
import { item } from "../../build";
import { scene } from "../../types";
import { begriffe, fehler, frage, tabelle, wahl, weiter, type DeepInput } from "../deep-kit";

/** Modul 14, Lektionen 5–8 */
export const teil2: DeepInput[] = [
  /* ---------- 5. Bergauf, bergab ---------- */
  {
    slug: "bergauf-bergab",
    title: "Bergauf und bergab richtig reiten",
    speaker: "lea",
    intro:
      "Bergauf geht fast jedes Pferd gern – manchmal zu gern. Bergab dagegen wird es oft unsicher, eilig oder rutscht. Mit dem richtigen Sitz und der richtigen Linie machst du es deinem Pferd viel leichter.",
    illustration: scene("ak-reiter-leicht"),
    terms: begriffe(
      ["Leichter Sitz", "Gesäß leicht aus dem Sattel, Oberkörper etwas vor – entlastet den Rücken bergauf."],
      ["Falllinie", "Direkter, gerader Weg einen Hang hinunter."],
      ["Schräg am Hang", "Gefährliche Position, in der ein Pferd seitlich wegrutschen kann."],
    ),
    deep: {
      minutes: 8,
      sections: [
        {
          heading: "Bergauf",
          text: "Bergauf muss die Hinterhand kräftig schieben, der Rücken arbeitet, das Pferd streckt den Hals nach vorn-unten, um das Gleichgewicht zu halten. Damit es das kann:\n\n• Gehe in den leichten Sitz: Oberkörper leicht vor, Gesäß entlastet, Gewicht in den Bügeln.\n• Gib die Hand nach vorn, damit das Pferd den Hals strecken kann; bei Bedarf in die Mähne greifen.\n• Reite gerade hinauf, nicht schräg.\n• Wähle ein ruhiges Tempo – Schritt oder ruhiger Trab. Steile Stücke nicht im schnellen Galopp hochjagen.\n\nBergauf-Strecken sind wertvolles Training: Sie kräftigen Hinterhand und Rücken (Lektion 12).",
        },
        {
          heading: "Bergab",
          text: "Bergab trägt die Vorhand mehr Gewicht, die Hinterbeine müssen bremsen und tief unter den Körper treten. Das ist anstrengend, und viele Pferde werden schneller, um sich „fallen zu lassen“.\n\n• Reite bergab im Schritt.\n• Sitze aufrecht im Sattel, Oberkörper senkrecht zur Erde (nicht nach hinten lehnen, nicht nach vorn fallen), Gewicht in den Bügeln, Knie leicht gebeugt.\n• Halte eine leichte, nachgebende Verbindung – das Pferd braucht Hals und Kopf zum Ausbalancieren.\n• Reite in der Falllinie gerade hinunter, nicht schräg.\n• Bei Steilstücken: lieber absteigen und führen, seitlich versetzt vor dem Pferd.",
        },
        {
          heading: "Wie es sich anfühlt und woran du es erkennst",
          text: "Bergauf: Du spürst, wie die Hinterhand kräftig schiebt, das Pferd streckt den Hals. Das Gewicht in deinen Bügeln ist gleichmäßig. Gutes Zeichen: gleichmäßiges Tempo, ruhige Atmung oben.\n\nBergab: Das Pferd setzt die Hufe bewusst, langsam und gerade. Du sitzt ruhig und folgst. Gutes Zeichen: kein Eilen, kein Rutschen, die Hinterhand tritt tief unter.",
        },
        {
          heading: "Typische Fehler und Übungen",
          text: "• Bergauf hinter der Bewegung sitzen und am Zügel hängen. → Leichter Sitz, Hand vor.\n• Bergab nach hinten lehnen. → Oberkörper senkrecht zur Erde.\n• Schräg am Hang reiten. → Falllinie.\n• Zu schnell bergab. → Schritt, halbe Paraden, Pausen.\n• Bergab am Zügel festhalten. → Leichte Verbindung, Pferd darf ausbalancieren.\n\nÜbungen: kurze, flache Hügel im Schritt hinauf und hinunter, später etwas steilere Stücke. Nach Steigungen Pausen einplanen, damit sich das Pferd erholt.",
        },
      ],
      praxis: {
        title: "Der Steilhang am Mühlenweg",
        text: "Am Ende der Waldrunde geht es einen kurzen, steilen Hang hinunter. Ben sitzt auf Tivoli, der schneller wird und mit den Vorderbeinen rutscht. Hanna ruft: „Absteigen und führen!“ Ben steigt ab, geht seitlich versetzt vor Tivoli den Hang hinunter, lässt ihm den Kopf frei.\n\nUnten steigen sie wieder auf. Hanna erklärt: Absteigen ist keine Niederlage, sondern eine gute Entscheidung, wenn ein Hang für Pferd und Reiter zu steil ist. Auf flacheren Stücken üben sie beim nächsten Ausritt das Bergab-Reiten im Schritt.",
      },
      fehler: fehler(
        ["Steile Hänge im Galopp hinaufjagen.", "Ruhiges Tempo, leichter Sitz."],
        ["Bergab nach hinten lehnen.", "Oberkörper senkrecht zur Erde."],
        ["Schräg am Hang reiten.", "Gerade in der Falllinie."],
        ["Bergab festhalten.", "Leichte Verbindung, Hals frei."],
      ),
      richtig: [
        "Bergauf: leichter Sitz, Hand vor, gerade hinauf, ruhiges Tempo.",
        "Bergab: Schritt, aufrecht sitzen, leichte Verbindung, gerade hinunter.",
        "Bei sehr steilen Stücken absteigen und führen.",
        "Nach Steigungen Pausen einplanen.",
        "Mit flachen Hügeln beginnen.",
      ],
      merke: [
        "Bergauf: leichter Sitz, Hand vor.",
        "Bergab: Schritt, aufrecht, gerade.",
        "Nie schräg am Hang.",
        "Absteigen ist eine kluge Entscheidung, keine Niederlage.",
      ],
      weiter: weiter(["Der leichte Sitz und sicher im Sattel", "ra-w12-l4"], ["Geländetraining sinnvoll aufbauen", "ra-w19-l12"], ["Biomechanik", "ra-w18-l2"]),
    },
    exercise: [
      wahl(
        "ra-w19-l5-entscheidung",
        "Bergab wird dein Pferd schneller und beginnt zu rutschen. Was tust du?",
        "Im Schritt bleiben, aufrecht sitzen, gerade hinunter – bei zu steilem Hang absteigen und führen",
        [
          ["Mit beiden Zügeln kräftig festhalten", "Das nimmt dem Pferd die Möglichkeit, sich auszubalancieren."],
          ["Nach hinten lehnen und Beine nach vorn strecken", "Das verlagert dein Gewicht ungünstig auf die Hinterhand und macht dich instabil."],
        ],
        "Richtig. Sicherheit geht vor Stolz.",
      ),
    ],
    quiz: [
      frage("bergauf", "Wie sitzt du bergauf?", "Im leichten Sitz mit nachgebender Hand", [["Tief im Sattel und mit kurzen Zügeln", "Das behindert die Hinterhand und den Hals."], ["Nach hinten gelehnt", "Das ist bergauf besonders ungünstig."]], "Genau. So kann das Pferd Hinterhand und Hals einsetzen."),
      frage("bergab", "Welche Gangart ist bergab sinnvoll?", "Schritt", [["Galopp", "Bergab im Galopp ist sehr gefährlich."], ["Trab", "Trab bergab belastet die Vorhand stark."]], "Richtig. Ruhig und kontrolliert."),
      frage("schraeg", "Warum reitet man nicht schräg am Hang?", "Weil das Pferd seitlich wegrutschen kann", [["Weil es länger dauert", "Es geht um die Sicherheit."], ["Das ist kein Problem", "Schräg am Hang ist eine der gefährlichsten Positionen."]], "Genau. Gerade in der Falllinie."),
    ],
  },

  /* ---------- 6. Wasser, Brücken, Hindernisse ---------- */
  {
    slug: "wasser-bruecken-hindernisse",
    title: "Wasser, Brücken und natürliche Hindernisse",
    speaker: "mila",
    intro:
      "Eine Pfütze, die das Pferd als bodenloses Loch sieht. Eine Holzbrücke, die hohl klingt. Ein umgestürzter Baum. Für ein Fluchttier sind das echte Fragen: Ist das sicher? Deine Aufgabe ist, ihm zu helfen, eine gute Antwort zu finden.",
    illustration: scene("ak-hindernis-wasser"),
    terms: begriffe(
      ["Untergrund prüfen", "Tiefe, Boden und Strömung kennen, bevor man ins Wasser reitet."],
      ["Führpferd", "Erfahrenes Pferd, das vorangeht und unsicheren Pferden Orientierung gibt."],
      ["Annäherung", "Schrittweises Heranführen an etwas Neues."],
    ),
    deep: {
      minutes: 8,
      sections: [
        {
          heading: "Warum Pferde zögern",
          text: "Wasser spiegelt, man sieht den Boden oft nicht, und Pferde können Tiefe schlecht einschätzen – besonders direkt vor der Nase, wo sie schlecht sehen. Brücken klingen hohl und bewegen sich manchmal. Neue Gegenstände im Weg können ein Hinweis auf Gefahr sein.\n\nZögern ist deshalb kein Ungehorsam, sondern vernünftiges Fluchttierverhalten. Ein Pferd, das zögert, prüft. Ein Pferd, das gezwungen wird, lernt: Diese Dinge sind wirklich unangenehm.",
        },
        {
          heading: "Wasser",
          text: "Nur durch Gewässer reiten, deren Boden, Tiefe und Ein- und Ausstieg du kennst und wo es erlaubt ist. Strömendes Wasser, Schlamm und steile Ufer sind gefährlich.\n\nSo gehst du vor: Pferd im Schritt heranreiten, es schauen und schnuppern lassen, Hals freigeben. Ein ruhiges Führpferd geht voraus. Jede Annäherung und jeder Schritt in die richtige Richtung wird gelobt. Nicht drängen, nicht schlagen. Viele Pferde springen beim ersten Mal über das Wasser – sei darauf vorbereitet (leichter Sitz, Hand vor, in der Mähne festhalten).\n\nIm Wasser: Pferde scharren gern und wollen sich manchmal hinlegen, besonders bei Hitze. Pferd in Bewegung halten, bei Anzeichen (Scharren, Einknicken) zügig weiter.",
        },
        {
          heading: "Brücken und andere Hindernisse",
          text: "Brücken: Prüfe, ob sie für Pferde zugelassen und stabil genug ist. Im Schritt, gerade, mit Abstand zum Vordermann hinüber; ein ruhiges Pferd geht voraus. Bei einer schmalen oder hohen Brücke lieber führen.\n\nUmgestürzte Bäume, Gräben, Baumstämme: Nur kleine, gut einsehbare Hindernisse mit festem Boden nehmen, die zu Pferd und Reiter passen. Ansonsten umreiten oder absteigen. Nie über Hindernisse springen, wenn du nicht siehst, was dahinter liegt.\n\nPlanen, Absperrband, Mülltonnen: Neue Gegenstände von beiden Seiten zeigen, mit Abstand beginnen, Zeit geben (Modul „Pferdeverhalten & Körpersprache“, Lektion 1).",
        },
        {
          heading: "Woran du erkennst, dass es funktioniert",
          text: "Das Pferd schaut, schnuppert, entspannt sich etwas (Kopf tiefer, Ausatmen, Kauen) und geht dann selbst einen Schritt vor. Beim nächsten Mal geht es schneller. Ein Pferd, das nach anfänglichem Zögern ruhig durchgeht, hat gelernt: Ich kann das.\n\nWarnzeichen, dass du zu viel verlangst: Das Pferd wird immer angespannter, dreht sich weg, steigt oder versucht, zurückzustürmen. Dann einen Schritt zurück: Abstand vergrößern, Führpferd, absteigen und führen, an einem anderen Tag weiterüben.",
        },
      ],
      praxis: {
        title: "Die große Pfütze",
        text: "Auf dem Feldweg steht nach dem Regen eine riesige Pfütze. Tonga bleibt stehen, schnaubt und will umdrehen. Tilda lässt Tivoli mit Ben vorangehen. Tonga schaut, senkt den Kopf, schnuppert am Wasser und setzt dann vorsichtig einen Huf hinein. Tilda lobt, wartet – und Tonga geht langsam hindurch.\n\nAuf dem Rückweg geht Tonga als Erste durch. Tilda freut sich: Kein Kampf, nur Geduld und ein gutes Vorbild.",
      },
      fehler: fehler(
        ["Ein zögerndes Pferd mit Gerte durchs Wasser treiben.", "Zeit geben, schauen lassen, Führpferd nutzen."],
        ["Durch unbekannte, tiefe oder strömende Gewässer reiten.", "Nur bekannte, sichere und erlaubte Stellen."],
        ["Über Hindernisse springen, deren Rückseite man nicht sieht.", "Umreiten oder absteigen."],
        ["Im Wasser stehen bleiben, während das Pferd scharrt.", "In Bewegung bleiben – Gefahr des Hinlegens."],
      ),
      richtig: [
        "Prüfe Untergrund, Tiefe, Ein- und Ausstieg.",
        "Lass das Pferd schauen und schnuppern, gib den Hals frei.",
        "Nutze ein ruhiges Führpferd.",
        "Lobe jeden Schritt in die richtige Richtung.",
        "Sei auf einen Sprung vorbereitet.",
        "Steige im Zweifel ab und führe.",
      ],
      merke: [
        "Zögern ist Prüfen, kein Ungehorsam.",
        "Nur bekanntes, sicheres Wasser.",
        "Führpferd, Geduld, Lob.",
        "Im Wasser in Bewegung bleiben.",
      ],
      weiter: weiter(["Wie Pferde ihre Umwelt wahrnehmen", "ra-w17-l1"], ["Schreckhafte Pferde und unerwartete Situationen", "ra-w19-l7"], ["Hindernisarten", "ra-w14-l3"]),
    },
    exercise: [
      wahl(
        "ra-w19-l6-entscheidung",
        "Dein Pferd bleibt vor einer Holzbrücke stehen und schnaubt. Was tust du?",
        "Stehen lassen, schauen lassen, ein ruhiges Pferd vorgehen lassen und jeden Schritt loben",
        [
          ["Mit Gerte und Sporen kräftig antreiben", "Das bestätigt dem Pferd, dass die Brücke unangenehm ist."],
          ["Sofort umdrehen und nie wieder probieren", "So lernt das Pferd, dass Umdrehen die Lösung ist."],
        ],
        "Richtig. Geduld und ein gutes Vorbild sind am wirksamsten.",
      ),
    ],
    quiz: [
      frage("warum", "Warum zögern Pferde vor Wasser?", "Sie können Tiefe und Boden schlecht einschätzen", [["Weil sie stur sind", "Zögern ist vernünftiges Fluchttierverhalten."], ["Weil sie nicht schwimmen können", "Pferde können schwimmen – sie sehen aber den Boden nicht."]], "Genau. Darum brauchen sie Zeit zum Prüfen."),
      frage("hinlegen", "Was kann passieren, wenn ein Pferd im Wasser scharrt?", "Es kann sich hinlegen wollen", [["Es will trinken", "Scharren im Wasser ist oft ein Vorbote des Hinlegens."], ["Nichts", "Scharren ist ein Warnzeichen."]], "Richtig. In Bewegung bleiben."),
      frage("hindernis", "Was gilt für natürliche Hindernisse im Gelände?", "Nur kleine, gut einsehbare Hindernisse mit festem Boden nehmen", [["Alles springen, was im Weg liegt", "Unbekannte Hindernisse sind gefährlich."], ["Immer im Galopp darauf zu", "Tempo erhöht das Risiko."]], "Genau. Sonst umreiten oder absteigen."),
    ],
  },

  /* ---------- 7. Schreckhafte Pferde ---------- */
  {
    slug: "schreckhafte-pferde",
    title: "Schreckhafte Pferde und unerwartete Situationen",
    speaker: "ben",
    intro:
      "Ein Reh springt aus dem Gebüsch, ein Traktor biegt um die Ecke, eine Plastiktüte fliegt auf. Jedes Pferd kann erschrecken – auch das bravste. Entscheidend ist, wie gut ihr beide darauf vorbereitet seid.",
    illustration: item("reflektor"),
    terms: begriffe(
      ["Scheuen", "Plötzliche Fluchtbewegung, oft ein Sprung zur Seite oder ein Wegdrehen."],
      ["Gelassenheitstraining", "Gezieltes Gewöhnen an Reize in kleinen Schritten."],
      ["Ruhesignal", "Trainiertes Signal zur Entspannung, z. B. Kopf senken."],
    ),
    deep: {
      minutes: 9,
      sections: [
        {
          heading: "Was beim Erschrecken passiert",
          text: "Ein Pferd, das erschrickt, reagiert zuerst – und denkt danach. Der Fluchtreflex läuft in Sekundenbruchteilen ab: Sprung zur Seite, Wegdrehen, Losrennen. Erst danach schaut das Pferd, was eigentlich los war.\n\nWie stark es reagiert, hängt ab von seinem Temperament, seinen Erfahrungen, seiner Grundanspannung (ein bereits angespanntes Pferd erschrickt stärker), von der Situation – und vom Reiter. Ein angespannter Reiter überträgt Spannung, ein ruhiger hilft dem Pferd, schneller zurückzufinden.",
        },
        {
          heading: "Vorbeugen",
          text: "• Gelassenheitstraining zu Hause: Planen, Bälle, Flatterband, Regenschirm, Geräusche – in kleinen Schritten, immer so, dass das Pferd neugierig bleibt (Modul „Pferdeverhalten & Körpersprache“, Lektion 7).\n• Grundanspannung senken: ausreichend Bewegung vor dem Ausritt, ruhige Abläufe, kein Ausritt bei Sturm.\n• Aufmerksam reiten: Die Umgebung beobachten, Gefahren früh sehen, das Pferd beschäftigen (Übergänge, Biegung).\n• Ein Ruhesignal trainieren.\n• Mit einem ruhigen Begleitpferd ausreiten.",
        },
        {
          heading: "Was du im Moment tust",
          text: "Es gibt kein Rezept, das immer passt. Bewährte Grundsätze:\n\n• Sitz: aufrecht, Gewicht tief in die Bügel, Knie leicht gebeugt – so bleibst du im Gleichgewicht.\n• Ausatmen: Atme bewusst aus, lass die Schultern sinken.\n• Hand: nicht ruckartig ziehen. Eine kurze, deutliche Parade und dann nachgeben ist besser als Dauerzug.\n• Beschäftigen: Das Pferd bewegt halten, eine leichte Biegung, eine Volte, damit es nicht steif wird.\n• Abstand: Wenn möglich, Abstand zum Auslöser schaffen und dann in Ruhe schauen lassen.\n• Nicht strafen: Das Pferd hatte Angst. Strafe verknüpft den Reiz nur noch stärker mit Schrecken.\n\nWenn du dich unsicher fühlst: absteigen und führen. Das ist eine kluge Entscheidung.",
        },
        {
          heading: "Danach",
          text: "Wenn das Pferd sich beruhigt hat, kann es helfen, den Auslöser – wenn sicher möglich – mit Abstand anzuschauen, bis das Pferd ausatmet und den Kopf senkt. Dann geht es weiter. Es geht nicht darum, „zu gewinnen“, sondern darum, dass das Pferd lernt: Das war nicht gefährlich.\n\nWiederholt sich das Scheuen an bestimmten Stellen oder wird es stärker, prüfe Sehvermögen und Schmerzen und plane gezieltes Training mit Hilfe.",
        },
      ],
      praxis: {
        title: "Der Traktor hinter der Kurve",
        text: "Hinter einer Kurve kommt ein Traktor mit Anhänger entgegen. Scrabble springt zur Seite und will umdrehen. Wilhelm sitzt tief, atmet aus und lenkt Scrabble in eine kleine Volte am Wegrand. Er hebt die Hand, um den Fahrer um Langsamfahrt zu bitten. Der Fahrer hält an.\n\nScrabble steht, schnaubt, schaut. Wilhelm wartet, bis er den Kopf etwas senkt, und reitet dann im Schritt mit Abstand vorbei. Er bedankt sich beim Fahrer. Zu Hause übt er in den nächsten Wochen gezielt mit dem Hoftraktor – erst stehend, dann laufend, dann fahrend.",
      },
      fehler: fehler(
        ["Ruckartig an beiden Zügeln reißen.", "Kurze Parade und nachgeben, Pferd beschäftigen."],
        ["Das Pferd nach dem Schreck bestrafen.", "Ruhig bleiben, schauen lassen, loben."],
        ["Ein angespanntes Pferd ohne Vorbereitung ins Gelände reiten.", "Grundanspannung vorher abbauen."],
        ["Krampfhaft weiterreiten, obwohl man sich unsicher fühlt.", "Absteigen und führen."],
      ),
      richtig: [
        "Trainiere Gelassenheit zu Hause in kleinen Schritten.",
        "Reite aufmerksam und sieh Gefahren früh.",
        "Im Schreckmoment: tief sitzen, ausatmen, kurze Parade, beschäftigen.",
        "Schaffe Abstand und lass das Pferd schauen.",
        "Strafe niemals Angst.",
        "Steige ab, wenn du unsicher bist.",
      ],
      merke: [
        "Erst die Reaktion, dann das Denken – beim Pferd ist es umgekehrt als bei uns.",
        "Tief sitzen, ausatmen, beschäftigen.",
        "Angst nie bestrafen.",
        "Absteigen ist eine kluge Entscheidung.",
      ],
      weiter: weiter(["Stress, Angst und Überforderung erkennen", "ra-w17-l4"], ["Vertrauen und gute Kommunikation", "ra-w17-l8"], ["Durchgehen: Vorbeugung und Verhalten", "ra-w19-l9"]),
    },
    exercise: [
      wahl(
        "ra-w19-l7-entscheidung",
        "Dein Pferd springt zur Seite, weil eine Tüte aufflattert. Es steht jetzt angespannt. Was tust du?",
        "Tief sitzen, ausatmen, eine kleine Volte reiten, Abstand schaffen und das Pferd dann schauen lassen",
        [
          ["Das Pferd für den Sprung bestrafen", "Strafe verbindet die Tüte nur noch stärker mit Schrecken."],
          ["Beide Zügel fest anziehen und festhalten", "Dauerzug macht ein ängstliches Pferd oft noch steifer."],
        ],
        "Richtig. Ruhe überträgt sich.",
      ),
    ],
    quiz: [
      frage("reflex", "Was passiert beim Erschrecken zuerst?", "Der Fluchtreflex – erst danach schaut das Pferd", [["Das Pferd überlegt genau", "Der Reflex kommt vor dem Denken."], ["Das Pferd bleibt immer stehen", "Viele Pferde springen zur Seite oder drehen sich."]], "Genau. Darum ist Vorbeugung so wichtig."),
      frage("sitz", "Wie sitzt du im Schreckmoment am sichersten?", "Aufrecht, Gewicht tief in den Bügeln, Knie leicht gebeugt", [["Nach vorn auf den Hals gelehnt", "So verlierst du leicht das Gleichgewicht."], ["Mit hochgezogenen Knien klammernd", "Klammern macht dich steif."]], "Richtig. So bleibst du im Gleichgewicht."),
      frage("strafe", "Warum bestrafst du ein erschrockenes Pferd nicht?", "Weil es Angst hatte und Strafe den Reiz noch bedrohlicher macht", [["Weil es sonst beleidigt ist", "Pferde sind nicht beleidigt – Strafe verstärkt die Angst."], ["Strafe ist hier richtig", "Angst lässt sich nicht wegstrafen."]], "Genau. Ruhe und Erfahrung helfen."),
    ],
  },

  /* ---------- 8. Traben und galoppieren ---------- */
  {
    slug: "traben-galoppieren-gelaende",
    title: "Sicher traben und galoppieren im Gelände",
    speaker: "lea",
    intro:
      "Ein Galopp über einen Feldweg gehört für viele zu den schönsten Momenten im Sattel. Er kann aber schnell gefährlich werden, wenn der Boden nicht passt, die Gruppe nicht bereit ist oder das Pferd „nach Hause“ will.",
    illustration: scene("ak-gang-galopp-links"),
    terms: begriffe(
      ["Bodenverhältnisse", "Untergrund: fest, tief, rutschig, steinig, mit Löchern."],
      ["Heimweg-Effekt", "Viele Pferde werden auf dem Weg zum Stall schneller und schwerer zu regulieren."],
      ["Galoppstrecke", "Vorher bekannte, geeignete Strecke für Trab und Galopp."],
    ),
    deep: {
      minutes: 8,
      sections: [
        {
          heading: "Wo und wann",
          text: "Trab und Galopp nur dort, wo:\n• der Boden fest, eben und griffig ist, ohne Löcher, Steine oder Wurzeln,\n• der Weg gut einsehbar ist,\n• keine Fußgänger, Radfahrer oder Fahrzeuge in der Nähe sind,\n• es erlaubt ist.\n\nNicht auf Asphalt, nicht auf nassem Gras, nicht bergab, nicht bei Glätte, nicht im tiefen Matsch, nicht auf unbekannten Wegen. Nicht in Richtung Stall – viele Pferde werden auf dem Heimweg schneller und sind schwerer zu halten. Und nicht immer an derselben Stelle – sonst galoppiert das Pferd dort bald von allein an.",
        },
        {
          heading: "Vorbereitung und Ablauf",
          text: "1. Ansage an die Gruppe, Rückfrage, ob alle bereit sind.\n2. Ruhig antraben, einige Minuten traben, dann erst angaloppieren.\n3. Im leichten Sitz galoppieren, Hand ruhig, Tempo ruhig.\n4. Das Ende der Strecke festlegen und vorher durchparieren – nicht erst, wenn der Weg endet.\n5. Nach dem Galopp im Schritt durchschnaufen, Gruppe sammeln.\n\nDie Tete bestimmt ein Tempo, das alle halten können. Niemand überholt.",
        },
        {
          heading: "Wie es sich anfühlt",
          text: "Ein kontrollierter Geländegalopp fühlt sich ruhig und gleichmäßig an: Das Pferd bleibt an den Hilfen, reagiert auf halbe Paraden, und du hast das Gefühl, jederzeit durchparieren zu können.\n\nWarnzeichen: Das Pferd wird immer schneller, hört nicht mehr auf Paraden, der Kopf geht hoch, es „zieht“. Dann früh reagieren: halbe Paraden, Tempo reduzieren, auf einen großen Bogen lenken (wenn der Platz es sicher erlaubt), in den Trab und dann Schritt.",
        },
        {
          heading: "Der erste Galopp im Gelände",
          text: "• Mit einem ruhigen, erfahrenen Begleitpferd, das vorne geht.\n• Auf einer bekannten, leicht ansteigenden Strecke – bergauf sind Pferde leichter zu regulieren.\n• Nur kurz, im ruhigen Tempo.\n• Vorher auf dem Platz Galopp–Trab-Übergänge im leichten Sitz üben.\n• Nicht in der Gruppe mit vielen fremden Pferden.\n\nWenn es gut geklappt hat: loben, Schritt, nach Hause – nicht gleich noch einen.",
        },
      ],
      praxis: {
        title: "Der Feldweg bergauf",
        text: "Für Milas ersten Geländegalopp wählt Hanna einen breiten, leicht ansteigenden Feldweg mit festem Boden. Tivoli geht mit Ben vorne. Nach einigen Minuten Trab ruft Ben: „Galopp – alle bereit?“ Mila antwortet „Ja!“ und galoppiert im leichten Sitz hinter Tivoli an.\n\nNach etwa 200 Metern, vor dem Ende des Anstiegs, pariert Ben durch, Mila pariert ebenfalls durch. Tonga schnaubt, Mila strahlt. Danach geht es im Schritt nach Hause.",
      },
      fehler: fehler(
        ["Auf dem Heimweg galoppieren.", "Vom Stall weg oder auf neutralen Strecken."],
        ["Immer an derselben Stelle angaloppieren.", "Variieren, damit das Pferd nicht vorwegnimmt."],
        ["Auf unbekanntem oder rutschigem Boden galoppieren.", "Nur bekannte, feste, ebene Wege."],
        ["Bis zum Ende des Weges galoppieren.", "Rechtzeitig vorher durchparieren."],
      ),
      richtig: [
        "Wähle bekannte, feste, einsehbare Strecken.",
        "Kündige an und frag, ob alle bereit sind.",
        "Traben vor dem Galoppieren, dann ruhig angaloppieren.",
        "Galoppiere im leichten Sitz und in ruhigem Tempo.",
        "Pariere rechtzeitig durch.",
        "Galoppiere nicht in Richtung Stall.",
      ],
      merke: [
        "Nur auf bekanntem, festem, einsehbarem Boden traben und galoppieren.",
        "Nicht Richtung Stall, nicht immer an derselben Stelle.",
        "Ansage, Rückfrage, ruhiges Tempo.",
        "Erster Galopp: bergauf, kurz, mit Führpferd.",
      ],
      weiter: weiter(["Sicheres Reiten in der Gruppe", "ra-w19-l3"], ["Durchgehen: Vorbeugung und Verhalten", "ra-w19-l9"], ["Galoppsitz, Balance und Mitschwingen", "ra-w18-l14"]),
    },
    exercise: [
      wahl(
        "ra-w19-l8-entscheidung",
        "Ihr seid auf dem Rückweg, 500 m vor dem Stall, und jemand schlägt einen Galopp vor. Was ist richtig?",
        "Nicht galoppieren – auf dem Heimweg werden viele Pferde schneller und schwer kontrollierbar",
        [
          ["Galoppieren, die Pferde wollen ja nach Hause", "Genau das macht es gefährlich."],
          ["Galoppieren, aber nur die Erfahrenen", "Die anderen Pferde wollen dann mit."],
        ],
        "Richtig. Galopp auf dem Heimweg ist ein häufiger Unfallgrund.",
      ),
    ],
    quiz: [
      frage("boden", "Wo galoppierst du im Gelände nicht?", "Auf Asphalt, nassem Gras oder bergab", [["Auf einem festen, ebenen Feldweg", "Dort ist es geeignet."], ["Leicht bergauf auf festem Boden", "Das ist sogar besonders günstig."]], "Genau. Rutsch- und Sturzgefahr."),
      frage("erster", "Welche Strecke eignet sich für den ersten Galopp im Gelände?", "Eine bekannte, leicht ansteigende Strecke mit festem Boden", [["Eine lange Gerade Richtung Stall", "Richtung Stall wird das Pferd oft schneller."], ["Ein schmaler Waldweg mit Kurven", "Dort ist es unübersichtlich."]], "Richtig. Bergauf lässt sich das Tempo leichter regulieren."),
      frage("ende", "Wann parierst du durch?", "Rechtzeitig vor dem Ende der Strecke", [["Erst wenn der Weg endet", "Dann bleibt kein Platz zum Bremsen."], ["Wenn das Pferd müde ist", "Du bestimmst das Ende, nicht die Müdigkeit."]], "Genau. Mit Planung bleibt alles kontrolliert."),
    ],
  },
];
