# Phase 3 plan and review gate

## Status before implementation

I have reviewed the Phase 0 planning docs and the current project state. I am not starting Phase 3 code yet because the required Phase 2 source-of-truth artifacts are missing:

- `docs/sim-content-guide.md` — not present
- `lib/sim/` — not present

The Phase 3 brief explicitly states that these files/code are required to validate lesson decisions, event/data mapping, and lab integration. Without them, building lesson content or the player would risk inventing simulator semantics that conflict with the actual engine.

## Review of the Module 1–3 lesson scripts

### Overall strengths

- The six-step loop is clearly defined and consistent.
- Decision options are concrete and tied to realistic startup misconceptions.
- The learning objective is beginner-friendly and contextualized in Indian usage scenarios.
- Each lesson ends with retrieval questions and a real-world mission, which matches the learning model.

### Weaknesses and fixes

1. Incomplete causal fidelity for simulator consequences
   - Weakness: many decision consequences read like generic UX changes rather than deterministic simulator state changes. Some variables (e.g. evidence_quality, customer hypotheses, conversion, morale) are named but not clearly grounded in the canonical state model.
   - Fix: map each decision option to exact state deltas using the canonical simulator schema, not ad hoc fields. Add validation rules to ensure every option references real state keys.

2. Some “retry” prompts are too open-ended
   - Weakness: some retries let the learner any-answer and do not clearly specify a transfer condition that is measurable.
   - Fix: each retry should specify a target insight and a measurable success rule (e.g. “pick the segment with repeated, costly pain; explain why the exclusion rule matters”).

3. Real missions are a little broad for a beginner in 1–3 days
   - Weakness: the Module 1 and 2 missions can become heavy if learners do not know how to collect qualitative evidence cleanly.
   - Fix: add a short mission brief template, proper evidence checklist, and example of valid vs invalid proof.

4. Some choices do not clearly teach the intended misconception
   - Weakness: a few options mix strategy, overlap, and vibe-based decisions rather than isolating one misconception cleanly.
   - Fix: each wrong option should map to one misconception id and one feedback message. The option should be “wrong for a teachable reason,” not just “less optimal.”

5. Need stronger “why did this happen?” causality review
   - Weakness: a lesson gains power when the learner can connect the numbers to the actual cause. The scripts mention consequence but do not lay out enough cause-and-effect explanation for each option.
   - Fix: add a standard causal panel that reads: “This happened because your decision changed X, which reduced Y, which affected Z.”

6. Lab embedding criteria are not yet explicit enough
   - Weakness: the lesson scripts say “interactive activity,” but the exact embedded lab behavior and how it changes the simulator state is not yet defined in the lesson content contract.
   - Fix: each insight step should specify whether it embeds a lab, what inputs are read/written, and what the “aha moment” is.

7. Spaced review and mastery threshold language needs exact data contract
   - Weakness: the Phase 3 brief describes scheduling, but the lesson scripts do not yet define which concept tags will be attached to each lesson or how the review system will target them.
   - Fix: assign concept tags per lesson and map them to review items in a deterministic content schema.

8. Learning analytics events are not yet tied to lesson content structure
   - Weakness: the scripts specify learning outcomes, but not which content events should fire for each step type.
   - Fix: define event names and payloads in the lesson schema (e.g. decision_made, insight_completed, retry_completed, reflection_written, mission_submitted).

## Proposed Phase 3 implementation order after approval

1. Create the lesson content schema and validators.
2. Build the missing simulator content guide and simulator state contract.
3. Create the first batch of Module 1–3 lessons as validated content files.
4. Build the generic lesson player shell.
5. Add feedback, hints, reminders, and reflection capture.
6. Implement the reusable labs and embed them in lessons.
7. Add retrieval practice and spaced-review logic.
8. Add mastery checks and analytics.
9. Deploy the Phase 3 pre-test/post-test structure and admin metrics.

## Blocker to clear before coding

Please provide or confirm the missing artifact set:

- `docs/sim-content-guide.md`
- `lib/sim/` implementation and data contracts

Once that is available, I can proceed with the Phase 3 implementation and checkpoint-by-checkpoint build.
