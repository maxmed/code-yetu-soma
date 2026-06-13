# Lesson 4: Frontend Walkthrough

Time: 35-40 minutes

Audience: students ready to read small parts of JavaScript.

## Learner Hook

Every button, input and panel has a name. Once you learn those names, the page
stops being magic and becomes something you can control.

## Try This Now

Open DevTools Console and type:

```js
document.getElementById("coachButton").click()
```

The app should behave as if you clicked Ask coach yourself.

## Real-World Connection

A social app's like button is also just an element, an event listener and a
state update. At huge scale, the idea is still the same: user action, code runs,
screen changes.

## Learning Goals

By the end, students can:

- connect an HTML element ID to JavaScript behavior,
- explain how topic data becomes visible UI,
- explain how Soma builds a coach request,
- explain how the response becomes answer cards,
- make a small frontend change without breaking the app.

## Key Ideas

The frontend is a set of connected pieces:

```text
HTML IDs -> JavaScript element map -> state -> functions -> rendered HTML
```

Soma's frontend uses plain JavaScript so students can see the full chain.

## Frontend Flow

```text
1. renderSelects()
   fills dropdowns from setupOptions and topicPacks

2. renderTopicSummary()
   shows topic summary, vocabulary and examples

3. validateQuestion()
   blocks empty questions and obvious personal data

4. buildCoachContext()
   creates the JSON request for /api/coach

5. askStudyCoach()
   sends the request with fetch()

6. normalizeCoachResponse()
   checks the returned shape

7. renderCoachResponse()
   shows feedback, explanation, examples, resources and limits

8. renderDebug()
   shows safe debug details when Debug Lab is opened
```

## Find It In This Repo

| File | Function Or Section | Why It Matters |
|---|---|---|
| `reference/index.html` | `id="topicSelect"` | Topic dropdown students use first. |
| `reference/index.html` | `id="studentQuestionInput"` | Question textarea. |
| `reference/index.html` | `id="openDebugLabButton"` | Opens the Behind The Scenes view. |
| `reference/app.js` | `const elements = ...` | Maps HTML IDs into JavaScript variables. |
| `reference/app.js` | `buildCoachContext()` | Builds the safe JSON request. |
| `reference/app.js` | `askStudyCoach()` | Calls `/api/coach`. |
| `reference/app.js` | `renderCoachResponse()` | Turns response JSON into visible answer UI. |
| `reference/app.js` | `renderDebug()` | Turns debug JSON into learner-readable panels. |
| `reference/data.js` | `topicPacks` | Supplies local curriculum-style content. |

## Map To Soma Code

- Topic dropdown: `reference/index.html` `topicSelect`.
- Question box: `reference/index.html` `studentQuestionInput`.
- Ask button: `reference/index.html` `coachButton`.
- Element lookup: `reference/app.js` `const elements = ...`.
- Selected topic lookup: `reference/app.js` `getTopic()`.
- Context builder: `reference/app.js` `buildCoachContext()`.
- API call: `reference/app.js` `askStudyCoach()`.
- Answer rendering: `reference/app.js` `renderCoachResponse()`.
- Debug rendering: `reference/app.js` `renderDebug()`.
- Helpful prompts: [Prompt Preview Not Showing](../../student/ai-coding-prompts.md#prompt-preview-not-showing),
  [Response Not Rendering](../../student/ai-coding-prompts.md#response-not-rendering).

## Worked Soma Example: Topic Summary

In `reference/data.js`, a topic has fields like:

```js
topic: "States of matter",
summary: "Solids have fixed shape and volume...",
vocabulary: [
  { term: "Solid", meaning: "Matter with fixed shape and fixed volume." }
]
```

In `reference/app.js`, `renderTopicSummary()` reads the selected topic and
builds HTML:

```js
const topic = getTopic();
...
<h3>${escapeHtml(topic.topic)}</h3>
<p>${escapeHtml(topic.summary)}</p>
```

Notice `escapeHtml()`. It protects the page from treating text as HTML. This is
important whenever text might come from data or an AI response.

## Worked Soma Example: Building Context

`buildCoachContext()` creates the JSON sent to the backend. It includes:

- selected mode,
- selected grade and learning area,
- selected topic,
- student question,
- answered practice questions,
- topic summary,
- vocabulary,
- examples,
- misconceptions,
- resources,
- safety constraints,
- Debug Lab request.

This is the heart of the app. The LLM should not receive a vague question only.
It should receive the question plus safe learning context.

## Worked Soma Example: Rendering The Answer

`renderCoachResponse()` expects structured fields:

- `studyFeedback`,
- `topicExplanation`,
- `examples`,
- `misconceptionHelp`,
- `likelyWeakAreas`,
- `recommendedResources`,
- `sevenDayPlan`,
- `limitations`.

The response is not pasted blindly into one big paragraph. The app renders each
part in a separate section so students can scan the answer.

## Why The Debug Lab Exists

The Debug Lab helps students see the invisible parts:

- browser request payload,
- server prompt,
- provider request shape,
- raw return,
- parsed app response,
- model and parameter settings,
- boundary check.

It is hidden by default because the main learner path should stay simple. The
lab is for inspection, experiments, and teaching.

## Live Demo

1. Open `reference/index.html`.
2. Find `openDebugLabButton`.
3. Open `reference/app.js`.
4. Find `openDebugLabButton` in the `elements` map.
5. Find the event listener that opens the lab.
6. Run the app and click **Debug Lab**.

Then repeat with `coachButton`:

1. Find the button in HTML.
2. Find it in the `elements` map.
3. Trace the click path to `buildCoachContext()` and `askStudyCoach()`.

## Student Exercise

Task: Rename one answer section safely.

Steps:

1. Open `reference/app.js`.
2. Find `renderCoachResponse()`.
3. Change the visible heading `Topic explanation` to `Main idea`.
4. Reload the app.
5. Ask a sample question.
6. Confirm the section heading changed.

Expected result: only the visible heading changes. The JSON field
`topicExplanation` should not be renamed.

Stretch: update the Playwright test if it expects the old visible text.

## Reflection Questions

- Why should IDs in `index.html` and `app.js` stay in sync?
- Why does the app escape text before rendering?
- Why is the Debug Lab hidden by default?
- Which fields are safe to show in Debug Lab?
- What is the difference between changing visible text and changing a JSON
  contract field?

## Mentor Notes

This lesson is where students often learn that code is connected, not isolated.
Use one visible UI element as a thread and follow it across files.

Warn students not to rename IDs casually. If an ID changes in HTML, the
JavaScript lookup must change too, and tests may need updates.

## Deeper Reading

- MDN DOM Introduction: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction
- MDN Events: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events
- MDN Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- Nielsen Norman Group on progressive disclosure: https://www.nngroup.com/articles/progressive-disclosure/

## Inspiring Resources

- MDN: Your first website - creating the content - https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Creating_the_content
- Google AI Experiment: Quick, Draw! - https://quickdraw.withgoogle.com/
