"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Compass, Flag, MousePointerClick, Sparkles, Trophy } from "lucide-react";

import { SceneBackground } from "@/components/scene-background";
import { Term } from "@/components/term";
import { modules } from "@/lib/modules";
import { useHasSavedProgress } from "@/lib/use-guest-progress";

const route = [
  ["Notice", "Find a real problem"],
  ["Test", "Check people want it"],
  ["Build", "Make a simple version"],
  ["Pitch", "Explain your idea"],
] as const;

const steps = [
  {
    icon: MousePointerClick,
    color: "bg-coral/20 text-coral",
    title: "1. Make a choice",
    text: "Every lesson starts with a small story. You decide what to do — like a real founder.",
  },
  {
    icon: Sparkles,
    color: "bg-sky/20 text-sky",
    title: "2. See what happens",
    text: "Your pretend company reacts. Money goes up or down. Customers come or leave.",
  },
  {
    icon: Trophy,
    color: "bg-mint/20 text-mint",
    title: "3. Learn why",
    text: "Nova explains the idea in simple words, with an everyday example. Then you try again.",
  },
];

export default function LandingPage() {
  const returning = useHasSavedProgress();
  const startHref = returning ? "/hq" : "/onboarding";
  const [cups, setCups] = useState(60);
  const price = 15;

  return (
    <div className="relative min-h-screen text-text">
      <SceneBackground scene="observatory" variant="home" />

      {/* ---------- Opening screen (same artwork and mood as the original) ---------- */}
      <main id="main" className="relative z-10 flex min-h-[100svh] flex-col px-[6%] pb-8 pt-6">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 rounded-control border border-gold/30 bg-[#11202990] px-4 py-2 backdrop-blur">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-pink text-white">
              <Sparkles size={16} />
            </span>
            <div className="leading-tight">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">VentureCraft</p>
              <p className="text-[11px] text-text-secondary">Free · no sign-up</p>
            </div>
          </div>
          <Link href="/glossary" className="rounded-pill border border-white/15 bg-white/5 px-4 py-2 text-sm text-text-secondary backdrop-blur hover:bg-white/10">
            📖 Word Book
          </Link>
        </header>

        <div className="mt-8 flex items-center justify-between gap-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#d2c5b1]">
          <span className="flex items-center gap-2">
            <Compass size={15} /> The Venture Observatory
          </span>
          <span className="hidden sm:inline">9 modules · learn at your own pace</span>
        </div>

        <div className="grid flex-1 items-center gap-6 md:grid-cols-[1fr_0.9fr]">
          <div className="rise-in relative z-10 max-w-[640px] py-6">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em] text-gold">
              <i className="inline-block h-px w-7 bg-gold" /> Learn startups the simple way
            </p>
            <h1 className="my-6 font-cinema text-[clamp(64px,8vw,132px)] font-normal leading-[0.87] tracking-[-0.05em] text-[#fff5df] [text-shadow:0_4px_24px_#04101888]">
              <span className="block text-[0.42em] italic leading-[1.4] tracking-[-0.03em] text-[#e9d4b2]">Nova’s</span>
              <strong className="block font-normal">Venture</strong>
              <em className="block font-normal text-gold">Craft.</em>
            </h1>
            <p className="max-w-xl text-[clamp(17px,1.3vw,21px)] leading-relaxed text-[#f0eadc] [text-shadow:0_2px_10px_#000]">
              Run a pretend company. Make choices. See what happens.
              <br />
              <span className="text-[#e1c397]">Learn how real startups work — one simple step at a time.</span>
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={startHref}
                className="btn-rainbow inline-flex min-h-[60px] items-center gap-3 rounded-control px-6 text-lg font-bold text-white shadow-[0_10px_35px_rgb(150_120_255_/_45%)] transition hover:brightness-110 active:translate-y-px"
              >
                {returning ? "Continue learning" : "Start learning — free"} <ArrowUpRight size={22} />
              </Link>
              <Link href="/curriculum" className="text-sm font-semibold text-[#f1cf9a] underline-offset-4 hover:underline">
                See all lessons →
              </Link>
            </div>
            <p className="mt-5 flex flex-wrap gap-x-6 gap-y-1 text-xs font-semibold uppercase tracking-[0.13em] text-[#cec8b8]">
              <span>✓ No login</span>
              <span>✓ 10-minute lessons</span>
              <span>✓ Simple words</span>
            </p>
          </div>

          <div className="relative hidden h-full min-h-[460px] md:block" aria-hidden="false">
            <Flag className="absolute left-[30%] top-[18%] text-sunshine drop-shadow" size={22} fill="currentColor" aria-hidden="true" />
            <Flag className="absolute left-[62%] top-[30%] text-coral drop-shadow" size={20} fill="currentColor" aria-hidden="true" />
            <Flag className="absolute left-[48%] top-[8%] text-mint drop-shadow" size={18} fill="currentColor" aria-hidden="true" />
            <div className="nova-figure absolute bottom-0 left-[4%] h-[82%] max-h-[640px] w-[clamp(180px,20vw,320px)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/art/nova.webp" alt="Nova, your friendly guide, holding a notebook" className="h-full w-full object-contain object-bottom" />
            </div>
            <div className="glass absolute bottom-[12%] right-0 max-w-[260px] rounded-card p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold">Nova · your guide</p>
              <p className="mt-1 font-cinema text-lg italic leading-snug text-[#fff5df]">“Every great company starts with someone who notices a problem.”</p>
            </div>
          </div>
        </div>

        <nav aria-label="Your learning journey" className="glass mt-6 grid grid-cols-2 gap-3 rounded-card p-4 md:grid-cols-4">
          {route.map(([title, desc], index) => (
            <div key={title} className="flex items-center gap-3">
              <span className="font-cinema text-2xl text-gold">0{index + 1}</span>
              <div className="leading-tight">
                <strong className="block text-[#fff5df]">{title}</strong>
                <span className="text-sm text-text-secondary">{desc}</span>
              </div>
            </div>
          ))}
        </nav>
      </main>

      {/* ---------- How it works ---------- */}
      <section className="relative z-10 px-[6%] py-16">
        <p className="eyebrow">How you learn</p>
        <h2 className="mt-2 text-3xl font-bold md:text-4xl">Learning here is like a game. 🎮</h2>
        <p className="mt-2 max-w-2xl text-text-secondary">No long chapters. No hard words. Short stories, quick choices, and clear answers.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map(({ icon: Icon, color, title, text }) => (
            <div key={title} className="glass rounded-card p-5">
              <span className={`flex h-11 w-11 items-center justify-center rounded-full ${color}`}>
                <Icon size={20} />
              </span>
              <h3 className="mt-4 text-xl font-bold">{title}</h3>
              <p className="mt-1 text-text-secondary">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Try it right now ---------- */}
      <section className="relative z-10 px-[6%] py-8">
        <div className="glass grid gap-6 rounded-card p-6 md:grid-cols-2 md:p-8">
          <div>
            <p className="eyebrow">Try it right now</p>
            <h2 className="mt-2 text-3xl font-bold">Ravi’s chai stall ☕</h2>
            <p className="mt-3 text-text-secondary">
              Ravi sells chai for <strong className="text-text">₹{price}</strong> a cup. Move the slider to choose how many cups he sells in a day.
            </p>
            <div className="box-simple mt-5 rounded-control p-4 text-sm">
              <strong className="text-sunshine">In simple words:</strong> <Term id="revenue">Revenue</Term> is all the money that comes in.
              It is just <em>price × how many you sell</em>.
            </div>
          </div>
          <div className="rounded-card bg-white/5 p-5">
            <label htmlFor="cups" className="flex items-center justify-between text-sm text-text-secondary">
              <span>Cups sold today</span>
              <strong className="font-display text-2xl text-text">{cups}</strong>
            </label>
            <input id="cups" type="range" min={0} max={200} step={5} value={cups} onChange={(event) => setCups(Number(event.target.value))} className="mt-3 w-full" />
            <div className="mt-5 grid grid-cols-3 items-center gap-2 text-center">
              <div className="rounded-control bg-sky/15 p-3">
                <p className="text-xs text-text-secondary">Price</p>
                <p className="font-display text-xl font-bold text-sky">₹{price}</p>
              </div>
              <div className="rounded-control bg-pink/15 p-3">
                <p className="text-xs text-text-secondary">Cups</p>
                <p className="font-display text-xl font-bold text-pink">× {cups}</p>
              </div>
              <div className="rounded-control bg-mint/15 p-3">
                <p className="text-xs text-text-secondary">Revenue</p>
                <p className="font-display text-xl font-bold text-mint">₹{(price * cups).toLocaleString("en-IN")}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-text-secondary">
              {cups === 0 ? "No cups sold means no money. Ravi needs customers! 😅" : cups >= 150 ? "Wow, busy day! 🎉 That is a lot of chai." : "Nice! Now you know what revenue means. 👍"}
            </p>
          </div>
        </div>
      </section>

      {/* ---------- 9 modules ---------- */}
      <section className="relative z-10 px-[6%] py-16">
        <p className="eyebrow">Your learning path</p>
        <h2 className="mt-2 text-3xl font-bold md:text-4xl">9 modules. From idea to pitch.</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <div key={module.number} className={`glass rounded-card border-t-4 p-5 transition-transform hover:-translate-y-1 ${module.border}`}>
              <div className="flex items-center justify-between">
                <span className={`rounded-pill px-3 py-1 text-xs font-bold ${module.bg} ${module.text}`}>Module {module.number}</span>
                <span className="text-2xl" aria-hidden="true">{module.emoji}</span>
              </div>
              <h3 className="mt-4 text-xl font-bold">{module.title}</h3>
              <p className="mt-1 text-sm text-text-secondary">{module.simple}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-[6%] pb-20">
        <div className="btn-rainbow flex flex-col items-start justify-between gap-6 rounded-card p-8 shadow-card md:flex-row md:items-center md:p-10">
          <div>
            <p className="text-sm font-semibold text-white/80">Ready? It takes 1 minute to start.</p>
            <h2 className="mt-1 max-w-xl text-3xl font-bold text-white">Start with your name — or with no idea at all.</h2>
          </div>
          <Link href={startHref} className="inline-flex min-h-[52px] items-center gap-2 rounded-control bg-white px-6 font-bold text-[#3b2a8c] shadow-card hover:bg-white/90">
            {returning ? "Continue learning" : "Start learning"} <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
