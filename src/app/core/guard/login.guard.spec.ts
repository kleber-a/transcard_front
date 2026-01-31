import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { loginGuard } from './login.guard';
import { AuthService } from '../services/auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('loginGuard (Guarda de rota para login)', () => {
  let authService: AuthService;
  let router: Router;
  let mockRouter: any;

  beforeEach(() => {
    mockRouter = {
      createUrlTree: jasmine.createSpy('createUrlTree')
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // necessário para injetar AuthService
      providers: [
        AuthService,
        { provide: Router, useValue: mockRouter }
      ]
    });

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('deve bloquear acesso e redirecionar para /home se houver token', () => {
    localStorage.setItem('access_token', 'token123');

    const canActivate = TestBed.runInInjectionContext(() => loginGuard(null as any, null as any));

    expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/home']);
  });

  it('deve permitir acesso se não houver token', () => {
    const canActivate = TestBed.runInInjectionContext(() => loginGuard(null as any, null as any));

    expect(canActivate).toBeTrue();
  });
});
