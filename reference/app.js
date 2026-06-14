const elements = {
  modeSelect: document.getElementById("modeSelect"),
  gradeSelect: document.getElementById("gradeSelect"),
  learningAreaSelect: document.getElementById("learningAreaSelect"),
  topicSelect: document.getElementById("topicSelect"),
  topicSummary: document.getElementById("topicSummary"),
  studentQuestionInput: document.getElementById("studentQuestionInput"),
  practiceForm: document.getElementById("practiceForm"),
  practiceBadge: document.getElementById("practiceBadge"),
  sampleQuestionButton: document.getElementById("sampleQuestionButton"),
  coachButton: document.getElementById("coachButton"),
  resetButton: document.getElementById("resetButton"),
  openDebugLabButton: document.getElementById("openDebugLabButton"),
  closeDebugLabButton: document.getElementById("closeDebugLabButton"),
  debugLabSection: document.getElementById("debugLabSection"),
  runLabButton: document.getElementById("runLabButton"),
  loadPromptButton: document.getElementById("loadPromptButton"),
  resetLabButton: document.getElementById("resetLabButton"),
  labModelInput: document.getElementById("labModelInput"),
  labTemperatureInput: document.getElementById("labTemperatureInput"),
  labMaxTokensInput: document.getElementById("labMaxTokensInput"),
  labSystemPromptInput: document.getElementById("labSystemPromptInput"),
  labUserPromptInput: document.getElementById("labUserPromptInput"),
  runSteps: document.getElementById("runSteps"),
  togglePromptButton: document.getElementById("togglePromptButton"),
  promptPreview: document.getElementById("promptPreview"),
  coachStatus: document.getElementById("coachStatus"),
  coachOutput: document.getElementById("coachOutput"),
  debugStatus: document.getElementById("debugStatus"),
  debugOutput: document.getElementById("debugOutput"),
  keepLearningSection: document.getElementById("keepLearningSection"),
  planOutput: document.getElementById("planOutput"),
  followUpInput: document.getElementById("followUpInput"),
  followUpButton: document.getElementById("followUpButton"),
  followUpOutput: document.getElementById("followUpOutput"),
  clearProgressButton: document.getElementById("clearProgressButton")
};

const progressStorageKey = "soma-study-coach.plan-progress.v2";

