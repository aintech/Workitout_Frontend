import { Component, OnInit } from '@angular/core';
import { CalendarDate } from './CalendarDate.model';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {

  dates: CalendarDate[][];

  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  monthYear: string;

  constructor() { }

  ngOnInit() {
    const currDate: Date = new Date();
    this.monthYear = this.months[currDate.getMonth()] + " of " + currDate.getFullYear();
    const firstDay: Date = new Date(currDate.getFullYear(), currDate.getMonth(), 1);
    const lastDay: Date = new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0)
    let starting: number =  7 + firstDay.getDay() - 1;
    let ending: number = 7 + lastDay.getDate() - 1;

    let beginingDate: Date = new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() - starting);

    this.dates = [];
    let index:number = 0;
    for (let i:number = 0; i < 6; i++) {
      this.dates[i] = [];
      for (let j: number = 0; j < 7; j++) {
        this.dates[i].push(new CalendarDate(new Date(beginingDate.getFullYear(), beginingDate.getMonth(), beginingDate.getDate() + index)));
        index++;
      }
    }
  }

  onCalendarClick () {
    console.log("click");
  }
}
