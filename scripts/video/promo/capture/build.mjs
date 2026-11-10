import path from "node:path";
const TOOLS="/opt/npm-tools/node_modules";
const { build } = await import(path.join(TOOLS,"esbuild/lib/main.js"));
const W="/home/claude/rlh/web";
await build({ entryPoints:[W+"/app.tsx"], bundle:true, format:"iife", outfile:W+"/out/app.js", jsx:"automatic", alias:{"@":"/home/claude/app/src","server-only":"/home/claude/rlh/empty.js","next/link":W+"/nextlink.tsx","next/navigation":W+"/nav.ts"}, nodePaths:[TOOLS], loader:{".module.css":"local-css",".css":"css",".svg":"file",".png":"file",".jpg":"file",".mp3":"file",".woff2":"file"}, define:{"process.env.NODE_ENV":'"development"'}, logLevel:"warning", banner:{js:"globalThis.process=globalThis.process||{env:{}};"}});
