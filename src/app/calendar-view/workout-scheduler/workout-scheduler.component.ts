import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { CalendarDate } from '../CalendarDate.model';
import { Workout } from '../../workout/workout.model';
import { WorkoutService } from '../../workout/workout.service';
import { WorkoutSchedule } from './workout-schedule.model';
import { WorkoutScheduleService } from './workout-schedule.service';

@Component({
  selector: 'app-workout-scheduler',
  templateUrl: './workout-scheduler.component.html',
  styleUrls: ['./workout-scheduler.component.css']
})
export class WorkoutSchedulerComponent implements OnInit {

  @Input() visible: boolean = false;

  // @Output() workoutChosed: EventEmitter<CalendarDate> = new EventEmitter<CalendarDate>();

  schedulerDate: CalendarDate;

  workouts: Workout[];

  constructor(private workoutService: WorkoutService,
              private workoutScheduleService: WorkoutScheduleService) { }

  ngOnInit() {
    this.workoutService.getWorkouts().subscribe(data => {
      this.workouts = <Workout[]>data;
    });
  }

  onWorkoutChosen (workout: Workout) {
    const workoutSchedule: WorkoutSchedule = new WorkoutSchedule();
    workoutSchedule.date = this.schedulerDate.date;
    workoutSchedule.workout = workout;
    this.workoutScheduleService.persist(workout, workoutSchedule).subscribe(
      data => { this.schedulerDate.setSchedule(<WorkoutSchedule>data); },
      (err) => { console.log(err); }
    );
    // this.workoutChosed.emit(this.schedulerDate);
    if (!this.schedulerDate.today) {
      this.close();
    }
  }

  performWorkout () {

  }

  cancelWorkout () {
    this.workoutScheduleService.delete(this.schedulerDate.schedule).subscribe(
      res => { this.schedulerDate.setSchedule(null); },
      (err) => { console.log(err); }
    );
  }

  open (schedulerDate: CalendarDate) {
    this.schedulerDate = schedulerDate;
    this.visible = true;
  }

  close () {
    this.visible = false;
  }
}
