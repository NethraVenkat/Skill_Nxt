export type Profile = {
  id: string;
  display_name: string;
  age_band?: string | null;
  city?: string | null;
  learning_language: string;
  weekly_goal: number;
  reminder_day?: number | null;
  streak_days: number;
  consent_ai_at?: string | null;
  created_at: string;
  updated_at: string;
};

export type Venture = {
  id: string;
  user_id: string;
  name: string;
  idea: string;
  context?: string | null;
  status: "active" | "completed" | "archived";
  seed: number;
  current_module: number;
  current_lesson?: string | null;
  created_at: string;
  updated_at: string;
};

export type CompanyState = {
  venture_id: string;
  cash_paise: number;
  monthly_burn_paise: number;
  runway_months: number;
  customers: number;
  leads: number;
  churn_rate: number;
  conversion_rate: number;
  average_price_paise: number;
  variable_cost_paise: number;
  revenue_paise: number;
  morale: number;
  quality: number;
  evidence_quality: number;
  awareness: number;
  retention_rate: number;
  valuation_paise: number;
  months_elapsed: number;
  weak_spot?: string | null;
  updated_at: string;
};

export type ProgressRow = {
  id: string;
  venture_id: string;
  lesson_id: string;
  status: string;
  challenge_completed_at?: string | null;
  decision_at?: string | null;
  retry_at?: string | null;
  retrieval_score?: number | null;
  completed_at?: string | null;
  best_decision?: unknown;
  review_due_at?: string | null;
  review_interval_days?: number | null;
  created_at: string;
  updated_at: string;
};
