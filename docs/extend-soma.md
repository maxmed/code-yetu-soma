# Extend Soma Study Coach

This guide gives beginner-friendly ways to change the app without breaking the
architecture.

## Beginner Rule

Make one small change at a time, then test it.

Good first changes:

- add a topic,
- change the text on the page,
- add one local resource,
- add one practice question,
- change the style of an existing section,
- add one response field after updating server, browser, and tests together.

Avoid first:

- login systems,
- databases,
- framework rewrites,
- direct browser calls to Gemini,
- large file moves,
- changing many features at once.

## Add A New Topic

Edit:

```text
reference/data.js
```

Find `topicPacks`, then add a new topic object with the same shape as the
existing ones.

Check that the topic includes:

- `id`
- `topic`
- `summary`
- `vocabulary`
- `examples`
- `misconceptions`
- `resources`
- `practiceQuestions`
- `sampleQuestion`

Then run:

```bash
npm run serve:mock
```

Open the reference app and select the new topic.

## Change The First Screen

Edit:

```text
reference/index.html
reference/style.css
```

Keep important IDs unless you also update JavaScript:

- `topicSelect`
- `studentQuestionInput`
- `coachButton`
- `coachStatus`
- `coachOutput`
- `keepLearningSection`
- `debugOutput`

## Change What The Browser Sends

Edit:

```text
reference/app.js
```

Start with:

```text
buildCoachContext()
```

That function builds the JSON sent to `/api/coach`.

After changing the request shape, update:

- `docs/api-coach-contract.md`
- `api/coach.js` if the server needs the new field
- `tests/soma-student.spec.js`

## Change Mock Answers

Edit:

```text
lib/coach-core.js
```

Use this when you want local demo answers to change without calling Gemini.

Most mock answer text comes from:

```text
makeCoachResponse()
```

## Change Gemini Behavior

Edit:

```text
api/coach.js
```

Start with:

```text
buildGeminiCall()
```

This is where the server builds:

- system prompt,
- user prompt,
- provider request body,
- model endpoint.

Keep the rules:

- API key stays server-side.
- Response should be JSON.
- Output should be age-appropriate.
- The coach gives study support, not official marks or diagnosis.

## Add A New Response Section

Example: add a `quickQuiz` section.

1. Add `quickQuiz` to Gemini response schema in `api/coach.js`.
2. Add `quickQuiz` to mock response in `lib/coach-core.js`.
3. Add `quickQuiz` normalization in `reference/app.js`.
4. Render `quickQuiz` in `renderCoachResponse()`.
5. Update `docs/api-coach-contract.md`.
6. Update Playwright tests.

Do not only change the frontend. The server and tests must understand the new
field too.

## Create A New Student Project From The Pattern

Use the same shape:

```text
local data -> safe browser context -> /api/coach -> structured response -> honest limits
```

Possible projects:

- reading helper,
- career explorer,
- school FAQ helper,
- revision planner,
- resource finder,
- adaptive practice helper.

Keep the first version small. One dataset, one main question box, one endpoint,
one clear response.
