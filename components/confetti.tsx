"use client";

import { useMemo } from "react";

const colours = ["#ff8070", "#ffcc4d", "#40d6a0", "#5cb2ff", "#ff70b0", "#9678ff", "#ff9a54"];

/** A short burst of colourful confetti. Hidden for people who prefer less motion. */
export function Confetti({ pieces = 70 }: { pieces?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: pieces }, (_, index) => ({
        left: `${(index * 37) % 100}%`,
        delay: `${(index % 10) * 0.07}s`,
        drift: `${((index * 53) % 120) - 60}px`,
        colour: colours[index % colours.length],
        rotate: `${(index * 47) % 360}deg`,
      })),
    [pieces],
  );

  return (
    <div aria-hidden="true">
      {items.map((item, index) => (
        <span
          key={index}
          className="confetti-piece"
          style={{
            left: item.left,
            background: item.colour,
            animationDelay: item.delay,
            transform: `rotate(${item.rotate})`,
            ["--drift" as string]: item.drift,
          }}
        />
      ))}
    </div>
  );
}