const state = {
  contextVisible: false,
  lastContext: null,
  lastResponse: null,
  lastDebug: null
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function optionHtml(option) {
  return `<option value="${escapeHtml(option.id)}">${escapeHtml(option.label || option.topic)}</option>`;
}

function getSelected(collection, selectElement) {
  return collection.find(item => item.id === selectElement.value) || collection[0];
}

function getMode() {
  return getSelected(setupOptions.modes, elements.modeSelect);
}

function getGrade() {
  return getSelected(setupOptions.grades, elements.gradeSelect);
}

function getLearningArea() {
  return getSelected(setupOptions.learningAreas, elements.learningAreaSelect);
}

function getTopic() {
  return getSelected(topicPacks, elements.topicSelect);
}

function renderSelects() {
  elements.modeSelect.innerHTML = setupOptions.modes.map(optionHtml).join("");
  elements.gradeSelect.innerHTML = setupOptions.grades.map(optionHtml).join("");
  elements.learningAreaSelect.innerHTML = setupOptions.learningAreas.map(optionHtml).join("");
  elements.topicSelect.innerHTML = topicPacks.map(optionHtml).join("");
}

function renderTopicSummary() {
  const topic = getTopic();
  const mode = getMode();
  const vocabHtml = topic.vocabulary
    .slice(0, 4)
    .map(item => `<li><strong>${escapeHtml(item.term)}</strong><span>${escapeHtml(item.meaning)}</span></li>`)
    .join("");
  const examplesHtml = topic.examples
    .slice(0, 3)
    .map(example => `<li>${escapeHtml(example)}</li>`)
    .join("");

  elements.topicSummary.innerHTML = `
    <div class="topic-summary-main">
      <p class="eyebrow">${escapeHtml(topic.strand)}</p>
      <h3>${escapeHtml(topic.topic)}</h3>
      <p>${escapeHtml(topic.summary)}</p>
      <p class="note"><strong>Mode:</strong> ${escapeHtml(mode.label)}. ${escapeHtml(mode.promptHelp)}</p>
    </div>
    <div>
      <h4>Vocabulary</h4>
      <ul>${vocabHtml}</ul>
    </div>
    <div>
      <h4>Examples</h4>
      <ul>${examplesHtml}</ul>
    </div>
  `;
}

function renderPractice() {
  const topic = getTopic();
  elements.practiceForm.innerHTML = topic.practiceQuestions.map((question, questionIndex) => {
    const options = question.options.map((option, optionIndex) => {
      const inputId = `${question.id}-${optionIndex}`;
      return `
        <label class="option" for="${escapeHtml(inputId)}">
          <input id="${escapeHtml(inputId)}" type="radio" name="${escapeHtml(question.id)}" value="${optionIndex}">
          <span>${escapeHtml(option)}</span>
        </label>
      `;
    }).join("");

    return `
      <article class="question-card">
        <h3>${questionIndex + 1}. ${escapeHtml(question.question)}</h3>
        <div class="options">${options}</div>
      </article>
    `;
  }).join("");
  updatePracticeBadge();
}

function getPracticeAnswers() {
  const topic = getTopic();
  return topic.practiceQuestions.map(question => {
    const selected = elements.practiceForm.querySelector(`input[name="${question.id}"]:checked`);
    const selectedIndex = selected ? Number(selected.value) : null;
    return {
      questionId: question.id,
      topic: topic.topic,
      question: question.question,
      selectedAnswer: selectedIndex === null ? "" : question.options[selectedIndex],
      correctAnswer: question.options[question.answerIndex],
      answered: selectedIndex !== null,
      correct: selectedIndex === question.answerIndex,
      feedback: question.feedback
    };
  });
}

function updatePracticeBadge() {
  const answers = getPracticeAnswers();
  const answered = answers.filter(answer => answer.answered).length;
  elements.practiceBadge.textContent = `${answered}/${answers.length} answered`;
  updatePromptPreview();
}

function getStudentSetup() {
  const grade = getGrade();
  const learningArea = getLearningArea();
  const topic = getTopic();

  return {
    grade: grade.grade,
    gradeBand: grade.gradeBand,
    ageRange: grade.ageRange,
    learningArea: learningArea.label,
    topic: topic.topic,
    studyNeed: topic.studyNeed
  };
}

function getLabOverrides() {
  const overrides = {};
  const model = elements.labModelInput.value.trim();
  const temperature = elements.labTemperatureInput.value.trim();
  const maxOutputTokens = elements.labMaxTokensInput.value.trim();
  const systemPrompt = elements.labSystemPromptInput.value.trim();
  const userPrompt = elements.labUserPromptInput.value.trim();

  if (model) {
    overrides.model = model;
  }
  if (temperature) {
    overrides.temperature = Number(temperature);
  }
  if (maxOutputTokens) {
    overrides.maxOutputTokens = Number(maxOutputTokens);
  }
  if (systemPrompt) {
    overrides.systemPrompt = systemPrompt;
  }
  if (userPrompt) {
    overrides.userPrompt = userPrompt;
  }

  return overrides;
}

function buildCoachContext(modeOverride, followUpQuestion = "", includeLabOverrides = false) {
  const mode = modeOverride || getMode().id;
  const topic = getTopic();
  const practiceAnswers = getPracticeAnswers().filter(answer => answer.answered);
  const debug = { includeLlmCall: true };
  const labOverrides = includeLabOverrides ? getLabOverrides() : {};

  if (Object.keys(labOverrides).length) {
    debug.lab = labOverrides;
  }

  return {
    mode,
    studentSetup: getStudentSetup(),
    studentQuestion: elements.studentQuestionInput.value.trim(),
    practiceAnswers,
    curriculumContext: {
      sourceLabel: "Simplified KICD/CBC-aligned sample snippets for workshop use",
      snippets: [
        {
          grade: topic.grade,
          gradeBand: topic.gradeBand,
          learningArea: topic.learningArea,
          strand: topic.strand,
          topic: topic.topic,
          summary: topic.summary,
          vocabulary: topic.vocabulary,
          examples: topic.examples,
          misconceptions: topic.misconceptions
        }
      ],
      constraints: [
        "Use only the provided dummy topic pack, resources and optional practice answers.",
        "Give study support, topic explanation, examples, misconception help, resources or a plan.",
        "Do not request names, school names, real marks, phone numbers, personal records or private data.",
        "Do not diagnose the learner or invent official marks/final grades.",
        "Keep language age-appropriate for Kenyan students aged 12-18.",
        "If unsure, say what should be checked with a teacher or mentor."
      ]
    },
    resources: topic.resources,
    debug,
    followUpQuestion
  };
}

function buildPromptPreview(context) {
  return [
    "Soma Study Coach request to /api/coach",
    "",
    "Expected response JSON fields:",
    "mode, studyFeedback, socraticPrompt, topicExplanation, examples, likelyWeakAreas, misconceptionHelp, recommendedResources, sevenDayPlan, followUpAnswer, limitations",
    "",
    "Context:",
    JSON.stringify(context, null, 2)
  ].join("\n");
}

function updatePromptPreview() {
  const context = state.lastContext || buildCoachContext();
  elements.promptPreview.textContent = buildPromptPreview(context);
}

function renderRunSteps(status = "ready") {
  const steps = [
    ["Input", "Read the topic, question and optional practice answers."],
    ["Context", "Attach the local topic pack, resources and safety rules."],
    ["Prompt", "Build tutor instructions on the server."],
    ["Model", "Use the configured model and bounded lab settings."],
    ["Request", "POST the safe JSON context to /api/coach."],
    ["Raw return", "Receive raw model or mock output."],
    ["Parsed", "Validate structured fields before rendering."],
    ["Rendered", "Turn the response into a learner-friendly lesson."],
    ["Safety", "Show limits, blocks, quota and network errors honestly."]
  ];

  elements.runSteps.innerHTML = steps.map(([label, detail], index) => {
    const active = status === "running" && (index === 4 || index === 5) ? " active" : "";
    const done = status === "done" ? " done" : "";
    return `<li class="${active}${done}"><strong>${label}</strong><span>${detail}</span></li>`;
  }).join("");
}

function setStatus(text, tone = "") {
  elements.coachStatus.textContent = text;
  elements.coachStatus.className = `badge ${tone}`.trim();
}

function setDebugStatus(text, tone = "") {
  elements.debugStatus.textContent = text;
  elements.debugStatus.className = `badge ${tone}`.trim();
}

function formatDebugValue(value) {
  if (value === null || value === undefined || value === "") {
    return "No data returned.";
  }
  if (typeof value === "string") {
    return value;
  }
  return JSON.stringify(value, null, 2);
}

function renderDebug(debug) {
  state.lastDebug = debug || null;
  if (!debug) {
    setDebugStatus("No debug data");
    elements.debugOutput.innerHTML = `
      <article class="debug-card">
        <h3>1. Safe context</h3>
        <p>What the browser sends to <code>/api/coach</code> after removing secrets and following the safety rules.</p>
        <pre>No debug data returned.</pre>
      </article>
      <article class="debug-card">
        <h3>2. Coach response</h3>
        <p>What the coach endpoint returns for the app to render.</p>
        <pre>No debug data returned.</pre>
      </article>
    `;
    return;
  }

  setDebugStatus(`${debug.provider || "coach"}: ${debug.model || "unknown"}`, "success");
  const labConfig = debug.labConfig && Object.keys(debug.labConfig).length
    ? debug.labConfig
    : "No lab overrides used for this request.";
  elements.debugOutput.innerHTML = `
    <article class="debug-card">
      <h3>1. Safe context sent by browser</h3>
      <p>The app sends this JSON to <code>/api/coach</code>. It should contain only the study question, topic pack, resources and safety rules.</p>
      <pre>${escapeHtml(formatDebugValue(debug.browserRequestPayload || debug.requestBody))}</pre>
    </article>
    <article class="debug-card">
      <h3>2. Prompt built on server</h3>
      <p>The server turns the safe context into instructions for the coach model. API keys stay server-side.</p>
      <pre>${escapeHtml(formatDebugValue(debug.prompts))}</pre>
    </article>
    <article class="debug-card">
      <h3>3. Provider request shape</h3>
      <p>The request body sent by the server. Provider keys stay server-side and never appear in URLs here.</p>
      <pre>${escapeHtml(formatDebugValue(debug.providerRequestBody || "Mock/demo mode does not call an external provider."))}</pre>
    </article>
    <article class="debug-card">
      <h3>4. Raw coach return</h3>
      <p>The raw text or JSON returned before the app formats it for the student.</p>
      <pre>${escapeHtml(formatDebugValue(debug.rawText || debug.rawResponse || debug.errorBody))}</pre>
    </article>
    <article class="debug-card">
      <h3>5. Parsed app response</h3>
      <p>The structured fields the app uses for feedback, examples, resources and the study plan.</p>
      <pre>${escapeHtml(formatDebugValue(debug.parsedResponse))}</pre>
    </article>
    <article class="debug-card">
      <h3>6. Lab settings</h3>
      <p>The safe model and prompt settings used by this run.</p>
      <pre>${escapeHtml(formatDebugValue(labConfig))}</pre>
    </article>
    <article class="debug-card">
      <h3>7. Boundary check</h3>
      <p>This confirms which endpoint/model handled the request and reminds students where the key lives.</p>
      <pre>${escapeHtml(formatDebugValue({
        endpoint: debug.endpoint,
        status: debug.status,
        timestamp: debug.timestamp,
        note: debug.note || "API keys are never shown in the browser."
      }))}</pre>
    </article>
  `;
}

function openDebugLab() {
  elements.debugLabSection.classList.remove("hidden");
  document.body.classList.add("debug-open");
  elements.openDebugLabButton.textContent = "Behind The Scenes open";
  updatePromptPreview();
  elements.closeDebugLabButton.focus();
}

function closeDebugLab() {
  elements.debugLabSection.classList.add("hidden");
  document.body.classList.remove("debug-open");
  elements.openDebugLabButton.textContent = "Behind The Scenes";
  elements.openDebugLabButton.focus();
}

function resetLabFields() {
  elements.labModelInput.value = "";
  elements.labTemperatureInput.value = "";
  elements.labMaxTokensInput.value = "";
  elements.labSystemPromptInput.value = "";
  elements.labUserPromptInput.value = "";
}

function loadLastPromptIntoLab() {
  if (!state.lastDebug?.prompts) {
    openDebugLab();
    return;
  }
  elements.labSystemPromptInput.value = state.lastDebug.prompts.systemPrompt || "";
  elements.labUserPromptInput.value = state.lastDebug.prompts.userPrompt || "";
}

function setKeepLearningVisible(visible) {
  elements.keepLearningSection.classList.toggle("hidden", !visible);
}

function normalizeList(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === "string" && value.trim()) {
    return [value.trim()];
  }
  return [];
}

