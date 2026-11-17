import { describe, expect, it } from "vitest";

import { calculateStreak, getTodayString } from "../lib/streak";

describe("streak logic", () => {
  it("returns zero when there is no activity yet", () => {
    expect(calculateStreak(null)).toBe(0);
  });

  it("counts the current streak for consecutive active days", () => {
    const today = new Date("2026-11-14T12:00:00Z");
    expect(calculateStreak("2026-11-13", today)).toBe(1);
    expect(calculateStreak("2026-11-12", today)).toBe(2);
  });

  it("formats the current date in YYYY-MM-DD", () => {
    expect(getTodayString(new Date("2026-11-14T09:00:00Z")).slice(0, 10)).toBe("2026-11-14");
  });
});
