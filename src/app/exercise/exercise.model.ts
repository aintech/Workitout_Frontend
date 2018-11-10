import { Round } from "./round.model";
import { Media } from "./media.model";

export class Exercise {
  id: number;
  index: number;
  name: string;
  externalLink: string;
  weight: number;
  instruction: string;
  timeout: number = 240;
  rounds: Round[] = [];
  medias: Media[] = [];

  externalSource: boolean;
}
