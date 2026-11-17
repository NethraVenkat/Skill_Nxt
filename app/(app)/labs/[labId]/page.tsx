import { notFound } from "next/navigation";

import { NovaSays } from "@/components/nova";
import { BreakEvenMachine } from "@/components/labs/break-even-machine";
import { PersonaBuilder } from "@/components/labs/persona-builder";
import { PricingLab } from "@/components/labs/pricing-lab";
import { ProblemFinderLab } from "@/components/labs/problem-finder-lab";
import { ValidationTestLab } from "@/components/labs/validation-test-lab";

const labMap = {
  pricing: { Component: PricingLab, title: "Price Lab", tip: "Move the sliders and watch your money change." },
  "break-even": { Component: BreakEvenMachine, title: "Break-even Lab", tip: "Find the point where you stop losing money." },
  persona: { Component: PersonaBuilder, title: "Customer card", tip: "Describe one real type of customer." },
  "problem-finder": {
    Component: ProblemFinderLab,
    title: "Problem scorer 🧩",
    tip: "Score each problem from 1 to 5. The one with the highest total is the best problem to work on first.",
  },
  validation: {
    Component: ValidationTestLab,
    title: "Idea test ✅",
    tip: "Plan a tiny test of your idea. Change the price, the message and where you share it — then see what would probably happen.",
  },
};

export function generateStaticParams() {
  return [{ labId: "problem-finder" }, { labId: "validation" }];
}

export default async function LabPage({ params }: { params: Promise<{ labId: string }> }) {
  const { labId } = await params;
  const lab = labMap[labId as keyof typeof labMap];

  if (!lab) {
    notFound();
  }

  const { Component, title, tip } = lab;

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Lab · play with ideas</p>
        <h2 className="mt-1 text-3xl font-bold md:text-4xl">{title}</h2>
      </div>
      <NovaSays>{tip}</NovaSays>
      <Component />
    </div>
  );
}
