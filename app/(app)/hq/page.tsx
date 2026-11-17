"use client";

import Link from "next/link";
import { ArrowRight, Flame, HeartHandshake, PiggyBank, PlaneTakeoff, Smile, Trophy, Users } from "lucide-react";

import { NovaSays } from "@/components/nova";
import { Term } from "@/components/term";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatTile } from "@/components/ui/stat-tile";
import { allLessons } from "@/content/lessons";
import { useGuestProgress, useIsClient } from "@/lib/use-guest-progress";
import { modules } from "@/lib/modules";
import { cn } from "@/lib/utils";

function lakh(paise: bigint) {
  return `₹${(Number(paise) / 10000000).toFixed(1)} lakh`;
}

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function VentureHQPage() {
  const progress = useGuestProgress();
  const isClient = useIsClient();
  const hello = isClient ? greeting() : "Welcome back";

  const done = progress?.lessonProgress ?? {};
  const nextLesson = allLessons.find((lesson) => (done[lesson.id] ?? 0) < 100);
  const finishedCount = allLessons.filter((lesson) => (done[lesson.id] ?? 0) >= 100).length;
  const company = progress?.company;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">{hello}</p>
          <h2 className="mt-1 text-3xl font-bold md:text-4xl">{progress?.learner.name ?? "Founder"} 👋</h2>
          <p className="mt-1 max-w-xl text-text-secondary">
            Your idea: <span className="text-text">{progress?.learner.ventureIdea ?? "…"}</span>
          </p>
        </div>
        {nextLesson ? (
          <Link href={`/lessons/${nextLesson.id}`}>
            <Button size="lg">
              {finishedCount === 0 ? "Start Lesson 1" : "Continue learning"} <ArrowRight size={18} />
            </Button>
          </Link>
        ) : (
          <Link href="/curriculum">
            <Button size="lg">See all lessons</Button>
          </Link>
        )}
      </div>

      <NovaSays>
        This is your pretend company. Every choice you make in lessons changes these numbers. Tap an underlined word if it&apos;s new to you!
      </NovaSays>

      {nextLesson ? (
        <Link href={`/lessons/${nextLesson.id}`} className="glass group flex items-center gap-4 rounded-card border-l-4 border-l-coral p-5 transition hover:bg-white/5">
          <span className="text-4xl" aria-hidden="true">
            {nextLesson.emoji}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-coral">Up next · {nextLesson.estimatedMinutes} minutes</p>
            <p className="text-xl font-bold">{nextLesson.title}</p>
            <p className="text-sm text-text-secondary">{nextLesson.tagline}</p>
          </div>
          <ArrowRight className="shrink-0 transition group-hover:translate-x-1" />
        </Link>
      ) : null}

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
        <StatTile accent="mint" icon={<PiggyBank size={16} />} label={<Term id="cash">Cash</Term>} value={company ? lakh(company.cashPaise) : "—"} hint="Money in the bank" />
        <StatTile accent="sky" icon={<PlaneTakeoff size={16} />} label={<Term id="runway">Runway</Term>} value={company ? `${company.runwayMonths.toFixed(1)} months` : "—"} hint="How long your money lasts" />
        <StatTile accent="coral" icon={<Users size={16} />} label={<Term id="customer">Customers</Term>} value={company ? `${company.customers}` : "—"} hint="People who paid you" />
        <StatTile accent="pink" icon={<Smile size={16} />} label={<Term id="morale">Team mood</Term>} value={company ? `${company.morale} / 100` : "—"} hint="How happy your team is" />
        <StatTile accent="violet" icon={<Trophy size={16} />} label={<Term id="valuation">Company value</Term>} value={company ? lakh(company.valuationPaise) : "—"} hint="Grows as you prove your idea" />
        <StatTile accent="sunshine" icon={<Flame size={16} />} label="Lessons done" value={`${finishedCount} / ${allLessons.length}`} hint="Keep your streak going!" />
      </div>

      <div className="glass rounded-card p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-xl font-bold">Your path</h3>
          <Link href="/curriculum" className="text-sm font-semibold text-sunshine hover:underline">
            See all lessons →
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => {
            const lessons = allLessons.filter((lesson) => lesson.module === module.number);
            const complete = lessons.filter((lesson) => (done[lesson.id] ?? 0) >= 100).length;
            const value = lessons.length ? (complete / lessons.length) * 100 : 0;
            return (
              <div key={module.number} className={cn("rounded-control border p-3", module.border, module.bg)}>
                <div className="mb-1 flex items-center justify-between">
                  <span className={cn("text-xs font-bold", module.text)}>Module {module.number}</span>
                  <span aria-hidden="true">{module.emoji}</span>
                </div>
                <p className="font-semibold">{module.title}</p>
                <p className="mb-2 text-xs text-text-secondary">{lessons.length ? `${complete} of ${lessons.length} lessons` : "Coming soon"}</p>
                <ProgressBar value={value} barClassName={cn("bg-gradient-to-r", module.bar)} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass flex flex-col items-start gap-3 rounded-card p-5 sm:flex-row sm:items-center">
        <HeartHandshake className="shrink-0 text-violet" size={28} />
        <div className="flex-1">
          <p className="font-semibold">Real missions</p>
          <p className="text-sm text-text-secondary">Each lesson ends with a small real-life task — like talking to 5 people. See all of them here.</p>
        </div>
        <Link href="/missions">
          <Button variant="secondary">Open missions</Button>
        </Link>
      </div>
    </div>
  );
}
