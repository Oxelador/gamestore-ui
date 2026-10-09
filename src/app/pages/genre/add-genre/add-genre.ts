import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GenreService } from '../../../services/genre';
import { Router } from '@angular/router';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CreateGenreRequest } from '../../../models/genre/genre-create-request.model';
import { Genre } from '../../../models/genre/genre.model';
import { signal } from '@angular/core';

@Component({
  imports: [FormsModule],
  standalone: true,
  selector: 'app-add-genre',
  styleUrl: '../genre-form.css',
  templateUrl: './add-genre.html',
})
export class AddGenre {
  newGenre: Partial<Genre> = {
    name: '',
    parentGenreId: '',
  };
  genres = signal<Genre[]>([]);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private genreService: GenreService,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

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
    const request: CreateGenreRequest = {
      genre: {
        name: this.newGenre.name ?? '',

        parentGenreId: this.newGenre.parentGenreId || undefined,
      },
    };

    this.genreService.addGenre(request).subscribe({
      next: () => {
        this.router.navigate(['/genres']);
      },

      error: (error) => {
        console.error(error);
      },
    });
  }
}
