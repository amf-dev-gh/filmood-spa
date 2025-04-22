import { Genre, Movie } from "./movie.interface";

export interface Mood {
  src: string,
  value: string,
  genre: Genre
}

export interface UserMood {
  id: number,
  movies: Movie[],
  name: string,
  private: boolean
}