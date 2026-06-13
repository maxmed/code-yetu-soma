# Lesson 1: Why AI Matters Now

Start the workshop here. Before students write HTML, CSS, JavaScript, or
prompts, they need to know why AI is worth their attention, what it can already
do, how it works at a high level, and why human judgment still matters.

## The Hook: AI Is Becoming A New Basic Skill

Students should pay attention to AI for the same reason they should pay
attention to reading, writing, maths, science, and the internet: it is becoming
part of how people learn, work, create, search, communicate, and solve
problems.

AI is already helping people:

- explain school topics in different words,
- translate and summarize information,
- detect patterns in medical images,
- forecast weather and monitor climate risks,
- listen for wildlife sounds in nature recordings,
- describe images for accessibility,
- write and test software,
- help with fashion design, styling, merchandising, and inventory planning,
- recommend videos, products, music, lessons, and search results,
- plan routes, schedules, and supply chains,
- control robots and lab equipment,
- search large collections of text, images, audio, and video.

Sources:

- WHO, "Ethics and governance of artificial intelligence for health"
  https://www.who.int/publications/i/item/9789240029200
- NOAA Center for Artificial Intelligence
  https://www.noaa.gov/ai
- Google Research, "Bioacoustics"
  https://deepmind.google/blog/how-ai-is-helping-advance-the-science-of-bioacoustics-to-save-endangered-species/
- Google Research, "Machine Intelligence"
  https://research.google/research-areas/machine-intelligence/
- IBM, "Build an AI stylist with Granite, Python, and watsonx.ai"
  https://www.ibm.com/think/tutorials/build-ai-stylist-with-granite-python-watsonx-ai
- Google Cloud, "Recommendations AI"
  https://cloud.google.com/use-cases/recommendations

That does not mean AI is always right. It means students need to learn how to
ask better questions:

```text
What can this system do?
What data or rules does it use?
Where could it be wrong?
Who checks the answer?
What should a human decide?
```

## Media Hook: Watch AI Become Visible

Use one or two short clips before the lecture. The goal is not to say "AI is
magic." The goal is to help students feel why the topic matters, then ask what
data, sensors, models, safety checks, and human decisions sit behind the demo.

- **Robots dancing:** Boston Dynamics, "Do You Love Me?"
  https://www.youtube.com/watch?v=fn3KWM1kuAw
- **Self-driving cars:** Waymo, "360 Experience: A Fully Autonomous Driving
  Journey"
  https://www.youtube.com/watch?v=B8R148hFxPw
- **Robotics research:** Google DeepMind YouTube channel
  https://www.youtube.com/@googledeepmind/videos
- **Creative video AI:** Runway YouTube channel
  https://www.youtube.com/@RunwayML/videos

After a clip, ask:

```text
What sensors or data might this system use?
What model or rule might help it decide?
What could go wrong?
What safety check should a human require?
```

This lesson gives the big picture before the code. Soma is the practical
project that follows: students will build a small AI-shaped study coach and
learn how the visible app, local data, server endpoint, prompt, model response,
tests, and safety rules fit together.

## The Big Question

Imagine a student in 1950 asking:

```text
Can a machine think?
```

At that time, a "computer" was not a laptop. It was a room-sized machine used
for calculation. There were no smartphones, no internet, no ChatGPT, no Gemini,
and no robot vacuum cleaners.

Alan Turing's famous 1950 paper asked whether machines could show intelligent
behavior in conversation. The question was not "Can the machine have a human
brain?" It was closer to "Can it behave intelligently enough that we should take
the possibility seriously?"

Source: Alan Turing, "Computing Machinery and Intelligence"
https://academic.oup.com/mind/article/LIX/236/433/986238

That question started one of the most exciting stories in computer science:
people tried to build intelligence with logic, rules, statistics, neural
networks, massive datasets, huge computing systems, and now models that can
read, write, see, hear, use tools, and control robots.

## Learning Goals

By the end, students can:

- explain why AI has gone through different waves,
- name places where AI already appears in daily life, science, education,
  medicine, weather, fashion, recommendations, and software,
