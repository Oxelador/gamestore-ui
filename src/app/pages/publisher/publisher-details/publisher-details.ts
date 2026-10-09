import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Publisher } from '../../../models/publisher/publisher.model';
import { PublisherService } from '../../../services/publisher';

@Component({
  imports: [RouterLink],
  standalone: true,
  selector: 'app-publisher-details',
  styleUrl: './publisher-details.css',
  templateUrl: './publisher-details.html',
})
export class PublisherDetails {
  publisher = signal<Publisher | null>(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private publisherService: PublisherService,
    @Inject(PLATFORM_ID) private platformId: object,
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

    this.publisherService.getPublisherByCompanyName(companyName).subscribe({
      next: (publisher) => this.publisher.set(publisher),
      error: (error) => console.error(error),
    });
  }

  deletePublisher(): void {
    const publisher = this.publisher();

    if (!publisher) {
      this.router.navigate(['/publishers']);
      return;
    }

    if (!confirm(`Delete publisher "${publisher.companyName}"?`)) {
      return;
    }

    this.publisherService.deletePublisher(publisher.id).subscribe({
      next: () => this.router.navigate(['/publishers']),
      error: (error) => console.error(error),
    });
  }
}
