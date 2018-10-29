import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Workout } from "./workout.model";
import { Observable, Subject } from "rxjs";
import { Exercise } from "../exercise/exercise.model";
import { Round } from "../exercise/round.model";
import { Media } from "../exercise/media.model";

@Injectable()
export class WorkoutService {

  workoutPersisted = new Subject<Workout>();

  roundsDeleted: Subject<void> = new Subject<void>();
  exercisesDeleted: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) {}

  getWorkout (id: number): Observable<Workout> {
    return this.http.get<Workout>('/back/workouts/' + id);
  }

  getWorkouts (): Observable<Workout[]> {
    return this.http.get<Workout[]>('/back/workouts');
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
                exercise.rounds.forEach(round => {
                  this.saveRound(round, savedExer);
                });
                exercise.medias.forEach(media => {
                  this.saveMedia(media, exercise);
                });
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

  private saveMedia (media: Media, exercise: Exercise) {
    if (media.source == null || media.source.length == 0) {
      return;
    }
    if (media.id == null) {
      this.http.post<Media>('/back/medias/' + exercise.id, media).subscribe();
    } else {
      this.http.put<Media>('/back/medias/' + media.id, media).subscribe();
    }
  }

  // public deleteExercises (exercises: Exercise[]) {
  //   let counter: number = exercises.length;
  //   if (counter == 0) {
  //     this.exercisesDeleted.next();
  //   } else {
  //     exercises.forEach(exercise => {
  //       this.deleteExercise(exercise).subscribe(res => {
  //         counter--;
  //         if (counter == 0) {
  //           this.exercisesDeleted.next();
  //         }
  //       });
  //     });
  //   }
  // }

  public deleteExercise (exercise: Exercise): Observable<Object> {
    return this.http.delete('/back/exercises/' + exercise.id);
  }

  // public deleteRounds (rounds: Round[]) {
  //   let counter: number = rounds.length;
  //   if (counter == 0) {
  //     this.roundsDeleted.next();
  //   } else {
  //     rounds.forEach(rnd => {
  //       this.deleteRound(rnd).subscribe(res => {
  //         counter--;
  //         if (counter == 0) {
  //           this.roundsDeleted.next();
  //         }
  //       });
  //     });
  //   }
  // }

  public deleteRound (round: Round): Observable<Object> {
    return this.http.delete('/back/rounds/' + round.id);
  }

  public deleteMedia (media: Media): Observable<Object> {
    return this.http.delete('/back/medias/' + media.id);
  }
}
