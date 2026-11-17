"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookA,
  BookOpen,
  BriefcaseBusiness,
  ChevronDown,
  Crown,
  Download,
  FlaskConical,
  LayoutDashboard,
  MessageSquareQuote,
  MoreHorizontal,
  Pencil,
  RotateCcw,
  Rocket,
  Sparkles,
  Upload,
  Users,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SceneBackground, sceneForPath } from "@/components/scene-background";
import { Term } from "@/components/term";
import { cn } from "@/lib/utils";
import { importGuestProgress, resetGuestProgress, updateGuestProgress, type GuestProgress } from "@/lib/guest-progress";
import { useGuestProgress } from "@/lib/use-guest-progress";

const navigation = [
  { href: "/hq", label: "Venture HQ", hint: "Your home base", icon: LayoutDashboard, color: "bg-coral/20 text-coral" },
  { href: "/curriculum", label: "Curriculum", hint: "All lessons", icon: BookOpen, color: "bg-sky/20 text-sky" },
  { href: "/simulator", label: "Simulator", hint: "Try decisions", icon: BarChart3, color: "bg-mint/20 text-mint" },
  { href: "/labs/pricing", label: "Labs", hint: "Play with numbers", icon: FlaskConical, color: "bg-orange/20 text-orange" },
  { href: "/roleplay/customer", label: "Arena", hint: "Practise talking", icon: MessageSquareQuote, color: "bg-pink/20 text-pink" },
  { href: "/missions", label: "Missions", hint: "Real-life tasks", icon: Rocket, color: "bg-violet/20 text-violet" },
  { href: "/passport", label: "Passport", hint: "Your work", icon: BriefcaseBusiness, color: "bg-sunshine/20 text-sunshine" },
  { href: "/cohort", label: "Cohort", hint: "Learn together", icon: Users, color: "bg-teal/20 text-teal" },
  { href: "/demo-day", label: "Demo Day", hint: "Show your idea", icon: Crown, color: "bg-indigo/20 text-indigo" },
  { href: "/glossary", label: "Word Book", hint: "Words made simple", icon: BookA, color: "bg-gold/20 text-gold" },
];

function pageTitle(pathname: string) {
  const item = navigation.find(({ href }) => pathname === href || pathname.startsWith(`${href.split("/").slice(0, 2).join("/")}/`) || pathname.startsWith(href));
  if (pathname.startsWith("/lessons")) return { eyebrow: "Lesson", title: "Learn step by step" };
  return { eyebrow: item?.hint ?? "Startup studio", title: item?.label ?? "Venture HQ" };
}

function formatCash(cashPaise: bigint) {
  return `₹${(Number(cashPaise) / 10000000).toFixed(1)}L`;
}

