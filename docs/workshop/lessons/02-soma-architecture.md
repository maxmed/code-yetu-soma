# Lesson 2: Soma App Architecture

Time: 30-40 minutes

Audience: beginners who can open files and follow a request through the app.

## Learning Goals

By the end, students can:

- explain the difference between frontend and backend,
- describe how Soma uses local topic data,
- trace a request from the browser to `/api/coach`,
- explain mock mode versus Gemini mode,
- explain why API keys must stay on the server.

## Key Ideas

Architecture means how the parts of an app fit together.

Soma has four main parts:

1. The browser app in `reference/`.
2. Local topic data in `reference/data.js`.
3. The server endpoint in `api/coach.js`.
4. Mock response logic in `lib/coach-core.js`, or Gemini when a server-side key
   is configured.

The most important boundary is this:

```text
browser code never sees provider keys
```

The browser calls `/api/coach`. The server decides whether to use mock mode or
Gemini mode.

## Architecture Diagram

```text
Browser
  |
  | reads HTML/CSS/JS
  | loads topic packs from reference/data.js
  | builds safe JSON request
  v
POST /api/coach
  |
  | if no GEMINI_API_KEY
  |----> lib/coach-core.js mock response
  |
  | if GEMINI_API_KEY exists
  |----> Gemini API request from server
  |
  v
structured JSON response
  |
  v
Browser renders answer, resources, plan, Debug Lab
```

## Find It In This Repo

| File | Why It Matters |
|---|---|
| `reference/app.js` | Builds the request in `buildCoachContext()` and sends it in `askStudyCoach()`. |
| `reference/data.js` | Provides safe local topic content and resources. |
| `api/coach.js` | Handles `POST /api/coach`, blocks personal data, calls mock or Gemini. |
| `lib/coach-core.js` | Builds deterministic mock responses for local demos and tests. |
| `.env.example` | Shows the server-side environment variables for Gemini mode. |
| `docs/api-coach-contract.md` | Documents the request and response shape. |

## Map To Soma Code

- Public app entry point: `/` -> `reference/index.html`.
- Browser request builder: `reference/app.js` `buildCoachContext()`.
- Browser API call: `reference/app.js` `askStudyCoach()`.
- Server endpoint: `api/coach.js` exported handler.
- Mock mode: `lib/coach-core.js` `buildCoachResult()`.
- Gemini mode: `api/coach.js` `callGemini()` and `buildGeminiCall()`.
- Local server route: `scripts/mock-coach-server.js`.
- Deployment route: `vercel.json`.
- Helpful prompt: [Fix /api/coach 404 Or 429](../../student/ai-coding-prompts.md#fix-apicoach-404-or-429).

## Request Flow

The frontend builds a context object with:

- mode,
- student setup,
- student question,
- optional practice answers,
- curriculum context,
- resources,
- debug request,
- follow-up question.

Then it sends that object to `/api/coach`.

The backend checks:

- was the request a `POST`,
- is the body valid JSON,
- does it appear to contain personal data,
- is a Gemini API key configured,
- should debug data be included.

## Mock Mode

Mock mode is used when `GEMINI_API_KEY` is not set.

Mock mode is valuable because:

- students can test without paying for provider calls,
- workshops can keep running if quota is exhausted,
- tests are deterministic,
- mentors can show the full app shape before configuring real AI.

Mock mode does not prove the provider will answer well. It proves the app flow
works.

## Gemini Mode

Gemini mode is used when `GEMINI_API_KEY` is set on the server.

In Gemini mode, `api/coach.js`:

- builds a server-side prompt,
- builds a provider request body,
- calls Gemini from the server,
- parses the provider response,
- normalizes it into the same shape used by mock mode,
- returns structured JSON to the browser.

The browser still only knows `/api/coach`.

## Why Keys Stay Server-Side

An API key is a credential. If it is placed in frontend JavaScript, any browser
user can inspect it. If it is committed to Git, it may become public. If it is
shared with students, it can be copied or exhausted.

Soma's rule is simple:

```text
student browser -> /api/coach -> provider
```

Never:

```text
student browser -> provider with API key
```

## Worked Soma Example

Open `api/coach.js` and find:

```js
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
```

This reads the key from the server environment. It does not read from the
browser.

Then find the mock path:

```js
if (!GEMINI_API_KEY) {
  const result = buildCoachResult(payload);
  ...
}
```

This means the app can run without a real provider key.

## Live Demo

1. Run `npm run serve:mock`.
2. Open the public app.
3. Ask a question.
4. Open Debug Lab.
5. Show that the provider is `mock`.
6. Show the browser payload and parsed response.
7. Explain that no external provider call was made.

Optional mentor demo:

1. Configure a private `.env` with `GEMINI_API_KEY`.
2. Restart the server.
3. Ask the same question.
4. Show that the browser still calls `/api/coach`.

Do not show or paste the key.

## Student Exercise

Task: Find the boundary between frontend and backend.

Steps:

1. In `reference/app.js`, find `fetch("/api/coach"`.
2. In `api/coach.js`, find `module.exports = async function handler`.
3. In `lib/coach-core.js`, find `makeCoachResponse`.
4. Draw the request path in your notebook.

Expected result: students can explain which file runs in the browser and which
file runs on the server.

Stretch: add one harmless field to the debug context and inspect it in Debug
Lab.

## Reflection Questions

- What is the frontend responsible for?
- What is the backend responsible for?
- Why is mock mode useful even when real AI is available?
- What would go wrong if the API key were placed in `reference/app.js`?
- Which part of the system should enforce personal-data blocking?

## Mentor Notes

Students may think "AI app" means the browser talks directly to a model. Keep
returning to the security boundary. The server endpoint is what makes the app
deployable and teachable.

Use Debug Lab as evidence. It shows the safe request and provider request shape,
but not secrets.

## Deeper Reading

- Gemini API docs: https://ai.google.dev/gemini-api/docs
- Gemini rate limits: https://ai.google.dev/gemini-api/docs/rate-limits
- OWASP LLM Prompt Injection Prevention: https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html
- W3C WCAG Understanding Docs: https://www.w3.org/WAI/WCAG22/Understanding/
