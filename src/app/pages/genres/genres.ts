import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GenreService } from '../../services/genre';
import { Genre } from '../../models/genre/genre.model';
import { signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  imports: [RouterLink],
  standalone: true,
  selector: 'app-genres',
  styleUrl: './genres.css',
  templateUrl: './genres.html',
})
export class Genres {
  genres = signal<Genre[]>([]);

  constructor(
    private genreService: GenreService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.loadGenres();
  }

  loadGenres(): void {
    this.genreService.getGenres().subscribe((data) => {
      this.genres.set(data);
    });
  }
}
