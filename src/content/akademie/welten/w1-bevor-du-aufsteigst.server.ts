import "server-only";
import { card, item, no, ok, spot } from "../build";
import { lessonsOf, scene, type AcademyWorld } from "../types";

/** Welt 1 – Bevor du aufsteigst */
export const welt1: AcademyWorld = {
  id: "w1",
  number: 1,
  slug: "bevor-du-aufsteigst",
  title: "Bevor du aufsteigst",
  teaser: "Sicher am Pferd, Helm, Ausrüstung und Aufsteigen.",
  learns: "Sicheres Verhalten am Pferd (tote Winkel, Abstand), Sinn und Sitz des Reithelms, Teile von Sattel und Trense, Ablauf beim Auf- und Absteigen.",
  tint: "#DDE3D6",
  cover: scene("ak-zonen"),
  badge: { id: "ra-abzeichen-w1", title: "Sicherheits-Profi", motif: "helmet" },
  lessons: lessonsOf(1, [
    /* ---------- 1. Sicher am Pferd ---------- */
    {
      slug: "sicher-am-pferd",
      title: "Sicher am Pferd",
      speaker: "lea",
      intro: {
        leicht: "Bevor wir reiten, lernen wir: Wie gehe ich sicher zu einem Pferd?",
        mittel: "Reiten beginnt am Boden. Wer weiß, wie Pferde sehen und reagieren, ist sicherer – und das Pferd auch.",
      },
      explanation: {
        leicht: [
          "Pferde sind groß und erschrecken leicht. Sprich das Pferd ruhig an, bevor du zu ihm gehst. Komm von schräg vorne zur Schulter.",
          "Hinter dem Pferd ist es gefährlich. Erschrickt es, kann es ausschlagen. Halte dort Abstand. Und trag feste Schuhe!",
        ],
        mittel: [
          "Pferde sind Fluchttiere. Ihre Augen sitzen seitlich am Kopf, deshalb sehen sie fast rundherum. Direkt hinter sich und direkt vor der Nase sehen sie aber kaum etwas – das sind die toten Winkel. Darum sprichst du das Pferd zuerst an und gehst ruhig von schräg vorne auf die Schulter zu.",
          "Erschrickt ein Pferd, kann es blitzschnell zur Seite springen oder nach hinten ausschlagen. Hinter dem Pferd hältst du deshalb großen Abstand – oder du gehst so herum, wie es dir deine Reitlehrerin zeigt. Feste Schuhe schützen deine Füße, falls ein Pferd dir auf den Fuß tritt.",
        ],
      },
      illustration: scene("ak-zonen"),
      terms: [
        { term: "Fluchttier", meaning: "Ein Tier, das sich bei Gefahr durch schnelles Weglaufen schützt." },
        { term: "Toter Winkel", meaning: "Bereich, den das Pferd nicht sehen kann: direkt hinter und direkt vor ihm." },
        { term: "Kruppe", meaning: "Der hintere, obere Teil des Pferderückens." },
      ],
      exercise: [
        {
          type: "match",
          id: "ra-w1-l1-sortieren",
          prompt: { leicht: "Sicher oder nicht sicher? Sortiere die Karten.", mittel: "Was ist sicher am Pferd, was nicht? Sortiere die Karten." },
          targets: [
            { id: "sicher", label: "Sicher" },
            { id: "unsicher", label: "Nicht sicher" },
          ],
          items: [
            card("ansprechen", "Pferd zuerst ansprechen", item("ak-sprechblase"), "sicher", "Richtig! So weiß das Pferd, dass du kommst.", "Ansprechen ist sicher: Das Pferd weiß dann, dass du kommst."),
            card("schuhe", "Feste Schuhe tragen", item("ak-stiefel"), "sicher", "Genau. Feste Schuhe schützen deine Zehen.", "Feste Schuhe sind sicher – sie schützen deine Füße."),
            card("sandalen", "In Sandalen in den Stall", item("ak-sandale"), "unsicher", "Stimmt. Sandalen schützen deine Füße nicht.", "Sandalen schützen nicht, wenn ein Pferd dir auf den Fuß tritt."),
            card("toben", "Laut rennen und toben", item("ak-blitz"), "unsicher", "Richtig. Lärm und Hektik erschrecken Pferde.", "Pferde erschrecken bei Lärm und schnellen Bewegungen."),
            card("schraeg", "Von schräg vorne zur Schulter gehen", item("ak-auge"), "sicher", "Genau. Dort sieht dich das Pferd gut.", "Von schräg vorne sieht dich das Pferd – das ist sicher.", ["mittel"]),
            card("dahinter", "Dicht hinter dem Pferd stehen bleiben", item("ak-stopp"), "unsicher", "Richtig. Dort ist der tote Winkel.", "Direkt hinter dem Pferd sieht es dich nicht – dort kann es ausschlagen.", ["mittel"]),
          ],
        },
      ],
      quiz: [
        {
          id: "toter-winkel",
          prompt: { leicht: "Wo sieht dich ein Pferd kaum?", mittel: "Wo liegen die toten Winkel eines Pferdes?" },
          options: [
            ok("hinten", "Direkt hinter ihm"),
            no("schulter", "Neben seiner Schulter", "Neben der Schulter sieht dich das Pferd gut. Dorthin gehst du am besten."),
            no("schraeg", "Schräg vor ihm", "Schräg vorne sieht dich das Pferd gut. So kannst du dich zeigen."),
          ],
          explain: {
            leicht: "Richtig! Hinter sich sieht das Pferd fast nichts. Darum sprichst du es an.",
            mittel: "Richtig! Direkt hinter dem Pferd und direkt vor seiner Nase sieht es kaum etwas.",
          },
        },
        {
          id: "ansprechen",
          prompt: "Was machst du, bevor du zu einem Pferd gehst?",
          options: [
            ok("sprechen", "Ich spreche es ruhig an"),
            no("rennen", "Ich renne schnell hin", "Schnelles Rennen kann ein Pferd erschrecken. Geh lieber ruhig."),
            no("klatschen", "Ich klatsche in die Hände", "Lautes Klatschen erschreckt Pferde. Eine ruhige Stimme ist besser."),
          ],
          explain: "Genau! Deine ruhige Stimme sagt dem Pferd: Hier kommt jemand.",
        },
        {
          id: "schuhe",
          prompt: "Welche Schuhe passen in den Stall?",
          options: [
            ok("fest", "Feste Schuhe oder Reitstiefel"),
            no("sandalen", "Sandalen", "Sandalen schützen deine Zehen nicht, wenn ein Pferd dir auf den Fuß tritt."),
            no("socken", "Hausschuhe", "Hausschuhe sind weich und rutschig. Im Stall brauchst du feste Schuhe."),
          ],
          explain: "Richtig! Feste Schuhe schützen deine Füße.",
        },
        {
          id: "fluchttier",
          levels: ["mittel"],
          prompt: "Warum reagieren Pferde oft so schreckhaft?",
          options: [
            ok("flucht", "Weil sie Fluchttiere sind"),
            no("boese", "Weil sie böse sind", "Pferde sind nicht böse. Sie erschrecken, weil sie sich als Fluchttiere schützen wollen."),
            no("sehen", "Weil sie schlecht sehen", "Pferde sehen fast rundherum gut – nur nicht in den toten Winkeln."),
          ],
          explain: "Richtig. In der Natur hat schnelles Weglaufen Pferde vor Gefahren geschützt. Deshalb reagieren sie bei Schreck oft blitzschnell.",
        },
      ],
      merksatz: {
        leicht: "Erst ansprechen, dann ruhig von schräg vorne zum Pferd gehen.",
        mittel: "Ansprechen, von schräg vorne kommen, hinter dem Pferd Abstand halten – Ruhe schützt dich und das Pferd.",
      },
      practiceNote: "Den Umgang mit Pferden immer gemeinsam mit erfahrenen Erwachsenen oder einer Reitlehrkraft üben.",
    },

    /* ---------- 2. Warum wir einen Reithelm tragen ---------- */
    {
      slug: "reithelm",
      title: "Warum wir einen Reithelm tragen",
      speaker: "ben",
      intro: {
        leicht: "Mein Helm kommt immer mit aufs Pferd. Weißt du, warum?",
        mittel: "Ohne Helm steige ich nie aufs Pferd. Heute lernst du, warum – und wie ein Helm richtig sitzt.",
      },
      explanation: {
        leicht: [
          "Beim Reiten trägst du immer einen Reithelm. Er schützt deinen Kopf, falls du herunterfällst.",
          "Der Helm muss passen: Er sitzt gerade, er wackelt nicht, und der Kinnriemen ist zu.",
        ],
        mittel: [
          "Stürzen kann jeder, auch sehr gute Reiterinnen und Reiter. Ein Reithelm mit fester Schale und Polster kann den Kopf dabei schützen und das Risiko schwerer Kopfverletzungen verringern. Deshalb gehört er zu jedem Ritt – auch zu einer kurzen Runde im Schritt.",
          "So sitzt der Helm richtig: gerade, etwa ein bis zwei Finger breit über den Augenbrauen. Er wackelt nicht, wenn du den Kopf schüttelst, und der Kinnriemen ist geschlossen – zwischen Riemen und Kinn passt etwa ein Finger. Ein Helm, auf den man gestürzt ist, wird ersetzt, auch wenn man keinen Schaden sieht. Beim Kauf hilft ein Fachgeschäft, einen geprüften Reithelm in der richtigen Größe zu finden.",
        ],
      },
      illustration: scene("ak-helm-aufbau"),
      terms: [
        { term: "Helmschale", meaning: "Die feste Außenseite des Helms." },
        { term: "Kinnriemen", meaning: "Der Riemen unter dem Kinn, der den Helm festhält." },
        { term: "Prüfnorm", meaning: "Ein Prüfzeichen im Helm zeigt, dass er für das Reiten getestet wurde." },
      ],
      exercise: [
        {
          type: "choice",
          id: "ra-w1-l2-helm-sitz",
          prompt: "Bei welchem Kind sitzt der Helm richtig?",
          layout: "pictures",
          options: [
            { id: "richtig", label: "Gerade und fest", visual: scene("ak-helm-richtig"), correct: true },
            { id: "offen", label: "Kinnriemen offen", visual: scene("ak-helm-offen"), feedback: "Der Kinnriemen ist offen. So kann der Helm vom Kopf rutschen." },
            { id: "schief", label: "Nach hinten geschoben", visual: scene("ak-helm-schief"), feedback: "Der Helm ist nach hinten gerutscht. Dann ist die Stirn ungeschützt." },
            { id: "muetze", label: "Mütze statt Helm", visual: scene("ak-helm-muetze"), feedback: "Eine Mütze hält warm, schützt aber nicht bei einem Sturz." },
          ],
          explain: "Genau! Der Helm sitzt gerade und fest, und der Kinnriemen ist zu.",
        },
      ],
      quiz: [
        {
          id: "wann",
          prompt: "Wann trägst du beim Reiten einen Helm?",
          options: [
            ok("immer", "Bei jedem Ritt"),
            no("springen", "Nur beim Springen", "Auch im Schritt kann man herunterfallen. Deshalb immer."),
            no("regen", "Nur bei Regen", "Der Helm schützt deinen Kopf – er ist kein Regenschutz. Du trägst ihn immer."),
          ],
          explain: "Richtig! Bei jedem Ritt, auch bei einer kurzen Runde.",
        },
        {
          id: "sitz",
          prompt: "Was gehört zu einem gut sitzenden Helm?",
          options: [
            ok("riemen", "Der Kinnriemen ist zu"),
            no("wackeln", "Er wackelt ein bisschen", "Ein Helm darf nicht wackeln, sonst verrutscht er."),
            no("nacken", "Er sitzt hinten im Nacken", "Dann ist die Stirn ungeschützt. Der Helm sitzt gerade auf dem Kopf."),
          ],
          explain: "Genau! Gerade, fest und mit geschlossenem Kinnriemen.",
        },
        {
          id: "muetze",
          prompt: "Kann eine dicke Mütze den Reithelm ersetzen?",
          options: [
            ok("nein", "Nein"),
            no("dick", "Ja, wenn sie dick genug ist", "Auch eine dicke Mütze hat keine feste Schale. Sie schützt nicht bei einem Sturz."),
            no("winter", "Ja, im Winter", "Im Winter hält eine Mütze warm – zum Reiten brauchst du trotzdem den Helm."),
          ],
          explain: "Richtig. Nur ein Reithelm ist für einen Sturz gemacht.",
        },
        {
          id: "nach-sturz",
          levels: ["mittel"],
          prompt: "Du bist mit dem Helm gestürzt. Was nun?",
          options: [
            ok("ersetzen", "Den Helm ersetzen, auch ohne sichtbaren Schaden"),
            no("weiter", "Weiter benutzen, wenn kein Kratzer da ist", "Schäden im Inneren sieht man oft nicht. Deshalb wird der Helm ersetzt."),
            no("putzen", "Den Helm gründlich putzen", "Putzen reicht nicht. Die Schutzschicht im Inneren kann beschädigt sein."),
          ],
          explain: "Richtig. Die Schutzschicht im Helm kann innen beschädigt sein, ohne dass man es sieht.",
        },
        {
          id: "riemen-platz",
          levels: ["mittel"],
          prompt: "Wie viel Platz ist ungefähr zwischen Kinnriemen und Kinn?",
          options: [
            ok("finger", "Etwa ein Finger"),
            no("faust", "Eine ganze Faust", "Dann ist der Riemen zu locker und der Helm kann verrutschen."),
            no("nichts", "Gar kein Platz – so fest wie möglich", "Zu fest drückt beim Schlucken und Atmen. Etwa ein Finger Platz ist richtig."),
          ],
          explain: "Genau. So hält der Helm, und nichts drückt.",
        },
      ],
      merksatz: {
        leicht: "Kein Ritt ohne Helm – und der Kinnriemen ist immer zu.",
        mittel: "Zu jedem Ritt gehört ein passender, geprüfter Helm: gerade, fest, Kinnriemen zu.",
      },
    },

    /* ---------- 3. Sattel, Trense und Ausrüstung ---------- */
    {
      slug: "sattel-und-trense",
      title: "Sattel, Trense und Ausrüstung",
      speaker: "mila",
      intro: {
        leicht: "Schau mal, das ist Tongas Ausrüstung. Jedes Teil hat eine Aufgabe.",
        mittel: "Sattel und Trense haben viele Teile. Wenn du sie kennst, verstehst du, wie sie dir und dem Pferd helfen.",
      },
      explanation: {
        leicht: [
          "Der Sattel ist dein Sitz auf dem Pferd. Der Sattelgurt hält ihn fest. In den Steigbügeln stehen deine Füße.",
          "Die Trense sitzt am Kopf des Pferdes. Daran sind die Zügel. Über die Zügel bist du mit dem Pferdemaul verbunden.",
        ],
        mittel: [
          "Der Sattel verteilt dein Gewicht auf dem Pferderücken. Darunter liegt eine Satteldecke, die Schabracke. Der Sattelgurt läuft unter dem Bauch hindurch und hält den Sattel fest. Die Steigbügel hängen an den Steigbügelriemen.",
          "Am Kopf trägt das Pferd das Kopfstück mit Genickstück, Stirnriemen und Nasenriemen. Im Maul liegt das Gebiss, daran sind die Zügel befestigt. Im Stall sagt man zu allem zusammen meist einfach „Trense“. Sattel und Trense müssen gut passen, damit nichts drückt – das prüfen erfahrene Erwachsene oder Fachleute.",
        ],
      },
      illustration: scene("ak-sattelzeug"),
      terms: [
        { term: "Schabracke", meaning: "Die Decke unter dem Sattel." },
        { term: "Sattelgurt", meaning: "Hält den Sattel unter dem Bauch des Pferdes fest." },
        { term: "Gebiss", meaning: "Liegt im Pferdemaul; daran sind die Zügel befestigt." },
        { term: "Nasenriemen", meaning: "Läuft um die Nase; heißt auch Reithalfter." },
      ],
      exercise: [
        {
          type: "hotspots",
          id: "ra-w1-l3-suchbild",
          scene: scene("ak-sattelzeug"),
          prompt: "Finde die Teile der Ausrüstung.",
          mode: "sequence",
          targets: [
            spot("sattel", "der Sattel", "sattel", "Das ist der Sattel – dein Sitz auf dem Pferd.", { r: 40 }),
            spot("buegel", "der Steigbügel", "buegel", "Im Steigbügel steht dein Fuß.", { r: 26 }),
            spot("gurt", "der Sattelgurt", "gurt", "Der Sattelgurt hält den Sattel fest.", { r: 24 }),
            spot("trense", "die Trense", "trense", "Die Trense sitzt am Kopf des Pferdes.", { r: 34 }),
            spot("zuegel", "der Zügel", "zuegel", "Am Zügel hältst du die Verbindung zum Pferdemaul.", { r: 28, levels: ["mittel"] }),
            spot("gebiss", "das Gebiss", "gebiss", "Das Gebiss liegt im Maul. Daran ist der Zügel befestigt.", { r: 24, levels: ["mittel"] }),
          ],
          missHint: "Schau genau hin – die Ausrüstung ist am Rücken und am Kopf.",
        },
      ],
      quiz: [
        {
          id: "gurt",
          prompt: "Was hält den Sattel auf dem Pferd fest?",
          options: [
            ok("gurt", "Der Sattelgurt"),
            no("zuegel", "Der Zügel", "Am Zügel hältst du die Verbindung zum Pferdemaul. Den Sattel hält der Gurt."),
            no("buegel", "Der Steigbügel", "In den Steigbügeln stehen deine Füße. Den Sattel hält der Gurt."),
          ],
          explain: "Richtig! Der Gurt läuft unter dem Bauch hindurch.",
        },
        {
          id: "buegel",
          prompt: "Wofür sind die Steigbügel da?",
          options: [
            ok("fuesse", "Für deine Füße"),
            no("anbinden", "Zum Anbinden", "Zum Anbinden nimmt man ein Halfter und einen Strick."),
            no("lenken", "Zum Lenken", "Gelenkt wird mit Gewicht, Schenkeln und Zügeln – nicht mit den Steigbügeln."),
          ],
          explain: "Genau! In den Steigbügeln finden deine Füße Halt.",
        },
        {
          id: "trense",
          prompt: "Wo trägt das Pferd die Trense?",
          options: [
            ok("kopf", "Am Kopf"),
            no("ruecken", "Auf dem Rücken", "Auf dem Rücken liegt der Sattel."),
            no("bein", "An den Beinen", "An den Beinen tragen manche Pferde Gamaschen zum Schutz – die Trense sitzt am Kopf."),
          ],
          explain: "Richtig! Die Trense sitzt am Kopf, die Zügel gehen zu deinen Händen.",
        },
        {
          id: "zuegel-gebiss",
          levels: ["mittel"],
          prompt: "Woran sind die Zügel befestigt?",
          options: [
            ok("gebiss", "Am Gebiss"),
            no("gurt", "Am Sattelgurt", "Der Sattelgurt hält den Sattel. Die Zügel gehen zum Gebiss."),
            no("stirn", "Am Stirnriemen", "Der Stirnriemen hält das Kopfstück an seinem Platz. Die Zügel sind am Gebiss."),
          ],
          explain: "Richtig. Darum ist eine ruhige Hand so wichtig: Jede Bewegung spürt das Pferd im Maul.",
        },
        {
          id: "passen",
          levels: ["mittel"],
          prompt: "Warum muss ein Sattel gut passen?",
          options: [
            ok("druck", "Damit nichts drückt und das Gewicht gut verteilt wird"),
            no("schoen", "Damit er schön aussieht", "Schön darf er sein – wichtig ist aber, dass er dem Pferd nicht wehtut."),
            no("schnell", "Damit das Pferd schneller läuft", "Ein Sattel macht das Pferd nicht schneller. Er soll bequem für Pferd und Reiter sein."),
          ],
          explain: "Genau. Ein Sattel, der drückt, kann dem Pferd Schmerzen machen.",
        },
      ],
      merksatz: {
        leicht: "Der Sattel ist mein Sitz, der Gurt hält ihn fest, die Trense sitzt am Kopf.",
        mittel: "Sattel, Gurt und Trense müssen passen – nur dann fühlt sich das Pferd wohl.",
      },
    },

    /* ---------- 4. Sicheres Aufsteigen und Absteigen ---------- */
    {
      slug: "aufsteigen-absteigen",
      title: "Sicheres Aufsteigen und Absteigen",
      speaker: "ben",
      readTogether: true,
      intro: {
        leicht: "Rauf aufs Pferd – aber Schritt für Schritt!",
        mittel: "Aufsteigen sieht leicht aus. In der richtigen Reihenfolge ist es sicher und angenehm für das Pferd.",
      },
      explanation: {
        leicht: [
          "Vor dem Aufsteigen hält ein Erwachsener das Pferd. Der Sattelgurt wird geprüft. Am besten steigst du von einer Aufsteighilfe auf und setzt dich sanft hin.",
          "Zum Absteigen nimmst du zuerst beide Füße aus den Steigbügeln. Dann schwingst du das Bein über den Pferderücken und landest mit weichen Knien.",
        ],
        mittel: [
          "Vor dem Aufsteigen wird der Sattelgurt geprüft und bei Bedarf nachgezogen. Die Steigbügel stellt man ungefähr auf Armlänge ein. In vielen Ställen steigt man von der linken Seite auf. Eine Aufsteighilfe ist bequemer für dich und schont den Pferderücken, weil der Sattel weniger zur Seite gezogen wird.",
          "Beim Aufsteigen nimmst du die Zügel auf, damit das Pferd ruhig stehen bleibt, und setzt dich danach sanft in den Sattel – nicht hineinplumpsen. Beim Absteigen nimmst du beide Füße aus den Bügeln, schwingst das rechte Bein über die Kruppe und landest mit leicht gebeugten Knien. Wie genau ihr es macht, zeigt dir deine Reitlehrerin.",
        ],
      },
      illustration: scene("ak-aufsteigen"),
      terms: [
        { term: "Aufsteighilfe", meaning: "Ein kleines Podest oder eine Treppe zum bequemen Aufsteigen." },
        { term: "Nachgurten", meaning: "Den Gurt nach dem Aufsteigen oder nach ein paar Minuten noch einmal festziehen." },
      ],
      exercise: [
        {
          type: "match",
          id: "ra-w1-l4-reihenfolge",
          prompt: { leicht: "In welcher Reihenfolge? Lege die Karten auf die Zahlen.", mittel: "Bring das Aufsteigen in die richtige Reihenfolge." },
          targets: [
            { id: "1", label: "Zuerst" },
            { id: "2", label: "Dann" },
            { id: "3", label: "Danach", levels: ["mittel"] },
            { id: "3l", label: "Zum Schluss", levels: ["leicht"] },
            { id: "4", label: "Zum Schluss", levels: ["mittel"] },
          ],
          items: [
            card("gurt", "Sattelgurt prüfen", item("ak-gurt"), "1", "Richtig! Zuerst wird der Gurt geprüft.", "Bevor man aufsteigt, wird zuerst der Gurt geprüft."),
            card("buegel", "Steigbügel prüfen", item("ak-buegel"), "2", "Genau, dann kommen die Steigbügel dran.", "Die Steigbügel kommen nach dem Gurt.", ["leicht"]),
            card("sitzen-l", "Sanft in den Sattel setzen", item("ak-gewicht"), "3l", "Super! Sanft hinsetzen schont den Pferderücken.", "Hinsetzen kommt ganz am Schluss.", ["leicht"]),
            card("buegel-m", "Steigbügel auf Armlänge einstellen", item("ak-buegel"), "2", "Richtig. Danach stimmt die Bügellänge ungefähr.", "Die Bügel werden nach dem Gurt eingestellt.", ["mittel"]),
            card("zuegel", "Zügel aufnehmen", item("ak-zuegel"), "3", "Genau. So bleibt das Pferd ruhig stehen.", "Die Zügel nimmst du kurz vor dem Aufsitzen auf.", ["mittel"]),
            card("sitzen-m", "Sanft in den Sattel setzen", item("ak-gewicht"), "4", "Super! Nicht plumpsen – das schont den Rücken.", "Das sanfte Hinsetzen kommt ganz am Schluss.", ["mittel"]),
          ],
        },
      ],
      quiz: [
        {
          id: "pruefen",
          prompt: "Was wird vor dem Aufsteigen geprüft?",
          options: [
            ok("gurt", "Der Sattelgurt"),
            no("farbe", "Die Farbe der Schabracke", "Die Farbe ist egal. Wichtig ist, dass der Gurt fest genug ist."),
            no("maehne", "Ob die Mähne gekämmt ist", "Eine gekämmte Mähne ist schön, aber für die Sicherheit zählt der Gurt."),
          ],
          explain: "Richtig! Ein lockerer Gurt kann dazu führen, dass der Sattel rutscht.",
        },
        {
          id: "aufsteighilfe",
          prompt: "Warum ist eine Aufsteighilfe gut?",
          options: [
            ok("ruecken", "Sie schont den Pferderücken"),
            no("groesser", "Das Pferd wird davon größer", "Das Pferd bleibt gleich groß. Du kommst aber leichter hinauf."),
            no("schnell", "Man kann schneller losgaloppieren", "Nach dem Aufsteigen geht es ruhig im Schritt los."),
          ],
          explain: {
            leicht: "Richtig! Und für dich ist es viel leichter.",
            mittel: "Richtig. Der Sattel wird weniger zur Seite gezogen – das ist angenehmer für den Pferderücken.",
          },
        },
        {
          id: "absteigen",
          prompt: "Was machst du beim Absteigen zuerst?",
          options: [
            ok("fuesse", "Beide Füße aus den Steigbügeln nehmen"),
            no("springen", "Sofort vom Pferd springen", "Erst müssen beide Füße frei sein – sonst kann ein Fuß im Bügel hängen bleiben."),
            no("loslassen", "Die Zügel ganz loslassen", "Halte die Zügel, bis du sicher unten stehst. So bleibt das Pferd ruhig."),
          ],
          explain: "Richtig! So kann dein Fuß nicht im Steigbügel hängen bleiben.",
        },
        {
          id: "armlaenge",
          levels: ["mittel"],
          prompt: "Wie stellt man die Bügellänge vor dem Aufsteigen ungefähr ein?",
          options: [
            ok("arm", "Etwa auf Armlänge"),
            no("kurz", "So kurz wie möglich", "Zu kurze Bügel ziehen die Knie hoch. Im Sattel wird später genau angepasst."),
            no("egal", "Gar nicht – jede Länge passt", "Die Länge ist wichtig für einen guten Sitz. Armlänge ist ein guter Anfang."),
          ],
          explain: "Richtig. Fingerspitzen an die Schnalle, der Bügel reicht dann etwa bis in die Achsel. Im Sattel wird genau angepasst.",
        },
        {
          id: "plumpsen",
          levels: ["mittel"],
          prompt: "Wie setzt du dich beim Aufsteigen in den Sattel?",
          options: [
            ok("sanft", "Sanft und langsam"),
            no("schwung", "Mit Schwung hineinplumpsen", "Plumpsen ist unangenehm für den Pferderücken."),
            no("stehen", "Gar nicht – ich bleibe in den Bügeln stehen", "Nach dem Aufsteigen setzt du dich sanft hin und findest deinen Sitz."),
          ],
          explain: "Genau. Der Pferderücken wird es dir danken.",
        },
      ],
      merksatz: {
        leicht: "Gurt prüfen, gehalten werden, sanft aufsitzen. Absteigen: erst beide Füße raus!",
        mittel: "Gurt prüfen, Bügel einstellen, Zügel aufnehmen, sanft aufsitzen. Beim Absteigen zuerst beide Füße aus den Bügeln.",
      },
      practiceNote: "Auf- und Absteigen nur unter Anleitung einer Reitlehrkraft üben; das Pferd wird dabei gehalten.",
    },

    /* ---------- 5. Sicherheitsquiz ---------- */
    {
      slug: "sicherheitsquiz",
      title: "Sicherheitsquiz",
      speaker: "lea",
      intro: {
        leicht: "Jetzt zeigst du, was du über Sicherheit weißt!",
        mittel: "Zeit für das Sicherheitsquiz. Hier kommt alles aus dieser Lernwelt noch einmal vor.",
      },
      explanation: {
        leicht: ["Das weißt du schon: Pferd ansprechen, feste Schuhe, Helm auf, Gurt prüfen und beim Absteigen zuerst beide Füße raus."],
        mittel: [
          "Kurze Wiederholung: Pferde sind Fluchttiere mit toten Winkeln. Ein passender Helm gehört zu jedem Ritt. Sattel und Trense müssen passen. Vor dem Aufsteigen wird der Gurt geprüft, beim Absteigen kommen zuerst beide Füße aus den Bügeln.",
        ],
      },
      illustration: scene("ak-reiter-sitz"),
      exercise: [
        {
          type: "multi",
          id: "ra-w1-l5-checkliste",
          prompt: { leicht: "Was gehört zu sicherem Reiten? Tippe alles Richtige an.", mittel: "Was gehört zu sicherem Reiten? Wähle alle richtigen Antworten." },
          options: [
            { id: "helm", label: "Helm mit geschlossenem Kinnriemen", visual: item("reiten"), correct: true },
            { id: "schuhe", label: "Feste Schuhe", visual: item("ak-stiefel"), correct: true },
            { id: "gurt", label: "Sattelgurt prüfen", visual: item("ak-gurt"), correct: true },
            { id: "sandalen", label: "Sandalen", visual: item("ak-sandale"), feedback: "Sandalen schützen deine Füße nicht." },
            { id: "toben", label: "Hinter dem Pferd toben", visual: item("ak-blitz"), feedback: "Hinter dem Pferd hältst du Abstand und bleibst ruhig." },
            { id: "allein", label: "Ganz allein ohne Aufsicht losreiten", visual: item("ak-stopp"), feedback: "Am Anfang ist immer jemand dabei, der dir hilft und aufpasst.", levels: ["mittel"] },
          ],
          missing: { leicht: "Fast! Es fehlt noch etwas Richtiges.", mittel: "Gut, aber es fehlt noch mindestens eine richtige Antwort." },
          explain: "Prima! Helm, feste Schuhe und ein geprüfter Gurt – so geht es sicher los.",
        },
      ],
      quiz: [
        {
          id: "erschrecken",
          prompt: "Ein Pferd erschrickt. Was kann passieren?",
          options: [
            ok("springen", "Es springt zur Seite oder schlägt aus"),
            no("schlafen", "Es schläft sofort ein", "Ein erschrecktes Pferd ist hellwach und will weg."),
            no("nichts", "Gar nichts", "Pferde reagieren auf Schreck oft blitzschnell. Darum ist Abstand wichtig."),
          ],
          explain: "Richtig. Deshalb bleibst du ruhig und hältst Abstand zur Hinterhand.",
        },
        {
          id: "helmbild",
          prompt: "Welcher Helm sitzt richtig?",
          layout: "pictures",
          options: [
            ok("richtig", "Gerade und fest", { visual: scene("ak-helm-richtig") }),
            no("offen", "Kinnriemen offen", "Der Kinnriemen muss geschlossen sein.", { visual: scene("ak-helm-offen") }),
            no("schief", "Nach hinten geschoben", "Der Helm sitzt gerade, nicht im Nacken.", { visual: scene("ak-helm-schief") }),
          ],
          explain: "Genau! Gerade, fest und mit geschlossenem Kinnriemen.",
        },
        {
          id: "vor-dem-aufsteigen",
          prompt: "Was wird geprüft, bevor du aufsteigst?",
          options: [
            ok("gurt", "Der Sattelgurt"),
            no("schweif", "Der Schweif", "Der Schweif ist für die Sicherheit beim Aufsteigen nicht wichtig."),
            no("hufe", "Ob die Hufe glänzen", "Glänzende Hufe sind schön – geprüft wird aber der Gurt."),
          ],
          explain: "Richtig! Dann kann der Sattel nicht rutschen.",
        },
        {
          id: "absteigen",
          prompt: "Beim Absteigen machst du zuerst …",
          options: [
            ok("fuesse", "… beide Füße aus den Bügeln"),
            no("springen", "… einen großen Sprung", "Erst die Füße aus den Bügeln, dann ruhig hinunter."),
            no("hinlegen", "… mich auf den Pferdehals legen", "Das ist nicht nötig. Füße raus, Bein über den Rücken, weich landen."),
          ],
          explain: "Genau! So bleibt kein Fuß hängen.",
        },
        {
          id: "toter-winkel",
          levels: ["mittel"],
          prompt: "Was ist ein toter Winkel?",
          options: [
            ok("nicht-sehen", "Eine Stelle, die das Pferd nicht sehen kann"),
            no("ecke", "Eine Ecke in der Reitbahn", "Die Ecken der Reitbahn sind etwas anderes. Der tote Winkel liegt direkt hinter und vor dem Pferd."),
            no("muede", "Ein müdes Pferd", "Ein toter Winkel ist eine Stelle, die das Pferd nicht sieht."),
          ],
          explain: "Richtig. Direkt hinter und vor dem Pferd sieht es kaum etwas.",
        },
        {
          id: "lehrer",
          levels: ["mittel"],
          prompt: "Wer bringt dir das Reiten bei?",
          options: [
            ok("lehrer", "Eine Reitlehrerin oder ein Reitlehrer"),
            no("app", "Diese App ganz allein", "Die App hilft dir beim Verstehen. Reiten lernst du im Unterricht am Pferd."),
            no("video", "Ein Video", "Videos können helfen, aber Reiten lernst du mit einer Reitlehrkraft am echten Pferd."),
          ],
          explain: "Genau. Hier lernst du das Wissen – das Reiten selbst übst du immer im Unterricht.",
        },
      ],
      merksatz: {
        leicht: "Sicherheit zuerst: Helm, feste Schuhe und Ruhe am Pferd.",
        mittel: "Sicher reiten heißt: Ruhe, passende Ausrüstung und immer mit Aufsicht lernen.",
      },
    },
  ]),
};
