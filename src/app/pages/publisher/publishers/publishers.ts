import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { PublisherService } from '../../../services/publisher';
import { Publisher } from '../../../models/publisher/publisher.model';

@Component({
  imports: [RouterLink],
  standalone: true,
  selector: 'app-publishers',
  styleUrl: './publishers.css',
  templateUrl: './publishers.html',
})
export class Publishers {
  publishers = signal<Publisher[]>([]);

  constructor(
    private publisherService: PublisherService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.loadPublishers();
  }

  loadPublishers(): void {
    this.publisherService.getPublishers().subscribe((data) => {
      this.publishers.set(data);
    });
  }
}
