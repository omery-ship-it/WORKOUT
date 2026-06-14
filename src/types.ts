export type Tab = 'dashboard' | 'nutrition' | 'workout';

export interface DailyLog {
  completedMeals: string[];
  completedWorkouts: Record<string, boolean>;
  logs: Record<string, { weight: string; reps: string }[]>;
}
