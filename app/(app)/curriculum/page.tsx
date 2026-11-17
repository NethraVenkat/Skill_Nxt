"use client";

import Link from "next/link";
import { CheckCircle2, Clock, Lock, PlayCircle } from "lucide-react";

import { NovaSays } from "@/components/nova";
import { ProgressBar } from "@/components/ui/progress-bar";
import { allLessons } from "@/content/lessons";
import { useGuestProgress } from "@/lib/use-guest-progress";
import { modules } from "@/lib/modules";
import { cn } from "@/lib/utils";

export default function CurriculumPage() {
  const done = useGuestProgress().lessonProgress;

  const finished = allLessons.filter((lesson) => (done[lesson.id] ?? 0) >= 100).length;

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Your learning path</p>
        <h2 className="mt-1 text-3xl font-bold md:text-4xl">All lessons</h2>
        <p className="mt-1 max-w-2xl text-text-secondary">Each lesson takes about 8 minutes. Go in order — every lesson builds on the one before.</p>
      </div>

      <NovaSays>
        {finished === 0
          ? "Start with Lesson 1. It's short, I promise! ☕"
          : `You've finished ${finished} of ${allLessons.length} lessons. Keep going! 🚀`}
      </NovaSays>

      <div className="space-y-5">
        {modules.map((module) => {
          const lessons = allLessons.filter((lesson) => lesson.module === module.number);
          const complete = lessons.filter((lesson) => (done[lesson.id] ?? 0) >= 100).length;
          const available = lessons.length > 0;

          return (
            <section key={module.number} className={cn("glass rounded-card border-t-4 p-5", module.border)}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-card text-2xl", module.bg)} aria-hidden="true">
                    {module.emoji}
                  </span>
                  <div>
                    <p className={cn("text-xs font-bold uppercase tracking-[0.14em]", module.text)}>Module {module.number}</p>
                    <h3 className="text-xl font-bold">{module.title}</h3>
                    <p className="text-sm text-text-secondary">{module.simple}</p>
                  </div>
                </div>
                {available ? (
                  <span className="rounded-pill bg-white/10 px-3 py-1 text-xs font-semibold text-text-secondary">
                    {complete} / {lessons.length} done
                  </span>
                ) : (
                  <span className="flex items-center gap-1 rounded-pill bg-white/5 px-3 py-1 text-xs font-semibold text-text-muted">
                    <Lock size={12} /> Coming soon
                  </span>
                )}
              </div>

              {available ? (
                <>
                  <ProgressBar value={(complete / lessons.length) * 100} className="mt-4" barClassName={cn("bg-gradient-to-r", module.bar)} />
                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    {lessons.map((lesson) => {
                      const value = done[lesson.id] ?? 0;
                      const isDone = value >= 100;
                      return (
                        <Link
                          key={lesson.id}
                          href={`/lessons/${lesson.id}`}
                          className="group rounded-control border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-2xl" aria-hidden="true">
                              {lesson.emoji}
                            </span>
                            {isDone ? (
                              <CheckCircle2 size={20} className="text-mint" aria-label="Done" />
                            ) : (
                              <PlayCircle size={20} className={cn("opacity-70 group-hover:opacity-100", module.text)} aria-hidden="true" />
                            )}
                          </div>
                          <p className="mt-2 font-semibold">
                            Lesson {lesson.order}: {lesson.title}
                          </p>
                          <p className="mt-1 text-sm text-text-secondary">{lesson.tagline}</p>
                          <p className="mt-3 flex items-center gap-1 text-xs text-text-muted">
                            <Clock size={12} /> {lesson.estimatedMinutes} min {value > 0 && !isDone ? `· ${Math.round(value)}% done` : ""}
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                </>
              ) : (
                <p className="mt-3 text-sm text-text-muted">Big question: “{module.question}” — lessons for this module are on the way.</p>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
