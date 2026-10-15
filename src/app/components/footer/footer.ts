import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-footer',
  styleUrl: './footer.css',
  templateUrl: './footer.html',
})
export class Footer {
  currentUser: any;

  constructor(private authService: AuthService) {
    this.currentUser = this.authService.currentUser;
  }

  logout(): void {
    this.authService.logout();
  }
}
