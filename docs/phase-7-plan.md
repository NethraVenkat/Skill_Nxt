# Phase 7 plan: Community & Cohorts

## Status before implementation

I have reviewed the current docs, repo structure, and the prior product phases. I have also written a learning review in `/docs/phase-7-learnings.md` covering the most likely causes of solo-learner drop-off and the community features that should address them.

This is a review gate before coding, in line with the attached Phase 7 requirement: read, review, plan, then wait for approval before implementation.

## Community design summary

### Cohort shape

- size: 5–8 learners
- matching rules: current module (±1), pace, weekly availability, language preference, optional industry, and age band
- fallback: if not enough members, use a starter circle rather than forcing a poor match
- lifecycle: forming → active → paused → graduated
- cohort charter: 2–3 shared goals set in week 1

### Accountability model

The product should favor small rituals over noisy communication:

- Monday goal post
- midweek check-in
- Friday wins & lessons recap
- buddy pairs rotated every 2 weeks

This creates weight without creating social overload.

### Peer review model

- learners first complete a short calibration round on sample submissions
- each submission gets 2–3 reviews from cohort peers
- each review must include a rubric score, evidence quote, one thing done well, and one specific suggestion
- review quality is tracked and used to weight review influence
- AI and human review are combined, not replaced

### Safety model

The community must be built with safety before features:

- code of conduct accepted before cohort access
- report and block flows
- moderation queue
- AI moderation for comments, posts, and reviews
- under-18-specific cohort restrictions
- no private 1:1 learner messaging in this phase

### Demo Day model

- monthly or cohort-based event windows
- pitch readiness check through the Capstone and Passport completeness
- live or async pitch options
- judges from mentors and alumni
- awards focused on evidence and improvement rather than just glamour

## Key risks and mitigations

### 1. Empty cohorts

Risk: a cohort is too small or churns quickly.
Mitigation:
- waitlist and starter circles
- consistent matching windows
- automatic merge suggestions after inactivity thresholds

### 2. Low-quality peer reviews

Risk: reviews become generic, preachy, or shallow.
Mitigation:
- calibration set before reviewing
- minimum quality checks in the review form
- reviewer reliability scoring and AI review-quality scoring

### 3. Harassment or toxic competition

Risk: the community becomes shaming or noisy.
Mitigation:
- code of conduct
- moderation queue
- block and mute flows
- no public shaming leaderboard beyond cohort-level, non-public recognition

### 4. Under-18 safety concerns

Risk: minors are exposed to adult contact or personal data risks.
Mitigation:
- under-18-only cohorts with added moderation
- no private 1:1 messaging with adults
- first-name-only profile display
- stricter moderation thresholds

### 5. Review abuse or cheating

Risk: learners submit weak work and game the review system.
Mitigation:
- anti-self-review rules
- assignment fairness logic
- AI and human flags for low-effort or inconsistent reviews

## Proposed Phase 7 implementation order after approval

1. Checkpoint 1: community foundation and safety
2. Checkpoint 2: cohort matching and lifecycle logic
3. Checkpoint 3: cohort room weekly rituals and discussion threads
4. Checkpoint 4: peer review system
5. Checkpoint 5: mentors and alumni
6. Checkpoint 6: recognition and cohort leaderboard
7. Checkpoint 7: Demo Day flow
8. Checkpoint 8: cohort-visible Passports and showcase
9. Checkpoint 9: impact measurement and admin analytics

## Conditions to proceed

I am waiting for your approval before any coding begins. Once approved, I will implement the checkpoints in order, keep safety first, and validate after each checkpoint with build/lint/typecheck/test and any relevant evals as required in the Phase 7 brief.
