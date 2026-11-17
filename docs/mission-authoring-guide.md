# Mission authoring guide

## Mission contract

Every mission in VentureCraft must teach a real-world skill in a way that is safe, cheap, and measurable. A mission is not a generic to-do list. It must show:

- a real goal connected to a skill concept
- why the skill matters for a founder
- a safe and realistic way to do it in India for ₹0–500
- a measurable proof requirement
- a clear rubric with 3 criteria and a pass threshold
- a safer alternative for lower-risk learners
- a reality-sync path that updates venture assumptions after completion

## Required mission fields

Each mission file should include:

- `id`
- `module`
- `title`
- `conceptTags`
- `goal`
- `whyItMatters`
- `instructions`
- `timeEstimateMinutes`
- `costEstimateInr`
- `difficulty`
- `safetyNotes`
- `proofRequirements`
- `rubric`
- `exampleStrong`
- `exampleWeak`
- `saferAlternative`
- `realitySyncFields`
- `badge`

## Safe mission design rules

- Prefer conversations, simple tests, and user research over paid experiments.
- Require consent for interviews and recordings.
- Warn learners to protect privacy and avoid uploading names, phone numbers, or address details.
- Keep budgets low and clearly stated.
- If a learner is under 18, prefer safer alternatives by default.
- Avoid missions that involve money handling, unsafe travel, or high-pressure sales.

## Reality sync rules

A mission may update only a small, agreed list of venture assumptions. These should be explicit and limited to fields with clear evidence. Example values:

- `conversionRate` — from a real landing page or waitlist test
- `averagePrice` — from a real pricing conversation or small sale
- `customerPersona` — from interview-derived persona changes
- `customerSegments` — from repeated interest patterns
- `quality` — from user feedback about reliability or UX
- `reach` — from marketing-channel results

The learner must confirm which updates apply. The system records the before/after assumptions in a ledger entry and attaches the mission as evidence.

## Editing a mission safely

1. Keep the mission in `content/missions/index.ts`.
2. Validate the structure with `npm run lint:content`.
3. Ensure the rubric score max is between 1 and 5.
4. Make sure the safer alternative is realistic and cheaper than the main option.
5. Confirm the reality-sync fields represent what a learner has actually measured.

## Good vs weak examples

Good mission:
- is based on a real first customer interaction
- requires evidence and not just opinion
- teaches a clear concept with a specific next step

Weak mission:
- says “post on Instagram and see what happens” without numbers or learning
- asks a learner to do something risky without safety guidance
- rewards quantity over actual evidence
