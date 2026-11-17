import type { Lesson } from "@/lib/lessons";

export const lesson: Lesson = {
  id: "module-3-lesson-2",
  module: 3,
  order: 2,
  title: "Run a fair test",
  shortTitle: "Run a fair test",
  emoji: "🧪",
  tagline: "Decide what \"success\" means BEFORE you see the results.",
  estimatedMinutes: 8,
  objective: [
    "Set a goal number before you start a test.",
    "Test with the right people, not just friends.",
    "Keep tests small and cheap.",
  ],
  conceptTags: ["validation", "experiment-design"],
  steps: [
    {
      type: "challenge",
      title: "The story",
      text: "You want to check if students will pay for on-time laundry pickup. How do you run a fair test?",
      nova: "A fair test is like a cricket match — you agree on the rules BEFORE you play! 🏏",
    },
    {
      type: "decision",
      title: "How would you test it?",
      text: "Choose the fairest way.",
      options: [
        {
          id: "redefine-threshold",
          label: "📉 Start, then decide what counts as \"good\" after seeing results",
          feedback: "Good try! But then you can always call it a win. That's like moving the goalpost after the ball is kicked.",
          misconceptionId: "moving-goalposts",
          effects: { cashDelta: -4000, evidenceDelta: 1 },
        },
        {
          id: "predeclare-threshold",
          label: "🎯 Decide first: \"If 20 students pay in 7 days, it works\"",
          feedback: "Great choice! You set the goal first, so the result is honest.",
          misconceptionId: "post-hoc-judgement",
          correct: true,
          effects: { cashDelta: -4000, evidenceDelta: 12, moraleDelta: 1 },
        },
        {
          id: "test-everyone",
          label: "👨‍👩‍👧 Ask friends and family",
          feedback: "They love you, so they'll say yes! But they aren't your real customers.",
          misconceptionId: "easy-sample",
          effects: { cashDelta: -2000, evidenceDelta: 2 },
        },
        {
          id: "run-ads-immediately",
          label: "💸 Spend ₹50,000 on ads straight away",
          feedback: "That's expensive! Test small and cheap first. Ads can come later.",
          misconceptionId: "spend-before-proof",
          effects: { cashDelta: -50000, evidenceDelta: 4 },
        },
      ],
    },
    {
      type: "consequence",
      title: "What happened",
      text: "Setting the goal first gave you an honest answer you could trust. Other tests either cost too much or gave answers that only felt good.",
      consequence: "Fair test: 💵 −₹4,000 · 🔍 Proof +12 · 😊 Team happy +1",
    },
    {
      type: "insight",
      title: "The big idea",
      text: "A fair [[validation]] test has 4 parts: WHO you test with, WHAT you offer, HOW LONG it runs, and the NUMBER that means success.",
      simple: "Write your goal number down before you start. Then stick to it — even if the result is disappointing.",
      example: "Before opening for a week, a juice stall owner says: \"If I sell 40 glasses a day, I'll keep the stall.\" On day 7, she checks honestly.",
      nova: "Honest tests save you lots of money later. 🙌",
    },
    {
      type: "retry",
      title: "Quick check",
      text: "Which plan is a fair test?",
      options: [
        {
          id: "vibe",
          label: "\"Let's see how it goes and decide later.\"",
          feedback: "Not quite. Without a goal number, you can't know if it worked.",
        },
        {
          id: "rule",
          label: "\"If 15 hostel students pay ₹99 within 5 days, we continue.\"",
          feedback: "Yes! 🎉 Who, what, how long and the goal number — all clear.",
          correct: true,
        },
      ],
      successMessage: "Fair test = who + what + how long + goal number (decided first).",
    },
    {
      type: "mission",
      title: "Try it in real life",
      text: "Run a tiny test for your idea: a poster, a WhatsApp message or a simple form. Write your goal number BEFORE you start.",
      proof: ["Your test plan with the goal number", "The real result", "Your decision: continue, change or stop"],
    },
    {
      type: "summary",
      title: "Remember this",
      remember: "Set the goal number first. Then test.",
      summary: "A test is only honest if you decide what success means before the results come in.",
      learned: [
        "Decide the goal number before you start.",
        "Test with real customers, not friends.",
        "Start small and cheap.",
      ],
    },
  ],
};