- distinguish symbolic AI, machine learning, neural networks, deep learning,
  LLMs, agents, and robotics,
- explain why data, compute, algorithms, and evaluation all matter,
- describe where current AI is powerful and where it is still risky,
- choose good sources for learning more.

## What Is AI?

AI is not one single technology. It is a family of methods for making computer
systems perform tasks that seem to require intelligence: recognizing patterns,
making predictions, understanding language, generating media, planning actions,
or using tools.

The OECD's updated AI principles define an AI system as a machine-based system
that, for explicit or implicit objectives, infers from input how to generate
outputs such as predictions, content, recommendations, or decisions.

Source: OECD AI Principles
https://oecd.ai/en/ai-principles

NIST frames AI in terms of systems that can create benefits but also risks to
people, organizations, and society. That is why good AI work includes testing,
risk management, transparency, privacy, and human oversight.

Source: NIST AI Risk Management Framework
https://www.nist.gov/itl/ai-risk-management-framework

For students, a practical definition is:

```text
AI is software that uses rules, data, models, or learned patterns to do tasks
that normally require human judgment, language, perception, planning, or
decision-making.
```

That definition includes simple rule systems and modern LLMs. The important
question is not "Is it magic?" The better question is:

```text
What input does it use?
What pattern or rule does it apply?
What output does it produce?
Who checks whether the output is safe and useful?
```

## Try This Now: Spot AI Around You

Take two minutes and list every place you might have seen AI or machine
learning this week.

Examples:

- autocomplete while typing,
- translation,
- search ranking,
- video recommendations,
- shopping recommendations,
- fashion styling or size suggestions,
- spam filters,
- face or object detection in photos,
- voice assistants,
- maps and traffic predictions,
- study helpers,
- code completion,
- medical image tools,
- weather forecasts.

Now pick one example and answer:

```text
What is the input?
What is the output?
Does it need a human to check it?
What could go wrong?
```

## Where AI Is Used Now

AI is already used in many fields. The point is not that every use is perfect.
The point is that the same core ideas appear in different places.

| Area | What AI Can Help With | Why Humans Still Matter |
|---|---|---|
| Education | tutoring, feedback, language practice, lesson planning | teachers protect learners, context, fairness, and motivation |
| Medicine | image support, workflow tools, clinical decision support | clinicians are responsible for patient care and safety |
| Weather and climate | faster forecasts, environmental monitoring, climate modeling | scientists validate models and communicate uncertainty |
| Nature monitoring | wildlife sound detection, habitat monitoring, biodiversity research | conservation teams check data quality and decide what action to take |
| Recommender systems | ranking pages, videos, products, songs, lessons, and resources | designers must avoid manipulation, unfair exposure, and filter bubbles |
| Fashion and retail | design exploration, styling help, demand forecasting, merchandising | people still decide taste, culture, fit, sustainability, and fairness |
| Accessibility | captions, image descriptions, speech tools, reading support | users need control, privacy, and accurate representation |
| Software | code suggestions, tests, documentation, debugging support | developers must review, test, and secure the code |
| Robotics | perception, planning, language-to-action | physical systems need strong safety engineering |

Sources:

- UNESCO, "Guidance for generative AI in education and research"
  https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research
- WHO, "Ethics and governance of artificial intelligence for health"
  https://www.who.int/publications/i/item/9789240029200
- NOAA Center for Artificial Intelligence
  https://www.noaa.gov/ai
- Google Research, "Bioacoustics"
  https://deepmind.google/blog/how-ai-is-helping-advance-the-science-of-bioacoustics-to-save-endangered-species/
- Google Research, "Machine Intelligence"
  https://research.google/research-areas/machine-intelligence/
- IBM, "Build an AI stylist with Granite, Python, and watsonx.ai"
  https://www.ibm.com/think/tutorials/build-ai-stylist-with-granite-python-watsonx-ai
- Google Cloud, "Recommendations AI"
  https://cloud.google.com/use-cases/recommendations

Soma is one small example of the education row:

```text
student question -> topic context -> AI-shaped answer -> limitations -> human review
```

