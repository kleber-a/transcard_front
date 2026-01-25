import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  // accessToken: string;
  user: AuthUser;
  token: string;
  refreshToken?: string;
}

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: 'ADMIN' | 'CUSTOMER' | string;
  isProfileFull: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = environment.apiUrl;
  private readonly TOKEN_KEY = 'access_token';
  private readonly USER_KEY = 'auth_user';

  constructor(
    // private readonly http: HttpClient,
    // private readonly router: Router
  ) { }

  #http = inject(HttpClient)
  #router = inject(Router)


  // 🔐 LOGIN
  login(payload: LoginPayload, screen?: string): Observable<AuthResponse> {
    return this.#http
      .post<AuthResponse>(`${this.apiUrl}/auth/login`, payload)
      .pipe(
        tap(res => {
        if (res.user.role === screen) {
          this.setAuthorizationToken(res.token);
          this.setUser(res.user);
        } else {
          this.clearSession();
          console.warn('Login negado: role não permitida', res.user.role);
        }
        })
      );
  }

  // register(body: any) {
  // }

  // LOGOUT
  logout(): void {
    const url = this.#router.url;
    this.clearSession();

    if (url.startsWith('/admin')) {
      this.#router.navigate(['/admin/login']);
    } else {
      this.#router.navigate(['/customer/login']);
    }
  }

  // TOKEN
  getAuthorizationToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): AuthUser | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  private setAuthorizationToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private setUser(user: AuthUser): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }


  // AUTENTICAÇÃO
  isAuthenticated(): boolean {
    return !!this.getAuthorizationToken();
  }

  // LIMPEZA
  clearSession(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    sessionStorage.clear();
  }

}
