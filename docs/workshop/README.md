# Soma Workshop Course

This folder is the workshop home. It contains the six-session runbook, deeper
lecture lessons, labs, source links, and concept-to-code mapping for Soma Study
Coach.

The main paths are:

- [sessions/](./sessions/) - facilitator runbook for the six live sessions.
- [lessons/](./lessons/) - deeper lecture material and self-study blocks.
- [labs/](./labs/) - hands-on practice tasks.
- [concept-to-code-map.md](./concept-to-code-map.md) - how sessions, lessons,
  files, labs, and AI coding prompts connect.
- [sources.md](./sources.md) - reviewed sources behind the course.

Use [concept-to-code-map.md](./concept-to-code-map.md) when students need to see
how a lesson maps back to actual Soma files, labs, and AI coding prompts.

The goal is not only to run the app. Students should understand how a web app is
assembled, how the browser talks to a server, how the server calls an LLM, how
prompts shape the answer, and where AI is useful, risky, or wasteful.

## Course Navigation

| If you need... | Go to |
|---|---|
| live facilitation plan | [6-Session Runbook](./sessions/README.md) |
| deeper teaching material | [Lesson Index](./lessons/README.md) |
| hands-on practice | [Workshop Labs](./labs/README.md) |
| student-facing challenge | [Student Guide](../student/README.md) |
| mentor notes and rubric | [Mentor Guide Index](../mentor/README.md) |
| setup, tests, and deploy | [Local Setup](../local-setup.md) |
| exact file-to-concept links | [Concept To Code Map](./concept-to-code-map.md) |
| AI history and future context | [Special Lecture: The Story Of AI](./lessons/13-ai-history-and-future.md) |

## How To Use This Course

Each lesson is written for a 20-40 minute teaching block:

1. Teach the main idea.
2. Show the idea inside Soma.
3. Make one small change.
4. Test the result.
5. Discuss limits and safe use.

Every lesson follows the same pattern:

- learning goals,
- key ideas,
- diagram or flow,
- find it in this repo,
- worked Soma example,
- live demo,
- student exercise,
- reflection questions,
- mentor notes,
- deeper reading from reputable sources.

## Lesson Path

| Lesson | Topic | What Students Learn |
|---|---|---|
| 1 | [How Web Apps Work](./lessons/01-how-web-apps-work.md) | Browser, HTML, CSS, JavaScript, events, state, `fetch`, and `localStorage`. |
| 2 | [Soma App Architecture](./lessons/02-soma-architecture.md) | Frontend, topic data, `/api/coach`, mock mode, Gemini mode, and server-side keys. |
| 3 | [Frontend Walkthrough](./lessons/03-frontend-walkthrough.md) | How `index.html`, DOM IDs, `app.js`, and rendering functions work together. |
| 4 | [Data And Context](./lessons/04-data-and-context.md) | Topic packs, safe context, resources, practice answers, and context limits. |
| 5 | [LLM Prompts](./lessons/05-llm-prompts.md) | System prompts, user prompts, context, weak prompts, stronger prompts, and iteration. |
| 6 | [Calling The LLM](./lessons/06-calling-the-llm.md) | Request body, model settings, temperature, token limits, quota, errors, and retries. |
| 7 | [Parsing And Rendering](./lessons/07-parsing-and-rendering.md) | Raw model output, JSON parsing, normalization, app response fields, and UI rendering. |
| 8 | [Language And Swahili](./lessons/08-language-and-swahili.md) | English, Swahili, code-switching, language metadata, and multilingual testing. |
| 9 | [Where LLMs Fit](./lessons/09-where-llms-fit.md) | Good uses, bad uses, wasteful calls, rules, search, retrieval, and human review. |
| 10 | [Agents](./lessons/10-agents.md) | Observe-plan-act loops, tools, memory/state, guardrails, and tradeoffs. |
| 11 | [Safety And Variability](./lessons/11-safety-and-variability.md) | Hallucination, prompt injection, personal data, non-determinism, evals, and limits. |
| 12 | [Build Your Own](./lessons/12-build-your-own.md) | Capstone checklist, project extensions, demo rubric, and next learning path. |
| Special | [The Story Of AI](./lessons/13-ai-history-and-future.md) | Logic, expert systems, machine learning, neural networks, LLMs, multimodal AI, agents, computer use, robotics, and future directions. |

Use [the lesson template](./lesson-template.md) when adding optional extension
lessons or rewriting these lessons for a different audience.

## Lab Path

Use labs when students need hands-on practice.

| Lab | Task | Main Files |
|---|---|---|
| [A](./labs/README.md#lab-a-change-one-ui-section-safely) | Change one UI section safely. | `reference/index.html`, `reference/style.css`, `tests/soma-student.spec.js` |
| [B](./labs/README.md#lab-b-add-a-new-topic-pack) | Add a new topic pack. | `reference/data.js`, `starter/data.js` |
| [C](./labs/README.md#lab-c-edit-a-tutor-prompt-and-compare-output) | Edit a tutor prompt and compare output. | Debug Lab, `api/coach.js` |
| [D](./labs/README.md#lab-d-change-model-settings-and-observe-variability) | Change model settings and observe variability. | Debug Lab, `/api/coach` |
| [E](./labs/README.md#lab-e-add-swahili-answer-mode) | Add Swahili answer mode. | `reference/data.js`, `reference/app.js`, `api/coach.js` |
| [F](./labs/README.md#lab-f-debug-a-bad-json-response) | Debug malformed JSON. | `api/coach.js`, `reference/app.js` |
| [G](./labs/README.md#lab-g-replace-a-wasteful-llm-call-with-normal-code) | Replace a wasteful LLM call with normal code. | `reference/app.js`, `lib/coach-core.js` |

## Concept To Code Map

Use [concept-to-code-map.md](./concept-to-code-map.md) to connect:

- each live workshop session,
- each deep lesson,
- the relevant project files,
- the matching lab,
- the useful AI coding prompt in `../student/ai-coding-prompts.md`.

## Source Standard

Use [sources.md](./sources.md) as the approved source spine. Prefer official or
institutional sources: MDN, web.dev, W3C/WAI, CAST, Google PAIR, Gemini docs,
OpenAI developer docs, OWASP, UNESCO, NIST, and the AI Literacy Framework.

Avoid random tutorials or opinion posts in core lessons. If an optional source
is useful, label it as optional and explain why it is included.

## Safety Rules For All Lessons

- Never put an API key in frontend JavaScript.
- Never ask students to paste API keys into shared chat or public docs.
- Use dummy learning questions, not personal data.
- Explain when mock mode is being used.
- Explain when an answer is AI-generated and may vary.
- Treat the Debug Lab as a teaching view, not a secret-revealing log.
- Show students when normal code is better than an LLM call.
