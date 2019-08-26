import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise.model';
import { Round } from '../round.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseService } from '../exercise.service';
import {Media} from '../media.model';

@Component({
  selector: 'app-exercise-edit',
  templateUrl: './exercise-edit.component.html',
  styleUrls: ['./exercise-edit.component.css']
})
export class ExerciseEditComponent implements OnInit {

  exercise: Exercise = new Exercise();

  deletedRounds: Round[] = [];
  deletedMedias: Media[] = [];

  recentlySaved: Boolean = false;

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

  onSubmit() {
    this.service.persist(this.exercise);
    this.deletedRounds.forEach(round => {
      this.service.deleteRound(round).subscribe();
    });
    this.deletedMedias.forEach(media => {
      this.service.deleteMedia(media).subscribe();
    });

    this.service.exercisePersisted.subscribe(res => {
      this.recentlySaved = true;
      // this.router.navigate(['/exercise-list']);
    });
  }

  addRound () {
    const round: Round = new Round();
    round.index = this.exercise.rounds.length;
    this.exercise.rounds.push(round);
  }

  removeRound (round: Round) {
    const idx: number = this.exercise.rounds.indexOf(round, 0);
    this.exercise.rounds.splice(idx, 1);
    let i: number = 0;
    this.exercise.rounds.forEach(round => {
      round.index = i++;
    });
    if (round.id != null) {
      this.deletedRounds.push(round);
    }
  }

  switchExternalSource () {
    this.exercise.externalSource = !this.exercise.externalSource;
    if (this.exercise.externalSource) {
      this.exercise.instruction = null;
      this.exercise.rounds = [];
      this.exercise.weight = null;
    } else {
      this.exercise.externalLink = null;
    }
  }

  addMedia () {
    const media: Media = new Media();
    media.index = this.exercise.medias.length;
    this.exercise.medias.push(media);
  }

  uploadMedia (event, media: Media) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      const file: File = files[0];
      media.name = file.name;

      const readerArray: FileReader = new FileReader();
      readerArray.readAsArrayBuffer(file);
      readerArray.onload = (loadEvent: any) => {
        media.source = new Uint8Array(readerArray.result);
      };

      const readerData: FileReader = new FileReader();
      readerData.readAsDataURL(file);
      readerData.onload = (loadEvent: any) => {
        media.image = loadEvent.target.result;
      };
    }
  }

  removeMedia (media: Media) {
    const idx: number = this.exercise.medias.indexOf(media);
    this.exercise.medias.splice(idx, 1);
    let i: number = 0;
    this.exercise.medias.forEach(media => {
      media.index = i++;
    });
    if (media.id != null) {
      this.deletedMedias.push(media);
    }
  }

  onCancel () {
    this.router.navigate(['exercise-list']);
  }
}
