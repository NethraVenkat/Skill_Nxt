import type { Lesson } from "@/lib/lessons";

export const lesson: Lesson = {
  id: "module-2-lesson-3",
  module: 2,
  order: 3,
  title: "Ask good questions",
  shortTitle: "Ask good questions",
  emoji: "🎤",
  tagline: "The right question gets you the truth. The wrong one gets polite lies.",
  estimatedMinutes: 8,
  objective: [
    "Ask open questions about real past events.",
    "Avoid questions that push people to say \"yes\".",
    "Listen more than you talk.",
  ],
  conceptTags: ["interviewing", "customer-voice"],
  steps: [
    {
      type: "challenge",
      title: "The story",
      text: "You want to learn about the laundry problem. You get to ask a student ONE question. Which one teaches you the most?",
      nova: "People are kind — they often say what you want to hear. Good questions get the real story! 🎤",
    },
    {
      type: "decision",
      title: "Pick your question",
      text: "Which question will get you the real truth?",
      options: [
        {
          id: "leading-question",
          label: "💬 \"Would you pay ₹200 for a laundry app?\"",
          feedback: "Good try! But most people say \"yes\" to be nice. Saying yes is easy — paying is not.",
          misconceptionId: "leading-question",
          effects: { cashDelta: -2000, evidenceDelta: 2 },
        },
        {
          id: "neutral-open",
          label: "💬 \"Tell me about the last time your laundry was late. What did you do?\"",
          feedback: "Great choice! This asks about a real past event. People will tell you a true story.",
          misconceptionId: "closed-question",
          correct: true,
          effects: { cashDelta: -2000, evidenceDelta: 12, moraleDelta: 1 },
        },
        {
          id: "feature-question",
          label: "💬 \"Do you want live tracking and notifications?\"",
          feedback: "Hmm, that's asking them to design your app. First learn about their problem.",
          misconceptionId: "solution-first",
          effects: { cashDelta: -2000, evidenceDelta: 3 },
        },
        {
          id: "market-question",
          label: "💬 \"Everyone hates dirty clothes, right?\"",
          feedback: "That question already has the answer inside it! People will just agree with you.",
          misconceptionId: "assumption-led-research",
          effects: { cashDelta: -2000, evidenceDelta: 1 },
        },
      ],
    },
    {
      type: "consequence",
      title: "What happened",
      text: "The open question got a real story: \"I had to borrow a friend's shirt and was late for class.\" The other questions only got polite yes-answers.",
      consequence: "Open question: 💵 −₹2,000 · 🔍 Proof +12 · 😊 Team happy +1",
    },
    {
      type: "insight",
      title: "The big idea",
      text: "In a [[interview|customer interview]], ask about what really happened in the past — not what people might do in the future.",
      simple: "Ask \"Tell me about the last time…\" Don't ask \"Would you…?\" Then listen more than you talk.",
      example: "Bad: \"Would you buy healthy snacks?\" (Everyone says yes!) Good: \"What did you eat between classes yesterday? How much did it cost?\"",
      nova: "Past stories = truth. Future promises = guesses. 📖",
    },
    {
      type: "retry",
      title: "Quick check",
      text: "Which question is better?",
      options: [
        {
          id: "would",
          label: "\"Would you use a tiffin service?\"",
          feedback: "Not quite. It's about the future, and people will just be polite.",
        },
        {
          id: "last-time",
          label: "\"What did you eat for lunch yesterday, and where did you get it?\"",
          feedback: "Yes! 🎉 It's about a real past event. You'll hear the truth.",
          correct: true,
        },
      ],
      successMessage: "Good questions ask about real things that already happened.",
    },
    {
      type: "mission",
      title: "Try it in real life",
      text: "Have one 10-minute chat with a real person. Only ask open questions about the past. Don't talk about your idea!",
      proof: ["Your list of questions", "3 things they said that surprised you", "1 thing you now want to test"],
    },
    {
      type: "summary",
      title: "Remember this",
      remember: "Ask \"Tell me about the last time…\" and then listen.",
      summary: "Good interviews let people tell their real story in their own words.",
      learned: [
        "People often say \"yes\" just to be polite.",
        "Ask about the past, not the future.",
        "Don't talk about your idea during the chat.",
      ],
    },
  ],
};
