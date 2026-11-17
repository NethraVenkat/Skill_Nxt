# Simulator content guide

This is the source-of-truth content contract for the learning engine used by the lesson system and concept labs.

## Canonical company state

The simulator uses the following values in rupees and percentages:

- cash: money available to the company
- burn: monthly operating burn
- runway: cash / burn, rounded to 2 decimals
- customers: current active customers or users
- churn: percentage of customers lost each month
- conversion: percentage of interested leads who convert
- monthlyRevenue: revenue generated in the current month
- morale: team morale from 0–100
- valuation: current practice valuation
- evidenceQuality: quality of customer evidence from 0–100

## Core rules

- Every decision affects the company state through a deterministic delta object.
- The learner always decides before seeing the concept insight.
- Every wrong answer must name the misconception and give a corrective explanation.
- The lesson player must never permanently mutate the learner's main company state unless a lesson explicitly sets a branch state.
- Practice branches are isolated to lesson-scope state, and the main venture state remains intact.

## Decision effect structure

The simulator uses the following delta fields:

- cashDelta: changes the company's cash
- burnDelta: changes burn quickly and affects runway
- customersDelta: adds or removes current customers
- revenueDelta: affects monthlyRevenue
- moraleDelta: raises or lowers morale
- evidenceDelta: improves or reduces evidenceQuality
- valuationDelta: changes practice valuation
- conversionDelta: modifies how many interested leads become customers
- churnDelta: changes churn rate

## Example formulas

- Runway = cash / burn
- Break-even customers = ceil((fixedBurn + targetProfit) / (price - variableCost))
- Problem score = frequency * severity + workaround
- Evidence quality is a 0–100 confidence score that increases with interviews and decreases with weak or unsupported assumptions

## Lesson branch rule

A lesson run creates a branch snapshot of the company's main state before the challenge. That branch is used for the lesson consequence and retry. The main venture is only updated if the lesson is marked as a mission-scoped branch or the user explicitly chooses to keep the result.

## Event model

The content layer can trigger data events such as:

- lesson_started
- decision_made
- consequence_seen
- insight_completed
- retry_completed
- reflection_written
- mission_submitted
- mastery_passed
- mastery_failed

This keeps analytics and learning review cleanly separated from UI behavior.
