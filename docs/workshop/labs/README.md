# Workshop Labs

Labs are short hands-on tasks. Each one should be possible in 20-45 minutes and
should end with a visible result.

Use labs with:

- [Lesson Index](../lessons/README.md) for the concept behind each task.
- [Concept To Code Map](../concept-to-code-map.md) for file and prompt links.
- [Extend Soma](../../extend-soma.md) when students are turning a lab into a
  project remix.
- [AI Coding Prompts](../../student/ai-coding-prompts.md) when students need
  focused help.
- [Testing And Debugging](../../testing-debugging.md) before demos or commits.

## Lab Map

| Lab | Concept | Helpful Prompt |
|---|---|---|
| A | [How Web Apps Work](../lessons/02-how-web-apps-work.md) | [Make The UI Clearer](../../student/ai-coding-prompts.md#make-the-ui-clearer) |
| B | [Data And Context](../lessons/05-data-and-context.md) | [Create Dummy Data](../../student/ai-coding-prompts.md#create-dummy-data) |
| C | [LLM Prompts](../lessons/06-llm-prompts.md) | [Build The /api/coach Context](../../student/ai-coding-prompts.md#build-the-apicoach-context) |
| D | [Calling The LLM](../lessons/07-calling-the-llm.md) | [Fix /api/coach 404 Or 429](../../student/ai-coding-prompts.md#fix-apicoach-404-or-429) |
| E | [Language And Swahili](../lessons/09-language-and-swahili.md) | [Make The UI Clearer](../../student/ai-coding-prompts.md#make-the-ui-clearer) |
| F | [Parsing And Rendering](../lessons/08-parsing-and-rendering.md) | [Response Not Rendering](../../student/ai-coding-prompts.md#response-not-rendering) |
| G | [Where LLMs Fit](../lessons/10-where-llms-fit.md) | [Add Responsible AI Note](../../student/ai-coding-prompts.md#add-responsible-ai-note) |

## Lab A: Change One UI Section Safely

Goal: learn how HTML, CSS, and JavaScript stay connected without touching the
larger reference app yet.

Main files:

- `starter/index.html`
- `starter/style.css`
- `starter/app.js`

Task:

1. Open `http://127.0.0.1:8787/starter/index.html`.
2. Change one visible heading, label, or intro sentence in `starter/index.html`.
3. Keep the element ID the same.
4. Save the file.
5. Hard refresh the browser and confirm the UI changed.
6. Open browser developer tools and confirm there is no red console error.
7. Click **Use sample**, **Preview context**, and **Call /api/coach** to confirm
   the starter still works.

Stretch after the starter works:

1. With a mentor, find the same kind of visible label in
   `reference/index.html`.
2. Change only visible text, not IDs.
3. If the learning server is still running, run
   `SOMA_TEST_PORT=8790 npm run test:e2e`.
4. If a test expects the old label, update the test intentionally with a mentor.

Discussion:

- What changed visually?
- What broke or stayed stable?
- Why are IDs more fragile than visible text?
- Why do beginners start in `starter/` before editing `reference/`?

## Lab B: Add A New Topic Pack

Goal: learn how local data powers the tutor.

Main files:

- `starter/data.js`
- `reference/data.js` after the starter pattern is clear

Task:

1. In `starter/data.js`, copy an existing topic object.
2. Change `id`, `topic`, `summary`, `vocabulary`, `examples`,
   `misconceptions`, `resources`, `practiceQuestions`, and `sampleQuestion`.
3. Reload `http://127.0.0.1:8787/starter/index.html` and pick the new topic.
4. Ask the sample question.
5. Click **Preview context** and inspect the safe context.

Stretch after the starter works: repeat the topic-pack change in
`reference/data.js`, then open Debug Lab in the polished app and compare the
safe context.

Discussion:

- Which parts appeared in the topic summary?
- Which parts were sent to `/api/coach`?
- Which parts shaped the answer?

## Lab C: Edit A Tutor Prompt And Compare Output

Goal: understand how prompt wording changes model behavior.

Main files:

- Debug Lab in the browser
- `api/coach.js`

Task:

1. Ask a normal study question.
2. Open Debug Lab.
3. Click **Load last prompt**.
4. Add one instruction to the system prompt, such as:
   "Use one local classroom example and ask one check-for-understanding
   question."
5. Click **Run lab**.
6. Compare the response before and after.

Discussion:

- What changed?
- What did not change?
- Was the new instruction followed?
- Did the prompt become too long or too strict?

## Lab D: Change Model Settings And Observe Variability

Goal: learn that model output can vary.

Main files:

- Debug Lab in the browser
- `api/coach.js`

Task:

1. Ask the same question twice with the default settings.
2. In Debug Lab, try a lower temperature.
3. Try a higher temperature.
4. Compare the answers.

Discussion:

- Which answer was more predictable?
- Which answer was more creative?
- Which setting is safer for a study coach?
- Why should tests not rely on exact AI wording?

## Lab E: Add Swahili Answer Mode

Goal: design a multilingual feature safely.

Main files:

- `reference/data.js`
- `reference/app.js`
- `api/coach.js`
- `reference/index.html`

Task:

1. Add a language option such as English or Swahili.
2. Include the selected language in `buildCoachContext()`.
3. Update the server prompt to respect the selected language.
4. Test with a simple question.
5. Confirm the page still has the correct `lang` attribute or document why a
   full page-language switch is not yet complete.

Discussion:

- Should the whole UI switch languages, or only the answer?
- What happens when students code-switch?
- How will mentors check answer quality?

## Lab F: Debug A Bad JSON Response

Goal: learn why structured output and parsing matter.

Main files:

- `api/coach.js`
- `reference/app.js`

Task:

1. Find `parseGeminiJson()` in `api/coach.js`.
2. Explain what happens when the provider returns text around JSON.
3. Explain what error is returned when no JSON object is found.
4. In mock mode, discuss how you would simulate a malformed response for a test.

Discussion:

- Why does the app prefer structured JSON?
- What should the UI show when parsing fails?
- Why should the app avoid pretending malformed output worked?

## Lab G: Replace A Wasteful LLM Call With Normal Code

Goal: learn when not to use an LLM.

Main files:

- `reference/app.js`
- `reference/data.js`
- `lib/coach-core.js`

Task:

1. Find one feature that does not need AI, such as counting answered practice
   questions or showing the selected topic summary.
2. Explain why normal JavaScript is better.
3. Implement or inspect the rule-based version.
4. Describe what would be wasteful about calling an LLM for that task.

Discussion:

- Is the task deterministic?
- Does it require judgment or language generation?
- Does it involve private data?
- Would an LLM call add cost, delay, or risk?
