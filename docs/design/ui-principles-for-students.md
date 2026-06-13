# UI Design Principles For Learning Apps

Use this with the [Design Docs](./README.md), [Soma UI Redesign
Brief](./ui-redesign-brief.md), and [Workshop Labs](../workshop/labs/README.md).

Beautiful learning software is not decoration. It helps a learner know what to
do, feel safe trying, understand the result, and keep going.

Use these principles when you design or improve Soma or your own app.

## 1. Start With The Learner Job

Ask:

- What is the learner trying to do?
- What do they need first?
- What can wait until later?

For Soma, the learner job is:

```text
Pick a topic -> ask a question -> understand the answer -> try the next step
```

Everything else should support that job.

## 2. Make One Action Obvious

If every button and card looks equally important, the learner has to think too
hard before starting.

Good first screen:

- topic,
- question box,
- primary action,
- one secondary help/debug action.

Weak first screen:

- many settings,
- many empty panels,
- debug data,
- advanced controls,
- no clear next step.

## 3. Use Progressive Disclosure

Progressive disclosure means showing advanced details only when someone asks for
them.

In Soma:

- the main screen is for learning,
- Debug Lab is for inspecting how the app works,
- advanced model/prompt controls stay inside Debug Lab.

This helps beginners start quickly and still lets curious learners go deeper.

## 4. Turn Answers Into Lessons

A useful tutor answer should not be one long paragraph.

Use a structure like:

```text
Short answer
Example
Common mistake
Try this
Next step
```

That structure helps learners read, remember, and act.

## 5. Make Hidden AI Steps Visible

AI features can feel mysterious. A good learning app can show the pipeline:

```text
student input -> safe context -> prompt -> model request -> raw response ->
parsed response -> rendered answer -> safety checks
```

Show this in a safe Debug Lab. Do not mix all of it into the main learning
screen.

## 6. Keep AI Controls Safe

If you let learners change prompts or model settings:

- explain what each control does,
- provide safe defaults,
- use suggested or approved models,
- keep values in safe ranges,
- show reset buttons,
- never expose API keys,
- never put private learner data into examples.

## 7. Design For Trust

Trust comes from honesty.

Say clearly when:

- the coach is using mock/demo mode,
- AI requests are out of quota,
- the model response could be wrong,
- a safety rule blocked the request,
- the learner should ask a teacher or mentor.

Do not pretend the app knows more than it does.

## 8. Use Visual Hierarchy

Visual hierarchy means the page guides the eye.

Use:

- larger type for the main task,
- clear spacing between sections,
- one strong primary button,
- calmer secondary buttons,
- short headings,
- grouped related controls.

Avoid:

- many same-size cards,
- dense text blocks,
- low contrast,
- tiny labels,
- decorative elements that do not help learning.

## 9. Make It Accessible

Accessibility makes the app better for everyone.

Check:

- text is readable on mobile,
- labels are visible,
- keyboard focus is visible,
- color is not the only way to understand state,
- buttons say what they do,
- error messages explain how to recover.

## 10. Make It Feel Worth Using

Learners are more likely to keep going when the app feels responsive and
encouraging.

Add:

- sample questions,
- quick examples,
- clear loading steps,
- a next action after each answer,
- progress that belongs to the learner,
- a way to ask follow-up questions.

Remove:

- confusing setup before the first question,
- technical data before the learner asks for it,
- empty sections that look broken,
- repeated warnings that crowd out learning.

## Quick Design Review

Before you call a learning UI done, ask:

1. Can a new learner start in 10 seconds?
2. Is the main action obvious?
3. Does the answer teach, not just output?
4. Are advanced/debug details hidden until requested?
5. Are AI limits and safety clear?
6. Does it work on a phone?
7. Would a student want to try another question?
