import { Category } from "./Categories";
import { MaximumPoints } from "./MaximumPoints";
import { Player } from "./Player";

export interface CreateRoom {
  name: string;
  category: Category;
  maximumNumberOfPlayers: number;
  maximumPoints: MaximumPoints;
}

export interface Room {
  id: string;
  name: string;
  category: Category;
  maximumNumberOfPlayers: number;
  maximumPoints: MaximumPoints;
  players: Player[];
  currentWord?: string;
  currentRound?: number;
}
