import { z } from "zod";

export const missionDifficultySchema = z.enum(["easy", "medium", "hard"]);
export const missionProofTypeSchema = z.enum([
  "text",
  "numbers",
  "image",
  "file",
  "link",
  "audio",
  "interview_log",
]);
export const missionRealityFieldSchema = z.enum([
  "conversionRate",
  "averagePrice",
  "customerPersona",
  "monthlyBurn",
  "monthlyRevenue",
  "quality",
  "reach",
  "customerSegments",
  "valuation",
  "awareness",
  "retentionRate",
]);

export const proofRequirementSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: missionProofTypeSchema,
  required: z.boolean().default(true),
  description: z.string(),
  minCount: z.number().int().min(1).optional(),
});

export const missionRubricCriterionSchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string(),
  maxScore: z.number().int().min(1).max(5),
});

export const saferAlternativeSchema = z.object({
  title: z.string(),
  summary: z.string(),
});

export const missionSchema = z.object({
  id: z.string(),
  module: z.number().int().min(1).max(9),
  title: z.string(),
  conceptTags: z.array(z.string()),
  goal: z.string(),
  whyItMatters: z.string(),
  instructions: z.array(z.string()),
  timeEstimateMinutes: z.number().int().min(15),
  costEstimateInr: z.number().int().min(0),
  difficulty: missionDifficultySchema,
  safetyNotes: z.array(z.string()),
  proofRequirements: z.array(proofRequirementSchema),
  rubric: z.array(missionRubricCriterionSchema),
  exampleStrong: z.string(),
  exampleWeak: z.string(),
  saferAlternative: saferAlternativeSchema,
  realitySyncFields: z.array(missionRealityFieldSchema),
  badge: z.string(),
});

export type ProofRequirement = z.infer<typeof proofRequirementSchema>;
export type MissionRubricCriterion = z.infer<typeof missionRubricCriterionSchema>;
export type Mission = z.infer<typeof missionSchema>;
export type MissionStatus = "locked" | "available" | "in_progress" | "submitted" | "feedback_received" | "completed";

export function validateMission(mission: Mission) {
  const errors: string[] = [];

  if (!mission.goal.trim()) errors.push(`${mission.id}: goal is required`);
  if (!mission.whyItMatters.trim()) errors.push(`${mission.id}: whyItMatters is required`);
  if (mission.instructions.length === 0) errors.push(`${mission.id}: instructions are required`);
  if (mission.safetyNotes.length === 0) errors.push(`${mission.id}: safety notes are required`);
  if (mission.proofRequirements.length === 0) errors.push(`${mission.id}: proofRequirements are required`);
  if (mission.rubric.length === 0) errors.push(`${mission.id}: rubric is required`);
  if (mission.realitySyncFields.length === 0) errors.push(`${mission.id}: realism sync fields are required`);
  if (!mission.exampleStrong.trim()) errors.push(`${mission.id}: exampleStrong is required`);
  if (!mission.exampleWeak.trim()) errors.push(`${mission.id}: exampleWeak is required`);
  if (!mission.saferAlternative.title.trim() || !mission.saferAlternative.summary.trim()) {
    errors.push(`${mission.id}: safer alternative is incomplete`);
  }

  for (const criterion of mission.rubric) {
    if (criterion.maxScore < 1 || criterion.maxScore > 5) {
      errors.push(`${mission.id}: rubric criterion ${criterion.id} score range must stay within 1..5`);
    }
  }

  return { valid: errors.length === 0, errors };
}

export function getMissionCompletionScore(mission: Mission, evidenceCount: number): number {
  return Math.min(100, Math.round((evidenceCount / Math.max(mission.proofRequirements.length, 1)) * 100));
}
