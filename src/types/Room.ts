import { Category } from "./Categories";
import { MaximumPoints } from "./MaximumPoints";

export interface CreateRoom {
  name: string;
  category: Category;
  maximumNumberOfPlayers: number;
  maximumPoints: MaximumPoints;
}
