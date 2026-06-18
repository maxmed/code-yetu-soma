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

### Connect This Lab

**Related lessons:**
- [How Web Apps Work](../lessons/02-how-web-apps-work.md) - browser/server basics
- [Soma App Architecture](../lessons/03-soma-architecture.md) - how Soma is structured
- [Frontend Walkthrough](../lessons/04-frontend-walkthrough.md) - HTML/CSS/JS in Soma

**Code trail:**
- [`starter/index.html`](../../../starter/index.html) - starter HTML
- [`starter/style.css`](../../../starter/style.css) - starter styles
- [`starter/app.js`](../../../starter/app.js) - starter JavaScript
- [`reference/index.html`](../../../reference/index.html) - full app HTML
- [`reference/app.js`](../../../reference/app.js) - full app JavaScript

**Key functions:** `elements`, `renderCoachResponse`, `renderSelects`

**End-to-end flow:** Edit HTML → save → hard refresh → check console → verify UI works

Main files:

- [starter/index.html](../../../starter/index.html)
- [starter/style.css](../../../starter/style.css)
- [starter/app.js](../../../starter/app.js)

Task:

1. Open `http://127.0.0.1:8787/starter/index.html`.
2. Change one visible heading, label, or intro sentence in
   [starter/index.html](../../../starter/index.html).
3. Keep the element ID the same.
4. Save the file.
5. Hard refresh the browser and confirm the UI changed.
6. Open browser developer tools and confirm there is no red console error.
7. Click **Use sample**, **Preview context**, and **Call /api/coach** to confirm
   the starter still works.

Stretch after the starter works:

1. With a mentor, find the same kind of visible label in
   [reference/index.html](../../../reference/index.html).
2. Change only visible text, not IDs.
3. If the learning server is still running, run
   `SOMA_TEST_PORT=8790 npm run test:e2e`.
4. If a test expects the old label, update the test intentionally with a mentor.

Discussion:

- What changed visually?
- What broke or stayed stable?
- Why are IDs more fragile than visible text?
- Why do beginners start in [starter/](../../../starter/) before editing
  [reference/](../../../reference/)?

## Lab B: Add A New Topic Pack

Goal: learn how local data powers the tutor.

### Live Lab Setup

| Item | Value |
|---|---|
| Timebox | 25-30 minutes |
| Prerequisites | `npm run serve:mock` running in terminal (mock/demo mode, no Gemini key needed) |
| Starting URL | `http://127.0.0.1:8787/starter/index.html` |
| Starting file | [`starter/data.js`](../../../starter/data.js) |
| Internet needed | No (after initial setup) |
| Gemini key needed | No |

### Connect This Lab

**Related lessons:**
- [Data And Context](../lessons/05-data-and-context.md) - how topic data shapes the tutor
- [Soma App Architecture](../lessons/03-soma-architecture.md) - where data fits in the app

**Code trail:**
- [`starter/data.js`](../../../starter/data.js) - starter topic data
- [`reference/data.js`](../../../reference/data.js) - full topic data
- [`reference/app.js`](../../../reference/app.js) - data rendering logic

**Key functions:** `renderTopicSummary`, `buildCoachContext`, `topicPacks`

**End-to-end flow:** Copy topic → edit fields → reload → pick topic → ask question → check context

### Mentor Demo (5 minutes)

Before students start:

1. Show `starter/data.js` open in an editor.
2. Point to one existing topic pack object inside `topicPacks`.
3. Copy the object, change `id` to `"water-cycle"` and `topic` to `"Water cycle"`.
4. Save the file.
5. Hard refresh the browser.
6. Show the new topic appearing in the dropdown.
7. Select it and click **Use sample** to show the sample question.
8. Click **Call /api/coach** and show the mock response uses your topic data.

### Task (15-20 minutes)

1. Open [`starter/data.js`](../../../starter/data.js) in your editor.

2. Find the `topicPacks` array (around line 43).

3. Copy an existing topic object (everything from `{` to `}`).

4. Paste it after the last topic, adding a comma after the previous object.

