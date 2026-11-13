# Simulator Rules

## Purpose and clock

The simulator is a deterministic, replayable company model with seeded randomness. It is not a forecast and does not claim to predict a real venture. A decision advances one month unless a lesson explicitly uses a half-month action. Every state transition stores the previous state, decision, event seed, and explanation so the learner can inspect cause and effect.

## Company state

| Variable | Start | Range | Meaning |
|---|---:|---:|---|
| `cash` | ₹10,00,000 | ₹0–₹1,00,00,000 | Spendable virtual cash |
| `monthlyBurn` | ₹83,333 | ₹0–₹10,00,000 | Fixed operating cost before variable delivery cost |
| `runwayMonths` | 12 | 0–60 | `cash / (monthlyBurn + variableCostPerCustomer × customers)` |
| `customers` | 0 | 0–1,00,000 | Active paying customers at month end |
| `leads` | 0 | 0–10,00,000 | Qualified prospects available this month |
| `churnRate` | 5% | 0–100% | Share of prior active customers lost monthly |
| `conversionRate` | 2% | 0–100% | Share of qualified leads becoming customers |
| `averagePrice` | ₹0 | ₹0–₹1,00,000 | Average monthly customer price |
| `variableCostPerCustomer` | ₹0 | ₹0–₹50,000 | Delivery cost per active customer |
| `revenue` | ₹0 | ₹0–₹1,00,00,000 | Current monthly recurring revenue |
| `morale` | 70 | 0–100 | Team energy and confidence; not a mental-health diagnosis |
| `quality` | 50 | 0–100 | Reliability and customer-perceived quality |
| `evidenceQuality` | 0 | 0–100 | Strength of observed customer evidence |
| `awareness` | 0 | 0–100 | Reach among the chosen segment |
| `retentionRate` | 95% | 0–100% | `1 - churnRate` |
| `valuation` | ₹0 | ₹0–₹10,00,00,000 | Learning score expressed as company value |
| `monthsElapsed` | 0 | 0–60 | Simulation time |
| `weakSpot` | `problem` | fixed enum | Highest-risk learning area |

## Monthly transition

At month `t`, apply the selected decision, then one seeded event, then the monthly tick:

1. `newCustomers = round(leads × conversionRate / 100)`.
2. `lostCustomers = round(customers × churnRate / 100)`.
3. `customers = clamp(customers + newCustomers - lostCustomers, 0, 100000)`.
4. `revenue = customers × averagePrice`.
5. `variableSpend = customers × variableCostPerCustomer`.
6. `cash = cash - monthlyBurn - variableSpend + revenue`.
7. `retentionRate = 100 - churnRate`.
8. `runwayMonths = cash / max(1, monthlyBurn + customers × variableCostPerCustomer - revenue)`. If the denominator is zero, runway is 60.
9. `monthsElapsed += 1`.
10. Clamp all values to their ranges and append a state snapshot.

Cash may not become negative. If a cost would cross zero, the simulator caps spend at available cash and sets `cash = 0`, `runwayMonths = 0`, `morale -= 10`, and `weakSpot = cash`.

## Decision effects

Each decision is a typed effect object:

```text
DecisionEffect {
  cashDelta, burnDelta, leadsDelta, conversionDelta,
  churnDelta, priceDelta, variableCostDelta,
  moraleDelta, qualityDelta, evidenceDelta,
  awarenessDelta, customerDelta, monthsDelta
}
```

Effects are applied in this order: immediate cash and fixed values, customer/quality/evidence values, then the monthly transition. A decision must show its effect explanation; hidden effects are prohibited.

### Valuation formula

`valuation = round(max(0, monthlyRevenue × 12 × qualityMultiplier × evidenceMultiplier × moraleMultiplier))`.

- `qualityMultiplier = 0.5 + quality / 100` (0.5–1.5).
- `evidenceMultiplier = 0.5 + evidenceQuality / 100` (0.5–1.5).
- `moraleMultiplier = 0.75 + morale / 400` (0.75–1.0).
- If customers are 0, valuation is `evidenceQuality × ₹2,000`, capped at ₹2,00,000.

Valuation is the learning score, not a real-world company valuation.

## Customer personality types

Each simulated customer has a type, price sensitivity, quality sensitivity, and trust baseline. A segment’s mix is visible after the learner has made an initial choice.

| Type | Mix | Price reaction | Quality reaction | Marketing reaction |
|---|---:|---|---|---|
| Budget seeker | 35% | Conversion +1.5 points if price ≤ reference; −2 if above | Churn +2 points when quality <55 | Responds to transparent savings; weak to hype |
| Reliability seeker | 25% | Conversion −0.5 points if price is high | Churn −2 points when quality ≥75 | Responds to proof, guarantees, referrals |
| Explorer | 15% | Low sensitivity | Churn +1 point if novelty falls | Responds to new channels and experiments |
| Time-poor professional | 15% | Pays up to 1.3× reference | Conversion +1 point when service speed ≥75 | Responds to convenience and clear outcomes |
| Skeptical switcher | 10% | Needs 10% discount or proof | Conversion +1.5 points after a credible testimonial | Responds to peer evidence, not claims |

Per month, `conversionRate` is adjusted by the weighted segment response and bounded to 0–100. Churn is adjusted by quality, support response, and price fairness; it is bounded to 0–100.

## Random events

