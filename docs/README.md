# Code Yetu Soma Docs

Start here when you want to learn, teach, run, test, or extend Soma.

Code Yetu Soma is a beginner-friendly workshop project for building an
AI-shaped study coach. It keeps the app simple: static HTML/CSS/JS in the
browser, local topic data, one server endpoint named `/api/coach`, and optional
Gemini provider calls that stay server-side.

## Quick Navigation

| I want to... | Start here | Then use |
|---|---|---|
| run the app | [Local Setup](./local-setup.md) | [Testing And Debugging](./testing-debugging.md) |
| use a real Gemini key | [Gemini Key Setup](./gemini-key-setup.md) | [Safety Checklist](./api-safety-checklist.md) |
| deploy the demo | [Deploy To Vercel](./deploy-vercel.md) | [Gemini Key Setup](./gemini-key-setup.md) |
| understand the architecture | [Architecture](./architecture.md) | [Code Map](./code-map.md) |
| teach the workshop | [Workshop Course](./workshop/README.md) | [6-Session Runbook](./workshop/sessions/README.md) |
| learn the concepts | [Lesson Index](./workshop/lessons/README.md) | [Concept To Code Map](./workshop/concept-to-code-map.md) |
| understand AI history | [The Story Of AI](./workshop/lessons/13-ai-history-and-future.md) | [Reviewed Source Spine](./workshop/sources.md) |
| do hands-on practice | [Workshop Labs](./workshop/labs/README.md) | [AI Coding Prompts](./student/ai-coding-prompts.md) |
| build a student project | [Student Guide](./student/README.md) | [Project Cards](./student/project-cards.md) |
| mentor teams | [Mentor Guide](./mentor/README.md) | [Rubric](./mentor/rubric.md) |
| review safety | [Safety Checklist](./api-safety-checklist.md) | [`/api/coach` Contract](./api-coach-contract.md) |
| improve the UI | [Design Docs](./design/README.md) | [UI Redesign Brief](./design/ui-redesign-brief.md) |

## Workshop Material

Use these together:

- [Workshop Course](./workshop/README.md) - the main curriculum hub.
- [6-Session Runbook](./workshop/sessions/README.md) - what to run each live
  session.
- [Lesson Index](./workshop/lessons/README.md) - the 12 deeper teaching
  lessons.
- [The Story Of AI](./workshop/lessons/13-ai-history-and-future.md) - lecture
  material on AI history, machine learning, LLMs, multimodal systems, computer
  use, robotics, and future directions.
- [Workshop Labs](./workshop/labs/README.md) - hands-on practice tasks.
- [Concept To Code Map](./workshop/concept-to-code-map.md) - connects sessions,
  lessons, labs, code files, and AI coding prompts.
- [Reviewed Source Spine](./workshop/sources.md) - reputable sources behind the
  teaching material.
- [Lesson Template](./workshop/lesson-template.md) - structure for adding new
  lessons.

## Student Path

1. Read the [Student Guide](./student/README.md).
2. Try the live demo from the [project README](../README.md).
3. Use the [Student Handout](./student/handout.md) for the challenge.
4. Pick a direction from [Project Cards](./student/project-cards.md).
5. Read [Student AI Limits And Advice](./student/ai-limits.md) before making AI
   calls.
6. Use [AI Coding Prompts](./student/ai-coding-prompts.md) when stuck.
7. Use [Workshop Labs](./workshop/labs/README.md) for focused practice.

## Mentor Path

1. Start with the [Mentor Guide](./mentor/README.md).
2. Use the [6-Session Runbook](./workshop/sessions/README.md) to plan each
   session.
3. Use the [Workshop Course](./workshop/README.md) and
   [Lesson Index](./workshop/lessons/README.md) for deeper teaching blocks.
4. Use the [Concept To Code Map](./workshop/concept-to-code-map.md) when a team
   needs to connect an idea to files, labs, or prompts.
5. Use the [Rubric](./mentor/rubric.md) for demos.
6. Use [Curriculum Content Source](./mentor/curriculum-source.md) to keep Grade 7
   Integrated Science content boundaries clear.

## Developer Path

1. [Local Setup](./local-setup.md) - install, run, configure, and deploy.
2. [Gemini Key Setup](./gemini-key-setup.md) - get a key, add it to `.env`, and
   test provider mode safely.
3. [Deploy To Vercel](./deploy-vercel.md) - create a Vercel project, set
   environment variables, deploy, and smoke-test the live app.
4. [Architecture](./architecture.md) - browser, data, server, mock mode, and
   Gemini mode.
5. [Code Map](./code-map.md) - where to change common things.
6. [`/api/coach` Contract](./api-coach-contract.md) - request and response shape.
7. [Testing And Debugging](./testing-debugging.md) - Playwright, manual checks,
   Debug Lab, and commit gates.
8. [Safety Checklist](./api-safety-checklist.md) - key, data, AI honesty, and
   debug checks.
9. [Extend Soma](./extend-soma.md) - safe beginner-sized extension tasks.

## Design Path

- [Design Docs](./design/README.md) - design navigation.
- [UI Design Principles For Learning Apps](./design/ui-principles-for-students.md)
  - student-facing principles.
- [Soma UI Redesign Brief](./design/ui-redesign-brief.md) - the next public demo
  design plan.

## The Main App Flow

The public app is tutor-first:

1. Pick a topic.
2. Ask a question.
3. Get an answer.
4. Open Debug Lab only if you want to inspect context, prompts, model settings,
   and model output.
5. Use Keep Learning after the first answer for follow-up questions and a study
   plan.

## Important Rules

- Never put API keys in `reference/`, `starter/`, or browser JavaScript.
- Students should use dummy learning questions, not personal data.
- `/api/coach` is the only path from the browser to the coach.
- Mock mode is valid for local demos and tests.
- Gemini mode is enabled only by server-side environment variables.
- Keep changes beginner-sized unless a mentor explicitly approves a larger
  architecture change.
