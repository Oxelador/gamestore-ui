import { Component, input } from '@angular/core';
import { Game } from '../../models/game/game.model';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  standalone: true,
  selector: 'app-game-card',
  styleUrl: './game-card.css',
  templateUrl: './game-card.html',
})
export class GameCard {
  game = input.required<Game>();
}
