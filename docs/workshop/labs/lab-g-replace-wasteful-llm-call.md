# Lab G: Replace A Wasteful LLM Call With Normal Code

## Purpose

Learn when not to use an LLM.

## Live Lab Setup

| Item | Value |
|---|---|
| Timebox | 25-35 minutes |
| Prerequisites | `npm run serve:mock` running in terminal |
| Starting URL | `http://127.0.0.1:8787/` |
| Starting files | [`reference/app.js`](../../../reference/app.js), [`reference/data.js`](../../../reference/data.js), [`api/coach.js`](../../../api/coach.js) |
| Internet needed | No after setup |
| Gemini key needed | No |

## Connect This Lab

**Related lessons:**
- [Where LLMs Fit](../lessons/10-where-llms-fit.md) - when to use AI vs normal code
- [Build Your Own](../lessons/13-build-your-own.md) - making good design choices

**Code trail:**
- [`reference/app.js`](../../../reference/app.js) - rule-based features
- [`reference/data.js`](../../../reference/data.js) - static data
- [`api/coach.js`](../../../api/coach.js) - LLM call for contrast

**Key functions:** `updatePracticeBadge`, `readProgress`,
`renderTopicSummary`, `askStudyCoach`

**End-to-end flow:** find deterministic feature -> explain why JavaScript is
better -> implement or inspect rule-based version -> describe LLM waste

## Mentor Demo (5 minutes)

Before students start:

1. Open the reference app and select a topic.
2. Show that the topic summary appears immediately from local data.
3. Open [`reference/app.js`](../../../reference/app.js).
4. Find `renderTopicSummary()`.
5. Explain that displaying known local data does not require an LLM.
6. Contrast it with `askStudyCoach()`, where flexible language generation may
   be useful.

## Student Task (15-25 minutes)

1. Open [`reference/app.js`](../../../reference/app.js).
2. Find one feature that does not need AI, such as:
   - counting answered practice questions,
   - showing the selected topic summary,
   - reading saved progress,
   - rendering local resources.
3. Open [`reference/data.js`](../../../reference/data.js) and find the local data
   used by that feature.
4. Explain why normal JavaScript is better for this task.
5. Implement a tiny rule-based improvement, or inspect the existing rule-based
   version with a mentor.
6. Run the app in mock/demo mode.
7. Verify the feature works without a Gemini key.
8. Describe what would be wasteful about calling an LLM for that task.

## Expected Visible Result

After completing the task, you should see:

- The chosen feature works locally.
- The browser does not need a real LLM call for the chosen feature.
- The UI result is predictable and fast.
- You can point to the JavaScript or data that powers it.
- You can explain when `/api/coach` is useful and when it is unnecessary.

## Quick Checks

Ask yourself:

- [ ] Is the task deterministic?
- [ ] Can normal JavaScript answer it from local data?
- [ ] Does the feature work in mock/demo mode?
- [ ] Would an LLM call add cost, delay, or risk?

If all four are yes, the lab is complete.

## Common Failures And Rescue

| Problem | Likely Cause | Rescue |
|---|---|---|
| Team wants to use AI for everything | The decision rule is unclear | Ask: does this need language judgment or generation? If not, use normal code. |
| Feature becomes slower | It was routed through `/api/coach` unnecessarily | Move deterministic work back to local JavaScript. |
| Output changes unpredictably | AI was used for a fixed rule | Replace the AI call with a function and test expected behavior. |
| Private data would be sent | The task was sent to a provider unnecessarily | Keep local-only tasks in the browser or server code without LLM calls. |

## Stretch

With a mentor:

1. Add a small helper function for a deterministic feature.
2. Add or update a test that checks the behavior.
3. Confirm the test passes in mock/demo mode.
4. Write one sentence explaining why this feature should not use an LLM.

## Discussion

- Is the task deterministic?
- Does it require judgment or language generation?
- Does it involve private data?
- Would an LLM call add cost, delay, or risk?
