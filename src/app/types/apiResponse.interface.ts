import { Movie, Person } from "./movie.interface";

export interface ApiResponse {
  results: Movie[],
  total_pages: number,
  page: number
}

export interface CreditsResponse {
  cast: Person[],
  crew: Person[]
}