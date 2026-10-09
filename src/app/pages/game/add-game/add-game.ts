import { Component } from '@angular/core';
import { GameService } from '../../../services/game';
import { GenreService } from '../../../services/genre';
import { PublisherService } from '../../../services/publisher';
import { PlatformService } from '../../../services/platform';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Game } from '../../../models/game/game.model';
import { Publisher } from '../../../models/publisher/publisher.model';
import { Genre } from '../../../models/genre/genre.model';
import { Platform } from '../../../models/platform/platform.model';
import { signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateGameRequest } from '../../../models/game/game-create-request.model';

@Component({
  imports: [FormsModule],
  standalone: true,
  selector: 'app-add-game',
  styleUrl: './add-game.css',
  templateUrl: './add-game.html',
})
export class AddGame {
  genres = signal<Genre[]>([]);
  platforms = signal<Platform[]>([]);
  publishers = signal<Publisher[]>([]);
  selectedGenres = signal<string[]>([]);
  selectedPlatforms = signal<string[]>([]);
  selectedPublisher = '';
  newGame: Partial<Game> = {
    key: '',
    name: '',
    price: 0,
    discount: 0,
    unitInStock: 0,
    description: '',
  };

  constructor(
    private gameService: GameService,
    private genreService: GenreService,
    private publisherService: PublisherService,
    private platformService: PlatformService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.loadGenres();
    this.loadPlatforms();
    this.loadPublishers();
  }

  saveGame(): void {
    const request: CreateGameRequest = {
      game: {
        key: this.newGame.key ?? '',
        name: this.newGame.name ?? '',
        price: this.newGame.price ?? 0,
        discount: this.newGame.discount ?? 0,
        unitInStock: this.newGame.unitInStock ?? 0,
        description: this.newGame.description ?? '',
      },

      genres: this.selectedGenres(),

      platforms: this.selectedPlatforms(),

      publisher: this.selectedPublisher || undefined,
    };

    this.gameService.addGame(request).subscribe({
      next: (response) => {
        this.router.navigate(['/games']);
      },

      error: (error) => {
        console.error(error);
      },
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

  private loadGenres(): void {
    this.genreService.getGenres().subscribe((genres) => {
      this.genres.set(genres);
    });
  }

  private loadPlatforms(): void {
    this.platformService.getPlatforms().subscribe((platforms) => {
      this.platforms.set(platforms);
    });
  }

  private loadPublishers(): void {
    this.publisherService.getPublishers().subscribe((publishers) => {
      this.publishers.set(publishers);
    });
  }
}
