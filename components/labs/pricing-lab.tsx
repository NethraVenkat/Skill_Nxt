"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PricingLab() {
  const [price, setPrice] = useState(699);
  const [variableCost, setVariableCost] = useState(220);
  const [targetCustomers, setTargetCustomers] = useState(40);

  const metrics = useMemo(() => {
    const contribution = price - variableCost;
    const monthlyRevenue = price * targetCustomers;
    const monthlyContribution = contribution * targetCustomers;
    const breakEven = Math.max(1, Math.ceil(90000 / contribution));
    const conversion = Math.min(18, Math.max(2, (1200 / price) * 8));

    return { contribution, monthlyRevenue, monthlyContribution, breakEven, conversion };
  }, [price, targetCustomers, variableCost]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing Lab</CardTitle>
        <Button variant="secondary" size="sm" onClick={() => { setPrice(699); setVariableCost(220); setTargetCustomers(40); }}>Reset</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <label className="block text-sm text-text-secondary">
            Price
            <input className="mt-2 w-full" type="range" min="100" max="1500" value={price} onChange={(event) => setPrice(Number(event.target.value))} />
            <span className="mt-1 block text-text">₹{price}</span>
          </label>

          <label className="block text-sm text-text-secondary">
            Variable cost per customer
            <input className="mt-2 w-full" type="range" min="50" max="500" value={variableCost} onChange={(event) => setVariableCost(Number(event.target.value))} />
            <span className="mt-1 block text-text">₹{variableCost}</span>
          </label>

          <label className="block text-sm text-text-secondary">
            Target customers
            <input className="mt-2 w-full" type="range" min="10" max="200" value={targetCustomers} onChange={(event) => setTargetCustomers(Number(event.target.value))} />
            <span className="mt-1 block text-text">{targetCustomers} customers</span>
          </label>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-control border border-border bg-tint p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Contribution</p>
            <p className="mt-2 text-xl font-semibold text-text">₹{metrics.contribution}</p>
          </div>
          <div className="rounded-control border border-border bg-tint p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Revenue</p>
            <p className="mt-2 text-xl font-semibold text-text">₹{metrics.monthlyRevenue}</p>
          </div>
          <div className="rounded-control border border-border bg-tint p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-text-muted">Break-even</p>
            <p className="mt-2 text-xl font-semibold text-text">{metrics.breakEven} users</p>
          </div>
        </div>

        <div className="mt-4 rounded-control border border-primary/40 bg-primary/5 p-4 text-sm text-text-secondary">
          Aha moment: a lower price can attract more customers, but if the contribution margin is too thin, the company reaches break-even later.
        </div>
      </CardContent>
    </Card>
  );
}