function normalizeCoachResponse(payload, mode) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error("The coach endpoint returned an unexpected response shape.");
  }

  const normalized = {
    mode: String(payload.mode || mode || "").trim(),
    studyFeedback: String(payload.studyFeedback || "").trim(),
    socraticPrompt: String(payload.socraticPrompt || "").trim(),
    topicExplanation: String(payload.topicExplanation || "").trim(),
    examples: normalizeList(payload.examples),
    likelyWeakAreas: normalizeList(payload.likelyWeakAreas),
    misconceptionHelp: normalizeList(payload.misconceptionHelp),
    recommendedResources: normalizeList(payload.recommendedResources),
    sevenDayPlan: normalizeList(payload.sevenDayPlan),
    followUpAnswer: String(payload.followUpAnswer || "").trim(),
    limitations: String(payload.limitations || "").trim()
  };

  if (payload.__debug) {
    normalized.__debug = payload.__debug;
  }

  const hasMainResponse = Boolean(
    normalized.studyFeedback ||
    normalized.topicExplanation ||
    normalized.examples.length ||
    normalized.misconceptionHelp.length ||
    normalized.recommendedResources.length ||
    normalized.sevenDayPlan.length
  );

  if (mode === "follow-up" && !normalized.followUpAnswer) {
    throw new Error("The coach endpoint did not return followUpAnswer.");
  }

  if (mode !== "follow-up" && !hasMainResponse) {
    throw new Error("The coach endpoint returned JSON, but no study helper content was found.");
  }

  return normalized;
}

