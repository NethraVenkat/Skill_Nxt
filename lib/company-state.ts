export type StartingCompanyState = {
  cashPaise: bigint;
  monthlyBurnPaise: bigint;
  runwayMonths: number;
  customers: number;
  morale: number;
  valuationPaise: bigint;
};

export function createStartingCompanyState(): StartingCompanyState {
  return {
    cashPaise: 100_000_000n,
    monthlyBurnPaise: 8_333_300n,
    runwayMonths: 12,
    customers: 0,
    morale: 70,
    valuationPaise: 0n,
  };
}
