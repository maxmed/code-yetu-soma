# API

This folder is the server endpoint layer.

## `coach.js`

`api/coach.js` handles `POST /api/coach`.

It:

- receives the browser request,
- checks that the request uses the right HTTP method,
- parses and validates the JSON body,
- blocks likely personal data,
- chooses mock mode when no `GEMINI_API_KEY` is configured,
- calls Gemini server-side when a private key is configured,
- returns JSON responses and honest error messages.

## Why This Is Separate From `lib/`

The browser needs one safe app endpoint to call. Provider keys must stay on the
server, so the browser calls `/api/coach` instead of calling Gemini directly.

`api/` owns the web boundary: HTTP requests, HTTP responses, provider calls,
provider errors, and server-side environment variables.

Reusable deterministic coaching logic lives in `lib/` so mock mode, tests, and
local tools can use it without pretending to be an HTTP endpoint.

```text
browser -> /api/coach -> lib/coach-core.js mock response
browser -> /api/coach -> Gemini server-side call
```
