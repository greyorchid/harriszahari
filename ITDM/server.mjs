import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runDiagnosis } from "./lib/engine.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const envFile = path.join(root, ".env");
if (fs.existsSync(envFile)) for (const line of fs.readFileSync(envFile, "utf8").split(/\r?\n/)) {
  const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
  if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
}
const publicDir = path.join(root, "public");
const runsDir = path.join(root, "runs");
const port = Number(process.env.PORT || 8787);
const host = process.env.HOST || "127.0.0.1";
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".svg": "image/svg+xml", ".json": "application/json; charset=utf-8" };

function send(res, status, body, type = "application/json; charset=utf-8") {
  res.writeHead(status, { "content-type": type, "cache-control": "no-store", "x-content-type-options": "nosniff" });
  res.end(Buffer.isBuffer(body) || typeof body === "string" ? body : JSON.stringify(body));
}
async function body(req) {
  const chunks = []; let size = 0;
  for await (const chunk of req) { size += chunk.length; if (size > 1_000_000) throw new Error("Request too large."); chunks.push(chunk); }
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    if (req.method === "GET" && url.pathname === "/api/health") return send(res, 200, { ok: true, liveEnabled: process.env.ITDM_ALLOW_LIVE === "true" && Boolean(process.env.OPENAI_API_KEY), model: process.env.OPENAI_MODEL || "gpt-5.4" });
    if (req.method === "POST" && url.pathname === "/api/diagnose") {
      const input = await body(req); const mode = input.mode === "live" ? "live" : "demo";
      const result = await runDiagnosis(mode);
      fs.writeFileSync(path.join(runsDir, `${result.runId}.json`), `${JSON.stringify(result, null, 2)}\n`);
      return send(res, 200, result);
    }
    if (req.method === "POST" && url.pathname === "/api/feedback") {
      const input = await body(req);
      const record = { feedbackId: crypto.randomUUID(), recordedAt: new Date().toISOString(), runId: String(input.runId || ""), role: String(input.role || ""), ratings: input.ratings || {}, comments: String(input.comments || "").slice(0, 5000), consent: Boolean(input.consent) };
      if (!record.consent) return send(res, 400, { error: "Feedback consent is required." });
      fs.writeFileSync(path.join(runsDir, `feedback-${record.feedbackId}.json`), `${JSON.stringify(record, null, 2)}\n`);
      return send(res, 201, record);
    }
    if (req.method !== "GET") return send(res, 405, { error: "Method not allowed." });
    const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
    const file = path.resolve(publicDir, `.${pathname}`);
    if (!file.startsWith(publicDir + path.sep) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) return send(res, 404, "Not found", "text/plain; charset=utf-8");
    return send(res, 200, fs.readFileSync(file), types[path.extname(file)] || "application/octet-stream");
  } catch (error) { return send(res, 500, { error: error.message }); }
});
server.listen(port, host, () => console.log(`ITDM Product MVP running at http://${host}:${port}`));