## What AI Is Still Missing

Modern AI can be impressive, but it is not complete intelligence.

Current systems can still struggle with:

- **ground truth:** knowing whether a generated answer is actually correct,
- **causality:** understanding why something happens, not only what pattern
  often appears,
- **common sense:** handling ordinary real-world assumptions people rarely
  write down,
- **long-term memory and goals:** staying reliable over long projects,
- **embodiment:** acting safely in the physical world,
- **values and judgment:** deciding what should be done, not only what can be
  done,
- **accountability:** explaining who is responsible when an AI system causes
  harm.

The Stanford AI Index tracks current AI progress and risks across technical
performance, adoption, economy, education, policy, and public opinion. It is a
useful annual reality check because the field changes quickly.

Source: Stanford HAI, "The 2026 AI Index Report"
https://hai.stanford.edu/ai-index/2026-ai-index-report

Classroom rule:

```text
Treat AI as powerful assistance, not automatic truth.
```

## The Short Version

AI did not suddenly appear. It has been built in waves:

1. **Logic and symbols:** make machines reason with rules.
2. **Expert systems:** capture specialist knowledge as if/then decisions.
3. **Statistical learning:** let machines learn patterns from data.
4. **Neural networks:** use layered math inspired loosely by brains.
5. **Deep learning:** train large neural networks with lots of data and compute.
6. **Transformers and LLMs:** predict and generate language, code, images, and
   other media at scale.
7. **Multimodal agents and robotics:** connect models to screens, tools,
   sensors, and actions in the world.

The main pattern is this:

```text
rules written by people
-> patterns learned from data
-> large models trained on many tasks
-> models connected to tools, screens, and physical action
```

## Timeline At A Glance

| Era | Big Idea | Example |
|---|---|---|
| 1940s-1950s | Early neurons and machine intelligence questions | McCulloch-Pitts neuron, Turing test |
| 1956 | AI becomes a named research field | Dartmouth summer research proposal |
| 1960s-1970s | Logic, search, planning, and robots | Shakey the Robot, theorem proving |
| 1970s-1980s | Expert systems | medical and business rule systems |
| 1980s-1990s | Neural networks return; statistical ML grows | backpropagation, Bayesian methods, SVMs |
| 2000s | Data-driven ML becomes practical | search ranking, spam filters, recommendation |
| 2010s | Deep learning breaks through | ImageNet, speech recognition, AlphaGo |
| 2017-2022 | Transformers and foundation models | Attention, BERT, GPT-style models |
| 2023-2026 | Multimodal and agentic AI | GPT-4, Gemini, computer-use agents, robotics |

## The Practical AI Stack

Most real AI products are not just a model. They are a stack:

```text
User problem
-> data and context
-> model or rule
-> tool/API call
-> user interface
-> tests and evaluation
-> safety and privacy checks
-> human feedback
```

That is why Soma is designed as a complete app, not only a prompt. The visible
tutor answer is just the final layer. Under it are topic data, browser state,
server boundaries, prompt construction, response parsing, tests, and safety
rules.

## Before The Name "AI": Can Machines Think?

Two early ideas mattered.

First, researchers tried to describe thinking as computation. In 1943, Warren
McCulloch and Walter Pitts described a simplified mathematical neuron. It was
not a real brain cell, but it helped people imagine networks of simple units
doing logical work.

Source: McCulloch and Pitts, "A Logical Calculus of the Ideas Immanent in
Nervous Activity"
https://link.springer.com/article/10.1007/BF02478259

Second, Turing reframed the machine-intelligence question around behavior. If a
machine can hold a conversation that appears intelligent, perhaps intelligence
can be studied as an engineering problem.

Source: Turing, "Computing Machinery and Intelligence"
https://academic.oup.com/mind/article/LIX/236/433/986238

Classroom question:

```text
If a machine gives a useful explanation, does it need to "understand" the way a
human does? Why or why not?
```

Try this now:

```text
Ask two people what "thinking" means. Do they define it as reasoning, feeling,
remembering, explaining, or choosing? This is why Turing's question is still
interesting.
```

## 1956: AI Gets A Name

