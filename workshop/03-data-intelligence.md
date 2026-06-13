# Session 3: Data And Intelligence Logic

## Goal

Teams add dummy data and write the first intelligent function.

## Students Build

- JavaScript data array
- setup/filter function for year/class, learning area, and topic
- context builder for the selected help mode, topic, and question
- `/api/coach` request object
- explanation for each output
- optional 7-day plan builder

## Concept: Data Drives AI

Useful AI needs good context data.

Examples:

- topic packs have grade, learning area, topic, concept notes, vocabulary, examples, and misconceptions,
- resources have topic, level, type, and reason,
- practice questions have topic tags and explanations,
- weekly plans have day, focus topic, resource, and task.

## Activity 1: Shape Your Data

Teams create 10-20 data items.

Good resource example:

```javascript
{
  id: "science-living-things-1",
  title: "Living Things Review",
  grade: "Grade 7",
  learningArea: "Integrated Science",
  topic: "Characteristics of living things",
  level: "Beginner",
  type: "Reading",
  url: "#",
  reason: "Good first review for identifying life processes"
}
```

## Activity 2: Write The Intelligence Function

For Soma Study Coach, build the topic tutor context first.

### Study Helper Context Builder

```text
Input: selected topic pack, student question, support mode, optional practice answers
Steps: filter topic pack -> add safety constraints -> include resources -> build /api/coach request
Output: safe context preview and request JSON
```

Example request shape:

```javascript
{
  mode: "learn-topic",
  studentSetup: {
    grade: "Grade 7",
    learningArea: "Integrated Science",
    topic: "Characteristics of living things",
    studyNeed: "Explain this topic"
  },
  studentQuestion: "Why is growth a life process?",
  practiceAnswers: [],
  curriculumContext: {
    sourceLabel: "Workshop topic pack",
    snippets: [selectedTopic]
  },
  resources: selectedResources
}
```

Optional remix patterns:

```text
Resource finder: input topic -> output matching resources.
Practice helper: input optional practice answers -> output feedback.
Study planner: input topic and available days -> output 7-day plan.
```

## Activity 3: Explain The Result

Every output should answer:

```text
What context did the app send?
What did /api/coach return?
Why is this useful for the selected topic?
What might be wrong or incomplete?
```

## Team Output

```text
Functions that turn selected Grade 7 Integrated Science topic data into:
- safe context preview,
- canonical /api/coach request,
- structured response rendering,
- optional local plan/progress updates.
```

## Homework

Connect the function to the app UI.
