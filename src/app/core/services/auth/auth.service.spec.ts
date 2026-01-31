import { TestBed } from '@angular/core/testing';
import { AuthService, AuthResponse, AuthUser, LoginPayload } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let mockRouter: any;

  const dummyUser: AuthUser = {
    id: '1',
    fullName: 'Usuário Teste',
    email: 'teste@email.com',
    role: 'ADMIN',
    isProfileFull: true
  };

  beforeEach(() => {
    mockRouter = { navigate: jasmine.createSpy('navigate'), url: '/home' };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: mockRouter }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('deve realizar login e salvar token e usuário', () => {
    const payload: LoginPayload = { email: 'teste@email.com', password: '123456' };
    const mockResponse: AuthResponse = { user: dummyUser, token: '12345' };

    service.login(payload).subscribe(res => {
      expect(res).toEqual(mockResponse);
      expect(service.getAuthorizationToken()).toBe('12345');
      expect(service.getUser()).toEqual(dummyUser);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('deve realizar registro e redirecionar para login', () => {
    const payload: LoginPayload = { email: 'novo@email.com', password: '123456' };
    const mockResponse: AuthResponse = { user: dummyUser, token: '67890' };

    service.register(payload).subscribe(res => {
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/auth/register`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('deve realizar logout e limpar sessão', () => {
    localStorage.setItem('access_token', 'token');
    localStorage.setItem('auth_user', JSON.stringify(dummyUser));

    service.logout();

    expect(localStorage.getItem('access_token')).toBeNull();
    expect(localStorage.getItem('auth_user')).toBeNull();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
  });

  it('deve retornar token correto', () => {
    localStorage.setItem('access_token', 'token123');
    expect(service.getAuthorizationToken()).toBe('token123');
  });

  it('deve retornar usuário correto', () => {
    localStorage.setItem('auth_user', JSON.stringify(dummyUser));
    expect(service.getUser()).toEqual(dummyUser);
  });

  it('deve verificar se está autenticado', () => {
    expect(service.isAuthenticated()).toBeFalse();
    localStorage.setItem('access_token', 'token123');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('deve limpar sessão corretamente', () => {
    localStorage.setItem('access_token', 'token');
    localStorage.setItem('auth_user', JSON.stringify(dummyUser));
    sessionStorage.setItem('session_key', 'value');

    service.clearSession();

    expect(localStorage.getItem('access_token')).toBeNull();
    expect(localStorage.getItem('auth_user')).toBeNull();
    expect(sessionStorage.length).toBe(0);
  });
});
