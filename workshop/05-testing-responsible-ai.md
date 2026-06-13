# Session 5: Testing, Debugging, And Responsible AI

## Goal

Teams test their MVP, fix bugs, and explain limitations.

## Students Build

- 5 test cases
- bug fix list
- responsible AI note
- final improvement plan

## Concept: AI Can Be Wrong

Students should not present recommendations as perfect truth.

Reasons the app may be wrong:

- dummy data is small,
- rules are too simple,
- user input may be incomplete,
- topic labels may be biased,
- recommendations may not fit every learner.

## Activity 1: Test Cases

Each team writes:

| Test | Input | Expected result | Pass/fail |
|---|---|---|---|
| Learn topic | Mode: Learn Topic, topic: Characteristics of living things, question: "Why is growth a life process?" | Explanation, examples, limitations render | |
| Study plan | Mode: Study Plan, topic: Mixtures and separation | 7-day plan renders and can be marked complete locally | |
| Empty question | Topic selected, question blank | Friendly warning asks for a study question | |
| Personal data | Question includes a name, school, mark, or phone number | App/proxy blocks or warns before sending | |
| Quota error | `/api/coach` returns 429 | Honest quota message appears; app does not pretend AI worked | |

## Activity 2: Debug With Copilot

Use `copilot-prompts.md`.

Rule: ask for one bug or one function at a time.

## Activity 3: Responsible AI Note

Teams write:

```text
Our app uses dummy data about...
It may be wrong when...
It should not be used to...
We would test it by...
We would protect real student data by...
```

## Team Output

Working MVP plus test cases and responsible AI note.

## Homework

Prepare a 3-5 minute demo.
