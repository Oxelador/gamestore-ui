import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Game } from '../../models/game/game.model';
import { Rating } from '../../components/rating/rating';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CommentUiModel } from '../../models/comment-ui.model';
import { CommentCard } from '../../components/comment-card/comment-card';
import { GameService } from '../../services/game';
import { signal } from '@angular/core';
import { Publisher } from '../../models/publisher/publisher.model';
import { Platform } from '../../models/platform/platform.model';
import { Genre } from '../../models/genre/genre.model';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  imports: [Rating, DecimalPipe, RouterLink, CommentCard, FormsModule],
  standalone: true,
  selector: 'app-game-details',
  styleUrl: './game-details.css',
  templateUrl: './game-details.html',
})
export class GameDetails {
  game = signal<Game | null>(null);
  genres = signal<Genre[]>([]);
  platforms = signal<Platform[]>([]);
  publisher = signal<Publisher | null>(null);
  comments = signal<CommentUiModel[]>([]);
  newComment = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const key = this.route.snapshot.paramMap.get('key');

    if (!key) {
      return;
    }

    this.loadGame(key);
    this.loadGenres(key);
    this.loadPlatforms(key);
    this.loadPublisher(key);
  }

  private loadGame(key: string): void {
    this.gameService.getGameByKey(key).subscribe({
      next: (game) => {
        this.game.set({
          ...game,
          rating: 3.5,
          userRating: 0,
          imageUrl: '/images/default-game.jpeg',
        });
      },
    });
  }

  deleteGame(): void {
    const game = this.game();

    if (!game) {
      return;
    }

    const confirmed = confirm(`Delete "${game.name}"?`);

    if (!confirmed) {
      return;
    }

    this.gameService.deleteGame(game.key).subscribe({
      next: () => {
        this.router.navigate(['/games']);
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  private loadGenres(key: string): void {
    this.gameService.getGameGenres(key).subscribe({
      next: (genres) => this.genres.set(genres),
    });
  }

  private loadPlatforms(key: string): void {
    this.gameService.getGamePlatforms(key).subscribe({
      next: (platforms) => this.platforms.set(platforms),
    });
  }

  private loadPublisher(key: string): void {
    this.gameService.getGamePublisher(key).subscribe({
      next: (publisher) => this.publisher.set(publisher),
    });
  }

  getFinalPrice(): number {
    return (
      (this.game()?.price ?? 0) - ((this.game()?.price ?? 0) * (this.game()?.discount ?? 0)) / 100
    );
  }

  getTax(): number {
    return this.getFinalPrice() * 0.2;
  }

  addComment(): void {
    if (!this.newComment.trim()) {
      return;
    }

    this.comments.update((comments) => [
      ...comments,
      {
        id: crypto.randomUUID(),
        name: 'Current User',
        body: this.newComment,
        childComments: [],
        rating: 5,
        likes: 0,
      },
    ]);

    this.newComment = '';
  }

  updateUserRating(rating: number): void {
    this.game.update((game) => {
      if (!game) {
        return null;
      }

      return {
        ...game,
        userRating: rating,
      };
    });
  }
}
