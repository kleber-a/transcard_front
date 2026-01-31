import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);


  const token = authService.getAuthorizationToken();

  if (token) {
    return true;
  } else {
    return router.createUrlTree(['/login']);
  }
};
