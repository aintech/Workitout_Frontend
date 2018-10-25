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

  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  schedulerDate: CalendarDate;

  workouts: Workout[];

  workoutSchedules: WorkoutSchedule[];

  constructor(private workoutService: WorkoutService,
              private workoutScheduleService: WorkoutScheduleService) { }

  ngOnInit() {
    this.workoutService.getWorkouts().subscribe(data => {
      this.workouts = <Workout[]>data;
    });
    this.workoutScheduleService.getWorkoutSchedules().subscribe(data => {
      this.workoutSchedules = <WorkoutSchedule[]>data;
    });
  }

  onWorkoutChosen (workout: Workout) {
    const workoutSchedule: WorkoutSchedule = new WorkoutSchedule();
    workoutSchedule.date = this.schedulerDate.date;
    workoutSchedule.workout = workout;
    this.workoutScheduleService.persist(workout, workoutSchedule);
    this.cancel();
  }

  open (schedulerDate: CalendarDate) {
    this.schedulerDate = schedulerDate;
    this.visible = true;
    this.visibleChange.emit(this.visible);
  }

  cancel () {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
