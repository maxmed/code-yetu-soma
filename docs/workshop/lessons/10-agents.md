# Lesson 10: Agents

Time: 35-40 minutes

Audience: advanced students who understand one LLM-backed endpoint.

## Learner Hook

What if your app could think ahead like a video game player: observe the
situation, choose a move, check what happened, then continue? That loop is the
beginning of agent thinking.

## Try This Now

Use Soma follow-up questions three times in a row. You are manually acting as
the loop: observe answer, choose next question, check result, continue.

## Real-World Connection

Game AI, robot vacuums and self-driving car systems all observe, decide, act
and check. A study agent would need the same discipline, but with stronger
safety boundaries.

## Learning Goals

By the end, students can:

- explain what an agent is,
- describe an observe-plan-act loop,
- identify tools, state and guardrails,
- explain how Soma is not yet a full agent,
- decide when not to build an agent.

## Key Ideas

An agent is an AI system that can use a loop to pursue a goal. A common pattern
is:

```text
observe -> plan -> act -> check result -> repeat
```

Agents often use tools:

- search,
- calculator,
- database,
- code runner,
- file reader,
- API call.

They also need state, limits and guardrails.

## Soma Compared To An Agent

Soma Study Coach is mostly a single-request tutor:

```text
student question -> context -> /api/coach -> answer
```

It has some agent-shaped ideas:

- it observes selected topic and question,
- it prepares context,
- it calls a coach endpoint,
- it renders a result,
- it supports follow-up.

But it does not autonomously choose tools, loop through multiple actions, or
make decisions without the learner.

## Agent Architecture

```text
goal
  |
  v
observe context
  |
  v
plan next action
  |
  v
choose tool
  |
  v
act
  |
  v
check result and safety
  |
  v
continue or stop
```

## Find It In This Repo

| File | Agent-Shaped Idea |
|---|---|
| `reference/app.js` | Builds context and tracks follow-up state. |
| `api/coach.js` | Adapter that could become one tool in a larger agent. |
| `lib/coach-core.js` | Deterministic fallback logic for safe testing. |
| `docs/api-safety-checklist.md` | Guardrails that would matter even more for agents. |

## Map To Soma Code

- Observe selected setup/topic/question: `reference/app.js` `buildCoachContext()`.
- Act by calling one tool-like endpoint: `reference/app.js` `askStudyCoach()`.
- Follow-up state: `reference/app.js` `state.lastContext` and follow-up handler.
- Tool boundary: `api/coach.js` `/api/coach` handler.
- Guardrails: `api/coach.js` `getLabConfig()` and `lib/coach-core.js`
  `hasPersonalData()`.
- Current app is not autonomous: there is no loop that chooses tools without a
  user click.
- Helpful prompt: [Generate A Project Plan](../../student/ai-coding-prompts.md#generate-a-project-plan).

## Tool Design Questions

Before giving an agent a tool, ask:

- What can this tool change?
- Can it expose private data?
- Can it spend money or quota?
- Can it contact other systems?
- How will we log and review actions?
- How does the user stop it?

## Worked Soma Extension

A simple future agent could:

1. read the student's selected topic,
2. ask one diagnostic question,
3. check the answer,
4. choose a resource,
5. suggest the next practice task.

Even then, it should not:

- collect private learner records,
- invent official marks,
- silently change student data,
- run without clear user action.

## Live Demo

Use the current app:

1. Ask a question.
2. Ask a follow-up.
3. Check a study-plan item.
4. Discuss which parts feel agent-like and which parts are just normal app
   behavior.

## Student Exercise

Task: design a tiny study agent on paper.

Include:

- goal,
- observations,
- allowed tools,
- memory/state,
- stop condition,
- safety rules,
- what the student sees.

Expected result: a one-page design, not code.

Stretch: identify one tool the agent should not have.

## Reflection Questions

- What makes an agent different from a chatbot?
- Why are tools powerful and risky?
- What should an agent remember?
- What should it forget?
- When is a simple button better than an agent?

## Mentor Notes

Keep this lesson grounded. Students may imagine autonomous systems too quickly.
Make them define goal, tool, permission and stop condition before talking about
implementation.

## Deeper Reading

- OpenAI Agents Learning Material: https://developers.openai.com/learn/agents
- Google People + AI Guidebook: https://pair.withgoogle.com/guidebook/
- OWASP LLM Prompt Injection Prevention: https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html

## Inspiring Resources

- DeepMind: AlphaGo trailer - https://www.youtube.com/watch?v=WXuK6gekU1Y
- OpenAI Agents learning material - https://developers.openai.com/learn/agents
