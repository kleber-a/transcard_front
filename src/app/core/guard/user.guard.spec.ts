import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { userGuard } from './user.guard';
import { AuthService, AuthUser } from '../services/auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('userGuard (Guarda de rota para usuários)', () => {
  let authService: AuthService;
  let router: Router;
  let mockRouter: any;

  const dummyUser: AuthUser = {
    id: '1',
    fullName: 'Usuário Teste',
    email: 'teste@email.com',
    role: 'USER',
    isProfileFull: true
  };

  beforeEach(() => {
    mockRouter = {
      createUrlTree: jasmine.createSpy('createUrlTree')
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // ✅ importante!
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

  it('deve permitir acesso se o usuário estiver logado e for USER', () => {
    localStorage.setItem('access_token', 'token123');
    localStorage.setItem('auth_user', JSON.stringify(dummyUser));

    const canActivate = TestBed.runInInjectionContext(() => userGuard(null as any, null as any));

    expect(canActivate).toBeTrue();
  });

  it('deve bloquear acesso e redirecionar se não houver token', () => {
    const canActivate = TestBed.runInInjectionContext(() => userGuard(null as any, null as any));

    expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/login']);
  });

  it('deve bloquear acesso e redirecionar se a role não for USER', () => {
    const otherUser = { ...dummyUser, role: 'ADMIN' };
    localStorage.setItem('access_token', 'token123');
    localStorage.setItem('auth_user', JSON.stringify(otherUser));

    const canActivate = TestBed.runInInjectionContext(() => userGuard(null as any, null as any));

    expect(mockRouter.createUrlTree).toHaveBeenCalledWith(['/login']);
  });
});
