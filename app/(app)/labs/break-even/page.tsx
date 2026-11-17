"use client";

import { useState } from "react";
import Link from "next/link";

import { NovaSays } from "@/components/nova";
import { Term } from "@/components/term";
import { ProgressBar } from "@/components/ui/progress-bar";
import { calculateBreakEven } from "@/lib/sim/engine";

function rupees(value: number) {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

export default function BreakEvenLabPage() {
  const [rent, setRent] = useState(9000);
  const [price, setPrice] = useState(15);
  const [cupsPerDay, setCupsPerDay] = useState(40);
  const costPerCup = 8;

  const cupsNeededMonth = calculateBreakEven(rent, price, costPerCup);
  const cupsNeededDay = Number.isFinite(cupsNeededMonth) ? Math.ceil(cupsNeededMonth / 30) : Infinity;
  const monthProfit = (price - costPerCup) * cupsPerDay * 30 - rent;
  const reached = Number.isFinite(cupsNeededDay) && cupsPerDay >= cupsNeededDay;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Lab · play with numbers</p>
          <h2 className="mt-1 text-3xl font-bold md:text-4xl">Break-even Lab ⚖️</h2>
          <p className="mt-1 max-w-2xl text-text-secondary">How many cups must Ravi sell so he doesn’t lose money?</p>
        </div>
        <Link href="/labs/pricing" className="text-sm font-semibold text-sunshine hover:underline">
          ← Price Lab
        </Link>
      </div>

      <NovaSays>
        <Term id="break-even">Break-even</Term> means: money in = money out. No loss, no profit. After that point, every cup is profit! 🎉
      </NovaSays>

      <div className="glass grid gap-6 rounded-card border-t-4 border-t-teal p-5 md:grid-cols-2 md:p-7">
        <div className="space-y-5">
          <Slider id="rent" label="Shop rent per month" value={rupees(rent)} min={2000} max={30000} step={500} current={rent} onChange={setRent} />
          <Slider id="price" label="Price of one cup" value={rupees(price)} min={9} max={30} step={1} current={price} onChange={setPrice} />
          <Slider id="cups" label="Cups Ravi sells each day" value={`${cupsPerDay}`} min={0} max={150} step={5} current={cupsPerDay} onChange={setCupsPerDay} />
          <p className="text-sm text-text-muted">Each cup costs {rupees(costPerCup)} to make.</p>
        </div>

        <div className="space-y-4">
          <div className="rounded-control bg-teal/15 p-4">
            <p className="text-sm text-text-secondary">Cups needed each day to break even</p>
            <p className="font-display text-4xl font-bold text-teal">{Number.isFinite(cupsNeededDay) ? cupsNeededDay : "—"}</p>
            <p className="text-xs text-text-muted">
              Each cup leaves {rupees(price - costPerCup)} to help pay the rent.
            </p>
          </div>
          <div>
            <div className="mb-1 flex justify-between text-sm">
              <span>Ravi sells {cupsPerDay} a day</span>
              <span>{reached ? "✅ Breaking even!" : "Not there yet"}</span>
            </div>
            <ProgressBar value={Number.isFinite(cupsNeededDay) && cupsNeededDay > 0 ? (cupsPerDay / cupsNeededDay) * 100 : 0} barClassName={reached ? "bg-gradient-to-r from-mint to-teal" : undefined} />
          </div>
          <div className={reached ? "box-remember rounded-control p-4" : "box-oops rounded-control p-4"}>
            <p className="font-semibold">{monthProfit >= 0 ? `Profit this month: ${rupees(monthProfit)} 🎉` : `Loss this month: ${rupees(-monthProfit)} 😟`}</p>
            <p className="text-sm text-text-secondary">
              {reached ? "Every extra cup now is profit." : "Sell more cups, raise the price a little, or find cheaper rent."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slider({
  id,
  label,
  value,
  min,
  max,
  step,
  current,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  current: number;
  onChange: (value: number) => void;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="flex items-center justify-between">
        <span className="font-semibold">{label}</span>
        <span className="font-display text-xl font-bold">{value}</span>
      </span>
      <input id={id} type="range" min={min} max={max} step={step} value={current} onChange={(event) => onChange(Number(event.target.value))} className="mt-2 w-full" />
    </label>
  );
}
