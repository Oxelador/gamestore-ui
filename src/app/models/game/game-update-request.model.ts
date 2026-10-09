export interface UpdateGameRequest {
  game: {
    id: string;
    name: string;
    key: string;
    description?: string;
    price: number;
    unitInStock: number;
    discount: number;
  };

  genres: string[];

  platforms: string[];

  publisher?: string;
}
