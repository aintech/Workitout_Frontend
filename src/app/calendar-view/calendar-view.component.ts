import { Component, OnInit, TemplateRef } from '@angular/core';
import { CalendarDate } from './CalendarDate.model';
import { WorkoutSchedule } from './workout-scheduler/workout-schedule.model';
import { WorkoutScheduleService } from './workout-scheduler/workout-schedule.service';
import { WorkoutService } from '../workout/workout.service';
import { Workout } from '../workout/workout.model';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {

  dates: CalendarDate[][];

  workoutSchedules: WorkoutSchedule[];

  dateToSchedule: Map<string, WorkoutSchedule> = new Map<string, WorkoutSchedule>();

  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  monthYear: string;

  monthOffset: number = 0;

  constructor (private scheduleService: WorkoutScheduleService,
               private workoutService: WorkoutService) { }

  ngOnInit() {
    this.scheduleService.getWorkoutSchedules().subscribe(data => {
      this.workoutSchedules = <WorkoutSchedule[]>data;
      this.workoutSchedules.forEach(schedule => {
        schedule.workoutHistories.sort((x, y) => x.index - y.index);
        this.dateToSchedule.set(schedule.date.toString(), schedule);
      });
      this.fillDates();
    });
  }

  private fillDates () {
    const currDate: Date = new Date();
    const firstDay: Date = new Date(currDate.getFullYear(), currDate.getMonth() + this.monthOffset, 1);
    this.monthYear = this.months[firstDay.getMonth()] + " of " + firstDay.getFullYear();
    const starting: number = (firstDay.getDay() < 5? 7: 0) + firstDay.getDay() - 1;
    const beginingDate: Date = new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() - starting);

    this.dates = [];
    let index:number = 0;
    for (let i:number = 0; i < 6; i++) {
      this.dates[i] = [];
      for (let j: number = 0; j < 7; j++) {
        const weekDate: Date = new Date(beginingDate.getFullYear(), beginingDate.getMonth(), beginingDate.getDate() + index);
        const date: CalendarDate = new CalendarDate(weekDate, firstDay.getMonth());
        this.dates[i].push(date);
        index++;
        const dateVal: string = this.asJSON(date.date);
        if (this.dateToSchedule.has(dateVal)) {
          date.setSchedule(this.dateToSchedule.get(dateVal));
        }
      }
    }
  }

  asJSON (date: Date): string {
    return date.getFullYear().toString() + "-" +
           (date.getMonth() < 9? ("0" + (date.getMonth()+1)): (date.getMonth()+1).toString()) + "-" +
           (date.getDate() < 10? ("0" + date.getDate()): date.getDate().toString());
  }

  addHistory () {
    console.log("NOT YET IMPLEMENTED!");
  }

  changeMonth (amount: number) {
    this.monthOffset += amount;
    this.fillDates();
  }
}
