# Session 2: Web App Scaffold

## Goal

Teams create a working HTML/CSS/JS app shell.

Deepen this session:

- [How Web Apps Work](../lessons/02-how-web-apps-work.md)
- [Soma App Architecture](../lessons/03-soma-architecture.md)
- [Frontend Walkthrough](../lessons/04-frontend-walkthrough.md)
- [Lab A: Change One UI Section Safely](../labs/README.md#lab-a-change-one-ui-section-safely)
- [Fix A JavaScript Error prompt](../../student/ai-coding-prompts.md#fix-a-javascript-error)

## Students Build

- page layout
- setup form for year/class, learning area, and study need
- topic/question input, with mode/setup controls visible in the scaffold or advanced in the public app
- output/results area
- revision plan area
- topic tutor or help area
- JavaScript connected to the page

## Scaffold Option

Use [`starter/`](../../../starter/) as the base. Teams can rename headings,
data, and questions.

Students should build this scaffold local-first. Use
[`starter/data.js`](../../../starter/data.js), `npm run serve:mock`, and
mock/demo responses before any Gemini key is required. The goal of this session
is a working local page, not a live LLM call.

The public app shows the fuller Soma Study Coach flow. Students do not need to
copy every feature on day one; they should first make the page sections and one
button work.

Before editing the endpoint path, use
[Soma App Architecture](../lessons/03-soma-architecture.md) to name the pieces:
browser, local server, [`starter/`](../../../starter/),
[`reference/`](../../../reference/), `/api/coach`, mock mode, and provider mode.

## Concept: Web App Flow

```text
HTML = structure
CSS = appearance
JavaScript = behavior
Data = what the app reasons over
```

## Activity 1: Run The Scaffold

Use the local server path, not a `file://` browser open:

```text
http://127.0.0.1:8787/starter/index.html
```

The server path matters because later labs use `/api/coach`.

Check:

- page loads
- setup/topic controls appear
- button works
- result area displays
- empty states are visible for context/plan/progress/coach sections

## Activity 2: Customize The App

Teams change:

- app name
- target user
- colors
- intro text
- topic/question fields and any setup controls your project needs
- setup fields for grade, learning area, topic, and support type
- section names for plan, resources, progress, or coach

## Activity 3: Connect One Button

Students should identify:

- button ID
- event listener
- function that runs on click
- output element updated by JavaScript

## Debug Checklist

- Is [`starter/app.js`](../../../starter/app.js) loaded after
  [`starter/data.js`](../../../starter/data.js)?
- Are IDs spelled the same in HTML and JS?
- Is there an error in browser console?
- Did the function run? Add `console.log("clicked")`.

## Team Output

A working page where a user can enter or select information and see at least one result area update.

## Homework

Replace the scaffold questions/data with your project data.

## Ready To Continue Check

Students are ready for Session 3 if they can:

- open `http://127.0.0.1:8787/starter/index.html`,
- explain that the scaffold can be developed locally with dummy data and
  mock/demo responses before using an LLM,
- identify [`starter/index.html`](../../../starter/index.html),
  [`starter/style.css`](../../../starter/style.css),
  [`starter/app.js`](../../../starter/app.js), and
  [`starter/data.js`](../../../starter/data.js),
- make one visible text or style change in [`starter/`](../../../starter/),
- hard refresh and see the change,
- click one button and explain which JavaScript function ran,
- open the browser console and check for errors.
