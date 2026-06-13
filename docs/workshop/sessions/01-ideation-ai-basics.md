# Session 1: Why AI Matters And What Soma Does

## Goal

Students understand why AI is worth learning, what AI can and cannot do, what
Soma Study Coach does, and how to try the app safely before editing code.

Deepen this session:

- [Lesson 1: Why AI Matters Now](../lessons/01-ai-history-and-future.md)
- [Getting Started From Zero](../../getting-started.md)
- [Gemini Key Setup](../../gemini-key-setup.md)
- [Student AI Limits And Advice](../../student/ai-limits.md)

## Students Build

Students do not build a new app yet. They build shared understanding:

- a short explanation of what Soma does,
- a map of where AI appears in real life,
- one safe study question to test in Soma,
- a first list of topic data they may want to change later.

Everyone follows the same Soma path first. Project remixes come after students
understand the starter scaffold and the `/api/coach` pattern.

## Concept: What Is AI?

AI is software that uses rules, data, models, or learned patterns to do tasks
that normally require human judgment, language, perception, planning, or
decision-making.

Soma is a small, safe example:

```text
student chooses a topic
-> student asks a study question
-> app builds safe topic context
-> app calls /api/coach
-> student receives an answer, example, practice step, resources, and limits
```

The first lesson is not "AI can do everything." The first lesson is:

```text
AI can be useful, but you must know what it uses, what it outputs, what can go
wrong, and who checks it.
```

## Activity 1: See AI Around You

Students list places they have seen AI or machine learning:

- translation,
- search ranking,
- video recommendations,
- captions,
- maps and traffic,
- code suggestions,
- medical image support,
- weather forecasting,
- nature or wildlife monitoring,
- study helpers.

For two examples, answer:

```text
What is the input?
What is the output?
Who should check it?
What could go wrong?
```

## Activity 2: Try Soma As A Learner

Open the live or local app:

```text
https://soma-study-coach.vercel.app/
http://127.0.0.1:8787/
```

Students:

1. Pick a Grade 7 Integrated Science topic.
2. Click **Use sample** or type a dummy study question.
3. Click **Ask Soma**.
4. Read the answer, example, common mistake, resources, and study plan.
5. Open **Behind The Scenes**.
6. Find the safe context, prompt shape, response shape, and limits.

Do not type names, schools, marks, phone numbers, or private records.

## Activity 3: What Makes It Intelligent?

Students fill this out for Soma:

```text
User:
Problem:
Input:
Local data/context:
AI or rule step:
Output:
What could be wrong:
Who checks it:
```

Example:

```text
User: Grade 7 science learner
Problem: stuck on separating mixtures
Input: topic + question
Local data/context: vocabulary, examples, misconceptions, resources
AI or rule step: /api/coach creates a structured study response
Output: answer, example, practice, resources, limits
What could be wrong: answer may be incomplete or too general
Who checks it: student, teacher, mentor, tests, source material
```

## Activity 4: Beginner Setup Preview

Mentor shows the setup path students will use next:

1. [Getting Started From Zero](../../getting-started.md)
2. [Local Setup](../../local-setup.md) for command reference
3. [Gemini Key Setup](../../gemini-key-setup.md) for provider-mode detail
4. [Deploy To Vercel](../../deploy-vercel.md) for public demos later

Students do not need a Gemini key for Session 1. Mock/demo mode is enough.

## Team Output Template

```text
What Soma does:
One AI use that surprised us:
One safe study question:
Input Soma uses:
Output Soma gives:
One risk or limitation:
One thing we want to change later:
```

## Ready To Continue Check

Students are ready for Session 2 if they can:

- explain what Soma does in one sentence,
- name one place AI is used outside chatbots,
- explain why AI answers need human checking,
- open the live or local Soma app,
- ask one dummy study question,
- find the Behind The Scenes view,
- point to [Getting Started From Zero](../../getting-started.md).

## Homework

Collect or invent 5-10 dummy topic facts, examples, vocabulary words, or study
questions for a science topic. Do not collect personal data.
