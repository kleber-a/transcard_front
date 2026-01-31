import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { HttpService } from '../../core/services/http/http.service';
import { of } from 'rxjs';
import { User, PageUser } from '../../core/models/User';

describe('UsersService', () => {
  let service: UsersService;
  let mockHttpService: any;

  beforeEach(() => {
    mockHttpService = {
      getGeneric: jasmine.createSpy('getGeneric'),
      postGeneric: jasmine.createSpy('postGeneric'),
      patchGeneric: jasmine.createSpy('patchGeneric'),
      deleteGeneric: jasmine.createSpy('deleteGeneric'),
    };

    TestBed.configureTestingModule({
      providers: [
        UsersService,
        { provide: HttpService, useValue: mockHttpService }
      ]
    });

    service = TestBed.inject(UsersService);
  });

  it('deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });


  it('deve chamar getGeneric para obter usuário logado', () => {
    const fakeUser: User = { id: 1, name: 'Teste', email: 'teste@test.com' } as User;
    mockHttpService.getGeneric.and.returnValue(of(fakeUser));

    service.getMyUser().subscribe(result => {
      expect(result).toEqual(fakeUser);
    });

    expect(mockHttpService.getGeneric).toHaveBeenCalledWith('users/me');
  });

  it('deve chamar postGeneric ao criar um usuário', () => {
    const newUser: User = { name: 'Novo', email: 'novo@test.com' } as User;
    mockHttpService.postGeneric.and.returnValue(of(newUser));

    service.postUsers(newUser).subscribe(result => {
      expect(result).toEqual(newUser);
    });

    expect(mockHttpService.postGeneric).toHaveBeenCalledWith('users', newUser);
  });

  it('deve chamar patchGeneric ao atualizar um usuário', () => {
    const updatedUser: User = { name: 'Atualizado' } as User;
    mockHttpService.patchGeneric.and.returnValue(of(updatedUser));

    service.patchUsers(updatedUser, '1').subscribe(result => {
      expect(result).toEqual(updatedUser);
    });

    expect(mockHttpService.patchGeneric).toHaveBeenCalledWith('users/1', updatedUser);
  });

  it('deve chamar deleteGeneric ao deletar um usuário', () => {
    mockHttpService.deleteGeneric.and.returnValue(of({ success: true }));

    service.deleteUser(1).subscribe(result => {
      expect(result).toEqual({ success: true });
    });

    expect(mockHttpService.deleteGeneric).toHaveBeenCalledWith('users/1');
  });
});
