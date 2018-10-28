import { Component, OnInit } from '@angular/core';
import { Workout } from '../workout.model';
import { WorkoutService } from '../workout.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Exercise } from '../../exercise/exercise.model';
import { Round } from '../../exercise/round.model';
import { Subject } from 'rxjs';
import { Media } from '../../exercise/media.model';

@Component({
  selector: 'app-workout-edit',
  templateUrl: './workout-edit.component.html',
  styleUrls: ['./workout-edit.component.css']
})
export class WorkoutEditComponent implements OnInit {

  workout: Workout = new Workout();

  deletedExercises: Exercise[] = [];
  deletedRounds: Round[] = [];
  deletedMedias: Media[] = [];

  // roundsDeleted: Subject<void> = new Subject<void>();

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
              exercise.externalSource = exercise.externalLink != null;
            });
          }
        },
        (err) => { console.log(err); }
      );
    }
    this.deletedExercises = [];
    this.deletedRounds = [];
    this.deletedMedias = [];
  }

  onSubmit() {
    this.service.persist(this.workout);
    this.deletedRounds.forEach(round => {
      this.service.deleteRound(round).subscribe();
    });
    this.deletedExercises.forEach(exercise => {
      this.service.deleteExercise(exercise).subscribe();
    });
    this.deletedMedias.forEach(media => {
      this.service.deleteMedia(media).subscribe();
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

  addMedia (exercise: Exercise) {
    const media: Media = new Media();
    media.index = exercise.medias.length;
    exercise.medias.push(media);
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
      exercise.medias.forEach(media => {
        if (this.deletedMedias.includes(media)) {
          const idx: number = this.deletedMedias.indexOf(media, 0);
          this.deletedMedias.splice(idx, 1);
        }
      });
    }
  }

  removeRound (round: Round, exercise: Exercise) {
    const idx: number = exercise.rounds.indexOf(round, 0);
    exercise.rounds.splice(idx, 1);
    let i: number = 0;
    exercise.rounds.forEach(round => {
      round.index = i++;
    });
    if (round.id != null) {
      this.deletedRounds.push(round);
    }
  }

  removeMedia (media: Media, exercise: Exercise) {
    const idx: number = exercise.medias.indexOf(media);
    exercise.medias.splice(idx, 1);
    let i: number = 0;
    exercise.medias.forEach(media => {
      media.index = i++;
    });
    if (media.id != null) {
      this.deletedMedias.push(media);
    }
  }

  switchExternalSource (exercise: Exercise) {
    exercise.externalSource = !exercise.externalSource;
    if (exercise.externalSource) {
      exercise.instruction = null;
      exercise.rounds = [];
      exercise.weight = null;
    } else {
      exercise.externalLink = null;
    }
  }

  uploadMedia (event, media: Media) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      media.file = files[0];
      media.name = media.file.name;

      const readerArray: FileReader = new FileReader();
      readerArray.readAsArrayBuffer(media.file);
      readerArray.onload = (loadEvent: any) => {
        media.source = new Uint8Array(readerArray.result);
      };

      const readerData: FileReader = new FileReader();
      readerData.readAsDataURL(event.target.files[0]);
      readerData.onload = (loadEvent: any) => {
        media.image = loadEvent.target.result;
      };
    }
  }

  onCancel () {
    this.router.navigate(['/workout-list']);
  }
}
