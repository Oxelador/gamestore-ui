export interface CreateGenreRequest {
  genre: {
    name: string;
    parentGenreId?: string;
  };
}
