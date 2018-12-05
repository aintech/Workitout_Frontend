import { Injectable } from "@angular/core";
import { WorkoutPlan } from "./workout-plan.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { WorkoutPlanBinding } from "./workout-plan-binding.model";

@Injectable()
export class WorkoutPlanService {

  constructor(private http: HttpClient) {}

  getPlans (): Observable<WorkoutPlan[]> {
    return this.http.get<WorkoutPlan[]>('/back/workoutplans');
  }

  persist (plan: WorkoutPlan, deletedBindings: WorkoutPlanBinding[]) {
    let result: Observable<WorkoutPlan>;
    if (plan.id == null) {
      result = this.http.post<WorkoutPlan>('/back/workoutplans', plan);
    } else {
      result = this.http.put<WorkoutPlan>('/back/workoutplans', plan);
    }
    result.subscribe(data => {
      plan.id = (<WorkoutPlan>data).id;
      deletedBindings.forEach(bind => {
        if (bind.id != null) {
          this.http.delete("/back/workoutplanbindings/" + bind.id).subscribe();
        }
      });
      plan.bindings.forEach(bind => {
        if (bind.id == null) {
          this.http.post("/back/workoutplanbindings/" + plan.id, bind).subscribe();
        } else {
          this.http.put("/back/workoutplanbindings", bind).subscribe();
        }
      });
    });
  }

  delete (plan: WorkoutPlan) {
    this.http.delete("/back/workoutplans/" + plan.id).subscribe();
  }
}
