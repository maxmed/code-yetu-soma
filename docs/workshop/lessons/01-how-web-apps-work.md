# Lesson 1: How Web Apps Work

Time: 30-40 minutes

Audience: beginners who know a little HTML/CSS and are starting JavaScript.

## Learner Hook

Every app you use - WhatsApp, TikTok, M-Pesa, a school portal - is built from
the same three layers. In this lesson, you open the hood and see the structure,
style and behavior that make a page feel alive.

## Try This Now

Open Soma, press F12, choose the Elements tab, and hover over the Ask coach
button. Watch the browser highlight the exact HTML element behind the button.

## Real-World Connection

M-Pesa and banking apps use visible screens, brand styling and JavaScript
behavior together. The menu you tap is structure, the familiar colors are
styling, and the transaction flow is behavior talking to a server.

## Learning Goals

By the end, students can:

- describe the jobs of HTML, CSS, and JavaScript,
- explain how a browser responds to a button click,
- find the main Soma frontend files,
- explain why `fetch()` is used to call `/api/coach`,
- explain why `localStorage` is used only for non-sensitive progress.

## Key Ideas

A web app is a page that the browser can display and interact with.

HTML gives the page structure. It says what exists: headings, buttons, inputs,
sections, forms, and lists.

CSS controls presentation. It says how things look: layout, spacing, colors,
font sizes, hidden sections, and responsive behavior.

JavaScript controls behavior. It listens for events, reads values from inputs,
updates the page, stores small local state, and calls server endpoints.

Soma Study Coach is a plain browser app. That is a deliberate teaching choice:
students can open the files, read the code, and see how each layer connects.

## Diagram

```text
student clicks button
        |
        v
browser event listener in reference/app.js
        |
        v
build JSON context from topic, question, resources, safety rules
        |
        v
fetch("/api/coach")
        |
        v
render structured answer into the page
```

## Find It In This Repo

| File | Why It Matters |
|---|---|
| `reference/index.html` | Defines the visible app sections and element IDs. |
| `reference/style.css` | Controls the layout, panels, Debug Lab, and responsive design. |
| `reference/data.js` | Stores local topics, vocabulary, examples, resources, and sample questions. |
| `reference/app.js` | Adds behavior: events, context building, `fetch`, rendering, progress, errors. |
| `starter/` | Smaller scaffold students can modify before reading the full public app implementation. |

## Map To Soma Code

- Public app route: `/` and `/index.html` serve `reference/index.html`.
- Page structure: `reference/index.html`.
- Visual layout: `reference/style.css`.
- Browser behavior: `reference/app.js`.
- Local topic data: `reference/data.js`.
- Smaller teaching scaffold: `starter/index.html`, `starter/app.js`,
  `starter/style.css`.
- Related lab: [Lab A: Change One UI Section Safely](../labs/README.md#lab-a-change-one-ui-section-safely).
- Helpful prompts: [Fix A JavaScript Error](../../student/ai-coding-prompts.md#fix-a-javascript-error),
  [Make The UI Clearer](../../student/ai-coding-prompts.md#make-the-ui-clearer).

## Worked Soma Example

The Ask coach button is declared in `reference/index.html`:

```html
<button id="coachButton" type="button">Ask coach</button>
```

The JavaScript finds that element:

```js
coachButton: document.getElementById("coachButton")
```

Later, `app.js` attaches behavior to it. When the student clicks the button, the
app validates the question, builds the coach context, calls `/api/coach`, and
renders the response.

This is the basic web app pattern:

```text
HTML element -> JavaScript reads element -> event happens -> app updates
```

## What The Frontend Does

The frontend is everything running in the browser:

- shows topics and questions,
- reads the selected topic,
- reads the student's question,
- prevents obvious personal data from being sent,
- builds a JSON request,
- calls `/api/coach`,
- renders the answer,
- shows quota, network, and safety errors honestly,
- stores local checklist progress.

The frontend does not call Gemini directly and does not hold API keys.

## What `fetch()` Does

`fetch()` is the browser API for making network requests. Soma uses it in
`reference/app.js` to call the server:

```js
fetch("/api/coach", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(context)
})
```

This means:

- send a `POST` request,
- tell the server the body is JSON,
- convert the JavaScript object into a JSON string,
- wait for the server response.

## What `localStorage` Does

Soma uses `localStorage` for the study-plan checklist. It remembers which plan
items were checked on that browser.

Use `localStorage` only for harmless local state. Do not store names, marks,
phone numbers, private learner records, or API keys.

## Live Demo

1. Start the app with `npm run serve:mock`.
2. Open `http://127.0.0.1:8787/`.
3. Pick a topic.
4. Click **Use sample**.
5. Click **Ask coach**.
6. Open **Debug Lab**.
7. Show students the safe context and the parsed app response.

Point out the path:

```text
topic select + textarea -> JavaScript context -> /api/coach -> answer panel
```

## Student Exercise

Task: Change the sample question text for one topic.

Steps:

1. Open `reference/data.js`.
2. Find a topic's `sampleQuestion`.
3. Change it to a new learning question.
4. Reload the app.
5. Click **Use sample**.

Expected result: the textarea shows the new sample question.

Stretch: change one vocabulary definition and check that the topic summary
updates.

## Reflection Questions

- What did HTML define?
- What did JavaScript change?
- What did CSS control?
- Why does the app call `/api/coach` instead of calling Gemini directly?
- What data is safe to store in `localStorage`?

## Mentor Notes

Keep this lesson concrete. Do not start with frameworks or build tools. The
point is the mental model:

```text
page structure + styles + behavior + server call
```

If students get stuck, ask them to trace one visible label from the browser back
to `index.html`, then from the element ID into `app.js`.

## Deeper Reading

- MDN Learn Web Development: https://developer.mozilla.org/en-US/docs/Learn_web_development
- MDN JavaScript basics: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting
- web.dev Learn HTML: https://web.dev/learn/html
- web.dev Learn CSS: https://web.dev/learn/css

## Inspiring Resources

- Fireship: HTML in 100 Seconds - https://www.youtube.com/watch?v=ok-plXXHlWw
- MDN: Creating the content for your first website - https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website/Creating_the_content
