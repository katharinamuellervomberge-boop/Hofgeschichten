import "server-only";
import type { AdventureContent } from "@/engine/types";

/**
 * PREMIUM-INHALT: „Das Geheimnis der Geisterweide“
 *
 * Diese Datei wird nur auf dem Server geladen („server-only“) und nur an
 * Geräte mit gültiger Kaufberechtigung ausgeliefert.
 *
 * Handlung (realistisch, ohne Magie, ohne sprechende Tiere):
 * Am Morgen des Kürbisfests ist Tivolis Halfter verschwunden. Die Kinder
 * finden Reitstiefel-Spuren, Garn, einen Reflektor-Schnipsel – und Krümel
 * findet am Hoftor einen Reithandschuh. Die Spur führt außen am Zaun
 * entlang zur Weidehütte. Der „Geist“ auf der Weide ist eine trocknende
 * Pferdedecke. Hinter dem Zahlenschloss liegt die Auflösung: Die
 * Reitlehrerin hat Leuchtstreifen auf das Halfter genäht, damit Tivoli
 * beim Laternen-Spaziergang im Dunkeln gut zu sehen ist – und daraus eine
 * Halloween-Rätselrallye für die Kinder gemacht.
 *
 * Sicherheit in der Geschichte: Krümel bleibt an der Leine und außerhalb
 * der Weide; die Kinder gehen außen am Zaun entlang; ein Erwachsener führt
 * Tivoli beim Laternen-Spaziergang.
 */
