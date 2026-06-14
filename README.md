# Code Yetu Soma

Code Yetu Soma is a beginner-friendly workshop project for building and
understanding an AI-shaped study helper.

The flagship demo is **Soma Study Coach**, a Grade 7 Integrated Science topic
tutor. It lets a learner pick a topic, ask a question, receive a structured
study answer, ask follow-up questions, and optionally open Debug Lab to inspect
the safe context, prompt shape, model settings, and parsed response.

Live demo: https://soma-study-coach.vercel.app/

This repo is for students aged 12-18 who know basic HTML/CSS, some JavaScript,
and can use an AI coding assistant for small code generation and debugging
tasks.

## Quick Start

1. Try the live demo: https://soma-study-coach.vercel.app/
2. For the full beginner path, use
   [docs/getting-started.md](docs/getting-started.md).
3. Install local dependencies:

   ```bash
   npm install
   ```

4. Run the app in mock mode:

   ```bash
   npm run serve:mock
   ```

5. Open the main app:

   ```text
   http://127.0.0.1:8787/
   ```

6. Run the student-flow smoke tests:

   ```bash
   SOMA_TEST_PORT=8790 npm run test:e2e
   ```

   This keeps the learning server on `8787` open and lets Playwright use a
   separate temporary port for tests.

For the complete zero-to-hero beginner path, start with
[docs/getting-started.md](docs/getting-started.md). It covers mock mode,
optional Gemini setup, safe `.env` configuration, local testing, and deploy
checks in one sequence. Use [docs/local-setup.md](docs/local-setup.md) and
[docs/gemini-key-setup.md](docs/gemini-key-setup.md) only as reference pages.

## What Is Included

- A polished learner demo in [reference/](reference/), served as the public app
  at `/`.
- A smaller workshop scaffold in [starter/](starter/) for early exercises.
- One server-side coach endpoint, [`POST /api/coach`](api/coach.js).
- Deterministic mock responses in [api/coach.js](api/coach.js), so
  students can learn without provider keys.
- Optional Gemini mode through server-side environment variables only.
- Debug Lab for inspecting context, prompt shape, model settings, provider
  request shape, raw output, and parsed response without exposing keys.
- A complete workshop curriculum under [docs/workshop/](docs/workshop/).
- Student handouts, project cards, AI limits, mentor notes, and a demo rubric
  under [docs/student/](docs/student/) and [docs/mentor/](docs/mentor/).

## Repo Map

Use this when `tree -L 1` feels like a list of mystery folders.

| Path | What is in it | Why it is needed | How it helps students |
|---|---|---|---|
| [reference/](reference/) | Complete Soma Study Coach app: HTML, CSS, data, browser JS, and folder README. | This is the polished app served at `/` and `/index.html`. | Students can inspect the finished tutor-first pattern after they understand the scaffold. |
| [starter/](starter/) | Smaller app with matching file names: HTML, CSS, data, browser JS, and folder README. | Beginners need a simpler place for first edits before touching the full app. | Students safely change headings, topic data, rendering, and `/api/coach` context during early lessons. |
| [scripts/](scripts/) | Local tooling, currently the mock coach server. | `npm run serve:mock` needs a local server that serves the apps, docs, and `/api/coach`. | Students can run Soma locally without Vercel or a Gemini key. |
| [api/](api/) | Server-side coach code. `coach.js` handles `POST /api/coach`, mock responses, Gemini calls, safety checks, and errors. | The browser must call one server folder instead of an AI provider directly. | Students learn the safe server boundary without extra top-level server helper folders. |
| [docs/](docs/) | Getting Started, workshop lessons, sessions, labs, student docs, mentor docs, design docs, and safety docs. | The app is a workshop, not only code. | Students and mentors have one path from zero setup to final demo. |
| [tests/](tests/) | Playwright student-flow smoke tests. | The project needs repeatable checks for routes, UI flow, errors, and safety behavior. | Students can verify their changes before demos. |
| `playwright.config.js` | Test server and browser-test configuration. | Playwright needs to know how to run the app during tests. | Students can run one command to check the app works. |
| `vercel.json` | Public deployment route rules. | Vercel needs to serve the polished app at `/` and route assets correctly. | Students can see how the local app becomes a public demo. |
| `node_modules/`, `playwright-report/`, `test-results/` | Installed packages and generated test output. | These are local/generated folders, not workshop source material. | Students can ignore them unless debugging install or test failures. |

