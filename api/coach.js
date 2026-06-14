const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";

const generationConfig = {
  temperature: 0.7,
  maxOutputTokens: 4096,
  responseMimeType: "application/json",
  responseSchema: {
    type: "object",
    properties: {
      studyFeedback: { type: "string" },
      socraticPrompt: { type: "string" },
      topicExplanation: { type: "string" },
      examples: { type: "array", items: { type: "string" } },
      likelyWeakAreas: { type: "array", items: { type: "string" } },
      misconceptionHelp: { type: "array", items: { type: "string" } },
      recommendedResources: { type: "array", items: { type: "object", properties: { title: { type: "string" }, reason: { type: "string" } } } },
      sevenDayPlan: { type: "array", items: { type: "object", properties: { day: { type: "integer" }, title: { type: "string" }, task: { type: "string" } } } },
      followUpAnswer: { type: "string" },
      limitations: { type: "string" }
    },
    required: ["studyFeedback", "socraticPrompt", "topicExplanation", "examples", "limitations"]
  }
};

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
    /\b(my|our)\s+(school|teacher|class|grade|marks?|score)\b/,
    /\b(at|from)\s+[a-z][a-z\s'.-]{2,}\s+school\b/,
    /\bphone\b/,
    /\bemail\b/,
    /\baddress\b/,
    /\b\d{2,}\s*(marks?|\/|out of)\s*\d{1,3}\b/,
    /\b(i|we)\s+(got|scored|received|earned)\s+\d{1,3}\s*(marks?|points?|%|percent)?\b/,
    /\b(scored|got|received|earned)\s+\d{1,3}\s*marks?\b/,
    /\b\d{1,3}\s*marks?\b/,
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

function makeSocraticPrompt(payload, topic) {
  const question = String(payload.studentQuestion || "").toLowerCase();

  if (question.includes("growth")) {
    return "You said growth means getting bigger. Can something look bigger without actually growing as a living thing?";
  }
  if (question.includes("digestion") || question.includes("nutrition")) {
    return "What do you think happens to food before cells can use its nutrients?";
  }
  if (question.includes("light") || question.includes("plant")) {
    return "What do you think light helps a plant make, and what evidence would show that?";
  }

  return `Before Soma explains more, what do you already think is the strongest clue about ${topic}?`;
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
      socraticPrompt: "",
      topicExplanation: "",
      examples: [],
      likelyWeakAreas: [],
      misconceptionHelp: [],
      recommendedResources: [],
      sevenDayPlan: [],
      followUpAnswer: `Good thinking. For ${topic}, connect your reply to the topic pack and explain it with one local example before moving to the next step.`,
      limitations: "Mock response for testing. Check important learning decisions with a teacher or mentor."
    };
  }

  return {
    mode,
    studyFeedback: `Good question about ${topic}. Start with the topic idea, then connect it to an everyday observation.`,
    socraticPrompt: makeSocraticPrompt(payload, topic),
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

function buildCoachResult(payload) {
  const triggerText = `${payload.studentQuestion || ""} ${payload.followUpQuestion || ""}`.toLowerCase();

  if (hasPersonalData(payload)) {
    return {
      status: 400,
      payload: {
        error: "The request was blocked because it may include personal data. Remove names, schools, marks, phone numbers or private records."
      }
    };
  }

  if (triggerText.includes("quota-test")) {
    return {
      status: 429,
      payload: { error: "The classroom coach quota or rate limit was reached. Try again later or ask a mentor." }
    };
  }

  if (triggerText.includes("network-test")) {
    return {
      status: 503,
      payload: { error: "The demo coach endpoint is temporarily unavailable. The app should show this honestly." }
    };
  }

  return {
    status: 200,
    payload: makeCoachResponse(payload)
  };
}

function wantsDebug(payload) {
  return Boolean(payload?.debug?.includeLlmCall);
}

function getLabConfig(payload) {
  const lab = payload?.debug?.lab;
  const config = {};
  if (!lab || typeof lab !== "object" || Array.isArray(lab)) {
    return config;
  }

  if (typeof lab.model === "string" && /^[a-zA-Z0-9._:-]{3,80}$/.test(lab.model.trim())) {
    config.model = lab.model.trim();
  }
  if (Number.isFinite(lab.temperature)) {
    config.temperature = Math.max(0, Math.min(2, Number(lab.temperature)));
  }
  if (Number.isFinite(lab.maxOutputTokens)) {
    config.maxOutputTokens = Math.max(256, Math.min(8192, Math.round(Number(lab.maxOutputTokens))));
  }
  if (typeof lab.systemPrompt === "string" && lab.systemPrompt.trim()) {
    config.systemPrompt = lab.systemPrompt.trim().slice(0, 4000);
  }
  if (typeof lab.userPrompt === "string" && lab.userPrompt.trim()) {
    config.userPrompt = lab.userPrompt.trim().slice(0, 2000);
  }

  return config;
}

function debugSnapshot(value) {
  if (value === null || value === undefined) {
    return value;
  }
  try {
    return JSON.parse(JSON.stringify(value));
  } catch {
    return String(value);
  }
}

function studentDebugPayload(payload) {
  const snapshot = debugSnapshot(payload);
  if (snapshot && typeof snapshot === "object" && !Array.isArray(snapshot)) {
    delete snapshot.debug;
  }
  return snapshot;
}

async function readProviderError(response) {
  try {
    return await response.json();
  } catch {
    return {};
  }
}

function providerErrorMessage(status, errorBody) {
  const providerMessage = String(errorBody?.error?.message || "");
  if (status === 429) {
    if (/limit:\s*0/i.test(providerMessage)) {
      return `Gemini quota is not available for ${GEMINI_MODEL}. Check the Google AI Studio project quota or billing.`;
    }
    return "Gemini quota or rate limit was reached. Try again later or check the project quota.";
  }
  if (status === 400 || status === 403) {
    return "Gemini rejected the request. Check that the API key, project, model, and API access are configured correctly.";
  }
  return `Gemini provider error: HTTP ${status}.`;
}

function normalizeList(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }
  if (typeof value === "string" && value.trim()) {
    return [value.trim()];
  }
  return [];
}

