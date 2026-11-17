"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initialProblems = [
  { name: "Late laundry pickup", frequency: 4, pain: 5, willingness: 4, solvability: 3 },
  { name: "No clean clothes before class", frequency: 3, pain: 5, willingness: 4, solvability: 4 },
  { name: "Hard to find trusted service", frequency: 5, pain: 3, willingness: 3, solvability: 2 },
];

export function ProblemFinderLab() {
  const [problems, setProblems] = useState(initialProblems);

  const ranked = useMemo(
    () =>
      [...problems]
        .map((problem) => ({
          ...problem,
          score: problem.frequency + problem.pain + problem.willingness + (6 - problem.solvability),
        }))
        .sort((a, b) => b.score - a.score),
    [problems],
  );

  const updateProblem = (index: number, field: keyof (typeof initialProblems)[number], value: number) => {
    setProblems((current) => current.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>🧩 Problem Scorer</CardTitle>
        <Button variant="secondary" size="sm" onClick={() => setProblems(initialProblems)}>Reset</Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-4">
            {problems.map((problem, index) => (
              <div key={problem.name} className="rounded-control border border-white/10 bg-white/5 p-3">
                <p className="mb-3 font-medium text-text">{problem.name}</p>
                <div className="space-y-2 text-sm text-text-secondary">
                  <label className="block">
                    ⏰ How often does it happen? <span className="text-text-muted">(1 = rarely, 5 = every day): {problem.frequency}</span>
                    <input className="mt-1 w-full" type="range" min="1" max="5" value={problem.frequency} onChange={(event) => updateProblem(index, "frequency", Number(event.target.value))} />
                  </label>
                  <label className="block">
                    😣 How much does it hurt? <span className="text-text-muted">(1 = a little, 5 = a lot): {problem.pain}</span>
                    <input className="mt-1 w-full" type="range" min="1" max="5" value={problem.pain} onChange={(event) => updateProblem(index, "pain", Number(event.target.value))} />
                  </label>
                  <label className="block">
                    💰 Would people pay to fix it? <span className="text-text-muted">(1 = no, 5 = yes!): {problem.willingness}</span>
                    <input className="mt-1 w-full" type="range" min="1" max="5" value={problem.willingness} onChange={(event) => updateProblem(index, "willingness", Number(event.target.value))} />
                  </label>
                  <label className="block">
                    🛠️ How easy is it to fix today? <span className="text-text-muted">(1 = very hard, 5 = very easy): {problem.solvability}</span>
                    <input className="mt-1 w-full" type="range" min="1" max="5" value={problem.solvability} onChange={(event) => updateProblem(index, "solvability", Number(event.target.value))} />
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-control border border-sunshine/40 bg-sunshine/10 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sunshine">The winner</p>
            <h4 className="mt-2 text-xl font-semibold text-text">🏆 {ranked[0].name}</h4>
            <ol className="mt-4 space-y-3">
              {ranked.map((problem, index) => (
                <li key={problem.name} className="flex items-center justify-between rounded-control border border-white/10 bg-white/5 p-2 text-sm text-text-secondary">
                  <span>
                    {index + 1}. {problem.name}
                  </span>
                  <span className="font-semibold text-text">{problem.score}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm text-text-secondary">
              Move the sliders and watch the list change. The best problem happens often, hurts a lot, people would pay to fix it — and it is hard to fix today. Total score = all four added up.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
