/**
 * Business words explained in simple language.
 * Used by the <Term> tooltip and the /glossary page.
 */
export type GlossaryEntry = {
  id: string;
  word: string;
  meaning: string;
  example: string;
  emoji: string;
};

export const glossary: GlossaryEntry[] = [
  {
    id: "startup",
    word: "Startup",
    emoji: "🌱",
    meaning: "A new, small business that is trying to solve a problem in a new way.",
    example: "Two friends start a service that delivers home-cooked tiffin to hostel students.",
  },
  {
    id: "problem",
    word: "Problem",
    emoji: "🧩",
    meaning: "Something that annoys people again and again, and costs them time or money.",
    example: "Every Monday the hostel laundry comes back late, so students miss class in dirty uniforms.",
  },
  {
    id: "solution",
    word: "Solution",
    emoji: "💡",
    meaning: "Your idea for fixing the problem. It is only a guess until real people use it.",
    example: "A laundry pickup that comes at a fixed time every Sunday evening.",
  },
  {
    id: "customer",
    word: "Customer",
    emoji: "🙋",
    meaning: "The person who pays for what you sell.",
    example: "The student who pays ₹200 a week for laundry pickup.",
  },
  {
    id: "evidence",
    word: "Evidence (proof)",
    emoji: "🔍",
    meaning: "Real facts that show you are right — not just your opinion.",
    example: "5 students told you they missed class last week because of late laundry.",
  },
  {
    id: "interview",
    word: "Customer interview",
    emoji: "🎤",
    meaning: "A short chat where you ask people about their real life, not about your idea.",
    example: "\"Tell me about the last time your laundry was late. What did you do?\"",
  },
  {
    id: "persona",
    word: "Persona",
    emoji: "🧑‍🎓",
    meaning: "A simple picture of one type of customer: who they are, what they need, what bugs them.",
    example: "Riya, 19, hostel student, ₹3,000 pocket money a month, hates waking up early.",
  },
  {
    id: "validation",
    word: "Validation",
    emoji: "✅",
    meaning: "Checking that people really want your idea before you spend lots of money on it.",
    example: "You put up a poster for ₹99 laundry pickup and 30 students pay in advance.",
  },
  {
    id: "mvp",
    word: "MVP (Minimum Viable Product)",
    emoji: "🛠️",
    meaning: "The simplest, cheapest version of your idea that still helps a real person.",
    example: "Before building an app, you take laundry orders on WhatsApp.",
  },
  {
    id: "price",
    word: "Price",
    emoji: "🏷️",
    meaning: "How much money a customer pays you for one thing.",
    example: "One cup of chai costs ₹15.",
  },
  {
    id: "revenue",
    word: "Revenue",
    emoji: "💰",
    meaning: "All the money that comes in from customers, before you pay any costs.",
    example: "You sell 100 cups of chai at ₹15 = ₹1,500 revenue.",
  },
  {
    id: "cost",
    word: "Cost",
    emoji: "🧾",
    meaning: "Money you must spend to run your business.",
    example: "Milk, tea leaves, sugar and gas for the chai stall.",
  },
  {
    id: "profit",
    word: "Profit",
    emoji: "📈",
    meaning: "Money left over after paying all your costs. Revenue minus costs.",
    example: "₹1,500 revenue − ₹900 costs = ₹600 profit.",
  },
  {
    id: "cash",
    word: "Cash",
    emoji: "💵",
    meaning: "The money your company has in the bank right now.",
    example: "You start VentureCraft with ₹10,00,000 cash.",
  },
  {
    id: "burn",
    word: "Burn (monthly spend)",
    emoji: "🔥",
    meaning: "How much money your company spends every month.",
    example: "Rent ₹20,000 + salary ₹60,000 = ₹80,000 burn each month.",
  },
  {
    id: "runway",
    word: "Runway",
    emoji: "🛫",
    meaning: "How many months your money will last if nothing changes.",
    example: "₹6 lakh cash ÷ ₹1 lakh spent each month = 6 months of runway.",
  },
  {
    id: "break-even",
    word: "Break-even",
    emoji: "⚖️",
    meaning: "The point where the money coming in equals the money going out. No loss, no profit.",
    example: "If costs are ₹30,000 a month and each sale earns ₹300, you break even at 100 sales.",
  },
  {
    id: "conversion",
    word: "Conversion rate",
    emoji: "🎯",
    meaning: "Out of everyone who looks, how many actually buy.",
    example: "100 people visit your stall, 20 buy chai → 20% conversion.",
  },
  {
    id: "churn",
    word: "Churn",
    emoji: "🚪",
    meaning: "Customers who stop buying from you.",
    example: "You had 50 tiffin customers. 5 stopped this month → 10% churn.",
  },
  {
    id: "morale",
    word: "Team morale",
    emoji: "😊",
    meaning: "How happy and motivated your team feels.",
    example: "After a big win, the team is excited and works better.",
  },
  {
    id: "valuation",
    word: "Valuation",
    emoji: "🏆",
    meaning: "How much people think your whole company is worth.",
    example: "An investor says your company is worth ₹50 lakh.",
  },
  {
    id: "pitch",
    word: "Pitch",
    emoji: "🎙️",
    meaning: "A short talk that explains your idea and why people should support it.",
    example: "\"Students waste 3 hours a week on laundry. We fix that for ₹99.\"",
  },
  {
    id: "investor",
    word: "Investor",
    emoji: "🤝",
    meaning: "Someone who gives your company money in return for a small part of it.",
    example: "An investor gives ₹10 lakh and gets 10% of your company.",
  },
  {
    id: "mission",
    word: "Real mission",
    emoji: "🚀",
    meaning: "A small task you do in real life to practise what you learned.",
    example: "Talk to 5 real people about a problem they face.",
  },
];

export function getTerm(id: string) {
  return glossary.find((entry) => entry.id === id);
}
