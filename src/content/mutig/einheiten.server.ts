import "server-only";
import type { UnitContent, WegLesson } from "./types";

/**
 * Inhalte der 30 Einheiten – nur auf dem Server, ausgeliefert erst nach Kauf und ab Erscheinungstermin.
 * Erzeugt aus den Sprechertexten (mutig-reiten-wWW-tTT.txt) und der Inhaltsarchitektur (Phase 4).
 * Status aller Texte: Entwurf, fachlich noch ungeprüft (Prüfung SP/RL/HB laut Inhaltsarchitektur).
 */
export const UNITS: UnitContent[] = [
 {
  "n": 1,
  "ziel": "Ablauf verstehen, Ziel festhalten",
  "text": [
   "Schön, dass du da bist.",
   "Vielleicht hast du lange überlegt, ob du dieses Programm anfangen sollst. Vielleicht kennst du das Gefühl: Du freust dich auf den Stall, und trotzdem zieht sich irgendwo im Bauch etwas zusammen, sobald du ans Aufsteigen denkst. Oder an den Galopp. Oder an genau die Stelle, an der es damals passiert ist.",
   "Ich möchte dir als Erstes etwas sagen: Angst beim Reiten ist kein Zeichen von Schwäche. Sie ist eine Schutzreaktion. Dein Körper hat gelernt, dass etwas gefährlich sein könnte, und er will dich davor bewahren. Das ist erst einmal klug. Ein Pferd ist viel größer und stärker als du, es ist ein Fluchttier, und Respekt davor ist vernünftig.",
   "Schwierig wird es, wenn die Angst lauter ist, als die Situation es verlangt. Wenn sie dir Dinge wegnimmt, die du eigentlich gern machen würdest.",
   "Genau dafür ist Mutig reiten da. Nicht, um deine Angst wegzuzaubern. Sondern damit du wieder selbst entscheidest, was du dir zutraust.",
   "Wie das funktioniert? Mit kleinen Schritten. Mut entsteht selten durch einen großen Sprung. Er entsteht, wenn du etwas tust, das dir ein bisschen Angst macht, und dann erlebst: Es geht. Und dann noch einmal. Jedes Mal, wenn du so eine Erfahrung machst, lernt dein Kopf etwas Neues. Nicht durch gute Ratschläge, sondern durch das, was du selbst erlebst.",
   "Deshalb arbeitest du in den nächsten Wochen mit drei Dingen. Mit Werkzeugen für Körper und Kopf, die am Stall funktionieren. Mit deiner Mut-Leiter: zehn Stufen, von ganz leicht bis zu deinem eigenen Ziel. Und mit dem Mut-Barometer, auf dem du ehrlich einträgst, wie groß deine Angst gerade ist.",
   "Ehrlich ist dabei wichtiger als schön. Es gibt hier keine falschen Antworten und keinen Zeitdruck. Die sechs Wochen sind ein Rahmen, kein Fahrplan. Wenn du länger brauchst, brauchst du länger.",
   "Eins ist mir noch wichtig. Dieses Programm ersetzt keine ärztliche oder psychotherapeutische Hilfe. Wenn dich ein Erlebnis auch außerhalb des Stalls nicht loslässt, wenn du schlecht schläfst oder Bilder immer wiederkommen, dann hol dir bitte zusätzlich Unterstützung. Wo du sie findest, steht in der App unter Hilfe.",
   "Und jetzt zu deiner ersten Aufgabe. Du legst gleich deine Mut-Leiter an. Ganz oben steht dein Ziel, in deinen eigenen Worten. Was möchtest du wieder können? Es muss nicht groß sein. Es muss nur deins sein.",
   "Darunter stehen kleine Schritte dorthin. Du startest bei der Stufe, die heute schon mit wenig Angst klappt. Vielleicht ist das einfach nur, zehn Minuten bei deinem Pferd zu stehen. Auch das ist ein Anfang.",
   "Nimm dir Zeit dafür. Morgen geht es weiter."
  ],
  "audio": "mutig-reiten-w01-t01.mp3",
  "uebung": {
   "titel": "Mut-Leiter anlegen",
   "dauer": "10 Min.",
   "schritte": [
    "Öffne deine Mut-Leiter.",
    "Schreib ganz oben dein Ziel hin, in deinen eigenen Worten.",
    "Lies die vorgeschlagenen Stufen und benenne um, was nicht zu dir passt.",
    "Merk dir die Stufe, die heute schon mit wenig Angst klappt. Dort startest du."
   ]
  },
  "stall": {
   "text": "Sei 10 Minuten bei deinem Pferd, ohne Aufgabe. Nur schauen, riechen, da sein.",
   "sattel": false,
   "begleitung": false,
   "hinweis": null
  },
  "werkzeug": null,
  "eingabe": null,
  "weg": null,
  "link": {
   "label": "Zur Mut-Leiter",
   "href": "/mutig-reiten/leiter"
  },
  "vergleich": false
 },
 {
  "n": 2,
  "ziel": "Körperreaktionen einordnen",
  "text": [
   "Heute geht es um etwas, das du wahrscheinlich gut kennst, auch wenn du es noch nie so genannt hast: dein inneres Alarmsystem.",
   "Stell dir vor, du stehst neben deinem Pferd, und plötzlich raschelt es laut in der Hecke. Bevor du überhaupt denken kannst, passiert schon etwas in dir. Das Herz schlägt schneller. Der Atem wird flach. Die Muskeln spannen sich an, die Hände werden fest, die Schultern ziehen nach oben. Und dein Blick wird eng, als würdest du durch einen Tunnel schauen.",
   "Das ist kein Zufall. Das ist ein sehr altes Programm, das deinen Körper in Sekunden bereit macht, zu kämpfen oder wegzulaufen. Für unsere Vorfahren war das lebenswichtig. Und auch heute schützt es dich in vielen Situationen.",
   "Auf dem Pferd hat dieses Programm aber einen Haken. Reiten braucht einen beweglichen Körper. Ein Becken, das mitschwingt. Hände, die nachgeben können. Einen Blick, der nach vorn geht. Genau das nimmt dir der Alarm. Du wirst fester, und dein Pferd bemerkt diese Spannung. Ein steifer Sitz und harte Hände können es unruhiger machen. Und dann fühlt sich die Angst bestätigt.",
   "Wichtig ist: Dein Alarmsystem ist nicht kaputt. Es ist nur manchmal zu schnell und zu laut eingestellt. Vor allem nach einem Sturz oder nach einer langen Pause springt es oft schon bei Kleinigkeiten an.",
   "Und du kannst es beeinflussen. Der einfachste Weg dorthin ist dein Atem.",
   "Wenn du Angst hast, atmest du schnell und eher hoch in die Brust. Wenn du ruhig bist, atmest du langsam, und das Ausatmen wird länger. Das funktioniert auch in die andere Richtung. Wenn du bewusst langsam atmest und lange ausatmest, bekommt dein Körper das Signal: Gerade ist es sicher genug. Untersuchungen zeigen, dass langsames Atmen mit mehr Ruhe und weniger Anspannung einhergeht.",
   "Deshalb lernst du heute dein erstes Werkzeug: den Atem-Reset. Er dauert ungefähr eine Minute.",
   "Setz dich bequem hin. Atme durch die Nase ein und zähl dabei langsam bis vier. Dann atme aus, als würdest du durch einen Strohhalm pusten, und zähl bis sechs. Wenn es sich gut anfühlt, auch bis acht. Das Ausatmen ist der wichtige Teil.",
   "Mach das fünfmal hintereinander. Es muss nicht perfekt sein. Wenn du dich verzählst, fang beim nächsten Atemzug einfach wieder an.",
   "Vielleicht merkst du heute schon einen kleinen Unterschied. Vielleicht auch nicht. Beides ist normal. Der Atem-Reset wird stärker, je öfter du ihn übst, am besten zuerst in ruhigen Momenten. Denn was du in Ruhe geübt hast, kannst du in aufregenden Momenten leichter abrufen.",
   "Probier ihn gleich aus. Die Anleitung findest du direkt unter diesem Impuls."
  ],
  "audio": "mutig-reiten-w01-t02.mp3",
  "uebung": {
   "titel": "Atem-Reset lernen",
   "dauer": "5 Min.",
   "schritte": [
    "Setz oder stell dich bequem hin.",
    "Atme etwa 4 Sekunden durch die Nase ein.",
    "Atme 6 bis 8 Sekunden aus, als würdest du durch einen Strohhalm pusten.",
    "Wiederhole das fünfmal und spür nach, was sich verändert."
   ]
  },
  "stall": null,
  "werkzeug": "atem",
  "eingabe": null,
  "weg": "L1",
  "link": null,
  "vergleich": false
 },
 {
  "n": 3,
  "ziel": "Wechselwirkung mit dem Pferd verstehen",
  "text": [
   "Vielleicht hast du den Satz auch schon gehört: Dein Pferd spürt deine Angst. Meistens klingt er wie ein Vorwurf. Als wärst du schuld, wenn dein Pferd unruhig wird. Heute schauen wir uns an, was an diesem Satz dran ist und was nicht.",
   "In Schweden gab es dazu einen einfachen Versuch. Menschen führten oder ritten ein Pferd viermal dieselbe kurze Strecke durch eine Halle. Vor dem vierten Mal sagte man ihnen: Gleich wird neben euch ein Regenschirm aufgespannt. Das passierte dann gar nicht. Der vierte Durchgang war genau wie die ersten drei. Trotzdem stieg die Herzfrequenz der Menschen. Und auch die der Pferde.",
   "Das Pferd hat also nicht die Gedanken gelesen. Es gab keinen Regenschirm. Aber der Mensch hat sich auf etwas Schlimmes eingestellt, und das hat man ihm angemerkt. Vielleicht wurden die Hände fester, der Atem kürzer, die Schritte zögerlicher. Pferde sind Herdentiere. Sie achten sehr genau darauf, ob jemand neben ihnen angespannt ist, denn für ein Fluchttier kann das ein Hinweis auf Gefahr sein.",
   "Das ist kein Grund für ein schlechtes Gewissen. Es ist eher eine gute Nachricht. Denn wenn dein Pferd auf deine Spannung und dein Verhalten reagiert, dann reagiert es auch, wenn du lockerer wirst. Du musst dafür nicht angstfrei sein. Es reicht, wenn dein Körper ein bisschen weniger Alarm schlägt.",
   "Und genau daran arbeitest du heute. Mit dem Lockerungs-Check. Er hat drei Punkte, die du nacheinander durchgehst.",
   "Erstens der Kiefer. Wenn wir angespannt sind, beißen viele von uns die Zähne zusammen, ohne es zu merken. Lass die Zähne ein kleines Stück auseinander, die Zunge liegt locker im Mund.",
   "Zweitens die Schultern. Zieh sie einmal bewusst hoch zu den Ohren. Halte sie kurz. Und dann lass sie fallen.",
   "Drittens die Hände. Öffne die Finger ganz weit und schließ sie wieder locker, als würdest du einen kleinen Vogel halten.",
   "Das Ganze dauert keine halbe Minute. Mach es heute ein paarmal im Sitzen, am Schreibtisch, im Auto an der Ampel, auf dem Sofa. Je öfter du es im Alltag übst, desto schneller findest du die drei Punkte später auch im Sattel.",
   "Wenn du heute am Stall bist, probier noch etwas Kleines aus. Während du putzt, achte einfach auf deinen Atem. Du musst nichts verändern. Nur bemerken. Und vielleicht siehst du dabei auch, wie dein Pferd atmet."
  ],
  "audio": "mutig-reiten-w01-t03.mp3",
  "uebung": {
   "titel": "Lockerungs-Check im Sitzen",
   "dauer": "5 Min.",
   "schritte": [
    "Kiefer: Zähne auseinander, Zunge locker.",
    "Schultern: einmal hochziehen, dann fallen lassen.",
    "Hände: Finger kurz öffnen und wieder schließen.",
    "Zum Schluss ins Gesäß „schmelzen“: Gewicht nach unten sinken lassen."
   ]
  },
  "stall": {
   "text": "Beobachte beim Putzen deinen Atem. Wird er flach, atme einmal lang aus.",
   "sattel": false,
   "begleitung": false,
   "hinweis": "Pferd angebunden."
  },
  "werkzeug": "locker",
  "eingabe": null,
  "weg": null,
  "link": null,
  "vergleich": false
 },
 {
  "n": 4,
  "ziel": "Ängstliche Gedanken erkennen",
  "text": [
   "Kennst du das? Du sitzt noch zu Hause, und im Kopf läuft schon der Film. Das Pferd erschrickt an der Ecke. Es buckelt. Du rutschst zur Seite. Und das alles, bevor du überhaupt die Jacke angezogen hast.",
   "Dieser Film fühlt sich an wie eine Vorhersage, die sicher eintritt. Er ist aber genau das: eine Vorhersage. Dein Kopf versucht, dich vorzubereiten, indem er dir die schlimmste Variante zeigt. Das ist gut gemeint. Nur hilft es dir selten. Denn je öfter der Film läuft, desto echter fühlt er sich an. Und desto größer wird die Angst, obwohl noch gar nichts passiert ist.",
   "Heute lernst du, deine Gedanken nicht wegzudrücken, sondern sie anzuschauen. Das ist ein Unterschied. Wegdrücken klappt meistens nicht. Versuch mal, nicht an ein galoppierendes Pferd zu denken. Eben.",
   "Anschauen dagegen heißt: Du nimmst den Gedanken ernst und prüfst ihn. Wie eine Reitlehrerin, die nicht sagt, stell dich nicht so an, sondern fragt: Was genau macht dir Sorgen?",
   "Dafür gibt es den Gedanken-Check. Er hat drei Fragen.",
   "Die erste Frage: Was denke ich gerade? Schreib den Gedanken so auf, wie er in deinem Kopf klingt. Zum Beispiel: Er geht bestimmt wieder durch.",
   "Die zweite Frage: Wie wahrscheinlich ist das wirklich? Nicht, wie es sich anfühlt, sondern was du weißt. Wie oft ist dein Pferd in den letzten Wochen durchgegangen? Was war damals anders als heute?",
   "Die dritte Frage: Was kann ich tun, wenn es doch passiert? Diese Frage ist die wichtigste. Denn oft macht nicht nur die Situation Angst, sondern das Gefühl, ihr ausgeliefert zu sein. Sobald du eine Antwort hast, und sei sie noch so klein, bist du nicht mehr ausgeliefert.",
   "Manchmal kommst du bei der zweiten Frage zu dem Ergebnis: Das ist tatsächlich wahrscheinlich. Dann ist das eine wichtige Information. Vielleicht passt dann die Situation gerade nicht, oder das Pferd, oder die Stufe ist zu groß. Der Gedanken-Check soll dir nichts schönreden. Er soll dir helfen, klar zu sehen.",
   "Deine Übung heute: Schreib drei Gedanken auf, die dir vor dem Reiten oder am Stall typischerweise durch den Kopf gehen. Und geh für jeden die drei Fragen durch. Du brauchst dafür keine perfekten Antworten. Ein Satz pro Frage reicht.",
   "Vielleicht merkst du dabei, dass ein Gedanke kleiner wird, sobald er auf Papier steht. Vielleicht auch nicht. Beides ist in Ordnung. Du übst gerade, deinen Kopf zu befragen, statt ihm einfach zu glauben."
  ],
  "audio": "mutig-reiten-w01-t04.mp3",
  "uebung": {
   "titel": "Gedanken-Check",
   "dauer": "8 Min.",
   "schritte": [
    "Schreib drei Gedanken auf, die vor dem Reiten oder am Stall kommen.",
    "Frag bei jedem: Wie wahrscheinlich ist das wirklich?",
    "Frag dann: Was kann ich tun, wenn es doch passiert?",
    "Schreib zu jedem Gedanken eine Antwort, die du glauben kannst."
   ]
  },
  "stall": null,
  "werkzeug": "gedanken",
  "eingabe": {
   "key": "gedanken",
   "label": "Deine drei Gedanken und deine Antworten",
   "placeholder": "1. „Er geht gleich durch.“ – Er ist bisher nie durchgegangen. Wenn er losläuft, …",
   "multiline": true
  },
  "weg": null,
  "link": null,
  "vergleich": false
 },
 {
  "n": 5,
  "ziel": "Barometer und Erwartung nutzen",
  "text": [
   "Heute geht es um die Frage, wie Lernen gegen Angst eigentlich funktioniert. Und um ein Werkzeug, das dich durch das ganze Programm begleitet: dein Mut-Barometer.",
   "Stell dir eine Skala von null bis zehn vor. Null heißt: keine Angst. Zehn heißt: so viel Angst, wie du dir überhaupt vorstellen kannst. Irgendwo dazwischen liegt dein Wert, wenn du an deine aktuelle Stufe denkst.",
   "Jetzt kommt das Wichtige. Wenn du nur Dinge tust, bei denen du bei null oder eins bist, lernst du kaum etwas Neues. Dein Kopf weiß ja schon, dass das sicher ist. Wenn du dagegen etwas tust, bei dem du bei neun bist, ist der Alarm so laut, dass du vor allem eins lernst: Das war schrecklich.",
   "Dazwischen gibt es einen Bereich, in dem Lernen gut gelingt. Die Angst ist spürbar, aber machbar. Ungefähr bei vier oder fünf. Wir nennen das die Lernzone.",
   "Was passiert in der Lernzone? Man könnte meinen, die Angst muss während der Übung immer kleiner werden, damit es wirkt. Die Forschung zur Angst sagt aber etwas Spannenderes. Entscheidend ist vor allem, dass du erlebst: Es ist anders gekommen, als ich befürchtet habe. Dein Kopf hat eine Vorhersage gemacht, und die Wirklichkeit hat ihm etwas anderes gezeigt.",
   "Deshalb gibt es in diesem Programm bei jedem Durchgang auf deiner Mut-Leiter zwei kleine Fragen. Vorher: Was befürchtest du? Und nachher: Was ist passiert? Je öfter diese beiden Antworten auseinanderliegen, desto mehr lernt dein Kopf.",
   "Ein Beispiel. Du befürchtest: Wenn ich das Pferd rückwärts richte, wird es mich umrennen. Dann machst du es, ruhig und mit Abstand. Und was passiert? Es macht zwei Schritte zurück und bleibt stehen. Das ist eine neue Erfahrung. Und sie zählt mehr als jeder gute Rat.",
   "Ganz wichtig: Ein Wert auf dem Barometer ist nie gut oder schlecht. Er ist eine Information. Wenn dein Wert heute höher ist als gestern, dann ist das so. Vielleicht warst du müde, vielleicht war mehr los am Stall. Ehrlich ist hier wichtiger als schön.",
   "Deine Übung heute hat zwei Teile. Trag deine Startwerte ein: Wie groß ist die Angst, wenn du an deine aktuelle Stufe denkst? Und schreib für diese Stufe einen Satz auf, der so beginnt: Ich befürchte, dass …",
   "Wenn du heute am Stall bist, mach deine aktuelle Stufe einmal. Und trag danach ein, was passiert ist."
  ],
  "audio": "mutig-reiten-w01-t05.mp3",
  "uebung": {
   "titel": "Startwerte und Befürchtung",
   "dauer": "8 Min.",
   "schritte": [
    "Öffne deine Mut-Leiter bei der aktuellen Stufe.",
    "Schreib einen Satz: „Ich befürchte, dass …“",
    "Schätz deine Angst von 0 bis 10.",
    "Nach dem Stall trägst du ein, was wirklich passiert ist."
   ]
  },
  "stall": {
   "text": "Mach deine aktuelle Stufe einmal. Danach: Was ist wirklich passiert?",
   "sattel": false,
   "begleitung": false,
   "hinweis": null
  },
  "werkzeug": null,
  "eingabe": null,
  "weg": null,
  "link": {
   "label": "Zur Mut-Leiter",
   "href": "/mutig-reiten/leiter"
  },
  "vergleich": false
 },
 {
  "n": 6,
  "ziel": "Den Atem-Reset automatisieren",
  "text": [
   "Willkommen in Woche zwei. In dieser Woche geht es um deine Werkzeuge. Und wir fangen mit dem an, das du schon kennst: deinem Atem.",
   "Vielleicht hast du den Atem-Reset in den letzten Tagen schon ein paarmal ausprobiert. Vielleicht hast du ihn auch vergessen. Das passiert fast allen. Denn ein Werkzeug, das man nur in schwierigen Momenten benutzen will, wird genau dann gern vergessen. Wenn das Herz klopft, denkt kaum jemand: Ach ja, ich wollte ja langsam ausatmen.",
   "Deshalb geht es heute darum, den Atem-Reset so oft zu üben, dass er fast von allein kommt. Wie beim Leichttraben. Am Anfang musst du bei jedem Schritt nachdenken. Irgendwann macht es dein Körper einfach.",
   "Zur Erinnerung, wie der Atem-Reset geht. Du atmest durch die Nase ein und zählst langsam bis vier. Dann atmest du aus, als würdest du durch einen Strohhalm pusten, und zählst bis sechs oder acht. Fünf Atemzüge, ungefähr eine Minute.",
   "Warum gerade das Ausatmen? Wenn du langsam und lange ausatmest, sinkt die Zahl deiner Atemzüge pro Minute. Studien zu langsamer Atmung zeigen, dass das mit mehr Ruhe und weniger Anspannung einhergeht. Wie schnell und wie stark das wirkt, ist von Mensch zu Mensch unterschiedlich. Deshalb lohnt es sich, selbst herauszufinden, was dir guttut.",
   "Deine Übung heute: Mach den Atem-Reset dreimal am Tag, und zwar an festen Stellen in deinem Alltag. Such dir drei Momente, die sowieso jeden Tag vorkommen. Zum Beispiel morgens, wenn der Kaffee durchläuft. Mittags vor dem Essen. Und abends, bevor du das Licht ausmachst. So hängt die Übung an etwas, das du ohnehin tust, und du musst nicht daran denken.",
   "Wenn du magst, probier dabei aus, ob dir sechs oder acht Sekunden Ausatmen besser liegen. Es gibt hier keine richtige Zahl. Es gibt nur die, bei der du merkst: Da wird etwas ruhiger.",
   "Und noch ein Tipp. Du kannst den Atem-Reset auch in kleinen Stressmomenten im Alltag einsetzen. Im Stau, vor einem schwierigen Gespräch, beim Warten in der Schlange. Jedes Mal, wenn du ihn in so einem Moment benutzt, übst du für den Stall. Dein Körper lernt: Ich kann etwas tun, wenn es eng wird.",
   "Morgen geht es um deinen Blick. Bis dahin: drei Mal am Tag, fünf Atemzüge. Mehr braucht es heute nicht."
  ],
  "audio": "mutig-reiten-w02-t06.mp3",
  "uebung": {
   "titel": "Dreimal am Tag",
   "dauer": "3 × 1 Min.",
   "schritte": [
    "Morgens nach dem Aufstehen: fünf Atemzüge, lang aus.",
    "Einmal mitten am Tag, zum Beispiel im Auto oder an der Kasse.",
    "Abends vor dem Einschlafen.",
    "Je öfter du ihn ohne Pferd übst, desto leichter fällt er am Stall."
   ]
  },
  "stall": null,
  "werkzeug": "atem",
  "eingabe": null,
  "weg": null,
  "link": null,
  "vergleich": false
 },
 {
  "n": 7,
  "ziel": "Aufmerksamkeit nach außen lenken",
  "text": [
   "Wo schaust du hin, wenn du Angst hast?",
   "Die meisten von uns schauen nach unten. Auf den Hals des Pferdes. Auf die Ohren. Auf die eigenen Hände. Manchmal auf genau die Stelle, vor der wir Angst haben. Das ist verständlich. Wenn etwas bedrohlich wirkt, will man es im Blick behalten.",
   "Beim Reiten hat das aber einen Haken. Wo dein Blick hingeht, folgt oft dein Körper. Schaust du nach unten, kippt der Kopf nach vorn, die Schultern rollen ein, der Oberkörper wird rund. Du sitzt weniger stabil. Und dein Pferd bekommt von dir weniger klare Signale, wohin es eigentlich gehen soll.",
   "Dazu kommt der Tunnelblick, den du schon kennst. Wenn der Alarm anspringt, wird das Blickfeld eng. Du siehst nur noch das, was dir Sorgen macht, und kaum noch den Rest.",
   "In der Sportwissenschaft gibt es dazu viele Untersuchungen. Sie zeigen ziemlich übereinstimmend: Wer seine Aufmerksamkeit auf ein Ziel außerhalb des eigenen Körpers richtet, bewegt sich meist sicherer und flüssiger, als wenn er auf die eigenen Körperteile achtet. Ob das bei Angst im Sattel genauso wirkt, ist für das Reiten noch nicht eigens untersucht. Aber es passt gut zu dem, was Reitlehrerinnen seit langem sagen: Schau dahin, wo du hinwillst.",
   "Dein Werkzeug heute heißt deshalb: weiter Blick. Es dauert nur ein paar Sekunden. Sobald du merkst, dass dein Blick nach unten wandert oder eng wird, suchst du dir einen Punkt weiter vorn. Das Ende der Bahn. Einen Buchstaben an der Bande. Einen Baum am Horizont. Und dort lässt du den Blick, bis du an der nächsten Ecke bist.",
   "Du kannst das heute ohne Pferd üben. Geh zu Fuß eine gerade Linie entlang, im Flur, auf dem Bürgersteig oder auf dem Hof. Einmal mit Blick auf deine Füße. Und einmal mit Blick auf einen Punkt am Ende der Strecke. Achte darauf, wie sich dein Körper jeweils anfühlt. Wie du gehst. Wie du atmest.",
   "Viele merken dabei, dass sie mit weitem Blick aufrechter gehen und ruhiger atmen. Wenn du das spürst, merk dir das Gefühl.",
   "Und wenn du heute am Stall bist: Wähl beim Führen einen Blickpunkt, bevor du losgehst. Schau dorthin statt auf dein Pferd. Du wirst es trotzdem bemerken, wenn es stehen bleibt. Pferde sind groß. Dafür musst du nicht auf sie starren."
  ],
  "audio": "mutig-reiten-w02-t07.mp3",
  "uebung": {
   "titel": "Blickübung zu Fuß",
   "dauer": "5 Min.",
   "schritte": [
    "Geh eine Strecke und merk, wohin du schaust.",
    "Such dir einen Punkt am Ende des Weges.",
    "Lass den Blick dort, bis du ankommst.",
    "Achte darauf, wie sich dein Gang und deine Haltung verändern."
   ]
  },
  "stall": {
   "text": "Wähl beim Führen einen Blickpunkt und schau dorthin statt auf den Boden.",
   "sattel": false,
   "begleitung": false,
   "hinweis": null
  },
  "werkzeug": "blick",
  "eingabe": null,
  "weg": "L2",
  "link": null,
  "vergleich": false
 },
 {
  "n": 8,
  "ziel": "Selbstgespräch gestalten",
  "text": [
   "Wir alle reden mit uns selbst. Meistens leise, in Gedanken. Und wenn wir Angst haben, wird dieses Selbstgespräch oft ziemlich unfreundlich. Reiß dich zusammen. Du kannst das doch eigentlich. Was sollen die anderen denken. Oder einfach nur: Oh nein, oh nein, oh nein.",
   "Würdest du so mit einer Freundin reden, die gerade Angst hat? Wahrscheinlich nicht.",
   "Heute geht es darum, wie du mit dir selbst sprichst. Und um ein kleines Werkzeug: deinen Mutmacher-Satz.",
   "In der Sportpsychologie wurde das Selbstgespräch viel untersucht. Eine größere Auswertung vieler Studien kam zu dem Ergebnis, dass gezieltes Selbstgespräch die Leistung im Sport verbessern kann. Besonders gut wirkte es bei Aufgaben, die neu sind oder bei denen es auf Feinheiten ankommt. Beides trifft auf das Reiten mit Angst ziemlich gut zu.",
   "Dabei gibt es zwei Arten von Sätzen. Die einen sind anleitend. Sie sagen dir, was du tun sollst. Zum Beispiel: Ausatmen. Oder: Blick nach vorn. Die anderen sind ermutigend. Zum Beispiel: Ich kann das. Oder: Schritt für Schritt.",
   "Für deinen Mutmacher-Satz verbindest du beides. Ein kurzer Teil, der dir sagt, was du tun kannst. Und ein kurzer Teil, der dich stärkt. Zum Beispiel: Ausatmen, Blick nach vorn, ich kann das. Oder: Ich atme, er geht. Oder: Weich bleiben, wir schaffen das.",
   "Wichtig ist, dass der Satz kurz ist. Du musst ihn in einer Sekunde sagen können. Und er muss zu dir passen. Ein Satz, der sich für dich falsch oder albern anfühlt, hilft dir nicht. Lieber etwas Schlichtes, das du wirklich glaubst.",
   "Manche Menschen mögen statt eines Satzes lieber ein einzelnes Wort. Ein Ankerwort. Weich. Ruhig. Vorwärts. Das geht genauso.",
   "Deine Übung heute: Probier drei, vier Varianten aus. Sag sie leise vor dich hin, am besten beim Ausatmen. Und achte darauf, bei welcher du merkst, dass sich etwas in dir entspannt oder aufrichtet. Den Satz trägst du dann in der App ein. Er taucht von jetzt an an den Stellen auf, an denen du ihn brauchst.",
   "Und wenn dir heute kein Satz einfällt, ist das auch in Ordnung. Dann nimm erst einmal: Ich atme, er geht. Du kannst ihn jederzeit ändern. Ein Mutmacher-Satz darf mit dir mitwachsen."
  ],
  "audio": "mutig-reiten-w02-t08.mp3",
  "uebung": {
   "titel": "Mutmacher-Satz finden",
   "dauer": "5 Min.",
   "schritte": [
    "Höchstens sieben Wörter.",
    "Eine Anweisung, die du tun kannst, und eine Ermutigung.",
    "Beispiel: „Ausatmen, Blick nach vorn – ich kann das.“",
    "Sag ihn einmal laut, dann leise. Passt er? Dann behalte ihn."
   ]
  },
  "stall": null,
  "werkzeug": "satz",
  "eingabe": {
   "key": "satz",
   "label": "Dein Mutmacher-Satz",
   "placeholder": "Ausatmen, Blick nach vorn – ich kann das.",
   "multiline": false
  },
  "weg": null,
  "link": null,
  "vergleich": false
 },
 {
  "n": 9,
  "ziel": "Körperspannung lösen",
  "text": [
   "Angst sitzt nicht nur im Kopf. Sie sitzt auch im Körper. Und zwar ziemlich genau dort, wo du beim Reiten Beweglichkeit brauchst.",
   "Denk an deine Hüfte. Damit du im Sattel mitgehen kannst, muss dein Becken die Bewegung des Pferderückens aufnehmen. Im Schritt schwingt es sanft vor und zurück. Im Trab federt es. Wenn du aber Angst hast, machen viele genau das Gegenteil. Die Beine klammern, die Oberschenkel werden fest, das Becken blockiert. Man versucht, sich festzuhalten, und verliert dabei den Halt, den eigentlich die Bewegung gibt.",
   "Mit den Schultern ist es ähnlich. Sie ziehen nach oben, die Arme werden steif, die Hände hart. Das Pferd spürt jede dieser Spannungen über den Zügel und den Sattel.",
   "In einer Untersuchung mit Turnierreiterinnen und Turnierreitern gaben die Spitzenreiter vor dem Start weniger körperliche Anspannung an als die Reiter auf niedrigerem Niveau. Die Autoren vermuteten, dass weniger Anspannung die feinen Bewegungen erleichtert, die gutes Reiten braucht. Das heißt nicht, dass Anspannung immer schlecht ist. Aber zu viel davon macht das Reiten schwerer, als es sein müsste.",
   "Deshalb lockerst du heute deinen Körper. Und zwar mit zwei Übungen aus dem Rider Lab. Eine für das Becken, eine für die Schultern. Du findest sie direkt unter diesem Impuls.",
   "Bei beiden geht es nicht um Kraft und nicht um Dehnung bis zum Anschlag. Es geht darum, dass dein Körper wieder merkt: Ich kann mich hier bewegen. Mach die Bewegungen langsam und klein. Atme dabei ruhig weiter, am besten mit dem langen Ausatmen, das du schon kennst.",
   "Achte während der Übungen darauf, wo du festhältst, ohne es zu wollen. Vielleicht merkst du, dass ein Bein weniger beweglich ist als das andere. Oder dass eine Schulter höher sitzt. Das ist keine Kritik. Das ist wertvolles Wissen. Denn genau an diese Stellen kannst du später im Sattel mit dem Lockerungs-Check denken.",
   "Wenn du Schmerzen hast oder eine Bewegung unangenehm ist, mach sie kleiner oder lass sie weg. Und wenn du nach einer Verletzung oder nach einer Geburt nicht sicher bist, was du deinem Körper zumuten kannst, frag bitte vorher deine Ärztin, deine Hebamme oder deine Physiotherapeutin.",
   "Morgen baust du dein Mut-Ritual. Dein lockerer Körper ist ein guter Anfang dafür."
  ],
  "audio": "mutig-reiten-w02-t09.mp3",
  "uebung": {
   "titel": "Locker in Hüfte und Schultern",
   "dauer": "8 Min.",
   "schritte": [
    "Beckenuhr im Sitzen: Becken langsam vor- und zurückkippen, dann zu den Seiten. Eine Minute.",
    "Schultern rückwärts kreisen, zehnmal, dabei ausatmen.",
    "Danach der Lockerungs-Check: Was ist weicher geworden?",
    "Mehr Übungen für Becken und Schultern findest du im Rider Lab."
   ]
  },
  "stall": null,
  "werkzeug": null,
  "eingabe": null,
  "weg": null,
  "link": {
   "label": "Zum Rider Lab",
   "href": "/akademie/rider-lab"
  },
  "vergleich": false
 },
 {
  "n": 10,
  "ziel": "Eine feste Routine vor dem Aufsteigen",
  "text": [
   "Stell dir vor, du kommst am Stall an. Das Handy ist noch in der Hand, im Kopf läuft der Tag nach: die Arbeit, die Einkaufsliste, vielleicht ein Gespräch, das dich beschäftigt. Und dann soll es plötzlich ruhig werden, sobald du neben deinem Pferd stehst.",
   "Das klappt selten auf Knopfdruck. Was dagegen gut klappt, ist ein fester Ablauf.",
   "Viele Sportlerinnen und Sportler haben so einen Ablauf, bevor es losgeht. Eine Tennisspielerin vor dem Aufschlag, ein Golfer vor dem Schlag. Immer dieselben Handgriffe, in derselben Reihenfolge. Studien zeigen, dass solche Routinen die Leistung verbessern können, auch wenn Druck da ist. Sie geben dem Kopf etwas Bekanntes, an dem er sich festhalten kann. Und sie lenken die Aufmerksamkeit weg von dem, was alles passieren könnte, hin zu dem, was du jetzt tun kannst.",
   "Heute baust du dir deine eigene Routine für die Zeit vor dem Aufsteigen. Dein Mut-Ritual. Es dauert ungefähr fünf Minuten und besteht aus Dingen, die du schon kennst.",
   "Der erste Baustein: Schau dir dein Pferd an. Nicht nebenbei, sondern bewusst. Wie ist es heute? Wohin zeigen die Ohren? Sind die Augen weich oder weit aufgerissen? Steht es ruhig, oder tritt es hin und her? Du sammelst Informationen. Und Informationen geben Sicherheit.",
   "Der zweite Baustein: Prüf deine Ausrüstung. Sitzt der Helm? Ist der Gurt nachgezogen? Passen die Bügel? Das sind Handgriffe, die du ohnehin machst. Im Ritual machst du sie mit Absicht.",
   "Der dritte Baustein ist dein Atem-Reset. Fünf Atemzüge, länger aus als ein.",
   "Der vierte Baustein ist dein Mutmacher-Satz. Der Satz, den du in den letzten Tagen gefunden hast. Sag ihn leise oder in Gedanken, am besten beim Ausatmen.",
   "Und der fünfte Baustein: ein kleines Ziel für heute. Kein großes, sondern eins, das du schaffen kannst. Zum Beispiel: zweimal rückwärts richten, ohne zu ziehen. Oder: einmal ganz durch die Halle führen und dabei nach vorn schauen.",
   "Du musst nicht alle Bausteine nehmen. Wähl die aus, die zu dir passen, und leg eine Reihenfolge fest. Wichtig ist nur, dass du sie jedes Mal gleich machst. Je öfter du dein Ritual wiederholst, desto mehr wird es zu einem Zeichen für deinen Körper: Jetzt bin ich hier. Jetzt geht es los.",
   "Wenn du magst, spielst du dein Ritual heute einmal am Stall durch, ohne aufzusteigen. Dein Pferd ist dabei angebunden oder wird gehalten. Achte darauf, wie lange es dauert und wie du dich danach fühlst.",
   "Ab heute gehört dieses Ritual dir. Für die nächsten Wochen und für die Zeit danach."
  ],
  "audio": "mutig-reiten-w02-t10.mp3",
  "uebung": {
   "titel": "Dein Mut-Ritual",
   "dauer": "10 Min.",
   "schritte": [
    "Pferd anschauen: Wie ist es heute drauf?",
    "Ausrüstung prüfen: Helm, Gurt, Bügellänge.",
    "Atem-Reset: fünf Atemzüge, länger aus als ein.",
    "Mutmacher-Satz sagen.",
    "Ein kleines Ziel für heute festlegen."
   ]
  },
  "stall": {
   "text": "Spiel das Ritual einmal am Pferd durch, ohne aufzusteigen.",
   "sattel": false,
   "begleitung": false,
   "hinweis": "Pferd angebunden."
  },
  "werkzeug": "ritual",
  "eingabe": {
   "key": "ritual",
   "label": "Dein Ritual in deinen Worten",
   "placeholder": "1. Pferd anschauen  2. Helm und Gurt  3. Fünf Atemzüge  4. Mein Satz  5. Ziel: …",
   "multiline": true
  },
  "weg": null,
  "link": null,
  "vergleich": false
 },
 {
  "n": 11,
  "ziel": "Entspannung beim Pferd erkennen",
  "text": [
   "Willkommen in Woche drei. In dieser Woche bist du am Boden unterwegs, ganz nah bei deinem Pferd. Und wir fangen mit etwas an, das viel Sicherheit gibt: dein Pferd lesen zu können.",
   "Ein Teil der Angst kommt daher, dass Pferde manchmal unberechenbar wirken. Plötzlich hebt es den Kopf, plötzlich macht es einen Satz zur Seite. Aber meistens kündigt ein Pferd vorher an, wie es ihm geht. Wir müssen nur lernen, die Zeichen zu sehen.",
   "Fangen wir mit den Ohren an. Ohren, die locker zur Seite hängen oder entspannt mal hierhin, mal dorthin zeigen, gehören oft zu einem ruhigen Pferd. Ohren, die beide starr nach vorn gerichtet sind, zeigen: Da vorn ist etwas Interessantes. Das kann Neugier sein oder der Anfang von Unsicherheit. Und Ohren, die flach nach hinten angelegt sind, bedeuten meistens: Lass mich in Ruhe, oder: Ich bin verärgert.",
   "Dann die Augen. Ein entspanntes Pferd hat einen weichen Blick, die Lider sind locker, manchmal fast halb geschlossen. Ein angespanntes Pferd reißt die Augen auf, oft sieht man dann das Weiße im Auge.",
   "Und das Maul. Lockere Lippen, vielleicht ein bisschen Kauen oder Lecken, gehören oft zu Entspannung. Ein fest geschlossenes, schmales Maul mit angespannten Nüstern eher zu Stress.",
   "Jetzt kommt das Wichtigste: Kein Zeichen steht für sich allein. Ein Ohr nach hinten kann auch heißen, dass dein Pferd dir gerade zuhört. Lies immer das ganze Pferd. Kopfhaltung, Ohren, Augen, Maul, Schweif, die Haltung des Körpers. Erst zusammen ergeben sie ein Bild. Und jedes Pferd hat seine Eigenheiten. Deine Reitlehrerin oder die Besitzerin kennt sie oft gut. Frag ruhig nach.",
   "Deine Übung heute ist ein kleines Bilder-Quiz in der App. Du siehst Pferde in verschiedenen Situationen und schätzt ein, wie es ihnen gerade geht. Es geht nicht darum, alles richtig zu haben. Es geht darum, genauer hinzuschauen.",
   "Und wenn du heute am Stall bist, nimm dir fünf Minuten nur zum Beobachten. Ohne Aufgabe, ohne Ziel. Stell dich mit sicherem Abstand an die Box oder an den Zaun und schau dein Pferd an. Was machen die Ohren? Wie ist der Blick? Wie steht es da?",
   "Viele merken dabei: Je mehr ich sehe, desto weniger überrascht mich mein Pferd. Und je weniger mich mein Pferd überrascht, desto ruhiger werde ich."
  ],
  "audio": null,
  "uebung": {
   "titel": "Pferdesprache lesen",
   "dauer": "8 Min.",
   "schritte": [
    "Ohren: locker, beweglich, oft leicht zur Seite.",
    "Augen: weich, das Lid entspannt.",
    "Maul: Unterlippe locker, vielleicht Kauen oder Lecken.",
    "Kopf: eher tief bis waagerecht.",
    "Lies die Zeichen immer zusammen, nie eines allein."
   ]
  },
  "stall": {
   "text": "Beobachte dein Pferd 5 Minuten und notiere, welche Zeichen du siehst.",
   "sattel": false,
   "begleitung": false,
   "hinweis": null
  },
  "werkzeug": null,
  "eingabe": null,
  "weg": null,
  "link": null,
  "vergleich": false
 },
 {
  "n": 12,
  "ziel": "Erschrecken verstehen",
  "text": [
   "Gestern hast du gelernt, wie dein Pferd zeigt, wie es ihm geht. Heute geht es um eine Frage, die viele Reiterinnen mit Angst besonders beschäftigt: Warum erschrecken Pferde überhaupt? Und warum manchmal vor Dingen, die für uns völlig harmlos sind?",
   "Die Antwort liegt in der Geschichte der Pferde. Pferde sind Fluchttiere. Über eine sehr lange Zeit haben in freier Wildbahn vor allem die Pferde überlebt, die bei einem verdächtigen Geräusch lieber einmal zu früh weggesprungen sind als einmal zu spät. Ein Pferd, das erst überlegt, ob das Rascheln im Gras gefährlich ist, war im Zweifel zu langsam.",
   "Dieses Erbe steckt noch in jedem Pferd. Auch in dem ruhigen Schulpferd, das seit Jahren dieselbe Halle kennt.",
   "Dazu kommt, dass Pferde die Welt anders wahrnehmen als wir. Ihre Augen sitzen seitlich am Kopf. Dadurch sehen sie fast rundherum, aber nicht alles gleich scharf. Direkt vor der Nase und direkt hinter dem Körper haben sie Bereiche, die sie schlecht oder gar nicht sehen. Und sie hören sehr fein. Ein Geräusch, das wir kaum bemerken, kann für ein Pferd deutlich zu hören sein.",
   "Was heißt das für dich? Erstens: Wenn dein Pferd erschrickt, ist das kein Angriff auf dich. Es ist eine ganz normale Reaktion eines Fluchttiers. Zweitens: Erschrecken lässt sich nicht vollständig verhindern. Auch das bravste Pferd erschrickt mal. Und drittens, und das ist die gute Nachricht: Man kann sich darauf vorbereiten.",
   "Vorbereitung heißt zum Beispiel, die typischen Auslöser zu kennen. Flatternde Planen, plötzliche Geräusche, Dinge, die an einer anderen Stelle stehen als sonst, Wind, der durch die Halle pfeift. Vorbereitung heißt auch, an solchen Tagen die Stufe kleiner zu wählen. Und Vorbereitung heißt, einen Plan zu haben, was du tust, wenn es passiert. Diesen Plan baust du in Woche vier.",
   "Deine Übung heute ist wieder ein kurzes Bilder-Quiz. Du siehst Situationen, in denen Pferde erschrecken könnten, und überlegst, was das Pferd wohl wahrnimmt. Das schult deinen Blick dafür, Situationen früher zu erkennen.",
   "Und noch ein Gedanke zum Mitnehmen. Ein Pferd, das erschrickt, sucht oft Orientierung. Bei der Herde. Und bei dem Menschen neben ihm. Wenn du in so einem Moment ausatmest und ruhig bleibst, so gut du eben kannst, gibst du deinem Pferd genau das."
  ],
  "audio": null,
  "uebung": {
   "titel": "Bevor ein Pferd erschrickt",
   "dauer": "8 Min.",
   "schritte": [
    "Typische Vorzeichen: Kopf geht hoch, Ohren zeigen fest nach vorn, der Körper spannt sich, manchmal Schnauben.",
    "Pferde sehen und hören anders als wir. Was uns harmlos scheint, kann für sie neu sein.",
    "Was hilft: ausatmen, ruhig bleiben, dem Pferd Zeit zum Schauen geben, Abstand schaffen.",
    "Überleg: Wann hat dein Pferd zuletzt erschrocken? Was war vorher zu sehen?"
   ]
  },
  "stall": null,
  "werkzeug": null,
  "eingabe": null,
  "weg": "L3",
  "link": null,
  "vergleich": false
 },
 {
  "n": 13,
  "ziel": "Ruhig führen",
  "text": [
   "Heute geht es ans Führen. Genauer gesagt um eine der einfachsten und gleichzeitig wirkungsvollsten Übungen am Boden: anhalten und warten.",
   "Vielleicht fragst du dich, was das mit Angst zu tun hat. Ziemlich viel. Denn beim Führen spürst du zum ersten Mal ganz direkt, ob du und dein Pferd euch versteht. Wenn dein Pferd an dir vorbeidrängelt, dich zieht oder nicht anhält, entsteht schnell das Gefühl: Ich habe das nicht im Griff. Und genau dieses Gefühl nimmst du mit in den Sattel.",
   "Umgekehrt gilt auch: Wenn dein Pferd am Boden auf ein ruhiges Signal von dir anhält und stehen bleibt, ist das eine Erfahrung, die zählt. Du merkst: Es hört mir zu. Wir können zusammen etwas machen.",
   "So geht die Übung. Du führst dein Pferd mit Halfter und Strick auf einem bekannten, ruhigen Weg. Du gehst neben der Schulter, nicht vor dem Pferd und nicht dahinter. Den Strick hältst du locker, mit etwas Durchhang.",
   "Wenn du anhalten möchtest, gibst du ein klares Signal. Du atmest aus, richtest dich auf, bleibst selbst stehen und sagst ruhig ein Wort, zum Beispiel: Und steh. Hält dein Pferd an, lobst du es mit der Stimme und wartest. Zähl langsam bis fünf. Dann geht ihr weiter.",
   "Hält es nicht sofort an, wiederholst du das Signal deutlicher, mit einem leichten Zupfen am Strick. Kein Ziehen, kein Zerren. Das Ziel ist ein Pferd, das auf ein leises Zeichen hört, nicht eines, das gegen den Strick arbeitet.",
   "Wenn dein Pferd heute unruhig ist, viel um sich schaut oder an dir vorbeidrängt, mach die Übung kürzer oder brich sie ab. Das ist kein Versagen. Das ist kluges Einschätzen. Und wenn du dir beim Führen allgemein noch unsicher bist, nimm deine Reitlehrerin oder eine erfahrene Person dazu.",
   "Achte bei der Übung auch auf dich. Wo ist dein Blick? Vielleicht schon beim nächsten Punkt am Ende des Weges. Wie ist dein Atem? Und was sagt dein Mutmacher-Satz?",
   "Wenn Führen für dich gerade eine Stufe auf deiner Mut-Leiter ist, trag den Durchgang danach ein. Was hast du befürchtet? Was ist passiert? Und wie groß war die Angst?",
   "In der App findest du die Übung noch einmal mit einer kleinen Animation. Schau sie dir an, bevor du zum Stall fährst. So hast du den Ablauf schon im Kopf, wenn du ihn brauchst."
  ],
  "audio": null,
  "uebung": {
   "titel": "Anhalten und warten",
   "dauer": "10 Min.",
   "schritte": [
    "Geh auf Höhe der Pferdeschulter, Blick nach vorn.",
    "Zum Anhalten: ausatmen, selbst stehen bleiben, ein ruhiges Stimmsignal.",
    "Ein paar Sekunden gemeinsam stehen, dann loben.",
    "Lass dir die Signale von deiner Reitlehrerin zeigen, wenn du unsicher bist."
   ]
  },
  "stall": {
   "text": "Führen mit Anhalten auf einem bekannten Weg (Stufe 3–4).",
   "sattel": false,
   "begleitung": false,
   "hinweis": null
  },
  "werkzeug": null,
  "eingabe": null,
  "weg": null,
  "link": null,
  "vergleich": false
 },
 {
  "n": 14,
  "ziel": "Abstand selbst bestimmen",
  "text": [
   "Gestern hast du geübt, wie dein Pferd auf dein Zeichen anhält. Heute gehen wir einen Schritt weiter. Du lernst, wie du den Abstand zwischen dir und deinem Pferd selbst bestimmst. Mit zwei Übungen: rückwärts richten und weichen lassen.",
   "Warum ist das wichtig? Viele Menschen mit Angst kennen dieses Gefühl: Das Pferd kommt mir zu nah. Es schiebt sich an mich heran, steht mir auf dem Fuß, drängt mich an die Wand. Und ich weiß nicht, wie ich es wieder wegbekomme. In solchen Momenten fühlt man sich klein und ausgeliefert.",
   "Wenn du dagegen weißt, wie du dein Pferd ruhig einen Schritt zurück oder zur Seite schickst, ändert sich etwas. Du bist es, die den Raum gestaltet. Und dein Pferd lernt, diesen Raum zu respektieren. Das gibt euch beiden Sicherheit.",
   "Fangen wir mit dem Rückwärtsrichten an. Du stehst vor deinem Pferd, etwas seitlich, nicht direkt vor der Nase. Du richtest dich auf, atmest aus und gibst ein ruhiges Stimmsignal, zum Beispiel: Zurück. Gleichzeitig machst du mit dem Strick eine leichte Bewegung in Richtung Brust des Pferdes. Macht dein Pferd auch nur einen kleinen Schritt zurück, hörst du sofort auf und lobst. Ein Schritt reicht am Anfang völlig.",
   "Dann das Weichen. Du stehst seitlich neben deinem Pferd, etwa auf Höhe der Flanke. Mit der Hand oder einer Gerte als verlängertem Arm zeigst du auf die Seite des Pferdes, ohne zu schlagen. Ziel ist, dass dein Pferd mit der Hinterhand einen Schritt von dir weggeht. Auch hier gilt: Ein Schritt, dann loben, dann Pause.",
   "Bei beiden Übungen ist dein Körper wichtiger als jedes Hilfsmittel. Aufrecht stehen, ruhig atmen, klar und freundlich bleiben. Je weniger Kraft du brauchst, desto besser.",
   "Ein wichtiger Sicherheitshinweis: Halte immer so viel Abstand, dass du nicht getreten werden kannst, und stell dich nie direkt hinter dein Pferd. Wenn dein Pferd diese Übungen noch nicht kennt oder unruhig reagiert, lass sie dir zuerst von deiner Reitlehrerin zeigen. Es gibt Pferde, die anders darauf reagieren, als man erwartet.",
   "Schau dir die Animationen in der App an, bevor du zum Stall fährst. Und wenn diese Übungen gerade eine Stufe auf deiner Mut-Leiter sind, trag danach ein, was du befürchtet hast und was passiert ist.",
   "Vielleicht wirst du überrascht sein, wie stark sich ein einziger Schritt zurück anfühlen kann."
  ],
  "audio": null,
  "uebung": {
   "titel": "Rückwärts und weichen",
   "dauer": "10 Min.",
   "schritte": [
    "Stell dich vor dein Pferd, aufrecht und ruhig.",
    "Gib ein leichtes, klares Signal und gib sofort nach, sobald es einen Schritt macht.",
    "Beim Weichen genauso: kleines Signal, sofort nachgeben, loben.",
    "Wie die Signale bei deinem Pferd aussehen, zeigt dir deine Reitlehrerin."
   ]
  },
  "stall": {
   "text": "Rückwärts und Weichen am Boden (Stufe 4).",
   "sattel": false,
   "begleitung": false,
   "hinweis": null
  },
  "werkzeug": null,
  "eingabe": null,
  "weg": null,
  "link": null,
  "vergleich": false
 },
 {
  "n": 15,
  "ziel": "Fortschritt sichtbar machen",
  "text": [
   "Du hast die Hälfte geschafft. Fünfzehn Einheiten, drei Wochen. Zeit für einen Blick zurück.",
   "Vielleicht denkst du jetzt: So viel hat sich doch gar nicht verändert. Ich habe immer noch Angst. Das ist ein sehr häufiger Gedanke an dieser Stelle. Und er hat einen Grund. Fortschritt bei Angst fühlt sich selten an wie ein großer Durchbruch. Er kommt in kleinen Schritten. Und kleine Schritte übersieht man leicht, wenn man mittendrin steckt.",
   "Deshalb schauen wir heute nicht auf das Gefühl, sondern auf das, was du tatsächlich getan hast.",
   "Der Psychologe Albert Bandura hat schon vor fast fünfzig Jahren beschrieben, was Menschen am stärksten davon überzeugt, etwas zu können. Nicht gute Worte von anderen. Nicht, anderen dabei zuzusehen. Sondern selbst erlebte Erfolge. Jedes Mal, wenn du etwas geschafft hast, das dir vorher schwerfiel, sammelst du einen Beweis. Und diese Beweise zählen mehr als jedes Gefühl.",
   "Deine Übung heute hat drei Teile.",
   "Erstens: Schau dir deine Kurve auf dem Mut-Barometer an. Nicht nur den letzten Wert, sondern den Verlauf. Gibt es Stufen, bei denen die Angst kleiner geworden ist? Gibt es Tage, an denen sie höher war? Was war an diesen Tagen anders?",
   "Zweitens: Lies dir durch, was du vor deinen Durchgängen befürchtet hast. Und daneben, was dann tatsächlich passiert ist. Wie oft ist das eingetreten, was du befürchtet hast? Wie oft ist es anders gekommen? Schreib dir die Zahl auf. Sie gehört dir.",
   "Drittens: Schau auf deine Mut-Leiter. Stimmen die Stufen noch? Manchmal merkt man nach drei Wochen, dass eine Stufe viel zu groß ist. Dann teil sie in zwei kleinere. Oder eine Stufe hat sich als leichter erwiesen als gedacht. Dann darfst du sie zusammenfassen. Die Leiter ist dein Werkzeug, kein Vertrag.",
   "Und falls deine Werte gerade nicht so aussehen, wie du es dir wünschst: Das ist eine Information, kein Urteil. Vielleicht war die Stufe zu groß. Vielleicht war es eine anstrengende Zeit. Vielleicht braucht es einfach noch etwas länger. Es gibt kein Zeitlimit.",
   "Wenn du heute am Stall bist, nimm dir die nächste Stufe vor. Oder wiederhol eine, die gut lief. Beides ist richtig.",
   "Und dann sei kurz stolz auf dich. Drei Wochen dranbleiben, bei einem Thema, das wehtut, ist nicht selbstverständlich."
  ],
  "audio": null,
  "uebung": {
   "titel": "Rückblick",
   "dauer": "8 Min.",
   "schritte": [
    "Schau dir in deiner Mut-Leiter die Werte der letzten Durchgänge an.",
    "Vergleiche: Was hast du befürchtet, was ist wirklich passiert?",
    "Schreib einen Satz darüber, was du schon geschafft hast."
   ]
  },
  "stall": {
   "text": "Mach die nächste Stufe deiner Leiter.",
   "sattel": false,
   "begleitung": false,
   "hinweis": null
  },
  "werkzeug": null,
  "eingabe": {
   "key": "rueckblick1",
   "label": "Was du bisher geschafft hast",
   "placeholder": "Vor zwei Wochen … heute …",
   "multiline": true
  },
  "weg": null,
  "link": {
   "label": "Zur Mut-Leiter",
   "href": "/mutig-reiten/leiter"
  },
  "vergleich": false
 },
 {
  "n": 16,
  "ziel": "Einen Plan für die größte Angst haben",
  "text": [
   "Willkommen in Woche vier. In dieser Woche geht es Richtung Sattel. Und bevor du dich in den Sattel setzt, bauen wir etwas, das dir dort Halt gibt: deinen ersten Wenn-dann-Plan.",
   "Oft macht uns nicht nur eine Situation Angst, sondern das Gefühl, nicht zu wissen, was wir dann tun sollen. Wenn das Pferd erschrickt, wenn es losrennt, wenn es stehen bleibt und nicht weitergeht. In diesem Moment muss der Kopf blitzschnell entscheiden. Und genau dann ist er am wenigsten dazu in der Lage, weil der Alarm alles übertönt.",
   "Ein Wenn-dann-Plan nimmt dir diese Entscheidung ab. Du triffst sie vorher, in Ruhe, zu Hause. Und im entscheidenden Moment musst du sie nur noch abrufen.",
   "In der Psychologie heißen solche Pläne Umsetzungsabsichten. Eine Auswertung von fast hundert Untersuchungen hat gezeigt, dass Menschen ihre Vorhaben deutlich häufiger umsetzen, wenn sie vorher festlegen: Wenn diese Situation eintritt, dann tue ich das. Der Plan verknüpft eine Situation direkt mit einer Handlung. Dadurch läuft die Handlung schneller und zuverlässiger ab.",
   "So baust du deinen Plan. Er hat immer zwei Teile.",
   "Der Wenn-Teil beschreibt die Situation, so konkret wie möglich. Nicht: Wenn etwas passiert. Sondern zum Beispiel: Wenn mein Pferd an der Ecke zur Seite springt.",
   "Der Dann-Teil beschreibt, was du tust. Kurz, klar, in der Reihenfolge, in der du es tun willst. Zum Beispiel: Dann atme ich aus, sitze aufrecht, schaue nach vorn und pariere ruhig zum Schritt durch.",
   "Für deinen ersten Plan nimmst du die Situation, vor der du am meisten Angst hast. Wenn du nach einem Sturz hier bist, ist es wahrscheinlich die Situation, in der es damals passiert ist.",
   "Schreib den Plan auf. Und dann lies ihn dir dreimal laut vor. Danach schließ die Augen und spiel ihn im Kopf durch. Stell dir die Situation vor, so echt wie möglich. Und dann siehst du dich selbst, wie du genau das tust, was im Dann-Teil steht.",
   "Wichtig: Was im Dann-Teil steht, muss für dich machbar und reiterlich sinnvoll sein. Wenn du unsicher bist, ob deine Reaktion die richtige ist, besprich den Plan mit deiner Reitlehrerin. Sie kennt dein Pferd und kann dir sagen, was in dieser Situation am meisten hilft.",
   "Dieser Plan wird dich durch die nächsten Wochen begleiten. In Woche vier und fünf kommen noch zwei weitere dazu."
  ],
  "audio": null,
  "uebung": {
   "titel": "Wenn-dann-Plan 1",
   "dauer": "10 Min.",
   "schritte": [
    "Nenne die Situation: „Wenn mein Pferd erschrickt …“",
    "Lege die Reaktion fest: „… dann atme ich aus, sitze aufrecht und schaue nach vorn.“",
    "Spiel den Plan im Kopf dreimal durch.",
    "Besprich ihn mit deiner Reitlehrerin."
   ]
  },
  "stall": null,
  "werkzeug": "plan",
  "eingabe": {
   "key": "plan1",
   "label": "Dein Wenn-dann-Plan 1",
   "placeholder": "Wenn …, dann …",
   "multiline": true
  },
  "weg": "L4",
  "link": null,
  "vergleich": false
 },
 {
  "n": 17,
  "ziel": "Reaktion bei Erschrecken vorbereiten",
  "text": [
   "Gestern hast du deinen ersten Wenn-dann-Plan geschrieben. Heute schauen wir uns den Teil genauer an, den viele Reiterinnen am meisten fürchten: Was mache ich mit meinem Körper, wenn das Pferd plötzlich ruckt?",
   "Wenn ein Pferd erschrickt, passiert im Reiterkörper oft ganz automatisch das Falsche. Der Oberkörper kippt nach vorn. Die Knie klemmen. Die Absätze ziehen nach oben. Die Hände reißen am Zügel. Das ist der Schutzreflex, sich klein zu machen und festzuhalten. Nur leider bringt genau diese Haltung dich leichter aus dem Gleichgewicht.",
   "Deshalb übst du heute eine Haltung, auf die du in solchen Momenten zurückgreifen kannst. Sie besteht aus vier Teilen.",
   "Erstens: ausatmen. Damit fängt alles an. Der lange Atemzug, den du schon kennst, löst den ersten Schreck.",
   "Zweitens: aufrecht sitzen. Der Oberkörper bleibt senkrecht oder geht sogar ein kleines bisschen zurück. Stell dir vor, dein Kopf wird an einem Faden nach oben gezogen.",
   "Drittens: Absätze tief. Das Gewicht sinkt in die Fersen. So bekommst du einen tiefen, stabilen Sitz, statt dich mit den Knien festzuklammern.",
   "Viertens: Blick nach vorn. Nicht auf das, was dein Pferd erschreckt hat, und nicht nach unten. Sondern dahin, wohin du reiten willst.",
   "Ein Tipp, den viele Reitlehrerinnen geben: Ein Halteriemen am Sattel oder am Hals des Pferdes gibt dir etwas, woran du dich festhalten kannst, ohne am Zügel und damit am Pferdemaul zu ziehen. Frag deine Reitlehrerin, ob das für dich und dein Pferd passt.",
   "Deine Übung heute machst du ohne Pferd. Setz dich auf einen Gymnastikball oder auf die Kante eines festen Stuhls. Nimm die Haltung ein: ausatmen, aufrecht, Absätze tief, Blick nach vorn. Halte sie einige Atemzüge. Dann lass los und fang noch einmal an. Mach das mehrmals, bis sich die Reihenfolge vertraut anfühlt.",
   "Dann kommt der zweite Teil: der Mut-Film. Schließ die Augen. Stell dir vor, du sitzt auf deinem Pferd, im Schritt, in der Halle. Plötzlich ein Geräusch, dein Pferd zuckt zusammen. Und jetzt siehst du dich selbst: Du atmest aus, richtest dich auf, die Absätze sinken, dein Blick geht nach vorn. Dein Pferd macht einen Schritt und wird wieder ruhig. Lass den Film gut enden.",
   "Die Übungen in diesem Programm ersetzen keinen Reitunterricht. Wie du in deiner Situation am besten reagierst, zeigt dir deine Reitlehrerin am besten direkt am Pferd."
  ],
  "audio": null,
  "uebung": {
   "titel": "Sitzen, wenn es ruckt",
   "dauer": "8 Min.",
   "schritte": [
    "Im Stand: aufrecht, Knie weich, Fersen tief.",
    "Ausatmen, Blick nach vorn.",
    "Wenn du einen Gymnastikball hast: dieselbe Haltung im Sitzen üben.",
    "Zum Schluss als kurzer Mut-Film im Kopf: Das Pferd macht einen Hüpfer, du bleibst aufrecht und atmest aus."
   ]
  },
  "stall": null,
  "werkzeug": null,
  "eingabe": null,
  "weg": null,
  "link": null,
  "vergleich": false
 },
 {
  "n": 18,
  "ziel": "Die erste Sattel-Stufe vorbereiten",
  "text": [
   "Heute geht es um einen Moment, der für viele eine große Hürde ist: das Aufsteigen.",
   "Vielleicht bist du schon so weit, dass das Aufsteigen auf deiner Mut-Leiter dran ist. Vielleicht ist es noch ein paar Stufen entfernt. Beides ist in Ordnung. Die heutige Übung kannst du in jedem Fall machen, denn sie findet zuerst im Kopf statt.",
   "Du hast schon einmal einen Mut-Film gemacht, gestern, bei der Haltung im Sattel. Heute schauen wir uns an, warum das funktioniert. Wenn du eine Bewegung im Kopf durchspielst, ohne sie auszuführen, nennt man das mentales Training. Dazu gibt es viele Untersuchungen, auch zusammenfassende Auswertungen über Jahrzehnte. Sie kommen zu einem ähnlichen Ergebnis: Mentales Training verbessert die Ausführung einer Bewegung. Nicht so stark wie echtes Üben, aber deutlich mehr als gar nichts. Und es hat einen großen Vorteil: Du kannst es überall machen, ohne Risiko.",
   "Für das Aufsteigen heißt das: Du kannst den Ablauf so oft im Kopf erleben, dass er dir vertraut ist, bevor du ihn zum ersten Mal wieder machst.",
   "So geht dein Mut-Film heute. Such dir einen ruhigen Platz und schließ die Augen. Atme ein paarmal lang aus.",
   "Stell dir vor, du kommst am Stall an. Du gehst dein Mut-Ritual durch: Du schaust dein Pferd an, prüfst die Ausrüstung, atmest, sagst deinen Satz. Neben dir steht deine Begleitperson und hält das Pferd. Vor dir steht die Aufstiegshilfe.",
   "Jetzt gehst du die Stufen hinauf. Du spürst den Zügel in der Hand. Du legst das Bein über den Sattel und setzt dich langsam hin. Ganz weich. Dein Pferd steht ruhig. Du atmest aus, richtest dich auf, findest die Bügel. Und dann bleibst du einfach sitzen. Ein paar Atemzüge lang. Du spürst die Wärme des Pferdes und seinen Atem unter dir.",
   "Lass den Film gut enden. Wenn sich unterwegs ein unangenehmes Bild einschleicht, spul zurück und spiel die Stelle noch einmal so ab, wie du sie haben möchtest.",
   "Wenn das Aufsteigen schon auf deiner Leiter dran ist und du heute am Stall bist: Mach es nur mit diesen Voraussetzungen. Deine ärztliche Freigabe liegt vor, falls du verletzt warst oder ein Baby bekommen hast. Eine zweite Person ist dabei und hält dein Pferd. Und du benutzt eine Aufstiegshilfe.",
   "Fühlt sich das heute noch zu groß an? Dann bleib beim Film. Er ist kein Ersatz, sondern eine Vorbereitung. Und sie zählt."
  ],
  "audio": null,
  "uebung": {
   "titel": "Mut-Film „Aufsteigen“",
   "dauer": "5 Min.",
   "schritte": [
    "Schließ die Augen.",
    "Erlebe dein Ritual und das Aufsteigen aus deiner Sicht, mit Geräuschen und Gefühlen.",
    "Du sitzt, atmest aus, das Pferd steht ruhig.",
    "Lass den Film gut enden."
   ]
  },
  "stall": {
   "text": "Stufe 5: Aufsteigen mit Aufstiegshilfe und im Halten sitzen bleiben.",
   "sattel": true,
   "begleitung": true,
   "hinweis": "Nur mit Freigabe, Begleitperson und Aufstiegshilfe. Jemand hält das Pferd."
  },
  "werkzeug": "film",
  "eingabe": null,
  "weg": null,
  "link": null,
  "vergleich": false
 },
 {
  "n": 19,
  "ziel": "Wissen für den Ernstfall",
  "text": [
   "Heute geht es um ein Thema, über das viele lieber nicht nachdenken: Was tue ich, wenn wirklich etwas schiefgeht?",
   "Es mag sich seltsam anfühlen, sich mit dem Ernstfall zu beschäftigen, wenn man gerade versucht, weniger Angst zu haben. Aber oft ist es genau umgekehrt. Ein großer Teil der Angst kommt aus dem Gefühl, im Notfall hilflos zu sein. Wer weiß, was er tun kann, fühlt sich sicherer. Nicht, weil nichts mehr passieren kann, sondern weil man nicht mehr ausgeliefert ist.",
   "Ein ganz wichtiger Hinweis gleich vorweg: In diesem Impuls bekommst du einen Überblick. Üben solltest du die Handgriffe ausschließlich zusammen mit deiner Reitlehrerin, am Anfang im Schritt und auf einem ruhigen, erfahrenen Pferd. Was für welches Pferd und welche Situation passt, kann nur jemand beurteilen, der dich und das Pferd vor Ort sieht.",
   "Es gibt drei Dinge, die du kennen solltest.",
   "Das erste ist das ruhige Durchparieren. Wenn dein Pferd schneller wird, als du möchtest, ist der erste Schritt nicht, mit aller Kraft am Zügel zu ziehen. Sondern ausatmen, aufrecht sitzen, mit Stimme und Körper ruhig werden und mit wiederholten, kurzen Paraden das Tempo herausnehmen. Viele Pferde reagieren auf eine ruhige Stimme mehr, als man denkt.",
   "Das zweite ist das Abwenden auf einen großen Bogen. Ein Pferd, das geradeaus davonstürmt, kann man oft beruhigen, indem man es auf eine große gebogene Linie lenkt, zum Beispiel einen großen Zirkel. Das Wort groß ist dabei wichtig. Ein scharfes Herumreißen kann gefährlich sein, gerade bei höherem Tempo.",
   "Das dritte ist das sichere Absteigen. Es gibt Situationen, in denen es klüger ist, abzusteigen, als oben zu bleiben. Wie man das kontrolliert macht und wann es sinnvoll ist, zeigt dir deine Reitlehrerin.",
   "Deine Übung heute ist dein zweiter Wenn-dann-Plan. Nimm die Situation, die dir nach der ersten am meisten Angst macht. Und schreib den Dann-Teil mit dem, was du heute gehört hast. Zum Beispiel: Wenn mein Pferd im Trab immer schneller wird, dann atme ich aus, setze mich tief, rede ruhig mit ihm und pariere mit kurzen Paraden durch.",
   "Und dann sprich deine Reitlehrerin an. Frag sie, ob ihr diese Handgriffe in der nächsten Stunde im Schritt üben könnt. Du kannst ihr dafür auch die Seite für deine Begleitperson in der App zeigen.",
   "Je öfter du die Handgriffe in ruhigen Momenten übst, desto eher kommen sie, wenn du sie brauchst."
  ],
  "audio": null,
  "uebung": {
   "titel": "Notfall-Handgriffe kennen",
   "dauer": "10 Min.",
   "schritte": [
    "Durchparieren, auf einen großen Bogen abwenden, sicher absteigen: Diese drei Handgriffe lernst du heute als Wissen.",
    "Geübt wird nur zusammen mit deiner Reitlehrerin, im Schritt.",
    "Schreib deinen Wenn-dann-Plan 2 für eine Situation, in der du einen Handgriff brauchst."
   ]
  },
  "stall": {
   "text": "Übe die Handgriffe mit deiner Reitlehrerin im Schritt.",
   "sattel": true,
   "begleitung": true,
   "hinweis": "Pflicht: Begleitung durch die Reitlehrerin."
  },
  "werkzeug": null,
  "eingabe": {
   "key": "plan2",
   "label": "Dein Wenn-dann-Plan 2",
   "placeholder": "Wenn …, dann …",
   "multiline": true
  },
  "weg": null,
  "link": null,
  "vergleich": false
 },
 {
  "n": 20,
  "ziel": "Zwischenbilanz ziehen",
  "text": [
   "Zwanzig Einheiten. Vier Wochen. Heute ziehst du eine Zwischenbilanz. Und du bekommst etwas für deinen Weg: deine Zwischen-Urkunde.",
   "Vielleicht warst du in dieser Woche zum ersten Mal seit langem wieder im Sattel. Vielleicht bist du noch am Boden und hast den Sattel nur im Kopf erlebt. Beides gehört zu diesem Programm. Die Wochen sind ein Rahmen, kein Fahrplan. Entscheidend ist nicht, auf welcher Stufe du stehst, sondern dass du dich bewegst.",
   "Ich möchte dir heute einen Gedanken mitgeben, der für die nächsten Wochen wichtig ist. Mut wächst ein bisschen wie ein Muskel. Er wird stärker, wenn du ihn regelmäßig nutzt. Und er wird besonders stabil, wenn du ihn in unterschiedlichen Situationen nutzt.",
   "Das kennt die Angstforschung recht gut. Wenn Menschen eine Angst nur an einem einzigen Ort und immer unter denselben Bedingungen überwinden, kann sie an einem anderen Ort leichter wiederkommen. Übt man dagegen in verschiedenen Situationen, zu verschiedenen Zeiten, mit verschiedenen Menschen, dann bleibt das Gelernte stabiler. Der Kopf lernt dann nicht nur: In dieser Halle um diese Uhrzeit ist es sicher. Sondern: Ich komme damit zurecht.",
   "Deshalb hast du heute eine besondere Stall-Aufgabe. Nimm eine Stufe, die du schon gefestigt hast. Und mach sie unter etwas anderen Bedingungen. Zu einer anderen Uhrzeit. In einer anderen Halle oder auf dem Außenplatz. Mit einer anderen Begleitperson. Oder an einem Tag, an dem etwas mehr los ist. Nur eine Sache verändern, nicht alles auf einmal.",
   "Und dann trag ein: Was hast du befürchtet? Was ist passiert?",
   "Wahrscheinlich ist die Angst unter neuen Bedingungen etwas höher als gewohnt. Das ist völlig normal und kein Rückschritt. Es zeigt nur, dass dein Kopf gerade etwas Neues lernt.",
   "Bevor du zum Stall fährst, schau dir noch deine Kurve an. Du hast jetzt genug Werte, um einen Verlauf zu sehen. Was hat sich seit Woche eins verändert? Welche Stufen haben dich überrascht? Welches Werkzeug hilft dir am meisten?",
   "Und dann öffne deine Zwischen-Urkunde. Sie steht für vier Wochen, in denen du dich mit etwas auseinandergesetzt hast, das vielen Menschen schwerfällt. Du musst sie niemandem zeigen. Aber du darfst.",
   "Nächste Woche geht es darum, mehr zuzutrauen. In deinem Tempo."
  ],
  "audio": null,
  "uebung": {
   "titel": "Rückblick",
   "dauer": "8 Min.",
   "schritte": [
    "Schau dir deine Leiter an: Welche Stufen sind gefestigt?",
    "Welche Stufe willst du in einer neuen Umgebung wiederholen?",
    "Schreib auf, was dir bisher am meisten geholfen hat."
   ]
  },
  "stall": {
   "text": "Wiederhole eine gefestigte Stufe in neuer Umgebung: andere Uhrzeit, andere Halle oder anderer Weg.",
   "sattel": false,
   "begleitung": false,
   "hinweis": "Ab Stufe 5 nur mit Begleitperson."
  },
  "werkzeug": null,
  "eingabe": {
   "key": "rueckblick2",
   "label": "Was dir bisher am meisten geholfen hat",
   "placeholder": "",
   "multiline": true
  },
  "weg": null,
  "link": {
   "label": "Zur Mut-Leiter",
   "href": "/mutig-reiten/leiter"
  },
  "vergleich": false
 },
 {
  "n": 21,
  "ziel": "Richtig dosieren",
  "text": [
   "Willkommen in Woche fünf. In dieser Woche geht es darum, dir mehr zuzutrauen. Und damit das gut gelingt, schauen wir heute noch einmal genau auf die Frage: Wie groß sollte ein Schritt eigentlich sein?",
   "Stell dir drei Bereiche vor, wie drei Kreise ineinander.",
   "Ganz innen liegt die Komfortzone. Hier ist alles vertraut. Die Angst ist bei null, eins oder zwei. Hier fühlst du dich wohl, und das ist wichtig, denn hier tankst du Kraft. Aber hier lernst du wenig Neues.",
   "Ganz außen liegt die Panikzone. Hier schlägt dein Alarmsystem so laut, dass du kaum noch klar denken kannst. Die Angst ist bei acht, neun oder zehn. In diesem Bereich lernst du vor allem eins: dass es schrecklich war. Und das macht den nächsten Versuch schwerer.",
   "Dazwischen liegt die Lernzone. Die Angst ist spürbar, aber du kannst noch handeln, atmen, denken. Ungefähr bei vier, fünf oder sechs. Hier passiert das, worum es in diesem Programm geht: Du machst eine Erfahrung, die anders ausgeht, als dein Kopf befürchtet hat.",
   "Dieses Bild mit den drei Zonen ist eine Vereinfachung. Die Grenzen sind nicht scharf, und sie verschieben sich. An einem guten Tag ist deine Lernzone größer, an einem müden Tag kleiner. Genau deshalb ist dein Mut-Barometer so wichtig. Es zeigt dir, wo du heute stehst.",
   "Gerade in Woche fünf passiert es leicht, dass man zu viel will. Es läuft gut, man ist motiviert, und dann nimmt man sich gleich drei Stufen auf einmal vor. Manchmal klappt das. Manchmal landet man in der Panikzone und fühlt sich danach zurückgeworfen.",
   "Deshalb ist deine Übung heute eine Prüfung deiner Mut-Leiter. Geh jede Stufe durch, die noch vor dir liegt. Und frag dich bei jeder: Wenn ich mir vorstelle, das heute zu tun, wo würde ich auf dem Barometer landen?",
   "Liegt eine Stufe bei acht oder mehr, ist sie zu groß. Dann teil sie. Aus Trab in kurzen Strecken wird vielleicht erst: Zwei Trabtritte und wieder Schritt. Und dann: Eine lange Seite traben. In der App gibt es dafür einen eigenen Knopf.",
   "Wenn du heute am Stall bist, nimm dir die nächste Stufe vor, die in deiner Lernzone liegt. Nicht die größte, die du dir zutraust. Sondern die, bei der du sagen kannst: Das ist spürbar, aber machbar."
  ],
  "audio": null,
  "uebung": {
   "titel": "Leiter prüfen",
   "dauer": "8 Min.",
   "schritte": [
    "Spürbar, aber machbar: So soll sich die nächste Stufe anfühlen.",
    "Ist eine Stufe zu groß? Teil sie in zwei kleinere.",
    "Ist sie zu klein? Dann darfst du weitergehen."
   ]
  },
  "stall": {
   "text": "Mach die nächste Stufe deiner Leiter.",
   "sattel": false,
   "begleitung": false,
   "hinweis": null
  },
  "werkzeug": null,
  "eingabe": null,
  "weg": null,
  "link": {
   "label": "Zur Mut-Leiter",
   "href": "/mutig-reiten/leiter"
  },
  "vergleich": false
 },
 {
  "n": 22,
  "ziel": "Die dritte Angst planen",
  "text": [
   "Heute schreibst du deinen dritten Wenn-dann-Plan. Und damit hast du für deine drei größten Ängste einen Plan.",
   "Vielleicht hast du in den letzten Tagen schon gemerkt, ob deine ersten beiden Pläne funktionieren. Vielleicht hast du sie im Kopf durchgespielt, vielleicht mit deiner Reitlehrerin geübt, vielleicht sogar schon einmal gebraucht. Bevor du den dritten schreibst, schauen wir kurz zurück.",
   "Ein guter Wenn-dann-Plan hat drei Eigenschaften.",
   "Er ist konkret. Der Wenn-Teil beschreibt eine Situation, die du dir genau vorstellen kannst. Wenn mein Pferd an der Tür zur Halle stehen bleibt und nicht weitergeht. Nicht: Wenn mein Pferd blöd ist.",
   "Er ist kurz. Der Dann-Teil hat höchstens drei oder vier Schritte. Mehr kannst du dir in einem aufregenden Moment nicht merken.",
   "Und er ist machbar. Der Dann-Teil enthält nur Dinge, die du wirklich kannst und die zu deinem Pferd passen. Ein Plan, der eine Fähigkeit voraussetzt, die du noch nicht hast, macht eher Druck, als dass er hilft.",
   "Schau dir mit diesen drei Fragen deine ersten beiden Pläne noch einmal an. Wenn du etwas ändern möchtest, ändere es. Pläne dürfen besser werden.",
   "Und dann der dritte Plan. Welche Situation macht dir als Drittes am meisten Angst? Manche nehmen hier etwas, das gar nicht mit dem Pferd zu tun hat. Zum Beispiel: Wenn andere in der Halle zuschauen. Oder: Wenn ich merke, dass die Angst plötzlich ganz groß wird. Auch dafür kann man einen Plan machen.",
   "Ein Beispiel: Wenn ich merke, dass mein Herz rast und ich nicht mehr klar denken kann, dann pariere ich zum Schritt durch, atme fünfmal lang aus und sage meinen Mutmacher-Satz. Und dann entscheide ich, ob ich weitermache oder für heute aufhöre.",
   "Achte auf den letzten Satz in diesem Beispiel. Aufhören ist eine erlaubte Entscheidung. Ein Plan, der dir auch einen guten Ausstieg erlaubt, gibt oft mehr Sicherheit als einer, der dich zwingt durchzuhalten.",
   "Wenn du den Plan geschrieben hast, lies ihn dreimal laut. Dann spiel ihn als Mut-Film durch. Und wenn es zu deinem Plan passt, sprich ihn mit deiner Reitlehrerin durch.",
   "Ab heute hast du drei Pläne. Du findest sie alle zusammen unter deinen Werkzeugen. Schau sie dir ruhig vor jedem Stallbesuch einmal an."
  ],
  "audio": null,
  "uebung": {
   "titel": "Wenn-dann-Plan 3",
   "dauer": "10 Min.",
   "schritte": [
    "Welche Situation macht dir jetzt noch am meisten Angst?",
    "Schreib einen Plan: kurz und konkret.",
    "Spiel ihn im Kopf dreimal durch."
   ]
  },
  "stall": null,
  "werkzeug": "plan",
  "eingabe": {
   "key": "plan3",
   "label": "Dein Wenn-dann-Plan 3",
   "placeholder": "Wenn …, dann …",
   "multiline": true
  },
  "weg": null,
  "link": null,
  "vergleich": false
 },
 {
  "n": 23,
  "ziel": "Rückfälle einordnen",
  "text": [
   "Heute sprechen wir über etwas, das ganz sicher kommt, auch wenn wir es uns anders wünschen: schlechte Tage.",
   "Vielleicht hattest du schon einen. Einen Tag, an dem alles, was letzte Woche gut lief, plötzlich wieder schwer war. Die Angst war größer. Das Pferd unruhiger. Und im Kopf der Gedanke: Siehst du, es bringt alles nichts.",
   "Ich möchte dir heute sagen: Dieser Gedanke stimmt nicht.",
   "Die Angstforschung kennt das gut. Wenn Menschen eine Angst überwunden haben, kann sie unter bestimmten Umständen zurückkommen. Nach einer längeren Pause. In einer neuen Umgebung. Nach einem stressigen Tag. Oder nach einem kleinen Schreck. Das ist kein Zeichen dafür, dass das Gelernte verschwunden ist. Das alte und das neue Wissen sind beide noch da. An manchen Tagen ist das alte einfach lauter.",
   "Das Gute daran: Das neue Wissen lässt sich meistens schneller wieder hervorholen, als es beim ersten Mal gedauert hat. Du fängst nicht wieder bei null an.",
   "Was hilft an schlechten Tagen?",
   "Erstens: Die Stufe kleiner machen. Es ist völlig in Ordnung, an einem schweren Tag eine oder zwei Stufen zurückzugehen. Du verlierst dadurch nichts. Du bleibst in Bewegung, und das ist das Wichtigste.",
   "Zweitens: Auf die Werkzeuge zurückgreifen. Gerade an schlechten Tagen sind Atem-Reset, Lockerungs-Check und Mutmacher-Satz wichtiger als sonst.",
   "Drittens: Freundlich mit dir sein. Ein schlechter Tag ist kein Versagen. Er ist ein Tag, an dem es schwer war. Mehr nicht.",
   "Und viertens: Ehrlich eintragen. Auch ein schlechter Tag gehört auf dein Barometer. Wenn du später zurückschaust, wirst du sehen: Auf schlechte Tage folgen wieder bessere.",
   "Deine Übung heute: Schreib dir einen Plan für schlechte Tage. Er kann ganz einfach sein. Zum Beispiel: Wenn ich am Stall merke, dass heute ein schwerer Tag ist, dann mache ich nur mein Ritual und eine leichte Stufe. Und ich sage mir: Morgen ist ein neuer Versuch.",
   "Wenn du heute am Stall bist, wähl deine Stufe nach Gefühl. Auch eine niedrigere ist richtig.",
   "Und noch etwas. Wenn du merkst, dass die schlechten Tage über längere Zeit überwiegen, dass die Angst dich auch außerhalb des Stalls stark belastet, dann hol dir bitte zusätzlich Unterstützung. Wo du sie findest, steht in der App unter Hilfe."
  ],
  "audio": null,
  "uebung": {
   "titel": "Plan für schlechte Tage",
   "dauer": "8 Min.",
   "schritte": [
    "Woran merkst du, dass heute ein schlechter Tag ist?",
    "Was machst du dann? Zum Beispiel eine niedrigere Stufe oder nur Bodenarbeit.",
    "Welchen Satz sagst du dir dann?"
   ]
  },
  "stall": {
   "text": "Wähl die Stufe nach Gefühl, auch eine niedrigere ist richtig.",
   "sattel": false,
   "begleitung": false,
   "hinweis": null
  },
  "werkzeug": null,
  "eingabe": {
   "key": "schlechtetage",
   "label": "Dein Plan für schlechte Tage",
   "placeholder": "Wenn ich merke … dann …",
   "multiline": true
  },
  "weg": null,
  "link": null,
  "vergleich": false
 },
 {
  "n": 24,
  "ziel": "Mit Zuschauern umgehen",
  "text": [
   "Es gibt eine Angst beim Reiten, die gar nichts mit dem Pferd zu tun hat. Die Angst vor den Blicken der anderen.",
   "Vielleicht kennst du das. In der Halle reiten noch drei andere, alle scheinbar entspannt. Am Rand steht jemand und schaut zu. Und plötzlich denkst du weniger an dein Pferd und mehr daran, wie du gerade aussiehst. Ob man dir die Angst ansieht. Ob jemand denkt: Die kann das ja gar nicht.",
   "Gerade für Wiedereinsteigerinnen ist das oft ein großes Thema. Früher bist du alles geritten, und jetzt fühlst du dich wie eine Anfängerin. Und dann stehen da die Jugendlichen am Hallenrand, die scheinbar vor nichts Angst haben.",
   "Was passiert da in dir? Deine Aufmerksamkeit wandert. Weg von dem, was du gerade tust, hin zu dem, was andere denken könnten. Dein Kopf versucht, Gedanken zu lesen. Und weil er das nicht kann, malt er sich meistens das Schlimmste aus.",
   "Hier hilft das Werkzeug, das du in Woche zwei kennengelernt hast: dein Mutmacher-Satz. Selbstgespräch lenkt die Aufmerksamkeit zurück zu dem, was du tun kannst. Und genau das brauchst du, wenn dein Kopf bei den Zuschauern ist.",
   "Deine Übung heute: Schreib dir einen eigenen Mutmacher-Satz für volle Hallen. Er darf anders sein als dein normaler Satz. Zum Beispiel: Mein Pferd, meine Leiter, mein Tempo. Oder: Ich reite für mich. Oder einfach: Blick nach vorn, ich bin hier richtig.",
   "Und dann noch ein Gedanke, den du mitnehmen kannst. Die meisten Menschen am Hallenrand sind viel mehr mit sich selbst beschäftigt, als wir glauben. Mit ihrem eigenen Pferd, ihrer eigenen Stunde, ihren eigenen Sorgen. Und von denen, die zuschauen, haben erstaunlich viele selbst schon einmal Angst beim Reiten gehabt. Du bist damit nicht allein, auch wenn es sich so anfühlt.",
   "Wenn du heute am Stall bist, probier etwas Kleines: Reite oder führe für eine kurze Zeit, wenn etwas mehr los ist als sonst. Nicht zur vollsten Stunde der Woche, sondern einen kleinen Schritt mehr als gewohnt. Sag deinen Satz, bevor du in die Halle gehst. Und trag danach ein, was du befürchtet hast und was passiert ist.",
   "Vielleicht merkst du dabei: Niemand hat sich für dich interessiert. Oder jemand hat dir zugelächelt. Beides ist möglich. Und beides ist besser als das, was dein Kopf dir vorher erzählt hat."
  ],
  "audio": null,
  "uebung": {
   "titel": "Satz für volle Hallen",
   "dauer": "5 Min.",
   "schritte": [
    "Was denkst du, wenn andere zuschauen?",
    "Finde einen Satz, der dich zurück zu deinem Pferd holt.",
    "Beispiel: „Ich reite für uns zwei.“"
   ]
  },
  "stall": {
   "text": "Reite kurz, wenn mehr los ist als sonst.",
   "sattel": true,
   "begleitung": true,
   "hinweis": null
  },
  "werkzeug": null,
  "eingabe": {
   "key": "satzHalle",
   "label": "Dein Satz für volle Hallen",
   "placeholder": "Ich reite für uns zwei.",
   "multiline": false
  },
  "weg": null,
  "link": null,
  "vergleich": false
 },
 {
  "n": 25,
  "ziel": "Hingehen statt ausweichen",
  "text": [
   "Heute geht es um die Situation, die dir am meisten Angst macht. Die, die auf deiner Mut-Leiter weit oben steht. Vielleicht der Galopp. Vielleicht ein Ausritt. Vielleicht genau die Ecke, an der es damals passiert ist.",
   "Ich weiß, schon das Lesen dieses Satzes kann Herzklopfen machen. Atme einmal lang aus. Heute machst du nicht die ganze Situation. Heute machst du sie klein.",
   "Viele Menschen mit Angst haben eine Strategie, die sehr verständlich ist: Sie gehen der schwierigsten Situation aus dem Weg. Man reitet einfach nicht mehr in die Ecke. Man galoppiert einfach nicht mehr. Kurzfristig fühlt sich das gut an. Langfristig wird die Situation dadurch aber oft größer. Denn der Kopf lernt nie, dass es auch anders ausgehen könnte.",
   "Deshalb heißt die Idee heute: hingehen statt drumherum. Aber in einer kleinen, sicheren Form.",
   "Das kann ganz unterschiedlich aussehen. Wenn dir der Galopp Angst macht, ist die kleine Form vielleicht zwei Galoppsprünge an der Longe, mit deiner Reitlehrerin. Wenn es ein Ausritt ist, vielleicht zehn Minuten im Schritt auf einem bekannten Weg, mit einem ruhigen Begleitpferd und einer erfahrenen Begleitung. Wenn es die Ecke ist, vielleicht erst einmal dort vorbeiführen, zu Fuß.",
   "Wichtig ist, dass die kleine Form in deiner Lernzone liegt. Spürbar, aber machbar.",
   "Bevor du sie am Stall machst, machst du sie im Kopf. Mit einem Mut-Film. Setz dich ruhig hin, schließ die Augen und atme ein paarmal lang aus. Dann stell dir die kleine Form deiner Angst-Situation vor. So echt wie möglich. Die Geräusche, das Licht, dein Pferd. Und dann siehst du dich, wie du es tust. Mit deinem Ritual, deinem Atem, deinem Satz, deinem Wenn-dann-Plan im Hinterkopf. Lass den Film gut enden. Spiel ihn zwei- oder dreimal durch.",
   "Wenn du dich danach bereit fühlst und deine Stufe dran ist, mach die kleine Form am Stall. Mit Begleitung, mit Helm, mit allem, was dir Sicherheit gibt. Und vorher schreibst du auf: Was befürchtest du? Nachher: Was ist passiert?",
   "Fühlt es sich heute noch zu groß an, dann bleib beim Film. Oder geh eine Stufe darunter. Es gibt keinen Termin, an dem du das geschafft haben musst.",
   "Wenn du es aber machst, auch in der kleinsten Form, dann hast du heute etwas getan, das sehr viel Mut braucht."
  ],
  "audio": null,
  "uebung": {
   "titel": "Mut-Film für Stufe 9",
   "dauer": "5 Min.",
   "schritte": [
    "Schließ die Augen und erlebe Stufe 9 in kleiner Form.",
    "Sieh, hör und spür, wie du ruhig bleibst.",
    "Lass den Film gut enden."
   ]
  },
  "stall": {
   "text": "Stufe 8 oder 9 mit Begleitung.",
   "sattel": true,
   "begleitung": true,
   "hinweis": null
  },
  "werkzeug": "film",
  "eingabe": null,
  "weg": "L5",
  "link": null,
  "vergleich": false
 },
 {
  "n": 26,
  "ziel": "Fortschritt anerkennen",
  "text": [
   "Willkommen in Woche sechs, der letzten Woche des Programms. Und wir fangen sie mit einem Blick zurück an. Nicht auf das, was noch fehlt, sondern auf das, was du geschafft hast.",
   "Das klingt einfach. Es ist aber gar nicht so leicht. Denn unser Kopf hat die Neigung, Fortschritt schnell zu vergessen. Sobald etwas leichter geworden ist, kommt es uns normal vor. Und dann denken wir: Das war doch nie schwer. Und sehen nur noch die nächste Hürde.",
   "Deshalb schaust du heute ganz bewusst auf Beweise. Nicht auf Gefühle, sondern auf das, was du schwarz auf weiß in deiner App hast.",
   "Öffne zuerst deine Mut-Leiter. Erinnerst du dich, auf welcher Stufe du am ersten Tag gestartet bist? Die App zeigt es dir. Und dann schau, wo du jetzt stehst. Vielleicht sind es zwei Stufen. Vielleicht vier. Vielleicht eine. Jede davon hast du dir erarbeitet, mit Durchgängen, in denen du etwas getan hast, das dir Angst gemacht hat.",
   "Dann schau dir deine Kurve an. Such dir eine Stufe heraus, die du schon mehrmals gemacht hast. Wie groß war die Angst beim ersten Durchgang? Und wie groß beim letzten?",
   "Und schließlich: Lies dir einige deiner Einträge durch. Was hast du vor den Durchgängen befürchtet? Und was ist dann passiert? Zähl einmal, wie oft das Befürchtete eingetreten ist. Und wie oft es anders kam.",
   "Vielleicht bist du an einer Stelle überrascht. Vielleicht denkst du: Ach ja, das hatte ich ganz vergessen. Genau dafür ist dieser Tag da.",
   "Und vielleicht siehst du auch Stellen, an denen es nicht so lief, wie du gehofft hast. Stufen, die du noch nicht gefestigt hast. Tage, an denen die Angst groß war. Das gehört zu jedem echten Weg dazu. Einen Weg, auf dem es nur bergauf geht, gibt es beim Mut nicht.",
   "Deine Übung heute: Schreib drei Sätze auf. Der erste beginnt mit: Am Anfang konnte ich nicht … Der zweite mit: Heute kann ich … Und der dritte mit: Am meisten geholfen hat mir …",
   "Diese drei Sätze sind dein Beweis. Lies sie dir an einem schlechten Tag vor.",
   "Wenn du heute am Stall bist, mach eine Stufe, die du gefestigt hast. Ganz in Ruhe. Und spür einmal bewusst nach, wie sich das jetzt anfühlt, verglichen mit dem ersten Mal."
  ],
  "audio": null,
  "uebung": {
   "titel": "Was du geschafft hast",
   "dauer": "8 Min.",
   "schritte": [
    "Vergleiche deine Leiter von Tag 1 mit heute.",
    "Schau dir die Barometer-Werte an: Beweise statt Gefühle.",
    "Schreib drei Dinge auf, auf die du stolz bist."
   ]
  },
  "stall": {
   "text": "Mach deine aktuelle Stufe.",
   "sattel": false,
   "begleitung": false,
   "hinweis": null
  },
  "werkzeug": null,
  "eingabe": {
   "key": "stolz",
   "label": "Drei Dinge, auf die du stolz bist",
   "placeholder": "",
   "multiline": true
  },
  "weg": null,
  "link": {
   "label": "Zur Mut-Leiter",
   "href": "/mutig-reiten/leiter"
  },
  "vergleich": true
 },
 {
  "n": 27,
  "ziel": "Erfahrung festhalten",
  "text": [
   "Heute schreibst du einen Brief. An dich selbst. Genauer gesagt an die Reiterin, die du in sechs Monaten sein wirst.",
   "Warum ein Brief? In den letzten Wochen hast du viel über dich und deine Angst gelernt. Du weißt jetzt, was dir hilft und was nicht. Welcher Satz dich ruhiger macht. Welche Stufe dich überrascht hat. Wie sich ein schlechter Tag anfühlt und dass auf ihn ein besserer folgt.",
   "Dieses Wissen ist wertvoll. Aber es geht leicht verloren. In ein paar Monaten, im Alltag, vielleicht nach einer Pause oder einem neuen Schreck, erinnerst du dich vielleicht nicht mehr so genau daran. Der Brief hält es fest. In deinen eigenen Worten.",
   "Die App hebt den Brief für dich auf und zeigt ihn dir in sechs Monaten wieder. Nur dir. Er bleibt auf deinem Gerät.",
   "Wie schreibst du so einen Brief? Es gibt kein richtig oder falsch. Aber vielleicht helfen dir diese Fragen.",
   "Wie ging es dir am Anfang dieses Programms? Was hast du dich damals nicht getraut?",
   "Was hast du in diesen sechs Wochen geschafft? Welcher Moment war dir besonders wichtig?",
   "Was hat dir geholfen? Welches Werkzeug, welcher Satz, welche Person?",
   "Was möchtest du dir sagen, wenn es irgendwann wieder schwer wird? Wenn die Angst zurückkommt, an einem neuen Ort oder nach einem Schreck?",
   "Und was wünschst du dir für die Zeit danach? Für dich und für dein Pferd?",
   "Schreib so, wie du mit einer guten Freundin sprechen würdest. Ehrlich, warm, ohne zu beschönigen. Du darfst schreiben, was schwer war. Und du darfst stolz sein auf das, was gelungen ist.",
   "Manche schreiben eine halbe Seite. Manche nur fünf Sätze. Beides ist genug.",
   "Wenn dir das Schreiben schwerfällt, fang einfach mit einem Satz an: Liebe Reiterin in sechs Monaten, ich möchte dir sagen …",
   "Und wenn du fertig bist, lies den Brief einmal laut. Vielleicht merkst du dabei, wie viel du in diesen Wochen über dich gelernt hast.",
   "Heute gibt es keine Stall-Aufgabe. Nimm dir einfach die Zeit für deinen Brief. Und wenn du danach doch zum Stall fährst, dann einfach, um bei deinem Pferd zu sein."
  ],
  "audio": null,
  "uebung": {
   "titel": "Brief an dich",
   "dauer": "10 Min.",
   "schritte": [
    "Was hat dir in diesen Wochen geholfen?",
    "Was willst du dir in einem schweren Moment sagen?",
    "Die App zeigt dir den Brief in sechs Monaten wieder."
   ]
  },
  "stall": null,
  "werkzeug": null,
  "eingabe": {
   "key": "brief",
   "label": "Dein Brief an dich",
   "placeholder": "Liebe …,",
   "multiline": true
  },
  "weg": null,
  "link": null,
  "vergleich": false
 },
 {
  "n": 28,
  "ziel": "Einen Plan für danach haben",
  "text": [
   "In ein paar Tagen ist das Programm zu Ende. Aber dein Weg ist es nicht. Heute planst du, wie es weitergeht.",
   "Eine häufige Sorge an dieser Stelle ist: Was, wenn ohne das Programm alles wieder verschwindet? Wenn ich nicht mehr jeden Tag eine Einheit habe, fällt dann alles zurück?",
   "Die ehrliche Antwort: Ein bisschen Pflege braucht Mut schon. Aber nicht viel. Du musst nicht weitermachen wie in den letzten sechs Wochen. Es reicht, wenn du dranbleibst.",
   "Was heißt dranbleiben? Drei Dinge.",
   "Erstens: regelmäßig eine neue Stufe. Nicht jeden Tag, nicht jede Woche. Eine neue Stufe etwa alle zwei Wochen reicht völlig. Deine Mut-Leiter bleibt dafür in der App. Du kannst neue Stufen ergänzen, wenn du dein Ziel erreicht hast. Vielleicht wird aus dem Ausritt im Schritt irgendwann ein Ausritt mit Trab. Oder aus dem Galopp an der Longe ein Galopp in der Abteilung.",
   "Zweitens: Bekanntes in neuen Situationen. Du erinnerst dich: Mut wird besonders stabil, wenn du ihn in unterschiedlichen Situationen übst. Wenn du also etwas gut kannst, mach es ab und zu bewusst anders. Eine andere Halle, ein anderes Pferd, eine andere Uhrzeit, mit anderen Menschen. So bleibt das Gelernte beweglich.",
   "Drittens: deine Werkzeuge. Das Mut-Ritual vor dem Aufsteigen. Der Atem-Reset. Der Mutmacher-Satz. Die drei Wenn-dann-Pläne. Sie bleiben in der App und sind jederzeit abrufbar. Und sie wirken am besten, wenn du sie weiter benutzt, auch an guten Tagen.",
   "Deine Übung heute: Erstelle einen Plan für die nächsten drei Monate. Ganz einfach. Welche zwei, drei neuen Stufen möchtest du in dieser Zeit angehen? In welcher Reihenfolge? Und welche gefestigte Stufe möchtest du einmal unter neuen Bedingungen machen?",
   "Schreib dir für jede Stufe einen ungefähren Zeitraum dazu. Nicht als Pflicht, sondern als Orientierung.",
   "Wenn du den Riding Space nutzt, kannst du den Plan dort in deinen Trainingsplaner übernehmen. Dann taucht er dort auf, wo du ohnehin deine Reitstunden planst.",
   "Und plane auch die Möglichkeit ein, dass es mal schwer wird. Was machst du, wenn nach einer Pause die Angst zurückkommt? Vielleicht: das Programm in Teilen noch einmal durchgehen. Den Brief an dich lesen. Eine Stufe zurückgehen. Alles davon ist erlaubt und klug.",
   "Du hast jetzt alles, was du brauchst, um deinen Weg selbst weiterzugehen."
  ],
  "audio": null,
  "uebung": {
   "titel": "Dein 3-Monats-Plan",
   "dauer": "10 Min.",
   "schritte": [
    "Eine neue Stufe alle zwei Wochen reicht.",
    "Plane wechselnde Situationen: andere Tage, andere Orte.",
    "Trag deine Termine in den Riding Space ein, wenn du ihn nutzt."
   ]
  },
  "stall": null,
  "werkzeug": null,
  "eingabe": {
   "key": "plan3monate",
   "label": "Dein Plan für die nächsten 3 Monate",
   "placeholder": "Bis Ende … möchte ich …",
   "multiline": true
  },
  "weg": null,
  "link": null,
  "vergleich": false
 },
 {
  "n": 29,
  "ziel": "Veränderung messen",
  "text": [
   "Heute machst du noch einmal den Angst-Check. Denselben, mit dem du vor sechs Wochen angefangen hast.",
   "Vielleicht erinnerst du dich an diesen ersten Tag. Daran, wie es war, die Fragen zu beantworten. Wie groß die Angst war, wenn du an deine schwierigste Situation gedacht hast. Welche Gedanken dir damals durch den Kopf gingen. Was du dich nicht mehr getraut hast.",
   "Heute beantwortest du dieselben Fragen noch einmal. Ganz ehrlich, so wie es heute ist. Nicht so, wie du denkst, dass es nach sechs Wochen sein sollte.",
   "Danach zeigt dir die App beide Ergebnisse nebeneinander. Damals und heute.",
   "Bevor du anfängst, ein paar Worte dazu, wie du dieses Ergebnis lesen kannst.",
   "Der Angst-Check ist ein Werkzeug zur Selbsteinschätzung. Er ist kein wissenschaftlicher Test und keine Diagnose. Er zeigt dir, wie du deine Angst heute selbst erlebst, verglichen mit damals. Das ist wertvoll, weil es um dein eigenes Erleben geht. Aber er misst nicht alles.",
   "Vielleicht ist der Wert für deine schwierigste Situation deutlich gesunken. Dann darfst du dich darüber freuen. Vielleicht ist er nur ein wenig gesunken, aber du hast viele Stufen geschafft. Auch das ist ein echter Fortschritt. Manchmal bleibt die Angst ähnlich groß, aber man traut sich trotzdem mehr. Das ist sogar eins der wichtigsten Ziele dieses Programms: nicht keine Angst mehr zu haben, sondern trotz Angst gut handeln zu können.",
   "Und vielleicht hat sich auch dein Mut-Typ verändert. Oder dein Ziel. Auch das ist normal. Wer sich bewegt, verändert sich.",
   "Wenn bei der Frage nach den Warnzeichen heute etwas auftaucht, das dich auch außerhalb des Stalls belastet, nimm das bitte ernst. Die App zeigt dir dann, wo du Unterstützung findest. Das gilt auch, wenn es dir sonst gut geht.",
   "Wenn du heute am Stall bist, gönn dir etwas Schönes. Mach eine Stufe, die du gefestigt hast und die du inzwischen gern machst. Ganz ohne Ziel. Einfach, weil es dir und deinem Pferd guttut.",
   "Und dann schau dir deine beiden Ergebnisse in Ruhe an. Damals und heute. Lass sie einen Moment wirken, bevor du weiterklickst.",
   "Morgen ist der letzte Tag. Und der wird ein schöner."
  ],
  "audio": null,
  "uebung": {
   "titel": "Abschluss-Check",
   "dauer": "5 Min.",
   "schritte": [
    "Denk an die Situation, die dir am Anfang am meisten Angst gemacht hat.",
    "Wie stark ist die Angst heute? Trag es beim Barometer ein.",
    "Die App zeigt dir danach deinen Startwert zum Vergleich."
   ]
  },
  "stall": {
   "text": "Mach eine gefestigte Stufe und genieß sie.",
   "sattel": false,
   "begleitung": false,
   "hinweis": null
  },
  "werkzeug": null,
  "eingabe": null,
  "weg": null,
  "link": null,
  "vergleich": true
 },
 {
  "n": 30,
  "ziel": "Abschluss",
  "text": [
   "Du hast es geschafft. Dreißig Einheiten. Sechs Wochen. Heute ist dein letzter Tag in diesem Programm.",
   "Bevor wir zurückschauen, möchte ich dir danken. Dafür, dass du dir diese Zeit genommen hast. Dass du dich mit etwas beschäftigt hast, das wehtun kann. Dass du an guten Tagen weitergemacht hast und an schlechten auch. Das ist nicht selbstverständlich.",
   "Erinnerst du dich an den ersten Tag? Da habe ich dir gesagt: Angst beim Reiten ist kein Zeichen von Schwäche, sondern eine Schutzreaktion. Und Mut entsteht nicht durch einen großen Sprung, sondern durch viele kleine Schritte. Du hast in diesen Wochen genau das getan. Viele kleine Schritte.",
   "Du hast gelernt, wie dein Alarmsystem funktioniert und wie du es mit deinem Atem beruhigen kannst. Du hast deinen Blick nach vorn gerichtet und einen Satz gefunden, der dir Halt gibt. Du hast dein Pferd genauer kennengelernt. Du hast Pläne geschrieben für die Momente, die dir am meisten Angst machen. Und du hast immer wieder Dinge getan, die dir schwerfielen, und erlebt, dass es anders kam als befürchtet.",
   "Vielleicht bist du heute an deinem Ziel angekommen. Vielleicht bist du ein gutes Stück näher dran. Beides zählt. Mut ist kein Ort, an dem man ankommt und dann fertig ist. Mut ist eine Art, mit der Angst umzugehen. Und die hast du jetzt.",
   "Heute bekommst du deine Urkunde. Mit deinem Namen und dem Namen deines Pferdes. Sie steht für das, was du in diesen sechs Wochen getan hast. Und wenn du magst, kannst du deine Vorher-nachher-Karte teilen. Vielleicht macht sie einer anderen Reiterin Mut, die sich gerade nicht traut.",
   "Und jetzt noch eine letzte Aufgabe. Eine schöne. Feier diesen Tag mit deinem Pferd. Nicht mit einer großen Leistung, sondern mit Zeit. Putz es ausgiebig. Lass es grasen, wenn das möglich ist. Steh einfach eine Weile neben ihm und schau ihm zu. Dein Pferd hat diesen Weg mit dir zusammen gemacht.",
   "Die App bleibt für dich da. Deine Leiter, deine Werkzeuge, deine Pläne, dein Tagebuch. In den nächsten Wochen bekommst du ab und zu einen kleinen Impuls, damit das Gelernte lebendig bleibt. Und in sechs Monaten wartet dein Brief auf dich.",
   "Danke, dass du dabei warst. Und viel Freude bei allem, was jetzt kommt. Mit deinem Pferd, in deinem Tempo."
  ],
  "audio": null,
  "uebung": {
   "titel": "Mut-Feier",
   "dauer": "5 Min.",
   "schritte": [
    "Schau zurück: Wo hast du angefangen?",
    "Was hat dich am meisten überrascht?",
    "Du bekommst gleich deine Urkunde."
   ]
  },
  "stall": {
   "text": "Feier mit deinem Pferd: ausgiebig putzen, grasen lassen.",
   "sattel": false,
   "begleitung": false,
   "hinweis": null
  },
  "werkzeug": null,
  "eingabe": null,
  "weg": null,
  "link": null,
  "vergleich": false
 }
];

