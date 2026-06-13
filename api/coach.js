const { buildCoachResult } = require("../lib/coach-core");

function sendJson(response, status, payload) {
  if (typeof response.status === "function" && typeof response.json === "function") {
    response.setHeader("Cache-Control", "no-store");
    response.status(status).json(payload);
    return;
  }

  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(payload));
}

function readBody(request) {
  if (request.body && typeof request.body === "object") {
    return Promise.resolve(request.body);
  }

  if (typeof request.body === "string") {
    return Promise.resolve(JSON.parse(request.body || "{}"));
  }

  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", chunk => {
      body += chunk;
      if (body.length > 1_000_000) {
        request.destroy();
        reject(new Error("Request body too large."));
      }
    });
    request.on("end", () => resolve(JSON.parse(body || "{}")));
    request.on("error", reject);
  });
}

module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    sendJson(response, 405, { error: "Use POST /api/coach." });
    return;
  }

  let payload;
  try {
    payload = await readBody(request);
  } catch {
    sendJson(response, 400, { error: "Request body must be valid JSON." });
    return;
  }

  const result = buildCoachResult(payload);
  sendJson(response, result.status, result.payload);
};
