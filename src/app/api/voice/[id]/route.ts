import { readFile } from "node:fs/promises";
import path from "node:path";
import manifest from "@/content/voice-manifest.json";
import { canAccessAdventure } from "@/lib/entitlements/server";

/**
 * Aufnahmen zu Premium-Inhalten. Sie liegen NICHT in /public, sondern in
 * /private/voice/<abenteuer>/ und werden nur nach serverseitiger
 * Kaufprüfung ausgeliefert.
 */
export const dynamic = "force-dynamic";

const clips = (manifest as { clips: Record<string, string> }).clips;

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-z]{6,16}$/.test(id)) return new Response(null, { status: 404 });
  const access = clips[id];
  if (!access || access === "free") return new Response(null, { status: 404 });
  if (!(await canAccessAdventure(access))) return new Response(null, { status: 403 });

  try {
    const file = await readFile(path.join(process.cwd(), "private", "voice", access, `${id}.mp3`));
    return new Response(new Uint8Array(file), {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": String(file.byteLength),
        // nur im Browser dieses Geräts zwischenspeichern, nie in geteilten Caches
        "Cache-Control": "private, max-age=86400",
      },
    });
  } catch {
    return new Response(null, { status: 404 });
  }
}
