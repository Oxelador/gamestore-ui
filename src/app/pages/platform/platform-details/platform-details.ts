import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Platform } from '../../../models/platform/platform.model';
import { PlatformService } from '../../../services/platform';

@Component({
  imports: [RouterLink],
  standalone: true,
  selector: 'app-platform-details',
  styleUrl: './platform-details.css',
  templateUrl: './platform-details.html',
})
export class PlatformDetails {
  platform = signal<Platform | null>(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private platformService: PlatformService,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const platformId = this.route.snapshot.paramMap.get('id');

    if (!platformId) {
      this.router.navigate(['/platforms']);
      return;
    }

    this.platformService.getPlatform(platformId).subscribe({
      next: (platform) => this.platform.set(platform),
      error: (error) => console.error(error),
    });
  }

  deletePlatform(): void {
    const platform = this.platform();

    if (!platform) {
      this.router.navigate(['/platforms']);
      return;
    }

    if (!confirm(`Delete platform "${platform.type}"?`)) {
      return;
    }

    this.platformService.deletePlatform(platform.id).subscribe({
      next: () => this.router.navigate(['/platforms']),
      error: (error) => console.error(error),
    });
  }
}
