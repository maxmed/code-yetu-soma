const { buildCoachResult, hasPersonalData } = require("../lib/coach-core");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-1.5-flash";

async function callGemini(payload) {
  const topic = payload?.studentSetup?.topic || "the selected topic";
  const snippet = payload?.curriculumContext?.snippets?.[0] || {};
  const mode = payload.mode || "learn-topic";
  const question = mode === "follow-up" ? payload.followUpQuestion : payload.studentQuestion;

  const systemPrompt = `You are a Grade 7 Integrated Science study coach for Kenyan students (KICD/CBC curriculum).
Topic: ${topic}
Context: ${snippet.summary || "Use topic pack data."}
Vocabulary: ${(snippet.vocabulary || []).join(", ")}
Examples: ${(snippet.examples || []).join("; ")}
Misconceptions: ${JSON.stringify(snippet.misconceptions || [])}

Rules:
- Use simple language for 12-13 year olds
- Give local Kenyan examples when possible
- Never store or ask for personal data
- This is study support, not official marks or diagnosis`;

  const userPrompt = mode === "follow-up"
    ? `Follow-up question about ${topic}: ${question}`
    : `Student question: ${question}\n\nProvide: explanation, 2 examples, misconception help, and a 7-day study plan.`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            studyFeedback: { type: "string" },
            topicExplanation: { type: "string" },
            examples: { type: "array", items: { type: "string" } },
            misconceptionHelp: { type: "array", items: { type: "string" } },
            recommendedResources: { type: "array", items: { type: "object", properties: { title: { type: "string" }, reason: { type: "string" } } } },
            sevenDayPlan: { type: "array", items: { type: "object", properties: { day: { type: "integer" }, title: { type: "string" }, task: { type: "string" } } } },
            followUpAnswer: { type: "string" },
            limitations: { type: "string" }
          },
          required: ["studyFeedback", "topicExplanation", "examples", "limitations"]
        }
      }
    })
  });

  if (!response.ok) {
    const status = response.status;
    if (status === 429) throw { status: 429, message: "Gemini rate limit reached." };
    throw { status: 503, message: `Gemini error: ${status}` };
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw { status: 503, message: "Empty Gemini response." };

  const result = JSON.parse(text);
  result.limitations = result.limitations || "AI-generated study support. Check important learning decisions with a teacher.";
  return result;
}

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

  if (hasPersonalData(payload)) {
    sendJson(response, 400, {
      error: "The request was blocked because it may include personal data. Remove names, schools, marks, phone numbers or private records."
    });
    return;
  }

  if (!GEMINI_API_KEY) {
    const result = buildCoachResult(payload);
    sendJson(response, result.status, result.payload);
    return;
  }

  try {
    const result = await callGemini(payload);
    sendJson(response, 200, result);
  } catch (err) {
    const status = err.status || 503;
    sendJson(response, status, { error: err.message || "Coach endpoint error." });
  }
};
