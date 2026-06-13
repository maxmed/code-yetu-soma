# Code Yetu Soma

Build a simple AI-powered study helper workshop.

Live demo: local reference app and mock E2E are ready; public deployment is pending.

This pack is for students aged 12-18 who know basic HTML/CSS, some JavaScript, and can use an AI coding assistant for small code generation and debugging tasks.

The flagship demo app is **Soma Study Coach**: a Grade 7 Integrated Science Study Helper / Topic Tutor.

## Goal

By the end of the program, each team should have:

- a working browser-based education MVP,
- age-appropriate sample content based on KICD/CBC curriculum designs,
- a real LLM workflow for study feedback, explanations, resources, or planning,
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
├── curriculum-source.md
├── project-cards.md
├── mentor-guide.md
├── rubric.md
├── copilot-prompts.md
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

1. Open `workshop/workshop_guide.md`.
2. Open `curriculum-source.md` for the Grade 7 Integrated Science content source.
3. Demo `reference/index.html` from a simple local server.
4. Give every team the `starter/` folder.
5. Run one workshop file per session.
6. Use `project-cards.md` for remix ideas.
7. Use `copilot-prompts.md` for debugging help.
8. Use `rubric.md` for demos.

## Workshop Readiness Bar

Before this is public, it should be at least as complete as the previous Code Yetu workshop:

- full working `reference/` app,
- mode-first Study Helper / Topic Tutor flow,
- local topic-pack loading,
- visible safe context / prompt preview,
- `/api/coach` call with structured response rendering,
- follow-up question flow,
- local progress tracking,
- honest quota, network, and safety error states,
- simple `starter/` app for students,
- numbered workshop guide,
- rescue prompts for common failures,
- curated local topic-pack data,
- clear no-API-key student path through `/api/coach`,
- deployed live demo URL in this README,
- QR code or short link for the workshop if needed.

## Deploy Plan

Before publishing the live demo:

1. Run the reference app locally from a simple static server.
2. Verify the mode-first Study Helper / Topic Tutor flow.
3. Verify `/api/coach` behavior, including quota/error states.
4. Deploy the static app and tiny `/api/coach` proxy.
5. Add the live demo URL to this README.
6. Re-test the deployed URL from a clean browser.

## Local Mock And E2E Smoke

Use the local mock when mentors or reviewers need to test the full student flow
without a real provider key:

```bash
npm install
npm run test:e2e
```

The Playwright hook starts `scripts/mock-coach-server.js`, serves the static app,
and provides `POST /api/coach` mock responses for normal study help, follow-up,
quota, network, and personal-data safety paths. Reports are written to
`playwright-report/` and transient test files to `test-results/`.

To use the mock manually:

```bash
npm run serve:mock
```

Then open `http://127.0.0.1:8787/reference/index.html` or
`http://127.0.0.1:8787/starter/index.html`.

## Default Starter Project

The flagship reference app is Soma Study Coach, an LLM-powered learning coach using Grade 7 Integrated Science as the class demo:

- a student selects help mode, year/class, learning area, topic, and study need,
- the app loads local KICD/CBC-aligned sample topic content,
- the app shows the safe context it will send,
- the app calls one shared `/api/coach` endpoint,
- the LLM gives an explanation, examples, misconception help, resources, or a study plan,
- the app supports follow-up study questions,
- the app tracks progress locally,
- the app shows prompt/agent steps: observe, prepare context, ask model, parse response, explain.

Teams can build a smaller version or remix the same pattern into a career explorer, school FAQ bot, reading helper, resource finder, support dashboard, or adaptive practice game.

## Current Status

This repo contains the workshop-facing material. Planning notes, architecture discussion, provider research, and build coordination stay in the Mica workspace.

The current `reference/` app is mode-first: Study Helper / Topic Tutor first, with practice/review as optional input. Local mock E2E covers reference and starter flows across desktop and mobile.

## Simplicity Rule

Keep P0 beginner-sized: static HTML/CSS/JS, local data, browser storage, and one `fetch("/api/coach")`. Do not add frameworks, build tooling, databases, login systems, queues, or orchestration layers unless a later scope explicitly needs them.
