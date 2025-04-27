import { Genre, Movie, MovieDTO } from "./movie.interface";

export interface Mood {
  src: string,
  value: string,
  genre: Genre
}

export interface UserMood {
  id: number,
  movies: MovieDTO[],
  name: string,
  private: boolean
}