import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Exercise } from '../exercise.model';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-exercise-create',
  templateUrl: './exercise-create.component.html',
  styleUrls: ['./exercise-create.component.css']
})
export class ExerciseCreateComponent implements OnInit {

  exercise: Exercise = new Exercise();

  constructor (private service: ExerciseService,
               private http: HttpClient,
               private router: Router) { }

  ngOnInit() {}

  onSubmit () {
    this.service.saveExercise(this.exercise).subscribe(
      res => {
        // let id = res['id'];
        this.router.navigate(['/exercise-list']);
        // this.router.navigate(['/exercise-detail', id]);
      }, (err) => {
        console.log(err);
      }
    )
  }

  onCancel () {
    this.router.navigate(['/exercise-list']);
  }
}
