# Lib

This folder holds reusable local logic shared by the server endpoint and tests.

## `coach-core.js`

`lib/coach-core.js` builds deterministic mock/demo coach responses.

It:

- creates stable no-key study-coach responses for local learning,
- shares personal-data detection with the server endpoint,
- provides quota, network, and personal-data test paths,
- keeps mock behavior repeatable for Playwright tests.

## Why This Is Separate From `api/`

`api/` owns the HTTP endpoint and provider wiring. `lib/` owns reusable logic
that does not need HTTP, Vercel, Gemini, or private keys.

This keeps the project easier to test and easier to teach:

```text
api/coach.js receives POST /api/coach
api/coach.js calls lib/coach-core.js when mock mode is active
tests can rely on the same deterministic behavior
```

If all of this lived inside `api/coach.js`, tests and local tools would either
duplicate mock logic or import a server route as if it were a utility.
