import "server-only";
import { card, head, item, no, ok, tag } from "../build";
import { lessonsOf, reviewed2026_10_29, scene, type AcademyWorld } from "../types";

/** Welt 9 – Pferde verstehen (Ausbau 29.10.2026) */
export const welt9: AcademyWorld = {
  id: "w9",
  number: 9,
  slug: "pferde-verstehen",
  title: "Pferde verstehen",
  teaser: "Körpersprache, Herde, Sinne und Bedürfnisse.",
  learns: "Körpersprache lesen (Ohren, Augen, Maul, Schweif, Haltung), Leben in der Herde und Rangordnung, Sinne und Laute des Pferdes, Grundbedürfnisse: Raufutter, Wasser, Bewegung, Sozialkontakt, Licht und Luft.",
  tint: "#E3E7DA",
  cover: scene("ak-zonen"),
  badge: { id: "ra-abzeichen-w9", title: "Pferdeversteher", motif: "ear" },
  lessons: lessonsOf(9, [
    /* ---------- 1. Körpersprache ---------- */
    {
      slug: "koerpersprache",
      title: "Körpersprache: Was sagt mein Pferd?",
      speaker: "mila",
      intro: {
        leicht: "Pferde sprechen mit ihrem ganzen Körper. Wenn du genau hinschaust, verstehst du sie!",
        mittel: "Pferde verständigen sich fast nur über Körpersprache. Wer sie lesen kann, merkt früh, ob ein Pferd entspannt, neugierig, unsicher oder verärgert ist.",
      },
      explanation: {
        leicht: [
          "Schau zuerst auf die Ohren. Nach vorn heißt: Ich bin neugierig. Locker zur Seite heißt: Ich bin entspannt. Ganz flach nach hinten heißt: Lass mich in Ruhe!",
          "Auch der Schweif spricht: Schlägt er wild hin und her, ist das Pferd genervt. Hebt ein Pferd ein Hinterbein und legt die Ohren an, droht es. Dann gehst du weg.",
        ],
        mittel: [
          "Die Ohren sind das schnellste Signal. Gespitzt und nach vorn gerichtet: aufmerksam und neugierig. Locker seitlich oder leicht hängend: entspannt oder dösend. Ein Ohr nach hinten beim Reiten: Das Pferd hört dir zu. Flach angelegt: Ärger oder Drohung – zusammen mit gerümpfter Nase und geöffnetem Maul eine deutliche Warnung.",
          "Augen und Maul: Ein weiches Auge und eine lockere Unterlippe zeigen Entspannung. Ist viel Weiß im Auge zu sehen, sind die Nüstern gebläht und der Kopf hoch, ist das Pferd alarmiert. Kauen, Lecken und Abschnauben bedeuten oft, dass Spannung nachlässt.",
          "Körper und Schweif: Ein ruhig pendelnder Schweif gehört zu einem entspannten Pferd. Heftiges Schlagen zeigt Ärger, Schmerz oder Fliegen. Ein angehobenes Hinterbein mit angelegten Ohren ist eine Drohung, ein locker angewinkeltes Hinterbein beim Dösen dagegen ganz normal. Lies immer mehrere Signale zusammen und achte auf die Situation.",
        ],
      },
      illustration: head("tonga", "neugierig"),
      terms: [
        { term: "Ohrenspiel", meaning: "Die Ohren bewegen sich aufmerksam hin und her – das Pferd achtet auf seine Umgebung." },
        { term: "Flehmen", meaning: "Das Pferd zieht die Oberlippe hoch, um einen Geruch genauer zu prüfen." },
        { term: "Abschnauben", meaning: "Lautes, entspanntes Ausatmen durch die Nüstern – ein gutes Zeichen." },
      ],
      exercise: [
        {
          type: "match",
          id: "ra-w9-l1-ohren",
          prompt: { leicht: "Wie fühlt sich das Pferd? Ordne zu.", mittel: "Ordne jedem Ausdruck die passende Stimmung zu." },
          targets: [
            { id: "neugierig", label: "neugierig" },
            { id: "entspannt", label: "entspannt" },
            { id: "aergerlich", label: "verärgert" },
          ],
          items: [
            card("vorn", "Ohren gespitzt nach vorn", head("tivoli", "neugierig"), "neugierig", "Genau – nach vorn heißt: Was ist da?", "Gespitzte Ohren zeigen Neugier."),
            card("seite", "Ohren locker zur Seite", head("scrabble", "entspannt"), "entspannt", "Richtig, so döst ein entspanntes Pferd.", "Locker seitliche Ohren bedeuten Entspannung."),
            card("flach", "Ohren flach angelegt", head("tonga", "grummelig"), "aergerlich", "Richtig. Jetzt lieber Abstand halten!", "Angelegte Ohren sind eine Warnung."),
          ],
        },
      ],
      quiz: [
        {
          id: "flach",
          prompt: "Ein Pferd legt die Ohren flach nach hinten. Was machst du?",
          options: [
            ok("abstand", "Ruhig Abstand halten"),
            no("streicheln", "Schnell hingehen und streicheln", "Angelegte Ohren sind eine Warnung – jetzt lieber nicht ran."),
            no("rufen", "Laut rufen", "Lautes Rufen kann das Pferd noch mehr stören."),
          ],
          explain: "Richtig! Angelegte Ohren heißen: Lass mich in Ruhe. Abstand ist sicher.",
        },
        {
          id: "schweif",
          prompt: "Was zeigt ein Schweif, der wild hin und her schlägt?",
          options: [
            ok("genervt", "Das Pferd ist genervt oder hat Fliegen"),
            no("freude", "Das Pferd freut sich riesig", "Freude zeigt das Pferd eher mit lockerem Körper."),
            no("muede", "Das Pferd ist sehr müde", "Ein müdes Pferd hält den Schweif ruhig."),
          ],
          explain: "Genau. Heftiges Schweifschlagen zeigt Ärger, Unwohlsein oder lästige Fliegen.",
        },
        {
          id: "ohr-hinten",
          prompt: "Beim Reiten dreht das Pferd ein Ohr zu dir nach hinten. Was bedeutet das meistens?",
          options: [
            ok("zuhoeren", "Es hört dir aufmerksam zu"),
            no("boese", "Es ist böse auf dich", "Böse wären beide Ohren flach angelegt – ein Ohr nach hinten heißt Zuhören."),
            no("krank", "Es ist krank", "Das ist ein ganz normales Aufmerksamkeitssignal."),
          ],
          explain: "Richtig! Ein Ohr zur Reiterin heißt: Ich achte auf dich.",
        },
        {
          id: "weiss",
          levels: ["mittel"],
          prompt: "Kopf hoch, Nüstern gebläht, viel Weiß im Auge sichtbar. Wie geht es dem Pferd?",
          options: [
            ok("alarm", "Es ist alarmiert oder ängstlich"),
            no("entspannt", "Es ist ganz entspannt", "Entspannte Pferde haben einen tiefen Kopf und ein weiches Auge."),
            no("hungrig", "Es hat Hunger", "Hunger zeigt sich so nicht – das sind Alarmzeichen."),
          ],
          explain: "Genau. Das Fluchttier ist alarmiert – ruhig bleiben, Abstand und Ursache suchen.",
        },
        {
          id: "kauen",
          levels: ["mittel"],
          prompt: "Was bedeuten Kauen, Lecken und Abschnauben häufig?",
          options: [
            ok("entspannung", "Spannung lässt nach, das Pferd wird lockerer"),
            no("hunger", "Das Pferd verlangt sofort Futter", "Es geht hier nicht um Futter, sondern um Entspannung."),
            no("schmerz", "Das Pferd hat starke Schmerzen", "Diese Zeichen zeigen meist Entspannung, nicht Schmerz."),
          ],
          explain: "Richtig. Darauf achten Reitlehrer auch beim Reiten: Abschnauben ist ein gutes Zeichen.",
        },
        {
          id: "bein",
          levels: ["mittel"],
          prompt: "Ein Pferd hat ein Hinterbein locker angewinkelt, die Ohren hängen seitlich, die Augen sind halb zu. Was ist los?",
          options: [
            ok("doest", "Es döst entspannt"),
            no("droht", "Es droht gleich zu treten", "Eine Drohung käme mit angelegten Ohren und Spannung im Körper."),
            no("lahm", "Es lahmt sicher", "Beim Dösen winkeln Pferde ganz normal ein Hinterbein an."),
          ],
          explain: "Genau – trotzdem vorher ansprechen, damit es nicht erschrickt.",
        },
      ],
      merksatz: {
        leicht: "Ohren nach vorn: neugierig. Locker zur Seite: entspannt. Flach nach hinten: Abstand!",
        mittel: "Lies immer mehrere Signale zusammen: Ohren, Augen, Maul, Schweif und Haltung – und die Situation.",
      },
    },

    /* ---------- 2. Herdenleben ---------- */
    {
      slug: "herdenleben",
      title: "Leben in der Herde",
      speaker: "lea",
      intro: {
        leicht: "Pferde wollen nie allein sein. In der Herde fühlen sie sich sicher.",
        mittel: "Pferde sind Herdentiere. Die Herde gibt Schutz, Ordnung und Freundschaft – das erklärt viel von ihrem Verhalten, auch beim Reiten.",
      },
      explanation: {
        leicht: [
          "In der Herde passen Pferde aufeinander auf. Wenn einige schlafen, bleiben andere wach und halten Wache.",
          "Beste Freunde kraulen sich gegenseitig am Hals und am Rücken. Es gibt auch eine Rangordnung: Manche Pferde dürfen zuerst ans Futter.",
        ],
        mittel: [
          "Als Fluchttiere überleben Pferde in der Gruppe: Viele Augen sehen mehr. Darum fühlt sich ein Pferd allein unsicher und ruft nach seinen Artgenossen. Einzelhaltung ohne Kontakt zu anderen Pferden ist nicht artgerecht.",
          "In jeder Herde gibt es eine Rangordnung. Ranghohe Pferde bestimmen, wer zuerst ans Wasser oder Futter darf – meistens mit kleinen Gesten: Ohren anlegen, den Kopf schwenken, auf den anderen zugehen. Ernste Kämpfe sind selten, weil die Ordnung klar ist.",
          "Freundschaften zeigen Pferde durch gegenseitige Fellpflege am Mähnenkamm und Widerrist. Tief schlafen (im Liegen) können sie nur, wenn sie sich sicher fühlen – meist bleibt dabei ein Herdenmitglied wach. Für dich heißt das: Ein Pferd sucht Sicherheit. Ruhige, klare Menschen geben ihm diese Sicherheit.",
        ],
      },
      illustration: { kind: "horse", horse: "tivoli" },
      terms: [
        { term: "Rangordnung", meaning: "Die feste Ordnung in der Herde: Wer darf zuerst an Futter und Wasser?" },
        { term: "Soziale Fellpflege", meaning: "Pferde knabbern sich gegenseitig am Mähnenkamm – Zeichen von Freundschaft." },
        { term: "Herdentrieb", meaning: "Das Bedürfnis, bei der Gruppe zu sein." },
      ],
      exercise: [
        {
          type: "multi",
          id: "ra-w9-l2-herde",
          prompt: { leicht: "Was machen Pferde in der Herde? Tippe alles Richtige an.", mittel: "Welche Aussagen über das Herdenleben stimmen?" },
          options: [
            { id: "wache", label: "Einige halten Wache, wenn andere schlafen", visual: item("ak-auge"), correct: true },
            { id: "kraulen", label: "Freunde kraulen sich gegenseitig", visual: item("ak-herz"), correct: true },
            { id: "rang", label: "Es gibt eine Rangordnung", visual: tag("1 · 2 · 3"), correct: true },
            { id: "allein", label: "Pferde sind am liebsten ganz allein", visual: item("pferd"), feedback: "Pferde sind Herdentiere – allein fühlen sie sich unsicher." },
          ],
          missing: { leicht: "Fast! Es fehlt noch etwas Richtiges.", mittel: "Gut – aber es fehlt noch mindestens eine richtige Aussage." },
          explain: "Prima! Wache halten, Freundschaft und eine klare Ordnung – so lebt die Herde.",
        },
      ],
      quiz: [
        {
          id: "allein",
          prompt: "Warum ruft ein Pferd, wenn es allein auf dem Paddock steht?",
          options: [
            ok("unsicher", "Es fühlt sich ohne die Herde unsicher"),
            no("singen", "Es singt gern", "Das Wiehern ist ein Rufen nach den anderen Pferden."),
            no("hunger", "Es hat immer Hunger", "Es ruft nach seiner Herde, nicht nach Futter."),
          ],
          explain: "Richtig. Pferde sind Herdentiere – zusammen sind sie sicherer.",
        },
        {
          id: "freunde",
          prompt: "Wie zeigen Pferde, dass sie Freunde sind?",
          options: [
            ok("kraulen", "Sie kraulen sich gegenseitig am Hals"),
            no("treten", "Sie treten sich", "Treten ist kein Freundschaftszeichen."),
            no("weglaufen", "Sie laufen voreinander weg", "Freunde suchen die Nähe zueinander."),
          ],
          explain: "Genau! Gegenseitige Fellpflege am Mähnenkamm zeigt Freundschaft.",
        },
        {
          id: "schlafen",
          prompt: "Was passiert oft, wenn Pferde in der Herde schlafen?",
          options: [
            ok("wache", "Ein Pferd bleibt wach und passt auf"),
            no("alle", "Alle schlafen gleichzeitig ganz fest", "Meistens hält mindestens ein Pferd Wache."),
            no("nie", "Pferde schlafen nie", "Pferde schlafen – oft im Stehen, tief nur im Liegen."),
          ],
          explain: "Richtig! So können die anderen sicher schlafen.",
        },
        {
          id: "rang",
          levels: ["mittel"],
          prompt: "Wie zeigt ein ranghohes Pferd meistens seinen Platz?",
          options: [
            ok("gesten", "Mit kleinen Gesten wie Ohren anlegen oder Kopfschwenken"),
            no("kampf", "Mit täglichen heftigen Kämpfen", "Ernste Kämpfe sind selten, weil die Ordnung klar ist."),
            no("gar-nicht", "Gar nicht – es gibt keine Rangordnung", "In jeder Herde gibt es eine Rangordnung."),
          ],
          explain: "Genau. Meist reichen kleine, klare Signale – das gilt auch für ruhige, klare Menschen.",
        },
        {
          id: "einzel",
          levels: ["mittel"],
          prompt: "Ist es artgerecht, ein Pferd ganz ohne Kontakt zu anderen Pferden zu halten?",
          options: [
            ok("nein", "Nein, Pferde brauchen Sozialkontakt"),
            no("ja", "Ja, das ist egal", "Pferde sind Herdentiere – Sozialkontakt ist ein Grundbedürfnis."),
            no("nur-winter", "Nur im Winter nicht", "Sozialkontakt brauchen Pferde das ganze Jahr."),
          ],
          explain: "Richtig. Kontakt zu Artgenossen gehört zu den Grundbedürfnissen.",
        },
      ],
      merksatz: {
        leicht: "Pferde sind Herdentiere: Zusammen fühlen sie sich sicher.",
        mittel: "Herde heißt Sicherheit: Pferde brauchen Artgenossen und folgen ruhigen, klaren Partnern.",
      },
    },

    /* ---------- 3. Sinne und Laute ---------- */
    {
      slug: "sinne-und-laute",
      title: "Wie Pferde die Welt wahrnehmen",
      speaker: "ben",
      intro: {
        leicht: "Pferde sehen, hören und riechen anders als wir. Das ist echt spannend!",
        mittel: "Viele Schreckreaktionen verstehst du, wenn du weißt, wie ein Pferd sieht, hört und riecht – und welche Laute es benutzt.",
      },
      explanation: {
        leicht: [
          "Pferde sehen fast rundherum, weil ihre Augen an der Seite sitzen. Direkt hinter sich und vor der Nase sehen sie aber nichts.",
          "Pferde hören sehr gut und drehen ihre Ohren in alle Richtungen. Sie riechen viel besser als wir. Sie brummeln zur Begrüßung und wiehern, wenn sie jemanden rufen.",
        ],
        mittel: [
          "Sehen: Durch die seitlichen Augen sieht ein Pferd fast rundherum, hat aber tote Winkel direkt hinter sich und vor der Stirn. Bewegungen erkennt es sehr schnell, scharfes Sehen und Entfernungen schätzen fallen schwerer. Farben sieht es eingeschränkt, vor allem Blau- und Gelbtöne. Im Dämmerlicht sieht es besser als wir, braucht aber länger, um sich an Hell-Dunkel-Wechsel zu gewöhnen – zum Beispiel beim Hineinreiten in die Halle.",
          "Hören und Riechen: Jedes Ohr dreht sich einzeln weit herum und hört auch sehr hohe Töne. Der Geruchssinn ist hervorragend; beim Flehmen prüft das Pferd Gerüche genau. Über die Tasthaare am Maul und die feine Haut spürt es selbst eine Fliege – und natürlich jede Reiterhilfe.",
          "Laute: Leises Brummeln heißt Begrüßung oder Vorfreude, lautes Wiehern ist ein Rufen über Entfernung, Quietschen hört man bei Begegnungen und kleinen Streitereien, Schnauben kann Aufregung zeigen, ein langes Abschnauben dagegen Entspannung.",
        ],
      },
      illustration: scene("ak-zonen"),
      terms: [
        { term: "Toter Winkel", meaning: "Bereich direkt hinter und vor dem Pferd, den es nicht sehen kann." },
        { term: "Tasthaare", meaning: "Lange Haare am Maul, mit denen das Pferd seine Umgebung ertastet." },
        { term: "Brummeln", meaning: "Tiefer, leiser Laut zur Begrüßung oder vor dem Füttern." },
      ],
      exercise: [
        {
          type: "match",
          id: "ra-w9-l3-laute",
          prompt: { leicht: "Was will das Pferd sagen? Ordne die Laute zu.", mittel: "Ordne die Laute ihrer häufigsten Bedeutung zu." },
          targets: [
            { id: "hallo", label: "Hallo, schön dich zu sehen" },
            { id: "wo", label: "Wo seid ihr?" },
            { id: "locker", label: "Ich bin entspannt" },
          ],
          items: [
            card("brummeln", "Leises Brummeln", item("ak-sprechblase"), "hallo", "Genau – Brummeln ist ein freundliches Hallo.", "Brummeln ist eine leise Begrüßung."),
            card("wiehern", "Lautes Wiehern", item("ak-blitz"), "wo", "Richtig! Mit Wiehern ruft das Pferd über weite Entfernung.", "Lautes Wiehern ist ein Rufen."),
            card("abschnauben", "Langes Abschnauben", item("ak-pause"), "locker", "Richtig! Das hören Reiter sehr gern.", "Abschnauben zeigt Entspannung."),
          ],
        },
      ],
      quiz: [
        {
          id: "sehen",
          prompt: "Wo kann ein Pferd nichts sehen?",
          options: [
            ok("hinten", "Direkt hinter sich"),
            no("seite", "Seitlich neben sich", "Zur Seite sieht das Pferd sehr gut."),
            no("weit", "Weit in die Ferne", "In die Ferne sieht es Bewegungen sehr schnell."),
          ],
          explain: "Richtig! Darum sprichst du ein Pferd an und gehst nie überraschend hinter ihm vorbei.",
        },
        {
          id: "ohren",
          prompt: "Wie hören Pferde?",
          options: [
            ok("gut", "Sehr gut – sie drehen die Ohren in alle Richtungen"),
            no("schlecht", "Schlecht", "Pferde hören sogar besser als wir."),
            no("taub", "Gar nicht", "Pferde hören sehr gut."),
          ],
          explain: "Genau! Deshalb erschrecken sie manchmal vor Geräuschen, die wir kaum bemerken.",
        },
        {
          id: "fliege",
          prompt: "Kann ein Pferd eine Fliege auf seiner Haut spüren?",
          options: [
            ok("ja", "Ja, seine Haut ist sehr empfindlich"),
            no("nein", "Nein, das Fell ist zu dick", "Pferde spüren sogar eine einzelne Fliege."),
            no("nur-kopf", "Nur am Kopf", "Die ganze Haut ist sehr feinfühlig."),
          ],
          explain: "Richtig! Darum reichen beim Reiten feine Hilfen.",
        },
        {
          id: "halle",
          levels: ["mittel"],
          prompt: "Warum zögert ein Pferd manchmal, wenn es aus dem Sonnenlicht in eine dunkle Halle soll?",
          options: [
            ok("augen", "Seine Augen brauchen länger, um sich an den Hell-Dunkel-Wechsel zu gewöhnen"),
            no("stur", "Es ist einfach stur", "Es ist eine Frage der Augen, nicht der Sturheit."),
            no("angst-halle", "Pferde mögen grundsätzlich keine Hallen", "Das Zögern kommt vom Sehen, nicht von der Halle selbst."),
          ],
          explain: "Genau. Gib ihm einen Moment Zeit, statt zu drängeln.",
        },
        {
          id: "flehmen",
          levels: ["mittel"],
          prompt: "Was tut ein Pferd beim Flehmen?",
          options: [
            ok("riechen", "Es prüft einen Geruch genauer"),
            no("lachen", "Es lacht", "Es sieht lustig aus, ist aber Riechen."),
            no("drohen", "Es droht", "Flehmen ist keine Drohung."),
          ],
          explain: "Richtig. Dabei leitet es Duftstoffe zu einem besonderen Riechorgan.",
        },
      ],
      merksatz: {
        leicht: "Pferde sehen fast rundherum, hören super und riechen viel besser als wir.",
        mittel: "Rundumblick mit toten Winkeln, feines Gehör, starker Geruchssinn und empfindliche Haut – darauf stellst du dich ein.",
      },
    },

    /* ---------- 4. Bedürfnisse ---------- */
    {
      slug: "beduerfnisse",
      title: "Was Pferde zum Glücklichsein brauchen",
      speaker: "mila",
      intro: {
        leicht: "Was braucht ein Pferd jeden Tag? Viel mehr als nur Möhren!",
        mittel: "Ein gesundes, zufriedenes Pferd braucht mehr als Futter. Die Grundbedürfnisse ergeben sich aus seinem Leben als Steppentier.",
      },
      explanation: {
        leicht: [
          "Pferde fressen fast den ganzen Tag. Am wichtigsten ist Heu oder Gras. Dazu brauchen sie immer frisches Wasser.",
          "Pferde wollen sich jeden Tag frei bewegen und andere Pferde treffen. Frische Luft und Licht tun ihnen gut. Auch der Hufschmied und der Tierarzt kommen regelmäßig.",
        ],
        mittel: [
          "Futter: Pferde sind Dauerfresser mit kleinem Magen. In der Natur fressen sie rund 12 bis 16 Stunden am Tag. Grundlage ist Raufutter wie Heu oder Gras – lange Fresspausen von mehr als etwa vier Stunden sollten vermieden werden. Kraftfutter gibt es nur bei Bedarf. Wasser muss jederzeit sauber zur Verfügung stehen; ein Pferd trinkt viele Liter am Tag, im Sommer und bei Arbeit deutlich mehr.",
          "Bewegung und Gesellschaft: Pferde sind Lauftiere. Tägliche freie Bewegung auf Weide oder Paddock gehört dazu – Reiten allein reicht nicht. Kontakt zu Artgenossen ist ebenso wichtig wie Licht und frische Luft im Stall.",
          "Pflege und Gesundheit: Hufe werden regelmäßig – meist alle sechs bis acht Wochen – vom Hufschmied oder Hufpfleger versorgt. Zähne, Impfungen und Entwurmung kontrolliert der Tierarzt. Und jeden Tag schaut jemand genau hin: Frisst das Pferd, ist es munter, läuft es gleichmäßig?",
        ],
      },
      illustration: item("heu"),
      terms: [
        { term: "Raufutter", meaning: "Heu, Gras, Stroh – die wichtigste Futtergrundlage für Pferde." },
        { term: "Paddock", meaning: "Ein Auslauf mit festem Boden, auf dem sich Pferde frei bewegen können." },
        { term: "Hufschmied", meaning: "Fachmann, der Hufe ausschneidet und bei Bedarf beschlägt." },
      ],
      exercise: [
        {
          type: "multi",
          id: "ra-w9-l4-tag",
          prompt: { leicht: "Was braucht ein Pferd jeden Tag? Tippe alles Richtige an.", mittel: "Welche Grundbedürfnisse muss eine gute Haltung täglich erfüllen?" },
          options: [
            { id: "heu", label: "Heu oder Gras", visual: item("heu"), correct: true },
            { id: "wasser", label: "Frisches Wasser", visual: item("wasser"), correct: true },
            { id: "bewegung", label: "Freie Bewegung", visual: item("pferd"), correct: true },
            { id: "freunde", label: "Andere Pferde", visual: item("ak-herz"), correct: true },
            { id: "schoko", label: "Schokolade", visual: item("schokolade"), feedback: "Schokolade ist für Pferde ungesund." },
            { id: "box", label: "Den ganzen Tag allein in der Box stehen", visual: item("tuer"), feedback: "Pferde brauchen Bewegung und Gesellschaft." },
          ],
          missing: { leicht: "Fast! Es fehlt noch etwas Wichtiges.", mittel: "Es fehlt noch mindestens ein Grundbedürfnis." },
          explain: "Super! Raufutter, Wasser, Bewegung und Freunde – jeden Tag.",
        },
      ],
      quiz: [
        {
          id: "futter",
          prompt: "Was ist das wichtigste Futter für Pferde?",
          options: [
            ok("heu", "Heu oder Gras"),
            no("moehren", "Möhren", "Möhren sind ein Leckerli, kein Hauptfutter."),
            no("brot", "Brot", "Brot ist kein Pferdefutter."),
          ],
          explain: "Richtig! Raufutter wie Heu und Gras ist die Grundlage.",
        },
        {
          id: "wasser",
          prompt: "Wann braucht ein Pferd frisches Wasser?",
          options: [
            ok("immer", "Immer"),
            no("abends", "Nur abends", "Wasser muss den ganzen Tag da sein."),
            no("sommer", "Nur im Sommer", "Auch im Winter brauchen Pferde viel Wasser."),
          ],
          explain: "Genau! Sauberes Wasser muss jederzeit erreichbar sein.",
        },
        {
          id: "bewegung",
          prompt: "Reicht eine Reitstunde am Tag als Bewegung?",
          options: [
            ok("nein", "Nein, Pferde brauchen auch freie Bewegung"),
            no("ja", "Ja, das reicht", "Pferde sind Lauftiere – sie brauchen zusätzlich Weide oder Paddock."),
            no("zuviel", "Das ist schon zu viel", "Pferde bewegen sich in der Natur viele Stunden am Tag."),
          ],
          explain: "Richtig. Weide oder Paddock gehören jeden Tag dazu.",
        },
        {
          id: "pause",
          levels: ["mittel"],
          prompt: "Warum sollten Fresspausen nicht zu lang werden?",
          options: [
            ok("magen", "Pferde haben einen kleinen Magen und sind Dauerfresser"),
            no("dick", "Damit sie schneller dick werden", "Es geht um die Verdauung, nicht ums Zunehmen."),
            no("egal", "Das ist egal", "Lange Pausen können Magen und Verdauung schaden."),
          ],
          explain: "Genau. Ihr Verdauungssystem ist auf fast ständiges Fressen eingestellt.",
        },
        {
          id: "huf",
          levels: ["mittel"],
          prompt: "Wie oft kommt meistens der Hufschmied oder Hufpfleger?",
          options: [
            ok("68", "Etwa alle sechs bis acht Wochen"),
            no("jahr", "Einmal im Jahr", "Hufe wachsen ständig nach – einmal im Jahr wäre viel zu selten."),
            no("woche", "Jede Woche", "So oft ist es normalerweise nicht nötig."),
          ],
          explain: "Richtig. Der genaue Abstand hängt vom Pferd und vom Hufwachstum ab.",
        },
      ],
      merksatz: {
        leicht: "Heu, Wasser, Bewegung und Freunde – das braucht ein Pferd jeden Tag.",
        mittel: "Raufutter ohne lange Pausen, Wasser, freie Bewegung, Artgenossen, Licht und Luft – plus regelmäßige Huf- und Gesundheitspflege.",
      },
    },
  ], reviewed2026_10_29),
};