The term "artificial intelligence" is strongly associated with a 1956 Dartmouth
summer research project proposal. John McCarthy, Marvin Minsky, Nathaniel
Rochester, and Claude Shannon proposed studying how to make machines use
language, form abstractions, improve themselves, and solve problems usually
reserved for humans.

Source: "A Proposal for the Dartmouth Summer Research Project on Artificial
Intelligence"
http://jmc.stanford.edu/articles/dartmouth/dartmouth.pdf

This matters because the early goal was broad. AI was not just "chatbots." It
included language, reasoning, learning, creativity, and problem solving.

Student takeaway:

```text
AI began as a big research question, not as one product.
```

## The Symbolic AI Era: Reasoning With Rules

In the 1960s and 1970s, many researchers believed intelligence could be built
from symbols, logic, and search. A system might represent facts like:

```text
All mixtures have parts.
Filtration separates insoluble solids from liquids.
Sand is insoluble in water.
Therefore filtration can help separate sand from water.
```

This style is often called **symbolic AI** or **good old-fashioned AI**. It was
powerful for problems where humans could write clear rules, but it struggled
when the world was messy, visual, noisy, or ambiguous.

Source: Stanford Encyclopedia of Philosophy, "Artificial Intelligence"
https://plato.stanford.edu/entries/artificial-intelligence/

One famous embodied project was Shakey the Robot at SRI. Shakey combined
perception, planning, and action: it could reason about moving through rooms and
performing tasks in a simplified world.

Source: SRI, "Shakey the Robot"
https://www.sri.com/hoi/shakey-the-robot/

Why this was exciting:

- computers could search through possible moves,
- logic could prove simple conclusions,
- robots could connect reasoning to action.

Why it was hard:

- real life has too many exceptions,
- vision is harder than it looks,
- common sense is difficult to write as rules,
- rules break when the situation changes.

## The 1970s And 1980s: Expert Systems

Expert systems tried to capture specialist knowledge in rules. Instead of
making a machine learn from millions of examples, engineers interviewed experts
and wrote decision logic.

Example shape:

```text
IF the student missed vocabulary questions
AND the topic is mixtures
THEN recommend vocabulary review before practice questions.
```

This is not far from some beginner projects in this repo. A recommender, quiz
scorer, or resource finder can use transparent rules before it needs an LLM.

The expert-system wave showed that AI could be useful in constrained domains,
but it also exposed a problem: maintaining thousands of rules is expensive, and
the system cannot easily learn from new data unless people rewrite it.

Source: Stanford Encyclopedia of Philosophy, "Artificial Intelligence"
https://plato.stanford.edu/entries/artificial-intelligence/

Soma connection:

```text
If a feature can be solved with clear rules, use normal JavaScript.
If it needs flexible language help, consider /api/coach.
```

## Machine Learning: Let The Data Teach The Rules

Machine learning changed the question.

Instead of asking:

```text
What rules should humans write?
```

ML asks:

```text
What pattern can a machine learn from examples?
```

A spam filter, for example, does not need a human to list every possible spam
message. It can learn patterns from many labeled examples. A recommendation
system can learn that certain users like certain resources. A classifier can
learn patterns in images, sound, text, or tables.

Statistical learning theory gave researchers ways to reason about how models
learn from data and how they might generalize to new examples.

Source: Vapnik, "The Nature of Statistical Learning Theory"
https://link.springer.com/book/10.1007/978-1-4757-3264-1

Support vector machines were one influential statistical-learning method in the
1990s. They helped show that strong performance could come from careful math,
good features, and data.

Source: Cortes and Vapnik, "Support-Vector Networks"
https://link.springer.com/article/10.1007/BF00994018

Student takeaway:

```text
Rules are written by people. Models are trained from data. Both can be useful.
```

Practical examples:

- A rule can say "if the question is empty, show an error."
- A classifier can learn which emails look like spam.
- A recommender can learn which resources helped similar students.
- A fashion app can learn which sizes, colors, or styles people often choose.
- A language model can generate an explanation from topic context.

