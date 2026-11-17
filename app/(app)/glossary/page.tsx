"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { NovaSays } from "@/components/nova";
import { glossary } from "@/lib/glossary";

export default function GlossaryPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const sorted = [...glossary].sort((a, b) => a.word.localeCompare(b.word));
    if (!q) return sorted;
    return sorted.filter((entry) => `${entry.word} ${entry.meaning} ${entry.example}`.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Word Book</p>
        <h2 className="mt-1 text-3xl font-bold md:text-4xl">Business words, made simple 📖</h2>
        <p className="mt-1 max-w-2xl text-text-secondary">Every word has a short meaning and an everyday example. No dictionary needed!</p>
      </div>

      <NovaSays>Whenever you see a word with a dotted yellow line in a lesson, you can tap it to see the meaning.</NovaSays>

      <label className="glass flex items-center gap-3 rounded-pill px-4 py-3">
        <Search size={18} className="text-text-muted" />
        <span className="sr-only">Search words</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search a word… e.g. runway, profit"
          className="w-full bg-transparent text-text outline-none placeholder:text-text-muted"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        {results.map((entry) => (
          <article key={entry.id} id={entry.id} className="glass rounded-card p-5">
            <h3 className="flex items-center gap-2 text-xl font-bold">
              <span aria-hidden="true">{entry.emoji}</span> {entry.word}
            </h3>
            <p className="mt-2">{entry.meaning}</p>
            <p className="box-example mt-3 rounded-control p-3 text-sm">
              <strong className="text-sky">Example:</strong> {entry.example}
            </p>
          </article>
        ))}
        {results.length === 0 ? <p className="text-text-secondary">No word found. Try a different spelling?</p> : null}
      </div>
    </div>
  );
}
