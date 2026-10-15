import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { OrderGame } from '../models/order/order-game.model';
import { Order } from '../models/order/order.model';
import { PaymentMethodsResponse } from '../models/order/payment-methods-response.model';
import { PaymentRequest } from '../models/order/payment-request.model';
import { OrderHistory } from '../models/order/order-history.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addGameToCart(key: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/orders/games/${key}/buy`, {});
  }

  removeGameFromCart(key: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/orders/cart/${key}`);
  }

  getCart(): Observable<OrderGame[]> {
    return this.http.get<OrderGame[]>(`${this.apiUrl}/orders/cart`);
  }

  getPaidOrder(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders`);
  }

  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/orders/${id}`);
  }

  getOrderDetails(id: string): Observable<OrderGame[]> {
    return this.http.get<OrderGame[]>(`${this.apiUrl}/orders/${id}/details`);
  }

  getPaymentMethods(): Observable<PaymentMethodsResponse> {
    return this.http.get<PaymentMethodsResponse>(`${this.apiUrl}/orders/payment-methods`);
  }

  processPayment(request: PaymentRequest) {
    return this.http.post(`${this.apiUrl}/orders/payment`, request, {
      responseType: 'blob',
      observe: 'response',
    });
  }

  getOrderHistory(): Observable<OrderHistory[]> {
    return this.http.get<OrderHistory[]>(`${this.apiUrl}/orders/history`);
  }

  updateOrderGameQuantity(id: string, { count }: { count: number }): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/orders/details/${id}/quantity`, {
      quantity: count,
    });
  }

  deleteOrderDetail(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/orders/details/${id}`);
  }

  shipOrder(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/orders/${id}/ship`, {});
  }

  addGameToOrder(id: string, key: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/orders/${id}/details/${key}`, {});
  }
}