function downloadProgress(progress: GuestProgress) {
  const blob = new Blob([JSON.stringify(progress, (_key, value) => (typeof value === "bigint" ? `${value}n` : value), 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "venturecraft-progress.json";
  link.click();
  URL.revokeObjectURL(url);
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const progress = useGuestProgress();
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const name = progress.learner.name;
  const { eyebrow, title } = pageTitle(pathname);

  const editName = () => {
    const next = window.prompt("What should we call you?", name);
    if (next === null) return;
    updateGuestProgress((current) => ({ ...current, learner: { ...current.learner, name: next.trim() || "Founder" } }));
    setMenuOpen(false);
  };

  const handleReset = () => {
    if (!window.confirm("Start over? This clears your progress on this device.")) return;
    resetGuestProgress();
    setMenuOpen(false);
  };

  const handleImport = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const imported = importGuestProgress(JSON.parse(String(reader.result)));
        if (!imported) {
          window.alert("Hmm, that file is not a VentureCraft progress file.");
          return;
        }
        setMenuOpen(false);
      } catch {
        window.alert("Sorry, we could not read that file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="relative min-h-screen text-text">
      <SceneBackground scene={sceneForPath(pathname)} variant="app" />

      <div className="relative z-10 mx-auto flex max-w-[1600px]">
        <aside className="glass sticky top-0 hidden h-screen w-72 shrink-0 overflow-y-auto rounded-none border-y-0 border-l-0 p-5 lg:block">
          <Link href="/" className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-card bg-gradient-to-br from-primary to-pink text-white shadow-card">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">VENTURECRAFT</p>
              <p className="text-sm text-text-secondary">Learn by building</p>
            </div>
          </Link>

          <nav className="space-y-1.5" aria-label="Main">
            {navigation.map(({ href, label, icon: Icon, color }) => {
              const base = href.split("/").slice(0, 2).join("/");
              const active = pathname === href || pathname.startsWith(`${base}/`) || pathname === base;
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-control px-3 py-2.5 text-sm transition-colors",
                    active ? "bg-primary/20 font-semibold text-text ring-1 ring-primary/50" : "text-text-secondary hover:bg-white/5 hover:text-text",
                  )}
                >
                  <span className={cn("flex h-7 w-7 items-center justify-center rounded-full", color)}>
                    <Icon size={15} />
                  </span>
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 rounded-card border border-sunshine/40 bg-sunshine/10 p-4">
            <div className="mb-2 flex items-center gap-2 text-sunshine">
              <Crown size={16} />
              <span className="text-xs font-bold uppercase tracking-[0.18em]">Next reward</span>
            </div>
            <p className="text-sm text-text-secondary">Finish Module 1 to earn your first badge ⭐</p>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="glass sticky top-0 z-20 rounded-none border-x-0 border-t-0 px-4 py-3 sm:px-6">
            <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Link href="/" className="flex h-10 w-10 items-center justify-center rounded-control bg-gradient-to-br from-primary to-pink text-white lg:hidden" aria-label="VentureCraft home">
                  <Rocket size={18} />
                </Link>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{eyebrow}</p>
                  <h1 className="m-0 text-lg font-semibold leading-tight text-text">{title}</h1>
                </div>
              </div>

              <div className="hidden items-center gap-3 rounded-pill border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-secondary md:flex">
                <span>💵 <Term id="cash">Cash</Term></span>
                <span className="font-semibold text-mint">{formatCash(progress.company.cashPaise)}</span>
                <span className="text-white/20">|</span>
                <span>🛫 <Term id="runway">Runway</Term></span>
                <span className="font-semibold text-sky">{progress.company.runwayMonths.toFixed(1)} months</span>
              </div>

              <div className="relative">
                <Button variant="secondary" onClick={() => setMenuOpen((open) => !open)} className="gap-2" aria-expanded={menuOpen} aria-haspopup="menu" aria-label={`${name} — your menu`}>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-pink text-xs font-bold text-white">
                    {name.slice(0, 1).toUpperCase()}
                  </span>
                  <span className="hidden sm:inline">{name}</span>
                  <ChevronDown size={16} />
                </Button>
                {menuOpen ? (
                  <div role="menu" className="glass-strong absolute right-0 top-12 z-40 w-64 rounded-card p-2">
                    <p className="px-3 py-2 text-xs text-text-muted">Saved on this device — no account needed</p>
                    <MenuItem onClick={editName} icon={<Pencil size={15} />}>Change my name</MenuItem>
                    <MenuItem onClick={() => downloadProgress(progress)} icon={<Download size={15} />}>Download my progress</MenuItem>
                    <MenuItem onClick={() => fileInputRef.current?.click()} icon={<Upload size={15} />}>Load my progress</MenuItem>
                    <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={(event) => handleImport(event.target.files?.[0])} />
                    <button type="button" role="menuitem" onClick={handleReset} className="mt-1 flex w-full items-center gap-2 rounded-control px-3 py-2 text-left text-sm text-error hover:bg-error/10">
                      <RotateCcw size={15} /> Start over
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-[1200px] px-4 pb-28 pt-6 sm:px-6 lg:pb-10">{children}</main>
        </div>
      </div>

      {moreOpen ? (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMoreOpen(false)}>
          <div className="glass-strong absolute inset-x-2 bottom-20 rounded-card p-3" onClick={(event) => event.stopPropagation()}>
            <div className="mb-2 flex items-center justify-between px-1">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">More places</p>
              <button type="button" onClick={() => setMoreOpen(false)} aria-label="Close" className="rounded-full p-1 text-text-secondary hover:bg-white/10">
                <X size={16} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {navigation.slice(4).map(({ href, label, icon: Icon, color }) => (
                <Link key={href} href={href} onClick={() => setMoreOpen(false)} className="flex flex-col items-center gap-1 rounded-control px-2 py-3 text-center text-[11px] text-text-secondary hover:bg-white/5">
                  <span className={cn("flex h-8 w-8 items-center justify-center rounded-full", color)}>
                    <Icon size={15} />
                  </span>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <nav className="glass fixed inset-x-0 bottom-0 z-30 rounded-none border-x-0 border-b-0 p-2 lg:hidden" aria-label="Quick">
        <div className="grid grid-cols-5 gap-1">
          {navigation.slice(0, 4).map(({ href, label, icon: Icon, color }) => {
            const base = href.split("/").slice(0, 2).join("/");
            const active = pathname === href || pathname.startsWith(`${base}/`);
            return (
              <Link key={href} href={href} className={cn("flex flex-col items-center gap-1 rounded-control px-1 py-2 text-[11px]", active ? "bg-primary/20 text-text" : "text-text-secondary")}>
                <span className={cn("flex h-6 w-6 items-center justify-center rounded-full", color)}>
                  <Icon size={14} />
                </span>
                {label}
              </Link>
            );
          })}
          <button type="button" onClick={() => setMoreOpen((open) => !open)} className="flex flex-col items-center gap-1 rounded-control px-1 py-2 text-[11px] text-text-secondary" aria-expanded={moreOpen}>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
              <MoreHorizontal size={14} />
            </span>
            More
          </button>
        </div>
      </nav>
    </div>
  );
}

function MenuItem({ onClick, icon, children }: { onClick: () => void; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <button type="button" role="menuitem" onClick={onClick} className="flex w-full items-center gap-2 rounded-control px-3 py-2 text-left text-sm text-text hover:bg-white/5">
      {icon} {children}
    </button>
  );
}
