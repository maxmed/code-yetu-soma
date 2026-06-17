# Testing For Fast Feedback

Use this with the [Student Handout](./handout.md), [AI Coding
Prompts](./ai-coding-prompts.md), [Student AI Limits And Advice](./ai-limits.md),
and the deeper [Testing And Debugging](../testing-debugging.md) guide.

Testing is not extra homework. It is how you find bugs while they are still
small.

## Why Tests Help You Move Faster

A test is a clear question:

```text
When I do this input, what should the app do?
```

Good tests help you:

- catch bugs before demo day,
- know whether a change helped or broke the app,
- explain your project with evidence,
- avoid clicking `/api/coach` again and again while debugging,
- save shared AI quota for the checks that really need the model.

Do not wait until the end. Test after each small change.

## The Fast Loop

Use this loop while building:

1. Change one small thing.
2. Predict what should happen.
3. Test it in the browser.
4. Write down expected versus actual.
5. Fix one bug.
6. Test again.
7. Run the smoke tests before demo or submission.

If you change many files before testing, it becomes harder to know which change
caused the bug.

## Manual Test Cases

Start with manual tests. They are simple, fast, and easy to explain.

| Test | Input | Expected Result | Why It Matters |
|---|---|---|---|
| Normal study question | Mode: Learn Topic. Topic: Characteristics of living things. Question: "Why is growth a life process?" | The app shows an explanation, example, practice step, resources, and limitations. | Proves the main learning flow works. |
| Empty question | Choose a topic but leave the question blank. | The app asks for a study question instead of calling the coach. | Prevents confusing or wasteful requests. |
| Study plan | Mode: Study Plan. Topic: Mixtures and separation. | A plan appears and progress can be checked locally. | Proves the app can help students continue learning. |
| Personal data | Ask a question with a fake name, mark, phone number, or school record. | The app blocks or warns before sending the request. | Protects private learner data. |
| Quota or network problem | The coach returns a quota or network error. | The app shows an honest error and does not pretend the AI worked. | Builds trust and avoids hiding failures. |
| Mobile check | Open the app in a narrow browser window. | Inputs, buttons, answers, and Debug Lab are readable. | Students may demo on different screens. |

Write your own table for your project:

```text
Test:
Input:
Expected:
Actual:
Pass or fail:
What I changed after this:
```

## Expected Versus Actual

When something breaks, do not only write "it does not work." Write the
difference between what you expected and what happened.

Example:

```text
Expected:
After I click Ask coach, the answer card should show an explanation and
resources.

Actual:
The page shows "Something went wrong" and the browser console says
"Cannot read properties of undefined".

Next check:
Look at the response field names in app.js and compare them with /api/coach.
```

That kind of note helps a teammate, mentor, or AI coding assistant help you
faster.

## When To Run The Smoke Tests

Manual tests are good while you are still changing code. Before a demo, run the
project smoke tests from the repo root:

```bash
npm run test:e2e
```

If the local learning server is already running on `8787`, use a separate test
port:

```bash
SOMA_TEST_PORT=8790 npm run test:e2e
```

Run smoke tests when:

- you changed JavaScript behavior,
- you changed important HTML labels or IDs,
- you changed `/api/coach` request or response fields,
- you are about to demo,
- a mentor asks whether the app is still working.

## If A Test Fails

Use this order:

1. Read the first failing message.
2. Reproduce the same action manually in the browser.
3. Check the browser console for a JavaScript error.
4. Fix one small thing.
5. Run the failing check again.
6. Run the full smoke tests after the fix.

Do not paste the whole project into an AI coding assistant. Paste the smallest
file section and the expected-versus-actual note.

## If You Change Text Or IDs

Tests often look for visible text, buttons, form labels, and element IDs.

If you intentionally change button text or headings, the app may still be fine,
but the tests may need to be updated in
[`tests/soma-student.spec.js`](../../tests/soma-student.spec.js).

If you change an ID in HTML, update the JavaScript and tests in the same patch.
Examples of IDs that must stay in sync:

- `studentQuestionInput`
- `coachButton`
- `coachOutput`
- `keepLearningSection`
- `debugOutput`
- `followUpInput`

When in doubt, keep IDs stable and change visible text or CSS instead.

## Save AI Calls For The Right Moment

Most testing does not need a real model call.

Use mock/demo mode while you test:

- layout,
- buttons,
- input warnings,
- topic data,
- answer rendering,
- progress checkboxes,
- personal-data blocking,
- error messages.

Only spend real `/api/coach` calls after the normal app flow works. Before using
real calls, read [Student AI Limits And Advice](./ai-limits.md).

## Before Demo Checklist

- [ ] I wrote at least 3 manual test cases.
- [ ] I tested one normal question.
- [ ] I tested one empty or invalid input.
- [ ] I tested one safety case with fake personal data.
- [ ] I fixed or explained known bugs.
- [ ] I ran `npm run test:e2e` or explained why I could not.
- [ ] I can explain what my app can get wrong.

Back to the [Student Guide](./README.md).
