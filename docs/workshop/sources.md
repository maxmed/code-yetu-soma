# Reference Sources

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

### Google Cloud Load Balancing

Link: https://docs.cloud.google.com/load-balancing/docs

Use for: explaining why real cloud services route requests through load
balancers instead of one visible computer.

Learner level: mentor reference and selected student excerpts.

Why it is included: students asked how an app server reaches an AI provider at
internet scale. Load balancing is a concrete part of that mental model.

### Google Cloud Regions And Zones

Link: https://docs.cloud.google.com/docs/geography-and-regions

Use for: explaining regions, zones, latency, reliability, and why production
systems may run across more than one place.

Learner level: mentor reference and selected student excerpts.

Why it is included: the workshop should teach "many machines across provider
infrastructure" without inventing exact internal machine counts.

## Prompting, Agents, And LLM Concepts

### Why AI Matters Now

Link: ./lessons/01-ai-history-and-future.md

Use for: the opening workshop hook on why students should pay attention to AI,
where AI appears in real life, how AI systems work, and the longer history from
symbolic AI to machine learning, LLMs, agents, robotics, and future directions.

Learner level: intermediate student and mentor reference.

Why it is included: students need excitement and practical relevance before
code, plus source links close to claims so mentors can validate facts.

### AI Media Hooks

Links:

- Boston Dynamics, "Do You Love Me?"
  https://www.youtube.com/watch?v=fn3KWM1kuAw
- Waymo, "360 Experience: A Fully Autonomous Driving Journey"
  https://www.youtube.com/watch?v=B8R148hFxPw
- Google DeepMind YouTube videos
  https://www.youtube.com/@googledeepmind/videos
- Runway YouTube videos
  https://www.youtube.com/@RunwayML/videos

Use for: short opening clips that make AI feel concrete before students start
the Soma build.

Learner level: beginner, with mentor framing.

Why it is included: robotics, self-driving, and creative AI videos help
students see that AI is wider than chatbots, while the discussion questions
keep the focus on evidence, safety, and human judgment.

### Elements Of AI

Link: https://course.elementsofai.com/

Use for: beginner-friendly explanations of what AI is, what it can and cannot
do, machine learning basics, neural networks, and societal implications.

Learner level: beginner.

Why it is included: this is one of the most approachable non-programming AI
courses for students and mentors who want the big picture before code.

### Google Machine Learning Crash Course

Link: https://developers.google.com/machine-learning/crash-course

Use for: practical machine learning concepts, examples, visual explanations,
and exercises.

Learner level: intermediate.

Why it is included: students who want to move beyond LLM prompts need a clear
path into supervised learning, data, features, evaluation, and model behavior.

### MIT Introduction To Deep Learning

Link: https://introtodeeplearning.com/

Use for: neural networks, deep learning, computer vision, language, biology, and
modern model architectures.

Learner level: advanced student and mentor reference.

Why it is included: it is a reputable university course for students who want a
deeper technical path after the workshop.

### OECD AI Principles

Link: https://oecd.ai/en/ai-principles

Use for: policy-oriented definitions of AI systems and principles for
trustworthy AI.

Learner level: mentor reference and advanced student reading.

Why it is included: students should see that AI is also a governance and society
topic, not only a coding topic.

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

### Stanford HAI AI Index

Link: https://hai.stanford.edu/ai-index/2026-ai-index-report

Use for: current AI trends across research, technical performance, education,
policy, public opinion, and societal impact.

Learner level: mentor reference and advanced student reading.

Why it is included: AI changes quickly, so students need current trend reports
instead of only old history notes.

### Google Research Machine Intelligence

Link: https://research.google/research-areas/machine-intelligence/

Use for: examples of AI research areas such as perception, language,
recommendation, robotics, and science applications.

Learner level: mentor reference and advanced student reading.

Why it is included: students should see that AI is used across many practical
domains, not only chatbots.

### Google Research Bioacoustics

Link: https://deepmind.google/blog/how-ai-is-helping-advance-the-science-of-bioacoustics-to-save-endangered-species/

Use for: nature monitoring examples where machine learning helps researchers
analyze wildlife sounds and ecological signals.

Learner level: mentor reference and selected student reading.

Why it is included: biodiversity and conservation examples make AI concrete
beyond school, office, and social media tools.

### IBM AI Stylist Tutorial

Link: https://www.ibm.com/think/tutorials/build-ai-stylist-with-granite-python-watsonx-ai

Use for: a practical fashion example where AI can help with styling and product
recommendations.

Learner level: mentor reference and selected student reading.

Why it is included: fashion gives students a creative, everyday industry
example beyond chatbots, schoolwork, and software engineering.

### Google Cloud Recommendations AI

Link: https://cloud.google.com/use-cases/recommendations

Use for: recommender-system examples that connect products, resources, ranking,
and personalization.

Learner level: mentor reference and advanced student reading.

Why it is included: recommendations are one of the most common ways students
experience AI and machine learning in daily life.

### WHO AI For Health Governance

Link: https://www.who.int/publications/i/item/9789240029200

Use for: health AI examples, ethical risks, governance, and why medical uses
need human responsibility.

Learner level: mentor reference.

Why it is included: medical AI is a strong example of why testing, safety,
privacy, accountability, and human oversight matter.

### NOAA Center For Artificial Intelligence

Link: https://www.noaa.gov/ai

Use for: AI examples in weather, climate, oceans, environmental monitoring, and
scientific operations.

Learner level: mentor reference and selected student reading.

Why it is included: weather and climate examples make AI practical beyond
school apps and social media.

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

### UNESCO AI Competency Framework For Students

Link: https://www.unesco.org/en/articles/ai-competency-framework-students

Use for: student-facing AI competencies, ethical reflection, human agency, and
age-appropriate AI literacy goals.

Learner level: mentor reference.

Why it is included: Soma should help students understand, question, and use AI
responsibly, not only consume AI answers.
