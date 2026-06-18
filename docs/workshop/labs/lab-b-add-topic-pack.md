# Lab B: Add A New Topic Pack

## Purpose

Learn how local data powers the tutor.

## Live Lab Setup

| Item | Value |
|---|---|
| Timebox | 25-30 minutes |
| Prerequisites | `npm run serve:mock` running in terminal (mock/demo mode, no Gemini key needed) |
| Starting URL | `http://127.0.0.1:8787/starter/index.html` |
| Starting file | [`starter/data.js`](../../../starter/data.js) |
| Internet needed | No (after initial setup) |
| Gemini key needed | No |

## Connect This Lab

**Related lessons:**
- [Data And Context](../lessons/05-data-and-context.md) - how topic data shapes the tutor
- [Soma App Architecture](../lessons/03-soma-architecture.md) - where data fits in the app

**Code trail:**
- [`starter/data.js`](../../../starter/data.js) - starter topic data
- [`reference/data.js`](../../../reference/data.js) - full topic data
- [`reference/app.js`](../../../reference/app.js) - data rendering logic

**Key functions:** `topicPacks` in `starter/data.js`, plus
`renderTopicCard` and `buildContext` in `starter/app.js`

**End-to-end flow:** copy topic -> edit fields -> reload -> pick topic -> ask
question -> check context

## Mentor Demo (5 minutes)

Before students start:

1. Show `starter/data.js` open in an editor.
2. Point to one existing topic pack object inside `topicPacks`.
3. Copy the object, change `id` to `"water-cycle"` and `topic` to `"Water cycle"`.
4. Save the file.
5. Hard refresh the browser.
6. Show the new topic appearing in the dropdown.
7. Select it and click **Use sample** to show the sample question.
8. Click **Call /api/coach** and show the mock response uses your topic data.

## Student Task (15-20 minutes)

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

## Expected Visible Result

After completing the task, you should see:

- Your new topic name appears in the topic dropdown.
- Selecting it shows your summary and examples in the topic card.
- The **Preview context** button shows your topic data, including vocabulary, in
  the safe context JSON.
- The mock coach response references your topic name and uses your examples.

## Quick Checks

Ask yourself:

- [ ] Does my new topic appear in the dropdown?
- [ ] Does the topic card show my summary and examples?
- [ ] Does Preview context show my topic data?
- [ ] Does the mock response mention my topic?

If all four are yes, the lab is complete.

## Common Failures And Rescue

| Problem | Likely Cause | Rescue |
|---|---|---|
| Topic does not appear in dropdown | Missing comma between objects, or syntax error in `data.js` | Open browser console. Look for the first red JavaScript error. Check commas, brackets, and quotes. |
| Page shows blank or error | JavaScript syntax error in `data.js` | Compare your object structure to an existing topic object. |
| Topic appears but fields are empty | Field names do not match expected names | Check spelling: `topic`, `summary`, `vocabulary`, `examples`, `sampleQuestion`. |
| **Call /api/coach** does nothing | Server not running | Check terminal shows `Soma server running at http://127.0.0.1:8787 (mock/demo mode)`. If not, run `npm run serve:mock`. |

## Stretch

After the starter works:

1. Open [`reference/data.js`](../../../reference/data.js).
2. Add the same topic pack to the polished app.
3. Open `http://127.0.0.1:8787/` and select your topic.
4. Open **Debug Lab** and compare the safe context with what you saw in the
   starter.

## Discussion

- Which parts appeared in the topic summary card?
- Which parts were sent to `/api/coach` in the safe context?
- Which parts shaped the mock coach answer?
- Why is it useful to build with local dummy data before using real AI calls?
