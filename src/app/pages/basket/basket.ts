import { Component } from '@angular/core';
import { OrderService } from '../../services/order';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { GameService } from '../../services/game';
import { CartItem } from '../../models/order/cart-item.model';
import { signal } from '@angular/core';

@Component({
  imports: [DecimalPipe],
  selector: 'app-basket',
  styleUrl: './basket.css',
  templateUrl: './basket.html',
})
export class Basket implements OnInit {
  cartItems = signal<CartItem[]>([]);

  constructor(
    private router: Router,
    private orderService: OrderService,
    private gameService: GameService,
    @Inject(PLATFORM_ID)
    private platformId: object,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.loadCart();
  }

  private loadCart(): void {
    this.orderService.getCart().subscribe({
      next: (orderItems) => {
        if (!orderItems.length) {
          this.cartItems.set([]);
          return;
        }

        const gameRequests = orderItems.map((item) => this.gameService.getGameById(item.productId));

        forkJoin(gameRequests).subscribe({
          next: (games) => {
            this.cartItems.set(
              orderItems.map((orderItem, index) => ({
                game: {
                  ...games[index],

                  imageUrl: '/images/default-game.jpeg',

                  rating: 4.5,
                },

                quantity: orderItem.quantity,
              })),
            );
          },

          error: (error) => {
            console.error('Games loading error:', error);
          },
        });
      },

      error: (error) => {
        console.error('Cart loading error:', error);
      },
    });
  }

  makeOrder(): void {
    this.router.navigate(['/order'], {
      state: {
        total: this.getTotal(),
      },
    });
  }

  increase(item: CartItem): void {
    this.orderService
      .updateOrderGameQuantity(item.game.id, { count: item.quantity + 1 })
      .subscribe({
        next: () => {
          item.quantity++;
        },
        error: (error) => {
          console.error('Error increasing item quantity:', error);
        },
      });
  }

  decrease(item: CartItem): void {
    if (item.quantity > 1) {
      this.orderService
        .updateOrderGameQuantity(item.game.id, { count: item.quantity - 1 })
        .subscribe({
          next: () => {
            item.quantity--;
          },
          error: (error) => {
            console.error('Error decreasing item quantity:', error);
          },
        });
    }
  }

  remove(item: CartItem): void {
    this.orderService.removeGameFromCart(item.game.key).subscribe({
      next: () => {
        this.cartItems.set(this.cartItems().filter((current) => current.game.id !== item.game.id));
      },
      error: (error) => {
        console.error('Error removing item from cart:', error);
      },
    });
  }

  getSubtotal(): number {
    return this.cartItems().reduce((sum, item) => sum + item.game.price * item.quantity, 0);
  }

  getTaxes(): number {
    return this.getSubtotal() * 0.2;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getTaxes();
  }
}
