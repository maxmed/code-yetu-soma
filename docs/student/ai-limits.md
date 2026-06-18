# Student AI Limits And Advice

Use this with the [Student Handout](./handout.md), [Testing And
Debugging](../testing-debugging.md), and [Safety
Checklist](../api-safety-checklist.md).

Use your app's server-side `/api/coach` endpoint for AI help. Do not paste API
keys into code or call Gemini directly from browser JavaScript.

If your team, group, or solo project uses real Gemini mode, create and configure
your own server-side Google AI Studio API key/provider project for that app. Do
not rely on one shared class key unless a mentor intentionally tells everyone to
use that setup.

## Workshop Model

The workshop is set up to use:

```text
GEMINI_MODEL=gemini-3.1-flash-lite
```

This is the best tested choice for the current Soma Study Coach app because it
works with `/api/coach`. At setup time, the configured Google AI project/API key
quota table showed the strongest text-tutor allowance for this model.

Important: treat this table as a planning snapshot, not a permanent promise.
Provider quotas change by key/project, account, billing tier, model, and date.
A mentor must verify the live Google AI Studio rate-limit page on the workshop
day before treating any number below as current:
https://ai.google.dev/gemini-api/docs/rate-limits

| Model | Requests per minute | Tokens per minute | Requests per day | Use |
|---|---:|---:|---:|---|
| `gemini-3.1-flash-lite` | 15 | 250K | 500 | Workshop default for students |
| `gemini-2.5-flash-lite` | 10 | 250K | 20 | Small demos only |
| `gemini-2.5-flash` | 5 | 250K | 20 | Higher-quality demo, low daily limit |
| `gemini-2.0-flash` / `gemini-2.0-flash-lite` | 0 | 0 | 0 | Not usable on this project |

At setup time, the full quota table also showed Gemma 4 models with 1,500
requests per day.
Those are not the current workshop default because the app has only been fully
tested and accepted with Gemini text tutor responses. `gemma-4-31b-it` can be a
future experiment if a team app needs more daily tutor calls than its configured
Gemini key/project allows.

## What The Limits Mean

- The limit belongs to the server-side key/project configured for your app.
- Each team, group, or solo developer app should have its own key/project.
- `15 RPM` means that app/key should stay under about 15 AI requests per minute.
- `500 RPD` means that app/key should stay under about 500 AI requests per day.
- A quota error does not mean your app is broken. It means your app's configured
  AI allowance was reached or the model is temporarily unavailable.

## How To Avoid Wasting Requests

- Preview your safe context before clicking the coach button.
- Fix HTML, CSS, JavaScript, and layout bugs without calling the AI endpoint.
- Use the mock/demo mode while debugging the app.
- Build screens and logic with local dummy data first. Start with
  [`starter/data.js`](../../starter/data.js), copy one `topicPacks` object, and
  change the dummy topic, summary, vocabulary, examples, resources, practice
  questions, and `sampleQuestion`.
- Ask one clear question instead of clicking many times quickly.
- Test with short topic questions before trying long prompts.
- Share one working demo per team instead of every student repeatedly testing
  the same flow.

Local-data example:

```js
{
  id: "water-cycle",
  topic: "Water cycle",
  summary: "Water moves through evaporation, condensation, precipitation, and collection.",
  vocabulary: [
    { term: "Evaporation", meaning: "Liquid water changes into water vapour." }
  ],
  examples: ["A puddle drying after sunshine shows evaporation."],
  resources: [
    { title: "Draw The Cycle", type: "Diagram", description: "Label each stage with arrows." }
  ],
  practiceQuestions: [
    {
      id: "water-q1",
      question: "Which stage forms clouds?",
      options: ["Evaporation", "Condensation", "Collection", "Filtering"],
      answerIndex: 1,
      feedback: "Clouds form when water vapour cools and condenses."
    }
  ],
  sampleQuestion: "Why do clouds form before rain?"
}
```

For the full hands-on path, use [Lab B: Add A New Topic
Pack](../workshop/labs/README.md#lab-b-add-a-new-topic-pack) and the [Create
Dummy Data](./ai-coding-prompts.md#create-dummy-data) prompt.

## Safe Use Rules

- Do not enter full names, phone numbers, school records, marks, addresses, or
  private family information.
- Do not treat the coach as official marks or a teacher replacement.
- Check important learning points with a teacher, mentor, textbook, or trusted
  source.
- If the answer looks wrong, write that in your responsible AI note and explain
  how you would test or improve it.

## If The Coach Stops Working

1. Read the error message on the page.
2. If it says quota or rate limit, stop clicking and tell a mentor.
3. Continue building the app using local data in
   [`starter/data.js`](../../starter/data.js), mock responses, and your own
   JavaScript logic.
4. Try again later when your app's configured key/project quota is available.
