import { Component, Inject } from '@angular/core';
import { DecimalPipe, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-order-payment',
  standalone: true,
  templateUrl: './order-payment.html',
  styleUrl: './order-payment.css',
  imports: [DecimalPipe],
})
export class OrderPayment {
  constructor(
    @Inject(PLATFORM_ID)
    private platformId: Object,
  ) {}

  total = 0;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const navigation = history.state;

    this.total = navigation.total ?? 0;
  }

  paymentMethods = [
    {
      imageUrl: '/images/bank.png',
      title: 'Bank',
      description: 'Pay using bank transfer. Invoice will be generated for you.',
    },

    {
      imageUrl: '/images/ibox.png',
      title: 'IBox terminal',
      description: 'Quick and secure payment via IBox terminal.',
    },

    {
      imageUrl: '/images/visa.png',
      title: 'Visa',
      description: 'Pay using your Visa card.',
    },
  ];
}
