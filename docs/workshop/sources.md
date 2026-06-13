# Reviewed Source Spine

Use this with the [Workshop Course](./README.md), [Lesson
Index](./lessons/README.md), and [UI Design Principles](../design/ui-principles-for-students.md).

These sources are the default self-study path for Soma workshop material. Each
source is reputable, learner-appropriate, and tied to a lesson objective.

## Web App Foundations

### MDN Learn Web Development

Link: https://developer.mozilla.org/en-US/docs/Learn_web_development

Use for: HTML, CSS, JavaScript, browser basics, forms, events, and beginner web
development vocabulary.

Learner level: beginner to intermediate.

Why it is included: MDN is a stable reference for web platform concepts and has
learner-oriented explanations.

### MDN JavaScript Guide

Link: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting

Use for: JavaScript values, functions, objects, arrays, events, and async code.

Learner level: beginner to intermediate.

Why it is included: Soma's frontend logic is plain JavaScript, so students need
a strong primary reference.

### web.dev Learn

Link: https://web.dev/learn/

Use for: HTML, CSS, performance, accessibility, and modern web app practices.

Learner level: beginner to intermediate.

Why it is included: web.dev gives practical browser guidance from a web platform
team and is useful when students want to go deeper.

## Accessibility And Learner Design

### W3C WCAG 2.2

Link: https://www.w3.org/TR/WCAG22/

Use for: accessibility principles, perceivable content, keyboard access, labels,
contrast, errors, and predictable UI.

Learner level: mentor reference, selected student excerpts.

Why it is included: WCAG is the core accessibility standard for web interfaces.

### WAI Understanding WCAG

Link: https://www.w3.org/WAI/WCAG22/Understanding/

Use for: plain-language explanations of accessibility requirements.

Learner level: intermediate.

Why it is included: the Understanding docs are easier to teach from than the raw
standard.

### CAST UDL Guidelines

Link: https://udlguidelines.cast.org/

Use for: designing lessons with multiple ways to engage, understand, and express
learning.

Learner level: mentor reference.

Why it is included: UDL helps mentors design lessons that work for different
learners instead of assuming one learning style.

### W3C Language Of Page Guidance

Link: https://www.w3.org/WAI/WCAG22/Understanding/language-of-page.html

Use for: multilingual pages, `lang` attributes, screen readers, and language
switching.

Learner level: intermediate.

Why it is included: Soma may support English, Swahili, or code-switching, and
the page should identify language correctly.

## Human-Centered AI And Learning UI

### Google People + AI Guidebook

Link: https://pair.withgoogle.com/guidebook/

Use for: explaining AI uncertainty, user expectations, feedback loops, trust,
and AI product design.

Learner level: mentor reference and advanced student reading.

Why it is included: the Debug Lab is a human-centered AI teaching surface, not
just a technical dump.

### Nielsen Norman Group: Progressive Disclosure

Link: https://www.nngroup.com/articles/progressive-disclosure/

Use for: why Soma keeps the main learner path simple and hides the Debug Lab
until students ask for it.

Learner level: mentor reference.

Why it is included: the app should not overload new learners with every control
at once.

### Nielsen Norman Group: Recognition Rather Than Recall

Link: https://www.nngroup.com/articles/recognition-and-recall/

Use for: labels, examples, visible choices, and reducing memory load.

Learner level: mentor reference.

Why it is included: beginner interfaces should help learners recognize what to
do next.

## Gemini And Provider-Specific Details

### Gemini API Docs

Link: https://ai.google.dev/gemini-api/docs

Use for: Gemini request shape, model behavior, structured output, parameters,
and provider-specific setup.

Learner level: mentor and advanced student reference.

Why it is included: Soma's real provider path is Gemini when a server-side key
is configured.

### Gemini Rate Limits

Link: https://ai.google.dev/gemini-api/docs/rate-limits

Use for: rate limits, quota language, project-level limits, and why mock mode is
important for workshops.

Learner level: mentor reference.

Why it is included: students should understand that AI calls are not free or
unlimited.

## Prompting, Agents, And LLM Concepts

### The Story Of AI Lecture

Link: ./lessons/13-ai-history-and-future.md

Use for: a lecture-quality narrative from symbolic AI and expert systems to
machine learning, neural networks, LLMs, multimodal systems, computer-use
agents, robotics, and future directions.

Learner level: intermediate student and mentor reference.

Why it is included: students need a memorable story of how AI became today's
tools, with source links close to claims so mentors can validate facts.

### OpenAI Prompting Guide

Link: https://developers.openai.com/api/docs/guides/prompting

Use for: general prompting principles such as clear instructions, examples,
context, output format, and iteration.

Learner level: intermediate to advanced.

Why it is included: the concepts apply broadly even when the workshop provider
is Gemini.

### OpenAI Prompt Engineering Guide

Link: https://developers.openai.com/api/docs/guides/prompt-engineering

Use for: stronger prompts, output format, task decomposition, and evaluation.

Learner level: intermediate to advanced.

Why it is included: students need a reputable reference for why prompt design
matters.

### OpenAI Agents Learning Material

Link: https://developers.openai.com/learn/agents

Use for: agent concepts, tool use, loops, handoffs, tracing, and tradeoffs.

Learner level: advanced student and mentor reference.

Why it is included: agents are an extension topic after students understand a
single LLM-backed endpoint.

## Safety, Security, And Responsible AI

### OWASP LLM Prompt Injection Prevention Cheat Sheet

Link: https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html

Use for: prompt injection, untrusted input, data boundaries, tool safety, and
defensive design.

Learner level: mentor and advanced student reference.

Why it is included: students should learn that prompts are input surfaces, not
magic safety barriers.

### OpenAI Safety Best Practices

Link: https://developers.openai.com/api/docs/guides/safety-best-practices

Use for: general AI safety patterns, testing, user-facing limits, and safer
application behavior.

Learner level: mentor and advanced student reference.

Why it is included: the workshop needs practical safety framing for LLM-backed
apps.

### UNESCO Guidance For Generative AI In Education And Research

Link: https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research

Use for: education policy framing, human oversight, learner protection, and
institutional caution.

Learner level: mentor reference.

Why it is included: the project is educational and should be framed with care.

### NIST AI Risk Management Framework

Link: https://www.nist.gov/itl/ai-risk-management-framework

Use for: trustworthy AI risk framing, measurement, governance, and practical
risk discussions.

Learner level: mentor reference.

Why it is included: mentors need a reputable source for AI risk language beyond
provider-specific guidance.

### AI Literacy Framework

Link: https://ailiteracyframework.org/

Use for: AI literacy competencies, classroom outcomes, and student reflection.

Learner level: mentor reference and selected student reading.

Why it is included: students should learn AI concepts, not only copy code.
