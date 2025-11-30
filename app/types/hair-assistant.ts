// app/types/hair-assistant.ts

export interface HairAssistantResult {
  summary: string;
  hair_type: string;
  scalp_condition: string;
  severity_score: number;
  issues: string[];
  recommended_routine: {
    morning: string[];
    night: string[];
    weekly: string[];
  };
  meal_suggestions: string[];
  lifestyle_tips: string[];
}
