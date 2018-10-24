export class CalendarDate {

  date: Date;

  dayVal: string;

  color: string;
  borderColor: string;
  backColor: string;
  hoverColor: string = "red";

  constructor(date: Date, currDate: Date) {
    this.date = date;
    this.dayVal = date.getDate().toString();
    
    const dateStr: string = "" + date.getFullYear() +
                            "" + (date.getMonth() < 10? ("0" + date.getMonth()): ("" + date.getMonth())) +
                            "" + (date.getDate() < 10? ("0" + date.getDate()): ("" + date.getDate()));

    const currDateStr: string = "" + currDate.getFullYear() +
                                "" + (currDate.getMonth() < 10? ("0" + currDate.getMonth()): ("" + currDate.getMonth())) +
                                "" + (currDate.getDate() < 10? ("0" + currDate.getDate()): ("" + currDate.getDate()));

    const dateDiff: number = parseInt(dateStr) - parseInt(currDateStr);

    if (dateDiff < 0) {
      this.color = "black";
      this.borderColor = "black";
    } else {
      if (dateDiff == 0) {
        this.backColor = "antiquewhite";
      } else {
        //Если следующий месяц. date.getMonth() на этоп этапе всегда больше, либо равен currDate.getMonth()
        if (date.getMonth() != currDate.getMonth()) {
          this.borderColor = "coral";
        }
      }
    }
  }
}
