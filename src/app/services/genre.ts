import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Genre } from '../models/genre/genre.model';
import { Observable } from 'rxjs';
import { CreateGenreRequest } from '../models/genre/genre-create-request.model';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.apiUrl}/genres`);
  }

  addGenre(genre: CreateGenreRequest): Observable<Genre> {
    return this.http.post<Genre>(`${this.apiUrl}/genres`, genre);
  }
}
