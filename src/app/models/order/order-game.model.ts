export interface OrderGame {
    id: string;
    productId: string;
    price: number;
    quantity: number;
    discount?: number;
}