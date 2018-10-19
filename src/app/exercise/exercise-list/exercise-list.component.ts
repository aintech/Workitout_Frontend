import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {

  exercises: Exercise[];

  constructor (private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/back/exercises').subscribe(
      data => {
        this.exercises = <Exercise[]>data;
      }
    );
  }
}
