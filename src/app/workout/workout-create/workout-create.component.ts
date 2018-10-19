import { Component, OnInit } from '@angular/core';
import { Workout } from '../workout.model';
import { WorkoutService } from '../workout.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Exercise } from '../../exercise/exercise.model';
import { Round } from '../../exercise/round.model';

@Component({
  selector: 'app-workout-create',
  templateUrl: './workout-create.component.html',
  styleUrls: ['./workout-create.component.css']
})
export class WorkoutCreateComponent implements OnInit {

  workout: Workout = new Workout();

  constructor(private service: WorkoutService,
              private http: HttpClient,
              private router: Router) {}

  ngOnInit() {}

  onSubmit() {
    this.service.persist(this.workout);
    this.service.workoutPersisted.subscribe(
      res => {
        this.router.navigate(['/workout-list']);
      }
    );
  }

  addExercise () {
    if (this.workout.exercises == null) {
      this.workout.exercises = [];
    }
    const exercise: Exercise = new Exercise();
    exercise.index = this.workout.exercises.length;
    this.workout.exercises.push(exercise);
  }

  removeExercise (exercise: Exercise) {
    const idx = this.workout.exercises.indexOf(exercise, 0);
    this.workout.exercises.splice(idx, 1);
    let i: number = 0;
    this.workout.exercises.forEach(exercise => {
      exercise.index = i++;
    });
  }

  addRound (exercise: Exercise) {
    if (exercise.rounds == null) {
      exercise.rounds = [];
    }
    const round: Round = new Round();
    round.index = exercise.rounds.length;
    exercise.rounds.push(round);
  }

  removeRound (round: Round, exercise: Exercise) {
    const idx = exercise.rounds.indexOf(round, 0);
    exercise.rounds.splice(idx, 1);
    let i: number = 0;
    exercise.rounds.forEach(round => {
      round.index = i++;
    });
  }

  onCancel () {
    this.router.navigate(['/workout-list']);
  }
}
