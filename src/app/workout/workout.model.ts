import { Exercise } from "../exercise/exercise.model";

export class Workout {
  id: number;
  name: string;
  exercises: Exercise[] = [];
}
