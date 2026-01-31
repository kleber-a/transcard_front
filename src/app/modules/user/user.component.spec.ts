import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { AuthService } from '../../core/services/auth/auth.service';
import { UsersService } from '../services/users.service';
import { CardsService } from '../services/cards.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  let mockAuthService: any;
  let mockUsersService: any;
  let mockCardsService: any;
  let mockToastr: any;
  let mockRoute: any;

  beforeEach(async () => {
    mockAuthService = { logout: jasmine.createSpy('logout') };
    mockUsersService = { patchUsers: jasmine.createSpy('patchUsers').and.returnValue(of({ id: 1, name: 'Teste' })) };
    mockCardsService = { patchCards: jasmine.createSpy('patchCards').and.returnValue(of({})) };
    mockToastr = { success: jasmine.createSpy('success'), error: jasmine.createSpy('error') };
    mockRoute = { queryParams: of({ user: JSON.stringify({ id: 1, name: 'Teste' }) }) };

    await TestBed.configureTestingModule({
      imports: [UserComponent, ReactiveFormsModule, MatIconModule],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: mockAuthService },
        { provide: UsersService, useValue: mockUsersService },
        { provide: CardsService, useValue: mockCardsService },
        { provide: ToastrService, useValue: mockToastr },
        { provide: ActivatedRoute, useValue: mockRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário do usuário com os dados da rota', () => {
    expect(component.userForm.value.name).toBe('Teste');
    expect(component.userForm.value.password).toBe('');
  });

  it('deve chamar patchUsers e toastr.success ao submeter formulário válido', fakeAsync(() => {
    component.userForm.controls['name'].setValue('Novo Nome');
    component.userForm.controls['password'].setValue('123456');
    component.user.id = 1;

    component.onSubmitUser();
    tick();

    expect(mockUsersService.patchUsers).toHaveBeenCalledWith(
      { name: 'Novo Nome', password: '123456' },
      '1'
    );
    expect(mockToastr.success).toHaveBeenCalledWith('Usuário Editado com sucesso!', 'Sucesso');
  }));

  it('deve chamar toastr.error se patchUsers falhar', fakeAsync(() => {
    mockUsersService.patchUsers.and.returnValue(throwError(() => new Error('falha')));
    component.userForm.controls['name'].setValue('Novo Nome');
    component.userForm.controls['password'].setValue('123456');
    component.user.id = 1;

    component.onSubmitUser();
    tick();

    expect(mockToastr.error).toHaveBeenCalledWith('Error ao editar usuários!', 'Erro');
  }));

  it('deve chamar logout ao chamar o método logout', () => {
    component.logout();
    expect(mockAuthService.logout).toHaveBeenCalled();
  });

  it('deve alternar o status do cartão e chamar cardsService.patchCards', fakeAsync(() => {
    const card = { id: 1, status: false };
    component.toggleStatus(card);
    tick();
    expect(card.status).toBe(true);
    expect(mockCardsService.patchCards).toHaveBeenCalledWith(1);
    expect(mockToastr.success).toHaveBeenCalledWith('Status editado com sucesso!', 'Sucesso');
  }));

  it('deve chamar toastr.error se patchCards falhar', fakeAsync(() => {
    mockCardsService.patchCards.and.returnValue(throwError(() => new Error('erro')));
    const card = { id: 1, status: false };
    component.toggleStatus(card);
    tick();
    expect(mockToastr.error).toHaveBeenCalledWith('Error ao editar status!', 'Erro');
  }));

  it('não deve chamar patchCards se card.id for indefinido', () => {
    const card = { status: false };
    component.toggleStatus(card);
    expect(mockCardsService.patchCards).not.toHaveBeenCalled();
  });
});
