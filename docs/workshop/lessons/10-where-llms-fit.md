# Lesson 10: Where LLMs Fit

Time: 30-40 minutes

Audience: students deciding what should and should not use AI.

## Learner Hook

AI can write poems, but you should not use it to count selected checkboxes.
Knowing when not to use AI is a real engineering superpower.

## Try This Now

Ask an AI tool a simple arithmetic question, then write the same calculation in
JavaScript. Discuss which one you would trust in an exam app and why.

## Real-World Connection

A calculator is better than a chatbot for exact arithmetic. A normal JavaScript
rule is better than an LLM for checking whether a question box is empty.

## Learning Goals

By the end, students can:

- identify tasks that are good fits for LLMs,
- identify tasks that are poor or wasteful fits,
- choose rules or search when they are better,
- explain cost, latency and reliability tradeoffs,
- justify one AI use in their project.

## Key Ideas

An LLM is useful for flexible language tasks. It is not the right tool for every
feature.

Good fits:

- explaining a topic in different words,
- generating examples,
- helping with practice feedback,
- turning structured context into a study plan,
- answering follow-up questions with limitations.

Poor or wasteful fits:

- counting selected answers,
- showing a known topic summary,
- checking whether a field is empty,
- storing progress,
- choosing a static link,
- doing arithmetic that normal code can do.

## Decision Flow

```text
Is the task deterministic?
  yes -> use normal code
  no  -> continue

Does it need language judgment or generation?
  no  -> use normal code, search or database
  yes -> continue

Can we provide safe, relevant context?
  no  -> do not call the LLM yet
  yes -> call through /api/coach with limits
```

## Find It In This Repo

| Feature | Better Tool | Why |
|---|---|---|
| Count answered practice questions | JavaScript | Deterministic count. |
| Render topic summary | Local data | Already known content. |
| Store checked plan items | `localStorage` | Local harmless state. |
| Explain a misconception | LLM through `/api/coach` | Needs language generation. |
| Build a study plan | LLM through `/api/coach` | Needs flexible adaptation. |

## Map To Soma Code

- Normal-code counting: `reference/app.js` `updatePracticeBadge()`.
- Normal-code local progress: `reference/app.js` `readProgress()` and
  `writeProgress()`.
- Local-data display: `reference/app.js` `renderTopicSummary()`.
- LLM-backed call: `reference/app.js` `askStudyCoach()`.
- Mock LLM-shaped result: `api/coach.js` `makeCoachResponse()`.
- Related lab: [Lab G: Replace A Wasteful LLM Call With Normal Code](../labs/README.md#lab-g-replace-a-wasteful-llm-call-with-normal-code).
- Helpful prompt: [Add Test Cases](../../student/ai-coding-prompts.md#add-test-cases).

## Worked Soma Example

`updatePracticeBadge()` counts answered practice questions. This should not call
an LLM.

The app can compute:

```text
answered questions / total questions
```

with normal JavaScript. Calling an LLM would add cost, delay and risk.

By contrast, explaining why filtration does not work for every mixture may be a
reasonable LLM task when safe topic context is included.

## Cost And Risk Tradeoffs

Every provider call can have:

- cost,
- quota use,
- latency,
- variability,
- wrong output,
- privacy risk if context is unsafe,
- more complicated testing.

Use AI where it adds real learning value.

## Live Demo

1. Ask students which Soma features need AI.
2. Open `reference/app.js`.
3. Find `updatePracticeBadge()`.
4. Explain why it is normal code.
5. Find `askStudyCoach()`.
6. Explain why it calls `/api/coach`.

## Student Exercise

Task: classify five features.

For each feature, choose:

- normal code,
- local data,
- search/resource link,
- LLM call,
- human review.

Features:

1. Show the selected topic summary.
2. Explain a misconception in simple language.
3. Save a checkbox.
4. Check whether a phone number was typed.
5. Generate a 7-day study plan.

Expected result: students can justify tool choice.

Stretch: find one AI call idea in your project and replace it with normal code.

## Reflection Questions

- When is an LLM worth using?
- When is it wasteful?
- What is the cheapest reliable solution?
- How does quota affect a classroom?
- What should always require human review?

## Mentor Notes

This lesson protects students from "AI everywhere" thinking. Make them justify
every LLM call with a learning purpose.

## Deeper Reading

- Google People + AI Guidebook: https://pair.withgoogle.com/guidebook/
- Gemini rate limits: https://ai.google.dev/gemini-api/docs/rate-limits
- NIST AI Risk Management Framework: https://www.nist.gov/itl/ai-risk-management-framework

## Inspiring Resources

- AI Weirdness - https://www.aiweirdness.com/
- Code.org AI for Oceans - https://code.org/oceans