async function askStudyCoach(context) {
  const response = await fetch("/api/coach", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(context)
  });

  if (!response.ok) {
    let detail = "";
    try {
      const errorBody = await response.json();
      detail = errorBody.error || errorBody.message || "";
      if (errorBody.__debug) {
        renderDebug(errorBody.__debug);
      }
    } catch {
      if (response.status === 404) {
        detail = "No /api/coach endpoint is running for this page.";
      } else if (response.status === 429) {
        detail = "The classroom coach quota or rate limit was reached.";
      } else if (response.status === 400) {
        detail = "The request was blocked. Check that no personal data was included.";
      }
    }

    throw new Error(detail || `The coach endpoint is unavailable. Returned HTTP ${response.status}.`);
  }

  let payload;
  try {
    payload = await response.json();
  } catch {
    throw new Error("The coach endpoint responded, but the response was not valid JSON.");
  }

  return normalizeCoachResponse(payload, context.mode);
}

function renderArray(items, emptyText, renderer) {
  if (!items.length) {
    return `<li class="muted">${escapeHtml(emptyText)}</li>`;
  }
  return items.map(renderer).join("");
}

function renderTextItem(item) {
  if (typeof item === "string") {
    return `<li>${escapeHtml(item)}</li>`;
  }
  return `<li><strong>${escapeHtml(item.title || item.topic || item.day || "Item")}:</strong> ${escapeHtml(textFromItem(item))}</li>`;
}

