"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

export type SceneName = "observatory" | "studio" | "laboratory" | "validation" | "arena" | "auction";

/**
 * The cinematic artwork background from the original Venture Atlas.
 * Same images, same shading and the same gentle mouse "depth" movement.
 */
export function SceneBackground({
  scene = "observatory",
  variant = "home",
  className,
}: {
  scene?: SceneName;
  variant?: "home" | "app";
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !finePointer) return;

    let frame = 0;
    const move = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty("--depth-x", `${x}`);
        root.style.setProperty("--depth-y", `${y}`);
      });
    };
    const reset = () => {
      root.style.setProperty("--depth-x", "0");
      root.style.setProperty("--depth-y", "0");
    };

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", reset);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", reset);
    };
  }, []);

  const src = `/art/${scene}.webp`;

  return (
    <div ref={rootRef} className={cn("scene-bg", className)} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img key={src} className="scene-plate" src={src} alt="" fetchPriority="high" />
      <div className="scene-light scene-light--city" style={{ backgroundImage: `url(${src})` }} />
      <div className="scene-light scene-light--core" style={{ backgroundImage: `url(${src})` }} />
      {variant === "home" ? (
        <svg className="scene-route" viewBox="0 0 1600 900" preserveAspectRatio="none">
          <path d="M835 484 Q1100 130 1335 405 Q1230 650 954 480" />
        </svg>
      ) : null}
      <div className={variant === "home" ? "scene-shade" : "scene-shade scene-shade--app"} />
      <div className="scene-reflection" />
    </div>
  );
}

/** Which artwork each part of the app uses. */
export function sceneForPath(pathname: string): SceneName {
  if (pathname.startsWith("/curriculum") || pathname.startsWith("/lessons")) return "studio";
  if (pathname.startsWith("/simulator") || pathname.startsWith("/labs")) return "laboratory";
  if (pathname.startsWith("/roleplay")) return "arena";
  if (pathname.startsWith("/missions")) return "validation";
  if (pathname.startsWith("/passport") || pathname.startsWith("/glossary")) return "studio";
  if (pathname.startsWith("/cohort") || pathname.startsWith("/demo-day")) return "auction";
  return "observatory";
}
