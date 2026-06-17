# Curriculum Content Source

Use this with the [Mentor Guide Index](./README.md), [Workshop
Course](../workshop/README.md), and [Project Cards](../student/project-cards.md).

Use Kenya's KICD CBC curriculum designs as the source for age-appropriate learning material.

Primary source:

- [KICD CBC Curriculum Designs](https://kicd.ac.ke/cbc-materials/curriculum-designs/)

Grade 7 source pages for the current demo:

- [Grade 7 Integrated Science](https://kicd.ac.ke/cbc-materials/curriculum-designs/grade-seven-designs/)
- [Grade 7 HI Integrated Science (KICD)](https://kicd.ac.ke/cbc-materials/curriculum-designs/sne-curriculum-designs/hi-grade-seven7/)
- [Grade 7 HI Integrated Science (Drive preview)](https://drive.google.com/file/d/1iZlM0ifcI80lnjtSbDdRVjB-bu4PDOt0/view)

Note: the HI Integrated Science Drive file is viewable through KICD's embedded preview, but direct download is disabled by the file owner. Use it as a source reference unless the owner enables download or provides a downloadable copy.

## How To Use It

The Soma Study Coach public app should not invent random school content. It should use short, facilitator-curated sample questions, topic names, resources, and study tasks based on KICD/CBC learning areas.

Approved class demo lane:

- Grades 7-9 Junior Secondary for the younger half of the group,
- Grade 7 is roughly age 12-13 in the Kenya Junior School pathway,
- Grade 7 Integrated Science is the first class demo project,
- Mathematics is a simpler fallback or remix option,
- Grade 8-12 examples can be added later for older learners.

## Personalization Layer

After the class demo works, add a setup step where students can choose:

- year / grade,
- class or grade band,
- learning area / course,
- topic or study need,
- preferred support type: explanation, quiz practice, study plan, or resources.

For the public app, the data can be local and curated. The app should filter the available sample curriculum data before building the LLM prompt.

## App Content Rules

- Use dummy learner answers and progress.
- Use short original questions written for the workshop, not copied wholesale from curriculum PDFs.
- Tag every question with a topic and grade band.
- Send only the minimum study context to the LLM.
- Do not send student names, school names, personal records, or real marks.
- Frame outputs as study support, not official assessment.

## Example Data Shape

```javascript
{
  grade: "Grade 7",
  gradeBand: "Junior School",
  learningArea: "Integrated Science",
  strand: "Living Things and Their Environment",
  topic: "Characteristics of living things",
  question: "A learner observes that a bean seed grows roots and a shoot after a few days. Which life process is shown?",
  answer: "Growth",
  skill: "Identify life processes from simple observations"
}
```

## Prompt Context

The LLM prompt should say:

```text
Use the provided topic pack, student question, optional practice answers, and resources.
Give age-appropriate study help: explanation, examples, misconceptions, resources, or a simple plan.
Do not claim to diagnose the learner.
Do not invent official marks or final grades.
Keep explanations age-appropriate for Kenyan students aged 12-18.
```
