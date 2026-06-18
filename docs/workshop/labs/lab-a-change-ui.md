# Lab A: Change One UI Section Safely

## Purpose

Learn how HTML, CSS, and JavaScript stay connected without touching the larger
reference app yet.

## Live Lab Setup

| Item | Value |
|---|---|
| Timebox | 20-25 minutes |
| Prerequisites | `npm run serve:mock` running in terminal |
| Starting URL | `http://127.0.0.1:8787/starter/index.html` |
| Starting files | [`starter/index.html`](../../../starter/index.html), [`starter/style.css`](../../../starter/style.css), [`starter/app.js`](../../../starter/app.js) |
| Internet needed | No (after initial setup) |
| Gemini key needed | No |

## Connect This Lab

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

**Key functions:** starter DOM constants such as `modeSelect` and
`coachButton`, plus `renderSelects`, `renderTopicCard`, and `renderResponse`

**End-to-end flow:** edit visible HTML text -> save -> hard refresh -> check
console -> click the main buttons -> verify the app still works

## Mentor Demo (5 minutes)

Before students start:

1. Open `starter/index.html` and the starter app in the browser.
2. Point to one visible sentence, heading, or label.
3. Show the nearby `id` attribute and explain that JavaScript may use it.
4. Change only visible text, not the `id`.
5. Save and hard refresh the browser.
6. Open the browser console and show there are no red errors.

## Student Task (15 minutes)

1. Open `http://127.0.0.1:8787/starter/index.html`.
2. Open [`starter/index.html`](../../../starter/index.html) in your editor.
3. Change one visible heading, label, or intro sentence.
4. Keep every `id` value exactly the same.
5. Save the file.
6. Hard refresh the browser (`Ctrl+Shift+R` or `Cmd+Shift+R`).
7. Confirm the UI changed.
8. Open browser developer tools and confirm there is no red console error.
9. Click **Use sample**, **Preview context**, and **Call /api/coach** to confirm
   the starter still works in mock/demo mode.

## Expected Visible Result

After completing the task, you should see:

- Your changed text appears in the starter page.
- The topic dropdown still loads.
- **Use sample** still fills the question box.
- **Preview context** still shows safe local context.
- **Call /api/coach** still returns a mock/demo response.

## Quick Checks

Ask yourself:

- [ ] Did I change visible text only?
- [ ] Did I leave IDs unchanged?
- [ ] Does the browser console have no red errors?
- [ ] Do all three starter buttons still work?

If all four are yes, the lab is complete.

## Common Failures And Rescue

| Problem | Likely Cause | Rescue |
|---|---|---|
| Button stops working | An `id` changed or was deleted | Compare your file with the original nearby line and restore the `id`. |
| Page layout looks broken | A tag was accidentally removed | Check that every opening tag still has a matching closing tag. |
| No change appears | Browser cached the old file | Hard refresh with `Ctrl+Shift+R` or `Cmd+Shift+R`. |
| Red console error | HTML or JavaScript connection broke | Read the first red error, then undo only the last risky change. |

## Stretch

After the starter works:

1. With a mentor, find the same kind of visible label in
   [`reference/index.html`](../../../reference/index.html).
2. Change only visible text, not IDs.
3. If the learning server is still running, run
   `SOMA_TEST_PORT=8790 npm run test:e2e`.
4. If a test expects the old label, update the test intentionally with a mentor.

## Discussion

- What changed visually?
- What broke or stayed stable?
- Why are IDs more fragile than visible text?
- Why do beginners start in [`starter/`](../../../starter/) before editing
  [`reference/`](../../../reference/)?
