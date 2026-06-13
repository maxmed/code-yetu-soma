# Mentor Guide

## Delivery Style

Run this as a project studio:

- short teaching segment,
- live demo,
- team build time,
- mentor check-ins,
- end-of-session share-out.

Avoid long lectures. Students should leave every session with a visible artifact.

## Session Rhythm

Suggested 90-minute session:

| Time | Activity |
|---|---|
| 0-10 min | Recap and today's goal |
| 10-25 min | Concept demo |
| 25-65 min | Team build time |
| 65-80 min | Debugging / mentor rounds |
| 80-90 min | Share-out and next task |

For 2-hour sessions, extend team build time.

## Mentor Check-In Questions

Ask teams:

- What user problem are you solving?
- What data does your app use?
- What decision or recommendation does your app make?
- Can the user see why the app made that recommendation?
- What is one case where your app may be wrong?
- What will you demo in 3 minutes?

## AI Coding Assistant Guidance

Teach students to ask an AI coding assistant for small changes, not whole apps.

Good prompt:

```text
Here is my buildCoachContext function for Soma Study Coach. It should include the Grade 7 topic, student question, support mode, topic snippets, resources, and safety constraints, but the prompt preview is missing the topic. Find the bug and show only the fixed function.
```

Weak prompt:

```text
Make my entire AI education app.
```

## Debugging Protocol

When a team is stuck:

1. Reproduce the problem.
2. Open browser dev tools console.
3. Read the error message.
4. Check file names and script order.
5. Isolate one function.
6. Ask an AI coding assistant for a focused fix.
7. Test again.

## Shared AI Limits

The workshop default model is `gemini-3.1-flash-lite` through the server-side
`/api/coach` endpoint. The active classroom quota table shows 15 requests per
minute, 250K tokens per minute, and 500 requests per day for this model. These
limits are shared by the whole class, not per student.

Use `../student/ai-limits.md` as the student-facing guide. During build time,
encourage teams to debug UI and JavaScript with mock/demo responses first, then
spend real AI calls only on final tutor-flow checks.

The public app also includes an opt-in Debug Lab. Use it to show
students the safe `/api/coach` payload, provider request shape, raw return, and
parsed response. Remind students that provider keys stay server-side and are
not shown in the browser.

## Responsible AI Prompts

Every team should answer:

- What data did we use?
- Is it real or dummy data?
- Who could be helped?
- Who could be harmed?
- What should users not trust blindly?
- How would we test this with real users?

## Facilitation Notes For 15 Schools

- Use one common scaffold to reduce debugging complexity.
- Let teams choose different project data and UI, not different frameworks.
- Keep everything browser-only unless a mentor can support setup.
- Have a reference solution available for rescue.
- Encourage teams to document limitations instead of pretending the AI is perfect.
