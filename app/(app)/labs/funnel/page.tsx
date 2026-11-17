"use client";

import { useState } from "react";

import { NovaSays } from "@/components/nova";
import { Term } from "@/components/term";
import { cn } from "@/lib/utils";

const steps = [
  { id: "see", emoji: "👀", label: "See your poster or post", colour: "bg-sky" },
  { id: "visit", emoji: "📲", label: "Message you or visit", colour: "bg-violet" },
  { id: "try", emoji: "🧺", label: "Try it once", colour: "bg-pink" },
  { id: "pay", emoji: "💰", label: "Pay again next week", colour: "bg-mint" },
] as const;

const fixes: Record<string, string> = {
  visit: "Many people see you but don't reach out. Make your message clearer: who it's for and what problem it fixes.",
  try: "People ask but don't try. Make trying easy — a free first pickup, or a simple way to book.",
  pay: "People try once but don't come back. Ask them why! Maybe the service was late, or the price felt too high.",
};

export default function FunnelLabPage() {
  const [people, setPeople] = useState(1000);
  const [rates, setRates] = useState<Record<string, number>>({ visit: 20, try: 40, pay: 30 });

  const counts: number[] = [];
  steps.forEach((step, index) => {
    counts.push(index === 0 ? people : Math.round(counts[index - 1] * (rates[step.id] / 100)));
  });

  const leaks = steps.slice(1).map((step, i) => ({ step, lost: counts[i] - counts[i + 1], rate: rates[step.id] }));
  const worst = leaks.reduce((a, b) => (b.rate < a.rate ? b : a));

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Lab · play with ideas</p>
        <h2 className="mt-1 text-3xl font-bold md:text-4xl">Leaky funnel 🪣</h2>
        <p className="mt-1 max-w-2xl text-text-secondary">Customers drop off at every step, like water leaking from a pipe. Find the biggest leak and fix it first.</p>
      </div>

      <NovaSays>
        Out of everyone who sees you, how many end up paying? That&apos;s your <Term id="conversion">conversion rate</Term>.
      </NovaSays>

      <div className="glass rounded-card border-t-4 border-t-pink p-5 md:p-7">
        <label htmlFor="people" className="flex items-center justify-between font-semibold">
          <span>👀 People who see your poster</span>
          <span className="font-display text-2xl">{people.toLocaleString("en-IN")}</span>
        </label>
        <input id="people" type="range" min={100} max={5000} step={100} value={people} onChange={(event) => setPeople(Number(event.target.value))} className="mt-2 w-full" />

        <div className="mt-6 space-y-4">
          {steps.map((step, index) => (
            <div key={step.id}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-semibold">
                  {step.emoji} {step.label}
                </span>
                <span className="font-display text-lg font-bold">{counts[index].toLocaleString("en-IN")} people</span>
              </div>
              <div className="h-8 overflow-hidden rounded-full bg-white/10">
                <div className={cn("h-full rounded-full transition-all duration-500", step.colour)} style={{ width: `${Math.max(2, (counts[index] / people) * 100)}%` }} />
              </div>
              {index > 0 ? (
                <label className="mt-2 flex items-center gap-3 text-sm text-text-secondary">
                  <span className="w-48 shrink-0">Out of the step before: {rates[step.id]}%</span>
                  <input
                    type="range"
                    min={1}
                    max={100}
                    value={rates[step.id]}
                    onChange={(event) => setRates((current) => ({ ...current, [step.id]: Number(event.target.value) }))}
                    className="w-full"
                    aria-label={`Percent who ${step.label.toLowerCase()}`}
                  />
                </label>
              ) : null}
            </div>
          ))}
        </div>

        <div className="box-oops mt-6 rounded-control p-4">
          <p className="font-semibold">
            🪣 Biggest leak: “{worst.step.label}” — {worst.lost.toLocaleString("en-IN")} people lost here
          </p>
          <p className="mt-1 text-text-secondary">{fixes[worst.step.id]}</p>
        </div>
        <p className="mt-4 text-sm text-text-secondary">
          Overall: {counts[3].toLocaleString("en-IN")} of {people.toLocaleString("en-IN")} people become paying customers ({((counts[3] / people) * 100).toFixed(1)}%).
        </p>
      </div>
    </div>
  );
}
