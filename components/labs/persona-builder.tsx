"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const traitOptions = [
  "college student",
  "hostel resident",
  "working professional",
  "busy parent",
  "tight budget",
  "wants things on time",
  "good with phones",
  "always on the move",
];

export function PersonaBuilder() {
  const [selectedTraits, setSelectedTraits] = useState<string[]>(["college student", "hostel resident", "tight budget"]);
  const [budget, setBudget] = useState(3000);

  const quote = useMemo(() => {
    const base = selectedTraits.includes("college student") || selectedTraits.includes("hostel resident")
      ? "I need something that saves time before class."
      : selectedTraits.includes("working professional")
        ? "I need a service that is reliable and does not waste my time."
        : "I want a service that feels dependable and easy to trust.";

    const budgetLine = budget <= 1500 ? "I want the lowest price, but it must work." : "I can pay for reliability if it saves me time.";
    return `${base} ${budgetLine}`;
  }, [budget, selectedTraits]);

  const toggleTrait = (trait: string) => {
    setSelectedTraits((current) =>
      current.includes(trait) ? current.filter((item) => item !== trait) : [...current, trait],
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>🧑‍🎓 Make a customer card</CardTitle>
              </CardHeader>
      <CardContent>
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="mb-2 text-sm text-text-secondary">Tap to describe your customer:</p>
            <div className="flex flex-wrap gap-2">
              {traitOptions.map((trait) => (
                <button
                  key={trait}
                  type="button"
                  className={`rounded-full border px-3 py-2 text-sm ${selectedTraits.includes(trait) ? "border-sky bg-sky/20 text-text" : "border-white/15 bg-white/5 text-text-secondary"}`}
                  onClick={() => toggleTrait(trait)}
                >
                  {trait}
                </button>
              ))}
            </div>
            <label className="mt-5 block text-sm text-text-secondary">
              💰 Money they can spend each month
              <input className="mt-2 w-full" type="range" min="500" max="10000" step="100" value={budget} onChange={(event) => setBudget(Number(event.target.value))} />
              <span className="mt-1 block text-text">₹{budget.toLocaleString("en-IN")}</span>
            </label>
          </div>

          <div className="rounded-control border border-sky/40 bg-sky/10 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky">Your customer card</p>
            <h4 className="mt-2 text-xl font-semibold text-text">Hostel student</h4>
            <p className="mt-3 text-sm italic text-text">“{quote}”</p>
            <div className="mt-4 rounded-control border border-white/10 bg-white/5 p-3 text-sm text-text-secondary">
              <p>✅ Wants: fast, on time, not too costly</p>
              <p>⏰ Ouch moment: no clean clothes before class</p>
              <p>🔧 What they do today: borrow clothes or wash by hand</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
