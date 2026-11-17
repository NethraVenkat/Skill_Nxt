import type { Lesson } from "@/lib/lessons";

export const lesson: Lesson = {
  id: "module-3-lesson-3",
  module: 3,
  order: 3,
  title: "Read the results",
  shortTitle: "Read the results",
  emoji: "📊",
  tagline: "\"I like it\" and \"I paid for it\" are very different answers.",
  estimatedMinutes: 8,
  objective: [
    "Know which signals are strong and which are weak.",
    "Don't get fooled by big numbers that don't mean much.",
    "Decide what to do next: continue, change or stop.",
  ],
  conceptTags: ["validation", "signals"],
  steps: [
    {
      type: "challenge",
      title: "The story",
      text: "Your sign-up page got 80 sign-ups! 🎉 But only 3 people said they would actually pay. Your team is super excited. What now?",
      nova: "Big numbers feel great. But let's check what they really mean. 🧐",
    },
    {
      type: "decision",
      title: "What would you do?",
      text: "Choose the smartest next step.",
      options: [
        {
          id: "celebrate-interest",
          label: "🎉 Celebrate! 80 sign-ups means it's working",
          feedback: "Fun, but careful! Signing up is free and easy. Only 3 people wanted to pay — that's the real number.",
          misconceptionId: "interest-equals-demand",
          effects: { cashDelta: -10000, evidenceDelta: 1, moraleDelta: 3 },
        },
        {
          id: "treat-as-noise",
          label: "🧪 Run a small paid trial and see who really pays",
          feedback: "Great choice! Money is the strongest signal. Now you'll learn who truly wants it.",
          misconceptionId: "vanity-metric",
          correct: true,
          effects: { cashDelta: -5000, evidenceDelta: 12, revenueDelta: 3000, customersDelta: 3 },
        },
        {
          id: "stop-totally",
          label: "🛑 Give up — the idea failed",
          feedback: "Too fast! A weak signal means \"test better\", not always \"give up\".",
          misconceptionId: "premature-shutdown",
          effects: { moraleDelta: -6 },
        },
        {
          id: "change-the-goal",
          label: "🙈 Quietly change the goal so it looks like a success",
          feedback: "That hides the truth from yourself. Honest results help you more than nice-looking ones.",
          misconceptionId: "pivot-by-avoidance",
          effects: { cashDelta: -4000, evidenceDelta: -3 },
        },
      ],
    },
    {
      type: "consequence",
      title: "What happened",
      text: "The paid trial showed which students really cared. 3 paid and 2 came back again — that's real proof you can build on.",
      consequence: "Paid trial: 💵 −₹5,000 · 💰 +₹3,000 earned · 🙋 3 paying customers · 🔍 Proof +12",
    },
    {
      type: "insight",
      title: "The big idea",
      text: "Not all signals are equal. A like, a sign-up and a payment tell you very different things. Payment is the strongest [[evidence|proof]].",
      simple: "Weak: \"I like it.\" Medium: \"Sign me up.\" Strong: \"Here's my money.\" Strongest: \"I paid AND came back.\"",
      example: "100 people say your samosas smell great. 10 people buy one. 5 come back tomorrow. The 5 who came back are your real customers!",
      nova: "Follow the money — it tells the truth. 💰",
    },
    {
      type: "retry",
      title: "Quick check",
      text: "Which signal is the STRONGEST?",
      options: [
        {
          id: "like",
          label: "\"I like the idea!\"",
          feedback: "Not quite. Liking is free. It's the weakest signal.",
        },
        {
          id: "signup",
          label: "\"I signed up for updates.\"",
          feedback: "Better, but still free and easy to do.",
        },
        {
          id: "paid",
          label: "\"I paid and came back twice.\"",
          feedback: "Yes! 🎉 They paid AND returned. That's the strongest proof there is.",
          correct: true,
        },
      ],
      successMessage: "Paying and coming back is the strongest signal.",
    },
    {
      type: "mission",
      title: "Try it in real life",
      text: "Look at the results of your test. Sort each response into: liked it, signed up, or paid. Then decide: continue, change or stop.",
      proof: ["Your goal number from before", "How many liked / signed up / paid", "Your decision and why"],
    },
    {
      type: "summary",
      title: "Remember this",
      remember: "\"I like it\" is nice. \"I paid\" is proof.",
      summary: "The strongest feedback is not the loudest. It's the one where people pay and come back.",
      learned: [
        "Sign-ups and likes are weak signals.",
        "Paying (and coming back) is the strongest proof.",
        "Use honest results to decide: continue, change or stop.",
      ],
    },
  ],
};
