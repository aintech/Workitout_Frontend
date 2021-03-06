import { Round } from './round.model';
import { Media } from './media.model';
import { SafeResourceUrl } from '@angular/platform-browser';

export class Exercise {
  id: number;
  index: number;
  name: string;
  type: string;
  muscleGroup: string[] = [];
  externalLink: string;
  weight: number;
  instruction: string;
  timeout: number = 240;
  rounds: Round[] = [];
  medias: Media[] = [];

  externalSource: boolean;
  safeLink: SafeResourceUrl;
}
