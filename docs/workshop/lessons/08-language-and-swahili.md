# Lesson 8: Language And Swahili

Time: 30-40 minutes

Audience: students and mentors designing multilingual learning support.

## Learning Goals

By the end, students can:

- explain the difference between UI language and answer language,
- describe how Swahili support could be added,
- explain why language metadata matters,
- test code-switching carefully,
- identify risks in multilingual AI output.

## Key Ideas

Language support is more than translating one sentence.

An app may need:

- UI labels in a selected language,
- answer language preference,
- prompt instructions about language,
- topic vocabulary in more than one language,
- page `lang` metadata,
- mentor review for answer quality.

Soma currently uses English UI text. A Swahili mode should be added deliberately
so it is understandable, testable and safe.

## Language Design Flow

```text
student chooses language
        |
        v
frontend includes language preference in context
        |
        v
server prompt tells coach how to answer
        |
        v
response rendered with clear limits
        |
        v
mentor checks quality and code-switching
```

## Find It In This Repo

| File | Why It Matters |
|---|---|
| `reference/index.html` | The page currently declares `lang="en"`. |
| `reference/data.js` | Topic packs could include translated labels or vocabulary. |
| `reference/app.js` | `buildCoachContext()` would send the selected language. |
| `api/coach.js` | `buildGeminiCall()` would include language instructions. |
| `tests/soma-student.spec.js` | Tests should cover the language path if it is added. |

## Map To Soma Code

- Current page language: `reference/index.html` `lang="en"`.
- Possible language selector location: `reference/index.html` setup or advanced
  options.
- Language context field: `reference/app.js` `buildCoachContext()`.
- Translated labels or vocabulary: `reference/data.js`.
- Server prompt instruction: `api/coach.js` `buildGeminiCall()`.
- Test coverage: `tests/soma-student.spec.js`.
- Related lab: [Lab E: Add Swahili Answer Mode](../labs/README.md#lab-e-add-swahili-answer-mode).
- Helpful prompt: [Make The UI Clearer](../../student/ai-coding-prompts.md#make-the-ui-clearer).

## UI Language Versus Answer Language

UI language means labels like:

- Ask coach,
- Debug Lab,
- Pick A Topic,
- Your Answer.

Answer language means the model's response.

The app could start with answer-language support before translating the whole
UI, but it must be clear to students what is supported.

## Prompt Example

```text
Answer in simple Swahili unless the science term is clearer in English.
If you use an English science term, explain it briefly.
Use age-appropriate language for Grade 7 students.
Do not ask for personal data.
```

This is better than only saying:

```text
Answer in Swahili.
```

because it handles classroom reality: students may code-switch and science
terms may need explanation.

## Testing Multilingual Output

Test with questions like:

- "Explain growth in simple Swahili."
- "Eleza filtration ni nini."
- "Can you give a local example kwa Kiswahili?"

Check:

- Is the answer understandable?
- Did it preserve the science meaning?
- Did it invent facts?
- Did it ask for private data?
- Did it clearly state limitations?

## Live Demo

Use Debug Lab first, without changing code:

1. Ask a normal question.
2. Open Debug Lab.
3. Add a prompt override requesting simple Swahili.
4. Run the lab.
5. Discuss whether the result is good enough for students.

Then discuss what code changes would be needed for a real feature.

## Student Exercise

Task: design a Swahili answer mode.

Write a short design:

- where the language selector appears,
- what values it sends to `/api/coach`,
- what prompt instruction is added,
- how you would test quality,
- what limitations the app should show.

Stretch: implement the language field in `buildCoachContext()`.

## Reflection Questions

- Should the whole app switch language, or only the answer?
- What happens when students mix English and Swahili?
- Who should review answer quality?
- Why is `lang` metadata useful?
- What multilingual mistakes could harm learning?

## Mentor Notes

Do not assume that model output in another language is automatically correct.
For classroom use, get review from someone who understands the language and the
subject.

## Deeper Reading

- W3C Language Of Page Guidance: https://www.w3.org/WAI/WCAG22/Understanding/language-of-page.html
- W3C WCAG Understanding Docs: https://www.w3.org/WAI/WCAG22/Understanding/
- Google People + AI Guidebook: https://pair.withgoogle.com/guidebook/
