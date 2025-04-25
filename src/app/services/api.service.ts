import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserMood } from '../types/mood.interface';
import { MovieDTO } from '../types/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly http = inject(HttpClient);
  private API_URL: string = 'http://localhost:8080/api/filmood/moods';

  getUserMoods(): Observable<UserMood[]> {
    return this.http.get<UserMood[]>(`${this.API_URL}/user`);
  }

  createNewMood(name: string): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/new/${name}`, {});
  }

  deleteMood(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/delete/${id}`);
  }

  addMovieToMood(moodId: number, movieDto: MovieDTO): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/addTo/${moodId}`, movieDto);
  }

  updateMood(moodId: number): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/updatePrivacity/${moodId}`, {});
  }

  deleteMovieFromMood(movieId:number, moodId:number): Observable<UserMood>{
    return this.http.delete<UserMood>(`${this.API_URL}/deleteMovie/${movieId}/${moodId}`);
  }
}
