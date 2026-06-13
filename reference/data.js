const setupOptions = {
  modes: [
    {
      id: "learn-topic",
      label: "Learn a topic",
      promptHelp: "Explain the selected topic with examples and common mistakes."
    },
    {
      id: "ask-tutor",
      label: "Ask topic tutor",
      promptHelp: "Answer the learner's question using the selected topic pack."
    },
    {
      id: "make-plan",
      label: "Make study plan",
      promptHelp: "Create a 7-day plan using the topic pack and resources."
    },
    {
      id: "practice",
      label: "Practice questions",
      promptHelp: "Give feedback on optional practice answers and suggest next steps."
    },
    {
      id: "review-weak-areas",
      label: "Review likely weak areas",
      promptHelp: "Use optional practice answers to identify likely weak areas."
    }
  ],
  grades: [
    {
      id: "grade-7",
      label: "Grade 7",
      grade: "Grade 7",
      gradeBand: "Junior School",
      ageRange: "about 12-13"
    }
  ],
  learningAreas: [
    {
      id: "integrated-science",
      label: "Integrated Science"
    }
  ]
};

const topicPacks = [
  {
    id: "living-things",
    grade: "Grade 7",
    gradeBand: "Junior School",
    learningArea: "Integrated Science",
    strand: "Living Things and Their Environment",
    topic: "Characteristics of living things",
    studyNeed: "Explain life processes using everyday observations",
    summary: "Living things show life processes such as movement, respiration, nutrition, growth, excretion, reproduction and sensitivity.",
    vocabulary: [
      { term: "Growth", meaning: "Increase in size or development over time." },
      { term: "Sensitivity", meaning: "Ability to detect and respond to changes." },
      { term: "Respiration", meaning: "Process living things use to release energy from food." }
    ],
    examples: [
      "A bean seed growing roots and a shoot shows growth.",
      "A plant bending toward light shows sensitivity.",
      "A person breathing faster after running is linked to respiration."
    ],
    misconceptions: [
      {
        mistake: "Growth and reproduction mean the same thing.",
        help: "Growth changes one living thing. Reproduction makes new living things."
      },
      {
        mistake: "Only animals respond to changes.",
        help: "Plants also respond, for example by bending toward light."
      }
    ],
    resources: [
      {
        title: "Observe A Growing Seed",
        type: "Observation activity",
        description: "Draw a seed before watering, then draw changes over several days and label the life process shown."
      },
      {
        title: "Life Processes Cards",
        type: "Revision cards",
        description: "Make one card for each life process with a local example."
      }
    ],
    practiceQuestions: [
      {
        id: "living-q1",
        question: "A plant bends toward a window. Which life process is shown?",
        options: ["Growth", "Sensitivity", "Excretion", "Reproduction"],
        answerIndex: 1,
        feedback: "The plant is responding to light, so the life process is sensitivity."
      }
    ],
    sampleQuestion: "Why is growth a life process, and how is it different from reproduction?"
  },
  {
    id: "mixtures",
    grade: "Grade 7",
    gradeBand: "Junior School",
    learningArea: "Integrated Science",
    strand: "Matter",
    topic: "Mixtures and separation",
    studyNeed: "Choose separation methods for simple mixtures",
    summary: "A mixture contains two or more substances that are physically combined. Some mixtures can be separated by filtering, decanting, evaporation or magnetism.",
    vocabulary: [
      { term: "Mixture", meaning: "Substances physically combined without forming a new substance." },
      { term: "Filtration", meaning: "Separating an insoluble solid from a liquid using a filter." },
      { term: "Magnetism", meaning: "Using a magnet to separate magnetic materials from non-magnetic materials." }
    ],
    examples: [
      "A magnet can separate iron filings from sand.",
      "A filter can separate tea leaves from tea.",
      "Evaporation can leave salt behind from salty water."
    ],
    misconceptions: [
      {
        mistake: "Filtration works for every mixture.",
        help: "Filtration works best when an insoluble solid is mixed with a liquid."
      },
      {
        mistake: "Evaporation is the best method when both materials are solids.",
        help: "Evaporation removes a liquid. For two solids, another property such as magnetism may be better."
      }
    ],
    resources: [
      {
        title: "Kitchen Separation Methods",
        type: "Home example",
        description: "Match filtering, decanting, evaporation and magnetism to safe everyday examples."
      },
      {
        title: "Method Match Table",
        type: "Practice",
        description: "List mixtures and choose the best separation method with one reason."
      }
    ],
    practiceQuestions: [
      {
        id: "mixtures-q1",
        question: "Which method is best for separating iron filings from sand?",
        options: ["Evaporation", "Magnetism", "Filtration", "Decanting"],
        answerIndex: 1,
        feedback: "Iron is magnetic, so magnetism is the best method."
      }
    ],
    sampleQuestion: "How do I know whether to use filtration, evaporation or magnetism?"
  },
  {
    id: "states-of-matter",
    grade: "Grade 7",
    gradeBand: "Junior School",
    learningArea: "Integrated Science",
    strand: "Matter",
    topic: "States of matter",
    studyNeed: "Compare solids, liquids and gases",
    summary: "Solids have fixed shape and volume. Liquids have fixed volume but take the shape of their container. Gases spread out to fill available space.",
    vocabulary: [
      { term: "Solid", meaning: "Matter with fixed shape and fixed volume." },
      { term: "Liquid", meaning: "Matter with fixed volume that takes the shape of its container." },
      { term: "Gas", meaning: "Matter that spreads to fill available space." }
    ],
    examples: [
      "Ice keeps its shape until it melts.",
      "Water takes the shape of a cup.",
      "Steam spreads through the air."
    ],
    misconceptions: [
      {
        mistake: "Liquids and gases both have no fixed volume.",
        help: "A liquid keeps a fairly fixed volume. A gas expands to fill available space."
      }
    ],
    resources: [
      {
        title: "Solid, Liquid, Gas Table",
        type: "Comparison table",
        description: "Complete a table for shape, volume, particle spacing and two local examples."
      }
    ],
    practiceQuestions: [
      {
        id: "matter-q1",
        question: "Which state has fixed volume but takes the shape of its container?",
        options: ["Solid", "Liquid", "Gas", "Plasma"],
        answerIndex: 1,
        feedback: "A liquid has fixed volume but takes the shape of its container."
      }
    ],
    sampleQuestion: "Why does a liquid take the shape of a cup but not fill the whole room?"
  },
  {
    id: "environment",
    grade: "Grade 7",
    gradeBand: "Junior School",
    learningArea: "Integrated Science",
    strand: "Environment and Conservation",
    topic: "Caring for the environment",
    studyNeed: "Connect local actions to conservation",
    summary: "People can care for the environment by reducing waste, conserving soil and water, planting trees, and protecting living things.",
    vocabulary: [
      { term: "Conservation", meaning: "Careful use and protection of natural resources." },
      { term: "Erosion", meaning: "Wearing away or carrying away of soil by water, wind or human activity." },
      { term: "Pollution", meaning: "Adding harmful substances to the environment." }
    ],
    examples: [
      "Planting cover crops helps reduce soil erosion.",
      "Sorting waste helps keep the school compound clean.",
      "Protecting water sources helps people and animals stay healthy."
    ],
    misconceptions: [
      {
        mistake: "Only big organizations can protect the environment.",
        help: "Students can also take useful actions such as reducing waste, planting trees and keeping water sources clean."
      }
    ],
    resources: [
      {
        title: "Conservation Walk",
        type: "School audit",
        description: "List three places around school where water, soil or waste could be managed better."
      }
    ],
    practiceQuestions: [
      {
        id: "environment-q1",
        question: "Which action best helps reduce soil erosion in a school garden?",
        options: ["Leaving soil bare", "Planting cover crops", "Burning all plant waste", "Pouring dirty water"],
        answerIndex: 1,
        feedback: "Plant cover helps hold soil in place and reduces erosion."
      }
    ],
    sampleQuestion: "What are three practical ways our class can care for the environment?"
  }
];
