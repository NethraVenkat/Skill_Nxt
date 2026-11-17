"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ValidationTestLab() {
  const [headline, setHeadline] = useState("Reliable laundry pickup for hostel students.");
  const [price, setPrice] = useState(299);
  const [channel, setChannel] = useState("campus whatsapp");
  const [budget, setBudget] = useState(5000);

  const result = useMemo(() => {
    const channelMultiplier: Record<string, number> = {
      "campus whatsapp": 0.26,
      instagram: 0.18,
      referral: 0.38,
      "local poster": 0.12,
    };

    const base = budget * (channelMultiplier[channel] ?? 0.2) * (price <= 300 ? 1.2 : 0.8);
    const signUps = Math.round(base / 20);
    const likelyPaying = Math.min(signUps, Math.max(2, Math.round(signUps * 0.18)));
    const signal = likelyPaying >= 8 ? "🎉 Strong sign — people really want this!" : likelyPaying >= 4 ? "🙂 Promising, but test a bit more" : "😕 Not enough proof yet";

    return { signUps, likelyPaying, signal };
  }, [budget, channel, price]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>✅ Test your idea</CardTitle>
        <Button variant="secondary" size="sm" onClick={() => { setHeadline("Reliable laundry pickup for hostel students."); setPrice(299); setChannel("campus whatsapp"); setBudget(5000); }}>Reset</Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
          <div className="space-y-4">
            <label className="block text-sm text-text-secondary">
              📝 Your one-line message (what you’ll post)
              <input className="mt-2 w-full rounded-control border border-white/15 bg-surface/80 px-3 py-2 text-text" value={headline} onChange={(event) => setHeadline(event.target.value)} />
            </label>
            <label className="block text-sm text-text-secondary">
              🏷️ Price you ask for
              <input className="mt-2 w-full" type="range" min="100" max="700" value={price} onChange={(event) => setPrice(Number(event.target.value))} />
              <span className="mt-1 block text-text">₹{price}</span>
            </label>
            <label className="block text-sm text-text-secondary">
              📣 Where you’ll share it
              <select className="mt-2 w-full rounded-control border border-white/15 bg-surface/80 px-3 py-2 text-text" value={channel} onChange={(event) => setChannel(event.target.value)}>
                <option value="campus whatsapp">Campus WhatsApp</option>
                <option value="instagram">Instagram</option>
                <option value="referral">Referral</option>
                <option value="local poster">Local poster</option>
              </select>
            </label>
            <label className="block text-sm text-text-secondary">
              💸 Money you spend on the test
              <input className="mt-2 w-full" type="range" min="1000" max="20000" step="500" value={budget} onChange={(event) => setBudget(Number(event.target.value))} />
              <span className="mt-1 block text-text">₹{budget.toLocaleString("en-IN")}</span>
            </label>
          </div>

          <div className="rounded-control border border-mint/40 bg-mint/10 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-mint">What will probably happen</p>
            <h4 className="mt-2 text-xl font-semibold text-text">{result.signal}</h4>
            <div className="mt-4 space-y-2 text-sm text-text-secondary">
              <p>🙋 People who sign up: <strong className="text-text">{result.signUps}</strong></p>
              <p>💰 People who actually pay: <strong className="text-text">{result.likelyPaying}</strong></p>
            </div>
            <p className="mt-4 text-sm text-text-secondary">
              Remember: sign-ups are easy and free. The number that matters most is how many people actually pay.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
