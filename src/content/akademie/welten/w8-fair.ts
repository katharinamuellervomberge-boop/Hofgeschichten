import { card, head, item, no, ok } from "../build";
import { lessonsOf, scene, type AcademyWorld } from "../types";

/** Welt 8 – Fair zum Pferd */
export const welt8: AcademyWorld = {
  id: "w8",
  number: 8,
  slug: "fair-zum-pferd",
  title: "Fair zum Pferd",
  teaser: "Feines Reiten, Pausen und Pferde verstehen.",
  learns: "Was feines, pferdefreundliches Reiten bedeutet, Sinn von Pausen und Abkühlen, Körpersprache und Stresszeichen beim Reiten, Umgang mit Pferden, die nicht mitmachen – plus große Abschlussprüfung.",
  tint: "#EADBC8",
  cover: head("tivoli", "entspannt"),
  badge: { id: "ra-abzeichen-w8", title: "Pferdefreund", motif: "heart" },
  lessons: lessonsOf(8, [
    /* ---------- 1. Was bedeutet feines Reiten? ---------- */
    {
      slug: "feines-reiten",
      title: "Was bedeutet feines Reiten?",
      speaker: "lea",
      intro: {
        leicht: "Tonga mag es, wenn ich ganz leise „rede“ – mit kleinen Zeichen. Das nennt man feines Reiten.",
        mittel: "Gut reiten heißt nicht stark reiten. Je feiner die Verständigung, desto lieber arbeitet ein Pferd mit.",
      },
      explanation: {
        leicht: [
          "Feines Reiten heißt: so leise wie möglich mit dem Pferd sprechen. Kleine Zeichen, weiche Hände, viel Lob.",
          "Ein Pferd soll gerne mitmachen. Darum sind wir geduldig und freundlich – auch wenn etwas nicht gleich klappt.",
        ],
        mittel: [
          "Feines Reiten bedeutet, dass Reiter und Pferd sich mit möglichst leichten Hilfen verständigen. Das gelingt nur mit einem ausbalancierten Sitz, ruhigen Händen und gut abgestimmten Hilfen. Das Pferd soll losgelassen, also entspannt und zufrieden mitarbeiten – nicht aus Angst oder unter Druck.",
          "Zu feinem Reiten gehört auch Fairness: Lob im richtigen Moment, Pausen, passende Ausrüstung, Geduld und realistische Ziele. Grobe Einwirkung wie Reißen am Zügel, Treten oder Schimpfen ist nie richtig. Klappt etwas nicht, sucht man den Grund – oft liegt er beim Reiter, beim Wissen oder bei der Ausrüstung, nicht beim Pferd.",
        ],
      },
      illustration: scene("ak-reiter-sitz"),
      terms: [
        { term: "Losgelassenheit", meaning: "Das Pferd arbeitet entspannt und zufrieden mit." },
        { term: "Einwirkung", meaning: "Wie der Reiter mit seinen Hilfen auf das Pferd wirkt." },
      ],
      exercise: [
        {
          type: "match",
          id: "ra-w8-l1-fein-grob",
          prompt: { leicht: "Fein oder grob? Sortiere die Karten.", mittel: "Feine oder grobe Einwirkung? Sortiere die Karten." },
          targets: [
            { id: "fein", label: "Fein" },
            { id: "grob", label: "Grob" },
          ],
          items: [
            card("schenkel", "Kleiner Schenkelimpuls", item("ak-schenkel"), "fein", "Richtig! Klein und klar.", "Ein kleiner Impuls ist fein."),
            card("stimme", "Ruhige Stimme", item("ak-sprechblase"), "fein", "Genau, das beruhigt.", "Eine ruhige Stimme ist fein."),
            card("loben", "Loben", item("ak-herz"), "fein", "Super! Lob ist immer gut.", "Loben gehört zum feinen Reiten."),
            card("reissen", "Am Zügel reißen", item("ak-blitz"), "grob", "Richtig. Das tut dem Pferdemaul weh.", "Reißen ist grob und tut weh."),
            card("schimpfen", "Laut schimpfen", item("ak-stopp"), "grob", "Genau. Schimpfen hilft dem Pferd nicht.", "Lautes Schimpfen ist grob."),
            card("treten", "Ständig treten", item("ak-stiefel"), "grob", "Richtig. Das stumpft ab und ist unfair.", "Ständiges Treten ist grob.", ["mittel"]),
          ],
        },
      ],
      quiz: [
        {
          id: "heisst",
          prompt: "Was heißt feines Reiten?",
          options: [
            ok("klein", "Mit kleinen, klaren Zeichen reiten"),
            no("stark", "Möglichst stark einwirken", "Starke Hilfen sind nicht nötig – Pferde sind sehr feinfühlig."),
            no("schnell", "Möglichst schnell reiten", "Mit der Geschwindigkeit hat feines Reiten nichts zu tun."),
          ],
          explain: "Richtig! So leise wie möglich mit dem Pferd sprechen.",
        },
        {
          id: "lob",
          prompt: "Wann lobst du dein Pferd?",
          options: [
            ok("sofort", "Sofort, wenn etwas geklappt hat"),
            no("morgen", "Erst am nächsten Tag", "Pferde verbinden Lob mit dem, was gerade passiert ist."),
            no("nie", "Nie", "Lob zeigt dem Pferd, was richtig war."),
          ],
          explain: "Genau! Direkt im richtigen Moment.",
        },
        {
          id: "klappt-nicht",
          prompt: "Etwas klappt nicht. Was machst du?",
          options: [
            ok("ruhig", "Ruhig bleiben und es noch einmal freundlich versuchen"),
            no("schimpfen", "Schimpfen", "Schimpfen verunsichert das Pferd. Ruhig bleiben hilft mehr."),
            no("reissen", "Am Zügel reißen", "Reißen tut weh und macht alles schlimmer."),
          ],
          explain: "Richtig! Geduld ist das Wichtigste.",
        },
        {
          id: "losgelassen",
          levels: ["mittel"],
          prompt: "Was bedeutet Losgelassenheit?",
          options: [
            ok("entspannt", "Das Pferd arbeitet entspannt und zufrieden mit"),
            no("weg", "Das Pferd läuft ohne Reiter davon", "Gemeint ist die innere Entspannung des Pferdes."),
            no("zuegel", "Die Zügel sind losgelassen", "Losgelassenheit beschreibt das Pferd – nicht die Zügel."),
          ],
          explain: "Richtig. Ein losgelassenes Pferd arbeitet gern mit.",
        },
        {
          id: "grund",
          levels: ["mittel"],
          prompt: "Wo liegt oft der Grund, wenn etwas nicht klappt?",
          options: [
            ok("reiter", "Oft beim Reiter, beim Wissen oder bei der Ausrüstung"),
            no("pferd", "Immer beim Pferd", "Pferde haben immer einen Grund. Oft liegt er bei uns."),
            no("nirgends", "Nirgendwo – es ist einfach Pech", "Meist gibt es einen Grund, den man finden kann."),
          ],
          explain: "Genau. Darum schaut man zuerst bei sich selbst.",
        },
      ],
      merksatz: {
        leicht: "Kleine Zeichen, weiche Hände, viel Lob.",
        mittel: "Feines Reiten heißt: so leicht wie möglich, so fair wie immer – dann arbeitet das Pferd gern mit.",
      },
    },

    /* ---------- 2. Warum Pausen wichtig sind ---------- */
    {
      slug: "pausen",
      title: "Warum Pausen wichtig sind",
      speaker: "ben",
      intro: {
        leicht: "Auch Pferde werden müde. Darum machen wir beim Reiten immer wieder Pausen.",
        mittel: "Pausen sind keine verlorene Zeit – sie gehören zu gutem Training dazu.",
      },
      explanation: {
        leicht: [
          "Auch Pferde brauchen Pausen. In der Pause lässt du die Zügel lang, und das Pferd darf im Schritt den Hals strecken.",
          "Nach dem Reiten wird das Pferd im Schritt abgekühlt, gelobt und versorgt.",
        ],
        mittel: [
          "Muskeln arbeiten besser, wenn sich Anspannung und Entspannung abwechseln. Deshalb gehören regelmäßige Schrittpausen am langen oder hingegebenen Zügel zu jeder Reitstunde. Das Pferd kann sich strecken, abschnauben und durchatmen. Abschnauben ist oft ein Zeichen, dass ein Pferd sich entspannt.",
          "Am Ende der Stunde wird das Pferd im Schritt ruhig geritten, bis die Atmung wieder normal ist. Bei Hitze oder nach anstrengender Arbeit braucht es mehr Zeit. Danach wird es versorgt – je nach Stall gehören dazu: Sattel abnehmen, nachsehen, ob irgendwo etwas gedrückt hat, und Wasser anbieten.",
        ],
      },
      illustration: scene("ak-reiter-pause"),
      terms: [
        { term: "Hingegebener Zügel", meaning: "Die Zügel sind ganz lang, das Pferd kann den Hals frei strecken." },
        { term: "Abschnauben", meaning: "Kräftiges Ausatmen durch die Nüstern, oft ein Zeichen von Entspannung." },
      ],
      exercise: [
        {
          type: "multi",
          id: "ra-w8-l2-pause",
          prompt: { leicht: "Was gehört zu einer guten Pause? Tippe alles Richtige an.", mittel: "Was gehört zu einer guten Pause? Wähle alle richtigen." },
          options: [
            { id: "lang", label: "Die Zügel lang lassen", visual: item("ak-zuegel"), correct: true },
            { id: "schritt", label: "Im Schritt gehen", visual: item("ak-pause"), correct: true },
            { id: "loben", label: "Loben", visual: item("ak-herz"), correct: true },
            { id: "galopp", label: "Galopp ohne Ende", visual: item("ak-blitz"), feedback: "Galopp ohne Ende ist das Gegenteil einer Pause." },
            { id: "kurz", label: "Die Zügel ganz kurz festhalten", visual: item("ak-stopp"), feedback: "Mit kurzen Zügeln kann das Pferd den Hals nicht strecken." },
          ],
          missing: { leicht: "Fast! Es fehlt noch etwas Richtiges.", mittel: "Gut – aber es fehlt noch mindestens eine richtige Antwort." },
          explain: "Prima! Lange Zügel, Schritt und Lob.",
        },
      ],
      quiz: [
        {
          id: "brauchen",
          prompt: "Brauchen Pferde beim Reiten Pausen?",
          options: [
            ok("ja", "Ja, immer wieder"),
            no("nein", "Nein, nie", "Doch! Muskeln brauchen Erholung."),
            no("profi", "Nur Profipferde", "Alle Pferde brauchen Pausen."),
          ],
          explain: "Richtig! Arbeit und Pause wechseln sich ab.",
        },
        {
          id: "hals",
          prompt: "Was darf das Pferd in der Pause am langen Zügel tun?",
          options: [
            ok("strecken", "Den Hals strecken"),
            no("rennen", "Davonrennen", "In der Pause geht es ruhig im Schritt weiter."),
            no("steigen", "Sich aufbäumen", "Das wäre gefährlich – in der Pause entspannt sich das Pferd."),
          ],
          explain: "Genau! Das entspannt den Rücken.",
        },
        {
          id: "ende",
          prompt: "Wie endet eine Reitstunde?",
          options: [
            ok("schritt", "Mit ruhigem Schritt zum Abkühlen"),
            no("galopp", "Mit einem schnellen Galopp", "Nach dem Galopp braucht das Pferd noch Zeit zum Abkühlen."),
            no("springen", "Mit einem Sprung vom Pferd", "Abgestiegen wird ruhig – vorher wird im Schritt abgekühlt."),
          ],
          explain: "Richtig! Bis die Atmung wieder ruhig ist.",
        },
        {
          id: "abschnauben",
          levels: ["mittel"],
          prompt: "Was zeigt Abschnauben oft?",
          options: [
            ok("entspannt", "Dass sich das Pferd entspannt"),
            no("krank", "Dass es krank ist", "Meist ist Abschnauben ein gutes Zeichen. Bei Husten oder viel Nasenausfluss sagt man Erwachsenen Bescheid."),
            no("schneller", "Dass es schneller laufen will", "Abschnauben ist meist ein Zeichen von Entspannung."),
          ],
          explain: "Genau. Abschnauben zeigt oft, dass sich ein Pferd wohlfühlt und entspannt.",
        },
        {
          id: "wechsel",
          levels: ["mittel"],
          prompt: "Warum wechseln sich Anspannung und Entspannung ab?",
          options: [
            ok("muskeln", "Weil Muskeln so besser arbeiten und nicht übermüdet werden"),
            no("langweilig", "Weil es sonst langweilig wird", "Es geht um den Körper des Pferdes, nicht nur um Abwechslung."),
            no("regel", "Weil es eine Turnierregel ist", "Es ist einfach gut für das Pferd – in jeder Reitstunde."),
          ],
          explain: "Richtig. Nach Anstrengung brauchen Muskeln Erholung, sonst werden sie müde und verspannt.",
        },
      ],
      merksatz: {
        leicht: "Pausen sind wichtig: lange Zügel, Schritt und Lob.",
        mittel: "Arbeit und Pause wechseln sich ab – am Ende wird im Schritt abgekühlt.",
      },
    },

    /* ---------- 3. Pferdeverhalten beim Reiten ---------- */
    {
      slug: "pferdeverhalten",
      title: "Pferdeverhalten beim Reiten",
      speaker: "mila",
      intro: {
        leicht: "Pferde können nicht sprechen – aber sie zeigen uns ganz viel. Man muss nur hinschauen!",
        mittel: "Auch beim Reiten erzählt dir das Pferd, wie es sich fühlt. Hier lernst du, es zu lesen.",
      },
      explanation: {
        leicht: [
          "Pferde zeigen mit dem Körper, wie es ihnen geht. Ohren nach vorne heißt oft: Ich bin neugierig. Locker hängende Ohren heißen: Ich bin entspannt.",
          "Angelegte Ohren und ein peitschender Schweif heißen: Mir passt etwas nicht! Dann sagst du es deiner Reitlehrerin.",
        ],
        mittel: [
          "Ein Pferd, das locker kaut, abschnaubt, den Schweif ruhig trägt und die Ohren mal nach vorn und mal zum Reiter dreht, ist meist aufmerksam und entspannt. Ein Ohr, das zum Reiter zeigt, heißt oft: Ich höre dir zu.",
          "Zeichen von Unwohlsein oder Stress können sein: dauerhaft angelegte Ohren, heftiges Schweifschlagen, Zähneknirschen, ein aufgesperrtes Maul, Kopfschlagen, Verspannen oder plötzliches Davonstürmen. Ein einzelnes Zeichen sagt noch nicht alles – wichtig ist das Gesamtbild. Zeigt ein Pferd solche Zeichen öfter, suchen Erwachsene nach der Ursache, zum Beispiel Schmerzen oder eine drückende Ausrüstung.",
        ],
      },
      illustration: head("tivoli", "entspannt"),
      terms: [
        { term: "Körpersprache", meaning: "Was ein Pferd mit Ohren, Augen, Maul, Schweif und Haltung zeigt." },
        { term: "Stresszeichen", meaning: "Signale, dass sich ein Pferd unwohl fühlt." },
        { term: "Gesamtbild", meaning: "Alle Zeichen zusammen betrachtet, nicht nur eines." },
      ],
      exercise: [
        {
          type: "choice",
          id: "ra-w8-l3-entspannt",
          prompt: "Welches Pferd ist entspannt?",
          layout: "pictures",
          options: [
            { id: "grummelig", label: "Bild 1", visual: head("scrabble", "grummelig"), feedback: "Angelegte Ohren: Hier passt dem Pferd etwas nicht." },
            { id: "entspannt", label: "Bild 2", visual: head("tivoli", "entspannt"), correct: true },
            { id: "aufgeregt", label: "Bild 3", visual: head("tonga", "aufgeregt"), feedback: "Hoch aufgerichtete Ohren: Dieses Pferd ist aufgeregt." },
            { id: "neugierig", label: "Bild 4", visual: head("tonga", "neugierig"), feedback: "Dieses Pferd ist neugierig und aufmerksam – schön, aber nicht ganz entspannt.", levels: ["mittel"] },
          ],
          explain: "Richtig! Locker zur Seite hängende Ohren zeigen Entspannung.",
        },
      ],
      quiz: [
        {
          id: "vorne",
          prompt: "Ohren nach vorne heißt oft …",
          options: [
            ok("neugierig", "… ich bin neugierig"),
            no("wuetend", "… ich bin wütend", "Wütende oder genervte Pferde legen die Ohren eher an."),
            no("schlafen", "… ich schlafe", "Ein schlafendes Pferd lässt die Ohren eher hängen."),
          ],
          explain: "Richtig! Das Pferd schaut und hört, was vorne passiert.",
        },
        {
          id: "angelegt",
          prompt: "Die Ohren sind angelegt und der Schweif peitscht. Was tust du?",
          options: [
            ok("bescheid", "Ruhig bleiben und der Reitlehrerin Bescheid sagen"),
            no("lachen", "Lachen und einfach weitermachen", "Das Pferd zeigt dir, dass etwas nicht stimmt. Sag Bescheid."),
            no("schreien", "Das Pferd anschreien", "Anschreien macht es schlimmer. Ruhig bleiben!"),
          ],
          explain: "Genau! Erwachsene schauen dann nach dem Grund.",
        },
        {
          id: "woran",
          prompt: "Woran zeigt ein Pferd, wie es sich fühlt?",
          options: [
            ok("koerper", "An Ohren, Schweif und Körperhaltung"),
            no("farbe", "An seiner Fellfarbe", "Die Fellfarbe verändert sich nicht mit der Laune."),
            no("garnicht", "Gar nicht", "Doch – Pferde zeigen sehr viel mit ihrem Körper."),
          ],
          explain: "Richtig! Man muss nur genau hinschauen.",
        },
        {
          id: "ohr-reiter",
          levels: ["mittel"],
          prompt: "Ein Ohr zeigt nach hinten zum Reiter. Was heißt das oft?",
          options: [
            ok("hoert", "Das Pferd hört dem Reiter zu"),
            no("absteigen", "Das Pferd möchte, dass man absteigt", "Ein Ohr nach hinten ist meist Aufmerksamkeit für den Reiter."),
            no("boese", "Das Pferd ist böse", "Pferde sind nicht böse. Ein Ohr zum Reiter ist meist Aufmerksamkeit."),
          ],
          explain: "Genau. Beide Ohren dauerhaft angelegt wären etwas anderes.",
        },
        {
          id: "gesamtbild",
          levels: ["mittel"],
          prompt: "Warum ist das Gesamtbild wichtig?",
          options: [
            ok("einzeln", "Weil ein einzelnes Zeichen noch nicht alles sagt"),
            no("egal", "Weil Körpersprache eigentlich egal ist", "Körpersprache ist sehr wichtig – man schaut aber auf alle Zeichen zusammen."),
            no("foto", "Weil man ein Foto machen soll", "Gemeint ist: alle Zeichen zusammen betrachten."),
          ],
          explain: "Richtig. Ein Schweifschlag kann auch einer Fliege gelten.",
        },
      ],
      merksatz: {
        leicht: "Ich schaue auf Ohren und Schweif – so verstehe ich mein Pferd.",
        mittel: "Pferde sprechen mit dem Körper: aufmerksam hinschauen, das Gesamtbild sehen und bei Stresszeichen Erwachsene fragen.",
      },
    },

    /* ---------- 4. Wenn ein Pferd nicht mitmacht ---------- */
    {
      slug: "wenn-ein-pferd-nicht-mitmacht",
      title: "Wenn ein Pferd nicht mitmacht",
      speaker: "ben",
      intro: {
        leicht: "Scrabble ist einmal einfach stehen geblieben. War er böse? Nein! Ich erzähle dir, warum.",
        mittel: "Jeder Reiter erlebt es: Das Pferd macht nicht, was man möchte. Was dann wirklich hilft.",
      },
      explanation: {
        leicht: [
          "Manchmal macht ein Pferd nicht, was du möchtest. Es bleibt stehen oder geht zur Seite. Das heißt nicht, dass es böse ist!",
          "Vielleicht versteht es dich nicht, hat Angst, ist müde oder ihm tut etwas weh. Bleib ruhig und frag deine Reitlehrerin um Hilfe.",
        ],
        mittel: [
          "Wenn ein Pferd nicht mitmacht, hat es dafür einen Grund. Häufige Gründe sind: Es versteht die Hilfe nicht, weil sie unklar war oder sich widersprochen hat. Es hat Angst vor etwas. Es ist müde, überfordert oder abgelenkt. Oder es hat Schmerzen, zum Beispiel durch eine drückende Ausrüstung, die Zähne oder den Rücken.",
          "Darum gilt: ruhig bleiben, nicht strafen, die eigene Hilfe überprüfen und die Aufgabe leichter machen. Bei Angst helfen Ruhe und Zeit. Kommt es öfter vor, sollte eine Fachperson – zum Beispiel eine Tierärztin oder ein Sattler – nach Schmerzursachen schauen. Und: Es ist völlig in Ordnung, Hilfe zu holen oder mit Unterstützung abzusteigen, wenn du dich unsicher fühlst.",
        ],
      },
      illustration: head("scrabble", "grummelig"),
      terms: [
        { term: "Ursache", meaning: "Der Grund, warum etwas passiert." },
        { term: "Überfordert", meaning: "Die Aufgabe ist (noch) zu schwer." },
      ],
      exercise: [
        {
          type: "multi",
          id: "ra-w8-l4-gruende",
          prompt: { leicht: "Ein Pferd bleibt immer wieder stehen. Was könnte der Grund sein? Tippe alles Richtige an.", mittel: "Ein Pferd bleibt immer wieder stehen. Welche Gründe sind möglich? Wähle alle richtigen." },
          options: [
            { id: "versteht", label: "Es versteht die Hilfe nicht", visual: item("ak-sprechblase"), correct: true },
            { id: "angst", label: "Es hat Angst", visual: item("ak-auge"), correct: true },
            { id: "schmerz", label: "Ihm tut etwas weh", visual: item("ak-herz"), correct: true },
            { id: "muede", label: "Es ist müde oder überfordert", visual: item("ak-pause"), correct: true, levels: ["mittel"] },
            { id: "boese", label: "Es ist ein böses Pferd", visual: item("ak-blitz"), feedback: "Pferde sind nicht böse. Es gibt immer einen Grund." },
            { id: "aergern", label: "Es will dich absichtlich ärgern", visual: item("ak-stopp"), feedback: "Pferde planen keine Streiche – sie reagieren auf das, was sie fühlen." },
          ],
          missing: { leicht: "Fast! Es gibt noch einen möglichen Grund.", mittel: "Gut – aber es fehlt noch mindestens ein möglicher Grund." },
          explain: "Prima! Es gibt immer einen Grund – und den suchen wir freundlich.",
        },
      ],
      quiz: [
        {
          id: "boese",
          prompt: "Ein Pferd macht nicht mit. Ist es böse?",
          options: [
            ok("grund", "Nein, es hat einen Grund"),
            no("ja", "Ja, ganz bestimmt", "Pferde sind nicht böse. Sie haben immer einen Grund."),
            no("manchmal", "Ja, an manchen Tagen", "Auch an schlechten Tagen hat das Verhalten einen Grund, zum Beispiel Müdigkeit."),
          ],
          explain: "Richtig! Und diesen Grund suchen wir.",
        },
        {
          id: "zuerst",
          prompt: "Was machst du zuerst?",
          options: [
            ok("ruhig", "Ruhig bleiben"),
            no("schimpfen", "Schimpfen", "Schimpfen macht dem Pferd Angst."),
            no("reissen", "Am Zügel reißen", "Reißen tut weh und löst das Problem nicht."),
          ],
          explain: "Genau! Ruhe hilft dir und dem Pferd.",
        },
        {
          id: "hilfe",
          prompt: "Wen fragst du um Hilfe?",
          options: [
            ok("lehrer", "Meine Reitlehrerin oder meinen Reitlehrer"),
            no("niemand", "Niemanden – ich löse das allein", "Hilfe holen ist klug, nicht peinlich."),
            no("pferd", "Ein anderes Pferd", "Pferde können dir da nicht helfen – Erwachsene schon."),
          ],
          explain: "Richtig! Gemeinsam findet ihr den Grund.",
        },
        {
          id: "fachperson",
          levels: ["mittel"],
          prompt: "Was sollte eine Fachperson prüfen, wenn ein Pferd öfter nicht mitmacht?",
          options: [
            ok("schmerz", "Mögliche Schmerzen, z. B. durch Sattel, Zähne oder Rücken"),
            no("farbe", "Die Farbe der Schabracke", "Die Farbe spielt keine Rolle. Wichtig sind mögliche Schmerzen."),
            no("name", "Ob das Pferd den richtigen Namen hat", "Der Name ändert nichts. Wichtig ist, ob ihm etwas wehtut."),
          ],
          explain: "Genau. Schmerzen sind ein häufiger Grund.",
        },
        {
          id: "unsicher",
          levels: ["mittel"],
          prompt: "Du fühlst dich auf dem Pferd sehr unsicher. Was ist richtig?",
          options: [
            ok("bescheid", "Bescheid sagen und, wenn nötig, mit Hilfe absteigen"),
            no("weiter", "Einfach weiterreiten und nichts sagen", "Unsicherheit spürt das Pferd. Sag lieber Bescheid."),
            no("strafen", "Das Pferd bestrafen", "Strafen ist nie richtig und macht alles unsicherer."),
          ],
          explain: "Richtig. Das ist mutig und vernünftig.",
        },
      ],
      merksatz: {
        leicht: "Ein Pferd ist nie böse – es hat einen Grund. Ruhig bleiben, Hilfe holen.",
        mittel: "Wenn ein Pferd nicht mitmacht: ruhig bleiben, Ursache suchen, Aufgabe leichter machen – nie strafen.",
      },
    },

    /* ---------- 5. Die große Abschlussprüfung ---------- */
    {
      slug: "abschlusspruefung",
      title: "Die große Abschlussprüfung",
      speaker: "mila",
      intro: {
        leicht: "Jetzt kommt die große Abschlussprüfung! Fragen aus allen Lernwelten – du schaffst das!",
        mittel: "Die große Abschlussprüfung: Fragen aus allen acht Lernwelten. Viel Erfolg!",
      },
      explanation: {
        leicht: [
          "Du hast viel gelernt: sicher am Pferd sein, gut sitzen, feine Hilfen, Schritt, Trab, Galopp, die Reitbahn und fair zum Pferd sein. Lass dir Zeit bei jeder Frage.",
        ],
        mittel: [
          "In dieser Prüfung kommen Fragen aus allen acht Lernwelten: Sicherheit, Sitz, Hilfen, die drei Gangarten, die Reitbahn und Fairness. Lies jede Frage genau. Falsche Antworten sind nicht schlimm – die Rückmeldung erklärt dir, was stimmt.",
        ],
      },
      illustration: scene("ak-reiter-sitz-linie"),
      exercise: [
        {
          type: "multi",
          id: "ra-w8-l5-guter-reiter",
          prompt: { leicht: "Was macht eine gute Reiterin oder einen guten Reiter aus? Tippe alles Richtige an.", mittel: "Was gehört zu gutem, pferdefreundlichem Reiten? Wähle alle richtigen." },
          options: [
            { id: "helm", label: "Immer mit Helm reiten", visual: item("reiten"), correct: true },
            { id: "fein", label: "Feine Hilfen geben", visual: item("ak-schenkel"), correct: true },
            { id: "pausen", label: "Pausen machen", visual: item("ak-pause"), correct: true },
            { id: "loben", label: "Loben", visual: item("ak-herz"), correct: true },
            { id: "reissen", label: "Am Zügel reißen", visual: item("ak-blitz"), feedback: "Reißen tut weh und ist nie richtig." },
            { id: "allein", label: "Galoppieren ganz ohne Reitlehrerin lernen", visual: item("ak-stopp"), feedback: "Galoppieren lernst du mit Anleitung – das ist sicherer für dich und das Pferd.", levels: ["mittel"] },
          ],
          missing: { leicht: "Fast! Es fehlt noch etwas Richtiges.", mittel: "Gut – aber es fehlt noch mindestens eine richtige Antwort." },
          explain: "Prima! Sicher, fein und fair – so reiten Pferdefreunde.",
        },
      ],
      quiz: [
        {
          id: "annaehern",
          prompt: "Von wo gehst du auf ein Pferd zu?",
          options: [
            ok("schraeg", "Von schräg vorne zur Schulter"),
            no("hinten", "Von hinten", "Hinten liegt der tote Winkel. Dort kann das Pferd erschrecken."),
            no("unter", "Unter dem Bauch durch", "Unter dem Pferd durchkriechen ist gefährlich."),
          ],
          explain: "Richtig! Und vorher sprichst du es an.",
        },
        {
          id: "vier",
          prompt: "Welche Gangart ist ein Viertakt?",
          options: [
            ok("schritt", "Schritt"),
            no("trab", "Trab", "Der Trab ist ein Zweitakt."),
            no("galopp", "Galopp", "Der Galopp ist ein Dreitakt."),
          ],
          explain: "Richtig! Eins, zwei, drei, vier.",
        },
        {
          id: "zwei",
          prompt: "Welche Gangart ist ein Zweitakt?",
          options: [
            ok("trab", "Trab"),
            no("schritt", "Schritt", "Der Schritt ist ein Viertakt."),
            no("galopp", "Galopp", "Der Galopp ist ein Dreitakt."),
          ],
          explain: "Genau! Ta-tam, ta-tam: Trab ist ein Zweitakt.",
        },
        {
          id: "drei",
          prompt: "Welche Gangart ist ein Dreitakt?",
          options: [
            ok("galopp", "Galopp"),
            no("trab", "Trab", "Der Trab ist ein Zweitakt."),
            no("schritt", "Schritt", "Der Schritt ist ein Viertakt."),
          ],
          explain: "Richtig! Ta-ta-tam: Galopp ist ein Dreitakt mit Schwebephase.",
        },
        {
          id: "zirkel",
          prompt: "Wie heißt der große Kreis in der Reitbahn?",
          options: [
            ok("zirkel", "Zirkel"),
            no("volte", "Volte", "Die Volte ist der kleine Kreis."),
            no("x", "X", "X ist der Mittelpunkt der Bahn."),
          ],
          explain: "Genau! Der Zirkel ist so breit wie die ganze Reitbahn.",
        },
        {
          id: "absatz",
          prompt: "Was ist der tiefste Punkt an deinem Fuß im Sattel?",
          options: [
            ok("absatz", "Der Absatz"),
            no("zehen", "Die Zehen", "Zeigen die Zehen nach unten, rutschst du leicht aus dem Bügel."),
            no("knie", "Das Knie", "Das Knie liegt am Sattel – der tiefste Punkt ist der Absatz."),
          ],
          explain: "Richtig! Ein tiefer, federnder Absatz hält dein Bein ruhig.",
        },
        {
          id: "nachgeben",
          prompt: "Was folgt auf jedes Annehmen des Zügels?",
          options: [
            ok("nachgeben", "Nachgeben"),
            no("ziehen", "Noch fester ziehen", "Das wäre grob. Auf Annehmen folgt Nachgeben."),
            no("loslassen", "Den Zügel fallen lassen", "Fallen lassen ist zu viel – nachgeben heißt leichter werden."),
          ],
          explain: "Genau! Kein Annehmen ohne Nachgeben.",
        },
        {
          id: "gewicht",
          levels: ["mittel"],
          prompt: "Welche drei Arten von Gewichtshilfen gibt es?",
          options: [
            ok("drei", "Beidseitig belastend, einseitig belastend, entlastend"),
            no("schwer", "Schwer, mittel, leicht", "Gewichtshilfen beschreibt man nach der Belastung: beidseitig, einseitig, entlastend."),
            no("vor", "Vorne, hinten, seitlich", "Gemeint ist, wie der Sitz belastet: beidseitig, einseitig oder entlastend."),
          ],
          explain: "Richtig. Beidseitig belastend, einseitig belastend und entlastend.",
        },
        {
          id: "fuss",
          levels: ["mittel"],
          prompt: "Wann stehst du beim Leichttraben auf dem richtigen Fuß auf?",
          options: [
            ok("aussen", "Wenn das äußere Vorderbein nach vorne schwingt"),
            no("innen", "Wenn das innere Vorderbein nach vorne schwingt", "Dann wärst du auf dem falschen Fuß."),
            no("egal", "Das ist egal", "Der richtige Fuß unterstützt das innere Hinterbein in Wendungen."),
          ],
          explain: "Genau. Dann sitzt du ein, wenn das innere Hinterbein auffußt.",
        },
        {
          id: "halbe",
          levels: ["mittel"],
          prompt: "Wie reitet man „durch die halbe Bahn wechseln“?",
          options: [
            ok("fe", "Von F zur Mitte der gegenüberliegenden langen Seite, also nach E"),
            no("fxh", "Von F über X nach H", "Das ist durch die ganze Bahn wechseln."),
            no("axc", "Von A über X nach C", "Das ist durch die Länge der Bahn wechseln."),
          ],
          explain: "Richtig. Von der Ecke zur Mitte der gegenüberliegenden langen Seite.",
        },
      ],
      merksatz: {
        leicht: "Ich weiß viel übers Reiten – und lerne am echten Pferd mit meiner Reitlehrerin weiter.",
        mittel: "Wissen ist der Anfang: Mit feinen Hilfen, Geduld und Unterricht wird aus Reitwissen echtes Reiten.",
      },
    },
  ]),
};
