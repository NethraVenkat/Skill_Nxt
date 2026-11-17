export type CompanyState = {
  cash: number;
  burn: number;
  runway: number;
  customers: number;
  churn: number;
  conversion: number;
  monthlyRevenue: number;
  morale: number;
  valuation: number;
  evidenceQuality: number;
};

export type CompanyDelta = Partial<CompanyState> & {
  cashDelta?: number;
  burnDelta?: number;
  revenueDelta?: number;
  moraleDelta?: number;
  valuationDelta?: number;
  customersDelta?: number;
  evidenceDelta?: number;
};

export const createStartingCompanyState = (): CompanyState => ({
  cash: 1_000_000,
  burn: 83_333,
  runway: 12,
  customers: 0,
  churn: 5,
  conversion: 2,
  monthlyRevenue: 0,
  morale: 70,
  valuation: 0,
  evidenceQuality: 0,
});

export function calculateRunway(cash: number, burn: number): number {
  if (burn <= 0) return Number.POSITIVE_INFINITY;
  return Number((cash / burn).toFixed(2));
}

export function applyDecisionDelta(state: CompanyState, delta: CompanyDelta): CompanyState {
  const next: CompanyState = { ...state };

  next.cash = Number((next.cash + (delta.cashDelta ?? 0)).toFixed(2));
  next.burn = Number(Math.max(0, next.burn + (delta.burnDelta ?? 0)).toFixed(2));
  next.customers = Math.max(0, next.customers + (delta.customersDelta ?? 0));
  next.monthlyRevenue = Number((next.monthlyRevenue + (delta.revenueDelta ?? 0)).toFixed(2));
  next.morale = Math.min(100, Math.max(0, next.morale + (delta.moraleDelta ?? 0)));
  next.valuation = Number((next.valuation + (delta.valuationDelta ?? 0)).toFixed(2));
  next.evidenceQuality = Math.min(100, Math.max(0, next.evidenceQuality + (delta.evidenceDelta ?? 0)));

  if (delta.cash !== undefined) next.cash = Number(delta.cash.toFixed(2));
  if (delta.burn !== undefined) next.burn = Number(Math.max(0, delta.burn).toFixed(2));
  if (delta.runway !== undefined) next.runway = Number(delta.runway.toFixed(2));
  if (delta.customers !== undefined) next.customers = Math.max(0, delta.customers);
  if (delta.churn !== undefined) next.churn = Math.min(100, Math.max(0, delta.churn));
  if (delta.conversion !== undefined) next.conversion = Math.min(100, Math.max(0, delta.conversion));
  if (delta.monthlyRevenue !== undefined) next.monthlyRevenue = Number(delta.monthlyRevenue.toFixed(2));
  if (delta.morale !== undefined) next.morale = Math.min(100, Math.max(0, delta.morale));
  if (delta.valuation !== undefined) next.valuation = Number(delta.valuation.toFixed(2));
  if (delta.evidenceQuality !== undefined) next.evidenceQuality = Math.min(100, Math.max(0, delta.evidenceQuality));

  next.runway = calculateRunway(next.cash, next.burn);

  return next;
}

export function scoreProblem(frequency: number, severity: number, workaround: number): number {
  return frequency * severity + workaround;
}

export function calculateBreakEven(fixedBurn: number, price: number, variableCost: number, targetProfit = 0): number {
  if (price <= variableCost) return Number.POSITIVE_INFINITY;
  return Math.ceil((fixedBurn + targetProfit) / (price - variableCost));
}
