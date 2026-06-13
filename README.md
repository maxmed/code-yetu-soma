# Code Yetu Soma

Build a simple study-helper workshop that teaches the shape of an AI tutor app.

Live demo status: local main app, mock E2E, and a Vercel-compatible
`/api/coach` adapter are ready; public deployment is pending.

Important: `api/coach.js` calls Gemini server-side only when `GEMINI_API_KEY`
is set in the host environment. Without that env var, it falls back to
deterministic mock/demo responses for local testing. Never put provider keys in
frontend JavaScript, GitHub, or student machines.

This pack is for students aged 12-18 who know basic HTML/CSS, some JavaScript, and can use an AI coding assistant for small code generation and debugging tasks.

The flagship demo app is **Soma Study Coach**: a Grade 7 Integrated Science Study Helper / Topic Tutor.

## Goal

By the end of the program, each team should have:

- a working browser-based education MVP,
- age-appropriate sample content based on KICD/CBC curriculum designs,
- the safe workflow shape for an LLM-backed study helper: prepare context, call a server-side coach endpoint, render limitations clearly,
- a short demo explaining the problem, user, data, AI logic, limitations, and next steps.

## Recommended Program Shape

Use this as a 4-week project studio with 6 training sessions:

1. Ideation and AI basics
2. Web app scaffold
3. Data and intelligence logic
4. Integrating intelligence into the user experience
5. Testing, debugging, and responsible AI
6. Demo polish and pitch

## Folder Guide

```text
code-yetu-soma/
├── README.md
├── vercel.json
├── docs/
│   ├── README.md
│   ├── architecture.md
│   ├── code-map.md
│   ├── api-coach-contract.md
│   ├── local-setup.md
│   ├── testing-debugging.md
│   ├── extend-soma.md
│   ├── api-safety-checklist.md
│   ├── workshop/
│   │   ├── README.md
│   │   ├── sources.md
│   │   ├── lesson-template.md
│   │   ├── lessons/
│   │   │   ├── 01-how-web-apps-work.md
│   │   │   ├── 02-soma-architecture.md
│   │   │   ├── 03-frontend-walkthrough.md
│   │   │   ├── 04-data-and-context.md
│   │   │   ├── 05-llm-prompts.md
│   │   │   ├── 06-calling-the-llm.md
│   │   │   ├── 07-parsing-and-rendering.md
│   │   │   ├── 08-language-and-swahili.md
│   │   │   ├── 09-where-llms-fit.md
│   │   │   ├── 10-agents.md
│   │   │   ├── 11-safety-and-variability.md
│   │   │   └── 12-build-your-own.md
│   │   └── labs/
│   │       └── README.md
│   ├── student/
│   │   ├── handout.md
│   │   ├── ai-limits.md
│   │   ├── project-cards.md
│   │   └── ai-coding-prompts.md
│   └── mentor/
│       ├── mentor-guide.md
│       ├── curriculum-source.md
│       └── rubric.md
├── api/
│   └── coach.js
├── lib/
│   └── coach-core.js
├── scripts/
│   └── mock-coach-server.js
├── tests/
│   └── soma-student.spec.js
├── workshop/
│   ├── workshop_guide.md
│   ├── 01-ideation-ai-basics.md
│   ├── 02-web-app-scaffold.md
│   ├── 03-data-intelligence.md
│   ├── 04-integrate-ai-ux.md
│   ├── 05-testing-responsible-ai.md
│   └── 06-demo-pitch.md
├── starter/
│   ├── README.md
│   ├── index.html
│   ├── style.css
│   ├── data.js
│   └── app.js
└── reference/
    ├── README.md
    ├── index.html
    ├── style.css
    ├── data.js
    └── app.js
```

## Fast Start For Facilitators

1. Open `docs/README.md` for the beginner codebase tour.
2. Open `workshop/workshop_guide.md`.
3. Open `docs/mentor/curriculum-source.md` for the Grade 7 Integrated Science content source.
4. Demo the main app at `/` with `npm run serve:mock`.
5. Give teams the `starter/` folder only when they need the smaller workshop scaffold.
6. Run one workshop file per session.
7. Use `docs/student/project-cards.md` for remix ideas.
8. Share `docs/student/ai-limits.md` before students use the AI coach.
9. Use `docs/student/ai-coding-prompts.md` for debugging help.
10. Use `docs/mentor/rubric.md` for demos.

## Beginner Developer Docs

Use `docs/README.md` as the student and mentor entry point for understanding
the codebase. It links to:

- `docs/architecture.md` - how the browser, local data, `/api/coach`, mock mode,
  and Gemini mode fit together.
- `docs/code-map.md` - what each important file does.
- `docs/api-coach-contract.md` - request/response contract for `/api/coach`.
- `docs/local-setup.md` - local run, `.env`, tests, and deploy notes.
- `docs/testing-debugging.md` - Playwright, manual checks, and Debug Lab.
- `docs/extend-soma.md` - beginner extension tasks.
- `docs/api-safety-checklist.md` - key, data, AI honesty, and debug checks.
- `docs/workshop/` - lecture-style course material, labs, and reputable
  self-study sources.
- `docs/student/` - student handout, limits, project cards, and AI coding prompts.
- `docs/mentor/` - facilitator guide, curriculum source notes, and demo rubric.

