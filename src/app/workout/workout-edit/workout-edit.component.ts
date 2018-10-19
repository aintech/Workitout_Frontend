import { Component, OnInit } from '@angular/core';
import { Workout } from '../workout.model';
import { WorkoutService } from '../workout.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-workout-edit',
  templateUrl: './workout-edit.component.html',
  styleUrls: ['./workout-edit.component.css']
})
export class WorkoutEditComponent implements OnInit {

  workout: Workout = new Workout();

  constructor(private service: WorkoutService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.service.getWorkout(
      this.route.snapshot.params['id']
    ).subscribe(
      data => {
        this.workout = <Workout>data;
      }, (err) => {
        console.log(err);
      }
    );
  }

  onCancel () {
    this.router.navigate(['/workout-list']);
  }
}
