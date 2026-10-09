import { Component } from '@angular/core';
import { CartItem } from '../../models/cart-item.model';
import { DecimalPipe } from '@angular/common';

@Component({
  imports: [DecimalPipe],
  selector: 'app-basket',
  styleUrl: './basket.css',
  templateUrl: './basket.html',
})
export class Basket {
  cartItems: CartItem[] = [
    {
      game: {
        id: '1',
        name: 'Cyberpunk 2077',
        key: 'cyberpunk-2077',
        price: 59.99,
        discount: 10,
        unitInStock: 5,
        rating: 4.8,
        imageUrl: '/images/cyberpunk.jpg',
      },
      quantity: 1,
    },
    {
      game: {
        id: '2',
        name: 'Minecraft',
        key: 'minecraft',
        price: 29.99,
        discount: 5,
        unitInStock: 10,
        rating: 4.5,
        imageUrl: '/images/minecraft.jpg',
      },
      quantity: 2,
    },
  ];

  increase(item: CartItem): void {
    item.quantity++;
  }

  decrease(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  remove(item: CartItem): void {
    this.cartItems = this.cartItems.filter((current) => current.game.id !== item.game.id);
  }

  getSubtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.game.price * item.quantity, 0);
  }

  getTaxes(): number {
    return this.getSubtotal() * 0.2;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getTaxes();
  }
}
