import "server-only";
import { head, item } from "../../build";
import { begriffe, fehler, frage, tabelle, wahl, weiter, type DeepInput } from "../deep-kit";

/** Modul 12, Lektionen 1–4 */
export const teil1: DeepInput[] = [
  /* ---------- 1. Wahrnehmung ---------- */
  {
    slug: "wahrnehmung",
    title: "Wie Pferde ihre Umwelt wahrnehmen",
    speaker: "mila",
    intro:
      "Hundertmal ist dein Pferd an der blauen Mülltonne vorbeigegangen. Heute steht sie auf der anderen Seite des Wegs – und es springt zur Seite. „Das kennt er doch!“ Nein: Für ein Pferd ist eine Mülltonne auf der anderen Seite möglicherweise eine neue Mülltonne.",
    illustration: head("tivoli", "neugierig"),
    terms: begriffe(
      ["Monokulares Sehen", "Jedes Auge sieht einen eigenen Bereich – so überblickt das Pferd fast die ganze Umgebung."],
      ["Binokulares Sehen", "Beide Augen sehen denselben Bereich vor dem Pferd; dort kann es Entfernungen gut einschätzen."],
      ["Toter Winkel", "Bereiche direkt hinter dem Pferd und direkt vor bzw. unter der Nase, die es nicht sieht."],
      ["Flehmen", "Hochziehen der Oberlippe, um Gerüche mit einem besonderen Riechorgan zu prüfen."],
    ),
    deep: {
      minutes: 9,
      sections: [
        {
          heading: "Sehen: fast rundum, aber anders",
          text: "Die Augen sitzen seitlich am Kopf. Dadurch überblickt ein Pferd fast seine ganze Umgebung, ohne den Kopf zu drehen. Nur direkt hinter ihm und direkt vor und unter der Nase liegen tote Winkel. Vor dem Pferd gibt es einen Bereich, den beide Augen gemeinsam sehen; dort kann es Entfernungen gut einschätzen. Seitlich sieht jedes Auge für sich.\n\nPferde nehmen Bewegungen sehr gut wahr, auch am Rand des Gesichtsfelds – ein Vorteil für ein Fluchttier. Farben sehen sie anders als wir: Blau und Gelb unterscheiden sie gut, Rot und Grün kaum. Beim Wechsel von hell zu dunkel, etwa beim Hineinreiten in eine Halle, brauchen ihre Augen länger als unsere, um sich anzupassen.",
        },
        {
          heading: "Warum die Mülltonne „neu“ ist",
          text: "Weil jedes Auge seinen eigenen Bereich sieht, muss ein Pferd Dinge oft von beiden Seiten kennenlernen. Was es links gesehen hat, erkennt es von rechts nicht immer sofort wieder. Auch ein bekannter Gegenstand an einem neuen Ort oder in neuer Lage kann zunächst verdächtig wirken.\n\nDazu kommt der tote Winkel: Ein Mensch, der sich von hinten nähert, taucht plötzlich auf. Deshalb sprichst du ein Pferd an, bevor du von hinten kommst, und näherst dich am besten seitlich von vorn, an der Schulter.",
        },
        {
          heading: "Hören, Riechen, Tasten",
          text: "Pferde hören höhere Töne als wir und können ihre Ohren unabhängig voneinander in Richtung eines Geräuschs drehen. Ein Ohr kann nach vorn auf den Weg gerichtet sein, das andere nach hinten zum Reiter. Plötzliche, unbekannte Geräusche – raschelnde Folien, knackende Äste – lösen schnell Aufmerksamkeit oder Flucht aus.\n\nDer Geruchssinn ist sehr fein. Pferde erkennen Artgenossen und Menschen am Geruch, prüfen Futter, Kot und neue Gegenstände mit der Nase. Beim Flehmen ziehen sie die Oberlippe hoch, um Gerüche mit einem besonderen Riechorgan im Gaumen zu untersuchen.\n\nDie Haut ist so empfindlich, dass ein Pferd eine einzelne Fliege spürt. Feine Hilfen beim Reiten funktionieren nur deshalb – und grobe Hilfen sind entsprechend unangenehm. Die Tasthaare am Maul helfen, Dinge direkt vor der Nase zu ertasten, die es nicht sieht.",
        },
        {
          heading: "Was das für den Umgang bedeutet",
          text: "• Ansprechen, bevor du dich näherst, vor allem von hinten.\n• Neues von beiden Seiten zeigen.\n• Dem Pferd Zeit geben, Neues anzuschauen und zu beriechen – mit Kopf und Hals, die es dafür frei bewegen kann.\n• Beim Wechsel von hell zu dunkel kurz Zeit lassen.\n• Nicht schimpfen, wenn ein Pferd etwas „Bekanntes“ beäugt – es nimmt die Welt anders wahr als du.",
        },
      ],
      praxis: {
        title: "Die Plane am Zaun",
        text: "Am Reitplatzzaun hängt neu eine grüne Werbeplane, die im Wind flattert. Tonga schnaubt, geht zögerlich und macht auf der linken Hand einen großen Bogen. Tilda reitet nicht direkt darauf zu, sondern lässt Tonga im Schritt mit Abstand vorbeigehen, den Kopf frei, und lobt jeden Schritt in die richtige Richtung.\n\nNach einigen Runden ist es auf der linken Hand gut. Auf der rechten Hand beginnt alles fast von vorn – Tilda ist nicht überrascht, denn jetzt sieht Tonga die Plane mit dem anderen Auge. Nach zehn Minuten geht sie auf beiden Händen entspannt vorbei.",
      },
      fehler: fehler(
        ["Ein Pferd ohne Ansprache von hinten berühren.", "Ansprechen und seitlich an der Schulter nähern."],
        ["„Das kennt er doch!“ – und das Pferd strafen.", "Neues an neuer Stelle und von der anderen Seite ist für das Pferd oft wirklich neu."],
        ["Den Kopf festhalten, wenn das Pferd etwas anschauen will.", "Kopf und Hals frei lassen, damit es schauen und riechen kann."],
        ["Aus der Sonne direkt in eine dunkle Halle traben.", "Kurz Zeit zur Anpassung der Augen geben."],
      ),
      richtig: [
        "Sprich dein Pferd an, bevor du dich näherst.",
        "Nähere dich seitlich von vorn an der Schulter.",
        "Zeige Neues von beiden Seiten.",
        "Lass das Pferd schauen und riechen.",
        "Gib beim Wechsel von hell zu dunkel kurz Zeit.",
      ],
      merke: [
        "Pferde sehen fast rundum, haben aber tote Winkel direkt hinter sich und vor der Nase.",
        "Was ein Auge kennt, muss das andere oft noch kennenlernen.",
        "Ohren, Nase und Haut sind sehr fein – grobe Hilfen sind unnötig.",
        "Ansprechen, seitlich nähern, Zeit lassen.",
      ],
      weiter: weiter(["Grundkurs: Wie Pferde die Welt wahrnehmen", "ra-w9-l3"], ["Die Körpersprache des Pferdes verstehen", "ra-w17-l2"], ["Schreckhafte Pferde und unerwartete Situationen", "ra-w19-l7"]),
    },
    exercise: [
      wahl(
        "ra-w17-l1-entscheidung",
        "Dein Pferd ist auf der linken Hand ruhig an einer neuen Fahne vorbeigegangen, auf der rechten Hand scheut es. Warum?",
        "Weil es die Fahne jetzt mit dem anderen Auge sieht und sie für dieses Auge neu ist",
        [
          ["Weil es dich ärgern will", "Pferde handeln nicht aus Trotz. Es nimmt die Fahne anders wahr."],
          ["Weil es auf der rechten Hand müde ist", "Mit Müdigkeit hat das nichts zu tun."],
        ],
        "Richtig. Deshalb zeigt man Neues immer von beiden Seiten.",
      ),
    ],
    quiz: [
      frage("toter", "Wo hat ein Pferd tote Winkel?", "Direkt hinter sich und direkt vor bzw. unter der Nase", [["Nur seitlich", "Seitlich sieht es besonders gut."], ["Es hat keine toten Winkel", "Direkt hinter sich sieht es nichts."]], "Genau. Deshalb sprichst du es an, bevor du dich von hinten näherst."),
      frage("farben", "Welche Farben kann ein Pferd kaum unterscheiden?", "Rot und Grün", [["Blau und Gelb", "Diese Farben unterscheiden Pferde gut."], ["Schwarz und Weiß", "Hell und Dunkel unterscheiden Pferde sehr gut."]], "Richtig. Ein rotes Hindernis auf grünem Rasen ist für Pferde schlecht zu erkennen."),
      frage("flehmen", "Wozu flehmt ein Pferd?", "Um Gerüche mit einem besonderen Riechorgan zu prüfen", [["Weil es lacht", "Pferde lachen nicht – es ist eine Riechtechnik."], ["Weil es Zahnschmerzen hat", "Flehmen ist normales Verhalten, kann aber bei Kolik häufiger vorkommen."]], "Genau. Häufiges Flehmen ohne Anlass kann aber ein Kolikzeichen sein."),
      frage("naehern", "Wie näherst du dich einem Pferd am besten?", "Ansprechen und seitlich von vorn an der Schulter", [["Leise von hinten, um es nicht zu stören", "Von hinten erschrickst du es im toten Winkel."], ["Frontal direkt auf die Stirn zu", "Direkt vor der Nase sieht es dich schlecht."]], "Richtig. So sieht und hört es dich rechtzeitig."),
    ],
  },

  /* ---------- 2. Körpersprache ---------- */
  {
    slug: "koerpersprache-verstehen",
    title: "Die Körpersprache des Pferdes verstehen",
    speaker: "lea",
    intro:
      "„Ohren nach hinten heißt böse.“ Diesen Satz lernen viele Kinder in der ersten Reitstunde. Er stimmt nur manchmal. Ein Pferd, das unter dem Sattel ein Ohr nach hinten dreht, hört dir vielleicht gerade besonders aufmerksam zu.",
    illustration: tabelle("Lesen lernen", "Immer das ganze Pferd anschauen", [
      ["Körperteil", "Worauf du achtest"],
      ["Ohren", "Richtung, Spannung, Beweglichkeit"],
      ["Augen", "weich oder groß, Falten darüber, Augenweiß"],
      ["Maul und Nüstern", "locker oder verkniffen, weit oder schmal"],
      ["Kopf und Hals", "Höhe, Spannung"],
      ["Schweif", "locker, schlagend, eingeklemmt, hoch"],
      ["Körper und Beine", "Gewicht, Spannung, Richtung"],
    ]),
    terms: begriffe(
      ["Ausdrucksverhalten", "Alle Signale, mit denen ein Pferd seine Stimmung und Absicht zeigt."],
      ["Kontext", "Die Situation, in der ein Signal auftritt – sie entscheidet über seine Bedeutung."],
      ["Horse Grimace Scale", "Wissenschaftlich entwickelte Skala, die Schmerz am Gesichtsausdruck erkennbar macht."],
    ),
    deep: {
      minutes: 10,
      sections: [
        {
          heading: "Kein Signal allein",
          text: "Körpersprache ist kein Wörterbuch, in dem jedes Signal genau eine Bedeutung hat. Ein angelegtes Ohr kann Drohung bedeuten – oder Konzentration auf etwas hinter dem Pferd. Ein hoher Kopf kann Aufmerksamkeit oder Angst zeigen. Erst wenn du mehrere Signale zusammen mit der Situation betrachtest, ergibt sich ein Bild.\n\nFrage dich deshalb immer: Was zeigen Ohren, Augen, Maul, Kopf, Schweif und Körper gleichzeitig? Was passiert gerade um das Pferd herum? Wie verhält es sich sonst? Und: Könnte Schmerz eine Rolle spielen?",
        },
        {
          heading: "Ohren, Augen, Maul",
          text: "• Ohren: Nach vorn gerichtete, bewegliche Ohren zeigen Aufmerksamkeit für etwas vor dem Pferd. Seitlich hängende, lockere Ohren zeigen meist Entspannung. Ein zum Reiter gedrehtes Ohr bedeutet oft Aufmerksamkeit. Fest und flach nach hinten gelegte Ohren mit angespanntem Gesicht sind ein Warnsignal.\n• Augen: Ein weicher Blick mit runden Lidern zeigt Ruhe. Weit geöffnete Augen mit sichtbarem Weiß, Falten über dem Auge („Sorgenfalten“) oder ein starrer Blick zeigen Anspannung, Angst oder Schmerz.\n• Maul und Nüstern: Eine lockere, leicht hängende Unterlippe spricht für Entspannung. Ein verkniffenes Maul, angespannte Kaumuskeln, ein langgezogenes Kinn und schmal gezogene Nüstern sind Anspannungs- und Schmerzzeichen. Weit geblähte Nüstern zeigen Aufregung oder Anstrengung.",
        },
        {
          heading: "Kopf, Schweif, Körper",
          text: "• Kopf und Hals: tief und locker beim Dösen und Grasen; hoch und angespannt bei Aufmerksamkeit oder Angst; vorgestreckt mit angelegten Ohren als Drohung.\n• Schweif: locker hängend und mitschwingend ist entspannt. Heftiges, wiederholtes Schlagen ohne Insekten zeigt Unwohlsein oder Ärger. Ein eingeklemmter Schweif deutet auf Angst, Schmerz oder Kälte hin; ein hoch getragener Schweif auf Aufregung oder Imponieren.\n• Körper und Beine: Gewicht gleichmäßig, ein Hinterbein entlastet – Ruhe. Muskeln angespannt, Gewicht nach hinten, Hinterhand zugedreht – Abwehr. Ein gehobenes Hinterbein kann eine Drohung sein.",
        },
        {
          heading: "Das Schmerzgesicht",
          text: "Forschende haben gezeigt, dass sich Schmerz im Gesicht des Pferdes erkennen lässt. Die „Horse Grimace Scale“ beschreibt typische Merkmale: steif nach hinten gerichtete Ohren, eine angespannte Partie über den Augen, ein zurückgezogener Blick, angespannte Kaumuskulatur, ein verkniffenes Maul mit betontem Kinn und angespannte Nüstern.\n\nDiese Zeichen sind leise und werden im Alltag oft übersehen oder als „schlechte Laune“ gedeutet. Wer sie kennt, kann Schmerzen früher erkennen – und Pferde gerechter beurteilen.",
        },
      ],
      praxis: {
        title: "Zwei Pferde, dieselben Ohren",
        text: "Mila beobachtet zwei Pferde in der Reitbahn. Bei beiden zeigt ein Ohr nach hinten. Scrabble trägt den Kopf locker, kaut ruhig, sein Schweif schwingt mit, das zurückgedrehte Ohr bewegt sich mit den Hilfen seiner Reiterin – er hört zu. Ein anderes Pferd hat beide Ohren fest zurückgelegt, das Maul verkniffen, der Schweif schlägt bei jedem Schenkeldruck.\n\nDieselbe Ohrenstellung, zwei völlig unterschiedliche Bedeutungen. Mila erzählt es der Reitlehrerin, die der Besitzerin des zweiten Pferds rät, Sattel und Rücken prüfen zu lassen.",
      },
      fehler: fehler(
        ["Ein einzelnes Signal deuten.", "Immer das ganze Pferd und die Situation betrachten."],
        ["„Ohren hinten heißt böse.“", "Ohren nach hinten können auch Aufmerksamkeit bedeuten."],
        ["Schmerzzeichen als „schlechte Laune“ abtun.", "Bei wiederkehrenden Anspannungszeichen Schmerz abklären lassen."],
        ["Nur auf die Ohren schauen.", "Augen, Maul, Schweif und Körper gehören dazu."],
      ),
      richtig: [
        "Betrachte Ohren, Augen, Maul, Kopf, Schweif und Körper zusammen.",
        "Beziehe die Situation mit ein: Was passiert gerade?",
        "Vergleiche mit dem normalen Verhalten des Pferdes.",
        "Achte auf Zeichen des Schmerzgesichts.",
        "Beschreibe, was du siehst, bevor du es deutest.",
      ],
      merke: [
        "Kein Signal allein – das ganze Pferd und die Situation zählen.",
        "Ohren nach hinten können Drohung oder Aufmerksamkeit sein.",
        "Verkniffenes Maul, Falten über den Augen, steife Ohren: mögliche Schmerzzeichen.",
        "Beschreiben vor Deuten.",
      ],
      weiter: weiter(["Grundkurs: Körpersprache – was sagt mein Pferd?", "ra-w9-l1"], ["Entspannung, Wohlbefinden und Ruheverhalten", "ra-w17-l3"], ["Stress, Angst und Überforderung erkennen", "ra-w17-l4"]),
    },
    exercise: [
      wahl(
        "ra-w17-l2-entscheidung",
        "Beim Reiten dreht ein Pferd ein Ohr nach hinten, kaut ruhig, trägt den Kopf locker und der Schweif schwingt mit. Was zeigt es wahrscheinlich?",
        "Aufmerksamkeit für den Reiter",
        [
          ["Ärger und Abwehr", "Dafür fehlen andere Zeichen wie verkniffenes Maul oder schlagender Schweif."],
          ["Schmerzen", "Bei Schmerz würden mehrere Anspannungszeichen gleichzeitig auftreten."],
        ],
        "Richtig. Das Gesamtbild ist entspannt und aufmerksam.",
      ),
    ],
    quiz: [
      frage("ganz", "Wie liest man Körpersprache richtig?", "Mehrere Signale zusammen und im Zusammenhang mit der Situation", [["Nur an den Ohren", "Die Ohren allein sind nicht eindeutig."], ["Mit einer festen Tabelle: ein Signal = eine Bedeutung", "Signale können je nach Situation Verschiedenes bedeuten."]], "Genau. Erst das Gesamtbild ergibt Sinn."),
      frage("schmerz", "Welches ist ein mögliches Schmerzzeichen im Gesicht?", "Angespannte Partie über den Augen und verkniffenes Maul", [["Hängende Unterlippe beim Dösen", "Das ist ein Entspannungszeichen."], ["Ohren nach vorn auf etwas Interessantes", "Das ist Aufmerksamkeit."]], "Richtig. Diese Zeichen beschreibt die Horse Grimace Scale."),
      frage("schweif", "Was kann heftiges, wiederholtes Schweifschlagen ohne Insekten bedeuten?", "Unwohlsein, Ärger oder Schmerz", [["Freude", "Freude zeigt sich anders."], ["Müdigkeit", "Müde Pferde lassen den Schweif eher hängen."]], "Genau. Besonders, wenn es bei bestimmten Hilfen auftritt."),
      frage("augen", "Was zeigen weit geöffnete Augen mit sichtbarem Weiß?", "Oft Anspannung oder Angst", [["Tiefe Entspannung", "Entspannte Pferde haben einen weichen Blick."], ["Hunger", "Das hat mit Hunger nichts zu tun."]], "Richtig. Achte dann auf weitere Zeichen."),
    ],
  },

  /* ---------- 3. Entspannung ---------- */
  {
    slug: "entspannung-wohlbefinden",
    title: "Entspannung, Wohlbefinden und Ruheverhalten",
    speaker: "ben",
    intro:
      "Wir achten oft darauf, wann ein Pferd gestresst ist. Mindestens genauso wichtig ist zu erkennen, wann es sich wohlfühlt. Denn nur ein entspanntes Pferd kann gut lernen – und wer Entspannung erkennt, merkt auch, wenn sie fehlt.",
    illustration: head("tonga", "entspannt"),
    terms: begriffe(
      ["Komfortverhalten", "Verhalten zur Körperpflege und zum Wohlbefinden, z. B. Wälzen, Kratzen, gegenseitige Fellpflege."],
      ["Spielverhalten", "Rennen, Scheinkämpfe und Erkunden ohne ernste Absicht – ein Zeichen für Wohlbefinden."],
      ["Abschnauben", "Kräftiges Ausatmen durch die Nüstern, oft bei Entspannung in der Arbeit."],
    ),
    deep: {
      minutes: 7,
      sections: [
        {
          heading: "Zeichen von Entspannung",
          text: "• Kopf und Hals werden tief oder waagerecht getragen.\n• Ohren seitlich, locker, beweglich.\n• Augen weich, Lider entspannt, bei Müdigkeit halb geschlossen.\n• Unterlippe locker, beim Dösen hängend.\n• Nüstern rund und weich, Atmung ruhig.\n• Ein Hinterbein entlastet, Gewicht auf den anderen drei Beinen.\n• Schweif hängt locker.\n\nIn Bewegung zeigt sich Entspannung durch einen schwingenden Rücken, einen locker getragenen Schweif, gleichmäßige Tritte, Kauen und Abschnauben.",
        },
        {
          heading: "Ruhen und Schlafen",
          text: "Pferde ruhen über den Tag verteilt in vielen kurzen Phasen. Im Stehen dösen sie mit entlastetem Hinterbein, in Brustlage ruhen sie mit untergeschlagenen Beinen, in Seitenlage liegen sie flach – nur in dieser Lage oder mit aufgestütztem Kopf in Brustlage erreichen sie den Tiefschlaf.\n\nPferde liegen eher, wenn sie sich sicher fühlen. In einer Gruppe wechseln sie sich oft ab: Einer bleibt stehen, während andere liegen. Ein Pferd, das nie liegt, kann ein Problem mit Platz, Untergrund, Gruppe oder Schmerzen haben (siehe Modul „Pferdehaltung, Pferdealltag & Fütterung“, Lektion 1).",
        },
        {
          heading: "Komfort- und Spielverhalten",
          text: "Pferde wälzen sich, kratzen sich an Bäumen, schubbern sich gegenseitig an Mähne und Widerrist. Gegenseitige Fellpflege findet meist zwischen befreundeten Pferden statt und senkt nachweislich Herzfrequenz und Anspannung.\n\nSpielen – Rennen, Bocksprünge, spielerisches Kneifen, Untersuchen von Gegenständen – kommt vor allem bei jungen Pferden vor, aber auch bei erwachsenen, denen es gut geht. Ein Pferd, das nie spielt oder sich nie wälzt, ist nicht unbedingt unglücklich, aber es lohnt sich, nachzufragen.",
        },
        {
          heading: "Entspannung fördern",
          text: "• Ausreichend Raufutter, Bewegung und Sozialkontakt (die Grundbedürfnisse) sind die Basis.\n• Ruhige, vorhersehbare Abläufe im Stall.\n• Ein gutes Aufwärmen im Schritt am langen Zügel vor der Arbeit.\n• Pausen in der Arbeit, in denen das Pferd sich dehnen darf.\n• Ein ruhiger, klarer Mensch: Pferde reagieren stark auf Spannung und Hektik in unserem Körper.\n\nAchtung: Gähnen, Lecken und Kauen werden oft als Entspannungszeichen gedeutet. Sie treten tatsächlich häufig auf, wenn Anspannung nachlässt – häufiges Gähnen kann aber auch mit Stress oder Magenproblemen zusammenhängen. Auch hier zählt das Gesamtbild.",
        },
      ],
      praxis: {
        title: "Mittagsruhe auf dem Paddock",
        text: "Ben setzt sich in der Mittagspause mit einem Notizblock an den Offenstall. Er beobachtet eine Stunde lang: Tivoli döst mit hängender Unterlippe, Tonga liegt in Brustlage, Scrabble steht daneben, die Ohren mal hier, mal dort. Nach einer Weile steht Tonga auf, Scrabble legt sich hin.\n\nAls ein Traktor vorbeifährt, heben alle drei den Kopf, schauen kurz – und dösen weiter. Ben schreibt auf: „Entspannte Gruppe, wechseln sich beim Liegen ab, kurze Aufmerksamkeit, schnelle Rückkehr zur Ruhe.“ Genau dieses schnelle Zurückfinden ist ein gutes Zeichen.",
      },
      fehler: fehler(
        ["Ein dösendes Pferd für krank halten.", "Dösen mit entlastetem Hinterbein ist normales Ruheverhalten."],
        ["Pferde beim Liegen ständig stören.", "Ruhephasen respektieren."],
        ["Gähnen immer als Entspannung deuten.", "Häufiges Gähnen kann auch auf Stress oder Magenprobleme hinweisen."],
        ["Sofort mit der Arbeit beginnen.", "Erst im Schritt am langen Zügel lösen."],
      ),
      richtig: [
        "Beobachte dein Pferd in Ruhe, ohne es zu stören.",
        "Notiere, wie, wo und wie lange es ruht und liegt.",
        "Fördere Entspannung durch Grundbedürfnisse und ruhige Abläufe.",
        "Plane in der Arbeit Pausen zum Dehnen ein.",
        "Achte auf deine eigene Spannung.",
      ],
      merke: [
        "Entspannung: tiefer Kopf, lockere Ohren, weiche Augen, hängende Unterlippe, entlastetes Hinterbein.",
        "Tiefschlaf nur im Liegen – und nur, wenn sich das Pferd sicher fühlt.",
        "Fellpflege und Spiel zeigen Wohlbefinden.",
        "Ein entspanntes Pferd lernt besser.",
      ],
      weiter: weiter(["Stress, Angst und Überforderung erkennen", "ra-w17-l4"], ["Die natürlichen Grundbedürfnisse", "ra-w15-l1"], ["Losgelassenheit und Dehnung", "ra-w12-l2"]),
    },
    exercise: [
      wahl(
        "ra-w17-l3-entscheidung",
        "Welches Bild zeigt am ehesten ein entspanntes Pferd?",
        "Kopf tief, Ohren seitlich, Unterlippe hängt, ein Hinterbein entlastet",
        [
          ["Kopf hoch, Ohren steif nach vorn, Schweif hoch getragen", "Das zeigt hohe Aufmerksamkeit oder Aufregung."],
          ["Ohren flach zurück, Maul verkniffen, Schweif schlägt", "Das sind Zeichen von Ärger oder Unwohlsein."],
        ],
        "Richtig. So sieht Dösen aus.",
      ),
    ],
    quiz: [
      frage("liegen", "Wann legen sich Pferde zum Tiefschlaf hin?", "Wenn sie sich sicher fühlen", [["Nur, wenn sie krank sind", "Liegen ist normales Ruheverhalten."], ["Nur tagsüber in der Sonne", "Pferde liegen vor allem nachts und früh morgens."]], "Genau. In Gruppen wechseln sie sich dabei ab."),
      frage("fellpflege", "Was bewirkt gegenseitige Fellpflege?", "Sie senkt Anspannung und stärkt Beziehungen", [["Sie zeigt einen Streit an", "Fellpflege findet meist zwischen befreundeten Pferden statt."], ["Sie hat keine Bedeutung", "Sie ist wichtiges Sozialverhalten."]], "Richtig. Sie senkt sogar die Herzfrequenz."),
      frage("gaehnen", "Was gilt für häufiges Gähnen?", "Es kann mit Entspannung, aber auch mit Stress oder Magenproblemen zusammenhängen", [["Es bedeutet immer, dass das Pferd müde ist", "Gähnen hat mehrere mögliche Ursachen."], ["Es ist immer ein Zeichen für Entspannung", "Auch hier zählt das Gesamtbild."]], "Genau. Deshalb das ganze Pferd betrachten."),
    ],
  },

  /* ---------- 4. Stress, Angst, Überforderung ---------- */
  {
    slug: "stress-angst-ueberforderung",
    title: "Stress, Angst und Überforderung erkennen",
    speaker: "mila",
    intro:
      "Ein Pferd, das scheinbar „plötzlich explodiert“, hat meist vorher viele kleine Zeichen gezeigt, die niemand gesehen hat. Wer diese frühen Signale kennt, kann reagieren, bevor es gefährlich wird.",
    illustration: head("scrabble", "aufgeregt"),
    terms: begriffe(
      ["Stress", "Körperliche und seelische Reaktion auf eine Belastung; kurzfristig normal, dauerhaft schädlich."],
      ["Erlernte Hilflosigkeit", "Zustand, in dem ein Pferd aufgibt, weil es keine Möglichkeit sieht, eine unangenehme Situation zu beeinflussen. Es wirkt ruhig, ist aber stark belastet."],
      ["Reizschwelle", "Der Punkt, an dem ein Pferd von Aufmerksamkeit in Angst oder Flucht umschaltet."],
    ),
    deep: {
      minutes: 9,
      sections: [
        {
          heading: "Frühe Zeichen",
          text: "Stress beginnt leise: Das Pferd wird aufmerksamer, der Kopf geht höher, die Ohren richten sich steif auf einen Punkt, die Muskeln spannen sich. Die Atmung wird schneller, die Nüstern weiter, das Maul fest. Es frisst nicht mehr, wenn es vorher gefressen hat. Manche Pferde äppeln häufiger, treten auf der Stelle, wiehern oder drehen sich.\n\nWichtig: Diese Zeichen sind keine „Unart“, sondern Information. In diesem Moment kann das Pferd oft noch gut reagieren, wenn der Mensch Abstand schafft, Zeit gibt oder die Anforderung verringert.",
        },
        {
          heading: "Angst und Flucht",
          text: "Steigt die Spannung weiter, sieht man Augenweiß, einen hoch erhobenen Kopf, einen hoch getragenen oder eingeklemmten Schweif, Zittern, Schwitzen, Schnauben. Das Pferd versucht, sich zu entfernen, rückwärtszugehen oder sich zu drehen. Wenn das nicht möglich ist, kann es steigen, springen, losstürmen oder in Panik geraten.\n\nIn diesem Zustand ist ein Pferd kaum noch ansprechbar. Lernen ist nicht möglich. Das Ziel ist deshalb, die Reizschwelle gar nicht erst zu überschreiten.",
        },
        {
          heading: "Überforderung und die stille Seite",
          text: "Nicht jedes gestresste Pferd ist laut. Manche werden still, wirken abwesend, mit starrem Blick und wenig Reaktion. Das kann bedeuten, dass ein Pferd innerlich „abschaltet“, weil es keinen Ausweg sieht – Fachleute sprechen von erlernter Hilflosigkeit. Ein solches Pferd wirkt brav, ist aber stark belastet.\n\nÜberforderung zeigt sich auch im Training: Ein Pferd, das eine Übung nicht versteht oder körperlich nicht kann, reagiert mit Spannung, Eilen, Stehenbleiben, Schweifschlagen oder Widerstand. Das ist kein Ungehorsam, sondern ein Hinweis, dass die Anforderung zu hoch ist.",
        },
        {
          heading: "Schmerz nie vergessen",
          text: "Viele Zeichen von Stress und Abwehr sehen genauso aus wie Zeichen von Schmerz. Ein Pferd, das beim Satteln beißt, beim Angaloppieren buckelt oder plötzlich nicht mehr an einer Stelle vorbeigeht, hat vielleicht Rückenschmerzen, Zahnprobleme oder Magengeschwüre.\n\nDeshalb gilt bei jeder neuen oder zunehmenden Verhaltensauffälligkeit: zuerst Schmerz und körperliche Ursachen tierärztlich ausschließen lassen.",
        },
      ],
      praxis: {
        title: "Der Hänger",
        text: "Scrabble soll zum ersten Mal seit zwei Jahren in den Anhänger. Wilhelm führt ihn hin. Scrabble bleibt stehen, Kopf hoch, Ohren steif nach vorn, er schnaubt. Wilhelm zieht nicht, sondern wartet, bis Scrabble den Kopf senkt und an der Rampe schnuppert, dann lobt er und geht ein paar Schritte zurück.\n\nSo arbeiten sie sich über mehrere Tage in kleinen Schritten heran. Als Scrabble beim dritten Versuch kurz Augenweiß zeigt und zittert, hört Wilhelm auf und beendet die Einheit mit etwas, das Scrabble kann. Am fünften Tag steht er ruhig im Hänger und frisst Heu.",
      },
      fehler: fehler(
        ["Frühe Stresszeichen übersehen und weitermachen.", "Bei ersten Zeichen Abstand, Zeit oder geringere Anforderung."],
        ["Ein ängstliches Pferd „durchsetzen“.", "Angst lässt sich nicht wegstrafen – kleine Schritte und Vertrauen."],
        ["Ein stilles, starres Pferd für brav halten.", "Starrheit und Abwesenheit können starke Belastung bedeuten."],
        ["Verhaltensänderungen nur als Erziehungsproblem sehen.", "Zuerst Schmerz ausschließen lassen."],
      ),
      richtig: [
        "Lerne die frühen Zeichen deines Pferdes kennen.",
        "Reagiere früh: Abstand, Zeit, Anforderung verringern.",
        "Arbeite unterhalb der Reizschwelle in kleinen Schritten.",
        "Beende Übungen mit etwas, das gelingt.",
        "Lass bei neuen Verhaltensauffälligkeiten Schmerzen tierärztlich abklären.",
      ],
      merke: [
        "Stress beginnt leise – frühe Zeichen beachten.",
        "Ein Pferd in Panik kann nicht lernen.",
        "Still und starr heißt nicht entspannt.",
        "Bei Verhaltensänderungen immer an Schmerz denken.",
      ],
      weiter: weiter(["Wie Pferde lernen", "ra-w17-l7"], ["Häufige Verhaltensprobleme und mögliche Ursachen", "ra-w17-l11"], ["Wenn ein Pferd nicht mitmacht", "ra-w8-l4"]),
    },
    exercise: [
      wahl(
        "ra-w17-l4-entscheidung",
        "Du führst dein Pferd an einer neuen Baustelle vorbei. Es hebt den Kopf, die Ohren sind steif nach vorn, es hört auf zu kauen. Was tust du?",
        "Stehen bleiben oder Abstand vergrößern, ihm Zeit zum Schauen geben und ruhig bleiben",
        [
          ["Zügig vorbeiziehen, damit es keine Zeit zum Überlegen hat", "Das kann die Spannung über die Reizschwelle treiben."],
          ["Kräftig am Strick rucken, damit es aufpasst", "Strafe erhöht die Angst."],
        ],
        "Richtig. Frühe Zeichen sind die Chance, ruhig zu reagieren.",
      ),
    ],
    quiz: [
      frage("frueh", "Welches ist ein frühes Stresszeichen?", "Das Pferd hört auf zu fressen und hebt den Kopf", [["Das Pferd döst mit hängender Unterlippe", "Das ist Entspannung."], ["Das Pferd wälzt sich nach dem Reiten", "Das ist Komfortverhalten."]], "Genau. In diesem Moment kannst du noch gut reagieren."),
      frage("lernen", "Kann ein Pferd in Panik lernen?", "Nein, kaum – es ist nicht mehr ansprechbar", [["Ja, besonders gut", "Starke Angst blockiert das Lernen."], ["Ja, wenn man streng genug ist", "Strenge verstärkt die Angst."]], "Richtig. Deshalb unterhalb der Reizschwelle arbeiten."),
      frage("hilflos", "Was kann ein stilles, starres, kaum reagierendes Pferd bedeuten?", "Es kann stark belastet sein und innerlich aufgegeben haben", [["Es ist besonders gut erzogen", "Starrheit ist kein Zeichen guter Erziehung."], ["Es ist einfach müde", "Müdigkeit sieht anders aus: Dösen, weicher Blick."]], "Genau. Das nennt man erlernte Hilflosigkeit."),
      frage("schmerz", "Was ist bei einer neuen Verhaltensauffälligkeit der erste Schritt?", "Schmerz und körperliche Ursachen tierärztlich ausschließen", [["Sofort strenger trainieren", "Ohne die Ursache zu kennen, kann das schaden."], ["Ein anderes Gebiss ausprobieren", "Erst die Ursache klären."]], "Richtig. Viele Probleme haben körperliche Ursachen."),
    ],
  },
];
