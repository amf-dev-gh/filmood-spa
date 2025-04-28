import { HttpInterceptorFn } from "@angular/common/http";
import { ENVIROMENT } from "../../../env";

export const ApiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const api_key = ENVIROMENT.TMDB_API_KEY;

  const routes = [
    'https://api.themoviedb.org/3',
  ];

  const requiereAuth = routes.some(url => req.url.startsWith(url));
  if (requiereAuth) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${api_key}` } });
  }

  return next(req);
};