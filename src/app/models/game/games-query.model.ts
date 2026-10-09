export interface GamesQuery {
  genres?: string[];
  platforms?: string[];
  publishers?: string[];

  minPrice?: number;
  maxPrice?: number;

  publishDate?: string;

  name?: string;

  sort?: string;
  sortBy?: string;

  page?: number;
  pageCount?: number;
  pageSize?: string;
}