function textFromItem(item, fallback = "") {
  if (typeof item === "string") {
    return item;
  }
  if (!item || typeof item !== "object") {
    return fallback;
  }
  return item.text ||
    item.explanation ||
    item.reason ||
    item.description ||
    item.task ||
    item.activity ||
    item.focus ||
    item.title ||
    item.topic ||
    item.day ||
    fallback;
}

function renderCoachResponse(response) {
  elements.coachOutput.className = "chat-thread coach-result";
  const firstExample = textFromItem(response.examples[0], "No example returned.");
  const remainingExamples = response.examples.slice(1);
  const firstMisconception = textFromItem(response.misconceptionHelp[0], "No misconception help returned.");
  const socraticPrompt = response.socraticPrompt ||
    "Before Soma explains more, what do you already think is the strongest clue?";
  const studentQuestion = elements.studentQuestionInput.value.trim() || "My study question";
  elements.coachOutput.innerHTML = `
    <section class="chat-message learner-message">
      <div class="learner-avatar">You</div>
      <div>
        <strong>Your question</strong>
        <p>${escapeHtml(studentQuestion)}</p>
      </div>
    </section>
    <section class="chat-message soma-message">
      <div class="soma-avatar">S</div>
      <div>
        <strong>Soma</strong>
        <p>${escapeHtml(response.studyFeedback || "Study support returned by the proxy.")}</p>
      </div>
    </section>
    <section class="chat-message socratic-turn" aria-labelledby="socratic-title">
      <div class="soma-avatar">S</div>
      <div>
        <p class="eyebrow">Soma asks back</p>
        <h3 id="socratic-title">${escapeHtml(socraticPrompt)}</h3>
        <p>Reply below in Keep Learning. Soma will use the same safe <code>/api/coach</code> path to respond.</p>
      </div>
    </section>
    <details class="response-details" open>
      <summary>Answer details, examples, and resources</summary>
      <div class="lesson-grid">
      <section class="feedback-block wide-block">
        <h3>Topic explanation</h3>
        <p>${escapeHtml(response.topicExplanation || "No topic explanation returned.")}</p>
      </section>
      <section class="feedback-block">
        <h3>Example</h3>
        <p>${escapeHtml(firstExample)}</p>
        ${remainingExamples.length ? `<ul>${remainingExamples.map(renderTextItem).join("")}</ul>` : ""}
      </section>
      <section class="feedback-block">
        <h3>Common mistake</h3>
        <p>${escapeHtml(firstMisconception)}</p>
      </section>
      <section class="feedback-block">
        <h3>Try this</h3>
        <p>Answer one practice question or ask a follow-up using your own local example.</p>
        <div class="topic-list">
          ${response.likelyWeakAreas.length ? response.likelyWeakAreas.map(area => `<span class="topic-pill">${escapeHtml(area)}</span>`).join("") : `<span class="topic-pill success">Ready for a new question</span>`}
        </div>
      </section>
      <section class="feedback-block">
        <h3>Next resources</h3>
        <ul>${renderArray(response.recommendedResources, "No resources returned.", renderTextItem)}</ul>
      </section>
      </div>
    </details>
    <p class="limitation">${escapeHtml(response.limitations || "Demo output is study support from dummy data. Check important learning decisions with a teacher or mentor.")}</p>
  `;
  renderPlan(response.sevenDayPlan);
  elements.followUpInput.placeholder = "Type your answer to Soma's question";
  setKeepLearningVisible(true);
}

