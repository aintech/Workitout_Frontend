import { Component, OnInit } from '@angular/core';
import { Workout } from '../workout.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {

  workouts: Workout[];

  constructor(private http: HttpClient,
              private router: Router) {}

  ngOnInit() {
    this.http.get('/back/workouts').subscribe(
      data => {
        this.workouts = <Workout[]>data;
      }
    );
  }

  deleteWorkout (workout: Workout) {
    const idx: number = this.workouts.indexOf(workout, 0);
    this.workouts.splice(idx, 1);
    this.http.delete('/back/workouts/' + workout.id).subscribe(
      res => {
        this.router.navigate(['/workout-list']);
      },
      (err) => { console.log(err); }
    );
  }
}
