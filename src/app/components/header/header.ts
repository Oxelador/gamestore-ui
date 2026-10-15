import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  currentUser: any;

  constructor(private authService: AuthService) {
    this.currentUser = this.authService.currentUser;
  }

  logout(): void {
    this.authService.logout();
  }
}
