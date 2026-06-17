# Extend Soma Study Coach

Use this with the [Code Map](./code-map.md), [Workshop Labs](./workshop/labs/README.md),
[Project Cards](./student/project-cards.md), and
[AI Coding Prompts](./student/ai-coding-prompts.md).

This is the student extension guide. It answers three questions:

- What can I safely change?
- What must stay the same so Soma still works?
- What should the project generalize next if many teams want to remix it?

## The Big Idea

Soma is built around one repeatable pattern:

```text
local data -> safe browser context -> /api/coach -> structured response -> honest UI
```

If your extension keeps that pattern, it will be much easier to test, explain,
and deploy.

## Before You Start

Write one sentence:

```text
My extension helps [learner] with [learning task] by using normal code for
[deterministic work] and AI for [language or reasoning work].
```

Good examples:

- "My extension helps Grade 7 learners revise mixtures by using normal code for
  topic selection and AI for explaining mistakes."
- "My extension helps students plan revision by using normal code for dates and
  AI for turning weak topics into a study plan."

Weak examples:

- "My extension uses AI for everything."
- "My extension stores real student marks and ranks learners."
- "My extension calls Gemini directly from the browser."

## Extension Map

| If students want to... | Change these files | Keep this contract |
|---|---|---|
| add a new science topic | [`starter/data.js`](../starter/data.js), then [`reference/data.js`](../reference/data.js) | Topic objects keep the same fields. |
| change page text or layout | [`reference/index.html`](../reference/index.html), [`reference/style.css`](../reference/style.css) | Existing IDs stay stable unless JS and tests change too. |
| add a new visible answer section | [`api/coach.js`](../api/coach.js), [`reference/app.js`](../reference/app.js), tests, API docs | Server, mock mode, renderer, and tests all know the new field. |
| change what context is sent | [`reference/app.js`](../reference/app.js), [`starter/app.js`](../starter/app.js), [`docs/api-coach-contract.md`](./api-coach-contract.md) | Browser still calls only `/api/coach`. |
| add language support | [`reference/data.js`](../reference/data.js), [`reference/app.js`](../reference/app.js), [`api/coach.js`](../api/coach.js) | The selected language is explicit in the safe context. |
| add a project-specific app | copy [`starter/`](../starter/) or study [`reference/`](../reference/) | Keep local data, one endpoint, safe context, and honest limits. |
| change AI behavior | [`api/coach.js`](../api/coach.js) and Debug Lab | Keys stay server-side; model settings stay bounded. |
| change mock/demo output | [`api/coach.js`](../api/coach.js) | Mock mode remains deterministic for tests. |

## Contracts You Should Preserve

These are the parts that make Soma teachable.

### Route Contract

Keep these routes working:

```text
/
/reference
/starter/index.html
/api/coach
```

The public app should open at `/`. The starter scaffold should remain available
for workshop exercises.

### Key-Safety Contract

Never put provider keys in:

- [reference/](../reference/)
- [starter/](../starter/)
- browser JavaScript
- GitHub
- screenshots
- chat messages

The browser calls `/api/coach`. The server decides whether to use mock mode or
server-side Gemini mode.

### DOM Contract

JavaScript and tests depend on element IDs. If you change an ID in HTML, update
the JavaScript and tests in the same patch.

Important IDs include:

- `topicSelect`
- `studentQuestionInput`
- `coachButton`
- `coachStatus`
- `coachOutput`
- `openDebugLabButton`
- `debugLabSection`
- `debugOutput`
- `keepLearningSection`

### Response Contract

The coach response is structured JSON. If you add a field, update all of these:

1. [`api/coach.js`](../api/coach.js) provider prompt/schema.
2. [`api/coach.js`](../api/coach.js) mock response.
3. [`reference/app.js`](../reference/app.js) normalization and rendering.
4. [`docs/api-coach-contract.md`](./api-coach-contract.md).
5. [`tests/soma-student.spec.js`](../tests/soma-student.spec.js).

Do not only change the frontend.

### Test Contract

Before demo, run:

```bash
SOMA_TEST_PORT=8790 npm run test:e2e
```

Use the port-safe test command if your local learning server is already open on
`8787`.

If you changed JavaScript, also run:

```bash
node --check reference/app.js
node --check starter/app.js
node --check api/coach.js
node --check scripts/mock-coach-server.js
```

## Safe Extension Recipes

### Recipe 1: Add A New Topic

Use this when a team wants more science content.

Files:

- [reference/data.js](../reference/data.js)
- [starter/data.js](../starter/data.js)

Steps:

1. Copy an existing topic object.
2. Change `id`, `topic`, `summary`, `vocabulary`, `examples`,
   `misconceptions`, `resources`, `practiceQuestions`, and `sampleQuestion`.
3. Keep all dummy data.
4. Open the app and select the new topic.
5. Ask the sample question.
6. Open Debug Lab and confirm the new topic appears in safe context.

