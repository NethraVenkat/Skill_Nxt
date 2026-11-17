import type { Lesson } from "@/lib/lessons";

export const lesson: Lesson = {
  id: "module-2-lesson-2",
  module: 2,
  order: 2,
  title: "When does it hurt most?",
  shortTitle: "When does it hurt?",
  emoji: "⏰",
  tagline: "Find the exact moment your customer feels the problem.",
  estimatedMinutes: 8,
  objective: [
    "Find the moment when the problem hurts most.",
    "See what people do today to fix it.",
    "Use that moment to plan your idea.",
  ],
  conceptTags: ["customer-journey", "trigger"],
  steps: [
    {
      type: "challenge",
      title: "The story",
      text: "Think about a hostel student's day. At which moment do they feel the laundry problem the MOST?",
      nova: "Every problem has a \"ouch!\" moment. Let's find it. 🔎",
    },
    {
      type: "decision",
      title: "Pick the \"ouch\" moment",
      text: "When does the problem really hurt?",
      options: [
        {
          id: "monday-morning",
          label: "😩 Monday morning, clothes still piled up",
          feedback: "Good thinking! It is a stressful moment. But the bigger \"ouch\" is when it actually stops them from doing something.",
          misconceptionId: "vague-time-of-day",
          effects: { cashDelta: -4000, evidenceDelta: 6 },
        },
        {
          id: "when-they-run-out-of-clothes",
          label: "👕 When they have no clean uniform for class",
          feedback: "Great choice! That's the exact \"ouch\" moment — the problem is real, urgent and easy to see.",
          misconceptionId: "not-looking-for-trigger",
          correct: true,
          effects: { cashDelta: -4000, evidenceDelta: 11, moraleDelta: 1 },
        },
        {
          id: "after-market-hours",
          label: "🌙 Late at night when shops are closed",
          feedback: "Maybe! But we don't have proof yet that this is when it hurts most.",
          misconceptionId: "weak-context",
          effects: { cashDelta: -5000, evidenceDelta: 2 },
        },
        {
          id: "during-booking",
          label: "📱 When they open a laundry app",
          feedback: "Hmm, that's about your idea, not their problem. Find the pain first, then think about apps.",
          misconceptionId: "solution-first",
          effects: { cashDelta: -6000, evidenceDelta: 1 },
        },
      ],
    },
    {
      type: "consequence",
      title: "What happened",
      text: "When you focused on the \"no clean uniform\" moment, students immediately said \"Yes, that's exactly it!\" Now you know when your help matters most.",
      consequence: "Ouch moment found: 💵 −₹4,000 · 🔍 Proof +11 · 😊 Team happy +1",
    },
    {
      type: "insight",
      title: "The big idea",
      text: "The \"ouch\" moment is when the problem really hurts. The workaround is what people do today to get by. Your idea should help right at the ouch moment.",
      simple: "Find WHEN it hurts and WHAT people do about it today. Then make that moment easier.",
      example: "At a college canteen, the ouch moment is the 10-minute lunch break with a long queue. The workaround is skipping lunch. A pre-order counter fixes exactly that moment.",
      nova: "If you know the ouch moment, you know exactly when to help. ⏰",
    },
    {
      type: "retry",
      title: "Quick check",
      text: "Which is the stronger \"ouch\" moment?",
      options: [
        {
          id: "class",
          label: "\"I have no clean clothes and class starts in 10 minutes!\"",
          feedback: "Yes! 🎉 Urgent, real and easy to see. That's the ouch moment.",
          correct: true,
        },
        {
          id: "app",
          label: "\"I don't like how the laundry app looks.\"",
          feedback: "Not quite. That's about an app design, not the real problem.",
        },
      ],
      successMessage: "The best moment is urgent and clearly connected to the problem.",
    },
    {
      type: "mission",
      title: "Try it in real life",
      text: "In 5 chats, ask: When did this problem last happen? What did you do? What happened next?",
      proof: ["The ouch moment for each person", "What they did to get by", "One pattern you saw again and again"],
    },
    {
      type: "summary",
      title: "Remember this",
      remember: "Help people at the exact moment it hurts.",
      summary: "The best chance to help is the moment the customer feels the problem and has to find a workaround.",
      learned: [
        "Every problem has an ouch moment.",
        "A workaround is what people do today to get by.",
        "Your idea should fix the ouch moment.",
      ],
    },
  ],
};
