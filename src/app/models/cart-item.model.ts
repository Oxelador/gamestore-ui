import { Game } from './game/game.model';

export interface CartItem {
    game: Game;
    quantity: number;
}