"use client";

import { useState } from "react";
import Link from "next/link";

import { NovaSays } from "@/components/nova";
import { Term } from "@/components/term";
import { cn } from "@/lib/utils";

const COST_PER_CUP = 8; // milk, tea, sugar, gas for one cup

/** Simple pretend demand: the higher the price, the fewer people buy. */
function cupsSold(price: number) {
  return Math.max(0, Math.round(240 - price * 8));
}

function rupees(value: number) {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

export default function PricingLabPage() {
  const [price, setPrice] = useState(12);
  const cups = cupsSold(price);
  const revenue = price * cups;
  const costs = COST_PER_CUP * cups;
  const profit = revenue - costs;

  const best = Array.from({ length: 23 }, (_, i) => i + 8).reduce((top, p) => {
    const value = (p - COST_PER_CUP) * cupsSold(p);
    return value > top.value ? { price: p, value } : top;
  }, { price: 8, value: -Infinity });

  const message =
    profit <= 0
      ? "Uh-oh! At this price Ravi doesn't make any money. 😟"
      : price === best.price
        ? "🎉 You found the best price! Most profit for Ravi."
        : price < best.price
          ? "Lots of customers, but each cup earns very little. Try a bit higher."
          : "Each cup earns more, but many people stop buying. Try a bit lower.";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Lab · play with numbers</p>
          <h2 className="mt-1 text-3xl font-bold md:text-4xl">Price Lab: Ravi’s chai stall ☕</h2>
          <p className="mt-1 max-w-2xl text-text-secondary">Find the price that makes Ravi the most money. Too cheap or too costly — both are a problem!</p>
        </div>
        <Link href="/labs/break-even" className="text-sm font-semibold text-sunshine hover:underline">
          Next lab: Break-even →
        </Link>
      </div>

      <NovaSays>
        Each cup costs Ravi {rupees(COST_PER_CUP)} to make. Whatever is left after that is his <Term id="profit">profit</Term>.
      </NovaSays>

      <div className="glass rounded-card border-t-4 border-t-orange p-5 md:p-7">
        <label htmlFor="price" className="flex items-center justify-between">
          <span className="font-semibold">Price of one cup</span>
          <span className="font-display text-3xl font-bold text-orange">{rupees(price)}</span>
        </label>
        <input id="price" type="range" min={5} max={30} value={price} onChange={(event) => setPrice(Number(event.target.value))} className="mt-3 w-full" />
        <div className="mt-1 flex justify-between text-xs text-text-muted">
          <span>Cheap</span>
          <span>Costly</span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Box label="Cups sold a day" value={`${cups}`} colour="text-sky" bg="bg-sky/15" />
          <Box label={<Term id="revenue">Money in</Term>} value={rupees(revenue)} colour="text-mint" bg="bg-mint/15" />
          <Box label={<Term id="cost">Costs</Term>} value={rupees(costs)} colour="text-coral" bg="bg-coral/15" />
          <Box label={<Term id="profit">Profit</Term>} value={rupees(profit)} colour={profit > 0 ? "text-sunshine" : "text-coral"} bg="bg-sunshine/15" />
        </div>

        <p className={cn("pop mt-5 rounded-control p-4 font-medium", profit > 0 && price === best.price ? "box-remember" : profit <= 0 ? "box-oops" : "box-simple")} key={message}>
          {message}
        </p>

        <div className="mt-5 rounded-control bg-white/5 p-4 text-sm text-text-secondary">
          <p className="font-semibold text-text">How it works</p>
          <p className="mt-1">
            Money in = price × cups. Costs = {rupees(COST_PER_CUP)} × cups. Profit = money in − costs.
          </p>
        </div>
      </div>

      <div className="box-remember rounded-card p-5">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-mint">Remember this</p>
        <p className="mt-1 font-display text-xl font-bold">The best price is not the cheapest or the costliest — it’s the one that leaves the most profit.</p>
      </div>
    </div>
  );
}

function Box({ label, value, colour, bg }: { label: React.ReactNode; value: string; colour: string; bg: string }) {
  return (
    <div className={cn("rounded-control p-3", bg)}>
      <p className="text-xs text-text-secondary">{label}</p>
      <p className={cn("font-display text-xl font-bold", colour)}>{value}</p>
    </div>
  );
}
