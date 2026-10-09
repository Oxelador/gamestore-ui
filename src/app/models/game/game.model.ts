export interface Game {
  id: string;
  name: string;
  key: string;
  price: number;
  discount: number;
  unitInStock: number;
  description?: string;

  rating?: number;
  userRating?: number;

  imageUrl?: string;
}
