import type { Lesson } from "@/lib/lessons";

export const lesson: Lesson = {
  id: "module-2-lesson-1",
  module: 2,
  order: 1,
  title: "Meet your customer",
  shortTitle: "Meet your customer",
  emoji: "🧑‍🎓",
  tagline: "Describe one real type of person — not a guess about a whole age group.",
  estimatedMinutes: 8,
  objective: [
    "Describe a customer by their daily life, not just their age.",
    "Make a simple persona card.",
    "Avoid guessing about people.",
  ],
  conceptTags: ["segmentation", "persona"],
  steps: [
    {
      type: "challenge",
      title: "The story",
      text: "Someone says: \"Young people hate doing chores!\" Should you believe that and target ALL young people?",
      nova: "Let's describe people by what they actually do — not by guesses. 🙂",
    },
    {
      type: "decision",
      title: "Who would you test first?",
      text: "Pick the group you understand best.",
      options: [
        {
          id: "all-young-people",
          label: "🧑 All young people in the city",
          feedback: "Good try! But young people are all different. A college student and a young doctor have very different days.",
          misconceptionId: "broad-segment",
          effects: { cashDelta: -10000, evidenceDelta: -1 },
        },
        {
          id: "hostel-students",
          label: "🏫 Hostel students with the same laundry routine",
          feedback: "Great choice! You know where they live, when they do laundry and what they can pay.",
          misconceptionId: "stereotype-over-context",
          correct: true,
          effects: { cashDelta: -6000, evidenceDelta: 10, conversionDelta: 0.5 },
        },
        {
          id: "all-renters",
          label: "🏠 Everyone who rents a house",
          feedback: "Close, but still too wide. Renters have many different needs and budgets.",
          misconceptionId: "too-broad",
          effects: { cashDelta: -8000, evidenceDelta: 2 },
        },
        {
          id: "young-working-people",
          label: "💼 Young office workers in one area",
          feedback: "Could work! But you'd need to check if they really share the same laundry problem first.",
          misconceptionId: "confusing-need-with-identity",
          effects: { cashDelta: -7000, evidenceDelta: 4 },
        },
      ],
    },
    {
      type: "consequence",
      title: "What happened",
      text: "The hostel group was easy to meet and gave clear answers. \"All young people\" gave mixed answers that didn't help.",
      consequence: "Hostel students: 💵 −₹6,000 · 🔍 Proof +10 · 🎯 More people say yes",
    },
    {
      type: "insight",
      title: "The big idea",
      text: "A [[persona]] is a simple picture of ONE type of customer: who they are, their daily routine, their budget and what bugs them.",
      simple: "Describe what people DO, not just their age. Same routine + same problem = a good customer group.",
      example: "Riya, 19, lives in a hostel. Gets ₹3,000 pocket money a month. Has 8 am classes. Laundry comes back late on Mondays, so she has no clean uniform.",
      insight: "Build your own persona card below. Mix and match the details!",
      labId: "persona-builder",
      nova: "When you can picture one real person, it's much easier to help them. 💡",
    },
    {
      type: "retry",
      title: "Quick check",
      text: "Which description helps you more?",
      options: [
        {
          id: "chores",
          label: "\"People who don't like chores\"",
          feedback: "Not quite. That's almost everyone! It doesn't tell you where to find them.",
        },
        {
          id: "hostel",
          label: "\"Hostel students with one shared laundry and a ₹3,000 monthly budget\"",
          feedback: "Yes! 🎉 Now you know who they are, where they are and what they can pay.",
          correct: true,
        },
      ],
      successMessage: "Good customer descriptions are specific: place, routine and budget.",
    },
    {
      type: "mission",
      title: "Try it in real life",
      text: "Make a persona card for your own idea. Then write 3 things that make someone fit your group, and 3 things that don't.",
      proof: ["One persona card (name, age, routine, budget, problem)", "3 \"fits\" rules", "3 \"doesn't fit\" rules"],
    },
    {
      type: "summary",
      title: "Remember this",
      remember: "Describe what people do, not just who they are.",
      summary: "A good customer group shares a routine and a problem you can see.",
      learned: [
        "Age alone is not a customer group.",
        "A persona is a picture of one real type of customer.",
        "Place + routine + budget makes it clear.",
      ],
    },
  ],
};