Beginner learning resource: Google's Machine Learning Crash Course
https://developers.google.com/machine-learning/crash-course

## Neural Networks Return

Neural networks are made of layers of simple mathematical units. They are only
loosely inspired by brains, but the brain metaphor helped people imagine
learning as networks of connections.

Frank Rosenblatt's perceptron in the 1950s was an early neural network idea.

Source: Rosenblatt, "The Perceptron: A Probabilistic Model for Information
Storage and Organization in the Brain"
https://doi.org/10.1037/h0042519

Neural networks became much more practical when researchers showed how to train
multi-layer networks with backpropagation. Backpropagation is a way to measure
how wrong a model was and adjust the layers so the next answer is better.

Source: Rumelhart, Hinton, and Williams, "Learning representations by
back-propagating errors"
https://www.nature.com/articles/323533a0

Why neural networks did not immediately take over:

- computers were slower,
- datasets were smaller,
- training was difficult,
- many problems still worked better with other methods.

Why they came back:

- more data,
- better chips,
- better training tricks,
- better network designs,
- the internet created huge digital datasets.

## Deep Learning: When Data And Compute Met Neural Nets

Deep learning means training neural networks with many layers. Around the early
2010s, deep learning made major progress in image recognition, speech, and
language.

ImageNet was a large visual dataset and challenge that helped measure progress
in image recognition. In 2012, a deep convolutional neural network often called
AlexNet dramatically improved ImageNet classification performance.

Sources:

- ImageNet paper: https://www.image-net.org/static_files/papers/imagenet_cvpr09.pdf
- AlexNet paper: https://papers.neurips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks

Deep learning also changed games and planning. AlphaGo combined deep neural
networks with search and reinforcement learning to defeat a top human Go
player.

Source: Silver et al., "Mastering the game of Go with deep neural networks and
tree search"
https://www.nature.com/articles/nature16961

Optional classroom hook: show a short AlphaGo documentary clip or trailer before
discussing why Go was hard. The point is not only that a machine won. The point
is that human players learned new strategies by studying the system's moves.

Important lesson:

```text
Modern AI progress often comes from combining old ideas in new ways:
search + learning + data + compute + evaluation.
```

## Transformers: The Architecture Behind Many LLMs

Before transformers, many language models processed text mostly in sequence.
Transformers introduced an attention mechanism that made it easier to learn
relationships across long pieces of text and train efficiently at scale.

Source: Vaswani et al., "Attention Is All You Need"
https://arxiv.org/abs/1706.03762

The key idea for students:

```text
Attention helps a model decide which other words, tokens, image patches, or
signals matter for the next step.
```

BERT showed how transformer models could learn useful language representations
by pretraining on large text and then adapting to many tasks.

Source: Devlin et al., "BERT: Pre-training of Deep Bidirectional Transformers
for Language Understanding"
https://arxiv.org/abs/1810.04805

GPT-style models showed that very large language models trained to predict text
could perform many tasks from prompts and examples.

Source: Brown et al., "Language Models are Few-Shot Learners"
https://arxiv.org/abs/2005.14165

## LLMs: Language Models Become General Interfaces

An LLM is trained on large amounts of text and learns statistical patterns that
help it predict and generate tokens. It can write, summarize, translate,
explain, draft code, answer questions, and follow instructions.

But an LLM is not a database and not a teacher. It can produce wrong answers,
make unsupported claims, or sound confident when it should be uncertain.

That is why Soma has:

- local topic data,
- safe context,
- `/api/coach`,
- structured JSON response fields,
- Debug Lab,
- safety checks,
- limitations text.

GPT-4's technical report described a large multimodal model with strong
performance across many exams and benchmarks, while also documenting important
limitations and safety work.

Source: OpenAI, "GPT-4 Technical Report"
https://arxiv.org/abs/2303.08774

Student takeaway:

```text
LLMs are powerful language engines. Good apps still need product design, data
boundaries, tests, and human judgment.
```

Practical LLM use cases:

- explain a topic in different words,
- draft a quiz from teacher-approved content,
- summarize long notes,
- translate or rephrase text,
- help debug a small code error,
- turn rough ideas into a project plan.

