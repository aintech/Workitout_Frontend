import { Component, OnInit } from '@angular/core';
import { Workout } from '../workout/workout.model';
import { WorkoutService } from '../workout/workout.service';
import { ActivatedRoute } from '@angular/router';
import { Exercise } from '../exercise/exercise.model';
import { Round } from '../exercise/round.model';
import { ExercisePerformElement } from './exercise-perform-element.model';

@Component({
  selector: 'app-workout-perform',
  templateUrl: './workout-perform.component.html',
  styleUrls: ['./workout-perform.component.css']
})
export class WorkoutPerformComponent implements OnInit {

  workout: Workout;

  exerciseIndex: number = 0;
  exercise: Exercise;

  // round: Round;

  // roundIndex: number = 0;
  elementIndex: number = 0;
  performElement: ExercisePerformElement;

  exerciseStarted: boolean = false;

  performElements: ExercisePerformElement[] = [];

  constructor (private workoutService: WorkoutService,
               private route: ActivatedRoute) { }

  ngOnInit() {
    const id: number = this.route.snapshot.params['id'];
    this.workoutService.getWorkout(id).subscribe(
      data => {
        this.workout = <Workout>data;
        if (this.workout.exercises != null) {
          this.workout.exercises.sort((x, y) => x.index - y.index);
          this.workout.exercises.forEach(exercise => {
            exercise.rounds.sort((x, y) => x.index - y.index);
            exercise.medias.sort((x, y) => x.index - y.index);
            exercise.externalSource = exercise.externalLink != null;
            exercise.medias.forEach(media => {
              media.image = "data:image/jpeg;base64," + media.source;
            });
          });
        }
        this.exercise = this.workout.exercises[this.exerciseIndex];
        this.exercise.rounds.forEach(round => {
          let element: ExercisePerformElement = new ExercisePerformElement();
          element.round = round;
          this.performElements.push(element);
          element = new ExercisePerformElement();
          if (round === this.exercise.rounds[this.exercise.rounds.length - 1]) {
            element.timeout = this.exercise.timeout;
          } else {
            element.timeout = round.timeout;
          }
          this.performElements.push(element);
        });
        this.performElement = this.performElements[this.elementIndex];
      },
      (err) => { console.log(err); }
    );
  }

  getFontWeightStyle (exercise: Exercise): string {
    if (exercise === this.exercise) {
      return "bold";
    } else if (this.workout.exercises.indexOf(exercise) < this.exerciseIndex) {
      return "lighter";
    }
    return "normal";
  }

  getBorderStyle (exercise: Exercise): string {
    if (exercise === this.exercise) {
      return "double blue";
    } else if (this.workout.exercises.indexOf(exercise) < this.exerciseIndex) {
      return "solid thin lightblue";
    }
    return "solid thin blue";
  }

  getBackgroundStyle (exercise: Exercise): string {
    if (exercise === this.exercise) {
      return "aliceblue";
    }
    return "";
  }

  getElementHeight (performElement: ExercisePerformElement): string {
    if (this.performElements.indexOf(performElement) == this.elementIndex) {
      return "150px";
    }
    return "50px";
  }

  getBackgroundElementStyle (performElement: ExercisePerformElement): string {
    if (this.performElements.indexOf(performElement) == this.elementIndex) {
      return "antiquewhite";
    }
    return "";
  }

  beginExercise () {
    this.exerciseStarted = true;
  }
}
