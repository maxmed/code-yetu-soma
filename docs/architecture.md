# Architecture

This project is intentionally small. The goal is to teach the shape of an AI
tutor without introducing frameworks, databases, accounts, queues, or build
systems.

## Big Picture

```text
Student browser
  |
  | loads static files
  v
reference/ or starter/
  |
  | POST /api/coach with safe study context
  v
api/coach.js
  |
  | if GEMINI_API_KEY is missing
  v
lib/coach-core.js mock/demo response

api/coach.js
  |
  | if GEMINI_API_KEY is set
  v
Gemini API server-side call
```

The browser never talks directly to Gemini. The browser only calls
`/api/coach`. This keeps provider keys out of frontend code and student
machines.

## Main Pieces

### Static apps

- `reference/` is the complete working demo.
- `starter/` is the simpler version students can edit.

Both are plain HTML/CSS/JS. They can be served by any static server, but the
coach call only works when `/api/coach` is available.

### Topic data

- `reference/data.js` and `starter/data.js` hold local sample curriculum data.
- The app uses this data to build context for the coach.
- This is workshop sample content, not official curriculum material.

### Browser logic

`reference/app.js` does five main jobs:

1. Fill the topic, mode, grade, and learning-area controls.
2. Build a safe request object from the selected topic and student question.
3. Send that request to `/api/coach`.
4. Render the structured coach response.
5. Show the optional Under The Hood debug view and Keep Learning section.

### Server endpoint

`api/coach.js` receives `POST /api/coach` requests.

It handles:

- method checks,
- JSON body parsing,
- personal-data blocking,
- mock/demo fallback,
- Gemini provider calls when configured,
- provider error handling,
- sanitized debug payloads.

### Mock/demo logic

`lib/coach-core.js` builds deterministic responses for local demos and tests.
It also contains the shared personal-data checks used by the server.

Mock mode matters because students and mentors can test the app without a paid
or private provider key.

### Local server

`scripts/mock-coach-server.js` serves the static files and wires `/api/coach` to
`api/coach.js`. It also loads `.env` for local testing.

### Tests

`tests/soma-student.spec.js` uses Playwright to test:

- reference app success flow,
- starter app success flow,
- follow-up flow,
- local progress checkboxes,
- quota and network errors,
- personal-data blocking,
- desktop and mobile viewports.

## Data Boundary

Keep this boundary clear:

```text
Frontend:
  topic selection, student question, local display, localStorage progress

Server:
  API key, provider call, prompt construction, provider errors
```

If a value is secret, it belongs on the server. If a value is student-facing, it
must be safe to show in the browser.

## Debug Boundary

The Under The Hood view is for learning. It shows the safe request, prompt shape,
provider request shape, raw return, parsed response, and boundary notes.

It must never show:

- actual API keys,
- key-bearing provider URLs,
- private student data,
- internal-only debug flags.
