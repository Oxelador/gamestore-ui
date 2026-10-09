import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [],
  standalone: true,
  selector: 'app-publisher-details',
  styleUrl: './publisher-details.css',
  templateUrl: './publisher-details.html',
})
export class PublisherDetails {
  publisherId = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.publisherId = this.route.snapshot.paramMap.get('id') ?? '';
  }
}
