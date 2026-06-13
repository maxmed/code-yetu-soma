# Code Map

Use this file when you want to know where to make a change.

## Root Files

`README.md`

Main project overview, fast start, local run instructions, environment setup,
and workshop status.

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

## App Folders

`reference/`

The complete demo app.

- `index.html` defines the page sections and element IDs.
- `style.css` controls layout and visual styling.
- `data.js` contains local topic packs and setup options.
- `app.js` contains the browser behavior.
- `README.md` explains the reference app contract.

`starter/`

The smaller learner app. Students can start here before reading the full
reference implementation.

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

## Workshop Material

`workshop/`

Six session files plus the workshop guide.

`docs/student/handout.md`

Student-facing workshop handout.

`docs/student/ai-limits.md`

Student-facing AI usage limits and quota guidance.

`docs/mentor/mentor-guide.md`

Facilitator guide.

`docs/student/project-cards.md`

Remix ideas for teams.

`docs/mentor/rubric.md`

Demo and project evaluation guide.

`docs/student/copilot-prompts.md`

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

Change what the browser sends to the coach:

- `reference/app.js`, especially `buildCoachContext()`
- `starter/app.js`, equivalent context-building code

Change mock responses:

- `lib/coach-core.js`

Change Gemini prompt shape:

- `api/coach.js`, especially `buildGeminiCall()`

Change tests:

- `tests/soma-student.spec.js`
