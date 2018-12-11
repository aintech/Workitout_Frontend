import { Component, OnInit } from '@angular/core';
import { Workout } from '../workout/workout.model';
import { WorkoutService } from '../workout/workout.service';
import { ActivatedRoute } from '@angular/router';
import { Exercise } from '../exercise/exercise.model';
import { Round } from '../exercise/round.model';
import { ExercisePerformElement } from './exercise-perform-element.model';
import { Subject, Observable } from 'rxjs';
import { WorkoutSchedule } from '../calendar-view/workout-scheduler/workout-schedule.model';
import { WorkoutScheduleService } from '../calendar-view/workout-scheduler/workout-schedule.service';
import { Router } from '@angular/router';
import { WorkoutHistoryService } from '../calendar-view/workout-history/workout-history.service';
import { WorkoutHistory } from '../calendar-view/workout-history/workout-history.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-workout-perform',
  templateUrl: './workout-perform.component.html',
  styleUrls: ['./workout-perform.component.css']
})
export class WorkoutPerformComponent implements OnInit {

  workout: Workout;
  workoutSchedule: WorkoutSchedule;

  exerciseIndex: number = -1;
  exercise: Exercise;

  // round: Round;

  // roundIndex: number = 0;
  elementIndex: number = 0;
  performElement: ExercisePerformElement;

  exerciseStarted: boolean = false;

  performElements: ExercisePerformElement[] = [];

  timerId: any;

  timerAlert: HTMLAudioElement;

  constructor (private workoutService: WorkoutService,
               private scheduleService: WorkoutScheduleService,
               private historyService: WorkoutHistoryService,
               private route: ActivatedRoute,
               private router: Router,
               private sanitizer: DomSanitizer) { }

  ngOnInit() {
    const id: number = this.route.snapshot.params['id'];

    this.scheduleService.getWorkoutSchedule(id).subscribe(
      data => {
        this.workoutSchedule = <WorkoutSchedule>data;
        this.workout = this.workoutSchedule.workout;
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
        this.nextExercise();
      }
    )

    this.timerAlert = new Audio();
    this.timerAlert.src = "assets/audio/timer_alarm.mp3";
    this.timerAlert.load();
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

  nextElement () {
    this.elementIndex++;
    if (this.timerId != null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.timerAlert.pause();
    if (this.elementIndex < this.performElements.length) {
      this.performElement = this.performElements[this.elementIndex];
      if (this.performElement.timeout) {
        this.timerId = setInterval (() => {
          this.countdownTimeout();
        }, 1000);
      }
    } else {
      this.nextExercise();
    }
  }

  private nextExercise () {
    this.performElements = [];
    this.exerciseIndex++;
    if (this.exerciseIndex < this.workout.exercises.length) {
      this.exercise = this.workout.exercises[this.exerciseIndex];
      if (this.exercise.externalLink != null) {
        this.exercise.safeLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.exercise.externalLink.replace("watch?v=", "embed/"));
      }
      this.exercise.rounds.forEach(round => {
        round.repeatsDone = 0;
        //Элемент с количеством повторений
        let element: ExercisePerformElement = new ExercisePerformElement();
        element.round = round;
        this.performElements.push(element);
        //Элемент с таймаутом
        element = new ExercisePerformElement();
        if (round === this.exercise.rounds[this.exercise.rounds.length - 1]) {
          if (this.exercise === this.workout.exercises[this.workout.exercises.length - 1]) {
            element.finish = true;
          } else {
            element.timeout = this.exercise.timeout;
          }
        } else {
          element.timeout = round.timeout;
        }
        this.performElements.push(element);
      });
      this.elementIndex = 0;
      this.performElement = this.performElements[this.elementIndex];
    }
  }

  countdownTimeout () {
    this.performElement.timeout--;
    if (this.performElement.timeout == 0) {
      this.endTimeout();
    }
  }

  endTimeout () {
    clearInterval(this.timerId);
    this.timerId = null;
    this.timerAlert.play();
  }

  finishWorkout () {
    this.writeHistory();
    this.workoutSchedule.performed = true;
    this.scheduleService.persist(this.workout, this.workoutSchedule).subscribe(
      data => {
        this.router.navigate(['/calendar-view']);
      }, (err) => { console.log(err); }
    );
  }

  writeHistory () {
    this.workout.exercises.forEach(exercise => {
      const history = new WorkoutHistory();
      history.name = exercise.name;
      history.index = exercise.index;
      history.weight = exercise.weight;
      history.workoutSchedule = this.workoutSchedule;
      history.repeats = "";
      exercise.rounds.forEach(round => {
        history.repeats += "" + round.repeatsDone + "/" + round.repeat;
        if (round != exercise.rounds[exercise.rounds.length - 1]) {
          history.repeats += ";";
        }
      });
      this.historyService.persist(this.workoutSchedule, history).subscribe();
    });
  }
}
