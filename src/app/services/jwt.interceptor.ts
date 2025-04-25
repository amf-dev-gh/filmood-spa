import { HttpInterceptorFn } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const token = authService.getToken();

  const routes = [
    'http://localhost:8080/api/filmood/moods/',
  ];

  const requiereAuth = routes.some(url => req.url.startsWith(url));
  if (requiereAuth) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  return next(req);
};