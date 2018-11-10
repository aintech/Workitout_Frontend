import { PipeTransform, Pipe } from "@angular/core";

@Pipe({ name: 'numberTime' })
export class NumberTimePipe implements PipeTransform {

  transform(value: number): string {
    let seconds: number = Math.round(value % 60);
    let minutes: number = Math.floor(value / 60);

    return (minutes < 10? "0": "") + minutes + ":" + (seconds < 10? "0": "") + seconds;
  }
}