## What Students Learn

The workshop connects a real browser app to the concepts behind AI-assisted
software:

- how HTML, CSS, JavaScript, events, state, `fetch`, and `localStorage` work;
- how local topic data becomes safe context for a study helper;
- how a browser calls a server endpoint instead of calling an AI provider
  directly;
- how prompts, model settings, parsing, and rendering shape the user
  experience;
- when an LLM is useful, risky, wasteful, or unnecessary;
- how to test, debug, explain limitations, and give a short project demo.

Start with the 6-session runbook:
[docs/workshop/sessions/README.md](docs/workshop/sessions/README.md)

Then use the deeper course:
[docs/workshop/README.md](docs/workshop/README.md)

To connect sessions, lessons, files, labs, and AI coding prompts, use:
[docs/workshop/concept-to-code-map.md](docs/workshop/concept-to-code-map.md)

To use a real LLM key for testing, use:
[docs/gemini-key-setup.md](docs/gemini-key-setup.md)

To deploy the app publicly with Vercel, use:
[docs/deploy-vercel.md](docs/deploy-vercel.md)

## Where To Go Next

For facilitators:

- [docs/workshop/sessions/README.md](docs/workshop/sessions/README.md) - the
  6-session live workshop runbook.
- [docs/mentor/mentor-guide.md](docs/mentor/mentor-guide.md) - facilitation
  rhythm and check-ins.
- [docs/mentor/curriculum-source.md](docs/mentor/curriculum-source.md) - Grade 7
  Integrated Science source boundary.
- [docs/mentor/rubric.md](docs/mentor/rubric.md) - project demo rubric.

For students:

- [docs/student/handout.md](docs/student/handout.md) - challenge and submission
  guide.
- [docs/student/project-cards.md](docs/student/project-cards.md) - remix ideas.
- [docs/student/ai-limits.md](docs/student/ai-limits.md) - safe AI usage and
  limits.
- [docs/student/ai-coding-prompts.md](docs/student/ai-coding-prompts.md) -
  debugging and extension prompts.
- [docs/extend-soma.md](docs/extend-soma.md) - what to change, what to keep
  stable, and how to test a safe remix.

For developers:

- [docs/README.md](docs/README.md) - best reading order.
- [docs/architecture.md](docs/architecture.md) - browser, data, server, mock
  mode, and Gemini mode.
- [docs/gemini-key-setup.md](docs/gemini-key-setup.md) - beginner guide to
  creating and testing a Gemini API key safely.
- [docs/deploy-vercel.md](docs/deploy-vercel.md) - beginner Vercel deployment
  guide.
- [docs/code-map.md](docs/code-map.md) - where to change common things.
- [docs/api-coach-contract.md](docs/api-coach-contract.md) - request and
  response contract.
- [docs/testing-debugging.md](docs/testing-debugging.md) - Playwright, manual
  checks, and Debug Lab.
- [docs/api-safety-checklist.md](docs/api-safety-checklist.md) - key, data, AI
  honesty, and debug checks.
- [docs/extend-soma.md](docs/extend-soma.md) - beginner extension tasks.

## Safety Rules

- Never put provider keys in `reference/`, `starter/`, browser JavaScript,
  GitHub, or student machines.
- Keep provider keys in server-side environment variables only.
- Use dummy learning questions, not names, phone numbers, marks, or private
  school records.
- Treat Debug Lab as a teaching view, not a secret-revealing log.
- Keep the beginner architecture small: static HTML/CSS/JS, local data, browser
  storage, and one `fetch("/api/coach")`.

## Current Status

The public app is deployed, the root route opens Soma Study Coach, and the repo
supports a no-key mock path plus optional server-side Gemini mode. The workshop
curriculum is integrated under [docs/workshop/](docs/workshop/) and includes
session guides, deeper lessons, labs, source links, and concept-to-code mapping.
