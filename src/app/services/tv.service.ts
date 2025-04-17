import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TvService {

  // # Obtenga una lista de series ordenadas por popularidad.
  // # https://api.themoviedb.org/3/tv/popular?language=es-ES&page=1

  // # Obtenga las imágenes que pertenecen a una serie.
  // # https://api.themoviedb.org/3/tv/series_id/images

  // # Obtenga los videos que pertenecen a una serie.
  // # "https://api.themoviedb.org/3/tv/series_id/videos?language=es-ES

  private API_URL: string = 'https://api.themoviedb.org/3/tv';
  private LANGUAGE: string = '';

}
