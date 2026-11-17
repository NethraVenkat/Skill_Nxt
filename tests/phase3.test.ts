import { describe, expect, it } from "vitest";

import { allLessons } from "../content/lessons";
import { calculateBreakEven, createStartingCompanyState, scoreProblem } from "../lib/sim/engine";

describe("Phase 3 lesson content", () => {
  it("contains lessons across Modules 1-3", () => {
    expect(allLessons).toHaveLength(9);
    expect(new Set(allLessons.map((lesson) => lesson.module)).size).toBe(3);
  });

  it("ensures each lesson starts with the required teaching sequence", () => {
    for (const lesson of allLessons) {
      const order = lesson.steps.map((step) => step.type);
      expect(order.slice(0, 6)).toEqual(["challenge", "decision", "consequence", "insight", "retry", "mission"]);
      expect(lesson.objective.length).toBeGreaterThanOrEqual(3);
      expect(lesson.conceptTags.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("keeps simulator maths deterministic and reusable", () => {
    const state = createStartingCompanyState();
    expect(state.cash).toBe(1000000);
    expect(state.runway).toBe(12);
    expect(scoreProblem(5, 2, 1)).toBe(11);
    expect(calculateBreakEven(90000, 599, 240)).toBe(251);
  });
});
