# Lab C: Edit A Tutor Prompt And Compare Output

## Purpose

Understand how prompt wording changes model behavior.

## Live Lab Setup

| Item | Value |
|---|---|
| Timebox | 25-30 minutes |
| Prerequisites | `npm run serve:mock` running in terminal |
| Starting URL | `http://127.0.0.1:8787/` |
| Starting tools | Main app, **Debug Lab**, [`api/coach.js`](../../../api/coach.js) |
| Internet needed | No for mock/demo rehearsal after setup |
| Gemini key needed | No for prompt-shape rehearsal; only needed if the class intentionally compares real model output |

## Connect This Lab

**Related lessons:**
- [LLM Prompts](../lessons/06-llm-prompts.md) - how prompts shape AI responses
- [Calling The LLM](../lessons/07-calling-the-llm.md) - the API call flow

**Code trail:**
- [`api/coach.js`](../../../api/coach.js) - server-side prompt building
- [`reference/app.js`](../../../reference/app.js) - Debug Lab logic
- [`reference/index.html`](../../../reference/index.html) - Debug Lab UI fields

**Key functions:** `getLabOverrides`, `runLab`, `renderDebug`,
`buildGeminiCall`, `getLabConfig`

**End-to-end flow:** ask question -> open Debug Lab -> load prompt -> edit
system prompt -> run lab -> compare

## Mentor Demo (5 minutes)

Before students start:

1. Run the app in mock/demo mode.
2. Ask one normal study question in the main app.
3. Open **Debug Lab**.
4. Click **Load last prompt**.
5. Add one short instruction to the system prompt.
6. Click **Run lab** and point out what changed in the debug request and
   response.
7. Explain that mock/demo mode is safe for rehearsal, while a real model may
   show stronger wording differences.

## Student Task (15-20 minutes)

1. Open `http://127.0.0.1:8787/`.
2. Select a topic and click **Use sample**.
3. Click **Call /api/coach**.
4. Open **Debug Lab**.
5. Click **Load last prompt**.
6. Add one instruction to the system prompt, such as:

   ```text
   Use one local classroom example and ask one check-for-understanding question.
   ```

7. Click **Run lab**.
8. Compare the response before and after.
9. Open [`api/coach.js`](../../../api/coach.js) and find where the base prompt
   is built.
10. Do not put secrets, API keys, private student data, or official marks into
    the prompt.

## Expected Visible Result

After completing the task, you should see:

- Debug Lab shows the loaded prompt text.
- Your added instruction appears in the lab prompt override.
- **Run lab** returns a response in the app.
- The debug details show safe prompt/model metadata without exposing any API key.
- In mock/demo mode, the response may be more stable than a real model, but the
  prompt path is still visible and testable.

## Quick Checks

Ask yourself:

- [ ] Did I load the last prompt before editing?
- [ ] Did I add one clear instruction, not many competing instructions?
- [ ] Did **Run lab** return a response?
- [ ] Can I explain what changed and what stayed the same?

If all four are yes, the lab is complete.

## Common Failures And Rescue

| Problem | Likely Cause | Rescue |
|---|---|---|
| **Load last prompt** has nothing useful | No coach request has run yet | Ask a normal question first, then open Debug Lab again. |
| Response does not change much | Mock/demo mode is deterministic, or instruction is too small | Check the debug request to verify the instruction was sent; try one clearer instruction. |
| Prompt becomes confusing | Too many instructions were added | Keep one new instruction and remove the rest. |
| A key or private detail appears | Unsafe prompt content | Delete it immediately and use only safe classroom context. |

## Stretch

If a mentor confirms the team has a project Gemini key and quota available:

1. Repeat the same test in provider mode.
2. Keep the question and topic the same.
3. Compare whether the real model follows the new instruction more strongly.
4. Switch back to mock/demo mode for normal development.

## Discussion

- What changed?
- What did not change?
- Was the new instruction followed?
- Did the prompt become too long or too strict?
- Why should students test prompt shape locally before spending real AI calls?
