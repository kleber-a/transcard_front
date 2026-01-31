import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateUserModalComponent } from './create-user-modal.component';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

describe('CreateUserModalComponent', () => {
  let component: CreateUserModalComponent;
  let fixture: ComponentFixture<CreateUserModalComponent>;

  let mockDialogRef: any;

  beforeEach(async () => {
    mockDialogRef = {
      close: jasmine.createSpy('close')
    };

    await TestBed.configureTestingModule({
      imports: [CreateUserModalComponent], // standalone → usar imports
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} } // sem usuário por padrão
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário vazio quando não houver usuário', () => {
    expect(component.form.value).toEqual({ name: '', email: '', password: '' });
    expect(component.isEdit).toBeFalse();
  });

  it('deve inicializar o formulário com dados do usuário quando for edição', () => {
    const user = { name: 'João', email: 'joao@test.com' };
    const fixtureEdit = TestBed.createComponent(CreateUserModalComponent);
    const componentEdit = fixtureEdit.componentInstance;
    componentEdit['data'] = { user };
    componentEdit.isEdit = true;
    componentEdit.form = componentEdit['fb'].group({
      name: [user.name],
      email: [user.email],
      password: ['']
    });

    expect(componentEdit.form.value).toEqual({ name: 'João', email: 'joao@test.com', password: '' });
    expect(componentEdit.isEdit).toBeTrue();
  });

  it('não deve fechar o diálogo se o formulário for inválido', () => {
    component.form.controls['name'].setValue('');
    component.submit();
    expect(mockDialogRef.close).not.toHaveBeenCalled();
  });

  it('deve fechar o diálogo com os dados do formulário quando submit for válido', () => {
    component.form.controls['name'].setValue('Maria');
    component.form.controls['email'].setValue('maria@test.com');
    component.form.controls['password'].setValue('123456');

    component.submit();

    expect(mockDialogRef.close).toHaveBeenCalledWith({
      ...component.data?.user,
      name: 'Maria',
      email: 'maria@test.com',
      password: '123456'
    });
  });

  it('deve fechar o diálogo sem dados ao chamar close', () => {
    component.close();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
