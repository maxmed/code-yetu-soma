# Workshop Scaffold: Soma Study Coach

Open `index.html` from a simple local server.

This scaffold demonstrates the same `/api/coach` learning pattern as the public
Soma app, but keeps all setup controls visible for beginners:

- choose help mode,
- choose Grade 7 Integrated Science topic,
- ask a student question,
- preview the safe context,
- call `/api/coach`,
- render a structured study helper response,
- ask a follow-up question,
- track returned plan tasks in local browser storage.

This scaffold is intentionally smaller than `../reference/`. The public app is
the polished tutor-first version served at `/`; this scaffold exposes more setup
controls so students can see how the context is built. Students can add practice
input, stronger error UI, and more topics during the workshop.

## Files

- `index.html` - page structure. Change visible text and section order, but keep
  `id=""` values unless you also update `app.js`.
- `style.css` - scaffold styling. Change colors, spacing and layout here.
- `data.js` - dummy Grade 7 topic-pack data. Start here when adding a new
  topic, vocabulary list, resource, misconception, or sample question.
- `app.js` - mode/topic selection, context preview, `/api/coach` adapter,
  response rendering, follow-up flow and local progress.

## Common Student Extensions

| Goal | Start In | Keep Stable |
|---|---|---|
| Add a new topic | `data.js` `topicPacks` | The topic object field names used by `buildContext()` |
| Change what gets sent to `/api/coach` | `app.js` `buildContext()` | No names, marks, phone numbers, schools, or private records |
| Add a new answer section | `app.js` `renderResponse()` and `index.html` if needed | Escape user/provider text before rendering |
| Restyle the starter | `style.css` | Existing ids and button behavior |
| Add another button | `index.html`, then event wiring at the bottom of `app.js` | One button should call one clear function |

## Code Reading Order

1. Open `index.html` to see the panels and ids.
2. Open `data.js` to see the topic data that fills the dropdowns.
3. In `app.js`, read `buildContext()` to understand what is sent.
4. Read `askStudyCoach()` to see the single `/api/coach` call.
5. Read `renderResponse()` to see how the answer appears on the page.

## Rules

- Do not put API keys in frontend JavaScript.
- Use dummy/sample learner data only.
- Do not send names, school names, real marks, phone numbers, or private records.
- If `/api/coach` fails, show the error honestly.
