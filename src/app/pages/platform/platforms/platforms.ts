import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { PlatformService } from '../../../services/platform';
import { Platform } from '../../../models/platform/platform.model';

@Component({
  imports: [RouterLink],
  standalone: true,
  selector: 'app-platforms',
  styleUrl: './platforms.css',
  templateUrl: './platforms.html',
})
export class Platforms {
  platforms = signal<Platform[]>([]);

  constructor(
    private platformService: PlatformService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.loadPlatforms();
  }

  loadPlatforms(): void {
    this.platformService.getPlatforms().subscribe((data) => {
      this.platforms.set(data);
    });
  }
}
