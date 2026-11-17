# Phase 6 plan: Full Curriculum (Modules 4–9)

## Status before implementation

I have read the current curriculum, simulator rules, concept lab specs, AI roleplay requirements, gamification design, mission authorship rules, and the existing repo structure. I have also reviewed the current learning implementation and recorded design observations in `/docs/phase-6-learnings.md`.

This is a review gate before coding. The attached Phase 6 brief explicitly requires the plan and the learning review, and then a wait for approval before any module implementation begins.

## Review of the Phase 6 design

### Strengths

- The full 9-module sequence is coherent and grounded in founder decision-making.
- The module order is logical: MVP → pricing → growth → team → funding → scaling.
- The product correctly treats missions, labs, mastery, and AI roleplay as distinct but connected learning loops.
- The capstone and final course measurement strengthen the learning system rather than just adding content.

### Risks to fix before implementation

1. Module complexity: some later modules can become too dense if they combine too many concepts in one lesson. The product should keep each lesson focused on one decision and one misconception.
2. Budget and realism: the money and funding modules must clearly state they are educational, not legal or financial advice.
3. AI roleplay breadth: adding six new roleplay types is useful, but they need a strict rubric and a simple, consistent role-specific context builder to stay manageable.
4. Simulator load: the later modules increase the number of systems in the engine; the group must guard against overcomplication by making each mechanic visible and measurable.
5. Evaluation overhead: the QA gate is correct, but it should stay realistic and use module-level scoring rather than full app-wide redesign at the end of each module.

## Proposed Phase 6 implementation order after approval

1. Review and approve the brief for Module 4.
2. Implement the Module 4 simulator mechanics + lab + lesson flow + AI roleplay + mission + mastery check.
3. Run the QA gate for Module 4.
4. Repeat the same flow for Module 5, Module 6, Module 7, Module 8, and Module 9 one by one.
5. After all modules pass, implement the Capstone and whole-course measurement tools.
6. Produce the curriculum report and expert-review notes.

## Module-specific notes

### Module 4: MVP

- Strong concept fit: scope, build vs. buy, validation, learning from first users.
- Strongest risk: it can slip into “build more features” unless the lesson repeatedly emphasizes outcome-first design.
- Recommended trigger: “What is the smallest useful result that proves the assumption?”

### Module 5: Pricing & Money

- Strong concept fit: value, contribution margin, break-even, cash flow, and a price test.
- Strongest risk: beginners confuse unit economics with profit. The simulator should make cash versus profit visible in the ledger.
- Recommended trigger: “If this customer costs ₹X to serve and is worth ₹Y, what do we learn?”

### Module 6: Marketing & Growth

- Strong concept fit: channel selection, funnel leaks, CAC/LTV, retention, message-market fit.
- Strongest risk: growth metrics are noise unless tied to the actual funnel and a stop rule.
- Recommended trigger: “What is the leak and what is the test that will reveal it?”

### Module 7: Team & Leadership

- Strong concept fit: roles, feedback, morale, hiring, bottlenecks.
- Strongest risk: this can become too abstract. The product should use role coverage, salary burn, and morale events to make the decisions feel concrete.
- Recommended trigger: “Which job is the real bottleneck, and what decisions or roles fix it?”

### Module 8: Funding & Pitching

- Strong concept fit: ask, dilution, cap table, valuation, investor questions.
- Strongest risk: real funding is nuanced and can overwhelm beginners. This should remain a framework for decision quality, not a legal consent or investment simulation.
- Recommended trigger: “What does the capital cost really buy, and what are you giving away?”

### Module 9: Scaling

- Strong concept fit: process, quality, capacity, and scaling constraints.
- Strongest risk: too much complexity if the module includes every growth issue at once. Focus on a single scaling bottleneck and a measurable 30-day plan.
- Recommended trigger: “Where is the bottleneck, and which process will protect quality while growing?”

## Conditions to proceed to implementation

I am waiting for your approval to begin the module-by-module build. At that point, I will work one module at a time and not skip the QA gate or the approval loop in the Phase 6 prompt.

Once approved, I’ll continue with the order below:

1. Module 4 brief + mechanics + lesson + lab + AI + mission + mastery
2. Module 4 QA gate
3. Module 5 brief + mechanics + lesson + lab + AI + mission + mastery
4. Module 5 QA gate
5. Repeat through Module 9
6. Capstone + whole-course measurement + docs
