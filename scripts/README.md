# Scripts

This folder holds small local-development helpers.

## `mock-coach-server.js`

This is the beginner local server used by:

```bash
npm run serve:mock
```

It does three jobs:

1. Serves the polished public app from `reference/` at `/`.
2. Serves the workshop scaffold from `starter/` at `/starter/index.html`.
3. Connects `POST /api/coach` to `api/coach.js` so students can test the same
   browser-to-server pattern they will use in deployment.

It also loads `.env` locally, so mentors can test optional Gemini provider mode
without putting keys in browser JavaScript.

## Why Students Need It

Students should not open the HTML files with `file://` because later lessons use
`/api/coach`. This script gives them one local URL where both the app and the
coach endpoint work:

```text
http://127.0.0.1:8787/
http://127.0.0.1:8787/starter/index.html
```

Mock/demo mode works without an API key, so students can learn, edit, test, and
debug safely before any real provider key is added.
