# Concept To Code Map

This page maps workshop concepts to exact project files, labs, and AI coding
prompts. Use it when you know the lesson or lab idea but need to find the exact
file to open or prompt to use.

Related navigation: [Workshop Course](./README.md), [6-Session
Runbook](./sessions/README.md), [Lesson Index](./lessons/README.md), and
[Workshop Labs](./labs/README.md).

## Folder Roles

| Location | Purpose | Use It When |
|---|---|---|
| [Session Runbook](./sessions/) | Session-by-session facilitator guide | Running the 6 workshop sessions |
| [Lesson Index](./lessons/) | Lecture material and deeper explanations | Teaching a concept or assigning self-study |
| [Student Guide](../student/README.md) ([Handout](../student/handout.md), [Project Cards](../student/project-cards.md), [Testing Guide](../student/testing-fast-feedback.md), [AI Prompts](../student/ai-coding-prompts.md)) | Student instructions and rescue prompts | Students need help, test examples, or project ideas |
| [Mentor Guide](../mentor/README.md) ([Rubric](../mentor/rubric.md), [Curriculum Notes](../mentor/curriculum-source.md)) | Review and assessment guidance | Facilitators need evaluation criteria |
| [reference/](../../reference/) ([index.html](../../reference/index.html), [app.js](../../reference/app.js), [data.js](../../reference/data.js)) | Polished public app implementation | Inspecting the full working code |
| [starter/](../../starter/) ([index.html](../../starter/index.html), [app.js](../../starter/app.js), [data.js](../../starter/data.js)) | Smaller workshop scaffold | Students need a simpler codebase to modify |

## Workshop Session Map

