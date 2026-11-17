"use client";

import { useId, useState } from "react";
import Link from "next/link";

import { getTerm } from "@/lib/glossary";

/**
 * A business word with a simple explanation that appears on hover, focus or tap.
 * Usage: <Term id="runway">runway</Term>
 */
export function Term({ id, children }: { id: string; children?: React.ReactNode }) {
  const entry = getTerm(id);
  const [open, setOpen] = useState(false);
  const tipId = useId();

  if (!entry) return <>{children}</>;

  return (
    <span className="relative inline-block" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        className="term"
        aria-describedby={open ? tipId : undefined}
        onClick={() => setOpen((value) => !value)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        {children ?? entry.word}
      </button>
      {open ? (
        <span
          id={tipId}
          role="tooltip"
          className="glass-strong absolute bottom-full left-1/2 z-50 mb-2 block w-64 -translate-x-1/2 rounded-control p-3 text-left text-sm font-normal normal-case tracking-normal text-text"
        >
          <span className="mb-1 block font-display text-base font-bold">
            {entry.emoji} {entry.word}
          </span>
          <span className="block text-text-secondary">{entry.meaning}</span>
          <span className="mt-2 block rounded-md bg-sky/15 px-2 py-1 text-xs text-text">Example: {entry.example}</span>
        </span>
      ) : null}
    </span>
  );
}

/**
 * Turns text with [[id|shown words]] or [[id]] markers into text with tooltips.
 * Lesson content uses this so writers can mark business words easily.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[\[[^\]]+\]\])/g);
  return (
    <>
      {parts.map((part, index) => {
        const match = part.match(/^\[\[([^|\]]+)(?:\|([^\]]+))?\]\]$/);
        if (!match) return <span key={index}>{part}</span>;
        const [, id, label] = match;
        return (
          <Term key={index} id={id}>
            {label ?? friendlyLabel(getTerm(id)?.word ?? id)}
          </Term>
        );
      })}
    </>
  );
}

function friendlyLabel(word: string) {
  // "Problem" → "problem" inside a sentence, but keep short words like "MVP" as they are.
  return /^[A-Z][a-z]/.test(word) ? word.charAt(0).toLowerCase() + word.slice(1) : word;
}

export function GlossaryLink() {
  return (
    <Link href="/glossary" className="text-sm font-semibold text-sunshine underline-offset-4 hover:underline">
      See all words explained simply →
    </Link>
  );
}
