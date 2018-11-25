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

  getWorkoutSchedule (scheduleId: number) : Observable<WorkoutSchedule> {
    return this.http.get<WorkoutSchedule>('/back/workoutschedules/' + scheduleId);
  }

  persist (workout: Workout, workoutSchedule: WorkoutSchedule): Observable<WorkoutSchedule> {
    if (workoutSchedule.id == null) {
      return this.http.post<WorkoutSchedule>('/back/workoutschedules/' + workout.id, workoutSchedule);
    } else {
      return this.http.put<WorkoutSchedule>('/back/workoutschedules/' + workoutSchedule.id, workoutSchedule);
    }
  }

  delete (workoutSchedule: WorkoutSchedule): Observable<string> {
    return this.http.delete<string>('/back/workoutschedules/' + workoutSchedule.id);
  }
}
