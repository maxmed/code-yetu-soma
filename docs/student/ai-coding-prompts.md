# AI Coding Prompts

Use these when stuck. Paste only the relevant code, not your whole project unless needed.

## Generate A Project Plan

```text
We are building an education web app for students aged 12-18. Our idea is [describe idea]. Create a simple MVP plan with: user, problem, data needed, screens, intelligence logic, and demo flow. Keep it possible with HTML, CSS, and JavaScript only.
```

## Create Dummy Data

```text
Create a JavaScript array of dummy data for [project idea]. Each item should have clear fields we can use in a web app. Include 10 examples. Output only JavaScript code.
```

## Build The /api/coach Context

```text
Here is my topic pack data and setup form IDs: [paste data and relevant HTML]. Write a JavaScript function that builds a safe /api/coach request with mode, studentSetup, studentQuestion, practiceAnswers, curriculumContext, and resources. It must not include names, school names, marks, phone numbers, or private records. Output only the function.
```

## Fix A JavaScript Error

```text
My browser console shows this error: [paste error]. Here is the relevant code: [paste code]. Explain the cause in one sentence, then output the corrected code.
```

## Make The UI Clearer

```text
Here is my HTML and CSS for a student education app: [paste code]. Improve the layout so it is easy for a student to use on a laptop. Keep the same IDs and JavaScript hooks.
```

## Fix /api/coach 404 Or 429

```text
My app calls /api/coach and gets this status: [paste status and response]. Here is my fetch function: [paste function]. Update it so 404 shows "AI coach endpoint is not running" and 429 shows "Classroom AI quota is temporarily exhausted". Keep the response honest and do not fake a successful AI answer. Output only the fixed function.
```

## Prompt Preview Not Showing

```text
My Safe Context Preview should show the JSON sent to /api/coach, but it is blank. Here are my HTML IDs and updatePromptPreview/buildCoachContext functions: [paste relevant code]. Find the bug and output only the fixed code.
```

## Response Not Rendering

```text
My /api/coach response returns this JSON: [paste JSON]. My render function is: [paste function]. Update the render function so it displays topicExplanation, examples, misconceptionHelp, recommendedResources, sevenDayPlan, followUpAnswer, and limitations. Output only the fixed render function.
```

## Follow-Up Not Grounded

```text
My follow-up question should reuse the same selected Grade 7 topic context, but it loses the topic. Here are buildCoachContext, lastContext state, and handleFollowUp: [paste code]. Fix it so follow-up sends the same mode/topic/curriculumContext plus followUpQuestion. Output only the changed code.
```

## Personal Data In Context

```text
My context preview accidentally includes personal data. Here is buildCoachContext and the form fields: [paste code]. Add a simple check that warns or blocks if the question contains a name, school name, phone number, mark, or private record. Keep it beginner-friendly. Output only the changed code.
```

## Add Test Cases

```text
Create 5 test cases for this Soma Study Coach flow: learn topic, study plan, empty question, personal data warning, and /api/coach quota error. Include input, expected output, and what behavior is being tested.
```

## Add Responsible AI Note

```text
Write a short responsible AI note for Soma Study Coach. The app uses dummy Grade 7 Integrated Science topic data and /api/coach to explain topics. Include limitations, possible incorrect answers, no personal data, no marks/diagnosis, and how we would test it before using real learners.
```
