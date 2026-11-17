export type RoleplayMode = "customer" | "investor" | "mentor";

export interface RoleplayScenario {
  id: RoleplayMode;
  title: string;
  persona: string;
  goal: string;
  context: string;
  guidance: string;
  prompts: string[];
  rubric: Array<{ label: string; detail: string; max: number }>;
}

export const roleplayScenarios: Record<RoleplayMode, RoleplayScenario> = {
  customer: {
    id: "customer",
    title: "AI Customer",
    persona: "Riya, hostel resident and price-sensitive buyer",
    goal: "Practice customer discovery without leading the customer.",
    context:
      "You sold a basic laundry pickup promise to a student group, but they are saying the timing is inconvenient and the quality feels inconsistent.",
    guidance:
      "Ask open questions, listen for repeated pain, and test the seriousness of the problem before suggesting a feature.",
    prompts: [
      "When is the pain most painful for you: morning, evening, or exam week?",
      "What do you do today instead of using a laundry pickup service?",
      "What would make you switch from your current process?",
      "What would make this feel worth paying for every week?",
    ],
    rubric: [
      { label: "Discovery quality", detail: "Asks open-ended, specific questions", max: 5 },
      { label: "Listening", detail: "Reflects evidence before proposing a fix", max: 5 },
      { label: "Hypothesis testing", detail: "Tests willingness to pay and willingness to switch", max: 5 },
    ],
  },
  investor: {
    id: "investor",
    title: "AI Investor",
    persona: "A skeptical angel investor focused on traction and proof.",
    goal: "Turn a founder pitch into evidence-driven decisions.",
    context:
      "The investor wants to see if the problem repeats, whether customers pay, and whether the numbers support growth.",
    guidance:
      "Defend the business with evidence, acknowledge risk honestly, and show a credible next milestone.",
    prompts: [
      "What exact problem are you solving, and who has it most strongly?",
      "What is the current retention signal for returning customers?",
      "How did you decide on pricing and what happened when you tested it?",
      "What is the next milestone and how will you know it is working?",
    ],
    rubric: [
      { label: "Clarity", detail: "Clear problem and offering", max: 5 },
      { label: "Evidence", detail: "Customer signals and real numbers", max: 5 },
      { label: "Traction", detail: "Signs of repeat behavior and retention", max: 5 },
      { label: "Risk handling", detail: "Honest recognition of weaknesses and next steps", max: 5 },
    ],
  },
  mentor: {
    id: "mentor",
    title: "AI Mentor",
    persona: "A calm, structured coach who asks the right question instead of giving the answer.",
    goal: "Promote reflection, not a shortcut.",
    context:
      "The learner has a strong idea but is uncertain about the next move and whether they are solving a real problem.",
    guidance:
      "Use prompts that force the learner to compare signals, evaluate trade-offs, and decide based on evidence.",
    prompts: [
      "What evidence tells you this is a real problem and not just your opinion?",
      "Which customer segment is most strongly affected by this pain?",
      "What decision would you make if the first version failed halfway through?",
      "Which metric would tell you the problem is still worth solving?",
    ],
    rubric: [
      { label: "Problem framing", detail: "Sees the customer pain clearly", max: 5 },
      { label: "Decision quality", detail: "Chooses the next best test", max: 5 },
      { label: "Reflection", detail: "Resolves tension with evidence", max: 5 },
    ],
  },
};

export interface InvestorPitchInput {
  clarity: number;
  evidence: number;
  traction: number;
  numbers: number;
  risk: number;
}

export function scoreInvestorPitch({
  clarity,
  evidence,
  traction,
  numbers,
  risk,
}: InvestorPitchInput) {
  const total = Math.round(((clarity + evidence + traction + numbers + risk) / 25) * 100);

  const verdict =
    total >= 80
      ? "Strong investor story"
      : total >= 65
        ? "Promising but needs sharper proof"
        : total >= 50
          ? "Interesting problem, but the numbers are weak"
          : "Early-stage and not ready for a deep funding conversation";

  return {
    total,
    verdict,
    strengths: [
      clarity >= 4 ? "Problem framing is memorable" : "Problem framing needs more specificity",
      evidence >= 4 ? "Evidence is credible and concrete" : "Evidence needs more customer proof",
      traction >= 4 ? "Demand shows repeat behavior" : "Traction needs stronger repeat signals",
      numbers >= 4 ? "Unit economics are believable" : "Costs and pricing need tighter logic",
      risk >= 4 ? "Risk is handled honestly" : "Risk is underexplained",
    ],
  };
}

export function getMentorHint(stage: "problem" | "customer" | "pricing") {
  const hints = {
    problem: "What pain is frequent enough that people would change behaviour, not just complain?",
    customer: "Which segment is most likely to pay today, and what proof do you have?",
    pricing: "If the customer says yes to your value story, what would they still hesitate on?",
  };

  return hints[stage];
}
