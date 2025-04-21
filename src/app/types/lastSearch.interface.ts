import { Movie } from "./movie.interface";

export interface LastSearch {
  selectedGenre: string,
  inputTitle: string,
  title: string,
  totalPages: number,
  actualPage: number,
  foundMovies: Movie[],
  notFoundMovies: boolean
}