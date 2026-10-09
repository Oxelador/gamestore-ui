import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Publisher } from '../../../models/publisher/publisher.model';
import { UpdatePublisherRequest } from '../../../models/publisher/publisher-update-request.model';
import { PublisherService } from '../../../services/publisher';

@Component({
  imports: [FormsModule],
  standalone: true,
  selector: 'app-edit-publisher',
  styleUrl: '../add-publisher/add-publisher.css',
  templateUrl: './edit-publisher.html',
})
export class EditPublisher {
  publisherId = '';
  editPublisher: Partial<Publisher> = {
    companyName: '',
    homePage: '',
    description: '',
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private route: ActivatedRoute,
    private router: Router,
    private publisherService: PublisherService,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const companyName = this.route.snapshot.paramMap.get('companyName');

    if (!companyName) {
      this.router.navigate(['/publishers']);
      return;
    }

    this.loadPublisher(companyName);
  }

  private loadPublisher(companyName: string): void {
    this.publisherService.getPublisherByCompanyName(companyName).subscribe({
      next: (publisher) => {
        this.publisherId = publisher.id;
        this.editPublisher = {
          companyName: publisher.companyName,
          homePage: publisher.homePage ?? '',
          description: publisher.description ?? '',
        };
      },
      error: (error) => console.error(error),
    });
  }

  savePublisher(): void {
    const request: UpdatePublisherRequest = {
      publisher: {
        id: this.publisherId,
        companyName: this.editPublisher.companyName ?? '',
        homePage: this.editPublisher.homePage || undefined,
        description: this.editPublisher.description || undefined,
      },
    };

    this.publisherService.editPublisher(request).subscribe({
      next: () => this.router.navigate(['/publishers', this.editPublisher.companyName]),
      error: (error) => console.error(error),
    });
  }
}
