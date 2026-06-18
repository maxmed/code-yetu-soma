# Testing And Debugging

Use this with [Local Setup](./local-setup.md), [Safety
Checklist](./api-safety-checklist.md), the [Code Map](./code-map.md), and the
student-facing [Testing For Fast Feedback](./student/testing-fast-feedback.md)
guide.

## Beginner Glossary

Use this section when a command or test word is unfamiliar.

| Term | Plain Meaning | Why It Exists In Soma |
|---|---|---|
| Terminal | The command window where you run project commands. | Soma uses commands to start the local app and run tests. |
| Local server | A small web server running on your computer. | It serves the app and makes `/api/coach` available during local testing. |
| Port | A number that points to one local server, like `8787`. | Ports let your browser and test runner find the right local app. |
| Browser console | The developer-tools panel that shows JavaScript errors. | It helps you see why a button, form, or script failed. |
| Playwright | The browser automation tool used by this repo. | It opens Soma, clicks buttons, fills forms, and checks results automatically. |
| End-to-end test | A test that checks a full user path in the browser. | It proves the page, JavaScript, server endpoint, and error handling still work together. |
| Smoke test | A short set of important checks. | It catches obvious breakage before a demo or commit. |
| Selector | A way for tests to find something on the page. | If text, labels, or IDs change, selectors may need updating. |
| ID | A stable HTML name such as `coachButton` or `studentQuestionInput`. | JavaScript and tests use IDs to find inputs, buttons, and output areas. |
| Pass/fail | Whether a check matched the expected result. | A fail points to the next thing to inspect; it is not a personal mistake. |

## Fast Confidence Check

If no local server is already running, run:

```bash
npm run test:e2e
```

This runs the Playwright smoke tests. Playwright opens the app in a browser and
checks the main student flows automatically.

If `npm run serve:mock` is already running on `8787`, keep it open and give
Playwright its own temporary port:

```bash
SOMA_TEST_PORT=8790 npm run test:e2e
```

This tells the test server to use port `8790` instead of `8787`.

Expected result:

```text
10 passed
```

That means all 10 browser checks passed.

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

Meaning: another local server is already using the port.

Fix: stop the old server, then run `npm run serve:mock` again. If you are
running tests while the learning server stays open, use
`SOMA_TEST_PORT=8790 npm run test:e2e`.

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

Beginner rule: if you changed the words a user sees, a test that searches for
the old words may fail even when the app is still correct.

### Tests fail after moving an element

Cause: JavaScript expects specific IDs from [`index.html`](../reference/index.html).

Fix: preserve IDs such as `studentQuestionInput`, `coachButton`,
`coachOutput`, `debugOutput`, `keepLearningSection`, `planOutput`, and
`followUpInput`, or update [`app.js`](../reference/app.js) and tests together.

Beginner rule: keep IDs stable unless you are ready to update JavaScript and
tests in the same change.

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
