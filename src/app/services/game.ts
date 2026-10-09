import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Game } from '../models/game/game.model';
import { environment } from '../../environments/environment';
import { GameListResponse } from '../models/game/game-list-response.model';
import { GamesQuery } from '../models/game/games-query.model';
import { Genre } from '../models/genre/genre.model';
import { Platform } from '../models/platform/platform.model';
import { Publisher } from '../models/publisher/publisher.model';
import { CreateGameRequest } from '../models/game/game-create-request.model';
import { UpdateGameRequest } from '../models/game/game-update-request.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  addGame(request: CreateGameRequest): Observable<Game> {
    return this.http.post<Game>(`${this.apiUrl}/games`, request);
  }

  getGames(query: GamesQuery): Observable<GameListResponse> {
    let params = new HttpParams();

    if (query.name) {
      params = params.set('name', query.name);
    }

    if (query.page) {
      params = params.set('page', query.page);
    }

    if (query.pageSize) {
      params = params.set('pageSize', query.pageSize);
    }

    if (query.sort) {
      params = params.set('sort', query.sort);
    }

    if (query.sortBy) {
      params = params.set('sortBy', query.sortBy);
    }

    if (query.genres?.length) {
      query.genres.forEach((id) => {
        params = params.append('genres', id);
      });
    }

    if (query.platforms?.length) {
      query.platforms.forEach((id) => {
        params = params.append('platforms', id);
      });
    }

    if (query.publishers?.length) {
      query.publishers.forEach((id) => {
        params = params.append('publishers', id);
      });
    }

    if (query.minPrice != null) {
      params = params.set('minPrice', query.minPrice);
    }

    if (query.maxPrice != null) {
      params = params.set('maxPrice', query.maxPrice);
    }

    if (query.publishDate) {
      params = params.set('publishDate', query.publishDate);
    }

    return this.http.get<GameListResponse>(`${this.apiUrl}/games`, { params });
  }

  updateGame(request: UpdateGameRequest): Observable<Game> {
    return this.http.put<Game>(`${this.apiUrl}/games`, request);
  }

  deleteGame(key: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/games/${key}`);
  }

  getGameByKey(key: string): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/games/${key}`);
  }

  getGameGenres(key: string): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.apiUrl}/games/${key}/genres`);
  }

  getGamePlatforms(key: string): Observable<Platform[]> {
    return this.http.get<Platform[]>(`${this.apiUrl}/games/${key}/platforms`);
  }

  getGamePublisher(key: string): Observable<Publisher> {
    return this.http.get<Publisher>(`${this.apiUrl}/games/${key}/publisher`);
  }
}
