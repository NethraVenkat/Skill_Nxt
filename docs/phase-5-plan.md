# Phase 5 plan: Real Missions & Venture Passport

## Scope and assumptions

This plan assumes the project already has the Phase 1 foundation, Phase 2 simulator engine, Phase 3 lesson/lab content, and the Phase 4 AI roleplay foundations. The goal of this phase is not a full production review system, but a working real-missions + passport system that is safe, testable, and extendable.

Key assumptions:
- Mission content stays in structured source files instead of being hard-coded into view components.
- Real mission outcomes feed a reusable `RealitySync` layer that updates venture assumptions without overriding learner consent.
- Passport content is assembled from verified data sources, not guessed from AI output alone.
- AI feedback remains assistive and evidence-based; it never invents facts or ranks a learner without quoting their actual submission.

## Phase 5 implementation order

1. Mission content model and validation.
2. Mission lifecycle UI and submission flow.
3. AI feedback judging and authenticity checks.
4. Reality sync and ledger updates.
5. Passport architecture and auto-assembly logic.
6. Share/export controls and privacy rules.
7. Dashboard integrations, badges, and reward updates.
8. Safety, privacy, age-handling, and analytics.
9. Documentation and testing.

## Files to create or update

- `content/missions/index.ts` — typed mission catalog for all 9 modules.
- `lib/missions.ts` — mission schema, validation, filters, and lifecycle helpers.
- `lib/passport.ts` — passport assembly, completeness, and version snapshot logic.
- `app/(app)/missions/page.tsx` — missions dashboard.
- `app/(app)/missions/[missionId]/page.tsx` — mission detail and submission experience.
- `app/(app)/passport/page.tsx` — Passport overview and evidence status.
- `docs/mission-authoring-guide.md` — how to author mission content safely.
- `docs/privacy-and-safety.md` — data storage, age handling, and safety rules.
- `tests/phase5.test.ts` — mission validation and passport logic tests.
- `scripts/lint-content.mjs` — extended to validate mission files.

## Review gate before full implementation

Before writing all of the deeper feedback and export logic, I checked the existing repo structure and confirmed the mission and passport systems were not yet fully implemented. The current app already contains the foundation pages and the simulator, lesson, and AI layers needed to plug into this phase. The remaining work is to complete the mission content and the mission/passport experience in a way that remains reusable for later Phase 6 and Phase 7 work.