function readProgress() {
  try {
    return JSON.parse(localStorage.getItem(progressStorageKey) || "{}");
  } catch {
    return {};
  }
}

function writeProgress(progress) {
  localStorage.setItem(progressStorageKey, JSON.stringify(progress));
}

function normalizePlanItem(item, index) {
  if (typeof item === "string") {
    return { day: index + 1, title: `Day ${index + 1}`, task: item, focus: "Study practice" };
  }
  return {
    day: item.day || index + 1,
    title: item.title || `Day ${item.day || index + 1}`,
    task: item.task || item.activity || item.action || item.text || "Review the selected topic.",
    focus: item.focus || item.topic || item.goal || "Study practice"
  };
}

function planId(item, index) {
  return `${item.day}-${item.title}-${item.task}-${index}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function renderPlan(planItems) {
  if (!planItems.length) {
    elements.planOutput.className = "empty-state";
    elements.planOutput.textContent = "No study plan returned yet.";
    return;
  }

  const progress = readProgress();
  const normalized = planItems.map(normalizePlanItem);
  elements.planOutput.className = "plan-list";
  elements.planOutput.innerHTML = normalized.map((item, index) => {
    const id = planId(item, index);
    return `
      <label class="plan-item">
        <input type="checkbox" data-plan-id="${escapeHtml(id)}"${progress[id] ? " checked" : ""}>
        <span>
          <strong>Day ${escapeHtml(item.day)}: ${escapeHtml(item.title)}</strong>
          <small>${escapeHtml(item.focus)}</small>
          ${escapeHtml(item.task)}
        </span>
      </label>
    `;
  }).join("");
}

const personalDataPatterns = [
  /\b\d{2,}\s*(marks?|\/|out of)\s*\d{1,3}\b/,
  /\b(my name is|student name|school name|phone|email|address)\b/,
  /\b\d{3,}[-\s]?\d{3,}\b/
];

function hasPersonalData(text) {
  return personalDataPatterns.some(pattern => pattern.test(String(text || "").toLowerCase()));
}

function showPersonalDataError(target = elements.coachOutput) {
  target.className = target === elements.followUpOutput ? "answer-box error-state" : "error-state";
  target.innerHTML = `
    <h3>Remove personal data</h3>
    <p>Use a learning question only. Do not send names, school names, marks, phone numbers or private records.</p>
  `;
}

function validateQuestion() {
  if (!elements.studentQuestionInput.value.trim()) {
    elements.coachOutput.className = "error-state";
    elements.coachOutput.innerHTML = `
      <h3>Add a study question</h3>
      <p>Type a question about the selected topic before calling /api/coach.</p>
    `;
    return false;
  }

  if (hasPersonalData(elements.studentQuestionInput.value)) {
    showPersonalDataError();
    return false;
  }

  return true;
}

function renderError(error) {
  setStatus("Coach unavailable", "danger");
  renderRunSteps("ready");
  elements.coachOutput.className = "error-state";
  elements.coachOutput.innerHTML = `
    <h3>Study helper could not run</h3>
    <p>${escapeHtml(error.message)}</p>
    <p>No fallback answer was generated. Start the local /api/coach mock or proxy, then try again.</p>
  `;
}

async function runCoach() {
  if (!validateQuestion()) {
    return;
  }

  const context = buildCoachContext(undefined, "", false);
  state.lastContext = context;
  state.lastResponse = null;
  setKeepLearningVisible(false);
  updatePromptPreview();
  setStatus("Calling proxy", "working");
  renderRunSteps("running");
  elements.coachButton.disabled = true;
  elements.coachOutput.className = "empty-state";
  elements.coachOutput.textContent = "Preparing context -> Asking coach -> Turning answer into a lesson...";

  try {
    const response = await askStudyCoach(context);
    state.lastResponse = response;
    setStatus("Response ready", "success");
    renderRunSteps("done");
    renderDebug(response.__debug);
    renderCoachResponse(response);
  } catch (error) {
    renderError(error);
  } finally {
    elements.coachButton.disabled = false;
  }
}

async function runLab() {
  openDebugLab();
  if (!validateQuestion()) {
    return;
  }

  const originalResponse = state.lastResponse;
  const context = buildCoachContext(undefined, "", true);
  state.lastContext = context;
  updatePromptPreview();
  setStatus("Lab running", "working");
  setDebugStatus("Running lab", "working");
  renderRunSteps("running");
  elements.runLabButton.disabled = true;
  elements.debugOutput.innerHTML = `
    <article class="debug-card">
      <h3>Running</h3>
      <pre>Sending lab request to /api/coach...</pre>
    </article>
  `;

  try {
    const response = await askStudyCoach(context);
    state.lastResponse = response;
    setStatus("Lab response ready", "success");
    renderRunSteps("done");
    renderDebug(response.__debug);
    if (originalResponse) {
      elements.debugOutput.insertAdjacentHTML("beforeend", `
        <article class="debug-card">
          <h3>8. Compare with original</h3>
          <p>Use this to notice how safe prompt or model setting changes affected the lesson.</p>
          <pre>${escapeHtml(formatDebugValue({
            originalShortAnswer: originalResponse.studyFeedback,
            labShortAnswer: response.studyFeedback,
            originalExamples: originalResponse.examples,
            labExamples: response.examples
          }))}</pre>
        </article>
      `);
    }
    renderCoachResponse(response);
  } catch (error) {
    renderError(error);
  } finally {
    elements.runLabButton.disabled = false;
  }
}

async function runFollowUp() {
  const question = elements.followUpInput.value.trim();
  if (!question) {
    elements.followUpOutput.className = "answer-box error-state";
    elements.followUpOutput.textContent = "Type your answer first.";
    return;
  }
  if (!state.lastContext) {
    elements.followUpOutput.className = "answer-box error-state";
    elements.followUpOutput.textContent = "Run the study helper first so the follow-up has topic context.";
    return;
  }
  if (hasPersonalData(question)) {
    showPersonalDataError(elements.followUpOutput);
    return;
  }

  const context = { ...state.lastContext, mode: "follow-up", followUpQuestion: question };
  state.lastContext = context;
  updatePromptPreview();
  elements.followUpButton.disabled = true;
  elements.followUpOutput.className = "answer-box";
  elements.followUpOutput.textContent = "Sending your answer to /api/coach...";

  try {
    const response = await askStudyCoach(context);
    renderDebug(response.__debug);
    elements.followUpOutput.innerHTML = `
      <h3>Soma replies</h3>
      <p>${escapeHtml(response.followUpAnswer)}</p>
      <p class="limitation">${escapeHtml(response.limitations || "This answer is study support. Check important points with a teacher or mentor.")}</p>
    `;
  } catch (error) {
    elements.followUpOutput.className = "answer-box error-state";
    elements.followUpOutput.innerHTML = `<h3>Follow-up failed</h3><p>${escapeHtml(error.message)}</p>`;
  } finally {
    elements.followUpButton.disabled = false;
  }
}

function useSampleQuestion() {
  elements.studentQuestionInput.value = getTopic().sampleQuestion;
  updatePromptPreview();
}

function resetApp() {
  elements.studentQuestionInput.value = "";
  elements.followUpInput.value = "";
  elements.practiceForm.reset();
  state.lastContext = null;
  state.lastResponse = null;
  state.lastDebug = null;
  setKeepLearningVisible(false);
  setStatus("Ready");
  setDebugStatus("Ready");
  renderRunSteps("ready");
  updatePracticeBadge();
  elements.coachOutput.className = "chat-thread empty-state";
  elements.coachOutput.innerHTML = `
    <div class="chat-message soma-message">
      <div class="soma-avatar">S</div>
      <div>
        <strong>Soma</strong>
        <p>Pick a topic and ask one learning question. I will answer briefly, then ask one question back.</p>
      </div>
    </div>
  `;
  elements.planOutput.className = "empty-state";
  elements.planOutput.textContent = "A study plan will appear after your first question.";
  elements.followUpOutput.className = "answer-box";
  elements.followUpOutput.textContent = "";
  renderDebug(null);
  resetLabFields();
}

function updateTopicFlow() {
  renderTopicSummary();
  renderPractice();
  elements.studentQuestionInput.placeholder = getTopic().sampleQuestion;
  state.lastContext = null;
  state.lastResponse = null;
  setKeepLearningVisible(false);
  updatePromptPreview();
}

renderSelects();
renderTopicSummary();
renderPractice();
renderRunSteps("ready");
setKeepLearningVisible(false);
updatePromptPreview();

elements.modeSelect.addEventListener("change", updateTopicFlow);
elements.gradeSelect.addEventListener("change", updatePromptPreview);
elements.learningAreaSelect.addEventListener("change", updatePromptPreview);
elements.topicSelect.addEventListener("change", updateTopicFlow);
elements.studentQuestionInput.addEventListener("input", updatePromptPreview);
elements.practiceForm.addEventListener("change", updatePracticeBadge);
elements.sampleQuestionButton.addEventListener("click", useSampleQuestion);
elements.coachButton.addEventListener("click", runCoach);
elements.resetButton.addEventListener("click", resetApp);
elements.openDebugLabButton.addEventListener("click", openDebugLab);
elements.closeDebugLabButton.addEventListener("click", closeDebugLab);
elements.runLabButton.addEventListener("click", runLab);
elements.loadPromptButton.addEventListener("click", loadLastPromptIntoLab);
elements.resetLabButton.addEventListener("click", resetLabFields);
elements.followUpButton.addEventListener("click", runFollowUp);
elements.togglePromptButton.addEventListener("click", () => {
  state.contextVisible = !state.contextVisible;
  elements.promptPreview.classList.toggle("hidden", !state.contextVisible);
  elements.togglePromptButton.textContent = state.contextVisible ? "Hide context" : "Show context";
});
elements.clearProgressButton.addEventListener("click", () => {
  localStorage.removeItem(progressStorageKey);
  if (state.lastResponse) {
    renderPlan(state.lastResponse.sevenDayPlan);
  }
});
elements.planOutput.addEventListener("change", event => {
  const checkbox = event.target.closest("input[data-plan-id]");
  if (!checkbox) {
    return;
  }
  const progress = readProgress();
  progress[checkbox.dataset.planId] = checkbox.checked;
  writeProgress(progress);
});
