"use client";

import { useState } from "react";

import { NovaSays } from "@/components/nova";
import { Button } from "@/components/ui/button";

const prompts = [
  { q: "How do you KNOW this is a real problem — and not just your opinion?", nudge: "Think: did a real person tell you about a time it happened?" },
  { q: "Which group of people feels this problem the MOST?", nudge: "Think: who loses the most time, money or sleep because of it?" },
  { q: "What is the smallest, cheapest test you could do this week?", nudge: "Think: could you test it with a WhatsApp message or a poster?" },
  { q: "If your first test fails, what will you change?", nudge: "Think: the people, the price, or the message?" },
  { q: "What number would tell you your idea is working?", nudge: "Think: how many people need to PAY for you to keep going?" },
];

export default function ThinkingCoachPage() {
  const [index, setIndex] = useState(0);
  const [showNudge, setShowNudge] = useState(false);
  const [notes, setNotes] = useState<Record<number, string>>({});
  const current = prompts[index];

  const next = () => {
    setIndex((value) => (value + 1) % prompts.length);
    setShowNudge(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Practise thinking</p>
        <h2 className="mt-1 text-3xl font-bold md:text-4xl">Thinking coach 🧭</h2>
        <p className="mt-1 max-w-2xl text-text-secondary">Nova won&apos;t give you answers — she asks the questions real mentors ask. Answer in your own words.</p>
      </div>

      <NovaSays>
        Question {index + 1} of {prompts.length}: {current.q}
      </NovaSays>

      <section className="glass space-y-4 rounded-card border-t-4 border-t-violet p-5">
        <label htmlFor="answer" className="font-semibold">
          Your answer
        </label>
        <textarea
          id="answer"
          rows={4}
          value={notes[index] ?? ""}
          onChange={(event) => setNotes((value) => ({ ...value, [index]: event.target.value }))}
          placeholder="Write 1–3 sentences…"
          className="w-full rounded-control border border-white/15 bg-surface/80 px-3 py-2 text-text placeholder:text-text-muted"
        />
        {showNudge ? <p className="box-simple rounded-control p-3">💡 {current.nudge}</p> : null}
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => setShowNudge(true)} disabled={showNudge}>
            I&apos;m stuck — give me a hint
          </Button>
          <Button onClick={next}>Next question</Button>
        </div>
        <p className="text-sm text-text-muted">
          {Object.values(notes).filter((note) => note.trim()).length} of {prompts.length} answered. Tip: share your answers with a teacher or friend.
        </p>
      </section>
    </div>
  );
}
