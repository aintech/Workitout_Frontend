import { Component, OnInit } from '@angular/core';
import { CalendarDate } from '../CalendarDate.model';

@Component({
  selector: 'app-workout-history',
  templateUrl: './workout-history.component.html',
  styleUrls: ['./workout-history.component.css']
})
export class WorkoutHistoryComponent implements OnInit {

  schedulerDate: CalendarDate;

  constructor() { }

  ngOnInit() {}
}