Good generalization later: move shared topic packs into one common data file so
[reference/](../reference/) and [starter/](../starter/) do not need duplicate
edits.

### Recipe 2: Add A New Answer Section

Use this when a team wants a new learning move such as "Quick quiz" or
"Misconception check."

Files:

- [api/coach.js](../api/coach.js)
- [reference/app.js](../reference/app.js)
- [docs/api-coach-contract.md](./api-coach-contract.md)
- [tests/soma-student.spec.js](../tests/soma-student.spec.js)

Steps:

1. Name the new field, for example `quickQuiz`.
2. Add it to the server response instructions.
3. Add deterministic mock output.
4. Normalize the field in [`reference/app.js`](../reference/app.js).
5. Render it in `renderCoachResponse()`.
6. Update the API contract docs.
7. Add a Playwright expectation that proves it appears.

Good generalization later: create a small shared response schema so server,
mock mode, docs, and frontend can stay aligned.

### Recipe 3: Make Soma Work For Another Subject

Use this when a team wants English, mathematics, social studies, agriculture, or
a school-specific topic.

Files:

- [reference/data.js](../reference/data.js)
- [reference/index.html](../reference/index.html)
- [reference/app.js](../reference/app.js)
- [api/coach.js](../api/coach.js)
- [docs/mentor/curriculum-source.md](./mentor/curriculum-source.md)

Steps:

1. Change the visible subject labels.
2. Add topic packs for the new subject.
3. Update `getStudentSetup()` if the app needs new grade or learning-area
   metadata.
4. Update server prompt wording so the coach stays in the new subject.
5. Update mock responses so no-key demos still work.
6. Document the source boundary for the new content.

Good generalization later: make grade, subject, and topic metadata configurable
from one shared place instead of hard-coding text across docs and UI.

### Recipe 4: Add A Language Option

Use this when a team wants English, Swahili, or code-switching support.

Files:

- [reference/index.html](../reference/index.html)
- [reference/app.js](../reference/app.js)
- [api/coach.js](../api/coach.js)
- [tests/soma-student.spec.js](../tests/soma-student.spec.js)

Steps:

1. Add a language selector.
2. Include the selected language in `buildCoachContext()`.
3. Tell `/api/coach` how to use that language.
4. Keep safety messages understandable in every supported language.
5. Test one normal question and one personal-data block.

Good generalization later: create a small UI text dictionary for labels, helper
text, safety messages, and answer headings.

### Recipe 5: Build A New App From The Pattern

Use this when a team wants a different project, such as a reading helper, career
explorer, revision planner, or school FAQ helper.

Start from:

- [starter/](../starter/)

Keep:

- one clear learner job,
- one local dataset,
- one main input,
- one `/api/coach` call only where AI is useful,
- one structured response,
- one visible safety note,
- mock mode for no-key testing.

Avoid:

- real student records,
- login systems,
- databases,
- payment flows,
- direct provider calls from the browser,
- several unrelated features in one patch.

## What We Should Generalize Next

These are not required for a beginner patch, but they would make Soma easier to
adapt if many students remix it.

| Generalize | Why It Helps | Possible Shape |
|---|---|---|
| shared topic data | Avoid editing both [`reference/data.js`](../reference/data.js) and [`starter/data.js`](../starter/data.js). | Move topic packs into one shared JS module or generated JSON file. |
| response schema | Keep server, mock, frontend, docs, and tests aligned. | Define response fields in one documented schema object. |
| app configuration | Make subject/grade labels easier to change. | Add a small `appConfig` object for title, subject, grade, and safety copy. |
| prompt templates | Let mentors compare prompt versions safely. | Store named prompt templates server-side, not in browser storage. |
| extension checklist | Help mentors approve student scope. | Add a one-page project proposal form tied to the rubric. |
| test helpers | Make new tests easier to write. | Add Playwright helpers for ask-flow, Debug Lab, safety block, and mobile smoke. |

Mentor rule: generalize only when it removes repeated real work. Do not add a
framework or abstraction just because it sounds professional.

## Planning Discussion For Teams

Before a team starts coding, discuss:

1. Who is the learner?
2. What is the one job the app helps with?
3. What local data can safely power the app?
4. What should normal JavaScript handle?
5. What should `/api/coach` handle?
6. What private data must users avoid?
7. What route, DOM ID, response, and test contracts might change?
8. What will the demo show if Gemini mode is unavailable?

If the answer is unclear, shrink the project.

## Review Checklist

Before calling an extension done:

- The app still runs in mock mode without a key.
- `/api/coach` is still the only browser-to-coach path.
- No provider key or key-bearing URL appears in frontend files or debug output.
- The main learner flow works on desktop and mobile.
- Debug Lab still explains context, prompt, request, response, parsing, and
  safety boundaries.
- The starter scaffold still works or the team explains why it did not change.
- Playwright smoke tests pass or the team documents exactly what changed.
- The demo explains what AI does, what normal code does, and what the limits
  are.
