import { Component, OnInit } from '@angular/core';
import { CalendarDate } from './CalendarDate.model';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {

  dates: CalendarDate[] = [];

  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  monthYear: string;

  constructor() { }

  ngOnInit() {
    const currDate: Date = new Date();
    this.monthYear = this.months[currDate.getMonth()] + " of " + currDate.getFullYear();
    const firstDay: Date = new Date(currDate.getFullYear(), currDate.getMonth(), 1);
    const lastDay: Date = new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0)
    let staring: number =  7 + firstDay.getDay();
    let ending: number = 7 + lastDay.getDate();

    for (let i: number = 0; i < 7 * 6; i++) {
      if (i < staring) {
        this.dates.push(new CalendarDate(new Date()));
      }
      if (i >= staring && i <= ending) {
        this.dates.push(
      }
      if (i > ending) {
        this.dates.push(new CalendarDate(new Date()));
      }
    }
  }

}
