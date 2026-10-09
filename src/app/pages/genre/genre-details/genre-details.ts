import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { signal } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Genre } from '../../../models/genre/genre.model';
import { GenreService } from '../../../services/genre';
import { Router } from '@angular/router';

@Component({
  imports: [RouterLink],
  standalone: true,
  selector: 'app-genre-details',
  styleUrl: './genre-details.css',
  templateUrl: './genre-details.html',
})
export class GenreDetails {
  genre = signal<Genre | null>(null);

  parentGenre = signal<Genre | null>(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private genreService: GenreService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const genreId = this.route.snapshot.paramMap.get('id');

    if (!genreId) {
      this.router.navigate(['/genres']);
      return;
    }

    this.loadGenre(genreId);
  }

  private loadGenre(genreId: string) {
    this.genreService.getGenreById(genreId).subscribe({
      next: (genre) => {
        this.genre.set(genre);

        if (genre.parentGenreId) {
          this.genreService.getGenreById(genre.parentGenreId).subscribe({
            next: (parentGenre) => {
              this.parentGenre.set(parentGenre);
            },
          });
        }
      },
    });
  }

  deleteGenre(): void {
    const genreId = this.genre()?.id;

    if (!genreId) {
      this.router.navigate(['/genres']);
      return;
    }

    if (!confirm(`Delete genre "${this.genre()?.name}" ?`)) {
      return;
    }
    
    this.genreService.deleteGenre(genreId).subscribe({
      next: () => {
        this.router.navigate(['/genres']);
      },
    });
  }
}
