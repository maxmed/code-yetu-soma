# Testing And Debugging

Use this with [Local Setup](./local-setup.md), [Safety
Checklist](./api-safety-checklist.md), the [Code Map](./code-map.md), and the
student-facing [Testing For Fast Feedback](./student/testing-fast-feedback.md)
guide.

## Fast Confidence Check

If no local server is already running, run:

```bash
npm run test:e2e
```

If `npm run serve:mock` is already running on `8787`, keep it open and give
Playwright its own temporary port:

```bash
SOMA_TEST_PORT=8790 npm run test:e2e
```

Expected result:

```text
10 passed
```

The tests cover:

- public app happy path,
- workshop scaffold happy path,
- follow-up questions,
- local progress checkboxes,
- quota errors,
- network errors,
- personal-data blocking,
- desktop and mobile layouts.

## Manual Browser Check

Start the local server:

```bash
npm run serve:mock
```

Open:

```text
http://127.0.0.1:8787/
```

Check:

1. The first screen shows Topic, Question, and Your Answer.
2. Keep Learning is hidden before the first successful answer.
3. Ask coach returns a structured answer.
4. Keep Learning appears after the answer.
5. Debug Lab is hidden by default.
6. Opening Debug Lab shows safe context, prompt, model settings, request shape, and response details.
7. No API key is shown.

## Debug Lab View

The Debug Lab is a teaching and debugging view.

Use it to inspect and experiment with:

- browser request payload,
- server prompt,
- provider request shape,
- raw return,
- parsed response,
- endpoint/model/status notes,
- safe prompt/model/temperature/token overrides.

Do not use it to show secrets. If a key or key-bearing URL appears in this view,
that is a blocker.

## Common Problems

### Port already in use

Symptom:

```text
EADDRINUSE
```

Fix: another local server is already using the port. Stop the old server, then
run `npm run serve:mock` again.

### `/api/coach` returns 404

Cause: the app is being opened as a static file or from a server that does not
provide `/api/coach`.

Fix: use `npm run serve:mock` or deploy with [`api/coach.js`](../api/coach.js).

### Gemini quota or rate limit

Cause: the Gemini project or model quota is exhausted or unavailable.

Fix: use mock mode for workshop testing, try a different configured model, or
check the provider project quota.

### Personal data blocked

Cause: the question includes names, school names, marks, phone numbers, or other
private records.

Fix: rewrite the question as a learning question only.

### Tests fail after changing text

Cause: Playwright tests search for visible labels and output text.

Fix: update [`tests/soma-student.spec.js`](../tests/soma-student.spec.js) so the tests match the intended UI.

### Tests fail after moving an element

Cause: JavaScript expects specific IDs from [`index.html`](../reference/index.html).

Fix: preserve IDs such as `studentQuestionInput`, `coachButton`,
`coachOutput`, `debugOutput`, `keepLearningSection`, `planOutput`, and
`followUpInput`, or update [`app.js`](../reference/app.js) and tests together.

## Before You Commit

Run:

```bash
node --check reference/app.js
node --check starter/app.js
node --check api/coach.js
node --check scripts/mock-coach-server.js
git diff --check
npm run test:e2e
```

If the learning server is already running on `8787`, use the port-safe form:

```bash
SOMA_TEST_PORT=8790 npm run test:e2e
```
