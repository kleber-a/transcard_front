import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getAuthorizationToken();
  const user = authService.getUser();

  if (token && user?.role === 'USER') {
    return true;
  }

  return router.createUrlTree(['/login']);
};