5. Change these fields to create your own topic (keep all fields from the copied
   object):

   ```js
   {
     id: "water-cycle",
     grade: "Grade 7",
     gradeBand: "Junior School",
     learningArea: "Integrated Science",
     strand: "Matter and Energy",
     topic: "Water cycle",
     studyNeed: "Explain how water moves through the environment",
     summary: "Water moves through evaporation, condensation, precipitation, and collection.",
     vocabulary: [
       { term: "Evaporation", meaning: "Liquid water changes into water vapour." },
       { term: "Condensation", meaning: "Water vapour cools and becomes liquid droplets." }
     ],
     examples: [
       "A puddle drying after sunshine shows evaporation.",
       "Water droplets forming on a cold glass show condensation."
     ],
     misconceptions: [
       {
         mistake: "Rain comes directly from lakes and rivers.",
         help: "Rain forms when water vapour in clouds condenses, not from surface water."
       }
     ],
     resources: [
       {
         title: "Draw The Water Cycle",
         type: "Diagram activity",
         description: "Label evaporation, condensation, precipitation, and collection."
       }
     ],
     practiceQuestions: [
       {
         id: "water-q1",
         question: "Which stage of the water cycle forms clouds?",
         options: ["Evaporation", "Condensation", "Collection", "Filtering"],
         answerIndex: 1,
         feedback: "Clouds form when water vapour cools and condenses into tiny droplets."
       }
     ],
     sampleQuestion: "Why do clouds form before rain?"
   }
   ```

6. Save the file.

7. Hard refresh the browser (`Ctrl+Shift+R` or `Cmd+Shift+R`).

8. In the Setup panel, select your new topic from the dropdown.

9. Click **Use sample** to load the sample question.

10. Click **Call /api/coach** to get a response.

### Expected Visible Result

After completing the task, you should see:

- Your new topic name appears in the topic dropdown.
- Selecting it shows your summary and examples in the topic card.
- The **Preview context** button shows your topic data (including vocabulary) in the safe context JSON.
- The mock coach response references your topic name and uses your examples.

### Quick Check

Ask yourself:

- [ ] Does my new topic appear in the dropdown?
- [ ] Does the topic card show my summary and examples?
- [ ] Does Preview context show my topic data?
- [ ] Does the mock response mention my topic?

If all four are yes, the lab is complete.

### Common Failure and Rescue

| Problem | Likely Cause | Rescue |
|---|---|---|
| Topic does not appear in dropdown | Missing comma between objects, or syntax error in data.js | Open browser console (F12 → Console tab). Look for red JavaScript error. Check for missing commas, brackets, or quotes. |
| Page shows blank or error | JavaScript syntax error in data.js | Use a JSON validator or ask your editor to highlight errors. Compare your object structure to the existing ones. |
| Topic appears but fields are empty | Field names do not match expected names | Check spelling: `topic`, `summary`, `vocabulary`, `examples`, `sampleQuestion`. |
| Call /api/coach does nothing | Server not running | Check terminal shows `Soma server running at http://127.0.0.1:8787 (mock/demo mode)`. If not, run `npm run serve:mock`. |

### Stretch (if time allows)

After the starter works:

1. Open [`reference/data.js`](../../../reference/data.js).
2. Add the same topic pack to the polished app.
3. Open `http://127.0.0.1:8787/` and select your topic.
4. Open **Debug Lab** and compare the safe context with what you saw in the starter.

### Discussion

- Which parts appeared in the topic summary card?
- Which parts were sent to `/api/coach` in the safe context?
- Which parts shaped the mock coach answer?
- Why is it useful to build with local dummy data before using real AI calls?

## Lab C: Edit A Tutor Prompt And Compare Output

Goal: understand how prompt wording changes model behavior.

### Connect This Lab

**Related lessons:**
- [LLM Prompts](../lessons/06-llm-prompts.md) - how prompts shape AI responses
- [Calling The LLM](../lessons/07-calling-the-llm.md) - the API call flow

**Code trail:**
- [`api/coach.js`](../../../api/coach.js) - server-side prompt building
- [`reference/app.js`](../../../reference/app.js) - Debug Lab logic
- [`reference/index.html`](../../../reference/index.html) - Debug Lab UI fields

**Key functions:** `getLabOverrides`, `runLab`, `renderDebug`, `buildGeminiCall`, `getLabConfig`

