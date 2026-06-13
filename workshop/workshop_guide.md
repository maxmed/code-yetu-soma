# Code Yetu Soma Workshop Guide

Use this guide to run the 6-session project studio.

## What Students Build

A browser-based education MVP with a simple intelligence layer:

- recommender,
- scoring/classification logic,
- retrieval assistant,
- or simple agent workflow.

The default project is Soma Study Coach in `../reference/`. It demonstrates the full course arc:

```text
pick a Grade 7 Integrated Science topic -> ask a study question -> call /api/coach -> study explanation/resources/plan -> optional Under The Hood context -> follow-up -> progress -> limitations
```

## Session Path

| Session | Guide | Output |
|---|---|---|
| 1 | [Ideation and AI basics](./01-ideation-ai-basics.md) | Problem, user, project choice, AI idea |
| 2 | [Web app scaffold](./02-web-app-scaffold.md) | App shell with topic/question flow, setup controls, context preview, result, plan, and tutor sections |
| 3 | [Data and intelligence](./03-data-intelligence.md) | KICD/CBC-aligned sample data, prompt context, and LLM response handling |
| 4 | [Integrate intelligence into UX](./04-integrate-ai-ux.md) | Topic context produces explanations, resources, a plan, and follow-up help |
| 5 | [Testing and responsible AI](./05-testing-responsible-ai.md) | Test cases, progress checks, bug fixes, responsible AI note |
| 6 | [Demo and pitch](./06-demo-pitch.md) | Final demo script, README, project reflection |

## First Session Checklist

Before session 1:

- print or share `../docs/student/project-cards.md`,
- open `../reference/index.html` in a browser,
- keep `../docs/student/ai-coding-prompts.md` ready for students.

## Recommended Flow

Each session:

1. 10 minutes: explain the concept.
2. 10 minutes: show one Soma Study Coach layer.
3. 40-70 minutes: teams build.
4. 10 minutes: teams share what changed.

## Technical Rules

- Default to HTML/CSS/JavaScript only.
- Use dummy data.
- Use the shared `/api/coach` path for AI calls; do not put API keys in student code.
- Use an AI coding assistant for small tasks and debugging, not for blindly generating the whole project.
- Every intelligent output should include a reason.
