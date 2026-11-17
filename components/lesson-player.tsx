"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Lightbulb, ListChecks, Rocket, Sparkles, Star, XCircle } from "lucide-react";

import { Confetti } from "@/components/confetti";
import { PersonaBuilder } from "@/components/labs/persona-builder";
import { ProblemFinderLab } from "@/components/labs/problem-finder-lab";
import { NovaSays } from "@/components/nova";
import { RichText, Term } from "@/components/term";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { allLessons } from "@/content/lessons";
import { updateGuestProgress } from "@/lib/guest-progress";
import { useGuestProgress } from "@/lib/use-guest-progress";
import type { DecisionOption, Lesson, LessonStep } from "@/lib/lessons";
import { getModule } from "@/lib/modules";
import { applyDecisionDelta, createStartingCompanyState } from "@/lib/sim/engine";
import { cn } from "@/lib/utils";

const labs: Record<string, React.ComponentType> = {
  "problem-finder": ProblemFinderLab,
  "persona-builder": PersonaBuilder,
};

const stepIcons: Record<string, string> = {
  challenge: "📖",
  decision: "🤔",
  consequence: "⚡",
  insight: "💡",
  retry: "✏️",
  mission: "🚀",
  summary: "🏆",
  reflection: "📝",
  "interactive-check": "✏️",
};

