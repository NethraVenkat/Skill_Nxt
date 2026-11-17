# Technical Architecture

## Application structure

```text
src/
  app/
    (marketing)/page.tsx
    (auth)/signup/page.tsx (legacy redirect)
    (app)/hq/page.tsx
    (app)/curriculum/page.tsx
    (app)/lessons/[lessonId]/page.tsx
    (app)/simulator/page.tsx
    (app)/labs/{pricing,break-even,persona,canvas,funnel}/page.tsx
    (app)/roleplay/{customer,investor,mentor}/page.tsx
    (app)/missions/[missionId]/page.tsx
    (app)/passport/page.tsx
    (app)/cohort/page.tsx
    api/{simulator,ai,uploads,analytics}/route.ts
  components/
    navigation/
    company/
    lesson/
    labs/
    roleplay/
    missions/
    passport/
  simulator/
    types.ts
    formulas.ts
    decisions.ts
    events.ts
    engine.ts
    replay.ts
    fixtures/
    __tests__/
  content/
    modules/
    lessons/
    missions/
  lib/
    supabase/
    auth.ts
    validation.ts
    redaction.ts
    telemetry.ts
  styles/
    tokens.css
```

Learner routes are open by default. Guest progress is held in the versioned browser store `venturecraft:v1`, with JSON import/export in the learner menu. Only `/admin/*` is gated by the admin cookie; Supabase remains available for future server-side features but is not required for learner flows.

The existing application can be migrated into this structure by preserving content and state semantics while replacing client-only persistence with Supabase-backed snapshots.

## Simulator engine

The engine is pure TypeScript with no React, Supabase, browser, or AI imports. Its public functions are:

- `createInitialState(seed): CompanyState`
- `applyDecision(state, decision, rng): Transition`
- `applyMonthlyTick(state): CompanyState`
- `rollEvent(state, rng): Event | null`
- `calculateValuation(state): number`
- `calculateRunway(state): number`
- `createPracticeBranch(snapshot): Branch`
- `compareBranches(a, b): Comparison`

`Transition` includes `stateBefore`, `decisionEffect`, `event`, `stateAfter`, and human-readable explanations. All formulas are tested with fixed seeds, boundary values, zero margin, cash exhaustion, rewind, and event non-repetition. UI renders the transition but does not calculate financial state.

## Rendering and data fetching

Use Next.js App Router. Server Components fetch venture state, curriculum, and Passport data. Client Components handle lesson interactions, charts, sliders, roleplay transcript, and local draft state. TanStack Query is optional; if used, it must invalidate the venture state after a committed transition.

## API routes

- `POST /api/simulator/decision`: validate venture ownership, decision schema, current version, and idempotency key; run engine; persist decision/state/event transactionally.
- `POST /api/simulator/branch`: create non-committed practice branch.
- `POST /api/ai/session`: redact context, call Claude through a server-only client, store transcript and prompt version.
- `POST /api/ai/score`: score against a versioned rubric; never accept generated proof.
- `POST /api/uploads/sign`: issue a signed Supabase Storage upload URL after mission ownership check.
- `POST /api/submissions`: validate proof schema, store draft/submission, enqueue moderation/review.
- `POST /api/analytics`: accept allowlisted event names and properties; reject arbitrary PII.

All mutation routes use authentication, CSRF/origin checks where applicable, Zod validation, rate limits, idempotency keys, and explicit error responses.

## AI integration

The server sends only role, scenario, relevant Passport evidence, and the latest transcript window. PII redaction runs before the model call. Prompts are versioned in source, outputs are parsed into a schema, and an invalid output is surfaced as a retryable AI error—not silently converted into a score. Set token limits, timeout, retry once on transport failure, and a daily per-user budget. Claude keys never reach the browser.

## Auth flow

Supabase Auth supports email magic link and Google. Middleware refreshes the session and protects `(app)` routes. On first authenticated request, a database trigger creates `profiles`; onboarding creates the venture and initial `company_state` transactionally. Sign-out clears local drafts. Account deletion requires re-authentication and explicit confirmation.

## File uploads

Mission proof accepts PDF, PNG, JPG, WEBM, and TXT up to 25 MB per file, five files per mission. The client requests a signed URL, uploads directly to Storage, then confirms a `file_objects` row. Virus/mime validation runs server-side; EXIF metadata is stripped from images. Files are private and accessed through short-lived signed URLs.

## Analytics events

Track only learning and reliability events:

- `signup_completed`, `onboarding_completed`, `skill_check_completed`
- `lesson_challenge_started`, `decision_committed`, `consequence_viewed`, `retry_completed`
- `retrieval_answered`, `mission_started`, `mission_submitted`, `mission_accepted`
- `lab_applied`, `ai_session_started`, `ai_session_completed`
- `rewind_created`, `recovery_room_opened`, `passport_exported`
- `cohort_review_requested`, `cohort_review_submitted`, `demo_day_submitted`
- `error_boundary_viewed`, `upload_failed`, `api_timeout`

Do not track raw interview content, AI transcript content, or precise location. Events include a generated user ID, venture ID, route, module/lesson ID, and timestamp.

## Observability and delivery

Use Vercel previews for pull requests, Supabase migrations in CI, Sentry (or equivalent) with PII scrubbing, structured server logs, and dashboards for lesson transition failures, AI latency, upload failure rate, and state mismatch rate. Feature flags gate AI, cohorts, and Demo Day. A rollback restores the previous web deployment and database migration only through a tested down migration.

