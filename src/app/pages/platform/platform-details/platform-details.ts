import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [],
  standalone: true,
  selector: 'app-platform-details',
  styleUrl: './platform-details.css',
  templateUrl: './platform-details.html',
})
export class PlatformDetails {
  platformId = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.platformId = this.route.snapshot.paramMap.get('id') ?? '';
  }
}
