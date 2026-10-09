import { Component, signal } from '@angular/core';
import { GenreService } from '../../services/genre';
import { PlatformService } from '../../services/platform';
import { PublisherService } from '../../services/publisher';
import { Game } from '../../models/game/game.model';
import { Genre } from '../../models/genre/genre.model';
import { Platform } from '../../models/platform/platform.model';
import { Publisher } from '../../models/publisher/publisher.model';
import { GameCard } from '../../components/game-card/game-card';
import { FormsModule } from '@angular/forms';
import { OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { GameService } from '../../services/game';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [GameCard, FormsModule, RouterLink, RouterLinkActive],
  standalone: true,
  selector: 'app-games',
  styleUrl: './games.css',
  templateUrl: './games.html',
})
export class Games implements OnInit {
  games = signal<Game[]>([]);
  genres = signal<Genre[]>([]);
  platforms = signal<Platform[]>([]);
  publishers = signal<Publisher[]>([]);
  selectedGenres = signal<string[]>([]);
  selectedPlatforms = signal<string[]>([]);
  selectedPublishers = signal<string[]>([]);
  totalPages = signal(1);
  currentPage = signal(1);
  pageSizeOptions = ['10', '20', '50', '100', 'all'];
  pageSize = '10';
  searchTerm = '';
  sortOption = 'New';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  publishDate: string | null = null;

  constructor(
    private gameService: GameService,
    private genreService: GenreService,
    private platformService: PlatformService,
    private publisherService: PublisherService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.loadFilters();

    this.loadGames();
  }

  loadGames(): void {
    console.log({
      page: this.currentPage(),
      pageSize: this.pageSize,
      sortBy: this.sortOption,
    });

    this.gameService
      .getGames({
        page: this.currentPage(),
        pageSize: this.pageSize,
        sortBy: this.sortOption,
        name: this.searchTerm,

        genres: this.selectedGenres(),
        platforms: this.selectedPlatforms(),
        publishers: this.selectedPublishers(),

        minPrice: this.minPrice ?? undefined,
        maxPrice: this.maxPrice ?? undefined,

        publishDate: this.publishDate ?? undefined,
      })
      .subscribe({
        next: (response) => {
          console.log('SORT:', this.sortOption);
          console.log('GAMES:', response.games);

          this.games.set(
            response.games.map((game) => ({
              ...game,
              rating: 4.5,
              imageUrl: '/images/default-game.jpeg',
            })),
          );

          this.totalPages.set(response.totalPages);
          this.currentPage.set(response.currentPage);
        },
        error: (error) => {
          console.log('Status:', error.status);
          console.log('Body:', error.error);
        },
      });
  }

  loadFilters(): void {
    this.genreService.getGenres().subscribe({
      next: (genres) => this.genres.set(genres),
    });

    this.platformService.getPlatforms().subscribe({
      next: (platforms) => this.platforms.set(platforms),
    });

    this.publisherService.getPublishers().subscribe({
      next: (publishers) => this.publishers.set(publishers),
    });
  }

  onSearchChange(): void {
    this.currentPage.set(1);

    this.loadGames();
  }

  onSortChange(): void {
    console.log('Sort changed:', this.sortOption);

    this.currentPage.set(1);

    this.loadGames();
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((x) => x + 1);

      this.loadGames();
    }
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update((x) => x - 1);

      this.loadGames();
    }
  }

  onPageSizeChange(): void {
    this.currentPage.set(1);

    this.loadGames();
  }

  toggleGenre(id: string): void {
    const selected = this.selectedGenres();

    if (selected.includes(id)) {
      this.selectedGenres.set(selected.filter((x) => x !== id));
    } else {
      this.selectedGenres.set([...selected, id]);
    }

    this.currentPage.set(1);

    this.loadGames();
  }

  togglePlatform(id: string): void {
    const selected = this.selectedPlatforms();

    if (selected.includes(id)) {
      this.selectedPlatforms.set(selected.filter((x) => x !== id));
    } else {
      this.selectedPlatforms.set([...selected, id]);
    }

    this.currentPage.set(1);

    this.loadGames();
  }

  togglePublisher(id: string): void {
    const selected = this.selectedPublishers();

    if (selected.includes(id)) {
      this.selectedPublishers.set(selected.filter((x) => x !== id));
    } else {
      this.selectedPublishers.set([...selected, id]);
    }

    this.currentPage.set(1);

    this.loadGames();
  }

  applyPriceFilter(): void {
    this.currentPage.set(1);

    this.loadGames();
  }

  clearPriceFilter(): void {
    this.minPrice = null;
    this.maxPrice = null;

    this.currentPage.set(1);

    this.loadGames();
  }

  onPublishDateChange(): void {
    this.currentPage.set(1);

    this.loadGames();
  }

  clearPublishDateFilter(): void {
    this.publishDate = '';

    this.currentPage.set(1);

    this.loadGames();
  }

  resetFilters(): void {
    this.searchTerm = '';

    this.minPrice = null;
    this.maxPrice = null;

    this.publishDate = '';

    this.selectedGenres.set([]);
    this.selectedPlatforms.set([]);
    this.selectedPublishers.set([]);

    this.currentPage.set(1);

    this.loadGames();
  }
}
