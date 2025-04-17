export interface Movie {
  id: number,
  adult: boolean,
  original_language: string,
  release_date: string,
  original_title: string,
  overview: string,
  poster_path: string,
  title: string,
  vote_average: number
}

export interface Genre {
  id: number,
  name: string
}