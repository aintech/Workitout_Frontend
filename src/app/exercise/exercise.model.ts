import { Round } from "./round.model";
import { Media } from "./media.model";

export class Exercise {
  id: number;
  index: number;
  name: string = "Exerc";
  externalLink: string;
  weight: number;
  instruction: string;
  timeout: number = 30;
  rounds: Round[] = [];
  medias: Media[] = [];

  externalSource: boolean;
}
