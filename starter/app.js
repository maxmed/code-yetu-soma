const modeSelect = document.getElementById("modeSelect");
const gradeSelect = document.getElementById("gradeSelect");
const learningAreaSelect = document.getElementById("learningAreaSelect");
const topicSelect = document.getElementById("topicSelect");
const topicCard = document.getElementById("topicCard");
const studentQuestionInput = document.getElementById("studentQuestionInput");
const sampleButton = document.getElementById("sampleButton");
const previewButton = document.getElementById("previewButton");
const coachButton = document.getElementById("coachButton");
const resetButton = document.getElementById("resetButton");
const contextBadge = document.getElementById("contextBadge");
const contextPreview = document.getElementById("contextPreview");
const coachStatus = document.getElementById("coachStatus");
const responseOutput = document.getElementById("responseOutput");
const planOutput = document.getElementById("planOutput");
const clearProgressButton = document.getElementById("clearProgressButton");
const followUpInput = document.getElementById("followUpInput");
const followUpButton = document.getElementById("followUpButton");
const followUpOutput = document.getElementById("followUpOutput");

const progressStorageKey = "soma-starter.plan-progress.v1";
let lastContext = null;
let lastResponse = null;

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

function getTopic() {
  return getSelected(topicPacks, topicSelect);
}

function renderSelects() {
  modeSelect.innerHTML = setupOptions.modes.map(optionHtml).join("");
  gradeSelect.innerHTML = setupOptions.grades.map(optionHtml).join("");
  learningAreaSelect.innerHTML = setupOptions.learningAreas.map(optionHtml).join("");
  topicSelect.innerHTML = topicPacks.map(optionHtml).join("");
}

function renderTopicCard() {
  const topic = getTopic();
  topicCard.innerHTML = `
    <h3>${escapeHtml(topic.topic)}</h3>
    <p>${escapeHtml(topic.summary)}</p>
    <p><strong>Example:</strong> ${escapeHtml(topic.examples[0])}</p>
  `;
  studentQuestionInput.placeholder = topic.sampleQuestion;
}

function buildContext() {
  const grade = getSelected(setupOptions.grades, gradeSelect);
  const learningArea = getSelected(setupOptions.learningAreas, learningAreaSelect);
  const topic = getTopic();

  return {
    mode: modeSelect.value,
    studentSetup: {
      grade: grade.grade,
      gradeBand: grade.gradeBand,
      ageRange: grade.ageRange,
      learningArea: learningArea.label,
      topic: topic.topic,
      studyNeed: topic.studyNeed
    },
    studentQuestion: studentQuestionInput.value.trim(),
    practiceAnswers: [],
    curriculumContext: {
      sourceLabel: "Simplified KICD/CBC-aligned sample snippets for workshop use",
      snippets: [
        {
          strand: topic.strand,
          topic: topic.topic,
          summary: topic.summary,
          vocabulary: topic.vocabulary,
          examples: topic.examples,
          misconceptions: topic.misconceptions
        }
      ],
      constraints: [
        "Use dummy/sample learner data only.",
        "Do not request or store names, schools, marks, phone numbers, or private records.",
        "Give study support, not official marks or diagnosis."
      ]
    },
    resources: topic.resources,
    followUpQuestion: ""
  };
}

function previewContext() {
  const context = buildContext();
  contextPreview.textContent = JSON.stringify(context, null, 2);
  contextBadge.textContent = "Preview ready";
}

function setCoachStatus(text, className = "") {
  coachStatus.textContent = text;
  coachStatus.className = `badge ${className}`.trim();
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

function normalizeResponse(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error("The proxy returned an unexpected response shape.");
  }

  return {
    studyFeedback: String(payload.studyFeedback || "").trim(),
    topicExplanation: String(payload.topicExplanation || "").trim(),
    examples: normalizeList(payload.examples),
    misconceptionHelp: normalizeList(payload.misconceptionHelp),
    recommendedResources: normalizeList(payload.recommendedResources),
    sevenDayPlan: normalizeList(payload.sevenDayPlan),
    followUpAnswer: String(payload.followUpAnswer || "").trim(),
    limitations: String(payload.limitations || "").trim()
  };
}

async function askStudyCoach(context) {
  const response = await fetch("/api/coach", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(context)
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("No /api/coach endpoint is running.");
    }
    if (response.status === 429) {
      throw new Error("The classroom coach quota or rate limit was reached.");
    }
    if (response.status === 400) {
      throw new Error("The request was blocked. Check for personal data.");
    }
    throw new Error(`The coach endpoint is unavailable. HTTP ${response.status}.`);
  }

  return normalizeResponse(await response.json());
}

function listHtml(items) {
  if (!items.length) {
    return "<li>No items returned.</li>";
  }
  return items.map(item => {
    if (typeof item === "string") {
      return `<li>${escapeHtml(item)}</li>`;
    }
    return `<li><strong>${escapeHtml(item.title || item.topic || item.day || "Item")}:</strong> ${escapeHtml(item.text || item.description || item.reason || item.task || item.activity || item.focus || "")}</li>`;
  }).join("");
}

