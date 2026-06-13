# Code Yetu Soma Docs

Start here if you are new to this repo.

Code Yetu Soma is a beginner-friendly workshop project for building an AI-shaped
study coach. It keeps the app simple: static HTML/CSS/JS in the browser, local
topic data, one server endpoint named `/api/coach`, and optional Gemini provider
calls that stay server-side.

## Best Reading Order

1. `../README.md` - what the workshop is and how to run it.
2. `local-setup.md` - how to install, run, configure, and deploy.
3. `architecture.md` - how the browser, data, server, mock mode, and Gemini mode
   fit together.
4. `code-map.md` - what each important file does.
5. `api-coach-contract.md` - the request and response shape for `/api/coach`.
6. `testing-debugging.md` - how to use tests and the Debug Lab view.
7. `extend-soma.md` - safe beginner tasks for changing or extending the app.
8. `workshop/README.md` - lecture-style lessons, labs, and deeper learning
   sources.
9. `student/handout.md` - student challenge and submission guide.
10. `mentor/mentor-guide.md` - facilitator rhythm and check-in guide.

## The Main App Flow

The public app is now tutor-first:

1. Pick a topic.
2. Ask a question.
3. Get an answer.
4. Open Debug Lab only if you want to inspect context, prompts, model settings, and model output.
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

## Audience Guides

Student-facing workshop docs live in `student/`:

- `student/handout.md`
- `student/ai-limits.md`
- `student/project-cards.md`
- `student/ai-coding-prompts.md`

Mentor-facing workshop docs live in `mentor/`:

- `mentor/mentor-guide.md`
- `mentor/curriculum-source.md`
- `mentor/rubric.md`

Lecture-style workshop course material lives in `docs/workshop/`:

- `workshop/README.md`
- `workshop/sources.md`
- `workshop/lesson-template.md`
- `workshop/concept-to-code-map.md`
- `workshop/lessons/01-how-web-apps-work.md`
- `workshop/lessons/02-soma-architecture.md`
- `workshop/lessons/03-frontend-walkthrough.md`
- `workshop/lessons/04-data-and-context.md`
- `workshop/lessons/05-llm-prompts.md`
- `workshop/lessons/06-calling-the-llm.md`
- `workshop/lessons/07-parsing-and-rendering.md`
- `workshop/lessons/08-language-and-swahili.md`
- `workshop/lessons/09-where-llms-fit.md`
- `workshop/lessons/10-agents.md`
- `workshop/lessons/11-safety-and-variability.md`
- `workshop/lessons/12-build-your-own.md`
- `workshop/labs/README.md`
