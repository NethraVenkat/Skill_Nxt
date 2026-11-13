export const INITIAL_COMPANY_STATE = Object.freeze({
  cash: 1000000,
  monthlyBurn: 83333,
  runwayMonths: 12,
  customers: 0,
  leads: 0,
  churnRate: 5,
  conversionRate: 2,
  averagePrice: 0,
  variableCostPerCustomer: 0,
  revenue: 0,
  morale: 70,
  quality: 50,
  evidenceQuality: 0,
  awareness: 0,
  retentionRate: 95,
  valuation: 0,
  monthsElapsed: 0,
  weakSpot: "problem",
});

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const round = (value) => Math.round(value);

export const DECISIONS = [
  {
    id: "interview",
    label: "Interview five people",
    description: "Learn what happened before spending money on a solution.",
    effects: { cash: -5000, evidenceQuality: 12, leads: 20, morale: 1 },
    insight: "Behaviour from a recent episode is stronger evidence than a promise.",
  },
  {
    id: "build-app",
    label: "Build an app",
    description: "Spend now to create a polished solution before validation.",
    effects: { cash: -120000, monthlyBurn: 10000, morale: 2, quality: 4 },
    insight: "A solution cannot rescue a problem that has not been verified.",
  },
  {
    id: "poll",
    label: "Post a broad interest poll",
    description: "Ask a large group whether they would use the idea.",
    effects: { cash: -2000, leads: 20, evidenceQuality: 3, conversionRate: -0.2 },
    insight: "Interest is a clue; a past behaviour or commitment is stronger evidence.",
  },
  {
    id: "paid-pilot",
    label: "Offer a paid pilot",
    description: "Ask a small group to pay for a real outcome this week.",
    effects: {
      cash: 4000,
      customers: 2,
      evidenceQuality: 5,
      morale: 3,
      churnRate: 1,
      averagePrice: 2000,
      variableCostPerCustomer: 500,
    },
    insight: "A paid commitment reveals more than a compliment, but delivery quality matters.",
  },
];

export function calculateRunway(state) {
  const monthlyNetCost =
    state.monthlyBurn +
    state.customers * state.variableCostPerCustomer -
    state.revenue;
  return monthlyNetCost <= 0
    ? 60
    : Number((state.cash / monthlyNetCost).toFixed(1));
}

export function calculateValuation(state) {
  if (state.customers === 0) return Math.min(200000, state.evidenceQuality * 2000);
  const qualityMultiplier = 0.5 + state.quality / 100;
  const evidenceMultiplier = 0.5 + state.evidenceQuality / 100;
  const moraleMultiplier = 0.75 + state.morale / 400;
  return Math.max(
    0,
    round(
      state.revenue *
        12 *
        qualityMultiplier *
        evidenceMultiplier *
        moraleMultiplier,
    ),
  );
}

function applyEffects(state, effects = {}) {
  const next = { ...state };
  for (const [key, value] of Object.entries(effects)) {
    if (typeof next[key] === "number") next[key] += value;
  }
  next.cash = Math.max(0, next.cash);
  next.monthlyBurn = Math.max(0, next.monthlyBurn);
  next.customers = Math.max(0, round(next.customers));
  next.leads = Math.max(0, round(next.leads));
  next.morale = clamp(round(next.morale), 0, 100);
  next.quality = clamp(round(next.quality), 0, 100);
  next.evidenceQuality = clamp(round(next.evidenceQuality), 0, 100);
  next.awareness = clamp(round(next.awareness), 0, 100);
  next.churnRate = clamp(next.churnRate, 0, 100);
  next.conversionRate = clamp(next.conversionRate, 0, 100);
  next.averagePrice = Math.max(0, next.averagePrice);
  next.variableCostPerCustomer = Math.max(0, next.variableCostPerCustomer);
  return next;
}

export function applyMonthlyTick(state) {
  const newCustomers = round((state.leads * state.conversionRate) / 100);
  const lostCustomers = round((state.customers * state.churnRate) / 100);
  const customers = clamp(
    state.customers + newCustomers - lostCustomers,
    0,
    100000,
  );
  const revenue = round(customers * state.averagePrice);
  const variableSpend = round(customers * state.variableCostPerCustomer);
  const cash = Math.max(
    0,
    round(state.cash - state.monthlyBurn - variableSpend + revenue),
  );
  const next = {
    ...state,
    cash,
    customers,
    revenue,
    retentionRate: round(100 - state.churnRate),
    monthsElapsed: state.monthsElapsed + 1,
  };
  next.runwayMonths = calculateRunway(next);
  next.valuation = calculateValuation(next);
  if (next.cash === 0) next.weakSpot = "cash";
  else if (next.evidenceQuality < 30) next.weakSpot = "evidence";
  else if (next.quality < 60) next.weakSpot = "quality";
  else if (next.runwayMonths < 6) next.weakSpot = "runway";
  else next.weakSpot = "growth";
  return next;
}

export function applyDecision(state, decisionId) {
  const decision = DECISIONS.find((item) => item.id === decisionId);
  if (!decision) throw new Error(`Unknown simulator decision: ${decisionId}`);
  const immediate = applyEffects(state, decision.effects);
  const next = applyMonthlyTick(immediate);
  return {
    stateBefore: state,
    stateAfter: next,
    decision,
    consequence: {
      cashDelta: next.cash - state.cash,
      customersDelta: next.customers - state.customers,
      valuationDelta: next.valuation - state.valuation,
      runwayDelta: Number((next.runwayMonths - state.runwayMonths).toFixed(1)),
    },
  };
}

export function createInitialCompanyState() {
  return { ...INITIAL_COMPANY_STATE };
}
