// import { TestBed } from '@angular/core/testing';
import { HomeService } from './home.service';
import { HttpService } from '../../core/services/http/http.service';
import { of } from 'rxjs';
import { User } from '../../core/models/User';
import { TestBed } from '@angular/core/testing';

describe('HomeService', () => {
  let service: HomeService;
  let mockHttpService: any;

  beforeEach(() => {
    // Mock do HttpService
    mockHttpService = {
      getGeneric: jasmine.createSpy('getGeneric')
    };

    TestBed.configureTestingModule({
      providers: [
        HomeService,
        { provide: HttpService, useValue: mockHttpService }
      ]
    });

    service = TestBed.inject(HomeService);
  });

  it('deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('deve retornar a lista de usuários ao chamar getUsers', () => {
    const fakeUsers: User[] = [
      { id: 1, name: 'Usuário 1', email: 'user1@test.com' } as User,
      { id: 2, name: 'Usuário 2', email: 'user2@test.com' } as User
    ];

    // Configura o mock para retornar os usuários falsos
    mockHttpService.getGeneric.and.returnValue(of(fakeUsers));

    service.getUsers().subscribe(users => {
      expect(users).toEqual(fakeUsers);
    });

    expect(mockHttpService.getGeneric).toHaveBeenCalledWith('users');
  });
});
