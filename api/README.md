# API

This folder holds the server-side coach code.

## [coach.js](./coach.js)

[`api/coach.js`](./coach.js) handles `POST /api/coach`.

It:

- receives the browser request,
- checks that the request uses the right HTTP method,
- parses and validates the JSON body,
- blocks likely personal data,
- chooses mock mode when no `GEMINI_API_KEY` is configured,
- calls Gemini server-side when a private key is configured,
- returns JSON responses and honest error messages.

## Why The Mock Logic Lives Here

The browser needs one safe app endpoint to call. Provider keys must stay on the
server, so the browser calls `/api/coach` instead of calling Gemini directly.

For a beginner workshop, one server folder and one server file are easier to
scan than multiple server-side helper folders. [`api/coach.js`](./coach.js) keeps the small
server story in one place:

- HTTP requests and responses,
- provider calls and provider errors,
- server-side environment variables,
- stable no-key mock/demo responses,
- quota, network, and personal-data test paths.

```text
browser -> /api/coach -> mock response from api/coach.js
browser -> /api/coach -> Gemini server-side call from api/coach.js
```
