"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export function Toast({
  message,
  tone = "default",
  open,
  onDismiss,
}: {
  message: string;
  tone?: "default" | "success" | "warning" | "danger";
  open: boolean;
  onDismiss: () => void;
}) {
  if (!open) return null;

  const tones = {
    default: "border-border bg-tint text-text",
    success: "border-success/50 bg-success/10 text-success",
    warning: "border-warning/50 bg-warning/10 text-warning",
    danger: "border-error/50 bg-error/10 text-error",
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm glass-strong rounded-card p-4">
      <div className={cn("rounded-control border px-3 py-2 text-sm", tones[tone])}>
        <div className="flex items-center justify-between gap-4">
          <span>{message}</span>
          <button type="button" className="text-xs uppercase tracking-[0.12em]" onClick={onDismiss}>
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
