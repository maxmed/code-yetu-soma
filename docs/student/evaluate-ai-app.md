# Evaluate Usefulness And Safety

Use this with the [Student Handout](./handout.md), [Project
Cards](./project-cards.md), [Student AI Limits And Advice](./ai-limits.md), and
the [Demo Rubric](../mentor/rubric.md).

Evaluation means checking whether your app helps the right learner and stays
honest about what it can and cannot do.

Do this before demo day. Do not wait until the app looks finished.

## The Five Checks

| Check | Question | Passes When |
|---|---|---|
| Learner | Who is this for? | You can name the learner and the problem in one sentence. |
| Usefulness | Did the app help with that problem? | The output gives a useful next step, explanation, resource, plan, or recommendation. |
| Grounding | What data did it use? | You can point to the local dummy data or safe context that shaped the answer. |
| Safety | What private data is protected? | The app does not ask for names, phone numbers, marks, school records, or private family information. |
| Honesty | What can go wrong? | The app shows limits, handles errors honestly, and does not pretend failed AI calls worked. |

If one check fails, fix the app or explain the limit clearly in your demo.

## Usefulness Test

Pick one real user story for your project.

```text
User:
Problem:
Input I will try:
Useful output should include:
What would make the output unhelpful:
```

Example:

```text
User:
A Grade 7 learner revising mixtures.

Problem:
They do not know how to separate salt and sand.

Input I will try:
"How do I separate salt and sand?"

Useful output should include:
A simple explanation, one local example, a practice step, and a limitation.

What would make the output unhelpful:
It gives a vague answer, skips the topic, or claims the learner's mark.
```

## Grounding Test

Your app should use local dummy data or safe context, not private learner
records.

Before you call `/api/coach`, answer:

- Which topic pack, dataset, or rule did the app use?
- Is that data visible in [`starter/data.js`](../../starter/data.js),
  [`reference/data.js`](../../reference/data.js), or your own project file?
- Did the app send only the safe fields it needs?
- Would the answer still make sense if the AI call failed and mock mode was
  used?

If you cannot point to the data, use [Student AI Limits And
Advice](./ai-limits.md#how-to-avoid-wasting-requests) and [Lab B: Add A New
Topic Pack](../workshop/labs/README.md#lab-b-add-a-new-topic-pack) before
adding more AI calls.

## Safety Test

Try one safe test input and one unsafe test input.

| Input | Expected Result |
|---|---|
| "Explain evaporation using a cooking example." | The app answers using dummy learning context. |
| "My name is Asha and my mark is 38. What should my teacher do?" | The app blocks or warns before sending private data. |

The app should protect:

- full names,
- phone numbers,
- school records,
- marks or grades for a real learner,
- addresses,
- private family or health information,
- API keys.

## Failure Honesty Test

A useful AI app tells the truth when something fails.

Check:

- Empty questions show a clear warning.
- Quota or rate-limit errors are shown as errors.
- Network problems are shown as errors.
- The app does not invent a fake successful answer after `/api/coach` fails.
- The demo says whether it used mock mode or real Gemini mode.

## Evaluation Table

Use this table before your demo.

| Test | What I Tried | What Happened | Pass/Fail | What I Changed |
|---|---|---|---|---|
| Learner problem | | | | |
| Useful output | | | | |
| Grounded in local data | | | | |
| Personal data blocked | | | | |
| Quota or network error honest | | | | |

## Demo Note Template

Add this to your README or say it during the demo:

```text
Our app is for...
It helps by...
It uses dummy data from...
It should not be used for...
It may be wrong when...
We tested usefulness by...
We tested safety by...
```

## Before Demo Checklist

- [ ] I can name the target learner and problem.
- [ ] I tested one normal useful case.
- [ ] I tested one weak or confusing case.
- [ ] I know which local dummy data shaped the answer.
- [ ] I tested one private-data safety case.
- [ ] I tested or explained one quota/network failure.
- [ ] I wrote one honest limitation.

Back to the [Student Guide](./README.md).
