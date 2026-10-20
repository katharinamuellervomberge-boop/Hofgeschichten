#!/usr/bin/env node
/**
 * Aufnahmen einsortieren und Manifest aktualisieren.
 *
 *   npm run voice:manifest
 *
 * Für Aufnahmen aus einem beliebigen KI-Stimmen-Dienst: Dateien als
 * <Kennung>.mp3 (Kennung aus voice/sprecherskript.csv) nach voice/inbox/
 * legen und diesen Befehl ausführen.
 */
import { loadScript, sortInbox, writeManifest } from "./voice-lib.mjs";

const entries = loadScript();
const moved = sortInbox(entries);
const { present, missing } = writeManifest(entries);
console.log(`${moved} Datei(en) einsortiert. Aufnahmen vorhanden: ${present}, fehlen noch: ${missing}.`);
if (missing) console.log("Fehlende Sätze nutzt die App weiter mit der Gerätestimme.");
