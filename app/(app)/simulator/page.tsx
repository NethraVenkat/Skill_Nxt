"use client";

import { useState } from "react";
import { PiggyBank, PlaneTakeoff, RotateCcw, Smile, Users } from "lucide-react";

import { NovaSays } from "@/components/nova";
import { Term } from "@/components/term";
import { Button } from "@/components/ui/button";
import { StatTile } from "@/components/ui/stat-tile";
import { applyDecisionDelta, createStartingCompanyState, type CompanyDelta, type CompanyState } from "@/lib/sim/engine";
import { cn } from "@/lib/utils";

type Choice = { emoji: string; label: string; why: string; delta: CompanyDelta };

/* One small decision each month. Effects are simple on purpose so learners can see cause → effect. */
const months: { story: string; choices: Choice[] }[] = [
  {
    story: "Month 1: You have an idea for on-time laundry pickup. What do you do first?",
    choices: [
      { emoji: "🎤", label: "Talk to 10 students", why: "Cheap, and you learn what people really need.", delta: { cashDelta: -5000, evidenceDelta: 15, moraleDelta: 3 } },
      { emoji: "📱", label: "Build a full app", why: "Expensive, and you still don't know if people want it.", delta: { cashDelta: -150000, burnDelta: 10000, moraleDelta: 5 } },
      { emoji: "🎨", label: "Design a logo", why: "Looks nice, but doesn't prove anything yet.", delta: { cashDelta: -20000, moraleDelta: 2 } },
    ],
  },
  {
    story: "Month 2: Students say laundry gets lost and late. How do you test your idea?",
    choices: [
      { emoji: "💬", label: "Take orders on WhatsApp", why: "A tiny test that costs almost nothing.", delta: { cashDelta: -3000, customersDelta: 8, revenueDelta: 4000, evidenceDelta: 12 } },
      { emoji: "📢", label: "Spend ₹80,000 on ads", why: "Lots of money before you know what works.", delta: { cashDelta: -80000, customersDelta: 10, revenueDelta: 5000 } },
      { emoji: "⏳", label: "Wait and plan more", why: "Planning is safe, but you learn nothing new.", delta: { moraleDelta: -5 } },
    ],
  },
  {
    story: "Month 3: 8 students are using your service. What price do you set?",
    choices: [
      { emoji: "🏷️", label: "₹199 a month", why: "Fair for students. Most stay.", delta: { customersDelta: 12, revenueDelta: 6000, evidenceDelta: 8 } },
      { emoji: "💎", label: "₹999 a month", why: "Too costly for hostel budgets. Many leave.", delta: { customersDelta: -5, revenueDelta: 2000, moraleDelta: -3 } },
      { emoji: "🆓", label: "Free forever", why: "Lots of users, but no money comes in.", delta: { customersDelta: 25, revenueDelta: -10000, moraleDelta: 2 } },
    ],
  },
  {
    story: "Month 4: You're busy! Do you hire help?",
    choices: [
      { emoji: "🤝", label: "Hire 1 part-time helper", why: "Small cost, happier team, faster service.", delta: { burnDelta: 12000, moraleDelta: 8, customersDelta: 6, revenueDelta: 3000 } },
      { emoji: "👥", label: "Hire 5 full-time staff", why: "Big monthly cost before you are ready.", delta: { burnDelta: 90000, moraleDelta: 4 } },
      { emoji: "😓", label: "Do everything yourself", why: "Saves money, but you get tired.", delta: { moraleDelta: -10 } },
    ],
  },
];

