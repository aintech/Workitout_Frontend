import { WorkoutPlanBinding } from "./workout-plan-binding.model";

export class WorkoutPlan {
  id: number;
  name: string;
  index: number;
  scheduled: boolean;
  bindings: WorkoutPlanBinding[] = [];
}
