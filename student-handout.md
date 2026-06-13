# Student Handout

## Your Challenge

Build a web app that helps with an education problem and includes an intelligent feature.

Your app might:

- recommend what to study next,
- create a revision plan,
- answer school FAQ questions,
- match students to careers,
- suggest resources,
- adapt practice questions.

## What Counts As Intelligence?

Use the course-provided `/api/coach` for LLM features. Do not use paid APIs, student API keys, or provider keys in frontend JavaScript.

Before testing the AI coach, read `student-ai-limits.md`. The shared workshop
model is `gemini-3.1-flash-lite`, and the whole class shares the same request
limits.

Your app can also use simple JavaScript support logic:

- rules,
- scoring,
- recommendations,
- searching a dataset,
- local progress tracking.

Example:

```text
The user chooses a topic and asks for help.
The app loads the local topic pack.
The app sends safe context to /api/coach.
The app shows an explanation, examples, resources, and limitations.
```

## What You Submit

- working web app files,
- dummy data,
- explanation of your intelligence logic,
- responsible AI note,
- short demo.

## AI Testing Advice

- Preview your context before calling `/api/coach`.
- Do not click the coach button repeatedly while debugging.
- Fix layout and JavaScript bugs without spending AI requests.
- If you see a quota or rate-limit error, stop and tell a mentor.

## Demo Questions

Be ready to answer:

- Who is your app for?
- What problem does it solve?
- What data does it use?
- What intelligent decision does it make?
- What can it get wrong?
- What would you improve next?