/** Zusatzlektionen „Für deinen Weg“ (L1–L5), erscheinen in der genannten Tageseinheit */
export const WEG_LESSONS: Record<string, WegLesson> = {
 "L1": {
  "tag": 2,
  "sturz": {
   "titel": "Den Sturz einordnen",
   "text": [
    "Diese Lektion ist freiwillig, und du kannst sie jederzeit abbrechen. Es geht nicht darum, den Sturz noch einmal zu erleben, sondern ihn kurz und sachlich einzuordnen.",
    "Schreib in drei Stichworten auf, was damals passiert ist. Dann zwei Spalten: Was war Zufall? Was lässt sich beeinflussen, zum Beispiel Ausrüstung, Pferd, Situation oder Müdigkeit?",
    "Viele merken dabei: Der Sturz war ein Ereignis, kein Urteil über dich als Reiterin. Wenn dich die Erinnerung stark aufwühlt, hör auf und schau unter Hilfe."
   ]
  },
  "wieder": {
   "titel": "Dein Körper heute",
   "text": [
    "Nach einer langen Pause ist der Körper ein anderer als früher. Das ist kein Problem, nur eine neue Ausgangslage.",
    "Prüfe drei Dinge ohne Wertung: Gleichgewicht (auf einem Bein stehen, 30 Sekunden je Seite), Beweglichkeit (im Sitzen das Becken kippen, die Schultern kreisen) und Kraft (zehn langsame Kniebeugen).",
    "Notiere, was leicht ging und was schwer. Passende Übungen für Sitz und Balance findest du im Rider Lab."
   ]
  },
  "geburt": {
   "titel": "Freigabe und Körper",
   "text": [
    "Nach einer Geburt braucht der Körper Zeit, um sich zurückzubilden: Bauchmuskeln, Beckenboden und Bänder. Wann du wieder reiten kannst, ist sehr individuell. Deshalb nennt diese App keine Wochenzahl.",
    "Bitte lass dich vor dem ersten Aufsteigen von deiner Hebamme, Frauenärztin oder einer Beckenboden-Physiotherapeutin untersuchen und freigeben.",
    "Warnzeichen, bei denen du pausierst und dich untersuchen lässt: ein Druckgefühl nach unten, ungewollter Urin- oder Stuhlverlust, Schmerzen im Becken oder Rücken. Bis zur Freigabe bleiben die Sattel-Stufen in deiner Leiter gesperrt; Boden- und Kopfarbeit kannst du ganz normal machen."
   ]
  }
 },
 "L2": {
  "tag": 7,
  "sturz": {
   "titel": "Ausrüstung prüfen",
   "text": [
    "Gute Ausrüstung schützt dich und gibt dir ein sicheres Gefühl.",
    "Helm: Nach einem Aufprall soll er ersetzt werden, auch wenn man außen nichts sieht. Er sitzt fest, ohne zu drücken.",
    "Sicherheitsweste: Sie kann dir zusätzlich ein gutes Gefühl geben. Lass dich zur Passform beraten.",
    "Steigbügel: Sicherheitssteigbügel geben den Fuß bei einem Sturz leichter frei.",
    "Sattel: Ein Sattel, der passt, ist für dein Pferd und für deinen Sitz wichtig. Im Zweifel frag deine Sattlerin."
   ]
  },
  "wieder": {
   "titel": "Das passende Pferd, die passende Reitschule",
   "text": [
    "Für den Wiedereinstieg lohnt es sich, wählerisch zu sein. Fragen fürs Probereiten:",
    "Wie ruhig und erfahren ist das Pferd? Darf ich es vorher putzen und führen? Gibt es Einzel- oder Kleingruppenstunden? Wie geht die Reitlehrerin mit Angst um? Darf ich auch eine Stunde nur am Boden machen?",
    "Ein gutes Gefühl beim ersten Kennenlernen ist ein wichtiger Hinweis."
   ]
  },
  "geburt": {
   "titel": "Sanft für Rumpf und Beckenboden",
   "text": [
    "Diese Lektion wird gerade von einer Hebamme beziehungsweise Beckenboden-Physiotherapeutin erstellt und erscheint, sobald sie fachlich geprüft ist.",
    "Bis dahin: Bitte frag deine Hebamme oder Physiotherapeutin nach Übungen, die zu deinem Stand der Rückbildung passen."
   ]
  }
 },
 "L3": {
  "tag": 12,
  "sturz": {
   "titel": "Die Sicht des Pferdes",
   "text": [
    "Warum ist es passiert? Häufige Gründe sind Schreck, Schmerz oder Überforderung, beim Pferd wie beim Menschen.",
    "Wenn dein Pferd seitdem anders ist, lass Tierärztin, Sattlerin oder Trainerin draufschauen. Manchmal steckt ein Grund dahinter, den man beheben kann. Das ist keine Schuldfrage, sondern ein Teil des Plans."
   ]
  },
  "wieder": {
   "titel": "Was sich verändert hat",
   "text": [
    "Vieles im Reitunterricht hat sich in den letzten Jahren verändert: mehr Blick auf das Pferd, mehr Erklärungen, mehr Bodenarbeit.",
    "Anfängerstunden sind keine Schande. Sie sind der schnellste Weg zurück zu einem sicheren Gefühl."
   ]
  },
  "geburt": {
   "titel": "Zeit und Alltag",
   "text": [
    "Mit Baby ist Zeit knapp. Kurze Einheiten sind völlig in Ordnung: zehn Minuten am Pferd zählen.",
    "Plane die Betreuung fest ein, damit du am Stall nicht geteilt bist. Eine Reitbeteiligung oder eine geteilte Versorgung kann den Druck nehmen, alles allein schaffen zu müssen."
   ]
  }
 },
 "L4": {
  "tag": 16,
  "sturz": {
   "titel": "Plan für genau diese Situation",
   "text": [
    "Dein erster Wenn-dann-Plan gilt genau der Situation, in der du gestürzt bist, in kleiner und sicherer Form.",
    "Wenn … (die Situation von damals), dann … (was du heute tust: ausatmen, aufrecht sitzen, Blick nach vorn, durchparieren). Je konkreter, desto besser."
   ]
  },
  "wieder": {
   "titel": "Lernen als Erwachsene",
   "text": [
    "Als Erwachsene lernt man anders als als Kind: mit mehr Nachdenken und mehr Vorsicht. Es dauert oft länger, und das ist normal.",
    "Gib dir die Zeit, die du einer Freundin auch geben würdest."
   ]
  },
  "geburt": {
   "titel": "„Was wird aus meinem Kind?“",
   "text": [
    "Diese Frage ist verständlich. Sie zeigt, wie viel Verantwortung du trägst.",
    "Hilfreich ist, das Risiko realistisch einzuschätzen: ruhiges Pferd, gute Ausrüstung, Begleitperson, kleine Schritte. Leg außerdem einen Notfallkontakt fest, der dein Kind betreuen kann, und trag ihn in dein Handy ein."
   ]
  }
 },
 "L5": {
  "tag": 25,
  "sturz": {
   "titel": "Zurück an den Ort",
   "text": [
    "Wenn du an den Ort zurückwillst, an dem es passiert ist, dann in drei Schritten: erst zu Fuß, dann mit Pferd geführt, dann geritten. Jeder Schritt darf mehrmals wiederholt werden.",
    "Nimm deine Begleitperson mit und plane jeden Schritt als eigene Stufe in deiner Leiter."
   ]
  },
  "wieder": {
   "titel": "Schluss mit „früher“",
   "text": [
    "„Früher bin ich doch auch …“ Dieser Vergleich ist unfair. Du vergleichst dich mit einer jüngeren Version, die einen anderen Alltag hatte.",
    "Vergleiche dich mit dir vor sechs Wochen. Das ist die ehrliche Messlatte."
   ]
  },
  "geburt": {
   "titel": "Müde Tage",
   "text": [
    "Schlafmangel macht Angst lauter und Reaktionen langsamer. An sehr müden Tagen ist eine Bodenstufe die bessere Wahl.",
    "Das ist kein Rückschritt, sondern gute Selbstfürsorge."
   ]
  }
 }
};

export function loadUnit(n: number): UnitContent | null {
  return UNITS.find((u) => u.n === n) ?? null;
}
