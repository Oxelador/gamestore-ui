import { Game } from './game.model';

export interface GameListResponse {
  games: Game[];
  totalPages: number;
  currentPage: number;
}