import { WorkoutSchedule } from "./workout-scheduler/workout-schedule.model";

export class CalendarDate {

  schedule: WorkoutSchedule;

  date: Date;

  dayVal: string;
  dayFullVal: string;

  color: string;
  borderColor: string;
  backColor: string;
  hoverColor: string = "red";

  disabled: boolean;
  history: boolean;
  today: boolean;

  constructor(date: Date, chosenMonth: number) {
    const currDate: Date = new Date();
    this.date = date;
    this.dayVal = date.getDate().toString();
    this.dayFullVal = (date.getDate() < 10? ("0" + date.getDate()): date.getDate().toString()) + "." +
                      (date.getMonth() < 9? ("0" + (date.getMonth()+1)): (date.getMonth()+1).toString()) + "." +
                      date.getFullYear();

    const dateStr: string = date.getFullYear().toString() +
                            (date.getMonth() < 9? ("0" + (date.getMonth()+1)): (date.getMonth()+1).toString()) +
                            (date.getDate() < 10? ("0" + date.getDate()): date.getDate().toString());

    const currDateStr: string = currDate.getFullYear().toString() +
                                (currDate.getMonth() < 9? ("0" + (currDate.getMonth()+1)): (currDate.getMonth()+1).toString()) +
                                (currDate.getDate() < 10? ("0" + currDate.getDate()): currDate.getDate().toString());

    const dateDiff: number = parseInt(dateStr) - parseInt(currDateStr);
    if (dateDiff < 0) {
      this.color = "gray";
      this.borderColor = "gray";
      this.history = true;
    } else {
      if (dateDiff == 0) {
        this.backColor = "antiquewhite";
        this.today = true;
      } else {
        //В последующих числах date.getMonth() всегда больше, либо равен передаваемому месяцу
        if (date.getMonth() != chosenMonth) {
          this.borderColor = "coral";
        }
      }
    }
    this.disabled = this.history;
  }

  setSchedule (schedule: WorkoutSchedule) {
    this.schedule = schedule;
    if (this.history) {
      this.color = "black";
      this.borderColor = "black";
    }
    this.disabled = false;
  }
}
