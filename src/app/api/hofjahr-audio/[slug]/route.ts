import { open, stat } from "node:fs/promises";
import path from "node:path";
import { loadPremiumContent } from "@/content/premium/registry.server";
import { releaseAccess } from "@/lib/entitlements/server";

/**
 * Hörspiele der Freitagsveröffentlichungen – nur für Mitglieder und erst ab `releaseAt`.
 * Die Dateien liegen in private/hofjahr-audio/<datei> (nie in /public).
 * Range-Anfragen + Stücke ≤ 3 MB (Vercel-Antwortgrenze, iPhone/iPad-Wiedergabe).
 */
export const dynamic = "force-dynamic";

const CHUNK = 3 * 1024 * 1024;

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = loadPremiumContent(slug);
  if (!content || content.kind !== "audio") return new Response(null, { status: 404 });
  const access = await releaseAccess(slug);
  if (!access || access.state !== "open") return new Response(null, { status: 403 });

  const full = path.join(process.cwd(), "private", "hofjahr-audio", content.file);
  let size: number;
  try {
    size = (await stat(full)).size;
  } catch {
    return new Response(null, { status: 404 });
  }
  const headers: Record<string, string> = {
    "Content-Type": "audio/mpeg",
    "Accept-Ranges": "bytes",
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
  }
  if (end - start + 1 > CHUNK) {
    end = start + CHUNK - 1;
    status = 206;
  }
  if (status === 206) headers["Content-Range"] = `bytes ${start}-${end}/${size}`;
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
