import Link from "next/link";

import { SceneBackground } from "@/components/scene-background";

export default function NotFound() {
  return (
    <div className="relative min-h-screen">
      <SceneBackground scene="observatory" variant="app" />
      <main className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="glass max-w-md rounded-card p-6 text-center">
          <p className="text-5xl" aria-hidden="true">
            🧭
          </p>
          <h1 className="mt-2 text-3xl font-bold">Oops, wrong turn!</h1>
          <p className="mt-2 text-text-secondary">We couldn’t find this page. Let’s get you back on track.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/hq" className="btn-rainbow rounded-control px-5 py-3 font-semibold text-white">
              Go to Venture HQ
            </Link>
            <Link href="/curriculum" className="rounded-control border border-white/15 bg-white/5 px-5 py-3 font-semibold">
              See all lessons
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
