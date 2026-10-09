export interface UpdateGenreRequest {
  genre: {
    id: string;
    name: string;
    parentGenreId?: string;
  };
}
