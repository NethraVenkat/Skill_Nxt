"use client";

import { useState } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";

import { NovaSays } from "@/components/nova";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Question = { id: string; text: string; good: boolean; answer: string; why: string };

/*
  An offline practice chat. Riya answers like a real (polite) person:
  open questions about the past get the truth; leading or future questions get polite "yes"es.
*/
const questions: Question[] = [
  {
    id: "last-time",
    text: "Tell me about the last time your laundry came back late.",
    good: true,
    answer: "Last Monday! My only clean uniform was in the bag. I had to borrow my roommate's shirt and was late for my 8 am class.",
    why: "Great question — it's about a real past event, so you got a true story.",
  },
  {
    id: "what-did",
    text: "What did you do to fix it?",
    good: true,
    answer: "Honestly? I now wash my uniform by hand on Sunday nights. It takes about an hour. I hate it.",
    why: "Great — now you know her workaround: 1 hour every Sunday. That's a real cost!",
  },
  {
    id: "how-often",
    text: "How often does this happen?",
    good: true,
    answer: "Maybe twice a month. Always on Mondays, because the dhobi collects late on Saturday.",
    why: "Great — you learned how often it happens AND why. Very useful.",
  },
  {
    id: "spent",
    text: "Have you ever paid for something to solve this?",
    good: true,
    answer: "Once I paid ₹60 to a shop near the gate for same-day ironing. It was worth it before my exam.",
    why: "Excellent — she already spends money on this. That's strong proof!",
  },
  {
    id: "would-you",
    text: "Would you use a laundry app if I made one?",
    good: false,
    answer: "Haan, sure, sounds nice! 😊",
    why: "Oops — a \"would you\" question. People say yes to be polite. This tells you nothing.",
  },
  {
    id: "pay-200",
    text: "Would you pay ₹200 a month for it?",
    good: false,
    answer: "Umm… maybe? I'd have to see.",
    why: "Oops — asking about the future gets guesses, not facts. Ask what she has paid before.",
  },
  {
    id: "hate",
    text: "Everyone hates late laundry, right?",
    good: false,
    answer: "Yeah, I guess everyone does.",
    why: "Oops — this question already has the answer inside it. She just agreed with you.",
  },
  {
    id: "tracking",
    text: "Do you want live tracking and notifications?",
    good: false,
    answer: "Notifications? Sure, why not.",
    why: "Oops — you're asking her to design your app. First learn about her problem.",
  },
];

export default function CustomerRoleplayPage() {
  const [asked, setAsked] = useState<string[]>([]);
  const chat = asked.map((id) => questions.find((question) => question.id === id)!);
  const good = chat.filter((question) => question.good).length;
  const bad = chat.length - good;
  const finished = chat.length >= 5;
  const score = Math.max(0, good * 2 - bad);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Practise talking</p>
          <h2 className="mt-1 text-3xl font-bold md:text-4xl">Chat with a customer 🎤</h2>
          <p className="mt-1 max-w-2xl text-text-secondary">You can ask Riya 5 questions. Pick wisely — good questions get the real story!</p>
        </div>
        <Button variant="secondary" onClick={() => setAsked([])}>
          <RotateCcw size={16} /> Start again
        </Button>
      </div>

      <NovaSays>Riya is a hostel student. Your goal: find out if late laundry is a REAL problem for her. Tip: ask about things that already happened.</NovaSays>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <section className="glass flex min-h-[360px] flex-col rounded-card p-4" aria-live="polite">
          <div className="mb-3 flex items-center gap-3 border-b border-white/10 pb-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky/20 text-xl" aria-hidden="true">
              🧑‍🎓
            </span>
            <div>
              <p className="font-semibold">Riya, 19</p>
              <p className="text-xs text-text-muted">Hostel student · {5 - chat.length} questions left</p>
            </div>
          </div>
          <div className="flex-1 space-y-3">
            {chat.length === 0 ? <p className="mt-10 text-center text-text-muted">Pick a question on the right to start the chat 👉</p> : null}
            {chat.map((question) => (
              <div key={question.id} className="space-y-2">
                <p className="ml-auto max-w-[85%] rounded-card rounded-br-sm bg-primary/30 px-4 py-2 text-right">{question.text}</p>
                <p className="max-w-[85%] rounded-card rounded-bl-sm bg-white/10 px-4 py-2">{question.answer}</p>
                <p className={cn("max-w-[85%] text-xs", question.good ? "text-mint" : "text-sunshine")}>{question.why}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          {!finished ? (
            <>
              <p className="font-semibold">Choose your next question:</p>
              {questions
                .filter((question) => !asked.includes(question.id))
                .map((question) => (
                  <button
                    key={question.id}
                    type="button"
                    onClick={() => setAsked((current) => [...current, question.id])}
                    className="w-full rounded-control border border-white/15 bg-white/5 p-3 text-left text-sm transition hover:-translate-y-0.5 hover:bg-white/10"
                  >
                    💬 {question.text}
                  </button>
                ))}
            </>
          ) : (
            <div className="glass pop rounded-card border-t-4 border-t-sunshine p-5 text-center">
              <p className="text-4xl" aria-hidden="true">
                {score >= 8 ? "🏆" : score >= 5 ? "👍" : "🌱"}
              </p>
              <h3 className="mt-2 text-2xl font-bold">Your score: {score} / 10</h3>
              <p className="mt-2 text-text-secondary">
                {good} good questions, {bad} {bad === 1 ? "leading question" : "leading questions"}.
              </p>
              <p className="box-remember mt-4 rounded-control p-3 text-left text-sm">
                <strong className="text-mint">Remember:</strong> Ask “Tell me about the last time…” — not “Would you…?”
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Button onClick={() => setAsked([])}>Try again</Button>
                <Link href="/lessons/module-2-lesson-3">
                  <Button variant="secondary">Lesson: Ask good questions</Button>
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
