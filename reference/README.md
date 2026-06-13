# Reference App: Soma Study Coach

Open `index.html` from a local/static HTTP server.

This is the flagship AI-tutor-shaped sample project for the Code Yetu program.

Current status: mode-first reference app. Study Helper / Topic Tutor is the default path and practice/review is optional input.

## What It Demonstrates

- Grade 7 Integrated Science setup using curated KICD/CBC-aligned sample data
- topic-pack context for a Study Helper / Topic Tutor
- prompt/context building for an LLM-backed study coach
- frontend adapter that calls `/api/coach`
- visible agent steps and prompt preview
- honest error handling when the coach endpoint is unavailable
- local progress tracking for generated study-plan tasks
- follow-up tutor questions grounded in the same study context

## Provider Contract

The frontend does not call Gemini, Groq, OpenRouter, or any provider SDK directly.

It only calls:

```text
POST /api/coach
```

For local tests and the first Vercel-style demo, `/api/coach` is deterministic
mock logic from `../api/coach.js` and `../lib/coach-core.js`. That adapter does
not call a real LLM provider.

For a real AI deployment, replace the mock adapter with an organizer-hosted
proxy that owns the provider key server-side.

## Request Shape

```json
{
  "mode": "learn-topic",
  "studentSetup": {
    "grade": "Grade 7",
    "learningArea": "Integrated Science",
    "topic": "Characteristics of living things",
    "studyNeed": "Explain this topic"
  },
  "studentQuestion": "Why is growth a life process?",
  "practiceAnswers": [],
  "curriculumContext": {
    "sourceLabel": "Simplified KICD/CBC-aligned sample snippets for workshop use",
    "snippets": []
  },
  "resources": [],
  "followUpQuestion": ""
}
```

## Response Shape

```json
{
  "mode": "learn-topic",
  "studyFeedback": "",
  "topicExplanation": "",
  "examples": [],
  "likelyWeakAreas": [],
  "misconceptionHelp": [],
  "recommendedResources": [],
  "sevenDayPlan": [],
  "followUpAnswer": "",
  "limitations": ""
}
```

## Notes For Students

- Do not put API keys in frontend JavaScript.
- Use dummy/non-sensitive learner data only.
- Say "study support", "topic explanation", or "practice feedback", not diagnosis.
- If the coach call fails, show the error clearly instead of pretending it worked.
