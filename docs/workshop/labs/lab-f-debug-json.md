# Lab F: Debug A Bad JSON Response

## Purpose

Learn why structured output and parsing matter.

## Live Lab Setup

| Item | Value |
|---|---|
| Timebox | 25-35 minutes |
| Prerequisites | `npm run serve:mock` running in terminal |
| Starting URL | `http://127.0.0.1:8787/` |
| Starting files | [`api/coach.js`](../../../api/coach.js), [`reference/app.js`](../../../reference/app.js) |
| Internet needed | No for code reading and mock/demo rehearsal after setup |
| Gemini key needed | No |

## Connect This Lab

**Related lessons:**
- [Parsing And Rendering](../lessons/08-parsing-and-rendering.md) - JSON handling
- [Safety And Variability](../lessons/12-safety-and-variability.md) - error handling

**Code trail:**
- [`api/coach.js`](../../../api/coach.js) - JSON parsing logic
- [`reference/app.js`](../../../reference/app.js) - response rendering and error handling

**Key functions:** `parseGeminiJson`, `normalizeGeminiResponse`,
`normalizeCoachResponse`, `renderCoachResponse`, `renderError`

**End-to-end flow:** find parser -> understand text-around-JSON handling ->
identify error case -> discuss mock simulation

## Mentor Demo (5 minutes)

Before students start:

1. Ask one normal question in the app.
2. Open **Debug Lab** and show the parsed response shape.
3. Open [`api/coach.js`](../../../api/coach.js).
4. Find `parseGeminiJson()`.
5. Explain that an app must not pretend malformed AI output worked.
6. Open [`reference/app.js`](../../../reference/app.js) and point to the render
   path that expects normalized data.

## Student Task (15-25 minutes)

1. Open [`api/coach.js`](../../../api/coach.js).
2. Find `parseGeminiJson()`.
3. Read how it handles provider text that has extra words around a JSON object.
4. Find the error path for text that does not contain a JSON object.
5. Open [`reference/app.js`](../../../reference/app.js).
6. Find where the app normalizes and renders the coach response.
7. Write a short note in your own words:
   - What shape does the UI expect?
   - What happens when parsing fails?
   - What should the student see?
8. In mock mode, discuss with a mentor how you would simulate a malformed
   response for a test before editing code.

## Expected Visible Result

After completing the task, you should see:

- The normal mock/demo response still renders in the app.
- Debug Lab shows a structured response shape.
- You can point to the parser in `api/coach.js`.
- You can point to the renderer or error renderer in `reference/app.js`.
- You have a plain-language explanation of the malformed-response path.

## Quick Checks

Ask yourself:

- [ ] Can I find `parseGeminiJson()`?
- [ ] Can I explain text-around-JSON handling?
- [ ] Can I find the no-JSON error path?
- [ ] Can I explain what the UI should show when parsing fails?

If all four are yes, the lab is complete.

## Common Failures And Rescue

| Problem | Likely Cause | Rescue |
|---|---|---|
| Parser is hard to follow | Too much code was read at once | Start with only `parseGeminiJson()` and trace one return path. |
| Student edits production parser too early | Lab goal is inspection first | Make a written test plan before changing code. |
| UI shows a confusing error | Error path needs clearer rendering | Capture the message and discuss how `renderError` should explain it. |
| Mock mode never produces malformed JSON | Mock path is intentionally stable | Simulate malformed output in a focused test with mentor guidance. |

## Stretch

With a mentor:

1. Add or inspect a focused test for malformed provider output.
2. Confirm the app shows a clear error instead of a broken answer.
3. Confirm no raw key, private data, or unsafe provider details appear.
4. Run the relevant tests before committing.

## Discussion

- Why does the app prefer structured JSON?
- What should the UI show when parsing fails?
- Why should the app avoid pretending malformed output worked?
- What is safer: a clear error or an invented answer?
