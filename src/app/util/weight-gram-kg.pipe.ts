import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'weightGramKg' })
export class WeightGramKgPipe implements PipeTransform {
  transform(value: number): string {
    return ("" + Math.round(value / 1000)) + " Kg";
  }
}
