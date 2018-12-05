import { PipeTransform, Pipe } from "@angular/core";
import { Workout } from "../workout/workout.model";
import { WorkoutPlanBinding } from "./workout-plan-binding.model";

@Pipe({ name: 'availableWorkout', pure: true })
export class AvailableWorkoutPipe implements PipeTransform {

  transform(allWorkouts: Workout[], existedBindings: WorkoutPlanBinding[]) {
    const existed: Workout[] = existedBindings.map(binding => binding.workout);
    return allWorkouts.filter(workout => !existed.includes(workout));
  }
}
