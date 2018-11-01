import { Component, OnInit } from '@angular/core';
import { Workout } from '../workout/workout.model';
import { WorkoutService } from '../workout/workout.service';
import { ActivatedRoute } from '@angular/router';
import { Exercise } from '../exercise/exercise.model';
import { Round } from '../exercise/round.model';
import { RoundCarouselElement } from './round-carousel-element.model';

@Component({
  selector: 'app-workout-perform',
  templateUrl: './workout-perform.component.html',
  styleUrls: ['./workout-perform.component.css']
})
export class WorkoutPerformComponent implements OnInit {

  workout: Workout;

  exercise: Exercise;

  // round: Round;

  exerciseIndex: number = 1;
  roundIndex: number = 0;

  roundsCarousel: RoundCarouselElement[] = [new RoundCarouselElement(),
                                            new RoundCarouselElement(),
                                            new RoundCarouselElement(),
                                            new RoundCarouselElement(),
                                            new RoundCarouselElement()];

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
        this.roundsCarousel.forEach(carousel => carousel.exercise = this.exercise);
        this.roundsCarousel[2].round = this.exercise.rounds[0];
        this.roundsCarousel[3].round = this.exercise.rounds[1];
        this.roundsCarousel[4].round = this.exercise.rounds[2];

        // this.round = this.exercise.rounds[this.roundIndex];
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
}
