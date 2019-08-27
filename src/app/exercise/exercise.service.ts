import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Exercise } from "./exercise.model";
import {Observable, Subject} from 'rxjs';
import { Round } from "./round.model";
import {Workout} from '../workout/workout.model';
import {Media} from './media.model';


@Injectable()
export class ExerciseService {

  exercisePersisted: Subject<Exercise> = new Subject<Exercise>();

  constructor (private http: HttpClient) {}

  getExercise (id: number): Observable<Exercise> {
    return this.http.get<Exercise>('/back/exercises/' + id);
    // let exercise: Exercise;
    // this.http.get('/back/exercises/' + id).subscribe(
    //   data => {
    //     console.log(data);
    //     exercise = <Exercise>data;
    //   }
    // );
    // return exercise;
  }

  getAllExerciseTypes(): Observable<string[]> {
    return this.http.get<string[]>('/back/exercises/types');
  }

  getAllMuscleGroups(): Observable<string[]> {
    return this.http.get<string[]>('/back/exercises/musclegroups');
  }

  persist (exercise: Exercise) {
    this.saveExercise(exercise).subscribe(
      data => {
        const saved: Exercise = <Exercise>data;
        exercise.rounds.forEach(round => {
          this.saveRound(round, saved);
        });
        exercise.medias.forEach(media => {
          this.saveMedia(media, saved);
        });
        this.exercisePersisted.next(saved);
      }
    );
  }

  saveExercise (exercise: Exercise): Observable<Exercise> {
    if (exercise.id == null) {
      return this.http.post<Exercise>('/back/exercises', exercise);
    } else {
      return this.http.put<Exercise>('/back/exercises/' + exercise.id, exercise);
    }
    // return this.http.post<Exercise>('/back/exercises', exercise);
    // // .subscribe (
    // //   res => {
    // //     return res['id'];
    // //     // this.router.navigate(['/exercise-list']);
    // //     // this.router.navigate(['/exercise-detail', id]);
    // //   }, (err) => {
    // //     console.log(err);
    // //   }
    // // );
  }

  private saveRound (round: Round, exercise: Exercise) {
    if (round.id == null) {
      this.http.post<Round>('/back/rounds/' + exercise.id, round).subscribe(res => {}, (err) => { console.log(err); });
    } else {
      this.http.put<Round>('/back/rounds/' + round.id, round).subscribe(res => {}, (err) => { console.log(err); });
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