function formatRupees(value: number) {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

export function LessonPlayer({ lesson }: { lesson: Lesson }) {
  const mod = getModule(lesson.module);
  const saved = useGuestProgress().lessonProgress[lesson.id] ?? 0;
  // Until the learner moves, start where they left off last time.
  const resumeAt = saved > 0 && saved < 100 ? Math.max(0, Math.min(lesson.steps.length - 1, Math.round((saved / 100) * lesson.steps.length) - 1)) : 0;
  const [chosenIndex, setIndex] = useState<number | null>(null);
  const index = chosenIndex ?? resumeAt;
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [firstTry, setFirstTry] = useState<Record<number, boolean>>({});
  const [company, setCompany] = useState(createStartingCompanyState());
  const [missionSaved, setMissionSaved] = useState(false);

  const step = lesson.steps[index];
  const isLast = index === lesson.steps.length - 1;
  const percent = ((index + 1) / lesson.steps.length) * 100;
  const stars = Object.values(firstTry).filter(Boolean).length;
  const maxStars = lesson.steps.filter((item) => item.options?.some((option) => option.correct)).length;

  const nextLesson = useMemo(() => {
    const position = allLessons.findIndex((item) => item.id === lesson.id);
    return allLessons[position + 1];
  }, [lesson.id]);

  // Save progress after every screen.
  useEffect(() => {
    updateGuestProgress((current) => {
      const before = current.lessonProgress[lesson.id] ?? 0;
      const lessonProgress = { ...current.lessonProgress, [lesson.id]: Math.max(before, percent) };
      const finished = isLast && !current.badges.includes(`lesson:${lesson.id}`);
      return {
        ...current,
        lessonProgress,
        badges: finished ? [...current.badges, `lesson:${lesson.id}`] : current.badges,
      };
    });
  }, [index, isLast, lesson.id, percent]);

  const chosen = answers[index];
  const chosenOption = step.options?.find((option) => option.id === chosen);
  const hasCorrect = step.options?.some((option) => option.correct) ?? false;
  const needsAnswer = step.type === "decision" || (step.type === "retry" && (step.options?.length ?? 0) > 0);
  const canContinue = !needsAnswer || (step.type === "decision" ? Boolean(chosen) : !hasCorrect || Boolean(chosenOption?.correct));

  const choose = (option: DecisionOption) => {
    if (step.type === "decision" && chosen) return; // one decision per story
    setAnswers((current) => ({ ...current, [index]: option.id }));
    if (firstTry[index] === undefined) setFirstTry((current) => ({ ...current, [index]: Boolean(option.correct) }));
    if (step.type === "decision") setCompany((state) => applyDecisionDelta(state, option.effects ?? {}));
  };

  const go = (delta: number) => {
    setIndex(Math.min(lesson.steps.length - 1, Math.max(0, index + delta)));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      {/* Lesson header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link href="/curriculum" className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text">
            <ArrowLeft size={14} /> All lessons
          </Link>
          <div className="mt-2 flex items-center gap-2">
            <span className={cn("rounded-pill px-3 py-1 text-xs font-bold", mod.bg, mod.text)}>
              Module {lesson.module} · {mod.title}
            </span>
          </div>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">
            <span aria-hidden="true">{lesson.emoji}</span> {lesson.title}
          </h2>
          {lesson.tagline ? <p className="mt-1 text-text-secondary">{lesson.tagline}</p> : null}
        </div>
        <div className="glass flex items-center gap-1 rounded-pill px-3 py-2" aria-label={`${stars} stars earned`}>
          {Array.from({ length: Math.max(maxStars, 1) }, (_, i) => (
            <Star key={i} size={18} className={i < stars ? "fill-sunshine text-sunshine" : "text-white/25"} />
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="glass rounded-card p-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold text-text">
            {stepIcons[step.type]} {step.title}
          </span>
          <span className="text-text-muted">
            Screen {index + 1} of {lesson.steps.length}
          </span>
        </div>
        <ProgressBar value={percent} barClassName={cn("bg-gradient-to-r", mod.bar)} />
        <div className="mt-3 hidden gap-1 sm:flex" aria-hidden="true">
          {lesson.steps.map((item, i) => (
            <span key={i} className={cn("h-1.5 flex-1 rounded-full", i <= index ? "bg-white/60" : "bg-white/10")} title={item.title} />
          ))}
        </div>
      </div>

      {step.nova ? <NovaSays className="rise-in">{step.nova}</NovaSays> : null}

      {/* The screen */}
      <section key={index} className={cn("glass rise-in rounded-card border-t-4 p-5 md:p-7", mod.border)} aria-live="polite">
        <StepBody
          step={step}
          chosen={chosen}
          onChoose={choose}
          company={company}
          missionSaved={missionSaved}
          onSaveMission={() => {
            updateGuestProgress((current) => ({
              ...current,
              missionDrafts: { ...current.missionDrafts, [lesson.id]: step.text ?? "" },
            }));
            setMissionSaved(true);
          }}
        />

        {needsAnswer && chosenOption ? (
          <div className={cn("pop mt-5 flex gap-3 rounded-control p-4", chosenOption.correct || !hasCorrect ? "box-remember" : "box-oops")}>
            {chosenOption.correct ? <CheckCircle2 className="mt-0.5 shrink-0 text-mint" size={20} /> : <XCircle className="mt-0.5 shrink-0 text-coral" size={20} />}
            <div>
              <p className="font-semibold">{chosenOption.correct ? "Great choice!" : "Good try!"}</p>
              <p className="text-text-secondary">{chosenOption.feedback.replace(/^(Great choice!|Good try!|Yes!|Not quite\.)\s*/u, "")}</p>
              {step.type === "retry" && !chosenOption.correct ? <p className="mt-1 text-sm text-sunshine">Pick another answer to try again 👆</p> : null}
            </div>
          </div>
        ) : null}

        {isLast ? (
          <>
            <Confetti />
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {nextLesson ? (
                <Link href={`/lessons/${nextLesson.id}`}>
                  <Button size="lg">
                    Next lesson: {nextLesson.shortTitle ?? nextLesson.title} <ArrowRight size={18} />
                  </Button>
                </Link>
              ) : (
                <Link href="/labs/pricing">
                  <Button size="lg">
                    🎉 All lessons done! Play in the Labs <ArrowRight size={18} />
                  </Button>
                </Link>
              )}
              <Link href="/curriculum">
                <Button size="lg" variant="secondary">
                  Back to all lessons
                </Button>
              </Link>
            </div>
          </>
        ) : null}
      </section>

      {/* Navigation */}
      {!isLast ? (
        <div className="glass sticky bottom-20 z-10 flex items-center justify-between gap-3 rounded-card p-3 lg:bottom-4">
          <Button variant="ghost" onClick={() => go(-1)} disabled={index === 0}>
            <ArrowLeft size={16} /> Back
          </Button>
          <p className="hidden text-sm text-text-muted sm:block">
            {needsAnswer && !canContinue ? (step.type === "decision" ? "Pick an answer to continue" : "Find the right answer to continue") : "Ready when you are"}
          </p>
          <Button onClick={() => go(1)} disabled={!canContinue}>
            {step.type === "decision" ? "See what happens" : "Next"} <ArrowRight size={16} />
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function StepBody({
  step,
  chosen,
  onChoose,
  company,
  missionSaved,
  onSaveMission,
}: {
  step: LessonStep;
  chosen?: string;
  onChoose: (option: DecisionOption) => void;
  company: ReturnType<typeof createStartingCompanyState>;
  missionSaved: boolean;
  onSaveMission: () => void;
}) {
  const Lab = step.labId ? labs[step.labId] : undefined;

  switch (step.type) {
    case "challenge":
      return (
        <div>
          <p className="eyebrow">📖 The story</p>
          <p className="mt-3 font-display text-xl leading-relaxed md:text-2xl">
            <RichText text={step.text ?? ""} />
          </p>
        </div>
      );

    case "decision":
    case "retry":
      return (
        <div>
          <p className="eyebrow">{step.type === "decision" ? "🤔 Your choice" : "✏️ Quick check"}</p>
          <h3 className="mt-2 text-2xl font-bold">{step.type === "decision" ? step.title : step.text}</h3>
          {step.type === "decision" && step.text ? <p className="mt-1 text-text-secondary">{step.text}</p> : null}
          <div className="mt-5 grid gap-3">
            {step.options?.map((option, i) => {
              const selected = chosen === option.id;
              const revealed = Boolean(chosen);
              const locked = step.type === "decision" && revealed;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onChoose(option)}
                  disabled={locked && !selected}
                  aria-pressed={selected}
                  className={cn(
                    "flex items-center gap-3 rounded-control border p-4 text-left transition",
                    selected
                      ? option.correct || !step.options?.some((item) => item.correct)
                        ? "border-mint bg-mint/15"
                        : "border-coral bg-coral/15"
                      : "border-white/15 bg-white/5 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10",
                    locked && !selected && option.correct ? "border-mint/60" : "",
                    locked && !selected ? "opacity-70" : "",
                  )}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 font-display text-sm font-bold">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="font-medium">{option.label}</span>
                  {locked && !selected && option.correct ? <span className="ml-auto shrink-0 rounded-pill bg-mint/20 px-2 py-0.5 text-xs font-bold text-mint">Best answer</span> : null}
                </button>
              );
            })}
          </div>
          {step.type === "retry" && !step.options?.length && step.successMessage ? (
            <p className="box-remember mt-4 rounded-control p-3">{step.successMessage}</p>
          ) : null}
        </div>
      );

    case "consequence":
      return (
        <div>
          <p className="eyebrow">⚡ What happened</p>
          <p className="mt-3 text-lg leading-relaxed">
            <RichText text={step.text ?? ""} />
          </p>
          {step.consequence ? <p className="box-example mt-4 rounded-control p-3 text-sm font-medium">{step.consequence}</p> : null}
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MiniStat label={<Term id="cash">Cash</Term>} value={formatRupees(company.cash)} colour="text-mint" />
            <MiniStat label={<Term id="runway">Runway</Term>} value={`${company.runway.toFixed(1)} months`} colour="text-sky" />
            <MiniStat label={<Term id="evidence">Proof</Term>} value={`${company.evidenceQuality}`} colour="text-sunshine" />
            <MiniStat label={<Term id="morale">Team mood</Term>} value={`${company.morale}/100`} colour="text-pink" />
          </div>
          <p className="mt-3 text-xs text-text-muted">This is your pretend company. Hover or tap the underlined words to see what they mean.</p>
        </div>
      );

    case "insight":
      return (
        <div className="space-y-4">
          <p className="eyebrow">💡 The big idea</p>
          <p className="font-display text-xl leading-relaxed md:text-2xl">
            <RichText text={step.text ?? ""} />
          </p>
          {step.simple ? (
            <div className="box-simple flex gap-3 rounded-control p-4">
              <Lightbulb className="mt-0.5 shrink-0 text-sunshine" size={20} />
              <div>
                <p className="font-bold text-sunshine">In simple words</p>
                <p>{step.simple}</p>
              </div>
            </div>
          ) : null}
          {step.example ? (
            <div className="box-example flex gap-3 rounded-control p-4">
              <Sparkles className="mt-0.5 shrink-0 text-sky" size={20} />
              <div>
                <p className="font-bold text-sky">Real-life example</p>
                <p>{step.example}</p>
              </div>
            </div>
          ) : null}
          {Lab ? (
            <div className="rounded-card border border-white/10 bg-black/20 p-4">
              <p className="mb-3 text-sm font-semibold text-orange">🧪 Try it yourself</p>
              {step.insight ? <p className="mb-3 text-sm text-text-secondary">{step.insight}</p> : null}
              <Lab />
            </div>
          ) : null}
        </div>
      );

    case "mission":
      return (
        <div>
          <p className="eyebrow">🚀 Try it in real life</p>
          <p className="mt-3 text-lg leading-relaxed">{step.text}</p>
          {step.proof?.length ? (
            <div className="mt-4 rounded-control bg-white/5 p-4">
              <p className="mb-2 flex items-center gap-2 font-semibold">
                <ListChecks size={18} className="text-violet" /> What to bring back
              </p>
              <ul className="space-y-2">
                {step.proof.map((item) => (
                  <li key={item} className="flex gap-2 text-text-secondary">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-mint" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button variant="secondary" onClick={onSaveMission} disabled={missionSaved}>
              <Rocket size={16} /> {missionSaved ? "Saved to your Missions ✓" : "Save this mission for later"}
            </Button>
            <span className="text-sm text-text-muted">You can do it this week. Then keep learning!</span>
          </div>
        </div>
      );

    case "summary":
      return (
        <div className="text-center">
          <p className="pop text-5xl" aria-hidden="true">
            🏆
          </p>
          <h3 className="mt-2 text-3xl font-bold">Lesson complete!</h3>
          {step.remember ? (
            <div className="box-remember mx-auto mt-5 max-w-xl rounded-control p-4">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-mint">Remember this</p>
              <p className="mt-1 font-display text-xl font-bold">{step.remember}</p>
            </div>
          ) : null}
          {step.learned?.length ? (
            <div className="mx-auto mt-5 max-w-xl text-left">
              <p className="mb-2 font-semibold">You learned:</p>
              <ul className="space-y-2">
                {step.learned.map((item) => (
                  <li key={item} className="flex gap-2 text-text-secondary">
                    <Star size={18} className="mt-0.5 shrink-0 fill-sunshine text-sunshine" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : step.summary ? (
            <p className="mt-4 text-text-secondary">{step.summary}</p>
          ) : null}
        </div>
      );

    default:
      return <p className="text-lg">{step.text}</p>;
  }
}

function MiniStat({ label, value, colour }: { label: React.ReactNode; value: string; colour: string }) {
  return (
    <div className="rounded-control bg-white/5 p-3">
      <p className="text-xs text-text-secondary">{label}</p>
      <p className={cn("font-display text-lg font-bold", colour)}>{value}</p>
    </div>
  );
}
