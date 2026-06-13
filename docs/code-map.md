# Code Map

Use this file when you want to know where to make a change.

## Root Files

`README.md`

Main project overview, live demo link, quick start, and links into the docs.

`.env.example`

Template for private local or deployment environment variables. Copy it to
`.env` locally, then add your private values. Do not commit `.env`.

`package.json`

Defines the local commands:

- `npm run serve:mock`
- `npm run test:e2e`
- `npm run test:e2e:headed`
- `npm run test:e2e:ui`

`playwright.config.js`

Starts the local mock server for tests and runs the tests in desktop and mobile
Chromium projects.

`vercel.json`

Deployment hint for hosts that support Vercel-style serverless functions.

`docs/gemini-key-setup.md`

Beginner guide for creating a Gemini API key, adding it to `.env`, testing
Gemini provider mode, and keeping keys server-side.

`docs/deploy-vercel.md`

Beginner guide for importing the GitHub repo into Vercel, setting environment
variables, deploying, and smoke-testing the live routes.

`docs/extend-soma.md`

Student extension guide for safe remixes, stable contracts, common extension
recipes, generalization opportunities, and review checks.

## App Folders

`reference/`

The complete demo app. The local server and deployment rewrite `/` and
`/index.html` to this app.

- `index.html` defines the page sections and element IDs.
- `style.css` controls layout and visual styling.
- `data.js` contains local topic packs and setup options.
- `app.js` contains the browser behavior.
- `README.md` explains the public app contract.

`starter/`

The smaller workshop scaffold. Students can start here before reading the full
reference implementation, but it is not the public entry point.

The file names match `reference/` so students can compare simple and complete
versions.

## Server Folders

`api/coach.js`

The server endpoint for `POST /api/coach`. It chooses between mock mode and
Gemini mode.

`lib/coach-core.js`

Shared deterministic coach logic for mock/demo mode. This is also used by tests.

`scripts/mock-coach-server.js`

Small Node server for local development. It serves the static app and connects
`/api/coach` to `api/coach.js`.

## Tests

`tests/soma-student.spec.js`

End-to-end student smoke tests. These tests are the best quick check before a
demo.

## Design Docs

`docs/design/README.md`

Design navigation for learner UI principles and redesign planning.

`docs/design/ui-principles-for-students.md`

Student-facing principles for designing learning apps that are beautiful,
functional, engaging, accessible, and safe.

`docs/design/ui-redesign-brief.md`

Review draft for the next Soma public demo UI redesign. It includes desktop,
mobile, and Debug Lab wireframes plus review criteria.

## Workshop Material

`docs/workshop/README.md`

Main curriculum hub for sessions, lessons, labs, source links, and safety
rules.

`docs/workshop/sessions/`

Six live-session files plus the facilitator runbook.

`docs/workshop/lessons/README.md`

Index for the 12 deeper teaching lessons.

`docs/student/README.md`

Student navigation for handout, project cards, AI limits, and coding prompts.

`docs/student/handout.md`

Student-facing workshop handout.

`docs/student/ai-limits.md`

Student-facing AI usage limits and quota guidance.

`docs/mentor/mentor-guide.md`

Facilitator guide.

`docs/mentor/README.md`

Mentor navigation for facilitation, curriculum source, rubric, and safety
checks.

`docs/student/project-cards.md`

Remix ideas for teams.

`docs/mentor/rubric.md`

Demo and project evaluation guide.

`docs/student/ai-coding-prompts.md`

Suggested prompts for using an AI coding assistant during the workshop.

`docs/mentor/curriculum-source.md`

Notes about the curriculum source and sample content boundary.

## Where To Change Common Things

Change page text:

- `reference/index.html`
- `starter/index.html`

Change visual layout:

- `reference/style.css`
- `starter/style.css`

Add or edit topics:

- `reference/data.js`
- `starter/data.js`
- `docs/extend-soma.md` for the extension checklist and contracts

Change what the browser sends to the coach:

- `reference/app.js`, especially `buildCoachContext()`
- `starter/app.js`, equivalent context-building code

Change mock responses:

- `lib/coach-core.js`

Change Gemini prompt shape:

- `api/coach.js`, especially `buildGeminiCall()`

Change tests:

- `tests/soma-student.spec.js`
