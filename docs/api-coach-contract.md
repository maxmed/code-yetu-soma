# `/api/coach` Contract

The browser calls one endpoint:

```text
POST /api/coach
```

The browser sends study context. The server returns structured JSON that the app
can render.

## Why This Endpoint Exists

The endpoint protects three boundaries:

1. API keys stay on the server.
2. Student-facing code has one simple request shape.
3. The app can swap mock/demo mode and Gemini mode without changing the browser.

## Request Shape

The reference app builds a request like this:

```json
{
  "mode": "learn-topic",
  "studentSetup": {
    "grade": "Grade 7",
    "gradeBand": "Junior School",
    "ageRange": "12-13",
    "learningArea": "Integrated Science",
    "topic": "Mixtures and separation",
    "studyNeed": "Explain this topic"
  },
  "studentQuestion": "How do we separate salt and sand?",
  "practiceAnswers": [],
  "curriculumContext": {
    "sourceLabel": "Simplified KICD/CBC-aligned sample snippets for workshop use",
    "snippets": [],
    "constraints": []
  },
  "resources": [],
  "debug": {
    "includeLlmCall": true
  },
  "followUpQuestion": ""
}
```

Important fields:

- `mode`: what kind of help the student wants.
- `studentSetup`: grade, learning area, topic, and study need.
- `studentQuestion`: the main student question.
- `practiceAnswers`: optional practice inputs.
- `curriculumContext`: local topic pack and safety constraints.
- `resources`: local resources to recommend.
- `debug.includeLlmCall`: asks the server to return a sanitized debug snapshot.
- `followUpQuestion`: used only for follow-up mode.

## Response Shape

Successful `/api/coach` responses should look like this. Mock mode returns this
full shape directly. Gemini mode is normalized server-side so the browser can
use the same shape.

```json
{
  "mode": "learn-topic",
  "studyFeedback": "Good question...",
  "topicExplanation": "A mixture is...",
  "examples": ["Example one", "Example two"],
  "likelyWeakAreas": [],
  "misconceptionHelp": ["Common mistake..."],
  "recommendedResources": [
    {
      "title": "Topic review card",
      "reason": "Use this to revise..."
    }
  ],
  "sevenDayPlan": [
    {
      "day": 1,
      "title": "Read the topic pack",
      "task": "Write the key idea in your own words."
    }
  ],
  "followUpAnswer": "",
  "limitations": "This is study support, not official marks or diagnosis."
}
```

The reference app normalizes the response before rendering. If a Gemini response
misses a non-critical field, the app fills in safe defaults where possible. The
starter app reads the same core fields but intentionally ignores
`likelyWeakAreas` to stay smaller.

## Follow-Up Mode

For a follow-up question, the browser reuses the previous context and sends:

```json
{
  "mode": "follow-up",
  "followUpQuestion": "Can you give another local example?"
}
```

The response must include `followUpAnswer`.

## Error Responses

The app expects honest errors. It should not pretend a coach response worked if
the endpoint failed.

Common errors:

```json
{ "error": "Use POST /api/coach." }
```

```json
{ "error": "The classroom coach quota or rate limit was reached. Try again later or ask a mentor." }
```

```json
{ "error": "The request was blocked because it may include personal data. Remove names, schools, marks, phone numbers or private records." }
```

## Mock Mode

If `GEMINI_API_KEY` is not set, `api/coach.js` calls `lib/coach-core.js` and
returns a deterministic mock/demo response.

This is the normal local test path.

## Gemini Mode

If `GEMINI_API_KEY` is set, `api/coach.js` builds a Gemini request server-side.

The browser still only calls `/api/coach`.

Optional:

```text
GEMINI_MODEL=gemini-3.1-flash-lite
```

If `GEMINI_MODEL` is not set, the server uses the default in `api/coach.js`.

The Gemini response schema asks for the same study-helper fields used by the
mock path. The server also fills `mode` from the request if the provider omits
it.

## Debug Payload

When debug is requested, the response may include `__debug`.

The Under The Hood view may show:

- safe browser request payload,
- server prompt text,
- provider request body,
- raw provider or mock return,
- parsed app response,
- endpoint/model/status notes.

It must not show:

- API key values,
- key-bearing provider URLs,
- hidden internal flags,
- private learner records.
