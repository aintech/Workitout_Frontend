import { Injectable, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { WorkoutSchedule } from "./workout-schedule.model";
import { HttpClient } from "@angular/common/http";
import { Workout } from "../../workout/workout.model";

@Injectable()
export class WorkoutScheduleService {

  constructor (private http: HttpClient) {}

  getWorkoutSchedules (): Observable<WorkoutSchedule[]> {
    return this.http.get<WorkoutSchedule[]>('/back/workoutschedules');
  }

  persist (workout: Workout, workoutSchedule: WorkoutSchedule): Observable<WorkoutSchedule> {
    return this.http.post<WorkoutSchedule>('/back/workoutschedules/' + workout.id, workoutSchedule);
  }

  delete (workoutSchedule: WorkoutSchedule): Observable<string> {
    return this.http.delete<string>('/back/workoutschedules/' + workoutSchedule.id);
  }
}
