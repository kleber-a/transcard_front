import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let mockAuthService: any;
  let mockToastr: any;

  beforeEach(async () => {
    mockAuthService = {
      register: jasmine.createSpy('register')
    };

    mockToastr = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error')
    };

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, ReactiveFormsModule, RouterTestingModule],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: mockAuthService },
        { provide: ToastrService, useValue: mockToastr }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve invalidar o formulário quando campos obrigatórios estiverem vazios', () => {
    component.registerForm.setValue({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: ''
    });

    expect(component.registerForm.valid).toBeFalse();
  });

  it('deve validar senhas iguais', () => {
    component.registerForm.setValue({
      name: 'Teste',
      email: 'teste@test.com',
      password: '123456',
      confirmPassword: '123456',
      role: 'USER'
    });

    component.passwordMatchValidator(component.registerForm);
    expect(component.registerForm.get('confirmPassword')?.errors).toBeNull();
  });

  it('deve invalidar quando senhas forem diferentes', () => {
    component.registerForm.setValue({
      name: 'Teste',
      email: 'teste@test.com',
      password: '123456',
      confirmPassword: '654321',
      role: 'USER'
    });

    component.passwordMatchValidator(component.registerForm);
    expect(component.registerForm.get('confirmPassword')?.errors).toEqual({ mismatch: true });
  });

  it('deve chamar AuthService.register ao enviar formulário válido', fakeAsync(() => {
    const payload = {
      name: 'Teste',
      email: 'teste@test.com',
      password: '123456',
      role: 'USER'
    };

    mockAuthService.register.and.returnValue(of({}));

    component.registerForm.setValue({
      ...payload,
      confirmPassword: '123456'
    });

    component.onSubmit();
    tick();

    expect(mockAuthService.register).toHaveBeenCalledWith(payload);
    expect(mockToastr.success).toHaveBeenCalledWith('Usuário criado!', 'Sucesso');
    expect(component.isLoading).toBeFalse();
  }));

  it('deve mostrar erro se AuthService.register falhar', fakeAsync(() => {
    const payload = {
      name: 'Teste',
      email: 'teste@test.com',
      password: '123456',
      role: 'USER'
    };

    const errorResponse = { error: { message: 'Erro ao registrar' } };
    mockAuthService.register.and.returnValue(throwError(() => errorResponse));

    component.registerForm.setValue({
      ...payload,
      confirmPassword: '123456'
    });

    component.onSubmit();
    tick();

    expect(mockToastr.error).toHaveBeenCalledWith('Erro ao registrar', 'Erro');
    expect(component.isLoading).toBeFalse();
  }));
});
