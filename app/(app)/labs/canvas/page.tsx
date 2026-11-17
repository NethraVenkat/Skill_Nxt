"use client";

import { useState } from "react";

import { NovaSays } from "@/components/nova";
import { cn } from "@/lib/utils";

const boxes = [
  { id: "who", emoji: "🙋", title: "Who is it for?", hint: "One clear group, e.g. hostel students on my campus", colour: "border-sky/50 bg-sky/10", text: "text-sky" },
  { id: "problem", emoji: "🧩", title: "What problem do they have?", hint: "e.g. laundry comes back late, so no clean uniform for class", colour: "border-coral/50 bg-coral/10", text: "text-coral" },
  { id: "solution", emoji: "💡", title: "How do you help?", hint: "e.g. pickup every Sunday at 6 pm, back by Monday 7 am", colour: "border-sunshine/50 bg-sunshine/10", text: "text-sunshine" },
  { id: "reach", emoji: "📣", title: "How will they find you?", hint: "e.g. hostel WhatsApp group and a poster near the mess", colour: "border-pink/50 bg-pink/10", text: "text-pink" },
  { id: "money", emoji: "💰", title: "How do you earn money?", hint: "e.g. ₹199 a month per student", colour: "border-mint/50 bg-mint/10", text: "text-mint" },
  { id: "proof", emoji: "🔍", title: "What proof do you have?", hint: "e.g. 5 students told me this happened last week", colour: "border-violet/50 bg-violet/10", text: "text-violet" },
] as const;

const vagueWords = ["everyone", "all people", "anyone", "everybody", "app", "better", "good", "nice"];

function check(id: string, value: string): string | null {
  const text = value.trim().toLowerCase();
  if (!text) return "Empty — fill this in.";
  if (text.split(/\s+/).length < 4) return "A bit short. Add one more detail.";
  if (id === "who" && /(everyone|all people|anyone|everybody)/.test(text)) return "\"Everyone\" is too wide. Pick one group.";
  if (id === "money" && !/(₹|rs|rupee|\d)/.test(text)) return "Add a number — how much will they pay?";
  if (id === "proof" && !/\d/.test(text)) return "Add a number — how many people told you?";
  if (vagueWords.some((word) => text === word)) return "Too vague. Be specific.";
  return null;
}

export default function IdeaMapPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const results = boxes.map((box) => ({ box, warning: check(box.id, values[box.id] ?? "") }));
  const ready = results.filter((result) => !result.warning).length;

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Lab · play with ideas</p>
        <h2 className="mt-1 text-3xl font-bold md:text-4xl">Idea map 🗺️</h2>
        <p className="mt-1 max-w-2xl text-text-secondary">Your whole idea on one page. Fill the 6 boxes in a few words each — the map tells you which parts are still weak.</p>
      </div>

      <NovaSays>
        Strong ideas answer all 6 questions clearly. You have {ready} of 6 strong boxes {ready === 6 ? "— amazing! 🎉" : "so far."}
      </NovaSays>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {results.map(({ box, warning }) => (
          <label key={box.id} className={cn("glass block rounded-card border-2 p-4", box.colour)}>
            <span className={cn("flex items-center gap-2 font-display text-lg font-bold", box.text)}>
              <span aria-hidden="true">{box.emoji}</span> {box.title}
            </span>
            <textarea
              rows={3}
              value={values[box.id] ?? ""}
              onChange={(event) => setValues((current) => ({ ...current, [box.id]: event.target.value }))}
              placeholder={box.hint}
              className="mt-3 w-full resize-none rounded-control border border-white/15 bg-surface/80 px-3 py-2 text-sm text-text placeholder:text-text-muted"
            />
            <span className={cn("mt-2 block text-sm", warning ? "text-sunshine" : "text-mint")}>{warning ? `⚠️ ${warning}` : "✅ Looks clear!"}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
