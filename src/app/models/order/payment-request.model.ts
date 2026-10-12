import { PaymentCardDetails } from './payment-card-details.model';

export interface PaymentRequest {
    method: string;
    model?: PaymentCardDetails;
}