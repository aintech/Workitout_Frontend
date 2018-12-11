import { Component, OnInit } from '@angular/core';
import { WorkoutPlanService } from './workout-plan.service';
import { WorkoutPlan } from './workout-plan.model';
import { Workout } from '../workout/workout.model';
import { WorkoutService } from '../workout/workout.service';
import { WorkoutPlanBinding } from './workout-plan-binding.model';

@Component({
  selector: 'app-workout-plan',
  templateUrl: './workout-plan.component.html',
  styleUrls: ['./workout-plan.component.css']
})
export class WorkoutPlanComponent implements OnInit {

  workoutPlans: WorkoutPlan[] = [];

  editedPlan: WorkoutPlan;

  workouts: Workout[] = [];

  availableWorkouts: Workout[] = [];

  deletedBindings: WorkoutPlanBinding[] = [];

  constructor(private planService: WorkoutPlanService,
              private workoutService: WorkoutService) { }

  ngOnInit() {
    this.planService.getPlans().subscribe(
      data => {
        this.workoutPlans = <WorkoutPlan[]>data;
        this.workoutPlans.forEach(plan => {
          plan.bindings.sort((x, y) => x.index - y.index);
        });
      }, (err) => { console.log(err); }
    )
    this.workoutService.getWorkouts().subscribe(
      data => {
        this.workouts = <Workout[]>data;
      }, (err) => { console.log(err); }
    )
  }

  addPlan () {
    const plan: WorkoutPlan = new WorkoutPlan();
    plan.index = this.workoutPlans.length;
    this.workoutPlans.push(plan);
    this.editedPlan = plan;
    this.availableWorkouts = this.workouts.slice();
  }

  editPlan (plan: WorkoutPlan) {
    this.editedPlan = plan;
    this.checkAvailableWorkouts();
  }

  cancelPlan (plan: WorkoutPlan) {
    this.editedPlan = null;
    if (plan.id == null) {
      const idx: number = this.workoutPlans.indexOf(plan);
      this.workoutPlans.splice(idx, 1);
    } else {
      console.log("WHEN CANCELING SAVED PLAN");
    }
    this.checkAvailableWorkouts();
  }

  savePlan () {
    this.planService.persist(this.editedPlan, this.deletedBindings);
    this.editedPlan = null;
    this.deletedBindings = [];
    this.checkAvailableWorkouts();
  }

  removePlan (plan: WorkoutPlan) {
    this.editedPlan = null;
    const idx: number = this.workoutPlans.indexOf(plan);
    this.workoutPlans.splice(idx, 1);
    if (plan.id != null) {
      this.planService.delete(plan);
    }
  }

  addWorkout (workout: Workout) {
    const bind: WorkoutPlanBinding = new WorkoutPlanBinding();
    bind.index = this.editedPlan.bindings.length;
    bind.workout = workout;
    this.editedPlan.bindings.push(bind);
    this.checkAvailableWorkouts();
  }

  removeWorkout (binding: WorkoutPlanBinding) {
    const index = binding.index;
    const idx: number = this.editedPlan.bindings.indexOf(binding);
    this.editedPlan.bindings.splice(idx, 1);
    this.editedPlan.bindings.forEach(bind => {
      if (bind.index > index) {
        bind.index--;
      }
    });
    if (binding.id != null) {
      this.deletedBindings.push(binding);
    }
    this.checkAvailableWorkouts();
  }

  private checkAvailableWorkouts () {
    this.availableWorkouts = [];
    if (this.editedPlan != null) {
      let existed: Workout[] = [];
      this.editedPlan.bindings.forEach(binding => existed.push(binding.workout));
      this.workouts.forEach(workout => {
        let exist: boolean = false;
        existed.forEach(wrk => {
          if (workout.id == wrk.id) {
            exist = true;
          }
        });
        if (!exist) {
          this.availableWorkouts.push(workout);
        }
      });
    }
  }
}
