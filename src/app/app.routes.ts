import { Routes } from '@angular/router';
import { loginGuard } from './core/guard/login.guard';
import { authGuard } from './core/guard/auth.guard';
import { userGuard } from './core/guard/user.guard';


export const routes: Routes = [
   {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/auth.component').then((c) => c.AuthComponent),
    canActivate: [loginGuard],
  },
  {
    path: 'register',
    loadComponent: () => import('./modules/register/register.component').then((c) => c.RegisterComponent),
    canActivate: [loginGuard],
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.routes').then(m => m.routes),
    canActivate: [authGuard]
  },
  {
    path: 'user',
    loadComponent: () => import('./modules/user/user.component').then(c => c.UserComponent),
    canActivate: [userGuard]
  }


];
