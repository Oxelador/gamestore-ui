export interface PaymentCardDetails {
    holder: string;
    cardNumber: string;
    monthExpire: number;
    yearExpire: number;
    cvv2: number;
}