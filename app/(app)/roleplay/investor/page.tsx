"use client";

import { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";

import { NovaSays } from "@/components/nova";
import { Term } from "@/components/term";
import { cn } from "@/lib/utils";

const parts = [
  { id: "who", label: "1. Who has the problem?", placeholder: "hostel students on my campus", start: "Hi! I'm working on a problem faced by" },
  { id: "problem", label: "2. What is the problem?", placeholder: "laundry comes back late, so they miss class in dirty uniforms", start: "Their problem is:" },
  { id: "proof", label: "3. What proof do you have?", placeholder: "8 out of 10 students I talked to said it happened last month", start: "I know it's real because" },
  { id: "solution", label: "4. How do you help?", placeholder: "a Sunday-evening pickup that is back by Monday 7 am", start: "My idea is" },
  { id: "ask", label: "5. What do you need?", placeholder: "₹20,000 to run a 1-month test with 30 students", start: "To start, I need" },
] as const;

const checks = [
  "I said it out loud in under 60 seconds",
  "A friend could repeat my idea back to me",
  "I used at least one real number",
  "I didn't use any hard business words",
];

export default function PitchPracticePage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [ticked, setTicked] = useState<string[]>([]);

  const script = parts
    .map((part) => `${part.start} ${(values[part.id] ?? "").trim() || `[${part.placeholder}]`}.`)
    .join(" ");
  const filled = parts.filter((part) => (values[part.id] ?? "").trim()).length;
  const wordCount = script.split(/\s+/).length;

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Practise talking</p>
        <h2 className="mt-1 text-3xl font-bold md:text-4xl">Pitch practice 🎙️</h2>
        <p className="mt-1 max-w-2xl text-text-secondary">Build a 30-second <Term id="pitch">pitch</Term> in 5 easy lines. Then say it out loud!</p>
      </div>

      <NovaSays>A good pitch is short and simple: who has the problem, what the problem is, your proof, your idea, and what you need.</NovaSays>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="glass space-y-4 rounded-card border-t-4 border-t-teal p-5">
          {parts.map((part) => (
            <label key={part.id} className="block">
              <span className="font-semibold">{part.label}</span>
              <input
                value={values[part.id] ?? ""}
                onChange={(event) => setValues((current) => ({ ...current, [part.id]: event.target.value }))}
                placeholder={`e.g. ${part.placeholder}`}
                className="mt-1 w-full rounded-control border border-white/15 bg-surface/80 px-3 py-2 text-sm text-text placeholder:text-text-muted"
              />
            </label>
          ))}
        </section>

        <section className="space-y-4">
          <div className="glass rounded-card p-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal">Your pitch script · {filled} of 5 lines done</p>
            <p className="mt-3 font-display text-lg leading-relaxed">{script}</p>
            <p className={cn("mt-3 text-sm", wordCount <= 90 ? "text-mint" : "text-sunshine")}>
              {wordCount} words · {wordCount <= 90 ? "✅ Short enough for 30–40 seconds" : "⚠️ A bit long — try cutting some words"}
            </p>
          </div>
          <div className="glass rounded-card p-5">
            <p className="font-semibold">After you practise, tick what’s true:</p>
            <div className="mt-3 space-y-2">
              {checks.map((check) => {
                const on = ticked.includes(check);
                return (
                  <button
                    key={check}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setTicked((current) => (on ? current.filter((item) => item !== check) : [...current, check]))}
                    className={cn("flex w-full items-center gap-2 rounded-control border px-3 py-2 text-left text-sm", on ? "border-mint bg-mint/15" : "border-white/15 bg-white/5")}
                  >
                    {on ? <CheckCircle2 size={18} className="text-mint" /> : <Circle size={18} className="text-text-muted" />} {check}
                  </button>
                );
              })}
            </div>
            {ticked.length === checks.length ? <p className="pop mt-3 font-semibold text-mint">🎉 You&apos;re ready to pitch on Demo Day!</p> : null}
          </div>
        </section>
      </div>
    </div>
  );
}
