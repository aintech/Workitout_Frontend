import { Round } from "./round.model";

export class Exercise {
  id: number;
  index: number;
  name: string = "Exerc";
  weight: number;
  instruction: string;
  timeout: number = 30;
  rounds: Round[];
}
