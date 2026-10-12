import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Game } from '../../../models/game/game.model';
import { OrderGame } from '../../../models/order/order-game.model';
import { GameService } from '../../../services/game';
import { OrderService } from '../../../services/order';

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink],
  selector: 'app-update-order',
  styleUrl: './update-order.css',
  templateUrl: './update-order.html',
})
export class UpdateOrder {
  readonly orderDetails = signal<OrderGame[]>([]);
  readonly games = signal<Game[]>([]);
  readonly isLoading = signal(true);
  readonly isSubmitting = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly gameLoadError = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  orderId = '';
  selectedGameKey = '';
  editingOrderGameId: string | null = null;
  editingQuantity: number | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly orderService: OrderService,
    private readonly gameService: GameService,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const orderId = this.route.snapshot.paramMap.get('id');

    if (!orderId) {
      this.router.navigate(['/orders']);
      return;
    }

    this.orderId = orderId;
    this.loadOrderDetails();
    this.loadGames();
  }

  addGame(): void {
    if (!this.selectedGameKey) {
      this.errorMessage.set('Select a game before adding it to the order.');
      return;
    }

    this.runAction(
      this.orderService.addGameToOrder(this.orderId, this.selectedGameKey),
      'Game added to the order.',
      () => {
        this.selectedGameKey = '';
        this.loadOrderDetails();
      },
    );
  }

  shipOrder(): void {
    this.runAction(this.orderService.shipOrder(this.orderId), 'Order shipped.');
  }

  startUpdating(orderGame: OrderGame): void {
    this.editingOrderGameId = orderGame.id;
    this.editingQuantity = orderGame.quantity;
  }

  cancelUpdating(): void {
    this.editingOrderGameId = null;
    this.editingQuantity = null;
  }

  saveQuantity(orderGame: OrderGame): void {
    if (!this.isValidQuantity()) {
      this.errorMessage.set('Quantity must be a whole number greater than zero.');
      return;
    }

    const count = Number(this.editingQuantity);

    this.runAction(
      this.orderService.updateOrderGameQuantity(orderGame.id, { count }),
      'Quantity updated.',
      () => {
        this.cancelUpdating();
        this.loadOrderDetails();
      },
    );
  }

  deleteGame(orderGame: OrderGame): void {
    this.runAction(
      this.orderService.deleteOrderDetail(orderGame.id),
      'Game removed from the order.',
      () => this.loadOrderDetails(),
    );
  }

  private loadOrderDetails(): void {
    this.errorMessage.set(null);
    this.orderService.getOrderDetails(this.orderId).subscribe({
      next: (orderDetails) => {
        this.orderDetails.set(orderDetails);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Unable to load order details. Please try again later.');
        this.isLoading.set(false);
      },
    });
  }

  private loadGames(): void {
    this.gameLoadError.set(null);
    this.gameService.getGames({ pageSize: 'all' }).subscribe({
      next: (response) => this.games.set(response.games),
      error: () => {
        this.gameLoadError.set('Unable to load the available games.');
      },
    });
  }

  getGameName(productId: string): string {
    return this.getGameByProductId(productId)?.name ?? productId;
  }

  isValidQuantity(): boolean {
    return Number.isInteger(this.editingQuantity) && this.editingQuantity! > 0;
  }

  private getGameByProductId(productId: string): Game | undefined {
    return this.games().find((game) => game.id === productId);
  }

  private runAction(
    action: ReturnType<OrderService['shipOrder']>,
    successMessage: string,
    onSuccess?: () => void,
  ): void {
    this.errorMessage.set(null);
    this.successMessage.set(null);
    this.isSubmitting.set(true);

    action.subscribe({
      next: () => {
        this.successMessage.set(successMessage);
        this.isSubmitting.set(false);
        onSuccess?.();
      },
      error: () => {
        this.errorMessage.set('Unable to complete the action. Please try again later.');
        this.isSubmitting.set(false);
      },
    });
  }
}
