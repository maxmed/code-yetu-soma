# Concept To Code Map

Use this map when a student asks: "Where is this idea in the actual project?"

Related navigation: [Workshop Course](./README.md), [6-Session
Runbook](./sessions/README.md), [Lesson Index](./lessons/README.md), and
[Workshop Labs](./labs/README.md).

The [sessions/](./sessions/) folder is the 6-session runbook. The
[lessons/](./lessons/) folder is the deeper lecture course. This file connects
both to the code, labs, and AI coding prompts.

## Folder Roles

| Folder | Purpose | Use It When |
|---|---|---|
| [docs/workshop/sessions/](./sessions/) | Session-by-session facilitator runbook. | You are running the 6 workshop sessions. |
| [docs/workshop/lessons/](./lessons/) | Lecture material and deeper explanations. | You are teaching a concept or assigning self-study. |
| [docs/student/](../student/handout.md) | Student handouts, project cards, limits, and AI coding prompts. | Students need instructions or rescue prompts. |
| [docs/mentor/](../mentor/mentor-guide.md) | Mentor guide, curriculum notes, and rubric. | Facilitators need review and assessment guidance. |
| `reference/` | Polished public app implementation. | Students use the real Soma app or inspect the full code. |
| `starter/` | Smaller workshop scaffold. | Students need a simpler codebase to copy and modify. |

## Session To Lesson Map

