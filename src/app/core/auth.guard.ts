import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {


  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn() && !authService.isTokenExpired()) {

    return true; // User is authenticated, allow access
  } else {
    // Redirect to login page and keep the attempted URL for redirection after login
        authService.logout();
        
    return router.navigate(['/login'])
    }
};