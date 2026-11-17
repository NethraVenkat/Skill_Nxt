import * as React from "react";

import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: "default" | "success" | "warning" | "danger" }) {
  const toneClasses = {
    default: "border-white/15 bg-white/5 text-text-secondary",
    success: "border-success/50 bg-success/10 text-success",
    warning: "border-warning/50 bg-warning/10 text-warning",
    danger: "border-error/50 bg-error/10 text-error",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em]",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}
