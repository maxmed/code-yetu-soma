# Architecture

Use this with the [Code Map](./code-map.md), [`/api/coach`
Contract](./api-coach-contract.md), and [Testing And
Debugging](./testing-debugging.md).

This project is intentionally small. The goal is to teach the shape of an AI
tutor without introducing frameworks, databases, accounts, queues, or build
systems.

## Big Picture

Soma has two useful paths:

- **Local mock path:** everything runs from a student's computer, and no real
  LLM provider is called.
- **Deployed AI path:** the browser calls Soma's server endpoint, and that
  server endpoint calls Gemini with a private server-side key.

```text
Student browser
  |
  | loads static files
  v
public app in reference/ or workshop scaffold in starter/
  |
  | POST /api/coach with safe study context
  v
api/coach.js
  |
  | if GEMINI_API_KEY is missing
  v
mock/demo response from api/coach.js

api/coach.js
  |
  | if GEMINI_API_KEY is set
  v
Gemini API server-side call
```

The browser never talks directly to Gemini. The browser only calls
`/api/coach`. This keeps provider keys out of frontend code and student
machines.

## Local Mock Path

Use this path when students run:

```bash
npm run serve:mock
```

```text
student laptop
  |
  | open http://127.0.0.1:8787/
  v
browser loads reference/ or starter/
  |
  | fetch("/api/coach")
  | sends safe JSON:
  | - mode
  | - student question
  | - selected topic data
  | - resources
  | - optional debug request
  v
local Node server: scripts/mock-coach-server.js
  |
  | calls the local handler
  v
api/coach.js
  |
  | no GEMINI_API_KEY found
  v
deterministic mock response
  |
  | sends JSON answer back
  v
browser renders explanation, examples, resources, plan and limits
```

In this mode, the student's machine is both the browser and the server. There
is no Google/Gemini network call. This is the safest first setup for a class.

## Deployed AI Path

Use this path when Soma is deployed and a private `GEMINI_API_KEY` is set on the
server.

```text
student laptop or phone
  |
  | HTTPS request for the page
  v
hosting/CDN serves static files
  |
  | browser runs HTML/CSS/JS
  v
browser fetch("/api/coach")
  |
  | sends safe JSON context
  | does NOT send an API key
  v
Soma server endpoint: api/coach.js
  |
  | reads GEMINI_API_KEY from server environment
  | builds Gemini request body
  | sends HTTPS request to Gemini API
  v
Google Gemini API front door
  |
  | authenticates key
  | checks quota/rate limits/safety systems
  | routes request through provider infrastructure
  v
model serving fleet
  |
  | many accelerator machines run model inference
  | exact machine count is provider-managed and not visible to Soma
  v
Gemini API response
  |
  | raw provider output
  v
api/coach.js parses and normalizes JSON
  |
  | structured Soma response
  v
browser renders the answer
```

The important lesson is that students do not own or run the LLM computers. They
call an API. The provider runs large distributed systems behind that API:
gateways, load balancers, quota systems, safety systems, model servers and
monitoring. A single student request may be handled by more than one machine,
but the exact number changes by provider, model, region, traffic and internal
deployment. Soma only needs one stable contract: `POST /api/coach`.

## What Is Sent At Each Step

| Step | Caller | Receiver | What is sent | What must not be sent |
|---|---|---|---|---|
| Page load | Browser | Static host or local server | Request for HTML, CSS and JavaScript | Provider API key |
| Coach request | Browser | `/api/coach` | Safe study context, selected topic data, question, mode, resources | Names, marks, phone numbers, private school records, provider API key |
| Mock response | `api/coach.js` | Browser | Deterministic JSON answer for learning and tests | Fake claim that a real LLM was called |
| Provider request | `api/coach.js` | Gemini API | Server-side prompt, model settings, response schema, server-side key | Frontend secrets or private student data |
| Provider response | Gemini API | `api/coach.js` | Raw generated content or provider error | API key |
| Render response | `api/coach.js` | Browser | Normalized JSON answer, honest error, optional safe debug payload | Secret key or hidden provider URL with key |

## How Many Machines Are Involved?

For students, the simple answer is:

```text
mock mode: one laptop can run the whole learning loop
deployed mode: browser + Soma server + provider API + provider model fleet
```

For a real LLM provider, the answer is "many machines," not one magic computer.
A production LLM service commonly uses:

- API gateway machines to receive HTTPS requests,
- load balancers to route traffic,
- quota and safety services,
- model-serving workers running on GPU or TPU accelerator machines,
- storage/cache/monitoring systems,
- multiple regions or zones for reliability and latency.

Soma does not need to know the exact machine count. The provider hides that
complexity behind the Gemini API. Students should understand the shape:

```text
our app sends one request -> provider distributes work -> our app gets one response
```

## Main Pieces

### Static apps

- `reference/` powers the public app served at `/` and `/index.html`.
- `starter/` is the smaller workshop scaffold students can edit during lessons.

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
5. Show the optional Debug Lab and Keep Learning section.

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

`api/coach.js` builds deterministic responses for local demos and tests. It
also contains the personal-data checks used by the server.

Mock mode matters because students and mentors can test the app without a paid
or private provider key.

### Local server

`scripts/mock-coach-server.js` serves the static files and wires `/api/coach` to
`api/coach.js`. It also loads `.env` for local testing.

### Tests

`tests/soma-student.spec.js` uses Playwright to test:

- public app success flow,
- workshop scaffold success flow,
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

The Debug Lab is for learning. It shows the safe request, prompt shape,
provider request shape, raw return, parsed response, lab settings, and boundary
notes.

It must never show:

- actual API keys,
- key-bearing provider URLs,
- private student data,
- internal-only debug flags.

## Deeper Reading

- Gemini API docs: https://ai.google.dev/gemini-api/docs
- Gemini API rate limits: https://ai.google.dev/gemini-api/docs/rate-limits
- Google Cloud Load Balancing docs: https://docs.cloud.google.com/load-balancing/docs
- Google Cloud regions and zones: https://docs.cloud.google.com/docs/geography-and-regions
