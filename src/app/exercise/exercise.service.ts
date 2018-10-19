import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Exercise } from "./exercise.model";
import { Observable } from "rxjs";
import { Round } from "./round.model";


@Injectable()
export class ExerciseService {

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

  saveExercise (exercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>('/back/exercises', exercise);
    // .subscribe (
    //   res => {
    //     return res['id'];
    //     // this.router.navigate(['/exercise-list']);
    //     // this.router.navigate(['/exercise-detail', id]);
    //   }, (err) => {
    //     console.log(err);
    //   }
    // );
  }

  updateExercise (exercise: Exercise): Observable<Exercise> {
    let result: Observable<Exercise> = this.http.put<Exercise>('/back/exercises/' + exercise.id, exercise);

    exercise.rounds.forEach(round => {
      this.saveRound(round, exercise);
    });

    return result;
  }

  saveRound (round: Round, exercise: Exercise) {
    if (round.id == null) {
      this.http.post<Round>('/back/rounds', round).subscribe(
        res => {}, (err) => {
          console.log(err);
        }
      );
    } else {
      this.http.put<Round>('/back/rounds', round).subscribe(
        res => {}, (err) => {
          console.log(err);
        }
      )
    }
  }
}
