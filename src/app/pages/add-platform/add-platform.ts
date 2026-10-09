import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { PlatformService } from '../../services/platform';
import { CreatePlatformRequest } from '../../models/platform/platform-create-request.model';
import { Platform } from '../../models/platform/platform.model';

@Component({
  imports: [FormsModule],
  standalone: true,
  selector: 'app-add-platform',
  styleUrl: './add-platform.css',
  templateUrl: './add-platform.html',
})
export class AddPlatform {
  newPlatform: Partial<Platform> = {
    type: '',
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private platformService: PlatformService,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
  }

  savePlatform(): void {
    const request: CreatePlatformRequest = {
      platform: {
        type: this.newPlatform.type ?? '',
      },
    };

    this.platformService.addPlatform(request).subscribe({
      next: (response) => {
        this.router.navigate(['/platforms']);
      },

      error: (error) => {
        console.error(error);
      },
    });
  }
}
