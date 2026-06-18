# Code Yetu Soma Workshop Guide

Use this guide to run the 6-session project studio.

This folder is the live-session runbook. The deeper lecture material lives one
level up in [`docs/workshop/`](../). Use both together:

- [sessions/](./) tells mentors what to run each session.
- [lessons/](../lessons/) teaches the concepts in more detail.
- [labs/](../labs/README.md) gives hands-on practice tasks.
- [Concept To Code Map](../concept-to-code-map.md) connects sessions, lessons,
  files, labs, and AI coding prompts.

Related indexes:

- [Workshop Course](../README.md)
- [Lesson Index](../lessons/README.md)
- [Student Guide](../../student/README.md)
- [Mentor Guide Index](../../mentor/README.md)

## Schedule Variants

Use the same material at different depths depending on the workshop format.

| Format | Best Use | Suggested Path |
|---|---|---|
| 1-day sprint | Demo day, taster session, or outreach event | Session 1 hook, Session 2 starter scaffold, one Lab A edit, one safe `/api/coach` demo, responsible AI note, 2-minute share-out |
| 3-day workshop | Short camp or weekend build | Day 1: Sessions 1-2. Day 2: Sessions 3-4 plus Labs B/C. Day 3: Session 5 testing and Session 6 demo/pitch |
| 6-session studio | Full course path | Run Sessions 1-6 as written, with deep lessons assigned as live teaching or self-study blocks |

For shorter formats, keep mock/demo mode as the default. Use real Gemini mode
only if a mentor has verified the provider quota and key setup before students
arrive.

## Local-First Workshop Rule

Students should develop locally before depending on a real LLM:

1. Install dependencies while internet is available.
2. Run `npm run serve:mock`.
3. Use [`starter/data.js`](../../../starter/data.js) and other local dummy data.
4. Build screens, buttons, context preview, rendering, tests, and demo flow with
   mock/demo responses.
5. Add real Gemini only after the local app works.

After setup, this path works without a Gemini key, without LLM calls, and
without an internet connection. Keep this rule visible in Sessions 1-3.

## What Students Build

A browser-based study coach, starting from one common path: Soma Study Coach.
When the local server is running, open the polished app at `/` and the beginner
scaffold at `/starter/index.html`.

Students first learn the Soma pattern:

```text
pick a Grade 7 Integrated Science topic -> ask a study question -> call /api/coach -> study explanation/resources/plan -> optional Debug Lab context -> follow-up -> progress -> limitations
```

After students understand the starter scaffold and the `/api/coach` pattern,
they can remix Soma into recommenders, planners, reading helpers, resource
finders, or other education tools.

## Session Path

| Session | Guide | Output |
|---|---|---|
| 1 | [Why AI matters and what Soma does](./01-ideation-ai-basics.md) | AI examples, safe Soma demo question, first topic-data ideas |
| 2 | [Web app scaffold](./02-web-app-scaffold.md) | App shell with topic/question flow, setup controls, context preview, result, plan, and tutor sections |
| 3 | [Data and intelligence](./03-data-intelligence.md) | KICD/CBC-aligned sample data, prompt context, and LLM response handling |
| 4 | [Integrate intelligence into UX](./04-integrate-ai-ux.md) | Topic context produces explanations, resources, a plan, and follow-up help |
| 5 | [Testing and responsible AI](./05-testing-responsible-ai.md) | Test cases, progress checks, bug fixes, responsible AI note |
| 6 | [Demo and pitch](./06-demo-pitch.md) | Final demo script, README, project reflection |

## Session To Deep Lesson Map

| Session | Deep Lessons | Code/Lab Tie-Back |
|---|---|---|
| 1 | [Why AI Matters Now](../lessons/01-ai-history-and-future.md) | [Getting Started From Zero](../../getting-started.md) |
| 2 | [How Web Apps Work](../lessons/02-how-web-apps-work.md), [Soma App Architecture](../lessons/03-soma-architecture.md), [Frontend Walkthrough](../lessons/04-frontend-walkthrough.md) | [Lab A](../labs/README.md#lab-a-change-one-ui-section-safely) |
| 3 | [Data And Context](../lessons/05-data-and-context.md), [LLM Prompts](../lessons/06-llm-prompts.md), [Calling The LLM](../lessons/07-calling-the-llm.md) | [Lab B](../labs/README.md#lab-b-add-a-new-topic-pack), [Lab C](../labs/README.md#lab-c-edit-a-tutor-prompt-and-compare-output) |
| 4 | [Parsing And Rendering](../lessons/08-parsing-and-rendering.md), [Language And Swahili](../lessons/09-language-and-swahili.md) | [Lab E](../labs/README.md#lab-e-add-swahili-answer-mode), [Lab F](../labs/README.md#lab-f-debug-a-bad-json-response) |
| 5 | [Safety And Variability](../lessons/12-safety-and-variability.md), [Where LLMs Fit](../lessons/10-where-llms-fit.md) | [Lab G](../labs/README.md#lab-g-replace-a-wasteful-llm-call-with-normal-code) |
| 6 | [Build Your Own](../lessons/13-build-your-own.md) | [Rubric](../../mentor/rubric.md) |

## First Session Checklist

Before session 1:

- run `npm run serve:mock` and open `/` in a browser,
- open `/starter/index.html` in a browser,
- keep [Getting Started From Zero](../../getting-started.md) ready,
- keep [AI Coding Prompts](../../student/ai-coding-prompts.md) ready for
  students.

## Recommended Flow

Each session:

1. 10 minutes: explain the concept.
2. 10 minutes: show one Soma Study Coach layer.
3. 5 minutes: pair check - each student explains one thing they just saw.
4. 35-60 minutes: teams build.
5. 5 minutes: checkpoint - celebrate one visible change or one bug understood.
6. 10 minutes: teams share what changed.

For deeper teaching material, use the [Workshop Course](../README.md) and
[Lesson Index](../lessons/README.md). They add lecture-style lessons on web
apps, Soma architecture, frontend code, LLM calls, prompts, multilingual use,
agents, safety, variability and reputable self-study sources. Use the
[Concept To Code Map](../concept-to-code-map.md) when students need to connect a
concept to the exact files and AI coding prompts.

## Technical Rules

- Default to HTML/CSS/JavaScript only.
- Use dummy data.
- Use the shared `/api/coach` path for AI calls; do not put API keys in student code.
- Use an AI coding assistant for small tasks and debugging, not for blindly generating the whole project.
- Every intelligent output should include a reason.
