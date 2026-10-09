import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { GameService } from '../../../services/game';

import { Game } from '../../../models/game/game.model';
import { Genre } from '../../../models/genre/genre.model';
import { Platform } from '../../../models/platform/platform.model';
import { Publisher } from '../../../models/publisher/publisher.model';
import { GenreService } from '../../../services/genre';
import { PlatformService } from '../../../services/platform';
import { PublisherService } from '../../../services/publisher';
import { UpdateGameRequest } from '../../../models/game/game-update-request.model';

@Component({
  selector: 'app-edit-game',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-game.html',
  styleUrl: './edit-game.css',
})
export class EditGame {
  gameId = '';

  genres = signal<Genre[]>([]);
  platforms = signal<Platform[]>([]);
  publishers = signal<Publisher[]>([]);

  selectedGenres = signal<string[]>([]);
  selectedPlatforms = signal<string[]>([]);

  selectedPublisher = '';

  editGame: Partial<Game> = {
    key: '',
    name: '',
    description: '',
    price: 0,
    discount: 0,
    unitInStock: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    private genreService: GenreService,
    private platformService: PlatformService,
    private publisherService: PublisherService,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const key = this.route.snapshot.paramMap.get('key');

    if (!key) {
      this.router.navigate(['/games']);
      return;
    }

    this.loadGame(key);
    this.loadGenres(key);
    this.loadPlatforms(key);
    this.loadPublisher(key);

    this.loadAvailableGenres();
    this.loadAvailablePlatforms();
    this.loadAvailablePublishers();
  }

  private loadGame(key: string): void {
    this.gameService.getGameByKey(key).subscribe({
      next: (game) => {
        this.gameId = game.id;

        this.editGame = {
          id: game.id,
          key: game.key,
          name: game.name,
          description: game.description,
          price: game.price,
          discount: game.discount,
          unitInStock: game.unitInStock,
        };
      },
    });
  }

  private loadGenres(key: string): void {
    this.gameService.getGameGenres(key).subscribe({
      next: (genres) => {
        this.selectedGenres.set(genres.map((g) => g.id));
      },
    });
  }

  private loadPlatforms(key: string): void {
    this.gameService.getGamePlatforms(key).subscribe({
      next: (platforms) => {
        this.selectedPlatforms.set(platforms.map((p) => p.id));
      },
    });
  }

  private loadPublisher(key: string): void {
    this.gameService.getGamePublisher(key).subscribe({
      next: (publisher) => {
        this.selectedPublisher = publisher.id;
      },
    });
  }

  private loadAvailableGenres(): void {
    this.genreService.getGenres().subscribe({
      next: (genres) => this.genres.set(genres),
    });
  }

  private loadAvailablePlatforms(): void {
    this.platformService.getPlatforms().subscribe({
      next: (platforms) => this.platforms.set(platforms),
    });
  }

  private loadAvailablePublishers(): void {
    this.publisherService.getPublishers().subscribe({
      next: (publishers) => this.publishers.set(publishers),
    });
  }

  toggleGenre(id: string): void {
    const selected = this.selectedGenres();

    if (selected.includes(id)) {
      this.selectedGenres.set(selected.filter((x) => x !== id));
    } else {
      this.selectedGenres.set([...selected, id]);
    }
  }

  togglePlatform(id: string): void {
    const selected = this.selectedPlatforms();

    if (selected.includes(id)) {
      this.selectedPlatforms.set(selected.filter((x) => x !== id));
    } else {
      this.selectedPlatforms.set([...selected, id]);
    }
  }

  saveChanges(): void {
    const request: UpdateGameRequest = {
      game: {
        id: this.gameId,
        name: this.editGame.name ?? '',
        key: this.editGame.key ?? '',
        description: this.editGame.description ?? '',
        price: this.editGame.price ?? 0,
        unitInStock: this.editGame.unitInStock ?? 0,
        discount: this.editGame.discount ?? 0,
      },

      genres: this.selectedGenres(),

      platforms: this.selectedPlatforms(),

      publisher: this.selectedPublisher || undefined,
    };

    this.gameService.updateGame(request).subscribe({
      next: () => {
        this.router.navigate(['/games', this.editGame.key]);
      },

      error: (error) => {
        console.error(error);
      },
    });
  }
}
