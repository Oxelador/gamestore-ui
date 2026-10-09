import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';

import { GenreService } from '../../../services/genre';
import { UpdateGenreRequest } from '../../../models/genre/genre-update-request.model';
import { Genre } from '../../../models/genre/genre.model';

@Component({
  selector: 'app-edit-genre',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-genre.html',
  styleUrl: '../genre-form.css',
})
export class EditGenre {
  genreId = '';
  editGenre: Partial<Genre> = {
    name: '',
    parentGenreId: '',
  };
  genres = signal<Genre[]>([]);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private route: ActivatedRoute,
    private router: Router,
    private genreService: GenreService,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/genres']);
      return;
    }

    this.genreId = id;

    this.loadGenre(id);
    this.loadGenres();
  }

  private loadGenre(id: string): void {
    this.genreService.getGenreById(id).subscribe({
      next: (genre) => {
        this.editGenre = {
          name: genre.name,
          parentGenreId: genre.parentGenreId ?? '',
        };
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  private loadGenres(): void {
    this.genreService.getGenres().subscribe({
      next: (genres) => {
        this.genres.set(genres);
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  saveGenre(): void {
    const request: UpdateGenreRequest = {
      genre: {
        id: this.genreId,
        name: this.editGenre.name || '',
        parentGenreId: this.editGenre.parentGenreId || undefined,
      },
    };

    this.genreService.updateGenre(request).subscribe({
      next: () => {
        this.router.navigate(['/genres', this.genreId]);
      },

      error: (error) => {
        console.error(error);
      },
    });
  }
}
