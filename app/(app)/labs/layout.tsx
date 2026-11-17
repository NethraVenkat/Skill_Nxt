"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const labs = [
  { href: "/labs/pricing", label: "☕ Price" },
  { href: "/labs/break-even", label: "⚖️ Break-even" },
  { href: "/labs/problem-finder", label: "🧩 Problem scorer" },
  { href: "/labs/persona", label: "🧑‍🎓 Customer card" },
  { href: "/labs/validation", label: "✅ Idea test" },
  { href: "/labs/canvas", label: "🗺️ Idea map" },
  { href: "/labs/funnel", label: "🪣 Leaky funnel" },
];

export default function LabsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="space-y-6">
      <nav aria-label="Labs" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {labs.map((lab) => {
          const active = pathname === lab.href;
          return (
            <Link
              key={lab.href}
              href={lab.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "shrink-0 rounded-pill border px-4 py-2 text-sm font-medium transition",
                active ? "border-orange bg-orange/20 text-text" : "border-white/15 bg-white/5 text-text-secondary hover:bg-white/10",
              )}
            >
              {lab.label}
            </Link>
          );
        })}
      </nav>
      {children}
    </div>
  );
}
