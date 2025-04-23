import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const LoginGuard : CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();
  const tokenExpired = authService.isTokenExpired();

  if(!token || tokenExpired){
    authService.logout()
    router.navigate(['/login']);
    return false;
  }

  return true;;
}