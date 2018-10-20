import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Workout } from "./workout.model";
import { Observable, Subject } from "rxjs";
import { Exercise } from "../exercise/exercise.model";
import { Round } from "../exercise/round.model";

@Injectable()
export class WorkoutService {

  workoutPersisted = new Subject<Workout>();

  roundsDeleted: Subject<void> = new Subject<void>();
  exercisesDeleted: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) {}

  getWorkout (id: number): Observable<Workout> {
    return this.http.get<Workout>('/back/workouts/' + id);
  }

  persist (workout: Workout) {
    this.saveWorkout(workout).subscribe(
      data => {
        const savedWork: Workout = <Workout>data;
        if (workout.exercises != null) {
          workout.exercises.forEach(exercise => {
            const resultExer: Observable<Exercise> = this.saveExercise(exercise, savedWork);
            resultExer.subscribe(
              dataExer => {
                const savedExer: Exercise = <Exercise>dataExer;
                if (exercise.rounds != null) {
                  exercise.rounds.forEach(round => {
                    this.saveRound(round, savedExer);
                  });
                }
              }
            );
          });
        }
        this.workoutPersisted.next(savedWork);
      }
    );
  }

  private saveWorkout (workout: Workout): Observable<Workout> {
    if (workout.id == null) {
      return this.http.post<Workout>('/back/workouts', workout);
    } else {
      return this.http.put<Workout>('/back/workouts/' + workout.id, workout);
    }
  }

  private saveExercise (exercise: Exercise, workout: Workout): Observable<Exercise> {
    if (exercise.id == null) {
      return this.http.post<Exercise>('/back/exercises/' + workout.id, exercise);
    } else {
      return this.http.put<Exercise>('/back/exercises/' + exercise.id, exercise);
    }
  }

  private saveRound (round: Round, exercise: Exercise) {
    if (round.id == null) {
       this.http.post<Round>('/back/rounds/' + exercise.id, round).subscribe(res => {});
    } else {
      this.http.put<Round>('/back/rounds/' + round.id, round).subscribe(res => {});
    }
  }

  public deleteExercises (exercises: Exercise[]) {
    let counter: number = exercises.length;
    if (counter == 0) {
      this.exercisesDeleted.next();
    } else {
      exercises.forEach(exercise => {
        this.deleteExercise(exercise).subscribe(res => {
          counter--;
          if (counter == 0) {
            this.exercisesDeleted.next();
          }
        });
      });
    }
  }

  public deleteExercise (exercise: Exercise): Observable<Object> {
    return this.http.delete('/back/exercises/' + exercise.id);
  }

  public deleteRounds (rounds: Round[]) {
    let counter: number = rounds.length;
    if (counter == 0) {
      this.roundsDeleted.next();
    } else {
      rounds.forEach(rnd => {
        this.deleteRound(rnd).subscribe(res => {
          counter--;
          if (counter == 0) {
            this.roundsDeleted.next();
          }
        });
      });
    }
  }

  public deleteRound (round: Round): Observable<Object> {
    return this.http.delete('/back/rounds/' + round.id);
  }
}