function normalizeGeminiResponse(result, mode, topic) {
  const normalized = {
    mode: String(result.mode || mode || "").trim(),
    studyFeedback: String(result.studyFeedback || "").trim(),
    socraticPrompt: String(result.socraticPrompt || "").trim(),
    topicExplanation: String(result.topicExplanation || "").trim(),
    examples: normalizeList(result.examples),
    likelyWeakAreas: normalizeList(result.likelyWeakAreas),
    misconceptionHelp: normalizeList(result.misconceptionHelp),
    recommendedResources: normalizeList(result.recommendedResources),
    sevenDayPlan: normalizeList(result.sevenDayPlan),
    followUpAnswer: String(result.followUpAnswer || "").trim(),
    limitations: String(result.limitations || "").trim()
  };

  if (mode === "follow-up") {
    normalized.followUpAnswer = normalized.followUpAnswer ||
      normalized.topicExplanation ||
      normalized.studyFeedback ||
      `For ${topic}, connect the follow-up question to the topic pack and explain it with one local example.`;
    normalized.limitations = normalized.limitations ||
      "AI-generated study support. Check important learning decisions with a teacher.";
    return normalized;
  }

  normalized.studyFeedback = normalized.studyFeedback ||
    `Good question about ${topic}. Start with the key idea, then connect it to an everyday example.`;
  normalized.socraticPrompt = normalized.socraticPrompt ||
    `Before Soma explains more, what do you already think is the strongest clue about ${topic}?`;
  normalized.topicExplanation = normalized.topicExplanation ||
    `${topic} can be explained using the selected Grade 7 Integrated Science topic pack.`;
  normalized.examples = normalized.examples.length
    ? normalized.examples
    : [`Use a local example to explain ${topic}.`];
  normalized.misconceptionHelp = normalized.misconceptionHelp.length
    ? normalized.misconceptionHelp
    : [`Do not memorize only the word. Explain why the example fits ${topic}.`];
  normalized.recommendedResources = normalized.recommendedResources.length
    ? normalized.recommendedResources
    : [{ title: "Topic review card", reason: "Use the local topic pack to write one question and one example." }];
  normalized.sevenDayPlan = normalized.sevenDayPlan.length
    ? normalized.sevenDayPlan
    : [
      { day: 1, title: "Read the topic pack", task: "Write the key idea in your own words." },
      { day: 2, title: "Practice examples", task: "Explain two local examples to a partner." },
      { day: 3, title: "Check misconceptions", task: "Write one common mistake and correct it." }
    ];
  normalized.limitations = normalized.limitations ||
    "AI-generated study support. Check important learning decisions with a teacher.";

  return normalized;
}

function formatVocabulary(vocabulary) {
  if (!Array.isArray(vocabulary)) {
    return "";
  }
  return vocabulary.map(item => {
    if (typeof item === "string") {
      return item;
    }
    return [item.term, item.meaning].filter(Boolean).join(": ");
  }).filter(Boolean).join(", ");
}

function parseGeminiJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) {
      throw new Error("No JSON object found.");
    }
    return JSON.parse(match[0]);
  }
}

