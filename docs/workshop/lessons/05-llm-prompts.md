# Lesson 5: LLM Prompts

Time: 35-40 minutes

Audience: students ready to inspect and edit prompt text.

## Learning Goals

By the end, students can:

- explain what a prompt is,
- distinguish system instructions from user instructions,
- write a stronger prompt for a study coach,
- compare weak and stronger prompts,
- explain why prompts do not replace safety checks.

## Key Ideas

A prompt is the instruction and context given to an LLM.

In an app, a prompt usually has parts:

- role or task,
- audience,
- context,
- rules,
- output format,
- user question.

For Soma, the prompt should tell the model:

- it is a Grade 7 Integrated Science study coach,
- it should use simple language,
- it should use local examples when possible,
- it should not ask for personal data,
- it should return structured study-help fields,
- it should state limitations.

## Prompt Anatomy

```text
role: "You are a Grade 7 Integrated Science study coach"
context: topic summary, vocabulary, examples, misconceptions
rules: simple language, no personal data, no official marks
task: answer this student question
format: explanation, examples, misconception help, resources, plan
```

## Find It In This Repo

| File | Why It Matters |
|---|---|
| `api/coach.js` | `buildGeminiCall()` builds the real provider prompt. |
| `reference/app.js` | Debug Lab sends optional prompt overrides for one run. |
| `docs/workshop/labs/README.md` | Lab C uses prompt edits to compare output. |

## Weak Prompt Example

```text
Explain mixtures.
```

Problem:

- no audience,
- no topic context,
- no safety rules,
- no output format,
- no local examples,
- no limitation language.

## Stronger Prompt Example

```text
You are a Grade 7 Integrated Science study coach.
Use simple language for 12-13 year olds.
Use the provided topic summary, vocabulary and examples.
Do not ask for names, school names, marks or phone numbers.
Answer with:
1. short explanation
2. two examples
3. one common misconception
4. one next practice task
State that this is study support, not official marking.
```

This is stronger because it gives the model a role, audience, boundaries, and
output shape.

## Worked Soma Example

In `api/coach.js`, the server builds a default system prompt with:

- topic,
- context,
- vocabulary,
- examples,
- misconceptions,
- rules.

The Debug Lab lets students override the prompt for a single request. Those
overrides are trimmed and limited on the server before use.

This means students can experiment without permanently changing the app.

## Live Demo

1. Ask a normal question.
2. Open Debug Lab.
3. Click **Load last prompt**.
4. Add: `Ask one check-for-understanding question at the end.`
5. Click **Run lab**.
6. Compare the output.

Ask students:

- Did the answer follow the new instruction?
- Did the answer remain safe?
- Did the prompt become clearer or more confusing?

## Student Exercise

Task: improve a weak prompt.

Start with:

```text
Help me with states of matter.
```

Rewrite it so it includes:

- audience,
- topic context,
- output format,
- safety boundary,
- local example request.

Expected result: a prompt that could be used in Debug Lab.

Stretch: run two versions and compare the answers.

## Reflection Questions

- What makes a prompt good for this app?
- What should be handled by code instead of prompt wording?
- Can a prompt guarantee truth?
- Can a prompt guarantee safety?
- How should students compare two prompt versions?

## Mentor Notes

Teach students that prompts guide behavior but do not create a security boundary.
The server still needs validation, data limits, error handling, and safe output
rendering.

## Deeper Reading

- OpenAI Prompting Guide: https://developers.openai.com/api/docs/guides/prompting
- OpenAI Prompt Engineering Guide: https://developers.openai.com/api/docs/guides/prompt-engineering
- Google People + AI Guidebook: https://pair.withgoogle.com/guidebook/
