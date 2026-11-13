# Concept Labs Specification

All labs use the learner’s current venture inputs but provide resettable practice examples. Every lab has a **Try**, **Explain**, and **Apply to my venture** mode. Inputs are never silently overwritten; invalid values show the reason and the nearest valid range.

## Pricing Lab

- **Purpose:** Explore value, price, conversion, contribution margin, and fairness.
- **Inputs/controls:** Price slider ₹0–₹10,000; variable cost field; customer value cards; segment selector; service-level toggle; competitor reference range; monthly target customers.
- **Outputs/visuals:** Contribution margin per customer, expected conversion band, monthly revenue, monthly contribution, break-even customers, cash runway, and a price-versus-volume curve.
- **Aha moment:** A lower price can increase conversion while reducing contribution so much that the company reaches break-even later.
- **Edge cases:** Price below variable cost shows a red loss state; zero customers shows “no conclusion”; premium price with reliability-seeker segment shows a confidence warning; decimal values round to rupees.

## Break-even Machine

- **Purpose:** Connect fixed costs, variable costs, price, and required customers.
- **Inputs/controls:** Fixed monthly burn slider ₹0–₹10,00,000; price; variable cost; one-time setup cost; target monthly profit.
- **Outputs/visuals:** `breakEvenCustomers = ceil((fixedBurn + targetProfit) / (price - variableCost))`, break-even line chart, months-to-break-even, and runway impact.
- **Aha moment:** Revenue is not profit; the number of customers needed changes sharply when contribution margin is small.
- **Edge cases:** If price ≤ variable cost, show “no finite break-even”; negative target profit is rejected; fixed burn ₹0 displays contribution-only break-even.

## Customer Persona Builder

- **Purpose:** Narrow a broad audience into a reachable segment and separate evidence from assumptions.
- **Inputs/controls:** Segment name; context; trigger; frequency; current workaround; consequence; access channel; evidence cards tagged observed/assumed; inclusion/exclusion rules.
- **Outputs/visuals:** Persona card, journey strip, confidence meter, assumption count, and “next interview” question suggestions.
- **Aha moment:** A vivid persona is not validated until each important claim has a source.
- **Edge cases:** No evidence yields a visible “hypothesis only” label; contradictory evidence is preserved as a fork; personally identifying information is blocked from saved proof.

## Business Model Canvas

- **Purpose:** See how customer, value, channel, relationship, revenue, resources, activities, partners, and costs constrain one another.
- **Inputs/controls:** Drag cards into nine blocks; evidence tag; dependency links; cost and revenue fields; “weak spot” button.
- **Outputs/visuals:** Canvas, unsupported-claim highlights, cost/revenue summary, and one recommended experiment based on the weakest evidence.
- **Aha moment:** A strong value proposition does not rescue an unproven channel or impossible cost structure.
- **Edge cases:** Empty blocks are allowed but marked incomplete; duplicate cards warn rather than delete; a canvas with no revenue path cannot be marked complete.

## Funnel Leak Finder

- **Purpose:** Diagnose where customers stop moving from awareness to retention.
- **Inputs/controls:** Counts for awareness, interest, activation, conversion, retention, referral; date range; segment filter; cohort comparison.
- **Outputs/visuals:** Funnel bars, stage-to-stage rates, confidence intervals for small samples, largest-leak highlight, and one suggested test.
- **Aha moment:** More top-of-funnel traffic does not solve a leak lower in the funnel.
- **Edge cases:** Counts must be non-increasing; zero upstream count shows “rate unavailable”; small samples show uncertainty rather than false precision; imported analytics must include a source.

## Pitch Evidence Mapper

- **Purpose:** Turn Passport evidence into a concise, honest pitch.
- **Inputs/controls:** Drag evidence cards into problem, customer, solution, traction, economics, ask, and risk; attach source and date; choose three-minute limit.
- **Outputs/visuals:** Story sequence, unsupported-claim warnings, time budget, and question cards generated from missing evidence.
- **Aha moment:** A pitch becomes stronger by removing unsupported claims, not adding adjectives.
- **Edge cases:** Claims without evidence cannot be presented as traction; stale evidence older than 90 days is flagged; sensitive customer data is masked.

## Team Capacity Map

- **Purpose:** Make bottlenecks, role ownership, and morale visible.
- **Inputs/controls:** Team member cards, weekly hours, role outcomes, decision rights, task load, and dependency links.
- **Outputs/visuals:** Capacity bars, single-owner warnings, bottleneck path, and morale risk.
- **Aha moment:** Hiring for a title does not solve a bottleneck unless the person owns a measurable outcome.
- **Edge cases:** A zero-hour role cannot own a deadline; two owners require a tie-breaker; overloaded users see a warning before saving.

