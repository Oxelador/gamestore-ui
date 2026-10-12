export interface OrderHistory {
    orderId: number;
    customerId?: string;
    orderDate?: Date;
    requiredDate?: Date;
    shippedDate?: Date;
    shippedId?: number;
    freight?: number;
    shipName?: string;
    shipAddress?: string;
    shipCity?: string;
    shipRegion?: string;
    shipPostalCode?: string;
    shipCountry?: string;
    totalAmount?: number;
}