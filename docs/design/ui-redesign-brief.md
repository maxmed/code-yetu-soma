# Soma UI Redesign Brief

Use this with the [Design Docs](./README.md), [UI Design Principles For Learning
Apps](./ui-principles-for-students.md), and [Testing And
Debugging](../testing-debugging.md).

Status: implemented design reference for the current public Soma learner UI.

This brief records the implemented visual redesign for the public Soma demo.
Use it to review whether the current UI stays beautiful, functional, engaging,
and simple while still teaching how an AI tutor works.

## Product Goal

Soma should feel like a modern learning studio:

- students can ask a real study question in seconds,
- the answer feels like a mini lesson, not a JSON result,
- curious learners can open a separate Debug Lab to see the AI pipeline,
- mentors can teach prompt/context/model behavior without exposing secrets.

## Research Principles

Use these principles when judging mocks and implementation:

1. **Progressive disclosure**: show the learner task first. Move advanced,
   technical, and diagnostic controls behind a clear secondary action.
2. **Low cognitive load**: avoid equal-weight cards competing for attention.
   One screen area should clearly be the next thing to do.
3. **Strong visual hierarchy**: use size, spacing, color, and placement to make
   Topic, Question, Answer, and Debug Lab roles obvious.
4. **Learner engagement**: include a hook, example, misconception, practice
   move, and next step in the answer surface.
5. **AI transparency and control**: let learners inspect inputs, prompts,
   parameters, responses, parsing, and safety checks in a bounded lab.
6. **Safety by design**: never show API keys or key-bearing URLs; keep model and
   prompt controls allowlisted and educational.
7. **Accessible polish**: readable type, clear labels, high contrast, keyboard
   focus, and mobile-first layouts are part of beauty.

Reference material behind these principles:

- Nielsen Norman Group usability heuristics and progressive disclosure:
  `https://www.nngroup.com/articles/ten-usability-heuristics/`
  and `https://www.nngroup.com/articles/progressive-disclosure/`
- CAST Universal Design for Learning guidelines:
  `https://udlguidelines.cast.org/`
- WCAG 2.2 accessibility guidance:
  `https://www.w3.org/TR/WCAG22/`
- Google People + AI Guidebook:
  `https://pair.withgoogle.com/guidebook/`
- Material Design and Apple Human Interface Guidelines:
  `https://m3.material.io/` and
  `https://developer.apple.com/design/human-interface-guidelines/`

## Problems This Redesign Addressed

- The previous page read as a utility dashboard rather than a learning product.
- Many panels shared the same visual weight.
- The answer did not yet feel enough like a lesson.
- Debug Lab existed, but needed to feel like a designed workbench.
- The visual system was serviceable but plain: default typography, conservative
  spacing, and limited brand personality.

## Target Experience

### First Impression

The first viewport should communicate:

```text
Soma Study Coach
Grade 7 Integrated Science help that shows how AI tutoring works.

[Topic picker] [Sample question]
[Large question box]
[Ask Soma] [Behind the Scenes]
```

The learner should not need to understand modes, context, prompts, or provider
details before asking the first question.

### Primary Flow

```text
Pick topic -> Ask question -> Read answer -> Try next step
```

Debugging, prompt editing, model choice, safe context, and raw response details
belong in Debug Lab, not in the main learner flow.

## Desktop Mock

```text
+----------------------------------------------------------------------------+
| Soma Study Coach                                      Grade 7 Science        |
| Ask a study question. See the answer. Open the lab to learn how it works.    |
+----------------------------------------------------------------------------+

+--------------------------------------+-------------------------------------+
| Ask Soma                             | Topic Snapshot                      |
|                                      |                                     |
| Topic                                | Mixtures and separation             |
| [Mixtures and separation        v]   | Key ideas                           |
|                                      | - mixture                           |
| What do you want to understand?      | - filtration                        |
| [ How do I choose a method?      ]   | - evaporation                       |
|                                      |                                     |
| [Ask Soma] [Behind the Scenes]       | [Use sample] [Another example]      |
+--------------------------------------+-------------------------------------+

+----------------------------------------------------------------------------+
| Your Lesson                                                                |
|                                                                            |
| Short answer                                                               |
| Filtration works when...                                                   |
|                                                                            |
| Example                         Common mistake                             |
| Tea leaves and tea...             Filtration does not separate dissolved... |
|                                                                            |
| Try this                                                                   |
| Pick a mixture from home and name the property that helps separate it.      |
|                                                                            |
| [Ask a follow-up] [Create 7-day plan]                                      |
+----------------------------------------------------------------------------+
```

## Mobile Mock

```text
+------------------------------+
| Soma Study Coach             |
| Ask. Learn. See how it works |
+------------------------------+
| Topic                        |
| [Mixtures and separation v]  |
|                              |
| Your question                |
| [ How do I choose...?      ] |
|                              |
| [Ask Soma]                  |
| [Behind the Scenes]         |
+------------------------------+
| Your Lesson                  |
| Short answer                 |
| Example                      |
| Common mistake               |
| Try this                     |
+------------------------------+
| Keep Learning                |
| Follow-up / plan            |
+------------------------------+
```

