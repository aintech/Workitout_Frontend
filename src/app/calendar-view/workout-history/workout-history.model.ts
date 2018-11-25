import { WorkoutSchedule } from "../workout-scheduler/workout-schedule.model";

export class WorkoutHistory {
  id: number;
  workoutSchedule: WorkoutSchedule;
  name: string;
  index: number;
  weight: number;
  repeats: string;
}