## Workshop Readiness Bar

Before this is public, it should be at least as complete as the previous Code Yetu workshop:

- full working public app at `/`,
- tutor-first Study Helper / Topic Tutor flow,
- local topic-pack loading,
- learner-facing Debug Lab for safe context, prompt, model and parameter experiments,
- `/api/coach` call with structured response rendering,
- follow-up question flow,
- local progress tracking,
- honest quota, network, and safety error states,
- simple `starter/` scaffold for workshop exercises,
- numbered workshop guide,
- rescue prompts for common failures,
- curated local topic-pack data,
- clear no-API-key student path through `/api/coach`,
- deployed live demo URL in this README,
- QR code or short link for the workshop if needed.

## Deploy Plan

Before publishing the live demo:

1. Run the main app locally with `npm run serve:mock`.
2. Verify the tutor-first Study Helper / Topic Tutor flow.
3. Verify `/api/coach` behavior, including quota/error states.
4. Deploy the static app and `/api/coach` adapter. The repo includes
   `api/coach.js` and `vercel.json` for a Vercel-style deployment.
5. For real Gemini answers, set `GEMINI_API_KEY` in the host environment. The
   same variable works locally in `.env` and in Vercel or another deployment
   provider's environment-variable settings.
6. Add the live demo URL to this README.
7. Re-test `/`, `/index.html`, the optional `/starter/index.html` workshop scaffold, and `POST /api/coach` from a clean browser.
8. Confirm the Debug Lab does not show keys.
9. Optional: set `GEMINI_MODEL`; otherwise the default is `gemini-3.1-flash-lite`.

## Local Mock And E2E Smoke

Use the local mock when mentors or reviewers need to test the full student flow
without a real provider key:

```bash
npm install
npm run test:e2e
```

The Playwright hook starts `scripts/mock-coach-server.js`, serves the static app,
and provides `POST /api/coach` mock responses for normal study help, follow-up,
quota, network, and personal-data safety paths. When `GEMINI_API_KEY` is not set,
the deploy adapter also falls back to the same mock response contract. Reports
are written to `playwright-report/` and transient test files to `test-results/`.

To use the mock manually:

```bash
npm run serve:mock
```

Then open the main app:

```text
http://127.0.0.1:8787/
```

The smaller workshop scaffold remains available at:

```text
http://127.0.0.1:8787/starter/index.html
```

## Environment Config

Use `.env.example` as the shared template for local development and deployment.
It contains only provider configuration:

```text
GEMINI_API_KEY=
GEMINI_MODEL=gemini-3.1-flash-lite
```

`gemini-3.1-flash-lite` is the workshop default because it is the best tested
Gemini text-tutor choice for this app: the active classroom table shows 15 RPM,
250K TPM, and 500 RPD for this model, and `/api/coach` has been smoke-tested
with it. See `docs/student/ai-limits.md` for the student-facing limits and advice.

For a local real-Gemini test, create a private `.env` file from the example:

```bash
cp .env.example .env
```

Edit `.env` and set `GEMINI_API_KEY` to the organizer-owned key. Do not commit
`.env` or paste the key into chat. For deployment, set the same variables in the
hosting provider's server-side environment variables, for example Vercel Project
Settings -> Environment Variables. Never put provider keys in frontend
JavaScript.

`npm run serve:mock` loads `.env` automatically before serving `/api/coach`.

```bash
npm run serve:mock
```

Then open `http://127.0.0.1:8787/`.

If port 8787 is already busy, stop the old local server. Port overrides are
local test plumbing and are not part of the shared environment template or
deployment setup.

## Default Public App

The default public entry point is Soma Study Coach at `/`, an AI-tutor demo using Grade 7 Integrated Science as the class demo:

- a student first picks a topic, asks a question, and reads the answer,
- advanced help mode, grade/year, and learning-area controls stay available under Advanced Options,
- the app loads local KICD/CBC-aligned sample topic content,
- the app can open a Debug Lab that shows safe context, prompts, provider request shape and parsed response,
- the app calls one shared `/api/coach` endpoint,
- the coach endpoint returns an explanation, examples, misconception help, resources, or a study plan,
- the app supports follow-up study questions,
- the app tracks progress locally,
- the app shows run steps: observe, prepare context, ask coach endpoint, parse response, explain.

The `starter/` folder remains as a smaller workshop scaffold. Teams can use it
for early exercises, or remix the same pattern into a career explorer, school
FAQ bot, reading helper, resource finder, support dashboard, or adaptive
practice game.

## Current Status

This repo contains the workshop-facing material.

The current public app is tutor-first: Topic -> Question -> Your Answer,
with Advanced Options collapsed and Debug Lab hidden until needed. Local mock E2E
covers the public app and workshop scaffold across desktop and mobile. The deploy adapter
calls Gemini when `GEMINI_API_KEY` is configured and otherwise falls back to
mock/demo responses.

## Simplicity Rule

Keep P0 beginner-sized: static HTML/CSS/JS, local data, browser storage, and one `fetch("/api/coach")`. Do not add frameworks, build tooling, databases, login systems, queues, or orchestration layers unless a later scope explicitly needs them.
