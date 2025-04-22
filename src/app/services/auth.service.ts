import { inject, Injectable, signal } from '@angular/core';
import { LoginCredentials, LoginResponse, RegisterResponse, RegisterUser } from '../types/auth.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);
  private API_URL: string = 'http://localhost:8080/api/auth';
  private USER: string = 'USER_NAME';
  private ROLE: string = 'USER_ROLE';
  private TOKEN: string = 'USER_TOKEN';
  private EXPIRATION: string = 'EXPIRATION_TIME';

  $isAuthenticated = signal<boolean>(this.getToken() ? true:false);

  singUp(newUser: RegisterUser): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.API_URL}/singup`, newUser);
  }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, credentials);
  }

  logout() {
    sessionStorage.clear();
    this.$isAuthenticated.set(false);
  }

  setUserStorage(response: LoginResponse) {
    sessionStorage.setItem(this.TOKEN, response.token);
    sessionStorage.setItem(this.USER, response.username);
    sessionStorage.setItem(this.EXPIRATION, response.expirationTime.toString());
    sessionStorage.setItem(this.ROLE, response.role);
    this.$isAuthenticated.set(true);
  }

  getToken(): string | null {
    const token = sessionStorage.getItem(this.TOKEN);
    return token ? token : null;
  }

}
