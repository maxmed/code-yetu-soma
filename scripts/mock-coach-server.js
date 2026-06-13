const http = require("http");
const fs = require("fs");
const path = require("path");
const { buildCoachResult } = require("../lib/coach-core");

const rootDir = path.resolve(__dirname, "..");
const portArgIndex = process.argv.indexOf("--port");
const port = Number(
  process.env.PORT ||
  process.env.SOMA_TEST_PORT ||
  (portArgIndex >= 0 ? process.argv[portArgIndex + 1] : 8787)
);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml"
};

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(payload));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", chunk => {
      body += chunk;
      if (body.length > 1_000_000) {
        request.destroy();
        reject(new Error("Request body too large."));
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

async function handleCoach(request, response) {
  if (request.method !== "POST") {
    sendJson(response, 405, { error: "Use POST /api/coach." });
    return;
  }

  let payload;
  try {
    payload = JSON.parse(await readBody(request) || "{}");
  } catch {
    sendJson(response, 400, { error: "Request body must be valid JSON." });
    return;
  }

  const result = buildCoachResult(payload);
  sendJson(response, result.status, result.payload);
}

function serveStatic(request, response) {
  const parsedUrl = new URL(request.url, `http://127.0.0.1:${port}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  if (pathname === "/") {
    pathname = "/reference/index.html";
  }

  const filePath = path.normalize(path.join(rootDir, pathname));
  if (!filePath.startsWith(rootDir)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.stat(filePath, (statError, stat) => {
    if (statError || !stat.isFile()) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    const contentType = contentTypes[path.extname(filePath)] || "application/octet-stream";
    response.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "no-store"
    });
    fs.createReadStream(filePath).pipe(response);
  });
}

const server = http.createServer((request, response) => {
  if (request.url === "/api/coach") {
    handleCoach(request, response).catch(error => {
      sendJson(response, 500, { error: error.message || "Mock coach failed." });
    });
    return;
  }

  serveStatic(request, response);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Soma mock server running at http://127.0.0.1:${port}`);
});
