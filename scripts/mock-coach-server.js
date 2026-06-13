const http = require("http");
const fs = require("fs");
const path = require("path");

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

function hasPersonalData(payload) {
  const enteredText = [
    payload.studentQuestion,
    payload.followUpQuestion,
    ...(Array.isArray(payload.practiceAnswers)
      ? payload.practiceAnswers.flatMap(answer => [answer.selectedAnswer, answer.question])
      : [])
  ].join(" ").toLowerCase();

  return [
    /\bmy name is\b/,
    /\bstudent name\b/,
    /\bschool name\b/,
    /\bphone\b/,
    /\bemail\b/,
    /\baddress\b/,
    /\b\d{2,}\s*(marks?|\/|out of)\s*\d{1,3}\b/,
    /\b\d{3,}[-\s]?\d{3,}\b/
  ].some(pattern => pattern.test(enteredText));
}

function listFromResources(resources) {
  if (!Array.isArray(resources) || resources.length === 0) {
    return [
      {
        title: "Topic review card",
        reason: "Use the local topic pack to write one question and one example."
      }
    ];
  }

  return resources.slice(0, 3).map(resource => ({
    title: resource.title || "Study resource",
    reason: resource.description || resource.type || "Recommended from the selected topic pack."
  }));
}

function topicFromPayload(payload) {
  return payload?.studentSetup?.topic || "the selected topic";
}

function makeCoachResponse(payload) {
  const mode = payload.mode || "learn-topic";
  const topic = topicFromPayload(payload);
  const snippet = payload?.curriculumContext?.snippets?.[0] || {};
  const examples = Array.isArray(snippet.examples) && snippet.examples.length
    ? snippet.examples.slice(0, 2)
    : [`Use a local example to explain ${topic}.`];
  const misconceptions = Array.isArray(snippet.misconceptions)
    ? snippet.misconceptions.map(item => {
      if (typeof item === "string") {
        return item;
      }
      return {
        topic,
        text: `${item.mistake || "Common mistake"} ${item.help || ""}`.trim()
      };
    })
    : [];

  if (mode === "follow-up") {
    return {
      mode,
      studyFeedback: "",
      topicExplanation: "",
      examples: [],
      likelyWeakAreas: [],
      misconceptionHelp: [],
      recommendedResources: [],
      sevenDayPlan: [],
      followUpAnswer: `For ${topic}, connect your follow-up to the topic pack and explain it with one local example.`,
      limitations: "Mock response for testing. Check important learning decisions with a teacher or mentor."
    };
  }

  return {
    mode,
    studyFeedback: `Good question about ${topic}. Start with the topic idea, then connect it to an everyday observation.`,
    topicExplanation: snippet.summary || `${topic} can be explained using the selected Grade 7 Integrated Science topic pack.`,
    examples,
    likelyWeakAreas: mode === "practice" || mode === "review-weak-areas"
      ? ["Check vocabulary and explain the reason for each answer."]
      : [],
    misconceptionHelp: misconceptions.length
      ? misconceptions
      : [`Do not memorize only the word. Explain why the example fits ${topic}.`],
    recommendedResources: listFromResources(payload.resources),
    sevenDayPlan: [
      { day: 1, title: "Read the topic pack", focus: topic, task: "Write the key idea in your own words." },
      { day: 2, title: "Practice examples", focus: topic, task: "Explain two local examples to a partner." },
      { day: 3, title: "Check misconceptions", focus: topic, task: "Write one common mistake and correct it." },
      { day: 4, title: "Make revision cards", focus: topic, task: "Create three question cards." },
      { day: 5, title: "Try practice", focus: topic, task: "Answer one practice question and explain your reasoning." },
      { day: 6, title: "Ask follow-up", focus: topic, task: "Ask one tutor question about a confusing point." },
      { day: 7, title: "Teach back", focus: topic, task: "Teach the topic to a friend in two minutes." }
    ],
    followUpAnswer: "",
    limitations: "This is study support from dummy workshop data, not official marks or diagnosis."
  };
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

  const triggerText = `${payload.studentQuestion || ""} ${payload.followUpQuestion || ""}`.toLowerCase();

  if (hasPersonalData(payload)) {
    sendJson(response, 400, {
      error: "The request was blocked because it may include personal data. Remove names, schools, marks, phone numbers or private records."
    });
    return;
  }

  if (triggerText.includes("quota-test")) {
    sendJson(response, 429, { error: "The classroom AI quota or rate limit was reached. Try again later or ask a mentor." });
    return;
  }

  if (triggerText.includes("network-test")) {
    sendJson(response, 503, { error: "The AI coach is temporarily unavailable. The app should show this honestly." });
    return;
  }

  sendJson(response, 200, makeCoachResponse(payload));
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
