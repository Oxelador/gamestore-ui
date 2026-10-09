import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreatePlatformRequest } from '../models/platform/platform-create-request.model';
import { Platform } from '../models/platform/platform.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPlatforms(): Observable<Platform[]> {
    return this.http.get<Platform[]>(`${this.apiUrl}/platforms`);
  }

  addPlatform(request: CreatePlatformRequest): Observable<Platform> {
    return this.http.post<Platform>(`${this.apiUrl}/platforms`, request);
  }
}
