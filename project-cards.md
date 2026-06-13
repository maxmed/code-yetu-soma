# Project Cards

Use these for ideation. Teams may copy one, combine two, or adapt one to their school/community.

## 1. Soma Study Coach (Recommended)

**Problem:** Students need help understanding a topic before they can revise or practise well.

**User:** Grade 7 student learning Integrated Science.

**Data:** Local topic packs with concept notes, vocabulary, examples, misconceptions, resources, and optional practice questions.

**Intelligence:** Builds safe topic context, calls `/api/coach`, and renders explanation, examples, resources, plan, follow-up, and limitations.

**MVP:** Mode selector, topic selector, question box, safe context preview, study helper response, follow-up tutor, local progress.

**Extension:** Add more Grade 7 topics, practice input, or a deployable `/api/coach` proxy.

## 2. Study Buddy Recommender

**Problem:** Students finish a quiz but do not know what to study next.

**User:** Student preparing for exams.

**Data:** Quiz questions, topic tags, study resources.

**Intelligence:** Scores weak topics and recommends resources.

**MVP:** Quiz page, results page, weak-topic list, recommended resources.

**Extension:** Add weekly revision plan or chatbot-style explanation.

## 3. AI Revision Planner

**Problem:** Students struggle to plan revision time across subjects.

**User:** Student with upcoming exams.

**Data:** Subjects, exam dates, confidence scores, available study time.

**Intelligence:** Prioritizes weak/urgent subjects and builds a weekly plan.

**MVP:** Form inputs, plan output, priority explanation.

**Extension:** Add reminders or printable timetable.

## 4. School FAQ Assistant

**Problem:** Students repeatedly ask the same school questions.

**User:** New student or parent.

**Data:** Small FAQ dataset with questions, answers, categories.

**Intelligence:** Searches FAQ text and returns best matching answer.

**MVP:** Chat-style input, matched answer, fallback when unsure.

**Extension:** Add categories, confidence score, or escalation to teacher.

## 5. Career Path Explorer

**Problem:** Students do not know which careers match their interests.

**User:** Student choosing subjects or clubs.

**Data:** Interests, skills, school subjects, careers, learning steps.

**Intelligence:** Matches interests/skills to careers and suggests next learning steps.

**MVP:** Form, ranked career cards, recommended subjects/resources.

**Extension:** Add local career stories or mentor interview links.

## 6. Reading Helper

**Problem:** Students read a passage but need support understanding it.

**User:** Student practicing comprehension.

**Data:** Passages, vocabulary words, comprehension questions.

**Intelligence:** Selects key vocabulary and recommends questions by level.

**MVP:** Passage viewer, vocabulary helper, comprehension quiz.

**Extension:** Optional LLM-generated summary if a facilitator provides safe access.

## 7. Resource Finder

**Problem:** Students waste time finding useful learning resources.

**User:** Student looking for practice materials.

**Data:** Resource list with subject, topic, difficulty, format, learning style.

**Intelligence:** Filters and ranks resources based on user needs.

**MVP:** Input form, ranked resources, explanation for each recommendation.

**Extension:** Save favorite resources locally.

## 8. Attendance And Support Dashboard

**Problem:** Teachers need to identify students who may need extra support.

**User:** Teacher or mentor.

**Data:** Dummy attendance, quiz scores, assignment completion.

**Intelligence:** Flags support priority with clear, cautious rules using dummy data only.

**MVP:** Dashboard table, risk/support label, recommended support action.

**Safety rule:** Use teacher/mentor support framing only. Do not use real attendance, real marks, punishment labels, or individual student profiling.

**Extension:** Add responsible AI note: the system suggests support, not punishment.

## 9. Adaptive Practice Game

**Problem:** Practice questions are too easy or too hard.

**User:** Student revising a subject.

**Data:** Questions tagged by difficulty and topic.

**Intelligence:** Adjusts next question based on recent answers.

**MVP:** Practice flow, score, adaptive next question, topic summary.

**Extension:** Add badges or progress chart.

## Selection Checklist

Choose a project where the team can answer:

- Who is the user?
- What problem are we solving?
- What dummy data do we need?
- What input does the app collect?
- What intelligent decision does the app make?
- How will users know why the app made that decision?
- What can go wrong?
