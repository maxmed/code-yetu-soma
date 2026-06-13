# Session 4: Integrating Intelligence Into UX

## Goal

The app should feel intelligent to the user, not just print raw data.

## Students Build

- user input flow
- intelligent result cards
- explanation text
- 7-day plan display
- topic tutor response
- progress update
- fallback when the app is unsure

## Concept: Good AI UX

Good AI apps:

- ask for the right input,
- show useful output,
- explain why,
- admit limits,
- let users try again.

## Activity 1: Improve Results

Each recommendation card should show:

- title
- topic/category
- reason
- next action

For the Soma flow, the result view should also show:

- selected topic,
- topic explanation,
- examples and common misconceptions,
- 7-day plan,
- what has been marked complete,
- agent steps or reasoning.

## Activity 2: Add Empty States

If no results match:

```text
I could not find a good match. Try changing the topic or adding more data.
```

## Activity 3: Add "Agent Steps"

Show a short explanation:

```text
1. I read your selected mode and topic.
2. I used the local topic pack as context.
3. I asked /api/coach for a structured study-helper response.
4. I showed the explanation, examples, resources, plan, and limits.
```

## Activity 4: Make It Usable

Check:

- readable text
- clear buttons
- works on laptop screen
- no overlapping elements
- results are easy to scan

## Team Output

The user can complete the main flow and understand the topic explanation, recommendation, plan, or answer.

## Homework

Ask another team to test the app and write down 3 issues.