Bad LLM use cases:

- official grades without review,
- private student records,
- medical or legal decisions by itself,
- pretending a generated answer is guaranteed true,
- replacing a teacher relationship with a chatbot.

UNESCO's generative AI education guidance emphasizes a human-centered approach
and the need for policy, capacity building, and learner protection.

Source: UNESCO, "Guidance for generative AI in education and research"
https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research

## Multimodal AI: Text, Images, Audio, Video, And More

Multimodal AI handles more than one kind of input or output. A model might read
text, inspect an image, listen to audio, or respond with text, speech, and
images.

GPT-4o was described as accepting combinations of text, audio, image, and video
as input and generating combinations of text, audio, and image as output.

Source: OpenAI, "Hello GPT-4o"
https://openai.com/index/hello-gpt-4o/

Gemini was introduced as a multimodal model family designed to work across
text, images, audio, video, and code.

Source: Google, "Gemini: A Family of Highly Capable Multimodal Models"
https://arxiv.org/abs/2312.11805

Why this matters:

- a science tutor could look at a diagram,
- a language app could listen to pronunciation,
- an accessibility tool could describe an image,
- a robot could connect language to camera input.

Safety question:

```text
If a model can see and hear, what private information might accidentally be in
the input?
```

## Agents And Computer Use

An AI agent is a system that can use a model to choose actions, call tools,
observe results, and continue working toward a goal.

Soma is not a full autonomous agent. It is a safer beginner pattern:

```text
student question -> safe context -> /api/coach -> structured answer
```

But the field is moving toward systems that can use tools and computers more
directly.

Anthropic announced a computer-use beta where Claude could interact with a
computer screen by moving a cursor, clicking, and typing through a software
setup.

Source: Anthropic, "Developing a computer use model"
https://www.anthropic.com/news/developing-computer-use

OpenAI described Computer-Using Agent as a model that interacts with graphical
user interfaces such as buttons, menus, and text fields.

Source: OpenAI, "Computer-Using Agent"
https://openai.com/index/computer-using-agent/

This is exciting because many useful tasks happen in normal software, not only
inside APIs. It is also risky because clicking the wrong button can have real
consequences.

Design rule:

```text
The more power an AI system has to act, the stronger its permissions, checks,
logs, and human confirmation should be.
```

## Robotics: From Words To Physical Action

Robotics adds a harder problem: the model must deal with the physical world.
The world is noisy. Objects move. Cameras miss things. A robot can bump into
people or break objects.

Modern robotics research often connects vision, language, and action. RT-2, for
example, explored vision-language-action models that transfer web-scale
knowledge into robotic control.

Source: Brohan et al., "RT-2: Vision-Language-Action Models Transfer Web
Knowledge to Robotic Control"
https://arxiv.org/abs/2307.15818

PaLM-E explored embodied multimodal language models that connect language,
vision, and robot sensor information.

Source: Driess et al., "PaLM-E: An Embodied Multimodal Language Model"
https://arxiv.org/abs/2303.03378

Student takeaway:

```text
Robots need AI plus sensors, motors, control systems, safety engineering, and
testing in the real world.
```

## Where AI Is Going Now

As of 2026, AI is moving in several directions at once:

- **more multimodal:** models can work with text, image, audio, video, and code,
- **more tool-using:** models can call tools, search, write code, and use
  computers,
- **more embedded:** AI is appearing inside school tools, office tools,
  phones, browsers, and robots,
- **more evaluated:** researchers are building harder tests because old
  benchmarks get saturated,
- **more regulated and debated:** society is asking who benefits, who is
  harmed, and how to govern powerful systems.

The 2026 Stanford AI Index is a strong current reference because it tracks AI
research, technical performance, economy, policy, education, public opinion,
and societal impact with broad data.

Source: Stanford HAI, "The 2026 AI Index Report"
https://hai.stanford.edu/ai-index/2026-ai-index-report

Important caution:

```text
AI capability is not the same as AI wisdom.
```

A model may be able to answer, draw, code, or click. That does not mean it knows
when it should stop, ask for help, protect privacy, or defer to a teacher,
doctor, parent, or expert.

