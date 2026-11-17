import type { Lesson } from "@/lib/lessons";

export const lesson: Lesson = {
  id: "module-1-lesson-2",
  module: 1,
  order: 2,
  title: "Pick one group of people",
  shortTitle: "Pick one group",
  emoji: "🎯",
  tagline: "You can't help everyone at once. Start with one clear group.",
  estimatedMinutes: 8,
  objective: [
    "Understand why \"everyone\" is a bad first customer.",
    "Choose a small group that shares the same problem.",
    "Make sure you can actually reach that group.",
  ],
  conceptTags: ["segmentation", "evidence"],
  steps: [
    {
      type: "challenge",
      title: "The story",
      text: "Your laundry idea could help students, parents or restaurants. But this week you only have time to study ONE group.",
      nova: "Choosing is hard! Let's think about who is easiest to learn from. 🤔",
    },
    {
      type: "decision",
      title: "Which group would you pick?",
      text: "Choose the group you can learn from the fastest.",
      options: [
        {
          id: "everyone",
          label: "🌍 Everyone who washes clothes",
          feedback: "Good try! But \"everyone\" is too big. Their lives are all different, so you can't learn anything clear.",
          misconceptionId: "broad-market",
          effects: { cashDelta: -12000, evidenceDelta: -2, conversionDelta: -1 },
        },
        {
          id: "hostel-students",
          label: "🏫 Hostel students on 2 campuses",
          feedback: "Great choice! They live in the same place, have similar budgets and the same laundry routine. Easy to meet and learn from.",
          misconceptionId: "segment-weakly-defined",
          correct: true,
          effects: { cashDelta: -6000, evidenceDelta: 10, conversionDelta: 0.5 },
        },
        {
          id: "working-parents",
          label: "👨‍👩‍👧 Working parents in one apartment building",
          feedback: "Not bad! But it's harder to find a common moment when they all feel the problem. Students are easier to start with.",
          misconceptionId: "no-shared-context",
          effects: { cashDelta: -9000, evidenceDelta: 5 },
        },
        {
          id: "restaurants",
          label: "🍽️ All restaurants in the city",
          feedback: "Big idea! But restaurants are all very different and busy. It would take a long time to learn anything clear.",
          misconceptionId: "too-many-variables",
          effects: { cashDelta: -15000, evidenceDelta: 2 },
        },
      ],
    },
    {
      type: "consequence",
      title: "What happened",
      text: "With one small group, you got clear answers fast. With a huge group, the answers were mixed up and confusing.",
      consequence: "Hostel students: 💵 −₹6,000 · 🔍 Proof +10 · 🎯 More people say yes",
    },
    {
      type: "insight",
      title: "The big idea",
      text: "Your first [[customer]] group should share the same place, the same problem and be easy for you to reach.",
      simple: "Small and clear beats big and messy. Start with one group you can meet this week.",
      example: "A tuition teacher doesn't start by teaching \"all students in India\". She starts with Class 10 maths students in her colony. Once that works, she grows.",
      nova: "Think small first. You can always grow later! 🌱",
    },
    {
      type: "retry",
      title: "Quick check",
      text: "Which is the better first group to study?",
      options: [
        {
          id: "city",
          label: "50 random people across the city",
          feedback: "Not quite. They have nothing in common, so their answers won't line up.",
        },
        {
          id: "campus",
          label: "35 students on one campus who use the same laundry",
          feedback: "Yes! 🎉 Same place, same routine — you'll learn much faster.",
          correct: true,
        },
      ],
      successMessage: "A good first group shares the same place and the same problem.",
    },
    {
      type: "mission",
      title: "Try it in real life",
      text: "Write down who is IN your group and who is NOT. Then find 5 people who match.",
      proof: ["3 rules for who is in your group", "3 rules for who is not", "5 people who match (no full names)"],
    },
    {
      type: "summary",
      title: "Remember this",
      remember: "Start with one small group you can actually meet.",
      summary: "A good first group is clear, easy to reach, and really has the problem.",
      learned: [
        "\"Everyone\" is not a customer group.",
        "Pick people who share the same place and problem.",
        "You can grow to more groups later.",
      ],
    },
  ],
};
