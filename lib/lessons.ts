import { z } from "zod";

export const lessonStepType = z.enum([
  "challenge",
  "decision",
  "consequence",
  "insight",
  "interactive-check",
  "retry",
  "reflection",
  "mission",
  "summary",
]);

export const stateDeltaSchema = z.object({
  cashDelta: z.number().optional(),
  burnDelta: z.number().optional(),
  customersDelta: z.number().optional(),
  revenueDelta: z.number().optional(),
  moraleDelta: z.number().optional(),
  evidenceDelta: z.number().optional(),
  valuationDelta: z.number().optional(),
  conversionDelta: z.number().optional(),
  churnDelta: z.number().optional(),
});

export const decisionOptionSchema = z.object({
  id: z.string(),
  label: z.string(),
  feedback: z.string(),
  misconceptionId: z.string().optional(),
  /** true = the best answer. Used to show "Great choice!" vs "Good try!". */
  correct: z.boolean().optional(),
  effects: stateDeltaSchema.optional(),
});

export const lessonStepSchema = z.object({
  type: lessonStepType,
  title: z.string(),
  text: z.string().optional(),
  options: z.array(decisionOptionSchema).optional(),
  consequence: z.string().optional(),
  insight: z.string().optional(),
  labId: z.string().optional(),
  prompt: z.string().optional(),
  successMessage: z.string().optional(),
  questions: z.array(z.string()).optional(),
  proof: z.array(z.string()).optional(),
  summary: z.string().optional(),
  /** What Nova says on this screen, in one or two friendly sentences. */
  nova: z.string().optional(),
  /** "In simple words" box: the idea in 1–2 easy sentences. */
  simple: z.string().optional(),
  /** An everyday Indian example (chai stall, canteen, tuition…). */
  example: z.string().optional(),
  /** One-line takeaway the learner keeps. */
  remember: z.string().optional(),
  /** Short points for the end-of-lesson "You learned" card. */
  learned: z.array(z.string()).optional(),
});

export const lessonSchema = z.object({
  id: z.string(),
  module: z.number(),
  order: z.number(),
  title: z.string(),
  shortTitle: z.string().optional(),
  /** One friendly sentence shown under the lesson title. */
  tagline: z.string().optional(),
  emoji: z.string().optional(),
  estimatedMinutes: z.number(),
  objective: z.array(z.string()),
  conceptTags: z.array(z.string()),
  steps: z.array(lessonStepSchema),
});

export type DecisionOption = z.infer<typeof decisionOptionSchema>;
export type LessonStep = z.infer<typeof lessonStepSchema>;
export type Lesson = z.infer<typeof lessonSchema>;

export function validateLesson(lesson: Lesson) {
  const errors: string[] = [];

  if (!lesson.steps.some((step) => step.type === "challenge")) errors.push(`${lesson.id}: missing challenge step`);
  if (!lesson.steps.some((step) => step.type === "decision")) errors.push(`${lesson.id}: missing decision step`);
  if (!lesson.steps.some((step) => step.type === "consequence")) errors.push(`${lesson.id}: missing consequence step`);
  if (!lesson.steps.some((step) => step.type === "insight")) errors.push(`${lesson.id}: missing insight step`);
  if (!lesson.steps.some((step) => step.type === "retry")) errors.push(`${lesson.id}: missing retry step`);
  if (!lesson.steps.some((step) => step.type === "mission")) errors.push(`${lesson.id}: missing mission step`);

  const stepOrder = lesson.steps.map((step) => step.type);
  const requiredOrder = ["challenge", "decision", "consequence", "insight", "retry", "mission"];
  const firstSix = stepOrder.slice(0, 6);
  if (JSON.stringify(firstSix) !== JSON.stringify(requiredOrder)) {
    errors.push(`${lesson.id}: lesson steps must begin with challenge -> decision -> consequence -> insight -> retry -> mission`);
  }

  for (const step of lesson.steps) {
    if (step.type === "decision" && step.options) {
      for (const option of step.options) {
        if (!option.feedback || option.feedback.trim().length < 20) {
          errors.push(`${lesson.id}: decision option "${option.id}" is missing feedback`);
        }
      }
    }
  }

  return { valid: errors.length === 0, errors };
}
