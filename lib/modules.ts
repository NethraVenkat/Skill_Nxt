/** The 9 learning modules, explained in simple words. Each has its own colour. */
export type ModuleInfo = {
  number: number;
  title: string;
  emoji: string;
  simple: string;
  question: string;
  /** Tailwind classes for this module's colour. */
  text: string;
  bg: string;
  border: string;
  bar: string;
};

export const modules: ModuleInfo[] = [
  {
    number: 1,
    title: "Finding Problems",
    emoji: "🧩",
    simple: "Spot a real problem that people face again and again.",
    question: "What is bugging people?",
    text: "text-coral",
    bg: "bg-coral/15",
    border: "border-coral/50",
    bar: "from-coral to-orange",
  },
  {
    number: 2,
    title: "Knowing Your Customer",
    emoji: "🙋",
    simple: "Learn who has the problem and talk to them the right way.",
    question: "Who has this problem?",
    text: "text-sky",
    bg: "bg-sky/15",
    border: "border-sky/50",
    bar: "from-sky to-teal",
  },
  {
    number: 3,
    title: "Testing the Idea",
    emoji: "✅",
    simple: "Check if people really want your idea before spending big money.",
    question: "Will people really pay?",
    text: "text-mint",
    bg: "bg-mint/15",
    border: "border-mint/50",
    bar: "from-mint to-teal",
  },
  {
    number: 4,
    title: "Building a First Version",
    emoji: "🛠️",
    simple: "Make the simplest version of your idea that still helps someone.",
    question: "What is the smallest thing I can build?",
    text: "text-orange",
    bg: "bg-orange/15",
    border: "border-orange/50",
    bar: "from-orange to-sunshine",
  },
  {
    number: 5,
    title: "Pricing & Money",
    emoji: "💰",
    simple: "Choose a fair price and understand where your money goes.",
    question: "How much should I charge?",
    text: "text-sunshine",
    bg: "bg-sunshine/15",
    border: "border-sunshine/50",
    bar: "from-sunshine to-orange",
  },
  {
    number: 6,
    title: "Getting Customers",
    emoji: "📣",
    simple: "Find simple, low-cost ways to tell people about your product.",
    question: "How do people find me?",
    text: "text-pink",
    bg: "bg-pink/15",
    border: "border-pink/50",
    bar: "from-pink to-coral",
  },
  {
    number: 7,
    title: "Team & Leadership",
    emoji: "🤝",
    simple: "Pick the right people and keep your team happy.",
    question: "Who should help me?",
    text: "text-violet",
    bg: "bg-violet/15",
    border: "border-violet/50",
    bar: "from-violet to-pink",
  },
  {
    number: 8,
    title: "Funding & Pitching",
    emoji: "🎙️",
    simple: "Explain your idea clearly and learn how companies raise money.",
    question: "How do I explain my idea?",
    text: "text-teal",
    bg: "bg-teal/15",
    border: "border-teal/50",
    bar: "from-teal to-sky",
  },
  {
    number: 9,
    title: "Growing Bigger",
    emoji: "🚀",
    simple: "Grow your company step by step without breaking what works.",
    question: "How do I grow safely?",
    text: "text-indigo",
    bg: "bg-indigo/15",
    border: "border-indigo/50",
    bar: "from-indigo to-violet",
  },
];

export function getModule(number: number) {
  return modules.find((module) => module.number === number) ?? modules[0];
}
