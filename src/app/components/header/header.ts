import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { signal } from '@angular/core';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  currentUser = signal<any>(null);

  constructor(private authService: AuthService) {
    this.currentUser = this.authService.currentUser;
  }

  ngOnInit(): void {
    this.currentUser.set(this.authService.getCurrentUser());
  }

  logout(): void {
    this.authService.logout();
  }
}