The event engine rolls once per month using the venture seed. Base probabilities are modified by state; events cannot repeat in consecutive months unless marked repeatable.

| Event | Trigger condition | Base probability | Effect |
|---|---|---:|---|
| Competitor launch | Awareness ≥20 | 8% | Conversion −1 point; churn +1; evidence +2 if researched |
| Viral mention | Quality ≥65 | 4% | Leads +80%; awareness +15; burn +₹5,000 |
| Employee quits | Morale <45 or burn unpaid | 5% | Burn −₹10,000; quality −8; morale −12 |
| Supplier price rise | Variable cost >₹0 | 7% | Variable cost +10%; cash −₹15,000 |
| Customer referral wave | Referral rate ≥10% | 6% | Leads +40%; conversion +1 point |
| Bad review cluster | Quality <55 and customers ≥5 | 7% | Churn +4; awareness −5; morale −4 |
| Festival demand | Month 3, 6, 9, or 12 | 12% | Leads +50%; delivery capacity −10 |
| Payment delay | Customers ≥5 | 6% | Revenue −20% this month; cash −₹20,000 |
| Helpful mentor intro | Evidence ≥30 | 5% | Leads +20; evidence +5; morale +3 |
| Local partnership | Awareness ≥15 | 5% | Cash −₹10,000; leads +50; conversion +0.5 |
| Platform algorithm shift | Marketing spend ≥₹20,000 | 8% | Awareness −10; marketing cost +15% |
| Prototype failure | Quality <45 and MVP not tested | 8% | Cash −₹30,000; quality −5; evidence +4 |
| Customer need changes | Churn ≥12% | 5% | One personality mix shifts by 10%; requires a new interview |
| Grant opportunity | Evidence ≥50 and cash <₹7,00,000 | 3% | Cash +₹1,00,000; morale +4; reporting task added |
| Community criticism | Marketing claim unsupported | 4% | Awareness −8; morale −6; trust penalty persists two months |
| Calm month | No trigger | 20% | No adverse effect; retrieval review appears |

Events show trigger, probability band, effect, and a suggested learning response. The learner can never pay to reroll.

## Rewind and “what if”

Rewind is available inside a lesson and in Simulator history, not after a real-world mission submission. The engine stores immutable snapshots keyed by `ventureId`, `monthsElapsed`, and `decisionIndex`. Selecting **What if** forks a temporary branch from a snapshot. Forks can run up to six months, compare cash, customers, runway, morale, quality, and valuation, and are labelled “practice branch.” They do not change mastery, cohort ranking, or Passport evidence. Returning to the mainline restores the last committed snapshot.

## Win and fail conditions

### Learning wins

- **Evidence win:** `evidenceQuality ≥ 70` and at least one valid mission.
- **Traction win:** `customers ≥ 25`, `churnRate ≤ 8%`, and `quality ≥ 65`.
- **Sustainable win:** `runwayMonths ≥ 6` and monthly contribution margin is positive.
- **Pitch-ready win:** all nine modules complete, Passport required items present, and pitch score ≥70.

### Failure states

- Cash reaches ₹0.
- Runway reaches 0 for two consecutive ticks.
- Morale reaches 0.
- Quality reaches 20 or below.

Failure opens a **Recovery Room**, not a dead end. The learner sees the causal chain, receives a smaller recovery decision, and may rewind to the last stable snapshot. A recovery decision trades valuation for learning: `evidenceQuality +8`, `morale +5`, `cash +₹50,000`, `valuation −10%`. The event becomes a spaced-review topic.

## Worked example: six decisions over six months

Starting state: cash ₹10,00,000; burn ₹83,333; customers 0; price ₹0; variable cost ₹0; morale 70; quality 50; evidence 0.

| Month | Decision and effects | Event | End cash | Customers | Revenue | Burn | Morale | Evidence |
|---:|---|---|---:|---:|---:|---:|---:|---:|
| 1 | Interview five: cash −₹5,000, evidence +12, leads +20 | Helpful mentor: evidence +5 | ₹9,11,667 | 0 | ₹0 | ₹83,333 | 74 | 17 |
| 2 | Paid pilot: cash −₹12,000, price ₹500, variable ₹120, conversion +2 points | Festival demand: leads +50% | ₹8,16,334 | 4 | ₹2,000 | ₹83,813 | 77 | 31 |
| 3 | Improve quality: cash −₹20,000, quality +10, burn +₹5,000 | Referral wave: leads +40% | ₹7,09,281 | 8 | ₹4,000 | ₹84,293 | 79 | 39 |
| 4 | Price test: price ₹700, conversion −0.5 points, evidence +8 | Competitor launch: conversion −1 point | ₹6,96,988 | 10 | ₹7,000 | ₹84,533 | 78 | 47 |
| 5 | Narrow segment: leads −10, conversion +2 points, evidence +10 | Bad review avoided because quality ≥60 | ₹6,91,455 | 13 | ₹9,100 | ₹84,893 | 80 | 57 |
| 6 | Referral experiment: cash −₹10,000, leads +40, conversion +1 point | Calm month | ₹6,12,528 | 17 | ₹11,900 | ₹85,373 | 81 | 57 |

Month 6 runway is `cash / (burn + variable spend − revenue) = ₹6,12,528 / (₹85,373 + ₹2,040 − ₹11,900) = 7.9 months`. The learner has not “won” yet: evidence is improving, but they must validate retention and reach sustainable contribution margin.