## Debug Lab Mock

Use a full-width drawer or modal, not an inline section.

```text
+----------------------------------------------------------------------------+
| Behind The Scenes: Debug Lab                          [Reset] [Close]       |
| See every step from student question to rendered answer.                    |
+--------------+-------------------------------------------------------------+
| Steps        | Workbench                                                   |
| 1 Input      | Safe Context                                                |
| 2 Context    | [ { studentQuestion, topicPack, resources, constraints } ]  |
| 3 Prompt     |                                                             |
| 4 Model      | Tutor prompt editor                                         |
| 5 Request    | [ You are a Grade 7 science study coach...              ]   |
| 6 Raw return |                                                             |
| 7 Parsed     | Model [gemini-3.1-flash-lite v] Temp [0.7] Tokens [4096]   |
| 8 Rendered   | [Run in lab] [Compare with original]                        |
| 9 Safety     |                                                             |
+--------------+-------------------------------------------------------------+
```

## Debug Lab Requirements

The Debug Lab should support:

- opening from one button near the main Ask action,
- step navigation for the full pipeline,
- safe context inspection,
- tutor prompt editing,
- user prompt editing,
- allowlisted model selection,
- temperature and max-token controls with safe ranges,
- run/replay from the lab,
- original versus modified output comparison,
- visible provider/model/status metadata,
- raw response and parsed response inspection,
- safety block demonstration for personal data,
- clear reset to workshop defaults.

The Debug Lab must not:

- show API keys,
- show provider URLs with key query parameters,
- allow arbitrary hidden provider endpoints,
- store prompt overrides permanently by default,
- send personal data after the safety block catches it,
- make students think lab output is official grading.

## Visual System Direction

### Tone

Modern, calm, friendly, and study-focused. Avoid enterprise dashboard styling.

### Color

Use a light canvas with restrained accents:

- background: warm white or very pale blue-gray,
- primary: deep teal for action and trust,
- secondary: ink/navy for headings,
- accent: warm gold or coral for learning highlights,
- success/warn/error colors only for state feedback.

Avoid a one-note palette. The UI should not be dominated by gray cards or a
single blue/teal family.

### Typography

Use a polished readable stack. If importing fonts is acceptable, choose one
clean UI font and one friendly display accent. Keep body text readable at normal
browser zoom. Do not shrink learner text to fit dense cards.

### Components

- Replace most generic cards with a small number of strong surfaces.
- Use one prominent answer article.
- Use chips for topic hints and examples.
- Use tabs or section anchors inside the answer if needed.
- Use a drawer/modal for Debug Lab.
- Use clear loading states: "Building safe context", "Asking coach", "Reading
  response", "Preparing lesson".

## Empty, Loading, And Error States

### Empty

```text
Pick a topic and ask one question. Soma will explain it with an example and a
next step.
```

### Loading

Show a short stepper:

```text
Preparing context -> Asking coach -> Turning answer into a lesson
```

### Quota Error

```text
The coach is out of shared AI requests for now. You can still inspect the
context in Debug Lab or ask a mentor to switch to mock mode.
```

### Personal Data Block

```text
Remove names, school names, marks, phone numbers, or private records before
asking the coach.
```

## Review Checklist

Pedagogy reviewer should review:

- Does the first screen invite a student to ask a question?
- Does the answer read like a useful mini lesson?
- Are examples and next steps visible enough?
- Does mobile feel calm and usable?

Safety reviewer should review:

- Does Debug Lab avoid secret/key exposure?
- Are model/prompt controls bounded and clearly educational?
- Are safety and error states honest without leaking internals?
- Are examples free of real learner personal data?

Coordination reviewer should review:

- Is scope sequenced cleanly after README/docs work?
- Are tests and docs update requirements clear?
- Is implementation feasible without breaking Vercel/root routes?

Deployment reviewer should review:

- Does the design fit the deployed public demo?
- Are route/deploy implications understood?
- Are Playwright assertions likely to be maintainable?

## Implementation Plan After Approval

1. Update `reference/index.html` for the new app shell and Debug Lab drawer.
2. Update `reference/style.css` for the visual system and responsive layout.
3. Update `reference/app.js` only where needed for lab open/close, stepper,
   comparison, and state labels.
4. Keep `/api/coach` key safety and lab override bounds.
5. Update Playwright tests for the new main flow and Debug Lab.
6. Update docs:
   - `docs/design/ui-principles-for-students.md`
   - `docs/testing-debugging.md`
   - `docs/code-map.md`
   - `reference/README.md`
7. Run:
   - `node --check api/coach.js`
   - `node --check reference/app.js`
   - `node --check starter/app.js`
   - `node --check scripts/mock-coach-server.js`
   - `git diff --check`
   - `npm run test:e2e`
   - live route smoke after push/deploy
