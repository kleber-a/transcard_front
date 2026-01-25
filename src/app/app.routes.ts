import { Routes } from '@angular/router';
import { loginGuard } from './core/guard/login.guard';
import { authGuard } from './core/guard/auth.guard';


export const routes: Routes = [
   {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/auth.component').then((p) => p.AuthComponent),
    canActivate: [loginGuard],
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.routes').then(m => m.routes),
    canActivate: [authGuard]
  },
];
