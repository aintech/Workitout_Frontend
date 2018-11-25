import { Injectable } from "@angular/core";
import { WorkoutHistory } from "./workout-history.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { WorkoutSchedule } from "../workout-scheduler/workout-schedule.model";

@Injectable()
export class WorkoutHistoryService {

  constructor (private http: HttpClient) {}

  persist (workoutSchedule: WorkoutSchedule, workoutHistory: WorkoutHistory): Observable<WorkoutHistory> {
    return this.http.post<WorkoutHistory>('/back/workouthistories/' + workoutSchedule.id, workoutHistory);
  }
}
