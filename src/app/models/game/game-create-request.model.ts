export interface CreateGameRequest {
  game: {
    key: string;
    name: string;
    price: number;
    discount: number;
    unitInStock: number;
    description?: string;
  };

  genres: string[];

  platforms: string[];

  publisher?: string;
}
