# Gamification and Progress

## Design rule

Every progress mechanic must make practice, reflection, evidence, or community feedback more likely. The product never rewards spending more money, opening more screens, or maintaining a perfect attendance streak.

## Valuation scoring

The simulator’s `valuation` is a learning score calculated from revenue, quality, evidence, and morale (see `05-simulator-rules.md`). It is displayed as **practice valuation**, with a tooltip that says it is not a real company valuation. A learner earns additional score only from observable learning:

- +100 points for a valid real-world mission.
- +50 points for improving a retry result.
- +25 points for a correct scheduled retrieval review.
- +25 points for a useful peer review accepted by the recipient.
- −0 points for a failed attempt; the learner receives a recovery path.

The score is never used to compare learners globally. Cohort views show the latest score and change since last month, with consent.

## Mastery locks

A lesson is complete when the learner has made a decision, completed the retry, and passed its three-question retrieval check at 2/3 or better. A module unlocks the next module when:

1. Its four lessons are complete.
2. Its real-world mission has valid proof.
3. The mastery test is at least 75/100.

When a learner misses the threshold, the lock shows the exact weak criteria and opens one remediation card plus a new attempt. There is no paywall or time-based lock.

## Streaks

A streak counts distinct learning days with one meaningful action: completing a decision/retry, submitting evidence, or completing a retrieval review. Reading a screen does not count. A one-week pause token is available every four weeks; using it preserves the streak without pressure. Streak copy says “days you practised,” never “days you were perfect.”

Why it supports learning: a lightweight cue supports spaced practice, while pause tokens prevent anxiety and dishonest clicking.

## Mission badges

Badges are awarded only for accepted real-world missions:

- **Problem Listener:** five non-leading interviews.
- **Evidence Keeper:** a contradiction recorded and resolved with a test.
- **Smallest Test:** an experiment under ₹10,000 with a pre-declared threshold.
- **Cash Watcher:** a correct break-even and runway model.
- **Customer Closer:** a paid or refundable commitment.
- **Team Builder:** a documented outcome-based role agreement.
- **Pitch Honest:** a pitch that labels an unknown instead of exaggerating.
- **Scale Safely:** a process and rollback plan tested twice.

Badges show the mission evidence date and rubric, not a decorative rarity. A facilitator can revoke a badge if proof is found to be fabricated; the learner receives an explanation and a resubmission path.

## Cohort leaderboards

Leaderboards are cohort-scoped, opt-in, and use learning-quality metrics: missions accepted, evidence quality change, retrieval consistency, and helpful peer reviews. They do not rank total hours, number of logins, money spent, or raw valuation alone. The default view is a progress board with three suggested actions, not a rank list.

Why it supports learning: small-group visibility creates accountability while avoiding global status competition and learner exposure.

## Spaced-review scheduling

Each concept gets a review item after:

- First exposure: same session.
- First delay: 2 days.
- Second delay: 7 days.
- Third delay: 21 days.
- Fourth delay: 60 days.

Correct answers advance the interval by ×2, capped at 60 days. Incorrect answers reset to 2 days and attach a short simulator event to the weak concept. Reviews mix recognition, short calculation, scenario choice, and explanation; the same wording never repeats twice in a row.

## Progress surfaces

- **Venture HQ:** next best action, current weak spot, due reviews, company state.
- **Skill map:** nine module nodes with lesson, mission, mastery, and review status.
- **Passport:** evidence completeness, not a progress bar made of clicks.
- **Cohort room:** monthly progress and feedback requests.

## Anti-gaming rules

- Mission proof requires structured fields and a source/date; identical copied submissions are flagged.
- Simulator practice branches do not affect mastery or cohort scores.
- AI-generated text is labelled and cannot be submitted as evidence without learner-added source details.
- Refreshing, replaying, or selecting every option cannot increase score.

