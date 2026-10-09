import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Publisher } from '../../models/publisher/publisher.model';
import { PublisherService } from '../../services/publisher';
import { CreatePublisherRequest } from '../../models/publisher/publisher-create-request.model';

@Component({
  imports: [FormsModule],
  standalone: true,
  selector: 'app-add-publisher',
  styleUrl: './add-publisher.css',
  templateUrl: './add-publisher.html',
})
export class AddPublisher {
  newPublisher: Partial<Publisher> = {
    companyName: '',
    homePage: '',
    description: '',
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private publisherService: PublisherService,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
  }

  savePublisher(): void {
    const request: CreatePublisherRequest = {
      publisher: {
        companyName: this.newPublisher.companyName ?? '',
      },
    };

    this.publisherService.addPublisher(request).subscribe({
      next: (response) => {
        this.router.navigate(['/publishers']);
      },

      error: (error) => {
        console.error(error);
      },
    });
  }
}
