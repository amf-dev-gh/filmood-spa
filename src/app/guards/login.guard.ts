import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const LoginGuard : CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAuthenticated = authService.$isAuthenticated();

  if(!isAuthenticated){
    authService.logout()
    router.navigate(['/login']);
    return false;
  }

  return true;;
}