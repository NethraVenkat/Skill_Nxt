"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

import { NovaSays } from "@/components/nova";
import { SceneBackground } from "@/components/scene-background";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProgressBar } from "@/components/ui/progress-bar";
import { updateGuestProgress } from "@/lib/guest-progress";
import { cn } from "@/lib/utils";

const sampleIdeas = [
  "🧺 On-time laundry pickup for hostel students",
  "🍱 Home-cooked tiffin for working people",
  "📚 Weekend tuition for Class 10 maths",
  "☕ A chai stall near my college",
];

const warmUp = [
  {
    question: "Before building something, what should you do first?",
    choices: ["Make a cool logo", "Talk to people who have the problem", "Spend money on ads"],
    best: 1,
  },
  {
    question: "Which answer shows people REALLY want something?",
    choices: ["\"Nice idea!\"", "\"I'll think about it.\"", "\"Here's my money.\""],
    best: 2,
  },
  {
    question: "What is revenue?",
    choices: ["All the money coming in from customers", "Money left after paying costs", "Money borrowed from a bank"],
    best: 0,
  },
];

const titles = ["Hi! What should we call you?", "What idea would you like to explore?", "Quick warm-up — no pressure!"];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [idea, setIdea] = useState("");
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null]);
  const total = 3;

  const finish = () => {
    const score = answers.filter((answer, index) => answer === warmUp[index].best).length;
    updateGuestProgress((current) => ({
      ...current,
      learner: {
        ...current.learner,
        name: name.trim() || "Founder",
        ventureIdea: idea.trim().replace(/^\p{Extended_Pictographic}\s*/u, "") || "On-time laundry pickup for hostel students",
        onboardingAnswers: { warmUpScore: score, warmUp: answers.join(",") },
      },
    }));
    router.push("/hq");
  };

  const canContinue = step < 2 || answers.every((answer) => answer !== null);

  return (
    <div className="relative min-h-screen">
      <SceneBackground scene="observatory" variant="app" />
      <main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl space-y-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-pink text-white">
              <Sparkles size={18} />
            </span>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">VentureCraft</p>
          </div>

          <NovaSays>
            {step === 0 && "Welcome! I'm Nova, your guide. No account needed — your progress saves on this device. 😊"}
            {step === 1 && "Got an idea? Great! No idea yet? Also great — just pick one of mine to practise with."}
            {step === 2 && "These 3 questions just help me see where you are. Wrong answers are totally fine!"}
          </NovaSays>

          <section className="glass rounded-card border-t-4 border-t-primary p-6">
            <div className="mb-3 flex items-center justify-between text-sm text-text-secondary">
              <span>
                Step {step + 1} of {total}
              </span>
              <span>{Math.round(((step + 1) / total) * 100)}%</span>
            </div>
            <ProgressBar value={((step + 1) / total) * 100} />
            <h1 className="mb-0 mt-6 text-2xl font-bold md:text-3xl">{titles[step]}</h1>

            {step === 0 ? (
              <div className="mt-5">
                <label htmlFor="name" className="mb-1 block text-sm text-text-secondary">
                  Your first name <span className="text-text-muted">(you can skip this)</span>
                </label>
                <Input id="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Ananya" autoFocus />
              </div>
            ) : null}

            {step === 1 ? (
              <div className="mt-5 space-y-4">
                <div>
                  <label htmlFor="idea" className="mb-1 block text-sm text-text-secondary">
                    Type your idea in a few words <span className="text-text-muted">(optional)</span>
                  </label>
                  <Input id="idea" value={idea} onChange={(event) => setIdea(event.target.value)} placeholder="e.g. healthy snacks for my college" />
                </div>
                <p className="text-sm text-text-secondary">Or pick one to practise with:</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {sampleIdeas.map((sample) => (
                    <button
                      key={sample}
                      type="button"
                      onClick={() => setIdea(sample)}
                      className={cn(
                        "rounded-control border px-3 py-3 text-left text-sm transition",
                        idea === sample ? "border-sky bg-sky/20 text-text" : "border-white/15 bg-white/5 text-text-secondary hover:bg-white/10",
                      )}
                    >
                      {sample}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="mt-5 space-y-4">
                {warmUp.map((item, index) => (
                  <fieldset key={item.question} className="rounded-control bg-white/5 p-4">
                    <legend className="sr-only">{item.question}</legend>
                    <p className="mb-3 font-medium">
                      {index + 1}. {item.question}
                    </p>
                    <div className="grid gap-2">
                      {item.choices.map((choice, choiceIndex) => (
                        <button
                          key={choice}
                          type="button"
                          aria-pressed={answers[index] === choiceIndex}
                          onClick={() => setAnswers((current) => current.map((value, i) => (i === index ? choiceIndex : value)))}
                          className={cn(
                            "rounded-control border px-3 py-2 text-left text-sm transition",
                            answers[index] === choiceIndex ? "border-primary bg-primary/20 text-text" : "border-white/15 bg-white/5 text-text-secondary hover:bg-white/10",
                          )}
                        >
                          {choice}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                ))}
              </div>
            ) : null}

            <div className="mt-6 flex items-center justify-between gap-3">
              <Button variant="ghost" onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0}>
                <ArrowLeft size={16} /> Back
              </Button>
              <Button size="lg" onClick={() => (step === total - 1 ? finish() : setStep((value) => value + 1))} disabled={!canContinue}>
                {step === total - 1 ? "Let's start! 🚀" : "Next"} <ArrowRight size={16} />
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
