import { open, stat } from "node:fs/promises";
import path from "node:path";
import { academyVideos } from "@/content/akademie/videos";
import { hasGrosseAkademie } from "@/lib/entitlements/server";

/**
 * Lernvideos der Großen Reitakademie – nur nach Freischaltung (Mitgliedschaft
 * oder Kauf). Unterstützt Range-Anfragen, damit Videos auf iPhone/iPad laufen.
 */
export const dynamic = "force-dynamic";

const TYPES: Record<string, string> = { mp4: "video/mp4", jpg: "image/jpeg" };
/** Vercel begrenzt Antworten auf ca. 4,5 MB – Videos werden in Stücken ausgeliefert */
const CHUNK = 3 * 1024 * 1024;

export async function GET(req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const m = /^([a-z0-9-]+)\.(mp4|jpg)$/.exec(file);
  if (!m || !academyVideos.some((v) => v.slug === m[1])) return new Response(null, { status: 404 });
  if (!(await hasGrosseAkademie())) return new Response(null, { status: 403 });

  const full = path.join(process.cwd(), "private", "akademie-video", file);
  let size: number;
  try {
    size = (await stat(full)).size;
  } catch {
    return new Response(null, { status: 404 });
  }
  const headers: Record<string, string> = {
    "Content-Type": TYPES[m[2]],
    "Accept-Ranges": "bytes",
    // nur im Browser dieses Geräts zwischenspeichern, nie in geteilten Caches
    "Cache-Control": "private, max-age=86400",
  };

  const range = /^bytes=(\d*)-(\d*)$/.exec(req.headers.get("range") ?? "");
  let start = 0;
  let end = size - 1;
  let status = 200;
  if (range) {
    if (range[1] === "" && range[2] !== "") {
      start = Math.max(0, size - Number(range[2]));
    } else {
      start = Number(range[1] || 0);
      if (range[2] !== "") end = Math.min(size - 1, Number(range[2]));
    }
    if (start > end || start >= size) return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}` } });
    status = 206;
    headers["Content-Range"] = `bytes ${start}-${end}/${size}`;
  }
  if (m[2] === "mp4" && end - start + 1 > CHUNK) {
    end = start + CHUNK - 1;
    status = 206;
    headers["Content-Range"] = `bytes ${start}-${end}/${size}`;
  }
  const length = end - start + 1;
  headers["Content-Length"] = String(length);
  const fh = await open(full, "r");
  try {
    const buf = new Uint8Array(length);
    await fh.read(buf, 0, length, start);
    return new Response(buf, { status, headers });
  } finally {
    await fh.close();
  }
}
