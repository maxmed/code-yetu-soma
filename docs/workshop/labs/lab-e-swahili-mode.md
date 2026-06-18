# Lab E: Add Swahili Answer Mode

## Purpose

Design a multilingual feature safely.

## Live Lab Setup

| Item | Value |
|---|---|
| Timebox | 35-45 minutes |
| Prerequisites | `npm run serve:mock` running in terminal |
| Starting URL | `http://127.0.0.1:8787/` |
| Starting files | [`reference/index.html`](../../../reference/index.html), [`reference/app.js`](../../../reference/app.js), [`api/coach.js`](../../../api/coach.js) |
| Internet needed | No for UI/context work after setup |
| Gemini key needed | No for building and checking the local path |

## Connect This Lab

**Related lessons:**
- [Language And Swahili](../lessons/09-language-and-swahili.md) - multilingual design
- [Data And Context](../lessons/05-data-and-context.md) - context building
- [LLM Prompts](../lessons/06-llm-prompts.md) - prompt instructions

**Code trail:**
- [`reference/data.js`](../../../reference/data.js) - topic data structure
- [`reference/app.js`](../../../reference/app.js) - context building logic
- [`reference/index.html`](../../../reference/index.html) - language UI option
- [`api/coach.js`](../../../api/coach.js) - prompt with language instruction

**Key functions:** `buildCoachContext`, `buildGeminiCall`, new
`#languageSelect` in HTML

**End-to-end flow:** add language option -> include in context -> update server
prompt -> test question -> verify answer language path

## Mentor Demo (5 minutes)

Before students start:

1. Open the reference app and ask a sample question.
2. Open **Debug Lab** and show the safe context.
3. Explain the difference between UI language and answer language.
4. Point to where a language selector could live in `reference/index.html`.
5. Point to `buildCoachContext()` in `reference/app.js`.
6. Point to the prompt builder in `api/coach.js`.

## Student Task (25-35 minutes)

1. Open [`reference/index.html`](../../../reference/index.html).
2. Add a simple answer-language control near the setup controls, such as English
   or Swahili.
3. Give the control a stable ID, for example `languageSelect`.
4. Open [`reference/app.js`](../../../reference/app.js).
5. Add the new element to the `elements` object.
6. Include the selected language in `buildCoachContext()`.
7. Open [`api/coach.js`](../../../api/coach.js).
8. Update the prompt-building path so the coach can respect the selected answer
   language.
9. Run the app in mock/demo mode and ask a simple question.
10. Open **Debug Lab** and confirm the selected language appears in safe context.
11. Confirm the page still has the correct `lang` attribute, or write a note in
    your project README explaining that only answer language changed for now.

## Expected Visible Result

After completing the task, you should see:

- A visible answer-language choice in the reference app.
- The app still works with `npm run serve:mock`.
- Debug Lab safe context includes the selected language.
- The prompt path includes a clear answer-language instruction.
- No API key or private data appears in the browser or Debug Lab.

## Quick Checks

Ask yourself:

- [ ] Can I choose English or Swahili in the UI?
- [ ] Does the selected value appear in safe context?
- [ ] Does the server prompt receive the selected answer language?
- [ ] Did I avoid claiming the whole UI is translated if only the answer changed?

If all four are yes, the lab is complete.

## Common Failures And Rescue

| Problem | Likely Cause | Rescue |
|---|---|---|
| Language control appears but does nothing | `reference/app.js` does not read the new element | Add the element lookup and include its value in `buildCoachContext()`. |
| Debug Lab does not show language | Context object was not updated | Inspect the safe context and check the field name. |
| Prompt ignores language | `api/coach.js` does not use the context field | Add one clear instruction in the prompt builder. |
| Page claims full translation too early | Only answer language was added | Keep UI labels in English and document that full UI translation is future work. |

## Stretch

After the local path works:

1. Add one Swahili vocabulary example to a topic pack.
2. Ask a mentor or speaker to review the language quality.
3. Add a short note explaining how the team will test multilingual answers.
4. Consider adding a small Playwright check for the language selector.

## Discussion

- Should the whole UI switch languages, or only the answer?
- What happens when students code-switch?
- How will mentors check answer quality?
- Why is language review by a human still important?
