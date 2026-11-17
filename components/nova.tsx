import { cn } from "@/lib/utils";

/** Nova, the friendly guide, with a speech bubble. */
export function NovaSays({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-gold/60 bg-[#1b2b38] shadow-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/art/nova.webp" alt="Nova" className="absolute left-1/2 top-0 h-[260%] w-auto max-w-none -translate-x-1/2 object-cover" />
      </div>
      <div className="glass relative rounded-card rounded-tl-sm px-4 py-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold">Nova says</p>
        <p className="mt-0.5 text-text">{children}</p>
      </div>
    </div>
  );
}
