# Lesson 8: Parsing And Rendering

Time: 30-40 minutes

Audience: students who understand JSON objects and page rendering.

## Learner Hook

The AI may return a wall of JSON text. Your job is to turn that raw material
into something a student can actually read, trust and use.

## Try This Now

Open Debug Lab after a coach run and compare Raw coach return with Parsed app
response. Find one field that becomes a visible answer section.

## Real-World Connection

Weather apps do this constantly. Raw API data becomes a simple card like
`25C and sunny`, with icons, warnings and a forecast that humans can scan.

## Learning Goals

By the end, students can:

- explain the difference between raw model output and app-ready data,
- explain why Soma normalizes responses,
- identify the main response fields,
- explain how answer sections are rendered,
- describe what should happen when parsing fails.

## Key Ideas

An LLM may return text that is messy, incomplete, or not shaped exactly how the
frontend expects. The app should not paste raw output blindly.

Soma uses a response contract. The server and frontend both expect fields such
as:

- `studyFeedback`,
- `topicExplanation`,
- `examples`,
- `misconceptionHelp`,
- `recommendedResources`,
- `sevenDayPlan`,
- `limitations`.

## Response Flow

```text
provider or mock return
        |
        v
parse JSON
        |
        v
normalize fields
        |
        v
frontend validates shape
        |
        v
render answer sections
```

## Find It In This Repo

| File | Why It Matters |
|---|---|
| `api/coach.js` | `parseGeminiJson()` and `normalizeGeminiResponse()` prepare provider output; mock mode returns the same response shape. |
| `reference/app.js` | `normalizeCoachResponse()` and `renderCoachResponse()` prepare UI. |
| `docs/api-coach-contract.md` | Documents required request/response fields. |

## Map To Soma Code

- Parse provider text: `api/coach.js` `parseGeminiJson()`.
- Normalize provider result: `api/coach.js` `normalizeGeminiResponse()`.
- Mock response shape: `api/coach.js` `makeCoachResponse()`.
- Frontend response check: `reference/app.js` `normalizeCoachResponse()`.
- Render answer sections: `reference/app.js` `renderCoachResponse()`.
- Render study plan: `reference/app.js` `renderPlan()`.
- Render debug parsed response: `reference/app.js` `renderDebug()`.
- Related lab: [Lab F: Debug A Bad JSON Response](../labs/README.md#lab-f-debug-a-bad-json-response).
- Helpful prompt: [Response Not Rendering](../../student/ai-coding-prompts.md#response-not-rendering).

## Worked Soma Example

The server attempts to parse Gemini text:

```js
const parsed = parseGeminiJson(text);
const normalized = normalizeGeminiResponse(parsed, payload.mode, topic);
```

If the model returns missing non-critical fields, the server fills safe defaults.
If the output cannot be parsed, the server returns an error instead of pretending
the answer worked.

The frontend then checks:

```js
normalizeCoachResponse(payload, context.mode)
```

Only after that does it render the answer.

## Rendering Strategy

Soma does not render one giant AI paragraph. It uses sections:

- Study feedback,
- Topic explanation,
- Examples,
- Misconception help,
- Likely weak areas,
- Recommended resources,
- Limitations,
- 7-day plan.

This helps students scan the answer and helps mentors discuss which part is
useful or questionable.

## Why Escaping Matters

When the app renders data into HTML, it uses `escapeHtml()`. This prevents text
from being treated as page markup.

Rule:

```text
model text is text, not trusted HTML
```

## Live Demo

1. Ask a question.
2. Open Debug Lab.
3. Compare **Raw coach return** with **Parsed app response**.
4. Find the same fields in the visible answer.
5. Explain how each field becomes a section.

## Student Exercise

Task: map response fields to UI sections.

Create a table with:

- response field,
- where it appears on the page,
- what should happen if it is empty.

Expected result: students can connect JSON to UI.

Stretch: add a new visible section for an existing response field.

## Reflection Questions

- Why is raw model output not enough?
- Why is JSON useful?
- What should happen when parsing fails?
- Why does the app escape model text?
- Which fields are essential for a useful answer?

## Mentor Notes

This lesson is a good place to teach skepticism. A response can be valid JSON
but still be wrong. Parsing checks shape, not truth. Students still need
evaluation, source limits and human review.

## Deeper Reading

- MDN JSON: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON
- MDN Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- OWASP LLM Prompt Injection Prevention: https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html

## Inspiring Resources

- JSON Crack visualizer - https://jsoncrack.com/
- Google AI Experiment: Quick, Draw! - https://quickdraw.withgoogle.com/
