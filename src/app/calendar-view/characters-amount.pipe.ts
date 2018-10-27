import { PipeTransform, Pipe } from "@angular/core";

@Pipe({name: 'charactersAmount'})
export class CharactersAmountPipe implements PipeTransform {

  transform(value: string, maxChars: number): string {
    if (value.length <= maxChars) {
      return value;
    }
    return value.substring(0, maxChars-1) + "...";
  }
}
