"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const rooms = [
  { href: "/roleplay/customer", label: "🎤 Customer chat" },
  { href: "/roleplay/investor", label: "🎙️ Pitch practice" },
  { href: "/roleplay/mentor", label: "🧭 Thinking coach" },
];

export default function ArenaLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="space-y-6">
      <nav aria-label="Arena" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {rooms.map((room) => (
          <Link
            key={room.href}
            href={room.href}
            aria-current={pathname === room.href ? "page" : undefined}
            className={cn(
              "shrink-0 rounded-pill border px-4 py-2 text-sm font-medium transition",
              pathname === room.href ? "border-pink bg-pink/20 text-text" : "border-white/15 bg-white/5 text-text-secondary hover:bg-white/10",
            )}
          >
            {room.label}
          </Link>
        ))}
      </nav>
      {children}
    </div>
  );
}
