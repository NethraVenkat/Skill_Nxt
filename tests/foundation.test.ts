import { describe, expect, it } from "vitest";

import { createStartingCompanyState } from "../lib/company-state";

describe("Phase 1 foundation", () => {
  it("uses the documented starting company values as the next extension point", () => {
    expect(createStartingCompanyState()).toMatchObject({
      cashPaise: 100000000n,
      monthlyBurnPaise: 8333300n,
      runwayMonths: 12,
      customers: 0,
      morale: 70,
      valuationPaise: 0n,
    });
  });

  it("keeps the starting numbers stable across repeated calls", () => {
    const one = createStartingCompanyState();
    const two = createStartingCompanyState();

    expect(one).toEqual(two);
  });
});
