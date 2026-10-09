import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [],
  standalone: true,
  selector: 'app-genre-details',
  styleUrl: './genre-details.css',
  templateUrl: './genre-details.html',
})
export class GenreDetails {
  genreId = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.genreId = this.route.snapshot.paramMap.get('id') ?? '';
  }
}
