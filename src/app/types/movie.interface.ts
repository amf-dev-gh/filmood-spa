export interface Movie {
  id: number,
  adult: boolean,
  original_language: string,
  release_date: string,
  original_title: string,
  overview: string,
  poster_path: string,
  title: string,
  vote_average: number,
  tagline:string,
  genres:Genre[],
  homepage:string,
  backdrop_path:string
}

export interface Genre {
  id: number,
  name: string
}

export interface Video {
  key:string,
  name:string,
  official:boolean,
  site:string,
  type:string
}

export interface Image {
  file_path:string,
  height:number,
  whidth:number
}

export interface Person {
  id:number,
  gender:number,
  known_for_department:string,
  original_name:string,
  character:string,// nombre de personaje
  profile_path:String,
  job:string
  name:string,
}