import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const accents = {
  coral: "border-t-coral text-coral bg-coral/20",
  sky: "border-t-sky text-sky bg-sky/20",
  mint: "border-t-mint text-mint bg-mint/20",
  sunshine: "border-t-sunshine text-sunshine bg-sunshine/20",
  pink: "border-t-pink text-pink bg-pink/20",
  violet: "border-t-violet text-violet bg-violet/20",
  orange: "border-t-orange text-orange bg-orange/20",
  teal: "border-t-teal text-teal bg-teal/20",
} as const;

export function StatTile({
  label,
  value,
  change,
  changeTone = "neutral",
  icon,
  hint,
  accent = "violet",
  className,
}: {
  label: ReactNode;
  value: string;
  change?: string;
  changeTone?: "neutral" | "positive" | "warning" | "danger";
  icon?: ReactNode;
  hint?: string;
  accent?: keyof typeof accents;
  className?: string;
}) {
  const toneClasses = {
    neutral: "text-text-secondary",
    positive: "text-success",
    warning: "text-warning",
    danger: "text-error",
  };
  const [border, color, bubble] = accents[accent].split(" ");

  return (
    <div className={cn("glass rounded-card border-t-2 p-4", border, className)}>
      <div className="mb-3 flex items-center justify-between text-text-secondary">
        <span className="text-sm font-medium">{label}</span>
        {icon ? <span className={cn("flex h-8 w-8 items-center justify-center rounded-full", bubble, color)}>{icon}</span> : null}
      </div>
      <div className="font-display text-2xl font-bold text-text">{value}</div>
      {hint ? <p className="mt-1 text-xs text-text-muted">{hint}</p> : null}
      {change ? <div className={cn("mt-2 text-xs font-semibold", toneClasses[changeTone])}>{change}</div> : null}
    </div>
  );
}
