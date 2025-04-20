import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, CreditsResponse } from '../types/apiResponse.interface';
import { Genre, Movie } from '../types/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  // # Obtenga una lista de películas que están actualmente en los cines.
  // # https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=1

  // # Obtenga una lista de películas ordenadas por popularidad.
  // # https://api.themoviedb.org/3/movie/popular?language=es-ES&page=1

  // # Obtenga detalles de una pelicula específica
  // # https://api.themoviedb.org/3/movie/movie_id?language=es-ES

  // # Obtenga una lista de películas que se estrenarán pronto.
  // # https://api.themoviedb.org/3/movie/upcoming?language=es-ES&page=1

  // # Obtenga las imágenes que pertenecen a una película.
  // # https://api.themoviedb.org/3/movie/movie_id/images

  // # Obtenga los videos que pertenecen a una película.
  // # https://api.themoviedb.org/3/movie/movie_id/videos?language=es-ES

  // # Buscar peliculas por titulo
  // # https://api.themoviedb.org/3/search/movie?query=TITULO_PELICULA&language=es-ES

  // # Listado de generos de peliculas
  // # https://api.themoviedb.org/3/genre/movie/list?language=es-ES

  // # Trending de peliculas de la semana
  // # https://api.themoviedb.org/3/trending/movie/week?language=es-ES

  // # Creditos de una pelicula,(Reparto....)
  // # https://api.themoviedb.org/3/movie/{movie_id}/credits?language=es-ES

  // # Buscar peliculas por genero
  // # https://api.themoviedb.org/3/discover/movie?api_key=TU_API_KEY&with_genres=ID_DEL_GENERO&language=es-ES

  // # Proveedores de una pelicula especifica
  // # https://api.themoviedb.org/3/movie/933260/watch/providers

  private readonly http = inject(HttpClient);

  private API_URL: string = 'https://api.themoviedb.org/3';
  private LANGUAGE: string = 'language=es-ES';
  private API_URL_MOVIE: string = `${this.API_URL}/movie`;
  private API_URL_SEARCH: string = `${this.API_URL}/search/movie?`;

  getNowPlayingMovies(page: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.API_URL_MOVIE}/now_playing?${this.LANGUAGE}&page=${page}`);
  }

  getUpCommingMovies(page: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.API_URL_MOVIE}/upcoming?${this.LANGUAGE}&page=${page}`);
  }

  findMovieByTitle(title: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.API_URL_SEARCH}query=${title}&${this.LANGUAGE}`);
  }

  getDetailsMovie(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.API_URL_MOVIE}/${id}?${this.LANGUAGE}`);
  }

  getVideoList(id: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL_MOVIE}/${id}/videos?${this.LANGUAGE}`);
  }

  getImgageList(id: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL_MOVIE}/${id}/images?include_image_language=null`);
  }

  getPopularMovies(page: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.API_URL_MOVIE}/popular?${this.LANGUAGE}&page=${page}`);
  }

  getTrendingMovies(page: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.API_URL}/trending/movie/week?${this.LANGUAGE}&page=${page}`);
  }

  getGenres(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/genre/movie/list?${this.LANGUAGE}`);
  }

  getCredits(id: string): Observable<CreditsResponse> {
    return this.http.get<CreditsResponse>(`${this.API_URL_MOVIE}/${id}/credits?${this.LANGUAGE}`);
  }

  getMoviesByGenre(genreId:number): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.API_URL}/discover/movie?with_genres=${genreId}&${this.LANGUAGE}`)
  }

  getMovieProviders(id:string): Observable<any>{
    return this.http.get<any>(`${this.API_URL_MOVIE}/${id}/watch/providers`);
  }
}
