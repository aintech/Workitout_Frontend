import { Workout } from "../../workout/workout.model";
import { WorkoutHistory } from "../workout-history/workout-history.model";

export class WorkoutSchedule {
  id: number;
  workout: Workout;
  date: Date;
  performed: boolean;
  workoutHistories: WorkoutHistory[];
}
