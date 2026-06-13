# Soma Workshop Course

This course turns Soma Study Coach into lecture material. Use it alongside the
six-session project studio in `../../workshop/`.

The goal is not only to run the app. Students should understand how a web app is
assembled, how the browser talks to a server, how the server calls an LLM, how
prompts shape the answer, and where AI is useful, risky, or wasteful.

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

Use [the lesson template](./lesson-template.md) when adding optional extension
lessons or rewriting these lessons for a different audience.

## Lab Path

Use labs when students need hands-on practice.

| Lab | Task | Main Files |
|---|---|---|
| A | Change one UI section safely. | `reference/index.html`, `reference/style.css`, `tests/soma-student.spec.js` |
| B | Add a new topic pack. | `reference/data.js`, `starter/data.js` |
| C | Edit a tutor prompt and compare output. | Debug Lab, `api/coach.js` |
| D | Change model settings and observe variability. | Debug Lab, `/api/coach` |
| E | Add Swahili answer mode. | `reference/data.js`, `reference/app.js`, `api/coach.js` |
| F | Debug malformed JSON. | `api/coach.js`, `reference/app.js` |
| G | Replace a wasteful LLM call with normal code. | `reference/app.js`, `lib/coach-core.js` |

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
