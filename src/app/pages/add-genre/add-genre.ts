import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GenreService } from '../../services/genre';
import { Router } from '@angular/router';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CreateGenreRequest } from '../../models/genre/genre-create-request.model';
import { Genre } from '../../models/genre/genre.model';

@Component({
  imports: [FormsModule],
  standalone: true,
  selector: 'app-add-genre',
  styleUrl: './add-genre.css',
  templateUrl: './add-genre.html',
})
export class AddGenre {
  newGenre: Partial<Genre> = {
    name: '',
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private genreService: GenreService,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
  }

  saveGenre(): void {
    const request: CreateGenreRequest = {
      genre: {
        name: this.newGenre.name ?? '',
      }
    };

    this.genreService.addGenre(request).subscribe({
      next: (response) => {
        this.router.navigate(['/genres']);
      },

      error: (error) => {
        console.error(error);
      },
    });
  }
}