export const geisterweide: AdventureContent = {
  slug: "geisterweide",
  clues: {
    "leerer-haken": { label: "Tivolis Haken ist leer", visual: { kind: "item", name: "haken" } },
    stiefelspur: { label: "Große Stiefelspur", visual: { kind: "track", track: "reitstiefel" } },
    reflektor: { label: "Glitzernder Schnipsel", visual: { kind: "item", name: "reflektor" } },
    garn: { label: "Garnrolle mit Faden", visual: { kind: "item", name: "garn" } },
    "schere-fehlt": { label: "Die Schere fehlt", visual: { kind: "item", name: "schere" } },
    handschuh: { label: "Reithandschuh (Krümels Fund)", visual: { kind: "item", name: "handschuh" } },
    "spur-zum-tor": { label: "Spur zum Weidetor", visual: { kind: "item", name: "tor" } },
    decke: { label: "Der „Geist“ ist eine Decke", visual: { kind: "item", name: "decke" } },
    "pferde-schauen": { label: "Die Pferde schauen zur Hütte", visual: { kind: "item", name: "huette" } },
  },
  missions: [
    /* ===================== Mission 1 ===================== */
    {
      id: "sattelkammer",
      title: "Die leere Sattelkammer",
      intro: "Mission 1: Die leere Sattelkammer",
      steps: [
        {
          type: "story",
          id: "m1-start",
          visual: { kind: "scene", scene: "sattelkammer" },
          speaker: "erzaehler",
          text: {
            leicht:
              "Heute ist Kürbisfest auf dem Hof! Am Abend soll Tivoli beim Laternen-Spaziergang mitgehen. Doch Lea ruft: „Tivolis Halfter ist weg!“",
            mittel:
              "Es ist der Morgen vor dem Kürbisfest. Nebel liegt über den Weiden. Heute Abend soll Tivoli beim Laternen-Spaziergang am Führstrick mitgehen. Doch als Lea in die Sattelkammer kommt, hängt an Tivolis Haken nichts. „Sein Halfter ist verschwunden!“",
          },
        },
        {
          type: "story",
          id: "m1-detektive",
          speaker: "mila",
          visual: { kind: "item", name: "lupe" },
          text: {
            leicht: "„Wir sind Detektive!“, sagt Mila. „Komm, wir suchen Hinweise.“",
            mittel:
              "„Keine Panik“, sagt Mila. „Wir lösen das wie echte Detektive: genau hinschauen, Hinweise sammeln und dann nachdenken.“",
          },
        },
        {
          type: "hotspots",
          id: "m1-suchbild",
          mode: "collect",
          scene: { kind: "scene", scene: "sattelkammer" },
          prompt: {
            leicht: "Suchbild: Finde drei Hinweise in der Sattelkammer!",
            mittel: "Suchbild: In der Sattelkammer sind fünf Hinweise versteckt. Findest du alle?",
          },
          missHint: "Hier ist kein Hinweis. Schau dir Boden, Wände und Haken genau an.",
          targets: [
            { id: "haken", label: "Leerer Haken", x: 412, y: 238, r: 58, clue: "leerer-haken", say: "Tivolis Haken ist leer. Man sieht noch, wo das Halfter hing." },
            { id: "stiefel", label: "Stiefelspur", x: 325, y: 552, r: 62, clue: "stiefelspur", say: "Matschige Stiefelspuren! Sie sind ganz schön groß." },
            { id: "reflektor", label: "Glitzer-Schnipsel", x: 475, y: 560, r: 44, clue: "reflektor", say: "Ein glitzernder Schnipsel. Der glänzt richtig, wenn Licht darauf fällt." },
            { id: "garn", label: "Garnrolle", x: 146, y: 559, r: 42, clue: "garn", say: "Eine Garnrolle mit Faden. Hat hier jemand genäht?", levels: ["mittel"] },
            { id: "schere", label: "Schere fehlt", x: 342, y: 375, r: 48, clue: "schere-fehlt", say: "Am Werkzeugbrett fehlt die Schere – man sieht nur ihren Umriss.", levels: ["mittel"] },
          ],
          decoys: [
            { id: "putzkiste", label: "Putzkiste", x: 622, y: 497, r: 60, say: "Die Putzkiste ist ordentlich. Hier fehlt nichts." },
            { id: "kuerbis", label: "Kürbis", x: 745, y: 545, r: 45, say: "Das ist nur die Halloween-Deko." },
            { id: "sattel", label: "Sattel", x: 685, y: 290, r: 62, say: "Die Sättel sind alle noch da." },
          ],
        },
        {
          type: "story",
          id: "m1-ende",
          speaker: "ben",
          visual: { kind: "notebook" },
          text: {
            leicht: "Ben schreibt alles in das Detektivbuch. „Die Spuren sind von großen Stiefeln!“",
            mittel:
              "Ben trägt alles ins Detektivbuch ein. „Komisch“, sagt er. „Große Stiefelspuren, Garn, ein Glitzer-Schnipsel und die Schere fehlt. Hat hier jemand gebastelt?“",
          },
        },
      ],
    },

    /* ===================== Mission 2 ===================== */
    {
      id: "spuren",
      title: "Spuren auf dem Hof",
      intro: "Mission 2: Spuren auf dem Hof",
      steps: [
        {
          type: "story",
          id: "m2-start",
          visual: { kind: "scene", scene: "hof" },
          speaker: "erzaehler",
          text: {
            leicht: "Draußen ist der Boden matschig. Krümel, der Hofhund, schnüffelt am Laubhaufen beim Tor.",
            mittel:
              "Vor dem Stall ist der Boden vom Regen matschig. Krümel, der junge Hofhund, darf an der Leine mit. Plötzlich bleibt er am Laubhaufen beim Hoftor stehen und schnüffelt aufgeregt.",
          },
        },
        {
          type: "hotspots",
          id: "m2-kruemel",
          mode: "collect",
          scene: { kind: "scene", scene: "hof" },
          prompt: { leicht: "Krümel hat etwas gefunden! Tippe auf den Laubhaufen.", mittel: "Was hat Krümel im Laub gefunden? Tippe darauf." },
          missHint: "Schau, wo Krümel schnüffelt – beim Laubhaufen am Tor.",
          targets: [
            { id: "laub", label: "Reithandschuh", x: 530, y: 455, r: 62, clue: "handschuh", say: "Ein Reithandschuh! Gut gemacht, Krümel!" },
          ],
        },
        {
          type: "choice",
          id: "m2-spur",
          prompt: {
            leicht: "Welche Spur sieht aus wie die aus der Sattelkammer?",
            mittel: "Vergleiche: Welche Spur passt zum Abdruck aus der Sattelkammer?",
          },
          visual: { kind: "track", track: "reitstiefel" },
          layout: "pictures",
          options: [
            { id: "hufeisen", label: "Hufeisen", visual: { kind: "track", track: "hufeisen" }, feedback: "Das ist ein Hufeisen – rund wie ein U. Unsere Spur ist lang und hat einen Absatz." },
            { id: "pfote", label: "Pfote", visual: { kind: "track", track: "hund" }, feedback: "Diese Spur hat Zehen und Krallen. Das ist eine Hundepfote – wie von Krümel.", levels: ["leicht"] },
            { id: "gummistiefel", label: "Gummistiefel", visual: { kind: "track", track: "gummistiefel" }, feedback: "Gummistiefel haben ein grobes Profil und sind hier kleiner. Unsere Spur ist glatt mit Absatz.", levels: ["mittel"] },
            { id: "reitstiefel", label: "Reitstiefel", visual: { kind: "track", track: "reitstiefel" }, correct: true },
            { id: "barhuf", label: "Barhuf", visual: { kind: "track", track: "barhuf" }, feedback: "Das ist ein Huf ohne Eisen. Pferde kommen aber nicht in die Sattelkammer.", levels: ["mittel"] },
          ],
          explain: {
            leicht: "Richtig! Das ist ein großer Reitstiefel.",
            mittel: "Richtig! Eine lange, glatte Sohle mit einem extra Absatz: So sieht ein Reitstiefel aus. Der Absatz verhindert, dass der Fuß durch den Steigbügel rutscht.",
          },
        },
        {
          type: "choice",
          id: "m2-groesse",
          levels: ["mittel"],
          prompt: "Was verrät dir die Größe der Stiefelspur?",
          layout: "list",
          options: [
            { id: "erwachsen", label: "Sie ist groß – wahrscheinlich von einem Erwachsenen.", correct: true },
            { id: "kind", label: "Sie ist von einem kleinen Kind.", feedback: "Vergleich mal mit deinem eigenen Fuß – die Spur ist viel größer." },
            { id: "pferd", label: "Sie ist von einem Pferd.", feedback: "Pferde hinterlassen Hufspuren, keine Stiefelspuren." },
          ],
          explain: "Genau! Die Spur ist von großen Reitstiefeln. Und der Handschuh ist ein Erwachsenen-Reithandschuh.",
        },
        {
          type: "hotspots",
          id: "m2-richtung",
          mode: "collect",
          scene: { kind: "scene", scene: "hof" },
          prompt: { leicht: "Wohin führt die Stiefelspur? Tippe auf das Ziel.", mittel: "Folge der Stiefelspur mit dem Finger. Wohin führt sie?" },
          missHint: "Folge den Stiefelabdrücken – nicht den Hufspuren.",
          targets: [
            { id: "tor", label: "Weidetor", x: 710, y: 290, r: 80, clue: "spur-zum-tor", say: "Die Spur führt durch das Weidetor – zur Geisterweide!" },
          ],
          decoys: [
            { id: "stall", label: "Stall", x: 120, y: 270, r: 80, say: "In den Stall führen nur die Hufspuren der Pferde." },
            { id: "mist", label: "Misthaufen", x: 515, y: 312, r: 50, say: "Am Misthaufen endet die Spur nicht." },
          ],
        },
        {
          type: "story",
          id: "m2-ende",
          speaker: "lea",
          text: {
            leicht: "„Zur Geisterweide! Da liegt immer Nebel“, sagt Lea. „Wir gehen außen am Zaun entlang. Krümel bleibt an der Leine.“",
            mittel:
              "Ben schluckt: „Die Geisterweide? Dort soll es spuken!“ Lea lacht: „Sie heißt nur so, weil morgens immer Nebel darüber liegt. Wir gehen außen am Zaun entlang zur Weidehütte – und Krümel bleibt an der Leine, damit er die Pferde nicht stört.“",
          },
        },
      ],
    },

    /* ===================== Mission 3 ===================== */
    {
      id: "nebel",
      title: "Nebel auf der Geisterweide",
      intro: "Mission 3: Nebel auf der Geisterweide",
      steps: [
        {
          type: "story",
          id: "m3-start",
          visual: { kind: "scene", scene: "geisterweide" },
          speaker: "erzaehler",
          text: {
            leicht: "Auf der Weide ist es neblig. Am Zaun flattert etwas Großes, Weißes!",
            mittel: "Auf der Weide hängt dichter Nebel. Tivoli, Scrabble und Tonga grasen in der Nähe der Hütte. Da – am Zaun bewegt sich etwas Großes, Weißes im Wind!",
          },
        },
        {
          type: "hotspots",
          id: "m3-geist",
          mode: "collect",
          scene: { kind: "scene", scene: "geisterweide" },
          prompt: { leicht: "Was ist das Weiße am Zaun? Tippe darauf.", mittel: "Mutig sein! Tippe auf das weiße Ding am Zaun und finde heraus, was es ist." },
          missHint: "Das Weiße hängt links am Zaun.",
          targets: [
            {
              id: "geist",
              label: "Pferdedecke",
              x: 124,
              y: 345,
              r: 62,
              clue: "decke",
              say: "Das ist kein Geist! Es ist eine Pferdedecke. Sie hängt zum Trocknen am Zaun und flattert im Wind.",
            },
          ],
        },
        {
          type: "choice",
          id: "m3-tonga",
          prompt: { leicht: "Tonga hebt den Kopf. Wie fühlt sich Tonga?", mittel: "Tonga hebt den Kopf und schaut. Was zeigen Ohren und Augen?" },
          visual: { kind: "head", horse: "tonga", mood: "neugierig" },
          layout: "pictures",
          options: [
            { id: "neugierig", label: "neugierig", visual: { kind: "mood", mood: "neugierig" }, correct: true },
            { id: "grummelig", label: "grummelig", visual: { kind: "mood", mood: "grummelig" }, feedback: "Grummelige Pferde legen die Ohren flach nach hinten. Schau noch mal hin." },
            { id: "entspannt", label: "müde", visual: { kind: "mood", mood: "entspannt" }, feedback: "Müde Pferde lassen die Ohren hängen und machen die Augen halb zu." },
            { id: "aufgeregt", label: "ängstlich", visual: { kind: "mood", mood: "aufgeregt" }, feedback: "Ängstliche Pferde reißen die Augen weit auf. Tonga ist ganz ruhig.", levels: ["mittel"] },
          ],
          explain: {
            leicht: "Richtig! Die Ohren zeigen nach vorne. Tonga ist neugierig und ganz ruhig.",
            mittel: "Richtig! Ohren nach vorne, ruhiger Blick: Tonga ist neugierig, aber ganz entspannt. Das macht allen Mut – wenn es gefährlich wäre, würden die Pferde unruhig werden.",
          },
        },
        {
          type: "hotspots",
          id: "m3-ohren",
          mode: "collect",
          scene: { kind: "scene", scene: "geisterweide" },
          prompt: {
            leicht: "Alle Pferde schauen in die gleiche Richtung. Tippe dorthin, wo ihre Ohren hinzeigen!",
            mittel: "Pferde drehen die Ohren zu dem, was sie interessiert. Wohin zeigen alle Ohren?",
          },
          missHint: "Schau auf die Ohren und Nasen der Pferde. Wohin zeigen sie?",
          targets: [
            { id: "huette", label: "Weidehütte", x: 690, y: 250, r: 82, clue: "pferde-schauen", say: "Zur Weidehütte! Dort muss etwas sein." },
          ],
          decoys: [
            { id: "baum", label: "Baum", x: 300, y: 180, r: 55, say: "Zum Baum zeigen die Ohren nicht." },
            { id: "heu", label: "Heuballen", x: 78, y: 500, r: 50, say: "Das Heu interessiert die Pferde gerade nicht. Schau auf die Ohren." },
            { id: "kuerbis", label: "Kürbis", x: 730, y: 520, r: 40, say: "Fast! Schau ein Stück weiter nach oben." },
          ],
        },
        {
          type: "choice",
          id: "m3-wissen",
          levels: ["mittel"],
          prompt: "Warum hilft es Detektiven, auf Pferdeohren zu achten?",
          layout: "list",
          options: [
            { id: "richtung", label: "Pferde drehen ihre Ohren dorthin, wo sie etwas hören oder sehen.", correct: true },
            { id: "norden", label: "Pferdeohren zeigen immer nach Norden.", feedback: "Pferdeohren sind kein Kompass. Sie folgen Geräuschen." },
            { id: "futter", label: "Die Ohren zeigen, welches Futter sie wollen.", feedback: "Nicht ganz – die Ohren zeigen, worauf das Pferd achtet." },
          ],
          explain: "Genau! Pferde hören sehr gut und drehen jedes Ohr einzeln. So verraten sie, wo etwas los ist.",
        },
        {
          type: "story",
          id: "m3-ende",
          speaker: "ben",
          text: {
            leicht: "„Zur Hütte!“, flüstert Ben. Die Kinder gehen leise außen am Zaun entlang.",
            mittel: "„Die Pferde haben uns den Weg gezeigt“, flüstert Ben. Leise gehen die Kinder außen am Zaun entlang zur alten Weidehütte.",
          },
        },
      ],
    },

    /* ===================== Mission 4 ===================== */
    {
      id: "schloss",
      title: "Das Zahlenschloss",
      intro: "Mission 4: Das Zahlenschloss",
      steps: [
        {
          type: "story",
          id: "m4-start",
          visual: { kind: "scene", scene: "huette" },
          speaker: "erzaehler",
          text: {
            leicht: "Die Stiefelspur führt bis zur Hüttentür. Aber die Tür hat ein Zahlenschloss!",
            mittel: "Die Stiefelspur endet direkt an der Hüttentür. Die Tür ist mit einem Zahlenschloss gesichert, damit niemand an das Futter kommt. Und an der Hütte hängen seltsame Zettel …",
          },
        },
        {
          type: "hotspots",
          id: "m4-zettel",
          mode: "collect",
          scene: { kind: "scene", scene: "huette" },
          prompt: { leicht: "Sammle alle drei Rätselzettel!", mittel: "Hinweise sammeln: Finde alle drei Rätselzettel rund um die Hütte." },
          missHint: "Die Zettel sind weiß und haben ein Fragezeichen.",
          targets: [
            { id: "z1", label: "Zettel an der Tür", x: 395, y: 231, r: 50, say: "Ein Zettel mit einem Rätsel!" },
            { id: "z2", label: "Zettel an der Wand", x: 595, y: 285, r: 50, say: "Noch ein Rätsel!" },
            { id: "z3", label: "Zettel am Pfahl", x: 75, y: 335, r: 50, say: "Das dritte Rätsel!" },
          ],
          decoys: [
            { id: "schloss", label: "Zahlenschloss", x: 460, y: 342, r: 40, say: "Für das Schloss brauchst du den Code. Sammle zuerst alle Zettel!" },
          ],
        },
        {
          type: "story",
          id: "m4-raetsel",
          speaker: "mila",
          visual: { kind: "item", name: "zettel" },
          text: {
            leicht: "„Jeder Zettel verrät eine Zahl“, sagt Mila. „Dann haben wir den Code!“",
            mittel: "Mila liest vor: „Wer Tivolis Halfter finden will, muss drei Rätsel lösen. Jedes verrät eine Zahl des Codes.“ – „Jemand hat das extra für uns vorbereitet!“, staunt Lea.",
          },
        },
        {
          type: "code",
          id: "m4-code",
          prompt: { leicht: "Löse die drei Rätsel und stell die Zahlen am Schloss ein.", mittel: "Löse die Rätsel, stelle den Code ein und öffne das Schloss." },
          digits: [
            {
              riddle: { leicht: "Wie viele Kürbisse stehen vor der Hütte?", mittel: "Wie viele Beine hat ein Pferd?" },
              visual: { leicht: { kind: "count", name: "kuerbis", n: 4 }, mittel: { kind: "item", name: "pferd" } },
              answer: { leicht: 4, mittel: 4 },
              hint: { leicht: "Zähl die Kürbisse langsam mit dem Finger.", mittel: "Vorne zwei Beine, hinten zwei Beine." },
            },
            {
              riddle: { leicht: "Wie viele Hufeisen hängen an der Hüttenwand?", mittel: "Wie viele Pferde stehen auf der Geisterweide?" },
              visual: { leicht: { kind: "count", name: "hufeisen", n: 2 }, mittel: { kind: "item", name: "gras" } },
              answer: { leicht: 2, mittel: 3 },
              hint: { leicht: "Schau oben an die Wand: links und rechts.", mittel: "Tivoli, Scrabble und …?" },
            },
            {
              riddle: { leicht: "Wie viele Äpfel liegen im Korb?", mittel: "Wie viele Hufe haben zwei Pferde zusammen?" },
              visual: { leicht: { kind: "count", name: "apfel", n: 5 }, mittel: { kind: "count", name: "pferd", n: 2 } },
              answer: { leicht: 5, mittel: 8 },
              hint: { leicht: "Zähl alle Äpfel – auch die hinten.", mittel: "Ein Pferd hat vier Hufe. Zwei Pferde haben …" },
            },
          ],
          success: { leicht: "Klick! Das Schloss ist offen!", mittel: "Klick! Das Zahlenschloss springt auf. Die Tür knarrt leise …" },
        },
      ],
    },

    /* ===================== Mission 5 ===================== */
    {
      id: "loesung",
      title: "Das Geheimnis wird gelüftet",
      intro: "Mission 5: Das Geheimnis wird gelüftet",
      steps: [
        {
          type: "story",
          id: "m5-start",
          speaker: "lea",
          visual: { kind: "notebook" },
          text: {
            leicht: "„Bevor wir hineinschauen: Wer hat das Halfter genommen?“, fragt Lea. Schau ins Detektivbuch!",
            mittel: "„Moment!“, sagt Lea. „Echte Detektive lösen den Fall, bevor sie die Tür aufmachen.“ Lest alle Hinweise im Detektivbuch noch einmal genau.",
          },
        },
        {
          type: "choice",
          id: "m5-wer",
          prompt: { leicht: "Wer hat Tivolis Halfter genommen?", mittel: "Wer hat Tivolis Halfter genommen? Denk an alle Hinweise." },
          visual: { kind: "notebook" },
          layout: "pictures",
          options: [
            { id: "scrabble", label: "Scrabble", visual: { kind: "horse", horse: "scrabble" }, feedback: "Pferde kommen nicht in die Sattelkammer – und sie tragen keine Stiefel." },
            { id: "kruemel", label: "Krümel", visual: { kind: "puppy" }, feedback: "Krümel hat den Handschuh ja gefunden. Und Hunde tragen keine Stiefel." },
            { id: "ben", label: "Ben", visual: { kind: "kid", kid: "ben" }, feedback: "Ben trägt kleine Gummistiefel. Die Spur war von großen Reitstiefeln.", levels: ["mittel"] },
            { id: "reitlehrerin", label: "Die Reitlehrerin", visual: { kind: "item", name: "reiten" }, correct: true },
          ],
          explain: {
            leicht: "Richtig! Große Reitstiefel und ein Reithandschuh: Das war die Reitlehrerin!",
            mittel: "Richtig kombiniert! Große Reitstiefel, ein Erwachsenen-Reithandschuh, Garn und die fehlende Schere – das war die Reitlehrerin. Aber warum?",
          },
        },
        {
          type: "choice",
          id: "m5-warum",
          levels: ["mittel"],
          prompt: "Garn, Schere und ein glitzernder Schnipsel: Was hat die Reitlehrerin wohl gemacht?",
          layout: "list",
          options: [
            { id: "naehen", label: "Etwas an das Halfter genäht.", correct: true },
            { id: "verstecken", label: "Das Halfter für immer versteckt.", feedback: "Warum sollte sie das tun? Denk an Garn und Schere." },
            { id: "kaputt", label: "Das Halfter kaputt gemacht.", feedback: "Mit Garn repariert oder näht man eher etwas an." },
          ],
          explain: "Genau das wollen wir jetzt herausfinden. Öffnet die Tür!",
        },
        {
          type: "story",
          id: "m5-aufloesung",
          speaker: "erzaehler",
          visual: { kind: "scene", scene: "huette-innen" },
          text: {
            leicht: "In der Hütte liegt Tivolis Halfter – mit neuen Leuchtstreifen! Daneben eine Karte: „Damit Tivoli heute Abend im Dunkeln gut zu sehen ist. Fröhliches Halloween! Eure Reitlehrerin“",
            mittel: "Auf der Werkbank liegt Tivolis Halfter. Jemand hat glänzende Leuchtstreifen daraufgenäht! Daneben eine Karte: „Damit Tivoli beim Laternen-Spaziergang im Dunkeln gut zu sehen ist. Und weil ihr so gern Rätsel löst, habe ich euch eine Spur gelegt. Fröhliches Halloween! Eure Reitlehrerin“",
          },
        },
        {
          type: "choice",
          id: "m5-reflektoren",
          prompt: { leicht: "Wofür sind die Leuchtstreifen?", mittel: "Warum sind Leuchtstreifen am Halfter eine gute Idee?" },
          visual: { kind: "item", name: "reflektor" },
          layout: "list",
          options: [
            { id: "sehen", label: "Damit man Tivoli im Dunkeln gut sieht.", correct: true },
            { id: "schmuck", label: "Nur damit es schön glitzert.", feedback: "Schön ist es auch – aber es gibt einen wichtigeren Grund. Denk an die Dunkelheit." },
            { id: "warm", label: "Damit Tivoli nicht friert.", feedback: "Gegen Kälte hilft Tivolis Winterfell. Die Streifen haben einen anderen Zweck." },
          ],
          explain: {
            leicht: "Richtig! Im Dunkeln leuchten die Streifen, wenn Licht darauf fällt. So sehen alle Tivoli.",
            mittel: "Richtig! Reflektoren werfen Licht zurück. So sehen alle Menschen – und auch Autofahrer – Pferd und Begleiter im Dunkeln schon von weitem.",
          },
        },
        {
          type: "choice",
          id: "m5-fuehren",
          levels: ["mittel"],
          prompt: "Beim Laternen-Spaziergang ist es dunkel und es gibt viel Licht und Geräusche. Wer führt Tivoli?",
          layout: "list",
          options: [
            { id: "erwachsen", label: "Ein erfahrener Erwachsener. Die Kinder gehen mit etwas Abstand daneben.", correct: true },
            { id: "kinder", label: "Die Kinder führen ihn ganz allein.", feedback: "Im Dunkeln mit Laternen kann sich auch ein ruhiges Pferd erschrecken. Da braucht es viel Erfahrung." },
            { id: "kruemel", label: "Krümel läuft an Tivolis Beinen mit.", feedback: "Hunde zwischen Pferdebeinen sind gefährlich. Krümel bleibt an der Leine, mit Abstand." },
          ],
          explain: "Genau! So sind alle sicher – Kinder, Pferd und Hund.",
        },
        {
          type: "story",
          id: "m5-finale",
          speaker: "erzaehler",
          visual: { kind: "horse", horse: "tivoli" },
          text: {
            leicht: "Am Abend leuchten die Laternen. Tivoli trägt sein Halfter mit den Leuchtstreifen und schnuppert an allen Kindern. Krümel bekommt ein Leckerli. Fall gelöst!",
            mittel: "Am Abend leuchten überall Laternen. Die Reitlehrerin führt Tivoli mit seinem glänzenden Halfter, und er schnuppert neugierig an jedem Kind. Krümel bekommt für seinen Fund ein Leckerli. Der Fall der Geisterweide ist gelöst!",
          },
        },
      ],
    },
  ],
};