**End-to-end flow:** Ask question → open Debug Lab → load prompt → edit system prompt → run lab → compare

Main files:

- Debug Lab in the browser
- [api/coach.js](../../../api/coach.js)

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

### Connect This Lab

**Related lessons:**
- [Calling The LLM](../lessons/07-calling-the-llm.md) - model settings and API flow
- [Safety And Variability](../lessons/12-safety-and-variability.md) - why outputs vary

**Code trail:**
- [`api/coach.js`](../../../api/coach.js) - generation config and model call
- [`reference/app.js`](../../../reference/app.js) - Debug Lab controls
- [`reference/index.html`](../../../reference/index.html) - Debug Lab UI

**Key functions:** `generationConfig`, `getLabConfig`, `callGemini`, `providerErrorMessage`

**End-to-end flow:** Ask same question twice → open Debug Lab → change temperature → run lab → compare variability

Main files:

- Debug Lab in the browser
- [api/coach.js](../../../api/coach.js)

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

### Connect This Lab

**Related lessons:**
- [Language And Swahili](../lessons/09-language-and-swahili.md) - multilingual design
- [Data And Context](../lessons/05-data-and-context.md) - context building
- [LLM Prompts](../lessons/06-llm-prompts.md) - prompt instructions

**Code trail:**
- [`reference/data.js`](../../../reference/data.js) - topic data structure
- [`reference/app.js`](../../../reference/app.js) - context building logic
- [`reference/index.html`](../../../reference/index.html) - language UI option
- [`api/coach.js`](../../../api/coach.js) - prompt with language instruction

**Key functions:** `buildCoachContext`, `buildGeminiCall`, new `#languageSelect` in HTML

**End-to-end flow:** Add language option → include in context → update server prompt → test question → verify answer language

Main files:

- [reference/data.js](../../../reference/data.js)
- [reference/app.js](../../../reference/app.js)
- [api/coach.js](../../../api/coach.js)
- [reference/index.html](../../../reference/index.html)

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

### Connect This Lab

**Related lessons:**
- [Parsing And Rendering](../lessons/08-parsing-and-rendering.md) - JSON handling
- [Safety And Variability](../lessons/12-safety-and-variability.md) - error handling

**Code trail:**
- [`api/coach.js`](../../../api/coach.js) - JSON parsing logic
- [`reference/app.js`](../../../reference/app.js) - response rendering and error handling

**Key functions:** `parseGeminiJson`, `normalizeGeminiResponse`, `normalizeCoachResponse`, `renderCoachResponse`, `renderError`

**End-to-end flow:** Find parser → understand text-around-JSON handling → identify error case → discuss mock simulation

Main files:

- [api/coach.js](../../../api/coach.js)
- [reference/app.js](../../../reference/app.js)

Task:

1. Find `parseGeminiJson()` in [api/coach.js](../../../api/coach.js).
2. Explain what happens when the provider returns text around JSON.
3. Explain what error is returned when no JSON object is found.
4. In mock mode, discuss how you would simulate a malformed response for a test.

Discussion:

- Why does the app prefer structured JSON?
- What should the UI show when parsing fails?
- Why should the app avoid pretending malformed output worked?

## Lab G: Replace A Wasteful LLM Call With Normal Code

Goal: learn when not to use an LLM.

### Connect This Lab

**Related lessons:**
- [Where LLMs Fit](../lessons/10-where-llms-fit.md) - when to use AI vs normal code
- [Build Your Own](../lessons/13-build-your-own.md) - making good design choices

**Code trail:**
- [`reference/app.js`](../../../reference/app.js) - rule-based features
- [`reference/data.js`](../../../reference/data.js) - static data
- [`api/coach.js`](../../../api/coach.js) - LLM call for contrast

**Key functions:** `updatePracticeBadge`, `readProgress`, `renderTopicSummary`, `askStudyCoach` (contrast)

**End-to-end flow:** Find deterministic feature → explain why JS is better → implement/inspect rule-based version → describe LLM waste

Main files:

- [reference/app.js](../../../reference/app.js)
- [reference/data.js](../../../reference/data.js)
- [api/coach.js](../../../api/coach.js)

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
