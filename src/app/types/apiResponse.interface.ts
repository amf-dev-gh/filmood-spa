import { Movie } from "./movie.interface";

export interface ApiResponse {
  results: Movie[],
  total_pages: number,
  page: number
}