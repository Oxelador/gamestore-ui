import { DatePipe, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Order } from '../../../models/order/order.model';
import { OrderService } from '../../../services/order';

@Component({
  standalone: true,
  imports: [DatePipe, RouterLink],
  selector: 'app-orders',
  styleUrl: './orders.css',
  templateUrl: './orders.html',
})
export class Orders {
  readonly orders = signal<Order[]>([]);
  readonly isLoading = signal(true);
  readonly errorMessage = signal<string | null>(null);

  constructor(
    private readonly orderService: OrderService,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.orderService.getPaidOrder().subscribe({
      next: (orders) => {
        this.orders.set(orders);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Unable to load your orders. Please try again later.');
        this.isLoading.set(false);
      },
    });
  }
}