function renderResponse(result) {
  responseOutput.className = "results";
  responseOutput.innerHTML = `
    <section class="summary">
      <h3>Study feedback</h3>
      <p>${escapeHtml(result.studyFeedback || "Study support returned by /api/coach.")}</p>
    </section>
    <article class="card">
      <h3>Topic explanation</h3>
      <p>${escapeHtml(result.topicExplanation || "No topic explanation returned.")}</p>
    </article>
    <article class="card">
      <h3>Examples</h3>
      <ul>${listHtml(result.examples)}</ul>
    </article>
    <article class="card">
      <h3>Misconception help</h3>
      <ul>${listHtml(result.misconceptionHelp)}</ul>
    </article>
    <article class="card">
      <h3>Resources</h3>
      <ul>${listHtml(result.recommendedResources)}</ul>
    </article>
    <article class="card">
      <h3>7-day plan</h3>
      <ul>${listHtml(result.sevenDayPlan)}</ul>
    </article>
    <p class="note">${escapeHtml(result.limitations || "Demo output is study support from dummy data. Check important learning decisions with a teacher or mentor.")}</p>
  `;
  renderPlan(result.sevenDayPlan);
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
    return { day: index + 1, title: `Day ${index + 1}`, task: item };
  }
  return {
    day: item.day || index + 1,
    title: item.title || `Day ${item.day || index + 1}`,
    task: item.task || item.activity || item.action || item.text || "Review the selected topic."
  };
}

function renderPlan(planItems) {
  if (!planItems.length) {
    planOutput.className = "empty-state";
    planOutput.textContent = "No study plan returned yet.";
    return;
  }

  const progress = readProgress();
  const items = planItems.map(normalizePlanItem);
  planOutput.className = "results";
  planOutput.innerHTML = items.map((item, index) => {
    const id = `${item.day}-${item.title}-${index}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return `
      <label class="plan-item">
        <input type="checkbox" data-plan-id="${escapeHtml(id)}"${progress[id] ? " checked" : ""}>
        <span><strong>Day ${escapeHtml(item.day)}: ${escapeHtml(item.title)}</strong>${escapeHtml(item.task)}</span>
      </label>
    `;
  }).join("");
}

async function callCoach() {
  const context = buildContext();
  if (!context.studentQuestion) {
    responseOutput.className = "empty-state error";
    responseOutput.textContent = "Type a study question before calling /api/coach.";
    return;
  }
  if (/\b(my name is|student name|school name|marks?|phone|email|address)\b/i.test(context.studentQuestion)) {
    responseOutput.className = "empty-state error";
    responseOutput.textContent = "Remove personal data before calling /api/coach.";
    return;
  }

  previewContext();
  lastContext = context;
  lastResponse = null;
  setCoachStatus("Calling", "working");
  coachButton.disabled = true;
  responseOutput.className = "empty-state";
  responseOutput.textContent = "Sending safe context to /api/coach...";

  try {
    const result = await askStudyCoach(context);
    lastResponse = result;
    setCoachStatus("Ready", "success");
    renderResponse(result);
  } catch (error) {
    setCoachStatus("Error", "danger");
    responseOutput.className = "empty-state error";
    responseOutput.textContent = error.message;
  } finally {
    coachButton.disabled = false;
  }
}

async function callFollowUp() {
  const question = followUpInput.value.trim();
  if (!question) {
    followUpOutput.className = "empty-state error";
    followUpOutput.textContent = "Type a follow-up question first.";
    return;
  }
  if (!lastContext) {
    followUpOutput.className = "empty-state error";
    followUpOutput.textContent = "Run the study helper first so the follow-up has topic context.";
    return;
  }
  if (/\b(my name is|student name|school name|marks?|phone|email|address)\b/i.test(question)) {
    followUpOutput.className = "empty-state error";
    followUpOutput.textContent = "Remove personal data before calling /api/coach.";
    return;
  }

  const context = { ...lastContext, mode: "follow-up", followUpQuestion: question };
  followUpButton.disabled = true;
  followUpOutput.className = "empty-state";
  followUpOutput.textContent = "Sending follow-up to /api/coach...";

  try {
    const result = await askStudyCoach(context);
    followUpOutput.className = "results";
    followUpOutput.innerHTML = `
      <section class="summary">
        <h3>Coach answer</h3>
        <p>${escapeHtml(result.followUpAnswer || result.topicExplanation || "No follow-up answer returned.")}</p>
      </section>
    `;
  } catch (error) {
    followUpOutput.className = "empty-state error";
    followUpOutput.textContent = error.message;
  } finally {
    followUpButton.disabled = false;
  }
}

function resetApp() {
  studentQuestionInput.value = "";
  followUpInput.value = "";
  lastContext = null;
  lastResponse = null;
  setCoachStatus("Not run");
  responseOutput.className = "empty-state";
  responseOutput.textContent = "Preview the context, then call the shared /api/coach endpoint.";
  followUpOutput.className = "empty-state";
  followUpOutput.textContent = "Run the study helper first, then ask a follow-up.";
  planOutput.className = "empty-state";
  planOutput.textContent = "A returned 7-day plan will appear here.";
  previewContext();
}

renderSelects();
renderTopicCard();
previewContext();

modeSelect.addEventListener("change", previewContext);
gradeSelect.addEventListener("change", previewContext);
learningAreaSelect.addEventListener("change", previewContext);
topicSelect.addEventListener("change", () => {
  renderTopicCard();
  previewContext();
});
studentQuestionInput.addEventListener("input", previewContext);
sampleButton.addEventListener("click", () => {
  studentQuestionInput.value = getTopic().sampleQuestion;
  previewContext();
});
previewButton.addEventListener("click", previewContext);
coachButton.addEventListener("click", callCoach);
resetButton.addEventListener("click", resetApp);
followUpButton.addEventListener("click", callFollowUp);
clearProgressButton.addEventListener("click", () => {
  localStorage.removeItem(progressStorageKey);
  if (lastResponse) {
    renderPlan(lastResponse.sevenDayPlan);
  }
});
planOutput.addEventListener("change", event => {
  const checkbox = event.target.closest("input[data-plan-id]");
  if (!checkbox) {
    return;
  }
  const progress = readProgress();
  progress[checkbox.dataset.planId] = checkbox.checked;
  writeProgress(progress);
});
