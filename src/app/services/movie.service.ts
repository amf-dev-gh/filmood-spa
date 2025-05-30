import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TMDBResponse, CreditsResponse } from '../types/tmdbResponse.interface';
import { Movie } from '../types/movie.interface';
import { LastSearch } from '../types/lastSearch.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  // # Obtenga una lista de películas que están actualmente en los cines.
  // # https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=1

  // # Obtenga una lista de películas ordenadas por popularidad.
  // # https://api.themoviedb.org/3/movie/popular?language=es-ES&page=1

  // # Obtenga detalles de una película específica
  // # https://api.themoviedb.org/3/movie/movie_id?language=es-ES

  // # Obtenga una lista de películas que se estrenarán pronto.
  // # https://api.themoviedb.org/3/movie/upcoming?language=es-ES&page=1

  // # Obtenga las imágenes que pertenecen a una película.
  // # https://api.themoviedb.org/3/movie/movie_id/images

  // # Obtenga los videos que pertenecen a una película.
  // # https://api.themoviedb.org/3/movie/movie_id/videos?language=es-ES

  // # Buscar películas por titulo
  // # https://api.themoviedb.org/3/search/movie?query=TITULO_PElícula&language=es-ES

  // # Listado de generos de películas
  // # https://api.themoviedb.org/3/genre/movie/list?language=es-ES

  // # Trending de películas de la semana
  // # https://api.themoviedb.org/3/trending/movie/week?language=es-ES

  // # Creditos de una película,(Reparto....)
  // # https://api.themoviedb.org/3/movie/{movie_id}/credits?language=es-ES

  // # Buscar películas por genero
  // # https://api.themoviedb.org/3/discover/movie?api_key=TU_API_KEY&with_genres=ID_DEL_GENERO&language=es-ES

  // # Proveedores de una película especifica
  // # https://api.themoviedb.org/3/movie/933260/watch/providers

  private readonly http = inject(HttpClient);

  private API_URL: string = 'https://api.themoviedb.org/3';
  private LANGUAGE: string = 'es-ES';
  private REGION: string = 'ES';
  private API_URL_MOVIE: string = `${this.API_URL}/movie`;
  private API_URL_SEARCH: string = `${this.API_URL}/search/movie?`;

  $lastFound = signal<LastSearch>({
    selectedGenre: '',
    inputTitle: '',
    title: '',
    totalPages: 0,
    actualPage: 1,
    foundMovies: [],
    notFoundMovies: false
  });

  getNowPlayingMovies(page: number): Observable<TMDBResponse> {
    return this.http.get<TMDBResponse>(`${this.API_URL_MOVIE}/now_playing?language=${this.LANGUAGE}&page=${page}&region=${this.REGION}`);
  }

  getUpCommingMovies(page: number): Observable<TMDBResponse> {
    return this.http.get<TMDBResponse>(`${this.API_URL_MOVIE}/upcoming?language=${this.LANGUAGE}&page=${page}&region=${this.REGION}`);
  }

  findMovieByTitle(title: string, page: number): Observable<TMDBResponse> {
    return this.http.get<TMDBResponse>(`${this.API_URL_SEARCH}query=${title}&language=${this.LANGUAGE}&page=${page}`);
  }

  getDetailsMovie(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.API_URL_MOVIE}/${id}?language=${this.LANGUAGE}`);
  }

  getVideoList(id: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL_MOVIE}/${id}/videos?language=${this.LANGUAGE}`);
  }

  getImgageList(id: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL_MOVIE}/${id}/images?include_image_language=null`);
  }

  getPopularMovies(page: number): Observable<TMDBResponse> {
    return this.http.get<TMDBResponse>(`${this.API_URL_MOVIE}/popular?language=${this.LANGUAGE}&page=${page}`);
  }

  getTrendingMovies(page: number): Observable<TMDBResponse> {
    return this.http.get<TMDBResponse>(`${this.API_URL}/trending/movie/week?language=${this.LANGUAGE}&page=${page}`);
  }

  getGenres(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/genre/movie/list?language=${this.LANGUAGE}`);
  }

  getCredits(id: string): Observable<CreditsResponse> {
    return this.http.get<CreditsResponse>(`${this.API_URL_MOVIE}/${id}/credits?language=${this.LANGUAGE}`);
  }

  getMoviesByGenre(genreId: number, page: number): Observable<TMDBResponse> {
    return this.http.get<TMDBResponse>(`${this.API_URL}/discover/movie?with_genres=${genreId}&language=${this.LANGUAGE}&page=${page}`)
  }

  getMovieProviders(id: string): Observable<any> {
    return this.http.get<any>(`${this.API_URL_MOVIE}/${id}/watch/providers`);
  }
}