function buildGeminiCall(payload) {
  const labConfig = getLabConfig(payload);
  const topic = payload?.studentSetup?.topic || "the selected topic";
  const snippet = payload?.curriculumContext?.snippets?.[0] || {};
  const mode = payload.mode || "learn-topic";
  const question = mode === "follow-up" ? payload.followUpQuestion : payload.studentQuestion;

  const defaultSystemPrompt = `You are a Grade 7 Integrated Science study coach for Kenyan students (KICD/CBC curriculum).
Topic: ${topic}
Context: ${snippet.summary || "Use topic pack data."}
Vocabulary: ${formatVocabulary(snippet.vocabulary)}
Examples: ${(snippet.examples || []).join("; ")}
Misconceptions: ${JSON.stringify(snippet.misconceptions || [])}

Rules:
- Use simple language for 12-13 year olds
- Give local Kenyan examples when possible
- Never store or ask for personal data
- This is study support, not official marks or diagnosis`;

  const defaultUserPrompt = mode === "follow-up"
    ? `Follow-up question about ${topic}: ${question}`
    : `Student question: ${question}\n\nProvide: short feedback, exactly one bounded Socratic follow-up question in socraticPrompt, explanation, 2 examples, misconception help, and a 7-day study plan.`;
  const systemPrompt = labConfig.systemPrompt || defaultSystemPrompt;
  const userPrompt = labConfig.userPrompt || defaultUserPrompt;
  const callGenerationConfig = {
    ...generationConfig,
    temperature: labConfig.temperature ?? generationConfig.temperature,
    maxOutputTokens: labConfig.maxOutputTokens ?? generationConfig.maxOutputTokens
  };

  return {
    model: labConfig.model || GEMINI_MODEL,
    endpoint: `https://generativelanguage.googleapis.com/v1beta/models/${labConfig.model || GEMINI_MODEL}:generateContent`,
    labConfig,
    prompts: { systemPrompt, userPrompt },
    requestBody: {
      contents: [{ parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }],
      generationConfig: callGenerationConfig
    }
  };
}

function buildGeminiDebug(call, payload, rawResponse = null, rawText = "", parsedResponse = null, errorBody = null, status = null) {
  return {
    provider: "gemini",
    model: call.model,
    endpoint: call.endpoint,
    status,
    labConfig: debugSnapshot(call.labConfig || {}),
    timestamp: new Date().toISOString(),
    note: "Provider key is held server-side and is never included in this debug view.",
    prompts: debugSnapshot(call.prompts),
    browserRequestPayload: studentDebugPayload(payload),
    providerRequestBody: debugSnapshot(call.requestBody),
    requestBody: studentDebugPayload(payload),
    rawText,
    rawResponse: debugSnapshot(rawResponse),
    parsedResponse: debugSnapshot(parsedResponse),
    errorBody: debugSnapshot(errorBody)
  };
}

function buildMockDebug(payload, result) {
  const labConfig = getLabConfig(payload);
  const topic = payload?.studentSetup?.topic || "the selected topic";
  const question = payload.mode === "follow-up" ? payload.followUpQuestion : payload.studentQuestion;
  const defaultSystemPrompt = "Mock/demo mode uses local deterministic workshop logic instead of a provider prompt.";
  const defaultUserPrompt = payload.mode === "follow-up"
    ? `Follow-up question about ${topic}: ${question || ""}`
    : `Student question: ${question || ""}`;

  return {
    provider: "mock",
    model: labConfig.model || "deterministic-demo",
    endpoint: "/api/coach",
    status: result.status,
    labConfig,
    timestamp: new Date().toISOString(),
    note: "No provider request was made because the server is in mock/demo mode.",
    prompts: {
      systemPrompt: labConfig.systemPrompt || defaultSystemPrompt,
      userPrompt: labConfig.userPrompt || defaultUserPrompt
    },
    browserRequestPayload: studentDebugPayload(payload),
    providerRequestBody: null,
    requestBody: studentDebugPayload(payload),
    rawText: JSON.stringify(result.payload, null, 2),
    rawResponse: debugSnapshot(result.payload),
    parsedResponse: debugSnapshot(result.payload),
    errorBody: result.status >= 400 ? debugSnapshot(result.payload) : null
  };
}

async function callGemini(payload) {
  const call = buildGeminiCall(payload);
  const includeDebug = wantsDebug(payload);

  const response = await fetch(`${call.endpoint}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(call.requestBody)
  });

  if (!response.ok) {
    const status = response.status;
    const errorBody = await readProviderError(response);
    throw {
      status: status === 429 ? 429 : 503,
      message: providerErrorMessage(status, errorBody),
      debug: includeDebug ? buildGeminiDebug(call, payload, null, "", null, errorBody, status) : undefined
    };
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw {
      status: 503,
      message: "Empty Gemini response.",
      debug: includeDebug ? buildGeminiDebug(call, payload, data, "", null, null, response.status) : undefined
    };
  }

  try {
    const parsed = parseGeminiJson(text);
    const normalized = normalizeGeminiResponse(parsed, payload.mode || "learn-topic", payload?.studentSetup?.topic || "the selected topic");
    if (includeDebug) {
      normalized.__debug = buildGeminiDebug(call, payload, data, text, normalized, null, response.status);
    }
    return normalized;
  } catch {
    throw {
      status: 503,
      message: "Gemini returned a malformed response.",
      debug: includeDebug ? buildGeminiDebug(call, payload, data, text, null, null, response.status) : undefined
    };
  }
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
    if (wantsDebug(payload)) {
      result.payload.__debug = buildMockDebug(payload, result);
    }
    sendJson(response, result.status, result.payload);
    return;
  }

  try {
    const result = await callGemini(payload);
    sendJson(response, 200, result);
  } catch (err) {
    const status = err.status || 503;
    const errorPayload = { error: err.message || "Coach endpoint error." };
    if (err.debug) {
      errorPayload.__debug = err.debug;
    }
    sendJson(response, status, errorPayload);
  }
};
