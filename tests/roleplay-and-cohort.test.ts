import { describe, expect, it } from "vitest";

import { getCohortReadinessScore } from "../lib/cohort";
import { getMentorHint, scoreInvestorPitch } from "../lib/roleplay";

describe("roleplay and cohort logic", () => {
  it("scores investor pitches on clarity, evidence, traction, numbers, and risk", () => {
    const score = scoreInvestorPitch({
      clarity: 5,
      evidence: 4,
      traction: 4,
      numbers: 5,
      risk: 3,
    });

    expect(score.total).toBe(84);
    expect(score.verdict).toBe("Strong investor story");
    expect(score.strengths.length).toBe(5);
  });

  it("returns a mentor prompt relevant to the stage", () => {
    expect(getMentorHint("problem")).toContain("pain");
    expect(getMentorHint("pricing")).toContain("hesitate");
  });

  it("computes a cohort readiness score from live metrics", () => {
    expect(getCohortReadinessScore()).toBeGreaterThan(70);
    expect(getCohortReadinessScore()).toBeLessThanOrEqual(100);
  });
});
