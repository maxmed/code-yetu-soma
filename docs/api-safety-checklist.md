# Safety Checklist

Use this before demos, deployments, or major changes. Related docs:
[`/api/coach` Contract](./api-coach-contract.md), [Testing And
Debugging](./testing-debugging.md), and [Student AI Limits And
Advice](./student/ai-limits.md). For setup details, use [Gemini Key
Setup](./gemini-key-setup.md) and [Deploy To Vercel](./deploy-vercel.md).

## Key Safety

- Each team, group, or solo developer app has its own server-side API
  key/provider project unless a mentor intentionally chose a shared setup.
- API keys are not in [reference/](../reference/).
- API keys are not in [starter/](../starter/).
- API keys are not in committed docs except as placeholder variable names.
- `.env` is not committed.
- `/api/coach` is the only provider path used by the browser.
- Debug Lab does not show real key values or key-bearing URLs.

## Student Data Safety

- The app tells students not to enter names, school names, marks, phone numbers,
  or private records.
- The browser blocks obvious personal-data inputs before calling the endpoint.
- The server also blocks obvious personal-data inputs.
- Error messages ask the student to rewrite the question as a learning question.

## AI Honesty

- The app says the answer is study support, not official marks or diagnosis.
- Quota and network failures are shown as failures.
- The app does not invent a fallback answer after a failed coach call.
- Mock/demo mode is clearly labeled when no real provider is configured.

## Debug Safety

- Debug payloads are sanitized.
- `debug.includeLlmCall` is not shown in student-visible debug output.
- Provider request body can be shown, but provider key and key-bearing URL must
  not be shown.
- Raw provider return is okay to inspect only after it is confirmed not to
  include secrets or private learner data.

## Quick Commands

```bash
rg -n "AIza|GEMINI_API_KEY|\\?key=" reference starter
rg -n "AIza|key=AIza|GEMINI_API_KEY=[A-Za-z0-9_-]{20,}" . --glob '!node_modules/**' --glob '!.git/**'
rg -n "includeLlmCall" reference tests
SOMA_TEST_PORT=8790 npm run test:e2e
```

Use `SOMA_TEST_PORT=8790` when the learning server is already open on `8787`.

If `rg` is not installed, use:

```bash
grep -rn "AIza\\|GEMINI_API_KEY\\|?key=" reference starter
grep -rn "AIza\\|key=AIza\\|GEMINI_API_KEY=[A-Za-z0-9_-]\\{20,\\}" . --exclude-dir=node_modules --exclude-dir=.git
```

Expected:

- no real key values,
- no key-bearing frontend URL,
- no real key pasted into docs or root config,
- `includeLlmCall` may appear as an internal request flag and test assertion,
  but it must not appear in student-visible debug output,
- tests pass.
