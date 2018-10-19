import { Component, OnInit } from '@angular/core';
import { Workout } from '../workout.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {

  workouts: Workout[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/back/workouts').subscribe(
      data => {
        this.workouts = <Workout[]>data;
      }
    );
  }
}
