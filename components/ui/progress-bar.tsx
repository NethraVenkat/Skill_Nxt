import { cn } from "@/lib/utils";

export function ProgressBar({ value, className, barClassName }: { value: number; className?: string; barClassName?: string }) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={cn("h-2.5 w-full overflow-hidden rounded-full bg-white/10", className)} role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
      <div
        className={cn("h-full rounded-full bg-gradient-to-r from-primary via-pink to-sunshine transition-all duration-500", barClassName)}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
