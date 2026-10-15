import { Component, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Inject, PLATFORM_ID } from '@angular/core';
import { OrderService } from '../../../services/order';
import { PaymentMethod } from '../../../models/order/payment-method.model';
import { PaymentRequest } from '../../../models/order/payment-request.model';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [DecimalPipe, FormsModule],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order implements OnInit {
  total = 0;
  selectedMethod = '';
  showVisaForm = false;
  paymentMethods = signal<PaymentMethod[]>([]);

  visaForm = {
    holder: '',
    cardNumber: '',
    monthExpire: new Date().getMonth() + 1,
    yearExpire: new Date().getFullYear(),
    cvv2: '',
  };

  constructor(
    private orderService: OrderService,
    @Inject(PLATFORM_ID)
    private platformId: object,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.total = history.state.total ?? 0;

    this.loadPaymentMethods();
  }

  private loadPaymentMethods(): void {
    this.orderService.getPaymentMethods().subscribe({
      next: (response) => {
        this.paymentMethods.set(response.paymentMethods);
      },

      error: (error) => {
        console.error(error);
      },
    });
  }

  selectPaymentMethod(method: PaymentMethod): void {
    this.selectedMethod = method.title;

    this.showVisaForm = method.title === 'Visa';

    if (!this.showVisaForm) {
      this.processPayment();
    }
  }

  processPayment(): void {
    const request: PaymentRequest = {
      method: this.selectedMethod,

      model:
        this.selectedMethod === 'Visa'
          ? {
              holder: this.visaForm.holder,

              cardNumber: this.visaForm.cardNumber,

              monthExpire: Number(this.visaForm.monthExpire),

              yearExpire: Number(this.visaForm.yearExpire),

              cvv2: Number(this.visaForm.cvv2),
            }
          : undefined,
    };

    this.orderService.processPayment(request).subscribe({
      next: (response) => {
        const contentType = response.headers.get('content-type');

        if (contentType?.includes('application/pdf')) {
          const blob = response.body!;

          const url = window.URL.createObjectURL(blob);

          window.open(url, '_blank');

          return;
        }

        alert('Payment successful');
      },

      error: (error) => {
        console.error(error);
      },
    });
  }
}
