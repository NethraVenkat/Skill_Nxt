import type { Lesson } from "@/lib/lessons";

export const lesson: Lesson = {
  id: "module-1-lesson-3",
  module: 1,
  order: 3,
  title: "How big is the problem?",
  shortTitle: "How big is the problem?",
  emoji: "📏",
  tagline: "Some problems are small. Some are huge. Learn to tell the difference.",
  estimatedMinutes: 8,
  objective: [
    "Check how often a problem happens.",
    "Check how much it hurts.",
    "Choose which problem to work on first.",
  ],
  conceptTags: ["problem-scoring", "evidence"],
  steps: [
    {
      type: "challenge",
      title: "The story",
      text: "You heard 4 different complaints. You have ₹20,000 to test ONE of them. Which one deserves your money?",
      nova: "Let's be a detective and find the problem that really hurts. 🕵️",
    },
    {
      type: "decision",
      title: "Which problem would you test?",
      text: "Pick the one that is the biggest real problem.",
      options: [
        {
          id: "frequent-but-mild",
          label: "⏰ Laundry is 10 minutes late every day (a little annoying)",
          feedback: "Good try! It happens often, but it doesn't really hurt anyone. People won't pay much to fix it.",
          misconceptionId: "frequency-alone",
          effects: { cashDelta: -5000, evidenceDelta: 3 },
        },
        {
          id: "rare-costly",
          label: "😰 Laundry gets lost once a month (students lose their uniform)",
          feedback: "Great choice! It doesn't happen every day, but when it does, it really costs students. That's a big problem.",
          misconceptionId: "severity-neglected",
          correct: true,
          effects: { cashDelta: -6000, evidenceDelta: 11, moraleDelta: 2 },
        },
        {
          id: "easy-feature",
          label: "📱 \"It would be nice to track laundry on my phone\"",
          feedback: "Nice to have! But easy to build doesn't mean people need it. That's an idea, not a problem.",
          misconceptionId: "solution-ease",
          effects: { cashDelta: -2000, evidenceDelta: 1 },
        },
        {
          id: "loudest-complaint",
          label: "📢 The angriest post in the college WhatsApp group",
          feedback: "Loud doesn't mean big! One angry post might just be one bad day.",
          misconceptionId: "online-volume-is-demand",
          effects: { cashDelta: -4000, evidenceDelta: 2 },
        },
      ],
    },
    {
      type: "consequence",
      title: "What happened",
      text: "The lost-uniform problem was the one people really wanted fixed. The loud or easy ideas got attention, but nobody was ready to pay.",
      consequence: "Lost-uniform problem: 💵 −₹6,000 · 🔍 Proof +11 · 😊 Team happy +2",
    },
    {
      type: "insight",
      title: "The big idea",
      text: "To measure a [[problem]], ask 3 questions: How often does it happen? How much does it hurt? What do people do today to fix it?",
      simple: "A big problem happens often OR hurts a lot. If people already spend time or money fixing it, that's a great sign.",
      example: "Your mobile charger breaking once a month is annoying. Your phone breaking once a month is a BIG problem — you'd pay a lot to stop that.",
      nova: "Score each problem from 1 to 5. The highest total wins! 🏆",
    },
    {
      type: "retry",
      title: "Quick check",
      text: "Problem A: happens a lot (5), hurts a little (2), easy to fix today (1). Problem B: happens sometimes (2), hurts a lot (5), hard to fix today (5). Which is bigger?",
      options: [
        {
          id: "a",
          label: "Problem A (total 8)",
          feedback: "Not quite. It happens a lot, but it barely hurts and is easy to fix.",
        },
        {
          id: "b",
          label: "Problem B (total 12)",
          feedback: "Yes! 🎉 Problem B hurts a lot and is hard to fix. People will want help with it.",
          correct: true,
        },
      ],
      successMessage: "Add up how often + how much it hurts + how hard it is to fix today.",
    },
    {
      type: "mission",
      title: "Try it in real life",
      text: "Ask 5 people to score their problem from 1 to 5 on: how often, how much it hurts, and how hard it is to fix today.",
      proof: ["A small table with the scores", "Which problem got the highest total", "One sentence about why"],
    },
    {
      type: "summary",
      title: "Remember this",
      remember: "Loud is not big. Look for problems that happen often or really hurt.",
      summary: "A real problem happens again and again, or costs people a lot when it happens.",
      learned: [
        "Measure problems by how often and how much they hurt.",
        "If people already spend money fixing it, that's a good sign.",
        "Easy ideas and loud complaints can trick you.",
      ],
    },
  ],
};
