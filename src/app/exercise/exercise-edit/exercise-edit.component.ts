import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise.model';
import { Round } from '../round.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-exercise-edit',
  templateUrl: './exercise-edit.component.html',
  styleUrls: ['./exercise-edit.component.css']
})
export class ExerciseEditComponent implements OnInit {

  exercise: Exercise = new Exercise();

  constructor(private service: ExerciseService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.service.getExercise(
      this.route.snapshot.params['id']
    ).subscribe(
      data => {
        this.exercise = <Exercise>data;
      }, (err) => {
        console.log(err);
      }
    );
  }

  addRound () {
    const round: Round = new Round();
    round.index = this.exercise.rounds.length;
    round.repeat = round.index * 5;
    round.timeout = round.index * 10;
    this.exercise.rounds.push(round);
  }

  onSubmit () {
    this.service.updateExercise(this.exercise).subscribe(
      res => {
        this.router.navigate(['/exercise-list']);
      }, (err) => {
        console.log(err);
      }
    );
  }

  onCancel () {
    this.router.navigate(['exercise-list']);
  }
}
