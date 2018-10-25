import { Injectable } from "@angular/core";
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

  persist (workout: Workout, workoutSchedule: WorkoutSchedule) {
    this.http.post('/back/workoutschedules/' + workout.id, workoutSchedule).subscribe(
      res => {}, (err) => { console.log(err); }
    )
  }
}
