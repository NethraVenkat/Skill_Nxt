"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BreakEvenMachine() {
  const [fixedBurn, setFixedBurn] = useState(90000);
  const [price, setPrice] = useState(599);
  const [variableCost, setVariableCost] = useState(240);
  const [targetProfit, setTargetProfit] = useState(20000);

  const metrics = useMemo(() => {
    const contribution = price - variableCost;
    const breakEven = contribution <= 0 ? Number.POSITIVE_INFINITY : Math.ceil((fixedBurn + targetProfit) / contribution);
    const monthlyProfit = (price - variableCost) * 40 - fixedBurn;

    return { contribution, breakEven, monthlyProfit };
  }, [fixedBurn, price, targetProfit, variableCost]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Break-even Machine</CardTitle>
        <Button variant="secondary" size="sm" onClick={() => { setFixedBurn(90000); setPrice(599); setVariableCost(240); setTargetProfit(20000); }}>Reset</Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
          <div className="space-y-4">
            <label className="block text-sm text-text-secondary">
              Fixed monthly burn
              <input className="mt-2 w-full" type="range" min="20000" max="500000" step="5000" value={fixedBurn} onChange={(event) => setFixedBurn(Number(event.target.value))} />
              <span className="mt-1 block text-text">₹{fixedBurn.toLocaleString("en-IN")}</span>
            </label>
            <label className="block text-sm text-text-secondary">
              Price
              <input className="mt-2 w-full" type="range" min="100" max="2000" value={price} onChange={(event) => setPrice(Number(event.target.value))} />
              <span className="mt-1 block text-text">₹{price}</span>
            </label>
            <label className="block text-sm text-text-secondary">
              Variable cost
              <input className="mt-2 w-full" type="range" min="50" max="800" value={variableCost} onChange={(event) => setVariableCost(Number(event.target.value))} />
              <span className="mt-1 block text-text">₹{variableCost}</span>
            </label>
            <label className="block text-sm text-text-secondary">
              Target profit
              <input className="mt-2 w-full" type="range" min="0" max="100000" step="5000" value={targetProfit} onChange={(event) => setTargetProfit(Number(event.target.value))} />
              <span className="mt-1 block text-text">₹{targetProfit.toLocaleString("en-IN")}</span>
            </label>
          </div>

          <div className="rounded-control border border-primary/40 bg-primary/5 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Break-even</p>
            <h4 className="mt-2 text-xl font-semibold text-text">{Number.isFinite(metrics.breakEven) ? `${metrics.breakEven} users` : "No finite break-even"}</h4>
            <div className="mt-4 space-y-2 text-sm text-text-secondary">
              <p>Contribution margin: ₹{metrics.contribution}</p>
              <p>Monthly profit at 40 customers: ₹{metrics.monthlyProfit}</p>
            </div>
            <p className="mt-4 text-sm text-text-secondary">
              Aha moment: revenue is not profit. Small changes in contribution margin can move break-even sharply.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
