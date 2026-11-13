# Build Roadmap

## Phase 1 — Foundation

- [ ] Create Next.js App Router TypeScript project and design tokens.
- [ ] Configure Supabase project, migrations, RLS, Auth, and Storage.
- [ ] Implement profile, venture creation, onboarding, and fixed initial state.
- [ ] Build responsive navigation, error boundary, loading states, and accessibility primitives.
- [ ] Add CI for typecheck, lint, unit tests, and Vercel preview.

**Done when:** A new learner can sign up, create a venture, see Venture HQ on desktop/mobile, refresh safely, and pass automated RLS, accessibility smoke, and CI checks.

## Phase 2 — Simulator Engine

- [ ] Implement pure state types and initial state.
- [ ] Implement decision effects, monthly tick, valuation, runway, and clamps.
- [ ] Implement seeded event engine and all 16 events.
- [ ] Implement immutable snapshots, practice branches, comparison, and recovery room.
- [ ] Add property tests for non-negative cash, bounded variables, deterministic seeds, and idempotent API writes.
- [ ] Render company state, history, charts, and event explanations.

**Done when:** Fixed-seed fixtures reproduce the six-month worked example within rounding tolerance, every rule has a test, and a learner can rewind a practice branch without changing mainline progress.

## Phase 3 — First Lessons & Labs

- [ ] Encode Modules 1–3 content, options, consequences, insights, retries, and retrieval items.
- [ ] Build the six-step lesson player with resume and accessible live consequence updates.
- [ ] Build Customer Persona Builder, Funnel Leak Finder, Pricing Lab, and Break-even Machine.
- [ ] Implement mission schemas, proof draft, upload, rubric, and acceptance workflow.
- [ ] Build Skill Map and mastery locks.

**Done when:** A learner can complete Module 1 end to end, submit valid mission proof, pass the mastery test, unlock Module 2, and see an accepted item in the Passport.

## Phase 4 — AI Roleplay Arena

- [ ] Implement server-only Claude client, prompt versions, redaction, budgets, and rate limits.
- [ ] Build AI Customer with persona selection and interview rubric.
- [ ] Build AI Investor with timed pitch, five questions, and score report.
- [ ] Build AI Mentor with graduated hints and direct-answer guard.
- [ ] Add consent, transcript retention, safety refusal, and human escalation.
- [ ] Create deterministic mock provider for tests and development.

**Done when:** Each roleplay can complete with a mock provider, real provider failures are visible and retryable, no API key reaches the client, and a safety test suite passes.

## Phase 5 — Real Missions & Venture Passport

- [ ] Finish proof file validation, signed uploads, metadata stripping, and deletion.
- [ ] Implement mission review workflow with facilitator override and audit trail.
- [ ] Build Passport evidence cards, completeness, source dates, and export.
- [ ] Add PDF export with accessible text and a learner-owned download.
- [ ] Add evidence integrity warnings and AI-generated text labels.

**Done when:** A learner can upload valid proof, receive rubric feedback, revise it, and export a readable Passport containing only traceable accepted evidence.

## Phase 6 — Full Curriculum

- [ ] Encode Modules 4–9 lessons, labs, simulator challenges, missions, and mastery tests.
- [ ] Add Business Model Canvas, Pitch Evidence Mapper, and Team Capacity Map.
- [ ] Add spaced-review scheduler and mixed retrieval item types.
- [ ] Add all nine module completion states and recovery/remediation paths.
- [ ] Content-review pass with beginner learners and Indian examples.

**Done when:** All 36 lessons have published content, every module has a valid mission and test, review scheduling works through 60 days, and no module can unlock without its gate.

## Phase 7 — Community & Cohorts

- [ ] Implement cohort creation, invitations, membership roles, and RLS.
- [ ] Build peer review assignment, rubric, moderation, and report/block tools.
- [ ] Add opt-in cohort progress board and monthly Demo Day.
- [ ] Add facilitator dashboard for review queue, learner risk, and intervention notes.
- [ ] Add notification preferences and reminder digest.

**Done when:** A cohort of 5–8 can complete a review cycle privately, a facilitator can resolve a report, and Demo Day submissions are visible only to authorised participants.

## Phase 8 — Polish, Testing & Launch

- [ ] Run keyboard, screen-reader, contrast, reduced-motion, and responsive audits.
- [ ] Add unit, integration, end-to-end, visual regression, and migration tests.
- [ ] Load-test simulator transitions, uploads, AI rate limits, and cohort queries.
- [ ] Run content pilot with students, first-time founders, and young professionals.
- [ ] Fix top usability issues; measure activation, mission transfer, retention, and review accuracy.
- [ ] Configure production secrets, backups, monitoring, incident runbook, and support route.
- [ ] Launch behind a feature flag, observe for two weeks, then open the first cohort.

**Done when:** The critical user journeys pass on supported browsers and mobile widths, no high-severity accessibility/security defects remain, production recovery is rehearsed, and pilot metrics meet the targets in `01-product-vision.md`.

