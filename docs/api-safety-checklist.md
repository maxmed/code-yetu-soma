# Safety Checklist

Use this before demos, deployments, or major changes.

## Key Safety

- API keys are not in `reference/`.
- API keys are not in `starter/`.
- API keys are not in committed docs except as placeholder variable names.
- `.env` is not committed.
- `/api/coach` is the only provider path used by the browser.
- Under The Hood does not show real key values or key-bearing URLs.

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
rg -n "includeLlmCall" reference tests
npm run test:e2e
```

Expected:

- no real key values,
- no key-bearing frontend URL,
- `includeLlmCall` may appear as an internal request flag and test assertion,
  but it must not appear in student-visible debug output,
- tests pass.
