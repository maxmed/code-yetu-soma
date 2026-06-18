# Lab D: Change Model Settings And Observe Variability

## Purpose

Learn that model output can vary and that tests should not depend on exact AI
wording.

## Live Lab Setup

| Item | Value |
|---|---|
| Timebox | 25-30 minutes |
| Prerequisites | `npm run serve:mock` running in terminal |
| Starting URL | `http://127.0.0.1:8787/` |
| Starting tools | Main app, **Debug Lab**, `/api/coach` |
| Internet needed | No for mock/demo rehearsal after setup |
| Gemini key needed | No for settings inspection; only needed if the class intentionally compares real provider variability |

## Connect This Lab

**Related lessons:**
- [Calling The LLM](../lessons/07-calling-the-llm.md) - model settings and API flow
- [Safety And Variability](../lessons/12-safety-and-variability.md) - why outputs vary

**Code trail:**
- [`api/coach.js`](../../../api/coach.js) - generation config and model call
- [`reference/app.js`](../../../reference/app.js) - Debug Lab controls
- [`reference/index.html`](../../../reference/index.html) - Debug Lab UI

**Key functions:** `generationConfig`, `getLabConfig`, `callGemini`,
`providerErrorMessage`

**End-to-end flow:** ask same question twice -> open Debug Lab -> change
temperature -> run lab -> compare variability

## Mentor Demo (5 minutes)

Before students start:

1. Ask one sample question in the main app.
2. Open **Debug Lab**.
3. Point to the model settings.
4. Show a low temperature value such as `0.1`.
5. Show a higher temperature value such as `1.2`.
6. Explain that mock/demo mode lets students inspect the settings safely, while
   real provider mode is needed to observe true model variability.

## Student Task (15-20 minutes)

1. Open `http://127.0.0.1:8787/`.
2. Select a topic and click **Use sample**.
3. Click **Call /api/coach**.
4. Open **Debug Lab**.
5. Run the lab once with default settings.
6. Set temperature to `0.1` and click **Run lab**.
7. Set temperature to `1.2` and click **Run lab**.
8. Compare the answers and the debug details.
9. Open [`api/coach.js`](../../../api/coach.js) and find `generationConfig`.
10. Explain why app tests should check structure and behavior, not exact AI
    sentences.

## Expected Visible Result

After completing the task, you should see:

- Debug Lab accepts a temperature value.
- The response still renders after changing settings.
- The debug details show the model settings used for the request.
- In mock/demo mode, wording may stay stable because no real model was called.
- In provider mode, wording may vary more between runs.

## Quick Checks

Ask yourself:

- [ ] Can I find the temperature control in Debug Lab?
- [ ] Can I run the lab with a low and higher value?
- [ ] Can I find the default config in `api/coach.js`?
- [ ] Can I explain why exact AI wording is a weak test target?

If all four are yes, the lab is complete.

## Common Failures And Rescue

| Problem | Likely Cause | Rescue |
|---|---|---|
| Temperature field is ignored | Value is blank or outside allowed range | Use a number such as `0.1`, `0.7`, or `1.2`; the server clamps unsafe values. |
| Answers look identical | Mock/demo mode is deterministic | Treat this as settings-path rehearsal, or ask a mentor before using real provider mode. |
| Provider returns quota or key error | Gemini key is missing, invalid, or over quota | Return to `npm run serve:mock` and continue without real LLM calls. |
| Test fails because wording changed | Test expected exact AI text | Change the test to check UI sections, JSON shape, or safe behavior. |

## Stretch

If a mentor confirms real provider mode is safe to use:

1. Ask the same question three times at low temperature.
2. Ask the same question three times at higher temperature.
3. Record which setting gives more consistent wording.
4. Switch back to mock/demo mode after the comparison.

## Discussion

- Which answer was more predictable?
- Which answer was more creative?
- Which setting is safer for a study coach?
- Why should tests not rely on exact AI wording?
