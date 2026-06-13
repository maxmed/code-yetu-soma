# Starter App: Soma Study Coach

Open `index.html` from a simple local server.

This starter demonstrates the same mode-first shape as the reference app:

- choose help mode,
- choose Grade 7 Integrated Science topic,
- ask a student question,
- preview the safe context,
- call `/api/coach`,
- render a structured study helper response,
- ask a follow-up question,
- track returned plan tasks in local browser storage.

The starter is intentionally smaller than `../reference/`. Students can add
practice input, stronger error UI, and more topics during the workshop.

## Files

- `index.html` - page structure
- `style.css` - starter styling
- `data.js` - dummy Grade 7 topic-pack data
- `app.js` - mode/topic selection, context preview, `/api/coach` adapter, response rendering

## Rules

- Do not put API keys in frontend JavaScript.
- Use dummy/sample learner data only.
- Do not send names, school names, real marks, phone numbers, or private records.
- If `/api/coach` fails, show the error honestly.
