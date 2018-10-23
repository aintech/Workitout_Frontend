export class CalendarDate {

  date: Date;

  dayVal: string;

  constructor(date: Date) {
    this.date = date;
    this.dayVal = date.getDate().toString();
  }
}
