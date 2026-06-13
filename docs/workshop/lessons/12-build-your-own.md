# Lesson 12: Build Your Own

Time: 35-40 minutes plus project studio time

Audience: teams preparing a final project or remix.

## Learner Hook

You know the shape now. Fill it with your idea: a reading helper, a revision
coach, a school FAQ assistant or something your classmates would actually use.

## Try This Now

Write this sentence:

```text
My app helps [who] to [do what] by using AI for [specific task] and normal code for [specific task].
```

## Real-World Connection

Many products started as small projects for a real community. Your first
version does not need to be huge; it needs one clear user, one useful flow and
honest limits.

## Learning Goals

By the end, students can:

- choose a realistic education app idea,
- define user, problem, data and AI role,
- build from the starter scaffold or the public app implementation,
- test core flows,
- present limitations and next steps.

## Key Ideas

A good final project is small, useful and honest.

Students should not build "AI for everything." They should build one clear
learning support flow:

```text
user need -> local data/context -> safe app action -> useful output -> clear limits
```

## Project Shape

Every team should define:

- learner,
- problem,
- topic or content,
- app flow,
- data source,
- where AI helps,
- where normal code is enough,
- safety limits,
- demo path.

## Build Path

```text
1. Pick a problem
2. Choose a small user flow
3. Add local data
4. Build the page
5. Add /api/coach only where useful
6. Render structured output
7. Add limitations
8. Test happy path and failure path
9. Demo honestly
```

## Find It In This Repo

| File Or Folder | Use |
|---|---|
| `starter/` | Smaller scaffold for teams that need a simpler starting point. |
| `reference/` | Full app to study or remix carefully. |
| `docs/student/project-cards.md` | Project ideas. |
| `docs/student/handout.md` | Student challenge and submission guide. |
| `docs/extend-soma.md` | Extension contracts, safe recipes and generalization plan. |
| `docs/mentor/rubric.md` | Demo and evaluation criteria. |
| `docs/workshop/labs/README.md` | Practice tasks for common changes. |

## Map To Soma Code

- Study the full pattern: `reference/`.
- Build from the smaller scaffold: `starter/`.
- Add local data first: `starter/data.js` or `reference/data.js`.
- Build one safe request: `starter/app.js` or `reference/app.js`
  `buildCoachContext()`.
- Keep one endpoint: `api/coach.js`.
- Keep mock testing: `lib/coach-core.js`.
- Add project tests: `tests/soma-student.spec.js`.
- Check extension contracts: [Extend Soma Study Coach](../../extend-soma.md).
- Helpful prompts: [Generate A Project Plan](../../student/ai-coding-prompts.md#generate-a-project-plan),
  [Create Dummy Data](../../student/ai-coding-prompts.md#create-dummy-data),
  [Add Responsible AI Note](../../student/ai-coding-prompts.md#add-responsible-ai-note).

## Capstone Checklist

Before demo, each team should answer:

- What problem are we solving?
- Who is the learner?
- What local data does the app use?
- What does the frontend do?
- What does `/api/coach` do?
- What does the LLM help with?
- What does normal code handle?
- What private data should users avoid?
- What can go wrong?
- How did we test the app?

## Example Project Ideas

Reading helper:

- local story excerpt,
- vocabulary support,
- comprehension questions,
- AI explanation with limits.

School FAQ helper:

- approved school information only,
- normal search for known facts,
- AI only for rephrasing answers,
- clear "ask a teacher" fallback.

Career explorer:

- local career cards,
- student interests without private records,
- AI helps compare options,
- no official career diagnosis.

Environment action planner:

- local conservation topic pack,
- AI suggests school-safe action plan,
- normal code tracks completed actions.

## Demo Script

Use this structure:

1. Our learner is ...
2. The problem is ...
3. Our app helps by ...
4. The frontend does ...
5. The data/context is ...
6. The AI call does ...
7. We do not use AI for ...
8. Safety limits are ...
9. Here is the live demo ...
10. Next we would improve ...

## Student Exercise

Task: write your project one-pager.

Include:

- title,
- user,
- problem,
- data,
- app flow,
- AI role,
- safety limits,
- test plan,
- demo path.

Expected result: a project plan that mentors can approve before coding.

Stretch: build the first screen and one local-data feature before adding any AI.

## Reflection Questions

- Is the project small enough to finish?
- Does AI add real value?
- What can be done with normal code?
- What would make the app unsafe?
- What would you improve with one more week?

## Mentor Notes

Approve scope early. A finished small project teaches more than an unfinished
large one. Require each team to show one non-AI feature, one AI-backed feature,
one safety limit, and one test.

## Deeper Reading

- AI Literacy Framework: https://ailiteracyframework.org/
- CAST UDL Guidelines: https://udlguidelines.cast.org/
- W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Google People + AI Guidebook: https://pair.withgoogle.com/guidebook/

## Inspiring Resources

- Google AI Experiment: Quick, Draw! - https://quickdraw.withgoogle.com/
- AI Literacy Framework - https://ailiteracyframework.org/
