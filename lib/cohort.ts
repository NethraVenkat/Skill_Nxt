export interface CohortMember {
  name: string;
  venture: string;
  focus: string;
  confidence: number;
  nextMilestone: string;
}

export interface PeerReview {
  reviewer: string;
  venture: string;
  score: number;
  note: string;
  nextAction: string;
}

export interface DemoDayItem {
  founder: string;
  venture: string;
  stage: string;
  time: string;
  score: number;
}

export const cohortMembers: CohortMember[] = [
  { name: "Aarav", venture: "CampusCart", focus: "Student supply chain", confidence: 82, nextMilestone: "Test pricing with 8 more buyers" },
  { name: "Meera", venture: "Saarthi", focus: "Career guidance", confidence: 74, nextMilestone: "Run one AI-assisted call script" },
  { name: "Karan", venture: "SkillPilot", focus: "Learning loops", confidence: 88, nextMilestone: "Prepare demo-day narrative" },
  { name: "Ishita", venture: "NammaMeals", focus: "Campus food", confidence: 69, nextMilestone: "Interview 10 students before building" },
];

export const peerReviews: PeerReview[] = [
  { reviewer: "Ishita", venture: "CampusCart", score: 4.6, note: "Clear problem and good customer framing. Stronger proof would come from retention data.", nextAction: "Capture a before/after story from one real buyer." },
  { reviewer: "Meera", venture: "SkillPilot", score: 4.5, note: "The learning loop is compelling. Add one concrete example of how a learner benefits in a week.", nextAction: "Show real user flow and not just the concept." },
  { reviewer: "Aarav", venture: "Saarthi", score: 4.3, note: "Strong emotional hook and useful pricing signal. Clarify the loss before the solution.", nextAction: "Map the current customer journey to your pitch." },
];

export const demoDaySchedule: DemoDayItem[] = [
  { founder: "Karan", venture: "SkillPilot", stage: "Product demo", time: "09:30 AM", score: 91 },
  { founder: "Aarav", venture: "CampusCart", stage: "Customer story", time: "09:55 AM", score: 86 },
  { founder: "Meera", venture: "Saarthi", stage: "Feedback round", time: "10:20 AM", score: 81 },
  { founder: "Ishita", venture: "NammaMeals", stage: "Go-to-market mock", time: "10:45 AM", score: 78 },
];

export const cohortMetrics = {
  participation: 88,
  feedbackQuality: 4.7,
  demoReadiness: 76,
  teammateSupport: 82,
};

export function getCohortReadinessScore() {
  const normalizedFeedback = (cohortMetrics.feedbackQuality / 5) * 100;
  const average =
    (cohortMetrics.participation + normalizedFeedback + cohortMetrics.demoReadiness + cohortMetrics.teammateSupport) / 4;

  return Math.round(average);
}
