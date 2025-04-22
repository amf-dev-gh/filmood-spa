import { Movie, Person } from "./movie.interface";

export interface TMDBResponse {
  results: Movie[],
  total_pages: number,
  page: number
}

export interface CreditsResponse {
  cast: Person[],
  crew: Person[]
}