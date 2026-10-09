import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '../../../models/platform/platform.model';
import { UpdatePlatformRequest } from '../../../models/platform/platform-update-request.model';
import { PlatformService } from '../../../services/platform';

@Component({
  imports: [FormsModule],
  standalone: true,
  selector: 'app-edit-platform',
  styleUrl: '../add-platform/add-platform.css',
  templateUrl: './edit-platform.html',
})
export class EditPlatform {
  platformId = '';
  editPlatform: Partial<Platform> = {
    type: '',
  };

  constructor(
    @Inject(PLATFORM_ID) private browserPlatformId: object,
    private route: ActivatedRoute,
    private router: Router,
    private platformService: PlatformService,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.browserPlatformId)) {
      return;
    }

    const platformId = this.route.snapshot.paramMap.get('id');

    if (!platformId) {
      this.router.navigate(['/platforms']);
      return;
    }

    this.platformId = platformId;
    this.loadPlatform(platformId);
  }

  private loadPlatform(id: string): void {
    this.platformService.getPlatform(id).subscribe({
      next: (platform) => {
        this.editPlatform = {
          type: platform.type,
        };
      },
      error: (error) => console.error(error),
    });
  }

  savePlatform(): void {
    const request: UpdatePlatformRequest = {
      platform: {
        id: this.platformId,
        type: this.editPlatform.type ?? '',
      },
    };

    this.platformService.editPlatform(request).subscribe({
      next: () => this.router.navigate(['/platforms', this.platformId]),
      error: (error) => console.error(error),
    });
  }
}
