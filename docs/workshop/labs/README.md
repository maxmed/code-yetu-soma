# Workshop Labs

Labs are short hands-on tasks. Each one should be possible in 20-45 minutes and
should end with a visible result.

## Lab A: Change One UI Section Safely

Goal: learn how HTML, CSS, JavaScript, and tests stay connected.

Main files:

- `reference/index.html`
- `reference/style.css`
- `reference/app.js`
- `tests/soma-student.spec.js`

Task:

1. Change one visible heading or label.
2. Keep the element ID the same.
3. Reload the app and confirm the UI changed.
4. Run `npm run test:e2e`.
5. If the test expects the old label, update the test intentionally.

Discussion:

- What changed visually?
- What broke or stayed stable?
- Why are IDs more fragile than visible text?

## Lab B: Add A New Topic Pack

Goal: learn how local data powers the tutor.

Main files:

- `reference/data.js`
- `starter/data.js`

Task:

1. Copy an existing topic object.
2. Change `id`, `topic`, `summary`, `vocabulary`, `examples`,
   `misconceptions`, `resources`, `practiceQuestions`, and `sampleQuestion`.
3. Reload the app and pick the new topic.
4. Ask the sample question.
5. Open Debug Lab and inspect the safe context.

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
