"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-4 text-text">
      <div className="max-w-md rounded-card border border-border bg-surface p-6 text-center">
        <h2 className="text-2xl font-semibold">Something went wrong</h2>
        <p className="mt-3 text-sm text-text-secondary">A problem occurred while loading this part of VentureCraft. Please try again.</p>
        <div className="mt-6">
          <Button onClick={reset}>Try again</Button>
        </div>
      </div>
    </main>
  );
}
