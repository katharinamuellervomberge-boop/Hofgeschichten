import path from "node:path"; import { execFileSync } from "node:child_process";
const TOOLS="/opt/npm-tools/node_modules";
const { build } = await import(path.join(TOOLS,"esbuild/lib/main.js"));
const entry=process.argv[2];
await build({ entryPoints:[entry], bundle:true, platform:"node", format:"cjs", outfile:"/home/claude/rlh/script.cjs", alias:{"@":"/home/claude/app/src","server-only":"/home/claude/rlh/empty.js"}, logLevel:"error"});