| Workshop Session | Deep Lessons | Main Code | Student Prompts |
|---|---|---|---|
| [Session 1: Why AI Matters And What Soma Does](./sessions/01-ideation-ai-basics.md) | [Why AI Matters Now](./lessons/01-ai-history-and-future.md) | `reference/`, `starter/`, `docs/getting-started.md` | [Add Responsible AI Note](../student/ai-coding-prompts.md#add-responsible-ai-note) |
| [Session 2: Web App Scaffold](./sessions/02-web-app-scaffold.md) | [How Web Apps Work](./lessons/02-how-web-apps-work.md), [Frontend Walkthrough](./lessons/04-frontend-walkthrough.md) | `starter/index.html`, `starter/app.js`, `starter/style.css`, `reference/index.html`, `reference/app.js` | [Fix A JavaScript Error](../student/ai-coding-prompts.md#fix-a-javascript-error), [Make The UI Clearer](../student/ai-coding-prompts.md#make-the-ui-clearer) |
| [Session 3: Data And Intelligence](./sessions/03-data-intelligence.md) | [Data And Context](./lessons/05-data-and-context.md), [LLM Prompts](./lessons/06-llm-prompts.md), [Calling The LLM](./lessons/07-calling-the-llm.md) | `reference/data.js`, `reference/app.js`, `api/coach.js`, `lib/coach-core.js` | [Create Dummy Data](../student/ai-coding-prompts.md#create-dummy-data), [Build The /api/coach Context](../student/ai-coding-prompts.md#build-the-apicoach-context) |
| [Session 4: Integrate Intelligence Into UX](./sessions/04-integrate-ai-ux.md) | [Parsing And Rendering](./lessons/08-parsing-and-rendering.md), [Language And Swahili](./lessons/09-language-and-swahili.md) | `reference/app.js`, `reference/index.html`, `reference/style.css`, `api/coach.js` | [Response Not Rendering](../student/ai-coding-prompts.md#response-not-rendering), [Follow-Up Not Grounded](../student/ai-coding-prompts.md#follow-up-not-grounded) |
| [Session 5: Testing And Responsible AI](./sessions/05-testing-responsible-ai.md) | [Safety And Variability](./lessons/12-safety-and-variability.md), [Where LLMs Fit](./lessons/10-where-llms-fit.md) | `tests/soma-student.spec.js`, `docs/api-safety-checklist.md`, `docs/testing-debugging.md` | [Add Test Cases](../student/ai-coding-prompts.md#add-test-cases), [Personal Data In Context](../student/ai-coding-prompts.md#personal-data-in-context) |
| [Session 6: Demo And Pitch](./sessions/06-demo-pitch.md) | [Build Your Own](./lessons/13-build-your-own.md) | `docs/mentor/rubric.md`, `docs/student/handout.md`, `README.md` | [Add Responsible AI Note](../student/ai-coding-prompts.md#add-responsible-ai-note), [Generate A Project Plan](../student/ai-coding-prompts.md#generate-a-project-plan) |

## Concept To Code Map

| Concept | Read First | Find It In Code | Try This Lab |
|---|---|---|---|
| Browser app structure | [How Web Apps Work](./lessons/02-how-web-apps-work.md) | `starter/index.html`, `starter/style.css`, `starter/app.js`; compare with `reference/` later | [Lab A](./labs/README.md#lab-a-change-one-ui-section-safely) |
| Public app versus scaffold | [Soma App Architecture](./lessons/03-soma-architecture.md) | `starter/`, `reference/`, `scripts/mock-coach-server.js` | [Lab A](./labs/README.md#lab-a-change-one-ui-section-safely) |
| DOM IDs and event listeners | [Frontend Walkthrough](./lessons/04-frontend-walkthrough.md) | `reference/index.html`, `reference/app.js` | [Lab A](./labs/README.md#lab-a-change-one-ui-section-safely) |
| Topic packs and local data | [Data And Context](./lessons/05-data-and-context.md) | `reference/data.js`, `starter/data.js` | [Lab B](./labs/README.md#lab-b-add-a-new-topic-pack) |
| `/api/coach` request context | [Data And Context](./lessons/05-data-and-context.md) | `reference/app.js` `buildCoachContext()` | [Lab B](./labs/README.md#lab-b-add-a-new-topic-pack) |
| Prompt design | [LLM Prompts](./lessons/06-llm-prompts.md) | `api/coach.js` `buildGeminiCall()` | [Lab C](./labs/README.md#lab-c-edit-a-tutor-prompt-and-compare-output) |
| Model settings | [Calling The LLM](./lessons/07-calling-the-llm.md) | `api/coach.js`, Debug Lab controls | [Lab D](./labs/README.md#lab-d-change-model-settings-and-observe-variability) |
| Response parsing | [Parsing And Rendering](./lessons/08-parsing-and-rendering.md) | `api/coach.js` `parseGeminiJson()`, `normalizeGeminiResponse()` | [Lab F](./labs/README.md#lab-f-debug-a-bad-json-response) |
| Rendering answer sections | [Parsing And Rendering](./lessons/08-parsing-and-rendering.md) | `reference/app.js` `renderCoachResponse()` | [Lab A](./labs/README.md#lab-a-change-one-ui-section-safely) |
| Swahili or multilingual mode | [Language And Swahili](./lessons/09-language-and-swahili.md) | `reference/app.js`, `reference/data.js`, `api/coach.js` | [Lab E](./labs/README.md#lab-e-add-swahili-answer-mode) |
| When not to use an LLM | [Where LLMs Fit](./lessons/10-where-llms-fit.md) | `reference/app.js`, `lib/coach-core.js` | [Lab G](./labs/README.md#lab-g-replace-a-wasteful-llm-call-with-normal-code) |
| Agent loops | [Agents](./lessons/11-agents.md) | Current app flow in `reference/app.js`; future extension idea | [Build Your Own](./lessons/13-build-your-own.md) |
| Safety and variability | [Safety And Variability](./lessons/12-safety-and-variability.md) | `reference/app.js`, `api/coach.js`, `tests/soma-student.spec.js` | [Lab F](./labs/README.md#lab-f-debug-a-bad-json-response) |
| Why AI matters and where it is used | [Why AI Matters Now](./lessons/01-ai-history-and-future.md) | Whole-project context: rules, `/api/coach`, Debug Lab, model boundaries | [Build Your Own](./lessons/13-build-your-own.md) |

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
