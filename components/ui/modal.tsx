"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export function Modal({
  open,
  onClose,
  title,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className={cn("w-full max-w-lg glass-strong rounded-card p-6", className)}>
        <div className="mb-4 flex items-center justify-between gap-4">
          <h3 className="text-xl font-semibold text-text">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-control border border-border px-2 py-1 text-sm text-text-secondary"
            aria-label="Close dialog"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
