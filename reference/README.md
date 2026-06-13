# Reference App: Soma Study Coach

Open `index.html` from a local/static HTTP server.

This is the flagship AI-first sample project for the Code Yetu program.

Current status: mode-first reference app. Study Helper / Topic Tutor is the default path and practice/review is optional input.

## What It Demonstrates

- Grade 7 Integrated Science setup using curated KICD/CBC-aligned sample data
- topic-pack context for a Study Helper / Topic Tutor
- prompt/context building for an LLM study coach
- frontend adapter that calls `/api/coach`
- visible agent steps and prompt preview
- honest error handling when the AI proxy is unavailable
- local progress tracking for generated study-plan tasks
- follow-up tutor questions grounded in the same study context

## Provider Contract

The frontend does not call Gemini, Groq, OpenRouter, or any provider SDK directly.

It only calls:

```text
POST /api/coach
```

The organizer-hosted proxy owns the provider key server-side.

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
- If the AI call fails, show the error clearly instead of pretending it worked.