function rupees(value: number) {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

function passMonth(state: CompanyState): CompanyState {
  // Each month: money from customers comes in, monthly costs go out.
  return applyDecisionDelta(state, { cashDelta: state.monthlyRevenue - state.burn });
}

export default function SimulatorPage() {
  const [state, setState] = useState<CompanyState>(createStartingCompanyState());
  const [month, setMonth] = useState(0);
  const [last, setLast] = useState<{ choice: Choice; before: CompanyState; after: CompanyState } | null>(null);

  const finished = month >= months.length;

  const pick = (choice: Choice) => {
    const before = state;
    const after = passMonth(applyDecisionDelta(state, choice.delta));
    setState(after);
    setLast({ choice, before, after });
    setMonth((value) => value + 1);
  };

  const restart = () => {
    setState(createStartingCompanyState());
    setMonth(0);
    setLast(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Practice playground</p>
          <h2 className="mt-1 text-3xl font-bold md:text-4xl">Run your pretend company 🎮</h2>
          <p className="mt-1 max-w-2xl text-text-secondary">One choice per month. Watch what happens to your money, customers and team.</p>
        </div>
        <Button variant="secondary" onClick={restart}>
          <RotateCcw size={16} /> Start again
        </Button>
      </div>

      <NovaSays>
        Each month, money from <Term id="customer">customers</Term> comes in and your monthly costs (<Term id="burn">burn</Term>) go out. Try to keep your <Term id="runway">runway</Term> long!
      </NovaSays>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatTile accent="mint" icon={<PiggyBank size={16} />} label={<Term id="cash">Cash</Term>} value={rupees(state.cash)} hint="Money in the bank" />
        <StatTile accent="sky" icon={<PlaneTakeoff size={16} />} label={<Term id="runway">Runway</Term>} value={Number.isFinite(state.runway) ? `${state.runway.toFixed(1)} months` : "Forever 🎉"} hint="How long money lasts" />
        <StatTile accent="coral" icon={<Users size={16} />} label={<Term id="customer">Customers</Term>} value={`${state.customers}`} hint={`Bringing in ${rupees(Math.max(0, state.monthlyRevenue))} a month`} />
        <StatTile accent="pink" icon={<Smile size={16} />} label={<Term id="morale">Team mood</Term>} value={`${state.morale} / 100`} hint="Happy teams work better" />
      </div>

      {last ? (
        <div className={cn("pop rounded-card p-4", last.after.cash >= last.before.cash - 20000 ? "box-remember" : "box-oops")}>
          <p className="font-semibold">
            You chose {last.choice.emoji} {last.choice.label}
          </p>
          <p className="text-text-secondary">{last.choice.why}</p>
          <p className="mt-1 text-sm">
            Cash went from <strong>{rupees(last.before.cash)}</strong> to <strong>{rupees(last.after.cash)}</strong>.
          </p>
        </div>
      ) : null}

      {!finished ? (
        <section className="glass rise-in rounded-card border-t-4 border-t-mint p-5 md:p-7" key={month}>
          <p className="eyebrow">
            Month {month + 1} of {months.length}
          </p>
          <h3 className="mt-2 text-2xl font-bold">{months[month].story}</h3>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {months[month].choices.map((choice) => (
              <button
                key={choice.label}
                type="button"
                onClick={() => pick(choice)}
                className="rounded-control border border-white/15 bg-white/5 p-4 text-left transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10"
              >
                <span className="text-3xl" aria-hidden="true">
                  {choice.emoji}
                </span>
                <p className="mt-2 font-semibold">{choice.label}</p>
              </button>
            ))}
          </div>
        </section>
      ) : (
        <section className="glass rounded-card border-t-4 border-t-sunshine p-6 text-center">
          <p className="text-5xl" aria-hidden="true">
            🏁
          </p>
          <h3 className="mt-2 text-2xl font-bold">4 months done!</h3>
          <p className="mx-auto mt-2 max-w-xl text-text-secondary">
            You ended with {rupees(state.cash)} cash and {state.customers} customers. Try again with different choices and see how the story changes!
          </p>
          <Button className="mt-4" onClick={restart}>
            <RotateCcw size={16} /> Play again
          </Button>
        </section>
      )}
    </div>
  );
}
