import { Component } from '@angular/core';
import { CommentService } from '../../../services/comment';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Game } from '../../../models/game/game.model';
import { Rating } from '../../../components/rating/rating';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CommentUiModel } from '../../../models/comment/comment-ui.model';
import { Comment } from '../../../models/comment/comment.model';
import { CommentCard } from '../../../components/comment-card/comment-card';
import { GameService } from '../../../services/game';
import { signal } from '@angular/core';
import { Publisher } from '../../../models/publisher/publisher.model';
import { Platform } from '../../../models/platform/platform.model';
import { Genre } from '../../../models/genre/genre.model';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { OrderService } from '../../../services/order';

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
  isAddingToCart = signal(false);
  cartMessage = signal<string | null>(null);
  cartMessageIsError = signal(false);
  newComment = '';
  replyToCommentId: string | null = null;
  commentAction: 'Reply' | 'Quote' | null = null;
  quotedComment = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    private commentService: CommentService,
    private orderService: OrderService,
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
    this.loadComments(key);
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

  private loadComments(key: string): void {
    this.commentService.getComments(key).subscribe({
      next: (comments) => {
        this.comments.set(comments.map((c) => this.toUiCommentModel(c)));
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  private toUiCommentModel = (comment: Comment): CommentUiModel => {
    return {
      ...comment,

      rating: 5,

      likes: 0,
      isLiked: false,

      childComments: comment.childComments.map((child) => this.toUiCommentModel(child)),
    };
  };

  getFinalPrice(): number {
    return (
      (this.game()?.price ?? 0) - ((this.game()?.price ?? 0) * (this.game()?.discount ?? 0)) / 100
    );
  }

  getTax(): number {
    return this.getFinalPrice() * 0.2;
  }

  addToCart(): void {
    const game = this.game();

    if (!game || this.isAddingToCart()) {
      return;
    }

    this.isAddingToCart.set(true);
    this.cartMessage.set(null);
    this.cartMessageIsError.set(false);

    this.orderService.addGameToCart(game.key).subscribe({
      next: () => {
        this.cartMessage.set(`${game.name} was added to your cart.`);
      },
      error: (error) => {
        console.error('Error adding game to cart:', error);
        this.cartMessage.set('Unable to add this game to your cart. Please try again.');
        this.cartMessageIsError.set(true);
        this.isAddingToCart.set(false);
      },
      complete: () => {
        this.isAddingToCart.set(false);
      },
    });
  }

  addComment(): void {
    const key = this.game()?.key;

    if (!key) {
      return;
    }

    if (!this.newComment.trim()) {
      return;
    }

    this.commentService
      .addComment(key, {
        comment: {
          body: this.newComment,
        },
        parentId: this.replyToCommentId ?? undefined,
        action: this.commentAction ?? undefined,
      })
      .subscribe({
        next: () => {
          this.replyToCommentId = null;
          this.commentAction = null;
          this.newComment = '';
          this.loadComments(key);
        },

        error: (error) => {
          console.error(error);
        },
      });
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

  onReply(comment: CommentUiModel): void {
    this.replyToCommentId = comment.id;

    this.commentAction = 'Reply';

    this.quotedComment = '';
  }

  onQuote(comment: CommentUiModel): void {
    this.replyToCommentId = comment.id;

    this.commentAction = 'Quote';

    this.quotedComment = `> ${comment.body}\n\n`;

    this.newComment = this.quotedComment;
  }

  cancelReply(): void {
    this.replyToCommentId = null;

    this.commentAction = null;

    this.quotedComment = '';

    this.newComment = '';
  }
}
