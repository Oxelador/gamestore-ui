import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Genre } from '../models/genre/genre.model';
import { Observable } from 'rxjs';
import { CreateGenreRequest } from '../models/genre/genre-create-request.model';
import { UpdateGenreRequest } from '../models/genre/genre-update-request.model';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.apiUrl}/genres`);
  }

  getGenreById(id: string): Observable<Genre> {
    return this.http.get<Genre>(`${this.apiUrl}/genres/${id}`);
  }

  addGenre(genre: CreateGenreRequest): Observable<Genre> {
    return this.http.post<Genre>(`${this.apiUrl}/genres`, genre);
  }

  updateGenre(request: UpdateGenreRequest): Observable<Genre> {
    return this.http.put<Genre>(`${this.apiUrl}/genres`, request);
  }

  deleteGenre(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/genres/${id}`);
  }
}
