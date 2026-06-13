# Lesson 5: Data And Context

Time: 30-40 minutes

Audience: students who understand the basic frontend flow.

## Learner Hook

AI is only as smart as the context you give it. Give it nothing and it guesses;
give it the right topic pack and it can act like a focused study helper.

## Try This Now

Open `starter/data.js`, change one topic's `sampleQuestion`, reload
`http://127.0.0.1:8787/starter/index.html`, click Use sample, and confirm the
question changed. Later, compare the same pattern in `reference/data.js`.

## Real-World Connection

Spotify Wrapped turns listening history into a personal story. Soma does a
smaller classroom version: it turns selected topic data into context for a
useful study answer.

## Learning Goals

By the end, students can:

- explain what a topic pack is,
- identify which local data is sent to `/api/coach`,
- explain why context improves an LLM answer,
- explain why context must be limited and safe,
- add one safe topic-pack field.

## Key Ideas

An LLM does not automatically know the workshop's local topic pack. The app must
send useful context with the student's question.

In Soma, context means:

- grade and learning area,
- selected topic,
- short topic summary,
- vocabulary,
- examples,
- misconceptions,
- recommended resources,
- optional practice answers,
- safety constraints.

Good context is relevant, short, and safe. Bad context is private, too long,
unverified, or unrelated to the student's question.

## Data Flow

```text
reference/data.js topic pack
        |
        v
buildCoachContext()
        |
        v
curriculumContext.snippets + resources + constraints
        |
        v
/api/coach
        |
        v
server prompt and structured response
```

## Find It In This Repo

| File | Why It Matters |
|---|---|
| `reference/data.js` | Main local topic packs for the polished app. |
| `starter/data.js` | Smaller topic packs for the teaching scaffold. |
| `reference/app.js` | `buildCoachContext()` chooses what data is sent. |
| `api/coach.js` | `buildGeminiCall()` turns context into a server-side prompt. |
| `docs/mentor/curriculum-source.md` | Explains the sample-content boundary. |

## Map To Soma Code

- Topic pack array: `reference/data.js` `topicPacks`.
- Scaffold topic pack: `starter/data.js`.
- Topic summary UI: `reference/app.js` `renderTopicSummary()`.
- Practice answers: `reference/app.js` `getPracticeAnswers()`.
- Safe request context: `reference/app.js` `buildCoachContext()`.
- Server prompt context: `api/coach.js` `buildGeminiCall()`.
- Related lab: [Lab B: Add A New Topic Pack](../labs/README.md#lab-b-add-a-new-topic-pack).
- Helpful prompts: [Create Dummy Data](../../student/ai-coding-prompts.md#create-dummy-data),
  [Build The /api/coach Context](../../student/ai-coding-prompts.md#build-the-apicoach-context).

## Worked Soma Example

In `reference/data.js`, the mixtures topic includes:

```js
topic: "Mixtures and separation",
summary: "A mixture contains two or more substances...",
examples: [
  "A magnet can separate iron filings from sand."
]
```

In `reference/app.js`, `buildCoachContext()` sends this as a snippet:

```js
curriculumContext: {
  sourceLabel: "Simplified KICD/CBC-aligned sample snippets for workshop use",
  snippets: [
    {
      topic: topic.topic,
      summary: topic.summary,
      vocabulary: topic.vocabulary,
      examples: topic.examples,
      misconceptions: topic.misconceptions
    }
  ]
}
```

This gives the coach enough material to answer in the right subject area without
claiming to be an official textbook.

## Context Quality Checklist

Before sending context to an LLM, ask:

- Is it relevant to the student's question?
- Is it safe to share?
- Is it short enough?
- Is it from a source mentors understand?
- Does the app state its limitations?
- Could normal JavaScript solve the task without an LLM?

## Live Demo

1. Start `npm run serve:mock`.
2. Open the public app at `/`.
3. Choose a topic.
4. Open Debug Lab.
5. Click **Show context**.
6. Find `curriculumContext`.
7. Ask a question and compare the answer to the context.

Point out that the Debug Lab shows safe context, not private records or keys.

## Student Exercise

Task: add one new resource to a topic.

Steps:

1. Open `starter/data.js`.
2. Pick one topic.
3. Add one item to its `resources` array.
4. Reload `http://127.0.0.1:8787/starter/index.html`.
5. Ask a question.
6. Check whether the resource appears in the answer or **Preview context**.

Expected result: the new resource is available to the coach request.

Stretch after the starter works: add the same resource to `reference/data.js`
and compare the polished app with the starter scaffold.

## Reflection Questions

- Why is a topic summary useful context?
- What information should never be included?
- What happens if context is wrong?
- What happens if context is too long?
- Why should the app label sample content honestly?

## Mentor Notes

Keep students away from private learner records. Use invented questions and
sample content. If students want to add real school content, require mentor
review before it is added to the app.

## Deeper Reading

- MDN JavaScript object basics: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Object_basics
- Google People + AI Guidebook: https://pair.withgoogle.com/guidebook/
- OWASP LLM Prompt Injection Prevention: https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html

## Inspiring Resources

- Spotify Engineering Blog - https://engineering.atspotify.com/
- Google Teachable Machine - https://teachablemachine.withgoogle.com/
