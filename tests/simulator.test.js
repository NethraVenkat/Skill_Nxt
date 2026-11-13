import { test } from "node:test";
import assert from "node:assert/strict";
import {
  applyDecision,
  applyMonthlyTick,
  calculateRunway,
  createInitialCompanyState,
} from "../src/simulator/engine.js";

test("initial company starts with the documented runway", () => {
  const state = createInitialCompanyState();
  assert.equal(state.cash, 1000000);
  assert.equal(state.monthlyBurn, 83333);
  assert.equal(state.runwayMonths, 12);
});

test("interview decision increases evidence without adding customers", () => {
  const transition = applyDecision(createInitialCompanyState(), "interview");
  assert.equal(transition.stateAfter.evidenceQuality, 12);
  assert.equal(transition.stateAfter.customers, 0);
  assert.equal(transition.stateAfter.monthsElapsed, 1);
  assert.ok(transition.stateAfter.cash < 1000000);
});

test("monthly tick calculates customers, revenue, cash and runway", () => {
  const state = {
    ...createInitialCompanyState(),
    leads: 100,
    conversionRate: 10,
    customers: 4,
    churnRate: 0,
    averagePrice: 500,
    variableCostPerCustomer: 120,
  };
  const next = applyMonthlyTick(state);
  assert.equal(next.customers, 14);
  assert.equal(next.revenue, 7000);
  assert.equal(next.cash, 921987);
  assert.equal(next.runwayMonths, calculateRunway(next));
});

test("unknown decisions fail explicitly", () => {
  assert.throws(
    () => applyDecision(createInitialCompanyState(), "unknown"),
    /Unknown simulator decision/,
  );
});
