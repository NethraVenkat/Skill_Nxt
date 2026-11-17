# Phase 4 plan and review gate

## Status before implementation

I have read the Phase 0 planning docs, the Phase 3 plan, the simulator content guide, the AI roleplay spec, and the data model and architecture docs. I have not written any Phase 4 app code yet.

This review is intentionally limited to architecture validation and design consistency before implementation. The Phase 4 brief specifically says to inspect the roleplay design, list weaknesses, and wait for approval before building.

## Review of the AI roleplay specification

### Shared AI contract

Strengths:
- Clear separation between actor and judge is good for traceability and fairness.
- The requirement that judge evidence must quote learner messages is a strong anti-hallucination rule.
- The requirement to keep AI prompts in versioned files and track versions is correct and future-proof.

Weaknesses and fixes:
- The current spec does not yet define the exact failure modes for quote mismatches or evidence gaps. Fix: add a validation step that rejects score outputs when evidence is missing, and surface a retryable error instead of a low-confidence score.
- The spec mentions safety checks but does not define the precise thresholds for the fast-model safety gate versus the full-model safety gate. Fix: define a safety pipeline with explicit categories (self-harm, abuse, prompt injection, sexual content, scam, illegal activity) and a runner that routes to a "safe redirect" response or a human escalation path.
- The current spec does not define a retention/deletion policy for transcripts in concrete terms. Fix: align the AI session retention to the data model and add an explicit deletion flow for learner-initiated session removal.

### AI Customer

Strengths:
- Strong goal: it can teach interview quality without teaching the learner to say the “right” answer.
- The hidden-profile and polite-liar behaviour are realistic and important to learning.
- The rubric correctly targets quality of questions rather than perfection of answer.

Weaknesses and fixes:
- The hidden profile needs a more explicit data contract. Fix: define each customer persona as a structured object with fields like pain, workaround, budget, trigger, and response policy; these should be stored in a prompt or fixture file and not hard-coded only in the prompt body.
- The spec currently says “reply in 1–3 short paragraphs” but does not define a strict response-length limit, talk ratio budget, or how to handle leading questions without a harsh tone. Fix: define answer length limits and a response library for polite liar behaviour: “That sounds promising, but I have not tried it yet.”
- The customer should not reveal false-positive “nice idea” answers too often or too predictably. Fix: add a probability distribution to polite-liar tendencies and evaluate against scripted transcripts in evals.
- The score currently uses a single rubric but does not define exactly how talk ratio is measured. Fix: specify a transcript heuristic (learner message count vs AI message count over the last N turns) and include this in the judge schema.

### AI Investor

Strengths:
- Good approach: the investor should test evidence and ask targeted questions from the simulator and Passport.
- The rule to distinguish “unknown” from “bad” is important and should be kept.

Weaknesses and fixes:
- The investor rubric is clear but the decision policy is under-specified. Fix: define a decision algorithm: invested / follow-up / pass, with triggers tied to evidence quality, traction, and business model clarity.
- The spec needs a precise mapping of “live sim snapshot” to investor questions. Fix: define a context builder that includes only what the investor can lawfully evaluate (venture idea, mission status, current company state, stage, customer evidence, pricing assumptions, and validation results), never private personal data.
- The investor can ask “why now?” but the spec does not define the relationship between the sim numbers and the investor questions. Fix: add a weak-spot detection module that surfaces the lowest-signal numbers and uses them to generate investor follow-up questions.
- It is not yet clear whether investor scoring should include explicit citations from learner messages or only the final answer. Fix: require the judge to cite at least one direct learner quote per rubric item.

### AI Mentor

Strengths:
- The Socratic constraint is well-designed and matches the learning goals.
- The “never give direct answers” rule is crucial for learning-by-doing.

Weaknesses and fixes:
- The current mentor spec says “three graduated hints” but does not define whether the same hint ladder is used across all contexts. Fix: create a single hint-machine contract with stages: nudge, guiding question, worked example on a different but similar problem, and an explicit trigger for when the answer is safe to explain.
- The mentor should not answer mastery checks at all. Fix: add an explicit guard that disables mentor prompts during readiness checks and active assessment states.
- The current spec includes “explain concepts freely once the learner has already answered,” but it does not define when that threshold is reached. Fix: use a state-driven trigger: only after the learner has committed to a decision and the system detects a concept gap, not before.
- The mentor should still explain trade-offs in simple English, but the spec does not define how it handles hidden private or secure data. Fix: add redaction and a strict context window for mentor responses.

### Safety and abuse

Strengths:
- The roleplay spec includes safety, privacy, and redaction requirements; these are essential.

Weaknesses and fixes:
- The safety policy should be explicit about prompt injection and rolebreak attempts. Fix: define a fast guard that either rejects the message or politely shifts the learner back to the roleplay scenario.
- The spec does not define the support route for self-harm or severe distress. Fix: add a configurable India-focused resource message and a clear handoff path to a human facilitator.
- The spec should define a rate limit and quota policy per role, not just a general rule. Fix: add per-user-per-day and per-session quotas with graceful “come back tomorrow” UX.

## Proposed Phase 4 implementation order after approval

1. Create the AI provider wrapper and prompt loader with versioning.
2. Create the shared context builder and the role-specific context schema.
3. Implement the conversation state machine and transcript storage.
4. Add safety, quotas, prompt injection guardrails, and abuse detection.
5. Build the AI Customer roleplay, its hidden persona engine, and judge rubric.
6. Build the AI Investor arena with sim-aware questioning and decision output.
7. Build the AI Mentor with Socratic hint ladder and answer-leak guard.
8. Add the Arena UI, feedback report, and retry flow.
9. Add eval suite, prompt-changelog process, and admin learning-analytics views.

## Blocker to clear before coding

I need approval before I begin implementing the Phase 4 system. At this point, the design is strong but the following details should be locked before coding so the implementation stays aligned with the product intent:

- The exact prompt versioning and changelog policy in `/content/ai/prompts` (folder layout, naming, and version number format)
- Whether the AI Investor outcome should be a pure score or also produce a funded event into the simulator
- Whether the AI Customer should store persona updates back into the learner’s venture state immediately or only after the learner confirms it
- Whether we will use a mock provider only in tests or also in the local dev environment

Once approved, I will build the Phase 4 checkpoints in order and continue with the checkpoint-by-checkpoint validation loop you specified.
