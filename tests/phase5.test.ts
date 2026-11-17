import { describe, expect, it } from "vitest";

import missionCatalog, { missionById } from "@/content/missions";
import { getMissionCompletionScore, missionSchema, validateMission } from "@/lib/missions";

describe("mission system", () => {
  it("loads all nine modules and validates each mission", () => {
    expect(missionCatalog).toHaveLength(9);

    for (const mission of missionCatalog) {
      expect(missionSchema.safeParse(mission).success).toBe(true);
      expect(validateMission(mission).valid).toBe(true);
    }
  });

  it("provides mission lookup by id", () => {
    expect(missionById["module-1-found-problem"]).toBeDefined();
    expect(missionById["module-3-validate-idea"].title).toContain("Test");
  });

  it("scores completion based on evidence completeness", () => {
    const mission = missionById["module-3-validate-idea"];
    expect(getMissionCompletionScore(mission, 2)).toBe(67);
    expect(getMissionCompletionScore(mission, 3)).toBe(100);
  });
});
