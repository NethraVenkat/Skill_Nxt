import type { Lesson } from "@/lib/lessons";

export const lesson: Lesson = {
  id: "module-1-lesson-1",
  module: 1,
  order: 1,
  title: "Spot a real problem",
  shortTitle: "Spot a real problem",
  emoji: "🧺",
  tagline: "Before you build anything, find out if the problem is real.",
  estimatedMinutes: 8,
  objective: [
    "Tell the difference between a small complaint and a real problem.",
    "Know why you should talk to people before building anything.",
    "Pick a cheap first step to learn the truth.",
  ],
  conceptTags: ["problem-framing", "evidence", "customer-voice"],
  steps: [
    {
      type: "challenge",
      title: "The story",
      text: "Three students in your hostel say: \"The laundry always comes back late!\" You have ₹10,00,000 in your pretend company. But no product yet.",
      nova: "Hi, I'm Nova! 👋 Let's see what a smart founder would do first.",
    },
    {
      type: "decision",
      title: "What would you do first?",
      text: "Pick one. There is no penalty — you learn either way.",
      options: [
        {
          id: "build-app",
          label: "📱 Build a laundry app right away (₹1,20,000)",
          feedback: "Good try! But that is a lot of money spent on a guess. We don't know yet if many people really have this problem.",
          misconceptionId: "solution-before-problem",
          effects: { cashDelta: -120000, burnDelta: 10000, moraleDelta: 2 },
        },
        {
          id: "interview-five",
          label: "🎤 Talk to 5 students about the last time laundry was late",
          feedback: "Great choice! Talking to people costs almost nothing, and you learn what really happens.",
          misconceptionId: "complaint-is-market",
          correct: true,
          effects: { cashDelta: -5000, evidenceDelta: 12, moraleDelta: 1 },
        },
        {
          id: "poll-group",
          label: "📊 Post \"Would you use a laundry app?\" in the college group",
          feedback: "Nice idea, but people often say \"yes\" just to be polite. A poll tells you what people think, not what they really do.",
          misconceptionId: "interest-is-demand",
          effects: { cashDelta: -2000, evidenceDelta: 3, conversionDelta: 0.2 },
        },
        {
          id: "sell-now",
          label: "🧺 Start a pickup service tomorrow without asking anything",
          feedback: "Brave! You might get a few customers, but you still won't know if the problem is big enough to build a business on.",
          misconceptionId: "early-sale-is-validation",
          effects: { cashDelta: 4000, revenueDelta: 4000, customersDelta: 2, churnDelta: 1 },
        },
      ],
    },
    {
      type: "consequence",
      title: "What happened",
      text: "The students who talked to people learned the real story for very little money. The students who built an app first spent a lot — and still didn't know if anyone needed it.",
      consequence: "Talking to 5 people: 💵 −₹5,000 · 🔍 Proof +12 · 😊 Team happy +1",
    },
    {
      type: "insight",
      title: "The big idea",
      text: "A complaint is something people say. A [[problem]] is something that happens again and again and costs people time, money or stress.",
      simple: "First find out if the problem is real. Then build. Talking to people is the cheapest way to find out.",
      example: "Ravi wanted to open a chai stall near a college. Before buying anything, he stood there for 2 mornings and counted how many students were looking for tea. 120 people asked! Now he knew the problem was real.",
      insight: "Try sorting a few problems below — which ones are real pain, and which are just small complaints?",
      labId: "problem-finder",
      nova: "Remember: an idea is just a guess until real people show you it's true. 🔍",
    },
    {
      type: "retry",
      title: "Quick check",
      text: "Two people complain about laundry. Who should you talk to first?",
      options: [
        {
          id: "exam-only",
          label: "Priya: \"It's a bit annoying, but only during exams.\"",
          feedback: "Not quite. Priya's problem is small and only happens sometimes.",
        },
        {
          id: "costly",
          label: "Arjun: \"Late laundry made me miss a job interview last week!\"",
          feedback: "Yes! 🎉 Arjun's problem happens often and really costs him. That is a real problem.",
          correct: true,
        },
      ],
      successMessage: "A real problem happens often and costs people something.",
    },
    {
      type: "mission",
      title: "Try it in real life",
      text: "Talk to 5 people who faced a problem recently. Ask: What happened? What did you do? How often does it happen?",
      proof: ["Short notes from each chat (no names needed)", "3 exact things people said", "How many times it happened to them", "One sentence: \"The problem is…\""],
    },
    {
      type: "summary",
      title: "Remember this",
      remember: "Don't build first. Talk to people first.",
      summary: "The first step is not building something. It is finding proof that a real problem exists.",
      learned: [
        "A complaint is not always a real problem.",
        "A real problem happens often and costs time, money or stress.",
        "Talking to 5 people is cheap and teaches you a lot.",
      ],
    },
  ],
};
