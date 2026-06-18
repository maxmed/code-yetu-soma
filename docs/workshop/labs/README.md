# Workshop Labs

Labs are short hands-on tasks. Each detailed lab now lives in its own file so
mentors can open one clear guide during a live session and students can follow
one path without scrolling through every lab.

Use labs with:

- [Lesson Index](../lessons/README.md) for the concept behind each task.
- [Concept To Code Map](../concept-to-code-map.md) for file and prompt links.
- [Extend Soma](../../extend-soma.md) when students are turning a lab into a
  project remix.
- [AI Coding Prompts](../../student/ai-coding-prompts.md) when students need
  focused help.
- [Testing And Debugging](../../testing-debugging.md) before demos or commits.

Default classroom path:

1. Run `npm run serve:mock`.
2. Start with local data and mock/demo responses.
3. Do not require a Gemini key for beginner lab work.
4. After setup, students should be able to keep working without internet.

## Lab Map

| Lab | Detailed Guide | Concept | Main Files |
|---|---|---|---|
| A | [Change One UI Section Safely](./lab-a-change-ui.md) | [How Web Apps Work](../lessons/02-how-web-apps-work.md) | `starter/index.html`, `starter/style.css`, `starter/app.js` |
| B | [Add A New Topic Pack](./lab-b-add-topic-pack.md) | [Data And Context](../lessons/05-data-and-context.md) | `starter/data.js` |
| C | [Edit A Tutor Prompt And Compare Output](./lab-c-edit-prompt.md) | [LLM Prompts](../lessons/06-llm-prompts.md) | Debug Lab, `api/coach.js` |
| D | [Change Model Settings And Observe Variability](./lab-d-model-settings.md) | [Calling The LLM](../lessons/07-calling-the-llm.md) | Debug Lab, `/api/coach` |
| E | [Add Swahili Answer Mode](./lab-e-swahili-mode.md) | [Language And Swahili](../lessons/09-language-and-swahili.md) | `reference/app.js`, `reference/index.html`, `api/coach.js` |
| F | [Debug A Bad JSON Response](./lab-f-debug-json.md) | [Parsing And Rendering](../lessons/08-parsing-and-rendering.md) | `api/coach.js`, `reference/app.js` |
| G | [Replace A Wasteful LLM Call With Normal Code](./lab-g-replace-wasteful-llm-call.md) | [Where LLMs Fit](../lessons/10-where-llms-fit.md) | `reference/app.js`, `reference/data.js`, `api/coach.js` |

## Lab A: Change One UI Section Safely

Open the detailed guide: [Lab A - Change One UI Section Safely](./lab-a-change-ui.md).

Beginner outcome: students change visible UI text while keeping IDs and
JavaScript behavior stable.

## Lab B: Add A New Topic Pack

Open the detailed guide: [Lab B - Add A New Topic Pack](./lab-b-add-topic-pack.md).

Beginner outcome: students add a local topic pack in `starter/data.js` and see
it work without a Gemini key or live LLM call.

## Lab C: Edit A Tutor Prompt And Compare Output

Open the detailed guide: [Lab C - Edit A Tutor Prompt And Compare Output](./lab-c-edit-prompt.md).

Beginner outcome: students use Debug Lab to see how prompt wording changes the
shape of a tutor response.

## Lab D: Change Model Settings And Observe Variability

Open the detailed guide: [Lab D - Change Model Settings And Observe Variability](./lab-d-model-settings.md).

Beginner outcome: students change model settings in Debug Lab and explain why
AI output should not be tested by exact wording.

## Lab E: Add Swahili Answer Mode

Open the detailed guide: [Lab E - Add Swahili Answer Mode](./lab-e-swahili-mode.md).

Beginner outcome: students design a language preference carefully, starting
with answer language before translating the whole UI.

## Lab F: Debug A Bad JSON Response

Open the detailed guide: [Lab F - Debug A Bad JSON Response](./lab-f-debug-json.md).

Beginner outcome: students inspect the parser path and understand why malformed
AI output must fail clearly.

## Lab G: Replace A Wasteful LLM Call With Normal Code

Open the detailed guide: [Lab G - Replace A Wasteful LLM Call With Normal Code](./lab-g-replace-wasteful-llm-call.md).

Beginner outcome: students identify deterministic work that should be handled
with normal JavaScript instead of an LLM call.
