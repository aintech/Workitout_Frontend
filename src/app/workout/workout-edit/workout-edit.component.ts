import { Component, OnInit } from '@angular/core';
import { Workout } from '../workout.model';
import { WorkoutService } from '../workout.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Exercise } from '../../exercise/exercise.model';
import { Round } from '../../exercise/round.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-workout-edit',
  templateUrl: './workout-edit.component.html',
  styleUrls: ['./workout-edit.component.css']
})
export class WorkoutEditComponent implements OnInit {

  workout: Workout = new Workout();

  deletedExercises: Exercise[] = [];
  deletedRounds: Round[] = [];

  roundsDeleted: Subject<void> = new Subject<void>();

  constructor(private service: WorkoutService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    const id: number = this.route.snapshot.params['id'];
    if (id != -1) {
      this.service.getWorkout(id).subscribe(
        data => {
          this.workout = <Workout>data;
          if (this.workout.exercises != null) {
            this.workout.exercises.sort((x, y) => x.index - y.index);
            this.workout.exercises.forEach(exercise => {
              if (exercise.rounds != null) {
                exercise.rounds.sort((x, y) => x.index - y.index);
              }
            });
          }
        },
        (err) => { console.log(err); }
      );
    }
    this.deletedExercises = [];
    this.deletedRounds = [];
  }

  onSubmit() {
    this.service.persist(this.workout);
    this.deletedRounds.forEach(round => {
      this.service.deleteRound(round).subscribe();
    });
    this.deletedExercises.forEach(exercise => {
      this.service.deleteExercise(exercise).subscribe();
    });
    this.service.workoutPersisted.subscribe(res => {
      this.router.navigate(['/workout-list']);
    });
  }

  addExercise () {
    const exercise: Exercise = new Exercise();
    exercise.index = this.workout.exercises.length;
    this.workout.exercises.push(exercise);
  }

  addRound (exercise: Exercise) {
    const round: Round = new Round();
    round.index = exercise.rounds.length;
    exercise.rounds.push(round);
  }

  removeExercise (exercise: Exercise) {
    const idx = this.workout.exercises.indexOf(exercise, 0);
    this.workout.exercises.splice(idx, 1);
    let i: number = 0;
    this.workout.exercises.forEach(exercise => {
      exercise.index = i++;
    });
    if (exercise.id != null) {
      this.deletedExercises.push(exercise);
      exercise.rounds.forEach(round => {
        if (this.deletedRounds.includes(round)) {
          const idx: number = this.deletedRounds.indexOf(round, 0);
          this.deletedRounds.splice(idx, 1);
        }
      });
    }
  }

  removeRound (round: Round, exercise: Exercise) {
    const idx = exercise.rounds.indexOf(round, 0);
    exercise.rounds.splice(idx, 1);
    let i: number = 0;
    exercise.rounds.forEach(round => {
      round.index = i++;
    });
    if (round.id != null) {
      this.deletedRounds.push(round);
    }
  }

  onCancel () {
    this.router.navigate(['/workout-list']);
  }
}
