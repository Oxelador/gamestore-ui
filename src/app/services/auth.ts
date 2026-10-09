import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoginResponse } from '../models/auth/login-response.model';
import { signal } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;

  currentUser = signal<any>(this.loadUser());

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID)
    private platformId: object,
  ) {}

  login(login: string, password: string) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/users/login`, {
      model: {
        login,
        password,
        internalAuth: true,
      },
    });
  }

  private loadUser() {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const user = localStorage.getItem('currentUser');

    return user ? JSON.parse(user) : null;
  }

  storeUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));

    this.currentUser.set(user);
  }

  getCurrentUser() {
    return this.currentUser();
  }

  storeToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    return localStorage.getItem('jwtToken');
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('jwtToken');

      localStorage.removeItem('currentUser');
    }

    this.currentUser.set(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
