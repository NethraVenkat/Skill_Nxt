import type { Lesson } from "@/lib/lessons";

export const lesson: Lesson = {
  id: "module-3-lesson-1",
  module: 3,
  order: 1,
  title: "Find your biggest guess",
  shortTitle: "Your biggest guess",
  emoji: "🎲",
  tagline: "Every idea rests on guesses. Test the scariest one first.",
  estimatedMinutes: 8,
  objective: [
    "List the guesses your idea depends on.",
    "Find the one guess that could sink your idea.",
    "Write it as a clear sentence you can test.",
  ],
  conceptTags: ["assumptions", "validation"],
  steps: [
    {
      type: "challenge",
      title: "The story",
      text: "You found a real problem and a clear group of students. Before spending more money, what is the BIGGEST guess you should check?",
      nova: "Every idea is built on guesses. Let's find the one that matters most. 🎲",
    },
    {
      type: "decision",
      title: "Pick the biggest guess",
      text: "Which guess, if it's wrong, would end your idea?",
      options: [
        {
          id: "people-want-laundry",
          label: "🧺 \"People want better laundry.\"",
          feedback: "Good try! But that's too vague to test. Better how? By how much?",
          misconceptionId: "broad-assumption",
          effects: { cashDelta: -3000, evidenceDelta: 1 },
        },
        {
          id: "students-will-pay",
          label: "💰 \"Students will pay ₹250 a month for on-time pickup.\"",
          feedback: "Great choice! If nobody pays, nothing else matters. And it's clear enough to test.",
          misconceptionId: "vague-willingness",
          correct: true,
          effects: { cashDelta: -3000, evidenceDelta: 12, moraleDelta: 1 },
        },
        {
          id: "lack-of-technology",
          label: "📱 \"Building the app will be the hardest part.\"",
          feedback: "Building matters later. First check that people want it and will pay.",
          misconceptionId: "solution-first-risk",
          effects: { cashDelta: -8000, evidenceDelta: 1 },
        },
        {
          id: "brands-need-identity",
          label: "🎨 \"People will love our logo and brand name.\"",
          feedback: "A nice brand helps, but it won't save an idea nobody pays for.",
          misconceptionId: "creative-vs-risk",
          effects: { cashDelta: -5000, evidenceDelta: 0 },
        },
      ],
    },
    {
      type: "consequence",
      title: "What happened",
      text: "Testing \"will students pay?\" gave you a clear answer quickly. Teams who worked on logos or apps first still didn't know if anyone would pay.",
      consequence: "Testing payment: 💵 −₹3,000 · 🔍 Proof +12 · 😊 Team happy +1",
    },
    {
      type: "insight",
      title: "The big idea",
      text: "Your biggest guess is the one that would end your idea if it's wrong. Usually it is: \"Will people really pay for this?\"",
      simple: "Test your scariest guess first. Write it as one clear sentence: who, what, how much.",
      example: "A momo stall owner's biggest guess isn't \"Will people like my sign board?\" It's \"Will 50 people a day buy momos at ₹60 here?\"",
      nova: "Scary guess first, fun stuff later! 💪",
    },
    {
      type: "retry",
      title: "Quick check",
      text: "Which guess is clear enough to test?",
      options: [
        {
          id: "vague",
          label: "\"People will like our tiffin.\"",
          feedback: "Not quite. \"Like\" is hard to measure. Who? How many? For how much?",
        },
        {
          id: "clear",
          label: "\"20 hostel students will pay ₹1,500 for a month of tiffin.\"",
          feedback: "Yes! 🎉 It says who, how many and how much. You can test that this week.",
          correct: true,
        },
      ],
      successMessage: "A testable guess says who, how many, and how much.",
    },
    {
      type: "mission",
      title: "Try it in real life",
      text: "Write down your biggest guess in one sentence. Then plan a tiny test: who you'll ask, what you'll offer, and how many \"yes\" answers you need.",
      proof: ["Your biggest guess (one sentence)", "Who you'll test with", "The number that means \"it works\""],
    },
    {
      type: "summary",
      title: "Remember this",
      remember: "Test the guess that could sink your idea — first.",
      summary: "Check the scariest guess before building everything around it.",
      learned: [
        "Every idea depends on guesses.",
        "The biggest guess is usually \"Will people pay?\"",
        "Write guesses as: who + what + how much.",
      ],
    },
  ],
};
