# Scripts

This folder holds small local tools for running and testing Soma.

## `mock-coach-server.js`

`npm run serve:mock` runs this file.

It:

- serves the polished app at `/`, `/index.html`, and `/reference/`,
- serves the beginner scaffold at `/starter/index.html`,
- serves docs so local documentation links can be checked,
- connects local `POST /api/coach` requests to `api/coach.js`,
- loads `.env` for local Gemini testing when a private key is configured,
- falls back to deterministic mock/demo responses when no key is configured.

## Why Students Need It

Students should not need Vercel or a Gemini key to learn the project. This
server lets them run the same browser-to-server pattern locally:

```text
browser app -> /api/coach -> mock response or server-side Gemini call
```

That is the core safety lesson: the browser calls one app endpoint, and provider
keys stay server-side.

## Common Command

```bash
npm run serve:mock
```

Then open:

```text
http://127.0.0.1:8787/
http://127.0.0.1:8787/starter/index.html
```
