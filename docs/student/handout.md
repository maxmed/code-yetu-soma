# Student Handout

Use this with the [Student Guide](./README.md), [Project
Cards](./project-cards.md), [Student AI Limits And Advice](./ai-limits.md),
[Evaluate Usefulness And Safety](./evaluate-ai-app.md), and [Testing For Fast
Feedback](./testing-fast-feedback.md).

## Your Challenge

Build a web app that helps with an education problem and includes an intelligent feature.

Build local-first: use dummy data, JavaScript logic, and mock/demo responses
before using a real LLM. After setup, `npm run serve:mock` lets you keep
developing without a Gemini key, without LLM calls, and without an internet
connection.

Your app might:

- recommend what to study next,
- create a revision plan,
- answer school FAQ questions,
- match students to careers,
- suggest resources,
- adapt practice questions.

Example project shapes:

- **Study Coach:** a learner picks a topic, asks one question, and gets an
  explanation, example, common mistake, resource, and next practice step.
- **Revision Planner:** a learner chooses a weak topic and available study
  days; the app makes a short plan and explains why each day matters.
- **Practice Helper:** a learner answers dummy practice questions; the app gives
  feedback, shows the misconception, and suggests what to review next.

## What Counts As Intelligence?

Use your app's server-side `/api/coach` for LLM features. If your team, group,
or solo project uses real Gemini mode, create and configure your own
server-side key/project for that app. Do not put personal keys, provider keys,
or paid API credentials in frontend JavaScript.

Before testing the AI coach, read [Student AI Limits And Advice](./ai-limits.md).
The workshop model is `gemini-3.1-flash-lite`, and request limits are tied to
the server-side key/project configured for your app.

Your app can also use simple JavaScript support logic:

- rules,
- scoring,
- recommendations,
- searching a dataset,
- local progress tracking.

Example:

```text
The user chooses a topic and asks for help.
The app loads the local dummy topic pack from starter/data.js.
The app sends safe context to /api/coach.
The app shows an explanation, examples, resources, and limitations.
```

If the AI coach is unavailable, keep building with local dummy data first. Copy
one topic in [`starter/data.js`](../../starter/data.js), change the topic,
summary, vocabulary, examples, resources, practice questions, and sample
question, then test the screen before spending real AI requests.

## What You Submit

- working web app files,
- dummy data,
- explanation of your intelligence logic,
- usefulness and safety evaluation,
- responsible AI note,
- short demo.

## AI Testing Advice

- Write 3-5 manual test cases before demo. Use [Testing For Fast
  Feedback](./testing-fast-feedback.md) for examples.
- Use [Evaluate Usefulness And Safety](./evaluate-ai-app.md) to check whether
  the app helps the target learner, uses local/dummy data, and blocks private
  data.
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
- How did you check that it is useful and safe?
- What can it get wrong?
- What would you improve next?