| Workshop Session | Deep Lessons | Main Code | Student Prompts |
|---|---|---|---|
| [Session 1: Why AI Matters](./sessions/01-ideation-ai-basics.md) | [Why AI Matters Now](./lessons/01-ai-history-and-future.md) | [Getting Started](../getting-started.md), [reference/index.html](../../reference/index.html), [starter/index.html](../../starter/index.html) | [Add Responsible AI Note](../student/ai-coding-prompts.md#add-responsible-ai-note) |
| [Session 2: Web App Scaffold](./sessions/02-web-app-scaffold.md) | [How Web Apps Work](./lessons/02-how-web-apps-work.md), [Soma Architecture](./lessons/03-soma-architecture.md), [Frontend Walkthrough](./lessons/04-frontend-walkthrough.md) | [starter/index.html](../../starter/index.html), [starter/app.js](../../starter/app.js), [scripts/mock-coach-server.js](../../scripts/mock-coach-server.js) | [Fix A JavaScript Error](../student/ai-coding-prompts.md#fix-a-javascript-error), [Make The UI Clearer](../student/ai-coding-prompts.md#make-the-ui-clearer) |
| [Session 3: Data And Intelligence](./sessions/03-data-intelligence.md) | [Data And Context](./lessons/05-data-and-context.md), [LLM Prompts](./lessons/06-llm-prompts.md), [Calling The LLM](./lessons/07-calling-the-llm.md) | [starter/data.js](../../starter/data.js), [starter/app.js](../../starter/app.js), [api/coach.js](../../api/coach.js) | [Create Dummy Data](../student/ai-coding-prompts.md#create-dummy-data), [Build The /api/coach Context](../student/ai-coding-prompts.md#build-the-apicoach-context) |
| [Session 4: Integrate AI Into UX](./sessions/04-integrate-ai-ux.md) | [Parsing And Rendering](./lessons/08-parsing-and-rendering.md), [Language And Swahili](./lessons/09-language-and-swahili.md) | [reference/app.js](../../reference/app.js), [reference/index.html](../../reference/index.html), [api/coach.js](../../api/coach.js) | [Response Not Rendering](../student/ai-coding-prompts.md#response-not-rendering), [Follow-Up Not Grounded](../student/ai-coding-prompts.md#follow-up-not-grounded) |
| [Session 5: Testing And Responsible AI](./sessions/05-testing-responsible-ai.md) | [Safety And Variability](./lessons/12-safety-and-variability.md), [Where LLMs Fit](./lessons/10-where-llms-fit.md) | [Student Testing Guide](../student/testing-fast-feedback.md), [tests/soma-student.spec.js](../../tests/soma-student.spec.js), [Safety Checklist](../api-safety-checklist.md), [Testing Guide](../testing-debugging.md) | [Add Test Cases](../student/ai-coding-prompts.md#add-test-cases), [Personal Data In Context](../student/ai-coding-prompts.md#personal-data-in-context) |
| [Session 6: Demo And Pitch](./sessions/06-demo-pitch.md) | [Build Your Own](./lessons/13-build-your-own.md) | [Rubric](../mentor/rubric.md), [Handout](../student/handout.md), [README](../../README.md) | [Add Responsible AI Note](../student/ai-coding-prompts.md#add-responsible-ai-note), [Generate A Project Plan](../student/ai-coding-prompts.md#generate-a-project-plan) |

## Concept To Code Map

| Concept | Read First | Find It In Code | Try This Lab |
|---|---|---|---|
| Browser app structure | [How Web Apps Work](./lessons/02-how-web-apps-work.md) | [starter/index.html](../../starter/index.html), [starter/style.css](../../starter/style.css), [starter/app.js](../../starter/app.js) | [Lab A](./labs/README.md#lab-a-change-one-ui-section-safely) |
| Public app versus scaffold | [Soma Architecture](./lessons/03-soma-architecture.md) | [starter/index.html](../../starter/index.html), [reference/index.html](../../reference/index.html), [mock-coach-server.js](../../scripts/mock-coach-server.js) | [Lab A](./labs/README.md#lab-a-change-one-ui-section-safely) |
| DOM IDs and event listeners | [Frontend Walkthrough](./lessons/04-frontend-walkthrough.md) | [starter/index.html](../../starter/index.html), [starter/app.js](../../starter/app.js), [reference/app.js](../../reference/app.js) | [Lab A](./labs/README.md#lab-a-change-one-ui-section-safely) |
| Topic packs and local data | [Data And Context](./lessons/05-data-and-context.md) | [starter/data.js](../../starter/data.js), [reference/data.js](../../reference/data.js) | [Lab B](./labs/README.md#lab-b-add-a-new-topic-pack) |
| `/api/coach` request context | [Data And Context](./lessons/05-data-and-context.md) | [reference/app.js](../../reference/app.js) `buildCoachContext()` | [Lab B](./labs/README.md#lab-b-add-a-new-topic-pack) |
| Local versus deployed AI path | [Soma Architecture](./lessons/03-soma-architecture.md) | [mock-coach-server.js](../../scripts/mock-coach-server.js), [api/coach.js](../../api/coach.js), [vercel.json](../../vercel.json) | [Lab D](./labs/README.md#lab-d-change-model-settings-and-observe-variability) |
| Prompt design | [LLM Prompts](./lessons/06-llm-prompts.md) | [api/coach.js](../../api/coach.js) `buildGeminiCall()` | [Lab C](./labs/README.md#lab-c-edit-a-tutor-prompt-and-compare-output) |
| Model settings | [Calling The LLM](./lessons/07-calling-the-llm.md) | [api/coach.js](../../api/coach.js), Debug Lab controls | [Lab D](./labs/README.md#lab-d-change-model-settings-and-observe-variability) |
| Response parsing | [Parsing And Rendering](./lessons/08-parsing-and-rendering.md) | [api/coach.js](../../api/coach.js) `parseGeminiJson()`, `normalizeGeminiResponse()` | [Lab F](./labs/README.md#lab-f-debug-a-bad-json-response) |
| Rendering answer sections | [Parsing And Rendering](./lessons/08-parsing-and-rendering.md) | [reference/app.js](../../reference/app.js) `renderCoachResponse()` | [Lab A](./labs/README.md#lab-a-change-one-ui-section-safely) |
| Swahili or multilingual mode | [Language And Swahili](./lessons/09-language-and-swahili.md) | [reference/app.js](../../reference/app.js), [reference/data.js](../../reference/data.js), [api/coach.js](../../api/coach.js) | [Lab E](./labs/README.md#lab-e-add-swahili-answer-mode) |
| When not to use an LLM | [Where LLMs Fit](./lessons/10-where-llms-fit.md) | [reference/app.js](../../reference/app.js), [api/coach.js](../../api/coach.js) | [Lab G](./labs/README.md#lab-g-replace-a-wasteful-llm-call-with-normal-code) |
| Agent loops | [Agents](./lessons/11-agents.md) | [reference/app.js](../../reference/app.js) (current app flow; future extension idea) | [Build Your Own](./lessons/13-build-your-own.md) |
| Safety and variability | [Safety And Variability](./lessons/12-safety-and-variability.md) | [api/coach.js](../../api/coach.js), [tests/soma-student.spec.js](../../tests/soma-student.spec.js), [Safety Checklist](../api-safety-checklist.md) | [Lab F](./labs/README.md#lab-f-debug-a-bad-json-response) |
| Why AI matters | [Why AI Matters Now](./lessons/01-ai-history-and-future.md) | [Reference Sources](./sources.md), [Safety Checklist](../api-safety-checklist.md), [api/coach.js](../../api/coach.js), [Lab D](./labs/README.md#lab-d-change-model-settings-and-observe-variability) | [Build Your Own](./lessons/13-build-your-own.md) |

## Code Prompts By Task

| Task | Use This Prompt |
|---|---|
| Plan a project | [Generate A Project Plan](../student/ai-coding-prompts.md#generate-a-project-plan) |
| Create topic data | [Create Dummy Data](../student/ai-coding-prompts.md#create-dummy-data) |
| Build `/api/coach` request context | [Build The /api/coach Context](../student/ai-coding-prompts.md#build-the-apicoach-context) |
| Fix JavaScript | [Fix A JavaScript Error](../student/ai-coding-prompts.md#fix-a-javascript-error) |
| Improve UI while keeping IDs | [Make The UI Clearer](../student/ai-coding-prompts.md#make-the-ui-clearer) |
| Fix endpoint errors | [Fix /api/coach 404 Or 429](../student/ai-coding-prompts.md#fix-apicoach-404-or-429) |
| Debug context preview | [Prompt Preview Not Showing](../student/ai-coding-prompts.md#prompt-preview-not-showing) |
| Render response fields | [Response Not Rendering](../student/ai-coding-prompts.md#response-not-rendering) |
| Ground follow-up questions | [Follow-Up Not Grounded](../student/ai-coding-prompts.md#follow-up-not-grounded) |
| Block personal data | [Personal Data In Context](../student/ai-coding-prompts.md#personal-data-in-context) |
| Add tests | [Add Test Cases](../student/ai-coding-prompts.md#add-test-cases) |
| Add a responsible AI note | [Add Responsible AI Note](../student/ai-coding-prompts.md#add-responsible-ai-note) |

## Student Rule

When using an AI coding assistant, paste only the relevant file section and ask
for one small change. After the assistant suggests code, compare it against the
map above so you know which files must stay in sync.
