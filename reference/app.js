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
  agentSteps: document.getElementById("agentSteps"),
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
  lastResponse: null
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
    .map(item => `<li><strong>${escapeHtml(item.term)}:</strong> ${escapeHtml(item.meaning)}</li>`)
    .join("");
  const examplesHtml = topic.examples
    .map(example => `<li>${escapeHtml(example)}</li>`)
    .join("");

  elements.topicSummary.innerHTML = `
    <div>
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

function buildCoachContext(modeOverride, followUpQuestion = "") {
  const mode = modeOverride || getMode().id;
  const topic = getTopic();
  const practiceAnswers = getPracticeAnswers().filter(answer => answer.answered);

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
    debug: { includeLlmCall: true },
    followUpQuestion
  };
}

function buildPromptPreview(context) {
  return [
    "Soma Study Coach request to /api/coach",
    "",
    "Expected response JSON fields:",
    "mode, studyFeedback, topicExplanation, examples, likelyWeakAreas, misconceptionHelp, recommendedResources, sevenDayPlan, followUpAnswer, limitations",
    "",
    "Context:",
    JSON.stringify(context, null, 2)
  ].join("\n");
}

function updatePromptPreview() {
  const context = state.lastContext || buildCoachContext();
  elements.promptPreview.textContent = buildPromptPreview(context);
}

function renderAgentSteps(status = "ready") {
  const steps = [
    ["Observe", "Read selected mode, topic and student question."],
    ["Prepare context", "Attach the local topic pack, resources, optional practice answers and safety rules."],
    ["Ask coach endpoint", "POST the JSON context to /api/coach."],
    ["Parse response", "Validate the structured JSON fields before rendering."],
    ["Explain limits", "Show limitations and honest quota/network/safety errors."]
  ];

  elements.agentSteps.innerHTML = steps.map(([label, detail], index) => {
    const active = status === "running" && index === 2 ? " active" : "";
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
      <h3>6. Boundary check</h3>
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
  return `<li><strong>${escapeHtml(item.title || item.topic || item.day || "Item")}:</strong> ${escapeHtml(item.text || item.explanation || item.reason || item.description || item.task || item.activity || item.focus || "")}</li>`;
}

function renderCoachResponse(response) {
  elements.coachOutput.className = "coach-result";
  elements.coachOutput.innerHTML = `
    <section class="feedback-block">
      <h3>Study feedback</h3>
      <p>${escapeHtml(response.studyFeedback || "Study support returned by the proxy.")}</p>
    </section>
    <section class="feedback-block">
      <h3>Topic explanation</h3>
      <p>${escapeHtml(response.topicExplanation || "No topic explanation returned.")}</p>
    </section>
    <section class="feedback-block">
      <h3>Examples</h3>
      <ul>${renderArray(response.examples, "No examples returned.", renderTextItem)}</ul>
    </section>
    <section class="feedback-block">
      <h3>Misconception help</h3>
      <ul>${renderArray(response.misconceptionHelp, "No misconception help returned.", renderTextItem)}</ul>
    </section>
    <section class="feedback-block">
      <h3>Likely weak areas</h3>
      <div class="topic-list">
        ${response.likelyWeakAreas.length ? response.likelyWeakAreas.map(area => `<span class="topic-pill">${escapeHtml(area)}</span>`).join("") : `<span class="topic-pill success">None returned</span>`}
      </div>
    </section>
    <section class="feedback-block">
      <h3>Recommended resources</h3>
      <ul>${renderArray(response.recommendedResources, "No resources returned.", renderTextItem)}</ul>
    </section>
    <p class="limitation">${escapeHtml(response.limitations || "Demo output is study support from dummy data. Check important learning decisions with a teacher or mentor.")}</p>
  `;
  renderPlan(response.sevenDayPlan);
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
  renderAgentSteps("ready");
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

  const context = buildCoachContext();
  state.lastContext = context;
  state.lastResponse = null;
  setKeepLearningVisible(false);
  updatePromptPreview();
  setStatus("Calling proxy", "working");
  renderAgentSteps("running");
  elements.coachButton.disabled = true;
  elements.coachOutput.className = "empty-state";
  elements.coachOutput.textContent = "Sending safe topic context to /api/coach...";

  try {
    const response = await askStudyCoach(context);
    state.lastResponse = response;
    setStatus("Response ready", "success");
    renderAgentSteps("done");
    renderDebug(response.__debug);
    renderCoachResponse(response);
  } catch (error) {
    renderError(error);
  } finally {
    elements.coachButton.disabled = false;
  }
}

async function runFollowUp() {
  const question = elements.followUpInput.value.trim();
  if (!question) {
    elements.followUpOutput.className = "answer-box error-state";
    elements.followUpOutput.textContent = "Type a follow-up question first.";
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
  elements.followUpOutput.textContent = "Sending follow-up to /api/coach...";

  try {
    const response = await askStudyCoach(context);
    renderDebug(response.__debug);
    elements.followUpOutput.innerHTML = `
      <h3>Coach answer</h3>
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
  setKeepLearningVisible(false);
  setStatus("Ready");
  setDebugStatus("Ready");
  renderAgentSteps("ready");
  updatePracticeBadge();
  elements.coachOutput.className = "empty-state";
  elements.coachOutput.textContent = "Pick a topic and ask a question to get study help.";
  elements.planOutput.className = "empty-state";
  elements.planOutput.textContent = "A study plan will appear after your first question.";
  elements.followUpOutput.className = "answer-box";
  elements.followUpOutput.textContent = "";
  renderDebug(null);
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
renderAgentSteps("ready");
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
