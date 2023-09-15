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
  currentPlayer?: string;
  chat: string[];
  timer: number;
}

export interface JoinRoom {
  playerId: string;
  room: Room;
}

export interface Guess {
  roomName: string;
  playerNickname: string;
  guess: string;
}

export interface SubmitGuess {
  guess: string;
}
