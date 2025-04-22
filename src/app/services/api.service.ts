import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserMood } from '../types/mood.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly http = inject(HttpClient);
  private API_URL: string = 'http://localhost:8080/api/filmood';

  getUserMoods(username:string):Observable<UserMood[]>{
    return this.http.get<UserMood[]>(`${this.API_URL}/moods/${username}`);
  }

}