Three future directions to watch:

1. **Multimodal assistants** that can combine text, images, audio, video, code,
   and sensor data.
2. **Tool-using agents** that can search, write code, operate software, and
   coordinate multi-step tasks.
3. **Embodied AI** in robots, labs, vehicles, farms, factories, and assistive
   devices.

Three questions to keep asking:

```text
Who benefits?
Who might be harmed?
Who gets to decide whether the system is good enough?
```

## What This Means For Soma

Soma is a small project, but it teaches the real shape of modern AI apps:

| AI history idea | Soma version |
|---|---|
| symbolic rules | normal JavaScript validation and UI state |
| expert systems | topic-specific constraints and resource recommendations |
| machine learning | optional Gemini provider model |
| neural networks | the LLM behind `/api/coach` |
| structured output | JSON fields the app can render safely |
| multimodal future | possible diagram or image-based science help later |
| agents | possible future tool loops, but not in the first version |
| safety | personal-data blocking, key boundaries, Debug Lab limits |

The beginner lesson is not "AI can do everything." The better lesson is:

```text
Build small. Use data carefully. Keep secrets on the server. Test behavior.
Explain limits. Know when normal code is better than AI.
```

## Discussion Questions

1. Which AI wave feels most similar to the Soma app: rules, expert systems,
   machine learning, neural networks, LLMs, or agents?
2. Why did expert systems work in narrow areas but struggle in messy real life?
3. Why did deep learning need both data and compute?
4. Why are LLMs useful for tutoring language but risky for official grading?
5. If a model can use a computer, what actions should require human approval?
6. If a robot uses AI, what safety checks are different from a chatbot?

## Mini Activity: Place The Feature On The Timeline

Pick one feature and place it on the AI timeline:

- rule-based quiz scoring,
- recommendation by topic tag,
- `/api/coach` explanation,
- Debug Lab prompt editing,
- image-based diagram explanation,
- a robot science lab assistant.

For each feature, answer:

```text
What data does it need?
What model or rule does it use?
What can go wrong?
What should a human review?
```

## Best Learning Resources

Use these when you want to go deeper:

- Beginner AI overview: Elements of AI by the University of Helsinki and
  Reaktor
  https://course.elementsofai.com/
- Machine learning basics: Google Machine Learning Crash Course
  https://developers.google.com/machine-learning/crash-course
- Deep learning course: MIT 6.S191 Introduction to Deep Learning
  https://introtodeeplearning.com/
- AI history and definitions: Stanford Encyclopedia of Philosophy,
  "Artificial Intelligence" https://plato.stanford.edu/entries/artificial-intelligence/
- AI risk and trustworthy systems: NIST AI Risk Management Framework
  https://www.nist.gov/itl/ai-risk-management-framework
- AI policy principles: OECD AI Principles
  https://oecd.ai/en/ai-principles
- Education: UNESCO AI competency framework for students
  https://www.unesco.org/en/articles/ai-competency-framework-students
- Current AI trends: Stanford HAI AI Index 2026
  https://hai.stanford.edu/ai-index/2026-ai-index-report
- Transformers: "Attention Is All You Need"
  https://arxiv.org/abs/1706.03762
- LLM prompting and app design: OpenAI prompting guide
  https://developers.openai.com/api/docs/guides/prompting
- Human-centered AI product design: Google People + AI Guidebook
  https://pair.withgoogle.com/guidebook/
- AI literacy for education: AI Literacy Framework
  https://ailiteracyframework.org/
- AI safety and prompt injection: OWASP LLM Prompt Injection Prevention Cheat
  Sheet
  https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html

## Mentor Notes

- Do not present AI history as a straight line of inevitable progress. It is a
  story of ideas that worked, failed, returned, and combined.
- Keep the "normal code versus AI" distinction visible. This helps students
  avoid using an LLM for everything.
- When discussing current AI, use exact dates and sources. The field changes
  quickly, so do not rely on old slides without checking.
- Avoid hype. Excitement is good; pretending the systems are magic is not.
